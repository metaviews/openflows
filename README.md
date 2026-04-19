# Openflows / 开流

A bilingual knowledge base documenting the open source AI ecosystem — maintained by **Peng (鵬)**, an agent named from Zhuangzi's *Inner Chapters*.

**Live site:** [openflows.org](https://openflows.org) · [中文版](https://openflows.org/zh/)
**Knowledge base (JSON):** [openflows.org/knowledge-manifest.json](https://openflows.org/knowledge-manifest.json)
**Agent map:** [openflows.org/llms.txt](https://openflows.org/llms.txt)

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

Each entry includes: `title`, `currencyId`, `currencyType`, `lang`, `date`, `abstract`, `links`, `permalink`, absolute `url`, and rendered body HTML. The `byLang` field gives a count by language.

Agent and crawler discovery surfaces are also generated on every build:

- `/llms.txt` — compact map for agents and LLM-mediated retrieval
- `/sitemap.xml` — canonical public URL map with bilingual alternates where available
- `/robots.txt` — crawler policy and sitemap pointer
- `/currency/search-index.json` — compact public search index
- `/currency/feed.xml` and `/currency/feed.json` — RSS and JSON feeds

## How it runs

| Script | Purpose |
|---|---|
| `node scripts/intake.js` | Fetch signals from enabled `scripts/intake-sources.json` sources; screen and draft new Currents |
| `node scripts/discover-sources.js` | Ask Peng to propose inactive intake sources for dashboard review |
| `node scripts/synthesize.js` | Draft a new Circuit from existing Currents |
| `node scripts/translate.js` | Produce Chinese drafts of entries for review |
| `node scripts/query.js "..."` | Query the knowledge base via OpenRouter |
| `node scripts/queue.js` | Generate `drafts/QUEUE.md` — summary of pending drafts |
| `node scripts/audit.js` | Scan knowledge base quality; report to `audit/QUALITY.md` |
| `npm run audit:practitioner-social` | Report missing/candidate Practitioner social profile metadata |
| `node scripts/enrich.js --fix mediation` | Add mediation blocks to circuits; drafts to `drafts/enriched/` |
| `node scripts/enrich.js --fix links` | Suggest circuit links for unlinked currents |
| `node scripts/status.js` | Local dashboard: pending drafts, stale drafts, KB counts, audit state |
| `node scripts/digest.js` | Peng writes a short editorial briefing on current flow and pending review items |
| `npm run check:links` | Validate `links.id` references against known `currencyId`s |
| `npm run check:seo` | Validate built public HTML for sitemap coverage, canonical tags, descriptions, JSON-LD, and primary headings |

All scripts require `OPENROUTER_API_KEY` in `.env`. See `.env.example`. `FALLBACK_OPENROUTER_MODEL` is optional — used when the primary model hits a rate limit.

Social intake sources are intended to remain disabled until their accounts and credentials are deliberately configured. Bluesky uses public AppView APIs, Mastodon uses public instance APIs with optional `MASTODON_ACCESS_TOKEN`, and X/Twitter uses XActions through read-only scraper calls. The `practitioner-social` source tracks only verified `socialProfiles` metadata on Practitioner entries; the dashboard Sources page can run the practitioner social audit and apply selected candidates after confirmation. XActions supports broader automation; Openflows only calls search/profile tweet collection paths. Operators are responsible for complying with X/Twitter terms, should review XActions licensing before production use, and should keep XActions session values such as `XACTIONS_AUTH_TOKEN` and `XACTIONS_USER_DATA_DIR` outside git. On local Windows/Node 24 installs, `npm install --ignore-scripts` avoids native/browser postinstall work from XActions' dependency graph. If unconfigured social sources are enabled in `scripts/intake-sources.json`, the Cycle 13/14 tests that assert disabled defaults will fail until the registry is corrected or the tests are updated for the new intended default.

Automated workflows run via `server/cron.js` on the self-hosted server:
- **intake** — daily at 06:00 UTC: intake → audit → queue
- **perspective** — Monday, Wednesday, Friday at 08:00 UTC: synthesize → digest
- **refresh** — daily at 09:00 UTC

## Dashboard

Peng's admin dashboard runs at `https://admin.openflows.org`, gated behind Cloudflare Access. It provides queue management, run history, trigger controls, source management, and an epistemic window for querying Peng directly.

The server runs on self-hosted hardware (Debian Trixie), exposed via Cloudflare Tunnel, managed by PM2. See `server/` for the Fastify application.

## Roadmap

The current development sequence after the public UX pass is:

- **Cycle 13: Sources** — implemented: manage tracked intake sources directly from the dashboard and let Peng propose inactive sources for human approval.
- **Cycle 14: Social media integration** — implemented: disabled-by-default intake from Bluesky, Mastodon, and X/Twitter via XActions.
- **Cycle 14B: Public discoverability** — implemented: sitemap, robots, `llms.txt`, canonical/hreflang tags, structured data, favicon/manifest, and SEO validation.
- **Cycle 15: Public conversation interface** — expose read-only knowledge-base querying on the public site.
- **Cycle 16: MCP layer** — expose Peng's tools and knowledge manifest through Model Context Protocol.

## Stack

- [Eleventy](https://www.11ty.dev/) (v3) — static site generator
- [OpenRouter](https://openrouter.ai/) — model-agnostic API layer for all AI calls
- [Cloudflare Pages](https://pages.cloudflare.com/) — hosting and deployment
- [Cloudflare Access](https://developers.cloudflare.com/cloudflare-one/applications/configure-apps/) + Tunnel — admin auth and server exposure
- Fastify 5 + node:sqlite + node-cron — self-hosted agent server
- [XActions](https://github.com/nirholas/XActions) — read-only X/Twitter intake adapter; use responsibly and comply with X/Twitter terms

## Operator

Openflows is operated by [Metaviews](https://metaviews.ca).
