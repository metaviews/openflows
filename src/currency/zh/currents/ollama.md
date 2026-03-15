---
layout: layouts/currency-item.njk
title: "Ollama"
lang: zh
date: 2026-02-24
currencyType: "current"
currencyId: ollama
abstract: "一个将个人硬件上的语言模型运行与部署规范化的关键本地推理运行时信号。"
tags:
  - currency
permalink: /zh/currency/currents/ollama/
links:
  - id: open-weights-commons
    relation: "为 open-weights-commons 贡献本地模型服务与分发模式"
  - id: inspectable-agent-operations
    relation: "为 inspectable-agent-operations 贡献本地模型服务模式"
mediation:
  tooling: "OpenRouter / qwen/qwen3.5-flash-02-23"
  use:
    - "翻译原始英文条目"
    - "依照音译词汇表保留双语术语"
  humanRole: "审阅、修订并在发布前确认"
  limits: "翻译为起点；语言能力和文化判断须由人工完成"
lastReviewed: 2026-03-15
---

**信号** Ollama 已成为一种实用的本地运行时模式，用于从开发机拉取、运行和部署语言模型。**语境** 其操作上的简易性降低了本地 AI 实验的门槛，并减少了对不透明托管默认配置的依赖。关联意义：对 Openflows（开流）而言，这通过可审视（inspectable）的本地执行路径，及在直接操作者控制下的快速迭代，推进了主体性（Agency）。**当前状态** 本地模型工作流中广泛认可的基准工具。 **开放问题** 哪些部署实践能在便利性与可复现性之间取得最佳平衡？在本地优先（local-first）团队中，应如何追踪模型的源流与版本控制？当本地运行时进入共享环境时，需要何种监控（monitoring）模式？ **连接** 与 open-weights-commons 关联，作为开放模型生态系统中核心的本地部署与模型分发模式。与 inspectable-agent-operations 关联，作为受治理（governed）智能体（Agent）堆栈之下的本地运行时层。

**译注**
*   **主体性 (Agency)**：在技术治理语境中，此处对应“能动性”或“自主权”，选用“主体性”以强调个体在系统内的核心地位与行动能力。
*   **开流 (Openflows)**：首次出现时附注拼音与字面义，呼应系统名中“流”与“通”的意象。
*   **源流 (Provenance)**：中文语境下，“源流”不仅指来源，更暗示知识或物品的流动脉络，契合 Openflows 的系统观。
*   **可审视 (Inspectable)**：选用“审视”而非单纯的“观测”，保留了人类主体参与判断的意涵。