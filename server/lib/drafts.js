'use strict'

const path = require('path')
const fs = require('fs')
const { parseFrontmatter } = require('./parse')
const { promoteEntry } = require('./git')

const ROOT = path.join(__dirname, '..', '..')
const DRAFTS_ROOT = path.join(ROOT, 'drafts')
const SKIP_FILES = new Set(['QUEUE.md', 'peng-attention.md'])
const ALLOWED_TYPES = new Set(['current', 'circuit', 'practitioner'])

function draftFilePath(id, lang = 'en') {
  const existing = existingDraftFilePath(id, lang)
  if (existing) return existing
  return lang === 'zh'
    ? path.join(DRAFTS_ROOT, 'zh', `${id}.md`)
    : path.join(DRAFTS_ROOT, `${id}.md`)
}

function existingDraftFilePath(id, lang = 'en') {
  const candidates = lang === 'zh'
    ? [path.join(DRAFTS_ROOT, 'zh', `${id}.md`)]
    : [
        path.join(DRAFTS_ROOT, `${id}.md`),
        path.join(DRAFTS_ROOT, 'practitioners', `${id}.md`),
      ]
  return candidates.find(candidate => fs.existsSync(candidate)) || null
}

function inspectDraft({ id, content, type, title, abstract }) {
  const issues = []
  const normalizedId = typeof id === 'string' ? id.trim() : ''
  const normalizedContent = typeof content === 'string' ? content : ''

  if (!normalizedId) issues.push('missing id')
  if (!normalizedContent.trim()) issues.push('empty content')

  const { frontmatter, body } = parseFrontmatter(normalizedContent)

  if (!frontmatter.currencyId) issues.push('missing currencyId in frontmatter')
  if (frontmatter.currencyId && normalizedId && frontmatter.currencyId !== normalizedId) {
    issues.push(`currencyId mismatch (${frontmatter.currencyId} != ${normalizedId})`)
  }

  const draftType = frontmatter.currencyType || type || null
  if (!draftType) {
    issues.push('missing currencyType')
  } else if (!ALLOWED_TYPES.has(draftType)) {
    issues.push(`invalid currencyType (${draftType})`)
  }

  const draftTitle = frontmatter.title || title || ''
  if (!String(draftTitle).trim()) issues.push('missing title')

  if (!String(body || '').trim()) issues.push('empty body')

  if (!String(frontmatter.abstract || abstract || '').trim()) {
    issues.push('missing abstract')
  }

  return {
    issues,
    frontmatter,
    body,
    valid: issues.length === 0,
  }
}

function listDrafts(db, { status = 'pending', lang, type, limit } = {}) {
  let query = `SELECT id, lang, type, title, abstract, status, created_at, updated_at
               FROM drafts WHERE status = ?`
  const params = [status]
  if (lang) {
    query += ' AND lang = ?'
    params.push(lang)
  }
  if (type) {
    query += ' AND type = ?'
    params.push(type)
  }
  query += ' ORDER BY created_at DESC'
  if (limit) {
    query += ' LIMIT ?'
    params.push(limit)
  }
  return db.prepare(query).all(...params)
}

function getDraft(db, { id, lang = 'en' }) {
  const draft = db.prepare('SELECT * FROM drafts WHERE id = ? AND lang = ?').get(id, lang)
  if (!draft) {
    const err = new Error(`Draft not found: ${id} (${lang})`)
    err.statusCode = 404
    throw err
  }
  return draft
}

function syncDraftFile({ id, lang = 'en', content }) {
  const filePath = draftFilePath(id, lang)
  fs.mkdirSync(path.dirname(filePath), { recursive: true })
  fs.writeFileSync(filePath, content, 'utf8')
  return filePath
}

function removeDraftFile(id, lang = 'en') {
  const filePath = draftFilePath(id, lang)
  if (fs.existsSync(filePath)) fs.unlinkSync(filePath)
}

