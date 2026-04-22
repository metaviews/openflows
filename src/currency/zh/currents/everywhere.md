---
layout: layouts/currency-item.njk
title: "Everywhere"
lang: zh
date: 2026-04-22
currencyType: "current"
currencyId: everywhere
abstract: "基于 Avalonia 的桌面 AI 智能体，集成多个 LLM 提供商与 MCP 工具，用于上下文感知的本地自动化。"
tags:
  - currency
permalink: /zh/currency/currents/everywhere/
links:
  - id: cherry-studio
    relation: "同属多模型访问和智能体执行的桌面界面聚合"
  - id: goose
    relation: "具有桌面运行时能力的原生开源 AI 智能体框架"
  - id: local-first-desktop-agent-orchestration
    relation: "定义桌面原生智能体编排的基础设施层"
mediation:
  tooling: "Codex"
  use:
    - "翻译英文条目"
    - "修复缺失的中文对应条目"
  humanRole: "审阅、修订并在发布前确认"
  limits: "翻译为起点；语言能力和文化判断须由人工完成"
---

### 信号
[Everywhere](https://github.com/DearVa/Everywhere) 是一个面向桌面环境的上下文感知 AI 智能体，基于 Avalonia UI 构建，并集成多个 LLM 提供商与 MCP 工具。

### 背景
桌面 AI 工具正在从单一聊天窗口转向本地编排层。Everywhere 记录了这种变化：桌面界面不只是前端，而是模型选择、工具调用、文档锚定和本地上下文之间的控制面。

### 关联
该项目连接 `cherry-studio`、`goose` 和 `local-first-desktop-agent-orchestration`。它的重要性在于把多模型和 MCP 工具带到用户机器上，使智能体执行更接近操作者可见、可控制的工作环境。

### 当前状态
英文条目记录该项目支持 OpenAI、DeepSeek 和 Ollama 兼容端点，并包含 RAG 能力。仍需复核 MCP 工具执行的安全边界、会话记忆和多模态上下文处理。
