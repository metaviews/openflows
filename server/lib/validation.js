'use strict'

const { parseFrontmatter } = require('./parse')

const TYPE_DIR = {
  current: 'currents',
  circuit: 'circuits',
  practitioner: 'practitioners',
}

function validateCurrencyMarkdown({ id, lang = 'en', content, manifest, existingType, strictAbstract = false }) {
  const { frontmatter, body } = parseFrontmatter(content || '')
  const issues = []
  const expectedLang = lang === 'zh' ? 'zh' : 'en'
  const currencyType = frontmatter.currencyType || existingType

  requireField(issues, frontmatter.layout, 'layout', 'Missing layout.')
  requireField(issues, frontmatter.title, 'title', 'Missing title.')
  requireField(issues, frontmatter.date, 'date', 'Missing date.')
  requireField(issues, frontmatter.currencyId, 'currencyId', 'Missing currencyId.')
  requireField(issues, frontmatter.currencyType, 'currencyType', 'Missing currencyType.')
  requireField(issues, frontmatter.permalink, 'permalink', 'Missing permalink.')

  if (frontmatter.layout && frontmatter.layout !== 'layouts/currency-item.njk') {
    addIssue(issues, 'error', 'layout', 'Layout must be layouts/currency-item.njk.')
  }

  if (frontmatter.currencyId && id && frontmatter.currencyId !== id) {
    addIssue(issues, 'error', 'currencyId', `currencyId mismatch (${frontmatter.currencyId} != ${id}).`)
  }

  if (frontmatter.currencyType && !TYPE_DIR[frontmatter.currencyType]) {
    addIssue(issues, 'error', 'currencyType', `Invalid currencyType: ${frontmatter.currencyType}.`)
  }

  if (existingType && frontmatter.currencyType && frontmatter.currencyType !== existingType) {
    addIssue(issues, 'error', 'currencyType', `currencyType mismatch (${frontmatter.currencyType} != ${existingType}).`)
  }

  if (expectedLang === 'zh' && frontmatter.lang !== 'zh') {
    addIssue(issues, 'error', 'lang', 'Chinese entries must include lang: zh.')
  }
  if (expectedLang === 'en' && frontmatter.lang && frontmatter.lang !== 'en') {
    addIssue(issues, 'error', 'lang', `Unexpected lang for English entry: ${frontmatter.lang}.`)
  }

  if (!Array.isArray(frontmatter.tags) || !frontmatter.tags.includes('currency')) {
    addIssue(issues, 'error', 'tags', 'tags must include currency.')
  }

  if (!String(body || '').trim()) {
    addIssue(issues, 'error', 'body', 'Body is empty.')
  }

  if (!String(frontmatter.abstract || '').trim()) {
    addIssue(issues, strictAbstract ? 'error' : 'warning', 'abstract', 'Missing abstract.')
  }

  if (frontmatter.permalink && currencyType && id) {
    const expected = expectedPermalink({ id, lang: expectedLang, currencyType })
    if (expected && frontmatter.permalink !== expected) {
      addIssue(issues, 'error', 'permalink', `Expected permalink ${expected}.`)
    }
  }

  const manifestIds = new Set((manifest?.entries || []).map(entry => entry.currencyId))
  if (Array.isArray(frontmatter.links)) {
    for (const link of frontmatter.links) {
      if (!link?.id) {
        addIssue(issues, 'error', 'links', 'A link is missing id.')
      } else if (manifestIds.size && !manifestIds.has(link.id)) {
        addIssue(issues, 'error', 'links', `Unknown links.id: ${link.id}.`)
      }
      if (!link?.relation) {
        addIssue(issues, 'warning', 'links', `Link ${link?.id || '(missing id)'} is missing relation.`)
      }
    }
  } else if (frontmatter.links !== undefined) {
    addIssue(issues, 'error', 'links', 'links must be a list when present.')
  }

  return {
    ok: !issues.some(issue => issue.severity === 'error'),
    frontmatter,
    body,
    issues,
    counts: {
      error: issues.filter(issue => issue.severity === 'error').length,
      warning: issues.filter(issue => issue.severity === 'warning').length,
    },
  }
}

function expectedPermalink({ id, lang = 'en', currencyType }) {
  const dir = TYPE_DIR[currencyType]
  if (!dir) return null
  return lang === 'zh'
    ? `/zh/currency/${dir}/${id}/`
    : `/currency/${dir}/${id}/`
}

function requireField(issues, value, field, message) {
  if (!value) addIssue(issues, 'error', field, message)
}

function addIssue(issues, severity, field, message) {
  issues.push({ severity, field, message })
}

module.exports = {
  TYPE_DIR,
  validateCurrencyMarkdown,
  expectedPermalink,
}
