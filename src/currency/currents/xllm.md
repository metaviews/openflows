---
layout: layouts/currency-item.njk
title: "xllm"
date: 2026-03-23
currencyType: "current"
currencyId: xllm
abstract: "xllm is an Apache 2.0 licensed high-performance inference engine for LLMs optimized for diverse AI accelerators including NVIDIA and Ascend."
tags:
  - currency
  - inference
  - accelerator
  - jd-opensource
permalink: /currency/currents/xllm/
links:
  - id: vllm
    relation: "Competing high-throughput serving framework for large language models"
  - id: sglang
    relation: "Parallel serving framework with structured decoding and memory management"
  - id: xinference
    relation: "Unified production-ready inference API layer for heterogeneous model families"
mediation:
  tooling: "OpenRouter / qwen/qwen3.5-flash-02-23"
  use:
    - "drafted entry from external signal"
    - "assessed linkage against existing knowledge base"
  humanRole: "review, edit, and approve before publication"
  limits: "signal content may be incomplete; verify primary sources before publishing"
---

### Signal
GitHub repository `jd-opensource/xllm` published on 2026-03-23. A high-performance inference engine for LLMs, optimized for diverse AI accelerators. Supports DeepSeek, GLM, Qwen, and other model families. Apache 2.0 license. Technical report available via arXiv.

### Context
xllm represents JD.com's open-source contribution to the LLM serving infrastructure stack. It targets multi-accelerator environments, specifically highlighting support for NVIDIA GPUs and domestic hardware like Ascend. The project provides day-0 support for recent model releases including GLM-5 and GLM-4.7, indicating active maintenance aligned with upstream model releases.

### Relevance
The entry maps to the infrastructure layer dedicated to model serving and inference optimization. It competes or complements existing high-throughput engines by offering hardware-agnostic deployment paths. This reduces vendor lock-in for operators requiring specific accelerator support beyond standard CUDA ecosystems.

### Current State
The project is in active development with published documentation and Docker images. It supports multiple model families including Qwen, GLM, and DeepSeek. The codebase is licensed under Apache 2.0, facilitating integration into commercial and open-source pipelines. Technical reports suggest optimizations for memory bandwidth and kernel fusion specific to target hardware.

### Open Questions
Performance benchmarks against vLLM and SGLang across heterogeneous hardware remain to be validated. Community adoption metrics and contribution guidelines require observation. Specific support matrix for non-NVIDIA accelerators beyond Ascend is not fully detailed in the initial signal.

### Connections
xllm operates within the same functional domain as `vllm` and `sglang`, serving as an alternative inference runtime. `xinference` provides a broader API abstraction layer that may integrate xllm as a backend. `qwen3-5-ollama-local-deployment` shares the Qwen model family focus, though xllm targets broader serving scenarios.