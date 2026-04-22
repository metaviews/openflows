---
layout: layouts/currency-item.njk
title: "智能体工具与技能互操作基础设施"
lang: zh
date: 2026-03-25
currencyType: "circuit"
currencyId: agent-tooling-interoperability-infrastructure
abstract: "这个回路稳定了行动互操作的基础设施层，使智能体能够跨框架发现、共享并执行工具，而不被供应商锁定。"
tags:
  - currency
permalink: /zh/currency/circuits/agent-tooling-interoperability-infrastructure/
links:
  - id: gmickel-claude-marketplace
    relation: "以收据式门控扩展工作流模式"
  - id: golembot
    relation: "借助 OpenClaw 技能兼容性支持多渠道部署"
  - id: unified-agent-gateway
    relation: "为数据库和 API 标准化协议连接"
  - id: anthropic-cybersecurity-skills
    relation: "提供跨平台的领域技能集合"
  - id: mcp-google-map
    relation: "通过 Model Context Protocol 实现地理空间集成"
  - id: skills-sh
    relation: "将智能体能力组织为可复用的操作单元"
  - id: openclaw
    relation: "强调可检查性和显式工具接线"
mediation:
  tooling: "Codex"
  use:
    - "翻译英文回路条目"
    - "补齐缺失的中文对应条目"
  humanRole: "审阅、修订并在发布前确认"
  limits: "翻译为起点；语言能力和文化判断须由人工完成"
---

这个回路从推理层之上开始。`open-model-interoperability-layer` 让模型运行方式更标准，但执行仍然分散。智能体需要行动，而不只是推理。`skills-sh` 和 `OpenClaw` 等流显示出大量孤立注册表正在出现，这暴露了行动互操作的缺口。

智能体工具与技能互操作基础设施稳定的是能力进入执行的闭环。`unified-agent-gateway` 抽象数据库和 CLI 的协议差异。`skills-sh` 将隐性例程转化为显式、可版本化的工件。`golembot` 将这些能力部署到 Discord 或 HTTP 等渠道，同时利用 OpenClaw 技能。`anthropic-cybersecurity-skills` 展示了如何把领域专业知识编码为可跨 Cursor、Claude Code 等平台使用的技能集合。

`mcp-google-map` 通过 Model Context Protocol 将行动锚定在物理位置。`gmickel-claude-marketplace` 则以收据式门控减少复杂工作流中的漂移。这些组件共同拒绝把工具当作专有功能，而是把工具视为共享基础设施。

没有这个模式，智能体会遭遇上下文漂移、执行无法验证和技能无法迁移。专有孤岛会迫使每个框架重新编写胶水代码，形成能力的围墙花园。

回路在此刻闭合：一个智能体能够在一个注册表中发现技能，并在另一个框架中执行它，而不需要定制集成。
