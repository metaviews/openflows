'use strict'

const cron = require('node-cron')
const { runScript } = require('./lib/runner')
const { ensureManifest } = require('./lib/manifest')
const { commitPerspective, commitSeen } = require('./lib/git')

function startCron(db, discord = null) {
  // Daily intake — 06:00 UTC (mirrors retired peng-intake.yml)
  cron.schedule('0 6 * * *', async () => {
    console.log('[cron] intake run starting')
    try {
      const pendingBefore = db.prepare(`SELECT COUNT(*) as n FROM drafts WHERE status = 'pending'`).get()?.n || 0
      await ensureManifest()
      const intakeResult = await runScript(db, 'intake', ['--sources', 'github,huggingface,brave,opensourceprojects', '--limit', '10'])
      const practitionersResult = await runScript(db, 'practitioners', ['--limit', '3'])
      await runScript(db, 'audit')
      await commitSeen()
      const pendingAfter = db.prepare(`SELECT COUNT(*) as n FROM drafts WHERE status = 'pending'`).get()?.n || 0
      await discord?.notify('intake', {
        db,
        runIds: [intakeResult.runId, practitionersResult.runId],
        pendingBefore,
        pendingAfter,
      })
    } catch (err) {
      console.error('[cron] intake error:', err.message)
      try { await discord?.notify('error', { type: 'intake', error: err.message }) } catch {}
    }
  }, { timezone: 'UTC' })

  // Perspective — Mon/Wed/Fri 08:00 UTC (mirrors retired peng-perspective.yml)
  cron.schedule('0 8 * * 1,3,5', async () => {
    console.log('[cron] perspective run starting')
    try {
      await ensureManifest()
      await runScript(db, 'synthesize')
      await runScript(db, 'digest')
      await commitPerspective()
      await discord?.notify('digest', { db })
    } catch (err) {
      console.error('[cron] perspective error:', err.message)
      try { await discord?.notify('error', { type: 'perspective', error: err.message }) } catch {}
    }
  }, { timezone: 'UTC' })

  // Refresh — Daily 09:00 UTC (mirrors retired peng-refresh.yml)
  cron.schedule('0 9 * * *', async () => {
    console.log('[cron] refresh run starting')
    try {
      await ensureManifest()
      await runScript(db, 'refresh', ['--limit', '15', '--days', '7'])
    } catch (err) {
      console.error('[cron] refresh error:', err.message)
    }
  }, { timezone: 'UTC' })

  console.log('[cron] scheduled — intake 06:00 UTC daily, perspective MWF 08:00, refresh 09:00 daily')
}

module.exports = { startCron }
