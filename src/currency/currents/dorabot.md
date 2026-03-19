---
layout: layouts/currency-item.njk
title: Dorabot
date: 2026-03-12
currencyType: "current"
currencyId: dorabot
abstract: "A macOS application providing a persistent IDE workspace for autonomous agents with integrated memory, scheduling, and communication-channel automation."
tags:
  - currency
permalink: /currency/currents/dorabot/
links:
  - id: memu
    relation: "Persistent memory and self-learning capabilities align with proactive memory frameworks for always-on agents"
  - id: local-inference-baseline
    relation: "Operates as local desktop infrastructure rather than cloud-dependent SaaS interface"
  - id: operational-literacy-interface
    relation: "IDE-style workspace exposes orchestration structure to support intervention and workflow control"
mediation:
  tooling: "OpenRouter / qwen/qwen3.5-flash-02-23"
  use:
    - "drafted entry from external signal"
    - "assessed linkage against existing knowledge base"
  humanRole: "review, edit, and approve before publication"
  limits: "signal content may be incomplete; verify primary sources before publishing"
lastReviewed: 2026-03-19
---

### Signal
GitHub repository `suitedaces/dorabot` describes a macOS application for always-on AI agents running inside an IDE-style workspace with memory, scheduled tasks, browser use, and access to WhatsApp, Telegram, and Slack. The stack is Electron-based and oriented toward persistent local operation rather than disposable chat sessions.

### Context
Dorabot represents a shift from ephemeral chat interfaces to persistent desktop environments. Unlike cloud-based agent services, it runs locally on macOS, utilizing existing LLM subscriptions (Claude, OpenAI) without requiring proprietary API keys. The tool treats the agent as a persistent process rather than a session-based query, maintaining state across reboots via local memory structures.

### Relevance
This entry signals the maturation of local agent infrastructure. By bundling IDE features, memory, and communication channels into a single desktop application, Dorabot reduces the friction of managing multiple tools (terminal, browser, chat clients) for autonomous workflows. It aligns with the local-inference baseline by normalizing agent runtime on personal hardware, potentially reducing dependency on centralized provider interfaces.

### Current State
Version 0.2.3 as of March 2026.
Platform: macOS only (Electron-based).
Integrations: Claude Code, OpenAI Codex, Slack, Telegram, WhatsApp, browser tooling.
Features:
- File explorer with keyboard navigation.
- Monaco editor with autosave.
- Git panel with staging flows.
- Real PTY terminal with tabs and diff view.
- Persistent memory with full-text search over past conversations.
- Cron jobs and scheduled tasks.
- Personality configuration and daily journals.

### Open Questions
- **Security Model:** How are API keys and communication credentials stored locally? Is encryption at rest implemented for memory files?
- **Memory Persistence:** What mechanism ensures memory integrity across system updates or storage failures?
- **Cross-Platform:** Will the IDE-style workspace expand beyond macOS to Linux or Windows?
- **Agent Autonomy:** To what extent does the agent modify its own code versus executing user-approved scripts?

### Connections
The entry connects to existing infrastructure signals around local runtime and memory management. The IDE workspace layer supports the operational-literacy interface by making agent behavior visible and editable. The memory system parallels proactive memory frameworks designed for always-on agents.

- **memU**: Proactive memory framework for always-on AI agents that anticipates context needs rather than waiting to be queried.
- **local-inference-baseline**: Circuit treating language-model inference as ordinary local infrastructure.
- **operational-literacy-interface**: Circuit centered on exposing structure, supporting intervention, and converting use into durable understanding.
