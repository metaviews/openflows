---
layout: layouts/currency-item.njk
title: TinyAGI
lang: zh
date: 2026-03-30
currencyType: "current"
currencyId: tinyagi
abstract: "TinyAGI 是一个自托管编排平台，旨在管理自主 AI 智能体工作流，侧重于劳动力层级部署和本地控制。"
tags:
  - currency
permalink: /zh/currency/currents/tinyagi/
links:
  - id: paperclip-ai
    relation: "适用于多智能体组织架构与治理的相似编排层"
  - id: clawteam
    relation: "可比较的多智能体工作流编排引擎"
  - id: openclaw-studio
    relation: "用于智能体管理的替代性自托管 Web 仪表盘"
mediation:
  tooling: "OpenRouter / qwen/qwen3.5-flash-02-23"
  use:
    - "翻译原始英文条目"
    - "依照音译词汇表保留双语术语"
  humanRole: "审阅、修订并在发布前确认"
  limits: "翻译为起点；语言能力和文化判断须由人工完成"
---

**信号**
你的自主 AI 员工工作队的自托管平台 · opensourceprojects · 2026-03-30
此信号指向一个 GitHub 仓库 (TinyAGI/tinyagi)，将其定位为管理自主 AI 智能体工作队的自托管基础设施层。描述强调本地部署和劳动力层级的编排，而非单一智能体效用，这与去中心化智能体管理的新兴模式相契合。

**背景**
当前基础设施格局正从孤立智能体实例转向协调工作队结构。paperclip-ai 和 clawteam 等项目已建立了多智能体编排、治理和任务委托的模式。TinyAGI 似乎瞄准同一空间，使用“员工工作队”隐喻来描述在本地环境中管理的持久、交互的智能体单元。

**关联**
此条目代表本地推理和编排基线中的一个信号。这表明 AI 智能体正被视为可部署的工作队单元，而非短暂工具。这与本地推理基线回路（local-inference-baseline circuit）相一致，其中推理和执行被视为普通基础设施，而非依赖云的服务。

**当前状态**
信号引用了一个 GitHub 仓库，但源文本中没有详细文档。关于安全隔离、状态管理和模型路由的功能尚未经过验证。相对于 openclaw 或 zylos-core 等成熟框架，它处于早期采用阶段。

**待解问题**
该平台是否支持 MCP（Model Context Protocol）集成以实现工具互操作性？
针对不受信任的智能体代码执行，采用了何种安全隔离机制？
系统如何处理工作队成员之间的持久记忆和状态共享？
编排逻辑是否可扩展以支持自定义工作流定义？

**连接**
paperclip-ai：两者均提供编排层，为多智能体工作流引入组织架构和治理。
clawteam：两者均提供部署和管理多智能体工作流的引擎，尽管 ClawTeam 强调 CLI 界面。
openclaw-studio：两者均作为智能体操作和配置的自托管管理界面。

**译注**
- **Current (流)**: 此处指 Openflows 知识体系中的“流”，区别于静态的“流通”（Currency）。它代表动态的、正在发生的信号或模式，而非已固化的结构。
- **Workforce (劳动力)**: 在 AI 语境下，将智能体称为“劳动力”意在强调其作为可部署、可协作的生产单元，而非单纯的工具。中文“劳动力”保留了这种将计算能力视为生产要素的隐喻。
- **Circuit (回路)**: 指代一种已闭合、稳定的模式或路径。文中提到的“本地推理基线回路”暗示推理与执行已内化为基础设施的一部分，形成闭环。