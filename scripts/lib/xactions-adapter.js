'use strict'

const READ_ONLY_METHODS = Object.freeze(['createBrowser', 'createPage', 'loginWithCookie', 'searchTweets', 'scrapeTweets'])

async function searchTweets(query, options = {}) {
  return withReadOnlySession(options, async ({ scrapers, page }) => {
    assertReadMethod(scrapers, 'searchTweets')
    return scrapers.searchTweets(page, query, {
      limit: options.limit,
      filter: options.filter || 'latest',
    })
  })
}

async function scrapeTweets(username, options = {}) {
  return withReadOnlySession(options, async ({ scrapers, page }) => {
    assertReadMethod(scrapers, 'scrapeTweets')
    return scrapers.scrapeTweets(page, username, {
      limit: options.limit,
      includeReplies: !!options.includeReplies,
    })
  })
}

async function withReadOnlySession(options, fn) {
  const importer = options.importer || ((specifier) => import(specifier))
  let scrapers
  try {
    scrapers = await importer('xactions/scrapers/twitter')
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
  buildBrowserOptions,
}
