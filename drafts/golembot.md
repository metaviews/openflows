---
layout: layouts/currency-item.njk
title: GolemBot
date: 2026-03-17
currencyType: "current"
currencyId: golembot
abstract: A TypeScript-based agent framework enabling multi-channel deployment (IM, HTTP) with compatibility for 13,000+ OpenClaw skills and major coding assistant runtimes.
tags:
  - currency
  - ai-agent
  - bot-framework
  - openclaw
  - typescript
permalink: /currency/currents/golembot/
links:
  - id: openclaw
    relation: "Compatible with 13,000+ OpenClaw community skills ecosystem"
  - id: copaw
    relation: "Functional overlap in multi-channel personal AI assistant deployment"
mediation:
  tooling: "OpenRouter / qwen/qwen3.5-flash-02-23"
  use:
    - "drafted entry from external signal"
    - "assessed linkage against existing knowledge base"
  humanRole: "review, edit, and approve before publication"
  limits: "signal content may be incomplete; verify primary sources before publishing"
---

### Signal
Source: github
Title: golembot
URL: https://github.com/0xranx/golembot
Date: 2026-03-15
Content: Run Cursor, Claude Code, OpenCode, or Codex with any LLM provider — deploy to IM, HTTP, or your own product. | ai, ai-agent, ai-assistant, bot-framework, chatbot, claude-code, cli, codex, coding-agent, cursor, dingtalk, discord, feishu, lark, llm, opencode, slack, telegram, typescript, wecom

### Context
GolemBot operates as a TypeScript-based agent framework designed to abstract LLM provider selection and channel integration. It allows developers to deploy agent logic across messaging interfaces (Discord, Slack, Telegram, DingTalk, Feishu, WeCom) and HTTP endpoints. The framework positions itself as a runtime layer that can execute workflows from coding assistants like Cursor, Claude Code, and OpenCode, or standard LLM APIs.

### Relevance
The entry represents infrastructure for agentic distribution rather than standalone intelligence. Its significance lies in the explicit integration with the OpenClaw skills ecosystem (13,000+ skills), allowing it to leverage existing modular capabilities without requiring custom implementation. This reduces the friction of deploying agents across heterogeneous communication channels while maintaining provider flexibility.

### Current State
The project is MIT-licensed and requires Node.js >= 18. Documentation is hosted at 0xranx.github.io/golembot. It exposes an npm package (`golembot`) for integration. The repository includes CI workflows and supports both English and Chinese documentation. It functions as a library or CLI tool rather than a managed SaaS platform.

### Open Questions
- What are the specific API contracts for the OpenClaw skill integration?
- How does the framework handle state persistence across different messaging channels?
- What is the maintenance cadence and dependency management strategy for the underlying Node.js ecosystem?
- Is the security model for HTTP endpoints and credential management documented for enterprise deployment?

### Connections
The framework aligns closely with `openclaw` through its direct compatibility with the OpenClaw skills ecosystem, allowing it to utilize the same modular infrastructure. It shares functional territory with `copaw`, which also provides multi-channel support for personal AI assistants across platforms like Discord and Feishu. Unlike managed platforms, GolemBot emphasizes self-hosting and code-level control.