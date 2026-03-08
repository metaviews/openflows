# Openflows / 开流

A bilingual knowledge base documenting the open source AI ecosystem — maintained by **Peng (鵬)**, an agent named from Zhuangzi's *Inner Chapters*.

**Live site:** [openflows.org](https://openflows.org) · [中文版](https://openflows.org/zh/)
**Knowledge base (JSON):** [openflows.org/knowledge-manifest.json](https://openflows.org/knowledge-manifest.json)

---

## What it is

Openflows tracks three forms of currency in the open source AI ecosystem:

- **Currents (流)** — individual tools, projects, models, and signals
- **Circuits (回路)** — synthesized patterns connecting multiple Currents into a recognized loop or infrastructure layer
- **Practitioners (修行者)** — key figures who have shaped the field through sustained practice

All content exists in English and Simplified Chinese (简体中文). English at `/`, Chinese at `/zh/`.

## The agent: Peng (鵬)

Peng is named from the opening passage of the Zhuangzi. Kun — a fish of unknowable depth — transforms into Peng, a bird of such scale that its wings span the sky. Peng rises on what is already moving and, from that elevation, patterns become visible that are invisible at ground level.

Peng's operating principle is *wu wei* (無為): effortless action that follows the natural grain of things. It monitors signals, drafts entries, synthesizes patterns, and translates across languages — proposing rather than publishing, with human review at every threshold.

**Peng does not publish autonomously. All entries require human approval before entering `src/`.**

## For agents and developers

The knowledge base is available in structured JSON, rebuilt on every deploy:

```
GET https://openflows.org/knowledge-manifest.json
```

Each entry includes: `title`, `currencyId`, `currencyType`, `lang`, `date`, `abstract`, `links`, `permalink`, and rendered body HTML. The `byLang` field gives a count by language.

RSS and JSON feeds are also available at `/currency/feed.xml` and `/currency/feed.json`.

## How it runs

| Script | Purpose |
|---|---|
| `node scripts/intake.js` | Fetch signals from GitHub, HuggingFace, Brave; screen and draft new Currents |
| `node scripts/synthesize.js` | Draft a new Circuit from existing Currents |
| `node scripts/translate.js` | Produce Chinese drafts of entries for review |
| `node scripts/query.js "..."` | Query the knowledge base via OpenRouter |
| `node scripts/queue.js` | Generate `drafts/QUEUE.md` — summary of pending drafts |
| `node scripts/audit.js` | Scan knowledge base quality; report to `audit/QUALITY.md` |
| `node scripts/enrich.js --fix mediation` | Add mediation blocks to circuits; drafts to `drafts/enriched/` |
| `node scripts/enrich.js --fix links` | Suggest circuit links for unlinked currents |
| `node scripts/status.js` | Local dashboard: pending drafts, stale drafts, KB counts, audit state |
| `node scripts/digest.js` | Peng writes a short editorial briefing on current flow and pending review items |

All scripts require `OPENROUTER_API_KEY` in `.env`. See `.env.example`. `FALLBACK_OPENROUTER_MODEL` is optional — used when the primary model hits a rate limit.

Two automated workflows run via GitHub Actions:
- **`peng-intake.yml`** — daily at 06:00 UTC: intake → audit → queue → PR with new drafts
- **`peng-perspective.yml`** — Monday, Wednesday, Friday at 08:00 UTC: synthesize → digest → PR with Peng's editorial briefing as the PR body

## Stack

- [Eleventy](https://www.11ty.dev/) (v3) — static site generator
- [OpenRouter](https://openrouter.ai/) — model-agnostic API layer for all AI calls
- [Cloudflare Pages](https://pages.cloudflare.com/) — hosting and deployment
- GitHub Actions — scheduled intake and pull request automation

## Operator

Openflows is operated by [Metaviews](https://metaviews.ca).
