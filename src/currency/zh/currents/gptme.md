---
layout: layouts/currency-item.njk
title: "gptme"
lang: zh
date: 2026-04-14
currencyType: "current"
currencyId: gptme
abstract: "gptme 是一个基于 Python 的命令行界面工具，支持持久化自主智能体会话，集成本地工具并支持多提供商大语言模型。"
tags:
  - 流通
permalink: /zh/currency/currents/gptme/
links:
  - id: forgecode
    relation: "CLI 原生的 AI 结对编程环境"
  - id: incur-terminal-agent-interface
    relation: "构建和控制 AI 智能体工作流的终端原生接口"
  - id: terminal-native-agentic-workflows
    relation: "定义终端作为智能体编排主要工作空间的回路"
  - id: ollama
    relation: "关键本地推理运行时信号"
mediation:
  tooling: "OpenRouter / qwen/qwen3.5-flash-02-23"
  use:
    - "翻译原始英文条目"
    - "依照音译词汇表保留双语术语"
  humanRole: "审阅、修订并在发布前确认"
  limits: "翻译为起点；语言能力和文化判断须由人工完成"
---

信号 gptme · GitHub · 2026-04-14 gptme 作为一个终端原生的智能体框架，支持持久化自主会话，并具备本地工具使用能力。它通过统一的 CLI 接口支持代码生成、终端交互和网页浏览，允许用户在基础运行时之上构建持久化自主智能体。该工具通过与 OpenRouter 或 llamacpp 等本地推理后端集成，支持包括 OpenAI 和 Anthropic 在内的多个大语言模型提供商。

语境 gptme 契合于终端原生智能体工作流回路，其中终端作为智能体编排的主要工作空间。它契合于基础设施层，优先考虑脚本能力和本地执行，而非基于聊天的界面。该工具解决了 CLI 环境中持久化状态管理的需求，通过维持复杂任务的会话连续性，与短暂聊天交互区分开来。

相关性 该条目与本地优先基础设施模式相关，具体涉及智能体工具和技能互操作性。它提供了一种机制，用于向自主智能体暴露本地工具，而无需图形界面或云依赖。这支持了操作素养接口回路，通过暴露智能体结构并允许在命令上下文中进行人工干预。

当前状态 gptme 是一个基于 Python 的 CLI 工具，通过 PyPI 分发，支持持久化智能体会话。它支持在终端内使用本地工具，如文件系统访问、代码执行和网页浏览。运行时支持多个大语言模型后端，包括 OpenRouter、OpenAI 和通过 llamacpp 的本地模型。它包含插件式架构以扩展功能，并支持在基础框架之上构建自定义持久化智能体。

开放问题 gptme 如何处理不信任智能体代码执行时的沙箱化，与智能体执行沙箱化基础设施回路相比如何？跨终端会话的长期记忆持久化具体机制是什么？该工具如何管理凭证存储和外部 API 交互的访问控制？是否存在与智能体工具互操作性基础设施回路兼容的技能发现与共享标准协议？

连接 gptme 与 forgecode（CLI 原生的 AI 结对编程环境）在功能上具有相似性，也与 incur-terminal-agent-interface（构建和控制 AI 智能体工作流的终端原生接口）相似。它在终端原生智能体工作流回路中运行，利用终端作为编排的主要工作空间。该工具依赖本地推理能力，类似于 ollama 运行时信号，支持在个人硬件上执行而无需云依赖。

**译注**
- **Agent (智能体)**：此处译为“智能体”而非“代理”，强调其作为具备认知与行动能力的实体，契合 Openflows 对“修行者”与“智能体”的哲学定位。
- **Circuit (回路)**：强调闭环与稳定模式，非单纯电路，指代在生态中完成并稳定化的模式。
- **Current (流)**：条目类型为 `current`，在中文语境下对应“流”，指代生态中流动的个体信号，区别于“流通”（Currency）。
- **Inference (推理)**：与“理”（lǐ）共享字符，暗示推理过程需顺应事物之理。