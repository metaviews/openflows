// Promote — full pipeline for a single currency entry
//
// Usage: node scripts/promote.js --id {currencyId}
//
// Steps:
//   1. Find draft in drafts/ locally, or fetch it from an open PR branch
//   2. Move to src/currency/{type}/{id}.md
//   3. Rebuild manifest (translate needs it)
//   4. Translate to Chinese if not already done
//   5. Move zh draft to src/currency/zh/{type}/{id}.md
//   6. Run audit on the entry and report

const { readFileSync, writeFileSync, existsSync, mkdirSync, unlinkSync } = require('fs');
const { join, dirname } = require('path');
const { execSync } = require('child_process');

const args = process.argv.slice(2);
const idIndex = args.indexOf('--id');
const idArg = idIndex !== -1 ? args[idIndex + 1] : null;

if (!idArg) {
  console.error('Usage: node scripts/promote.js --id {currencyId}');
  process.exit(1);
}

const ROOT = join(__dirname, '..');
const DRAFTS_DIR = join(ROOT, 'drafts');
const ZH_DRAFTS_DIR = join(ROOT, 'drafts', 'zh');

function normalize(content) {
  return content.replace(/\r\n/g, '\n');
}

function parseFrontmatter(content) {
  content = normalize(content);
  const match = content.match(/^---\n([\s\S]+?)\n---/);
  if (!match) return {};
  const fm = {};
  for (const line of match[1].split('\n')) {
    const eq = line.indexOf(':');
    if (eq === -1) continue;
    const key = line.slice(0, eq).trim();
    if (!key || key.startsWith('-') || key.startsWith(' ')) continue;
    fm[key] = line.slice(eq + 1).trim().replace(/^["']|["']$/g, '');
  }
  return fm;
}

function typeToPath(currencyType) {
  if (currencyType === 'current') return 'currents';
  if (currencyType === 'circuit') return 'circuits';
  if (currencyType === 'practitioner') return 'practitioners';
  return currencyType + 's';
}

function run(cmd, label) {
  process.stdout.write(`  ${label}... `);
  try {
    execSync(cmd, { cwd: ROOT, stdio: 'pipe' });
    console.log('done');
  } catch (err) {
    console.log('failed');
    const out = (err.stdout || '').toString().trim();
    const errOut = (err.stderr || '').toString().trim();
    if (out) console.error(out);
    if (errOut) console.error(errOut);
    throw err;
  }
}

function fetchFromPR(id) {
  console.log('  Draft not found locally — searching open PR branches...');
  let prs;
  try {
    prs = JSON.parse(execSync('gh pr list --state open --json number,headRefName --limit 20', { cwd: ROOT, encoding: 'utf8' }));
  } catch {
    console.error('  Could not list PRs. Is gh authenticated?');
    return null;
  }

  for (const pr of prs) {
    try {
      const raw = execSync(
        `gh api "repos/:owner/:repo/contents/drafts/${id}.md?ref=${pr.headRefName}" --jq ".content"`,
        { cwd: ROOT, encoding: 'utf8' }
      ).trim();
      if (raw) {
        const content = Buffer.from(raw, 'base64').toString('utf8');
        console.log(`  Found in PR #${pr.number} (${pr.headRefName})`);
        return content;
      }
    } catch { /* not in this branch */ }
  }
  return null;
}

async function main() {
  console.log(`\nPromote: ${idArg}\n`);

  // 1. Find draft
  const draftPath = join(DRAFTS_DIR, `${idArg}.md`);
  let content;

  if (existsSync(draftPath)) {
    console.log(`  Draft found: drafts/${idArg}.md`);
    content = readFileSync(draftPath, 'utf8');
  } else {
    content = fetchFromPR(idArg);
    if (!content) {
      console.error(`\nNo draft found for "${idArg}" locally or in open PR branches.`);
      process.exit(1);
    }
    writeFileSync(draftPath, normalize(content));
    console.log(`  Written to drafts/${idArg}.md`);
  }

  content = normalize(content);

  // 2. Parse type
  const fm = parseFrontmatter(content);
  if (!fm.currencyType) {
    console.error('\nCould not parse currencyType from draft frontmatter.');
    process.exit(1);
  }
  const typePath = typeToPath(fm.currencyType);

  // 3. Move English entry to src/
  const enDestDir = join(ROOT, 'src', 'currency', typePath);
  const enDestPath = join(enDestDir, `${idArg}.md`);

  if (existsSync(enDestPath)) {
    console.log(`  src/currency/${typePath}/${idArg}.md already exists — skipping move`);
  } else {
    mkdirSync(enDestDir, { recursive: true });
    writeFileSync(enDestPath, content);
    unlinkSync(draftPath);
    console.log(`  Moved: drafts/${idArg}.md → src/currency/${typePath}/${idArg}.md`);
  }

  // 4. Rebuild manifest (translate reads from it)
  console.log('');
  run('npm run build', 'Rebuild manifest');

  // 5. Translate if needed
  const zhDraftPath = join(ZH_DRAFTS_DIR, `${idArg}.md`);
  const zhDestDir = join(ROOT, 'src', 'currency', 'zh', typePath);
  const zhDestPath = join(zhDestDir, `${idArg}.md`);

  if (existsSync(zhDestPath)) {
    console.log('  Chinese entry already in src/ — skipping translation');
  } else {
    if (!existsSync(zhDraftPath)) {
      run(`node scripts/translate.js --id ${idArg}`, 'Translate to Chinese');
    } else {
      console.log(`  Chinese draft found: drafts/zh/${idArg}.md`);
    }

    if (!existsSync(zhDraftPath)) {
      console.error('\nTranslation did not produce a draft. Check translate.js output above.');
      process.exit(1);
    }

    const zhContent = normalize(readFileSync(zhDraftPath, 'utf8'));
    mkdirSync(zhDestDir, { recursive: true });
    writeFileSync(zhDestPath, zhContent);
    unlinkSync(zhDraftPath);
    console.log(`  Moved: drafts/zh/${idArg}.md → src/currency/zh/${typePath}/${idArg}.md`);
  }

  // 6. Audit
  console.log('');
  try {
    const result = execSync(`node scripts/audit.js --id ${idArg}`, { cwd: ROOT, encoding: 'utf8' });
    process.stdout.write(result);
  } catch (err) {
    process.stdout.write((err.stdout || '').toString());
  }

  console.log(`\nDone. Ready to commit:\n  src/currency/${typePath}/${idArg}.md\n  src/currency/zh/${typePath}/${idArg}.md`);
}

main().catch(err => {
  console.error('\nFatal:', err.message);
  process.exit(1);
});
