// Cycle 3: Intake — Signal Monitoring
// Usage: node scripts/intake.js [--sources github,huggingface,brave,twitter] [--limit 5]
//
// Fetches signals from configured sources, deduplicates against the knowledge base
// and a persistent seen-URLs log, runs a relevance screening pass, then drafts
// new currency entries into drafts/ for human review.
// Nothing enters src/ without explicit human approval.

const { readFileSync, writeFileSync, mkdirSync, existsSync } = require('fs');
const { join } = require('path');
const config = require('./intake.config');
const { loadEnv, createClient, getArg } = require('./lib/openrouter');

loadEnv();

const or = createClient({ title: 'Openflows Intake Agent' });

// Parse args
const args = process.argv.slice(2);

const enabledSources = (getArg(args, 'sources') || 'github,huggingface').split(',');
const limit = parseInt(getArg(args, 'limit') || '5', 10);

const SCREEN_MODEL = config.screening.model || or.primaryModel;
const SCREEN_THRESHOLD = config.screening.threshold ?? 3;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const BRAVE_API_KEY = process.env.BRAVE_API_KEY;
const TWITTER_BEARER_TOKEN = process.env.TWITTER_BEARER_TOKEN;

// Load manifest — run `npm run build` first
const manifestPath = join(__dirname, '..', '_site', 'knowledge-manifest.json');
let manifest;
try {
  manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
} catch {
  console.error('Manifest not found. Run `npm run build` first.');
  process.exit(1);
}

// Persistent seen-URLs log — the agent's memory across runs
const seenPath = join(__dirname, '..', 'drafts', 'seen.json');

function loadSeen() {
  try {
    return JSON.parse(readFileSync(seenPath, 'utf8'));
  } catch {
    return { lastUpdated: null, seen: {} };
  }
}

function saveSeen(seenData) {
  const draftsDir = join(__dirname, '..', 'drafts');
  if (!existsSync(draftsDir)) mkdirSync(draftsDir);
  seenData.lastUpdated = new Date().toISOString();
  writeFileSync(seenPath, JSON.stringify(seenData, null, 2));
}

// Deduplication against manifest (catches manually-added entries)
const existingPermalinks = new Set(manifest.entries.map(e => e.permalink).filter(Boolean));
const existingTitles = new Set(manifest.entries.map(e => e.title.toLowerCase()));

function isInManifest(signal) {
  const sigUrl = signal.url.toLowerCase();
  for (const p of existingPermalinks) {
    if (sigUrl.includes(p) || p.includes(sigUrl)) return true;
  }
  const sigTitle = signal.title.toLowerCase();
  for (const t of existingTitles) {
    if (t === sigTitle) return true;
    if (sigTitle.length > 10 && t.includes(sigTitle)) return true;
  }
  return false;
}

// Compact manifest context for prompts
const manifestContext = manifest.entries
  .map(e => `[${e.currencyType.toUpperCase()}] ${e.title} (${e.currencyId})${e.abstract ? ': ' + e.abstract : ''}`)
  .join('\n');

const today = new Date().toISOString().slice(0, 10);

// --- Screening pass ---
// Evaluates relevance before spending tokens on a full draft.
// Returns { score: 1–5, reason: string }

async function screenSignal(signal) {
  const prompt = `You are evaluating whether a signal is relevant to the Openflows knowledge base.

Openflows documents the open source AI ecosystem: tools, frameworks, models, governance, and key figures. It focuses on things that are operationally specific, inspectable, and publicly accessible. It avoids hype, closed systems, and trend-chasing.

Rate this signal's relevance on a scale of 1–5:
1 = Not relevant (unrelated, primarily closed-source, or purely commercial)
2 = Weak (tangentially related, unlikely to add value)
3 = Relevant (fits Openflows scope, worth documenting)
4 = Strong (clear operational specifics, likely linkage to existing knowledge base)
5 = High priority (directly advances open source AI ecosystem understanding)

Return ONLY valid JSON: {"score": N, "reason": "brief explanation"}

Signal:
Source: ${signal.source}
Title: ${signal.title}
Summary: ${signal.summary}`;

  const content = await or.ask(prompt, { model: SCREEN_MODEL });

  try {
    const jsonMatch = content.match(/\{[^}]+\}/s);
    return JSON.parse(jsonMatch ? jsonMatch[0] : content);
  } catch {
    // Fail open — if we can't parse the response, let it through
    return { score: 3, reason: 'Could not parse screening response — defaulting to pass' };
  }
}

// --- Draft generation ---

function buildDraftPrompt(signal) {
  const content = signal.enriched
    ? `${signal.summary}\n\n--- Additional content (first 2000 chars) ---\n${signal.enriched}`
    : signal.summary;

  return `You are the Openflows intake agent. Draft a new currency entry for the Openflows knowledge base.

Output ONLY the complete markdown file — frontmatter and body, nothing else. No explanation before or after.

Required frontmatter schema:
---
layout: layouts/currency-item.njk
title: ""
date: ${today}
currencyType: "current"
currencyId: (kebab-case, unique, derived from title — not the org/repo path)
abstract: "(one precise sentence — technical, specific, non-hyperbolic)"
tags:
  - currency
permalink: /currency/currents/{currencyId}/
links:
  - id: (existing currencyId from knowledge base)
    relation: "(specific relationship description)"
mediation:
  tooling: "OpenRouter / ${or.primaryModel}"
  use:
    - "drafted entry from external signal"
    - "assessed linkage against existing knowledge base"
  humanRole: "review, edit, and approve before publication"
  limits: "signal content may be incomplete; verify primary sources before publishing"
---

Body sections in this order:
### Signal
### Context
### Relevance
### Current State
### Open Questions
### Connections

Rules:
- Only include links where the connection to an existing entry is genuine and specific
- If no strong links exist, omit the links field entirely
- Body should be dense and purposeful — avoid hype and marketing voice
- Treat AI as infrastructure, not authority

EXISTING KNOWLEDGE BASE (for linkage evaluation):
${manifestContext}

SIGNAL TO DRAFT:
Source: ${signal.source}
Title: ${signal.title}
URL: ${signal.url}
Date: ${signal.date ? String(signal.date).slice(0, 10) : today}
Content: ${content}`;
}


