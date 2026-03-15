// Cycle 10: Refresh — Entry Update Monitoring
//
// Checks existing knowledge base entries against their source URLs.
// Entries not reviewed in more than STALE_DAYS are fetched and assessed
// by Peng for meaningful changes. If an update is warranted, a draft update
// note is written to drafts/updates/{id}.md for human review.
// lastReviewed is bumped on every entry that is assessed, regardless of outcome.
//
// Usage:
//   node scripts/refresh.js                  # check all stale entries
//   node scripts/refresh.js --limit 10       # cap batch size
//   node scripts/refresh.js --id vllm        # force-check a specific entry
//   node scripts/refresh.js --days 7         # staleness threshold (default: 7)

const { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync } = require('fs');
const { join } = require('path');
const { loadEnv, createClient, getArg } = require('./lib/openrouter');

loadEnv();

const or = createClient({ title: 'Openflows Refresh Agent - Peng' });

const args = process.argv.slice(2);
const limitArg = getArg(args, 'limit');
const idArg = getArg(args, 'id');
const daysArg = getArg(args, 'days');

const STALE_DAYS = parseInt(daysArg || '7', 10);
const BATCH_LIMIT = limitArg ? parseInt(limitArg, 10) : 15;

const root = join(__dirname, '..');
const srcBase = join(root, 'src', 'currency');
const updatesDir = join(root, 'drafts', 'updates');
const TYPES = ['currents', 'circuits', 'practitioners'];

const today = new Date().toISOString().slice(0, 10);

// --- Frontmatter helpers ---

function parseFrontmatter(content) {
  content = content.replace(/\r\n/g, '\n');
  const match = content.match(/^---\n([\s\S]+?)\n---\n?([\s\S]*)$/);
  if (!match) return { raw: '', body: content, fm: {} };

  const raw = match[1];
  const body = match[2].trim();
  const fm = {};

  for (const line of raw.split('\n')) {
    const eq = line.indexOf(':');
    if (eq === -1 || line.startsWith(' ') || line.startsWith('-')) continue;
    const key = line.slice(0, eq).trim();
    const val = line.slice(eq + 1).trim().replace(/^["']|["']$/g, '');
    if (key) fm[key] = val;
  }

  return { raw, body, fm };
}

// Set or update a single scalar frontmatter field in the raw file content.
// If the field exists it is replaced; if not it is inserted before the closing ---.
function setFrontmatterField(fileContent, field, value) {
  fileContent = fileContent.replace(/\r\n/g, '\n');
  const fmClose = fileContent.indexOf('\n---\n', 4);
  if (fmClose === -1) return fileContent;

  const header = fileContent.slice(0, fmClose);
  const rest = fileContent.slice(fmClose);

  const fieldRe = new RegExp(`^${field}:.*$`, 'm');
  if (fieldRe.test(header)) {
    return header.replace(fieldRe, `${field}: ${value}`) + rest;
  }
  return header + `\n${field}: ${value}` + rest;
}

// --- Entry discovery ---

function findEntries() {
  const entries = [];
  for (const type of TYPES) {
    const dir = join(srcBase, type);
    if (!existsSync(dir)) continue;
    for (const file of readdirSync(dir)) {
      if (!file.endsWith('.md')) continue;
      const id = file.replace(/\.md$/, '');
      entries.push({ id, type, path: join(dir, file) });
    }
  }
  return entries;
}

// --- Staleness check ---

function isStale(fm) {
  const dateStr = fm.lastReviewed || fm.date;
  if (!dateStr) return true;
  const last = new Date(dateStr);
  if (isNaN(last)) return true;
  const diffDays = (Date.now() - last.getTime()) / (1000 * 60 * 60 * 24);
  return diffDays >= STALE_DAYS;
}

// --- URL extraction ---

// Pulls the first https:// URL from the Signal section of the entry body.
function extractSourceUrl(body) {
  const signalSection = body.match(/###\s+Signal[\s\S]*?(?=###|$)/i);
  if (!signalSection) return null;
  const m = signalSection[0].match(/https?:\/\/[^\s\)\]"'<>]+/);
  return m ? m[0].replace(/[.,;]+$/, '') : null;
}

// --- Web fetch (best effort) ---

async function fetchText(url) {
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'Openflows-Refresh-Agent/1.0 (https://openflows.org)' },
      signal: AbortSignal.timeout(12000),
    });
    if (!res.ok) return null;
    const contentType = res.headers.get('content-type') || '';
    const text = await res.text();
    // Strip HTML tags for cleaner signal
    if (contentType.includes('html')) {
      return text
        .replace(/<script[\s\S]*?<\/script>/gi, '')
        .replace(/<style[\s\S]*?<\/style>/gi, '')
        .replace(/<[^>]+>/g, ' ')
        .replace(/\s{3,}/g, '\n')
        .slice(0, 6000);
    }
    return text.slice(0, 6000);
  } catch {
    return null;
  }
}

