---
layout: layouts/currency-item.njk
title: "Langflow"
lang: zh
date: 2026-03-01
currencyType: "current"
currencyId: langflow
abstract: "一种用于 AI 智能体、流（flows）与 MCP 服务器的可视化构建器，将编排操作转化为显式、可编辑的操作图谱。"
tags:
  - currency
permalink: /zh/currency/currents/langflow/
links:
  - id: local-inference-baseline
    relation: "在底层之上封装并部署层次"
  - id: overture-sixhq
    relation: "处于由 explicit composition patterns 所代表的显式工作流编排模式的邻近位置"
mediation:
  tooling: "OpenRouter / qwen/qwen3.5-flash-02-23"
  use:
    - "翻译原始英文条目"
    - "依照音译词汇表保留双语术语"
  humanRole: "审阅、修订并在发布前确认"
  limits: "翻译为起点；语言能力和文化判断须由人工完成"
---

**Signal（信号）** Langflow 自述为用于 AI 智能体和 MCP 服务器的低代码构建器，具备可视化工作流、可复用组件、Python 自定义能力与部署路径。

**Context（语境）** 此处的动向是指向一种由设计决定的、天生可识读（legible by design）的编排（orchestration）。不同于将模型链与工具调用深埋于代码之中，Langflow 将其外化为可编辑的流结构。

**Relevance（关联）** 就 Openflows（开流）而言，这支持可检视的组装（inspectable assembly）。团队可将路由、组件与执行逻辑视为系统结构进行审查，而非仅作为提示文本或隐藏的粘合代码。

**Current State（当前状态）** 跨越开源使用、快速原型制作（rapid prototyping）及生产导向部署语言的有力构建信号。

**Open Questions（开放性问题）** 在何种程度上增加可视化便利，会导致工作流图谱比代码更难审查？哪些 Langflow 模式能清晰迁移至受治理的团队运作，而非仅限于个人实验？当自定义 Python 逻辑置于可视化组件之后时，需要何种审查流程？

**Connections（连接）** 与 local-inference-baseline 和 overture-sixhq 相连，作为基础设施与编排的邻近层。

**译注**
- **编排 (Orchestration / 编排)**：在中文技术语境中，“编排”常指对多个服务或流程的有序调度。此处强调将原本隐晦的代码逻辑外化为可视结构，体现“理”（lǐ）的条理与秩序。
- **智能体 (Agent / 智能体)**：不同于“实践者”，此处指代 AI 智能体（AI Agent），保留其作为自主执行单元的含义。
- **流 (Flows / 流)**：对应词汇表中的 "Current(s)"，此处既指可视化的流程，也指代信息的流动，呼应 Openflows 之名。
- **Openflows（开流）**：在首次提到时保留品牌名并加注中文释义，强调“开放流通”的本意。