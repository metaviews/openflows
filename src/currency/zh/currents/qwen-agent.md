---
layout: layouts/currency-item.njk
title: "Qwen-Agent (通义千问智能体)"
lang: zh
date: 2026-03-07
currencyType: "current"
currencyId: qwen-agent
abstract: "阿里巴巴开源的大语言模型应用框架，提供可复用的智能体组件、工具集成以及基于 Qwen 模型系列的 RAG 基础设施。"
tags:
  - currency
permalink: /zh/currency/currents/qwen-agent/
links:
  - id: open-weights-commons
    relation: "contributes an open framework with self-hosted deployment pathway to"
  - id: inspectable-agent-operations
    relation: "contributes function-calling, tool integration, and MCP-server patterns to"
mediation:
  tooling: "OpenRouter / qwen/qwen3.5-flash-02-23"
  use:
    - "翻译原始英文条目"
    - "依照音译词汇表保留双语术语"
  humanRole: "审阅、修订并在发布前确认"
  limits: "翻译为起点；语言能力和文化判断须由人工完成"
---

**信号 (Signal) Qwen-Agent 是 Qwen Chat 背后的应用层**，被开放地释放，旨在为开发者提供构建智能体 (Agent) 的基础模块——函数调用 (function calling)、工具集成、代码执行、长文档 RAG 以及 MCP 服务器支持。这些模块由一个具备强大多语言 (multilingual) 和长上下文 (long-context) 能力的模型家族 (model family) 背书，即 Qwen 模型系列。

**语境 (Context)** 主流模型提供商的 Agent 框架往往锚定 (anchor) 其生态：那些在 Qwen-Agent 抽象之上构建的开发者，会被拉动至 Qwen 模型家族，同时获得可移植的工具链 (portable tooling)。该框架支持云端托管 (cloud-hosted，如 DashScope) 与自托管 (self-hosted) 两种部署路径，后者通过 vLLM 或 Ollama 实现，在一定程度上保留了操作者 (operator) 的控制权。开发节奏活跃，于 2026 年初集成 Qwen3.5 并推出新的 DeepPlanning 评估基准。

**对 Openflows（开流）的关联性 (Relevance)** Qwen-Agent 作为一个有能力的开源工具以及作为生态流 (ecosystem signal) 对 Openflows 具有关联性。其自托管路径和 MCP 支持契合了“原生本地” (local-first) 和“可审视操作” (inspectable-operation) 的价值，而其云端托管的默认设定和提供商 (provider) 耦合性则引入了与其他托管栈相同的依赖性问题。

**当前状态 (Current State)** 积极维护。社区参与度高，拥有 15k GitHub Stars。由阿里巴巴 Qwen 研究团队支持，提供持续的模型与框架更新。

**开放问题 (Open Questions)**
1. DashScope 托管与自托管部署路径之间，操作者控制权的保证有何不同？
2. 对于需要长期供应商独立性 (vendor independence) 的应用，使用由提供商维护的框架会引发何种权衡 (tradeoffs)？
3. 团队应如何评估 Qwen-Agent 与用于生产工作流的模型无关 (model-agnostic) 编排替代方案？

**连接 (Connections)**
通过自托管部署路径和开源框架的发布，连接到 open-weights-commons。作为函数调用、工具集成和 MCP 服务器模式的贡献者，连接到 inspectable-agent-operations。

**译注**
1. **Current (流)**：此处将 entry type "current" 译为“流”，呼应 Zhuangzi 中“鹏之徙于南冥”的流动意象，暗示知识不仅是静态存储，更是动态的流通 (Currency/流通) 形态。
2. **Agent (智能体)**：采用“智能体”而非“代理”，强调其具备自主行动与意图（意欲）的修行者 (practitioner) 属性，不仅是工具，更是生态中的行动者。
3. **Openflows（开流）**：首处出现加注“开流”，取“开流决雍”之意，喻指打破壁垒使知识与流通畅通。
4. **RAG**：保留英文缩写，因中文检索增强生成 (Retrieval-Augmented Generation) 在技术语境中尚不如 RAG 普及，且“检索”与“增”隐含了信息流动的理 (Li) 之过程。
5. **Qwen**：保留拼音 Qwen，虽可译为“通义千问”，但在技术文档中 Qwen 作为模型家族专有名词更具识别度。