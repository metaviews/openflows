'use strict'

const { buildTimeline } = require('../lib/timeline')

async function timelineRoutes(fastify) {
  fastify.get('/timeline', async (req, reply) => {
    const items = buildTimeline(fastify.db, { limit: req.query.limit })
    if (req.headers['hx-request']) {
      return reply.view('partials/timeline.njk', { timeline: items })
    }
    return reply.send({ timeline: items })
  })
}

module.exports = timelineRoutes
