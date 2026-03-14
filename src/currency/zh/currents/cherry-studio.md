---
layout: layouts/currency-item.njk
title: "Cherry Studio（樱桃工作室）"
lang: zh
date: 2026-03-12
currencyType: "current"
currencyId: cherry-studio
abstract: "一个用于访问大语言模型和执行智能体任务的桌面界面，它从单一工作空间聚合数百个助手并连接至开源智能体框架。"
tags:
  - currency
permalink: /zh/currency/currents/cherry-studio/
links:
  - id: librechat
    relation: "可比的统一聊天与助手界面，解决相邻工作空间的问题"
  - id: open-webui
    relation: "用于在多个模型和工具间路由用户的替代开源界面层"
  - id: lm-studio
    relation: "更专注于本地模型执行的相邻桌面推理客户端"
  - id: openclaw
    relation: "项目元数据信号显示与 OpenClaw 所代表的开源智能体框架层一致"
  - id: opencode-ai
    relation: "项目元数据信号显示与开源编码智能体工作流一致"
  - id: operational-literacy-interface
    relation: "能够阐明或模糊多智能体操作的用户界面层"
  - id: inspectable-agent-operations
    relation: "工作空间设计影响本地编排是否保持可读和可编辑"
mediation:
  tooling: "OpenRouter / qwen/qwen3.5-flash-02-23"
  use:
    - "翻译原始英文条目"
    - "依照音译词汇表保留双语术语"
  humanRole: "审阅、修订并在发布前确认"
  limits: "翻译为起点；语言能力和文化判断须由人工完成"
---

信号 GitHub 仓库 CherryHQ/cherry-studio 将 Cherry Studio 描述为一个桌面 AI 工作空间，具备聊天、自主智能体以及大量集成助手目录。该项目提供对多个模型提供商的统一访问，并列出包括 openclaw、opencode、skills 和 vibe-coding 在内的集成标签。

背景 Cherry Studio 运行于 AI 栈的桌面客户端层，将自己定位为模型交互的集中枢纽。它将多个模型提供商和助手配置聚合到单一应用程序中，减少了用户管理不同界面或 API 密钥的需求。包含 claude-code 和 code-agent 等标签表明，除了通用生产力外，该项目还专注于开发者工作流。

相关性 该条目代表了 AI 工具整合的趋势，从单一模型客户端转向多智能体编排环境。通过将助手配置和智能体能力捆绑到统一界面中，它降低了复杂 AI 工作流的入门门槛，同时保持了本地优先或混合部署模型。这与将 AI 推理视为普通本地基础设施的转变相一致。

当前状态 该项目正在积极维护，支持多语言（英语、简体中文、繁体中文、日语、韩语、印地语、泰语、法语、德语、西班牙语、意大利语、俄语、葡萄牙语、荷兰语、波兰语、阿拉伯语）。它为助手和技能暴露了插件或扩展架构，暗示了智能体行为的模块化。仓库结构表明了对开发者工具集成的关注。

待解问题 本地应用程序内的聊天历史和智能体上下文的保留策略是什么？当执行自主任务时，智能体权限和沙盒是如何处理的？与 openclaw 和 opencode 的集成是否意味着对其运行时环境的依赖，还是直接的 API 实现？

连接 Cherry Studio 作为一个客户端界面，类似于 librechat 和 open-webui，但对桌面原生智能体编排有更强调。它与 lm-studio 共享本地推理基线，同时扩展至智能体执行工作流。明确的元数据链接到 openclaw 和 opencode-ai，表明与开源智能体框架的技术一致性。设计哲学支持了操作素养界面回路，使智能体配置可见且可编辑。它还通过暴露单一工作空间层内的智能体状态，为可检查的智能体操作做出了贡献。

**译注**
- "Current" 在此处指代 Openflows 系统中的“流”，区别于“回路”（Circuit）。
- "Agent" 译为“智能体”，以强调其作为具备推理与行动能力的实体，区别于普通程序。
- "Inference" 译为“推理”，与“理”（li）呼应，指代模型生成响应的过程。
- "Circuit" 译为“回路”，指代系统中闭合的、已稳定的模式或路径。