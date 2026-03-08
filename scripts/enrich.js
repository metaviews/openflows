// Cycle 8: Depth — Entry Enrichment
//
// Enriches flagged entries identified by audit.js:
//   - Adds mediation blocks to circuits missing them
//   - Suggests cross-reference links for unlinked currents
//   - Can also enrich thin bodies when --fix body is used
//
// Enriched drafts are written to drafts/enriched/ for human review.
// Nothing is written directly to src/ — humans promote as with intake.
//
// Usage:
//   node scripts/enrich.js --id {id}              # enrich a specific entry (auto-detects gaps)
//   node scripts/enrich.js --fix mediation        # all circuits missing mediation blocks
//   node scripts/enrich.js --fix links            # all currents missing links
//   node scripts/enrich.js --fix all              # run both passes
//   node scripts/enrich.js --id {id} --fix links  # specific entry, specific fix

const { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync } = require('fs');
const { join } = require('path');
const { loadEnv, createClient, getArg } = require('./lib/openrouter');

loadEnv();

const or = createClient({ title: 'Openflows Enrichment Agent - Peng', temperature: 0.4 });

// --- CLI args ---
const args = process.argv.slice(2);

const idArg = getArg(args, 'id');
const fixArg = getArg(args, 'fix');

// --- Paths ---
const root = join(__dirname, '..');
const srcDir = join(root, 'src', 'currency');
const enrichedDir = join(root, 'drafts', 'enriched');

if (!existsSync(enrichedDir)) mkdirSync(enrichedDir, { recursive: true });

// --- Frontmatter parser ---
function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]+?)\n---\n?([\s\S]*)$/);
  if (!match) return { fm: {}, body: content, raw: content };

  const fm = {};
  const raw = match[1];
  const body = match[2].trim();

  const lines = raw.split('\n');
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    const eq = line.indexOf(':');
    if (eq === -1) { i++; continue; }
    const key = line.slice(0, eq).trim();
    const val = line.slice(eq + 1).trim();
    if (!key || key.startsWith('-') || key.startsWith(' ')) { i++; continue; }

    if (val === '' && i + 1 < lines.length && (lines[i + 1].trimStart().startsWith('-') || lines[i + 1].match(/^\s+\w/))) {
      const block = [];
      i++;
      while (i < lines.length && (lines[i].startsWith('  ') || lines[i].startsWith('\t') || lines[i].trimStart().startsWith('-'))) {
        block.push(lines[i]);
        i++;
      }
      fm[key] = block.join('\n');
    } else {
      fm[key] = val.replace(/^["']|["']$/g, '');
      i++;
    }
  }

  return { fm, body, rawFm: raw };
}

// --- File lookup ---
function findEntry(id) {
  for (const folder of ['currents', 'circuits', 'practitioners']) {
    const p = join(srcDir, folder, `${id}.md`);
    if (existsSync(p)) return { path: p, type: folder.replace(/s$/, '') === 'practitioner' ? 'practitioner' : folder.slice(0, -1), folder };
  }
  return null;
}

function getEntries(folder) {
  const dir = join(srcDir, folder);
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter(f => f.endsWith('.md'))
    .map(f => {
      const p = join(dir, f);
      const content = readFileSync(p, 'utf8');
      const { fm, body } = parseFrontmatter(content);
      return { id: f.replace('.md', ''), path: p, fm, body, content };
    });
}


