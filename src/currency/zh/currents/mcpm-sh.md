---
layout: layouts/currency-item.njk
title: "mcpm.sh"
lang: zh
date: 2026-03-27
currencyType: "current"
currencyId: mcpm-sh
abstract: "mcpm.sh 是 Model Context Protocol 服务器的 CLI 包管理器，用于跨客户端发现、配置和管理 MCP 工具。"
tags:
  - currency
permalink: /zh/currency/currents/mcpm-sh/
links:
  - id: plumbing-lang
    relation: "补充多智能体通信和 MCP 服务器集成的协议层"
  - id: unified-agent-gateway
    relation: "补充面向智能体工具的标准化协议网关"
  - id: agent-tooling-interoperability-infrastructure
    relation: "支撑行动互操作基础设施回路"
mediation:
  tooling: "Codex"
  use:
    - "翻译英文条目"
    - "补齐缺失的中文对应条目"
  humanRole: "审阅、修订并在发布前确认"
  limits: "翻译为起点；语言能力和文化判断须由人工完成"
---

### 信号
[mcpm.sh](https://github.com/pathintegral-institute/mcpm.sh) 是一个面向 Model Context Protocol (MCP) 服务器的命令行包管理器和注册表，用于搜索、配置和组织 MCP 服务器。

### 背景
随着 MCP 被 Cursor、Cline、Windsurf 等客户端采用，工具服务器配置开始分散在不同客户端和配置文件中。mcpm.sh 试图用统一 CLI 管理发现、安装、配置文件和路由，从而降低 MCP 采用成本。

### 关联
该条目直接连接 `agent-tooling-interoperability-infrastructure`。如果智能体要跨框架调用工具，工具服务器就需要可发现、可配置、可迁移，而不是被每个客户端重新封装。

### 当前状态
英文条目记录该项目支持 Homebrew 和 PyPI 安装，并正在建设中心化注册表。开放问题包括第三方服务器安全验证、配置同步和注册表长期治理。
