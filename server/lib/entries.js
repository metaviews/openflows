'use strict'

const path = require('path')
const fs = require('fs')
const { loadManifest, ensureManifest } = require('./manifest')
const { commitEdit, removeEntry } = require('./git')
const { parseFrontmatter } = require('./parse')

const ROOT = path.join(__dirname, '..', '..')
const TYPE_MAP = { current: 'currents', circuit: 'circuits', practitioner: 'practitioners' }

function entryFilePath(id, currencyType, lang = 'en') {
  const dir = TYPE_MAP[currencyType]
  if (!dir) throw new Error(`Unknown currencyType: ${currencyType}`)
  return lang === 'zh'
    ? path.join(ROOT, 'src', 'currency', 'zh', dir, `${id}.md`)
    : path.join(ROOT, 'src', 'currency', dir, `${id}.md`)
}

function getManifestEntry(id, lang = 'en', manifest = loadManifest()) {
  return manifest?.entries?.find(entry => entry.currencyId === id && entry.lang === lang) || null
}

function readEntry(id, lang = 'en') {
  const manifest = loadManifest()
  const entry = getManifestEntry(id, lang, manifest)
  if (!entry) {
    const err = new Error(`Entry not found: ${id} (${lang})`)
    err.statusCode = 404
    throw err
  }

  const filePath = entryFilePath(id, entry.currencyType, lang)
  if (!fs.existsSync(filePath)) {
    const err = new Error(`Entry file not found: ${id} (${lang})`)
    err.statusCode = 404
    throw err
  }

  const content = fs.readFileSync(filePath, 'utf8')
  const relPath = path.relative(ROOT, filePath).replace(/\\/g, '/')
  return { entry, content, filePath, relPath }
}

async function saveEntry({ id, lang = 'en', content }) {
  if (!content) {
    const err = new Error('content required')
    err.statusCode = 400
    throw err
  }

  const existing = readEntry(id, lang)
  validateEntryReplacement({ id, lang, existing: existing.entry, content })
  fs.writeFileSync(existing.filePath, content, 'utf8')
  const gitResult = await commitEdit({ relPath: existing.relPath, id, lang })
  await ensureManifest(0)

  return {
    ok: true,
    id,
    lang,
    path: existing.relPath,
    committed: gitResult.committed,
  }
}

function validateEntryReplacement({ id, lang = 'en', existing, content }) {
  const { frontmatter, body } = parseFrontmatter(content)
  const issues = []

  if (!frontmatter.currencyId) issues.push('missing currencyId in frontmatter')
  if (!frontmatter.currencyType) issues.push('missing currencyType in frontmatter')
  if (!frontmatter.title) issues.push('missing title in frontmatter')
  if (!String(body || '').trim()) issues.push('empty body')

  if (frontmatter.currencyId && frontmatter.currencyId !== id) {
    issues.push(`currencyId mismatch (${frontmatter.currencyId} != ${id})`)
  }
  if (existing?.currencyType && frontmatter.currencyType && frontmatter.currencyType !== existing.currencyType) {
    issues.push(`currencyType mismatch (${frontmatter.currencyType} != ${existing.currencyType})`)
  }

  const expectedLang = lang === 'zh' ? 'zh' : null
  if (expectedLang && frontmatter.lang !== expectedLang) {
    issues.push('missing or incorrect lang: zh')
  }
  if (!expectedLang && frontmatter.lang && frontmatter.lang !== 'en') {
    issues.push(`unexpected lang (${frontmatter.lang})`)
  }

  if (issues.length) {
    const err = new Error(`invalid entry replacement: ${issues.join('; ')}`)
    err.statusCode = 400
    throw err
  }

  return true
}

async function deleteEntry({ id, lang = 'en' }) {
  const existing = readEntry(id, lang)
  await removeEntry({ relPath: existing.relPath, id, lang })
  await ensureManifest(0)

  return {
    ok: true,
    id,
    lang,
    path: existing.relPath,
  }
}

module.exports = {
  ROOT,
  TYPE_MAP,
  entryFilePath,
  getManifestEntry,
  readEntry,
  saveEntry,
  deleteEntry,
  validateEntryReplacement,
}
