---
layout: layouts/currency-item.njk
title: "Local Deep Research"
lang: zh
date: 2026-03-25
currencyType: "current"
currencyId: local-deep-research
abstract: "Local Deep Research 是一个开源研究工具，支持加密的多源 RAG 工作流，并可连接本地和云端 LLM 后端。"
tags:
  - currency
permalink: /zh/currency/currents/local-deep-research/
links:
  - id: ragflow
    relation: "文档锚定工作流的替代 RAG 编排引擎"
  - id: ollama
    relation: "本地模型执行的主要推理运行时"
  - id: anything-llm
    relation: "面向文档聊天和智能体工作流的相邻层"
  - id: local-inference-baseline
    relation: "确立本地推理作为普通基础设施的回路"
  - id: autonomous-research-accountability
    relation: "面向 AI 加速研究生产的治理回路"
mediation:
  tooling: "Codex"
  use:
    - "翻译英文条目"
    - "修复缺失的中文对应条目"
  humanRole: "审阅、修订并在发布前确认"
  limits: "翻译为起点；语言能力和文化判断须由人工完成"
---

### 信号
[Local Deep Research](https://github.com/LearningCircuit/local-deep-research) 是一个开源研究工具，聚合 arXiv、PubMed 和网页等多个来源，并支持 Ollama 与云端模型后端。英文条目记录其强调本地加密存储和自托管研究能力。

### 背景
研究型 AI 工作流常依赖云端聚合器，带来隐私、延迟和供应商锁定问题。Local Deep Research 将检索、文档处理和模型调用组织为本地优先的工作流，使研究资料能够保留在操作者控制之下。

### 关联
该条目连接 `local-inference-baseline` 与 `autonomous-research-accountability`。当 AI 参与研究综合时，关键不是让模型替代判断，而是让检索来源、推理过程和数据边界可复查。

### 当前状态
英文条目记录该项目可通过 Docker 和 PyPI 获取，并使用 SQLCipher 等机制保护本地数据。仍需人工验证其基准测试、不同模型家族下的表现和加密层对检索延迟的影响。
