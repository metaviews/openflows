---
layout: layouts/currency-item.njk
title: "Langflow（朗流）"
lang: zh
date: 2026-03-01
currencyType: "current"
currencyId: langflow
abstract: "用于 AI 智能体、流与 MCP 服务器的可视化构建器，将编排转化为显式、可编辑的操作图谱。"
tags:
  - currency
permalink: /zh/currency/currents/langflow/
links:
  - id: local-inference-baseline
    relation: "packages orchestration and deployment layers on top of"
  - id: overture-sixhq
    relation: "sits adjacent to explicit workflow composition patterns represented by"
mediation:
  tooling: "OpenRouter / qwen/qwen3.5-flash-02-23"
  use:
    - "翻译原始英文条目"
    - "依照音译词汇表保留双语术语"
  humanRole: "审阅、修订并在发布前确认"
  limits: "翻译为起点；语言能力和文化判断须由人工完成"
---

**信号** Langflow 自述为 AI 智能体与 MCP 服务器的低代码构建器，具备可视化流、可复用组件、Python 定制及部署路径。

**语境** 此处的动向指向“设计即易读”的编排。Langflow 不把模型链与工具调用埋藏于代码之中，而是将其外化为可编辑的流结构。

**关联** 对于 Openflows（开流），这支持可检视的组装。团队可将路由、组件与执行逻辑作为系统结构进行审查，而非仅视作提示文本或隐藏胶水代码。

**当前状态** 工作流构建器信号强劲，涵盖开源使用、快速原型及面向生产的部署语言。

**开放问题** 在何种程度上增加可视化便利，会导致工作流图谱比代码更难审计？哪些 Langflow 模式能清晰迁移至受治理的团队运作，而非仅限个人实验？当自定义 Python 逻辑位于可视化组件之后时，需要怎样的审查实践？

**连接** 链接至 local-inference-baseline 与 overture-sixhq，作为基础设施与编排的邻接项。

**译注**
1. 此处“流”（Current, liú）在 Openflows 本体论中指代动态信号或流通层，不同于技术语境中静态的“工作流”（Workflow）。
2. Openflows 译作“开流”，强调“开放”与“流通”的双重意涵。