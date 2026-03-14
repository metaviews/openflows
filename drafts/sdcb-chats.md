---
layout: layouts/currency-item.njk
title: "Sdcb Chats"
date: 2026-03-14
currencyType: "current"
currencyId: "sdcb-chats"
abstract: "A self-hosted AI gateway and frontend supporting 21+ model providers with built-in observability, sandboxed code execution, and enterprise-grade security controls."
tags:
  - currency
permalink: /currency/currents/sdcb-chats/
links:
  - id: librechat
    relation: "Similar self-hosted multi-model chat interface with enterprise controls"
  - id: open-webui
    relation: "Comparable self-hosted platform for local/cloud model access via unified interface"
  - id: operational-literacy-interface
    relation: "Interface layer example where structure and observability support operational literacy"
mediation:
  tooling: "OpenRouter / qwen/qwen3.5-flash-02-23"
  use:
    - "drafted entry from external signal"
    - "assessed linkage against existing knowledge base"
  humanRole: "review, edit, and approve before publication"
  limits: "signal content may be incomplete; verify primary sources before publishing"
---

### Signal
GitHub repository sdcb/chats presents a powerful and flexible frontend and AI gateway for large language models. It supports 21+ mainstream AI model providers including OpenAI, DeepSeek, and DashScope. Key features include Docker deployment, code interpreter with sandboxed execution, API gateway compatibility (Chat Completions/Messages), request tracing for observability, and enterprise security features like Keycloak SSO and audit logs.

### Context
Sdcb Chats occupies the infrastructure layer of the AI application stack, functioning as a centralized gateway for model routing and user management. It addresses the need for unified access across diverse model providers while maintaining local control over data and inference costs. The project is built on .NET/C# and emphasizes operational visibility through HTTP request tracing and management dashboards.

### Relevance
This entry is relevant to the Openflows knowledge base as it represents a concrete implementation of the "Operational Literacy Interface Circuit." By exposing request traces, audit logs, and configuration controls, it shifts the interface from a black-box consumer tool to a transparent operational layer. The emphasis on sandboxed code execution and multi-provider support aligns with the goal of reducing vendor lock-in while maintaining security boundaries.

### Current State
Latest version 1.10.2 released March 10, 2026. Supports SQLite, SQL Server, PostgreSQL, and cloud storage (S3/OSS/Blob). Includes a management dashboard for request tracking, filtering, and export. Features queue capacity protection and automatic cleanup for data retention. Authentication supports Keycloak SSO and SMS verification.

### Open Questions
Long-term maintenance strategy for the .NET-based codebase within the predominantly Python/JS AI ecosystem. Adoption rate compared to established alternatives like LibreChat and Open WebUI. Specific support for emerging model protocols beyond standard Chat Completions. Scalability of the management dashboard under high-volume request tracing.

### Connections
Sdcb Chats functions as a peer to LibreChat and Open WebUI in the self-hosted interface space, offering distinct advantages in request tracing and enterprise security integration. It operationalizes the principles of the Operational Literacy Interface Circuit by making mediation visible through HTTP request traces and audit logs, allowing users to intervene and understand model behavior rather than treating it as opaque output.