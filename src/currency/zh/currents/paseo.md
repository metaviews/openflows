---
layout: layouts/currency-item.njk
title: Paseo（帕赛奥）
lang: zh
date: 2026-04-14
currencyType: "current"
currencyId: paseo
abstract: Paseo 是一个用于 AI 智能体（AI coding agents）的远程编排工具，支持通过移动设备、桌面端和命令行界面（CLI）进行控制。
tags:
  - currency
permalink: /zh/currency/currents/paseo/
links:
  - id: happier-dev-client
    relation: "类似功能，支持对本地执行的 AI 编码智能体会话进行远程监控与控制"
  - id: forgecode
    relation: "支持基于终端的开发工作流的 CLI 原生 AI 结对编程环境"
mediation:
  tooling: "OpenRouter / qwen/qwen3.5-flash-02-23"
  use:
    - "翻译原始英文条目"
    - "依照音译词汇表保留双语术语"
  humanRole: "审阅、修订并在发布前确认"
  limits: "翻译为起点；语言能力和文化判断须由人工完成"
---

信号 远程编排智能体，从手机、桌面端及命令行 · 开源项目 · 2026-04-13

开源项目 Paseo (GitHub: getpaseo/paseo) 解决了编码工作流被绑定在单一主机的限制。它使用户能够从手机、桌面或命令行界面编排开发任务，如构建、测试套件和部署，而无需依赖复杂的 SSH 会话管理。

**背景**
向分布式开发环境的转变，催生了对智能体编排工具的需求，这些工具需将执行与本地终端解耦。虽然许多框架关注本地智能体隔离或终端-centric 界面，但鲜有提供可从移动设备或次要桌面设备访问的统一控制平面。Paseo 在此背景下出现，旨在弥合智能体执行与远程可访问性之间的差距。

**相关性**
本条目涉及智能体开发的基建层，具体涉及访问模式和流程连续性。它支持在主要工作站之外维持智能体控制的操作模式，这对异步开发和监控至关重要。该工具符合将 AI 智能体视为分布式服务而非本地脚本的趋势。

**当前状态**
Paseo 目前作为开源仓库在 GitHub 上可用。初步信号显示支持通过 CLI 和移动界面进行远程编排。它将自身定位为管理跨不同设备智能体会话时，手动 SSH 配置的替代方案。

**开放性问题**
Paseo 如何处理远程控制界面与本地智能体运行时之间的状态同步？
针对不可信网络上的远程命令执行，有哪些安全机制？
该工具是否支持不同设备会话间的持久化记忆或上下文共享？
它如何与现有的 MCP（模型上下文协议）服务器或智能体框架集成？

**关联**
Paseo 与 happier-dev-client 存在功能重叠，后者也能实现对本地执行的 AI 编码智能体会话的远程监控和控制，但 Paseo 强调多设备编排。它补充了 forgecode，将 CLI 原生工作流扩展至远程移动访问，而 ForgeCode 专注于终端环境本身。这两个工具都通过优先考虑脚本化和本地执行控制，为终端原生智能体工作流回路（terminal-native-agentic-workflows circuit）做出了贡献。

**译注**
- **智能体 (Agent)**：此处采用“智能体”而非“代理”，以强调其自主性与 AI 特性，符合 Openflows 语境。
- **回路 (Circuit)**：在“终端原生智能体工作流回路”中，使用“回路”对应 "Circuit"，呼应 Zhuangzi 中关于循环与闭合的理（lǐ），暗示工作流的闭环与稳定。
- **流 (Current)**：本条目类型为 `current`，对应“流”，指代生态系统中流动的个体信号，区别于“回路”的闭合状态。