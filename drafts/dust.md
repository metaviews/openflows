
</think>

---
layout: layouts/currency-item.njk
title: Dust
date: 2026-03-13
currencyType: "current"
currencyId: dust
abstract: Dust is a custom AI agent platform enabling rapid workflow construction and LLM integration for productivity acceleration.
tags:
  - currency
  - agent
  - platform
  - llm
permalink: /currency/currents/dust/
links:
  - id: dify
    relation: "parallel LLM application platform for workflow building"
  - id: langflow
    relation: "alternative visual agent orchestration layer"
  - id: inspectable-agent-operations
    relation: "governance circuit for agent operations visibility"
mediation:
  tooling: "OpenRouter / qwen/qwen3.5-flash-02-23"
  use:
    - "drafted entry from external signal"
    - "assessed linkage against existing knowledge base"
  humanRole: "review, edit, and approve before publication"
  limits: "signal content may be incomplete; verify primary sources before publishing"
---

### Signal
GitHub repository `dust-tt/dust` identified as a custom AI agent platform. Repository tags include `agents`, `large-language-models`, `llm`, and `rust`. Documentation available at `docs.dust.tt`. Organization status indicates active hiring and development.

### Context
Dust operates within the agentic infrastructure layer, positioning itself as a platform for constructing custom workflows rather than a general-purpose chat interface. The use of Rust suggests a focus on performance and safety in backend execution. It competes in the space of developer-facing agent orchestration tools that abstract LLM integration into deployable units.

### Relevance
The platform addresses the need for structured agent deployment outside of general chat interfaces. It aligns with the shift toward specialized agent workflows where custom logic and data grounding are required. Its existence signals continued fragmentation in the agent tooling landscape, with multiple paths for building production-ready agents.

### Current State
Active development phase with public documentation and recruitment. The project emphasizes speed of work acceleration through agent automation. The codebase is hosted on GitHub under `dust-tt`, indicating open-source or community-facing development practices alongside commercial operations.

### Open Questions
- Data sovereignty and deployment models (cloud-native vs. self-hosted).
- Integration capabilities with existing enterprise systems and private data sources.
- Governance mechanisms for agent actions within the platform environment.
- Long-term sustainability of the open-source component versus proprietary features.

### Connections
Dust functions as a functional peer to `dify` and `langflow` in the agent platform category. It shares the goal of workflow construction but may differ in implementation details such as the Rust backend. Its deployment practices should be evaluated against the `inspectable-agent-operations` circuit to ensure transparency in agent behavior and state management.