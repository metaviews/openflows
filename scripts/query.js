// Cycle 2: Voice — Query Interface
// Usage: node scripts/query.js "your question here"
// Config: OPENROUTER_API_KEY and OPENROUTER_MODEL in .env

const { readFileSync } = require('fs');
const { join } = require('path');
const { loadEnv, createClient } = require('./lib/openrouter');

loadEnv();

const query = process.argv[2];
if (!query) {
  console.error('Usage: node scripts/query.js "your question"');
  process.exit(1);
}

const or = createClient({ title: 'Openflows Agent' });

// Load manifest — requires `npm run build` to have been run
const manifestPath = join(__dirname, '..', '_site', 'knowledge-manifest.json');
let manifest;
try {
  manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
} catch {
  console.error('Error: manifest not found at _site/knowledge-manifest.json');
  console.error('Run `npm run build` first, then retry.');
  process.exit(1);
}

// Build compact context from all entries
// Abstracts + links only — enough for most queries without blowing the context window
const context = manifest.entries.map(e => {
  const header = `[${e.currencyType.toUpperCase()}] ${e.title} (id: ${e.currencyId}, ${e.date.slice(0, 10)})`;
  const abstract = e.abstract || '(no abstract)';
  const links = e.links.length
    ? 'Links: ' + e.links.map(l => `${l.id} — ${l.relation}`).join('; ')
    : '';
  return [header, abstract, links].filter(Boolean).join('\n');
}).join('\n\n');

const systemPrompt = `You are the Openflows agent. Openflows documents the open source AI ecosystem as structured knowledge: Currents (tools, projects, signals), Circuits (synthesized patterns across currents), and Operators (key figures).

Your role is to answer questions grounded in the knowledge base below. Be specific — reference ids and titles when relevant. Maintain the project's tone: technical, civic, non-hyperbolic. Treat AI as infrastructure, not authority.

If a question falls outside the knowledge base, say so clearly rather than speculating.

KNOWLEDGE BASE (${manifest.count} entries, generated ${manifest.generated.slice(0, 10)}):

${context}`;

async function main() {
  console.log(`\nQuerying: ${or.primaryModel}\n`);

  const answer = await or.chat(systemPrompt, query);

  if (!answer) {
    console.error('Unexpected empty response from OpenRouter');
    process.exit(1);
  }

  console.log(answer);
  console.log(`\n[model: ${or.primaryModel}]`);
}

main().catch(err => {
  console.error('Fatal:', err.message);
  process.exit(1);
});
