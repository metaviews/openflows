'use strict'

const { loadManifest } = require('../lib/manifest')
const { readEntry, saveEntry, deleteEntry } = require('../lib/entries')
const { validateCurrencyMarkdown } = require('../lib/validation')

const ALLOWED_LIMITS = [25, 50, 100]

function buildPageLinks(page, pageCount) {
  if (pageCount <= 7) {
    return Array.from({ length: pageCount }, (_, i) => ({ page: i + 1, label: String(i + 1) }))
  }
  const show = new Set(
    [1, pageCount, page - 1, page, page + 1].filter(p => p >= 1 && p <= pageCount)
  )
  const links = []
  let prev = 0
  for (const p of [...show].sort((a, b) => a - b)) {
    if (p - prev > 1) links.push({ ellipsis: true, label: '…' })
    links.push({ page: p, label: String(p) })
    prev = p
  }
  return links
}

async function entriesRoutes(fastify) {
  // ── Browse ──────────────────────────────────────────────────────────────────
  fastify.get('/entries', async (req, reply) => {
    const manifest = loadManifest()
    const { type, lang } = req.query
    const sortFields = {
      id: 'currencyId',
      type: 'currencyType',
      lang: 'lang',
      title: 'title',
      date: 'date',
    }
    const sort = sortFields[req.query.sort] ? req.query.sort : 'id'
    const sortDir = req.query.dir === 'desc' ? 'desc' : 'asc'
    const limit = ALLOWED_LIMITS.includes(Number(req.query.limit)) ? Number(req.query.limit) : 50
    let entries = manifest?.entries || []
    if (type) entries = entries.filter(e => e.currencyType === type)
    if (lang) entries = entries.filter(e => e.lang === lang)
    entries = [...entries].sort((a, b) => {
      const field = sortFields[sort]
      let result
      if (sort === 'date') {
        result = new Date(a.date || 0) - new Date(b.date || 0)
      } else {
        result = String(a[field] || '').localeCompare(String(b[field] || ''), undefined, { sensitivity: 'base' })
      }
      if (result === 0) {
        result = String(a.currencyId || '').localeCompare(String(b.currencyId || ''), undefined, { sensitivity: 'base' })
      }
      return sortDir === 'desc' ? -result : result
    })
    const filteredTotal = entries.length
    const pageCount = Math.ceil(filteredTotal / limit) || 1
    const page = Math.min(Math.max(1, parseInt(req.query.page, 10) || 1), pageCount)
    const rangeStart = filteredTotal > 0 ? (page - 1) * limit + 1 : 0
    const rangeEnd = Math.min(page * limit, filteredTotal)
    const pageEntries = entries.slice((page - 1) * limit, page * limit)
    const allEntries = manifest?.entries || []
    const translatedIds = {}
    allEntries.filter(e => e.lang === 'zh').forEach(e => { translatedIds[e.currencyId] = true })
    return reply.view('entries.njk', {
      entries: pageEntries,
      total: manifest?.entries?.length || 0,
      filteredTotal,
      rangeStart,
      rangeEnd,
      filterType: type || '',
      filterLang: lang || '',
      sort,
      sortDir,
      limit,
      page,
      pageCount,
      pageLinks: buildPageLinks(page, pageCount),
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

  fastify.post('/api/entries/:id/validate', async (req, reply) => {
    const { id } = req.params
    const lang = req.query.lang || 'en'
    try {
      const existing = readEntry(id, lang)
      const validation = validateCurrencyMarkdown({
        id,
        lang,
        content: req.body?.content || existing.content,
        manifest: loadManifest(),
        existingType: existing.entry.currencyType,
        strictAbstract: false,
      })
      return reply.send(validation)
    } catch (err) {
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
