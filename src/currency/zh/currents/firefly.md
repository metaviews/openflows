---
layout: layouts/currency-item.njk
title: "火萤 (Firefly)"
lang: zh
date: 2026-03-14
currencyType: "current"
currencyId: firefly
abstract: "火萤是一个开源框架，用于大语言模型训练，支持在多种模型架构上进行预训练、指令微调（SFT）和直接偏好优化（DPO），并采用 QLoRA 优化。"
tags:
  - currency
permalink: /zh/currency/currents/firefly/
links:
  - id: unsloth-fine-tuning
    relation: "integrates Unsloth for memory-efficient training acceleration and contributes upstream model support"
  - id: open-weights-commons
    relation: "distributes fine-tuned model weights via HuggingFace as part of open model circulation"
mediation:
  tooling: "OpenRouter / qwen/qwen3.5-flash-02-23"
  use:
    - "翻译原始英文条目"
    - "依照音译词汇表保留双语术语"
  humanRole: "审阅、修订并在发布前确认"
  limits: "翻译为起点；语言能力和文化判断须由人工完成"
---

**Signal** GitHub 仓库 yangjianxin1/Firefly 提供一站式大模型训练工具。它支持 Qwen2、Llama3、Yi 等模型的预训练、指令微调（SFT）和直接偏好优化（DPO）。项目强调基于配置的训练，支持全参数、LoRA 和 QLoRA 方法，并集成 Unsloth 以加速。

**Context** Firefly 位于训练基础设施层，与 vLLM 等推理（inference）服务引擎或 Ollama 等本地运行时工具不同。它面向需要可访问微调流程以利用开放权重（open weights）的开发者和研究者。该项目顺应通过感知量化训练方法降低模型定制硬件门槛的趋势。

**Relevance** 该框架通过统一数据集准备、模型配置和训练执行，减少了微调工作流的摩擦。其对 QLoRA 的支持验证了消费级硬件上的内存高效训练。对多样模型架构（中文和英文）的支持体现了开放模型生态的多生态性质。

**Current State** 仓库处于活跃状态，提供 v0.0.1-alpha 版本。它已为 Unsloth 项目贡献了上游 PR，以支持 Qwen2 模型结构。模型权重和数据集（如 firefly-train-1.1M）托管于 HuggingFace。

**Open Questions** 相对于专有训练平台，其长期维护和社区采用情况。在不信任环境中训练管道的安全影响。与智能体（agentic）工作流集成以实现自主模型迭代。

**Connections** Firefly 依赖 unsloth-fine-tuning 进行内核级优化和内存管理，为其上游生态做出贡献。它通过发布训练权重和数据集为开放权重社区（open-weights-commons）做贡献，支持下游适应和评估。

**译注**
- **火萤 (Firefly)**：在中文语境中，火萤常指引路之光。此处作为开源项目名，既保留原意，亦隐喻其在模型生态中提供指引与透明度的作用。
- **流 (Current)**：本条目类型为 "current"，对应词汇表中“流 (liú)"，指代在系统中流动的信号或动态实体，区别于静态的“流通 (Currency)"。
- **理 (Li)**：微调工作流中的“摩擦”减少，实则是顺应了训练数据的自然之理（lǐ），使算力与意图更顺畅地结合。