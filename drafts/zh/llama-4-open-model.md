---
layout: layouts/currency-item.njk
title: "Llama 4 开放模型系列"
lang: zh
date: 2026-03-07
currencyType: "current"
currencyId: llama-4-open-model
abstract: "Meta 发布 Llama 4 作为混合架构模型系列，包含 Scout 与 Maverick 配置，扩展支持八种新语言的多语言能力。"
tags:
  - currency
permalink: /zh/currency/currents/llama-4-open-model/
links:
  - id: open-weights-commons
    relation: "开放模型流通的基础设施"
  - id: ollama
    relation: "在个人硬件上运行这些模型权重的主要本地运行时环境"
  - id: thomas-wolf
    relation: "通过 Hugging Face 生态系统分发和再分发前沿模型权重的关键操作者"
mediation:
  tooling: "OpenRouter / qwen/qwen3.5-flash-02-23"
  use:
    - "翻译原始英文条目"
    - "依照音译词汇表保留双语术语"
  humanRole: "审阅、修订并在发布前确认"
  limits: "翻译为起点；语言能力和文化判断须由人工完成"
---

**信号源**  
来自 Exploding Topics (2026-03-06) 的信号源确认 Llama 4 为活跃的大型语言模型系列。条目指定包含 Llama 4 Scout（总计约 109B）和 Llama 4 Maverick（总计约 400B）的混合模型架构。Meta 同时扩展多语言能力，支持比前代迭代更多的八种新语言。

**背景**  
Llama 4 延续 Meta 的开放权重策略，遵循 Llama 2 与 Llama 3 的轨迹。架构向混合专家模型 (MoE) 转变，平衡参数数量与计算效率，这是由并发行业进展确立的模式。模型作为下游应用的基础设施而非终端用户产品运行。

**关联**  
此条目在 Openflows（开流）知识库中锚定开放基础模型的当前状态。它定义了独立开发者可用的本地推理要求与多语言能力的基线。发布影响开放权重生态的操作边界与本地计算阈值。

**当前状态**  
该系列作为基础模型层可供集成。Scout 变体针对通用效率（约 109B 参数），Maverick 针对复杂推理任务（约 400B 参数）。多语言支持覆盖信号中识别的八种新语言，扩展全球部署模式的操作范围。

**待解问题**  
与内部公告相比，公开权重发布的节奏仍待核实。Maverick 变体的授权条款需厘清商业与研究使用的边界。关于 Scout 配置在参数数量上的实际基准性能，尚未在开源仓库中记录。

**连接**  
链接至 open-weights-commons 作为维持开放模型流通回路的核心基础模型发布。链接至 ollama 作为在个人硬件上拉取并服务这些模型权重的主要本地运行时环境。链接至 thomas-wolf 作为通过 Hugging Face 生态系统使前沿权重可访问及可再分发的关键操作者。

**译注**  
推理 (tuī lǐ) 与 理 (lǐ) 共享字符，前者指 AI 的逻辑推演，后者指事物内在的自然纹理。Openflows（开流）之“流”在此处既指 Currency（流通）中的动态层，亦指 The Current（流）中的信号形态。