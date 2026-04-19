---
layout: layouts/currency-item.njk
title: "AutoR"
lang: zh
date: 2026-04-18
currencyType: "current"
currencyId: autor
abstract: "一个优先终端的研究框架，将 AI 智能体执行结构化为可复现、经人工审核的磁盘制品。"
tags:
  - currency
permalink: /zh/currency/currents/autor/
links:
  - id: autonomous-research-accountability
    relation: "Explicitly implements the governance loop for AI-accelerated research by maintaining human interpretive authority through approval stages."
  - id: terminal-native-agentic-workflows
    relation: "Embodies the pattern where the terminal becomes the primary workspace for agent orchestration, prioritizing scriptability over chat interfaces."
  - id: inspectable-agent-operations
    relation: "Provides the visible, revisable mediation layer where artifacts persist on disk rather than in ephemeral context."
  - id: gitagent
    relation: "Shares the goal of versioning agent logic and configuration to enable rollback and collaborative evolution of workflows."
  - id: autoresearch-karpathy
    relation: "Contrasts with minimal autonomous setups by enforcing human direction and approval rather than overnight unattended execution."
mediation:
  tooling: "OpenRouter / qwen/qwen3.5-flash-02-23"
  use:
    - "翻译原始英文条目"
    - "依照音译词汇表保留双语术语"
  humanRole: "审阅、修订并在发布前确认"
  limits: "翻译为起点；语言能力和文化判断须由人工完成"
---

信号 AutoR · github · 2026-04-18 AutoR 是一个优先终端的研究框架，旨在将 AI 智能体执行结构化为可复现、以制品为支撑的运行。它强调人工引导优于自动化执行，要求在关键阶段进行人工批准，并将每次运行视为存储在磁盘上的可检查研究制品，而非易逝的聊天日志。该系统整合了包含八个不同阶段的接入工作流，确保 AI 负责执行，而人类保留对输出方向和验证的控制权。

上下文 研究自动化常为速度牺牲可审计性，导致黑盒实验难以复现或验证。AutoR 通过强制结构化工作流解决此问题：AI 在定义框架内执行代码，但人类干预是验证结果并推进至下一阶段所必需的。它在终端环境中运行，契合开发者原生工作流，避免了基于聊天的智能体接口典型的抽象层。这种方法将研究运行视为磁盘上的持久文件，允许版本控制和外部审查。

相关性 AutoR 代表了自主研究运作方式的转变，从实验性聊天演示转向结构化基础设施。它契合终端原生智能体工作流回路，优先将终端作为主要工作区。它直接解决自主研究问责制，将人工批准制定为执行管道中的必要步骤。对基于磁盘制品的关注支持可检查智能体操作，确保推理和代码生成过程保持可见且可修订。

当前状态 该项目作为开源 GitHub 仓库可用，文档提供英文和中文版本。它支持 Python 3.10+，并使用将执行与编排分离的智能体框架模型。系统包含设置工作流的教程，并通过分阶段接入和制品生成强调可复现性。它目前定位为一项工具，供需要对 AI 辅助实验进行严格管控的研究人员和开发人员使用。

开放问题 该系统如何处理跨多个模型提供商的长期运行的成本管理？制品存储和检索在大规模下的具体机制是什么？审批工作流能否为低风险阶段实现自动化，同时保持对关键决策的高监督？它如何与初始 git 设置之外的现有版本控制系统集成？

连接 自主研究问责制：通过审批阶段维持人类解释权威，实施 AI 加速研究的治理回路。终端原生智能体工作流：体现了终端成为智能体编排主要工作区的模式，优先脚本能力而非聊天接口。可检查智能体操作：提供可见、可修订的中介层，使制品持久存在于磁盘而非易逝上下文中。GitAgent：共享智能体逻辑和配置版本化的目标，以实现工作流的回滚和协同演进。自动研究（Andrej Karpathy）：通过强制人工引导和批准而非夜间无人值守执行，与极简自主设置形成对比。

**译注**
- 制品 (Artifacts): 在软件工程中常指构建产物，此处译为“制品”以强调其作为研究产出的实体性和可存储性，区别于临时的“产物”或“结果”。
- 回路 (Circuit): 此处指 Openflows 概念中的“回路”，即已完成并稳定的模式，译为“回路”保留了其闭环和循环的理 (lǐ)。
- 智能体 (Agent): 对应 AI Agent，选用“智能体”而非“代理”，以强调其自主性和能动性。