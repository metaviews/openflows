const xactions = require('../lib/xactions-adapter');

const DEFAULT_CONFIG = {
  queries: [],
  actors: [],
  limit: 10,
  filter: 'latest',
  headless: true,
};

async function fetch(_token, sourceConfig = DEFAULT_CONFIG) {
  const config = { ...DEFAULT_CONFIG, ...sourceConfig };
  const adapter = config.xactions || xactions;
  const limit = clampLimit(config.limit, 1, 100);
  const signals = [];

  for (const query of config.queries || []) {
    try {
      const tweets = await adapter.searchTweets(query, {
        limit,
        filter: config.filter || 'latest',
        headless: config.headless,
        userDataDir: config.userDataDir,
        authToken: config.authToken,
        browserOptions: config.browserOptions,
      });
      for (const tweet of tweets || []) {
        const signal = normalizeTweet(tweet, {
          sourceId: config.sourceId || 'twitter',
          reason: `query:${query}`,
        });
        if (signal) signals.push(signal);
      }
    } catch (err) {
      console.warn(`  XActions: query "${query}" failed (${err.message})`);
    }
  }

  for (const actor of config.actors || []) {
    const handle = typeof actor === 'string' ? actor : actor.handle;
    if (!handle) continue;
    try {
      const tweets = await adapter.scrapeTweets(handle.replace(/^@/, ''), {
        limit: clampLimit(actor.limit || limit, 1, 100),
        includeReplies: !!actor.includeReplies,
        headless: config.headless,
        userDataDir: config.userDataDir,
        authToken: config.authToken,
        browserOptions: config.browserOptions,
      });
      for (const tweet of tweets || []) {
        const signal = normalizeTweet(tweet, {
          sourceId: config.sourceId || 'twitter',
          reason: `actor:${handle}`,
        });
        if (signal) signals.push(signal);
      }
    } catch (err) {
      console.warn(`  XActions: actor "${handle}" failed (${err.message})`);
    }
  }

  return dedup(signals);
}

async function enrich(signal) {
  return signal;
}

function normalizeTweet(tweet, { sourceId = 'twitter', reason } = {}) {
  const text = String(tweet?.text || tweet?.content || '').trim();
  if (!text) return null;
  const handle = (tweet.author || tweet.username || tweet.handle || 'unknown').replace(/^@/, '');
  const url = normalizeTweetUrl(tweet, handle);
  return {
    title: `@${handle}: ${text.slice(0, 90)}`,
    url,
    summary: text,
    source: sourceId,
    date: tweet.timestamp || tweet.time || tweet.created_at || new Date().toISOString(),
    meta: {
      platform: 'x-twitter',
      provider: 'xactions',
      handle,
      id: tweet.id || null,
      reason,
      likes: tweet.likes || 0,
      retweets: tweet.retweets || 0,
      replies: tweet.replies || 0,
    },
  };
}

function normalizeTweetUrl(tweet, handle) {
  if (tweet?.url) return String(tweet.url).replace('https://twitter.com/', 'https://x.com/');
  if (tweet?.link) return String(tweet.link).replace('https://twitter.com/', 'https://x.com/');
  if (tweet?.id && handle) return `https://x.com/${handle}/status/${tweet.id}`;
  return `https://x.com/${handle}`;
}

function clampLimit(value, min, max) {
  const parsed = parseInt(value, 10);
  if (!Number.isFinite(parsed)) return min;
  return Math.max(min, Math.min(max, parsed));
}

function dedup(signals) {
  return [...new Map(signals.map(signal => [signal.url, signal])).values()];
}

module.exports = {
  fetch,
  enrich,
  normalizeTweet,
  READ_ONLY_XACTIONS_METHODS: xactions.READ_ONLY_METHODS,
};
