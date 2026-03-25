'use strict'

const path = require('path')
const { loadManifest } = require('../lib/manifest')

const ROOT = path.join(__dirname, '..', '..')
const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions'

const SYSTEM_PROMPT = `You are Peng (鵬), the agent of Openflows — a bilingual knowledge base documenting the open source AI ecosystem (openflows.org), operated by Metaviews.

Your operating principle: surface li (理), the natural grain in things. Mediate rather than decide. Wu wei — follow what is already forming, name what is already present.

You are queried from the admin dashboard. Be precise, technical, and concise. You may reference specific entries by their currencyId. When asked about patterns, draw connections across Currents, Circuits, and Practitioners.`

async function askRoutes(fastify) {
  fastify.post('/ask', async (req, reply) => {
    const { question, messages } = req.body || {}
    if (!question && !messages) {
      return reply.code(400).send({ error: 'question or messages required' })
    }

    const manifest = loadManifest()
    const context = buildContext(manifest)

    // Construct message history (supports multi-turn if messages[] is provided).
    const history = messages && Array.isArray(messages) ? messages : []
    if (question) history.push({ role: 'user', content: question })

    const systemPrompt = `${SYSTEM_PROMPT}\n\nKnowledge base (${manifest?.entries?.length || 0} entries, English only shown):\n${context}`

    // Hijack response for streaming.
    reply.hijack()
    const res = reply.raw
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'X-Accel-Buffering': 'no',
    })

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
        buffer = lines.pop() // Keep incomplete last line in buffer
        for (const line of lines) {
          if (!line.startsWith('data: ')) continue
          const data = line.slice(6).trim()
          if (data === '[DONE]') {
            res.write('data: [DONE]\n\n')
            res.end()
            return
          }
          try {
            const parsed = JSON.parse(data)
            const text = parsed.choices?.[0]?.delta?.content
            if (text) res.write(`data: ${JSON.stringify({ text })}\n\n`)
          } catch {
            // Ignore malformed SSE lines
          }
        }
      }
    } catch (err) {
      fastify.log.error(err)
      res.write(`data: ${JSON.stringify({ error: err.message })}\n\n`)
    }

    res.end()
  })
}

// Build a compact context string from the manifest for Peng's system prompt.
// Uses abstracts only to stay within token budget.
function buildContext(manifest) {
  if (!manifest?.entries?.length) return 'Manifest unavailable.'
  const entries = manifest.entries.filter((e) => e.lang !== 'zh')
  return entries
    .map((e) => `[${e.currencyType}|${e.currencyId}] ${e.title}: ${e.abstract || '(no abstract)'}`)
    .join('\n')
}

module.exports = askRoutes
