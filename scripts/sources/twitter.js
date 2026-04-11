// Twitter API v2 — requires Bearer token (Basic tier or above)
// Get your Bearer token from: https://developer.twitter.com/en/portal/dashboard
const { twitter: config } = require('../intake.config');

async function fetch(bearerToken, sourceConfig = config) {
  if (!bearerToken) {
    console.warn('  Twitter: TWITTER_BEARER_TOKEN not set, skipping.');
    return [];
  }

  const headers = { 'Authorization': `Bearer ${bearerToken}` };
  const signals = [];

  for (const query of sourceConfig.queries || []) {
    const params = new URLSearchParams({
      query,
      max_results: String(sourceConfig.maxResults),
      'tweet.fields': 'created_at,public_metrics,author_id',
      expansions: 'author_id',
      'user.fields': 'username',
    });

    const res = await globalThis.fetch(
      `https://api.twitter.com/2/tweets/search/recent?${params}`,
      { headers }
    );

    if (!res.ok) {
      console.warn(`  Twitter: query "${query}" failed (${res.status})`);
      continue;
    }
    const data = await res.json();

    // Build username map from includes
    const userMap = {};
    for (const user of data.includes?.users || []) {
      userMap[user.id] = user.username;
    }

    for (const tweet of data.data || []) {
      const metrics = tweet.public_metrics || {};
      if ((metrics.like_count || 0) < (sourceConfig.minLikes || 0)) continue;

      const handle = userMap[tweet.author_id] || 'unknown';
      signals.push({
        title: `@${handle}: ${tweet.text.slice(0, 80)}`,
        url: `https://x.com/${handle}/status/${tweet.id}`,
        summary: tweet.text,
        source: sourceConfig.sourceId || 'twitter',
        date: tweet.created_at,
        meta: { handle, likes: metrics.like_count, retweets: metrics.retweet_count },
      });
    }
  }

  return dedup(signals);
}

// Tweet text is the full content — no enrichment needed
async function enrich(signal) {
  return signal;
}

function dedup(signals) {
  return [...new Map(signals.map(s => [s.url, s])).values()];
}

module.exports = { fetch, enrich };
