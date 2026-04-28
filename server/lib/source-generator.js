'use strict'

const { createClient } = require('../../scripts/lib/openrouter')
const { loadSourceRegistry } = require('../../scripts/lib/source-registry')

const FETCH_TIMEOUT_MS = 12000
const PAGE_TEXT_MAX = 4000
const README_MAX = 8000

async function generateSourceFromUrl({ url }) {
  if (!url) throw badRequest('url required')
  const parsed = new URL(url)
  if (!['http:', 'https:'].includes(parsed.protocol)) {
    throw badRequest('Only http and https URLs are supported')
  }

  const pageText = await fetchText(url, PAGE_TEXT_MAX)

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
  const prompt = buildPrompt({ url, pageText, readme, existingIds })
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

function buildPrompt({ url, pageText, readme, existingIds }) {
  return `You are Peng, proposing a single new intake source for Openflows from a URL the operator provided.

Return ONLY valid JSON with this exact shape:
{"id":"kebab-case-id","module":"<module>","label":"Short label","notes":"One or two sentences explaining what this source provides and any caveats","config":{...}}

Rules:
- id must be kebab-case (lowercase, hyphen-separated) and must NOT collide with any existing source id.
- module must be one of: github, huggingface, brave, twitter, bluesky, mastodon, practitioner-social, opensourceprojects.
- For GitHub repos (github.com/owner/repo): module "github" with config { "queries": ["repo:owner/name", ...optional related topic queries], "minStars": 0, "perPage": 10 }
- For Hugging Face (huggingface.co): module "huggingface" with config { "tasks": [relevant pipeline tasks], "minLikes": 10, "limit": 10 }
- For RSS feeds: module "opensourceprojects" with config { "feedUrl": "<url>", "limit": 20, "minStars": 0 }
- For general topic pages, articles, or news sites: module "brave" with config { "queries": [3-5 search queries derived from the topic], "count": 5 }
- For X/Twitter, Bluesky, or Mastodon profiles or topics: use the matching module with handles/queries; treat as inactive review proposal.
- Keep configs compact: 2-5 queries/tasks max.
- Notes: 1-2 sentences, technical/civic tone, no marketing voice. Mention what the source contributes and any access caveats (rate limits, auth required, terms of service).

Existing source ids (do NOT collide):
${existingIds.join(', ')}

URL: ${url}

Page content (stripped HTML, may be truncated):
${pageText || '(empty or unfetchable)'}
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
    return stripped.length > max ? `${stripped.slice(0, max)}\n\n[truncated]` : stripped
  } finally {
    clearTimeout(timer)
  }
}

function stripHtml(raw) {
  return raw
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

module.exports = { generateSourceFromUrl }
