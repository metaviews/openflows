---
layout: layouts/currency-item.njk
title: MiroFish-Offline
date: 2026-03-21
currencyType: "current"
currencyId: mirofish-offline
abstract: A local-first agent runtime variant designed to execute autonomous workflows offline, focusing on privacy and reduced cloud dependency.
tags:
  - currency
  - local-inference
  - agent-runtime
permalink: /currency/currents/mirofish-offline/
links:
  - id: mirofish
    relation: "upstream project variant focusing on memory operating system capabilities"
  - id: local-inference-baseline
    relation: "implements baseline infrastructure pattern for local model execution"
mediation:
  tooling: "OpenRouter / qwen/qwen3.5-flash-02-23"
  use:
    - "drafted entry from external signal"
    - "assessed linkage against existing knowledge base"
  humanRole: "review, edit, and approve before publication"
  limits: "signal content may be incomplete; verify primary sources before publishing"
---

### Signal
[MiroFish-Offline](https://opensourceprojects.dev/post/41441f93-e6e5-431e-8328-ead0ff052336) · opensourceprojects.dev
### Context
The signal aligns with the broader shift toward treating local inference as standard infrastructure. While cloud-based agent orchestration remains dominant, friction points regarding cost, latency, and data sovereignty are driving demand for self-hosted alternatives. This entry captures a specific iteration of the MiroFish project adapted for offline autonomy.

### Relevance
This entry is relevant to operators prioritizing data sovereignty and infrastructure independence. It represents a practical implementation of the "Local Inference as Baseline" pattern, offering a concrete tool for experimentation without external dependencies. It supports the goal of maintaining operational literacy by keeping agent logic and execution local.

### Current State
The repository provides a runtime environment for autonomous agents that does not rely on cloud APIs for inference or state management. It appears to function as a sandbox for testing agent behaviors and memory persistence on consumer hardware. The project targets users who require full control over the execution environment and model weights.

### Open Questions
- What specific model families are supported for local inference within this runtime?
- How does the offline variant handle skill updates and tool availability without external network calls?
- Is the memory persistence layer compatible with the upstream MiroFish ecosystem?
- What are the hardware requirements for stable multi-agent execution?

### Connections
This entry connects directly to the existing `mirofish` entry, representing a specialized offline variant of the memory operating system. It also maps to the `local-inference-baseline` circuit, demonstrating how local execution is becoming a standard requirement for trustworthy agent operations.