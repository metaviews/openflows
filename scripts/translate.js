// Cycle 5: Translation — Peng as Translator
//
// Produces Chinese drafts of Openflows currency entries and blog posts for human review.
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
//   node scripts/translate.js --type blog            # translate all blog posts
//   node scripts/translate.js --limit 5              # batch limit
//   node scripts/translate.js --force                # re-translate already-drafted entries

const { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync, statSync } = require('fs');
const { basename, join } = require('path');
const { parseFrontmatter } = require('../server/lib/parse');
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
const zhBlogDraftsDir = join(zhDraftsDir, 'blog');
const zhSrcBase = join(__dirname, '..', 'src', 'currency', 'zh');
const zhBlogSrcDir = join(__dirname, '..', 'src', 'blog', 'zh');
const blogSrcDir = join(__dirname, '..', 'src', 'blog');

function getTranslatedIds() {
  const ids = new Set();
  // Check drafts/zh/ (flat)
  if (existsSync(zhDraftsDir)) {
    for (const f of readdirSync(zhDraftsDir)) {
      if (f.endsWith('.md')) ids.add(f.replace(/\.md$/, ''));
    }
  }
  // Check src/currency/zh/{currents,circuits,practitioners}/ (one level deep)
  if (existsSync(zhSrcBase)) {
    for (const sub of readdirSync(zhSrcBase)) {
      const subDir = join(zhSrcBase, sub);
      try {
        for (const f of readdirSync(subDir)) {
          if (f.endsWith('.md')) ids.add(f.replace(/\.md$/, ''));
        }
      } catch { /* not a directory */ }
    }
  }
  return ids;
}

