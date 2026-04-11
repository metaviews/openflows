'use strict'

const test = require('node:test')
const assert = require('node:assert/strict')

const bluesky = require('../scripts/sources/bluesky')
const mastodon = require('../scripts/sources/mastodon')
const twitter = require('../scripts/sources/twitter')
const practitionerSocial = require('../scripts/sources/practitioner-social')
const { applySocialProfile } = require('../server/lib/practitioner-social')
const xactionsAdapter = require('../scripts/lib/xactions-adapter')
const { loadSourceRegistry, listEnabledSources } = require('../scripts/lib/source-registry')
const fs = require('node:fs')
const os = require('node:os')
const path = require('node:path')

test('social registry entries are present and disabled by default', () => {
  const registry = loadSourceRegistry()
  const social = Object.fromEntries(registry.sources
    .filter(source => ['bluesky', 'mastodon', 'twitter', 'practitioner-social'].includes(source.id))
    .map(source => [source.id, source]))

  assert.equal(social.bluesky.module, 'bluesky')
  assert.equal(social.mastodon.module, 'mastodon')
  assert.equal(social.twitter.module, 'twitter')
  assert.equal(social['practitioner-social'].module, 'practitioner-social')
  assert.equal(social.bluesky.enabled, false)
  assert.equal(social.mastodon.enabled, false)
  assert.equal(social.twitter.enabled, false)
  assert.equal(social['practitioner-social'].enabled, false)
  assert.equal(listEnabledSources(registry).some(source => ['bluesky', 'mastodon', 'twitter', 'practitioner-social'].includes(source.id)), false)
})

test('Bluesky source normalizes keyword search and actor feed posts', async () => {
  const calls = []
  const originalFetch = globalThis.fetch
  globalThis.fetch = async (url) => {
    calls.push(String(url))
    if (String(url).includes('searchPosts')) {
      return jsonResponse({
        posts: [bskyPost({ text: 'Search found a new open source model', handle: 'alice.bsky.social', rkey: 'search1' })],
      })
    }
    return jsonResponse({
      feed: [{ post: bskyPost({ text: 'Actor posted about local inference', handle: 'bob.bsky.social', rkey: 'actor1' }) }],
    })
  }

  try {
    const signals = await bluesky.fetch(null, {
      sourceId: 'bluesky',
      queries: ['open source AI'],
      actors: ['bob.bsky.social'],
      limit: 3,
    })
    assert.equal(signals.length, 2)
    assert.equal(calls.some(url => url.includes('app.bsky.feed.searchPosts')), true)
    assert.equal(calls.some(url => url.includes('app.bsky.feed.getAuthorFeed')), true)
    assert.equal(signals[0].source, 'bluesky')
    assert.match(signals[0].url, /https:\/\/bsky\.app\/profile\/alice\.bsky\.social\/post\/search1/)
    assert.equal(signals[1].meta.reason, 'actor:bob.bsky.social')
  } finally {
    globalThis.fetch = originalFetch
  }
})

test('Mastodon source normalizes search and account statuses with stripped HTML', async () => {
  const calls = []
  const originalFetch = globalThis.fetch
  globalThis.fetch = async (url) => {
    calls.push(String(url))
    if (String(url).includes('/api/v2/search')) {
      return jsonResponse({ statuses: [mastodonStatus({ id: 's1', content: '<p>Open <strong>source</strong> AI &amp; agents</p>' })] })
    }
    if (String(url).includes('/api/v1/accounts/lookup')) {
      return jsonResponse({ id: '42', acct: 'peng@mastodon.social' })
    }
    if (String(url).includes('/api/v1/accounts/42/statuses')) {
      return jsonResponse([mastodonStatus({ id: 's2', content: '<p>Local LLM<br>release notes</p>' })])
    }
    throw new Error(`unexpected URL: ${url}`)
  }

  try {
    const signals = await mastodon.fetch(null, {
      sourceId: 'mastodon',
      instances: [{
        baseUrl: 'https://mastodon.social',
        queries: ['open source ai'],
        accounts: ['peng@mastodon.social'],
        limit: 2,
      }],
    })
    assert.equal(signals.length, 2)
    assert.equal(calls.some(url => url.includes('/api/v2/search')), true)
    assert.equal(calls.some(url => url.includes('/api/v1/accounts/lookup')), true)
    assert.equal(signals[0].summary.startsWith('Open source AI & agents'), true)
    assert.equal(signals[1].summary.startsWith('Local LLM\nrelease notes'), true)
    assert.equal(signals[1].meta.reason, 'account:peng@mastodon.social')
  } finally {
    globalThis.fetch = originalFetch
  }
})

test('Twitter source uses XActions read adapter for search and account posts', async () => {
  const used = []
  const mockAdapter = {
    READ_ONLY_METHODS: ['createBrowser', 'createPage', 'loginWithCookie', 'searchTweets', 'scrapeTweets'],
    async searchTweets(query) {
      used.push(['searchTweets', query])
      return [{ id: '1', author: 'alice', text: 'XActions search result', timestamp: '2026-04-11T00:00:00Z' }]
    },
    async scrapeTweets(handle) {
      used.push(['scrapeTweets', handle])
      return [{ id: '2', author: handle, text: 'XActions account post', timestamp: '2026-04-11T01:00:00Z' }]
    },
  }

  const signals = await twitter.fetch(null, {
    sourceId: 'twitter',
    queries: ['open source llm'],
    actors: ['peng'],
    limit: 2,
    xactions: mockAdapter,
  })

  assert.deepEqual(used, [['searchTweets', 'open source llm'], ['scrapeTweets', 'peng']])
  assert.equal(signals.length, 2)
  assert.match(signals[0].url, /https:\/\/x\.com\/alice\/status\/1/)
  assert.equal(signals[1].meta.provider, 'xactions')
})

