// Cycle 5: Translation — Peng as Translator
//
// Produces Chinese drafts of Openflows currency entries for human review.
// Follows a transliteration model: terms are held in both languages without
// claiming semantic equivalence. Where Chinese illuminates something the
// English does not, the script flags it as a note for the human reviewer.
//
// Usage:
//   node scripts/translate.js                        # translate all untranslated entries
//   node scripts/translate.js --id ollama            # translate a specific entry
//   node scripts/translate.js --type current         # translate all currents
//   node scripts/translate.js --type circuit         # translate all circuits
//   node scripts/translate.js --type practitioner    # translate all practitioners
//   node scripts/translate.js --limit 5              # batch limit
//   node scripts/translate.js --force                # re-translate already-drafted entries

const { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync } = require('fs');
const { join } = require('path');
const { loadEnv, createClient, getArg, hasFlag } = require('./lib/openrouter');

loadEnv();

const or = createClient({ title: 'Openflows Translation Agent - Peng' });

// Parse args
const args = process.argv.slice(2);

const idArg = getArg(args, 'id');
const typeArg = getArg(args, 'type');
const limitArg = getArg(args, 'limit');
const forceFlag = hasFlag(args, 'force');
const limit = limitArg ? parseInt(limitArg, 10) : Infinity;

// Load manifest
const manifestPath = join(__dirname, '..', '_site', 'knowledge-manifest.json');
let manifest;
try {
  manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
} catch {
  console.error('Manifest not found. Run `npm run build` first.');
  process.exit(1);
}

// Find already-translated entries
const zhDraftsDir = join(__dirname, '..', 'drafts', 'zh');
const zhSrcDirs = [
  join(__dirname, '..', 'src', 'currency', 'zh'),
];

function getTranslatedIds() {
  const ids = new Set();
  const dirs = [zhDraftsDir, ...zhSrcDirs];
  for (const dir of dirs) {
    if (!existsSync(dir)) continue;
    for (const f of readdirSync(dir)) {
      if (f.endsWith('.md')) ids.add(f.replace(/\.md$/, ''));
    }
  }
  return ids;
}

// Transliteration glossary — the philosophical core of Peng's translation practice.
// Terms are held in both languages. The Chinese is not a replacement for the English;
// it is a companion that sometimes illuminates what the English leaves implicit.
const GLOSSARY = `
TRANSLITERATION GLOSSARY (hold both languages; do not collapse one into the other):

- Openflows — Openflows（开流）: keep the brand name "Openflows" in English; 开流 (kāi liú, "open flow") may appear in parentheses on first use
- Currency — 流通 (liú tōng): the living layer of what circulates; captures both financial and fluid senses
- Current(s) — 流 (liú): flow, current, movement; individual signals moving through the ecosystem
- Circuit(s) — 回路 (huí lù): returning path, closed loop; a pattern that has completed and stabilized
- Practitioner(s) — 修行者 (xiū xíng zhě): those who cultivate through practice; carries depth the English "practitioner" does not
- Peng — 鵬 (péng): the vast bird of Zhuangzi's Inner Chapters; do not translate
- Wu wei — 無為 (wú wéi): effortless action, acting with the grain of things; do not translate
- Li — 理 (lǐ): natural grain, the pattern inherent in things; do not translate
- Zhuangzi — 莊子: do not translate; the philosopher and text
- Cook Ding — 庖丁: do not translate; the master in Zhuangzi's parable of the ox
- Kun — 鯤 (kūn): the fish-that-becomes-Peng; do not translate
- Open source — 开源 (kāi yuán): lit. "open source"; standard term in Chinese tech discourse
- Knowledge base — 知识库 (zhī shì kù)
- Model — 模型 (mó xíng): AI model; standard term
- Agent — 智能体 (zhì néng tǐ): intelligent entity; the preferred Chinese term for AI agent
- Inference — 推理 (tuī lǐ): reasoning/inference; shares the character 理 with li (natural grain)
- Open weights — 开放权重 (kāi fàng quán zhòng): open model weights
`.trim();


function typeToPath(currencyType) {
  if (currencyType === 'current') return 'currents';
  if (currencyType === 'circuit') return 'circuits';
  if (currencyType === 'practitioner') return 'practitioners';
  return currencyType;
}

