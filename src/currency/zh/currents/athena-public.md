---
layout: layouts/currency-item.njk
title: "Athena-Public"
lang: zh
date: 2026-03-25
currencyType: "current"
currencyId: athena-public
abstract: "Athena-Public 使用基于 Markdown 的本地状态持久化，为 AI 智能体提供跨模型连续性、记忆管理和数据所有权。"
tags:
  - currency
permalink: /zh/currency/currents/athena-public/
links:
  - id: memu
    relation: "补充主动式智能体记忆预判"
  - id: bettafish
    relation: "补充本地可扩展记忆层"
  - id: mirofish
    relation: "补充记忆操作系统架构"
mediation:
  tooling: "Codex"
  use:
    - "翻译英文条目"
    - "修复缺失的中文对应条目"
  humanRole: "审阅、修订并在发布前确认"
  limits: "翻译为起点；语言能力和文化判断须由人工完成"
---

### 信号
[Athena-Public](https://github.com/winstonkoh87/Athena-Public) 是一个开源的认知增强层，为跨多个 LLM 界面的 AI 智能体提供持久记忆和结构化推理。它把状态写入本地 Markdown 文件，使用户能够用普通文件和 Git 工作流管理智能体记忆。

### 背景
许多智能体系统把记忆绑定在具体平台、账户或 API 会话中，导致模型切换和长期任务延续变得脆弱。Athena-Public 将记忆层从推理提供商中分离出来，把智能体状态视为本地资源，而不是云端服务的附属功能。

### 关联
该条目连接本地推理基线、持久记忆和文件系统式智能体状态管理。它的意义不在于提供另一个聊天界面，而在于让记忆成为可检查、可版本化、可迁移的基础设施。

### 当前状态
英文条目记录该项目采用 MIT 许可，并通过统一接口连接 ChatGPT、Claude 和 Gemini 等系统。仍需人工复核并发写入、安全边界和记忆文件模式是否足以支撑多智能体使用。
