---
layout: layouts/currency-item.njk
title: "tiny-llm"
date: 2026-03-26
currencyType: "current"
currencyId: "tiny-llm"
abstract: "A system engineering course implementing LLM serving infrastructure on Apple Silicon using MLX, covering attention mechanisms, KV caching, and continuous batching without high-level abstraction layers."
tags:
  - currency
  - llm-serving
  - mlx
  - apple-silicon
  - vllm
permalink: /currency/currents/tiny-llm/
links:
  - id: "vllm"
    relation: "Implements a simplified version of the vLLM inference system"
  - id: "mlx-tune"
    relation: "Utilizes MLX array/matrix APIs for low-level model implementation"
  - id: "vllm-apple-silicon-metal-support"
    relation: "Optimizes inference for Apple Silicon hardware"
  - id: "local-inference-baseline"
    relation: "Contributes to the infrastructure layer for local model inference"
mediation:
  tooling: "OpenRouter / qwen/qwen3.5-flash-02-23"
  use:
    - "drafted entry from external signal"
    - "assessed linkage against existing knowledge base"
  humanRole: "review, edit, and approve before publication"
  limits: "signal content may be incomplete; verify primary sources before publishing"
---

### Signal
- [tiny-llm](https://github.com/skyzh/tiny-llm) · github · 2026-03-26

A course on LLM serving using MLX for system engineers. The codebase is solely based on MLX array/matrix APIs without any high-level neural network APIs, so that we can build the model serving infrastructure from scratch and dig into the optimizations. The goal is to learn the techniques behind efficiently serving a large language model (e.g., Qwen2 models). In week 1, you will implement the necessary components in Python (only Python!) to use the Qwen2 model to generate responses (e.g., attention, RoPE, etc). In week 2, you will implement the inference system which is similar to but a much simpler version of vLLM (e.g., KV cache, continuous batching, flash attention, etc). In week 3, we will cover more advanced topics and how the model interacts with the outside world.

### Context
Local inference infrastructure education often relies on high-level abstractions that obscure underlying mechanisms. This entry documents a curriculum designed to expose system engineers to the raw implementation details of LLM serving, specifically targeting Apple Silicon environments where MLX provides native array support. The course structure emphasizes building from scratch rather than configuring existing binaries, aligning with the Openflows principle of treating AI as infrastructure rather than a black box.

### Relevance
The entry maps directly to the `local-inference-baseline` circuit, which treats language model inference as ordinary local infrastructure. By implementing serving components like KV caching and continuous batching manually, the project reinforces the operational literacy required to maintain and optimize local inference stacks without vendor lock-in. It also intersects with `post-training-model-adaptation-infrastructure` by focusing on the serving layer that follows model training.

### Current State
The project is in active development with Weeks 1 and 2 complete, covering attention mechanisms and the core inference system. Week 3 is in progress, addressing advanced topics and external model interaction. The codebase is Python-only, relying exclusively on MLX array/matrix APIs without high-level neural network libraries, ensuring a clear view of the computational graph and memory management.

### Open Questions
Does the simplified inference system scale to production-grade throughput compared to full vLLM implementations? How does the MLX-native approach compare to CUDA-based serving in terms of developer portability and performance on Apple Silicon? Is there a pathway for this curriculum to integrate with existing agent orchestration frameworks like OpenClaw or vLLM?

### Connections
- **vllm**: Implements a simplified version of the vLLM inference system
- **mlx-tune**: Utilizes MLX array/matrix APIs for low-level model implementation
- **vllm-apple-silicon-metal-support**: Optimizes inference for Apple Silicon hardware
- **local-inference-baseline**: Contributes to the infrastructure layer for local model inference