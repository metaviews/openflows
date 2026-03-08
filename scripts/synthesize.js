// Cycle 4: Synthesis — Circuit Drafting
//
// Analyzes the knowledge base and drafts a new Circuit connecting related Currents.
//
// Usage:
//   node scripts/synthesize.js                          # auto-detect best unaddressed pattern
//   node scripts/synthesize.js --topic "agentic memory" # guided by topic
//   node scripts/synthesize.js --topic "..." --currents id1,id2,id3  # with explicit currents

const { readFileSync, writeFileSync, mkdirSync, existsSync } = require('fs');
const { join } = require('path');
const { loadEnv, createClient, getArg } = require('./lib/openrouter');

loadEnv();

const or = createClient({ title: 'Openflows Synthesis Agent' });

// Parse args
const args = process.argv.slice(2);

const topicArg = getArg(args, 'topic');
const currentsArg = getArg(args, 'currents');
const explicitCurrents = currentsArg ? currentsArg.split(',').map(s => s.trim()) : null;

// Load manifest
const manifestPath = join(__dirname, '..', '_site', 'knowledge-manifest.json');
let manifest;
try {
  manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
} catch {
  console.error('Manifest not found. Run `npm run build` first.');
  process.exit(1);
}

// Synthesis operates on English entries only — Chinese entries are translations of these
const enEntries = manifest.entries.filter(e => e.lang === 'en' || !e.lang);
const circuits = enEntries.filter(e => e.currencyType === 'circuit');
const currents = enEntries.filter(e => e.currencyType === 'current');
const operators = enEntries.filter(e => e.currencyType === 'practitioner');

// Compact context for the identification pass
const compactContext = enEntries
  .map(e => `[${e.currencyType.toUpperCase()}] ${e.title} (${e.currencyId})${e.abstract ? ': ' + e.abstract : ''}`)
  .join('\n');

// Existing circuits summary — used to avoid re-drafting covered territory
const circuitSummary = circuits
  .map(c => `- ${c.currencyId}: ${c.title} — ${c.abstract || ''}`)
  .join('\n');

const today = new Date().toISOString().slice(0, 10);


// Pass 1 (auto): identify the best unaddressed pattern in the knowledge base
async function identifyPattern() {
  const prompt = `You are analyzing the Openflows knowledge base. Openflows documents the open source AI ecosystem using three types of entries:
- Currents: individual tools, projects, models, and signals
- Circuits: synthesized patterns connecting multiple Currents into a recognized loop or infrastructure layer
- Practitioners: key figures in the field

Your task: identify the most significant unaddressed pattern — a recurring theme, emerging tension, or stabilizing infrastructure that appears across 3 or more Currents but is NOT yet synthesized into an existing Circuit.

EXISTING CIRCUITS (do not propose these topics again):
${circuitSummary}

FULL KNOWLEDGE BASE:
${compactContext}

Return ONLY valid JSON:
{
  "topic": "concise descriptive name for the pattern",
  "currencyIds": ["id1", "id2", "id3"],
  "rationale": "why this is the most significant unaddressed pattern right now"
}

Rules:
- Select 3–8 Currents (and optionally 1–2 Practitioners) that are genuinely connected by the pattern
- The pattern must be meaningfully distinct from all existing Circuits
- Prefer patterns where the connection is operationally specific, not just thematic`;

  console.log('Identifying unaddressed pattern...');
  const raw = await or.ask(prompt);

  try {
    const jsonMatch = raw.match(/\{[\s\S]+\}/);
    const result = JSON.parse(jsonMatch ? jsonMatch[0] : raw);
    return result;
  } catch {
    console.error('Could not parse pattern identification response:\n', raw);
    process.exit(1);
  }
}

// Pass 1 (guided): identify relevant currents for a given topic
async function identifyRelevantCurrents(topic) {
  const prompt = `You are analyzing the Openflows knowledge base. Given the synthesis topic below, identify which existing entries are most relevant and should be connected in a new Circuit.

Topic: ${topic}

EXISTING CIRCUITS (do not include entries already well-covered by these):
${circuitSummary}

FULL KNOWLEDGE BASE:
${compactContext}

Return ONLY valid JSON:
{
  "currencyIds": ["id1", "id2", "id3"],
  "rationale": "why these entries connect around this topic"
}

Rules:
- Select 3–8 entries (Currents and/or Practitioners) genuinely connected by the topic
- Prefer operationally specific connections over loose thematic ones`;

  console.log(`Finding relevant entries for topic: "${topic}"...`);
  const raw = await or.ask(prompt);

  try {
    const jsonMatch = raw.match(/\{[\s\S]+\}/);
    const result = JSON.parse(jsonMatch ? jsonMatch[0] : raw);
    return { topic, currencyIds: result.currencyIds, rationale: result.rationale };
  } catch {
    console.error('Could not parse relevance response:\n', raw);
    process.exit(1);
  }
}

