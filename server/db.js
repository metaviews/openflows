'use strict'

const { DatabaseSync } = require('node:sqlite')
const path = require('path')
const fs = require('fs')
const { parseFrontmatter } = require('./lib/parse')

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
  ]

  const insert = db.prepare(`
    INSERT OR IGNORE INTO drafts (id, lang, type, title, abstract, content, status, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, 'pending', ?, ?)
  `)

  const SKIP = new Set(['QUEUE.md', 'peng-attention.md'])

  for (const { dir, lang } of locations) {
    if (!fs.existsSync(dir)) continue
    for (const file of fs.readdirSync(dir)) {
      if (!file.endsWith('.md') || SKIP.has(file) || file.startsWith('digest-')) continue
      const id = path.basename(file, '.md')
      const filePath = path.join(dir, file)
      try {
        const content = fs.readFileSync(filePath, 'utf8')
        const { frontmatter } = parseFrontmatter(content)
        const stat = fs.statSync(filePath)
        insert.run(
          id, lang,
          frontmatter.currencyType || null,
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
