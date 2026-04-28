'use strict';

// Generic RSS / Atom feed reader.
// Config shape:
//   { feedUrl: "https://example.com/feed", limit: 20 }
//   or
//   { feedUrls: ["https://a.com/rss", "https://b.com/atom"], limit: 20 }
// Produces one signal per feed item.

async function fetch(_token, sourceConfig = {}) {
  const feedUrls = Array.isArray(sourceConfig.feedUrls) && sourceConfig.feedUrls.length
    ? sourceConfig.feedUrls
    : (sourceConfig.feedUrl ? [sourceConfig.feedUrl] : []);
  const limit = Number(sourceConfig.limit) > 0 ? Number(sourceConfig.limit) : 20;
  if (!feedUrls.length) {
    console.warn('  RSS: no feedUrl configured');
    return [];
  }

  const signals = [];
  for (const feedUrl of feedUrls) {
    try {
      const res = await globalThis.fetch(feedUrl, {
        headers: { 'Accept': 'application/rss+xml, application/atom+xml, application/xml, text/xml' },
      });
      if (!res.ok) {
        console.warn(`  RSS: ${feedUrl} failed (${res.status})`);
        continue;
      }
      const xml = await res.text();
      const items = parseFeed(xml).slice(0, limit);
      for (const item of items) {
        signals.push({
          title: item.title,
          url: item.url,
          summary: item.description || '',
          source: sourceConfig.sourceId || 'rss',
          date: item.pubDate || new Date().toISOString(),
          meta: { feedUrl },
        });
      }
    } catch (err) {
      console.warn(`  RSS: ${feedUrl} error ${err.message}`);
    }
  }

  return dedup(signals);
}

async function enrich(signal) {
  return signal;
}

function parseFeed(xml) {
  const items = [];
  const blocks = [
    ...(xml.match(/<item\b[\s\S]*?<\/item>/gi) || []),
    ...(xml.match(/<entry\b[\s\S]*?<\/entry>/gi) || []),
  ];
  for (const block of blocks) {
    const title = stripCDATA(extractTag(block, 'title'));
    let url = stripCDATA(extractTag(block, 'link'));
    if (!url) {
      const m = block.match(/<link\b[^>]*\bhref\s*=\s*["']([^"']+)["'][^>]*\/?>/i);
      if (m) url = m[1];
    }
    const description = stripCDATA(
      extractTag(block, 'description')
      || extractTag(block, 'summary')
      || extractTag(block, 'content')
    );
    const pubDate = extractTag(block, 'pubDate')
      || extractTag(block, 'published')
      || extractTag(block, 'updated');
    if (!title || !url) continue;
    let isoDate = null;
    if (pubDate) {
      const t = new Date(pubDate.trim());
      if (!Number.isNaN(t.getTime())) isoDate = t.toISOString();
    }
    items.push({
      title,
      url: url.trim(),
      description: stripHtml(description),
      pubDate: isoDate,
    });
  }
  return items;
}

function extractTag(xml, tag) {
  const match = xml.match(new RegExp(`<${tag}\\b[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'i'));
  return match ? match[1] : '';
}

function stripCDATA(str) {
  return String(str || '').replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1').trim();
}

function stripHtml(s) {
  return String(s || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

function dedup(signals) {
  return [...new Map(signals.map(s => [s.url, s])).values()];
}

module.exports = { fetch, enrich };
