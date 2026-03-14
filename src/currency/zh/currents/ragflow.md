---
layout: layouts/currency-item.njk
title: "RAGFlow"
date: 2026-03-13
currencyType: "current"
currencyId: ragflow
lang: zh
abstract: "RAGFlow是一款开源检索增强生成引擎，集成了文档解析、图谱检索与智能体工作流，为大型语言模型构建上下文层。"
tags:
  - currency
permalink: /zh/currency/currents/ragflow/
links:
  - id: dify
    relation: "功能相近的LLM应用编排平台"
  - id: langflow
    relation: "类似的智能体流程可视化编排方式"
  - id: anything-llm
    relation: "以文档为基础的本地部署聊天替代方案"
  - id: inspectable-agent-operations
    relation: "与本地化、可检查编排目标一致"
  - id: operational-literacy-interface
    relation: "塑造上下文工程与检索的界面层"
mediation:
  tooling: "OpenRouter / qwen/qwen3.5-flash-02-23"
  use:
    - "从外部信号起草条目"
    - "评估与现有知识库的关联"
    - "中文翻译"
  humanRole: "审阅、编辑并批准发布"
  limits: "信号内容可能不完整；发布前请核实原始来源"
---

### 信号

来源：InfiniFlow的GitHub仓库。项目名：ragflow。网址：https://github.com/infiniflow/ragflow。日期：2026-03-13。内容：RAGFlow是一款领先的开源检索增强生成（RAG）引擎，将前沿RAG技术与智能体能力相融合，为LLM构建卓越的上下文层。标签涵盖：智能体、智能体工作流、AI搜索、上下文工程、文档解析器、图谱RAG、LLM、MCP、RAG、检索增强生成。

### 背景

RAGFlow运行于检索系统与智能体编排的交汇处。与主要聚焦文档分块和向量检索的传统RAG管道不同，RAGFlow强调深度文档理解与图谱检索机制。它将自身定位为上下文工程层，使LLM在生成回复前能够访问结构化知识。该项目支持Ollama、OpenAI和DeepSeek等多家模型提供商，体现出提供商无关的基础设施理念。

### 关联性

将智能体能力整合进RAG系统，解决了静态检索的局限性。通过以智能体逻辑驱动检索过程，RAGFlow实现了动态上下文构建，而非固定的向量查询。这与可操作性界面的广泛转变高度契合——界面层决定了AI使用是产生依赖还是形成持久理解。MCP（模型上下文协议）支持的引入进一步规范了智能体与外部工具和数据源的交互方式。

### 当前状态

该项目以Docker容器形式发布，截至信号日期拉取次数已超过十万。最新版本为0.24.0。在线演示托管于demo.ragflow.io。仓库支持多语言文档，包括英语、简体中文、繁体中文、日语、韩语、印尼语、葡萄牙语、法语和阿拉伯语。

### 待解问题

图谱检索在复杂推理任务中是否显著优于标准向量搜索？智能体工作流层与Langflow或CrewAI等专用编排框架相比，灵活性如何？与托管替代方案相比，自托管的资源要求如何？"深度研究"能力是独特功能，还是标准多步检索的营销包装？

### 关联条目

RAGFlow作为专用编排层，与Dify和Langflow相近，但专注于文档理解和图谱检索。它通过提供本地模型集成和工作流可见性的具体实现，补充了可检查智能体操作回路。工具层面，它通过将检索逻辑作为智能体操作图的一部分公开（而非黑盒），支持了可操作性界面回路。它与AnythingLLM同为文档驱动平台，但以显式图谱和智能体工作流集成为特色而有所区别。
