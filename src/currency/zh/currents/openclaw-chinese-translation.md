---
layout: layouts/currency-item.njk
title: "OpenClaw 中文翻译"
lang: zh
date: 2026-03-12
currencyType: "current"
currencyId: openclaw-chinese-translation
abstract: "OpenClaw 智能体框架的本地化分支，为中国语言操作者提供中文界面支持、自动上游同步及多平台部署。"
tags:
  - currency
permalink: /zh/currency/currents/openclaw-chinese-translation/
links:
  - id: openclaw
    relation: "Localized distribution of the upstream framework for Chinese-speaking operators"
  - id: local-inference-baseline
    relation: "Extends local agent infrastructure into Chinese-language operational contexts"
  - id: inspectable-agent-operations
    relation: "Preserves the inspectable configuration logic of the upstream framework while translating the interface layer"
  - id: operational-literacy-interface
    relation: "Reduces interface friction for Chinese-speaking users without collapsing the underlying operational structure"
mediation:
  tooling: "OpenRouter / qwen/qwen3.5-flash-02-23"
  use:
    - "翻译原始英文条目"
    - "依照音译词汇表保留双语术语"
  humanRole: "审阅、修订并在发布前确认"
  limits: "翻译为起点；语言能力和文化判断须由人工完成"
---

信号 GitHub 仓库 1186258278/OpenClawChineseTranslation 提供了 OpenClaw 智能体框架的中文本地化版本。功能包括与上游的自动同步、中文命令行界面（CLI）与控制台、支持基于 Claude 和 ChatGPT 的工作流，以及涵盖 WhatsApp、Telegram 和 Discord 的部署路径。仓库还包含安装指南、故障排查和 Docker 支持。

背景 OpenClaw 作为一个开源智能体框架，强调可检查性（inspectability）、配置与参与式 AI 实践。本地化工作减少了非英语操作者的运作摩擦，扩展了本地推理和智能体编排工具的用户群。本条目记录的是该本地化努力的具体实现，而非上游框架本身。

相关性 此流之所以重要，因为本地化并非表面功夫。它改变了谁能操作可检查智能体栈，而无需先在脑海中翻译界面。这与 local-inference-baseline 相一致，支持 inspectable-agent-operations，并通过降低语言摩擦同时保留结构，为 operational-literacy-interface 做出贡献。

当前状态 活跃维护中，上游更新延迟少于一小时。支持 Windows、macOS 和 Linux。包含 npm 包分发（@qingchencloud/openclaw-zh）。支持 Docker 部署。移动客户端（ClawApp）和管理面板（ClawPanel）已集成到生态系统中。

开放问题 本地化维护工作流的可持续性，无需上游合并。本地化的范围：是否延伸至模型权重，还是仅限界面字符串？网络中断期间每小时同步机制的依赖管理。

连接 openclaw：主要上游框架。local-inference-baseline：将本地智能体基础设施延伸至中文语言操作情境。inspectable-agent-operations：在翻译界面层的同时，保留可见的配置和工作流逻辑。operational-literacy-interface：在不隐藏运作结构的情况下降低语言摩擦。

**译注**
1. **Current (流)**：此处指 Openflows 知识体系中的“流”，区别于静态的“库”。翻译为“流”以体现其动态性与流动性，呼应 Zhuangzi 中“鹏”乘风而行的意象。
2. **Agent (智能体)**：采用“智能体”而非“代理”，以强调其作为具有自主性的修行者（Practitioner）般的存在，而非单纯的工具。
3. **Inspectability (可检查性)**：保留 Openflows 核心概念，指系统内部逻辑的可见与可审查，而非仅指外部功能的可用性。
4. **Li (理)**：在“运作摩擦”与“结构”的语境中，隐含了顺应事物自然纹理（理）的意味，翻译时保留“结构”一词以强调其作为底层理路的稳定性。
5. **Open source (开源)**：标准术语“开源”，与“开源权重”（Open weights）区分。