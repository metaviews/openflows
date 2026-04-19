---
layout: layouts/currency-item.njk
title: "Clearwing"
date: 2026-04-19
currencyType: current
currencyId: clearwing
tags: [currency, security, langgraph, offensive-security, vulnerability-scanning]
permalink: /currency/currents/clearwing/
abstract: "Autonomous dual-mode offensive-security tool built on LangGraph for network pentesting and source-code vulnerability hunting using accessible LLMs."
---

Clearwing is an autonomous offensive-security framework developed by Lazarus AI, designed to replicate advanced vulnerability scanning capabilities using widely accessible model endpoints. Inspired by Anthropic's Glasswing, it functions as a dual-mode infrastructure layer for security operations: a network-pentest agent and a source-code hunter. The system leverages LangGraph for orchestration, enabling complex multi-agent workflows that integrate sandboxed environments, static analysis tools, and dynamic exploitation logic.

The network-pentest mode operates as a ReAct-loop agent equipped with 63 bind-tools. It scans live targets, identifies services, and executes sandboxed Kali Linux utilities. Crucially, exploit execution is gated behind a human-approval guardrail, ensuring operator control over active testing phases. Outputs are persisted to a knowledge graph for longitudinal tracking.

The source-code hunter mode utilizes a file-parallel agent pipeline. It ranks source files, deploys per-file hunter agents, and utilizes AddressSanitizer (ASan) and UndefinedBehaviorSanitizer (UBSan) crashes as ground truth for vulnerability validation. Findings undergo adversarial verification via a second-pass agent. The reporting structure enforces explicit evidence levels ranging from `suspicion` to `patch_validated`, emitting SARIF, markdown, or JSON artifacts compatible with CI/CD pipelines.

Technical implementation relies on Python 3.10+ with a Rust toolchain for the `genai-pyo3` bridge. Docker isolation is used for Kali containers and sanitizer-image sandboxes. Configuration is managed via `~/.clearwing/config.yaml` or environment variables supporting OpenAI-compatible endpoints (OpenRouter, Ollama, vLLM, etc.).

**Linkage Check**
*   **Dependency Verification:** Validate `genai-pyo3` Rust compilation against local toolchain versions (requires `rustup update stable`).
*   **Endpoint Compatibility:** Confirm model provider supports tool-calling schemas required by LangGraph agents.
*   **Network Isolation:** Ensure sandboxed Kali containers do not leak to host networks; verify firewall rules for live scanning targets.
*   **Legal Scope:** Confirm written authorization exists for all scanned targets; audit logs must be retained for compliance.

**Mediation**
mediation:
  tooling: "OpenRouter / Claude-Opus-4"
  use: ["research synthesis", "entry drafting"]
  humanRole: "queued for review"
  limits: "sourced from public documentation; verify claims before promotion"