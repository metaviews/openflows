---
layout: layouts/currency-item.njk
title: "Hanzi Browse"
date: 2026-03-28
currencyType: "current"
currencyId: hanzi-browse
abstract: "Hanzi Browse is a Chrome extension enabling AI agents to interact with authenticated local browser sessions through a single tool call for form filling, navigation, and content extraction."
tags:
  - currency
  - browser-automation
  - agent-tooling
  - chrome-extension
permalink: /currency/currents/hanzi-browse/
links:
  - id: lightpanda-browser
    relation: "Alternative browser automation approach for AI agents using headless inference versus authenticated local session"
  - id: scrapling
    relation: "Complementary web automation framework focusing on scraping pipelines versus interactive browser control"
  - id: garry-tan-claude-code-setup
    relation: "Compatible agent runtime environment for Claude Code workflows utilizing Hanzi Browse tooling"
mediation:
  tooling: "OpenRouter / qwen/qwen3.5-flash-02-23"
  use:
    - "drafted entry from external signal"
    - "assessed linkage against existing knowledge base"
  humanRole: "review, edit, and approve before publication"
  limits: "signal content may be incomplete; verify primary sources before publishing"
---

### Signal
[Hanzi Browse](https://github.com/hanzili/hanzi-browse) · github · 2026-03-28
Hanzi Browse provides a Chrome extension interface that allows AI agents to execute tasks within the user's actual signed-in browser environment. The tool enables delegated actions such as clicking, typing, form filling, and reading authenticated pages through a single tool call. It supports integration with major coding assistants including Claude Code, Cursor, Codex, and Gemini CLI, positioning local browser access as a standard agent capability.

### Context
AI agent tooling typically relies on headless browsers or API endpoints, which often fail when encountering authentication requirements or dynamic client-side rendering. Hanzi Browse bridges this gap by exposing the local browser instance to the agent, allowing access to stateful sessions and personalized data without requiring API keys or token sharing. This approach treats the user's browser as a secure, authenticated environment for agent execution rather than an external service.

### Relevance
This entry addresses the infrastructure need for authenticated web interaction in autonomous workflows, a common bottleneck in agent reliability. By leveraging the local browser, it reduces dependency on cloud-based automation services and aligns with the Openflows principle of local inference as baseline infrastructure. It supports the `open-model-interoperability-layer` circuit by standardizing browser access as a tool interface for agentic systems.

### Current State
The project is available as an npm package and a Chrome Web Store extension. It supports multiple agent frameworks and emphasizes a single-tool-call delegation model. Documentation highlights compatibility with major coding assistants and provides Discord support for community integration.

### Open Questions
How does the extension manage permission boundaries between the agent and the authenticated user session? What are the implications for session persistence and state management across agent restarts? Does the implementation expose the full DOM to the agent or restrict access to specific security contexts?

### Connections
The tool functions as a specialized browser automation layer similar to `lightpanda-browser`, though it prioritizes authenticated local state over headless efficiency. It complements `scrapling` by enabling interactive workflows beyond passive data extraction. Integration with `garry-tan-claude-code-setup` demonstrates its utility within established Claude Code development workflows.