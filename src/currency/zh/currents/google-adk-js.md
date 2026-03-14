---
layout: layouts/currency-item.njk
title: Google智能体开发套件（adk-js）
date: 2026-03-13
currencyType: "current"
currencyId: google-adk-js
lang: zh
abstract: 一个以代码为核心的TypeScript框架，用于构建和部署多智能体系统，与Google Cloud深度集成，支持可版本化的编排逻辑。
tags:
  - currency
permalink: /zh/currency/currents/google-adk-js/
links:
  - id: microsoft-agent-framework-consolidation
    relation: "来自主要云服务商的竞争性企业级智能体编排框架"
  - id: crewai
    relation: "基于角色协作的替代性多智能体编排框架"
  - id: qwen-agent
    relation: "另一主流开源LLM应用框架，专注智能体构建"
  - id: inspectable-agent-operations
    relation: "与代码优先的智能体行为检查与版本管理路线一致"
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

来源：GitHub（google/adk-js）。日期：2026-03-13。网址：https://github.com/google/adk-js。描述：一款开源、代码优先的TypeScript工具包，用于以灵活可控的方式构建、评估和部署复杂AI智能体。主要特性包括丰富的工具生态、代码优先的逻辑与编排开发，以及模块化的多智能体系统支持。许可证：Apache 2.0。

### 背景

智能体开发套件（ADK）是Google进入开源智能体框架领域的成果，与基于Python的实现及其他语言专属SDK并列竞争。它面向需要对智能体行为、工具调用和编排逻辑进行精细控制的开发者，并专门针对Google Cloud服务的集成进行了优化。这标志着一种转变：将智能体逻辑视为可版本化的代码，而非不透明的配置或可视化流程。

### 关联性

该框架解决了智能体系统在调试、版本管理和跨环境部署（从本地开发到云端基础设施）方面的需求。通过强制推行代码优先方式，它与可操作性回路的模式高度契合——智能体行为可被检查和审计。框架支持多智能体协作和工具集成，遵循标准软件工程实践，服务于智能体工作流的基础设施层。

### 当前状态

TypeScript实现已通过NPM发布（`@google/adk`）。同时存在Python、Java、Go和Web的并行实现。文档与示例仓库均已公开。该工具包支持在代码中直接定义智能体逻辑、工具和编排方式，在保持部署灵活性的同时，实现与Google生态系统的深度集成。

### 待解问题

- 在非Google Cloud环境中，与CrewAI或LangChain等成熟框架相比，采用率如何？
- 相对于Python核心，TypeScript SDK的长期维护承诺如何？
- 与Google Cloud的深度集成是否会给多云智能体部署带来供应商锁定风险？
- 代码优先方式对于智能体治理中的非技术利益相关者而言，扩展性如何？

### 关联条目

- [microsoft-agent-framework-consolidation](/zh/currency/currents/microsoft-agent-framework-consolidation/)：来自主要云服务商的竞争性企业级智能体编排框架。
- [crewai](/zh/currency/currents/crewai/)：基于角色协作的替代性多智能体编排框架。
- [qwen-agent](/zh/currency/currents/qwen-agent/)：另一主流开源LLM应用框架，专注智能体构建。
- [inspectable-agent-operations](/zh/currency/circuits/inspectable-agent-operations/)：与代码优先的智能体行为检查与版本管理路线一致。
