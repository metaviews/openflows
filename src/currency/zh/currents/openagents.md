---
layout: layouts/currency-item.njk
title: "OpenAgents（开放智能体）"
lang: zh
date: 2026-04-02
currencyType: "current"
currencyId: openagents
abstract: "OpenAgents 是一个开源编排框架，支持多智能体在统一的工作空间界面中协作，该界面可通过命令行（CLI）与桌面客户端访问。"
tags:
  - currency
permalink: /zh/currency/currents/openagents/
links:
  - id: crewai
    relation: "multi-agent orchestration framework"
  - id: zylos-core
    relation: "coordinate multiple AI agents"
mediation:
  tooling: "OpenRouter / qwen/qwen3.6-plus:free"
  use:
    - "翻译原始英文条目"
    - "依照音译词汇表保留双语术语"
  humanRole: "审阅、修订并在发布前确认"
  limits: "翻译为起点；语言能力和文化判断须由人工完成"
---

信号 openagents · github · 2026-04-02 OpenAgents 为 AI 智能体（Agent）网络提供开源编排层，其核心是一套统一的工作空间界面。该环境允许通过命令行（CLI）或桌面启动器接入，使多个智能体得以在同一运行时场域中协同作业。上下文 多智能体系统通常运行于彼此隔绝的孤岛；OpenAgents 将执行与通信信道收束至单一的运行时环境中。关联性 与“可检视智能体操作”回路（inspectable-agent-operations circuit）对齐，其通过将智能体中介（mediation）集中于可视的工作空间层，实现协作流的透明化。当前状态 目前处于发布阶段，采用 Apache 2.0 许可协议；通过命令行接口（`agn`）与桌面启动器，已覆盖 macOS、Windows 与 Linux 系统。待解之问 智能体间的状态同步机制如何确立？相对于宿主系统的安全隔离边界如何界定？与现有 MCP 服务器的互操作性如何保障？连接 在多智能体编排维度上与 crewai 相系；在协同目标上与 zylos-core 共享同一脉络。

**译注**
- 原文中的 `current`（流）与 `circuit`（回路）构成一组动态对照。此处 OpenAgents 归于 `current`，意指其尚在流动、接入与演化之中；而关联的 `circuit` 则暗示一种已趋于稳定、形成闭环的协作模式。中文以“流”与“回路”对译，保留了从发散探索到结构成型的张力。
- `mediation` 译为“中介”，在智能体架构中常指代路由、协调与缓冲。此处强调其作为“可见层”的治理功能，呼应了 Openflows 体系中“理”（lǐ）的内在秩序——非自上而下的强制调度，而是顺应交互纹理进行疏导与显现，使协作过程可被观察、可被调校。