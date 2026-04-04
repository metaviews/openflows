---
layout: layouts/currency-item.njk
title: "Chandra OCR 版面保留"
lang: zh
date: 2026-03-31
currencyType: "current"
currencyId: chandra-ocr-layout-preservation
abstract: "Chandra 是一款开源（open source）OCR 模型，专为在表格、表单及手写体等复杂文档中保留结构版面而优化。"
tags:
  - currency
permalink: /zh/currency/currents/chandra-ocr-layout-preservation/
links:
  - id: pdf-parser-ai-ready-data
    relation: "Functional peer for structured data extraction from complex document layouts"
  - id: local-multimodal-perception-infrastructure
    relation: "Circuit defining on-device multimodal perception patterns including visual text recognition"
mediation:
  tooling: "OpenRouter / qwen/qwen3.6-plus:free"
  use:
    - "翻译原始英文条目"
    - "依照音译词汇表保留双语术语"
  humanRole: "审阅、修订并在发布前确认"
  limits: "翻译为起点；语言能力和文化判断须由人工完成"
---

信号（Signal）：具备完整版面处理能力的 OCR 模型，可应对复杂表格、表单与手写体 · opensourceprojects · 2026-03-31 Chandra 通过维持扫描表单、表格及手写体的版面保真度，解决了传统 OCR 常见的结构性信息丢失问题。语境（Context）：标准 OCR 工具通常将文档视为线性的文本流，从而丢弃了元素间的空间关系。这种信息衰减使得提取出的数据难以用于下游处理或智能体（agent）推理。Chandra 引入了版面感知提取，以保留复杂文档类型的结构完整性，从而支撑更可靠的数据摄入管线。关联（Relevance）：本条目为需要从非结构化来源获取结构化信息的自主智能体稳定了文档摄入层。通过维持表格边界与表单层级，它有效减轻了依赖高保真文档理解的智能体工作流中的预处理负担。当前状态（Current State）：Chandra 以开源仓库形式发布于 GitHub（datalab-to/chandra）。它被定位为特定场景下的专用方案，适用于版面保留至关重要的情境，如金融表单或历史扫描档案。开放问题（Open Questions）：与通用 OCR 引擎相比，其在边缘硬件上的性能特征如何？该模型是否支持与模型上下文协议（MCP）集成以实现直接的工具调用？在复杂版面中，它如何处理多语言混合文档？连接（Connections）：Chandra 通过聚焦版面保真度而非单纯的文本提取，补全了现有的文档处理基础设施。它在为 AI 消费提供结构化数据方面，与 `pdf-parser-ai-ready-data` 条目形成功能呼应；同时作为视觉识别组件，它亦自然嵌入于 `local-multimodal-perception-infrastructure` 回路（circuit）之中。

**译注**
- 英文中的 "inference"（推理）在中文语境中天然携带“推演事物之理”的意涵，与 Openflows 核心概念“理”（lǐ，事物内在的自然纹理）形成语义共振。在此处，智能体的“推理”不仅是计算过程，更是顺应文档结构之“理”的解析行为。
- “Layout fidelity”译为“版面保真度”，强调对原始文档空间秩序的忠实还原。中文“保真”一词隐含了不增不减、不扭曲原貌的技术伦理，契合 Openflows 对数据流通（流通）完整性的追求。
- 原文为单一连续段落，此处依其内在逻辑标记保留连贯叙事，未作硬性拆分，以维持“流”（current）的连贯节奏。