// Pass 2: draft the Circuit
async function draftCircuit(topic, selectedIds, rationale) {
  const selectedEntries = manifest.entries.filter(e => selectedIds.includes(e.currencyId));

  if (selectedEntries.length === 0) {
    console.error('No matching entries found for IDs:', selectedIds);
    process.exit(1);
  }

  // Strip HTML tags from body for cleaner context
  const stripHtml = s => s ? s.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim() : '';

  const entriesContext = selectedEntries.map(e =>
    `--- ${e.currencyType.toUpperCase()}: ${e.title} (${e.currencyId}) ---\nAbstract: ${e.abstract || '(none)'}\nContent: ${stripHtml(e.body)}`
  ).join('\n\n');

  const prompt = `You are the Openflows synthesis agent. Draft a new Circuit entry connecting the Currents listed below.

A Circuit documents a pattern that is stabilizing or has stabilized across multiple Currents. Unlike Currents (which document individual signals), a Circuit describes the loop — what is moving, what connects, what is becoming shared infrastructure.

STYLE GUIDE (follow this closely):
- Flowing narrative. No Signal/Context/Relevance headers.
- Short, direct sentences. Sometimes a single sentence per paragraph.
- Opens by situating the circuit relative to what already exists (e.g. "This circuit begins one level above...")
- Names participating Currents explicitly in the body
- Identifies what the circuit resists or avoids (the failure mode)
- Ends with "The circuit is complete when..." — a specific, operational definition of closure
- Dense and purposeful. No hype. Treat AI as infrastructure, not authority.

REQUIRED FRONTMATTER:
---
layout: layouts/currency-item.njk
title: ""
date: ${today}
currencyType: "circuit"
currencyId: (kebab-case, unique)
abstract: "(one precise sentence describing the pattern)"
tags:
  - currency
permalink: /currency/circuits/{currencyId}/
links:
  - id: (currencyId of each participating entry)
    relation: "(how this entry contributes to the circuit)"
mediation:
  tooling: "OpenRouter / ${or.primaryModel}"
  use:
    - "identified pattern across existing Currents"
    - "drafted Circuit synthesis from knowledge base"
  humanRole: "review, edit, and approve before publication"
  limits: "synthesis is a starting point; human judgment required on pattern boundaries and claims"
---

Output ONLY the complete markdown file — frontmatter and body, nothing else.

SYNTHESIS TOPIC: ${topic}
RATIONALE: ${rationale || 'Pattern identified from knowledge base analysis'}

PARTICIPATING ENTRIES:
${entriesContext}`;

  console.log(`\nDrafting Circuit: "${topic}"...`);
  console.log(`Connecting: ${selectedIds.join(', ')}\n`);
  return await or.ask(prompt);
}

function extractCurrencyId(markdown) {
  const match = markdown.match(/currencyId:\s*(.+)/);
  return match ? match[1].trim().replace(/['"]/g, '') : null;
}

function writeDraft(markdown) {
  const draftsDir = join(__dirname, '..', 'drafts');
  if (!existsSync(draftsDir)) mkdirSync(draftsDir);

  const currencyId = extractCurrencyId(markdown);
  const filename = currencyId ? `${currencyId}.md` : `circuit-draft-${today}.md`;
  const outPath = join(draftsDir, filename);
  writeFileSync(outPath, markdown);
  return filename;
}

async function main() {
  console.log(`\nOpenflows Synthesis — Circuit Drafting`);
  console.log(`Model: ${or.primaryModel}`);
  console.log(`Knowledge base: ${manifest.count} entries | ${circuits.length} circuits | ${currents.length} currents | ${operators.length} practitioners\n`);

  let topic, selectedIds, rationale;

  if (explicitCurrents) {
    // User provided both topic and currents explicitly
    topic = topicArg || 'Synthesis of selected currents';
    selectedIds = explicitCurrents;
    rationale = 'User-specified selection';
    console.log(`Using explicit currents: ${selectedIds.join(', ')}`);
  } else if (topicArg) {
    // Guided: identify relevant currents for the given topic
    const result = await identifyRelevantCurrents(topicArg);
    topic = topicArg;
    selectedIds = result.currencyIds;
    rationale = result.rationale;
    console.log(`\nRelevant entries identified: ${selectedIds.join(', ')}`);
    console.log(`Rationale: ${rationale}`);
  } else {
    // Auto: find the best unaddressed pattern
    const result = await identifyPattern();
    topic = result.topic;
    selectedIds = result.currencyIds;
    rationale = result.rationale;
    console.log(`\nPattern identified: "${topic}"`);
    console.log(`Entries: ${selectedIds.join(', ')}`);
    console.log(`Rationale: ${rationale}`);
  }

  const markdown = await draftCircuit(topic, selectedIds, rationale);
  const filename = writeDraft(markdown);

  console.log(`\nCircuit draft written: drafts/${filename}`);
  console.log('Review, edit, then move to src/currency/circuits/');
}

main().catch(err => {
  console.error('Fatal:', err.message);
  process.exit(1);
});
