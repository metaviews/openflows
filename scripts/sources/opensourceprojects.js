const { opensourceprojects: config } = require('../intake.config');

const FEED_URL = 'https://opensourceprojects.dev/rss';

async function fetch(_token, sourceConfig = config) {
  const res = await globalThis.fetch(FEED_URL, {
    headers: { 'Accept': 'application/rss+xml, application/xml, text/xml' },
  });

  if (!res.ok) {
    throw new Error(`opensourceprojects RSS fetch failed: ${res.status}`);
  }

  const xml = await res.text();
  const items = parseRSS(xml);

  return items
    .filter(item => item.title && item.url)
    .filter(item => !sourceConfig.minStars || (item.stars || 0) >= sourceConfig.minStars)
    .slice(0, sourceConfig.limit)
    .map(item => ({
      title: item.title,
      url: item.url,
      summary: item.description || '',
      source: sourceConfig.sourceId || 'opensourceprojects',
      date: item.pubDate || new Date().toISOString(),
      meta: { stars: item.stars },
    }));
}

async function enrich(signal) {
  // No additional enrichment needed — RSS provides sufficient signal for screening
  return signal;
}

function parseRSS(xml) {
  const items = [];
  const itemBlocks = xml.match(/<item>([\s\S]*?)<\/item>/g) || [];

  for (const block of itemBlocks) {
    const title = extractTag(block, 'title');
    const link = extractTag(block, 'link');
    const description = extractTag(block, 'description');
    const pubDate = extractTag(block, 'pubDate');

    if (title && link) {
      items.push({
        title: stripCDATA(title),
        url: stripCDATA(link).trim(),
        description: stripCDATA(description),
        pubDate: pubDate ? new Date(pubDate).toISOString() : null,
        stars: null,
      });
    }
  }

  return items;
}

function extractTag(xml, tag) {
  const match = xml.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`));
  return match ? match[1] : '';
}

function stripCDATA(str) {
  return str.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1').trim();
}

module.exports = { fetch, enrich };
