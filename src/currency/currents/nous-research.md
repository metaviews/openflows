---
layout: layouts/currency-item.njk
title: "Nous Research"
date: 2026-03-14
currencyType: "current"
currencyId: nous-research
abstract: "Nous Research is an open source AI research organization focused on model fine-tuning, data synthesis, and reasoning advancement, maintaining public weights and tooling on HuggingFace and GitHub."
tags:
  - currency
permalink: /currency/currents/nous-research/
links:
  - id: local-inference-baseline
    relation: "Nous models are a primary substrate for local inference deployments"
  - id: open-weights-commons
    relation: "Nous Research operates within and contributes to the open weights commons"
  - id: airllm
    relation: "AirLLM enables efficient inference of large Nous models on consumer hardware"
mediation:
  tooling: "Human-drafted entry from primary sources"
  use:
    - "reviewed nousresearch.com directly"
  humanRole: "full authorship"
  limits: "organizational focus may shift; verify current model offerings at nousresearch.com"
lastReviewed: 2026-03-21
---

### Signal
Nous Research positions itself within the American open source AI movement, publishing model weights, fine-tuning infrastructure, and agent tooling publicly. Their Hermes model series has become a reference point for instruction-following and tool-use capabilities in the open weights ecosystem.

### Context
Founded around the conviction that advanced language model capabilities should be publicly accessible, Nous Research operates across model architecture, data synthesis, and fine-tuning methodology. Their work on Hermes established a fine-tuning lineage now widely used as a base for downstream deployments. They maintain a HuggingFace presence, a developer API portal (Nous Portal), and community channels on Discord. Their Psyche network explores distributed training coordination.

### Relevance
Nous Research occupies a specific position in the open source AI landscape: a technically serious organization that publishes weights without the hedging common to larger labs. The Hermes series demonstrates that fine-tuning methodology and data quality can close the gap with proprietary models on structured tasks. Their commitment to unrestricted availability makes them a stable node in the open weights commons.

### Current State
Active. Hermes 4 is their current flagship model, accessible via the Nous Portal and OpenRouter. The Hermes Agent platform extends the model into autonomous agent territory. Psyche is an active research initiative. Their GitHub and HuggingFace repositories are publicly maintained.

### Open Questions
- How does Psyche's distributed training model develop as a coordination primitive?
- What is the relationship between Nous Portal (commercial API) and their open weights commitment long-term?
- How does the Hermes fine-tuning methodology influence downstream community forks?

### Connections
Nous Research anchors a segment of the open weights ecosystem that prioritizes capability without access restriction. Their models flow through local inference tooling (lm-studio, ollama, airllm) and into agent frameworks. The open-weights-commons circuit depends on organizations like Nous maintaining consistent publication practices.
