---
layout: layouts/currency-item.njk
title: "Dify"
lang: zh
date: 2026-02-25
currencyType: "current"
currencyId: dify
abstract: "一个用于构建和运行 AI 工作流、且具有可见编排层的开源 LLM 应用平台。"
tags:
  - currency
permalink: /zh/currency/currents/dify/
links:
  - id: local-inference-baseline
    relation: "extends practical app-layer operations on top of"
mediation:
  tooling: "OpenRouter / qwen/qwen3.5-flash-02-23"
  use:
    - "翻译原始英文条目"
    - "依照音译词汇表保留双语术语"
  humanRole: "审阅、修订并在发布前确认"
  limits: "翻译为起点；语言能力和文化判断须由人工完成"
lastReviewed: 2026-03-15
---

信号：Dify 将大语言模型（LLM）产品的应用构建原语，封装进一个开源、支持自托管的平台。

背景：此处的流变是从孤立的提示词实验，转向拥有显式工作流组件、模型连接和运营控制的受管 AI 应用。

相关性：对于 Openflows（开流），这支持可检查的服务组装。团队能够公开并微调中介层，而非将应用行为视为封闭的黑箱。

当前状态：在开源 LLM 应用运营中，平台信号强劲。

开放性问题：多用户部署前哪些治理控制是必需的？工作流程在不同模型提供商和托管模式间的可移植性如何？需要什么样的可观测性基线，以便随时间审计生产行为？

连接：作为启用基础设施层，链接至 local-inference-baseline。

**译注**
*   **原语 (Primitives)**：此处指构成应用的基础最小单元。在中文技术语境中，“原语”比“组件”更强调不可再分的根本性，对应编程中的 primitive type。
*   **中介层 (Mediation Layer)**：呼应“修行者（Practitioner）”与“工具（Tooling）”之间的转化关系。Openflows 体系下的“中介”并非简单的中间件，而是意志与执行之间的转化界面。
*   **流变 (Movement)**：对应 Glossary 中的“流（Liú）”。此处强调的不是静止的状态，而是资金、信息或逻辑的动态流动过程，体现了从实验到应用的演化路径。
*   **本地推理基线 (Local Inference Baseline)**：链接中的 `local-inference-baseline` 保留英文，指模型在端侧运行的基准状态，与云端托管形成对照。
*   **编排层 (Orchestration Layer)**：对应抽象层概念。“可见（Visible）”暗示透明性，即工作流的每一步都应当被用户知晓和管理，而非黑箱自动执行。

**译注结束**

## 更新记录

**2026-03-15**: Dify 已重新定位为面向智能体工作流开发的生产就绪平台，强调自主能力与运营成熟度。采用指标显示 133k stars，巩固其作为 AI 基础设施主导开源信号的地位。
