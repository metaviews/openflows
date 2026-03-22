---
layout: layouts/currency-item.njk
title: "CCG 工作流"
lang: zh
date: 2026-03-22
currencyType: "current"
currencyId: ccg-workflow
abstract: "一个 Node.js CLI 编排系统，在 Claude Code 监督下，将前端任务路由至 Gemini，后端任务路由至 Codex，并实施基于补丁的安全约束。"
tags:
  - currency
permalink: /zh/currency/currents/ccg-workflow/
links:
  - id: multi-agent-coding-orchestration
    relation: "Alternative multi-agent coding orchestration framework utilizing role-based coordination versus model-specific routing"
  - id: paperclip-ai
    relation: "Orchestration layer introducing organizational governance and budget controls to autonomous agent workflows"
mediation:
  tooling: "OpenRouter / qwen/qwen3.5-flash-02-23"
  use:
    - "翻译原始英文条目"
    - "依照音译词汇表保留双语术语"
  humanRole: "审阅、修订并在发布前确认"
  limits: "翻译为起点；语言能力和文化判断须由人工完成"
---

**信号** ccg-workflow 仓库 (fengshao1227/ccg-workflow) 定义了一个多模型协作开发系统，实现为 Node.js CLI。架构将前端开发任务路由至 Gemini CLI，后端任务路由至 Codex CLI，Claude Code 充当编排者和代码审查者。系统包含 28 个斜杠命令，涵盖规划、执行、git 工作流和代码审查。它通过设计强制安全，限制外部模型仅生成补丁，要求 Claude 审查并应用更改。工作流集成 OPSX，将模糊需求转化为可验证的约束。

**背景** 当前智能体开发趋势显示，从单一模型单体向专用模型路由分化。此信号反映了一种基础设施模式，即通过统一的 CLI 接口利用不同的模型能力（Gemini 用于前端，Codex 用于后端，Claude 用于编排）。该方法解决了将所有任务路由到单一提供商时的延迟和成本效率低下问题，同时保持一致的开发体验。

**关联** 此条目记录了一种特定的多模型编排实现，优先考虑安全约束和角色分离。它作为需要严格控制代码执行和模型输出的基于 CLI 的智能体工作流的参考。集成 OPSX 进行规范驱动开发，增加了一层约束管理，区别于标准的提示工程方法。

**当前状态** 该包已在 npm 上发布，采用 MIT 许可证。需要 Node.js 20+ 和 claude-code-cli 作为依赖。系统支持零配置模型路由，但需要手动安装 Codex 和 Gemini 的特定 CLI 工具。仓库包含 134 个通过的测试，并支持通过简体中文 README 进行本地化。

**开放问题** OPSX 集成如何处理活跃开发会话期间的动态需求变更？如果 Codex 或 Gemini CLI 端点不可用，回退行为是什么？补丁审查机制是否能有效扩展以处理大型仓库变更？如果底层模型 API 更改其能力，模型路由逻辑如何适应？

**关联** multi-agent-coding-orchestration 条目为协调软件开发中的专用智能体提供了功能平行，尽管它依赖于基于角色的协调而非特定模型的路由。paperclip-ai 提供了一种对比的编排治理方法，侧重于组织结构和预算而非技术补丁审查约束。

**译注**
1.  **信号 (Signal)**：在 Openflows 语境中，"Signal"通常指代“流”（Current）的具体内容或实质动态，此处作为条目类型的引导词，译为“信号”以保留其作为信息流动起点的意味。
2.  **CCG**：虽未明确全称，但根据架构描述（Claude Code, Codex, Gemini），推测指代这三者的组合协作模式。
3.  **OPSX**：此处指代一种规范驱动（spec-driven）的约束层，不同于传统的提示工程（prompt engineering），更强调需求到约束的转化与验证。
4.  **智能体 (Agent)**：译为“智能体”而非“代理”，以强调其作为自主实体的属性，符合 AI 领域中文术语习惯。