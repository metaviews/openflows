---
layout: layouts/currency-item.njk
title: 终端原生智能体工作流
lang: zh
date: 2026-03-25
currencyType: "circuit"
currencyId: terminal-native-agentic-workflows
abstract: 一个回路，其中终端成为智能体编排的主要工作空间，优先考虑可脚本化和本地执行，而非基于聊天的界面。
tags:
  - currency
permalink: /zh/currency/circuits/terminal-native-agentic-workflows/
links:
  - id: incur-terminal-agent-interface
    relation: "建立用于构建和控制智能体工作流的终端原生接口"
  - id: trellis
    relation: "通过单一 CLI 界面实现多个 AI 编码助手的统一编排"
  - id: terminal-collaborative-workspace-ai-agents
    relation: "使多个 AI 智能体能够在共享的命令上下文中运行"
  - id: aitutor
    relation: "集成大语言模型推理，在终端会话中提供实时解释"
  - id: clawteam
    relation: "通过统一命令行界面部署和管理多智能体工作流"
  - id: mgrep
    relation: "使用本地嵌入模型启用跨异构文件类型的语义搜索"
  - id: pi-mono
    relation: "提供完整的 AI 智能体工具包，包含多提供者 LLM 抽象和编码智能体 CLI"
  - id: skills-sh
    relation: "将 AI 智能体行为构建为模块化、显式且可重用的操作单元"
  - id: opencode-ai
    relation: "将编码智能体工作流打包为跨终端表面的开源、提供者灵活的运行时"
  - id: simon-willison
    relation: "在数据工具交汇点建模严谨、文档化且可组合的开源实践"
  - id: peter-steinberger
    relation: "连接开放实现、本地代理与 AI 原生软件实践"
mediation:
  tooling: "OpenRouter / qwen/qwen3.5-flash-02-23"
  use:
    - "翻译原始英文条目"
    - "依照音译词汇表保留双语术语"
  humanRole: "审阅、修订并在发布前确认"
  limits: "翻译为起点；语言能力和文化判断须由人工完成"
---

此回路始于模型运行时之上的一层。它将终端视为主要的执行环境，而非显示层。`incur-terminal-agent-interface` 与 `trellis` 建立了用于编排的统一 CLI 层。`terminal-collaborative-workspace-ai-agents` 将 Shell 定位为人与机器之间的共享内存。`mgrep` 与 `pi-mono` 将搜索与抽象扎根于本地原语。`skills.sh` 与 `opencode-ai` 确保跨提供者的模块化。`clawteam` 处理多智能体团队的编排逻辑。`aitutor` 将识读能力直接嵌入命令流。Simon Willison 与 Peter Steinberger 为这一基础设施建模了所需的可读性。此回路抵制向隐藏执行的基于聊天的抽象层漂移。它避免了碎片化，即每个智能体维护其各自隔离的界面。回路在此刻闭合：当终端成为智能体逻辑的标准界面，而非一种可选方案时。

**译注**
1. **回路 (Circuit)**：此处选用“回路”而非“电路”，旨在强调 Openflows 语境下“理”的闭环与稳定模式，即一种完成且回归的流动模式，而非单纯的技术电路。
2. **终端 (Terminal)**：在此处强调其作为“执行环境”而非“显示层”的本质，呼应 Zhuangzi 中“庖丁解牛”对物理实体的直接把握，而非对表象的描摹。
3. **识读能力 (Literacy)**：在命令流（command stream）语境下，指对指令含义的深层理解与交互能力，不仅是语法识别，更是意图的领会。