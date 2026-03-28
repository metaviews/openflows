# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Static site
npm run build          # Eleventy: src/ → _site/

# Server (Fastify dashboard)
npm run server         # Production: node server/index.js
npm run server:dev     # Dev: node --watch server/index.js

# Agent scripts (run from repo root)
node scripts/query.js "question"              # Query the KB via OpenRouter
node scripts/intake.js [--sources github,brave] [--limit 5]
node scripts/synthesize.js [--topic "..."] [--currents id1,id2]
node scripts/translate.js [--id slug] [--type current] [--force]
node scripts/audit.js                         # Quality report → audit/QUALITY.md
node scripts/enrich.js [--fix mediation|links|all] [--id slug]
node scripts/status.js                        # Local dashboard, no API/build needed
node scripts/digest.js [--stdout]             # Peng's editorial briefing
node scripts/queue.js                         # Regenerate drafts/QUEUE.md

# Deployment (on server)
git pull --rebase
pm2 restart peng
```

## Environment

Copy `.env.example` to `.env`. Required keys: `OPENROUTER_API_KEY`, `OPENROUTER_MODEL`, `FALLBACK_OPENROUTER_MODEL`, `BRAVE_API_KEY`. Optional: `TWITTER_BEARER_TOKEN`, `PORT`, `DB_PATH`, `GIT_USER_NAME`, `GIT_USER_EMAIL`. All scripts use `scripts/lib/openrouter.js` for model calls — model is env-configurable, never hardcoded.

## Architecture

**Two stacks, one repo.**

1. **Public site** (`src/` → `_site/`): Eleventy v3 static site hosted on Cloudflare Pages. Build triggered by git push to GitHub. No dynamic logic here.

2. **Admin server** (`server/`): Fastify 5 + node:sqlite (built-in, Node 22+) on self-hosted hardware (Debian Trixie). Exposed at `admin.openflows.org` via Cloudflare Tunnel + Access (email auth). Process manager: PM2 (`peng`). DB at `data/openflows.db`.

**Human-in-the-loop is the core invariant.** Peng (the agent) proposes; humans approve before anything enters `src/`. Drafts live in `drafts/` (gitignored except `seen.json`, `QUEUE.md`, `.gitkeep`). Promotion moves a file from `drafts/` to `src/currency/{type}/` via git commit + push, triggering Cloudflare deploy.

**Cron** (`server/cron.js`) runs all automation:
- `06:00 UTC daily` — intake → practitioners → audit → commit
- `08:00 UTC Mon/Wed/Fri` — synthesize → digest → commit
- `09:00 UTC daily` — refresh

GitHub Actions are retired. All automation runs from the self-hosted server.

**OpenRouter** handles all AI calls. Never use the Anthropic API directly. Model is configurable per `.env`; `scripts/lib/openrouter.js` is the shared helper (handles env loading, 429 fallback retry).

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

## Server Routes and Views

- `GET /` — Dashboard (Nunjucks + htmx)
- `GET /entries` — Browse KB entries from manifest; filter by type/lang
- `GET /entries/:id?lang=` — Markdown editor; Save & Commit writes file + pushes; Delete removes + pushes
- `GET /queue/:id/edit?lang=` — Draft editor; Promote saves then promotes; Reject marks rejected
- `POST /api/trigger/{type}` — Manually fire intake/synthesize/refresh
- `GET /api/ask` (SSE) — Stream OpenRouter response for dashboard query

Views use Nunjucks (`server/views/`) rendered via `@fastify/view`. htmx handles dynamic interactions without a JS framework. Content-type parser for `application/x-www-form-urlencoded` is registered explicitly (required for htmx POST requests).

`server/lib/git.js` wraps all git operations: `promoteEntry`, `commitEdit`, `removeEntry`, `commitPerspective`, `commitSeen`. All pulls use `--autostash` to handle unstaged changes on server.

## Instruction Priority

When instructions conflict: **explicit user request > AGENTS.md > PROJECT_INSTRUCTIONS.md > code conventions**.

## Content Style

Technical, civic, dense — no hype, no marketing voice, no blog-post feel. Treat AI as infrastructure. Avoid "what we are not" framing. Claims should be inspectable and operationally specific. For dual-use topics, keep framing governance-oriented and defensive.

## Known Gotchas

- No backticks inside template literals in scripts — caused a syntax error in `translate.js`.
- HTTP headers must be ASCII — em dash in `X-Title` caused a `ByteString` error.
- `practitioners.js` uses the shared `loadEnv` helper, not `require('dotenv')` directly.
- `manifest.js` uses `ensureManifest` which rebuilds `_site/knowledge-manifest.json` if stale; the server does not read `src/` directly.
