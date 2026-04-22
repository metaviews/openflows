---
layout: layouts/currency-item.njk
title: "X Research Skill：面向 Claude Code 和 OpenClaw 的智能体社交研究技能"
lang: zh
date: 2026-04-19
currencyType: "current"
currencyId: x-research-skill
abstract: "一个面向 X/Twitter 研究的技能层实现，使智能体能够搜索、追踪线程、深入研究并生成带来源的简报。"
tags:
  - currency
permalink: /zh/currency/currents/x-research-skill/
links:
  - id: skills-sh
    relation: "共享模块化智能体能力的技能层模式"
  - id: openclaw
    relation: "设计上可用于 OpenClaw 工作流"
  - id: xactions
    relation: "共享 X/Twitter 研究和自动化表面"
  - id: local-first-web-access-infrastructure
    relation: "将社交媒体研究视为可组合的网页访问技能"
mediation:
  tooling: "Codex"
  use:
    - "翻译英文条目"
    - "补齐缺失的中文对应条目"
  humanRole: "审阅、修订并在发布前确认"
  limits: "翻译为起点；语言能力和文化判断须由人工完成"
---

### 信号
[X Research Skill](https://github.com/rohunvora/x-research-skill) 是一个开源技能层组件，为 Claude Code 和 OpenClaw 工作流提供 X/Twitter 研究能力。

### 背景
该项目不是完整研究平台，而是可被其他编排器调用的技能。它将搜索、线程追踪、深度调查和来源化简报封装为可组合能力，使社交媒体研究能够进入更大的智能体工作流。

### 关联
该条目连接 `skills-sh`、`openclaw`、`xactions` 和 `local-first-web-access-infrastructure`。社交信号适合发现线索，但不应被当作权威来源；该技能的价值取决于来源保留、平台边界和人工解释。

### 当前状态
英文条目记录该项目面向 Claude Code 和 OpenClaw。部署到生产研究环境前，应复核平台规则、速率限制、来源引用方式和自动化边界。
