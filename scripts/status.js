// Cycle 9: Perspective — Status Dashboard
//
// One command to see the full state of Openflows:
// pending drafts, stale drafts, knowledge base counts, audit state.
//
// No API calls. No build required (falls back to file counting if no manifest).
//
// Usage:
//   node scripts/status.js

const { readFileSync, readdirSync, existsSync } = require('fs');
const { join } = require('path');

const root = join(__dirname, '..');
const srcDir = join(root, 'src', 'currency');
const draftsDir = join(root, 'drafts');
const auditFile = join(root, 'audit', 'QUALITY.md');
const manifestPath = join(root, '_site', 'knowledge-manifest.json');

// --- Helpers ---

function srcIds(folder) {
  const dir = join(srcDir, folder);
  if (!existsSync(dir)) return new Set();
  return new Set(readdirSync(dir).filter(f => f.endsWith('.md')).map(f => f.replace('.md', '')));
}

function zhSrcIds(folder) {
  const dir = join(srcDir, 'zh', folder);
  if (!existsSync(dir)) return new Set();
  return new Set(readdirSync(dir).filter(f => f.endsWith('.md')).map(f => f.replace('.md', '')));
}

function draftsIn(subdir) {
  const dir = subdir ? join(draftsDir, subdir) : draftsDir;
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter(f => f.endsWith('.md') && f !== '.gitkeep')
    .map(f => f.replace('.md', ''));
}

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

function isDigest(id) {
  return id.startsWith('digest-');
}

// --- Audit state ---
function readAudit() {
  if (!existsSync(auditFile)) return null;
  const lines = readFileSync(auditFile, 'utf8').split('\n');
  const passing = lines.find(l => l.startsWith('Passing:'));
  const scanned = lines.find(l => l.startsWith('Entries scanned:'));
  const date = lines.find(l => l.startsWith('Generated:'));
  return {
    passing: passing ? passing.replace(/\*\*/g, '').replace('Passing:', '').trim() : '?',
    scanned: scanned ? scanned.replace(/\*\*/g, '').replace('Entries scanned:', '').trim() : '?',
    date: date ? date.replace('Generated:', '').trim() : '?',
  };
}

// --- Knowledge base counts ---
function readKB() {
  // Try manifest first
  if (existsSync(manifestPath)) {
    try {
      const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
      const en = manifest.entries.filter(e => e.lang !== 'zh');
      const zh = manifest.entries.filter(e => e.lang === 'zh');
      const byType = (entries) => ({
        currents: entries.filter(e => e.currencyType === 'current').length,
        circuits: entries.filter(e => e.currencyType === 'circuit').length,
        practitioners: entries.filter(e => e.currencyType === 'practitioner').length,
      });
      return {
        total: manifest.count,
        en: en.length, zh: zh.length,
        enTypes: byType(en), zhTypes: byType(zh),
        built: manifest.generated ? manifest.generated.slice(0, 10) : '?',
        fromManifest: true,
      };
    } catch {}
  }

  // Fallback: count files in src/
  const enC = srcIds('currents').size;
  const enCi = srcIds('circuits').size;
  const enP = srcIds('practitioners').size;
  const zhC = zhSrcIds('currents').size;
  const zhCi = zhSrcIds('circuits').size;
  const zhP = zhSrcIds('practitioners').size;
  return {
    total: enC + enCi + enP + zhC + zhCi + zhP,
    en: enC + enCi + enP, zh: zhC + zhCi + zhP,
    enTypes: { currents: enC, circuits: enCi, practitioners: enP },
    zhTypes: { currents: zhC, circuits: zhCi, practitioners: zhP },
    built: null, fromManifest: false,
  };
}

// --- Format helpers ---
function label(n, singular, plural) {
  return `${n} ${n === 1 ? singular : (plural || singular + 's')}`;
}

function row(name, pending, stale) {
  const p = pending > 0 ? `${pending} pending` : '0 pending';
  const s = stale > 0 ? `  (${stale} stale — already in src/)` : '';
  const flag = pending > 0 ? ' *' : '';
  return `  ${name.padEnd(20)} ${p}${s}${flag}`;
}

// --- Main ---
function main() {
  const today = new Date().toISOString().slice(0, 10);
  const kb = readKB();
  const audit = readAudit();

  // Draft inventory
  const enDrafts = draftsIn(null).filter(id => !isDigest(id));
  const zhDrafts = draftsIn('zh');
  const enrichedDrafts = draftsIn('enriched');
  const digestDrafts = draftsIn(null).filter(id => isDigest(id));

  const enPending = enDrafts.filter(id => !isInSrc(id));
  const enStale   = enDrafts.filter(id => isInSrc(id));
  const zhPending = zhDrafts.filter(id => !isInSrcZh(id));
  const zhStale   = zhDrafts.filter(id => isInSrcZh(id));
  const enrichedPending = enrichedDrafts.filter(id => !isInSrc(id));
  const enrichedStale   = enrichedDrafts.filter(id => isInSrc(id));

  const totalPending = enPending.length + zhPending.length + enrichedPending.length;

  console.log(`\nOpenflows Status — ${today}`);
  console.log('─'.repeat(50));

  // Knowledge base
  console.log('\nKNOWLEDGE BASE');
  console.log(`  ${kb.total} entries total  (${kb.en} en / ${kb.zh} zh)`);
  console.log(`  Circuits: ${kb.enTypes.circuits}  |  Currents: ${kb.enTypes.currents}  |  Practitioners: ${kb.enTypes.practitioners}`);
  if (kb.built) console.log(`  Manifest built: ${kb.built}`);
  else console.log(`  (manifest not found — run \`npm run build\` for full counts)`);

  // Audit
  if (audit) {
    console.log('\nAUDIT');
    console.log(`  ${audit.passing} entries passing  (last run: ${audit.date})`);
  }

  // Pending review
  console.log('\nPENDING REVIEW');
  console.log(row('English drafts:', enPending.length, enStale.length));
  console.log(row('Chinese drafts:', zhPending.length, zhStale.length));
  console.log(row('Enriched drafts:', enrichedPending.length, enrichedStale.length));
  if (digestDrafts.length > 0) {
    console.log(`  ${'Digests:'.padEnd(20)} ${digestDrafts.length} unread`);
  }

  if (totalPending === 0) {
    console.log('\n  All drafts reviewed. Nothing pending.');
  } else {
    console.log(`\n  * ${totalPending} item${totalPending === 1 ? '' : 's'} need attention`);
  }

  // Detail: what's pending
  if (enPending.length > 0) {
    console.log('\nENGLISH DRAFTS — pending promotion');
    for (const id of enPending) console.log(`    drafts/${id}.md`);
  }
  if (zhPending.length > 0) {
    console.log('\nCHINESE DRAFTS — pending promotion');
    for (const id of zhPending) console.log(`    drafts/zh/${id}.md`);
  }
  if (enrichedPending.length > 0) {
    console.log('\nENRICHED DRAFTS — pending promotion');
    for (const id of enrichedPending) console.log(`    drafts/enriched/${id}.md`);
  }
  if (enStale.length + zhStale.length + enrichedStale.length > 0) {
    const totalStale = enStale.length + zhStale.length + enrichedStale.length;
    console.log(`\nSTALE DRAFTS — ${totalStale} already promoted, safe to delete`);
    for (const id of enStale)       console.log(`    drafts/${id}.md`);
    for (const id of zhStale)       console.log(`    drafts/zh/${id}.md`);
    for (const id of enrichedStale) console.log(`    drafts/enriched/${id}.md`);
  }

  console.log('');
}

main();
