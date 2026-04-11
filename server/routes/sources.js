'use strict'

const fs = require('fs')
const path = require('path')
const {
  listSources,
  getSource,
  upsertSource,
  removeSource,
  listSourceProposals,
  proposeSource,
  approveSourceProposal,
  rejectSourceProposal,
  validateSourceInput,
} = require('../lib/sources')
const { loadSourceRegistry } = require('../../scripts/lib/source-registry')
const { queueTrigger } = require('../lib/triggers')

const ROOT = path.join(__dirname, '..', '..')
const MODULES_DIR = path.join(ROOT, 'scripts', 'sources')

async function sourcesRoutes(fastify) {
  fastify.get('/sources', async (req, reply) => {
    return reply.view('sources.njk', {
      sources: listSources(fastify.db),
      proposals: listSourceProposals(fastify.db, { status: req.query.status || 'pending' }),
    })
  })

  fastify.get('/sources/new', async (req, reply) => {
    return reply.view('source-edit.njk', {
      source: { id: '', module: 'brave', label: '', enabled: false, notes: '', config: {} },
      sourceConfigJson: '{}',
      modules: sourceModules(),
      mode: 'new',
    })
  })

  fastify.get('/sources/:id/edit', async (req, reply) => {
    try {
      const source = getSource(req.params.id)
      return reply.view('source-edit.njk', {
        source,
        sourceConfigJson: JSON.stringify(source.config || {}, null, 2),
        modules: sourceModules(),
        mode: 'edit',
      })
    } catch (err) {
      return reply.code(err.statusCode || 500).send(err.message)
    }
  })

  fastify.get('/api/sources', async (req, reply) => {
    return reply.send({ sources: listSources(fastify.db) })
  })

  fastify.get('/api/sources/proposals', async (req, reply) => {
    return reply.send({ proposals: listSourceProposals(fastify.db, req.query || {}) })
  })

  fastify.post('/api/sources/validate', async (req, reply) => {
    try {
      validateSourceInput(req.body || {})
      return reply.send({ ok: true, issues: [] })
    } catch (err) {
      return reply.send({ ok: false, issues: [{ severity: 'error', message: err.message }] })
    }
  })

  fastify.post('/api/sources/save', async (req, reply) => {
    try {
      return reply.send(await upsertSource(fastify.db, req.body || {}))
    } catch (err) {
      fastify.log.error(err)
      return reply.code(err.statusCode || 500).send({ error: err.message })
    }
  })

  fastify.post('/api/sources/:id/remove', async (req, reply) => {
    try {
      return reply.send(await removeSource(fastify.db, req.params.id))
    } catch (err) {
      fastify.log.error(err)
      return reply.code(err.statusCode || 500).send({ error: err.message })
    }
  })

  fastify.post('/api/sources/:id/toggle', async (req, reply) => {
    try {
      const source = getSource(req.params.id)
      return reply.send(await upsertSource(fastify.db, { ...source, enabled: !source.enabled }))
    } catch (err) {
      fastify.log.error(err)
      return reply.code(err.statusCode || 500).send({ error: err.message })
    }
  })

  fastify.post('/api/sources/proposals', async (req, reply) => {
    try {
      return reply.send(proposeSource(fastify.db, req.body || {}))
    } catch (err) {
      return reply.code(err.statusCode || 500).send({ error: err.message })
    }
  })

  fastify.post('/api/sources/proposals/:id/approve', async (req, reply) => {
    try {
      return reply.send(await approveSourceProposal(fastify.db, Number(req.params.id)))
    } catch (err) {
      fastify.log.error(err)
      return reply.code(err.statusCode || 500).send({ error: err.message })
    }
  })

  fastify.post('/api/sources/proposals/:id/reject', async (req, reply) => {
    try {
      return reply.send(rejectSourceProposal(fastify.db, Number(req.params.id)))
    } catch (err) {
      return reply.code(err.statusCode || 500).send({ error: err.message })
    }
  })

  fastify.post('/api/sources/discover', async (req, reply) => {
    try {
      return reply.send(await queueTrigger(fastify.db, 'discover-sources', []))
    } catch (err) {
      return reply.code(err.statusCode || 500).send({ error: err.message })
    }
  })
}

function sourceModules() {
  const registryModules = loadSourceRegistry().sources.map(source => source.module)
  const fileModules = fs.existsSync(MODULES_DIR)
    ? fs.readdirSync(MODULES_DIR).filter(file => file.endsWith('.js')).map(file => path.basename(file, '.js'))
    : []
  return [...new Set([...registryModules, ...fileModules])].sort()
}

module.exports = sourcesRoutes
