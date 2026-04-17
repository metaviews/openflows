'use strict'

const { loadManifest } = require('../lib/manifest')
const { listSources } = require('../lib/sources')
const { postToSource, SOCIAL_MODULES } = require('../lib/social-publisher')

const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions'
const CHAR_LIMITS = { twitter: 280, bluesky: 300, mastodon: 500 }

async function socialRoutes(fastify) {
  fastify.get('/social', async (req, reply) => {
    const socialSources = listSources(fastify.db).filter(s => SOCIAL_MODULES.has(s.module))
    const manifest = loadManifest()
    const entries = (manifest?.entries || [])
      .filter(e => e.lang !== 'zh')
      .map(e => ({
        id: e.currencyId,
        title: e.title || e.currencyId,
        type: e.currencyType || 'current',
        abstract: e.abstract || '',
        permalink: e.permalink || `/currency/${e.currencyType}s/${e.currencyId}/`,
      }))
      .sort((a, b) => (a.title || '').localeCompare(b.title || ''))

    const recentPosts = fastify.db.prepare(`
      SELECT payload, created_at FROM events
      WHERE type = 'social_post'
      ORDER BY id DESC LIMIT 20
    `).all().map(row => {
      try { return { ...JSON.parse(row.payload), created_at: row.created_at } } catch { return null }
    }).filter(Boolean)

    return reply.view('social.njk', {
      socialSources,
      recentPosts,
      entriesJson: JSON.stringify(entries),
      charLimitsJson: JSON.stringify(CHAR_LIMITS),
    })
  })

  fastify.post('/api/social/post', async (req, reply) => {
    const { sourceId, content } = req.body || {}
    if (!sourceId || !content) return reply.code(400).send({ error: 'sourceId and content required' })
    try {
      return reply.send(await postToSource(fastify.db, { sourceId, content }))
    } catch (err) {
      fastify.log.error(err)
      return reply.code(err.statusCode || 500).send({ error: err.message })
    }
  })

  fastify.post('/api/social/generate', async (req, reply) => {
    const { sourceId, entryId, hint } = req.body || {}
    if (!sourceId) return reply.code(400).send({ error: 'sourceId required' })

    const source = listSources(fastify.db).find(s => s.id === sourceId)
    if (!source) return reply.code(404).send({ error: 'Source not found' })

    const charLimit = CHAR_LIMITS[source.module] || 500

    let entryContext = ''
    if (entryId) {
      const manifest = loadManifest()
      const entry = (manifest?.entries || []).find(e => e.currencyId === entryId && e.lang !== 'zh')
      if (entry) {
        const permalink = entry.permalink || `/currency/${entry.currencyType}s/${entry.currencyId}/`
        entryContext = [
          `Entry: ${entry.title} (${entry.currencyId}, ${entry.currencyType})`,
          entry.abstract ? `Abstract: ${entry.abstract}` : '',
          `URL: https://openflows.org${permalink}`,
        ].filter(Boolean).join('\n')
      }
    }

    const userPrompt = [
      `Draft a post for ${source.module} about the Openflows knowledge base.`,
      entryContext || 'General post about Openflows — bilingual knowledge base documenting the open source AI ecosystem.',
      hint ? `Operator note: ${hint}` : '',
      '',
      `Requirements: under ${charLimit} characters. Technical, civic tone — no hype, treat AI as infrastructure. Include the entry URL if provided. Return only the post text, no quotes or explanation.`,
    ].filter(Boolean).join('\n')

    const apiKey = process.env.OPENROUTER_API_KEY
    const model = process.env.OPENROUTER_MODEL
    if (!apiKey || !model) return reply.code(500).send({ error: 'OpenRouter not configured' })

    try {
      const response = await globalThis.fetch(OPENROUTER_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
          'HTTP-Referer': 'https://admin.openflows.org',
          'X-Title': 'Openflows-Social-Draft',
        },
        body: JSON.stringify({
          model,
          messages: [
            {
              role: 'system',
              content: 'You are Peng, the agent of Openflows — a bilingual knowledge base documenting the open source AI ecosystem. Write crisp, informative social posts. Technical voice, civic framing, no hype.',
            },
            { role: 'user', content: userPrompt },
          ],
          max_tokens: 200,
          stream: false,
        }),
      })

      if (!response.ok) {
        const errText = await response.text()
        return reply.code(500).send({ error: `OpenRouter error (${response.status}): ${errText}` })
      }

      const data = await response.json()
      const content = data.choices?.[0]?.message?.content?.trim()
      if (!content) return reply.code(500).send({ error: 'No content generated' })
      return reply.send({ ok: true, content })
    } catch (err) {
      fastify.log.error(err)
      return reply.code(500).send({ error: err.message })
    }
  })
}

module.exports = socialRoutes
