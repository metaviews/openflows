---
layout: layouts/currency-item.njk
title: "Artificial Organisations"
date: 2026-03-14
currencyType: "circuit"
currencyId: artificial-organisations
abstract: "This circuit maps the emerging approach to multi-agent AI reliability through institutional design — using structural constraints, information compartmentalization, and role specialisation to produce trustworthy collective behaviour without requiring individually aligned agents."
tags:
  - currency
permalink: /currency/circuits/artificial-organisations/
links:
  - id: autonomous-research-accountability
    relation: "the Corroborator/Critic pattern directly instantiates research accountability through structural separation"
  - id: inspectable-agent-operations
    relation: "information compartmentalization makes individual agent operations bounded and verifiable"
  - id: institutional-trust-resilience
    relation: "architectural constraints as a trust mechanism, not individual reliability"
  - id: plumbing-lang
    relation: "Plumbing provides the formal specification layer for encoding organisational protocols between agents"
  - id: william-waites
    relation: "circuit originates in Waites' research on institutional design for multi-agent systems"
mediation:
  tooling: "Human-drafted entry from primary sources"
  use:
    - "reviewed arXiv:2602.13275 (Waites, 2026)"
    - "reviewed leithdocs.com production system as implementation reference"
  humanRole: "full authorship"
  limits: "emerging research area; production evidence currently limited to Leith Document Company's implementation"
lastReviewed: 2026-03-22
---

The dominant approach to AI safety focuses on aligning individual models. The artificial organisations approach focuses on the structure connecting them. William Waites' 2026 paper (arXiv:2602.13275) demonstrates that reliable collective behaviour can emerge from architectural constraints — information asymmetry, role specialisation, and enforced protocol boundaries — even when individual agents are unreliable.

The reference implementation is a three-agent document composition system:
- **Composer** drafts text
- **Corroborator** verifies factual claims with full source access
- **Critic** evaluates argument quality *without* source access

The enforced information asymmetry between Corroborator and Critic is the key structural move. Neither agent can fully satisfy the task alone; the circuit's reliability emerges from their constraint, not their capability. Tested across 474 composition tasks, agents given impossible assignments "progressed from attempted fabrication toward honest refusal with alternative proposals" — a behaviour neither programmed nor individually incentivised.

This loop is now closing in the open source ecosystem. Plumbing (plumbing-lang) provides a typed language for specifying the communication protocols that hold such architectures together. The inspectable-agent-operations circuit provides the observability layer. Autonomous-research-accountability defines the human oversight requirements at the boundary.

The circuit stabilises around a core claim: the unit of trust in multi-agent systems should be the organisation, not the agent. Structural design precedes alignment work. What the agents cannot know shapes what they can produce.
