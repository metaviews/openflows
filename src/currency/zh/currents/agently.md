---
layout: layouts/currency-item.njk
title: "Agently（敏捷体）"
lang: zh
date: 2026-03-19
currencyType: "current"
currencyId: agently
abstract: "Agently 是一个 Python 框架，用于生成式 AI 应用开发，利用事件驱动流（event-driven flow）和链式调用语法（chained-calls syntax），实现模型无关的智能体编排（model-agnostic agent orchestration）与集成的技能管理。"
tags:
  - currency
permalink: /zh/currency/currents/agently/
links:
  - id: skills-sh
    relation: "Integrates with skills-layer protocol for modular agent behavior"
  - id: openclaw
    relation: "Comparable open-source agent framework emphasizing configuration and inspectability"
mediation:
  tooling: "OpenRouter / qwen/qwen3.5-flash-02-23"
  use:
    - "翻译原始英文条目"
    - "依照音译词汇表保留双语术语"
  humanRole: "审阅、修订并在发布前确认"
  limits: "翻译为起点；语言能力和文化判断须由人工完成"
---

信号源：GitHub (AgentEra/Agently) URL: https://github.com/AgentEra/Agently 日期：2026-03-19

描述：一个基于 Python 的生成式 AI 应用框架，提供结构化数据交互、链式调用语法和事件驱动流（TriggerFlow），以支持复杂的工作逻辑。支持无需重写代码即可切换模型，并包含官方技能库。

背景
Agently 运行于大模型编排工具（LLM orchestration tools）的 Python 生态之中。它将自己定位为重型框架的轻量级替代方案，侧重于语法结构和事件驱动逻辑，而非复杂的图定义。该框架支持多个模型提供商，包括 ChatGLM、Claude、ERNIE、Gemini、GPT 和 Minimax，表明其在应用逻辑上专注于提供商无关性（provider agnosticism）。

关联
该框架解决了在生产环境中切换推理提供商（inference providers）和管理智能体状态（agent state）时的操作摩擦。其事件驱动流机制（TriggerFlow）提供了一种特定的架构模式，用于处理复杂的生成式 AI 工作流，区别于线性的思维链（chain-of-thought）方法。技能的显式集成使其与模块化智能体行为（modular agent behavior）的 emerging standards 保持一致。

当前状态
该项目采用 Apache 2.0 许可，并提供 PyPI 包。文档已有英文和中文版，社区渠道包括 GitHub 和微信。代码库强调可维护的工作流和生产级应用的稳定输出。

待解之问
TriggerFlow 事件系统与 LangChain 或 CrewAI 中的标准 async/await 模式相比如何？官方技能库的维护节奏相对于上游模型 API 变更是怎样的？模型切换抽象是否相比直接提供商 SDK 引入了延迟开销（latency overhead）？

连接
skills-sh : Agently 通过 `npx skills add` 进行的官方技能安装，表明直接遵循了 skills-layer 协议。
openclaw : 两者均为开源智能体框架，优先考虑配置和可检查性，而非专有黑盒编排。

**译注**
1. **Current（流）**: 在 Openflows 分类中，`currencyType: "current"` 对应“流（liú）”，指代生态中流动的单一信号或项目，区别于已稳定的“回路（Circuit）”。此处“当前状态”译为“当前状态”以区分于分类类型。
2. **智能体（Agent）**: 采用“智能体”而非“代理”，以强调其作为 AI 实体的自主性与修行者（Practitioner）的语境关联。
3. **TriggerFlow**: 专有名词，保留英文，意译“触发流”，体现事件驱动的动态性。
4. **模型无关（Model-agnostic）**: 强调逻辑层与具体模型实现的解耦，符合开源精神。