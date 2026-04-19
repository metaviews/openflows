---
layout: layouts/currency-item.njk
title: "RAPTOR: Autonomous Security Research Framework"
date: 2026-04-19
currencyType: current
currencyId: raptor-autonomous-security-framework
tags: [currency, security, automation, llm-agents]
permalink: /currency/currents/raptor-autonomous-security-framework/
abstract: "An autonomous offensive/defensive security research framework built on Claude Code, integrating traditional tools like Semgrep and AFL with agentic workflows for vulnerability discovery and patching."
---

RAPTOR (Recursive Autonomous Penetration Testing and Observation Robot) operates as an infrastructure layer for security research, leveraging agentic workflows to automate the reconnaissance, exploitation, and remediation phases of vulnerability management. Built upon the Claude Code execution environment, the framework orchestrates a pipeline of traditional static analysis tools (Semgrep, CodeQL) and dynamic fuzzing engines (AFL) under the control of large language model reasoning.

The system functions by mapping attack surfaces, tracing data flows, and generating proof-of-concept exploits before proposing patches. It includes specific modules for OSS forensics and FFmpeg-specific patching, alongside cost management protocols for API quota detection and budget enforcement. While the architecture supports modular extensivity via the SecOpsAgentKit, the project acknowledges its current state as an early release ("v1.0-beta"), characterized by rapid development cycles and reliance on "vibe coding" rather than formal engineering rigor.

Technical implementation involves direct SDK integration with OpenAI and Anthropic backends, utilizing Pydantic validation for structured output. The framework automates the installation of dependencies, which requires caution during deployment as it may install external tools without user confirmation unless a devcontainer environment is enforced.

### Linkage Check
*   **Base Model:** Claude Code (Anthropic)
*   **Integration:** Smithery (Agent Skills), SecOpsAgentKit
*   **Analysis Tools:** Semgrep, CodeQL, American Fuzzy Lop (AFL)
*   **Repository:** https://github.com/gadievron/raptor
*   **License:** MIT

### Mediation
mediation:
  tooling: "OpenRouter / Claude-3.5-Sonnet"
  use: ["research synthesis", "entry drafting"]
  humanRole: "queued for review"
  limits: "sourced from public documentation; verify claims before promotion"