'use strict'

const { ALLOWED, activeRuns, queueTrigger } = require('../lib/triggers')

async function triggerRoutes(fastify) {
  fastify.post('/trigger/:type', async (req, reply) => {
    const { type } = req.params
    const args = req.body?.args || []
    try {
      return reply.send(await queueTrigger(fastify.db, type, args))
    } catch (err) {
      return reply.code(err.statusCode || 500).send({ error: err.message })
    }
  })

  fastify.get('/trigger/active', async (req, reply) => {
    return reply.send({ active: [...activeRuns] })
  })
}

module.exports = triggerRoutes
