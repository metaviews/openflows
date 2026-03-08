---
layout: layouts/currency-item.njk
title: "RynnBrain（具身基础模型）"
lang: zh
date: 2026-02-15
currencyType: "current"
currencyId: rynnbrain
abstract: "阿里巴巴达摩院开源具身基础模型家族，标志着一条更坚实的开放路径：从多模态感知走向扎根于现实的机器人规划。"
tags:
  - currency
permalink: /zh/currency/currents/rynnbrain/
links:
  - id: local-inference-baseline
    relation: "作为下游扩展，将本地推理（local inference）连接至具身执行"
  - id: embodied-ai-governance
    relation: "为感知与规划物理世界的开放基础模型栈贡献力量"
mediation:
  tooling: "OpenRouter / qwen/qwen3.5-flash-02-23"
  use:
    - "翻译原始英文条目"
    - "依照音译词汇表保留双语术语"
  humanRole: "审阅、修订并在发布前确认"
  limits: "翻译为起点；语言能力和文化判断须由人工完成"
---

**信号 (Signal)**
RynnBrain 发布了一套开放的具身基础模型（embodied foundation model）家族，专注于物理世界的理解、定位、推理与任务规划。

**背景 (Context)**
公开发布版本包含稠密（dense）与混合专家（MoE）变体（2B, 8B, 30B-A3B），以及用于特定任务的衍生品：规划（RynnBrain-Plan）、导航（RynnBrain-Nav）与空间推理（RynnBrain-CoP）。官方 GitHub 发布日志将代码与检查点定于 2026 年 2 月 9 日，技术报告定于 2026 年 2 月 15 日。

**关联 (Relevance)**
对于 Openflows（开流）而言，这标志着从单一语言模型效用向具身认知回路（embodied cognition loops）的转变。重心已从文本解读移向真实环境中的情境化行动规划（situated action planning）。

**现状 (Current State)**
发布不久，正快速形成开放的机器人基础技术栈（foundation stack）。

**开放问题 (Open Questions)**
在不受控的物理环境中，有多少基准性能能被转化为可靠、低摩擦的部署？当与下游的 VLA（Vision-Language-Action）策略集成时，哪些规划抽象（planning abstractions）仍保持可inspect性？本地和边缘部署中，怎样的运行画像（compute, latency, memory）是可预期的？

**连接 (Connections)**
链接至 local-inference-baseline，作为从本地推理延伸向具身执行的下行拓展。
链接至 embodied-ai-governance，为物理世界的感知与规划提供开放基础模型栈。

**译注**
- **流 (liú)**：此处"Current"译为"流"，指代知识生态中流动的、尚未固化为“回路”（Circuit）的信标。
- **具身 (Embodied)**：在 AI 语境下，"Embodied"强调模型需与物理实体及其环境发生互动，而非纯虚拟计算。中文"具身"一词保留了"body"（身）与"practice"（修行/行）的双重意味。
- **扎根 (Grounded)**：此处译为"扎根"，取"grounded"之土之意，喻指 AI 决策在物理世界中的真实锚点，区别于纯语言模型的知识堆叠。