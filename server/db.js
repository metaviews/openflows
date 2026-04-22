'use strict'

const { DatabaseSync } = require('node:sqlite')
const path = require('path')
const fs = require('fs')
const { parseFrontmatter } = require('./lib/parse')
const { inspectDraftContent, normalizeDraftContent } = require('./lib/draft-standard')

const ROOT = path.join(__dirname, '..')
const DEFAULT_DB_PATH = path.join(ROOT, 'data', 'openflows.db')

let _db = null

function getDb() {
  if (_db) return _db
  _db = initDb()
  return _db
}

function initDb() {
  const dbPath = process.env.DB_PATH || DEFAULT_DB_PATH
  const dir = path.dirname(dbPath)
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })

  const db = new DatabaseSync(dbPath)
  db.exec('PRAGMA journal_mode = WAL')
  db.exec('PRAGMA foreign_keys = ON')

  db.exec(`
    CREATE TABLE IF NOT EXISTS runs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      type TEXT NOT NULL,
      started_at TEXT NOT NULL,
      completed_at TEXT,
      status TEXT NOT NULL DEFAULT 'running',
      summary TEXT,
      log TEXT DEFAULT ''
    );

    CREATE TABLE IF NOT EXISTS drafts (
      id TEXT NOT NULL,
      lang TEXT NOT NULL DEFAULT 'en',
      type TEXT,
      title TEXT,
      abstract TEXT,
      content TEXT,
      source_url TEXT,
      run_id INTEGER REFERENCES runs(id),
      status TEXT NOT NULL DEFAULT 'pending',
      created_at TEXT NOT NULL,
      updated_at TEXT,
      PRIMARY KEY (id, lang)
    );

    CREATE INDEX IF NOT EXISTS drafts_status ON drafts(status);

    CREATE TABLE IF NOT EXISTS events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      type TEXT NOT NULL,
      payload TEXT,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS conversations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      messages TEXT NOT NULL DEFAULT '[]',
      created_at TEXT NOT NULL,
      updated_at TEXT
    );

    CREATE TABLE IF NOT EXISTS source_proposals (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      source_id TEXT NOT NULL,
      module TEXT NOT NULL,
      label TEXT NOT NULL,
      config TEXT NOT NULL DEFAULT '{}',
      reason TEXT,
      status TEXT NOT NULL DEFAULT 'pending',
      proposed_by TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT
    );

    CREATE INDEX IF NOT EXISTS source_proposals_status ON source_proposals(status);

    CREATE TABLE IF NOT EXISTS source_run_stats (
      source_id TEXT PRIMARY KEY,
      module TEXT,
      status TEXT,
      fetched INTEGER DEFAULT 0,
      drafted INTEGER DEFAULT 0,
      error TEXT,
      started_at TEXT,
      completed_at TEXT,
      updated_at TEXT
    );
  `)

  migrateDrafts(db)

  return db
}

// One-time migration: import any existing draft .md files into SQLite.
// Uses INSERT OR IGNORE — won't touch entries already in the DB.
function migrateDrafts(db) {
  const DRAFTS_ROOT = path.join(ROOT, 'drafts')
  const locations = [
    { dir: DRAFTS_ROOT, lang: 'en' },
    { dir: path.join(DRAFTS_ROOT, 'zh'), lang: 'zh' },
    { dir: path.join(DRAFTS_ROOT, 'practitioners'), lang: 'en' },
    { dir: path.join(DRAFTS_ROOT, 'blog'), lang: 'en', type: 'blog' },
    { dir: path.join(DRAFTS_ROOT, 'zh', 'blog'), lang: 'zh', type: 'blog' },
  ]

  const insert = db.prepare(`
    INSERT OR IGNORE INTO drafts (id, lang, type, title, abstract, content, status, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, 'pending', ?, ?)
  `)

  const SKIP = new Set(['QUEUE.md', 'peng-attention.md'])

  for (const { dir, lang, type } of locations) {
    if (!fs.existsSync(dir)) continue
    for (const file of fs.readdirSync(dir)) {
      if (!file.endsWith('.md') || SKIP.has(file) || file.startsWith('digest-')) continue
      const id = path.basename(file, '.md')
      const filePath = path.join(dir, file)
      try {
        const content = normalizeDraftContent(fs.readFileSync(filePath, 'utf8'))
        const inspection = inspectDraftContent({ id, lang, type, content, strictSections: true })
        if (!inspection.valid) continue
        const { frontmatter } = parseFrontmatter(content)
        const stat = fs.statSync(filePath)
        insert.run(
          id, lang,
          frontmatter.currencyType || frontmatter.type || (frontmatter.blogId ? 'blog' : type) || null,
          frontmatter.title || null,
          frontmatter.abstract || null,
          content,
          stat.mtime.toISOString(),
          new Date().toISOString()
        )
      } catch {
        // Skip unreadable files
      }
    }
  }
}

module.exports = { getDb, initDb }