function getTranslatedBlogIds() {
  const ids = new Set();
  for (const dir of [zhBlogDraftsDir, zhBlogSrcDir]) {
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
- Field Notes — 田野札记 (tián yě zhá jì): Openflows' longform blog/essay section; keep "Field Notes" alongside Chinese on first use
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

function getBlogPosts() {
  if (!existsSync(blogSrcDir)) return [];
  return readdirSync(blogSrcDir)
    .filter(name => name.endsWith('.md'))
    .map(name => {
      const filePath = join(blogSrcDir, name);
      try {
        if (!statSync(filePath).isFile()) return null;
      } catch {
        return null;
      }
      const content = readFileSync(filePath, 'utf8');
      const { frontmatter, body } = parseFrontmatter(content);
      const blogId = frontmatter.blogId || basename(name, '.md');
      return {
        kind: 'blog',
        id: blogId,
        blogId,
        title: frontmatter.title || blogId,
        date: frontmatter.date ? String(frontmatter.date).slice(0, 10) : '',
        abstract: frontmatter.abstract || '',
        topics: Array.isArray(frontmatter.topics) ? frontmatter.topics : [],
        linkedEntries: Array.isArray(frontmatter.linkedEntries) ? frontmatter.linkedEntries : [],
        heroImage: frontmatter.heroImage || '',
        heroImageAlt: frontmatter.heroImageAlt || '',
        heroImageCaption: frontmatter.heroImageCaption || '',
        imagePrompt: frontmatter.imagePrompt || '',
        imageTooling: frontmatter.imageTooling || '',
        humanEditor: frontmatter.humanEditor || '',
        mediation: frontmatter.mediation || null,
        body: String(body || '').trim(),
      };
    })
    .filter(Boolean);
}

async function translateBlogPost(post) {
  const topicsYaml = post.topics.length
    ? 'topics:\n' + post.topics.map(topic => `  - ${topic}`).join('\n')
    : 'topics: []';
  const linkedEntriesYaml = post.linkedEntries.length
    ? 'linkedEntries:\n' + post.linkedEntries.map(id => `  - ${id}`).join('\n')
    : 'linkedEntries: []';
  const captionLine = post.heroImageCaption ? 'heroImageCaption: "[Chinese translation of heroImageCaption]"\n' : '';
  const imagePromptLine = post.imagePrompt ? `imagePrompt: "${escapeForPrompt(post.imagePrompt)}"\n` : '';
  const imageToolingLine = post.imageTooling ? `imageTooling: "${escapeForPrompt(post.imageTooling)}"\n` : '';
  const humanEditorLine = post.humanEditor ? `humanEditor: ${post.humanEditor}\n` : '';

  const prompt = `You are Peng (鵬), the Openflows translation agent. Your task is to translate an Openflows Field Notes blog post from English into Simplified Chinese (简体中文).

This is not mechanical translation. You are a practitioner of transliteration — holding terms in both languages, following the natural grain (理, lǐ) of the material rather than forcing equivalence. Where the Chinese reveals something the English leaves implicit, note it. Where an English term should be kept alongside the Chinese, keep it.

${GLOSSARY}

STYLE GUIDE:
- Write in clear, fluent Simplified Chinese
- Maintain the same tone as the English: technical, civic, dense and purposeful; no hype
- Preserve markdown headings, paragraph breaks, lists, inline code, links, and referenced currencyIds
- Translate title, abstract, heroImageAlt, heroImageCaption if present, and the body
- Keep blogId, topics, linkedEntries, heroImage, imagePrompt, imageTooling, and humanEditor values unchanged unless explicitly marked for translation
- Write mediation block values in Chinese
- If any Chinese term illuminates something the English does not capture, add a brief note at the end of the body under the heading: **译注** (Translator's Note)

REQUIRED OUTPUT — a complete markdown file:

---
layout: layouts/blog-item.njk
title: "[Chinese translation of title]"
lang: zh
date: ${post.date}
permalink: /zh/blog/${post.blogId}/
blogId: ${post.blogId}
abstract: "[Chinese translation of abstract]"
${topicsYaml}
${linkedEntriesYaml}
heroImage: ${post.heroImage}
heroImageAlt: "[Chinese translation of heroImageAlt]"
${captionLine}${imagePromptLine}${imageToolingLine}${humanEditorLine}mediation:
  tooling: "OpenRouter / ${or.primaryModel}"
  use:
    - "翻译原始英文 Field Notes 文章"
    - "依照音译词汇表保留双语术语"
  humanRole: "审阅、修订并在发布前确认"
  limits: "翻译为起点；语言能力和文化判断须由人工完成"
---

[Chinese body here]

---

Output ONLY the complete markdown file — frontmatter and body, nothing else. No explanation, no preamble.

BLOG POST TO TRANSLATE:

Title: ${post.title}
Abstract: ${post.abstract || '(none)'}
Topics: ${post.topics.join(', ') || '(none)'}
Linked entries: ${post.linkedEntries.join(', ') || '(none)'}
Hero image alt: ${post.heroImageAlt || '(none)'}
Hero image caption: ${post.heroImageCaption || '(none)'}

Body:
${post.body}`;

  return await or.ask(prompt);
}

function escapeForPrompt(value) {
  return String(value || '').replace(/\\/g, '\\\\').replace(/"/g, '\\"');
}

function writeDraft(currencyId, markdown) {
  if (!existsSync(zhDraftsDir)) mkdirSync(zhDraftsDir, { recursive: true });
  const outPath = join(zhDraftsDir, `${currencyId}.md`);
  writeFileSync(outPath, markdown.replace(/\r\n/g, '\n'));
  return outPath;
}

function writeBlogDraft(blogId, markdown) {
  if (!existsSync(zhBlogDraftsDir)) mkdirSync(zhBlogDraftsDir, { recursive: true });
  const outPath = join(zhBlogDraftsDir, `${blogId}.md`);
  writeFileSync(outPath, markdown.replace(/\r\n/g, '\n'));
  return outPath;
}

async function main() {
  console.log(`\nOpenflows Translation — Peng as Translator`);
  console.log(`Model: ${or.primaryModel}`);
  const blogPosts = getBlogPosts();
  console.log(`Knowledge base: ${manifest.count} entries`);
  console.log(`Blog posts: ${blogPosts.length}\n`);

  // Select entries to translate — always start from English-only entries
  let currencyCandidates = manifest.entries.filter(e => e.lang !== 'zh').map(entry => ({ kind: 'currency', ...entry }));
  let blogCandidates = blogPosts;

  if (idArg) {
    currencyCandidates = currencyCandidates.filter(e => e.currencyId === idArg);
    blogCandidates = blogCandidates.filter(e => e.blogId === idArg);
    if (currencyCandidates.length === 0 && blogCandidates.length === 0) {
      console.error(`No currency entry or blog post found with id: ${idArg}`);
      process.exit(1);
    }
  } else if (typeArg) {
    const typeMap = { current: 'current', currents: 'current', circuit: 'circuit', circuits: 'circuit', practitioner: 'practitioner', practitioners: 'practitioner', blog: 'blog', blogs: 'blog', post: 'blog', posts: 'blog' };
    const normalizedType = typeMap[typeArg];
    if (!normalizedType) {
      console.error(`Unknown type: ${typeArg}. Use: current, circuit, practitioner, blog`);
      process.exit(1);
    }
    if (normalizedType === 'blog') {
      currencyCandidates = [];
    } else {
      currencyCandidates = currencyCandidates.filter(e => e.currencyType === normalizedType);
      blogCandidates = [];
    }
  }

  // Filter out already-translated unless --force
  if (!forceFlag) {
    const translatedIds = getTranslatedIds();
    const translatedBlogIds = getTranslatedBlogIds();
    const before = currencyCandidates.length + blogCandidates.length;
    currencyCandidates = currencyCandidates.filter(e => !translatedIds.has(e.currencyId));
    blogCandidates = blogCandidates.filter(e => !translatedBlogIds.has(e.blogId));
    const skipped = before - currencyCandidates.length - blogCandidates.length;
    if (skipped > 0) {
      console.log(`Skipping ${skipped} already-translated entries (use --force to re-translate)\n`);
    }
  }

  const candidates = [...currencyCandidates, ...blogCandidates];
  if (candidates.length === 0) {
    console.log('Nothing to translate. All selected entries already have drafts.');
    return;
  }

  // Apply limit
  const toTranslate = candidates.slice(0, limit);
  console.log(`Translating ${toTranslate.length} entr${toTranslate.length === 1 ? 'y' : 'ies'}...\n`);

  let successCount = 0;
  for (const entry of toTranslate) {
    const label = entry.kind === 'blog' ? 'blog' : entry.currencyType;
    const id = entry.kind === 'blog' ? entry.blogId : entry.currencyId;
    process.stdout.write(`  [${label}] ${entry.title} (${id})... `);
    try {
      const markdown = entry.kind === 'blog'
        ? await translateBlogPost(entry)
        : await translateEntry(entry);
      const outPath = entry.kind === 'blog'
        ? writeBlogDraft(entry.blogId, markdown)
        : writeDraft(entry.currencyId, markdown);
      console.log(`done → ${outPath.replace(join(__dirname, '..') + '/', '')}`);
      successCount++;
    } catch (err) {
      console.log(`FAILED: ${err.message}`);
    }
  }

  console.log(`\nTranslation complete: ${successCount}/${toTranslate.length} entries drafted to drafts/zh/`);
  console.log('Review currency drafts, then move approved files to src/currency/zh/{type}/');
  console.log('Review blog drafts, then move approved files from drafts/zh/blog/ to src/blog/zh/');
  if (toTranslate.length < candidates.length) {
    console.log(`(${candidates.length - toTranslate.length} more entries remain — run again or increase --limit)`);
  }
}

main().catch(err => {
  console.error('Fatal:', err.message);
  process.exit(1);
});
