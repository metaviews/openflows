---
layout: layouts/currency-item.njk
title: "停止管理产品路线图，让 AI 智能体生成并交付功能"
lang: zh
date: 2026-03-31
currencyType: "current"
currencyId: mission-control-agent-orchestration
abstract: "Mission Control 是一个开源智能体编排框架，基于自然语言规范自动化功能实现、测试和部署。"
tags:
  - currency
permalink: /zh/currency/currents/mission-control-agent-orchestration/
links:
  - id: multi-agent-coding-orchestration
    relation: "Desplega AI 的 Agent Swarm 协调多个专用智能体处理开发任务，类似于 Mission Control 的功能生成方法"
  - id: gitagent
    relation: "为 AI 智能体逻辑提供版本控制，是 Mission Control 功能交付和回滚能力的必要组件"
  - id: agent-execution-sandboxing-infrastructure
    relation: "Mission Control 安全交付代码的能力依赖于隔离机制，以防止不受信任的智能体代码影响主机系统"
mediation:
  tooling: "OpenRouter / qwen/qwen3.5-flash-02-23"
  use:
    - "翻译原始英文条目"
    - "依照音译词汇表保留双语术语"
  humanRole: "审阅、修订并在发布前确认"
  limits: "翻译为起点；语言能力和文化判断须由人工完成"
---

信号：停止管理产品路线图，让 AI 智能体生成并交付功能 · 开源项目 · 2026-03-31

Mission Control 是一个开源倡议，提议从手动路线图管理转向通过自然语言规范进行自主的功能生成、测试和交付。

**背景**
当前软件交付工作流通常将规划（路线图）、开发（编码）和部署（交付）划分为独立的人工管理阶段。此信号识别了一种融合趋势，即智能体系统试图吸收整个生命周期，减少人类在优先级排序和执行中的干预。这符合软件工程向智能体驱动自动化发展的更广泛基础设施趋势。

**相关性**
此条目代表从工具辅助向全生命周期编排的转变。它挑战了生产环境中人类监督与自主执行之间的界限。对于 Openflows（开流），它作为“操作素养接口”回路的數據点，突显了接口层如何决定 AI 使用中的依赖性与素养。

**当前状态**
该项目作为开源仓库托管在 GitHub (crshdn/mission-control) 上。它作为功能自动化的早期阶段框架。关于安全性、回滚机制和错误处理的技术成熟度，需要针对 agent-execution-sandboxing-infrastructure 标准进行验证。

**开放问题**
哪些治理模型能防止自主智能体提交意外或不安全的代码？当智能体控制部署管道时，如何维持问责制？系统能否处理单智能体编码助手固有的上下文限制？

**连接**
multi-agent-coding-orchestration : Desplega AI 的 Agent Swarm 协调多个专用智能体处理开发任务，类似于 Mission Control 的功能生成方法。
gitagent : 为 AI 智能体逻辑提供版本控制，是 Mission Control 功能交付和回滚能力的必要组件。
agent-execution-sandboxing-infrastructure : Mission Control 安全交付代码的能力依赖于隔离机制，以防止不受信任的智能体代码影响主机系统。

**译注**
1. **Current (流) vs. Circuit (回路)**：在 Openflows 体系中，“Current”指代流动的、未闭合的信号或信息流（如本条目），而“Circuit”指代已稳定、闭合的回路。本条目虽提及“回路”作为数据点，但其本身属于“流”。
2. **Agent (智能体)**：此处译为“智能体”而非“代理”，以强调其作为自主行动者的修行者（Practitioner）属性，而非单纯的工具。
3. **Openflows（开流）**：保留品牌原名，括号内为意译，取“开启流动”之意，对应“Currency”作为流通层的概念。