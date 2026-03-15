// Apply Update — append a refresh draft note to an existing live entry
//
// Usage: node scripts/apply-update.js --id {currencyId}
//
// Reads drafts/updates/{id}.md, appends the update note to the live entry
// under a "## Updates" section, bumps lastReviewed, and removes the draft.
// Also bumps lastReviewed on the corresponding zh entry if it exists.

const { readFileSync, writeFileSync, existsSync, unlinkSync, readdirSync } = require('fs');
const { join } = require('path');
const { getArg } = require('./lib/openrouter');

const args = process.argv.slice(2);
const idArg = getArg(args, 'id');

if (!idArg) {
  console.error('Usage: node scripts/apply-update.js --id {currencyId}');
  process.exit(1);
}

const ROOT = join(__dirname, '..');
const TYPES = ['currents', 'circuits', 'practitioners'];
const today = new Date().toISOString().slice(0, 10);

function normalize(s) {
  return s.replace(/\r\n/g, '\n');
}

function setFrontmatterField(content, field, value) {
  content = normalize(content);
  const fmClose = content.indexOf('\n---\n', 4);
  if (fmClose === -1) return content;
  const header = content.slice(0, fmClose);
  const rest = content.slice(fmClose);
  const fieldRe = new RegExp(`^${field}:.*$`, 'm');
  if (fieldRe.test(header)) {
    return header.replace(fieldRe, `${field}: ${value}`) + rest;
  }
  return header + `\n${field}: ${value}` + rest;
}

function findEntry(id) {
  for (const type of TYPES) {
    const p = join(ROOT, 'src', 'currency', type, `${id}.md`);
    if (existsSync(p)) return p;
  }
  return null;
}

function findZhEntry(id) {
  for (const type of TYPES) {
    const p = join(ROOT, 'src', 'currency', 'zh', type, `${id}.md`);
    if (existsSync(p)) return p;
  }
  return null;
}

// Parse the update note from the draft file (everything after the frontmatter)
function parseUpdateDraft(content) {
  content = normalize(content);
  const match = content.match(/^---\n[\s\S]+?\n---\n([\s\S]*)$/);
  return match ? match[1].trim() : content.trim();
}

// Append note under ## Updates section, creating it if needed
function appendUpdateNote(entryContent, note) {
  entryContent = normalize(entryContent);
  const updatesHeader = '\n\n## Updates\n\n';

  if (entryContent.includes('## Updates')) {
    // Append after the last existing note
    return entryContent.trimEnd() + '\n\n' + note;
  }
  return entryContent.trimEnd() + updatesHeader + note;
}

// --- Main ---

const draftPath = join(ROOT, 'drafts', 'updates', `${idArg}.md`);
if (!existsSync(draftPath)) {
  console.error(`No update draft found: drafts/updates/${idArg}.md`);
  process.exit(1);
}

const entryPath = findEntry(idArg);
if (!entryPath) {
  console.error(`Live entry not found in src/currency/ for id: ${idArg}`);
  process.exit(1);
}

const draftContent = normalize(readFileSync(draftPath, 'utf8'));
const note = parseUpdateDraft(draftContent);
if (!note) {
  console.error('Update draft has no body content.');
  process.exit(1);
}

// Apply to English entry
let entryContent = normalize(readFileSync(entryPath, 'utf8'));
entryContent = appendUpdateNote(entryContent, note);
entryContent = setFrontmatterField(entryContent, 'lastReviewed', today);
writeFileSync(entryPath, entryContent);
console.log(`Updated: ${entryPath.replace(ROOT, '').replace(/\\/g, '/')}`);

// Bump lastReviewed on zh entry if it exists
const zhPath = findZhEntry(idArg);
if (zhPath) {
  let zhContent = normalize(readFileSync(zhPath, 'utf8'));
  zhContent = setFrontmatterField(zhContent, 'lastReviewed', today);
  writeFileSync(zhPath, zhContent);
  console.log(`Bumped lastReviewed: ${zhPath.replace(ROOT, '').replace(/\\/g, '/')}`);
}

// Remove draft
unlinkSync(draftPath);
console.log(`Removed: drafts/updates/${idArg}.md`);
console.log(`\nDone. Commit when ready.`);
