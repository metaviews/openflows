---
layout: layouts/currency-item.njk
title: Google Agent Development Kit (adk-js)
date: 2026-03-13
currencyType: "current"
currencyId: google-adk-js
abstract: A code-first TypeScript framework for building and deploying multi-agent systems with tight Google Cloud integration and versionable orchestration logic.
tags:
  - currency
permalink: /currency/currents/google-adk-js/
links:
  - id: microsoft-agent-framework-consolidation
    relation: "Competing enterprise-grade agent orchestration framework from major cloud provider"
  - id: crewai
    relation: "Alternative multi-agent orchestration framework with role-based coordination"
  - id: qwen-agent
    relation: "Another major open-source LLM application framework for agent construction"
  - id: inspectable-agent-operations
    relation: "Aligns with code-first inspection and versioning of agent behavior"
mediation:
  tooling: "OpenRouter / qwen/qwen3.5-flash-02-23"
  use:
    - "drafted entry from external signal"
    - "assessed linkage against existing knowledge base"
  humanRole: "review, edit, and approve before publication"
  limits: "signal content may be incomplete; verify primary sources before publishing"
---

### Signal
Source: GitHub (google/adk-js). Date: 2026-03-13. URL: https://github.com/google/adk-js. Description: An open-source, code-first TypeScript toolkit for building, evaluating, and deploying sophisticated AI agents with flexibility and control. Key features include rich tool ecosystems, code-first development for logic and orchestration, and modular multi-agent system support. License: Apache 2.0.

### Context
The Agent Development Kit (ADK) represents Google's entry into the open-source agent framework space, positioning itself alongside Python-based implementations and other language-specific SDKs. It targets developers requiring fine-grained control over agent behavior, tool usage, and orchestration logic, specifically optimized for integration with Google Cloud services. This signals a shift toward treating agent logic as versionable code rather than opaque configuration or visual flows.

### Relevance
The framework addresses the need for robust debugging, versioning, and deployment of agent systems across environments ranging from local development to cloud infrastructure. By enforcing a code-first approach, it aligns with operational literacy patterns where agent behavior is inspectable and auditable. It supports the infrastructure layer of agentic workflows, enabling multi-agent collaboration and tool integration through standard software engineering practices.

### Current State
The TypeScript implementation is available via NPM (`@google/adk`). Parallel implementations exist for Python, Java, Go, and Web. Documentation and sample repositories are published. The toolkit allows definition of agent logic, tools, and orchestration directly in code, enabling tight integration with the Google ecosystem while maintaining deployment flexibility.

### Open Questions
- How does adoption compare to established frameworks like CrewAI or LangChain in non-Google Cloud environments?
- What are the long-term maintenance commitments for the TypeScript SDK relative to the Python core?
- Does the tight Google Cloud integration create vendor lock-in risks for multi-cloud agent deployments?
- How does the code-first approach scale for non-technical stakeholders in agent governance?

### Connections
- [microsoft-agent-framework-consolidation](/currency/currents/microsoft-agent-framework-consolidation/): Competing enterprise-grade agent orchestration framework from major cloud provider.
- [crewai](/currency/currents/crewai/): Alternative multi-agent orchestration framework with role-based coordination.
- [qwen-agent](/currency/currents/qwen-agent/): Another major open-source LLM application framework for agent construction.
- [inspectable-agent-operations](/currency/currents/inspectable-agent-operations/): Aligns with code-first inspection and versioning of agent behavior.