function extractCurrencyId(markdown) {
  const match = markdown.match(/currencyId:\s*(.+)/);
  return match ? match[1].trim().replace(/['"]/g, '') : null;
}

function writeDraft(markdown, signal, index) {
  const draftsDir = join(__dirname, '..', 'drafts');
  if (!existsSync(draftsDir)) mkdirSync(draftsDir);

  const currencyId = extractCurrencyId(markdown);
  const filename = currencyId
    ? `${currencyId}.md`
    : `draft-${today}-${signal.source}-${index}.md`;

  writeFileSync(join(draftsDir, filename), markdown);
  return filename;
}

function getSourceToken(source) {
  if (source === 'github') return GITHUB_TOKEN;
  if (source === 'brave') return BRAVE_API_KEY;
  if (source === 'twitter') return TWITTER_BEARER_TOKEN;
  return undefined;
}

async function main() {
  console.log(`\nOpenflows Intake`);
  console.log(`Sources: ${enabledSources.join(', ')} | Limit: ${limit}`);
  console.log(`Draft model: ${or.primaryModel} | Screen model: ${SCREEN_MODEL} (threshold: ${SCREEN_THRESHOLD}/5)`);
  console.log(`Knowledge base: ${manifest.count} entries (built ${manifest.generated.slice(0, 10)})\n`);

  const seenData = loadSeen();
  const seenUrls = new Set(Object.keys(seenData.seen));

  // Collect signals
  let allSignals = [];
  for (const source of enabledSources) {
    try {
      const mod = require(`./sources/${source}`);
      process.stdout.write(`Fetching ${source}... `);
      const signals = await mod.fetch(getSourceToken(source));
      console.log(`${signals.length} signals`);
      allSignals.push(...signals);
    } catch (err) {
      console.log(`failed: ${err.message}`);
    }
  }

  // Deduplicate: skip anything already seen or already in manifest
  const novel = allSignals
    .filter(s => !seenUrls.has(s.url) && !isInManifest(s))
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  console.log(`\n${allSignals.length} signals → ${novel.length} novel (not in knowledge base or seen log)`);

  if (novel.length === 0) {
    console.log('Nothing new to process.');
    saveSeen(seenData);
    return;
  }

  // Screen more than the limit so we have options after filtering
  const toScreen = novel.slice(0, limit * 3);
  console.log(`\nScreening ${toScreen.length} candidates (threshold: ${SCREEN_THRESHOLD}/5)...\n`);

  const passed = [];
  for (const signal of toScreen) {
    try {
      const result = await screenSignal(signal);
      const label = result.score >= SCREEN_THRESHOLD ? '✓' : '✗';
      console.log(`  [${result.score}/5] ${label} ${signal.title}`);
      console.log(`      ${result.reason}`);

      if (result.score >= SCREEN_THRESHOLD) {
        passed.push(signal);
      } else {
        // Log as skipped so we don't re-evaluate on future runs
        seenData.seen[signal.url] = {
          date: today,
          decision: 'skipped',
          title: signal.title,
          source: signal.source,
          score: result.score,
          reason: result.reason,
        };
      }
    } catch (err) {
      console.warn(`  Screening error for "${signal.title}": ${err.message} — skipping`);
      seenData.seen[signal.url] = {
        date: today,
        decision: 'error',
        title: signal.title,
        source: signal.source,
        reason: err.message,
      };
    }
  }

  const candidates = passed.slice(0, limit);
  console.log(`\n${passed.length} passed screening → drafting ${candidates.length}\n`);

  // Draft entries
  const drafted = [];
  for (let i = 0; i < candidates.length; i++) {
    const signal = candidates[i];
    process.stdout.write(`[${i + 1}/${candidates.length}] ${signal.title} → `);

    try {
      const mod = require(`./sources/${signal.source}`);
      const enriched = await mod.enrich(signal, getSourceToken(signal.source));
      const markdown = await or.ask(buildDraftPrompt(enriched));
      const filename = writeDraft(markdown, signal, i);

      console.log(`drafts/${filename}`);
      drafted.push(filename);

      seenData.seen[signal.url] = {
        date: today,
        decision: 'drafted',
        title: signal.title,
        source: signal.source,
        file: filename,
      };
    } catch (err) {
      console.log(`failed: ${err.message}`);
      seenData.seen[signal.url] = {
        date: today,
        decision: 'error',
        title: signal.title,
        source: signal.source,
        reason: err.message,
      };
    }
  }

  saveSeen(seenData);

  console.log(`\n${drafted.length} draft(s) written to drafts/`);
  if (drafted.length > 0) {
    console.log('Review each file, edit as needed, then move to src/currency/currents/');
  }
}

main().catch(err => {
  console.error('Fatal:', err.message);
  process.exit(1);
});
