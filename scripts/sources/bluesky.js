const DEFAULT_CONFIG = {
  service: 'https://public.api.bsky.app',
  queries: [],
  actors: [],
  limit: 10,
};

async function fetch(_token, sourceConfig = DEFAULT_CONFIG) {
  const config = { ...DEFAULT_CONFIG, ...sourceConfig };
  const service = String(config.service || DEFAULT_CONFIG.service).replace(/\/$/, '');
  const limit = clampLimit(config.limit, 1, 100);
  const signals = [];

  for (const query of config.queries || []) {
    const params = new URLSearchParams({
      q: query,
      sort: config.sort || 'latest',
      limit: String(limit),
    });
    const res = await globalThis.fetch(`${service}/xrpc/app.bsky.feed.searchPosts?${params}`);
    if (!res.ok) {
      console.warn(`  Bluesky: query "${query}" failed (${res.status})`);
      continue;
    }
    const data = await res.json();
    for (const post of data.posts || []) {
      const signal = normalizePost(post, {
        sourceId: config.sourceId || 'bluesky',
        reason: `query:${query}`,
      });
      if (signal) signals.push(signal);
    }
  }

  for (const actor of config.actors || []) {
    const handle = typeof actor === 'string' ? actor : actor.handle;
    if (!handle) continue;
    const params = new URLSearchParams({
      actor: handle,
      limit: String(clampLimit(actor.limit || limit, 1, 100)),
      filter: actor.filter || config.actorFilter || 'posts_no_replies',
    });
    const res = await globalThis.fetch(`${service}/xrpc/app.bsky.feed.getAuthorFeed?${params}`);
    if (!res.ok) {
      console.warn(`  Bluesky: actor "${handle}" failed (${res.status})`);
      continue;
    }
    const data = await res.json();
    for (const item of data.feed || []) {
      const signal = normalizePost(item.post, {
        sourceId: config.sourceId || 'bluesky',
        reason: `actor:${handle}`,
        practitioner: actor.practitioner,
      });
      if (signal) signals.push(signal);
    }
  }

  return dedup(signals);
}

async function enrich(signal) {
  return signal;
}

function normalizePost(post, { sourceId = 'bluesky', reason, practitioner } = {}) {
  if (!post?.record?.text) return null;
  const handle = post.author?.handle || 'unknown';
  const url = postUrl(post, handle);
  const text = post.record.text.trim();
  const links = extractBlueskyLinks(post);
  return {
    title: `@${handle}: ${text.slice(0, 90)}`,
    url,
    summary: links.length ? `${text}\n\nLinks: ${links.join(', ')}` : text,
    source: sourceId,
    date: post.record.createdAt || post.indexedAt || new Date().toISOString(),
    meta: {
      platform: 'bluesky',
      handle,
      displayName: post.author?.displayName || null,
      uri: post.uri || null,
      cid: post.cid || null,
      reason,
      practitionerId: practitioner?.id || null,
      practitionerTitle: practitioner?.title || null,
      sourceProfileUrl: practitioner?.profileUrl || null,
      links,
    },
  };
}

function postUrl(post, handle) {
  const rkey = String(post?.uri || '').split('/').pop();
  return rkey ? `https://bsky.app/profile/${handle}/post/${rkey}` : `https://bsky.app/profile/${handle}`;
}

function extractBlueskyLinks(post) {
  const links = new Set();
  const embed = post.embed || {};
  if (embed.external?.uri) links.add(embed.external.uri);
  if (embed.record?.value?.embed?.external?.uri) links.add(embed.record.value.embed.external.uri);
  for (const facet of post.record?.facets || []) {
    for (const feature of facet.features || []) {
      if (feature.uri) links.add(feature.uri);
    }
  }
  return [...links];
}

function clampLimit(value, min, max) {
  const parsed = parseInt(value, 10);
  if (!Number.isFinite(parsed)) return min;
  return Math.max(min, Math.min(max, parsed));
}

function dedup(signals) {
  return [...new Map(signals.map(signal => [signal.url, signal])).values()];
}

module.exports = { fetch, enrich, normalizePost, extractBlueskyLinks };
