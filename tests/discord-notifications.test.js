'use strict'

const test = require('node:test')
const assert = require('node:assert/strict')
const fs = require('fs')
const os = require('os')
const path = require('path')
const { DatabaseSync } = require('node:sqlite')

const { buildIntakeNotificationText, buildDigestNotificationText } = require('../server/discord')

function makeDb() {
  const db = new DatabaseSync(':memory:')
  db.exec(`
    CREATE TABLE drafts (
      id TEXT NOT NULL,
      lang TEXT NOT NULL DEFAULT 'en',
      type TEXT,
      title TEXT,
      status TEXT NOT NULL DEFAULT 'pending',
      run_id INTEGER,
      created_at TEXT,
      updated_at TEXT,
      PRIMARY KEY (id, lang)
    );
  `)
  return db
}

test('intake notification reports drafts touched across the full cycle', () => {
  const db = makeDb()
  const insert = db.prepare(`
    INSERT INTO drafts (id, lang, type, title, status, run_id, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `)
  insert.run('alpha', 'en', 'current', 'Alpha', 'pending', 17, '2026-04-23T10:00:00.000Z', '2026-04-23T10:10:00.000Z')
  insert.run('bravo', 'en', 'practitioner', 'Bravo', 'pending', 18, '2026-04-23T10:01:00.000Z', '2026-04-23T10:11:00.000Z')
  insert.run('older', 'en', 'current', 'Older', 'pending', 12, '2026-04-20T10:00:00.000Z', '2026-04-20T10:00:00.000Z')

  const text = buildIntakeNotificationText(db, {
    runIds: [17, 18],
    pendingBefore: 1,
    pendingAfter: 3,
  })

  assert.match(text, /\*\*Intake complete\*\* — 2 draft\(s\) added or updated this cycle\./)
  assert.match(text, /Queue: 1 -> 3\./)
  assert.match(text, /\[practitioner\|en\] bravo: Bravo/)
  assert.match(text, /\[current\|en\] alpha: Alpha/)
  assert.doesNotMatch(text, /older: Older/)
})

test('intake notification does not imply an empty queue when no drafts changed', () => {
  const db = makeDb()
  const insert = db.prepare(`
    INSERT INTO drafts (id, lang, type, title, status, run_id, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `)
  insert.run('older', 'en', 'current', 'Older', 'pending', 12, '2026-04-20T10:00:00.000Z', '2026-04-20T10:00:00.000Z')

  const text = buildIntakeNotificationText(db, {
    runIds: [17, 18],
    pendingBefore: 1,
    pendingAfter: 1,
  })

  assert.equal(
    text,
    '**Intake complete** — no drafts added or updated this cycle. 1 pending draft(s) remain in queue.'
  )
})

test('intake notification lists newest drafts when queue grew but run ids were overwritten', () => {
  const db = makeDb()
  const insert = db.prepare(`
    INSERT INTO drafts (id, lang, type, title, status, run_id, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `)
  insert.run('alpha', 'en', 'current', 'Alpha', 'pending', 99, '2026-04-23T10:00:00.000Z', '2026-04-23T10:10:00.000Z')
  insert.run('bravo', 'en', 'current', 'Bravo', 'pending', 99, '2026-04-23T10:01:00.000Z', '2026-04-23T10:11:00.000Z')
  insert.run('charlie', 'en', 'current', 'Charlie', 'pending', 99, '2026-04-23T10:02:00.000Z', '2026-04-23T10:12:00.000Z')
  insert.run('delta', 'en', 'current', 'Delta', 'pending', 99, '2026-04-23T10:03:00.000Z', '2026-04-23T10:13:00.000Z')

  const text = buildIntakeNotificationText(db, {
    runIds: [17, 18],
    pendingBefore: 0,
    pendingAfter: 4,
  })

  assert.match(text, /\*\*Intake complete\*\* — 4 draft\(s\) added or updated this cycle\./)
  assert.match(text, /Queue: 0 -> 4\./)
  assert.match(text, /delta: Delta/)
  assert.match(text, /charlie: Charlie/)
  assert.match(text, /bravo: Bravo/)
  assert.match(text, /alpha: Alpha/)
})

test('digest notification reads the published perspective file', async () => {
  const tempDir = await fs.promises.mkdtemp(path.join(os.tmpdir(), 'openflows-discord-'))
  const digestPath = path.join(tempDir, '2026-04-23.md')
  await fs.promises.writeFile(
    digestPath,
    [
      '---',
      'layout: layouts/perspective-item.njk',
      'title: "Signals Coalesce"',
      'date: 2026-04-23',
      'permalink: /perspective/2026-04-23/',
      'abstract: "A short briefing on what moved this week."',
      '---',
      '',
      '## What Is Flowing',
      'Fresh entries are moving through the queue.',
    ].join('\n'),
    'utf8'
  )

  const text = buildDigestNotificationText({ digestPath })

  assert.match(text, /\*\*Perspective ready\*\* — Signals Coalesce/)
  assert.match(text, /https:\/\/openflows\.org\/perspective\/2026-04-23\//)
  assert.match(text, /> A short briefing on what moved this week\./)
  assert.match(text, /## What Is Flowing/)
})
