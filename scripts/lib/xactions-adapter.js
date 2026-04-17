'use strict'

const { pathToFileURL } = require('url')
const path = require('path')

const READ_ONLY_METHODS = Object.freeze(['createBrowser', 'createPage', 'loginWithCookie', 'searchTweets', 'scrapeTweets'])

async function searchTweets(query, options = {}) {
  return withBrowserSession(options, async ({ scrapers, page }) => {
    assertReadMethod(scrapers, 'searchTweets')
    return scrapers.searchTweets(page, query, {
      limit: options.limit,
      filter: options.filter || 'latest',
    })
  })
}

async function scrapeTweets(username, options = {}) {
  return withBrowserSession(options, async ({ scrapers, page }) => {
    assertReadMethod(scrapers, 'scrapeTweets')
    return scrapers.scrapeTweets(page, username, {
      limit: options.limit,
      includeReplies: !!options.includeReplies,
    })
  })
}

async function postTweet(text, options = {}) {
  return withBrowserSession(options, async ({ page }) => {
    const composerPath = path.join(xactionsRoot(), 'src', 'postComposer.js')
    const { postTweet: doPost } = await import(pathToFileURL(composerPath).href)
    return doPost(page, text, {
      replyTo: options.replyTo || null,
      media: options.media || null,
    })
  })
}

// Resolve xactions package root by walking up from this file — avoids
// relying on the package exports map, which differs across versions.
function xactionsRoot() {
  return path.resolve(__dirname, '..', '..', 'node_modules', 'xactions')
}

async function withBrowserSession(options, fn) {
  let scrapers
  try {
    // Import via file URL to bypass exports map — works on all xactions versions.
    const scraperPath = path.join(xactionsRoot(), 'src', 'scrapers', 'twitter', 'index.js')
    scrapers = options.importer
      ? await options.importer('xactions/scrapers/twitter')
      : await import(pathToFileURL(scraperPath).href)
  } catch (err) {
    throw new Error(`XActions Twitter scraper import failed: ${err.message}`)
  }

  assertReadMethod(scrapers, 'createBrowser')
  assertReadMethod(scrapers, 'createPage')

  const browser = await scrapers.createBrowser(buildBrowserOptions(options))
  let page
  try {
    page = await scrapers.createPage(browser)
    const authToken = options.authToken || process.env.XACTIONS_AUTH_TOKEN || process.env.X_AUTH_TOKEN
    if (authToken && typeof scrapers.loginWithCookie === 'function') {
      await scrapers.loginWithCookie(page, authToken)
    }
    return await fn({ scrapers, page })
  } finally {
    if (browser?.close) await browser.close().catch(() => {})
  }
}

// Keep old name for any external callers
const withReadOnlySession = withBrowserSession

function buildBrowserOptions(options = {}) {
  const headless = options.headless ?? (process.env.XACTIONS_HEADLESS !== 'false')
  const browserOptions = {
    ...(options.browserOptions || {}),
    headless,
  }
  const userDataDir = options.userDataDir || process.env.XACTIONS_USER_DATA_DIR
  if (userDataDir) browserOptions.userDataDir = userDataDir
  if (Array.isArray(options.args)) browserOptions.args = options.args
  return browserOptions
}

function assertReadMethod(scrapers, method) {
  if (!READ_ONLY_METHODS.includes(method)) throw new Error(`XActions method not allowed: ${method}`)
  if (typeof scrapers[method] !== 'function') throw new Error(`XActions method unavailable: ${method}`)
}

module.exports = {
  READ_ONLY_METHODS,
  searchTweets,
  scrapeTweets,
  postTweet,
  buildBrowserOptions,
}
