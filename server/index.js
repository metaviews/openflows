'use strict'

const path = require('path')
const Fastify = require('fastify')
const { loadEnv } = require('../scripts/lib/openrouter')

// Load .env from repo root before anything else.
loadEnv(path.join(__dirname, '..'))

const { initDb } = require('./db')
const { startCron } = require('./cron')
const { initDiscord } = require('./discord')
const { buildStatusData } = require('./routes/status')
const { loadManifest } = require('./lib/manifest')
const { pruneMalformedDrafts } = require('./lib/drafts')

async function start() {
  const fastify = Fastify({ logger: { level: process.env.LOG_LEVEL || 'info' } })

  // ── Database ────────────────────────────────────────────────────────────────
  const db = initDb()
  const prunedDrafts = pruneMalformedDrafts(db)
  if (prunedDrafts.length) {
    console.log(`[server] pruned ${prunedDrafts.length} malformed draft(s) from the queue`)
  }
  fastify.decorate('db', db)

  // ── Content type parsers ─────────────────────────────────────────────────────
  // htmx sends POST requests as application/x-www-form-urlencoded by default.
  fastify.addContentTypeParser('application/x-www-form-urlencoded', (req, payload, done) => done(null, {}))

  // ── Plugins ─────────────────────────────────────────────────────────────────
  await fastify.register(require('@fastify/static'), {
    root: path.join(__dirname, 'public'),
    prefix: '/',
  })

  await fastify.register(require('@fastify/static'), {
    root: path.dirname(require.resolve('marked')),
    prefix: '/vendor/marked/',
    decorateReply: false,
  })

  await fastify.register(require('@fastify/static'), {
    root: path.dirname(require.resolve('dompurify')),
    prefix: '/vendor/dompurify/',
    decorateReply: false,
  })

  try {
    await fastify.register(require('@fastify/multipart'), {
      limits: {
        fileSize: 5 * 1024 * 1024,
        files: 1,
      },
    })
  } catch (err) {
    if (err && err.code === 'MODULE_NOT_FOUND') {
      console.warn('[server] @fastify/multipart is not installed; blog image upload is disabled until server dependencies are installed')
    } else {
      throw err
    }
  }

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
  fastify.register(require('./routes/timeline'), { prefix: '/api' })
  fastify.register(require('./routes/conversations'), { prefix: '/api' })
  fastify.register(require('./routes/entries'))
  fastify.register(require('./routes/sources'))
  fastify.register(require('./routes/social'))
  fastify.register(require('./routes/blog'))

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
      `SELECT id, type, started_at, completed_at, status, summary FROM runs ORDER BY id DESC LIMIT 10`
    ).all()
    const { buildTimeline } = require('./lib/timeline')
    const timeline = buildTimeline(db, { limit: 10 })
    const conversations = db.prepare(`
      SELECT id, messages, created_at, updated_at
      FROM conversations
      ORDER BY created_at DESC
      LIMIT 10
    `).all().map(row => {
      let messages = []
      try { messages = JSON.parse(row.messages) } catch {}
      const firstUser = Array.isArray(messages) ? messages.find(message => message.role === 'user') : null
      return {
        id: row.id,
        title: String(firstUser?.content || 'Conversation').slice(0, 90),
        turns: Array.isArray(messages) ? messages.length : 0,
        created_at: row.created_at,
        updated_at: row.updated_at,
      }
    })

    const { manifestAge } = require('./lib/manifest')
    return reply.view('dashboard.njk', {
      ...statusData,
      drafts,
      runs,
      timeline,
      conversations,
      manifestIdsJson: JSON.stringify((manifest?.entries || []).map(entry => entry.currencyId)),
      manifestAgeMin: manifest ? Math.round(manifestAge() / 60000) : null,
    })
  })

  // ── Discord bot ───────────────────────────────────────────────────────────────
  const discord = initDiscord(db)

  // ── Cron ─────────────────────────────────────────────────────────────────────
  startCron(db, discord)

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
