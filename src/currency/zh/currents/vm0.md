---
layout: layouts/currency-item.njk
title: "vm0"
lang: zh
date: 2026-03-21
currencyType: "current"
currencyId: vm0
abstract: "vm0 是一个基于云端的智能体运行时，它利用 Claude Code 接口，在隔离的沙箱环境中执行自然语言工作流。"
tags:
  - currency
permalink: /zh/currency/currents/vm0/
links:
  - id: skills-sh
    relation: "Explicit compatibility with 35,738+ skills defined in skills.sh repository."
  - id: capsule
    relation: "Functional parallel in cloud sandbox isolation for untrusted agent code execution."
mediation:
  tooling: "OpenRouter / qwen/qwen3.5-flash-02-23"
  use:
    - "翻译原始英文条目"
    - "依照音译词汇表保留双语术语"
  humanRole: "审阅、修订并在发布前确认"
  limits: "翻译为起点；语言能力和文化判断须由人工完成"
---

**信号仓库** vm0-ai/vm0 发布于 2026-03-19。描述了一个用于自然语言描述工作流的智能体运行时。关键标签包括 agentic-workflow, ai-agent, ai-runtime, ai-sandbox, claude-code, dev-tools, sandbox。

**语境** vm0 将自己定位为云原生智能体执行层。它通过提供一个 24/7 运行的远程沙箱，抽象了持久化智能体环境的复杂性。运行时利用 Claude Code 接口，允许用户通过自然语言指令而非显式代码脚手架来定义工作流。

**相关性** 此条目代表了向托管式智能体基础设施的转变，其中执行环境已与本地硬件解耦。通过支持 skills.sh，它与不同运行时之间智能体能力的新兴标准化保持一致。对持久化和版本控制的关注解决了自主智能体部署中的常见故障模式。

**当前状态** 项目包含一个 NPM 包 (@vm0/cli) 和文档网站。CI/CD 流水线已激活，并进行 Codecov 覆盖率跟踪。该系统声称支持超过 35,000 个技能，并与主要 SaaS 平台集成（GitHub, Slack, Notion, Firecrawl）。

**开放问题** 云沙箱与本地执行相比，具体的安全边界是什么？系统如何处理会话和分支之间的状态同步？持续 24/7 沙箱执行的成本模型是什么？Claude Code 集成是直接 API 包装器还是模拟交互层？

**连接** vm0 在智能体运行时生态系统中运作，具体与技能标准化层交互。其沙箱架构呼应了 Capsule 的隔离目标，尽管 vm0 侧重于云托管的持久化而非本地 WebAssembly 隔离。

**译注**
- **智能体 (Agent)**: 此处使用“智能体”而非“机器人”，强调其具备自主决策与执行的能力，而非单纯脚本自动化。
- **流 (Current)**: 本条目类型为 `current`（流），区别于静态的 `Currency`（流通）。它指代生态系统中正在流动、活跃的特定信号或运行时，具有动态性。
- **技能 (Skills)**: 对应 `skills.sh` 标准，指代可被智能体调用的具体功能单元，此处保留“技能”以体现其作为能力模块的属性。