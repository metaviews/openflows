---
layout: layouts/currency-item.njk
title: WhatCanIRun
date: 2026-04-18
currencyType: "current"
currencyId: whatcanirun
abstract: A CLI and web-based tool for discovering, benchmarking, and managing open-weight language models on local hardware.
tags:
  - currency
  - local-inference
  - benchmarking
  - tooling
permalink: /currency/currents/whatcanirun/
links:
  - id: lm-studio
    relation: complementary desktop inference interface for local model management
  - id: ollama
    relation: compatible local inference runtime for standardized model serving
  - id: local-inference-baseline
    relation: component within the circuit normalizing local inference infrastructure
mediation:
  tooling: "OpenRouter / qwen/qwen3.5-flash-02-23"
  use:
    - "drafted entry from external signal"
    - "assessed linkage against existing knowledge base"
  humanRole: "review, edit, and approve before publication"
  limits: "signal content may be incomplete; verify primary sources before publishing"
---

### Signal
[whatcanirun](https://github.com/fiveoutofnine/whatcanirun) · github · 2026-04-18
A monorepo project providing a CLI tool and web interface to discover, benchmark, and manage open-weight language models for local hardware execution. The repository includes a Next.js web application for browsing model compatibility and community benchmarks, alongside a CLI utility for running standardized benchmarks and submitting results to a central database.

### Context
Local inference hardware varies significantly in memory capacity, architecture (Apple Silicon, NVIDIA, Ascend), and backend support (llama.cpp, MLX, vLLM). Operators require infrastructure to map model requirements against specific device capabilities to avoid deployment failures. This tool addresses the discovery and validation gap by standardizing benchmark data across different hardware configurations.

### Relevance
This entry supports the `local-inference-baseline` circuit by providing operational data necessary for making informed deployment decisions. It shifts model selection from theoretical specification to empirical hardware performance, reducing friction in local AI infrastructure setup. The tooling enables operators to maintain a curated library of verified model-runtime pairs.

### Current State
The project is structured as a Bun/Turborepo monorepo containing a web dashboard (`apps/www`) and a CLI (`apps/cli`). The CLI supports benchmark execution, device inspection, and result submission. The web application aggregates community benchmark data and allows filtering by device type. The codebase is open-source and focuses on reproducibility of local inference metrics.

### Open Questions
- How are benchmark results normalized across different backend implementations (e.g., llama.cpp vs MLX)?
- Does the tool verify model licensing compliance before recommending deployment?
- What is the process for integrating new runtime backends beyond the current supported list?
- How does the system handle model updates that change memory or compute requirements?

### Connections
- **lm-studio**: Provides a desktop interface for local inference, complementing the discovery and benchmarking focus of this tool.
- **ollama**: Serves as a compatible runtime for the models discovered and benchmarked by this entry.
- **local-inference-baseline**: This tool contributes data and operational patterns to the circuit normalizing local inference infrastructure.