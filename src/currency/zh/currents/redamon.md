---
layout: layouts/currency-item.njk
title: RedAmon
lang: zh
date: 2026-03-06
currencyType: "current"
currencyId: redamon
abstract: 一个自主的威胁模拟（red-team）框架，它将侦察、利用、定级与代码修复工作流串联为一个统一的代理式安全管道。
tags:
  - currency
permalink: /zh/currency/currents/redamon/
links:
  - id: inspectable-agent-operations
    relation: "扩展智能体编排，纳入由威胁模拟与安全修复工作流所代表的领域"
  - id: feedback-circuit
    relation: "依赖于由发现、定级与修复迭代循环所代表的机制"
mediation:
  tooling: "OpenRouter / qwen/qwen3.5-flash-02-23"
  use:
    - "翻译原始英文条目"
    - "依照音译词汇表保留双语术语"
  humanRole: "审阅、修订并在发布前确认"
  limits: "翻译为起点；语言能力和文化判断须由人工完成"
---

信号：RedAmon 呈现了一种人工智能智能体（AI agent）安全栈，它将侦察、利用阶段、发现定级及自动化拉取请求（pull-request）修复整合为统一工作流。

语境：关键转变在于系统集成。进攻性工具（offensive tooling）、图记忆（graph memory）与编码智能体正被编排为连续管道，而非由人工分别管理的孤立工具。

关联：对于 Openflows（开流），RedAmon 是一个强信号，表明智能体运作如何从辅助迈向端到端执行。它提高了治理、可观测性（observability）以及在高风险领域中明确人工覆盖（human override）边界的门槛。

当前状态：这是一个迅速可见的开源安全工作流信号，伴随着活跃的开发与强烈的社区响应。

开放问题：当管道可从侦察自主过渡到利用时，哪些审批关卡应始终保持强制？团队如何在大规模审计 AI 生成的修复变更时，而不致让响应时间慢至不可接受？何种政策边界划清了授权防御自动化与高风险滥用模式之分野？

连接：关联至 inspectable-agent-operations 与 feedback-circuit。

**译注**：
- **Current（流）**：本条目类型为 `current`，译为“流”。区别于“Currency（流通）”，此处指代生态中具体的、动态的信号或活动，而非广义的流通层。
- **Agent（智能体）**：在 Openflows 语境下，保留“智能体”一词以呼应 Zhuangzi 中“修行者”（Practitioner）的意涵，暗示该体系不仅是工具，更是具有某种主动性的实践存在。
- **回路（Circuit）**：文中 Connection 链接的 `feedback-circuit` 译为“回路”，强调闭环与稳定化的模式，与“流”的流动性相对。
</think>