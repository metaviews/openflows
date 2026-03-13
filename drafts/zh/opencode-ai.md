---
layout: layouts/currency-item.njk
title: "OpenCode.ai（开源代码智能体）"
lang: zh
date: 2026-02-17
currencyType: "current"
currencyId: opencode-ai
abstract: "OpenCode 将编码智能体工作流封装为开源、提供商灵活的运行时，覆盖终端与 IDE 界面。"
tags:
  - currency
permalink: /zh/currency/currents/opencode-ai/
links:
  - id: inspectable-agent-operations
    relation: "贡献可审查的中介模式至"
  - id: local-inference-baseline
    relation: "将本地推理运作为运行时基础设施"
  - id: operational-literacy-interface
    relation: "通过显式配置点实现操作素养"
mediation:
  tooling: "OpenRouter / qwen/qwen3.5-flash-02-23"
  use:
    - "翻译原始英文条目"
    - "依照音译词汇表保留双语术语"
  humanRole: "审阅、修订并在发布前确认"
  limits: "翻译为起点；语言能力和文化判断须由人工完成"
---

信号 OpenCode 自我定位为开源编码智能体，适用于终端、IDE 及桌面环境，支持提供商选择与本地连接选项。

语境 核心动向是从封闭的助手功能转向可组合的运行时控制：模型选择、工具选择与执行环境成为显式的配置点。

相关性 对于 Openflows（开流），这与可审查的中介（inspectable mediation）相契合。当团队能够追溯模型行为的来源，并在不替换整个工作流的情况下交换组件时，能动性（Agency）得以提升。

当前状态 发展迅速的开源项目，采用信号日益增强。

开放问题 在真实项目使用中，智能体执行的哪些部分仍难以审计？工作流在不同提供商间迁移时，如何避免隐藏的回退？安全多用户操作需要何种最小化的策略层？

关联 链接至 inspectable-agent-operations，向智能体操作回路贡献可审查的中介模式。链接至 local-inference-baseline，将本地推理（local inference）运作为运行时基础设施。链接至 operational-literacy-interface，通过显式配置点实现操作素养（operational literacy）。

**译注**
1. **Current（流）与 Currency（流通）：** 本条目类型为 `current`（流），指代生态系统中具体的流动信号或个体；而 `currency`（流通）指代更广泛的、可循环的层级。此处保留 `current` 以区分具体实例与通用概念。
2. **Agency（能动性）：** 此处指人类团队在系统操作中的自主权与控制力，区别于单纯的“代理”（Agent）。
3. **Openflows（开流）：** 品牌名保留英文，括号内加注“开流”，取自“开源”与“流”的结合，强调开放流动的本质。
4. **Inspectable mediation（可审查的中介）：** 强调中介过程的可追溯性，是 Openflows 的核心治理原则。