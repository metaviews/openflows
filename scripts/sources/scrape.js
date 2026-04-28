'use strict';

// Generic web page scraper for sources without a structured feed.
// Config shape:
//   { urls: ["https://example.com/news", "https://other.org/updates"] }
// Produces one signal per URL per run with title + body excerpt.
// Use sparingly: best for a small set of curated pages worth re-reading.
// Larger surfaces should use brave search or an rss feed instead.

const USER_AGENT = 'Openflows/1.0 (+https://openflows.org)';
const SUMMARY_MAX = 800;
const ENRICH_MAX = 4000;

async function fetch(_token, sourceConfig = {}) {
  const urls = Array.isArray(sourceConfig.urls) ? sourceConfig.urls.filter(Boolean) : [];
  if (!urls.length) {
    console.warn('  Scrape: no urls configured');
    return [];
  }

  const signals = [];
  for (const url of urls) {
    try {
      const res = await globalThis.fetch(url, { headers: { 'User-Agent': USER_AGENT } });
      if (!res.ok) {
        console.warn(`  Scrape: ${url} failed (${res.status})`);
        continue;
      }
      const html = await res.text();
      const title = extractTitle(html) || url;
      const summary = stripHtml(html).slice(0, SUMMARY_MAX);
      signals.push({
        title,
        url,
        summary,
        source: sourceConfig.sourceId || 'scrape',
        date: new Date().toISOString(),
        meta: {},
      });
    } catch (err) {
      console.warn(`  Scrape: ${url} error ${err.message}`);
    }
  }

  return signals;
}

async function enrich(signal) {
  try {
    const res = await globalThis.fetch(signal.url, { headers: { 'User-Agent': USER_AGENT } });
    if (res.ok) {
      const html = await res.text();
      signal.enriched = stripHtml(html).slice(0, ENRICH_MAX);
    }
  } catch {}
  return signal;
}

function extractTitle(html) {
  const match = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  return match ? match[1].replace(/\s+/g, ' ').trim() : '';
}

function stripHtml(html) {
  return String(html || '')
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

module.exports = { fetch, enrich };
