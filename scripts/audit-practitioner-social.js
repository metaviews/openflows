// Audit practitioner entries for verified social profile metadata.
//
// Writes audit/PRACTITIONER_SOCIAL.md. The report may include candidate profile
// snippets from existing entry links and optional Brave results, but it never
// edits practitioner frontmatter automatically.

const { existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } = require('fs');
const { join, relative } = require('path');
const { parseFrontmatter } = require('../server/lib/parse');
const { loadEnv } = require('./lib/openrouter');

loadEnv();

const ROOT = join(__dirname, '..');
const PRACTITIONERS_DIR = join(ROOT, 'src', 'currency', 'practitioners');
const OUT_PATH = join(ROOT, 'audit', 'PRACTITIONER_SOCIAL.md');
const BRAVE_API_KEY = process.env.BRAVE_API_KEY;

async function main() {
  const entries = loadPractitioners();
  const includeBrave = process.argv.includes('--brave') && !!BRAVE_API_KEY;
  const report = [];

  for (const entry of entries) {
    const existing = normalizeProfiles(entry.frontmatter.socialProfiles || []);
    const bodyCandidates = extractCandidates(entry.body);
    const braveCandidates = includeBrave ? await searchBrave(entry.frontmatter.title) : [];
    report.push({ entry, existing, candidates: mergeCandidates(bodyCandidates, braveCandidates) });
  }

  writeReport(report, { includeBrave });
  console.log(`Practitioner social audit written to ${relative(ROOT, OUT_PATH)}`);
}

function loadPractitioners() {
  return walkMarkdown(PRACTITIONERS_DIR)
    .map(file => {
      const content = readFileSync(file, 'utf8');
      const { frontmatter, body } = parseFrontmatter(content);
      return { file, frontmatter, body };
    })
    .filter(entry => entry.frontmatter.currencyType === 'practitioner')
    .sort((a, b) => String(a.frontmatter.title || '').localeCompare(String(b.frontmatter.title || '')));
}

function extractCandidates(text) {
  const urls = String(text || '').match(/https?:\/\/[^\s)\]">]+/g) || [];
  return urls.map(candidateFromUrl).filter(Boolean);
}

async function searchBrave(name) {
  const query = `${name} (site:x.com OR site:bsky.app OR site:mastodon.social)`;
  const url = `https://api.search.brave.com/res/v1/web/search?q=${encodeURIComponent(query)}&count=5`;
  try {
    const res = await globalThis.fetch(url, {
      headers: {
        'X-Subscription-Token': BRAVE_API_KEY,
        Accept: 'application/json',
      },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return (data.web?.results || []).map(result => candidateFromUrl(result.url, result.title)).filter(Boolean);
  } catch {
    return [];
  }
}

function candidateFromUrl(rawUrl, label = '') {
  let url;
  try {
    url = new URL(rawUrl);
  } catch {
    return null;
  }

  const host = url.hostname.replace(/^www\./, '');
  if (host === 'x.com' || host === 'twitter.com') {
    const handle = url.pathname.split('/').filter(Boolean)[0];
    if (!handle || ['i', 'search', 'intent'].includes(handle)) return null;
    return { platform: 'twitter', handle, url: `https://x.com/${handle}`, label };
  }

  if (host === 'bsky.app' && url.pathname.startsWith('/profile/')) {
    const handle = url.pathname.split('/').filter(Boolean)[1];
    if (!handle) return null;
    return { platform: 'bluesky', handle, url: `https://bsky.app/profile/${handle}`, label };
  }

  if (url.pathname.includes('/@')) {
    const handle = url.pathname.split('/').find(part => part.startsWith('@'))?.slice(1);
    if (!handle) return null;
    return {
      platform: 'mastodon',
      handle: `${handle}@${host}`,
      instance: `${url.protocol}//${host}`,
      url: `${url.protocol}//${host}/@${handle}`,
      label,
    };
  }

  return null;
}

function normalizeProfiles(profiles) {
  if (!Array.isArray(profiles)) return [];
  return profiles.map(profile => ({
    platform: profile.platform,
    handle: profile.handle,
    url: profile.url,
    instance: profile.instance,
    monitor: profile.monitor !== false,
    verifiedBy: profile.verifiedBy || null,
  }));
}

function mergeCandidates(...groups) {
  const byKey = new Map();
  for (const candidate of groups.flat()) {
    const key = `${candidate.platform}:${candidate.handle || candidate.url}`;
    if (!byKey.has(key)) byKey.set(key, candidate);
  }
  return [...byKey.values()];
}

function writeReport(items, { includeBrave }) {
  const out = [
    '# Practitioner Social Profile Audit',
    '',
    `Generated: ${new Date().toISOString()}`,
    '',
    'This report proposes candidate social profile metadata for human review. It does not change practitioner entries.',
    '',
    includeBrave
      ? 'Brave lookup was enabled for this run.'
      : 'Brave lookup was not used. Run `node scripts/audit-practitioner-social.js --brave` with `BRAVE_API_KEY` to include web search candidates.',
    '',
  ];

  const missing = items.filter(item => item.existing.length === 0);
  out.push(`Summary: ${items.length} practitioners checked; ${missing.length} have no socialProfiles metadata.`, '');

  for (const item of items) {
    const id = item.entry.frontmatter.currencyId;
    out.push(`## ${item.entry.frontmatter.title} (${id})`, '');
    out.push(`File: \`${relative(ROOT, item.entry.file).replace(/\\/g, '/')}\``, '');

    if (item.existing.length) {
      out.push('Existing socialProfiles:', '');
      out.push('```yaml');
      out.push(formatProfiles(item.existing));
      out.push('```', '');
    } else {
      out.push('Existing socialProfiles: none', '');
    }

    if (item.candidates.length) {
      out.push('Candidate snippet for review:', '');
      out.push('```yaml');
      out.push(formatProfiles(item.candidates.map(candidate => ({
        ...candidate,
        monitor: false,
        verifiedBy: 'pending-human-review',
      }))));
      out.push('```', '');
    } else {
      out.push('Candidate snippet for review: none found from local entry links.', '');
    }
  }

  const auditDir = join(ROOT, 'audit');
  if (!existsSync(auditDir)) mkdirSync(auditDir, { recursive: true });
  writeFileSync(OUT_PATH, `${out.join('\n')}\n`, 'utf8');
}

function formatProfiles(profiles) {
  return [
    'socialProfiles:',
    ...profiles.flatMap(profile => {
      const lines = [
        `  - platform: ${profile.platform}`,
        `    handle: ${profile.handle}`,
      ];
      if (profile.instance) lines.push(`    instance: ${profile.instance}`);
      if (profile.url) lines.push(`    url: ${profile.url}`);
      lines.push(`    monitor: ${profile.monitor === true ? 'true' : 'false'}`);
      if (profile.verifiedBy) lines.push(`    verifiedBy: ${profile.verifiedBy}`);
      return lines;
    }),
  ].join('\n');
}

function walkMarkdown(dir, acc = []) {
  for (const name of readdirSync(dir)) {
    const fullPath = join(dir, name);
    const stat = statSync(fullPath);
    if (stat.isDirectory()) walkMarkdown(fullPath, acc);
    else if (name.endsWith('.md')) acc.push(fullPath);
  }
  return acc;
}

main().catch(err => {
  console.error('Fatal:', err.message);
  process.exit(1);
});
