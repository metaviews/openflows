'use strict'

const { parseFrontmatter } = require('./parse')
const { validateCurrencyMarkdown, validateBlogMarkdown } = require('./validation')

const ALLOWED_TYPES = new Set(['current', 'circuit', 'practitioner', 'blog'])
const CURRENT_SECTIONS = [
  '### Signal',
  '### Context',
  '### Relevance',
  '### Current State',
  '### Open Questions',
  '### Connections',
]

function normalizeDraftContent(content) {
  if (typeof content !== 'string') return ''
  return content
    .replace(/^\uFEFF/, '')
    .replace(/\r\n/g, '\n')
    .replace(/<think>[\s\S]*?<\/think>/g, '')
    .replace(/<\/think>/g, '')
    .replace(/^```[^\n]*\n/, '')
    .replace(/\n```\s*$/, '')
    .trimStart()
}

function inspectDraftContent({ id, lang = 'en', content, type, title, abstract, manifest, strictSections = true }) {
  const normalizedId = typeof id === 'string' ? id.trim() : ''
  const normalizedContent = normalizeDraftContent(content)
  const issues = []

  if (!normalizedId) issues.push('missing id')
  if (!normalizedContent.trim()) issues.push('empty content')

  const { frontmatter, body } = parseFrontmatter(normalizedContent)
  const draftType = frontmatter.currencyType || frontmatter.type || type || (frontmatter.blogId ? 'blog' : null)

  if (!draftType) {
    issues.push('missing currencyType')
  } else if (!ALLOWED_TYPES.has(draftType)) {
    issues.push(`invalid currencyType (${draftType})`)
  }

  if (draftType === 'blog') {
    const validation = validateBlogMarkdown({ id: normalizedId, content: normalizedContent, manifest })
    return {
      issues: validation.issues.filter(issue => issue.severity === 'error').map(issue => issue.message),
      warnings: validation.issues.filter(issue => issue.severity === 'warning').map(issue => issue.message),
      frontmatter,
      body,
      content: normalizedContent,
      valid: validation.ok,
    }
  }

  const validation = validateCurrencyMarkdown({
    id: normalizedId,
    lang,
    content: normalizedContent,
    manifest,
    existingType: type,
    strictAbstract: true,
  })

  for (const issue of validation.issues) {
    if (issue.severity === 'error') issues.push(issue.message)
  }

  const warnings = validation.issues
    .filter(issue => issue.severity === 'warning')
    .map(issue => issue.message)

  const draftTitle = frontmatter.title || title || ''
  if (!String(draftTitle).trim() && !issues.some(issue => issue.includes('Missing title'))) {
    issues.push('missing title')
  }

  if (!String(frontmatter.abstract || abstract || '').trim() && !issues.some(issue => issue.includes('abstract'))) {
    issues.push('missing abstract')
  }

  if (draftType === 'current' && strictSections) {
    for (const section of CURRENT_SECTIONS) {
      if (!body.includes(section)) issues.push(`missing section: ${section}`)
    }
  }

  if (['current', 'practitioner'].includes(draftType) && !/https?:\/\//.test(normalizedContent)) {
    warnings.push('draft has no visible source/reference URL')
  }

  return {
    issues: prioritizeIssues(issues),
    warnings,
    frontmatter,
    body,
    content: normalizedContent,
    valid: issues.length === 0,
  }
}

function prioritizeIssues(issues) {
  return [...issues].sort((a, b) => {
    const aIdentity = /currencyId mismatch/.test(a) ? 0 : 1
    const bIdentity = /currencyId mismatch/.test(b) ? 0 : 1
    return aIdentity - bIdentity
  })
}

module.exports = {
  ALLOWED_TYPES,
  CURRENT_SECTIONS,
  normalizeDraftContent,
  inspectDraftContent,
}
