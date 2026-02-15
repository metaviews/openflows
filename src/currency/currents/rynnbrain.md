---
layout: layouts/currency-item.njk
title: "RynnBrain"
date: 2026-02-15
currencyType: "current"
currencyId: rynnbrain
abstract: "Alibaba DAMO Academy's open embodied foundation model family signals a stronger open route from multimodal perception to grounded robot planning."
tags:
  - currency
permalink: /currency/currents/rynnbrain/
links:
  - id: local-inference-baseline
    relation: "extends the baseline from local language inference toward embodied physical-world reasoning"
---

### Signal

[RynnBrain](https://alibaba-damo-academy.github.io/RynnBrain.github.io/) presents an open embodied foundation model family for physical-world understanding, localization, reasoning, and task planning.

### Context

The public release includes dense and MoE variants (2B, 8B, 30B-A3B) plus specialized derivatives for planning (`RynnBrain-Plan`), navigation (`RynnBrain-Nav`), and spatial reasoning (`RynnBrain-CoP`). The official GitHub release log marks code and checkpoints on February 9, 2026, and the technical report on February 15, 2026.

### Relevance

For Openflows, this is a shift from language-only model utility toward embodied cognition loops. The center of gravity moves from text interpretation to situated action planning in real environments.

### Current State

Newly released and rapidly forming as an open robotics foundation stack.

### Open Questions

- How much of benchmark performance transfers to reliable, low-friction deployment in uncontrolled physical settings?
- Which planning abstractions remain inspectable when integrated with downstream VLA policies?
- What operating profile (compute, latency, memory) is realistic for local and edge deployments?

### Connections

- Linked to `local-inference-baseline` as a downstream expansion from local inference into embodied execution.
