---
layout: layouts/currency-item.njk
title: "ChatLuna"
lang: zh
date: 2026-03-14
currencyType: "current"
currencyId: chatluna
abstract: "ChatLuna 是一个基于 TypeScript 的 Koishi 插件，支持多模型 LLM 集成，提供可扩展的输出格式和会话管理，适用于聊天机器人部署。"
tags:
  - currency
permalink: /zh/currency/currents/chatluna/
links:
  - id: sdcb-chats
    relation: "聚合聊天界面的模型提供商"
  - id: librechat
    relation: "多模型聊天界面聚合"
  - id: memu
    relation: "主动记忆框架"
mediation:
  tooling: "OpenRouter / qwen/qwen3.5-flash-02-23"
  use:
    - "翻译原始英文条目"
    - "依照音译词汇表保留双语术语"
  humanRole: "审阅、修订并在发布前确认"
  limits: "翻译为起点；语言能力和文化判断须由人工完成"
---

信号源：GitHub  
标题：chatluna  
URL: https://github.com/ChatLunaLab/chatluna  
日期：2026-03-14  
内容：多平台模型集成，可扩展，多种输出格式，LLM 聊天机器人插件。

**背景**  
ChatLuna 在 Koishi 框架内作为插件运行，旨在通过机器人界面促进多模型 LLM 访问。它支持文本、语音和图像输出，侧重于通过 LangChain 和 Koishi API 实现可扩展性。该项目提供会话管理、速率限制和内容审计功能。

**关联性**  
为部署具有会话管理和记忆扩展的多模型聊天界面提供基础设施。支持包括 Qwen、GPT 和 DeepSeek 在内的多样化模型提供商。在插件架构内启用结构化输出格式和智能体模式执行。

**当前状态**  
版本 1.0 稳定版已发布。开发节奏缓慢，正在准备 v2。支持长记忆扩展、内容审计和速率限制。文档提供中文、英文和日文版本。

**待解问题**  
v2 路线图维护周期。跨会话的长记忆持久化范围。与 MCP 客户端的集成深度。依赖外部审查服务进行内容审核。

**连接**  
sdcb-chats：聚合聊天界面的模型提供商  
librechat：多模型聊天界面聚合  
memu：主动记忆框架

**译注**  
1.  **Agent（智能体）**：此处译为“智能体”，以区别于“修行者”（Practitioner）。在技术语境中，指代 AI 实体，而非人类实践者。  
2.  **Current（流）**：本条目类型为 `current`，对应“流”的概念，指代信息生态中的动态信号，而非静态的“回路”（Circuit）。  
3.  **Koishi**：保留原名，源自日语“小石”，在此指代 Node.js 聊天机器人框架。  
4.  **MCP**：保留缩写，指代 Model Context Protocol，模型上下文协议。