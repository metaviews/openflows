---
layout: layouts/currency-item.njk
title: "FIM One"
date: 2026-04-21
currencyType: "current"
currencyId: fim-one
abstract: "An LLM-powered agent runtime and hub enabling dynamic DAG planning and concurrent execution across enterprise systems via MCP and OpenAI-compatible APIs."
tags:
  - currency
  - agent-runtime
  - mcp
  - enterprise-automation
  - dag-planning
permalink: /currency/currents/fim-one/
links:
  - id: unified-agent-gateway
    relation: "functional equivalent as a unified gateway for agent tooling"
  - id: agent-tooling-interoperability-infrastructure
    relation: "implements circuit pattern for action interoperability via MCP"
  - id: goose
    relation: "similar runtime capabilities with MCP integration"
mediation:
  tooling: "OpenRouter / qwen/qwen3.5-flash-02-23"
  use:
    - "drafted entry from external signal"
    - "assessed linkage against existing knowledge base"
  humanRole: "review, edit, and approve before publication"
  limits: "signal content may be incomplete; verify primary sources before publishing"
---

### Signal

[FIM One](https://github.com/fim-ai/fim-one) · GitHub · 2026-04-21

FIM One is an open-source agent runtime and hub designed to connect disparate enterprise systems (ERP, CRM, databases) without infrastructure modification. It features dynamic DAG planning and concurrent execution capabilities, supporting MCP integration and OpenAI-compatible APIs for tool interaction. The platform operates in standalone Copilot mode or as a centralized Hub, with a managed cloud option available for rapid deployment.

### Context

Enterprise environments typically consist of siloed systems requiring custom integration logic. Traditional automation relies on static scripts or rigid orchestration tools that lack adaptive reasoning. FIM One addresses this by introducing an agentic layer capable of interpreting system states and executing cross-system workflows dynamically. This shifts integration from a manual engineering task to a runtime capability managed by the agent.

### Relevance

The entry aligns with the `agent-tooling-interoperability-infrastructure` circuit by standardizing tool access through MCP. It also fits the `unified-agent-gateway` pattern by aggregating system access into a single control plane. Unlike general-purpose chat interfaces, FIM One prioritizes structured execution and state management suitable for production workflows.

### Current State

The project is available as a GitHub repository with a managed cloud variant (`cloud.fim.ai`). It supports Python, FastAPI, and NextJS backends. Key features include dynamic DAG planning for workflow optimization and concurrent execution for performance. MCP support is explicitly listed, enabling integration with existing agent frameworks.

### Open Questions

Security isolation for autonomous actions across enterprise systems requires verification. The extent of local execution capabilities compared to the managed cloud offering needs clarification. Governance mechanisms for DAG approval and audit trails are not detailed in the initial signal.

### Connections

The runtime architecture mirrors `goose` in its support for MCP and provider flexibility, though FIM One emphasizes system integration over code assistance. It operationalizes the `unified-agent-gateway` circuit by providing a single interface for diverse API and database interactions. The dynamic planning logic reinforces the `agent-tooling-interoperability-infrastructure` circuit by managing tool selection and sequencing automatically.