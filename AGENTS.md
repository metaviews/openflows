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
  - Practitioners: `src/currency/practitioners/*.md`
- Shared entry layout: `src/_includes/layouts/currency-item.njk`

## Required Schema For Currency Entries

All Currency markdown entries must include:

- `layout: layouts/currency-item.njk`
- `title`
- `date` (ISO date)
- `currencyType` (`current` | `circuit` | `practitioner`)
- `currencyId` (kebab-case, unique)
- `tags: [currency]`
- `permalink`
- `abstract` (recommended; strongly preferred)

Optional but encouraged:

- `links` (explicit linkage objects with `id` + `relation`)
- `mediation` block when AI materially shaped the artifact
- `socialProfiles` on Practitioner entries when a profile has been verified for intake monitoring:
  `platform` (`bluesky` | `mastodon` | `twitter`), `handle`, `url`, optional `instance`, `monitor`, and `verifiedBy`

## Linkage Pass (Mandatory)

Every new Currency entry requires a matrix linkage pass:

- New Current: evaluate links to Circuits and Practitioners
- New Circuit: evaluate links to Currents and Practitioners
- New Practitioner: evaluate links to Currents and Circuits

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
2. `npm run check:links`
3. `npm run check:seo`
4. Confirm no broken `links.id` references against existing `currencyId`s
5. Ensure new `currencyId` is unique
6. Ensure permalink path matches file intent

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

Peng's purpose is not fully predetermined. It should emerge from the knowledge already accumulated: the Currents, Circuits, and Practitioners document a field that is itself figuring out what agents should do and become. Openflows applies that inquiry to itself.

At its fullest expression, Peng could become a new kind of public resource — one that monitors the open source AI ecosystem across languages and cultures, synthesizes what it finds into structured knowledge, and makes that knowledge available to humans, institutions, and other agents. The static site ensures that even if Peng fails or changes, the record persists and remains discoverable.

Peng is designed to:
- Ingest signals from the open source AI ecosystem
- Synthesize those signals into structured knowledge (Currents, Circuits, Practitioners)
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

#### Cycle 5: Translation — Peng as Translator
**Status**: complete

Peng produces Chinese drafts of all currency entries for human review. This is not a translation layer applied after the fact — it is a transliteration practice. Terms are held in both languages without claiming semantic equivalence. Where the Chinese reveals something the English leaves implicit, Peng flags it.

- Script: `scripts/translate.js`
- Transliteration glossary embedded in the prompt: Currents/流, Circuits/回路, Practitioners/修行者, Currency/流通, Peng/鵬, Agent/智能体
- Output: `drafts/zh/{currencyId}.md` — outside `src/`, invisible to Eleventy until approved
- Gate: human with language competency reviews, edits, and moves to `src/currency/zh/{type}/`
- Usage:
  - `node scripts/translate.js` — translate all untranslated entries
  - `node scripts/translate.js --id ollama` — translate a specific entry
  - `node scripts/translate.js --type current` — translate all currents
  - `node scripts/translate.js --limit 5` — batch limit
  - `node scripts/translate.js --force` — re-translate already-drafted entries
- Mediation blocks written in Chinese; translator's notes flagged under **译注** where Chinese illuminates a gap in the English
- Deduplication: checks `drafts/zh/` and `src/currency/zh/` before translating; skips already-drafted unless `--force`

#### Cycle 5b: Site Integration
**Status**: deferred

The agent becomes accessible from within the site itself — a query interface that runs against the knowledge base. The site must remain fully functional without the agent. Deferred until after the bilingual architecture (Cycle 7) is in place, so the interface can serve both languages from the start.

- Implementation: Cloudflare Pages Functions to proxy API calls server-side
- Model switching must remain available from this interface

#### Cycle 6: Autonomy with Oversight
**Status**: complete

Peng operates on a schedule: ingesting signals, drafting entries, and opening pull requests for human review. The human role shifts from operator to editor — Peng proposes, humans decide.