function upsertDraft(db, { id, lang = 'en', content, status = 'pending', runId = null, sourceUrl = null }) {
  if (!id) {
    const err = new Error('id required')
    err.statusCode = 400
    throw err
  }
  if (!content) {
    const err = new Error('content required')
    err.statusCode = 400
    throw err
  }

  const inspection = inspectDraft({ id, content })
  if (!inspection.valid) {
    const err = new Error(`invalid draft: ${inspection.issues.join('; ')}`)
    err.statusCode = 400
    throw err
  }

  const { frontmatter } = inspection
  const now = new Date().toISOString()
  const filePath = syncDraftFile({ id, lang, content })
  const createdAt = fs.statSync(filePath).mtime.toISOString()

  db.prepare(`
    INSERT INTO drafts (id, lang, type, title, abstract, content, source_url, run_id, status, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(id, lang) DO UPDATE SET
      type = excluded.type,
      title = excluded.title,
      abstract = excluded.abstract,
      content = excluded.content,
      source_url = excluded.source_url,
      run_id = excluded.run_id,
      status = excluded.status,
      updated_at = excluded.updated_at
  `).run(
    id,
    lang,
    frontmatter.currencyType || null,
    frontmatter.title || null,
    frontmatter.abstract || null,
    content,
    sourceUrl,
    runId,
    status,
    createdAt,
    now
  )

  return getDraft(db, { id, lang })
}

function updateDraftContent(db, { id, lang = 'en', content }) {
  const draft = getDraft(db, { id, lang })
  if (draft.status !== 'pending') {
    const err = new Error('Draft is not pending')
    err.statusCode = 409
    throw err
  }
  return upsertDraft(db, { id, lang, content, status: draft.status, runId: draft.run_id, sourceUrl: draft.source_url })
}

async function promoteDraft(db, { id, lang = 'en' }) {
  const draft = getDraft(db, { id, lang })
  if (!draft.type) {
    const err = new Error('Draft has no currencyType')
    err.statusCode = 400
    throw err
  }
  const inspection = inspectDraft(draft)
  if (!inspection.valid) {
    const err = new Error(`invalid draft: ${inspection.issues.join('; ')}`)
    err.statusCode = 400
    throw err
  }
  if (draft.status === 'promoted') {
    const err = new Error('Draft already promoted')
    err.statusCode = 409
    throw err
  }

  const result = await promoteEntry({
    id: draft.id,
    lang: draft.lang,
    content: draft.content,
    currencyType: draft.type,
  })

  const now = new Date().toISOString()
  db.prepare(`UPDATE drafts SET status = 'promoted', updated_at = ? WHERE id = ? AND lang = ?`)
    .run(now, id, lang)
  db.prepare(`INSERT INTO events (type, payload, created_at) VALUES (?, ?, ?)`)
    .run('promote', JSON.stringify({ id, lang, path: result.path }), now)

  removeDraftFile(id, lang)

  return { ok: true, path: result.path, id, lang }
}

function rejectDraft(db, { id, lang = 'en' }) {
  const draft = getDraft(db, { id, lang })
  const now = new Date().toISOString()
  db.prepare(`UPDATE drafts SET status = 'rejected', updated_at = ? WHERE id = ? AND lang = ?`)
    .run(now, id, lang)
  db.prepare(`INSERT INTO events (type, payload, created_at) VALUES (?, ?, ?)`)
    .run('reject', JSON.stringify({ id, lang }), now)
  return { ...draft, status: 'rejected' }
}

function buildQueueContext(db) {
  const pending = listDrafts(db, { status: 'pending' })
  if (!pending.length) return 'No pending drafts.'
  return pending
    .map(draft => `[${draft.type || '?'}|${draft.id}|${draft.lang}] ${draft.title || '(untitled)'}`)
    .join('\n')
}

function pruneMalformedDrafts(db, { status = 'pending' } = {}) {
  const drafts = db.prepare(`
    SELECT id, lang, type, title, abstract, content, status, created_at, updated_at
    FROM drafts
    WHERE status = ?
    ORDER BY created_at DESC
  `).all(status)
  const bad = []

  for (const draft of drafts) {
    const inspection = inspectDraft(draft)
    if (!inspection.valid) {
      bad.push({ draft, issues: inspection.issues })
    }
  }

  if (!bad.length) return []

  const removeStmt = db.prepare('DELETE FROM drafts WHERE id = ? AND lang = ?')
  const eventStmt = db.prepare('INSERT INTO events (type, payload, created_at) VALUES (?, ?, ?)')
  const now = new Date().toISOString()

  for (const { draft, issues } of bad) {
    removeStmt.run(draft.id, draft.lang)
    removeDraftFile(draft.id, draft.lang)
    eventStmt.run('prune_malformed_draft', JSON.stringify({ id: draft.id, lang: draft.lang, issues }), now)
  }

  return bad
}

module.exports = {
  ROOT,
  DRAFTS_ROOT,
  SKIP_FILES,
  ALLOWED_TYPES,
  draftFilePath,
  existingDraftFilePath,
  inspectDraft,
  listDrafts,
  getDraft,
  upsertDraft,
  updateDraftContent,
  promoteDraft,
  rejectDraft,
  buildQueueContext,
  pruneMalformedDrafts,
}
