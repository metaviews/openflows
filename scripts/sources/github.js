const { github: config } = require('../intake.config');

async function fetch(token) {
  const headers = { 'Accept': 'application/vnd.github.v3+json' };
  if (token) headers['Authorization'] = `token ${token}`;

  const signals = [];

  for (const query of config.queries) {
    const url = `https://api.github.com/search/repositories?q=${encodeURIComponent(query)}&sort=updated&order=desc&per_page=${config.perPage}`;
    const res = await globalThis.fetch(url, { headers });
    if (!res.ok) {
      console.warn(`  GitHub: query "${query}" failed (${res.status})`);
      continue;
    }
    const data = await res.json();

    for (const repo of data.items || []) {
      if (repo.stargazers_count < config.minStars) continue;
      signals.push({
        title: repo.name,
        url: repo.html_url,
        summary: [repo.description, repo.topics?.join(', ')].filter(Boolean).join(' | '),
        source: 'github',
        date: repo.updated_at,
        meta: {
          fullName: repo.full_name,
          stars: repo.stargazers_count,
          topics: repo.topics || [],
          language: repo.language,
        },
      });
    }
  }

  return dedup(signals);
}

async function enrich(signal, token) {
  const headers = { 'Accept': 'application/vnd.github.v3+json' };
  if (token) headers['Authorization'] = `token ${token}`;
  const [owner, repo] = signal.meta.fullName.split('/');

  try {
    const res = await globalThis.fetch(
      `https://api.github.com/repos/${owner}/${repo}/readme`,
      { headers }
    );
    if (!res.ok) return signal;
    const data = await res.json();
    signal.enriched = Buffer.from(data.content, 'base64').toString('utf8').slice(0, 2000);
  } catch {}

  return signal;
}

function dedup(signals) {
  return [...new Map(signals.map(s => [s.url, s])).values()];
}

module.exports = { fetch, enrich };