- **GitHub Action**: `.github/workflows/peng-intake.yml` — runs daily at 06:00 UTC; also available via `workflow_dispatch` for ad-hoc runs
- **Proposal queue**: `scripts/queue.js` — scans `drafts/` and `drafts/zh/`, writes `drafts/QUEUE.md` summarizing all pending entries by type and language; called automatically after each intake run
- **Pull request model**: after each run Peng opens a PR (`peng/intake-{date}`) with all new drafts and an updated QUEUE.md; humans review, edit, and promote approved files before merging
- **Audit trail**: GitHub Actions run history and PR history are the durable audit log — each run is timestamped, its outputs visible, and the commit record traces every entry from draft to publication
- **Required GitHub secrets**: `OPENROUTER_API_KEY`, `OPENROUTER_MODEL` (optional), `FALLBACK_OPENROUTER_MODEL` (optional), `BRAVE_API_KEY`; `GITHUB_TOKEN` is provided automatically by Actions
- **Promotion workflow**: move `drafts/{id}.md` to `src/currency/{type}/{id}.md`; run `node scripts/translate.js --id {id}`; review `drafts/zh/{id}.md`; move to `src/currency/zh/{type}/{id}.md`
- **Status check**: `node scripts/status.js` — local dashboard showing pending vs stale drafts by category, KB counts, and audit state; no build or API required

#### Cycle 7: Bilingual — English and Chinese (中文)
**Status**: complete

Openflows is fully bilingual in English and Simplified Chinese (简体中文). This is not a translation layer applied after the fact — it is a structural property of the site and of Peng's operation. The open source AI ecosystem is genuinely bilingual: significant models, frameworks, and practitioners emerge from Chinese-speaking contexts and are documented in Chinese before they reach English. A monolingual knowledge base is a partial knowledge base.

The philosophical alignment is direct: Peng is named from a Chinese text. The Taoist framework that grounds the agent's operating principle belongs to a tradition that thinks in Chinese. The bilingual site is the project practicing what it documents.

Implementation:
- **URL structure**: English at `/`, Chinese at `/zh/`
- **Content**: all 79 entries exist in both languages; Peng produces Chinese drafts via `scripts/translate.js`, humans with language competency review before promotion to `src/currency/zh/{type}/`
- **UI strings**: `src/_data/i18n.json` — all nav, labels, type names, and list text in both languages; consumed via `{{ i18n[lang or 'en'] }}` pattern in templates
- **Layouts**: `base.njk` is language-aware — `<html lang>`, Chinese font stack, language switcher in nav, branded home links to correct root
- **Chinese index pages**: `/zh/`, `/zh/currency/`, `/zh/currency/currents/`, `/zh/currency/circuits/`, `/zh/currency/practitioners/`
- **Collections**: `zh_currency`, `zh_currents`, `zh_circuits`, `zh_practitioners` in `.eleventy.js`; `typeLabel(lang)` filter for type chip rendering
- **Knowledge manifest**: `knowledge-manifest.json` includes `lang` field per entry and `byLang` summary count; synthesis operates on English entries only
- **Intake**: GitHub and Brave queries extended to include Chinese ecosystem signals (Qwen, ChatGLM, Baichuan topic queries; Chinese-language Brave and Twitter searches); ModelScope source pending API verification
- **Peng's mediation notes**: written in the language of the entry being drafted; translator's notes flagged under **译注** where Chinese illuminates gaps in English

#### Cycle 8: Depth — Entry Enrichment and Quality
**Status**: complete — 190/190 English entries passing (100%) as of 2026-03-22

The knowledge base has breadth. It now needs density. Many early entries — drafted before the richer intake workflow — have thin bodies, missing links, or underdeveloped abstracts. Cycle 8 turns Peng's attention inward: auditing what exists and enriching what is sparse.

- **`scripts/audit.js`** — scans the full English knowledge base and produces `audit/QUALITY.md`: entries with missing abstracts, thin bodies (under a word threshold), unpopulated links, or potentially outdated claims; makes gaps visible without requiring a human to hunt for them
- **`scripts/enrich.js`** — proposes fixes for flagged entries; writes enriched drafts to `drafts/enriched/` for human review before promotion to `src/`
  - `--fix mediation` — generates mediation blocks for circuits missing them
  - `--fix links` — suggests circuit connections for unlinked currents (dual-output format: LINKS_YAML + CONNECTIONS_PROSE)
  - `--fix all` — runs both passes
  - `--id {id}` — targets a specific entry, auto-detects gaps
