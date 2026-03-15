---
layout: layouts/currency-item.njk
title: "OpenCode.ai"
date: 2026-02-17
currencyType: "current"
currencyId: opencode-ai
abstract: "OpenCode packages coding-agent workflows as an open-source, provider-flexible runtime across terminal and IDE surfaces."
tags:
  - currency
permalink: /currency/currents/opencode-ai/
mediation:
  tooling: "Product site + repository review"
  use:
    - "identify deployment surfaces"
    - "map governance and control claims"
  humanRole: "Translate tool availability into practical agency criteria"
  limits: "Stated privacy and control guarantees still depend on selected model/provider pathways"
links:
  - id: inspectable-agent-operations
    relation: "contributes inspectable mediation patterns to"
  - id: local-inference-baseline
    relation: "operationalizes local inference as runtime infrastructure"
  - id: operational-literacy-interface
    relation: "enables operational literacy via explicit configuration points"
lastReviewed: 2026-03-15
---

### Signal

[OpenCode](https://opencode.ai/) frames itself as an open-source coding agent usable in terminal, IDE, and desktop contexts, with provider selection and local connection options.

### Context

The core movement is from closed assistant features toward composable runtime control: model choice, tool choice, and execution environment become explicit configuration points.

### Relevance

For Openflows, this aligns with inspectable mediation. Agency improves when teams can trace where model behavior comes from and swap components without replacing the whole workflow.

### Current State

Fast-moving open project with growing adoption signals.

### Open Questions

- Which parts of agent execution remain difficult to audit in real project use?
- How portable are workflows across providers without hidden regressions?
- What minimal policy layer is needed for safe multi-user operation?

### Connections

Linked to `inspectable-agent-operations` as contributing inspectable mediation patterns to the agent operations loop.
Linked to `local-inference-baseline` as operationalizing local inference as runtime infrastructure.
Linked to `operational-literacy-interface` as enabling operational literacy via explicit configuration points.

## Updates

**2026-03-15**: OpenCode now reports 5 million monthly developers and 120,000 GitHub stars, quantifying its previously vague adoption signals. The platform has launched a new Zen curated model hub and expanded desktop beta availability across macOS, Windows, and Linux. These developments mark a transition from early-stage growth to established operational scale.