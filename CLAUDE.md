# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Static site
npm run build          # Clean _site, then Eleventy: src/ → _site/
npm run check:links    # Validate currency links.id references
npm run check:seo      # Validate generated SEO/discovery metadata

# Tests
npm test               # node --test tests/*.test.js

# Server (Fastify dashboard)
npm run server         # Production: node server/index.js
npm run server:dev     # Dev: node --watch server/index.js

# Maintenance
npm run cleanup:drafts             # Prune malformed drafts from the SQLite queue
npm run audit:practitioner-social  # Audit practitioner social profile fields

# Agent scripts (run from repo root)
node scripts/query.js "question"              # Query the KB via OpenRouter
node scripts/intake.js [--sources github,huggingface,brave,opensourceprojects] [--limit 5]
node scripts/synthesize.js [--topic "..."] [--currents id1,id2]
node scripts/translate.js [--id slug] [--type current] [--force]
node scripts/audit.js                         # Quality report → audit/QUALITY.md
node scripts/enrich.js [--fix mediation|links|all] [--id slug]
node scripts/status.js                        # Local dashboard, no API/build needed
node scripts/digest.js [--stdout]             # Peng's editorial briefing
node scripts/queue.js                         # Regenerate drafts/QUEUE.md
node scripts/refresh.js [--limit 10] [--id slug] [--days 7]  # Check stale entries for updates
node scripts/practitioners.js [--limit 3]     # Enrich practitioner entries
node scripts/intake-urls.js                   # One-shot: fetch URL list → generate drafts → queue
node scripts/discover-sources.js              # Propose new sources for the registry
node scripts/promote.js                       # CLI promotion of a queued draft
node scripts/apply-update.js                  # Apply refresh-suggested updates to an entry
node scripts/apply-updates-zh.js              # Same, for Chinese entries

