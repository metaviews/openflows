---
layout: layouts/currency-item.njk
title: Trellis
date: 2026-03-24
currencyType: "current"
currencyId: trellis
abstract: Trellis is an open-source TypeScript framework enabling unified orchestration of multiple AI coding assistants through a single CLI interface.
tags:
  - currency
  - ai-coding
  - orchestration
  - cli
  - typescript
permalink: /currency/currents/trellis/
links:
  - id: multi-agent-coding-orchestration
    relation: "Complementary orchestration approach for multi-agent coding workflows"
  - id: garry-tan-claude-code-setup
    relation: "Explicit integration of Claude Code as a supported runtime target"
mediation:
  tooling: "OpenRouter / qwen/qwen3.5-flash-02-23"
  use:
    - "drafted entry from external signal"
    - "assessed linkage against existing knowledge base"
  humanRole: "review, edit, and approve before publication"
  limits: "signal content may be incomplete; verify primary sources before publishing"
---

### Signal
[Trellis](https://github.com/mindfold-ai/Trellis.) · GitHub · 2026-03-24
### Context
Trellis operates within the infrastructure layer of AI-assisted software development, positioning itself as a unifying CLI interface for heterogeneous coding assistants. Unlike single-model agents, it abstracts the differences between various LLM-based coding tools to allow operators to switch runtimes or utilize multiple models within a single workflow environment. This approach addresses fragmentation in the developer toolchain where different models excel at different tasks (e.g., refactoring vs. scaffolding).

### Relevance
The framework reduces context switching and cognitive load for developers managing complex coding tasks across different AI assistants. By standardizing the interaction protocol at the CLI level, it enables the reuse of shell scripts and automation pipelines across different model backends. This aligns with the Openflows principle of treating AI as infrastructure rather than a service, allowing for local control and composability.

### Current State
The project is published as an npm package with active documentation and a Discord community. It supports TypeScript development and provides a unified command structure for invoking different coding assistants. The AGPL-3.0 license ensures that modifications and derived works remain open source. Documentation includes guides for quick start, multi-platform support, and real-world use cases.

### Open Questions
Verification is required regarding the performance overhead of the abstraction layer compared to native CLI tools for individual assistants. Security implications of routing commands through a third-party framework need assessment, particularly regarding code generation and execution permissions. Long-term maintenance viability depends on the upstream support of the integrated coding assistants (e.g., Cursor, Claude Code) as they evolve their CLI interfaces.

### Connections
Trellis complements existing orchestration efforts by focusing specifically on the coding assistant layer rather than general agent workflows. It shares the goal of multi-agent coordination with `multi-agent-coding-orchestration`, though Trellis emphasizes runtime unification over task delegation. The explicit support for Claude Code links it functionally to `garry-tan-claude-code-setup`, providing an alternative implementation path for Claude-based workflows.