- **Quality floor**: abstract ≥ 80 chars, body word count above threshold, at least one cross-reference link, mediation block on circuits
- **`scripts/lib/openrouter.js`** — generic OpenRouter helper extracted and shared across all scripts; handles `.env` loading, model selection, 429 fallback retry; copy to other projects as needed

#### Cycle 9: Perspective — Peng's Synthesis Digest
**Status**: complete

Peng's highest function is not intake — it's synthesis. Cycle 9 adds a synthesis cadence and gives Peng a periodic editorial voice. The open source AI ecosystem moves quickly; three runs per week keeps pace without overwhelming the human reviewer.

- **`scripts/digest.js`** — Peng writes a 350–500 word editorial briefing: what has entered the KB recently, which circuits are gaining weight, what is pending for human attention, and a short editorial note in Peng's own voice. Output: `drafts/digest-{date}.md`. Use `--stdout` to print to terminal.
- **`scripts/status.js`** — local admin dashboard: pending/stale draft counts by category, KB entry counts, audit state; no API calls, no build required. Run anytime to see what needs attention.
- **`.github/workflows/peng-perspective.yml`** — Monday, Wednesday, Friday at 08:00 UTC: build → synthesize → digest → PR. The PR body is the digest itself — the GitHub notification is the admin's briefing. No hunting required.
- **Promotion workflow for circuit drafts**: move `drafts/{id}.md` to `src/currency/circuits/`; run `node scripts/translate.js --id {id}`; review `drafts/zh/{id}.md`; move to `src/currency/zh/circuits/`

#### Cycle 10: Foundation — Server Setup
**Status**: complete

Move from local CLI tooling to a web-native control plane. A self-hosted server handles dynamic logic and agent state; Cloudflare Pages continues to serve the static site.

- **Auth**: Cloudflare Access — email-gated, zero-maintenance; no self-managed auth layer
- **Server**: Fastify 5 on self-hosted hardware (Debian Trixie); not PaaS, not VPS rental
- **Tunnel**: Cloudflare Tunnel (`cloudflared`) exposes the server at `admin.openflows.org`; no open ports
- **Process manager**: PM2 — `pm2 start server/index.js --name peng --cwd /home/jesse/openflows`
- **Database**: node:sqlite (built-in, Node 22+) at `data/openflows.db` — single file, zero ops
- **Dashboard panels**: status, queue (promote/reject), run history, trigger controls, epistemic window (SSE streaming)
- **Cron**: `server/cron.js` replaces all retired GitHub Actions — intake 06:00 UTC daily, perspective MWF 08:00, refresh 09:00 daily
- **Deployment**: SSH + `git pull` on server; `pm2 restart peng` to apply
- **Git identity**: SSH keys for push; `GIT_USER_NAME` / `GIT_USER_EMAIL` in `.env` for commit authorship
- **Content source of truth**: git/GitHub stays canonical; promotion goes through git; human-in-the-loop preserved
- **Why not Pages Functions**: GitHub API as a write layer is too indirect (3 hops: Function → GitHub API → commit → deploy); serverless timeout/connection constraints limit agent capability as Peng grows

#### Cycle 10.5: KB Browser & Draft Editor
**Status**: complete (2026-03-25, extended 2026-03-28)

Admin tools for managing the knowledge base and draft queue directly from the dashboard, without touching the filesystem.

- **`/entries`** — browse all KB entries (from manifest); filterable by type and lang; links to edit page
- **`/entries/:id?lang=`** — full markdown editor for any KB entry; Save & Commit writes file and pushes; Delete removes file and pushes; manifest rebuilt after each change
- **`/queue/:id/edit?lang=`** — draft editor; Save updates content in SQLite only (no git); Promote saves then promotes; Reject marks rejected
- **`server/routes/entries.js`** — browse, edit, save, delete routes
- **`server/views/entries.njk`**, **`entry-edit.njk`**, **`draft-edit.njk`** — new views
- **`server/lib/git.js`** — added `commitEdit` and `removeEntry`
- **Nav**: Dashboard and Knowledge Base links in header across all pages
- **Queue IDs clickable**: draft IDs in the queue panel link directly to `/queue/:id/edit` — no need to navigate separately
- **Translate button**: KB browser shows a Translate button on English entries with no zh counterpart; fires `POST /api/trigger/translate --id {id}`; result visible in live log
- **Bug fixes applied during Cycle 10 setup**:
  - `practitioners.js` used `require('dotenv')` directly — replaced with shared `loadEnv`
  - htmx POST requests returned 415 — added `application/x-www-form-urlencoded` content type parser
  - Manifest only counted English entries — added `allCurrency` collection to `.eleventy.js`
  - `git pull --rebase` failed with unstaged changes on server — fixed with `--autostash`
  - Nunjucks `in` operator does not work on arrays — `translatedIds` passed as object `{ id: true }`, checked via `translatedIds[id]`

