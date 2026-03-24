---
layout: layouts/currency-item.njk
title: "Trellis（网格）"
lang: zh
date: 2026-03-24
currencyType: "current"
currencyId: trellis
abstract: "Trellis 是一个开源 TypeScript 框架，透过单一 CLI 界面实现多个 AI 编程智能体的统一编排。"
tags:
  - currency
permalink: /zh/currency/currents/trellis/
links:
  - id: multi-agent-coding-orchestration
    relation: "适用于多智能体编码工作流的互补编排方法"
  - id: garry-tan-claude-code-setup
    relation: "将 Claude Code 明确集成作为受支持的运行时目标"
mediation:
  tooling: "OpenRouter / qwen/qwen3.5-flash-02-23"
  use:
    - "翻译原始英文条目"
    - "依照音译词汇表保留双语术语"
  humanRole: "审阅、修订并在发布前确认"
  limits: "翻译为起点；语言能力和文化判断须由人工完成"
---

**信号源**：GitHub (mindfold-ai/Trellis)。URL: https://github.com/mindfold-ai/Trellis。日期：2026-03-24。描述：多平台 AI 编程框架，支持 Claude Code、Cursor、OpenCode、iFlow、Codex、Kilo、Kiro、Gemini CLI、Antigravity、Qoder 及 CodeBuddy。许可：AGPL-3.0。包：npm 上的 @mindfoldhq/trellis。

**语境**：Trellis 运行于 AI 辅助软件开发的**基础设施层**，定位为异构编程智能体的统一 CLI 接口。与单一模型智能体不同，它抽象了各类基于 LLM 的编程工具之间的差异，使操作者能在单一工作流环境中切换运行时或利用多个模型。此方法解决了开发者工具链的碎片化问题，即不同模型在不同任务上各有所长（例如重构与脚手架生成）。

**意义**：该框架减少了开发者在管理跨不同 AI 编程智能体的复杂编码任务时的上下文切换与**认知负荷**。通过在 CLI 层面标准化交互协议，它使得 Shell 脚本与自动化流水线能在不同模型后端间复用。这契合**开流（Openflows）**原则，即将 AI 视为基础设施而非服务，允许本地控制与可组合性。

**现状**：该项目已发布为 npm 包，拥有活跃文档与 Discord 社区。它支持 TypeScript 开发，并为调用不同编程助手提供统一的命令结构。AGPL-3.0 许可确保修改与衍生作品保持开源。文档包含快速开始指南、多平台支持及实际用例。

**待解疑问**：需验证抽象层相对于单个智能体的原生 CLI 工具的性能开销。通过第三方框架路由命令的安全影响需评估，特别是关于代码生成与执行权限。长期维护可行性取决于集成编程助手的上游支持（如 Cursor、Claude Code），视其 CLI 界面如何演进。

**关联**：Trellis 通过专注于编程助手层而非通用智能体工作流，补充了现有的编排工作。它与 multi-agent-coding-orchestration 共享多智能体协调的目标，但 Trellis 强调运行时统一而非任务委派。对 Claude Code 的明确支持在功能上将其与 garry-tan-claude-code-setup 关联，为基于 Claude 的工作流提供替代实现路径。

**译注**：
1. **Current (流)**：此条目类型为 `current`，在 Openflows 语境下对应“流”（liú），指代系统中流动的信号或动态实践，区别于已完成稳定的“回路”（Circuit）。
2. **Trellis (网格)**：作为专有名词保留英文，括号内意译其本义为“网格/棚架”，隐喻其作为支撑多种智能体协作的架构层。
3. **开流（Openflows）**：首处提及保留品牌名并加注中文，强调其“开”与“流”的双重意涵，即开源与流通。
4. **智能体（Agent）**：采用“智能体”而非“代理”，以体现其作为具有自主性的计算实体的深度，符合修行者视角。
</think>