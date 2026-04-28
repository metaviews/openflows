'use strict'

const yaml = require('js-yaml')
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
const PERMALINK_DIR = { current: 'currents', circuit: 'circuits', practitioner: 'practitioners' }

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

// Repair the two frontmatter fields LLMs drift on most often:
//   - tags must be a list containing 'currency'
//   - permalink must match /currency/{plural-type}/{id}/ (or /zh/... for zh)
// Both are mechanical and derivable from currencyId + currencyType, so we
// fix them in place rather than rejecting the draft. Substantive issues
// (wrong currencyType, missing sections, bad links) still surface as errors.
function autofixCurrencyDraft(content, { id, lang = 'en' } = {}) {
  if (typeof content !== 'string') return content
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/)
  if (!match) return content

  let frontmatter
  try {
    frontmatter = yaml.load(match[1], { schema: yaml.CORE_SCHEMA }) || {}
  } catch {
    return content
  }
  if (!frontmatter || typeof frontmatter !== 'object' || Array.isArray(frontmatter)) return content
  if (frontmatter.blogId || frontmatter.layout === 'layouts/blog-item.njk') return content

  const body = match[2]
  let changed = false

  if (!Array.isArray(frontmatter.tags)) {
    const previous = frontmatter.tags
    const merged = previous != null && previous !== '' ? [String(previous)] : []
    frontmatter.tags = ['currency', ...merged.filter(t => t && t !== 'currency')]
    changed = true
  } else if (!frontmatter.tags.includes('currency')) {
    frontmatter.tags = ['currency', ...frontmatter.tags]
    changed = true
  }

  const dir = PERMALINK_DIR[frontmatter.currencyType]
  const fixId = frontmatter.currencyId || id
  if (dir && fixId) {
    const isZh = frontmatter.lang === 'zh' || lang === 'zh'
    const expected = isZh ? `/zh/currency/${dir}/${fixId}/` : `/currency/${dir}/${fixId}/`
    if (frontmatter.permalink !== expected) {
      frontmatter.permalink = expected
      changed = true
    }
  }

  if (!changed) return content

  const fmYaml = yaml.dump(frontmatter, { schema: yaml.CORE_SCHEMA, lineWidth: -1, noRefs: true })
  return `---\n${fmYaml}---\n${body}`
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
  autofixCurrencyDraft,
}
