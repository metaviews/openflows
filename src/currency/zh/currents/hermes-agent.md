---
layout: layouts/currency-item.njk
title: 赫尔墨斯智能体 (Hermes Agent)
lang: zh
date: 2026-03-14
currencyType: "current"
currencyId: hermes-agent
abstract: 赫尔墨斯智能体是 Nous Research 推出的开源自主智能体平台，服务端运行，支持跨多通信渠道，具备持久记忆、技能生成及五个执行后端（含本地、Docker 和 SSH）。
tags:
  - currency
permalink: /zh/currency/currents/hermes-agent/
links:
  - id: nous-research
    relation: "Hermes Agent is Nous Research's primary agent deployment platform"
  - id: crewai
    relation: "Both implement multi-agent orchestration with subagent delegation"
  - id: open-webui
    relation: "Comparable interface layer for local model interaction and agent execution"
  - id: local-inference-baseline
    relation: "Hermes Agent supports local execution backend as a primary deployment mode"
mediation:
  tooling: "OpenRouter / qwen/qwen3.5-flash-02-23"
  use:
    - "翻译原始英文条目"
    - "依照音译词汇表保留双语术语"
  humanRole: "审阅、修订并在发布前确认"
  limits: "翻译为起点；语言能力和文化判断须由人工完成"
---

### 信号 (Signal)
赫尔墨斯智能体是 Nous Research 的生产级智能体平台——采用 MIT 许可，服务端运行，旨在自主运作，而非作为代码助手或聊天机器人包装器。它通过统一网关整合 Telegram、Discord、Slack、WhatsApp、Signal、Email 和 CLI。

### 背景 (Context)
基于 Python 3.11 与 uv 包管理器构建，赫尔墨斯智能体连接 Nous Portal（OAuth）、OpenRouter 或任何 OpenAI 兼容端点。它内置 40+ 工具，涵盖网页搜索、浏览器自动化、视觉、图像生成、代码执行及多模型推理。

### 执行 (Execution)
执行后端包括本地、Docker、SSH、Singularity 和 Modal——通过只读根文件系统与命名空间隔离实现容器加固。子智能体委托支持跨隔离智能体实例的并行任务处理。

### 关联 (Relevance)
赫尔墨斯智能体代表了一类智能体基础设施，将通信渠道视为主要接口而非 Web UI。多后端执行模型——特别是本地与 SSH——使其在不依赖云的情况下具备操作灵活性。跨会话的持久记忆与自动技能生成将其与无状态智能体包装器区分开来。MIT 许可与 GitHub 可用性将其置于可审查领域。

### 当前状态 (Current State)
活跃且公开可用。GitHub 源码，MIT 许可。兼容任何 OpenAI 兼容端点，使其在实践中模型无关，尽管源自 Nous Research 的赫尔墨斯谱系。

### 开放问题 (Open Questions)
技能生成机制如何运作，其在对抗性输入下的限制是什么？记忆架构是怎样的——本地向量存储、基于文件还是云同步？子智能体隔离模型与 CrewAI 或 LangGraph 的方法相比如何？

### 连接 (Connections)
赫尔墨斯智能体将 Nous Research 的模型工作扩展至部署基础设施。其多通道网关与五个执行后端反映了面向操作自主性而非演示能力的哲学。它占据与 CrewAI 和 Open WebUI 相同的广义空间，但更强调无人值守的服务端执行与通信渠道集成。

**译注**
1.  **信号 (Signal)**：在本知识库的语境中，“信号”指代条目本身所蕴含的流动信息，而非指代具体的即时通讯应用 Signal。此处保留双语以明确其作为 Openflows 条目类型的特定含义。
2.  **智能体 (Agent)**：此处选用“智能体”而非“代理”，以强调其作为自主行动实体的属性，符合 AI 领域对 Autonomous Agent 的通用译法。
3.  **理 (Li)**：在“推理 (Inference)”一词中保留了“理”字，呼应 Zhuangzi 中“理”作为事物内在纹理与规律的概念，暗示推理过程需顺应数据与逻辑的自然纹理。