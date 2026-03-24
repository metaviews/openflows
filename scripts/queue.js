// Cycle 6: Autonomy — Proposal Queue
//
// Scans drafts/ and drafts/zh/ and writes a human-readable QUEUE.md
// summarizing all entries pending review and promotion.
//
// Usage:
//   node scripts/queue.js
//
// Called automatically by the intake GitHub Action after each run.
// Output: drafts/QUEUE.md (committed to git; excluded by .gitignore exception)

const { readFileSync, writeFileSync, readdirSync, existsSync, statSync } = require('fs');
const { join } = require('path');

const root = join(__dirname, '..');
const draftsDir = join(root, 'drafts');
const zhDraftsDir = join(root, 'drafts', 'zh');
const practitionerDraftsDir = join(root, 'drafts', 'practitioners');

function parseFrontmatter(filepath) {
  try {
    const content = readFileSync(filepath, 'utf8').replace(/\r\n/g, '\n');
    const match = content.match(/^---\n([\s\S]+?)\n---/);
    if (!match) return {};
    const fm = {};
    for (const line of match[1].split('\n')) {
      const eq = line.indexOf(':');
      if (eq === -1) continue;
      const key = line.slice(0, eq).trim();
      const val = line.slice(eq + 1).trim().replace(/^["']|["']$/g, '');
      if (key && !key.startsWith(' ') && !key.startsWith('-')) fm[key] = val;
    }
    return fm;
  } catch { return {}; }
}

function getMdFiles(dir, exclude = []) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter(f => f.endsWith('.md') && !exclude.includes(f))
    .map(f => ({ file: f, path: join(dir, f), mtime: statSync(join(dir, f)).mtime }))
    .sort((a, b) => b.mtime - a.mtime);
}

const SKIP = ['QUEUE.md', 'peng-attention.md', 'seen.json', '.gitkeep'];

const enFiles = getMdFiles(draftsDir, SKIP);
const zhFiles = getMdFiles(zhDraftsDir, SKIP);
const practitionerFiles = getMdFiles(practitionerDraftsDir, SKIP);
const total = enFiles.length + zhFiles.length;

// Group by currencyType
const buckets = { current: [], circuit: [], practitioner: [], unknown: [] };

for (const { file, path, mtime } of enFiles) {
  const fm = parseFrontmatter(path);
  const type = fm.currencyType || 'unknown';
  const bucket = buckets[type] || buckets.unknown;
  bucket.push({
    id: fm.currencyId || file.replace('.md', ''),
    title: fm.title || file,
    abstract: fm.abstract || '',
    date: fm.date || '',
    lang: 'en',
    drafted: mtime.toISOString().slice(0, 10),
  });
}

for (const { file, path, mtime } of zhFiles) {
  const fm = parseFrontmatter(path);
  const type = fm.currencyType || 'unknown';
  const bucket = buckets[type] || buckets.unknown;
  bucket.push({
    id: fm.currencyId || file.replace('.md', ''),
    title: fm.title || file,
    abstract: fm.abstract || '',
    date: fm.date || '',
    lang: 'zh',
    drafted: mtime.toISOString().slice(0, 10),
  });
}

const now = new Date().toISOString().slice(0, 10);

const typeLabels = {
  current: 'Currents (流)',
  circuit: 'Circuits (回路)',
  practitioner: 'Practitioners (修行者)',
  unknown: 'Unknown',
};

const promoteInstructions = {
  current: 'src/currency/currents/',
  circuit: 'src/currency/circuits/',
  practitioner: 'src/currency/practitioners/',
};

let out = `# Peng Proposal Queue

Generated: ${now}
Pending: **${total}** drafts — ${enFiles.length} English · ${zhFiles.length} Chinese

To promote an entry:
1. Move from \`drafts/{id}.md\` → \`src/currency/{type}/{id}.md\`
2. Run \`node scripts/translate.js --id {id}\` to produce the Chinese draft
3. Review \`drafts/zh/{id}.md\`, then move to \`src/currency/zh/{type}/{id}.md\`

`;

if (total === 0) {
  out += '_No pending drafts._\n';
} else {
  for (const [type, items] of Object.entries(buckets)) {
    if (!items.length) continue;
    const label = typeLabels[type];
    const dest = promoteInstructions[type] || 'src/currency/';
    out += `## ${label}\n\n`;
    out += `Promote to: \`${dest}\`\n\n`;
    out += `| ID | Title | Drafted | Lang |\n`;
    out += `|---|---|---|---|\n`;
    for (const item of items) {
      out += `| ${item.id} | ${item.title} | ${item.drafted} | ${item.lang} |\n`;
    }
    out += '\n';
    if (items.some(i => i.abstract)) {
      out += '**Abstracts:**\n\n';
      for (const item of items.filter(i => i.abstract)) {
        out += `- **${item.id}** (${item.lang}): ${item.abstract}\n`;
      }
      out += '\n';
    }
  }
}

// Practitioner candidates — separate section, different framing
if (practitionerFiles.length > 0) {
  out += `## Practitioner Candidates (修行者候选)\n\n`;
  out += `These are **candidates for human selection** — not ready-to-promote drafts.\n`;
  out += `Review each carefully. Promote only those with clear, durable field-shaping impact.\n\n`;
  out += `Promote to: \`src/currency/practitioners/\`\n\n`;
  out += `| ID | Title | Drafted |\n`;
  out += `|---|---|---|\n`;
  for (const { file, path, mtime } of practitionerFiles) {
    const fm = parseFrontmatter(path);
    const id = fm.currencyId || file.replace('.md', '');
    const title = fm.title || file;
    const drafted = mtime.toISOString().slice(0, 10);
    out += `| ${id} | ${title} | ${drafted} |\n`;
  }
  out += '\n';
  if (practitionerFiles.some(({ path }) => parseFrontmatter(path).abstract)) {
    out += '**Abstracts:**\n\n';
    for (const { file, path } of practitionerFiles) {
      const fm = parseFrontmatter(path);
      if (fm.abstract) out += `- **${fm.currencyId || file}**: ${fm.abstract}\n`;
    }
    out += '\n';
  }
}

const outPath = join(draftsDir, 'QUEUE.md');
writeFileSync(outPath, out);
console.log(`Queue updated: ${total} pending drafts → drafts/QUEUE.md`);
