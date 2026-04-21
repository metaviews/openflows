---
layout: layouts/currency-item.njk
title: "FIM One"
lang: zh
date: 2026-04-21
currencyType: "current"
currencyId: fim-one
abstract: "由大语言模型驱动的代理运行时与枢纽，支持通过 MCP 和兼容 OpenAI 的 API 在企业系统间进行动态 DAG 规划与并发执行。"
tags:
  - currency
permalink: /zh/currency/currents/fim-one/
links:
  - id: unified-agent-gateway
    relation: "作为智能体工具的统一网关的功能等价物"
  - id: agent-tooling-interoperability-infrastructure
    relation: "通过 MCP 实施动作互操作性的回路模式"
  - id: goose
    relation: "具有 MCP 集成的相似运行时能力"
mediation:
  tooling: "OpenRouter / qwen/qwen3.5-flash-02-23"
  use:
    - "翻译原始英文条目"
    - "依照音译词汇表保留双语术语"
  humanRole: "审阅、修订并在发布前确认"
  limits: "翻译为起点；语言能力和文化判断须由人工完成"
---

信号 FIM One · GitHub · 2026-04-21 FIM One 是一个开源智能体运行时与枢纽，旨在连接分散的企业系统（ERP、CRM、数据库），无需修改基础设施。它具备动态 DAG 规划和并发执行能力，支持 MCP 集成和兼容 OpenAI 的 API 用于工具交互。该平台以独立的 Copilot 模式运行，或作为中心化枢纽，并提供托管云选项以实现快速部署。

**背景**
企业环境通常由需要定制集成逻辑的孤岛系统组成。传统自动化依赖静态脚本或缺乏自适应推理能力的僵化编排工具。FIM One 通过引入能够解读系统状态并动态执行跨系统工作流的代理层来解决这一问题。这将集成从手动工程任务转变为由智能体管理的运行时能力。

**关联**
该条目通过通过 MCP 标准化工具访问，与 agent-tooling-interoperability-infrastructure 回路相契合。它也符合 unified-agent-gateway 模式，将系统访问聚合为单一控制平面。与通用聊天界面不同，FIM One 优先考虑适合生产工作流的结构化执行和状态管理。

**当前状态**
该项目作为 GitHub 仓库可用，并提供托管云变体（cloud.fim.ai）。它支持 Python、FastAPI 和 NextJS 后端。关键功能包括用于工作流优化的动态 DAG 规划和用于性能提升的并发执行。MCP 支持被明确列出，可与现有智能体框架集成。

**开放问题**
跨企业系统的自主行动的安全隔离需要验证。与托管云服务相比，本地执行能力的程度需要澄清。DAG 审批和审计轨迹的治理机制在初始信号中未详细说明。

**连接**
运行时架构在 MCP 支持和提供商灵活性方面与 goose 相似，尽管 FIM One 强调系统集成而非代码辅助。它通过为多样化的 API 和数据库交互提供单一接口，实现了 unified-agent-gateway 回路。动态规划逻辑通过自动管理工具选择和排序，强化了 agent-tooling-interoperability-infrastructure 回路。

**译注**
1. **回路 (Circuit)**：此处将 "Circuit" 译为“回路”，强调其作为“闭合路径”与“稳定模式”的意涵，区别于单纯的“电路”。
2. **智能体 (Agent)**：采用“智能体”而非直译“代理”，以突显其具备认知与执行能力的主体性，符合 Openflows 语境下对 AI 实体的定位。
3. **开源 (Open source)**：保留“开源”标准译法，强调其代码与权重的开放属性。