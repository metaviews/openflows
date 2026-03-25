// Cycle 10 addition: Practitioner Scanner
//
// Peng scans for practitioner candidates using Brave search.
// Candidates are drafted to drafts/practitioners/ for human review.
// Nothing enters src/currency/practitioners/ automatically.
// Humans select, edit, and promote entries.
//
// Usage:
//   node scripts/practitioners.js
//   node scripts/practitioners.js --limit 5

'use strict';

const { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync } = require('fs');
const { join } = require('path');
const or = require('./lib/openrouter');
or.loadEnv();

const BRAVE_API_KEY = process.env.BRAVE_API_KEY;
const SCREEN_MODEL = process.env.SCREEN_MODEL || null; // null = use primary model

const args = process.argv.slice(2);
const limit = parseInt(args.find(a => a.startsWith('--limit='))?.split('=')[1] || args[args.indexOf('--limit') + 1]) || 5;

const root = join(__dirname, '..');
const manifestPath = join(root, '_site', 'knowledge-manifest.json');
const draftsDir = join(root, 'drafts', 'practitioners');
const srcDir = join(root, 'src', 'currency', 'practitioners');
const today = new Date().toISOString().slice(0, 10);

// --- Brave queries targeting practitioners ---
const QUERIES = [
  'notable open source AI researcher creator framework 2026',
  'open source AI tool creator significant contributor',
  'AI safety researcher open source model developer',
  '开源AI研究员 重要贡献者 创始人 2026',
  'open source LLM developer researcher influential',
];

const BRAVE_COUNT = 5;

