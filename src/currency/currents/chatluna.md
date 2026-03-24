---
layout: layouts/currency-item.njk
title: ChatLuna
date: 2026-03-14
currencyType: "current"
currencyId: chatluna
abstract: ChatLuna is a TypeScript-based Koishi plugin enabling multi-model LLM integration with extensible output formats and session management for chatbot deployments.
tags:
  - currency
  - bot
  - koishi
  - llm
  - plugin
permalink: /currency/currents/chatluna/
links:
  - id: sdcb-chats
    relation: "aggregates model providers for chat interface"
  - id: librechat
    relation: "multi-model chat interface aggregation"
  - id: memu
    relation: "proactive memory framework"
mediation:
  tooling: "OpenRouter / qwen/qwen3.5-flash-02-23"
  use:
    - "drafted entry from external signal"
    - "assessed linkage against existing knowledge base"
  humanRole: "review, edit, and approve before publication"
  limits: "signal content may be incomplete; verify primary sources before publishing"
lastReviewed: 2026-03-21
---

### Signal
[chatluna](https://github.com/ChatLunaLab/chatluna) · GitHub · 2026-03-14

Multi-platform model integration, extensible, various output formats, LLM chat bot plugin.
### Context
ChatLuna operates as a plugin within the Koishi framework, designed to facilitate multi-model LLM access through bot interfaces. It supports text, voice, and image outputs, with a focus on extensibility via LangChain and Koishi API. The project provides session management, rate limiting, and content auditing capabilities.

### Relevance
Provides infrastructure for deploying multi-model chat interfaces with session management and memory extensions. Supports diverse model providers including Qwen, GPT, and DeepSeek. Enables structured output formats and agent mode execution within a plugin architecture.

### Current State
Version 1.0 stable released. Development is slow, preparing for v2. Supports long-memory extension, content auditing, and rate limiting. Documentation available in Chinese, English, and Japanese.

### Open Questions
Maintenance cadence for v2 roadmap. Scope of long-memory persistence across sessions. Integration depth with MCP clients. Reliance on external censor services for content moderation.

### Connections
- sdcb-chats: Aggregates model providers for chat interface
- librechat: Multi-model chat interface aggregation
- memu: Proactive memory framework