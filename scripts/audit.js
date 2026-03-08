// Cycle 8: Depth — Knowledge Base Audit
//
// Scans all English entries in src/currency/ against a quality floor:
//   - abstract present and sufficiently detailed (>= 80 chars)
//   - body word count above threshold (>= 60 words for currents, >= 40 for circuits/practitioners)
//   - links populated (at least 1 cross-reference for currents and circuits)
//   - circuits carry a mediation block
//   - no stub placeholder text ("No explicit currency link", "TBD", etc.)
//   - required sections present (currents expect Signal + Context + Relevance)
//
// Usage:
//   node scripts/audit.js               # full audit, writes audit/QUALITY.md
//   node scripts/audit.js --type current
//   node scripts/audit.js --json        # stdout JSON only, no file write
//
// Output: audit/QUALITY.md

const { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync } = require('fs');
const { join } = require('path');

// --- CLI args ---
const args = process.argv.slice(2);
const filterType = args.includes('--type') ? args[args.indexOf('--type') + 1] : null;
const jsonOnly = args.includes('--json');

// --- Paths ---
const root = join(__dirname, '..');
const srcDir = join(root, 'src', 'currency');
const auditDir = join(root, 'audit');
const outPath = join(auditDir, 'QUALITY.md');

const TYPES = ['currents', 'circuits', 'practitioners'];

// --- Frontmatter parser ---
function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]+?)\n---\n?([\s\S]*)$/);
  if (!match) return { fm: {}, body: content };

  const fm = {};
  const raw = match[1];
  const body = match[2].trim();

  // Simple key: value parser (handles arrays)
  const lines = raw.split('\n');
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    const eq = line.indexOf(':');
    if (eq === -1) { i++; continue; }
    const key = line.slice(0, eq).trim();
    const val = line.slice(eq + 1).trim();

    if (!key || key.startsWith('-') || key.startsWith(' ')) { i++; continue; }

    // Check for block (next lines start with spaces/dashes — YAML list or mapping)
    if (val === '' && i + 1 < lines.length && (lines[i + 1].trimStart().startsWith('-') || lines[i + 1].match(/^\s+\w/))) {
      // Collect block
      const block = [];
      i++;
      while (i < lines.length && (lines[i].startsWith('  ') || lines[i].startsWith('\t') || lines[i].trimStart().startsWith('-'))) {
        block.push(lines[i]);
        i++;
      }
      // If list of scalars
      if (block.every(l => l.trimStart().startsWith('- '))) {
        fm[key] = block.map(l => l.replace(/^\s*-\s*/, '').trim());
      } else {
        // Sub-mapping (e.g. mediation block) — just mark as present
        fm[key] = block.join('\n');
      }
    } else {
      fm[key] = val.replace(/^["']|["']$/g, '');
      i++;
    }
  }

  return { fm, body };
}

function wordCount(text) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

// --- Quality checks ---
const STUB_PATTERNS = [
  /no explicit currency link/i,
  /\btbd\b/i,
  /placeholder/i,
  /coming soon/i,
  /to be written/i,
];

const CURRENT_SECTIONS = ['### Signal', '### Context', '### Relevance'];

function auditEntry(filePath, type) {
  let content;
  try {
    content = readFileSync(filePath, 'utf8');
  } catch {
    return [{ severity: 'error', message: 'Could not read file' }];
  }

  const { fm, body } = parseFrontmatter(content);
  const issues = [];

  // 1. Abstract
  const abstract = fm.abstract || '';
  if (!abstract) {
    issues.push({ severity: 'error', message: 'Missing abstract' });
  } else if (abstract.length < 80) {
    issues.push({ severity: 'warn', message: `Abstract short (${abstract.length} chars, suggest ≥ 80)` });
  }

  // 2. Body word count
  const wc = wordCount(body);
  const wcThreshold = type === 'current' ? 60 : 40;
  if (wc < wcThreshold) {
    issues.push({ severity: wc < 20 ? 'error' : 'warn', message: `Body thin (${wc} words, suggest ≥ ${wcThreshold})` });
  }

  // 3. Links (currents + circuits should have at least 1)
  if (type === 'current' || type === 'circuit') {
    const links = fm.links;
    const hasLinks = Array.isArray(links) ? links.length > 0 : (typeof links === 'string' && links.length > 5);
    if (!hasLinks) {
      issues.push({ severity: 'warn', message: 'No cross-reference links' });
    }
  }

  // 4. Mediation block required for circuits
  if (type === 'circuit') {
    if (!fm.mediation) {
      issues.push({ severity: 'warn', message: 'Circuit missing mediation block' });
    } else {
      // Check that mediation has key sub-fields
      const medStr = typeof fm.mediation === 'string' ? fm.mediation : '';
      if (!medStr.includes('humanRole') && !medStr.includes('human_role')) {
        issues.push({ severity: 'warn', message: 'Mediation block may be missing humanRole field' });
      }
    }
  }

  // 5. Required sections for currents
  if (type === 'current') {
    for (const section of CURRENT_SECTIONS) {
      if (!body.includes(section)) {
        issues.push({ severity: 'warn', message: `Missing section: ${section}` });
      }
    }
  }

  // 6. Stub text
  for (const pattern of STUB_PATTERNS) {
    if (pattern.test(body)) {
      issues.push({ severity: 'warn', message: `Stub placeholder text detected: ${pattern}` });
    }
  }

  // 7. currencyId present
  if (!fm.currencyId) {
    issues.push({ severity: 'error', message: 'Missing currencyId' });
  }

  return issues;
}

