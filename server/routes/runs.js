'use strict'

async function runsRoutes(fastify) {
  fastify.get('/runs', async (req, reply) => {
    const limit = Math.min(parseInt(req.query.limit) || 20, 100)
    const runs = fastify.db.prepare(
      `SELECT id, type, started_at, completed_at, status, summary FROM runs ORDER BY id DESC LIMIT ?`
    ).all(limit)

    if (req.headers['hx-request']) {
      return reply.view('partials/activity.njk', { runs })
    }
    return reply.send({ runs })
  })

  fastify.get('/runs/:id', async (req, reply) => {
    const run = fastify.db.prepare('SELECT * FROM runs WHERE id = ?').get(req.params.id)
    if (!run) return reply.code(404).send({ error: 'Not found' })
    return reply.send(run)
  })
}

module.exports = runsRoutes
