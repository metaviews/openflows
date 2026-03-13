
</think>

---
layout: layouts/currency-item.njk
title: "Llama 4 开源模型家族"
lang: zh
date: 2026-03-07
currencyType: "current"
currencyId: llama-4-open-model
abstract: "Meta 发布 Llama 4，这是一个包含 Scout 和 Maverick 配置的混合模型家族，将多语言支持扩展到另外八种语言。"
tags:
  - currency
permalink: /zh/currency/currents/llama-4-open-model/
links:
  - id: open-weights-commons
    relation: "维持开放模型流通循环的核心基础模型发布"
  - id: ollama
    relation: "在个人硬件上拉取和提供这些权重的主要本地运行时"
  - id: thomas-wolf
    relation: "通过 Hugging Face 生态系统使前沿权重可访问和可再分配的关键操作者"
mediation:
  tooling: "OpenRouter / qwen/qwen3.5-flash-02-23"
  use:
    - "翻译原始英文条目"
    - "依照音译词汇表保留双语术语"
  humanRole: "审阅、修订并在发布前确认"
  limits: "翻译为起点；语言能力和文化判断须由人工完成"
---

信号源：Exploding Topics (2026-03-06) 的信号将 Llama 4 识别为活跃的大型语言模型家族 (Large Language Model Family)。条目指明其架构为混合模型 (mixture-of-models)，包含 Llama 4 Scout（约 109B 总参）和 Llama 4 Maverick（约 400B 总参）。Meta 同时扩展了多语言能力，在先前迭代基础上增加了八种语言支持。

背景：Llama 4 代表了 Meta 开放权重 (open weights) 策略的延续，遵循 Llama 2 和 Llama 3 的轨迹。架构向混合专家 (MoE) 的转变平衡了参数量与计算效率，这是同期行业发展的既定模式。该模型作为下游应用的基础设施 (infrastructure)，而非面向终端用户的产品。

关联：此条目锚定了 Openflows（开流）知识库中开源基础模型的当前状态。它定义了本地推理 (local inference) 需求和独立开发者可用的多语言能力的基线。此次发布影响了开放权重生态系统的操作边界和本地计算阈值。

当前状态：该家族作为基础模型层可供集成。Scout 变体针对通用效率，约 109B 参数；Maverick 针对复杂推理任务，约 400B 参数。多语言支持涵盖信号中识别的八种新语言，扩展了全球部署模式的操作范围。

待解问题：公共权重发布节奏的验证状态仍待定，与内部公告相比。Maverick 变体的许可条款需要澄清商业和研究使用边界。Scout 配置相对于参数量的实际基准性能在开源存储库中尚未记录。

连接：链接到 open-weights-commons 作为核心基础模型发布，维持开放模型流通循环。链接到 ollama 作为在个人硬件上拉取和提供这些权重的主要本地运行时。链接到 thomas-wolf 作为通过 Hugging Face 生态系统使前沿权重可访问和可再分配的关键操作者。

**译注**
本条目类型为 `current`（流，liú），指代生态系统中流动的个体信号，不同于闭合的 `circuit`（回路，huí lù）。此处“当前状态”译为“当前状态”而非“流状态”，以区分时间维度的“现在”与能量维度的“流动”。Openflows（开流）一词强调“开启流动”的意涵，在中文语境中对应“开源”与“流通”的双重逻辑。