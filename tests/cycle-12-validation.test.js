'use strict'

const test = require('node:test')
const assert = require('node:assert/strict')

const { validateCurrencyMarkdown } = require('../server/lib/validation')

const manifest = {
  entries: [
    { currencyId: 'ollama' },
    { currencyId: 'local-inference-baseline' },
  ],
}

function entry(overrides = {}, body = 'Body text.') {
  const frontmatter = {
    layout: 'layouts/currency-item.njk',
    title: 'Ollama',
    date: '2026-02-24',
    currencyType: 'current',
    currencyId: 'ollama',
    abstract: 'A useful local inference runtime.',
    tags: ['currency'],
    permalink: '/currency/currents/ollama/',
    links: [{ id: 'local-inference-baseline', relation: 'contributes to' }],
    ...overrides,
  }
  const lines = ['---']
  for (const [key, value] of Object.entries(frontmatter)) {
    if (Array.isArray(value)) {
      lines.push(`${key}:`)
      for (const item of value) {
        if (typeof item === 'object') {
          lines.push(`  - id: ${item.id}`)
          if (item.relation) lines.push(`    relation: "${item.relation}"`)
        } else {
          lines.push(`  - ${item}`)
        }
      }
    } else {
      lines.push(`${key}: ${JSON.stringify(value)}`)
    }
  }
  lines.push('---', '', body)
  return lines.join('\n')
}

test('valid English and Chinese entries pass validation', () => {
  const en = validateCurrencyMarkdown({ id: 'ollama', lang: 'en', content: entry(), manifest, existingType: 'current' })
  assert.equal(en.ok, true)

  const zh = validateCurrencyMarkdown({
    id: 'ollama',
    lang: 'zh',
    content: entry({ lang: 'zh', permalink: '/zh/currency/currents/ollama/' }),
    manifest,
    existingType: 'current',
  })
  assert.equal(zh.ok, true)
})

test('identity, permalink, language, and link errors are reported', () => {
  const changedId = validateCurrencyMarkdown({ id: 'ollama', lang: 'en', content: entry({ currencyId: 'not-ollama' }), manifest, existingType: 'current' })
  assert.equal(changedId.ok, false)
  assert.match(changedId.issues.map(i => i.message).join('\n'), /currencyId mismatch/)

  const changedType = validateCurrencyMarkdown({ id: 'ollama', lang: 'en', content: entry({ currencyType: 'circuit' }), manifest, existingType: 'current' })
  assert.equal(changedType.ok, false)
  assert.match(changedType.issues.map(i => i.message).join('\n'), /currencyType mismatch/)

  const missingZhLang = validateCurrencyMarkdown({ id: 'ollama', lang: 'zh', content: entry({ permalink: '/zh/currency/currents/ollama/' }), manifest, existingType: 'current' })
  assert.equal(missingZhLang.ok, false)
  assert.match(missingZhLang.issues.map(i => i.message).join('\n'), /lang: zh/)

  const badPermalink = validateCurrencyMarkdown({ id: 'ollama', lang: 'en', content: entry({ permalink: '/bad/' }), manifest, existingType: 'current' })
  assert.equal(badPermalink.ok, false)
  assert.match(badPermalink.issues.map(i => i.message).join('\n'), /Expected permalink/)

  const brokenLink = validateCurrencyMarkdown({ id: 'ollama', lang: 'en', content: entry({ links: [{ id: 'missing-id', relation: 'points to' }] }), manifest, existingType: 'current' })
  assert.equal(brokenLink.ok, false)
  assert.match(brokenLink.issues.map(i => i.message).join('\n'), /Unknown links.id/)
})

test('draft validation reports missing abstract, body, and title', () => {
  const draft = validateCurrencyMarkdown({
    id: 'ollama',
    lang: 'en',
    content: entry({ title: '', abstract: '' }, ''),
    manifest,
    existingType: 'current',
    strictAbstract: true,
  })
  assert.equal(draft.ok, false)
  const fields = draft.issues.map(issue => issue.field)
  assert.ok(fields.includes('title'))
  assert.ok(fields.includes('abstract'))
  assert.ok(fields.includes('body'))
})
