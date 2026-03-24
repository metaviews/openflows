---
layout: layouts/currency-item.njk
title: AionUi
date: 2026-03-16
currencyType: "current"
currencyId: aion-ui
abstract: AionUi is a cross-platform open-source cowork application that aggregates multi-agent automation across local and cloud LLM interfaces, supporting various CLI and web-based coding assistants.
tags:
  - currency
  - agent-workspace
  - open-source
permalink: /currency/currents/aion-ui/
links:
  - id: openclaw
    relation: "Utilizes OpenClaw framework for agent task execution and skill integration"
  - id: opencode-ai
    relation: "Compatible with OpenCode runtime for provider-flexible coding workflows"
  - id: cherry-studio
    relation: "Comparable desktop interface pattern for aggregating multiple AI assistants"
mediation:
  tooling: "OpenRouter / qwen/qwen3.5-flash-02-23"
  use:
    - "drafted entry from external signal"
    - "assessed linkage against existing knowledge base"
  humanRole: "review, edit, and approve before publication"
  limits: "signal content may be incomplete; verify primary sources before publishing"
---

### Signal
[AionUi](https://github.com/iOfficeAI/AionUi) · GitHub repository iOfficeAI/AionUi. License: Apache-2.0. Platforms: macOS, Windows, Linux. Core function: Open-source cowork application with built-in AI agents supporting 24/7 automation. Supported interfaces include Gemini CLI, Claude Code, Codex, OpenCode, Qwen Code, Goose CLI, and Auggie
### Context
AionUi operates within the desktop agent orchestration layer, bridging the gap between command-line agent tools and persistent graphical workspaces. It positions itself as a local-first cowork environment where multiple agent types can run concurrently. This aligns with the broader shift toward composable agent interfaces that abstract provider differences into a unified UI, similar to trends observed in Cherry Studio and AnythingLLM.

### Relevance
The tool consolidates access to heterogeneous agent frameworks (CLI and GUI) into a single application. By supporting "Any API Key," it reduces friction for users managing multiple provider credentials. The emphasis on "24/7 Automation" suggests background task execution capabilities beyond simple chat interactions, moving toward persistent agent states.

### Current State
The repository is active with releases available for major desktop platforms. It maintains multilingual support (English, Chinese, Japanese, Korean, Spanish, Portuguese, Turkish). The project is Apache-2.0 licensed, allowing for commercial and private modification. Documentation includes specific setup guides for various supported coding assistants.

### Open Questions
*   **Sandboxing:** Does the application isolate agent code execution from the host system, or does it run with full user privileges?
*   **State Persistence:** How are agent states and memories persisted across sessions without a centralized backend?
*   **Security:** What encryption or local storage practices are used for API keys and agent logs?
*   **Maintenance:** Is the upstream repository maintained by a single operator or a community, and what is the release cadence?

### Connections
*   **OpenClaw:** AionUi explicitly references integration with the OpenClaw agent framework.
*   **OpenCode:** Supports OpenCode runtime workflows for provider-flexible coding.
*   **Cherry Studio:** Competing entry point for managing multiple LLM assistants in a desktop environment.
*   **Local Inference:** Fits within the `local-inference-baseline` circuit by enabling local model usage alongside remote APIs.