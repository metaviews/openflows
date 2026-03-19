---
layout: layouts/currency-item.njk
title: HolmesGPT
date: 2026-03-19
currencyType: "current"
currencyId: holmesgpt
abstract: HolmesGPT is a CNCF Sandbox project implementing an agentic SRE framework for automated incident investigation and root cause analysis across heterogeneous observability stacks.
tags:
  - currency
  - sre
  - observability
  - agent
  - cncf-sandbox
  - incident-response
permalink: /currency/currents/holmesgpt/
links:
  - id: openclaw
    relation: "general open-source agent framework pattern"
  - id: redamon
    relation: "agentic operational pipeline for automated remediation"
mediation:
  tooling: "OpenRouter / qwen/qwen3.5-flash-02-23"
  use:
    - "drafted entry from external signal"
    - "assessed linkage against existing knowledge base"
  humanRole: "review, edit, and approve before publication"
  limits: "signal content may be incomplete; verify primary sources before publishing"
---

### Signal
Source: GitHub (github.com/HolmesGPT/holmesgpt). Status: CNCF Sandbox Project. Origin: Originally created by Robusta.Dev with major contributions from Microsoft. Function: Open-source AI agent for investigating production incidents and finding root causes. Integrations: Kubernetes, VMs, cloud providers, databases, SaaS, Prometheus, Grafana, Datadog, AlertManager, PagerDuty, OpsGenie, Jira. Capabilities: Petabyte-scale data filtering, memory-safe execution, bidirectional alert integrations, any LLM provider support, Kubernetes operator mode.

### Context
Site Reliability Engineering (SRE) workflows are shifting from manual dashboard monitoring to agentic investigation. HolmesGPT positions itself within the Cloud Native Computing Foundation (CNCF) ecosystem, signaling enterprise-grade acceptance of AI agents in production infrastructure management. It addresses the complexity of distributed systems where traditional alerting fails to provide root cause context.

### Relevance
This entry maps the operationalization of AI agents in critical infrastructure. By treating observability data as a queryable context layer, it reduces Mean Time To Resolution (MTTR) without requiring full autonomous remediation. The project emphasizes inspectability and memory safety, aligning with Openflows' focus on infrastructure literacy rather than opaque automation.

### Current State
The project is in CNCF Sandbox status, indicating active development and community review. It supports any LLM provider, reducing vendor lock-in at the inference layer. Key technical differentiators include server-side filtering for large payloads and streaming outputs to disk to prevent Out-Of-Memory (OOM) errors during large-scale observability queries.

### Open Questions
1. What are the failure modes when the agent misinterprets observability metrics during high-severity incidents?
2. How does the bidirectional write-back to Jira/PagerDuty handle human approval workflows?
3. Is the petabyte-scale data handling cost-effective for smaller organizations compared to traditional monitoring?
4. What safeguards exist against the agent executing unsafe commands during incident response?

### Connections
HolmesGPT shares architectural patterns with `openclaw`, specifically the focus on open-source agent frameworks with inspectable orchestration. It parallels `redamon` in its use of agentic pipelines for operational remediation, though HolmesGPT targets SRE incident response rather than security red-teaming. Both entries represent the shift toward automated, agent-mediated infrastructure operations.