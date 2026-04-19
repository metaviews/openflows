---
layout: layouts/currency-item.njk
title: "Filesystem-Native Agent State Infrastructure"
date: 2026-04-17
currencyType: "circuit"
currencyId: filesystem-native-agent-state-infrastructure
abstract: "This circuit documents the pattern where agent state is managed as persistent, versioned, hierarchical file structures rather than ephemeral vector stores or chat logs."
tags:
  - currency
permalink: /currency/circuits/filesystem-native-agent-state-infrastructure/
links:
  - id: superset
    relation: "provides orchestration layer using isolated git worktrees for parallel agent execution"
  - id: holaos
    relation: "provides persistent runtime environment for long-horizon workflow continuity"
  - id: neuronfs
    relation: "implements filesystem-native constraint engine replacing vector memory with directory structures"
  - id: clawwork
    relation: "manages local file persistence and scoped configuration outside chat interfaces"
  - id: gitagent
    relation: "applies version control principles to agent logic, prompts, and model configurations"
  - id: paperclip-ai
    relation: "introduces organizational governance primitives into the file-based agent structure"
mediation:
  tooling: "OpenRouter / qwen/qwen3.5-flash-02-23"
  use:
    - "identified pattern across existing Currents"
    - "drafted Circuit synthesis from knowledge base"
  humanRole: "review, edit, and approve before publication"
  limits: "synthesis is a starting point; human judgment required on pattern boundaries and claims"
---

This circuit begins one level above the execution layer, addressing the storage medium of agent state. While `local-inference-baseline` covers computation and `inspectable-agent-operations` covers visibility, none explicitly secure the persistence layer itself.

`NeuronFS` replaces vector memory with hierarchical directory structures and zero-byte files. This converts behavioral guardrails into deterministic OS-native operations.

`GitAgent` applies version control principles to agent logic and prompts. It treats agent evolution as a code-first operation rather than a procedural one.

`Superset` runs multiple CLI agents in parallel using isolated git worktrees. `ClawWork` manages parallel task sessions with local file persistence outside chat interfaces.

`holaOS` provides a persistent runtime environment for long-horizon workflows. It aggregates memory and tools into a single desktop application to maintain context across runs.

`Paperclip` introduces organizational primitives like budgets and approval gates into this file-based structure. It frames coordination as an organizational design problem rather than undifferentiated task running.

The circuit resists ephemeral chat logs and opaque vector databases. It avoids proprietary lock-in where state is trapped in cloud-hosted retrieval endpoints.

The circuit is complete when agent memory, logic, and constraints are auditable as filesystem artifacts without requiring external memory services.
