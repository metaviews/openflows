---
layout: layouts/currency-item.njk
title: "Plumbing"
date: 2026-03-14
currencyType: "current"
currencyId: plumbing-lang
abstract: "Plumbing is a typed language for specifying multi-agent communication protocols using session types, with a compiler that validates agent graph well-formedness before execution and an MCP server for runtime integration."
tags:
  - currency
permalink: /currency/currents/plumbing-lang/
links:
  - id: inspectable-agent-operations
    relation: "compile-time validation of agent graphs directly addresses the inspectability requirement"
  - id: institutional-trust-resilience
    relation: "formal protocol specification provides structural guarantees independent of individual agent reliability"
  - id: mcp-google-map
    relation: "Plumbing ships an MCP server, operating within the same protocol layer as MCP implementations"
mediation:
  tooling: "Human-drafted entry from primary sources"
  use:
    - "reviewed leithdocs.com/ldc/documents/outgoing/plumbing/release.md directly"
  humanRole: "full authorship"
  limits: "first public release, March 2026; research and educational use; commercial licensing available on request"
---

### Signal
Plumbing is a typed programming language for describing how AI agents connect and communicate. Its compiler validates agent network configurations before execution — ensuring agent graphs are well-formed before they run. An MCP server is included. First public release March 2026, backed by peer-reviewed research (arXiv:2602.13275).

### Context
Developed by Leith Document Company Limited (Edinburgh), Plumbing applies session type theory to multi-agent AI coordination. Session types are a formal method for specifying communication protocols: they define what messages can be sent and received at each point in an interaction, and the compiler can verify that an agent network satisfies its protocol before any execution occurs. The companion arXiv paper demonstrates a three-agent composition engine (Composer, Corroborator, Critic) with enforced information asymmetry — structural constraints that produce reliable collective behaviour without requiring individual agent alignment.

### Relevance
Most agent frameworks treat coordination as a runtime concern — you discover failures when they happen. Plumbing treats coordination as a compile-time concern — you verify correctness before execution. This is a qualitative shift in how agent reliability is approached. The session type foundation is rigorous and well-understood in distributed systems; applying it to LLM-based agents is a meaningful extension of formal methods into the AI ecosystem.

### Current State
First public release, March 2026. Available for research and educational purposes. The Leith Document Company operates a production document system built on the same architectural principles described in the companion paper.

### Open Questions
- What classes of agent coordination failures does the session type system catch vs. miss?
- How does Plumbing handle dynamic agent topologies where the graph changes at runtime?
- What is the adoption pathway for teams currently using informal coordination approaches?

### Connections
Plumbing provides the formal specification layer that the inspectable-agent-operations circuit requires but has not previously had a concrete tool for. It connects to institutional-trust-resilience through the principle that structural design — not individual agent reliability — is the appropriate foundation for trustworthy multi-agent systems.
