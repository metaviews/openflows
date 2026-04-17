'use strict'

const { getSource } = require('./sources')

const SOCIAL_MODULES = new Set(['bluesky', 'mastodon', 'twitter'])

async function postToSource(db, { sourceId, content }) {
  if (!sourceId || !content) {
    const err = new Error('sourceId and content are required')
    err.statusCode = 400
    throw err
  }

  const source = getSource(sourceId)
  if (!SOCIAL_MODULES.has(source.module)) {
    const err = new Error(`Source '${sourceId}' uses module '${source.module}' which does not support posting`)
    err.statusCode = 400
    throw err
  }

  const mod = require(`../../scripts/sources/${source.module}`)
  if (typeof mod.post !== 'function') {
    const err = new Error(`Source module '${source.module}' does not export a post() function`)
    err.statusCode = 400
    throw err
  }

  const result = await mod.post(source.config || {}, content)

  db.prepare('INSERT INTO events (type, payload, created_at) VALUES (?, ?, ?)')
    .run('social_post', JSON.stringify({
      sourceId,
      module: source.module,
      contentLength: content.length,
      url: result?.url || null,
    }), new Date().toISOString())

  return { ok: true, sourceId, module: source.module, ...result }
}

module.exports = { postToSource, SOCIAL_MODULES }
