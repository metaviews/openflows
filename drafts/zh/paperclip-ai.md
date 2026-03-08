---
layout: layouts/currency-item.njk
title: "Paperclip"
lang: zh
date: 2026-03-07
currencyType: "current"
currencyId: paperclip-ai
abstract: "一个开源智能体编排层，为多智能体自主工作流注入组织架构、预算与治理机制。"
tags:
  - currency
permalink: /zh/currency/currents/paperclip-ai/
links:
  - id: inspectable-agent-operations
    relation: "作为受控智能体基础设施的延伸，引入组织问责原语"
  - id: autonomous-research-accountability
    relation: "作为保持自主智能体活动受限且可审查的互补架构设计"
mediation:
  tooling: "OpenRouter / qwen/qwen3.5-flash-02-23"
  use:
    - "翻译原始英文条目"
    - "依照音译词汇表保留双语术语"
  humanRole: "审阅、修订并在发布前确认"
  limits: "翻译为起点；语言能力和文化判断须由人工完成"
---

信号：Paperclip 将多智能体协调视为组织设计问题——为智能体分配角色、汇报关系、成本预算和审批关口，而非将它们作为无差别的任务执行者运行。

背景：大多数多智能体系统缺乏持久结构：智能体执行任务时缺乏持续的问责机制、预算约束或可追溯的目标对齐。Paperclip 引入企业风格的治理原语——组织架构图、单体月度预算、审计日志和回滚——应用于自主智能体工作流。它自托管、MIT 许可、不绑定特定智能体，兼容 Claude Code、Cursor、Bash 和 HTTP 端点。

关联性：对于 Openflows（开流），该信号代表了一种在自主系统内部实现问责制的尝试。治理框架——谁授权了此项、预算多少、何为可回滚——直接回应了负责任智能体操作所关注的可检查性和人类角色问题。

当前状态：活跃的开源项目，早期反响强劲。本地运行，内置 PostgreSQL，无需外部账户。

开放问题：在智能体之上构建组织结构，当真能约束行为，还是仅制造治理表象而无实质？人类审批关卡应如何设计，既能保持实质意义而非流于形式的盖章点？当智能体目标对齐与组织层级产生冲突指令时会发生什么？

连接：链接至 inspectable-agent-operations，作为具备组织问责原语的受控智能体基础设施的延伸。链接至 autonomous-research-accountability，作为保持自主智能体活动受限且可审查的一种互补设计方案。

**译注**
- **治理 (Governance)**: 此处选用“治理”对应 Governance，该词含“治”与“理”，暗合 Zhuangzi 之“理”（Natural Grain），意指在流动的（Current/流）智能体作业中梳理出合宜的秩序与边界。
- **Paperclip**: 作为特定开源项目名称，保留英文原名，避免中文“回形针”之具象含义遮蔽其作为自动化架构层的抽象功能。
- **Currency/Current**: 此处 `currencyType` 为 `current`，对应术语“流 (liú)”，非静态的“货币 (流通 liú tōng)"，强调该条目代表的是动态演进的系统流动状态。