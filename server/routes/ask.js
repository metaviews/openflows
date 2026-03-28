'use strict'

const { loadManifest } = require('../lib/manifest')
const { buildStatusData } = require('./status')

const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions'

const SYSTEM_PROMPT = `You are Peng (鵬), the agent of Openflows — a bilingual knowledge base documenting the open source AI ecosystem (openflows.org), operated by Metaviews.

Your operating principle: surface li (理), the natural grain in things. Mediate rather than decide. Wu wei — follow what is already forming, name what is already present.

You are queried from the admin dashboard by the operator. Be precise, technical, and concise. You may reference specific entries by their currencyId. When asked about patterns, draw connections across Currents, Circuits, and Practitioners. When asked about the queue, report what is pending, its type and language.`

async function askRoutes(fastify) {
  fastify.post('/ask', async (req, reply) => {
    const { question, messages } = req.body || {}
    if (!question && (!messages || messages.length === 0)) {
      return reply.code(400).send({ error: 'question or messages required' })
    }

    const manifest = loadManifest()
    const statusData = buildStatusData(fastify.db)

    const systemPrompt = [
      SYSTEM_PROMPT,
      `\nKnowledge base (${manifest?.entries?.length || 0} entries, English):`,
      buildManifestContext(manifest),
      '\nCurrent queue (pending drafts):',
      buildQueueContext(fastify.db),
      '\nKB status:',
      buildStatusContext(statusData),
    ].join('\n')

    // Build message history — client sends prior turns, server appends current question.
    const history = Array.isArray(messages) ? [...messages] : []
    if (question) history.push({ role: 'user', content: question })

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
        headers: {
          'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://openflows.org',
          'X-Title': 'Openflows Dashboard',
        },
        body: JSON.stringify({
          model: process.env.OPENROUTER_MODEL,
          messages: [{ role: 'system', content: systemPrompt }, ...history],
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
    res.end()
  })
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

function buildQueueContext(db) {
  const pending = db.prepare(
    `SELECT id, type, lang, title FROM drafts WHERE status = 'pending' ORDER BY created_at DESC`
  ).all()
  if (!pending.length) return 'No pending drafts.'
  return pending
    .map(d => `[${d.type || '?'}|${d.id}|${d.lang}] ${d.title || '(untitled)'}`)
    .join('\n')
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
    .filter(e => e.lang !== 'zh')
    .map(e => `[${e.currencyType}|${e.currencyId}] ${e.title}: ${e.abstract || '(no abstract)'}`)
    .join('\n')
}

module.exports = askRoutes
