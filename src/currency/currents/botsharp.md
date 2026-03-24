---
layout: layouts/currency-item.njk
title: BotSharp
date: 2026-03-24
currencyType: "current"
currencyId: botsharp
abstract: A .NET-based open-source multi-agent framework enabling Conversation as a Platform (CaaP) with plugin-driven pipeline execution for cross-platform intelligent assistant development.
tags:
  - currency
  - ai-agent
  - dotnet
  - framework
permalink: /currency/currents/botsharp/
links:
  - id: openclaw
    relation: "Competing multi-agent orchestration framework"
  - id: crewai
    relation: "Competing multi-agent orchestration framework"
  - id: open-source-ai-agent-framework-landscape-2026
    relation: "Included in 2026 framework landscape overview"
  - id: qwen-agent
    relation: "Comparable LLM application framework"
  - id: hermes-agent
    relation: "Comparable autonomous agent platform"
  - id: deerflow
    relation: "Comparable multi-agent orchestration framework"
  - id: fastapi-llm-gateway
    relation: "Compatible API integration layer"
  - id: xinference
    relation: "Compatible unified inference API"
  - id: vllm
    relation: "Compatible inference engine"
  - id: ollama
    relation: "Compatible local inference runtime"
mediation:
  tooling: "OpenRouter / qwen/qwen3.5-flash-02-23"
  use:
    - "drafted entry from external signal"
    - "assessed linkage against existing knowledge base"
  humanRole: "review, edit, and approve before publication"
  limits: "signal content may be incomplete; verify primary sources before publishing"
---

### Signal
[BotSharp](https://github.com/SciSharp/BotSharp) · GitHub · 2026-03-24

AI Multi-Agent Framework in .NET | ai-agent, chatbot, multi-agent. BotSharp is an open source machine learning framework for AI Bot platform builder. This project involves natural language understanding, computer vision and audio processing technologies, and aims to promote the development and application of intelligent robot assistants in information systems. Out-of-the-box machine learning algorithms allow ordinary programmers to develop artificial intelligence applications faster and easier. It's written in C# running on .Net Core that is full cross-platform framework, the plug-in and pipeline flow execution design is adopted to completely.
### Context
BotSharp operates within the .NET ecosystem, targeting developers who require cross-platform AI agent capabilities without leaving the C#/.NET Core environment. The framework emphasizes "Conversation as a Platform (CaaP)," suggesting a structural approach where conversational interfaces serve as the primary orchestration layer for business logic and agent workflows. Key architectural features include plugin modularity and pipeline flow execution, allowing for granular control over the AI processing pipeline.

### Relevance
BotSharp fills a specific infrastructure gap for organizations and developers invested in the .NET stack who previously lacked a native, open-source multi-agent orchestration framework comparable to Python-based alternatives. Its pipeline design supports deterministic control over agent interactions, which is critical for enterprise-grade applications requiring auditability and structured execution flows. The inclusion of NLU, computer vision, and audio processing capabilities within the core framework reduces dependency on external microservices for multimodal tasks.

### Current State
The project is hosted on GitHub under the SciSharp organization with Apache 2.0 licensing. It maintains a NuGet package for distribution and has an active Discord community. Documentation is available via ReadTheDocs. The build pipeline is automated via GitHub Actions. The framework supports integration with major LLM providers through its abstraction layer, aligning with the broader Openflows infrastructure model.

### Open Questions
*   **Adoption:** How does the .NET-specific focus impact adoption compared to language-agnostic frameworks in the broader ecosystem?
*   **Model Support:** What is the breadth of supported model providers and inference backends compared to frameworks like OpenClaw or CrewAI?
*   **Security:** How does the pipeline execution design handle untrusted code execution and sandboxing, particularly in enterprise environments?
*   **Performance:** Does the .NET runtime overhead impact inference latency compared to native Python implementations for high-throughput scenarios?

### Connections
BotSharp is directly comparable to `openclaw`, `crewai`, `hermes-agent`, and `deerflow` as a multi-agent orchestration framework. It integrates with infrastructure layers such as `fastapi-llm-gateway`, `xinference`, `vllm`, and `ollama` for model serving and inference. It is cataloged within the `open-source-ai-agent-framework-landscape-2026` as a representative .NET solution. The framework's focus on CaaP aligns with `qwen-agent`'s application-oriented approach, though with a distinct runtime environment.