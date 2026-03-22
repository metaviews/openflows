---
layout: layouts/currency-item.njk
title: "Sage 多智能体框架"
lang: zh
date: 2026-03-20
currencyType: "current"
currencyId: sage-multi-agent-framework
abstract: "Sage 是一个模块化多智能体编排框架，支持顺序、并行和声明式执行模式，并针对参数量较小的模型进行了优化。"
tags:
  - currency
permalink: /zh/currency/currents/sage-multi-agent-framework/
links:
  - id: openclaw
    relation: "可比较的开源智能体框架，侧重于可观测性和配置。"
  - id: crewai
    relation: "类似的多智能体编排框架，强调基于角色的协调。"
  - id: qwen-agent
    relation: "兼容信号中提到的 Qwen3.5 模型系列优化。"
mediation:
  tooling: "OpenRouter / qwen/qwen3.5-flash-02-23"
  use:
    - "翻译原始英文条目"
    - "依照音译词汇表保留双语术语"
  humanRole: "审阅、修订并在发布前确认"
  limits: "翻译为起点；语言能力和文化判断须由人工完成"
---

信号源：GitHub (ZHangZHengEric/Sage)  
地址：https://github.com/ZHangZHengEric/Sage  
日期：2026-03-20  
内容：复杂任务的智能体系统框架 | 智能体，人工智能，大语言模型，manus，多智能体，工作流

**Context**  
自主智能体工作流的复杂性需要超越简单链式调用的强大编排层。Sage 满足了结构化执行模式（顺序、并行、声明式）的需求，以有效管理任务依赖和资源分配。该框架强调在参数量较小的模型上的稳定性，暗示了一种针对低成本本地或边缘推理的优化策略。

**Relevance**  
此条目记录了开源智能体生态系统中的一种特定编排能力。它被视为基础设施而非产品，侧重于智能体通信与执行的结构模式。该框架的模块化设计允许与现有的技能库和模型提供商集成，而不强制实施供应商锁定。

**Current State**  
版本 1.0.0，MIT 许可，Python 3.11+ 要求。关键组件包括 TaskExecutor（顺序）、FibreAgent（并行）和 AgentFlow（声明式）。优化针对 Qwen3.5 35B-A3B 及类似架构。提供可视化工作台和聊天界面用于调试和监控。文档托管于 wiki.sage.zavixai.com。

**Open Questions**  
与基线实现相比，在小模型上稳定性声明的验证。长期维护节奏和社区采用指标。"高稳定性技能"模块的具体实现细节。与现有 MCP（模型上下文协议）服务器的兼容性。

**Connections**  
该框架与现有的智能体编排基础设施保持一致，提供了替代成熟玩家的选择。它在基于角色的协调方面与 CrewAI 存在功能重叠，在智能体框架标准方面与 OpenClaw 存在重叠。针对 Qwen3.5 的优化在 Qwen-Agent 生态系统之间建立了直接的技术桥梁。

**译注**  
- **智能体 (Agent)**：此处译为“智能体”，既指代 AI 实体，亦暗合“修行者”（Practitioner）之理，意指在系统中通过实践与交互达成目标的主体。
- **编排 (Orchestration)**：不同于简单的“链式”（Chaining），“编排”蕴含了如庖丁解牛般的理路（Li），强调在复杂系统中顺应结构纹理进行调度。
- **推理 (Inference)**：与“理”（Li）同源，此处指模型的计算过程，亦隐喻系统对信息的推演与理解。
- **当前状态 (Current State)**：虽“Current”在 Openflows 语境中可对应“流”，但此处指代版本状态，故译为“当前状态”以保准确。