// --- Load existing practitioners to deduplicate ---
function loadExistingPractitioners() {
  const names = new Set();

  // From src/
  if (existsSync(srcDir)) {
    for (const f of readdirSync(srcDir).filter(f => f.endsWith('.md'))) {
      try {
        const raw = readFileSync(join(srcDir, f), 'utf8');
        const title = raw.match(/^title:\s*["']?(.+?)["']?\s*$/m)?.[1]?.toLowerCase();
        if (title) names.add(title);
        const id = f.replace('.md', '');
        names.add(id);
      } catch {}
    }
  }

  // From drafts/practitioners/
  if (existsSync(draftsDir)) {
    for (const f of readdirSync(draftsDir).filter(f => f.endsWith('.md'))) {
      const id = f.replace('.md', '');
      names.add(id);
    }
  }

  return names;
}

// --- Load knowledge base context ---
function loadManifestContext() {
  if (!existsSync(manifestPath)) return '';
  try {
    const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
    return manifest.entries
      .filter(e => e.lang !== 'zh')
      .map(e => `[${e.currencyType.toUpperCase()}] ${e.title} (${e.currencyId})${e.abstract ? ': ' + e.abstract : ''}`)
      .join('\n');
  } catch { return ''; }
}

// --- Brave search ---
async function searchBrave(query) {
  if (!BRAVE_API_KEY) return [];
  const url = `https://api.search.brave.com/res/v1/web/search?q=${encodeURIComponent(query)}&count=${BRAVE_COUNT}&freshness=py`;
  try {
    const res = await globalThis.fetch(url, {
      headers: { 'X-Subscription-Token': BRAVE_API_KEY, 'Accept': 'application/json' },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return (data.web?.results || []).map(r => ({
      title: r.title,
      url: r.url,
      summary: r.description || '',
    }));
  } catch { return []; }
}

// --- Screen: is this result about a practitioner? ---
async function screenResult(result) {
  const prompt = `You are evaluating whether a search result is about a specific individual who has materially shaped the open source AI ecosystem.

Openflows documents exceptional practitioners: people who created major open-source AI tools or frameworks, published foundational research, shaped community practices around open AI development, or influenced governance of open AI systems. The focus is on durable, field-shaping impact — not general AI commentary or commercial work without open-source contribution.

Rate this result 1–5:
1 = Not a practitioner (company, product, event, generic article)
2 = Weak (person mentioned tangentially, no clear open-source AI contribution)
3 = Possible practitioner (individual with some open-source AI work)
4 = Likely practitioner (clear open-source AI contribution, durable impact)
5 = Strong practitioner candidate (created major tool/framework, foundational researcher, or key governance figure)

Return ONLY valid JSON: {"score": N, "name": "person's name or null", "reason": "brief explanation"}

Search result:
Title: ${result.title}
URL: ${result.url}
Summary: ${result.summary}`;

  const content = await or.ask(prompt, { model: SCREEN_MODEL });
  try {
    const match = content.match(/\{[\s\S]+?\}/);
    return JSON.parse(match ? match[0] : content);
  } catch {
    return { score: 2, name: null, reason: 'Could not parse screening response' };
  }
}

// --- Draft a practitioner entry ---
async function draftPractitioner(result, screening, manifestContext) {
  const prompt = `You are the Openflows intake agent. Draft a new practitioner entry for the Openflows knowledge base.

Practitioners are exceptional individuals whose practice materially shapes open source AI trajectories. They are selected for durable field-shaping impact, not routine contribution. Be specific and technically grounded. Avoid hype.

Output ONLY the complete markdown file — frontmatter and body, nothing else. No explanation before or after.

Required frontmatter schema:
---
layout: layouts/currency-item.njk
title: "{Full Name}"
date: ${today}
currencyType: "practitioner"
currencyId: (kebab-case of name, e.g. "harrison-chase")
abstract: "(one precise sentence — their specific contribution and its field-shaping consequence)"
tags:
  - currency
permalink: /currency/practitioners/{currencyId}/
links:
  - id: (existing currencyId from knowledge base)
    relation: "(specific relationship — what they created/shaped that connects to this entry)"
mediation:
  tooling: "OpenRouter / ${or.primaryModel}"
  use:
    - "drafted practitioner candidate from signal"
    - "assessed linkage against existing knowledge base"
  humanRole: "selection, editing, and promotion are fully human decisions"
  limits: "practitioner entries require editorial judgment; verify all claims before publishing"
---

Body sections in this order:
### Signal
### Context
### Relevance
### Current State
### Open Questions
### Connections

Signal section format:
- First line: [Name](profile_or_primary_URL) · Source · Date
- Then a concise paragraph identifying who they are and what they created

Rules:
- Only include links where the connection to an existing entry is genuine and specific
- Be concrete about what they built or contributed — avoid vague "influential" language
- Treat their work as infrastructure, not authority
- Note tensions and limitations in their legacy where they exist

EXISTING KNOWLEDGE BASE (for linkage evaluation):
${manifestContext}

CANDIDATE SIGNAL:
Name: ${screening.name || result.title}
URL: ${result.url}
Summary: ${result.summary}
Reason flagged: ${screening.reason}`;

  return or.ask(prompt);
}

function slugify(name) {
  return (name || 'practitioner')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function writeDraft(markdown, name) {
  if (!existsSync(draftsDir)) mkdirSync(draftsDir, { recursive: true });

  // Strip reasoning artifacts
  markdown = markdown.replace(/<think>[\s\S]*?<\/think>/g, '').replace(/<\/think>/g, '').trimStart();

  const idMatch = markdown.match(/currencyId:\s*(.+)/);
  const id = idMatch ? idMatch[1].trim().replace(/['"]/g, '') : slugify(name);
  const filename = `${id}.md`;
  writeFileSync(join(draftsDir, filename), markdown);
  return filename;
}

async function main() {
  console.log('\nOpenflows Practitioner Scanner');
  console.log(`Model: ${or.primaryModel} | Limit: ${limit}`);
  if (!BRAVE_API_KEY) {
    console.error('BRAVE_API_KEY not set — cannot scan.');
    process.exit(1);
  }

  const existing = loadExistingPractitioners();
  const manifestContext = loadManifestContext();

  console.log(`\nExisting practitioners: ${existing.size}`);
  console.log('Searching Brave...\n');

  // Collect results from all queries, deduplicate by URL
  const seen = new Map();
  for (const query of QUERIES) {
    process.stdout.write(`  "${query}"... `);
    const results = await searchBrave(query);
    console.log(`${results.length} results`);
    for (const r of results) {
      if (!seen.has(r.url)) seen.set(r.url, r);
    }
  }

  const allResults = [...seen.values()];
  console.log(`\n${allResults.length} unique results — screening...\n`);

  const candidates = [];
  for (const result of allResults) {
    try {
      const screening = await screenResult(result);
      const label = screening.score >= 4 ? '✓' : screening.score === 3 ? '~' : '✗';
      const nameStr = screening.name ? ` [${screening.name}]` : '';
      console.log(`  [${screening.score}/5] ${label}${nameStr} — ${result.title.slice(0, 60)}`);

      if (screening.score >= 4) {
        // Skip if already documented or already a draft candidate
        const slug = slugify(screening.name || result.title);
        if (existing.has(slug) || existing.has((screening.name || '').toLowerCase())) {
          console.log(`      → already documented, skipping`);
          continue;
        }
        candidates.push({ result, screening });
      }
    } catch (err) {
      console.log(`  screening error: ${err.message}`);
    }
  }

  console.log(`\n${candidates.length} candidates — drafting top ${Math.min(candidates.length, limit)}...\n`);

  const toDraft = candidates.slice(0, limit);
  const drafted = [];

  for (const { result, screening } of toDraft) {
    const name = screening.name || result.title;
    process.stdout.write(`  ${name} → `);
    try {
      const markdown = await draftPractitioner(result, screening, manifestContext);
      const filename = writeDraft(markdown, name);
      console.log(`drafts/practitioners/${filename}`);
      drafted.push(filename);
    } catch (err) {
      console.log(`failed: ${err.message}`);
    }
  }

  console.log(`\nPractitioner scan complete: ${drafted.length} candidate(s) drafted to drafts/practitioners/`);
  console.log('These are candidates only — human selection and editing required before promotion.');
}

main().catch(err => {
  console.error('Fatal:', err.message);
  process.exit(1);
});
