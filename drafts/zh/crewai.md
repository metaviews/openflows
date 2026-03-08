---
layout: layouts/currency-item.njk
title: "CrewAI：多智能体协作编排"
lang: zh
date: 2026-02-25
currencyType: "current"
currencyId: crewai
abstract: "一个开源的多智能体（multi-agent）编排框架，强调基于角色的协调与任务流水线。"
tags:
  - currency
permalink: /zh/currency/currents/crewai/
links:
  - id: feedback-circuit
    relation: "depends on iterative evaluation and correction patterns represented in"
mediation:
  tooling: "OpenRouter / qwen/qwen3.5-flash-02-23"
  use:
    - "翻译原始英文条目"
    - "依照音译词汇表保留双语术语"
  humanRole: "审阅、修订并在发布前确认"
  limits: "翻译为起点；语言能力和文化判断须由人工完成"
---

**信号 (Signal)**：CrewAI 将 AI 工作界定为协同多智能体（multi-agent）执行，涉及明确的任务分配与流控。
**语境 (Context)**：这反映了从单一助手交互向结构化智能体协作的范式转移，其中序列、委派与审查成为首要关注点。
**关联 (Relevance)**：对 Openflows（开流）而言，编排框架之所以关键，是因为它们使协调逻辑可见且可测，这在共享环境中实现安全与可靠的自动化是必需的。
**当前状态 (Current State)**：智能体工作流构建中的活跃开源（open-source）信号。
**开放问题 (Open Questions)**：多智能体交接中，何种失效模式最为常见？团队应如何定义自治任务链的最低监管？何种测试模式最能区分有用的自治与脆弱的 choreography（编排）？
**连接 (Connections)**：链接至反馈回路（feedback-circuit），这是维持编排可靠性的必要操作回路。

**译注**
本条目将 `Current` 译为“当前状态”以符合技术语境，但在本系统哲学中，它亦指向`流 (liú)`——即信号在生态中的具体移动与显现。`Openflows` 保留品牌名并注 `开流`，意指“开放流动”；`Circuit` 译为“回路”，此处特指 `feedback-circuit`（反馈回路）作为维持系统自我修正的闭环。`Orchestration` 与 `Choreography` 在中文常混译为“编排”，本译文保留英文 `choreography` 以区分机械性的指令链（brittle choreography）与灵活的生命流（autonomy）。