// --- Enrichment: mediation block for circuits ---
async function enrichMediation(entry) {
  const { fm, body, content } = entry;

  const systemPrompt = `You are Peng (鵬), the knowledge agent for Openflows — a bilingual knowledge base documenting the open source AI ecosystem.

You are adding a mediation block to a Circuit entry. Mediation documents the AI tooling involved, its uses, the human oversight role, and its limits.

The mediation block is YAML frontmatter and must follow this exact schema:
mediation:
  tooling: "Brief description of AI tools or methods used"
  use:
    - "specific use 1"
    - "specific use 2"
  humanRole: "What humans must do that AI cannot"
  limits: "Key limitations or failure modes to be aware of"

Rules:
- Be concise and specific — no hype, no inflated claims
- humanRole must reflect real oversight need, not just "review output"
- limits must name a real failure mode, not a generic disclaimer
- Respond with ONLY the YAML block (starting with "mediation:" — no surrounding markers)`;

  const userPrompt = `Circuit entry to enrich with a mediation block:

Title: ${fm.title}
Abstract: ${fm.abstract}

Body:
${body}

Generate an appropriate mediation block for this circuit.`;

  const mediationYaml = await or.chat(systemPrompt, userPrompt);

  // Insert mediation into frontmatter — before the closing ---
  // Find insertion point: before first blank line or before the --- end
  const fmLines = content.split('\n');
  let closeIdx = -1;
  let inFm = false;
  for (let i = 0; i < fmLines.length; i++) {
    if (fmLines[i] === '---') {
      if (!inFm) { inFm = true; continue; }
      closeIdx = i;
      break;
    }
  }

  if (closeIdx === -1) {
    throw new Error(`Could not locate frontmatter close in ${entry.id}`);
  }

  // Build enriched content: insert mediation before closing ---
  const before = fmLines.slice(0, closeIdx).join('\n');
  const after = fmLines.slice(closeIdx).join('\n');
  const enriched = `${before}\n${mediationYaml.trim()}\n${after}`;

  return enriched;
}

// --- Enrichment: link suggestions for currents ---
async function enrichLinks(entry, circuits) {
  const { fm, body, content } = entry;

  // Build compact circuit context
  const circuitContext = circuits
    .map(c => `- ${c.id}: ${c.fm.title} — ${c.fm.abstract}`)
    .join('\n');

  const systemPrompt = `You are Peng (鵬), the knowledge agent for Openflows.

You are adding cross-reference links to a Current entry that has no connections yet. You must produce two outputs, clearly separated.

OUTPUT FORMAT — respond with exactly this structure, no other text:

LINKS_YAML
links:
  - id: circuit-id
    relation: "short phrase describing what this current contributes to the circuit"
END_LINKS_YAML

CONNECTIONS_PROSE
One or two sentences per link explaining the connection in plain prose, matching the links above.
Prose must use the format: "Linked to \`circuit-id\` as [explanation]."
If no circuits apply, write: "No explicit circuit connections identified."
END_CONNECTIONS_PROSE

Rules:
- Only link to circuits that this current genuinely connects to — do not force connections
- If no circuits apply, emit "links: []" and the no-connections prose
- Relation phrases should be specific: "contributes local inference patterns to" not "is related to"
- Suggest 1–4 links maximum
- LINKS_YAML and CONNECTIONS_PROSE must be consistent — same circuits, same relations`;

  const userPrompt = `Current entry to connect:

Title: ${fm.title}
Abstract: ${fm.abstract}

Body:
${body}

Available circuits:
${circuitContext}

Produce the LINKS_YAML and CONNECTIONS_PROSE for this entry.`;

  const raw = await or.chat(systemPrompt, userPrompt);

  // Parse the two sections
  const linksMatch = raw.match(/LINKS_YAML\n([\s\S]+?)\nEND_LINKS_YAML/);
  const proseMatch = raw.match(/CONNECTIONS_PROSE\n([\s\S]+?)\nEND_CONNECTIONS_PROSE/);

  if (!linksMatch) throw new Error(`Model did not return LINKS_YAML block for ${entry.id}`);

  const linksYaml = linksMatch[1].trim();
  const connectionsProse = proseMatch ? proseMatch[1].trim() : null;

  // Insert links into frontmatter
  const fmLines = content.split('\n');
  let closeIdx = -1;
  let inFm = false;
  let hasLinks = false;
  for (let i = 0; i < fmLines.length; i++) {
    if (fmLines[i] === '---') {
      if (!inFm) { inFm = true; continue; }
      closeIdx = i;
      break;
    }
    if (inFm && fmLines[i].startsWith('links:')) hasLinks = true;
  }

  if (closeIdx === -1) throw new Error(`Could not locate frontmatter close in ${entry.id}`);
  if (hasLinks) {
    console.log(`  ⚠ ${entry.id} already has links field — skipping insertion, review manually`);
    return content;
  }

  const before = fmLines.slice(0, closeIdx).join('\n');
  const after = fmLines.slice(closeIdx).join('\n');
  let enriched = `${before}\n${linksYaml}\n${after}`;

  // Replace stub Connections prose with generated prose
  if (connectionsProse) {
    enriched = enriched.replace(
      /### Connections\n\nNo explicit currency link added yet\./,
      `### Connections\n\n${connectionsProse}`
    );
  }

  return enriched;
}

