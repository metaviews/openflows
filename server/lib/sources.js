'use strict'

const {
  loadSourceRegistry,
  saveSourceRegistry,
  normalizeSourceInput,
  validateSource,
} = require('../../scripts/lib/source-registry')
const { commitSourceRegistry } = require('./git')

function listSources(db) {
  const registry = loadSourceRegistry()
  const stats = Object.fromEntries(db.prepare('SELECT * FROM source_run_stats').all().map(row => [row.source_id, row]))
  const pending = db.prepare(`
    SELECT source_id, COUNT(*) AS count
    FROM source_proposals
    WHERE status = 'pending'
    GROUP BY source_id
  `).all()
  const pendingCounts = Object.fromEntries(pending.map(row => [row.source_id, row.count]))

  return registry.sources.map(source => ({
    ...source,
    queryCount: Array.isArray(source.config?.queries) ? source.config.queries.length : 0,
    taskCount: Array.isArray(source.config?.tasks) ? source.config.tasks.length : 0,
    stats: stats[source.id] || null,
    pendingProposals: pendingCounts[source.id] || 0,
  }))
}

function getSource(id) {
  const registry = loadSourceRegistry()
  const source = registry.sources.find(item => item.id === id)
  if (!source) {
    const err = new Error(`Source not found: ${id}`)
    err.statusCode = 404
    throw err
  }
  return source
}

async function upsertSource(db, input, { commit = true } = {}) {
  const source = normalizeSourceInput(input)
  const registry = loadSourceRegistry()
  const index = registry.sources.findIndex(item => item.id === source.id)
  if (index >= 0) registry.sources[index] = source
  else registry.sources.push(source)
  saveSourceRegistry(registry)
  logSourceEvent(db, index >= 0 ? 'source_update' : 'source_create', { id: source.id, module: source.module })
  const commitResult = commit ? await commitSourceRegistry({ id: source.id, action: index >= 0 ? 'update' : 'create' }) : { committed: false }
  return { ok: true, source, committed: commitResult.committed !== false }
}

async function removeSource(db, id, { commit = true } = {}) {
  const registry = loadSourceRegistry()
  const next = registry.sources.filter(source => source.id !== id)
  if (next.length === registry.sources.length) {
    const err = new Error(`Source not found: ${id}`)
    err.statusCode = 404
    throw err
  }
  registry.sources = next
  saveSourceRegistry(registry)
  logSourceEvent(db, 'source_remove', { id })
  const commitResult = commit ? await commitSourceRegistry({ id, action: 'remove' }) : { committed: false }
  return { ok: true, id, committed: commitResult.committed !== false }
}

function listSourceProposals(db, { status = 'pending', limit = 100 } = {}) {
  const max = Math.min(parseInt(limit) || 100, 200)
  return db.prepare(`
    SELECT id, source_id, module, label, config, reason, status, proposed_by, created_at, updated_at
    FROM source_proposals
    WHERE (? = '' OR status = ?)
    ORDER BY created_at DESC
    LIMIT ?
  `).all(status || '', status || '', max).map(row => ({
    ...row,
    config: parseConfig(row.config),
  }))
}

function proposeSource(db, input) {
  const source = normalizeSourceInput({ ...input, enabled: false })
  if (loadSourceRegistry().sources.some(item => item.id === source.id)) {
    const err = new Error(`Approved source already exists: ${source.id}`)
    err.statusCode = 409
    throw err
  }
  const existingPending = db.prepare(
    `SELECT id FROM source_proposals WHERE source_id = ? AND status = 'pending'`
  ).get(source.id)
  if (existingPending) {
    const err = new Error(`Pending source proposal already exists: ${source.id}`)
    err.statusCode = 409
    throw err
  }
  const now = new Date().toISOString()
  const { lastInsertRowid } = db.prepare(`
    INSERT INTO source_proposals (source_id, module, label, config, reason, status, proposed_by, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, 'pending', ?, ?, ?)
  `).run(
    source.id,
    source.module,
    source.label,
    JSON.stringify(source.config || {}),
    input.reason || input.notes || null,
    input.proposedBy || 'peng',
    now,
    now
  )
  logSourceEvent(db, 'source_proposal_create', { proposalId: Number(lastInsertRowid), id: source.id, module: source.module })
  return { ok: true, proposal: getSourceProposal(db, Number(lastInsertRowid)) }
}

async function approveSourceProposal(db, proposalId, { commit = true } = {}) {
  const proposal = getSourceProposal(db, proposalId)
  if (proposal.status !== 'pending') {
    const err = new Error(`Proposal is ${proposal.status}`)
    err.statusCode = 409
    throw err
  }
  const result = await upsertSource(db, {
    id: proposal.source_id,
    module: proposal.module,
    label: proposal.label,
    enabled: false,
    notes: proposal.reason || '',
    config: proposal.config,
  }, { commit })
  const now = new Date().toISOString()
  db.prepare('UPDATE source_proposals SET status = ?, updated_at = ? WHERE id = ?')
    .run('approved', now, proposalId)
  logSourceEvent(db, 'source_proposal_approve', { proposalId, id: proposal.source_id })
  return { ok: true, proposalId, source: result.source, committed: result.committed }
}

function rejectSourceProposal(db, proposalId) {
  const proposal = getSourceProposal(db, proposalId)
  if (proposal.status !== 'pending') {
    const err = new Error(`Proposal is ${proposal.status}`)
    err.statusCode = 409
    throw err
  }
  const now = new Date().toISOString()
  db.prepare('UPDATE source_proposals SET status = ?, updated_at = ? WHERE id = ?')
    .run('rejected', now, proposalId)
  logSourceEvent(db, 'source_proposal_reject', { proposalId, id: proposal.source_id })
  return { ok: true, proposalId, status: 'rejected' }
}

function getSourceProposal(db, proposalId) {
  const row = db.prepare(`
    SELECT id, source_id, module, label, config, reason, status, proposed_by, created_at, updated_at
    FROM source_proposals
    WHERE id = ?
  `).get(proposalId)
  if (!row) {
    const err = new Error(`Source proposal not found: ${proposalId}`)
    err.statusCode = 404
    throw err
  }
  return { ...row, config: parseConfig(row.config) }
}

function updateSourceStats(db, stats) {
  const now = new Date().toISOString()
  const upsert = db.prepare(`
    INSERT INTO source_run_stats (source_id, module, status, fetched, drafted, error, started_at, completed_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(source_id) DO UPDATE SET
      module = excluded.module,
      status = excluded.status,
      fetched = excluded.fetched,
      drafted = excluded.drafted,
      error = excluded.error,
      started_at = excluded.started_at,
      completed_at = excluded.completed_at,
      updated_at = excluded.updated_at
  `)
  for (const item of stats || []) {
    upsert.run(
      item.id,
      item.module || item.id,
      item.status || 'unknown',
      item.fetched || 0,
      item.drafted || 0,
      item.error || null,
      item.startedAt || null,
      item.completedAt || null,
      now
    )
  }
}

function validateSourceInput(input) {
  return validateSource(normalizeSourceInput(input))
}

function parseConfig(raw) {
  try {
    return JSON.parse(raw || '{}')
  } catch {
    return {}
  }
}

function logSourceEvent(db, type, payload) {
  db.prepare('INSERT INTO events (type, payload, created_at) VALUES (?, ?, ?)')
    .run(type, JSON.stringify(payload), new Date().toISOString())
}

module.exports = {
  listSources,
  getSource,
  upsertSource,
  removeSource,
  listSourceProposals,
  proposeSource,
  approveSourceProposal,
  rejectSourceProposal,
  updateSourceStats,
  validateSourceInput,
}
