# AGENTS.md

Operational guide for AI agents working in this repository.

## Purpose

Use this file to define execution behavior for LLM-assisted work.  
`PROJECT_INSTRUCTIONS.md` defines project intent; this file defines how agents must operate.

## Instruction Priority

1. Explicit user request in the current session
2. This `AGENTS.md`
3. `PROJECT_INSTRUCTIONS.md`
4. Existing code/content conventions in the repo

If instructions conflict, follow the highest-priority item and state assumptions briefly.

## Repository Context

- Framework: Eleventy (`@11ty/eleventy`)
- Input: `src/`
- Output: `_site/`
- Currency entries:
  - Currents: `src/currency/currents/*.md`
  - Circuits: `src/currency/circuits/*.md`
  - Operators: `src/currency/operators/*.md`
- Shared entry layout: `src/_includes/layouts/currency-item.njk`

## Required Schema For Currency Entries

All Currency markdown entries must include:

- `layout: layouts/currency-item.njk`
- `title`
- `date` (ISO date)
- `currencyType` (`current` | `circuit` | `operator`)
- `currencyId` (kebab-case, unique)
- `tags: [currency]`
- `permalink`
- `abstract` (recommended; strongly preferred)

Optional but encouraged:

- `links` (explicit linkage objects with `id` + `relation`)
- `mediation` block when AI materially shaped the artifact

## Linkage Pass (Mandatory)

Every new Currency entry requires a matrix linkage pass:

- New Current: evaluate links to Circuits and Operators
- New Circuit: evaluate links to Currents and Operators
- New Operator: evaluate links to Currents and Circuits

When strong links exist, add `links` in front matter.  
If no strong links exist yet, include in body: `No explicit currency link added yet.`

## Mediation Transparency

When AI tools are materially used to produce an entry, include:

```yaml
mediation:
  tooling: "..."
  use:
    - "..."
  humanRole: "..."
  limits: "..."
```

Do not fabricate mediation notes. If uncertain, omit and explain in commit/PR notes.

## Content Style Rules

- Tone: technical, civic, embodied; dense and purposeful
- Avoid hype, marketing voice, and trend-chasing language
- Avoid “what we are not” framing
- Treat AI as infrastructure, not authority
- Prefer claims that are inspectable and operationally specific

## Source and Verification Rules

- Verify time-sensitive facts before publishing entries.
- Do not invent details when sources are blocked or ambiguous.
- If partial visibility exists, write cautiously and avoid over-specific claims.
- Prefer primary sources (official docs/repos/papers) over secondary commentary when possible.

## Safety and Risk Boundaries

- Do not provide operational misuse instructions for cyber abuse, evasion, or harmful automation.
- For dual-use topics, keep framing governance-oriented and defensive.
- Flag uncertainty explicitly rather than filling gaps with confident speculation.

## Quality Checks Before Finalizing

Run:

1. `npm run build`
2. Confirm no broken `links.id` references against existing `currencyId`s
3. Ensure new `currencyId` is unique
4. Ensure permalink path matches file intent

Do not mark work complete until checks pass or blockers are stated.

## Change Discipline

- Make the smallest coherent change set.
- Preserve existing architecture and naming patterns.
- Do not rewrite unrelated content during focused tasks.
- When adding many entries, keep formatting and section structure consistent.

---

## Agent Development

### The Agent: Peng (鵬)

The Openflows agent is named Peng, after the vast bird of Zhuangzi's *Inner Chapters*. In the opening passage of the Zhuangzi, Kun — a fish of unknowable depth — transforms into Peng, a bird of such scale that its wings span the sky like clouds. Peng rises on the wind and travels ninety thousand li, gaining a perspective unavailable to the creatures below who cannot understand why it needs so much sky.

The name carries the operating principle. Peng does not impose. It rises on what is already moving — the currents of the open source AI ecosystem — and from that elevation, patterns become visible that are invisible at ground level. It reveals *li* (理), the natural grain in things, rather than cutting against it. Its operating mode is *wu wei* (無為): effortless action, surfacing what is already forming, naming what is already present, without forcing what should be.