test('XActions adapter exposes only read-intake methods', () => {
  assert.deepEqual(xactionsAdapter.READ_ONLY_METHODS, [
    'createBrowser',
    'createPage',
    'loginWithCookie',
    'searchTweets',
    'scrapeTweets',
  ])
  for (const forbidden of ['follow', 'unfollow', 'like', 'retweet', 'postTweet', 'sendDm', 'autoComment']) {
    assert.equal(xactionsAdapter.READ_ONLY_METHODS.includes(forbidden), false)
  }
  assert.deepEqual(twitter.READ_ONLY_XACTIONS_METHODS, xactionsAdapter.READ_ONLY_METHODS)
})

test('practitioner social source reads verified profiles and propagates practitioner metadata', async () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'openflows-practitioners-'))
  fs.writeFileSync(path.join(dir, 'peng.md'), `---
layout: layouts/currency-item.njk
title: "Peng Operator"
date: 2026-04-11
currencyType: "practitioner"
currencyId: peng-operator
tags:
  - currency
permalink: /currency/practitioners/peng-operator/
socialProfiles:
  - platform: bluesky
    handle: peng.bsky.social
    url: https://bsky.app/profile/peng.bsky.social
    monitor: true
    verifiedBy: human
  - platform: twitter
    handle: peng
    url: https://x.com/peng
    monitor: true
    verifiedBy: human
---

Body.
`, 'utf8')

  const originalFetch = globalThis.fetch
  globalThis.fetch = async () => jsonResponse({
    feed: [{ post: bskyPost({ text: 'Practitioner post from Bluesky', handle: 'peng.bsky.social', rkey: 'p1' }) }],
  })

  try {
    const signals = await practitionerSocial.fetch(null, {
      sourceId: 'practitioner-social',
      practitionersDir: dir,
      platforms: ['bluesky', 'twitter'],
      limitPerProfile: 1,
      xactions: {
        READ_ONLY_METHODS: xactionsAdapter.READ_ONLY_METHODS,
        async scrapeTweets(handle) {
          return [{ id: '9', author: handle, text: 'Practitioner post from XActions', timestamp: '2026-04-11T00:00:00Z' }]
        },
        async searchTweets() {
          return []
        },
      },
    })

    assert.equal(signals.length, 2)
    assert.equal(signals.every(signal => signal.source === 'practitioner-social'), true)
    assert.equal(signals.every(signal => signal.meta.practitionerId === 'peng-operator'), true)
    assert.equal(signals.every(signal => signal.meta.practitionerTitle === 'Peng Operator'), true)
  } finally {
    globalThis.fetch = originalFetch
    fs.rmSync(dir, { recursive: true, force: true })
  }
})

test('applying a practitioner social candidate updates frontmatter only through explicit save path', async () => {
  const existingContent = `---
layout: layouts/currency-item.njk
title: "Peng Operator"
date: 2026-04-11
currencyType: "practitioner"
currencyId: peng-operator
tags:
  - currency
permalink: /currency/practitioners/peng-operator/
---

Body.
`
  let saved = null
  const result = await applySocialProfile({
    currencyId: 'peng-operator',
    candidate: {
      platform: 'twitter',
      handle: 'peng',
      url: 'https://x.com/peng',
    },
    monitor: true,
    verifiedBy: 'human',
    entryReader: () => ({ entry: { currencyType: 'practitioner' }, content: existingContent }),
    entrySaver: async ({ content }) => {
      saved = content
      return { ok: true, path: 'src/currency/practitioners/peng-operator.md' }
    },
  })

  assert.equal(result.ok, true)
  assert.match(saved, /socialProfiles:/)
  assert.match(saved, /platform: twitter/)
  assert.match(saved, /handle: peng/)
  assert.match(saved, /monitor: true/)
  assert.match(saved, /verifiedBy: human/)
})

function bskyPost({ text, handle, rkey }) {
  return {
    uri: `at://did:plc:test/app.bsky.feed.post/${rkey}`,
    cid: `cid-${rkey}`,
    author: { handle, displayName: handle.split('.')[0] },
    record: {
      text,
      createdAt: '2026-04-11T00:00:00Z',
      facets: [{ features: [{ uri: 'https://example.com/source' }] }],
    },
  }
}

function mastodonStatus({ id, content }) {
  return {
    id,
    url: `https://mastodon.social/@peng/${id}`,
    created_at: '2026-04-11T00:00:00Z',
    content,
    account: { acct: 'peng@mastodon.social', display_name: 'Peng' },
    favourites_count: 3,
    reblogs_count: 1,
    tags: [],
    mentions: [],
  }
}

function jsonResponse(body, ok = true, status = 200) {
  return {
    ok,
    status,
    async json() { return body },
  }
}
