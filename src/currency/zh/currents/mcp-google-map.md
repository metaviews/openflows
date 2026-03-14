---
layout: layouts/currency-item.njk
title: MCP 谷歌地图服务
lang: zh
date: 2026-03-14
currencyType: "current"
currencyId: mcp-google-map
abstract: 一个开源的模型上下文协议（MCP）服务器，实现 Google Maps API 集成，用于智能体工作流中的地理空间查询与路由。
tags:
  - currency
permalink: /zh/currency/currents/mcp-google-map/
links:
  - id: langflow
    relation: "MCP 服务器编排平台"
  - id: scrapling
    relation: "MCP 集成与工具框架"
  - id: gis-tools
    relation: "地理空间工具与工作流目录"
mediation:
  tooling: "OpenRouter / qwen/qwen3.5-flash-02-23"
  use:
    - "翻译原始英文条目"
    - "依照音译词汇表保留双语术语"
  humanRole: "审阅、修订并在发布前确认"
  limits: "翻译为起点；语言能力和文化判断须由人工完成"
---

### 信号

Openflows（开流）信号：GitHub 仓库 cablate/mcp-google-map 提供 Google Maps API 集成的模型上下文协议（MCP）服务器。它支持通过 CLI 执行独立的智能体技能（Agent Skill），也支持标准 MCP 服务器部署。该实现暴露了地理编码、地点搜索和附近地点查询的工具，经 Claude Desktop 和 Dive Desktop 环境验证。

### 上下文

Google 于 2025 年 12 月正式宣布对 Google Maps（Maps Grounding Lite）的 MCP 支持。本项目作为社区维护的替代方案，提供与官方托管服务不同的部署选项和功能集。它解决了在智能体工作流中需要灵活地理空间锚定（grounding）的需求，而官方基础设施可能不可用或不可配置。

### 相关性

地理空间数据是具身智能（embodied AI）和现实世界智能体操作的关键维度。将 Maps API 能力直接集成到 MCP 标准中，允许智能体将其行动锚定在物理位置，而无需自定义 API 封装。这符合操作素养（operational literacy）目标，即暴露结构并允许在工具链中进行干预。

### 流之状态

该项目处于积极维护状态，与标准 MCP 协议实现具有经过验证的兼容性。它在服务器和技能模式下暴露了八个工具，包括 `search_nearby` 和 `maps_search_places`。配置需要有效的 Google API 密钥，并通过社区贡献支持流式 HTTP 传输。

### 开放性问题

此方案在功能性和成本效益上如何与官方 Google Maps MCP Grounding Lite 相比？通过此第三方服务器路由智能体地理空间查询，其速率限制和数据隐私影响为何？技能定义是否支持多地点智能体任务的动态上下文切换？

### 连接

- **langflow**：为 MCP 服务器提供可视化编排，可能托管此集成。
- **scrapling**：展示了用于自适应工具的类似 MCP 集成模式。
- **gis-tools**：编目了可利用此智能体能力的地理空间工作流。

**译注**

- **Current（流）**：此处将 `current` 译为“流”而非“当前”，以呼应 Openflows 本体论中“流”作为生态系统中移动信号的含义（Glossary: Current(s) — 流）。
- **Grounding（锚定）**：AI 语境下的 grounding 常译为“接地”或“锚定”，此处选用“锚定”以强调智能体行动与物理位置的确切关联。
- **Operational literacy（操作素养）**：指对工具链运作逻辑的理解能力，而非单纯的技术熟练度，故译为“素养”以保留其认知维度。