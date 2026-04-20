'use strict'

const path = require('path')
const fs = require('fs')
const { parseFrontmatter } = require('./parse')

const ROOT = path.join(__dirname, '..', '..')

const TYPE_DIR = {
  current: 'currents',
  circuit: 'circuits',
  practitioner: 'practitioners',
}

const BLOG_ID_PATTERN = /^[a-z0-9][a-z0-9-]*$/

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

function validateBlogMarkdown({ id, content, manifest, existingIds = [] }) {
  const { frontmatter, body } = parseFrontmatter(content || '')
  const issues = []
  const blogId = frontmatter.blogId || id

  requireField(issues, frontmatter.layout, 'layout', 'Missing layout.')
  requireField(issues, frontmatter.title, 'title', 'Missing title.')
  requireField(issues, frontmatter.date, 'date', 'Missing date.')
  requireField(issues, frontmatter.permalink, 'permalink', 'Missing permalink.')
  requireField(issues, frontmatter.abstract, 'abstract', 'Missing abstract.')
  requireField(issues, frontmatter.blogId, 'blogId', 'Missing blogId.')
  requireField(issues, frontmatter.heroImage, 'heroImage', 'Missing heroImage.')
  requireField(issues, frontmatter.heroImageAlt, 'heroImageAlt', 'Missing heroImageAlt.')
  requireField(issues, frontmatter.humanEditor, 'humanEditor', 'Missing humanEditor.')

  if (frontmatter.layout && frontmatter.layout !== 'layouts/blog-item.njk') {
    addIssue(issues, 'error', 'layout', 'Layout must be layouts/blog-item.njk.')
  }

  if (frontmatter.blogId && id && frontmatter.blogId !== id) {
    addIssue(issues, 'error', 'blogId', `blogId mismatch (${frontmatter.blogId} != ${id}).`)
  }

  if (blogId && !BLOG_ID_PATTERN.test(String(blogId))) {
    addIssue(issues, 'error', 'blogId', 'blogId must be kebab-case.')
  }

  if (frontmatter.date && Number.isNaN(new Date(frontmatter.date).getTime())) {
    addIssue(issues, 'error', 'date', 'date must be parseable.')
  }

  const expectedLang = frontmatter.lang === 'zh' ? 'zh' : 'en'
  const expectedBlogPermalink = expectedLang === 'zh' ? `/zh/blog/${blogId}/` : `/blog/${blogId}/`
  if (frontmatter.permalink && blogId && frontmatter.permalink !== expectedBlogPermalink) {
    addIssue(issues, 'error', 'permalink', `Expected permalink ${expectedBlogPermalink}.`)
  }

  if (frontmatter.lang && !['en', 'zh'].includes(frontmatter.lang)) {
    addIssue(issues, 'error', 'lang', 'Blog lang must be omitted, en, or zh.')
  }

  if (!Array.isArray(frontmatter.topics) || !frontmatter.topics.length) {
    addIssue(issues, 'error', 'topics', 'topics must contain at least one topic.')
  } else {
    for (const topic of frontmatter.topics) {
      if (!BLOG_ID_PATTERN.test(String(topic || ''))) {
        addIssue(issues, 'warning', 'topics', `Topic should be kebab-case: ${topic}.`)
      }
    }
  }

  if (!Array.isArray(frontmatter.linkedEntries) || !frontmatter.linkedEntries.length) {
    addIssue(issues, 'error', 'linkedEntries', 'linkedEntries must contain at least one currencyId.')
  } else {
    const manifestIds = new Set((manifest?.entries || []).filter(entry => entry.lang !== 'zh').map(entry => entry.currencyId))
    for (const linkedId of frontmatter.linkedEntries) {
      if (!linkedId) {
        addIssue(issues, 'error', 'linkedEntries', 'linkedEntries contains an empty id.')
      } else if (manifestIds.size && !manifestIds.has(linkedId)) {
        addIssue(issues, 'error', 'linkedEntries', `Unknown linkedEntries id: ${linkedId}.`)
      }
    }
  }

  if (!frontmatter.heroImage || !String(frontmatter.heroImage).startsWith('/assets/img/blog/')) {
    addIssue(issues, 'error', 'heroImage', 'heroImage must point to /assets/img/blog/.')
  } else {
    const imagePath = path.join(ROOT, 'src', String(frontmatter.heroImage).replace(/^\//, ''))
    if (!fs.existsSync(imagePath)) {
      addIssue(issues, 'error', 'heroImage', `Hero image file does not exist: ${frontmatter.heroImage}.`)
    }
  }

  if (!frontmatter.mediation || typeof frontmatter.mediation !== 'object') {
    addIssue(issues, 'error', 'mediation', 'Missing mediation block.')
  } else {
    requireField(issues, frontmatter.mediation.tooling, 'mediation.tooling', 'Missing mediation.tooling.')
    if (!Array.isArray(frontmatter.mediation.use) || !frontmatter.mediation.use.length) {
      addIssue(issues, 'error', 'mediation.use', 'Missing mediation.use list.')
    }
    requireField(issues, frontmatter.mediation.humanRole, 'mediation.humanRole', 'Missing mediation.humanRole.')
    requireField(issues, frontmatter.mediation.limits, 'mediation.limits', 'Missing mediation.limits.')
  }

  if (!String(body || '').trim()) {
    addIssue(issues, 'error', 'body', 'Body is empty.')
  }

  if (frontmatter.blogId && existingIds.includes(frontmatter.blogId)) {
    addIssue(issues, 'warning', 'blogId', `A published blog post already uses ${frontmatter.blogId}.`)
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
  validateBlogMarkdown,
  expectedPermalink,
}