async function translateEntry(entry) {
  const stripHtml = s => s ? s.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim() : '';
  const body = stripHtml(entry.body);
  const typePath = typeToPath(entry.currencyType);

  // Build links block for frontmatter
  const linksYaml = (entry.links && entry.links.length > 0)
    ? 'links:\n' + entry.links.map(l => `  - id: ${l.id}\n    relation: "${l.relation}"`).join('\n')
    : '';

  const prompt = `You are Peng (鵬), the Openflows translation agent, named from Zhuangzi's Inner Chapters. Your task is to translate an Openflows knowledge base entry from English into Simplified Chinese (简体中文).

This is not mechanical translation. You are a practitioner of transliteration — holding terms in both languages, following the natural grain (理, lǐ) of the material rather than forcing equivalence. Where the Chinese reveals something the English leaves implicit, note it. Where an English term should be kept alongside the Chinese, keep it.

${GLOSSARY}

STYLE GUIDE:
- Write in clear, fluent Simplified Chinese
- Maintain the same tone as the English: technical, civic, dense and purposeful; no hype
- Preserve the structure and paragraph breaks of the original body
- For Circuit entries: preserve the flowing narrative style; end with the Chinese equivalent of "The circuit is complete when..." — 回路在此刻闭合：...
- For frontmatter: translate only the title and abstract fields; keep all other field names in English
- Write the mediation block values in Chinese
- If any Chinese term illuminates something the English does not capture, add a brief note at the end of the body under the heading: **译注** (Translator's Note)

REQUIRED OUTPUT — a complete markdown file:

---
layout: layouts/currency-item.njk
title: "[Chinese translation of title]"
lang: zh
date: ${entry.date ? entry.date.slice(0, 10) : ''}
currencyType: "${entry.currencyType}"
currencyId: ${entry.currencyId}
abstract: "[Chinese translation of abstract]"
tags:
  - currency
permalink: /zh/currency/${typePath}/${entry.currencyId}/
${linksYaml}
mediation:
  tooling: "OpenRouter / ${or.primaryModel}"
  use:
    - "翻译原始英文条目"
    - "依照音译词汇表保留双语术语"
  humanRole: "审阅、修订并在发布前确认"
  limits: "翻译为起点；语言能力和文化判断须由人工完成"
---

[Chinese body here]

---

Output ONLY the complete markdown file — frontmatter and body, nothing else. No explanation, no preamble.

ENTRY TO TRANSLATE:

Title: ${entry.title}
Type: ${entry.currencyType}
Abstract: ${entry.abstract || '(none)'}

Body:
${body}`;

  return await or.ask(prompt);
}

function writeDraft(currencyId, markdown) {
  if (!existsSync(zhDraftsDir)) mkdirSync(zhDraftsDir, { recursive: true });
  const outPath = join(zhDraftsDir, `${currencyId}.md`);
  writeFileSync(outPath, markdown);
  return outPath;
}

async function main() {
  console.log(`\nOpenflows Translation — Peng as Translator`);
  console.log(`Model: ${or.primaryModel}`);
  console.log(`Knowledge base: ${manifest.count} entries\n`);

  // Select entries to translate — always start from English-only entries
  let candidates = manifest.entries.filter(e => e.lang !== 'zh');

  if (idArg) {
    candidates = candidates.filter(e => e.currencyId === idArg);
    if (candidates.length === 0) {
      console.error(`No entry found with currencyId: ${idArg}`);
      process.exit(1);
    }
  } else if (typeArg) {
    const typeMap = { current: 'current', currents: 'current', circuit: 'circuit', circuits: 'circuit', practitioner: 'practitioner', practitioners: 'practitioner' };
    const normalizedType = typeMap[typeArg];
    if (!normalizedType) {
      console.error(`Unknown type: ${typeArg}. Use: current, circuit, practitioner`);
      process.exit(1);
    }
    candidates = candidates.filter(e => e.currencyType === normalizedType);
  }

  // Filter out already-translated unless --force
  if (!forceFlag) {
    const translatedIds = getTranslatedIds();
    const before = candidates.length;
    candidates = candidates.filter(e => !translatedIds.has(e.currencyId));
    const skipped = before - candidates.length;
    if (skipped > 0) {
      console.log(`Skipping ${skipped} already-translated entries (use --force to re-translate)\n`);
    }
  }

  if (candidates.length === 0) {
    console.log('Nothing to translate. All selected entries already have drafts.');
    return;
  }

  // Apply limit
  const toTranslate = candidates.slice(0, limit);
  console.log(`Translating ${toTranslate.length} entr${toTranslate.length === 1 ? 'y' : 'ies'}...\n`);

  let successCount = 0;
  for (const entry of toTranslate) {
    process.stdout.write(`  [${entry.currencyType}] ${entry.title} (${entry.currencyId})... `);
    try {
      const markdown = await translateEntry(entry);
      const outPath = writeDraft(entry.currencyId, markdown);
      console.log(`done → ${outPath.replace(join(__dirname, '..') + '/', '')}`);
      successCount++;
    } catch (err) {
      console.log(`FAILED: ${err.message}`);
    }
  }

  console.log(`\nTranslation complete: ${successCount}/${toTranslate.length} entries drafted to drafts/zh/`);
  console.log('Review each draft, then move approved files to src/currency/zh/{type}/');
  if (toTranslate.length < candidates.length) {
    console.log(`(${candidates.length - toTranslate.length} more entries remain — run again or increase --limit)`);
  }
}

main().catch(err => {
  console.error('Fatal:', err.message);
  process.exit(1);
});
