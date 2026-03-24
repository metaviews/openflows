---
layout: layouts/currency-item.njk
title: "zai-org GLM-5"
date: 2026-03-24
currencyType: "current"
currencyId: zai-org-glm-5
abstract: "zai-org/GLM-5 is a 744-billion-parameter sparse attention text-generation model utilizing asynchronous reinforcement learning infrastructure to optimize long-horizon agentic task performance."
tags:
  - currency
  - model
  - zai-org
  - glm-5
permalink: /currency/currents/zai-org-glm-5/
links:
  - id: z-ai
    relation: "API platform hosting GLM-5 inference services"
  - id: chinese-open-source-llm-landscape-2026
    relation: "Primary infrastructure example within the Chinese open-weight model ecosystem"
  - id: transformers-library
    relation: "Primary Python interface for model loading and inference"
mediation:
  tooling: "OpenRouter / qwen/qwen3.5-flash-02-23"
  use:
    - "drafted entry from external signal"
    - "assessed linkage against existing knowledge base"
  humanRole: "review, edit, and approve before publication"
  limits: "signal content may be incomplete; verify primary sources before publishing"
---

### Signal
[zai-org/GLM-5](https://huggingface.co/zai-org/GLM-5) · HuggingFace · 2026-03-24

text-generation model | likes: 1860 | downloads: 136040
License: MIT
Library: transformers
Pipeline Tag: text-generation
Languages: en, zh
### Context
GLM-5 represents the latest iteration in the GLM model family developed by Zai Org (formerly THUDM). It scales from the previous GLM-4.5 configuration (355B parameters, 32B active) to 744B parameters (40B active). Pre-training data volume increased to 28.5T tokens from 23T. The architecture integrates DeepSeek Sparse Attention (DSA) to reduce deployment costs while maintaining long-context capacity. The release includes the `slime` asynchronous reinforcement learning infrastructure to improve training throughput.

### Relevance
This entry documents a high-parameter open-weight model explicitly targeting complex systems engineering and long-horizon agentic tasks. It signals a shift in the GLM family toward specialized agentic workloads rather than general chat interfaces. The use of sparse attention mechanisms highlights ongoing optimization for inference efficiency at scale.

### Current State
Weights are publicly available on HuggingFace under an MIT license. API services are accessible via the Z.ai API Platform. The model supports English and Chinese language generation. No official local quantization guides are currently linked in the primary signal.

### Open Questions
- How does the asynchronous RL infrastructure (`slime`) compare to standard SFT pipelines in terms of model alignment stability?
- What is the practical inference cost for 744B parameter models on consumer hardware versus enterprise clusters?
- Are there specific agent frameworks (e.g., OpenClaw, Sage) that have adapted to the GLM-5 architecture for tool use?

### Connections
The model operates within the broader Chinese open-source model infrastructure, competing with and complementing Western model releases. It relies on the standard `transformers` library for local interaction. Deployment is facilitated through the Z.ai API ecosystem, which abstracts the underlying model complexity.