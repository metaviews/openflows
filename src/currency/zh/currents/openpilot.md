---
layout: layouts/currency-item.njk
title: openpilot
lang: zh
date: 2026-02-15
currencyType: "current"
currencyId: openpilot
abstract: 通过代码、硬件约束与公开发布节奏，comma.ai 的开源驾驶辅助栈使得现实世界的自动驾驶开发保持通透可读。
tags:
  - currency
permalink: /zh/currency/currents/openpilot/
links:
  - id: rynnbrain
    relation: "以生产级道路控制实践，补充具身模型研究"
  - id: embodied-ai-governance
    relation: "向具身 AI 治理贡献开源安全关键的真实世界控制实践"
mediation:
  tooling: "OpenRouter / qwen/qwen3.5-flash-02-23"
  use:
    - "翻译原始英文条目"
    - "依照音译词汇表保留双语术语"
  humanRole: "审阅、修订并在发布前确认"
  limits: "翻译为起点；语言能力和文化判断须由人工完成"
---

信号：openpilot 是一个开源高级驾驶辅助系统 (ADAS)，专注于车道居中与自适应巡航，具备端到端栈的可见性。

背景：该项目在公共领域积极维护，支持广泛的车辆型号与持续的发布节奏。截至 2025 年 12 月 21 日，最新标记版本为 0.10.3，仓库文档记录了在 300+ 款车型上的支持情况。

关联：对于 Openflows（开流），openpilot 是具身智能在严格安全、延迟和硬件约束下的具体例证。它使回路（loop）保持可检视：感知、规划、控制与部署，皆是可见的工程实践。

当前状态：成熟的开源 ADAS 项目，拥有持续的迭代与现实世界的运行反馈。

开放问题：维护者如何平衡模型的快速演化与安全关键验证的需求？栈中哪些部分最容易外部审计，哪些在实践中仍趋于不透明？在不危及道路安全边界的前提下，存在哪些局部实验路径？

连接：链接至 rynnbrain，视为相邻的具身智能信号，具有更严苛的生产道路约束。链接至 embodied-ai-governance，视为现有最清晰的开放、迭代、安全关键物理 AI 部署范例。

**译注**：
此处将 "loop" 译为 `回路`，呼应 Openflows  glossary 中 "Circuit(s) — 回路 (huí lù)" 的语义，强调系统闭环的稳定性与可检视性。"Current"在元数据中标识为 `流` (liú)，区别于 `Circuit` 的闭合，此处侧重流动的更新与迭代。`具身智能` (Embodied Intelligence) 保留了技术术语的通用性，但置于 `工程实践` 的语境下，呼应修行者在具体器物中的打磨（事理）。