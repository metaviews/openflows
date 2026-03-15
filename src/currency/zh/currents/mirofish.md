---
layout: layouts/currency-item.njk
title: "MiroFish（米罗鱼）"
lang: zh
date: 2026-02-14
currencyType: "current"
currencyId: mirofish
abstract: "MiroFish 将自己视作为开源记忆操作系统，为 AI 工作流延伸个人知识的保存与检索能力。"
tags:
- currency
permalink: /zh/currency/currents/mirofish/
links:
- id: local-inference-baseline
  relation: "builds on the environment described in"
- id: bettafish
  relation: "runs in parallel with"
mediation:
  tooling: "OpenRouter / qwen/qwen3.5-flash-02-23"
  use:
    - "翻译原始英文条目"
    - "依照音译词汇表保留双语术语"
  humanRole: "审阅、修订并在发布前确认"
  limits: "翻译为起点；语言能力和文化判断须由人工完成"
lastReviewed: 2026-03-15
---

**信号 (Signal)**：MiroFish 提出了一套面向记忆的操作层（memory operating layer），服务于 AI 时代的劳作，核心在于跨会话的持久化上下文（persistent context）。

**语境 (Context)**：重心从一次性的模型响应（one-off model responses）转向连续性（continuity）：即，哪些内容可被捕获、组织，并在未来的循环中再次进入。

**关联 (Relevance)**：对于 Openflows（开流），连续性是认知复利（compounding cognition）的结构条件。记忆操作系统模式暗示了一种本地智能（local intelligence），可随时间推移进行迭代、检视与修订。

**当前状态 (Current State)**：涌现中的基础设施模式，尚处积极探索阶段。

**待解问题 (Open Questions)**：个人知识的边界应如何编码与审计？便携式、本地优先（local-first）的记忆连续性需要哪些原语（primitives）？记忆系统如何避免低质量上下文（low-quality context）的静默积累？

**连接 (Connections)**：依赖条件：链接至本地推理基线（local-inference-baseline）作为前置条件。并行探索：链接至 bettafish（斗鱼）作为平行层的记忆延伸。

**译注 (Translator's Note)**

1.  **Current (流) vs. Currency (流通)**：在 Openflows 语义体系中，"Current"指流动的讯息信号（流，liú），是尚未闭合的循环；而"Currency"指已沉淀为资产的价值层（流通，liú tōng）。此处条目类型为 current，故译文强调其为“流”之动向，尚未成为“库”之沉淀。
2.  **Openflows（开流）**：保留品牌名 Openflows，首现处加注开流（kāi liú），提示其 "Open" 与 "Flow" 的双重意涵；"开源"一词在中文语境已约定为 Open source，为免混淆，此处不混用。
3.  **本地推理 (Local Inference)**：译为“本地推理（local-inference）”以保留技术原义。此处 "inference" 与"理（li）"相通，指代模型处理信息的自然条理，故中文保留"理"字的认知深度，而非仅解为"推断"。
4.  **Compounding Cognition (认知的复利)**：将"Compounding"译为复利，强调知识在时间维度上的数学性增长与质变，非简单的重复累积。

---