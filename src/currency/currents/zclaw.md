---
layout: layouts/currency-item.njk
title: "zclaw"
date: 2026-03-14
currencyType: "current"
currencyId: zclaw
abstract: "zclaw is an MIT-licensed AI personal assistant for ESP32 microcontrollers written in C, fitting a full multi-provider LLM stack including chat, scheduling, GPIO control, and persistent memory into 888 KiB of firmware."
tags:
  - currency
permalink: /currency/currents/zclaw/
links:
  - id: distributed-physical-agent-infrastructure
    relation: "demonstrates the intelligence-to-hardware connection layer at embedded scale"
  - id: local-inference-baseline
    relation: "extends the local inference pattern to microcontroller hardware with remote model backends"
  - id: ollama
    relation: "supports Ollama as one of four LLM provider backends alongside Anthropic, OpenAI, and OpenRouter"
mediation:
  tooling: "Human-drafted entry from primary sources"
  use:
    - "reviewed github.com/tnm/zclaw directly"
  humanRole: "full authorship"
  limits: "embedded hardware capabilities evolve quickly; verify supported ESP32 variants at the repository"
lastReviewed: 2026-03-22
---

### Signal
[zclaw](https://github.com/tnm/zclaw) is an AI personal assistant designed for the ESP32 family of microcontrollers — the smallest known complete LLM-connected agent implementation, fitting Wi-Fi, TLS, multi-provider LLM access, persistent memory, GPIO control, and scheduling into 888 KiB of firmware. 1.9k stars, MIT licensed, actively developed.

### Context
Written in C and built on ESP-IDF/FreeRTOS, zclaw supports four ESP32 variants (ESP32, ESP32-C3, ESP32-S3, ESP32-C6). Only ~38 KiB of the firmware is application logic; the remainder covers networking (44%), cryptography (16%), certificates (12%), and runtime systems (24%). LLM providers supported: Anthropic, OpenAI, OpenRouter, and Ollama. Interaction via Telegram or a hosted web relay. GPIO control includes safety guardrails. A USB admin console enables local recovery and diagnostics. Custom tools compose via natural language at runtime.

### Relevance
zclaw represents the physical endpoint of the open source AI stack — the point where language model inference connects to hardware actuation at the smallest feasible scale. It demonstrates that the full agent loop (memory, scheduling, tool use, communication) can operate within a $5 microcontroller, constrained only by remote inference latency. This has direct implications for distributed physical agent infrastructure and edge deployments where cloud dependency is a liability.

### Current State
Active. Available on GitHub under MIT license with comprehensive documentation, provisioning scripts, and development tooling. 186 commits as of March 2026.

### Open Questions
- What happens to the agent loop under intermittent connectivity — how does zclaw handle inference unavailability?
- How does the GPIO safety guardrail work and what are its failure modes?
- What is the minimum viable local inference approach for fully offline ESP32 operation?

### Connections
zclaw sits at the intersection of the distributed-physical-agent-infrastructure and local-inference-baseline circuits. It extends the local inference pattern beyond the desktop to the embedded edge. The multi-provider support (including Ollama) connects it to the broader open weights ecosystem without hard-coding a single inference provider.