# Deployment (on server)
git pull --rebase
pm2 restart peng
```

## Environment

Copy `.env.example` to `.env`. Required keys: `OPENROUTER_API_KEY`, `OPENROUTER_MODEL`, `FALLBACK_OPENROUTER_MODEL`, `BRAVE_API_KEY`. Optional: `TWITTER_BEARER_TOKEN`, `PORT`, `DB_PATH`, `GIT_USER_NAME`, `GIT_USER_EMAIL`. All scripts use `scripts/lib/openrouter.js` for model calls — model is env-configurable, never hardcoded.

Discord bot (all optional — omit `DISCORD_BOT_TOKEN` to disable): `DISCORD_BOT_TOKEN`, `DISCORD_GUILD_ID` (server ID for slash command registration), `DISCORD_CHANNEL_ID` (notification channel), `DISCORD_AUTHORIZED_USERS` (comma-separated user IDs for write tools and `/trigger`).

## Architecture

**Two stacks, one repo.**

1. **Public site** (`src/` → `_site/`): Eleventy v3 static site hosted on Cloudflare Pages. Build triggered by git push to GitHub. No dynamic logic here.

2. **Admin server** (`server/`): Fastify 5 + node:sqlite (built-in, Node 22+) on self-hosted hardware (Debian Trixie). Exposed at `admin.openflows.org` via Cloudflare Tunnel + Access (email auth). Process manager: PM2 (`peng`). DB at `data/openflows.db`.

**Human-in-the-loop is the core invariant.** Peng (the agent) proposes; humans approve before anything enters `src/`. Drafts live in `drafts/` (gitignored except `seen.json`, `QUEUE.md`, `.gitkeep`). Promotion moves a file from `drafts/` to `src/currency/{type}/` via git commit + push, triggering Cloudflare deploy.

**Cron** (`server/cron.js`) runs all automation:

- `06:00 UTC daily` — `intake --sources github,huggingface,brave,opensourceprojects --limit 10` → `practitioners --limit 3` → `audit` → `commitSeen()` → Discord intake notification with both `runIds` and pending-draft delta
- `08:00 UTC Mon/Wed/Fri` — `synthesize` → `digest` → `commitPerspective()` → Discord digest notification
- `09:00 UTC daily` — `refresh --limit 15 --days 7`

Cron failures are reported via `discord?.notify('error', { type, error })`.

**Discord bot** (`server/discord.js`): optional Peng presence. `initDiscord(db)` returns `{ notify }` or null if `DISCORD_BOT_TOKEN` is absent. Handles mention-based chat (read tools for anyone, write tools for authorized users with button confirmation), slash commands (`/ask`, `/status`, `/queue`, `/trigger`), and automated notifications after cron jobs. Per-channel conversation history capped at 20 messages. `executeToolCall` is called with `{ db }` as a duck-typed fastify object. Notification signatures: `notify('intake', { db, runIds, pendingBefore, pendingAfter })`, `notify('digest', { db })`, `notify('error', { type, error })`.

GitHub Actions are retired. All automation runs from the self-hosted server.

**OpenRouter** handles all AI calls. Never use the Anthropic API directly. Model is configurable per `.env`; `scripts/lib/openrouter.js` is the shared helper (handles env loading, 429 fallback retry). The `xactions` package backs cross-platform social posting via `scripts/lib/xactions-adapter.js`.

**Blog admin** (`server/routes/blog.js`, `server/lib/blog.js`): blog drafts (`drafts.type = 'blog'`) flow through the same queue as currency drafts but promote to Markdown files in `src/blog/` (English) or `src/blog/zh/`. Hero-image upload uses `@fastify/multipart` (registered with a 5 MB / 1-file cap, gracefully disabled if the module isn't installed). Views: `blog-admin.njk`, `blog-edit.njk`.

**Social publishing** (`server/routes/social.js`, `server/lib/social-publisher.js`, `scripts/sources/{twitter,bluesky,mastodon}.js`): the `/social` page composes posts to Twitter/Bluesky/Mastodon using source-registry rows whose `module` is in `SOCIAL_MODULES`. Each post is logged to the `events` table with `type = 'social_post'`. Char limits hardcoded in the route: twitter 280, bluesky 300, mastodon 500.

## Content Schema

All currency entries are Markdown with YAML frontmatter in `src/currency/{currents|circuits|practitioners}/` (English) or `src/currency/zh/{type}/` (Chinese).

**Required frontmatter:**
```yaml
layout: layouts/currency-item.njk
title: ...
date: YYYY-MM-DD
currencyType: current | circuit | practitioner
currencyId: kebab-case-unique-id
tags: [currency]
permalink: /currency/{type}/{id}/
abstract: ...  # strongly preferred
```

**Optional:**
```yaml
links:
  - id: other-currency-id
    relation: "..."
mediation:
  tooling: "..."
  use: ["..."]
  humanRole: "..."
  limits: "..."
