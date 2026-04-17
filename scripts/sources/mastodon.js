const DEFAULT_CONFIG = {
  instances: [
    {
      baseUrl: 'https://mastodon.social',
      queries: [],
      accounts: [],
      limit: 10,
    },
  ],
  limit: 10,
};

async function fetch(token, sourceConfig = DEFAULT_CONFIG) {
  const config = { ...DEFAULT_CONFIG, ...sourceConfig };
  const instances = normalizeInstances(config);
  const signals = [];

  for (const instance of instances) {
    const baseUrl = String(instance.baseUrl || '').replace(/\/$/, '');
    if (!baseUrl) continue;
    const instanceToken = instance.token || token;
    const limit = clampLimit(instance.limit || config.limit, 1, 40);

    for (const query of instance.queries || []) {
      const params = new URLSearchParams({
        q: query,
        type: 'statuses',
        limit: String(limit),
        resolve: String(instance.resolve || false),
      });
      const res = await apiFetch(`${baseUrl}/api/v2/search?${params}`, instanceToken);
      if (!res.ok) {
        console.warn(`  Mastodon: query "${query}" on ${baseUrl} failed (${res.status})`);
        continue;
      }
      const data = await res.json();
      for (const status of data.statuses || []) {
        const signal = normalizeStatus(status, {
          sourceId: config.sourceId || 'mastodon',
          instance: baseUrl,
          reason: `query:${query}`,
        });
        if (signal) signals.push(signal);
      }
    }

    for (const account of instance.accounts || []) {
      const acct = typeof account === 'string' ? account : account.acct;
      if (!acct) continue;
      const accountRes = await apiFetch(`${baseUrl}/api/v1/accounts/lookup?${new URLSearchParams({ acct })}`, instanceToken);
      if (!accountRes.ok) {
        console.warn(`  Mastodon: account "${acct}" lookup on ${baseUrl} failed (${accountRes.status})`);
        continue;
      }
      const accountData = await accountRes.json();
      const params = new URLSearchParams({
        limit: String(clampLimit(account.limit || limit, 1, 40)),
        exclude_replies: String(account.excludeReplies !== false),
        exclude_reblogs: String(account.excludeReblogs !== false),
      });
      const statusesRes = await apiFetch(`${baseUrl}/api/v1/accounts/${accountData.id}/statuses?${params}`, instanceToken);
      if (!statusesRes.ok) {
        console.warn(`  Mastodon: account "${acct}" statuses on ${baseUrl} failed (${statusesRes.status})`);
        continue;
      }
      const statuses = await statusesRes.json();
      for (const status of statuses || []) {
        const signal = normalizeStatus(status, {
          sourceId: config.sourceId || 'mastodon',
          instance: baseUrl,
          reason: `account:${acct}`,
          practitioner: account.practitioner,
        });
        if (signal) signals.push(signal);
      }
    }
  }

  return dedup(signals);
}

async function enrich(signal) {
  return signal;
}

async function apiFetch(url, token) {
  const headers = { Accept: 'application/json' };
  if (token) headers.Authorization = `Bearer ${token}`;
  return globalThis.fetch(url, { headers });
}

function normalizeInstances(config) {
  if (Array.isArray(config.instances) && config.instances.length) {
    return config.instances.map(instance => ({
      ...instance,
      queries: instance.queries || config.queries || [],
      accounts: instance.accounts || config.accounts || [],
      limit: instance.limit || config.limit,
    }));
  }
  return [{
    baseUrl: config.baseUrl || 'https://mastodon.social',
    queries: config.queries || [],
    accounts: config.accounts || [],
    limit: config.limit,
    resolve: config.resolve,
  }];
}

function normalizeStatus(status, { sourceId = 'mastodon', instance, reason, practitioner } = {}) {
  const text = stripHtml(status?.content || '').trim();
  if (!text) return null;
  const acct = status.account?.acct || status.account?.username || 'unknown';
  const links = extractStatusLinks(status);
  return {
    title: `@${acct}: ${text.slice(0, 90)}`,
    url: status.url || status.uri,
    summary: links.length ? `${text}\n\nLinks: ${links.join(', ')}` : text,
    source: sourceId,
    date: status.created_at || new Date().toISOString(),
    meta: {
      platform: 'mastodon',
      instance,
      handle: acct,
      displayName: status.account?.display_name || null,
      id: status.id || null,
      reason,
      practitionerId: practitioner?.id || null,
      practitionerTitle: practitioner?.title || null,
      sourceProfileUrl: practitioner?.profileUrl || null,
      links,
      favourites: status.favourites_count || 0,
      reblogs: status.reblogs_count || 0,
    },
  };
}

function extractStatusLinks(status) {
  const links = new Set();
  for (const link of status.card?.url ? [status.card.url] : []) links.add(link);
  for (const mention of status.mentions || []) if (mention.url) links.add(mention.url);
  for (const tag of status.tags || []) if (tag.url) links.add(tag.url);
  const matches = String(status.content || '').match(/https?:\/\/[^"'<> ]+/g) || [];
  matches.forEach(link => links.add(link));
  return [...links];
}

function stripHtml(html) {
  return String(html || '')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>\s*<p>/gi, '\n\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function clampLimit(value, min, max) {
  const parsed = parseInt(value, 10);
  if (!Number.isFinite(parsed)) return min;
  return Math.max(min, Math.min(max, parsed));
}

function dedup(signals) {
  return [...new Map(signals.map(signal => [signal.url, signal])).values()];
}

async function post(config, text) {
  const instances = normalizeInstances(config)
  const results = []
  for (const instance of instances) {
    const baseUrl = String(instance.baseUrl || '').replace(/\/$/, '')
    const token = instance.token || config.token
    if (!token) {
      console.warn(`  Mastodon post: no token for ${baseUrl}, skipping`)
      continue
    }
    const res = await globalThis.fetch(`${baseUrl}/api/v1/statuses`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({ status: text }),
    })
    if (!res.ok) {
      const body = await res.text()
      throw new Error(`Mastodon post failed on ${baseUrl} (${res.status}): ${body}`)
    }
    const result = await res.json()
    results.push({ ok: true, id: result.id, url: result.url })
  }
  if (!results.length) throw new Error('Mastodon post: no instances with a valid token configured')
  return results.length === 1 ? results[0] : { ok: true, results }
}

module.exports = { fetch, enrich, post, normalizeStatus, stripHtml, normalizeInstances };