// --- Peng assessment ---

async function assessUpdate(entry, currentContent) {
  const system = `You are Peng (鵬), maintaining the Openflows knowledge base.
Your task: assess whether an existing entry needs an update based on current source content.

Rules:
- Only flag MEANINGFUL changes: new releases, major feature additions, significant adoption shifts, governance changes, project status changes, or new connections to other KB entries.
- Do NOT flag minor wording differences, trivial version bumps, or marketing copy.
- If there is nothing meaningful to add, return {"update": false}.
- If an update is warranted, return a dated update note of 1–3 sentences in plain prose. No markdown headers. No preamble.
- Keep the update note factual and terse. Focus on what changed and why it matters.`;

  const user = `Existing entry (${entry.id}):
---
${entry.body.slice(0, 2000)}

Current source content (${entry.sourceUrl}):
---
${currentContent.slice(0, 3000)}

Assess: has anything meaningful changed? Return JSON only:
{"update": true, "note": "..."}  or  {"update": false}`;

  const response = await or.chat(system, user);
  try {
    const jsonMatch = response.replace(/<think>[\s\S]*?<\/think>/g, '').match(/\{[\s\S]*\}/);
    return JSON.parse(jsonMatch ? jsonMatch[0] : response);
  } catch {
    return { update: false };
  }
}

// --- Write update draft ---

function writeUpdateDraft(entry, note) {
  if (!existsSync(updatesDir)) mkdirSync(updatesDir, { recursive: true });

  const content = `---
updateFor: ${entry.id}
updateDate: ${today}
sourceUrl: ${entry.sourceUrl}
---

**${today}**: ${note}
`;
  const outPath = join(updatesDir, `${entry.id}.md`);
  writeFileSync(outPath, content);
  console.log(`  [draft] ${entry.id} → drafts/updates/${entry.id}.md`);
}

// --- Bump lastReviewed in the source file ---

function bumpLastReviewed(entryPath, originalContent) {
  const updated = setFrontmatterField(originalContent, 'lastReviewed', today);
  writeFileSync(entryPath, updated);
}

// --- Main ---

async function main() {
  const all = findEntries();

  let batch;
  if (idArg) {
    batch = all.filter(e => e.id === idArg);
    if (batch.length === 0) {
      console.error(`Entry not found: ${idArg}`);
      process.exit(1);
    }
  } else {
    // Filter to stale entries, sort most stale first
    const stale = [];
    for (const entry of all) {
      const raw = readFileSync(entry.path, 'utf8');
      const { fm } = parseFrontmatter(raw);
      if (isStale(fm)) {
        const lastDate = new Date(fm.lastReviewed || fm.date || 0);
        stale.push({ ...entry, lastDate });
      }
    }
    stale.sort((a, b) => a.lastDate - b.lastDate);
    batch = stale.slice(0, BATCH_LIMIT);
  }

  if (batch.length === 0) {
    console.log(`No entries stale (>${STALE_DAYS} days). Nothing to refresh.`);
    return;
  }

  console.log(`Refreshing ${batch.length} entr${batch.length === 1 ? 'y' : 'ies'} (stale >${STALE_DAYS} days)...\n`);

  let updated = 0;
  let skipped = 0;
  let noUrl = 0;
  let fetchFailed = 0;

  for (const entry of batch) {
    const originalContent = readFileSync(entry.path, 'utf8');
    const { body } = parseFrontmatter(originalContent);

    const sourceUrl = extractSourceUrl(body);
    if (!sourceUrl) {
      console.log(`  [skip] ${entry.id} — no source URL found`);
      noUrl++;
      bumpLastReviewed(entry.path, originalContent);
      continue;
    }

    process.stdout.write(`  ${entry.id} (${sourceUrl.slice(0, 60)})… `);

    const currentContent = await fetchText(sourceUrl);
    if (!currentContent) {
      process.stdout.write('fetch failed\n');
      fetchFailed++;
      bumpLastReviewed(entry.path, originalContent);
      continue;
    }

    const assessment = await assessUpdate({ ...entry, body, sourceUrl }, currentContent);

    if (assessment.update && assessment.note) {
      process.stdout.write('update found\n');
      writeUpdateDraft({ ...entry, sourceUrl }, assessment.note);
      updated++;
    } else {
      process.stdout.write('no change\n');
      skipped++;
    }

    bumpLastReviewed(entry.path, originalContent);
  }

  console.log(`\nDone. ${updated} update draft(s), ${skipped} unchanged, ${noUrl} no URL, ${fetchFailed} fetch failed.`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
