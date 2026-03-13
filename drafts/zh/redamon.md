---
layout: layouts/currency-item.njk
title: RedAmon
lang: zh
date: 2026-03-06
currencyType: "current"
currencyId: redamon
abstract: 一个自主红队框架，将侦察、利用、筛选和代码修复工作流串联为单一的智能体安全流水线。
tags:
  - currency
permalink: /zh/currency/currents/redamon/
links:
  - id: inspectable-agent-operations
    relation: "extends agent orchestration into offensive-security and remediation workflows represented by"
  - id: feedback-circuit
    relation: "depends on iterative finding-triage-fix loops represented by"
mediation:
  tooling: "OpenRouter / qwen/qwen3.5-flash-02-23"
  use:
    - "翻译原始英文条目"
    - "依照音译词汇表保留双语术语"
  humanRole: "审阅、修订并在发布前确认"
  limits: "翻译为起点；语言能力和文化判断须由人工完成"
---

**信号**
RedAmon 呈现了一个 AI 智能体安全栈，它将侦察、利用阶段、发现筛选和自动化拉取请求修复整合为单一工作流。

**背景**
重要的转变在于系统集成：进攻性工具、图记忆和编码智能体正在被构建为连续流水线，而非由人工管理的孤立工具。

**关联**
对于 Openflows（开流），RedAmon 是一个强有力的信号，表明智能体操作如何从辅助转向端到端执行。它在高影响力领域提高了治理、可观测性及明确人工干预边界的门槛。

**当前状态**
快速可见的开源安全工作流信号，具有活跃的开发和强劲社区采用。

**开放问题**
当流水线能自主从侦察过渡到利用时，哪些审批关卡应保持强制？团队如何在不过分降低响应速度的情况下，大规模审计 AI 生成的修复变更？哪些政策边界区分了授权的防御自动化与高风险滥用模式？

**连接**
链接至 inspectable-agent-operations 和 feedback-circuit（反馈回路）。

**译注**
1. **智能体 (Agent)**: 此处指技术层面的 AI 智能体，不同于修行者（Practitioner），后者强调通过实践修行的个体。
2. **流 (Current) vs 回路 (Circuit)**: 本条目类型为 `current`（流），代表动态信号；而 `feedback-circuit` 中的 `circuit` 译为 `回路`，指闭合稳定的模式。
3. **Openflows（开流）**: 保留品牌名，括号内为意译，取“开放流动”之意，呼应 Zhuangzi 中鹏鸟乘风的意象。