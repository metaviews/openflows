---
layout: layouts/currency-item.njk
title: "Large-scale online deanonymization with LLMs"
date: 2026-02-24
currencyType: "current"
currencyId: deanonymization-llms
abstract: "A 2026 research signal showing LLM-driven pipelines can re-identify pseudonymous users from unstructured text at scale."
tags:
  - currency
permalink: /currency/currents/deanonymization-llms/
links:
  - id: pseudonymity-collapse-response
    relation: "consolidates into"
  - id: signal-org
    relation: "tightens threat assumptions around pseudonymous communication in"
---

### Signal

The paper [Large-scale online deanonymization with LLMs](https://arxiv.org/abs/2602.16800) reports that LLM-based pipelines can match pseudonymous online identities across datasets using raw text alone, with strong precision-recall performance against classical baselines.

### Context

The core shift is methodological. Earlier deanonymization approaches often depended on structured data and hand-engineered features; this work uses model-assisted feature extraction, candidate retrieval, and verification directly on unstructured content.

### Relevance

For Openflows, this is a high-importance privacy and governance current. If pseudonymous traces can be linked at scale, communication safety, civic organizing, and platform trust models need stronger default protections.

### Current State

Newly published research signal (submitted February 18, 2026) with immediate threat-model implications.

### Open Questions

- Which practical defenses most reduce cross-platform linkability without collapsing usability?
- How should platforms update privacy guidance for users relying on pseudonymity?
- What evaluation standards should separate legitimate identity resolution from abusive deanonymization tooling?

### Connections

- Linked to `pseudonymity-collapse-response` as the implications circuit.
- Linked to `signal-org` as directly affected communication infrastructure.
