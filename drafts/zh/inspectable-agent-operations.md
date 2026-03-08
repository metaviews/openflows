---
layout: layouts/currency-item.njk
title: "可审查智能体操作回路"
lang: zh
date: 2026-02-28
currencyType: "circuit"
currencyId: inspectable-agent-operations
abstract: "本地模型、编排、技能、记忆与工作层结合成一个受监管的智能体操作循环，其中中介保持可见且可修订。"
tags:
  - currency
permalink: /zh/currency/circuits/inspectable-agent-operations/
links:
  - id: local-inference-baseline
    relation: "builds operational layers on top of"
  - id: operational-literacy-interface
    relation: "overlaps with the human learning and control-surface layer represented by"
  - id: feedback-circuit
    relation: "depends on iterative monitoring and revision patterns represented by"
  - id: crewai
    relation: "contributes multi-agent coordination patterns to"
  - id: overture-sixhq
    relation: "contributes orchestration structure to"
  - id: openfang
    relation: "contributes sandboxed runtime and security-oriented execution patterns to"
  - id: dify
    relation: "contributes application-layer workflow assembly to"
  - id: librechat
    relation: "contributes unified workspace and agent-platform patterns to"
  - id: open-webui
    relation: "contributes self-hosted interface and extension-surface patterns to"
  - id: anything-llm
    relation: "contributes retrieval and workspace interfaces to"
  - id: openclaw
    relation: "contributes inspectable agent framework patterns to"
  - id: openclaw-studio
    relation: "contributes operational dashboard patterns for agent control surfaces to"
  - id: langflow
    relation: "contributes visual orchestration and MCP-server assembly patterns to"
  - id: skills-sh
    relation: "contributes reusable capability packaging patterns to"
  - id: ollama
    relation: "contributes local model serving patterns to"
  - id: bettafish
    relation: "contributes memory-layer governance patterns to"
  - id: codewiki-google
    relation: "contributes generated repository memory and synthesis patterns to"
  - id: peter-steinberger
    relation: "is an operator-level signal for the public, inspectable developer-tooling practice consolidated by"
  - id: memu
    relation: "contributes proactive memory-governance and always-on context management patterns to"
  - id: paperclip-ai
    relation: "contributes organizational accountability structure — roles, budgets, approval gates — to"
mediation:
  tooling: "OpenRouter / qwen/qwen3.5-flash-02-23"
  use:
    - "翻译原始英文条目"
    - "依照音译词汇表保留双语术语"
  humanRole: "审阅、修订并在发布前确认"
  limits: "翻译为起点；语言能力和文化判断须由人工完成"
---

本回路 (Circuit) 弥合了本地模型访问与可用团队操作之间的鸿沟。单靠本地推理 (Inference) 不足够。一旦模型在本地硬件上运行，就必须有一个第二层：编排、记忆、检索、界面、工具访问、审计路径和审查逻辑。没有这层，本地模型只是孤立的工具；有了它，它们才成为工作系统的一部分。此回路所捕捉的正是这一转变。如今数股流 (Currents) 正指向同一方向。Ollama 等运行时 (Runtime) 规范了本地服务。OpenClaw、CrewAI、Overture、OpenFang 和 Langflow 等框架 (Framework) 暴露了编排与执行结构。Dify、LibreChat、Open WebUI、AnythingLLM 和 OpenClaw Studio 等平台将检索、工作流组装、仪表板控制和用户端访问打包。BettaFish、memu 和 skills.sh 等项目使记忆和智能 (Skills) 呈现模块化而非隐式。Paperclip 通过将组织责任结构——组织图、单智能体预算、审计日志——引入多智能体协调，进一步延伸了治理。CodeWiki 发出信号，指示一种相关的项目记忆变化：仓库理解是持续综合的，而非仅停留在分散的人工笔记中。

这些部分共同构成了一个操作循环。模型在本地被选择和托管。技能与工具被明确附加。记忆和检索范围被界定。任务经由可见的编排路径路由。输出经实际使用情况审查。失败被记录，工作流被修订。变化在于可审查性。智能体 (Agent) 行为不再像单一的助手人格，而像由可识读部分组成的系统。这很重要，因为治理只能作用于可见之物。当记忆、路由、权限和运行时选择明确时，团队可以调整它们、约束它们、审计它们。

此回路也改变了素养 (Literacy) 的含义。AI 素养不再只是提示词熟练度。它成为操作熟练度：知道上下文 (Context) 储存在哪，工具如何被调用，哪个模型处理了哪一步，存在何种执行边界，以及在哪里仍可人工接管 (Override)。在 Openflows（开流）中，此回路延伸了本地推理基线和反馈回路。本地执行提供了空间条件。反馈提供了修正机制。可审查的智能体操作提供了工作中间层，将能力转化为持久实践。

回路在此刻闭合：当智能体系统作为受监管的架构被组装：模块化、可审查、本地可控，并通过使用持续修订。

**译注**
- **开流 (Openflows)**：保留品牌名，注出其意译源自“开流”以呼应“流通” (Currency) 之理。
- **流 (Current)**：此处指代生态系统中的具体信号或趋势，非水文之意，故用“流”以传其动势。
- **回路 (Circuit)**：不仅指闭环，更含“回到原点并在此确认”的修行意味。
- **智能体 (Agent)**：保留“智能体”三字，以区别于单纯的“代理”，强调其具身与能动性。
- **中介 (Mediation)**：在本文语境中，指智能体在意图与行动间的调节层，此层可视、可修，方能治理。