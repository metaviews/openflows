'use strict'

const test = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const os = require('node:os')
const path = require('node:path')

const {
  loadSourceRegistry,
  saveSourceRegistry,
  listEnabledSources,
  normalizeSourceInput,
} = require('../scripts/lib/source-registry')
const {
  toolRequiresConfirmation,
  summarizeToolCall,
  READ_TOOL_NAMES,
  WRITE_TOOL_NAMES,
} = require('../server/lib/peng-tools')

function tempFile() {
  return path.join(fs.mkdtempSync(path.join(os.tmpdir(), 'openflows-sources-')), 'sources.json')
}

function toolCall(name, args = {}) {
  return {
    id: `${name}-call`,
    function: {
      name,
      arguments: JSON.stringify(args),
    },
  }
}

test('source registry loads, validates, and filters enabled sources', () => {
  const registry = loadSourceRegistry()
  assert.equal(registry.version, 1)
  assert.ok(registry.sources.some(source => source.id === 'github'))
  assert.ok(registry.sources.some(source => source.id === 'twitter'))

  const enabled = listEnabledSources(registry)
  assert.ok(enabled.every(source => source.enabled))
  assert.equal(enabled.some(source => source.id === 'twitter'), false)

  const filtered = listEnabledSources(registry, ['github', 'twitter'])
  assert.deepEqual(filtered.map(source => source.id), ['github'])

  const explicit = listEnabledSources(registry, ['twitter'], { includeDisabledRequested: true })
  assert.deepEqual(explicit.map(source => source.id), ['twitter'])
})

test('source registry can be saved and reloaded from an alternate path', () => {
  const filePath = tempFile()
  const registry = {
    version: 1,
    sources: [
      {
        id: 'test-brave',
        module: 'brave',
        label: 'Test Brave',
        enabled: false,
        config: { queries: ['open source ai'], count: 1 },
      },
    ],
  }
  saveSourceRegistry(registry, filePath)
  assert.deepEqual(loadSourceRegistry(filePath).sources[0].config.queries, ['open source ai'])
})

test('source input normalization validates id, module, and JSON config', () => {
  const source = normalizeSourceInput({
    id: 'new-source',
    module: 'brave',
    label: 'New Source',
    enabled: 'on',
    config: '{"queries":["q"],"count":2}',
  })
  assert.equal(source.enabled, true)
  assert.deepEqual(source.config, { queries: ['q'], count: 2 })

  assert.throws(
    () => normalizeSourceInput({ id: 'Bad Source', module: 'brave', label: 'Bad', enabled: false, config: '{}' }),
    /invalid source id/
  )
})

test('source proposals remain separate from approved runnable registry entries', () => {
  const registry = loadSourceRegistry()
  assert.equal(registry.sources.some(source => source.id === 'proposed-only-source'), false)
  assert.equal(listEnabledSources(registry, ['proposed-only-source']).length, 0)
  assert.equal(registry.sources.some(source => source.id === 'proposed-only-source'), false)
})

test('source-management Peng tools use confirmation boundaries and compact summaries', () => {
  assert.equal(READ_TOOL_NAMES.has('get_sources'), true)
  assert.equal(READ_TOOL_NAMES.has('get_source_proposals'), true)
  assert.equal(WRITE_TOOL_NAMES.has('propose_source'), true)
  assert.equal(WRITE_TOOL_NAMES.has('approve_source'), true)
  assert.equal(toolRequiresConfirmation(toolCall('get_sources')), false)
  assert.equal(toolRequiresConfirmation(toolCall('propose_source', { id: 'x', module: 'brave', label: 'X', config: { queries: ['long'] } })), true)

  const summary = summarizeToolCall(toolCall('update_source', {
    id: 'brave-expanded',
    module: 'brave',
    label: 'Brave Expanded',
    enabled: true,
    config: { queries: ['do not audit full config'], count: 5 },
  }))
  assert.equal(summary.name, 'update_source')
  assert.equal(summary.id, 'brave-expanded')
  assert.equal(Object.hasOwn(summary, 'config'), false)
})
