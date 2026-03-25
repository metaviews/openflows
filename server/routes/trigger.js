'use strict'

const { runScript } = require('../lib/runner')
const { ensureManifest } = require('../lib/manifest')
const { commitPerspective, commitSeen } = require('../lib/git')

// Tracks types currently running to prevent concurrent duplicate runs.
const activeRuns = new Set()

const ALLOWED = ['intake', 'perspective', 'synthesize', 'digest', 'translate', 'audit', 'enrich', 'refresh']

async function triggerRoutes(fastify) {
  fastify.post('/trigger/:type', async (req, reply) => {
    const { type } = req.params
    if (!ALLOWED.includes(type)) {
      return reply.code(400).send({ error: `Unknown type: ${type}. Allowed: ${ALLOWED.join(', ')}` })
    }
    if (activeRuns.has(type)) {
      return reply.code(409).send({ error: `${type} is already running` })
    }

    activeRuns.add(type)

    // Fire and forget — return immediately, run in background.
    setImmediate(async () => {
      try {
        if (type === 'intake') {
          const args = req.body?.args || ['--sources', 'github,huggingface,brave,opensourceprojects', '--limit', '10']
          await ensureManifest()
          await runScript(fastify.db, 'intake', args)
          await runScript(fastify.db, 'practitioners', ['--limit', '3'])
          await runScript(fastify.db, 'audit')
          await commitSeen().catch(() => {})
        } else if (type === 'perspective') {
          await ensureManifest()
          await runScript(fastify.db, 'synthesize')
          await runScript(fastify.db, 'digest')
          await commitPerspective().catch(() => {})
        } else {
          const args = req.body?.args || []
          await runScript(fastify.db, type, args)
        }
      } catch (err) {
        console.error(`[trigger] ${type} error:`, err.message)
      } finally {
        activeRuns.delete(type)
      }
    })

    return reply.send({ ok: true, queued: type })
  })

  fastify.get('/trigger/active', async (req, reply) => {
    return reply.send({ active: [...activeRuns] })
  })
}

module.exports = triggerRoutes
