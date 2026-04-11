'use strict'

const path = require('path')
const { readFileSync } = require('fs')
const { loadEnv, createClient } = require('./lib/openrouter')
const { loadSourceRegistry } = require('./lib/source-registry')
const { initDb } = require('../server/db')
const { proposeSource } = require('../server/lib/sources')

loadEnv()

const ROOT = path.join(__dirname, '..')
const MANIFEST_PATH = path.join(ROOT, '_site', 'knowledge-manifest.json')

async function main() {
  const or = createClient({ title: 'Openflows Source Discovery' })
  const registry = loadSourceRegistry()
  const manifest = loadManifest()
  const db = initDb()

  const prompt = `You are Peng, proposing new intake sources for Openflows.

Return ONLY valid JSON with this shape:
{"sources":[{"id":"kebab-case-id","module":"brave","label":"Short label","reason":"Why this source helps Openflows","config":{"queries":["query"],"count":5}}]}

Rules:
- Propose sources only as inactive review proposals.
- Use only existing source modules: github, huggingface, brave, twitter, bluesky, mastodon, opensourceprojects.
- For social media sources, propose disabled review candidates only; never imply that social posts are primary evidence.
- Prefer Brave query sources for new topical web discovery unless a GitHub/HuggingFace source is clearly better.
- Do not duplicate an existing source id.
- Keep configs compact: 2-5 queries/tasks.

Existing sources:
${registry.sources.map(source => `${source.id} (${source.module}): ${source.label}`).join('\n')}

Knowledge base sample:
${(manifest.entries || []).slice(0, 120).map(entry => `${entry.currencyType}|${entry.currencyId}|${entry.lang}: ${entry.title} - ${entry.abstract || ''}`).join('\n')}`

  const content = await or.ask(prompt)
  const proposals = parseProposals(content)
  let created = 0
  for (const proposal of proposals) {
    if (registry.sources.some(source => source.id === proposal.id)) continue
    try {
      proposeSource(db, { ...proposal, proposedBy: 'peng-discover-sources' })
      created++
      console.log(`Proposed ${proposal.id} (${proposal.module})`)
    } catch (err) {
      console.warn(`Skipped ${proposal.id || '(unknown)'}: ${err.message}`)
    }
  }
  console.log(`\n${created} source proposal(s) created.`)
  db.close()
}

function loadManifest() {
  try {
    return JSON.parse(readFileSync(MANIFEST_PATH, 'utf8'))
  } catch {
    console.error('Manifest not found. Run `npm run build` first.')
    process.exit(1)
  }
}

function parseProposals(content) {
  const match = String(content || '').match(/\{[\s\S]*\}/)
  if (!match) return []
  const parsed = JSON.parse(match[0])
  return Array.isArray(parsed.sources) ? parsed.sources : []
}

main().catch(err => {
  console.error('Fatal:', err.message)
  process.exit(1)
})
