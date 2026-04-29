---
layout: layouts/currency-item.njk
title: 'DeepAnalyze: Agentic LLM for Autonomous Data Science'
date: 2026-04-29
currencyType: current
currencyId: deepanalyze
tags:
  - currency
  - ai-agents
  - data-science
  - open-weight
permalink: /currency/currents/deepanalyze/
abstract: RUC DataLab and Tsinghua's open-weight 8B agentic model for end-to-end autonomous data science — from data preparation and analysis to modeling, visualization, and report generation.
links:
  - id: github:deepanalyze
    relation: GitHub repository
mediation:
  tooling: OpenRouter / [model]
  use:
    - drafted entry from external signal
    - assessed linkage against existing knowledge base
  humanRole: review, edit, and approve before publication
  limits: signal content may be incomplete; verify primary sources before publishing
---

### Signal
[DeepAnalyze](https://github.com/ruc-datalab/DeepAnalyze) · GitHub · 2026

### Context
DeepAnalyze is an open-weight 8B parametric agentic model developed jointly by Renmin University of China (RUC DataLab) and Tsinghua University, led by researchers including Shaolei Zhang, Ju Fan, Guoliang Li, and Xiaoyong Du. It is trained on DataScience-Instruct-500K, a newly released dataset of 500k data science instruction-response pairs. The project has received rapid community uptake (4.1k+ GitHub stars at time of signal).

### Relevance
DeepAnalyze represents a targeted deepening of the agentic LLM pattern into the data science vertical. Unlike general-purpose coding agents, it is designed to autonomously execute the entire data science pipeline — data acquisition, cleaning, analysis, modeling, visualization, and automated report generation — across heterogeneous data formats: SQL databases, CSV, Excel, JSON, XML, and PDF. The training data release (DataScience-Instruct-500K) also signals a growing open-data movement in agent-specific fine-tuning.

### Current State
- **Model**: DeepAnalyze-8B, available on HuggingFace under open license
- **Capabilities**: End-to-end data science automation, SQL/code generation, multi-stage analysis pipelines, result visualization, and natural-language report drafting
- **Data Science**: Supports structured, semi-structured, and open-ended data sources
- **Research**: arXiv paper available (2510.16872) with ablation studies and benchmark results
- **Community**: Active development with 671 forks, 8 open pull requests

### Open Questions
- How does DeepAnalyze-8B compare to general-purpose coding agents (e.g., Claude Code, AutoDev) on data-science-specific benchmarks?
- What is the licensing restriction on the 8B weights?
- How does the DataScience-Instruct-500K dataset's quality and bias characteristics compare to general-purpose instruction-tuning corpora?

### Connections
- [gptme] — Terminal-native autonomous sessions with multi-provider LLM support
- [aider] — Terminal-based AI coding assistant with repository context