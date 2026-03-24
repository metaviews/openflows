---
layout: layouts/currency-item.njk
title: "Harrison Chase"
date: 2026-03-24
currencyType: "practitioner"
currencyId: harrison-chase
abstract: "Harrison Chase co-created LangChain, the open-source framework that first made large language model chaining and tool-use accessible at scale, seeding the architecture patterns that now underlie most agentic AI development."
tags:
  - currency
permalink: /currency/practitioners/harrison-chase/
links:
  - id: open-source-ai-agent-framework-landscape-2026
    relation: "LangChain is the reference point against which the 2026 agent framework landscape is measured"
  - id: deerflow
    relation: "built on LangGraph, Chase's successor framework for graph-based agent orchestration"
  - id: openclaw
    relation: "agentic framework that emerged from the same wave LangChain initiated"
  - id: artificial-organisations
    relation: "multi-agent organisational patterns LangChain's architecture made expressible"
mediation:
  tooling: "human draft"
  use:
    - "entry written directly without AI drafting"
  humanRole: "full authorship"
  limits: "practitioner entries require editorial judgment; this entry reflects knowledge as of 2026-03-24"
---

### Signal
[Harrison Chase — LangChain](https://github.com/hwchase17) · GitHub · 2026-03-24

Co-founder and CEO of LangChain. Created the LangChain Python library in October 2022, which became the first widely-adopted framework for chaining language model calls with tools, memory, and agents. Subsequently developed LangGraph for stateful, graph-based agent orchestration.

### Context

Chase released LangChain at a moment when practitioners had no shared vocabulary or infrastructure for connecting LLMs to tools and data. The framework introduced the abstractions — chains, agents, tools, memory — that became the default mental model for agentic AI development. By the time competing frameworks appeared, LangChain had established the category. Its GitHub repository accumulated over 90,000 stars within two years of release.

The follow-on framework LangGraph reoriented the model from linear chains to directed graphs, enabling persistent state and cyclic workflows. This shift anticipated the architectural direction the field was moving: agents that loop, reflect, and branch rather than execute once and terminate.

### Relevance

For Openflows, Chase represents the practitioner who named the problem. The language of "chains," "agents," and "tools" that runs through the KB — and through the broader ecosystem — descends in significant part from LangChain's API design. Whether a framework is built on LangChain, integrates with it, or explicitly positions itself against it, Chase's work set the coordinates.

The tension in his legacy is also instructive: LangChain has been criticised for complexity and abstraction overhead, and a generation of "anti-LangChain" frameworks (lighter, lower-level, more explicit) emerged partly in response. The field's current preference for minimal orchestration is partly a correction to the pattern he established.

### Current State

Active as CEO of LangChain Inc., which maintains the open-source libraries and operates LangSmith (observability) and LangGraph Cloud (hosted graph execution). The company has raised significant venture funding but the core libraries remain open source under MIT license.

### Open Questions

- As minimal-abstraction frameworks gain preference, does the LangChain architecture remain a reference point or become a cautionary example?
- How does LangGraph's graph model compare to emerging alternatives for long-horizon agent tasks?
- What does the LangSmith observability model reveal about production agent failure patterns?

### Connections

- Linked to `open-source-ai-agent-framework-landscape-2026` as the framework against which the 2026 generation is measured.
- Linked to `deerflow` as a project built on LangGraph.
- Linked to `artificial-organisations` as the multi-agent coordination patterns LangChain's architecture made expressible.
