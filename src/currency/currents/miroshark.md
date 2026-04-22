---
layout: layouts/currency-item.njk
title: "MiroShark"
date: 2026-04-19
currencyType: current
currencyId: miroshark
tags: [currency, multi-agent, simulation, neo4j, polymarket]
permalink: /currency/currents/miroshark/
abstract: "Multi-agent simulation engine generating swarm intelligence from documents to model cross-platform public reaction and prediction markets locally or via API."
links:
  - id: civic-influence-resilience
    relation: "models public reaction and narrative dynamics relevant to civic influence resilience"
  - id: artificial-organisations
    relation: "uses structured multi-agent populations as an analytic method"
  - id: persistent-agent-memory-infrastructure
    relation: "relies on graph memory and state tracking across simulated agents"
---

### Signal
MiroShark is published at [aaronjmars/MiroShark](https://github.com/aaronjmars/MiroShark) as a swarm-intelligence simulation engine for document-driven public reaction and market modeling.

### Context
The system uses graph memory, simulated social platforms, and prediction-market mechanics to model how agents might react to documents and narratives.

### Relevance
MiroShark is relevant because it makes civic and market simulation operational, while also requiring careful limits around synthetic personas, platform assumptions, and interpretation of results.

[MiroShark](https://github.com/aaronjmars/MiroShark) operates as a universal swarm intelligence engine designed to simulate public discourse and market dynamics based on input documentation. It ingests text inputs such as press releases, policy drafts, or financial reports to instantiate hundreds of AI agents with distinct personas. These agents interact across simulated environments representing Twitter, Reddit, and Polymarket, tracking belief states, confidence levels, and trust metrics over time. The system functions as infrastructure for stress-testing narratives and observing emergent social behaviors without requiring live deployment.

### Technical Architecture

The engine relies on a graph-based context model. During the graph build phase, entities and relationships are extracted from the source document and stored in Neo4j. Natural Language Extraction (NER) employs few-shot examples and rejection rules to filter noise. Chunk processing is parallelized using batched Neo4j writes with `UNWIND` operations to ensure throughput.

Agent setup grounds personas in the knowledge graph. Each entity receives five layers of context: graph attributes, relationships, semantic search results, related nodes, and LLM-powered web research. The system automatically distinguishes between individual and institutional personas via keyword matching.

Simulation executes across three platforms simultaneously using `asyncio.gather`. A single LLM-generated prediction market on Polymarket utilizes a Constant Product Market Maker (CPMM) with non-50/50 initial pricing derived from probability estimates. Agents maintain cross-platform visibility; traders observe social sentiment, while social agents react to market prices. Memory management employs a sliding window where older rounds are compacted into summaries via background LLM calls.

Belief states are tracked per agent, recording stance (-1 to +1), confidence (0 to 1), and trust (0 to 1). These heuristics update each round based on interaction outcomes. A ReACT agent synthesizes analytical reports using `simulation_feed`, `market_state`, graph search, and belief trajectory tools, citing specific agent actions and market movements.

### Linkage Check

*   **Repository:** https://github.com/aaronjmars/MiroShark
*   **Neo4j:** Requires local instance or managed service for graph storage and querying.
*   **LLM Provider:** Supports local deployment or cloud API via OpenRouter. Context window limits apply to agent memory and graph retrieval.
*   **Polymarket API:** Requires active account and API keys for market creation and trade execution. Simulation relies on AMM pricing logic.
*   **Social Platforms:** Twitter and Reddit integration requires API access tokens. Rate limits may affect simulation speed.
*   **Asyncio:** Python 3.7+ environment required for concurrent execution.

### Mediation

mediation:
  tooling: "OpenRouter / gpt-4o"
  use: ["research synthesis", "entry drafting"]
  humanRole: "queued for review"
  limits: "sourced from public documentation; verify claims before promotion"
