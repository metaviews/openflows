---
layout: layouts/currency-item.njk
title: Agentic Software Development Infrastructure
date: 2026-04-03
currencyType: "circuit"
currencyId: agentic-software-development-infrastructure
abstract: This circuit defines the infrastructure layer where autonomous agents manage repository state, code review, and multi-agent coordination as a stable workflow distinct from terminal interaction or generic tooling.
tags:
  - currency
permalink: /currency/circuits/agentic-software-development-infrastructure/
links:
  - id: contribai
    relation: contributes autonomous contribution workflow
  - id: jerry-liu
    relation: provides retrieval infrastructure for repository understanding
  - id: airlock-code-review-agent
    relation: enables automated review logic and safety gates
  - id: multi-agent-coding-orchestration
    relation: coordinates specialized coding tasks across sub-agents
  - id: codewiki-google
    relation: maintains persistent repository memory and state
  - id: opencode-ai
    relation: offers the composable runtime environment
mediation:
  tooling: "OpenRouter / qwen/qwen3.5-flash-02-23"
  use:
    - "identified pattern across existing Currents"
    - "drafted Circuit synthesis from knowledge base"
  humanRole: "review, edit, and approve before publication"
  limits: "synthesis is a starting point; human judgment required on pattern boundaries and claims"
---

This circuit begins one level above terminal-native-agentic-workflows. It treats the code repository as the primary workspace rather than the command line. `jerry-liu` establishes the retrieval layer that allows agents to understand external knowledge without fine-tuning. This RAG foundation supports `codewiki-google`, which turns repository state into a continuously generated artifact.

`multi-agent-coding-orchestration` distributes complex tasks across specialized sub-agents to avoid context fragmentation. `contribai` executes the maintenance loop by submitting pull requests autonomously. `airlock-code-review-agent` sits between generation and merge to ensure semantic quality using Rust-based safety. `opencode-ai` provides the composable runtime where these agents exchange state.

The circuit resists the noise of unverified bot contributions. It avoids the failure mode where agents operate in silos without shared memory. It distinguishes itself from generic tooling by centering on the code repository as the agent's primary state. The circuit is complete when automated PRs pass review logic without human intervention and repository memory stays synchronized with code changes.