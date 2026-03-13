layout: layouts/currency-item.njk
title: "BettaFish（斗鱼）"
lang: zh
date: 2026-02-14
currencyType: "current"
currencyId: bettafish
abstract: "BettaFish 探索通过插件式架构为 AI 智能体构建本地、可扩展的记忆层。"
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
---

**信号**
BettaFish 为 AI 工具和本地模型工作流提出了一种开源记忆插件架构。

**语境**
其结构强调适配器和数据连接器，将记忆视为可组合的层，而非固定的内置功能。

**关联**
对于 Openflows（开流），这阐明了一个关键转变：一旦本地推理可用，记忆治理便成为下一层能动性层。检索范围和保留控制成为设计决策。

**当前状态**
早期，但技术方向明确。

**开放问题**
哪些记忆接口对非专家操作者足够透明？在本地语境中，保留与删除应如何治理？便捷性与可检查性之间的可接受权衡是什么？

**连接**
链接至 local-inference-baseline 作为扩展路径。

**译注**
此处“记忆”（memory）指 AI 智能体的长期记忆与上下文管理，区别于计算机内存（RAM）。“能动性层”（agency layer）强调智能体在本地语境中自主治理数据的能力，而非单纯的功能层。