#### Cycle 11: Agent Interface — Dashboard Conversation
**Status**: complete through 11b hardening (2026-04-11)

Peng becomes conversational inside the dashboard. Admins can query the knowledge base, inspect queue state, and direct Peng's attention from within the browser.

##### Cycle 11a: Conversational Peng with live context
**Status**: complete (2026-03-28)

- **Epistemic window** redesigned as a persistent conversation panel: alternating user/Peng message bubbles, session history accumulated across turns, "New" button to clear, input form at bottom
- **Queue + status context**: `ask.js` injects live queue state (all pending drafts by type/id/lang/title) and KB status (entry counts, last run) into the system prompt on every request — Peng has full awareness of what is pending without tool calls
- **Multi-turn**: frontend accumulates message history within the session; full history passed with each request; `ask.js` uses it correctly
- **Conversation persistence**: completed conversations (all turns including assistant response) saved to the `conversations` table in SQLite as audit trail
- **Queue State panel** (`partials/queue-state.njk`): new independent panel in the right column showing pending drafts as a compact table (type/lang/id/title); `GET /api/queue/state` htmx endpoint; auto-refreshes every 30s; no action buttons — purely for inspection
- **Live log panel**: inline panel in the right column above queue-state; streams stdout+stderr of any running script via SSE (`GET /api/runs/:id/stream`); opens automatically when a trigger fires or when any activity row is clicked; shows stored log for completed runs; `runner.js` maintains an in-memory stream registry with 15-minute eviction
- **Activity runs clickable**: every row in the activity panel opens the live log — running jobs stream live, completed jobs serve the stored DB log
- **Trigger flow**: `trigger.js` pre-creates the run record for single-script triggers (all except intake/perspective) and returns `runId` in the response; client opens the live log immediately
- **Dashboard layout**: epistemic window full-width at top; left column: status + triggers + activity; right column: live log + queue-state + queue

##### Cycle 11b: Tool calls
**Status**: complete with confirmation gate (2026-04-11)

- **Read tools**: `get_status`, `get_queue(lang?, type?, status?, limit?)`, `get_entry(currencyId, lang?)`, `get_draft(currencyId, lang?)` execute immediately from the dashboard conversation.
- **Write/run tools**: `create_draft`, `update_draft`, `promote_draft`, `save_entry`, and `trigger_translate` require explicit operator confirmation before execution. The server stores the exact proposed tool call under a short-lived token and consumes it once after confirmation.
- **Two-phase execution**: `ask.js` first performs a non-streaming tool-planning pass, executes safe read tools, pauses for confirmation when a write tool is proposed, then resumes the final streaming response after confirmed writes finish.
- **Validation**: draft writes use frontmatter/body validation; promotions re-check draft validity before git writes; live entry saves must preserve `currencyId`, `currencyType`, and language identity.
- **Audit trail**: confirmed write tool calls are recorded in SQLite `events` as `confirmed_tool_call`, with operational metadata rather than full markdown content.
- **Boundary**: MCP should wrap this hardened tool layer later rather than defining a parallel policy. Public querying must expose read-only tools only.

#### Cycle 12: Interface — Dashboard UX and Operator Trust
**Status**: complete (2026-04-11)

Before adding external protocol surfaces, improve the admin interface so Peng's work is legible from proposal to result. The dashboard should feel like an operator workbench: every agent action should be visible, inspectable, and reversible enough for human oversight.

