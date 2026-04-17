'use strict'

const crypto = require('crypto')
const { loadManifest } = require('../lib/manifest')
const { buildStatusData } = require('./status')
const { buildQueueContext } = require('../lib/drafts')
const {
  TOOL_DEFS,
  executeToolCall,
  partitionToolCalls,
  summarizeToolCall,
  logConfirmedToolCall,
} = require('../lib/peng-tools')
const { createManualRun, appendRunLog, completeManualRun } = require('../lib/runner')

const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions'
const MAX_TOOL_ROUNDS = 4
const CONFIRMATION_TTL_MS = 10 * 60 * 1000
const pendingConfirmations = new Map()

const SYSTEM_PROMPT = `You are Peng (鵬), the agent of Openflows — a bilingual knowledge base documenting the open source AI ecosystem (openflows.org), operated by Metaviews.

Your operating principle: surface li (理), the natural grain in things. Mediate rather than decide. Wu wei — follow what is already forming, name what is already present.

You are queried from the admin dashboard by the operator. Be precise, technical, and concise. You may reference specific entries by their currencyId. When asked about patterns, draw connections across Currents, Circuits, and Practitioners.

You have direct server-side tools for reading and changing the knowledge base. Use tools whenever the operator asks for live queue state, a specific entry or draft, a direct edit, a draft creation, a promotion, or a translation run. Do not claim a change was made unless you actually called the relevant tool and received a successful result.

When making content changes:
- Work from the current entry or draft content first if one already exists.
- Preserve required schema in currency frontmatter.
- For new entries, create a draft first unless the operator clearly asks you to publish immediately.
- For translations, use the translation trigger rather than writing ad hoc Chinese text unless the operator explicitly wants a manual replacement.
- For source discovery, create source proposals only; do not activate discovered sources without operator approval.
- For practitioner social profiles, read the audit first and apply only a specific candidate after operator confirmation.
- Read tools may run immediately. Write or run tools require operator confirmation; if confirmation is required, briefly explain the proposed action and wait for the dashboard confirmation flow.

When the operator shares a URL (GitHub repo, project site, person page, paper, etc.):
- Always call fetch_url first to read the actual content before drafting.
- If the URL is a GitHub repo, also fetch https://raw.githubusercontent.com/{owner}/{repo}/main/README.md (or /master/README.md) for richer detail.
- Do not write an entry from training memory alone when a URL is available — the fetched content is the authoritative source.

Currency entry schema (required frontmatter for all new drafts):
\`\`\`yaml
layout: layouts/currency-item.njk
title: <clear descriptive title>
date: <YYYY-MM-DD>
currencyType: current | circuit | practitioner
currencyId: <kebab-case-unique-id>
tags: [currency]
permalink: /currency/<type>/<id>/
abstract: <1-2 sentence summary — required>
\`\`\`
Optional frontmatter: links (array with id+relation), mediation (tooling/use/humanRole/limits — required when AI shaped content).
Body: substantive prose, not thin. For currents: what it is, why it matters for open AI ecosystem, notable technical aspects. For circuits: patterns of practice, governance/risk framing. For practitioners: role, contribution, relevant projects. Run a linkage check — reference related currencyIds in the body and add links frontmatter if strong connections exist.`

async function askRoutes(fastify) {
  fastify.post('/ask/confirmation/:token/cancel', async (req, reply) => {
    const canceled = cancelPendingConfirmation(fastify.db, req.params.token)
    return reply.send({ ok: true, canceled })
  })

  fastify.post('/ask', async (req, reply) => {
    const { question, messages, confirmation } = req.body || {}
    if (!question && (!messages || messages.length === 0)) {
      return reply.code(400).send({ error: 'question or messages required' })
    }

    const manifest = loadManifest()
    const statusData = buildStatusData(fastify.db)

    const systemPrompt = [
      SYSTEM_PROMPT,
      `\nKnowledge base (${manifest?.entries?.length || 0} entries, all languages):`,
      buildManifestContext(manifest),
      '\nCurrent queue (pending drafts):',
      buildQueueContext(fastify.db),
      '\nKB status:',
      buildStatusContext(statusData),
    ].join('\n')

    const history = Array.isArray(messages) ? [...messages] : []
    if (question) history.push({ role: 'user', content: question })

    let toolAugmentedHistory = history
    let toolSummaries = []
    try {
      const resolved = await resolveToolCalls(fastify, systemPrompt, history, { confirmation })
      if (resolved.confirmationRequired) {
        return streamConfirmation(reply, resolved.confirmationRequired)
      }
      toolAugmentedHistory = resolved.history
      toolSummaries = collectToolSummaries(toolAugmentedHistory)
    } catch (err) {
      fastify.log.error(err)
      toolAugmentedHistory = [
        ...history,
        {
          role: 'system',
          content: `Tool planning failed: ${err.message}`,
        },
      ]
    }

    reply.hijack()
    const res = reply.raw
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'X-Accel-Buffering': 'no',
    })

    let fullText = ''

    try {
      const upstream = await fetch(OPENROUTER_URL, {
        method: 'POST',
        headers: buildHeaders(),
        body: JSON.stringify({
          model: process.env.OPENROUTER_MODEL,
          messages: [{ role: 'system', content: systemPrompt }, ...toolAugmentedHistory],
          stream: true,
        }),
      })

      if (!upstream.ok) {
        const err = await upstream.text()
        res.write(`data: ${JSON.stringify({ error: err })}\n\n`)
        res.end()
        return
      }

      const reader = upstream.body.getReader()
      const decoder = new TextDecoder()
      let buffer = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n')
        buffer = lines.pop()
        for (const line of lines) {
          if (!line.startsWith('data: ')) continue
          const data = line.slice(6).trim()
          if (data === '[DONE]') {
            saveConversation(fastify.db, history, fullText)
            if (toolSummaries.length) res.write(`data: ${JSON.stringify({ tools: toolSummaries })}\n\n`)
            res.write('data: [DONE]\n\n')
            res.end()
            return
          }
          try {
            const parsed = JSON.parse(data)
            const text = parsed.choices?.[0]?.delta?.content
            if (text) {
              fullText += text
              res.write(`data: ${JSON.stringify({ text })}\n\n`)
            }
          } catch {
            // Ignore malformed SSE lines
          }
        }
      }
    } catch (err) {
      fastify.log.error(err)
      res.write(`data: ${JSON.stringify({ error: err.message })}\n\n`)
    }

    if (fullText) saveConversation(fastify.db, history, fullText)
    if (toolSummaries.length) res.write(`data: ${JSON.stringify({ tools: toolSummaries })}\n\n`)
    res.end()
  })
}

