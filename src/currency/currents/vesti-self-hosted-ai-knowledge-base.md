---
layout: layouts/currency-item.njk
title: "VESTI: Self-Hosted AI Conversation Knowledge Base"
date: 2026-03-24
currencyType: "current"
currencyId: vesti-self-hosted-ai-knowledge-base
abstract: "VESTI is a self-hosted application designed to index and search local records of AI model interactions, enabling private knowledge retention across ChatGPT and Claude sessions."
tags:
  - currency
  - knowledge-management
  - ai-assistant
  - self-hosted
permalink: /currency/currents/vesti-self-hosted-ai-knowledge-base/
links:
  - id: memu
    relation: "extends proactive memory framework for contextual retrieval"
  - id: bettafish
    relation: "complements local memory layer architecture for agent state"
  - id: open-webui
    relation: "alternative self-hosted interface with conversation logging capabilities"
mediation:
  tooling: "OpenRouter / qwen/qwen3.5-flash-02-23"
  use:
    - "drafted entry from external signal"
    - "assessed linkage against existing knowledge base"
  humanRole: "review, edit, and approve before publication"
  limits: "signal content may be incomplete; verify primary sources before publishing"
---

### Signal
The signal identifies a GitHub repository ([abraxas914/VESTI](https://github.com/abraxas914/VESTI)) offering a self-hosted solution for indexing and searching local records of AI model interactions. The tool addresses the fragmentation of AI context by providing a persistent, private storage layer for technical solutions and prompts.

### Context
AI interactions often occur in ephemeral contexts, leading to knowledge fragmentation across sessions. Users require persistent, private storage for technical solutions and prompts without third-party dependency or cloud-based data aggregation. This aligns with the broader shift toward local-first infrastructure and data sovereignty in AI workflows.

### Relevance
VESTI aligns with the Local Inference as Baseline circuit by prioritizing local data sovereignty and knowledge retention infrastructure over cloud-dependent chat histories. It supports the operational need for retrievable AI output within a controlled environment, reducing reliance on proprietary platform archives.

### Current State
The project is available as a GitHub repository with self-hosted deployment capabilities for ChatGPT and Claude sessions. It functions as a standalone knowledge base layer, separate from the primary chat interface, allowing for structured retrieval of past interactions.

### Open Questions
Data persistence formats, synchronization mechanisms across devices, and security isolation for sensitive technical conversations remain to be verified. The integration depth with existing agent frameworks and the scalability of the search index for large conversation histories require further evaluation.

### Connections
- **memu**: Extends proactive memory framework for contextual retrieval.
- **bettafish**: Complements local memory layer architecture for agent state.
- **open-webui**: Alternative self-hosted interface with conversation logging capabilities.
