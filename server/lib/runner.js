'use strict'

const { spawn } = require('child_process')
const path = require('path')
const fs = require('fs')
const { parseFrontmatter } = require('./parse')
const { updateSourceStats } = require('./sources')
const { inspectDraftContent, normalizeDraftContent } = require('./draft-standard')

const ROOT = path.join(__dirname, '..', '..')
const DRAFTS_ROOT = path.join(ROOT, 'drafts')

const DRAFT_LOCATIONS = [
  { dir: DRAFTS_ROOT, lang: 'en' },
  { dir: path.join(DRAFTS_ROOT, 'zh'), lang: 'zh' },
  { dir: path.join(DRAFTS_ROOT, 'practitioners'), lang: 'en' },
  { dir: path.join(DRAFTS_ROOT, 'blog'), lang: 'en', type: 'blog' },
  { dir: path.join(DRAFTS_ROOT, 'zh', 'blog'), lang: 'zh', type: 'blog' },
]

const SKIP_FILES = new Set(['QUEUE.md', 'peng-attention.md'])

// In-memory stream registry: runId -> { lines, listeners, doneListeners, done }
// Kept for 15 minutes after completion then evicted.
const runStreams = new Map()

function getRunStream(runId) {
  return runStreams.get(runId) || null
}

function createManualRun(db, type, summary) {
  const startedAt = new Date().toISOString()
  const { lastInsertRowid } = db.prepare(
    `INSERT INTO runs (type, started_at, status, summary, log) VALUES (?, ?, 'running', ?, '')`
  ).run(type, startedAt, summary || null)
  const runId = Number(lastInsertRowid)
  const stream = { lines: [], listeners: new Set(), doneListeners: new Set(), done: false }
  runStreams.set(runId, stream)
  setTimeout(() => runStreams.delete(runId), 15 * 60 * 1000)
  return runId
}

function appendRunLog(db, runId, text) {
  const stream = runStreams.get(runId)
  if (stream) {
    stream.lines.push(text)
    stream.listeners.forEach(fn => fn(text))
  }
  db.prepare(`UPDATE runs SET log = COALESCE(log, '') || ? WHERE id = ?`).run(text, runId)
}

function completeManualRun(db, runId, { status = 'success', summary } = {}) {
  const completedAt = new Date().toISOString()
  db.prepare(`UPDATE runs SET completed_at = ?, status = ?, summary = ? WHERE id = ?`)
    .run(completedAt, status, summary || status, runId)
  db.prepare(`INSERT INTO events (type, payload, created_at) VALUES (?, ?, ?)`)
    .run('run_complete', JSON.stringify({ runId, type: 'peng-tool', status }), completedAt)

  const stream = runStreams.get(runId)
  if (stream) {
    stream.done = true
    stream.doneListeners.forEach(fn => fn(status))
  }
}