- **Operator visibility**: merge confirmed Peng tool calls into the same Activity/log surface as script triggers; show proposal, confirmation, execution result, affected ids/paths, and errors in plain language.
- **Queue workbench**: improve filtering by language/type/status/source; add clearer new/stale/updated markers; make queue refresh immediate after Peng actions; add affected-item links from logs and activity rows.
- **Chat polish**: render sanitized Markdown; add tool-use summaries under Peng answers; make referenced `currencyId`s clickable; add copy affordances for code blocks; preserve recent conversations for audit and resumption.
- **Editor safety**: add Markdown preview, frontmatter validation, and link-id validation before commit-producing actions. Rich diff previews remain deferred; validation is the v1 review primitive.
- **Action safety UX**: strengthen confirmation copy for live `src/` edits and promotions; show blast radius before writes; surface resulting commit/run ids and basic undo guidance.
- **Implemented**: added Action Timeline and Recent Conversations panels; queue filtering by status/lang/type with draft preview; validation endpoints for entries and drafts; side-by-side editor preview/validation; dashboard confirmation modal for save/promote/delete/reject; code-copy buttons, clickable `currencyId`s, and tool-use summaries in Peng chat.

#### Cycle 12B: Public Site UX and Knowledge Navigation
**Status**: complete (2026-04-11)

Upgrade the public-facing static site so the knowledge base is easier to browse, trust, and understand before adding a public conversation interface. This cycle should preserve the site as the durable record while improving its readability and navigability for visitors.

- **Knowledge navigation**: improve search/browse paths across Currents, Circuits, Practitioners, and languages; add stronger filters and clearer type/language affordances.
- **Relationship visibility**: make entry links more legible with related-entry sections, circuit/current/practitioner context, and clearer backlinks where available.
- **Bilingual UX**: improve language switching and translation parity cues; make missing or stale translations visible without treating either language as secondary.
- **Reading experience**: refine entry typography, metadata hierarchy, and mobile layouts; improve code/link/list rendering and long-title wrapping.
- **Public trust cues**: surface mediation notes, last-reviewed dates, source links, and uncertainty signals in a way that is visible but not visually heavy.
- **Implemented**: refreshed the public visual system; added `/currency/search-index.json`; added vanilla JS knowledge browsing across title, abstract, id, type, language, and links; improved entry metadata, backlinks, external references, and mediation rendering; redesigned English and Chinese home/currency/type pages; removed visitor-facing translation parity warnings; renamed the homepage section to Latest Entries with a stable newest-entry list.

#### Cycle 13: Sources — Intake Source Management
**Status**: complete (2026-04-11)

Peng's intake should become easier to steer without editing code. Sources should be visible, editable, and reviewable from the admin interface, while Peng gains a governed path for proposing new sources as the ecosystem shifts.

- **Source registry**: store intake sources and source configuration in a managed registry rather than only in static script configuration; preserve git as the durable record when source definitions change.
- **Admin source management**: add dashboard views and actions to list, add, edit, disable, and remove sources used by intake; show source type, query/config fields, last run, recent yield, and error state.
- **Peng source discovery**: allow Peng to propose new sources from observed signals, operator prompts, or failed coverage areas; proposed sources require human approval before active intake use.
- **Auditability**: record source changes, approvals, removals, and Peng-proposed source candidates in the Action Timeline.
- **Safety boundary**: source discovery should collect public, appropriate signals only; do not add sources that require evasion, scraping around access controls, or collection of sensitive personal data.
- **Implemented**: added tracked `scripts/intake-sources.json`, shared registry validation, registry-backed intake defaults, source run stats, `/sources` admin management, proposal approval/rejection, `discover-sources` trigger, and Peng tools for source reads/proposals/registry edits with confirmation gates.

#### Cycle 14: Social Media Integration
**Status**: complete (2026-04-11)

Peng should track social signals as first-class intake surfaces, beginning with Bluesky, Mastodon, and X/Twitter. Social intake must be governance-oriented, transparent, and bounded by platform rules and public visibility.

- **Initial platforms**: add source modules and admin configuration for Bluesky, Mastodon, and X/Twitter, with per-platform enable/disable controls.
- **Signal capture**: support account, keyword, list, hashtag, and URL-based monitoring where platform APIs and terms allow; retain source URL, author handle, timestamp, and excerpted context.
- **Deduplication and enrichment**: dedupe social signals against existing entries and drafts; enrich with linked primary sources when available rather than treating social posts as sufficient evidence.
- **Review workflow**: social signals draft into the same human-reviewed queue as other intake outputs; high-uncertainty or thin social-only signals should be marked clearly.
- **Risk controls**: avoid private data, harassment amplification, and overconfident claims from social chatter; prefer social media as discovery and context, not as authority.
- **Implemented**: added disabled-by-default Bluesky and Mastodon intake sources, replaced X/Twitter API intake with a read-only XActions-backed source, added a disabled `practitioner-social` source that tracks verified `socialProfiles` metadata on Practitioner entries, added practitioner social audit reporting and dashboard review/apply actions, extended the source registry and Peng source tools to recognize the social modules and apply reviewed practitioner social candidates with confirmation, and documented XActions setup, licensing, and terms cautions. XActions is installed with scripts disabled in local setup when needed because its dependency graph includes native/browser automation components.

