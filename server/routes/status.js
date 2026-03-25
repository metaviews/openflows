'use strict'

const path = require('path')
const fs = require('fs')
const { loadManifest } = require('../lib/manifest')

const ROOT = path.join(__dirname, '..', '..')

async function statusRoutes(fastify) {
  fastify.get('/status', async (req, reply) => {
    const data = buildStatusData(fastify.db)
    if (req.headers['hx-request']) {
      return reply.view('partials/status.njk', data)
    }
    return reply.send(data)
  })
}

function buildStatusData(db) {
  const manifest = loadManifest()

  const kbCounts = manifest
    ? {
        total: manifest.entries?.length || 0,
        byType: countBy(manifest.entries || [], 'currencyType'),
        byLang: manifest.byLang || {},
      }
    : null

  const pendingSummary = db.prepare(`
    SELECT lang, type, COUNT(*) as count
    FROM drafts WHERE status = 'pending'
    GROUP BY lang, type
    ORDER BY lang, type
  `).all()

  const recentRun = db.prepare(
    `SELECT id, type, started_at, completed_at, status, summary FROM runs ORDER BY id DESC LIMIT 1`
  ).get()

  const auditState = readAuditState()

  return { kbCounts, pendingSummary, recentRun, auditState, now: new Date().toISOString() }
}

function countBy(arr, key) {
  return arr.reduce((acc, item) => {
    const v = item[key] || 'unknown'
    acc[v] = (acc[v] || 0) + 1
    return acc
  }, {})
}

function readAuditState() {
  const qualityPath = path.join(ROOT, 'audit', 'QUALITY.md')
  if (!fs.existsSync(qualityPath)) return null
  try {
    const content = fs.readFileSync(qualityPath, 'utf8')
    const match = content.match(/(\d+)\/(\d+) passing/)
    const dateMatch = content.match(/\d{4}-\d{2}-\d{2}/)
    return {
      passing: match ? parseInt(match[1]) : null,
      total: match ? parseInt(match[2]) : null,
      date: dateMatch ? dateMatch[0] : null,
    }
  } catch {
    return null
  }
}

module.exports = statusRoutes
module.exports.buildStatusData = buildStatusData
