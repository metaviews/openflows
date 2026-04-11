'use strict'

const fs = require('fs')
const path = require('path')
const yaml = require('js-yaml')
const { parseFrontmatter } = require('./parse')
const { readEntry, saveEntry } = require('./entries')
const { createManualRun, appendRunLog, completeManualRun } = require('./runner')
const { runScript } = require('./runner')

const ROOT = path.join(__dirname, '..', '..')
const AUDIT_PATH = path.join(ROOT, 'audit', 'PRACTITIONER_SOCIAL.md')

function readPractitionerSocialAudit() {
  if (!fs.existsSync(AUDIT_PATH)) {
    return {
      exists: false,
      path: path.relative(ROOT, AUDIT_PATH).replace(/\\/g, '/'),
      generated: null,
      summary: 'No practitioner social audit report found.',
      entries: [],
    }
  }

  const content = fs.readFileSync(AUDIT_PATH, 'utf8')
  const generated = content.match(/^Generated:\s*(.+)$/m)?.[1] || null
  const summary = content.match(/^Summary:\s*(.+)$/m)?.[1] || null
  const blocks = content.split(/^##\s+/m).slice(1)
  const entries = blocks.map(parseAuditBlock).filter(Boolean)
  return {
    exists: true,
    path: path.relative(ROOT, AUDIT_PATH).replace(/\\/g, '/'),
    generated,
    summary,
    entries,
  }
}

function parseAuditBlock(block) {
  const header = block.match(/^(.+?)\s+\(([^)]+)\)/)
  if (!header) return null
  const snippet = block.match(/Candidate snippet for review:\s*\r?\n\r?\n```yaml\r?\n([\s\S]*?)\r?\n```/m)
  let candidates = []
  if (snippet) {
    try {
      const parsed = yaml.load(snippet[1]) || {}
      candidates = Array.isArray(parsed.socialProfiles) ? parsed.socialProfiles : []
    } catch {
      candidates = []
    }
  }
  return {
    title: header[1].trim(),
    currencyId: header[2].trim(),
    file: block.match(/File:\s*`([^`]+)`/)?.[1] || null,
    candidates: candidates.map((candidate, index) => ({
      ...candidate,
      index,
      key: candidateKey(candidate),
    })),
  }
}

async function queuePractitionerSocialAudit(db, { brave = true } = {}) {
  const args = brave ? ['--brave'] : []
  return runScript(db, 'audit-practitioner-social', args)
}

async function applyPractitionerSocialCandidate(db, { currencyId, candidateKey: key, monitor = true, verifiedBy = 'human', audit = readPractitionerSocialAudit() }) {
  const entry = audit.entries.find(item => item.currencyId === currencyId)
  const candidate = entry?.candidates.find(item => item.key === key || String(item.index) === String(key))
  if (!candidate) {
    const err = new Error(`Candidate not found for ${currencyId}: ${key}`)
    err.statusCode = 404
    throw err
  }

  const runId = createManualRun(db, 'practitioner-social', `apply social profile ${currencyId}`)
  try {
    appendRunLog(db, runId, `Applying ${candidate.platform}:${candidate.handle || candidate.url} to ${currencyId}\n`)
    const result = await applySocialProfile({ currencyId, candidate, monitor, verifiedBy })
    appendRunLog(db, runId, `${JSON.stringify(result, null, 2)}\n`)
    completeManualRun(db, runId, { status: 'success', summary: `applied social profile to ${currencyId}` })
    db.prepare('INSERT INTO events (type, payload, created_at) VALUES (?, ?, ?)')
      .run('practitioner_social_apply', JSON.stringify({
        id: currencyId,
        profile: publicProfile(candidate, { monitor, verifiedBy }),
        path: result.path,
        runId,
      }), new Date().toISOString())
    return { ...result, runId, candidateKey: key }
  } catch (err) {
    appendRunLog(db, runId, `ERROR: ${err.message}\n`)
    completeManualRun(db, runId, { status: 'error', summary: err.message })
    throw err
  }
}

async function applySocialProfile({ currencyId, candidate, monitor = true, verifiedBy = 'human', entryReader = readEntry, entrySaver = saveEntry }) {
  const existing = entryReader(currencyId, 'en')
  const { frontmatter, body } = parseFrontmatter(existing.content)
  if (frontmatter.currencyType !== 'practitioner') {
    const err = new Error(`${currencyId} is not a practitioner entry`)
    err.statusCode = 400
    throw err
  }

  const profile = publicProfile(candidate, { monitor, verifiedBy })
  const profiles = Array.isArray(frontmatter.socialProfiles) ? frontmatter.socialProfiles : []
  if (!profiles.some(item => candidateKey(item) === candidateKey(profile))) {
    profiles.push(profile)
  }
  frontmatter.socialProfiles = profiles

  const content = `---\n${yaml.dump(frontmatter, { lineWidth: 1000, noRefs: true })}---\n${body}`
  return entrySaver({ id: currencyId, lang: 'en', content })
}

function publicProfile(candidate, { monitor, verifiedBy }) {
  const profile = {
    platform: candidate.platform,
    handle: candidate.handle,
    url: candidate.url,
    monitor: !!monitor,
    verifiedBy,
  }
  if (candidate.instance) profile.instance = candidate.instance
  return Object.fromEntries(Object.entries(profile).filter(([, value]) => value !== undefined && value !== null && value !== ''))
}

function candidateKey(candidate) {
  return [candidate.platform, candidate.handle || candidate.url].filter(Boolean).join(':')
}

module.exports = {
  readPractitionerSocialAudit,
  queuePractitionerSocialAudit,
  applyPractitionerSocialCandidate,
  applySocialProfile,
  candidateKey,
}
