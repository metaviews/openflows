---
layout: layouts/currency-item.njk
title: "Multica"
lang: zh
date: 2026-04-11
currencyType: "current"
currencyId: multica
abstract: "Multica 是一个开源编排引擎，旨在使自主 AI 智能体能够在分布式工作流中共享、复用并复合技能。"
tags:
  - currency
permalink: /zh/currency/currents/multica/
links:
  - id: crewai
    relation: "强调基于角色协调的替代性多智能体编排框架"
  - id: langgraph
    relation: "面向多步骤生成式 AI 工作流的基于图的编排框架"
  - id: agent-tooling-interoperability-infrastructure
    relation: "稳定跨框架的行动互操作性与工具发现的回路基础设施"
mediation:
  tooling: "OpenRouter / qwen/qwen3.5-flash-02-23"
  use:
    - "翻译原始英文条目"
    - "依照音译词汇表保留双语术语"
  humanRole: "审阅、修订并在发布前确认"
  limits: "翻译为起点；语言能力和文化判断须由人工完成"
---

**信号 (Signal)**  
智能体技能复合的权威开源引擎 · opensourceprojects · 2026-04-10  
此信号指出了单智能体在处理复杂性方面的缺口，提出了一种系统，使智能体能够相互学习并结合优势。相关的 GitHub 仓库表明，该项目专注于开源框架内的技能复合。

**语境 (Context)**  
当前智能体架构往往孤立运行，限制了学习行为或专用工具使用在实例间的迁移。随着工作流扩展至多步骤或多智能体任务，无法在智能体实例间持久化与共享能力，导致了冗余并降低了系统效率。本条目解决了基础设施层的需求，旨在将智能体技能视为可组合、可复用的资产，而非短暂的会话状态。

**相关性 (Relevance)**  
复合技能的能力对于从单任务自动化转向持续自主运行至关重要。通过标准化技能的注册、版本化与发现方式，本条目支持更广泛的目标：减少智能体工具中的生态系统碎片化与厂商锁定。它契合 Openflows（开流）将 AI 能力视为基础设施组件的目标。

**当前状态 (Current State)**  
该项目通过 GitHub 仓库 (multica-ai/multica) 和 2026-04-10 的外部信号帖被识别。信号将系统描述为技能复合的“引擎”，暗示其侧重于运行时编排与技能序列化。确认技能管理与通用编排的范围仍需验证仓库结构与 API 文档。

**开放问题 (Open Questions)**  
系统是否支持技能版本控制与回滚机制？技能在注册到共享池之前如何验证安全性？智能体执行期间的技能检索延迟开销是多少？技能格式是否与现有的模型上下文协议 (MCP) 标准兼容？

**连接 (Connections)**  
本条目通过提供特定的技能复合机制，与现有的多智能体框架产生交叉。它与 crewai 和 langgraph 相关，作为多智能体编排的替代方案，但 Multica 强调的是跨实例的技能持久化与共享，而不仅仅是任务路由。它同时也汇入智能体工具互操作性基础设施回路 (agent-tooling-interoperability-infrastructure circuit)，试图标准化不同智能体运行时中工具与技能的发现与执行方式。

**译注**  
1. **Current (流)**：此处 `currencyType: "current"` 指代 Openflows 知识图谱中的“流”类条目，象征动态的信号与流动的能力，区别于静态的“回路 (circuit/回路)"。
2. **Agent (智能体)**：采用“智能体”而非“代理”，以强调其作为具有自主性、修行性质的实体，符合 Openflows 对 AI 实体的本体论定位。
3. **Orchestration (编排)**：在 AI 语境下指代工作流的调度与协调，此处保留“编排”以体现其结构性与流动性。
4. **Openflows（开流）**：首次出现时加注中文，取其“开启流动”之意，呼应 Zhuangzi 中鹏鸟乘风而起的意象，象征知识在生态中的自然流转。