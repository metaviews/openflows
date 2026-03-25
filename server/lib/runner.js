'use strict'

const { spawn } = require('child_process')
const path = require('path')
const fs = require('fs')
const { parseFrontmatter } = require('./parse')

const ROOT = path.join(__dirname, '..', '..')
const DRAFTS_ROOT = path.join(ROOT, 'drafts')

const DRAFT_LOCATIONS = [
  { dir: DRAFTS_ROOT, lang: 'en' },
  { dir: path.join(DRAFTS_ROOT, 'zh'), lang: 'zh' },
  { dir: path.join(DRAFTS_ROOT, 'practitioners'), lang: 'en' },
]

const SKIP_FILES = new Set(['QUEUE.md', 'peng-attention.md'])

// Run a named script (e.g. 'intake', 'synthesize') as a child process.
// Captures stdout+stderr into the runs table. Imports any new draft files into SQLite after completion.
// Returns a Promise<{ runId, status, newDrafts, log }>.
function runScript(db, type, args = []) {
  const scriptPath = path.join(ROOT, 'scripts', `${type}.js`)

  if (!fs.existsSync(scriptPath)) {
    const err = `Script not found: scripts/${type}.js`
    console.warn(`[runner] ${err}`)
    return Promise.resolve({ runId: null, status: 'error', newDrafts: 0, log: err })
  }

  const startedAt = new Date().toISOString()
  const { lastInsertRowid: runId } = db.prepare(
    `INSERT INTO runs (type, started_at, status) VALUES (?, ?, 'running')`
  ).run(type, startedAt)

  let log = ''

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
    })
    proc.stderr.on('data', (chunk) => {
      const text = chunk.toString()
      process.stderr.write(`[${type}:err] ${text}`)
      log += text
    })

    proc.on('close', (code) => {
      const completedAt = new Date().toISOString()
      const status = code === 0 ? 'success' : 'error'
      const newDrafts = importDraftFiles(db, runId)

      db.prepare(
        `UPDATE runs SET completed_at = ?, status = ?, log = ?, summary = ? WHERE id = ?`
      ).run(completedAt, status, log, `exit ${code} — ${newDrafts} draft(s) imported`, runId)

      db.prepare(`INSERT INTO events (type, payload, created_at) VALUES (?, ?, ?)`)
        .run('run_complete', JSON.stringify({ runId, type, status, newDrafts }), completedAt)

      console.log(`[runner] ${type} finished — status=${status} drafts=${newDrafts}`)
      resolve({ runId, status, newDrafts, log })
    })
  })
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

  for (const { dir, lang } of DRAFT_LOCATIONS) {
    if (!fs.existsSync(dir)) continue
    for (const file of fs.readdirSync(dir)) {
      if (!file.endsWith('.md') || SKIP_FILES.has(file) || file.startsWith('digest-')) continue
      const id = path.basename(file, '.md')
      const filePath = path.join(dir, file)
      try {
        const content = fs.readFileSync(filePath, 'utf8')
        const { frontmatter } = parseFrontmatter(content)
        const stat = fs.statSync(filePath)
        const existing = db.prepare('SELECT id FROM drafts WHERE id = ? AND lang = ?').get(id, lang)
        upsert.run(
          id, lang,
          frontmatter.currencyType || null,
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

module.exports = { runScript, importDraftFiles }
