'use strict'

const { loadManifest } = require('../lib/manifest')
const { readEntry, saveEntry, deleteEntry } = require('../lib/entries')

async function entriesRoutes(fastify) {
  // ── Browse ──────────────────────────────────────────────────────────────────
  fastify.get('/entries', async (req, reply) => {
    const manifest = loadManifest()
    const { type, lang } = req.query
    let entries = manifest?.entries || []
    if (type) entries = entries.filter(e => e.currencyType === type)
    if (lang) entries = entries.filter(e => e.lang === lang)
    entries = [...entries].sort((a, b) => a.currencyId.localeCompare(b.currencyId))
    const allEntries = manifest?.entries || []
    const translatedIds = {}
    allEntries.filter(e => e.lang === 'zh').forEach(e => { translatedIds[e.currencyId] = true })
    return reply.view('entries.njk', {
      entries,
      total: manifest?.entries?.length || 0,
      filterType: type || '',
      filterLang: lang || '',
      translatedIds,
    })
  })

  // ── Edit page ───────────────────────────────────────────────────────────────
  fastify.get('/entries/:id', async (req, reply) => {
    const { id } = req.params
    const lang = req.query.lang || 'en'
    try {
      const { entry, content, relPath } = readEntry(id, lang)
      return reply.view('entry-edit.njk', { entry, content, relPath, lang })
    } catch (err) {
      return reply.code(err.statusCode || 500).send(err.message)
    }
  })

  // ── Save (JSON POST from fetch) ─────────────────────────────────────────────
  fastify.post('/api/entries/:id/save', async (req, reply) => {
    const { id } = req.params
    const lang = req.query.lang || 'en'
    const { content } = req.body || {}
    if (!content) return reply.code(400).send({ error: 'content required' })

    try {
      const result = await saveEntry({ id, lang, content })
      return reply.send(result)
    } catch (err) {
      fastify.log.error(err)
      return reply.code(err.statusCode || 500).send({ error: err.message })
    }
  })

  // ── Delete (JSON POST from fetch) ───────────────────────────────────────────
  fastify.post('/api/entries/:id/delete', async (req, reply) => {
    const { id } = req.params
    const lang = req.query.lang || 'en'

    try {
      const result = await deleteEntry({ id, lang })
      return reply.send(result)
    } catch (err) {
      fastify.log.error(err)
      return reply.code(err.statusCode || 500).send({ error: err.message })
    }
  })


}

module.exports = entriesRoutes
