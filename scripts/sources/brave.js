const { brave: config } = require('../intake.config');

async function fetch(apiKey, sourceConfig = config) {
  if (!apiKey) {
    console.warn('  Brave: BRAVE_API_KEY not set, skipping.');
    return [];
  }

  const signals = [];

  for (const query of sourceConfig.queries || []) {
    // freshness=pm = past month
    const url = `https://api.search.brave.com/res/v1/web/search?q=${encodeURIComponent(query)}&count=${sourceConfig.count}&freshness=pm`;
    const res = await globalThis.fetch(url, {
      headers: {
        'X-Subscription-Token': apiKey,
        'Accept': 'application/json',
      },
    });

    if (!res.ok) {
      console.warn(`  Brave: query "${query}" failed (${res.status})`);
      continue;
    }
    const data = await res.json();

    for (const result of data.web?.results || []) {
      signals.push({
        title: result.title,
        url: result.url,
        summary: result.description || '',
        source: sourceConfig.sourceId || 'brave',
        date: result.page_age || new Date().toISOString(),
        meta: {},
      });
    }
  }

  return dedup(signals);
}

// Brave returns summaries directly — no further enrichment
async function enrich(signal) {
  return signal;
}

function dedup(signals) {
  return [...new Map(signals.map(s => [s.url, s])).values()];
}

module.exports = { fetch, enrich };
