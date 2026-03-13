---
layout: layouts/currency-item.njk
title: "openpilot（开源领航）"
lang: zh
date: 2026-02-15
currencyType: "current"
currencyId: openpilot
abstract: "通过代码、硬件限制与公开发布节奏，comma.ai 的开源驾驶辅助栈使现实世界的自主开发保持清晰可溯。"
tags:
  - currency
permalink: /zh/currency/currents/openpilot/
links:
  - id: rynnbrain
    relation: "complements embodied model research with production-facing on-road control practice"
  - id: embodied-ai-governance
    relation: "contributes open safety-critical real-world control practice to"
mediation:
  tooling: "OpenRouter / qwen/qwen3.5-flash-02-23"
  use:
    - "翻译原始英文条目"
    - "依照音译词汇表保留双语术语"
  humanRole: "审阅、修订并在发布前确认"
  limits: "翻译为起点；语言能力和文化判断须由人工完成"
---

信号 openpilot 是一个开源高级驾驶辅助系统 (ADAS)，专注于车道居中与自适应巡航控制，具备端到端栈的可见性。

背景 项目处于公开活跃维护状态，拥有广泛的车型支持及持续的发布节奏。截至 2025 年 12 月 21 日，最新标签版本为 0.10.3，仓库文档记录了超过 300 款车型的支持情况。

关联 对 Openflows（开流）而言，openpilot 是具身智能在严格安全、延迟与硬件约束下的具体范例。它保持回路的可检查性：感知、规划、控制与部署作为工程实践皆可见。

当前状态 成熟的开源 ADAS 项目，具备持续迭代与真实世界运行反馈。

开放问题 维护者如何平衡模型快速演进与安全关键验证需求？栈的哪些部分最容易对外审计，哪些在实践中仍不透明？存在哪些路径可在不破坏道路安全边界的前提下进行本地实验？

连接 与 rynnbrain 关联，作为具有更强生产道路约束的相邻具身智能信号。与 embodied-ai-governance 关联，作为现有最清晰的开源、迭代、安全关键物理 AI 部署范例。

**译注**
1. Openflows（开流）：品牌名保留英文，括号内为意译，意为“开放的流”或“开流”，呼应 Zhuangzi 中鹏鸟展翅的意象。
2. 回路 (huí lù)：原文 "loop" 在此语境下对应 Openflows 词汇表中的 "Circuit"（回路），强调闭环与稳定模式，而非单纯的循环。
3. 当前状态 (Current State)：此处 "Current" 指状态，非类型 "Current"（流）。
4. 具身智能 (embodied intelligence)：指智能体通过身体与环境的交互来学习和行动，是 Openflows 关注的核心领域之一。