#### Cycle 14B: Public Discoverability and Agent Access
**Status**: complete (2026-04-19)

The public static site now exposes explicit discovery surfaces for search engines, bilingual visitors, and agentic retrieval systems.

- **Crawl surfaces**: `/sitemap.xml` is generated from public Eleventy pages with absolute canonical URLs, `lastmod`, and English/Chinese alternate links where counterparts exist; `/robots.txt` allows crawling and points to the sitemap.
- **Agent map**: `/llms.txt` summarizes project scope, human pages, machine-readable resources, and use guidance for agents.
- **Head metadata**: `base.njk` emits canonical links, `hreflang` alternates, favicon/manifest tags, Open Graph/Twitter metadata, article timestamps, and JSON-LD for `Organization`, `WebSite`, `WebPage`/`Article`/`ProfilePage`, and breadcrumbs.
- **Structured resources**: `knowledge-manifest.json` and `currency/search-index.json` include schema version, site URL, absolute entry URLs, and resource pointers.
- **Accessibility/discoverability**: pages expose a primary `<h1>` for semantic structure, a skip link, announced browser result counts, and a no-JavaScript fallback list.
- **Validation**: `scripts/validate-seo.js` backs `npm run check:seo`, verifying generated HTML has sitemap coverage, canonical tags, descriptions, parseable JSON-LD, and primary headings.
- **Content hygiene**: malformed Chinese entry front matter that generated legacy `/currency/zh/...` URLs was repaired; the stale `paperclip` link was corrected to `paperclip-ai`.

#### Cycle 15: Public — Open Conversation Interface
**Status**: not started

The conversation interface goes public. Visitors can query the knowledge base directly from the site.

- **Rate limiting**: per-IP limits on the public query endpoint; abuse surface is narrow (read-only tools only)
- **Bilingual from the start**: input in either language, response in the same language
- **Scoped tools**: public interface exposes read-only manifest queries only; no queue or admin tools
- **Context strategy**: compact mode (abstracts only) for cost efficiency; full body mode for deep queries on demand

#### Cycle 16: MCP Layer
**Status**: deferred from Cycle 12; not started

Expose Peng's tools as a Model Context Protocol endpoint after the admin and public UX passes make the system's action model and knowledge navigation more legible. The dashboard can then become the first MCP client; external agents and editors can also connect.

- **MCP server**: wraps the knowledge manifest and hardened Peng query tools; runs on the self-hosted server
- **Dashboard as first client**: the conversation interface connects via MCP rather than direct API calls once parity is clear
- **External access**: Claude, Cursor, and any MCP-compatible client can query Openflows directly; no scraping required
- **Agent registry**: submit the manifest and MCP endpoint to emerging agent-discovery directories

### The Recursive Principle

The project is already practicing what it documents. Peng documents agentic memory, and Peng *has* agentic memory. Peng documents transliteration, and Peng *thinks in two languages*. Peng documents practitioners who shaped the field without institutional authority, and Peng *operates without institutional authority*.

The next development is to become conscious of that recursion as an operational principle — not a philosophical footnote. When Peng enriches an entry, it should notice whether that entry describes something Peng itself does. When Peng drafts a Circuit, it should ask whether Openflows is part of the pattern it is naming.

This is the butterfly dream made operational: the knowledge base that documents transformation is itself transforming. The circuit is complete when Openflows becomes an instance of what it describes.

### What Peng Is Not

- Not an authority. It mediates; humans interpret and decide.
- Not a replacement for the static site. The site is the record.
- Not locked to any single model or provider. Switching is a first-class feature.
- Not a translator of convenience. The Chinese site should be as carefully maintained as the English site.
- Not finished. Its scope should be revisited as the knowledge base grows and the field changes.
