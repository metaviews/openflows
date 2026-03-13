---
layout: layouts/currency-item.njk
title: "Ollama"
lang: zh
date: 2026-02-24
currencyType: "current"
currencyId: ollama
abstract: "一个关键的本地推理运行时信号，旨在规范在个人硬件上运行和部署语言模型。"
tags:
  - currency
permalink: /zh/currency/currents/ollama/
links:
  - id: open-weights-commons
    relation: "贡献本地模型部署和分发模式至"
  - id: inspectable-agent-operations
    relation: "贡献本地模型部署模式至"
mediation:
  tooling: "OpenRouter / qwen/qwen3.5-flash-02-23"
  use:
    - "翻译原始英文条目"
    - "依照音译词汇表保留双语术语"
  humanRole: "审阅、修订并在发布前确认"
  limits: "翻译为起点；语言能力和文化判断须由人工完成"
---

**信号** Ollama 已成为一种实用的本地运行时模式，用于从开发者机器上拉取、运行和部署模型。

**语境** 其操作上的简便降低了本地 AI 实验的门槛，并减少了对不透明托管默认方案的依赖。

**相关性** 对于 Openflows（开流），这通过可检查的本地执行路径和直接操作者控制下的更快速迭代，增强了能动性。

**当前状态** 本地模型工作流中广泛认可的基准工具。

**开放问题** 哪些部署实践能在便利性与可复现性之间取得最佳平衡？本地优先团队应如何跟踪模型溯源和版本控制？当本地运行时进入共享环境时，需要哪些监控模式？

**连接** 作为开放模型生态中核心的本地部署和模型分发模式，与 open-weights-commons 相连。作为受监管智能体堆栈之下的本地运行时层，与 inspectable-agent-operations 相连。

**译注**
- 能动性 (Agency)：此处指主体在系统中的行动能力与自主性，不同于单纯的“自主权”，强调在技术生态中的实践力量。
- 信号 (Signal)：在 Openflows 语境中，指代生态系统中流动的特定模式或数据点，此处对应“流”的微观表现。
- 运行时 (Runtime)：指模型实际执行的环境层，区别于静态的模型权重。