```

**Linkage pass is mandatory** for every new entry. Evaluate connections across all three types (currents ↔ circuits ↔ practitioners). If no strong link exists, add a note in the body: `No explicit currency link added yet.`

**Mediation block** required whenever AI materially shaped the content. Chinese entries write mediation in Chinese.

## Bilingual Structure

English at `/`, Chinese at `/zh/`. The `lang: zh` frontmatter field distinguishes entries. Collections are duplicated in `.eleventy.js`: `currency`/`zh_currency`, `currents`/`zh_currents`, etc. UI strings in `src/_data/i18n.json`, keyed by `en`/`zh`. Templates use `{{ i18n[lang or 'en'] }}`.

`src/knowledge-manifest.11ty.js` generates `_site/knowledge-manifest.json` (includes `lang` field and `byLang` counts). **Synthesis (`synthesize.js`) is English-only** — it filters `lang !== 'zh'` before building context.

## Public Discovery and SEO

The static build generates crawler and agent discovery files:

- `src/sitemap.11ty.js` -> `/sitemap.xml` with canonical public URLs, `lastmod`, and bilingual alternates where available.
- `src/robots.11ty.js` -> `/robots.txt`, allowing crawl access and pointing to the sitemap.
- `src/llms.11ty.js` -> `/llms.txt`, a compact map for agents and LLM-mediated retrieval.
- `src/favicon.svg` and `src/site.webmanifest` provide browser/app metadata.

`src/_includes/layouts/base.njk` owns canonical tags, `hreflang`, Open Graph/Twitter metadata, JSON-LD, skip link, and the hidden primary page `<h1>`. Keep new public pages on this layout unless there is a deliberate reason to opt out.

Run `npm run check:seo` after build-facing template or permalink changes. It validates generated HTML for sitemap coverage, canonical tags, descriptions, JSON-LD parseability, and primary headings.

## Dashboard Layout

The admin dashboard (`/`) has three sections:
- **Full-width top**: epistemic window (Ask Peng) — conversation panel with session history, multi-turn, "New" button
- **Left column**: KB status panel · trigger buttons · activity log (runs clickable)
- **Right column**: live log panel (hidden until triggered) · queue-state panel · queue table

## Server Routes and Views

**Page routes** (no prefix):
- `GET /` — Dashboard
- `GET /entries` — Browse KB entries; paginated (50/page default); filter by type/lang; per-page selector (25/50/100); sort by any column; Translate button on untranslated English rows
- `GET /entries/:id?lang=` — Markdown editor; Save & Commit or Delete
- `GET /queue/:id/edit?lang=` — Draft editor; Save / Promote / Reject
- `GET /sources` — Source registry; proposals list; practitioner social audit panel
- `GET /sources/new` · `GET /sources/:id/edit` — Source editor
- `GET /social` — Social composer for Twitter/Bluesky/Mastodon (uses source-registry rows in `SOCIAL_MODULES`)
- `GET /blog-admin` — Blog draft + published-post admin
- `GET /blog-admin/new` · `GET /blog-admin/drafts/:id/edit` — Blog draft editor (with hero-image upload)

**API routes** (`/api/` prefix, registered with `{ prefix: '/api' }`):

- `POST /api/ask` (SSE) — Stream OpenRouter conversation with Peng tool calls; injects manifest + queue + status into system prompt
- `POST /api/ask/confirmation/:token/cancel` — Cancel a pending write-tool confirmation
- `GET /api/queue` — Pending drafts list (htmx-aware)
- `GET /api/queue/state` — Compact queue state for queue-state panel (htmx refresh target)
- `POST /api/queue/:id/promote` · `POST /api/queue/:id/reject` — Draft actions
- `GET /api/runs` — Recent runs list (htmx-aware)
- `GET /api/runs/:id` — Single run detail (JSON)
- `GET /api/runs/:id/stream` (SSE) — Live log stream; serves in-memory buffer for running jobs, stored log for completed ones
- `POST /api/trigger/:type` — Fire a script; allowed types: `intake`, `perspective`, `synthesize`, `digest`, `translate`, `audit`, `enrich`, `refresh`, `discover-sources`
- `GET /api/status` — KB status (htmx-aware)
- `POST /api/entries/:id/save` · `POST /api/entries/:id/delete` — KB entry mutations
- `GET /api/timeline` — Recent activity timeline (htmx-aware)
- `GET /api/conversations` · `GET /api/conversations/:id` — Conversation history
- `GET /api/sources` · `POST /api/sources/save` · `POST /api/sources/:id/remove` · `POST /api/sources/:id/toggle` — Source CRUD
- `GET /api/sources/proposals` · `POST /api/sources/proposals` · `POST /api/sources/proposals/:id/approve` · `POST /api/sources/proposals/:id/reject` — Source proposals
- `POST /api/sources/discover` — Run `discover-sources` script
- `GET /api/sources/practitioner-social/audit` · `POST .../audit/run` · `POST .../audit/apply` — Practitioner social profile enrichment

**Route registration notes**:

- `entries.js` is registered without a prefix; it hard-codes `/api/` in mutation route paths. Don't add a prefix when registering it.
- `sources.js`, `social.js`, and `blog.js` are also registered without a prefix; each handles both page routes and any `/api/*` endpoints internally.
- The server vendors frontend deps under `/vendor/marked/` and `/vendor/dompurify/` from their installed package directories.

Views use Nunjucks (`server/views/`) via `@fastify/view`. htmx handles panel refreshes. Content-type parser for `application/x-www-form-urlencoded` is registered explicitly (required for htmx POST requests).

`server/lib/git.js` wraps all git operations: `promoteEntry`, `commitEdit`, `removeEntry`, `commitPerspective`, `commitSeen`. All pulls use `--autostash`.

`server/lib/runner.js` maintains an in-memory stream registry (`runStreams` map). Each `runScript` call creates a stream entry; stdout and stderr both pipe into it. `getRunStream(runId)` is exported for the SSE endpoint. Streams evict after 15 minutes.

## Peng Tool Call System

`server/lib/peng-tools.js` defines Peng's server-side tools and the execution/confirmation flow.

**Tool sets:**

- **Read tools** (`READ_TOOL_NAMES`): `get_status`, `get_queue`, `get_entry`, `get_draft`, `get_sources`, `get_source_proposals`, `get_practitioner_social_audit` — execute immediately without confirmation.
- **Write tools** (`WRITE_TOOL_NAMES`): `create_draft`, `update_draft`, `promote_draft`, `save_entry`, `trigger_translate`, `propose_source`, `approve_source`, `update_source`, `remove_source`, `apply_practitioner_social_candidate` — require operator confirmation via the dashboard before execution. `create_draft` accepts an optional `sourceUrl` parameter stored in the `drafts.source_url` column.

**Confirmation flow** (`server/routes/ask.js`): When a response includes write tool calls, the server returns a `confirmationRequired` SSE event containing a one-time token (TTL 10 min, stored in `pendingConfirmations` Map). The dashboard shows the proposed action; the operator confirms by resubmitting with `{ confirmation: token }`. The token is consumed on use. `POST /api/ask/confirmation/:token/cancel` aborts a pending confirmation.

**Tool rounds**: `MAX_TOOL_ROUNDS = 4`. Each round: call model → detect tool calls → execute read tools immediately or pause for write confirmation → inject tool results → continue. All confirmed write tool calls are logged to the `events` table with `type = 'confirmed_tool_call'`.

## Instruction Priority

When instructions conflict: **explicit user request > AGENTS.md > PROJECT_INSTRUCTIONS.md > code conventions**.

## Content Style

Technical, civic, dense — no hype, no marketing voice, no blog-post feel. Treat AI as infrastructure. Avoid "what we are not" framing. Claims should be inspectable and operationally specific. For dual-use topics, keep framing governance-oriented and defensive.

## Known Gotchas

- No backticks inside template literals in scripts — caused a syntax error in `translate.js`.
- HTTP headers must be ASCII — em dash in `X-Title` caused a `ByteString` error.
- `practitioners.js` uses the shared `loadEnv` helper, not `require('dotenv')` directly.
- `manifest.js` uses `ensureManifest` which rebuilds `_site/knowledge-manifest.json` if stale; the server does not read `src/` directly.
- Nunjucks `in` operator does not work on JS arrays — pass membership sets as plain objects `{ id: true }` and check with `obj[key]`.
- The live log panel (`#live-log`) is an inline panel in the dashboard right column, not a fixed overlay. `openLog()` sets `display: flex`; `closeLiveLog()` sets `display: none`.
- `trigger.js` pre-creates the run record for single-script triggers so `runId` is available before `setImmediate` fires. For compound types (`intake`, `perspective`), `runId` is `null` in the response.
- `server/index.js` runs `pruneMalformedDrafts(db)` on startup — drafts with bad shape are silently dropped from the queue on every restart. Check the boot log if a draft "disappears."
