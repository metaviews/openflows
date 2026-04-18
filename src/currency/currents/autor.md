---
layout: layouts/currency-item.njk
title: "AutoR"
date: 2026-04-18
currencyType: "current"
currencyId: "autor"
abstract: "A terminal-first research harness that structures AI agent execution into reproducible, human-approved artifacts on disk."
tags:
  - currency
  - research
  - terminal
  - governance
permalink: /currency/currents/autor/
links:
  - id: "autonomous-research-accountability"
    relation: "Explicitly implements the governance loop for AI-accelerated research by maintaining human interpretive authority through approval stages."
  - id: "terminal-native-agentic-workflows"
    relation: "Embodies the pattern where the terminal becomes the primary workspace for agent orchestration, prioritizing scriptability over chat interfaces."
  - id: "inspectable-agent-operations"
    relation: "Provides the visible, revisable mediation layer where artifacts persist on disk rather than in ephemeral context."
  - id: "gitagent"
    relation: "Shares the goal of versioning agent logic and configuration to enable rollback and collaborative evolution of workflows."
  - id: "autoresearch-karpathy"
    relation: "Contrasts with minimal autonomous setups by enforcing human direction and approval rather than overnight unattended execution."
mediation:
  tooling: "OpenRouter / qwen/qwen3.5-flash-02-23"
  use:
    - "drafted entry from external signal"
    - "assessed linkage against existing knowledge base"
  humanRole: "review, edit, and approve before publication"
  limits: "signal content may be incomplete; verify primary sources before publishing"
---

### Signal
[AutoR](https://github.com/AutoX-AI-Labs/AutoR) · github · 2026-04-18

AutoR is a terminal-first research harness designed to structure AI agent execution into reproducible, artifact-backed runs. It emphasizes human direction over automated execution, requiring human approval at key stages, and treats every run as an inspectable research artifact stored on disk rather than ephemeral chat logs. The system integrates an intake workflow with eight distinct stages, ensuring that AI handles execution while humans retain control over the direction and validation of the output.

### Context
Research automation often sacrifices auditability for speed, resulting in black-box experiments that are difficult to reproduce or verify. AutoR addresses this by enforcing a structured workflow where AI executes code within a defined harness, but human intervention is required to validate results and proceed to the next stage. It operates within the terminal environment, aligning with developer-native workflows and avoiding the abstraction layers typical of chat-based agent interfaces. This approach treats research runs as persistent files on disk, allowing for version control and external review.

### Relevance
AutoR represents a shift in how autonomous research is operationalized, moving from experimental chat demos to structured infrastructure. It aligns with the `Terminal-Native Agentic Workflows` circuit by prioritizing the terminal as the primary workspace. It directly addresses `Autonomous Research Accountability` by codifying human approval as a necessary step in the execution pipeline. The focus on disk-based artifacts supports `Inspectable Agent Operations`, ensuring that the reasoning and code generation processes remain visible and revisable.

### Current State
The project is available as an open-source GitHub repository with documentation in English and Chinese. It supports Python 3.10+ and utilizes an agent harness model that separates execution from orchestration. The system includes a tutorial for setting up the workflow and emphasizes reproducibility through staged intake and artifact generation. It is currently positioned as a tool for researchers and developers who require rigorous control over AI-assisted experimentation.

### Open Questions
How does the system handle cost management for extended runs across multiple model providers? What are the specific mechanisms for artifact storage and retrieval at scale? Can the approval workflow be automated for low-risk stages while maintaining high oversight for critical decisions? How does it integrate with existing version control systems beyond the initial git-based setup?

### Connections
- **Autonomous Research Accountability:** Implements the governance loop for AI-accelerated research by maintaining human interpretive authority through approval stages.
- **Terminal-Native Agentic Workflows:** Embodies the pattern where the terminal becomes the primary workspace for agent orchestration, prioritizing scriptability over chat interfaces.
- **Inspectable Agent Operations:** Provides the visible, revisable mediation layer where artifacts persist on disk rather than in ephemeral context.
- **GitAgent:** Shares the goal of versioning agent logic and configuration to enable rollback and collaborative evolution of workflows.
- **AutoResearch (Andrej Karpathy):** Contrasts with minimal autonomous setups by enforcing human direction and approval rather than overnight unattended execution.