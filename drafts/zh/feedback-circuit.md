---
layout: layouts/currency-item.njk
title: "反馈回路 (Feedback Circuit)"
lang: zh
date: 2026-02-09
currencyType: "circuit"
currencyId: feedback-circuit
abstract: "一个将重复观察映射为分类瓶颈的循环，连接响应与修订，使经验随时间累积。"
tags:
  - currency
permalink: /zh/currency/circuits/feedback-circuit/
links:
  - id: 6pack-care
    relation: "contributes daily lightweight feedback loop patterns to"
  - id: openpilot
    relation: "contributes continuous real-world iteration and revision patterns to"
  - id: qwen-agent
    relation: "contributes agentic task-completion cycles with observable intermediate steps to"
mediation:
  tooling: "OpenRouter / qwen/qwen3.5-flash-02-23"
  use:
    - "翻译原始英文条目"
    - "依照音译词汇表保留双语术语"
  humanRole: "审阅、修订并在发布前确认"
  limits: "翻译为起点；语言能力和文化判断须由人工完成"
---

此回路 (Circuit) 闭合了一个始终存在却鲜少显化的循环：从所观察之物，经由所改变之物，至所习得之物的路径。启动条件是积累。运行足够久的系统——智能体、产品、实践——会产生重复信号。相同故障模式出现在不同运行中。相同用户困惑出现在不同会话中。相同瓶颈在每次补丁后重现。若无反馈回路，这些重复仍是孤立事件，各自孤立处理，教训被困在事故中而非回归设计。回路赋予重复以功能。

观察随发生而收集——不为预先过滤显著性，而是原始收集。由此积累，类别涌现：相似事件集群指向共享结构成因而非一系列独立问题。这些类别非最终定论；它们是系统何处抵抗其自身目的之假设。响应跟随类别，而非个别事件。这是回路的核心反转。而非对每个信号到来即反应，干预指向信号之下的模式。此转变改变何为修复：非关闭工单，而是改变生成工单的条件。

修订随后反馈至观察层。接下来收集什么反映曾被改变。消失的类别确认干预。持续或变异的类别表明改变肤浅。循环继续——非无尽循环，而是棘轮：每转或闭合间隙或识别更深间隙。

在 Openflows（开流）内，反馈回路是承重基础设施。数个回路依赖它：可检查的智能体操作需反馈层以保持随时间可治理；自主研究问责需结构化修订周期以保持人类阐释权威运作。反馈回路非众多回路之一——它是使所有其他回路可改进的修正机制。

回路在此刻闭合：观察、分类、响应与修订形成连续循环——且当该循环每转产生一个比上次更与其既定目的对齐的系统时。

**译注**
- **回路 (Circuit) vs 循环 (Loop)**：文中区分了 generic "loop" (循环) 与功能性的 "Circuit" (回路)。回路强调闭合路径与结构意义，循环仅指重复动作。
- **棘轮 (Ratchet)**：隐喻单向进步，区别于无意义的无尽循环。
- **理 (Li)**：虽未直译，但“信号之下的模式”与“共享结构成因”暗合“理”之意，即事物内在的纹理与规律。