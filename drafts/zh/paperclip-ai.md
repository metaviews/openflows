---
layout: layouts/currency-item.njk
title: "Paperclip（回形针）"
lang: zh
date: 2026-03-07
currencyType: "current"
currencyId: paperclip-ai
abstract: "一个开源智能体编排层，为多智能体自主工作流引入组织结构、预算与治理。"
tags:
  - currency
permalink: /zh/currency/currents/paperclip-ai/
links:
  - id: inspectable-agent-operations
    relation: "extends governed agent infrastructure with organizational accountability structure toward"
  - id: autonomous-research-accountability
    relation: "contributes organizational design patterns for agentic accountability to"
mediation:
  tooling: "OpenRouter / qwen/qwen3.5-flash-02-23"
  use:
    - "翻译原始英文条目"
    - "依照音译词汇表保留双语术语"
  humanRole: "审阅、修订并在发布前确认"
  limits: "翻译为起点；语言能力和文化判断须由人工完成"
---

**信号**
Paperclip（回形针）将多智能体协调视为组织设计问题——分配智能体角色、汇报关系、成本预算与审批关口，而非将其作为无差别的任务执行器运行。

**背景**
大多数多智能体设置缺乏持久结构：智能体执行任务时无持久问责、预算约束或可追溯的目标对齐。Paperclip 引入企业级治理原语——组织架构图、单智能体月度预算、审计日志与回滚——应用于自主智能体工作流。它是自托管的，MIT 许可，且智能体无关，可与 Claude Code、Cursor、Bash 及 HTTP 端点协同工作。

**关联**
对于 Openflows（开流），此信号代表了在自主系统内部实现问责的尝试。治理框架——谁授权了此项操作、预算是多少、什么可被回滚——直接回应了负责型智能体操作所关注的可检视性与人类角色问题。

**当前状态**
活跃的开源项目，早期势头强劲。在本地运行，内置 PostgreSQL，无需外部账户。

**待解之问**
在智能体之上构建组织结构是否真能约束行为，还是仅制造了治理的表象而无实质？人类审批关口应如何设计，以保持其意义而非沦为橡皮图章式的检查点？当智能体目标对齐与组织层级产生冲突指令时，会发生什么？

**连接**
作为带有组织问责原语的受控智能体基础设施的扩展，链接至 inspectable-agent-operations。作为保持自主智能体活动受限且可审查的互补设计方法，链接至 autonomous-research-accountability。

**译注**
1. **Paperclip（回形针）**：此处保留英文原名并加注中文，隐喻其功能如回形针般将离散的智能体“连接”并“固定”于组织结构之中，而非仅仅翻译为“回形针”以免丢失品牌指涉。
2. **待解之问**：对应 Open Questions。选用“待解之问”而非“开放问题”，意在呼应 Zhuangzi 中“理”的探求，暗示这些问题不仅是技术性的，更是关于秩序与自然的深层追问。
3. **Current（流）**：本条目类型（currencyType）为 "current"，在 Openflows 语境中对应“流”（liú），指代流动的、正在发生的信号，区别于已闭合稳定的“回路”（huí lù）。