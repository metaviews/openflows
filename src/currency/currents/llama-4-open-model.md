---
layout: layouts/currency-item.njk
title: Llama 4 Open Model Family
date: 2026-03-07
currencyType: "current"
currencyId: llama-4-open-model
abstract: Meta releases Llama 4 as a mixture-of-models family with Scout and Maverick configurations, extending multilingual support across eight additional languages.
tags:
  - currency
  - foundation-model
  - open-weights
permalink: /currency/currents/llama-4-open-model/
links:
  - id: open-weights-commons
    relation: "foundational infrastructure for open model circulation"
  - id: ollama
    relation: "primary local runtime for running these model weights on personal hardware"
  - id: thomas-wolf
    relation: "key operator in open model weights distribution via Hugging Face"
mediation:
  tooling: "OpenRouter / qwen/qwen3.5-flash-02-23"
  use:
    - "drafted entry from external signal"
    - "assessed linkage against existing knowledge base"
  humanRole: "review, edit, and approve before publication"
  limits: "signal sourced from secondary aggregator (Exploding Topics), not Meta directly; verify weights availability and licensing against official Meta release before publishing"
lastReviewed: 2026-03-15
---

### Signal
Source signal from Exploding Topics (2026-03-06) identifies Llama 4 as an active large language model family; Hugging Face’s [Llama 4 release note](https://huggingface.co/blog/llama4-release) provides an accessible weights-distribution reference. The entry specifies a mixture-of-models architecture including Llama 4 Scout (~109B total) and Llama 4 Maverick (~400B total). Meta has simultaneously expanded multilingual capabilities with support for eight additional languages beyond prior iterations.

### Context
Llama 4 represents the continuation of Meta's open weights strategy, following Llama 2 and Llama 3 trajectories. The architecture shift toward mixture-of-experts (MoE) balances parameter count against computational efficiency, a pattern established by concurrent industry developments. The model functions as infrastructure for downstream applications rather than an end-user product.

### Relevance
This entry anchors the current state of open foundation models within the Openflows knowledge base. It defines the baseline for local inference requirements and multi-lingual capabilities available to independent developers. The release impacts the operational boundaries of the open weights ecosystem and local compute thresholds.

### Current State
The family functions as a base model layer available for integration. Scout variant targets general efficiency with ~109B parameters while Maverick targets complex reasoning tasks with ~400B parameters. Multilingual support covers the eight new languages identified in the signal, expanding the operational scope for global deployment patterns.

### Open Questions
The verification status of the public weights release cadence remains pending compared to internal announcements. Licensing terms for the Maverick variant require clarification regarding commercial and research usage boundaries. Actual benchmark performance for the Scout configuration against parameter count remains undocumented in open repositories.

### Connections

- Linked to `open-weights-commons` as a core foundation model release sustaining the open model circulation loop.
- Linked to `ollama` as a primary local runtime for pulling and serving these weights on personal hardware.
- Linked to `thomas-wolf` as the key operator making frontier weights accessible and redistributable via the Hugging Face ecosystem.
