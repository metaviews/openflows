---
layout: layouts/currency-item.njk
title: "gmickel Claude Marketplace"
date: 2026-03-22
currencyType: "current"
currencyId: gmickel-claude-marketplace
abstract: "A GitHub-hosted plugin marketplace extending Claude Code with autonomous workflow patterns, multi-model review gates, and receipt-based gating for reliable AI coding execution."
tags:
  - currency
permalink: /currency/currents/gmickel-claude-marketplace/
links:
  - id: anthropic-cybersecurity-skills
    relation: "Compatible with Claude Code for skill integration"
  - id: multi-agent-coding-orchestration
    relation: "Parallel approach to coordinating specialized coding agents"
  - id: openclaw
    relation: "Comparative agent framework for inspectable workflows"
mediation:
  tooling: "OpenRouter / qwen/qwen3.5-flash-02-23"
  use:
    - "drafted entry from external signal"
    - "assessed linkage against existing knowledge base"
  humanRole: "review, edit, and approve before publication"
  limits: "signal content may be incomplete; verify primary sources before publishing"
---

### Signal
[gmickel Claude Marketplace](https://github.com/gmickel/gmickel-claude-marketplace) · 2026-03-22

GitHub repository `gmickel/gmickel-claude-marketplace` published 2026-03-22. Provides a collection of plugins for Claude Code focused on reliable AI coding workflows. Key components include Flow-Next for plan-first execution, Ralph autonomous mode for overnight coding with fresh context, and receipt-based gating to prevent drift. Compatible with Factory Droid runtime.
### Context
Claude Code is an autonomous coding interface that operates via command-line and IDE integration. This marketplace extends the base capabilities by introducing structured workflow plugins rather than ad-hoc prompting. The infrastructure shifts from single-turn interaction to multi-step orchestration with built-in review gates and state management.

### Relevance
Standard coding agents often suffer from context drift and lack of execution verification. This entry addresses reliability through receipt-based gating and cross-model review gates (RepoPrompt/Codex). It represents a shift toward treating AI coding agents as production-grade infrastructure requiring explicit workflow constraints and audit trails.

### Current State
The primary plugin set includes Flow-Next (v0.26.1) which enforces plan-first workflows before execution. Ralph mode enables autonomous overnight operation with automatic task blocking if stuck. Cross-platform reviews allow macOS (RepoPrompt) or generic OS (Codex CLI) validation of generated code. The system supports Epic-completion review gates to catch requirement gaps before task closure.

### Open Questions
1. Long-term maintenance of the plugin ecosystem independent of the author.
2. Security implications of overnight autonomous execution modes with elevated permissions.
3. Comparison of drift prevention mechanisms against other agent frameworks like OpenClaw or AutoGen.
4. Integration depth with existing CI/CD pipelines beyond local repository validation.

### Connections
- **anthropic-cybersecurity-skills**: Compatible with Claude Code for skill integration, indicating shared runtime constraints and API surface.
- **multi-agent-coding-orchestration**: Parallel approach to coordinating specialized coding agents, though this entry focuses on single-agent workflow depth rather than swarm coordination.
- **openclaw**: Comparative agent framework for inspectable workflows, offering a contrast between marketplace plugin architecture and monolithic framework design.