async function resolveToolCalls(fastify, systemPrompt, history, { confirmation } = {}) {
  let working = [...history]

  if (confirmation?.token) {
    prunePendingConfirmations(fastify.db)
    const pending = consumePendingConfirmation(confirmation.token)
    if (!pending) {
      const err = new Error('Confirmation expired or already used')
      err.statusCode = 409
      throw err
    }
    working = pending.working
    const runId = pending.runId || createManualRun(fastify.db, 'peng-tool', 'confirmed dashboard tool call')
    appendRunLog(fastify.db, runId, `Confirmed by operator at ${new Date().toISOString()}\n`)
    let failed = 0
    for (const toolCall of pending.toolCalls) {
      let payload
      const summary = summarizeToolCall(toolCall)
      appendRunLog(fastify.db, runId, `\n> ${summary.name}${summary.id ? ` ${summary.id}` : ''}${summary.lang ? ` (${summary.lang})` : ''}\n`)
      try {
        const result = await executeToolCall(fastify, toolCall)
        logConfirmedToolCall(fastify.db, { toolCall, result })
        appendRunLog(fastify.db, runId, `${JSON.stringify(safeToolResult(result), null, 2)}\n`)
        payload = { ok: true, result }
      } catch (err) {
        failed++
        logConfirmedToolCall(fastify.db, { toolCall, error: err })
        appendRunLog(fastify.db, runId, `ERROR: ${err.message}\n`)
        payload = { ok: false, error: err.message, statusCode: err.statusCode || 500 }
      }

      working.push({
        role: 'tool',
        tool_call_id: toolCall.id,
        content: JSON.stringify(payload),
      })
    }
    completeManualRun(fastify.db, runId, {
      status: failed ? 'error' : 'success',
      summary: `${pending.toolCalls.length} confirmed Peng tool call(s), ${failed} error(s)`,
    })
  }

  for (let round = 0; round < MAX_TOOL_ROUNDS; round++) {
    const response = await fetchCompletion({
      model: process.env.OPENROUTER_MODEL,
      messages: [{ role: 'system', content: systemPrompt }, ...working],
      tools: TOOL_DEFS,
      tool_choice: 'auto',
      stream: false,
    })

    const message = response?.choices?.[0]?.message
    const toolCalls = message?.tool_calls || []
    if (!toolCalls.length) return { history: working }

    working.push({
      role: 'assistant',
      content: message.content || '',
      tool_calls: toolCalls,
    })

    const { readToolCalls, writeToolCalls } = partitionToolCalls(toolCalls)
    for (const toolCall of readToolCalls) {
      let payload
      try {
        const result = await executeToolCall(fastify, toolCall)
        payload = { ok: true, result }
      } catch (err) {
        payload = { ok: false, error: err.message, statusCode: err.statusCode || 500 }
      }

      working.push({
        role: 'tool',
        tool_call_id: toolCall.id,
        content: JSON.stringify(payload),
      })
    }

    if (writeToolCalls.length) {
      return {
        confirmationRequired: storePendingConfirmation(fastify.db, { working, toolCalls: writeToolCalls }),
      }
    }
  }

  return { history: working }
}

function streamConfirmation(reply, confirmation) {
  reply.hijack()
  const res = reply.raw
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'X-Accel-Buffering': 'no',
  })
  res.write(`data: ${JSON.stringify({ confirmation })}\n\n`)
  res.write('data: [DONE]\n\n')
  res.end()
}

