'use strict'

const { listDrafts, getDraft, updateDraftContent, promoteDraft, rejectDraft } = require('../lib/drafts')

async function queueRoutes(fastify) {
  // List pending drafts (or by status).
  fastify.get('/queue', async (req, reply) => {
    const status = req.query.status || 'pending'
    const lang = req.query.lang
    const drafts = listDrafts(fastify.db, { status, lang })

    if (req.headers['hx-request']) {
      return reply.view('partials/queue.njk', { drafts, status, lang })
    }
    return reply.send({ drafts })
  })

  // Queue state panel (htmx refresh target).
  fastify.get('/queue/state', async (req, reply) => {
    const drafts = listDrafts(fastify.db, { status: 'pending' })
    return reply.view('partials/queue-state.njk', { drafts })
  })

  // Get a single draft with full content (JSON).
  fastify.get('/queue/:id', async (req, reply) => {
    const lang = req.query.lang || 'en'
    try {
      return reply.send(getDraft(fastify.db, { id: req.params.id, lang }))
    } catch (err) {
      return reply.code(err.statusCode || 500).send({ error: err.message })
    }
  })

  // Update draft content in SQLite (pre-promotion editing).
  fastify.post('/queue/:id/update', async (req, reply) => {
    const { id } = req.params
    const lang = req.query.lang || 'en'
    const { content } = req.body || {}
    if (!content) return reply.code(400).send({ error: 'content required' })

    try {
      updateDraftContent(fastify.db, { id, lang, content })
      return reply.send({ ok: true })
    } catch (err) {
      return reply.code(err.statusCode || 500).send({ error: err.message })
    }
  })

  // Promote a draft to src/ via git.
  fastify.post('/queue/:id/promote', async (req, reply) => {
    const { id } = req.params
    const lang = req.query.lang || 'en'
    try {
      const existing = getDraft(fastify.db, { id, lang })
      const result = await promoteDraft(fastify.db, { id, lang })
      const updated = { ...existing, status: 'promoted' }
      if (req.headers['hx-request']) {
        return reply.view('partials/queue-row.njk', { draft: updated })
      }
      return reply.send(result)
    } catch (err) {
      fastify.log.error(err)
      return reply.code(err.statusCode || 500).send({ error: err.message })
    }
  })

  // Reject a draft (mark as rejected, stays in DB for audit trail).
  fastify.post('/queue/:id/reject', async (req, reply) => {
    const { id } = req.params
    const lang = req.query.lang || 'en'
    try {
      const updated = rejectDraft(fastify.db, { id, lang })
      if (req.headers['hx-request']) {
        return reply.view('partials/queue-row.njk', { draft: updated })
      }
      return reply.send({ ok: true })
    } catch (err) {
      return reply.code(err.statusCode || 500).send({ error: err.message })
    }
  })
}

module.exports = queueRoutes