// Run a named script (e.g. 'intake', 'synthesize') as a child process.
// If preRunId is provided, the run record was already created by the caller;
// skip the INSERT and attach the stream to that ID instead.
// Returns a Promise<{ runId, status, newDrafts, log }>.
function runScript(db, type, args = [], preRunId = null) {
  const scriptPath = path.join(ROOT, 'scripts', `${type}.js`)

  if (!fs.existsSync(scriptPath)) {
    const err = `Script not found: scripts/${type}.js`
    console.warn(`[runner] ${err}`)
    return Promise.resolve({ runId: null, status: 'error', newDrafts: 0, log: err })
  }

  const startedAt = new Date().toISOString()
  let runId = preRunId
  if (!runId) {
    const { lastInsertRowid } = db.prepare(
      `INSERT INTO runs (type, started_at, status) VALUES (?, ?, 'running')`
    ).run(type, startedAt)
    runId = Number(lastInsertRowid)
  }

  // Create in-memory stream for live tailing.
  const stream = { lines: [], listeners: new Set(), doneListeners: new Set(), done: false }
  runStreams.set(runId, stream)
  setTimeout(() => runStreams.delete(runId), 15 * 60 * 1000)

  let log = ''

  const emit = (text) => {
    stream.lines.push(text)
    stream.listeners.forEach(fn => fn(text))
  }

  return new Promise((resolve) => {
    const proc = spawn('node', [scriptPath, ...args], {
      cwd: ROOT,
      env: { ...process.env },
      stdio: ['ignore', 'pipe', 'pipe'],
    })

    proc.stdout.on('data', (chunk) => {
      const text = chunk.toString()
      process.stdout.write(`[${type}] ${text}`)
      log += text
      emit(text)
    })
    proc.stderr.on('data', (chunk) => {
      const text = chunk.toString()
      process.stderr.write(`[${type}:err] ${text}`)
      log += text
      emit(text)
    })

    proc.on('close', (code) => {
      const completedAt = new Date().toISOString()
      const status = code === 0 ? 'success' : 'error'
      const newDrafts = importDraftFiles(db, runId)
      importSourceStats(db, log)

      db.prepare(
        `UPDATE runs SET completed_at = ?, status = ?, log = ?, summary = ? WHERE id = ?`
      ).run(completedAt, status, log, `exit ${code} — ${newDrafts} draft(s) imported`, runId)

      db.prepare(`INSERT INTO events (type, payload, created_at) VALUES (?, ?, ?)`)
        .run('run_complete', JSON.stringify({ runId, type, status, newDrafts }), completedAt)

      stream.done = true
      stream.doneListeners.forEach(fn => fn(status))

      console.log(`[runner] ${type} finished — status=${status} drafts=${newDrafts}`)
      resolve({ runId, status, newDrafts, log })
    })
  })
}

function importSourceStats(db, log) {
  for (const line of String(log || '').split(/\r?\n/)) {
    if (!line.startsWith('INTAKE_SOURCE_STATS ')) continue
    try {
      updateSourceStats(db, JSON.parse(line.slice('INTAKE_SOURCE_STATS '.length)))
    } catch (err) {
      console.warn(`[runner] source stats import failed: ${err.message}`)
    }
  }
}

// Scan draft directories and upsert any .md files into the drafts table.
// Only updates existing pending drafts (won't touch promoted/rejected).
function importDraftFiles(db, runId = null) {
  const upsert = db.prepare(`
    INSERT INTO drafts (id, lang, type, title, abstract, content, run_id, status, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, 'pending', ?, ?)
    ON CONFLICT(id, lang) DO UPDATE SET
      content    = excluded.content,
      type       = excluded.type,
      title      = excluded.title,
      abstract   = excluded.abstract,
      run_id     = excluded.run_id,
      updated_at = excluded.updated_at
    WHERE drafts.status = 'pending'
  `)

  let count = 0
  const now = new Date().toISOString()

  for (const { dir, lang, type } of DRAFT_LOCATIONS) {
    if (!fs.existsSync(dir)) continue
    for (const file of fs.readdirSync(dir)) {
      if (!file.endsWith('.md') || SKIP_FILES.has(file) || file.startsWith('digest-')) continue
      const id = path.basename(file, '.md')
      const filePath = path.join(dir, file)
      try {
        const content = normalizeDraftContent(fs.readFileSync(filePath, 'utf8'))
        const inspection = inspectDraftContent({ id, lang, type, content, strictSections: true })
        if (!inspection.valid) continue
        const { frontmatter } = parseFrontmatter(content)
        const stat = fs.statSync(filePath)
        const existing = db.prepare('SELECT id FROM drafts WHERE id = ? AND lang = ?').get(id, lang)
        upsert.run(
          id, lang,
          frontmatter.currencyType || frontmatter.type || (frontmatter.blogId ? 'blog' : type) || null,
          frontmatter.title || null,
          frontmatter.abstract || null,
          content,
          runId,
          stat.mtime.toISOString(),
          now
        )
        if (!existing) count++
      } catch {
        // Skip unreadable files
      }
    }
  }

  return count
}

module.exports = { runScript, importDraftFiles, getRunStream, createManualRun, appendRunLog, completeManualRun }
