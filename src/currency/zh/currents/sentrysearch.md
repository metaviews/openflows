---
layout: layouts/currency-item.njk
title: "SentrySearch：基于 VLM 的语义视频搜索"
lang: zh
date: 2026-04-19
currencyType: "current"
currencyId: sentrysearch
abstract: "SentrySearch 使用 Gemini Embedding 2 或 Qwen3-VL 等模型，对视频档案执行自然语言语义搜索。"
tags:
  - currency
permalink: /zh/currency/currents/sentrysearch/
links:
  - id: deepcamera
    relation: "共享视频理解领域，但重点在归档搜索而非实时监控"
  - id: local-multimodal-perception-infrastructure
    relation: "将视频转化为可查询的多模态表示"
  - id: open-model-interoperability-layer
    relation: "支持多个嵌入和视觉语言模型后端"
mediation:
  tooling: "Codex"
  use:
    - "翻译英文条目"
    - "补齐缺失的中文对应条目"
  humanRole: "审阅、修订并在发布前确认"
  limits: "翻译为起点；语言能力和文化判断须由人工完成"
---

### 信号
[SentrySearch](https://github.com/ssrajadh/sentrysearch) 是一个面向视频档案的语义搜索工具，使用 Gemini Embedding 2 或 Qwen3-VL 等多模态模型理解视频内容。

### 背景
传统视频检索依赖人工标签、元数据或逐帧处理。SentrySearch 将视频片段转换为嵌入索引，使用户能够用自然语言查询画面内容，例如寻找特定人物、动作或场景。

### 关联
该项目连接 `local-multimodal-perception-infrastructure` 和 `open-model-interoperability-layer`。视频档案正在成为智能体和机构的操作数据面，语义搜索需要在模型选择、隐私和索引维护上保持可检查。

### 当前状态
英文条目记录该项目支持云端和本地模型路径。开放问题包括隐私边界、索引规模、延迟与准确率权衡，以及视频时间序列理解是否超出帧级嵌入。
