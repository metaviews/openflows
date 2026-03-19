---
layout: layouts/currency-item.njk
title: "戈勒姆机器人 (GolemBot)"
lang: zh
date: 2026-03-17
currencyType: "current"
currencyId: golembot
abstract: "一个基于 TypeScript 的智能体 (Agent) 框架，支持多通道部署（IM、HTTP），兼容 13,000+ OpenClaw 技能及主流代码助手运行时。"
tags:
  - currency
permalink: /zh/currency/currents/golembot/
links:
  - id: openclaw
    relation: "与 13,000+ OpenClaw 社区技能生态系统兼容"
  - id: copaw
    relation: "在跨平台个人 AI 助手部署中的功能重叠"
mediation:
  tooling: "OpenRouter / qwen/qwen3.5-flash-02-23"
  use:
    - "翻译原始英文条目"
    - "依照音译词汇表保留双语术语"
  humanRole: "审阅、修订并在发布前确认"
  limits: "翻译为起点；语言能力和文化判断须由人工完成"
---

信号源：github
标题：golembot
网址：https://github.com/0xranx/golembot
日期：2026-03-15
内容：使用任意大语言模型（LLM）提供商运行 Cursor、Claude Code、OpenCode 或 Codex — 部署至 IM、HTTP 或您的自有产品。
标签：ai, ai-agent, ai-assistant, bot-framework, chatbot, claude-code, cli, codex, coding-agent, cursor, dingtalk, discord, feishu, lark, llm, opencode, slack, telegram, typescript, wecom

语境
GolemBot 作为一个基于 TypeScript 的智能体 (Agent) 框架，旨在抽象化大语言模型（LLM）提供商的选择与通道集成。它允许开发者将智能体逻辑部署到消息界面（Discord、Slack、Telegram、钉钉、飞书、企业微信）和 HTTP 端点。该框架定位为运行时层，可执行来自代码助手（如 Cursor、Claude Code 和 OpenCode）或标准 LLM API 的工作流。

关联
该条目代表智能体分发基础设施，而非独立智能。其意义在于与 OpenClaw 技能生态系统的显式集成（13,000+ 技能），使其能够利用现有的模块化能力，而无需定制实现。这降低了在异构通信渠道部署智能体的摩擦，同时保持提供商的灵活性。

当前状态
项目采用 MIT 许可，需要 Node.js >= 18。文档托管于 0xranx.github.io/golembot。它暴露一个 npm 包（golembot）用于集成。仓库包含 CI 工作流，支持中英文档。它作为库或 CLI 工具运行，而非托管的 SaaS 平台。

开放问题
OpenClaw 技能集成的具体 API 契约是什么？
框架如何处理不同消息渠道间的状态持久化？
底层 Node.js 生态系统的维护节奏和依赖管理策略是什么？
HTTP 端点和凭据管理的安全模型是否针对企业部署进行了文档化？

连接
该框架与 openclaw 紧密对齐，通过直接兼容 OpenClaw 技能生态系统，利用相同的模块化基础设施。它与 copaw 共享功能领域，后者也提供跨平台（如 Discord 和 飞书）个人 AI 助手的多通道支持。与托管平台不同，GolemBot 强调自托管和代码级控制。

**译注**
1. **Agent (智能体)**：此处选用“智能体”而非“机器人”，以强调其自主决策与交互的“理”（lǐ），区别于简单的脚本或自动化程序。
2. **Golem (戈勒姆)**：源自犹太传说的人造生命体，此处音译保留其“人造造物”的隐喻，暗示这是一个由人类构建但具备独立运作能力的系统。
3. **OpenClaw / Copaw**：保留英文原名，作为专有生态标识，避免翻译造成的语义损耗。
4. **Current (流)**：在 Openflows 语境下，此条目属于“流”（Current），意指处于活跃流动状态的知识节点，而非静态的“回路”（Circuit）。