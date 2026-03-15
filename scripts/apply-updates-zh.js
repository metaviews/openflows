// One-off: translate ## Updates sections from English entries and append to zh counterparts.
// Run after apply-update.js has already applied notes to English entries.
//
// Usage: node scripts/apply-updates-zh.js [--ids id1,id2,...]

const { readFileSync, writeFileSync, existsSync } = require('fs');
const { join } = require('path');
const { loadEnv, createClient, getArg } = require('./lib/openrouter');

loadEnv();
const or = createClient({ title: 'Openflows ZH Update Agent' });

const args = process.argv.slice(2);
const idsArg = getArg(args, 'ids');

const ROOT = join(__dirname, '..');
const TYPES = ['currents', 'circuits', 'practitioners'];

function normalize(s) { return s.replace(/\r\n/g, '\n'); }

function findEntry(id, lang) {
  const base = lang === 'zh'
    ? join(ROOT, 'src', 'currency', 'zh')
    : join(ROOT, 'src', 'currency');
  for (const type of TYPES) {
    const p = join(base, type, `${id}.md`);
    if (existsSync(p)) return p;
  }
  return null;
}

function extractUpdatesSection(content) {
  content = normalize(content);
  const m = content.match(/\n## Updates\n([\s\S]*)$/);
  return m ? m[1].trim() : null;
}

function hasUpdatesSection(content) {
  return normalize(content).includes('\n## Updates\n');
}

async function translateNote(note) {
  const response = await or.chat(
    `You are translating a brief factual update note from English to Chinese for the Openflows knowledge base.
Keep it concise. Preserve numbers, proper nouns, and technical terms.
Use these glossary terms: Currents=流, Circuits=回路, Practitioners=修行者, Agent=智能体.
Return ONLY the translated text, nothing else.`,
    note
  );
  return response.trim();
}

async function main() {
  const ids = idsArg ? idsArg.split(',') : [];
  if (ids.length === 0) {
    console.error('Usage: node scripts/apply-updates-zh.js --ids id1,id2,...');
    process.exit(1);
  }

  for (const id of ids) {
    const enPath = findEntry(id, 'en');
    const zhPath = findEntry(id, 'zh');

    if (!enPath) { console.log(`  [skip] ${id} — no English entry`); continue; }
    if (!zhPath) { console.log(`  [skip] ${id} — no zh entry`); continue; }

    const enContent = normalize(readFileSync(enPath, 'utf8'));
    const zhContent = normalize(readFileSync(zhPath, 'utf8'));

    if (hasUpdatesSection(zhContent)) {
      console.log(`  [skip] ${id} — zh already has ## Updates`);
      continue;
    }

    const enUpdates = extractUpdatesSection(enContent);
    if (!enUpdates) { console.log(`  [skip] ${id} — no ## Updates in English entry`); continue; }

    process.stdout.write(`  ${id}… `);
    const zhNote = await translateNote(enUpdates);
    const updated = zhContent.trimEnd() + '\n\n## 更新记录\n\n' + zhNote + '\n';
    writeFileSync(zhPath, updated);
    console.log('done');
  }

  console.log('\nDone.');
}

main().catch(err => { console.error(err); process.exit(1); });
