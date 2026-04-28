'use strict'

const { runScript } = require('./runner')
const { ensureManifest } = require('./manifest')
const { commitPerspective, commitSeen } = require('./git')

const activeRuns = new Set()
const ALLOWED = ['intake', 'perspective', 'synthesize', 'digest', 'translate', 'audit', 'enrich', 'refresh', 'discover-sources']
const COMPOUND = ['intake', 'perspective']
// Scripts that read _site/knowledge-manifest.json — rebuild it first if stale.
const MANIFEST_DEPENDENT = new Set(['translate', 'synthesize', 'digest', 'discover-sources'])

function isTriggerActive(type) {
  return activeRuns.has(type)
}

async function queueTrigger(db, type, args = []) {
  if (!ALLOWED.includes(type)) {
    const err = new Error(`Unknown type: ${type}. Allowed: ${ALLOWED.join(', ')}`)
    err.statusCode = 400
    throw err
  }
  if (activeRuns.has(type)) {
    const err = new Error(`${type} is already running`)
    err.statusCode = 409
    throw err
  }

  let runId = null
  const isCompound = COMPOUND.includes(type)
  if (!isCompound) {
    const { lastInsertRowid } = db.prepare(
      `INSERT INTO runs (type, started_at, status) VALUES (?, ?, 'running')`
    ).run(type, new Date().toISOString())
    runId = Number(lastInsertRowid)
  }

  activeRuns.add(type)

  setImmediate(async () => {
    try {
      if (type === 'intake') {
        const intakeArgs = args.length ? args : ['--limit', '10']
        await ensureManifest()
        await runScript(db, 'intake', intakeArgs)
        await runScript(db, 'practitioners', ['--limit', '3'])
        await runScript(db, 'audit')
        await commitSeen().catch(() => {})
      } else if (type === 'perspective') {
        await ensureManifest()
        await runScript(db, 'synthesize')
        await runScript(db, 'digest')
        await commitPerspective().catch(() => {})
      } else {
        if (MANIFEST_DEPENDENT.has(type)) await ensureManifest()
        await runScript(db, type, args, runId)
      }
    } catch (err) {
      console.error(`[trigger] ${type} error:`, err.message)
      if (runId) {
        db.prepare(
          `UPDATE runs SET status = 'error', completed_at = ?, summary = ? WHERE id = ? AND status = 'running'`
        ).run(new Date().toISOString(), err.message, runId)
      }
    } finally {
      activeRuns.delete(type)
    }
  })

  return { ok: true, queued: type, runId }
}

module.exports = {
  ALLOWED,
  activeRuns,
  isTriggerActive,
  queueTrigger,
}
