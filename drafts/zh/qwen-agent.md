---
layout: layouts/currency-item.njk
title: "Qwen-Agent（通义千问智能体）"
lang: zh
date: 2026-03-07
currencyType: "current"
currencyId: qwen-agent
abstract: "阿里巴巴开源的 LLM 应用框架，提供可复用的智能体组件、工具集成及基于 Qwen 模型系列的 RAG 基础设施。"
tags:
  - 流通
permalink: /zh/currency/currents/qwen-agent/
links:
  - id: open-weights-commons
    relation: "贡献了一个带有自托管部署路径的开源框架"
  - id: inspectable-agent-operations
    relation: "贡献了函数调用、工具集成及 MCP 服务器模式"
mediation:
  tooling: "OpenRouter / qwen/qwen3.5-flash-02-23"
  use:
    - "翻译原始英文条目"
    - "依照音译词汇表保留双语术语"
  humanRole: "审阅、修订并在发布前确认"
  limits: "翻译为起点；语言能力和文化判断须由人工完成"
---

信号 Qwen-Agent 是 Qwen Chat 背后的应用层，公开发布以赋予开发者构建智能体的基础模块——函数调用、工具集成、代码执行、长文档 RAG 及 MCP 服务器支持——由具备强大多语言与长上下文能力的模型系列提供支持。

语境 来自主要模型提供商的 Agent 框架往往锚定生态：基于 Qwen-Agent 抽象构建的开发者会被拉向 Qwen 模型系列，同时获得可移植的工具链。框架支持云端托管（DashScope）及通过 vLLM 或 Ollama 的自托管部署，这在一定程度上保留了运营者的控制权。开发节奏活跃，集成 Qwen3.5，2026 年初将推出新的 DeepPlanning 评估基准。

相关性 对 Openflows（开流）而言，Qwen-Agent 既是一个有能力的开源工具，也是一个生态信号。其自托管路径与 MCP 支持契合本地优先与可检查性运营的价值，而其云端托管默认值与提供商耦合则引入了与其他托管栈相同的依赖性问题。

当前状态 积极维护中。社区参与度高，拥有 1.5 万 GitHub Stars。由阿里巴巴 Qwen 研究团队支持，持续更新模型与框架。

开放问题 运营者控制权保障在 DashScope 托管与自托管部署路径之间有何不同？当使用提供商维护的框架开发需要长期供应商独立性的应用时，会出现何种权衡？团队应如何评估 Qwen-Agent 与模型无关的编排替代方案在生产工作流中的表现？

连接 通过其自托管部署路径与开源框架发布，链接至 open-weights-commons。作为函数调用、工具集成及 MCP 服务器模式的贡献者，链接至 inspectable-agent-operations。

**译注**
- **Currency / Current**: 本条目类型为 `current`，对应 Openflows 语境中的“流”（liú），指代生态中流动的个体信号或组件，区别于“流通”（currency）这一更宏观的层级概念。
- **Agent**: 译为“智能体”，保留英文原名以强调其作为 AI 架构中特定实体（Entity）的技术属性。
- **Openflows（开流）**: 首次出现时保留品牌名并加注“开流”，取“开放流动”之意，呼应 Zhuangzi 中鹏鸟乘风而行的意象。
- **Model**: 译为“模型”，在 AI 语境下指代基础大模型（LLM），此处特指 Qwen 系列。
- **Open source**: 译为“开源”，在中文技术话语中已为通用术语，对应“开源”（kāi yuán）。