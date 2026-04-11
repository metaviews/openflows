'use strict'

function buildTimeline(db, { limit = 50 } = {}) {
  const max = Math.min(parseInt(limit) || 50, 200)
  const runs = db.prepare(`
    SELECT id, type, started_at, completed_at, status, summary
    FROM runs
    ORDER BY started_at DESC
    LIMIT ?
  `).all(max)
    .map(run => ({
      kind: 'run',
      type: run.type,
      status: run.status,
      created_at: run.started_at,
      completed_at: run.completed_at,
      summary: run.summary || `${run.type} ${run.status}`,
      runId: run.id,
      id: null,
      lang: null,
      path: null,
    }))

  const events = db.prepare(`
    SELECT id, type, payload, created_at
    FROM events
    ORDER BY created_at DESC
    LIMIT ?
  `).all(max)
    .map(event => eventToTimeline(event))

  return [...runs, ...events]
    .sort((a, b) => String(b.created_at).localeCompare(String(a.created_at)))
    .slice(0, max)
}

function eventToTimeline(event) {
  const payload = parsePayload(event.payload)
  const tool = payload.tool || {}
  const result = payload.result || {}

  const id = payload.id || tool.id || result.id || null
  const lang = payload.lang || tool.lang || result.lang || null
  const path = payload.path || result.path || null
  const runId = payload.runId || result.runId || null
  const status = payload.status || result.status || (payload.error ? 'error' : 'event')

  return {
    kind: 'event',
    type: event.type,
    status,
    created_at: event.created_at,
    completed_at: null,
    summary: summarizeEvent(event.type, payload),
    runId,
    id,
    lang,
    path,
  }
}

function summarizeEvent(type, payload) {
  if (type === 'confirmed_tool_call') {
    const toolName = payload.tool?.name || 'tool'
    return payload.error
      ? `${toolName} failed: ${payload.error}`
      : `${toolName} confirmed`
  }
  if (type === 'promote') return `promoted ${payload.id || 'draft'}`
  if (type === 'reject') return `rejected ${payload.id || 'draft'}`
  if (type === 'run_complete') return `${payload.type || 'run'} completed (${payload.status || 'unknown'})`
  if (type === 'prune_malformed_draft') return `pruned malformed draft ${payload.id || ''}`.trim()
  if (type === 'source_create') return `created source ${payload.id || ''}`.trim()
  if (type === 'source_update') return `updated source ${payload.id || ''}`.trim()
  if (type === 'source_remove') return `removed source ${payload.id || ''}`.trim()
  if (type === 'source_proposal_create') return `proposed source ${payload.id || ''}`.trim()
  if (type === 'source_proposal_approve') return `approved source proposal ${payload.id || payload.proposalId || ''}`.trim()
  if (type === 'source_proposal_reject') return `rejected source proposal ${payload.id || payload.proposalId || ''}`.trim()
  if (type === 'practitioner_social_apply') return `applied social profile to ${payload.id || 'practitioner'}`
  return type.replaceAll('_', ' ')
}

function parsePayload(raw) {
  if (!raw) return {}
  try {
    return JSON.parse(raw)
  } catch {
    return {}
  }
}

module.exports = { buildTimeline }