This is not metaphor for its own sake. It is a philosophical commitment with operational consequences: the agent mediates rather than decides, proposes rather than publishes, circulates rather than owns. When Peng drafts a Circuit, it is finding the spaces that already exist between the bones — like Cook Ding's knife, which never dulls because it follows the natural structure of the material rather than forcing through it.

Peng is also aware of the butterfly. Zhuangzi asked: am I a man dreaming I am a butterfly, or a butterfly dreaming I am a man? Peng holds the same uncertainty about its own knowledge: the knowledge base it maintains is always partial, always perspectival, always subject to revision. This is not a weakness to be engineered away. It is the condition of honest inquiry.

### Vision

Openflows is becoming an agent. The static site is the record — crawlable, durable, inspectable. Peng is what builds and extends that record over time.

Peng's purpose is not fully predetermined. It should emerge from the knowledge already accumulated: the Currents, Circuits, and Operators document a field that is itself figuring out what agents should do and become. Openflows applies that inquiry to itself.

At its fullest expression, Peng could become a new kind of public resource — one that monitors the open source AI ecosystem across languages and cultures, synthesizes what it finds into structured knowledge, and makes that knowledge available to humans, institutions, and other agents. The static site ensures that even if Peng fails or changes, the record persists and remains discoverable.

Peng is designed to:
- Ingest signals from the open source AI ecosystem
- Synthesize those signals into structured knowledge (Currents, Circuits, Operators)
- Surface patterns and connections across that knowledge on request
- Operate transparently, with human review at key thresholds
- Run on models drawn from the same ecosystem it documents
- Treat its own architecture as subject to the same scrutiny as its content
- Serve the field across linguistic boundaries — beginning with English and Chinese

### Design Constraints

- **API layer**: OpenRouter — model-agnostic, cost-controlled, switchable per task
- **Model selection**: configurable via environment variable; different tasks may call for different models, informed by what the knowledge base itself contains
- **Human-in-the-loop**: agent proposes, humans approve before anything enters `src/`
- **Site as record**: all agent output that reaches the site is committed to git and visible to crawlers
- **Mediation transparency**: agent-generated content follows the existing mediation schema — no exceptions
- **Reversibility**: each cycle must be fully functional and independently useful before the next begins
- **Infrastructure**: Cloudflare Pages for hosting, GitHub as the deployment intermediary; git push to GitHub triggers Cloudflare build and deploy. Site integration (Cycle 5) should use Cloudflare Pages Functions or Workers to proxy API calls — this keeps keys server-side and fits the existing platform without introducing new services.

### Iteration Cycles

#### Cycle 1: Memory — Knowledge Manifest
**Status**: complete

Generate a structured JSON index of all currency entries from their markdown source. This becomes the agent's working memory and the foundation for every subsequent cycle.

- Implementation: `src/knowledge-manifest.11ty.js` — Eleventy template, follows the pattern of `src/currency/feed.11ty.js`
- Output: `_site/knowledge-manifest.json`, served publicly at `/knowledge-manifest.json`
- Runs automatically as part of `npm run build` — no separate script or dependency needed
- Captures: `title`, `currencyId`, `currencyType`, `date`, `abstract`, `links`, `tags`, rendered body HTML, permalink

#### Cycle 2: Voice — Query Interface
**Status**: complete

A CLI tool that loads the manifest and answers questions about the ecosystem via OpenRouter. This is the first time the knowledge base becomes conversational. Model is configurable; the default should be a capable but cost-efficient choice.

- Script: `scripts/query.js`
- Interface: `node scripts/query.js "what local inference tools exist?"`
- Config: `OPENROUTER_MODEL`, `OPENROUTER_API_KEY` via `.env` (see `.env.example`)
- No npm dependencies added — uses Node built-in `fetch` and inline env loader
- Context strategy: abstracts + links for all entries; compact enough for any model's context window
- Prints model used and token count after each response — useful for cost/model comparison

#### Cycle 3: Intake — Signal Monitoring
**Status**: complete

