'use strict'

const { getRunStream } = require('../lib/runner')

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

  // Live log stream — serves buffered output for running jobs,
  // or the stored log from DB for completed ones.
  fastify.get('/runs/:id/stream', async (req, reply) => {
    const runId = parseInt(req.params.id)
    if (isNaN(runId)) return reply.code(400).send({ error: 'invalid id' })

    reply.hijack()
    const res = reply.raw
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'X-Accel-Buffering': 'no',
    })

    const stream = getRunStream(runId)

    if (stream) {
      // Flush buffered lines first.
      for (const line of stream.lines) {
        res.write(`data: ${JSON.stringify({ text: line })}\n\n`)
      }

      if (stream.done) {
        res.write('data: [DONE]\n\n')
        res.end()
        return
      }

      // Subscribe to live output.
      const onText = (text) => res.write(`data: ${JSON.stringify({ text })}\n\n`)
      const onDone = () => { res.write('data: [DONE]\n\n'); res.end() }

      stream.listeners.add(onText)
      stream.doneListeners.add(onDone)

      req.raw.on('close', () => {
        stream.listeners.delete(onText)
        stream.doneListeners.delete(onDone)
      })
    } else {
      // Already completed — serve stored log.
      const run = fastify.db.prepare('SELECT log, status FROM runs WHERE id = ?').get(runId)
      if (!run) {
        res.write(`data: ${JSON.stringify({ error: 'Run not found' })}\n\n`)
        res.end()
        return
      }
      if (run.log) res.write(`data: ${JSON.stringify({ text: run.log })}\n\n`)
      res.write('data: [DONE]\n\n')
      res.end()
    }
  })
}

module.exports = runsRoutes
