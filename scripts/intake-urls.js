#!/usr/bin/env node
'use strict'

// One-shot script: fetch a list of URLs, generate KB draft entries, queue for review.
// Usage: node scripts/intake-urls.js

const path = require('path')
const { loadEnv, createClient } = require('./lib/openrouter')
loadEnv(path.join(__dirname, '..'))

const { initDb } = require('../server/db')
const { upsertDraft } = require('../server/lib/drafts')

const URLS = [
  'https://github.com/seemoo-lab/CellGuard',
  'https://github.com/aaronjmars/MiroShark',
  'https://github.com/camel-ai/oasis',
  'https://www.eigent.ai/',
  'https://github.com/PsycheFoundation/nousnet',
  'https://github.com/gadievron/raptor',
  'https://github.com/heygen-com/hyperframes',
  'https://github.com/browser-use/video-use',
  'https://github.com/Lazarus-AI/clearwing',
]

const SYSTEM = `You are Peng (鵬), agent of Openflows — a bilingual knowledge base documenting the open source AI ecosystem (openflows.org). Technical, civic, dense. No hype. Treat AI as infrastructure.

Output ONLY the raw markdown entry — no code fences, no preamble. Start with --- on the first line.

Required frontmatter fields (all mandatory):
---
layout: layouts/currency-item.njk
title: "Clear Descriptive Title"
date: YYYY-MM-DD
currencyType: current
currencyId: kebab-case-unique-id
tags: [currency]
permalink: /currency/currents/kebab-case-unique-id/
abstract: "One or two sentence summary — required."
---

Use currencyType: current for tools, frameworks, and projects.
Use currencyType: circuit for governance patterns, workflows, or methodologies.
Use currencyType: practitioner for individuals.

Body: substantive prose — what it is, why it matters, notable technical aspects. Include a linkage check section. Add a mediation block since AI shaped this content:

mediation:
  tooling: "OpenRouter / [model]"
  use: ["research synthesis", "entry drafting"]
  humanRole: "queued for review"
  limits: "sourced from public documentation; verify claims before promotion"`

async function stripHtml(raw) {
  return raw
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ').trim()
}

async function fetchText(url, limit = 4000) {
  const resp = await fetch(url, {
    headers: { 'User-Agent': 'Openflows/1.0 (+https://openflows.org)' },
    signal: AbortSignal.timeout(12000),
  })
  if (!resp.ok) throw new Error(`HTTP ${resp.status} from ${url}`)
  const raw = await resp.text()
  const stripped = await stripHtml(raw)
  return stripped.slice(0, limit)
}

function githubReadmeUrl(url) {
  const m = url.match(/github\.com\/([^/]+)\/([^/]+)/)
  if (!m) return null
  return `https://raw.githubusercontent.com/${m[1]}/${m[2]}/main/README.md`
}

function extractCurrencyId(content) {
  const m = content.match(/^currencyId:\s*(.+)$/m)
  return m ? m[1].trim().replace(/^["']|["']$/g, '') : null
}

async function buildContext(url) {
  const parts = [`URL: ${url}`]

  const readmeUrl = githubReadmeUrl(url)
  if (readmeUrl) {
    try {
      const readme = await fetch(readmeUrl, {
        headers: { 'User-Agent': 'Openflows/1.0 (+https://openflows.org)' },
        signal: AbortSignal.timeout(10000),
      })
      if (readme.ok) {
        const text = await readme.text()
        parts.push(`README:\n${text.slice(0, 5000)}`)
      }
    } catch {
      // fall through to page fetch
    }
  }

  if (parts.length === 1) {
    try {
      const page = await fetchText(url, 4000)
      parts.push(`Page content:\n${page}`)
    } catch (err) {
      throw new Error(`Could not fetch ${url}: ${err.message}`)
    }
  }

  return parts.join('\n\n')
}

async function main() {
  const db = initDb()
  const client = createClient({ title: 'Openflows intake-urls' })
  const today = new Date().toISOString().slice(0, 10)

  let queued = 0
  let failed = 0

  for (const url of URLS) {
    process.stdout.write(`\n${url}\n  fetching...`)
    try {
      const context = await buildContext(url)
      process.stdout.write(' generating...')

      const content = await client.chat(
        SYSTEM,
        `Today's date: ${today}\n\nCreate a knowledge base entry for the following project:\n\n${context}`
      )

      const trimmed = content.replace(/^```[^\n]*\n?/, '').replace(/\n?```\s*$/, '').trimStart()
      const currencyId = extractCurrencyId(trimmed)
      if (!currencyId) {
        throw new Error('model did not include currencyId in frontmatter')
      }

      upsertDraft(db, { id: currencyId, lang: 'en', content: trimmed, sourceUrl: url })
      process.stdout.write(` queued as ${currencyId}\n`)
      queued++
    } catch (err) {
      process.stdout.write(` FAILED: ${err.message}\n`)
      failed++
    }
  }

  console.log(`\nDone — ${queued} queued, ${failed} failed.`)
}

main().catch(err => { console.error(err); process.exit(1) })
