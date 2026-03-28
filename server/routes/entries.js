'use strict'

const path = require('path')
const fs = require('fs')
const { loadManifest, ensureManifest } = require('../lib/manifest')
const { commitEdit, removeEntry } = require('../lib/git')

const ROOT = path.join(__dirname, '..', '..')

const TYPE_MAP = { current: 'currents', circuit: 'circuits', practitioner: 'practitioners' }

function entryFilePath(id, currencyType, lang) {
  const dir = TYPE_MAP[currencyType]
  if (!dir) throw new Error(`Unknown currencyType: ${currencyType}`)
  return lang === 'zh'
    ? path.join(ROOT, 'src', 'currency', 'zh', dir, `${id}.md`)
    : path.join(ROOT, 'src', 'currency', dir, `${id}.md`)
}

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
    const manifest = loadManifest()
    const entry = manifest?.entries?.find(e => e.currencyId === id && e.lang === lang)
    if (!entry) return reply.code(404).send('Entry not found in manifest')

    const filePath = entryFilePath(id, entry.currencyType, lang)
    if (!fs.existsSync(filePath)) return reply.code(404).send('File not found on disk')

    const content = fs.readFileSync(filePath, 'utf8')
    const relPath = path.relative(ROOT, filePath).replace(/\\/g, '/')
    return reply.view('entry-edit.njk', { entry, content, relPath, lang })
  })

  // ── Save (JSON POST from fetch) ─────────────────────────────────────────────
  fastify.post('/api/entries/:id/save', async (req, reply) => {
    const { id } = req.params
    const lang = req.query.lang || 'en'
    const { content } = req.body || {}
    if (!content) return reply.code(400).send({ error: 'content required' })

    const manifest = loadManifest()
    const entry = manifest?.entries?.find(e => e.currencyId === id && e.lang === lang)
    if (!entry) return reply.code(404).send({ error: 'Entry not found in manifest' })

    const filePath = entryFilePath(id, entry.currencyType, lang)
    const relPath = path.relative(ROOT, filePath).replace(/\\/g, '/')

    fs.writeFileSync(filePath, content, 'utf8')

    try {
      const result = await commitEdit({ relPath, id, lang })
      // Invalidate manifest so next page load reflects the edit.
      await ensureManifest(0)
      return reply.send({ ok: true, committed: result.committed, path: relPath })
    } catch (err) {
      fastify.log.error(err)
      return reply.code(500).send({ error: err.message })
    }
  })

  // ── Delete (JSON POST from fetch) ───────────────────────────────────────────
  fastify.post('/api/entries/:id/delete', async (req, reply) => {
    const { id } = req.params
    const lang = req.query.lang || 'en'

    const manifest = loadManifest()
    const entry = manifest?.entries?.find(e => e.currencyId === id && e.lang === lang)
    if (!entry) return reply.code(404).send({ error: 'Entry not found in manifest' })

    const filePath = entryFilePath(id, entry.currencyType, lang)
    const relPath = path.relative(ROOT, filePath).replace(/\\/g, '/')

    try {
      await removeEntry({ relPath, id, lang })
      await ensureManifest(0)
      return reply.send({ ok: true, path: relPath })
    } catch (err) {
      fastify.log.error(err)
      return reply.code(500).send({ error: err.message })
    }
  })


}

module.exports = entriesRoutes
