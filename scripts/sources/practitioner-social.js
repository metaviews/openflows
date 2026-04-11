const { readFileSync, readdirSync, statSync } = require('fs');
const { join } = require('path');
const { parseFrontmatter } = require('../../server/lib/parse');

const bluesky = require('./bluesky');
const mastodon = require('./mastodon');
const twitter = require('./twitter');

const DEFAULT_CONFIG = {
  platforms: ['bluesky', 'mastodon', 'twitter'],
  limitPerProfile: 5,
};

async function fetch(token, sourceConfig = DEFAULT_CONFIG) {
  const config = { ...DEFAULT_CONFIG, ...sourceConfig };
  const practitioners = loadPractitionerProfiles(config.practitionersDir);
  const platforms = new Set(config.platforms || DEFAULT_CONFIG.platforms);
  const limit = clampLimit(config.limitPerProfile, 1, 25);
  const signals = [];

  const blueskyActors = [];
  const twitterActors = [];
  const mastodonInstances = new Map();

  for (const practitioner of practitioners) {
    for (const profile of practitioner.socialProfiles) {
      if (profile.monitor === false) continue;
      if (!platforms.has(profile.platform)) continue;

      const practitionerMeta = {
        id: practitioner.currencyId,
        title: practitioner.title,
        profileUrl: profile.url || profileUrl(profile),
      };

      if (profile.platform === 'bluesky' && profile.handle) {
        blueskyActors.push({ handle: profile.handle, limit, practitioner: practitionerMeta });
      } else if (profile.platform === 'twitter' && profile.handle) {
        twitterActors.push({ handle: profile.handle, limit, practitioner: practitionerMeta });
      } else if (profile.platform === 'mastodon' && profile.handle) {
        const instance = profile.instance || mastodonInstanceFromHandle(profile.handle) || mastodonInstanceFromUrl(profile.url);
        if (!instance) continue;
        const current = mastodonInstances.get(instance) || {
          baseUrl: instance,
          queries: [],
          accounts: [],
          limit,
        };
        current.accounts.push({
          acct: profile.handle,
          limit,
          practitioner: practitionerMeta,
        });
        mastodonInstances.set(instance, current);
      }
    }
  }

  if (blueskyActors.length) {
    signals.push(...await bluesky.fetch(undefined, {
      sourceId: config.sourceId || 'practitioner-social',
      service: config.blueskyService,
      actors: blueskyActors,
      limit,
    }));
  }

  if (mastodonInstances.size) {
    signals.push(...await mastodon.fetch(token || process.env.MASTODON_ACCESS_TOKEN, {
      sourceId: config.sourceId || 'practitioner-social',
      instances: [...mastodonInstances.values()],
      limit,
    }));
  }

  if (twitterActors.length) {
    signals.push(...await twitter.fetch(undefined, {
      sourceId: config.sourceId || 'practitioner-social',
      actors: twitterActors,
      limit,
      headless: config.headless,
      userDataDir: config.userDataDir,
      authToken: config.authToken,
      browserOptions: config.browserOptions,
      xactions: config.xactions,
    }));
  }

  return dedup(signals);
}

async function enrich(signal) {
  return signal;
}

function loadPractitionerProfiles(practitionersDir = join(__dirname, '..', '..', 'src', 'currency', 'practitioners')) {
  const practitioners = [];
  for (const file of walkMarkdown(practitionersDir)) {
    const content = readFileSync(file, 'utf8');
    const { frontmatter } = parseFrontmatter(content);
    if (frontmatter.currencyType !== 'practitioner') continue;
    const socialProfiles = normalizeSocialProfiles(frontmatter.socialProfiles || []);
    if (!socialProfiles.length) continue;
    practitioners.push({
      currencyId: frontmatter.currencyId,
      title: frontmatter.title,
      socialProfiles,
      path: file,
    });
  }
  return practitioners;
}

function normalizeSocialProfiles(profiles) {
  if (!Array.isArray(profiles)) return [];
  return profiles
    .map(profile => ({
      platform: normalizePlatform(profile.platform),
      handle: String(profile.handle || '').replace(/^@/, '').trim(),
      url: String(profile.url || '').trim(),
      instance: profile.instance ? String(profile.instance).replace(/\/$/, '') : undefined,
      monitor: profile.monitor !== false,
      verifiedBy: profile.verifiedBy || null,
    }))
    .filter(profile => profile.platform && (profile.handle || profile.url));
}

function normalizePlatform(platform) {
  const value = String(platform || '').toLowerCase();
  if (value === 'x' || value === 'x-twitter') return 'twitter';
  if (value === 'bsky') return 'bluesky';
  if (['twitter', 'bluesky', 'mastodon'].includes(value)) return value;
  return null;
}

function profileUrl(profile) {
  if (profile.platform === 'bluesky') return `https://bsky.app/profile/${profile.handle}`;
  if (profile.platform === 'twitter') return `https://x.com/${profile.handle}`;
  if (profile.platform === 'mastodon') {
    const instance = profile.instance || mastodonInstanceFromHandle(profile.handle);
    const user = String(profile.handle || '').split('@')[0];
    return instance && user ? `${instance}/@${user}` : profile.url;
  }
  return profile.url;
}

function mastodonInstanceFromHandle(handle) {
  const parts = String(handle || '').split('@').filter(Boolean);
  return parts.length >= 2 ? `https://${parts[parts.length - 1]}` : null;
}

function mastodonInstanceFromUrl(url) {
  try {
    const parsed = new URL(url);
    return `${parsed.protocol}//${parsed.host}`;
  } catch {
    return null;
  }
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
  loadPractitionerProfiles,
  normalizeSocialProfiles,
  profileUrl,
};
