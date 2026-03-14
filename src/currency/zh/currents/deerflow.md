---
layout: layouts/currency-item.njk
title: "DeerFlow（鹿流）"
lang: zh
date: 2026-03-14
currencyType: "current"
currencyId: deerflow
abstract: "DeerFlow 是字节跳动基于 LangChain 构建的 MIT 许可开源智能体框架，通过沙箱化子智能体执行及长短期记忆机制，编排多步骤研究、编码和内容生成任务。"
tags:
  - currency
permalink: /zh/currency/currents/deerflow/
links:
  - id: crewai
    relation: "可比较的多智能体编排框架，但架构侧重点不同"
  - id: inspectable-agent-operations
    relation: "基于沙箱的执行模型配合 Docker 隔离解决了可观测性要求"
  - id: langflow
    relation: "两者均基于 LangChain 原语构建多步骤智能体工作流"
mediation:
  tooling: "OpenRouter / qwen/qwen3.5-flash-02-23"
  use:
    - "翻译原始英文条目"
    - "依照音译词汇表保留双语术语"
  humanRole: "审阅、修订并在发布前确认"
  limits: "翻译为起点；语言能力和文化判断须由人工完成"
---

**信号** DeerFlow 是字节跳动在智能体框架领域的开源贡献——一个基于 LangChain 的 MIT 许可编排器，专为跨度数分钟至数小时的长周期研究、编码和内容生成任务设计。自我描述为“超级智能体平台”。

**背景** 基于 LangChain，支持 Doubao、DeepSeek、OpenAI 和 Gemini 作为模型后端。v2.0 架构包含长短期记忆系统、顺序与并行任务规划，以及集成浏览器、Shell、文件系统、MCP 和 VSCode Server 的基于 Docker 的一体化沙箱。技能按需加载——仅任务所需。项目理念明确：“源于开源，回馈开源。”

**关联** DeerFlow 意义重大，原因有二：它是来自大型运营商（字节跳动）的、以宽松条款发布的、具备生产质量的智能体框架；且其沙箱架构直接解决了可观测性问题——智能体操作发生在受限、可观察的 Docker 环境中，而非直接位于主机系统上。记忆架构和并行任务执行模型代表了一种成熟的持续自主运行方法。

**当前状态** 活跃。MIT 许可，可自托管，GitHub 可用。2026 年初发布 v2.0 版本，包含文档化的架构和案例研究。

**开放问题** 长期记忆实现如何处理对抗性输入或记忆投毒？DeerFlow 的开发路线图与字节跳动内部智能体基础设施的关系是什么？沙箱内的 MCP 集成与标准 MCP 客户端实现相比如何？

**连接** DeerFlow 占据与 CrewAI 相同的编排空间，但更侧重于沙箱化执行和持续任务时长。其 LangChain 基础将其与 langflow 的工作流构建模型连接起来。沙箱优先的方法直接满足了可观测智能体操作的要求，即智能体行为应受限且可观察。

**译注**
1. **Current（流）与 Current State（当前状态）**：在 Openflows 语境中，`current` 对应“流”（liú），指代生态中的信号与流动。但在条目内部，“Current State”指代项目的时间状态，故译为“当前状态”以区分。
2. **Inspectability（可观测性）**：此处译为“可观测性”而非字面的“可检查性”，以符合中文技术语境中对系统行为可见性与审计能力的标准表述。
3. **Open Source（开源）**：在中文技术话语中，“开源”不仅指代码开放，更隐含社区协作与回馈的生态伦理，对应原文"Originated from Open Source, give back to Open Source"中的循环理念。