'use strict'

const test = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const os = require('node:os')
const path = require('node:path')

const {
  toolRequiresConfirmation,
  summarizeToolCall,
  partitionToolCalls,
} = require('../server/lib/peng-tools')
const { validateEntryReplacement } = require('../server/lib/entries')

function toolCall(name, args = {}) {
  return {
    id: `${name}-call`,
    function: {
      name,
      arguments: JSON.stringify(args),
    },
  }
}

test('read tools do not require confirmation and write tools do', () => {
  const calls = [
    toolCall('get_status'),
    toolCall('get_entry', { currencyId: 'ollama', lang: 'en' }),
    toolCall('save_entry', { currencyId: 'ollama', lang: 'en', content: 'secret content' }),
    toolCall('trigger_translate', { currencyId: 'ollama', force: true }),
  ]

  assert.equal(toolRequiresConfirmation(calls[0]), false)
  assert.equal(toolRequiresConfirmation(calls[1]), false)
  assert.equal(toolRequiresConfirmation(calls[2]), true)
  assert.equal(toolRequiresConfirmation(calls[3]), true)

  const { readToolCalls, writeToolCalls } = partitionToolCalls(calls)
  assert.deepEqual(readToolCalls.map(call => call.function.name), ['get_status', 'get_entry'])
  assert.deepEqual(writeToolCalls.map(call => call.function.name), ['save_entry', 'trigger_translate'])
})

test('tool summaries omit full content and keep operational fields', () => {
  const summary = summarizeToolCall(toolCall('save_entry', {
    currencyId: 'ollama',
    lang: 'zh',
    content: 'full markdown should not be audited verbatim',
  }))

  assert.equal(summary.name, 'save_entry')
  assert.equal(summary.id, 'ollama')
  assert.equal(summary.lang, 'zh')
  assert.equal(summary.contentLength, 44)
  assert.equal(Object.hasOwn(summary, 'content'), false)
})

test('entry replacement validation preserves identity and language', () => {
  const existing = { currencyType: 'current' }
  const valid = `---
layout: layouts/currency-item.njk
title: "Ollama"
lang: zh
date: 2026-02-24
currencyType: "current"
currencyId: ollama
abstract: "A test abstract."
tags:
  - currency
permalink: /zh/currency/currents/ollama/
---

Body.`

  assert.equal(validateEntryReplacement({ id: 'ollama', lang: 'zh', existing, content: valid }), true)

  const changedId = valid.replace('currencyId: ollama', 'currencyId: not-ollama')
  assert.throws(
    () => validateEntryReplacement({ id: 'ollama', lang: 'zh', existing, content: changedId }),
    /currencyId mismatch/
  )

  const changedType = valid.replace('currencyType: "current"', 'currencyType: "circuit"')
  assert.throws(
    () => validateEntryReplacement({ id: 'ollama', lang: 'zh', existing, content: changedType }),
    /currencyType mismatch/
  )

  const missingLang = valid.replace('lang: zh\n', '')
  assert.throws(
    () => validateEntryReplacement({ id: 'ollama', lang: 'zh', existing, content: missingLang }),
    /missing or incorrect lang/
  )
})

test('promoteDraft rejects malformed drafts before git promotion', async () => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'openflows-test-'))
  process.env.DB_PATH = path.join(tempDir, 'openflows.db')

  const { initDb } = require('../server/db')
  const { promoteDraft } = require('../server/lib/drafts')
  const db = initDb()
  const now = new Date().toISOString()
  const badContent = `---
title: "Broken"
currencyType: "current"
currencyId: different-id
abstract: "Broken draft."
---

Body.`

  db.prepare(`
    INSERT INTO drafts (id, lang, type, title, abstract, content, status, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, 'pending', ?, ?)
  `).run('broken-draft', 'en', 'current', 'Broken', 'Broken draft.', badContent, now, now)

  await assert.rejects(
    () => promoteDraft(db, { id: 'broken-draft', lang: 'en' }),
    /invalid draft: currencyId mismatch/
  )

  db.close()
  fs.rmSync(tempDir, { recursive: true, force: true })
})
