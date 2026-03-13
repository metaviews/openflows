
</think>

---
layout: layouts/currency-item.njk
title: "Open WebUI（开放 Web 界面）"
lang: zh
date: 2026-03-01
currencyType: "current"
currencyId: open-webui
abstract: "一个自托管 AI 平台，通过统一界面运行本地或云端模型，配备工具、检索和扩展钩子。"
tags:
  - currency
permalink: /zh/currency/currents/open-webui/
links:
  - id: local-inference-baseline
    relation: "turns self-hosted model access into a broader user-facing operations layer on top of"
  - id: ollama
    relation: "commonly composes with the local runtime pattern represented by"
  - id: open-weights-commons
    relation: "contributes self-hosted interface and local control patterns to"
mediation:
  tooling: "OpenRouter / qwen/qwen3.5-flash-02-23"
  use:
    - "翻译原始英文条目"
    - "依照音译词汇表保留双语术语"
  humanRole: "审阅、修订并在发布前确认"
  limits: "翻译为起点；语言能力和文化判断须由人工完成"
---

### 信号
Open WebUI 将自己定位为自托管 AI 平台，连接本地与云端模型，通过 Python 扩展工作流，并将部署控制权保留在用户手中。

### 背景
关键转变在于从单一后端的本地推理转向灵活的管控平面，在此之上，模型、对话、检索、搜索和自定义功能可在一个界面中组装。

### 关联
对于 Openflows（开流），这加强了原始模型服务与实际团队使用之间的操作中间层。它支持以本地为主的自主性，同时保持扩展路径足够可见以便治理。

### 当前状态
高可见度的自托管界面模式，拥有显著的社区采用率和强烈的本地 AI 身份认同。

### 待解问题
一旦 Python 扩展和共享工具成为常态，需要哪些审计实践？团队应如何将仅本地工作流与混合本地 - 云端部署分离？哪些默认设置能最好地防止便利功能无声地扩大数据暴露？

### 连接
与 local-inference-baseline 和 ollama 关联，作为基础设施的邻近项。与 open-weights-commons 关联，作为自托管界面层，将开放模型访问扩展为团队可用的工作流。

**译注**
- **Current（流）与 Current State（当前状态）**：本条目类型为 `current`（流），对应“流通”中的动态信号。正文中的 "Current State" 译为“当前状态”以区分技术状态与本体类型，避免混淆。
- **Inference（推理）**：对应“理”之理，此处指模型的计算过程，保留“推理”以强调其逻辑推演属性。
- **Openflows（开流）**：在文中首次出现时标注，以明确其在知识图谱中的本体地位。
- **Open weights（开放权重）**：在 Connections 部分提及，虽原文为 "open model access"，但关联项为 open-weights-commons，故在语境中隐含开放权重理念。