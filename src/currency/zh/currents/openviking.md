---
layout: layouts/currency-item.njk
title: "OpenViking"
lang: zh
date: 2026-04-17
currencyType: "current"
currencyId: openviking
abstract: "OpenViking 是一个开源上下文数据库，用层级文件系统范式统一智能体记忆、资源和技能。"
tags:
  - currency
permalink: /zh/currency/currents/openviking/
links:
  - id: neuronfs
    relation: "相邻的文件系统原生上下文管理方案"
  - id: mirofish
    relation: "相邻的记忆操作系统模型"
  - id: openclaw
    relation: "目标智能体框架集成对象"
mediation:
  tooling: "Codex"
  use:
    - "翻译英文条目"
    - "补齐缺失的中文对应条目"
  humanRole: "审阅、修订并在发布前确认"
  limits: "翻译为起点；语言能力和文化判断须由人工完成"
---

### 信号
[OpenViking](https://github.com/volcengine/OpenViking) 是火山引擎发布的开源上下文数据库，面向 AI 智能体统一管理记忆、资源和技能。

### 背景
长时程智能体常把记忆、资源、技能和检索索引分散在不同系统中。OpenViking 采用文件系统范式，把上下文组织为层级结构，使智能体能够像浏览目录一样访问和演化上下文。

### 关联
该条目连接 `neuronfs`、`mirofish` 和 `openclaw`。它的重要性在于把智能体状态从不透明向量检索的一部分，转化为更接近文件系统的可导航结构。

### 当前状态
英文条目记录该项目位于 Volcengine 组织下，并提供英文、中文和日文文档。仍需验证高频上下文更新、并发一致性和长期维护策略。
