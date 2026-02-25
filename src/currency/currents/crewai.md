---
layout: layouts/currency-item.njk
title: "CrewAI"
date: 2026-02-25
currencyType: "current"
currencyId: crewai
abstract: "An open-source multi-agent orchestration framework emphasizing role-based coordination and task pipelines."
tags:
  - currency
permalink: /currency/currents/crewai/
links:
  - id: feedback-circuit
    relation: "depends on iterative evaluation and correction patterns represented in"
---

### Signal

[CrewAI](https://github.com/crewaiinc/crewai) frames AI work as coordinated multi-agent execution with explicit task assignment and flow control.

### Context

This reflects a broader shift from single-assistant interaction to structured agent collaboration where sequencing, delegation, and review become first-class concerns.

### Relevance

For Openflows, orchestration frameworks matter because they make coordination logic visible and testable, which is required for safe and reliable automation in shared settings.

### Current State

Active open-source signal in agentic workflow construction.

### Open Questions

- Which failure modes emerge most often in multi-agent handoffs?
- How should teams define minimum oversight for autonomous task chains?
- What testing patterns best distinguish useful autonomy from brittle choreography?

### Connections

- Linked to `feedback-circuit` as the operational loop needed to keep orchestration reliable.
