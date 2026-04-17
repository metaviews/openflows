'use strict'

const { buildStatusData } = require('../routes/status')
const { listDrafts, getDraft, upsertDraft, updateDraftContent, promoteDraft } = require('./drafts')
const { readEntry, saveEntry } = require('./entries')
const { queueTrigger } = require('./triggers')
const {
  listSources,
  listSourceProposals,
  proposeSource,
  approveSourceProposal,
  upsertSource,
  removeSource,
} = require('./sources')
const {
  readPractitionerSocialAudit,
  applyPractitionerSocialCandidate,
} = require('./practitioner-social')

const READ_TOOL_NAMES = new Set(['get_status', 'get_queue', 'get_entry', 'get_draft', 'get_sources', 'get_source_proposals', 'get_practitioner_social_audit'])
const WRITE_TOOL_NAMES = new Set([
  'create_draft',
  'update_draft',
  'promote_draft',
  'save_entry',
  'trigger_translate',
  'propose_source',
  'approve_source',
  'update_source',
  'remove_source',
  'apply_practitioner_social_candidate',
  'post_social',
])

const TOOL_DEFS = [
  {
    type: 'function',
    function: {
      name: 'get_status',
      description: 'Get live knowledge base and queue status.',
      parameters: {
        type: 'object',
        properties: {},
        additionalProperties: false,
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'get_queue',
      description: 'List drafts in the queue, optionally filtered by language, type, or status.',
      parameters: {
        type: 'object',
        properties: {
          lang: { type: 'string', enum: ['en', 'zh'] },
          type: { type: 'string', enum: ['current', 'circuit', 'practitioner'] },
          status: { type: 'string', enum: ['pending', 'promoted', 'rejected'] },
          limit: { type: 'integer', minimum: 1, maximum: 100 },
        },
        additionalProperties: false,
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'get_entry',
      description: 'Read a live knowledge base entry from src/, including full markdown.',
      parameters: {
        type: 'object',
        properties: {
          currencyId: { type: 'string' },
          lang: { type: 'string', enum: ['en', 'zh'] },
        },
        required: ['currencyId'],
        additionalProperties: false,
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'get_draft',
      description: 'Read a draft from the queue, including full markdown.',
      parameters: {
        type: 'object',
        properties: {
          currencyId: { type: 'string' },
          lang: { type: 'string', enum: ['en', 'zh'] },
        },
        required: ['currencyId'],
        additionalProperties: false,
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'create_draft',
      description: 'Create or replace a queue draft by providing full markdown with frontmatter.',
      parameters: {
        type: 'object',
        properties: {
          currencyId: { type: 'string' },
          lang: { type: 'string', enum: ['en', 'zh'] },
          content: { type: 'string' },
        },
        required: ['currencyId', 'content'],
        additionalProperties: false,
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'update_draft',
      description: 'Update an existing pending draft by replacing its full markdown content.',
      parameters: {
        type: 'object',
        properties: {
          currencyId: { type: 'string' },
          lang: { type: 'string', enum: ['en', 'zh'] },
          content: { type: 'string' },
        },
        required: ['currencyId', 'content'],
        additionalProperties: false,
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'promote_draft',
      description: 'Promote a pending draft into the live knowledge base and commit it.',
      parameters: {
        type: 'object',
        properties: {
          currencyId: { type: 'string' },
          lang: { type: 'string', enum: ['en', 'zh'] },
        },
        required: ['currencyId'],
        additionalProperties: false,
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'save_entry',
      description: 'Replace the full markdown of an existing live entry and commit the edit.',
      parameters: {
        type: 'object',
        properties: {
          currencyId: { type: 'string' },
          lang: { type: 'string', enum: ['en', 'zh'] },
          content: { type: 'string' },
        },
        required: ['currencyId', 'content'],
        additionalProperties: false,
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'trigger_translate',
      description: 'Run the translation workflow for an English entry. This creates or refreshes a zh draft.',
      parameters: {
        type: 'object',
        properties: {
          currencyId: { type: 'string' },
          force: { type: 'boolean' },
        },
        required: ['currencyId'],
        additionalProperties: false,
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'get_sources',
      description: 'List approved intake sources with enabled state and recent run stats.',
      parameters: {
        type: 'object',
        properties: {},
        additionalProperties: false,
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'get_source_proposals',
      description: 'List Peng-discovered source proposals.',
      parameters: {
        type: 'object',
        properties: {
          status: { type: 'string', enum: ['pending', 'approved', 'rejected'] },
          limit: { type: 'integer', minimum: 1, maximum: 100 },
        },
        additionalProperties: false,
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'get_practitioner_social_audit',
      description: 'Read the practitioner social profile audit report and candidate profile snippets.',
      parameters: {
        type: 'object',
        properties: {},
        additionalProperties: false,
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'propose_source',
      description: 'Create an inactive source proposal for human review.',
      parameters: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          module: { type: 'string', enum: ['github', 'huggingface', 'brave', 'twitter', 'bluesky', 'mastodon', 'practitioner-social', 'opensourceprojects'] },
          label: { type: 'string' },
          reason: { type: 'string' },
          config: { type: 'object' },
        },
        required: ['id', 'module', 'label', 'config'],
        additionalProperties: false,
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'approve_source',
      description: 'Approve a pending source proposal into the tracked registry as disabled.',
      parameters: {
        type: 'object',
        properties: {
          proposalId: { type: 'integer' },
        },
        required: ['proposalId'],
        additionalProperties: false,
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'update_source',
      description: 'Create or update an approved source in the tracked registry.',
      parameters: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          module: { type: 'string', enum: ['github', 'huggingface', 'brave', 'twitter', 'bluesky', 'mastodon', 'practitioner-social', 'opensourceprojects'] },
          label: { type: 'string' },
          enabled: { type: 'boolean' },
          notes: { type: 'string' },
          config: { type: 'object' },
        },
        required: ['id', 'module', 'label', 'enabled', 'config'],
        additionalProperties: false,
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'remove_source',
      description: 'Remove an approved source from the tracked registry.',
      parameters: {
        type: 'object',
        properties: {
          id: { type: 'string' },
        },
        required: ['id'],
        additionalProperties: false,
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'post_social',
      description: 'Post content to a social media source (Bluesky, Mastodon, or Twitter/X). The sourceId must be an approved source with module bluesky, mastodon, or twitter.',
      parameters: {
        type: 'object',
        properties: {
          sourceId: { type: 'string' },
          content: { type: 'string' },
        },
        required: ['sourceId', 'content'],
        additionalProperties: false,
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'apply_practitioner_social_candidate',
      description: 'Apply a reviewed social profile candidate to a Practitioner entry socialProfiles field and commit the edit.',
      parameters: {
        type: 'object',
        properties: {
          currencyId: { type: 'string' },
          candidateKey: { type: 'string' },
          monitor: { type: 'boolean' },
          verifiedBy: { type: 'string' },
        },
        required: ['currencyId', 'candidateKey'],
        additionalProperties: false,
      },
    },
  },
]

async function executeToolCall(fastify, toolCall) {
  const name = toolCall.function?.name
  const args = parseArguments(toolCall.function?.arguments)

  switch (name) {
    case 'get_status':
      return buildStatusData(fastify.db)
    case 'get_queue':
      return { drafts: listDrafts(fastify.db, args) }
    case 'get_entry': {
      const result = readEntry(args.currencyId, args.lang || 'en')
      return {
        entry: result.entry,
        content: result.content,
        path: result.relPath,
      }
    }
    case 'get_draft':
      return getDraft(fastify.db, { id: args.currencyId, lang: args.lang || 'en' })
    case 'get_sources':
      return { sources: listSources(fastify.db) }
    case 'get_source_proposals':
      return { proposals: listSourceProposals(fastify.db, args) }
    case 'get_practitioner_social_audit':
      return readPractitionerSocialAudit()
    case 'create_draft':
      return upsertDraft(fastify.db, { id: args.currencyId, lang: args.lang || 'en', content: args.content })
    case 'update_draft':
      return updateDraftContent(fastify.db, { id: args.currencyId, lang: args.lang || 'en', content: args.content })
    case 'promote_draft':
      return promoteDraft(fastify.db, { id: args.currencyId, lang: args.lang || 'en' })
    case 'save_entry':
      return saveEntry({ id: args.currencyId, lang: args.lang || 'en', content: args.content })
    case 'trigger_translate': {
      const triggerArgs = ['--id', args.currencyId]
      if (args.force) triggerArgs.push('--force')
      return queueTrigger(fastify.db, 'translate', triggerArgs)
    }
    case 'propose_source':
      return proposeSource(fastify.db, { ...args, proposedBy: 'peng-tool' })
    case 'approve_source':
      return approveSourceProposal(fastify.db, args.proposalId)
    case 'update_source':
      return upsertSource(fastify.db, args)
    case 'remove_source':
      return removeSource(fastify.db, args.id)
    case 'post_social': {
      const { postToSource } = require('./social-publisher')
      return postToSource(fastify.db, { sourceId: args.sourceId, content: args.content })
    }
    case 'apply_practitioner_social_candidate':
      return applyPractitionerSocialCandidate(fastify.db, {
        currencyId: args.currencyId,
        candidateKey: args.candidateKey,
        monitor: args.monitor !== false,
        verifiedBy: args.verifiedBy || 'human',
      })
    default: {
      const err = new Error(`Unknown tool: ${name}`)
      err.statusCode = 400
      throw err
    }
  }
}

function toolRequiresConfirmation(toolCallOrName) {
  const name = typeof toolCallOrName === 'string'
    ? toolCallOrName
    : toolCallOrName?.function?.name
  return WRITE_TOOL_NAMES.has(name)
}

function isReadTool(toolCallOrName) {
  const name = typeof toolCallOrName === 'string'
    ? toolCallOrName
    : toolCallOrName?.function?.name
  return READ_TOOL_NAMES.has(name)
}

function summarizeToolCall(toolCall) {
  const name = toolCall.function?.name || 'unknown'
  const args = parseArguments(toolCall.function?.arguments)
  const summary = {
    name,
    id: args.currencyId || args.id || null,
    candidateKey: args.candidateKey || null,
    proposalId: args.proposalId || null,
    lang: args.lang || null,
    type: args.type || null,
    status: args.status || null,
    force: typeof args.force === 'boolean' ? args.force : null,
    contentLength: typeof args.content === 'string' ? args.content.length : null,
  }
  return Object.fromEntries(Object.entries(summary).filter(([, value]) => value !== null))
}

function partitionToolCalls(toolCalls) {
  return {
    readToolCalls: toolCalls.filter(toolCall => !toolRequiresConfirmation(toolCall)),
    writeToolCalls: toolCalls.filter(toolRequiresConfirmation),
  }
}

function logConfirmedToolCall(db, { toolCall, result, error }) {
  const now = new Date().toISOString()
  const payload = {
    tool: summarizeToolCall(toolCall),
    result: result
      ? {
          ok: result.ok !== false,
          id: result.id || result.draft?.id || null,
          proposalId: result.proposalId || result.proposal?.id || null,
          lang: result.lang || result.draft?.lang || null,
          path: result.path || null,
          runId: result.runId || null,
          status: result.status || result.draft?.status || null,
        }
      : null,
    error: error ? error.message : null,
    confirmedAt: now,
  }

  db.prepare('INSERT INTO events (type, payload, created_at) VALUES (?, ?, ?)')
    .run('confirmed_tool_call', JSON.stringify(payload), now)
}

function parseArguments(raw) {
  if (!raw) return {}
  if (typeof raw === 'object') return raw
  try {
    return JSON.parse(raw)
  } catch {
    return {}
  }
}

module.exports = {
  TOOL_DEFS,
  executeToolCall,
  READ_TOOL_NAMES,
  WRITE_TOOL_NAMES,
  toolRequiresConfirmation,
  isReadTool,
  summarizeToolCall,
  partitionToolCalls,
  logConfirmedToolCall,
}
