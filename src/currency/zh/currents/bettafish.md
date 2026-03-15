---
layout: layouts/currency-item.njk
title: BettaFish（搏鱼）
lang: zh
date: 2026-02-14
currencyType: "current"
currencyId: bettafish
abstract: BettaFish 探察面向 AI 智能体的本地可扩展记忆层，采用插件式架构。
tags:
  - currency
permalink: /zh/currency/currents/bettafish/
links:
  - id: local-inference-baseline
    relation: "extends the baseline established in"
mediation:
  tooling: "OpenRouter / qwen/qwen3.5-flash-02-23"
  use:
    - "翻译原始英文条目"
    - "依照音译词汇表保留双语术语"
  humanRole: "审阅、修订并在发布前确认"
  limits: "翻译为起点；语言能力和文化判断须由人工完成"
lastReviewed: 2026-03-15
---

**信号** 搏鱼 (BettaFish) 为 AI 智能体与本地模型工作流提供开源内存插件架构。

**语境** 其结构强调适配器与数据连接器，将记忆视为可组合的层级，而非固定的内置特性。

**关联** 对 Openflows（开流）而言，这突显了一个关键转折：一旦本地推理可用，记忆治理将成为下一层代理权能 (Agency)。检索范围与保留控制转变为设计抉择。

**当前状态** 早期，但技术方向明确。

**开放问题** 哪些记忆接口对非专家操作员足够透明？本地语境下的保留与删除应如何治理？便利性与可检视性之间的何种权衡是可接受的？

**连接** 关联到 local-inference-baseline，作为扩展路径。

**译注**
*   **搏鱼 (BettaFish)**: 搏鱼不仅是斗鱼的物种名，更取其“搏”之动势，象征智能体在记忆层的主动权能，呼应 Zhuangzi 中 鹏 之大志，亦含自我演替之意。
*   **代理权能 (Agency)**: AI 语境中常译作“代理”，此处保留“权能”之意，强调治理层赋予智能体自主行为的理 (lǐ)，而非单纯自动化。
*   **记忆 (Memory)**: 区别于 存储 (Storage)。此处指上下文感知与经验留存，非单纯数据归档，是 修行者 (Practitioner) 的内在经验。
*   **当前 (current)**: 此处 `currencyType` 为 `current`，在 Openflows 脉络中对应“流 (liú)”，意指此条目处于流动演进之中，尚未固化为回路 (circuit)。