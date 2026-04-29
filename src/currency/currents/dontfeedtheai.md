---
layout: layouts/currency-item.njk
title: 'DontFeedTheAI: Privacy Proxy for Claude Code'
date: 2026-04-29
currencyType: current
currencyId: dontfeedtheai
tags:
  - currency
  - privacy
  - security
  - agent-tooling
permalink: /currency/currents/dontfeedtheai/
abstract: A reverse proxy for Claude Code that anonymizes sensitive pentest data before it reaches cloud models, using local Ollama detection and regex safety nets.
links:
  - id: openclaw
    relation: alternative privacy-first agent framework
mediation:
  tooling: Ollama / [local LLM] + regex
  use:
    - fetched GitHub repository page for project description and metrics
    - assessed against existing agent privacy and governance infrastructure signals
  humanRole: review, edit, and approve before publication
  limits: signal content may be incomplete; verify primary sources before publishing
---

### Signal

[DontFeedTheAI](https://github.com/zeroc00I/DontFeedTheAI) · GitHub · 2026-04

### Context

DontFeedTheAI is a reverse proxy positioned between Claude Code (or similar cloud-connected coding agents) and their upstream model providers. Its purpose is to intercept and anonymize sensitive data — IP addresses, hashes, credentials, hostnames, and PII — before it leaves the local environment.

The system uses a dual-layer detection strategy: a local Ollama LLM runs semantic identification of sensitive content, complemented by a regex-based safety net. Each security engagement operates within its own vault, with a self-improving feedback loop to refine detection over time.

### Relevance

This signal intersects with the growing tension between agentic coding workflows and operational security, particularly in penetration testing and red-team contexts where source code, infrastructure details, and credentials must not leave controlled environments. It reflects a pattern of lightweight middleware that patches the privacy gap in cloud-connected agent tooling without requiring upstream model provider cooperation.

### Current State

At 411 stars and 49 forks, the project is early but gaining traction in security-adjacent communities. It targets Claude Code as its primary integration surface, with extensibility for other agent frameworks.

### Open Questions

- Does the dual-layer detection produce meaningful false-positive/false-negative rates in practice?
- How does it handle streaming outputs — does any sensitive data flow in responses?
- Is the feedback loop mechanism documented or open for community contribution?

### Connections

Connects to [openclaw] for operators seeking privacy-first agent frameworks at the runtime level, and [agent-governance-toolkit] for organizational-level governance approaches. Related to [capsule] in the broader sandboxing and isolation landscape.