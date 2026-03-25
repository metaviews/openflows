'use strict'

const path = require('path')
const fs = require('fs')
const { execSync } = require('child_process')

const ROOT = path.join(__dirname, '..', '..')
const MANIFEST_PATH = path.join(ROOT, '_site', 'knowledge-manifest.json')

function loadManifest() {
  if (!fs.existsSync(MANIFEST_PATH)) return null
  try {
    return JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'))
  } catch {
    return null
  }
}

// Age of the manifest in milliseconds (Infinity if missing).
function manifestAge() {
  if (!fs.existsSync(MANIFEST_PATH)) return Infinity
  return Date.now() - fs.statSync(MANIFEST_PATH).mtimeMs
}

// Rebuild the manifest if it's older than maxAgeMs (default: 1 hour).
// Runs synchronously via eleventy — call from cron/trigger before intake/synthesize.
async function ensureManifest(maxAgeMs = 3_600_000) {
  if (manifestAge() > maxAgeMs) {
    console.log('[manifest] rebuilding...')
    execSync('npm run build', { cwd: ROOT, stdio: 'inherit' })
    console.log('[manifest] done')
  }
  return loadManifest()
}

module.exports = { loadManifest, ensureManifest, manifestAge }
