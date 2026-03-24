---
name: Script ideas backlog
description: Ideas for future scripts to advance and maintain the Openflows knowledge base
type: project
---

## Pending script ideas

- **Link validator** — verify every `id:` in every `links:` frontmatter block refers to a real `currencyId` in the KB. Broken links currently render silently as "missing connection."
- **Coverage analysis** — inspect seen.json for signals that passed screening but were never promoted; surface intentional gaps in KB coverage by topic area.
- **Deferred queue review** — interactive tool to inspect and act on deferred signals from seen.json without waiting for the next scheduled intake run.
- **MCP endpoint** — Cycle 12 on the roadmap. Makes the KB queryable by other agents via Model Context Protocol. Runs on self-hosted server (not Pages Function).
- **Re-evaluation pass** — periodically re-screen entries in seen.json with `decision: skipped` using the current screener, in case standards or context have shifted.
