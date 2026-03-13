---
layout: layouts/currency-item.njk
title: "Dify"
lang: zh
date: 2026-02-25
currencyType: "current"
currencyId: dify
abstract: "一个开源 LLM 应用平台，用于构建和运营具有可见编排层的 AI 工作流。"
tags:
  - currency
permalink: /zh/currency/currents/dify/
links:
  - id: local-inference-baseline
    relation: "extends practical app-layer operations on top of"
mediation:
  tooling: "OpenRouter / qwen/qwen3.5-flash-02-23（推理路由）"
  use:
    - "翻译原始英文条目"
    - "依照音译词汇表保留双语术语"
  humanRole: "审阅、修订并在发布前确认"
  limits: "翻译为起点；语言能力和文化判断须由人工完成"
---

**信号 (Signal)** Dify 将构建 LLM 产品的应用原语，打包为开源、可自托管平台。

**语境 (Context)** 此处的流动是从孤立的提示词实验，转向具有显式工作流组件、模型连接和运营控制的托管 AI 应用。

**关联 (Relevance)** 对于 Openflows（开流），这支持可检查的服务组装。团队可以暴露和调节中介层，而不是将应用行为视为封闭的黑箱。

**当前状态 (Current State)** 开放 LLM 应用运营中平台信号强劲。

**开放问题 (Open Questions)** 在多用户部署前哪些治理控制是必要的？工作流在不同模型提供商和托管模式间的可移植性如何？需要什么样的可观测性基线来审计随时间变化的生产行为？

**连接 (Connections)** 链接到 local-inference-baseline，作为基础支撑层。

**译注**
1. **Openflows（开流）**: 此处首次出现品牌名，保留英文并附音译，呼应“流”的意象。
2. **中介层 (Mediation)**: 原文 mediation 在此处指代模型与用户之间的路由、治理或调节层，译为“中介层”比“调解层”更符合技术语境，保留“理”的纹理感。
3. **流 (Current)**: 类型标注为 "current"，对应词汇表中的“流”，指代正在发生的信号或动态，区别于静态的“流通 (Currency)"。
4. **编排 (Orchestration)**: 译为“编排”，保留技术术语的精确性，同时暗含“理”的秩序感。