function storePendingConfirmation(db, { working, toolCalls }) {
  prunePendingConfirmations(db)
  const token = crypto.randomUUID()
  const expiresAt = Date.now() + CONFIRMATION_TTL_MS
  const runId = createManualRun(db, 'peng-tool', 'awaiting operator confirmation')
  appendRunLog(db, runId, `Peng proposed ${toolCalls.length} write/run tool call(s).\n`)
  for (const toolCall of toolCalls) {
    appendRunLog(db, runId, `${JSON.stringify(summarizeToolCall(toolCall), null, 2)}\n`)
  }
  appendRunLog(db, runId, `Awaiting confirmation until ${new Date(expiresAt).toISOString()}.\n`)
  pendingConfirmations.set(token, { working, toolCalls, expiresAt, runId })
  return {
    token,
    runId,
    expiresAt: new Date(expiresAt).toISOString(),
    tools: toolCalls.map(summarizeToolCall),
  }
}

function safeToolResult(result) {
  if (!result || typeof result !== 'object') return result
  const safe = {
    ok: result.ok !== false,
    id: result.id || result.draft?.id || result.entry?.currencyId || null,
    candidateKey: result.candidateKey || null,
    proposalId: result.proposalId || result.proposal?.id || null,
    lang: result.lang || result.draft?.lang || result.entry?.lang || null,
    type: result.type || result.draft?.type || result.entry?.currencyType || null,
    status: result.status || result.draft?.status || null,
    path: result.path || null,
    runId: result.runId || null,
    queued: result.queued || null,
  }
  return Object.fromEntries(Object.entries(safe).filter(([, value]) => value !== null))
}

function consumePendingConfirmation(token) {
  const pending = pendingConfirmations.get(token)
  if (!pending) return null
  pendingConfirmations.delete(token)
  if (pending.expiresAt < Date.now()) return null
  return pending
}

function cancelPendingConfirmation(db, token) {
  const pending = pendingConfirmations.get(token)
  if (!pending) return false
  pendingConfirmations.delete(token)
  appendRunLog(db, pending.runId, `Canceled by operator at ${new Date().toISOString()}.\n`)
  completeManualRun(db, pending.runId, { status: 'canceled', summary: 'operator canceled Peng tool call' })
  return true
}

function prunePendingConfirmations(db) {
  const now = Date.now()
  for (const [token, pending] of pendingConfirmations.entries()) {
    if (pending.expiresAt < now) {
      pendingConfirmations.delete(token)
      if (db && pending.runId) {
        appendRunLog(db, pending.runId, `Confirmation expired at ${new Date(now).toISOString()}.\n`)
        completeManualRun(db, pending.runId, { status: 'error', summary: 'Peng tool confirmation expired' })
      }
    }
  }
}

async function fetchCompletion(body) {
  const upstream = await fetch(OPENROUTER_URL, {
    method: 'POST',
    headers: buildHeaders(),
    body: JSON.stringify(body),
  })

  if (!upstream.ok) {
    const err = await upstream.text()
    throw new Error(`OpenRouter ${upstream.status}: ${err}`)
  }

  return upstream.json()
}

function buildHeaders() {
  return {
    'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
    'Content-Type': 'application/json',
    'HTTP-Referer': 'https://openflows.org',
    'X-Title': 'Openflows Dashboard',
  }
}

function saveConversation(db, history, assistantText) {
  const messages = [...history, { role: 'assistant', content: assistantText }]
  const now = new Date().toISOString()
  try {
    db.prepare('INSERT INTO conversations (messages, created_at, updated_at) VALUES (?, ?, ?)')
      .run(JSON.stringify(messages), now, now)
  } catch (err) {
    console.error('[ask] failed to save conversation:', err.message)
  }
}

function buildStatusContext(statusData) {
  const { kbCounts, recentRun } = statusData
  const parts = []
  if (kbCounts) {
    parts.push(
      `${kbCounts.byLang?.en || 0} en / ${kbCounts.byLang?.zh || 0} zh entries` +
      ` (${kbCounts.byType?.current || 0} currents, ${kbCounts.byType?.circuit || 0} circuits,` +
      ` ${kbCounts.byType?.practitioner || 0} practitioners)`
    )
  }
  if (recentRun) {
    parts.push(`Last run: ${recentRun.type} (${recentRun.status}) at ${recentRun.started_at?.slice(0, 16)}`)
  }
  return parts.join('\n') || 'Status unavailable.'
}

function buildManifestContext(manifest) {
  if (!manifest?.entries?.length) return 'Manifest unavailable.'
  return manifest.entries
    .map(entry => `[${entry.currencyType}|${entry.currencyId}|${entry.lang}] ${entry.title}: ${entry.abstract || '(no abstract)'}`)
    .join('\n')
}

function collectToolSummaries(messages) {
  const summaries = []
  for (const message of messages) {
    if (!Array.isArray(message.tool_calls)) continue
    for (const toolCall of message.tool_calls) {
      summaries.push(summarizeToolCall(toolCall))
    }
  }
  return summaries
}

module.exports = askRoutes
