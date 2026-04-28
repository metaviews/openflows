'use strict'

const { createClient } = require('../../scripts/lib/openrouter')
const { loadSourceRegistry } = require('../../scripts/lib/source-registry')

const FETCH_TIMEOUT_MS = 12000
const PAGE_TEXT_MAX = 4000
const README_MAX = 8000
const RAW_INSPECT_MAX = 200_000

const PLATFORM_HINTS = [
  { kind: 'github-repo', re: /^https?:\/\/github\.com\/[^/]+\/[^/?#]+\/?/i, module: 'github' },
  { kind: 'huggingface', re: /^https?:\/\/huggingface\.co\//i, module: 'huggingface' },
  { kind: 'bluesky', re: /^https?:\/\/(?:www\.)?bsky\.app\//i, module: 'bluesky' },
  { kind: 'twitter', re: /^https?:\/\/(?:www\.)?(?:twitter|x)\.com\//i, module: 'twitter' },
]

async function generateSourceFromUrl({ url }) {
  if (!url) throw badRequest('url required')
  const parsed = new URL(url)
  if (!['http:', 'https:'].includes(parsed.protocol)) {
    throw badRequest('Only http and https URLs are supported')
  }

  const inspection = await inspectUrl(url)

  let readme = ''
  const githubMatch = url.match(/^https?:\/\/github\.com\/([^/]+)\/([^/?#]+)\/?/i)
  if (githubMatch) {
    const owner = githubMatch[1]
    const repo = githubMatch[2].replace(/\.git$/, '')
    for (const branch of ['main', 'master']) {
      try {
        const text = await fetchText(`https://raw.githubusercontent.com/${owner}/${repo}/${branch}/README.md`, README_MAX, { plain: true })
        if (text) { readme = text; break }
      } catch {}
    }
  }

  const registry = loadSourceRegistry()
  const existingIds = registry.sources.map(source => source.id)

  const or = createClient({ title: 'Openflows Source Generator' })
  const prompt = buildPrompt({ url, inspection, readme, existingIds })
  const response = await or.ask(prompt)
  const parsedResponse = parseJSON(response)
  if (!parsedResponse) throw new Error('Could not parse generator response as JSON')

  const source = {
    id: String(parsedResponse.id || '').trim(),
    module: String(parsedResponse.module || '').trim(),
    label: String(parsedResponse.label || '').trim(),
    enabled: false,
    notes: String(parsedResponse.notes || '').trim(),
    config: isPlainObject(parsedResponse.config) ? parsedResponse.config : {},
  }

  if (source.id && existingIds.includes(source.id)) {
    let i = 2
    while (existingIds.includes(`${source.id}-${i}`)) i++
    source.id = `${source.id}-${i}`
  }

  return source
}

// Preflight the URL: fetch once, classify the response, derive a strong hint
// for the LLM. Recognises feed XML, HTML pages with discoverable RSS/Atom
// links, and platform-specific URLs (GitHub, HuggingFace, Bluesky, Twitter).
async function inspectUrl(url) {
  const platform = PLATFORM_HINTS.find(hint => hint.re.test(url))

  let contentType = ''
  let raw = ''
  let finalUrl = url
  let fetchError = null
  try {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS)
    try {
      const response = await fetch(url, {
        signal: controller.signal,
        headers: {
          'User-Agent': 'Openflows/1.0 (+https://openflows.org)',
          'Accept': 'application/rss+xml, application/atom+xml, application/xml;q=0.9, text/html;q=0.8, */*;q=0.5',
        },
        redirect: 'follow',
      })
      contentType = (response.headers.get('content-type') || '').toLowerCase()
      finalUrl = response.url || url
      if (response.ok) {
        raw = (await response.text()).slice(0, RAW_INSPECT_MAX)
      } else {
        fetchError = `HTTP ${response.status}`
      }
    } finally {
      clearTimeout(timer)
    }
  } catch (err) {
    fetchError = err.message
  }

  const head = raw.trimStart().slice(0, 600).toLowerCase()
  const isXmlContentType = /(xml|rss|atom)/.test(contentType)
  const looksLikeFeed = isXmlContentType
    || /^<\?xml/.test(head)
    || /^<rss\b/.test(head)
    || /^<feed\b/.test(head)
    || /^<rdf\b/.test(head)

  let kind = 'unknown'
  let suggestedModule = null
  let feedUrl = null
  let feedKind = null

  if (looksLikeFeed) {
    kind = 'rss-feed'
    suggestedModule = 'rss'
    feedUrl = finalUrl
    feedKind = /^<feed\b/.test(head) ? 'atom' : 'rss'
  } else if (platform) {
    kind = platform.kind
    suggestedModule = platform.module
  } else if (raw && /<html/i.test(raw)) {
    const discovered = discoverFeedLink(raw, finalUrl)
    if (discovered) {
      kind = 'html-with-feed'
      suggestedModule = 'rss'
      feedUrl = discovered.href
      feedKind = discovered.kind
    } else {
      kind = 'html'
      suggestedModule = 'scrape'
    }
  } else if (raw) {
    kind = 'unknown'
    suggestedModule = 'scrape'
  }

  const title = extractTitle(raw)
  const strippedText = sliceText(stripHtml(raw), PAGE_TEXT_MAX)

  return {
    kind,
    suggestedModule,
    feedUrl,
    feedKind,
    title,
    contentType,
    finalUrl,
    fetchError,
    pageText: strippedText,
  }
}

function discoverFeedLink(html, baseUrl) {
  const re = /<link\b[^>]*\brel\s*=\s*["']?alternate["']?[^>]*>/gi
  const links = html.match(re) || []
  for (const tag of links) {
    const typeMatch = tag.match(/\btype\s*=\s*["']([^"']+)["']/i)
    const hrefMatch = tag.match(/\bhref\s*=\s*["']([^"']+)["']/i)
    if (!typeMatch || !hrefMatch) continue
    const type = typeMatch[1].toLowerCase()
    if (!/(rss|atom|xml)/.test(type)) continue
    let href = hrefMatch[1]
    try { href = new URL(href, baseUrl).toString() } catch {}
    const kind = /atom/.test(type) ? 'atom' : 'rss'
    return { href, kind }
  }
  return null
}

function buildPrompt({ url, inspection, readme, existingIds }) {
  const detectedLines = [
    `Detected kind: ${inspection.kind}`,
    `Suggested module: ${inspection.suggestedModule || '(none — use brave with topical queries)'}`,
    inspection.contentType ? `Content-Type: ${inspection.contentType}` : null,
    inspection.feedUrl ? `Feed URL: ${inspection.feedUrl} (${inspection.feedKind || 'rss'})` : null,
    inspection.title ? `Page title: ${inspection.title}` : null,
    inspection.fetchError ? `Fetch warning: ${inspection.fetchError}` : null,
  ].filter(Boolean).join('\n')

  return `You are Peng, proposing a single new intake source for Openflows from a URL the operator provided.

Return ONLY valid JSON with this exact shape:
{"id":"kebab-case-id","module":"<module>","label":"Short label","notes":"One or two sentences explaining what this source provides and any caveats","config":{...}}

Available modules and their config shapes:
- "rss": generic RSS or Atom feed reader. Config: { "feedUrl": "<feed-url>", "limit": 20 } or { "feedUrls": ["<url1>", "<url2>"], "limit": 20 }. Use this for any RSS/Atom feed.
- "scrape": generic web page scraper for sources without a feed. Config: { "urls": ["<page-url>", ...] }. Use sparingly — best for a small set of curated pages worth re-reading. Each run emits one signal per URL.
- "github": GitHub search. Config: { "queries": ["repo:owner/name" or "topic:foo is:public", ...], "minStars": 0, "perPage": 10 }. Use for github.com/owner/repo URLs (queries should include "repo:owner/name") or for topic-wide search.
- "huggingface": Hugging Face model search. Config: { "tasks": [relevant pipeline tasks], "minLikes": 10, "limit": 10 }.
- "brave": Brave web search. Config: { "queries": [3-5 search queries derived from the topic], "count": 5 }. Use for general topic discovery when no feed exists and the URL just illustrates a topic.
- "twitter" / "bluesky" / "mastodon": social platforms. Use only for clearly social URLs; treat as inactive review proposal regardless of enabled flag.
- "practitioner-social": tracks verified socialProfiles on practitioner entries. Rarely needed for a new source.

Decision rules — pick the SIMPLEST module that fits:
1. If the suggested module below is "rss" with a Feed URL: pick "rss" and set config.feedUrl to that exact URL.
2. If the URL is a GitHub repo: pick "github" with config.queries = ["repo:<owner>/<name>"] plus 0-2 related topic queries from the README.
3. If the URL is a Hugging Face page: pick "huggingface" with relevant tasks.
4. If the URL is a social platform profile or hashtag: pick the matching social module.
5. If the page is HTML with no feed and looks like a topic / news / article hub: prefer "brave" with 3-5 query strings derived from the page topic. Only fall back to "scrape" if the operator clearly wants this single page tracked verbatim and there is no broader search query that would surface comparable signals.
6. For all other static pages worth periodic re-reading: pick "scrape" with config.urls = ["<the URL>"].

Other rules:
- id must be kebab-case (lowercase, hyphen-separated) and must NOT collide with any existing source id.
- Keep configs compact: 2-5 queries/tasks max.
- Notes: 1-2 sentences, technical/civic tone, no marketing voice. Mention what the source contributes and any access caveats (rate limits, auth required, terms of service, scraping etiquette).

URL preflight (deterministic — derived from a real fetch):
${detectedLines}

URL: ${url}

Existing source ids (do NOT collide):
${existingIds.join(', ')}

Page content (stripped HTML, may be truncated):
${inspection.pageText || '(empty or unfetchable)'}
${readme ? `\nREADME:\n${readme}` : ''}`
}

async function fetchText(url, max, { plain = false } = {}) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS)
  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: { 'User-Agent': 'Openflows/1.0 (+https://openflows.org)' },
    })
    if (!response.ok) {
      if (response.status === 404) return ''
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }
    const raw = await response.text()
    const stripped = plain ? raw : stripHtml(raw)
    return sliceText(stripped, max)
  } finally {
    clearTimeout(timer)
  }
}

function sliceText(text, max) {
  if (!text) return ''
  return text.length > max ? `${text.slice(0, max)}\n\n[truncated]` : text
}

function extractTitle(html) {
  if (!html) return ''
  const match = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)
  return match ? match[1].replace(/\s+/g, ' ').trim() : ''
}

function stripHtml(raw) {
  return String(raw || '')
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim()
}

function parseJSON(text) {
  if (typeof text !== 'string') return null
  const cleaned = text.replace(/^```(?:json)?\s*\n?/, '').replace(/\n?```\s*$/, '').trim()
  try { return JSON.parse(cleaned) } catch {}
  const match = cleaned.match(/\{[\s\S]*\}/)
  if (!match) return null
  try { return JSON.parse(match[0]) } catch { return null }
}

function isPlainObject(value) {
  return !!value && typeof value === 'object' && !Array.isArray(value)
}

function badRequest(message) {
  const err = new Error(message)
  err.statusCode = 400
  return err
}

module.exports = { generateSourceFromUrl, inspectUrl }
