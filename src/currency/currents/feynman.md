---
layout: layouts/currency-item.njk
title: "Feynman: Open-Source Research Agent for Scientific Literature"
date: 2026-04-19
currencyType: current
currencyId: feynman
tags: [currency, research, agentic-investigation, cli-native]
permalink: /currency/currents/feynman/
abstract: "Feynman is a CLI-native, open-source AI research agent focused on scientific literature synthesis, multi-agent investigation, and code auditing, supporting both local and cloud inference backends."
---

Feynman is a CLI-native, open-source AI research agent designed to automate the synthesis of scientific literature, enable multi-agent investigation workflows, and audit research code. Unlike general-purpose AI assistants, Feynman is specialized for research-intensive tasks—reading papers, extracting insights, comparing methodologies, and tracing claims across the literature.

## Core Capabilities

**Literature Synthesis**: Feynman can ingest and process scientific papers, technical reports, and arXiv preprints, extracting key claims, methodologies, and results into structured summaries. It maintains context across multiple documents to identify convergence and divergence in research findings.

**Multi-Agent Investigation**: The framework supports delegating subtasks to specialized sub-agents—for example, one agent handling literature search, another focusing on code auditing, and a third synthesizing findings. This division of labor accelerates complex research questions that span multiple domains.

**Code Auditing**: For computational research, Feynman can audit implementation code against published methodologies, identify discrepancies, run unit tests, and verify reproducibility claims. This closes a critical gap in the research pipeline between paper and practice.

**Backend Flexibility**: Feynman supports both local inference (via Ollama, Llama.cpp, or local vLLM deployments) and cloud-based backends (OpenAI, Anthropic, etc.), enabling privacy-conscious researchers to run sensitive work locally while maintaining the option to scale to larger models for complex tasks.

## Architecture

Feynman operates primarily through the terminal, with a CLI interface that supports:
- `feynman ask <query>`: Pose research questions and receive synthesized answers with citations
- `feynman audit <repository>`: Audit code repositories against research claims
- `feynman investigate <topic>`: Launch multi-agent investigation workflows for a given research topic
- `feynman sync`: Pull latest preprints from configured arXiv categories

The CLI design prioritizes reproducibility and audit trails—every response is logged with source citations, enabling researchers to trace conclusions back to primary documents.

## Relation to Existing Tools

Feynman occupies a niche between general-purpose coding agents (like Aider or Cursor) and domain-specific research tools (like Consensus or Scite). It differs from tools like AutoResearch or AutoGen by being purpose-built for *scientific* inquiry rather than general software development or open-ended task automation. It complements tools like Obsidian AI Agents by providing a research-focused workflow rather than general knowledge management.

## Governance and Accountability

The open-source nature of Feynman ensures that research pipelines remain inspectable and editable. Researchers can modify agent behavior, audit the code itself, and verify that their analysis pipeline aligns with their epistemic values—addressing the "black box" concerns that plague proprietary research tools.

## Circuits and Connections

This project intersects several infrastructure patterns documented in Openflows:
- **Autonomous Research Accountability Circuit**: Feynman exemplifies human-maintained interpretive authority by logging citations and enabling traceability.
- **Terminal-Native Agentic Workflows Circuit**: The CLI-first design aligns with the pattern of prioritizing scriptability and auditable workflows over chat-based interfaces.
- **Inspectable Agent Operations Circuit**: Full logging with source citations creates a governable agent operations loop where mediation remains visible and revisable.

Related entries include `autoresearch-karpathy` (minimal autonomous ML experiments), `agentation` (inspecting agent screen states for debugging), and the general research tooling landscape.

**Mediation Block**: This entry was drafted from the Feynman repository README and source code. It reflects the project's current design philosophy as of April 2026 and does not endorse specific model recommendations or implementation trade-offs.