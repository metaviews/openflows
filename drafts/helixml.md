---
layout: layouts/currency-item.njk
title: "HelixML"
date: 2026-03-14
currencyType: "current"
currencyId: helixml
abstract: "HelixML is an enterprise-grade platform for deploying private AI agent fleets with GPU scheduling, multi-provider LLM support, and MCP-compatible tool orchestration."
tags:
  - currency
  - agent-orchestration
  - private-inference
  - gpu-scheduling
permalink: /currency/currents/helixml/
links:
  - id: openclaw
    relation: "Alternative agent orchestration layer with similar focus on inspectability and configuration"
  - id: mcp-google-map
    relation: "Confirms Model Context Protocol compatibility as a standard integration point for agent skills"
  - id: local-inference-baseline
    relation: "Operationalizes private deployment as a baseline requirement for data security in agent fleets"
  - id: skills-sh
    relation: "Aligns with signals for modular, explicit agent behavior via skills and tool definitions"
mediation:
  tooling: "OpenRouter / qwen/qwen3.5-flash-02-23"
  use:
    - "drafted entry from external signal"
    - "assessed linkage against existing knowledge base"
  humanRole: "review, edit, and approve before publication"
  limits: "signal content may be incomplete; verify primary sources before publishing"
---

### Signal
Source: GitHub (helixml/helix).
Date: 2026-03-14.
Description: Private Agent Fleet with Spec Coding. Each agent gets their own desktop. Run Claude, Codex, Gemini and open models on a full private GenAI Stack.
Tags: agents, api, genai, glm, golang, helm, k8s, kimi, llm, llm-agent, llm-serving, openai, openapi, qwen, rag, self-hosted, swagger, swarm.

### Context
HelixML positions itself as an enterprise-grade platform for building and deploying AI agents within a private GenAI stack. It emphasizes data security and control through private deployment options (VPC or data center), contrasting with SaaS-only offerings. Key technical differentiators include an intelligent GPU scheduler that packs models efficiently into memory and dynamically loads/unloads based on demand. The platform supports RAG, API calling, vision, and multi-provider LLM integration via a `helix.yaml` configuration file.

### Relevance
This entry fits the "Local Inference as Baseline" circuit by treating inference infrastructure as ordinary local hardware managed by software controllers. It aligns with "Inspectable Agent Operations" by providing a Web UI and configuration files that expose orchestration logic. The focus on private deployment addresses the "Open Weights Commons" concern regarding provider dependency, offering a path to maintain operational control over model weights and data flows.

### Current State
The platform offers both a SaaS interface and a private deployment option. Agents are managed via a session-based architecture with pause/resume capabilities. Tooling includes REST API integration, OpenAPI schema support, and MCP server compatibility. Memory management is handled for context-aware interactions. The project is open-source (GitHub repository), but the core orchestration logic and GPU scheduling appear to be proprietary features within the private deployment context.

### Open Questions
1. What is the specific licensing model for the private deployment binaries versus the open-source repository?
2. How does the GPU scheduler compare to existing solutions like vLLM or AirLLM in terms of throughput and memory fragmentation handling?
3. Does the `helix.yaml` configuration enforce strict schema validation to ensure auditability of agent behaviors?
4. What are the actual security guarantees for the "private GenAI stack" regarding data exfiltration or side-channel attacks?

### Connections
- **openclaw**: Alternative agent orchestration layer with similar focus on inspectability and configuration.
- **mcp-google-map**: Confirms Model Context Protocol compatibility as a standard integration point for agent skills.
- **local-inference-baseline**: Operationalizes private deployment as a baseline requirement for data security in agent fleets.
- **skills-sh**: Aligns with signals for modular, explicit agent behavior via skills and tool definitions.