// --- Write enriched draft ---
function writeDraft(id, content, fixType) {
  const outPath = join(enrichedDir, `${id}.md`);
  writeFileSync(outPath, content);
  console.log(`  ✓ ${id} → drafts/enriched/${id}.md [${fixType}]`);
}

// --- Check if already enriched ---
function alreadyEnriched(id) {
  return existsSync(join(enrichedDir, `${id}.md`));
}

// --- Main ---
async function main() {
  const circuits = getEntries('circuits');
  const currents = getEntries('currents');

  // Determine what to fix
  const doMediation = !fixArg || fixArg === 'mediation' || fixArg === 'all';
  const doLinks = fixArg === 'links' || fixArg === 'all';
  const doAuto = !fixArg;  // auto-detect when no --fix flag

  // Determine targets
  let mediationTargets = [];
  let linkTargets = [];

  if (idArg) {
    const entry = findEntry(idArg);
    if (!entry) {
      console.error(`Entry not found: ${idArg}`);
      process.exit(1);
    }
    const content = readFileSync(entry.path, 'utf8');
    const { fm, body } = parseFrontmatter(content);
    const entryObj = { id: idArg, path: entry.path, fm, body, content };

    if (entry.type === 'circuit' && (doMediation || doAuto)) {
      if (!fm.mediation) mediationTargets.push(entryObj);
    }
    if (entry.type === 'current' && (doLinks || doAuto)) {
      const hasLinks = typeof fm.links === 'string' ? fm.links.length > 5 : Array.isArray(fm.links) && fm.links.length > 0;
      if (!hasLinks) linkTargets.push(entryObj);
    }
  } else {
    if (doMediation) {
      mediationTargets = circuits.filter(c => {
        const hasMediation = typeof c.fm.mediation === 'string' ? c.fm.mediation.length > 5 : !!c.fm.mediation;
        return !hasMediation;
      });
    }
    if (doLinks) {
      linkTargets = currents.filter(c => {
        const hasLinks = typeof c.fm.links === 'string' ? c.fm.links.length > 5 : Array.isArray(c.fm.links) && c.fm.links.length > 0;
        return !hasLinks;
      });
    }
  }

  const total = mediationTargets.length + linkTargets.length;
  if (total === 0) {
    console.log('No enrichment needed — all targets already meet quality floor.');
    return;
  }

  console.log(`Enriching ${total} entries → drafts/enriched/`);
  console.log(`  Mediation: ${mediationTargets.length} circuits`);
  console.log(`  Links:     ${linkTargets.length} currents`);
  console.log('');

  // Process mediation
  for (const entry of mediationTargets) {
    if (alreadyEnriched(entry.id)) {
      console.log(`  ↩ ${entry.id} already in drafts/enriched/, skipping`);
      continue;
    }
    process.stdout.write(`  ◌ ${entry.id} (mediation)...`);
    try {
      const enriched = await enrichMediation(entry);
      writeDraft(entry.id, enriched, 'mediation');
    } catch (e) {
      console.log(`\n  ✗ ${entry.id}: ${e.message}`);
    }
  }

  // Process links
  for (const entry of linkTargets) {
    if (alreadyEnriched(entry.id)) {
      console.log(`  ↩ ${entry.id} already in drafts/enriched/, skipping`);
      continue;
    }
    process.stdout.write(`  ◌ ${entry.id} (links)...`);
    try {
      const enriched = await enrichLinks(entry, circuits);
      writeDraft(entry.id, enriched, 'links');
    } catch (e) {
      console.log(`\n  ✗ ${entry.id}: ${e.message}`);
    }
  }

  console.log(`\nDone. Review drafts/enriched/, then copy approved files to src/currency/{type}/`);
}

main().catch(e => {
  console.error(e.message);
  process.exit(1);
});
