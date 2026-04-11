---
layout: layouts/currency-item.njk
title: "NeuronFS"
date: 2026-04-05
currencyType: "current"
currencyId: neuronfs
abstract: "A zero-dependency, filesystem-native constraint engine that replaces traditional system prompts and vector memory with hierarchical directory structures and zero-byte files for LLM agent governance."
tags:
  - currency
permalink: /currency/currents/neuronfs/
links:
  - id: lightmem
    relation: "contrasts vector-based memory retrieval with filesystem-native hierarchical rule storage"
  - id: terminal-native-agentic-workflows
    relation: "relies on OS-native directory operations and CLI workflows for agent state and constraint management"
mediation:
  tooling: "OpenRouter / qwen/qwen3.6-plus:free"
  use:
    - "drafted entry from external signal"
    - "assessed linkage against existing knowledge base"
  humanRole: "review, edit, and approve before publication"
  limits: "signal content may be incomplete; verify primary sources before publishing"
---

### Signal
[NeuronFS](https://github.com/rhino-acoustic/NeuronFS) · github · 2026-04-05
A Go-based, zero-dependency framework that implements filesystem-native hierarchical ruleset memory for LLM agents. The system maps directory paths to contextual sentences, folders to neurons, and zero-byte files to synaptic weights, using OS-level primitives to enforce behavioral constraints. By structuring rules as physical filesystem artifacts rather than text-based system prompts, the project claims approximately 200x token efficiency and eliminates external hosting costs associated with traditional vector memory databases. The repository includes a 3D dashboard visualization, MIT licensing, and a manifesto framing the approach as "Harness Engineering."

### Context
Agent memory and constraint enforcement have historically relied on appending structured text to context windows or routing state through external vector databases and retrieval pipelines. Both approaches introduce latency, token overhead, and operational complexity that scale poorly with multi-agent deployments. NeuronFS treats the local filesystem as the primary state layer, converting behavioral guardrails and memory traces into immutable directory structures. This shifts constraint management from probabilistic prompt engineering to deterministic OS-native operations, where `mkdir` and file creation directly inject rules into the agent's execution context.

### Relevance
The framework reduces infrastructure overhead by removing external memory services and compressing context payloads into structural filesystem references. It aligns with local-first agent architectures that prioritize inspectability, version control, and zero-cost deployment. By externalizing rules into the OS hierarchy, operators gain explicit, auditable control over agent behavior without relying on opaque prompt weights or cloud-hosted retrieval endpoints. This pattern supports reproducible, sandboxed agent workflows where governance is tied to filesystem permissions and directory topology rather than model-level fine-tuning.

### Current State
NeuronFS is implemented in Go 1.22+ with zero external dependencies and distributed under an MIT license. The core engine maps hierarchical paths to contextual rules and tracks constraint violations via file-based weight counters. A companion 3D dashboard provides real-time visualization of the agent's rule topology and violation metrics. The project is actively maintained, with documentation covering architecture, changelogs, and multi-language localization. It targets both single-agent and multi-agent deployments, functioning as a provider-agnostic middleware layer that intercepts and enforces structural constraints before model inference.

### Open Questions
How the system handles dynamic rule injection and removal without requiring manual filesystem operations remains unclear. Scalability limits for deeply nested directory structures and concurrent multi-agent path resolution need empirical validation. Cross-platform filesystem compatibility, particularly around path normalization and permission models, requires testing across Linux, macOS, and Windows environments. Security implications of granting agents read/write access to their own constraint directories also warrant review, as autonomous rule modification could bypass intended guardrails. Integration benchmarks with major agent runtimes and formal evaluation of the claimed token efficiency metrics are pending.

### Connections
NeuronFS operates as a structural alternative to vector-based memory frameworks like `lightmem`, replacing retrieval-augmented storage with deterministic filesystem hierarchies. Its reliance on CLI operations and OS-native state management aligns with the `terminal-native-agentic-workflows` circuit, where agent orchestration prioritizes scriptable, local execution over cloud-dependent interfaces. The approach also intersects with `agent-execution-sandboxing-infrastructure` by treating filesystem boundaries as primary constraint surfaces, and complements `gitagent` by providing a version-controllable, path-based alternative to prompt and configuration tracking.