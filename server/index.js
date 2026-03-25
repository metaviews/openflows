'use strict'

const path = require('path')
const Fastify = require('fastify')
const { loadEnv } = require('../scripts/lib/openrouter')

// Load .env from repo root before anything else.
loadEnv(path.join(__dirname, '..'))

const { initDb } = require('./db')
const { startCron } = require('./cron')
const { buildStatusData } = require('./routes/status')
const { loadManifest } = require('./lib/manifest')

async function start() {
  const fastify = Fastify({ logger: { level: process.env.LOG_LEVEL || 'info' } })

  // ── Database ────────────────────────────────────────────────────────────────
  const db = initDb()
  fastify.decorate('db', db)

  // ── Content type parsers ─────────────────────────────────────────────────────
  // htmx sends POST requests as application/x-www-form-urlencoded by default.
  fastify.addContentTypeParser('application/x-www-form-urlencoded', (req, payload, done) => done(null, {}))

  // ── Plugins ─────────────────────────────────────────────────────────────────
  await fastify.register(require('@fastify/static'), {
    root: path.join(__dirname, 'public'),
    prefix: '/',
  })

  await fastify.register(require('@fastify/view'), {
    engine: { nunjucks: require('nunjucks') },
    templates: path.join(__dirname, 'views'),
    options: { noCache: process.env.NODE_ENV !== 'production' },
  })

  // ── Routes ───────────────────────────────────────────────────────────────────
  fastify.register(require('./routes/status'), { prefix: '/api' })
  fastify.register(require('./routes/queue'), { prefix: '/api' })
  fastify.register(require('./routes/runs'), { prefix: '/api' })
  fastify.register(require('./routes/trigger'), { prefix: '/api' })
  fastify.register(require('./routes/ask'), { prefix: '/api' })
  fastify.register(require('./routes/entries'))

  // ── Queue draft edit page ─────────────────────────────────────────────────────
  fastify.get('/queue/:id/edit', async (req, reply) => {
    const { id } = req.params
    const lang = req.query.lang || 'en'
    const draft = db.prepare('SELECT * FROM drafts WHERE id = ? AND lang = ?').get(id, lang)
    if (!draft) return reply.code(404).send('Draft not found')
    return reply.view('draft-edit.njk', { draft, lang })
  })

  // ── Dashboard ────────────────────────────────────────────────────────────────
  fastify.get('/', async (req, reply) => {
    const manifest = loadManifest()
    const statusData = buildStatusData(db)
    const drafts = db.prepare(
      `SELECT id, lang, type, title, abstract, status, created_at FROM drafts WHERE status = 'pending' ORDER BY created_at DESC LIMIT 100`
    ).all()
    const runs = db.prepare(
      `SELECT id, type, started_at, completed_at, status, summary FROM runs ORDER BY id DESC LIMIT 30`
    ).all()

    const { manifestAge } = require('./lib/manifest')
    return reply.view('dashboard.njk', {
      ...statusData,
      drafts,
      runs,
      manifestAgeMin: manifest ? Math.round(manifestAge() / 60000) : null,
    })
  })

  // ── Cron ─────────────────────────────────────────────────────────────────────
  startCron(db)

  // ── Listen ───────────────────────────────────────────────────────────────────
  try {
    const port = parseInt(process.env.PORT) || 3000
    const host = process.env.HOST || '0.0.0.0'
    await fastify.listen({ port, host })
    console.log(`[server] Peng dashboard running at http://${host}:${port}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()
