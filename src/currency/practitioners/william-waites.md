---
layout: layouts/currency-item.njk
title: "William Waites"
date: 2026-03-14
currencyType: "practitioner"
currencyId: william-waites
abstract: "William Waites is a researcher and operator developing formal methods for multi-agent AI coordination, author of the Artificial Organisations framework and creator of the Plumbing typed language for agent protocol specification."
tags:
  - currency
permalink: /currency/practitioners/william-waites/
links:
  - id: plumbing-lang
    relation: "creator of the Plumbing typed language for agent coordination"
  - id: artificial-organisations
    relation: "originating researcher of the institutional design approach to multi-agent reliability"
mediation:
  tooling: "Human-drafted entry from primary sources"
  use:
    - "reviewed arXiv:2602.13275 and leithdocs.com"
  humanRole: "full authorship"
  limits: "limited public biographical information; entry focuses on documented work"
---

### Signal
William Waites works at the intersection of formal methods and multi-agent AI systems. His 2026 paper "Artificial Organisations" (arXiv:2602.13275) proposes institutional design — structural constraints and information compartmentalization — as the appropriate foundation for reliable multi-agent behaviour. He is the creator of the Plumbing typed language and is associated with Leith Document Company Limited, a Scottish firm that operates a production multi-agent document system built on the same architectural principles.

### Context
The operator pattern Waites represents is unusual in the current AI ecosystem: bringing formal methods (session types, type theory) to bear on agent coordination problems that most practitioners address informally. Plumbing implements session types — a well-established technique from distributed systems — for specifying protocols between AI agents, with compile-time verification of agent graph well-formedness. The companion production system at Leith Document Company demonstrates that these methods are not merely theoretical.

### Relevance
Waites models a rigorous, structurally-grounded approach to multi-agent AI reliability at a moment when the field is producing frameworks faster than it is producing correctness guarantees. The institutional design thesis — that the unit of trust should be the organisation, not the agent — is a coherent alternative to the dominant alignment-first paradigm and is directly implementable with existing tools.

### Current State
Active researcher and operator. Leith Document Company is operational. Plumbing is in first public release (March 2026). The arXiv paper is available for citation.

### Open Questions
- How does the institutional design approach scale beyond three-agent systems?
- What is the relationship between session type verification and runtime failures not captured at compile time?
- How does the Leith Document Company production system evolve as the Plumbing language matures?

### Connections
Waites is the practitioner most directly connected to the artificial-organisations circuit. His dual role as researcher and operator — building the formal tools and running production systems on them — distinguishes him from purely theoretical contributions to the multi-agent reliability question.
