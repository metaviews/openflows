---
layout: layouts/currency-item.njk
title: "Open WebUI（开放 Web 界面）"
lang: zh
date: 2026-03-01
currencyType: "current"
currencyId: open-webui
abstract: "一个自托管的 AI 平台，通过统一界面连接本地或云端模型，提供工具、检索及扩展挂钩接口。"
tags:
  - currency
permalink: /zh/currency/currents/open-webui/
links:
  - id: local-inference-baseline
    relation: "将自托管模型访问转化为更广泛的用户面向操作层，叠加于"
  - id: ollama
    relation: "通常与 ollama 所代表的本地运行时模式组合"
  - id: open-weights-commons
    relation: "为开放权重模型访问贡献自托管界面和局部控制模式"
mediation:
  tooling: "OpenRouter / qwen/qwen3.5-flash-02-23"
  use:
    - "翻译原始英文条目"
    - "依照音译词汇表保留双语术语"
  humanRole: "审阅、修订并在发布前确认"
  limits: "翻译为起点；语言能力和文化判断须由人工完成"
lastReviewed: 2026-03-15
---

信号：Open WebUI 将其自身定位为连接本地与云端模型、通过 Python 扩展工作流、并将部署控制权保留在用户手中的自托管 AI 平台。
语境：关键转变在于从单一后端本地推理（single-backend local inference）转向一个灵活的控制平面（control plane），在此处可整合（assemble）模型、对话、检索、搜索与自定义函数（custom functions）。
关联：对 Openflows（开流）而言，这强化了原始模型服务（raw model serving）与实际团队使用之间的运营中间层。它支持以本地优先（local-first）的自治（autonomy），同时保持扩展路径的可见性以利于治理（govern）。
流态（Current State）：高可见性的自托管界面模式（pattern），拥有实质性的社区采用率与强烈的本地 AI 身份（identity）。
开放问题（Open Questions）：一旦 Python 扩展和共享工具成为常规，需要哪些审计实践（audit practices）？团队应如何分离仅本地的（local-only）工作流与混合本地-云端部署（deployments）？哪些默认设置最好能防止便利功能静默地扩大数据暴露范围（data exposure）？
连接（Connections）：链接至 local-inference-baseline 和 ollama，作为基础设施邻接（infrastructure adjacencies）。链接至 open-weights-commons，作为自托管界面层，将开放模型访问（open model access）扩展至团队可用的工作流。

**译注**
- “流态”（Current State）：“Current”在此语境下不仅指时间上的“当前”，亦呼应 Openflows 中“流”（liú）的概念，意为在知识生态中流动的条目状态。
- “开放问题”（Open Questions）：呼应“开源”（open source）与 Openflows 的命名，指代未闭合、需持续考察的议题。
- 术语保留：为保持知识图谱的准确性，关键架构术语（如 control plane, pattern, identity）在中文译解中保留英文原文，以便与系统底层元数据对齐。

## 更新记录

</think>

**2026-03-15**: Open WebUI 现已明确突出企业治理功能，包括 SSO、RBAC 和审计日志，面向受监管行业，解决了此前关于审计实践的未决问题。采用指标已扩展至 2.9 亿次下载和 35.1 万名社区成员，量化了其高可见性地位。语音与视觉能力现已列为核心工具包功能，与 Python 扩展并列。
