---
layout: layouts/currency-item.njk
title: "vm0"
date: 2026-03-21
currencyType: "current"
currencyId: "vm0"
abstract: "vm0 is a cloud-based agent runtime that executes natural language workflows in isolated sandbox environments using the Claude Code interface."
tags:
  - currency
  - agent-runtime
  - sandbox
  - claude-code
permalink: /currency/currents/vm0/
links:
  - id: "skills-sh"
    relation: "Explicit compatibility with 35,738+ skills defined in skills.sh repository."
  - id: "capsule"
    relation: "Functional parallel in cloud sandbox isolation for untrusted agent code execution."
mediation:
  tooling: "OpenRouter / qwen/qwen3.5-flash-02-23"
  use:
    - "drafted entry from external signal"
    - "assessed linkage against existing knowledge base"
  humanRole: "review, edit, and approve before publication"
  limits: "signal content may be incomplete; verify primary sources before publishing"
---

### Signal
Repository `vm0-ai/vm0` published 2026-03-19. Describes an agent runtime for natural language-described workflows. Key tags include `agentic-workflow`, `ai-agent`, `ai-runtime`, `ai-sandbox`, `claude-code`, `dev-tools`, `sandbox`.

### Context
vm0 positions itself as a cloud-native agent execution layer. It abstracts the complexity of persistent agent environments by providing a remote sandbox that runs 24/7. The runtime leverages the Claude Code interface, allowing users to define workflows via natural language instructions rather than explicit code scaffolding.

### Relevance
This entry represents a shift toward managed agent infrastructure where execution environment is decoupled from local hardware. By supporting `skills.sh`, it aligns with the emerging standardization of agent capabilities across different runtimes. The focus on persistence and versioning addresses common failure modes in autonomous agent deployments.

### Current State
The project includes an NPM package (`@vm0/cli`) and documentation site. CI/CD pipelines are active with Codecov coverage tracking. The system claims support for over 35,000 skills and integration with major SaaS platforms (GitHub, Slack, Notion, Firecrawl).

### Open Questions
1. What are the specific security boundaries of the cloud sandbox compared to local execution?
2. How does the system handle state synchronization between sessions and forks?
3. What is the cost model for continuous 24/7 sandbox execution?
4. Is the Claude Code integration a direct API wrapper or a simulated interaction layer?

### Connections
vm0 operates within the agent runtime ecosystem, specifically interacting with the skills standardization layer. Its sandbox architecture mirrors the isolation goals of `Capsule`, though vm0 focuses on cloud-managed persistence rather than local WebAssembly isolation.