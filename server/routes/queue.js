'use strict'

const { promoteEntry } = require('../lib/git')

async function queueRoutes(fastify) {
  // List pending drafts (or by status).
  fastify.get('/queue', async (req, reply) => {
    const status = req.query.status || 'pending'
    const lang = req.query.lang

    let query = `SELECT id, lang, type, title, abstract, status, created_at, updated_at
                 FROM drafts WHERE status = ?`
    const params = [status]
    if (lang) { query += ' AND lang = ?'; params.push(lang) }
    query += ' ORDER BY created_at DESC'

    const drafts = fastify.db.prepare(query).all(...params)

    if (req.headers['hx-request']) {
      return reply.view('partials/queue.njk', { drafts, status, lang })
    }
    return reply.send({ drafts })
  })

  // Queue state panel (htmx refresh target).
  fastify.get('/queue/state', async (req, reply) => {
    const drafts = fastify.db.prepare(
      `SELECT id, lang, type, title FROM drafts WHERE status = 'pending' ORDER BY created_at DESC`
    ).all()
    return reply.view('partials/queue-state.njk', { drafts })
  })

  // Get a single draft with full content (JSON).
  fastify.get('/queue/:id', async (req, reply) => {
    const lang = req.query.lang || 'en'
    const draft = fastify.db.prepare('SELECT * FROM drafts WHERE id = ? AND lang = ?')
      .get(req.params.id, lang)
    if (!draft) return reply.code(404).send({ error: 'Not found' })
    return reply.send(draft)
  })

  // Update draft content in SQLite (pre-promotion editing).
  fastify.post('/queue/:id/update', async (req, reply) => {
    const { id } = req.params
    const lang = req.query.lang || 'en'
    const { content } = req.body || {}
    if (!content) return reply.code(400).send({ error: 'content required' })

    const db = fastify.db
    const draft = db.prepare('SELECT id, lang, status FROM drafts WHERE id = ? AND lang = ?').get(id, lang)
    if (!draft) return reply.code(404).send({ error: 'Not found' })
    if (draft.status !== 'pending') return reply.code(409).send({ error: 'Draft is not pending' })

    const now = new Date().toISOString()
    db.prepare('UPDATE drafts SET content = ?, updated_at = ? WHERE id = ? AND lang = ?')
      .run(content, now, id, lang)

    return reply.send({ ok: true })
  })

  // Promote a draft to src/ via git.
  fastify.post('/queue/:id/promote', async (req, reply) => {
    const { id } = req.params
    const lang = req.query.lang || 'en'
    const db = fastify.db

    const draft = db.prepare('SELECT * FROM drafts WHERE id = ? AND lang = ?').get(id, lang)
    if (!draft) return reply.code(404).send({ error: 'Not found' })
    if (!draft.type) return reply.code(400).send({ error: 'Draft has no currencyType — cannot promote' })
    if (draft.status === 'promoted') return reply.code(409).send({ error: 'Already promoted' })

    try {
      const result = await promoteEntry({
        id: draft.id,
        lang: draft.lang,
        content: draft.content,
        currencyType: draft.type,
      })

      const now = new Date().toISOString()
      db.prepare(`UPDATE drafts SET status = 'promoted', updated_at = ? WHERE id = ? AND lang = ?`)
        .run(now, id, lang)
      db.prepare(`INSERT INTO events (type, payload, created_at) VALUES (?, ?, ?)`)
        .run('promote', JSON.stringify({ id, lang, path: result.path }), now)

      const updated = { ...draft, status: 'promoted' }
      if (req.headers['hx-request']) {
        return reply.view('partials/queue-row.njk', { draft: updated })
      }
      return reply.send({ ok: true, path: result.path })
    } catch (err) {
      fastify.log.error(err)
      return reply.code(500).send({ error: err.message })
    }
  })

  // Reject a draft (mark as rejected, stays in DB for audit trail).
  fastify.post('/queue/:id/reject', async (req, reply) => {
    const { id } = req.params
    const lang = req.query.lang || 'en'
    const db = fastify.db

    const draft = db.prepare('SELECT id, lang, type, title, status FROM drafts WHERE id = ? AND lang = ?').get(id, lang)
    if (!draft) return reply.code(404).send({ error: 'Not found' })

    const now = new Date().toISOString()
    db.prepare(`UPDATE drafts SET status = 'rejected', updated_at = ? WHERE id = ? AND lang = ?`)
      .run(now, id, lang)
    db.prepare(`INSERT INTO events (type, payload, created_at) VALUES (?, ?, ?)`)
      .run('reject', JSON.stringify({ id, lang }), now)

    const updated = { ...draft, status: 'rejected' }
    if (req.headers['hx-request']) {
      return reply.view('partials/queue-row.njk', { draft: updated })
    }
    return reply.send({ ok: true })
  })
}

module.exports = queueRoutes
