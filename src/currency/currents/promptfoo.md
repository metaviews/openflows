---
layout: layouts/currency-item.njk
title: promptfoo
date: 2026-04-01
currencyType: "current"
currencyId: promptfoo
abstract: A command-line and library tool for evaluating and red-teaming LLM applications, enabling declarative configuration for CI/CD integration and performance comparison across model providers.
tags:
  - currency
  - evaluation
  - red-teaming
  - llmops
  - testing
permalink: /currency/currents/promptfoo/
links:
  - id: onyx-ai-open-llm-leaderboard
    relation: "evaluation benchmarking infrastructure"
  - id: feedback-circuit
    relation: "evaluation data feeding loop"
  - id: inspectable-agent-operations
    relation: "operational visibility layer"
  - id: anthropic-performance-engineering-take-home
    relation: "evaluation criteria standard"
mediation:
  tooling: "OpenRouter / qwen/qwen3.5-flash-02-23"
  use:
    - "drafted entry from external signal"
    - "assessed linkage against existing knowledge base"
  humanRole: "review, edit, and approve before publication"
  limits: "signal content may be incomplete; verify primary sources before publishing"
---

### Signal
[promptfoo](https://github.com/promptfoo/promptfoo) · github · 2026-04-01
A CLI and library for evaluating and red-teaming LLM applications, supporting declarative configurations with command line and CI/CD integration. The tool facilitates performance comparison across GPT, Claude, Gemini, Llama, and other providers, and is noted for usage by OpenAI and Anthropic. The project remains open source and MIT licensed despite recent acquisition by OpenAI.

### Context
Evaluation infrastructure is transitioning from ad-hoc scripts to standardized tooling integrated into development lifecycles. Promptfoo represents a shift toward treating prompt and agent reliability as a measurable, testable engineering discipline rather than a heuristic process. Its integration with CI/CD pipelines signals the normalization of LLM evaluation as a gatekeeping mechanism for deployment.

### Relevance
Reliability and security in agentic systems depend on consistent evaluation metrics. Promptfoo's focus on red-teaming and vulnerability scanning addresses the operational risk of autonomous agents executing harmful or unintended actions. By providing a unified interface for model comparison, it reduces fragmentation in how teams validate performance across different provider backends.

### Current State
The tool is actively maintained with support for npm, brew, and pip installations. It offers a declarative configuration format that simplifies the definition of test cases and evaluation criteria. The acquisition by OpenAI has not altered its open-source status, but introduces questions regarding future alignment with proprietary evaluation standards versus community-driven benchmarks.

### Open Questions
How does the OpenAI affiliation impact the tool's neutrality when evaluating OpenAI models versus competitors? Will the evaluation framework evolve to support specific OpenAI agent architectures exclusively? How does the tool handle stateful agent interactions compared to stateless prompt testing?

### Connections
The entry links to `onyx-ai-open-llm-leaderboard` for standardized benchmarking context, `feedback-circuit` for the operational loop where evaluation results inform iteration, `inspectable-agent-operations` for visibility into agent behavior, and `anthropic-performance-engineering-take-home` for alignment with industry evaluation criteria standards. These connections establish promptfoo as a foundational component in the infrastructure layer for agent reliability.