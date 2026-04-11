'use strict'

const fs = require('fs')
const path = require('path')

const ROOT = path.join(__dirname, '..', '..')
const REGISTRY_PATH = path.join(ROOT, 'scripts', 'intake-sources.json')
const SOURCES_DIR = path.join(ROOT, 'scripts', 'sources')

function loadSourceRegistry(filePath = REGISTRY_PATH) {
  const registry = JSON.parse(fs.readFileSync(filePath, 'utf8'))
  validateSourceRegistry(registry)
  return registry
}

function saveSourceRegistry(registry, filePath = REGISTRY_PATH) {
  validateSourceRegistry(registry)
  fs.writeFileSync(filePath, `${JSON.stringify(registry, null, 2)}\n`, 'utf8')
  return registry
}

function validateSourceRegistry(registry) {
  if (!registry || registry.version !== 1 || !Array.isArray(registry.sources)) {
    throw new Error('source registry must have version: 1 and a sources array')
  }

  const ids = new Set()
  for (const source of registry.sources) validateSource(source, ids)
  return true
}

function validateSource(source, ids = new Set()) {
  if (!source || typeof source !== 'object') throw new Error('source must be an object')
  if (!isId(source.id)) throw new Error(`invalid source id: ${source.id || '(missing)'}`)
  if (ids.has(source.id)) throw new Error(`duplicate source id: ${source.id}`)
  ids.add(source.id)
  if (!isId(source.module)) throw new Error(`invalid source module for ${source.id}`)
  if (!fs.existsSync(path.join(SOURCES_DIR, `${source.module}.js`))) {
    throw new Error(`source module not found: ${source.module}`)
  }
  if (!source.label || typeof source.label !== 'string') throw new Error(`source label required for ${source.id}`)
  if (typeof source.enabled !== 'boolean') throw new Error(`source enabled must be boolean for ${source.id}`)
  if (!source.config || typeof source.config !== 'object' || Array.isArray(source.config)) {
    throw new Error(`source config must be an object for ${source.id}`)
  }
  return true
}

function listEnabledSources(registry, requested = null, options = {}) {
  const requestedSet = requested?.length ? new Set(requested) : null
  return registry.sources.filter(source => {
    if (requestedSet && !requestedSet.has(source.id) && !requestedSet.has(source.module)) return false
    if (requestedSet && options.includeDisabledRequested) return true
    return source.enabled
  })
}

function findSource(registry, id) {
  return registry.sources.find(source => source.id === id || source.module === id) || null
}

function sourceConfigForModule(source) {
  return { ...(source.config || {}), sourceId: source.id, sourceLabel: source.label }
}

function normalizeSourceInput(input) {
  const source = {
    id: String(input.id || '').trim(),
    module: String(input.module || '').trim(),
    label: String(input.label || '').trim(),
    enabled: input.enabled === true || input.enabled === 'true' || input.enabled === 'on',
    notes: String(input.notes || '').trim(),
    config: typeof input.config === 'string' ? parseConfig(input.config) : (input.config || {}),
  }
  validateSource(source)
  return source
}

function parseConfig(raw) {
  try {
    const parsed = JSON.parse(raw || '{}')
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) throw new Error('config must be an object')
    return parsed
  } catch (err) {
    throw new Error(`invalid source config JSON: ${err.message}`)
  }
}

function isId(value) {
  return typeof value === 'string' && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value)
}

module.exports = {
  REGISTRY_PATH,
  loadSourceRegistry,
  saveSourceRegistry,
  validateSourceRegistry,
  validateSource,
  listEnabledSources,
  findSource,
  sourceConfigForModule,
  normalizeSourceInput,
}
