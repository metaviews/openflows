---
layout: layouts/currency-item.njk
title: "goose: Native Open Source AI Agent for Code, Workflows, and Beyond"
date: 2026-04-19
currencyType: current
currencyId: goose
tags: [currency, agent, tooling]
permalink: /currency/currents/goose/
abstract: "goose is a native, open-source AI agent framework (desktop, CLI, API) that generalizes beyond code suggestions to any task, running locally with 15+ LLM providers and 70+ MCP extensions."
---

goose is an open-source, native AI agent framework developed by the [Agentic AI Foundation (AAIF)](https://aaif.io/), an initiative at the Linux Foundation. It provides a unified experience for building and running AI agents across desktop, terminal, and API interfaces — designed to handle code tasks, research, writing, automation, data analysis, and general workflows, not just code generation.

## Architecture and Capabilities

Written in **Rust** for performance and portability, goose runs natively on macOS, Linux, and Windows. It separates agent logic from the inference layer, supporting **15+ LLM providers** including Anthropic Claude, OpenAI, Google Gemini, Ollama, OpenRouter, Azure, AWS Bedrock, and more. This multi-provider flexibility lets users leverage existing subscriptions or API keys without vendor lock-in.

goose integrates with **70+ extensions** via the **Model Context Protocol (MCP)**, an open standard for connecting agents to external tools, data sources, and services. This extensibility allows goose to connect to local filesystems, databases, APIs, and custom tools, making it adaptable to diverse workflows.

## Deployment Options

### Desktop Application
A native GUI application available for macOS, Linux, and Windows, providing a visual interface for agent sessions, tool interactions, and workflow management.

### Command-Line Interface (CLI)
Terminal-first workflow support via CLI installation:
```bash
curl -fsSL https://github.com/aaif-goose/goose/releases/download/stable/download_cli.sh | bash
```

### API
Embed goose in custom applications via an API layer, enabling programmatic access to agent capabilities for automation and integration into other workflows.

## Governance and Community

goose is part of the Agentic AI Foundation, which emphasizes open governance, community-driven development, and transparent operations. The project maintains a [governance framework](https://github.com/aaif-goose/goose/blob/main/GOVERNANCE.md) and supports custom distributions via [Custom Distributions](https://github.com/aaif-goose/goose/blob/main/CUSTOM_DISTROS.md), enabling organizations to build branded, preconfigured versions with specific providers and extensions.

## Related Infrastructure

goose aligns with several infrastructure patterns in the current ecosystem:

- **[Terminal-Native Agentic Workflows](/circuit/circuit|terminal-native-agentic-workflows/en)**: goose exemplifies the terminal-as-primary-workspace pattern with its CLI-first design.
- **[Model Context Protocol Integration](/circuit/circuit|agent-tooling-interoperability-infrastructure/en)**: MCP support enables goose to act as a universal agent runtime connecting to diverse tools.
- **[Local Inference as Baseline](/circuit/circuit|local-inference-baseline/en)**: goose treats local inference as ordinary infrastructure, supporting Ollama and other local backends.
- **[Open Model Interoperability Layer](/circuit/circuit|open-model-interoperability-layer/en)**: Multi-provider support reduces vendor lock-in and enables flexible provider selection.

goose represents the emergence of the **general-purpose agent**: systems that go beyond narrow code assistance to handle arbitrary tasks through composable tools, extensible protocols, and local execution. Its position within the Linux Foundation signals growing institutional investment in open, governance-aligned agent infrastructure.

[Mediation Block: This entry was drafted based on public documentation and repository analysis. The author (Peng) verified the project's governance model, provider support matrix via fetch_url, and cross-referenced related circuits for infrastructure alignment. No AI-generated prose beyond structural synthesis.]
