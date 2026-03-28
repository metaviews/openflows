'use strict'

const { runScript } = require('../lib/runner')
const { ensureManifest } = require('../lib/manifest')
const { commitPerspective, commitSeen } = require('../lib/git')

// Tracks types currently running to prevent concurrent duplicate runs.
const activeRuns = new Set()

const ALLOWED = ['intake', 'perspective', 'synthesize', 'digest', 'translate', 'audit', 'enrich', 'refresh']
const COMPOUND = ['intake', 'perspective'] // run multiple scripts sequentially

async function triggerRoutes(fastify) {
  fastify.post('/trigger/:type', async (req, reply) => {
    const { type } = req.params
    if (!ALLOWED.includes(type)) {
      return reply.code(400).send({ error: `Unknown type: ${type}. Allowed: ${ALLOWED.join(', ')}` })
    }
    if (activeRuns.has(type)) {
      return reply.code(409).send({ error: `${type} is already running` })
    }

    // For single-script triggers, pre-create the run record so we can return
    // the runId immediately — the client uses it to open the live log stream.
    let runId = null
    const isCompound = COMPOUND.includes(type)
    if (!isCompound) {
      const { lastInsertRowid } = fastify.db.prepare(
        `INSERT INTO runs (type, started_at, status) VALUES (?, ?, 'running')`
      ).run(type, new Date().toISOString())
      runId = Number(lastInsertRowid)
    }

    const args = req.body?.args || []

    activeRuns.add(type)

    setImmediate(async () => {
      try {
        if (type === 'intake') {
          const intakeArgs = args.length ? args : ['--sources', 'github,huggingface,brave,opensourceprojects', '--limit', '10']
          await ensureManifest()
          await runScript(fastify.db, 'intake', intakeArgs)
          await runScript(fastify.db, 'practitioners', ['--limit', '3'])
          await runScript(fastify.db, 'audit')
          await commitSeen().catch(() => {})
        } else if (type === 'perspective') {
          await ensureManifest()
          await runScript(fastify.db, 'synthesize')
          await runScript(fastify.db, 'digest')
          await commitPerspective().catch(() => {})
        } else {
          await runScript(fastify.db, type, args, runId)
        }
      } catch (err) {
        console.error(`[trigger] ${type} error:`, err.message)
        // Mark pre-created run as error if runScript didn't get to update it.
        if (runId) {
          fastify.db.prepare(
            `UPDATE runs SET status = 'error', completed_at = ?, summary = ? WHERE id = ? AND status = 'running'`
          ).run(new Date().toISOString(), err.message, runId)
        }
      } finally {
        activeRuns.delete(type)
      }
    })

    return reply.send({ ok: true, queued: type, runId })
  })

  fastify.get('/trigger/active', async (req, reply) => {
    return reply.send({ active: [...activeRuns] })
  })
}

module.exports = triggerRoutes
