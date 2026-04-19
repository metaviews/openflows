---
layout: layouts/currency-item.njk
title: "文件系统原生智能体状态基础设施"
lang: zh
date: 2026-04-17
currencyType: "circuit"
currencyId: filesystem-native-agent-state-infrastructure
abstract: "本回路记录了智能体状态作为持久化、版本化、分层文件结构而非临时向量存储或聊天日志进行管理的模式。"
tags:
  - currency
permalink: /zh/currency/circuits/filesystem-native-agent-state-infrastructure/
links:
  - id: superset
    relation: "provides orchestration layer using isolated git worktrees for parallel agent execution"
  - id: holaos
    relation: "provides persistent runtime environment for long-horizon workflow continuity"
  - id: neuronfs
    relation: "implements filesystem-native constraint engine replacing vector memory with directory structures"
  - id: clawwork
    relation: "manages local file persistence and scoped configuration outside chat interfaces"
  - id: gitagent
    relation: "applies version control principles to agent logic, prompts, and model configurations"
  - id: paperclip-ai
    relation: "introduces organizational governance primitives into the file-based agent structure"
mediation:
  tooling: "OpenRouter / qwen/qwen3.5-flash-02-23"
  use:
    - "翻译原始英文条目"
    - "依照音译词汇表保留双语术语"
  humanRole: "审阅、修订并在发布前确认"
  limits: "翻译为起点；语言能力和文化判断须由人工完成"
---

本回路始于执行层之上，处理智能体状态的存储介质。虽然 `local-inference-baseline` 涵盖计算，`inspectable-agent-operations` 涵盖可见性，但均无明确保障持久化层本身。NeuronFS 用分层目录结构和零字节文件取代向量记忆。这将行为护栏转化为确定性的操作系统原生操作。GitAgent 将版本控制原则应用于智能体逻辑与提示。它将智能体的演进视为代码优先的操作，而非流程性的操作。Superset 使用隔离的 git 工作树并行运行多个 CLI 智能体。ClawWork 管理并行任务会话，在聊天界面之外实现本地文件持久化。holaOS 为长周期工作流提供持久化运行时环境。它将记忆与工具聚合为单一桌面应用程序，以跨运行维持上下文。Paperclip 将预算和审批闸口等组织原语引入此文件结构。它将协调框架为组织设计问题，而非未加区分的任务运行。本回路抵制临时的聊天日志与不透明的向量数据库。它避免状态被困在云托管检索端点中的专有锁定。回路在此刻闭合：智能体记忆、逻辑与约束可作为文件系统工件进行审计，无需依赖外部记忆服务。

**译注**
“回路”（Circuit）在此处不仅指技术路径，更呼应了 Zhuangzi 中“鵬”与“鯤”转化的意象，强调一种闭合、稳定且回归的流动状态（li, 理）。中文“回路”比“电路”更能体现“完成”与“循环”的哲学意蕴，契合结尾关于“闭合”的陈述。