// --- Scan ---
const results = [];
let totalEntries = 0;
let totalIssues = 0;
let totalErrors = 0;

for (const folder of TYPES) {
  const dir = join(srcDir, folder);
  if (!existsSync(dir)) continue;

  const typeSingular = folder === 'currents' ? 'current'
    : folder === 'circuits' ? 'circuit'
    : 'practitioner';

  if (filterType && typeSingular !== filterType) continue;

  const files = readdirSync(dir).filter(f => f.endsWith('.md'));

  for (const file of files) {
    const filePath = join(dir, file);
    const id = file.replace('.md', '');
    const issues = auditEntry(filePath, typeSingular);

    totalEntries++;
    totalIssues += issues.length;
    totalErrors += issues.filter(i => i.severity === 'error').length;

    if (issues.length > 0) {
      results.push({ id, type: typeSingular, file: `src/currency/${folder}/${file}`, issues });
    }
  }
}

// --- JSON output ---
if (jsonOnly) {
  console.log(JSON.stringify({ totalEntries, totalIssues, totalErrors, entries: results }, null, 2));
  process.exit(0);
}

// --- Markdown report ---
const now = new Date().toISOString().slice(0, 10);
const clean = totalEntries - results.length;
const cleanPct = Math.round((clean / totalEntries) * 100);

const severityIcon = { error: '🔴', warn: '🟡' };
const typeOrder = ['current', 'circuit', 'practitioner'];

let out = `# Peng Quality Audit

Generated: ${now}
Entries scanned: **${totalEntries}** (English only)
Passing: **${clean}** (${cleanPct}%)
Flagged: **${results.length}** entries · **${totalErrors}** errors · **${totalIssues - totalErrors}** warnings

---

## Flagged Entries

`;

if (results.length === 0) {
  out += '_All entries pass the quality floor. The current flows clearly._\n';
} else {
  for (const type of typeOrder) {
    const group = results.filter(r => r.type === type);
    if (!group.length) continue;

    const typeLabel = type === 'current' ? 'Currents (流)'
      : type === 'circuit' ? 'Circuits (回路)'
      : 'Practitioners (修行者)';

    out += `### ${typeLabel}\n\n`;
    out += `| Entry | Issues |\n|---|---|\n`;

    for (const entry of group) {
      const issueSummary = entry.issues
        .map(i => `${severityIcon[i.severity]} ${i.message}`)
        .join('<br>');
      out += `| [\`${entry.id}\`](${entry.file}) | ${issueSummary} |\n`;
    }
    out += '\n';
  }
}

out += `---

## Quality Criteria

| Check | Currents | Circuits | Practitioners |
|---|---|---|---|
| Abstract present | ≥ 80 chars | ≥ 80 chars | ≥ 80 chars |
| Body word count | ≥ 60 words | ≥ 40 words | ≥ 40 words |
| Cross-reference links | ≥ 1 | ≥ 1 | — |
| Mediation block | — | Required | — |
| Required sections | Signal, Context, Relevance | — | — |
| Stub text | Flagged | Flagged | Flagged |

🔴 Error — significant gap, enrichment recommended before promoting to Conversation cycle
🟡 Warning — minor gap, acceptable but improvable

---
*Audit by Peng (鵬). Run \`node scripts/enrich.js --id {id}\` to enrich flagged entries.*
`;

// Write output
if (!existsSync(auditDir)) mkdirSync(auditDir, { recursive: true });
writeFileSync(outPath, out);

// Console summary
console.log(`Audit complete: ${totalEntries} entries scanned`);
console.log(`  Passing:  ${clean} (${cleanPct}%)`);
console.log(`  Flagged:  ${results.length} entries`);
console.log(`  Errors:   ${totalErrors}`);
console.log(`  Warnings: ${totalIssues - totalErrors}`);
console.log(`\nReport → audit/QUALITY.md`);

if (results.length > 0) {
  console.log('\nTop issues:');
  for (const entry of results.slice(0, 10)) {
    const worst = entry.issues.find(i => i.severity === 'error') || entry.issues[0];
    console.log(`  ${worst.severity === 'error' ? '🔴' : '🟡'} ${entry.id}: ${worst.message}`);
  }
  if (results.length > 10) console.log(`  ... and ${results.length - 10} more`);
}
