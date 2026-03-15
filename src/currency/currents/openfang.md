---
layout: layouts/currency-item.njk
title: "OpenFang"
date: 2026-02-28
currencyType: "current"
currencyId: openfang
abstract: "A Rust-based agent operating system signal emphasizing sandboxed execution, security layers, and multi-channel autonomous workflows."
tags:
  - currency
permalink: /currency/currents/openfang/
links:
  - id: crewai
    relation: "is adjacent to agent orchestration patterns represented by"
  - id: overture-sixhq
    relation: "extends the orchestration layer toward a more full-stack runtime than"
  - id: signal-org
    relation: "raises adjacent questions about secure communication channels and trust boundaries represented by"
lastReviewed: 2026-03-15
---

### Signal

[OpenFang](https://www.openfang.sh/) presents itself as an open-source agent operating system built in Rust, combining autonomous agents, channel adapters, built-in tools, and sandboxed execution into a single runtime.

### Context

The movement here is from lightweight agent frameworks toward full-stack operational environments. Orchestration, memory, security controls, channel integration, and desktop/runtime management are bundled into one opinionated system.

### Relevance

For Openflows, this matters because it makes mediation infrastructure explicit at the systems level. A security-aware agent runtime is easier to audit, constrain, and reason about than loosely assembled automation chains.

### Current State

Emerging but ambitious infrastructure signal, with a strong emphasis on sandboxing, auditability, and autonomous workflow packaging.

### Open Questions

- Which security claims hold up under independent review in real deployments?
- How much operational complexity is reduced versus merely relocated into the runtime?
- What governance patterns are needed when autonomous agents span many communication channels?

### Connections

- Linked to `crewai` and `overture-sixhq` as orchestration adjacencies.
- Linked to `signal-org` as a communication-trust boundary adjacency.

## Updates

**2026-03-15**: OpenFang has advanced to v0.1.0, delivering a 137K-line Rust codebase with Tauri 2.0 desktop support and native integration for Model Context Protocol (MCP) and Google A2A. The release details 40 channel adapters, 38 tools, and 16 security systems, including WASM dual-metering and Ed25519 manifest signing. These concrete specifications validate the project's security and interoperability claims beyond its initial emerging phase.