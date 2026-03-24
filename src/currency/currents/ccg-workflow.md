---
layout: layouts/currency-item.njk
title: CCG Workflow
date: 2026-03-22
currencyType: "current"
currencyId: ccg-workflow
abstract: A Node.js CLI orchestration system routing frontend tasks to Gemini and backend tasks to Codex under Claude Code supervision with patch-based security constraints.
tags:
  - currency
  - orchestration
  - multi-model
  - cli
  - development
permalink: /currency/currents/ccg-workflow/
links:
  - id: multi-agent-coding-orchestration
    relation: "Alternative multi-agent coding orchestration framework utilizing role-based coordination versus model-specific routing"
  - id: paperclip-ai
    relation: "Orchestration layer introducing organizational governance and budget controls to autonomous agent workflows"
mediation:
  tooling: "OpenRouter / qwen/qwen3.5-flash-02-23"
  use:
    - "drafted entry from external signal"
    - "assessed linkage against existing knowledge base"
  humanRole: "review, edit, and approve before publication"
  limits: "signal content may be incomplete; verify primary sources before publishing"
---

### Signal
[CCG Workflow](https://Node.js)

The `ccg-workflow` repository (fengshao1227/ccg-workflow) defines a multi-model collaboration development system implemented as a Node.js CLI. The architecture routes frontend development tasks to the Gemini CLI and backend tasks to the Codex CLI, with Claude Code acting as the orchestrator and code reviewer. The system includes 28 slash commands covering planning, execution, git workflows, and code review. It enforces security by design by restricting external models to patch generation only, requiring Claude to review and apply changes. The workflow integrates OPSX to convert vague requirements into verifiable constraints.
### Context
Current agent development trends show a divergence from single-model monoliths toward specialized model routing. This signal reflects an infrastructure pattern where different model capabilities (Gemini for frontend, Codex for backend, Claude for orchestration) are leveraged via a unified CLI interface. The approach addresses the latency and cost inefficiencies of routing all tasks through a single provider while maintaining a consistent developer experience.

### Relevance
This entry documents a specific implementation of multi-model orchestration that prioritizes security constraints and role separation. It serves as a reference for CLI-based agent workflows that require strict control over code execution and model output. The integration of OPSX for spec-driven development adds a layer of constraint management distinct from standard prompt engineering approaches.

### Current State
The package is published on npm with an MIT license. It requires Node.js 20+ and `claude-code-cli` as dependencies. The system supports zero-config model routing but requires manual installation of specific CLI tools for Codex and Gemini. The repository includes 134 passed tests and supports localization via a README in Simplified Chinese.

### Open Questions
*   How does the OPSX integration handle dynamic requirement changes during active development sessions?
*   What is the fallback behavior if Codex or Gemini CLI endpoints are unavailable?
*   Does the patch review mechanism scale effectively for large repository changes?
*   How does the model routing logic adapt if the underlying model APIs change their capabilities?

### Connections
The `multi-agent-coding-orchestration` entry provides a functional parallel for coordinating specialized agents in software development, though it relies on role-based coordination rather than model-specific routing. `paperclip-ai` offers a contrasting approach to orchestration governance, focusing on organizational structures and budgets rather than technical patch review constraints.