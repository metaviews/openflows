// Cycle 2: Voice — Query Interface
// Usage: node scripts/query.js "your question here"
// Config: OPENROUTER_API_KEY and OPENROUTER_MODEL in .env

const { readFileSync } = require('fs');
const { join } = require('path');

// Minimal .env loader — no dependency needed
try {
  const envFile = readFileSync(join(__dirname, '..', '.env'), 'utf8');
  for (const line of envFile.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const val = trimmed.slice(eq + 1).trim().replace(/^["']|["']$/g, '');
    if (key && !(key in process.env)) process.env[key] = val;
  }
} catch {}

const query = process.argv[2];
if (!query) {
  console.error('Usage: node scripts/query.js "your question"');
  process.exit(1);
}

const API_KEY = process.env.OPENROUTER_API_KEY;
const MODEL = process.env.OPENROUTER_MODEL || 'google/gemini-flash-1.5';

if (!API_KEY) {
  console.error('Error: OPENROUTER_API_KEY not set. Add it to .env');
  process.exit(1);
}

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
  console.log(`\nQuerying: ${MODEL}\n`);

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'https://openflows.org',
      'X-Title': 'Openflows Agent'
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: query }
      ]
    })
  });

  if (!response.ok) {
    const err = await response.text();
    console.error('OpenRouter error:', response.status, err);
    process.exit(1);
  }

  const data = await response.json();
  const answer = data.choices?.[0]?.message?.content;

  if (!answer) {
    console.error('Unexpected response shape:', JSON.stringify(data, null, 2));
    process.exit(1);
  }

  console.log(answer);
  console.log(`\n[model: ${data.model || MODEL} | tokens: ${data.usage?.total_tokens ?? '?'}]`);
}

main().catch(err => {
  console.error('Fatal:', err.message);
  process.exit(1);
});
