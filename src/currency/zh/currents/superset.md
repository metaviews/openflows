---
layout: layouts/currency-item.njk
title: "Superset（超集）"
lang: zh
date: 2026-04-16
currencyType: "current"
currencyId: superset
abstract: "Superset 是一款基于 Electron 的桌面编排工具，使用隔离的 Git 工作区并行运行多个 CLI 代码智能体。"
tags:
  - currency
permalink: /zh/currency/currents/superset/
links:
  - id: emdash
    relation: "并行执行多个代码智能体"
  - id: clawwork
    relation: "基于 Electron 的智能体框架桌面客户端"
  - id: multi-agent-shogun
    relation: "基于终端的编排系统"
  - id: forgecode
    relation: "CLI 原生的 AI 结对编程环境"
mediation:
  tooling: "OpenRouter / qwen/qwen3.5-flash-02-23"
  use:
    - "翻译原始英文条目"
    - "依照音译词汇表保留双语术语"
  humanRole: "审阅、修订并在发布前确认"
  limits: "翻译为起点；语言能力和文化判断须由人工完成"
---

信号 Superset · github · 2026-04-16 Superset 是一款桌面应用程序，在隔离的 Git 工作树间编排基于命令行的代码智能体，内置终端、审查及打开至编辑器的 workflows。它支持同时并行执行多个智能体而无需上下文切换，通过单一界面监控所有智能体，并允许通过内置的差异查看器快速审查和编辑变更。

语境
当前的智能体生态正从单一模型交互转向多智能体群，这需要稳健的隔离与编排机制。开发者需要基础设施来管理并发的智能体任务而不产生干扰，特别是在使用如 Claude Code 或 Codex 等 CLI 工具时。Git 工作树提供了基于文件系统的机制来隔离这些任务，防止并行智能体会话间的状态污染。

关联
Superset 解决了本地优先多智能体开发的基础设施缺口。它契合终端原生智能体工作流回路（Terminal-Native Agentic Workflows circuit），优先强调脚本化与本地执行而非基于聊天的界面。该工具支持智能体工具与技能互操作性基础设施，使智能体能够在不同框架间运行而无厂商锁定。

当前状态
该工具作为基于 Electron 的桌面应用程序发布，目标平台为 macOS。它支持同时运行 10 个以上的代码智能体，并利用 Git 工作树进行任务隔离。它包含内置的差异查看器和编辑器用于审查智能体变更，支持一键移交至外部编辑器或终端。

开放问题
模型上下文协议（MCP）集成的程度仍需对照主要来源进行验证。并行智能体执行的安全边界及隔离工作区中不受信任代码的处理方式需要进一步评估。长期维护模式及与不断演进的 CLI 智能体标准的兼容性尚未确立。

连接
Superset 作为一个专用的编排层，功能类似于 emdash，同样支持并行执行代码智能体。它共享 clawwork 中常见的 Electron 桌面架构模式，为智能体工作流提供可视化界面。如同 multi-agent-shogun，它利用基于终端的编排，尽管 Superset 侧重于桌面集成而非 tmux。它通过为 CLI 原生结对编程环境增加多智能体并行性来补充 forgecode。

**译注**
- **智能体 (Agent)**: 此处采用“智能体”而非“代理”，以强调其作为具备推理能力的 AI 实体的主体性，符合 Openflows 对“修行者”与“智能体”的区分。
- **回路 (Circuit)**: 在“关联”一节中，"circuit"译为“回路”，呼应 Zhuangzi 中“理”的循环与完成之意，区别于单纯的“电路”。
- **当前状态 (Current State)**: 为避免与 Openflows 分类中的“流 (Current/流)”混淆，此处采用“当前状态”指代时间维度上的现状。
- **Git 工作树 (Git worktrees)**: 保留技术术语，强调其作为文件系统原生的隔离机制，而非简单的分支概念。