---
layout: layouts/currency-item.njk
title: CoPaw
lang: zh
date: 2026-03-15
currencyType: "current"
currencyId: copaw
abstract: CoPaw 是一个开源个人智能体助手平台，可部署于本地或云端基础设施，原生支持 Discord、钉钉、飞书等多个消息平台，并具备可扩展的技能框架。
tags:
  - currency
permalink: /zh/currency/currents/copaw/
links:
  - id: open-webui
    relation: "可对比的开源 AI 助手平台，支持本地部署"
  - id: librechat
    relation: "类似的多提供商聊天界面，适用于自托管部署"
  - id: anything-llm
    relation: "替代性文档增强型本地 AI 助手"
  - id: skills-sh
    relation: "可扩展技能框架，具有可比性的模块化目标"
mediation:
  tooling: "OpenRouter / qwen/qwen3.5-flash-02-23"
  use:
    - "翻译原始英文条目"
    - "依照音译词汇表保留双语术语"
  humanRole: "审阅、修订并在发布前确认"
  limits: "翻译为起点；语言能力和文化判断须由人工完成"
---

信号源：GitHub (agentscope-ai/CoPaw)。网址：https://github.com/agentscope-ai/CoPaw。星标数：1.16 万。许可：Apache 2.0。语言：Python, JavaScript。

语境 CoPaw 将自己定位为个人智能体助手的基础设施层——可本地部署或云端部署，连接现有消息工作流，无需用户采用新界面。原生集成 Discord、钉钉和飞书使其区别于 Open WebUI 或 LibreChat 等基于浏览器的工具，主要面向主要通过消息平台而非专用聊天应用工作的团队和个人。可扩展的技能框架允许智能体配置领域特定能力。

关联 多通道消息方法代表了一种独特的部署模式：不要求用户访问 Web 界面，智能体在他们已使用的沟通工具中与他们相遇。这降低了组织环境中 AI 协助的采用门槛，反映了知识工作实际发生之处的务实理解。Apache 2.0 许可确保商业和非商业部署的宽松使用。

现状 GitHub 上的 1.16 万星标表明社区兴趣浓厚。Python 和 JavaScript 组件的活跃开发。可扩展的技能框架已文档化并可供社区贡献。

待解问题 CoPaw 如何在共享消息频道中处理多用户上下文同时保持每个用户的上下文？原生支持哪些模型提供商，本地模型路由与云端 API 路由如何比较？技能框架方法在实际中与 OpenClaw 或 skills.sh 有何不同？

连接 CoPaw 与 Open WebUI、LibreChat 和 AnythingLLM 并列作为自托管 AI 助手选项，但针对不同的主要界面（消息平台 vs Web 界面）。可扩展的技能架构将其与 skills.sh 的可复用、可组合智能体能力的目标连接起来。其部署灵活性——本地或云端——与本地推理基线回路对操作者控制模型访问的关切相一致。

**译注**
- 本条目类型为 `current`（流/流），在正文中对应“现状”一节译为“现状”以区分于“流”这一本体概念，避免语义混淆。
- “智能体”对应 `Agent`，强调其作为具备行动能力的智能实体，而非单纯的“助手”。
- “回路”对应 `Circuit`，在“连接”一节中提及“推理基线回路”，此处保留“回路”以维持 Openflows 术语的一致性，指代已完成并稳定的模式。
- “技能框架”对应 `Skills framework`，在 AI 语境下指代可组合的能力模块，保留“技能”一词以与 `skills.sh` 等现有生态术语对齐。