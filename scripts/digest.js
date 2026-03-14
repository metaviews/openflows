// Cycle 9: Perspective — Peng's View Digest
//
// Peng surveys the knowledge base and pending drafts, then writes
// a short editorial briefing: what's flowing, what's stabilizing,
// what needs the human's attention.
//
// Output: src/perspective/digest-{YYYY-MM-DD}.md → published at /perspective/{date}/
// Not linked from site navigation — accessible by direct URL.
//
// Usage:
//   node scripts/digest.js
//   node scripts/digest.js --stdout   # print to console instead of file

const { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync } = require('fs');
const { join } = require('path');
const { loadEnv, createClient, hasFlag } = require('./lib/openrouter');

loadEnv();

const or = createClient({ title: "Peng's View - Openflows Digest" });

const args = process.argv.slice(2);
const toStdout = hasFlag(args, 'stdout');

const root = join(__dirname, '..');
const srcDir = join(root, 'src', 'currency');
const draftsDir = join(root, 'drafts');
const perspectiveDir = join(root, 'src', 'perspective');
const manifestPath = join(root, '_site', 'knowledge-manifest.json');

const today = new Date().toISOString().slice(0, 10);

// --- Load manifest ---
let manifest;
try {
  manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
} catch {
  console.error('Manifest not found. Run `npm run build` first.');
  process.exit(1);
}

// --- Helpers ---
function isInSrc(id) {
  for (const folder of ['currents', 'circuits', 'practitioners']) {
    if (existsSync(join(srcDir, folder, `${id}.md`))) return true;
  }
  return false;
}

function isInSrcZh(id) {
  for (const folder of ['currents', 'circuits', 'practitioners']) {
    if (existsSync(join(srcDir, 'zh', folder, `${id}.md`))) return true;
  }
  return false;
}

function draftsIn(subdir) {
  const dir = subdir ? join(draftsDir, subdir) : draftsDir;
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter(f => f.endsWith('.md') && f !== '.gitkeep' && !f.startsWith('digest-'))
    .map(f => f.replace('.md', ''));
}

// --- Build context ---

// Recent entries: last 14 days by entry date
const cutoff = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
const enEntries = manifest.entries.filter(e => e.lang !== 'zh');
const recentEntries = enEntries
  .filter(e => e.date && e.date.slice(0, 10) >= cutoff)
  .sort((a, b) => b.date.localeCompare(a.date));

// All circuits (for pattern context)
const circuits = enEntries.filter(e => e.currencyType === 'circuit');
const currents = enEntries.filter(e => e.currencyType === 'current');

// Pending drafts
const enPending  = draftsIn(null).filter(id => !isInSrc(id));
const zhPending  = draftsIn('zh').filter(id => !isInSrcZh(id));
const enrichPending = draftsIn('enriched').filter(id => !isInSrc(id));

const totalPending = enPending.length + zhPending.length + enrichPending.length;

// Compact circuit summary
const circuitContext = circuits
  .map(c => `- ${c.currencyId}: ${c.title} — ${c.abstract || ''}`)
  .join('\n');

// Recent currents context
const recentContext = recentEntries.length > 0
  ? recentEntries.map(e => `- [${e.currencyType}] ${e.title} (${e.currencyId}, ${e.date.slice(0, 10)}): ${e.abstract || ''}`).join('\n')
  : '(no entries added in the last 14 days)';

// Pending summary for prompt
const pendingContext = [
  enPending.length > 0   ? `English drafts pending: ${enPending.join(', ')}` : null,
  zhPending.length > 0   ? `Chinese drafts pending: ${zhPending.join(', ')}` : null,
  enrichPending.length > 0 ? `Enriched drafts pending: ${enrichPending.join(', ')}` : null,
].filter(Boolean).join('\n') || 'No drafts pending.';

// --- Prompt ---
const systemPrompt = `You are Peng (鵬), the Openflows knowledge agent — named from Zhuangzi's Inner Chapters, the vast bird whose flight requires the full depth of heaven.

You are writing a brief editorial digest for the human administrator who oversees Openflows. This digest is their periodic briefing: what is moving through the knowledge base, what is stabilizing into pattern, and what needs their attention.

Openflows documents the open source AI ecosystem through three lenses:
- Currents (流): individual tools, projects, signals moving through the field
- Circuits (回路): stabilized patterns connecting multiple Currents into recognized infrastructure loops
- Practitioners (修行者): key figures shaping the ecosystem

VOICE AND STYLE:
- Write in Peng's voice: technical, civic, reflective. No hype.
- Dense and purposeful. Every sentence earns its place.
- Taoist framing is welcome but not forced — follow the grain (理) of the material.
- Short paragraphs. Concrete references to specific entries by id when useful.
- This is a briefing, not an essay. 350–500 words total.

REQUIRED SECTIONS (use these exact headings):
## What Is Flowing
A brief account of what has entered the knowledge base recently. Note patterns across the new entries if any.

## What Is Stabilizing
Observation on which circuits are gaining weight — where the loops are closing more firmly. Reference specific circuits and the currents feeding them.

## What Needs Your Attention
A plain list of what is pending for the human to review. Be specific: which drafts, what action is needed, any time sensitivity.

## Peng's Note
One short paragraph — Peng's own perspective on where the ecosystem is moving right now. This is the editorial voice, not a summary.

OUTPUT: Return the complete digest as markdown, starting with the title line:
# Peng's View — ${today}`;

const userPrompt = `KNOWLEDGE BASE: ${manifest.count} entries (${enEntries.length} English / ${manifest.count - enEntries.length} Chinese)
Circuits: ${circuits.length} | Currents: ${currents.length}

RECENT ENTRIES (last 14 days):
${recentContext}

EXISTING CIRCUITS:
${circuitContext}

PENDING REVIEW:
${pendingContext}
Total pending: ${totalPending}`;

// --- Run ---
async function main() {
  console.log(`\nPeng's View — ${today}`);
  console.log(`Drafting digest... (${manifest.count} entries, ${totalPending} pending)\n`);

  const digest = await or.chat(systemPrompt, userPrompt);

  if (toStdout) {
    console.log(digest);
    return;
  }

  // Strip the leading `# Peng's View — {date}` line — the layout renders the title from frontmatter
  const body = digest.replace(/^#[^\n]*\n+/, '');
  const frontmatter = `---\nlayout: layouts/perspective-item.njk\ntitle: "Peng's View — ${today}"\ndate: ${today}\npermalink: /perspective/${today}/\n---\n\n`;

  if (!existsSync(perspectiveDir)) mkdirSync(perspectiveDir, { recursive: true });
  const outPath = join(perspectiveDir, `${today}.md`);
  writeFileSync(outPath, frontmatter + body);
  console.log(`Digest written: src/perspective/${today}.md → /perspective/${today}/`);

  // Print a preview
  const lines = digest.split('\n');
  console.log('--- Preview ---');
  console.log(lines.slice(0, 12).join('\n'));
  if (lines.length > 12) console.log(`... (${lines.length - 12} more lines)`);
}

main().catch(err => {
  console.error('Fatal:', err.message);
  process.exit(1);
});