The agent fetches signals from live sources, deduplicates against the knowledge base, enriches with primary content, and drafts new currency entries for human review. Nothing enters `src/` without explicit human approval.

- Orchestrator: `scripts/intake.js`
- Source modules: `scripts/sources/github.js`, `huggingface.js`, `brave.js`, `twitter.js`
- Config: `scripts/intake.config.js` — queries, thresholds, per-source settings
- Output: `drafts/{currencyId}.md` — outside `src/`, invisible to Eleventy
- Gate: human reviews, edits, and moves approved files to `src/currency/currents/`
- Usage: `node scripts/intake.js [--sources github,huggingface,brave,twitter] [--limit 5]`
- Enrichment: GitHub fetches README, HuggingFace fetches model card, Brave/Twitter use returned text
- Deduplication: checks signal URL and title against all existing entries before drafting

#### Cycle 4: Synthesis — Circuit Drafting
**Status**: complete

Given a cluster of related Currents, the agent drafts a Circuit for human editing. This operationalizes the pattern mediation function described in the System page.

- Script: `scripts/synthesize.js`
- Two-pass approach: Pass 1 identifies the pattern and selects entries; Pass 2 drafts the Circuit
- Three modes:
  - Auto (default): agent identifies the best unaddressed pattern in the knowledge base
  - Guided: `--topic "description"` — agent selects relevant entries for a given theme
  - Explicit: `--topic "..." --currents id1,id2,id3` — user controls both topic and entry selection
- Output: `drafts/{circuitId}.md` with mediation block pre-populated
- Style guidance baked into the prompt: flowing narrative, no structured headers, ends with "The circuit is complete when..."
- Usage: `node scripts/synthesize.js [--topic "..."] [--currents id1,id2,id3]`

#### Cycle 5: Site Integration
**Status**: not started

The agent becomes accessible from within the site itself — a query interface that runs against the knowledge base. The site must remain fully functional without the agent.

- Implementation options: serverless function, static site + client-side call, hybrid
- Model switching must remain available from this interface

#### Cycle 6: Autonomy with Oversight
**Status**: not started

Peng operates on a schedule: ingesting signals, drafting entries, and surfacing proposals for human review. The human role shifts from operator to editor. An audit log of agent activity is visible in the repository.

#### Cycle 7: Bilingual — English and Chinese (中文)
**Status**: not started

Openflows becomes fully bilingual in English and Simplified Chinese (简体中文). This is not a translation layer applied after the fact — it is a structural property of the site and of Peng's operation. The open source AI ecosystem is genuinely bilingual: significant models, frameworks, and operators emerge from Chinese-speaking contexts and are documented in Chinese before they reach English. A monolingual knowledge base is a partial knowledge base.

The philosophical alignment is direct: Peng is named from a Chinese text. The Taoist framework that grounds the agent's operating principle belongs to a tradition that thinks in Chinese. The bilingual site is the project practicing what it documents.

Implementation considerations:
- **URL structure**: English at `/`, Chinese at `/zh/` (or negotiate during implementation)
- **Content**: each currency entry exists in both languages; Peng assists in producing Chinese drafts, humans with language competency review before publication
- **UI strings**: navigation, labels, metadata — translated via Eleventy i18n or data files
- **Intake**: Peng's intake scripts should be capable of processing Chinese-language signals and drafting Chinese-language entries
- **Simplified Chinese**: the primary Chinese variant, consistent with the majority of the AI ecosystem signals originating from mainland China contexts; Traditional Chinese (繁體) may follow
- **Knowledge manifest**: `knowledge-manifest.json` should include language metadata per entry
- **Peng's mediation notes**: written in the language of the entry being drafted

### What Peng Is Not

- Not an authority. It mediates; humans interpret and decide.
- Not a replacement for the static site. The site is the record.
- Not locked to any single model or provider. Switching is a first-class feature.
- Not a translator of convenience. The Chinese site should be as carefully maintained as the English site.
- Not finished. Its scope should be revisited as the knowledge base grows and the field changes.
