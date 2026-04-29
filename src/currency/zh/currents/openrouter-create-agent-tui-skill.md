---
layout: layouts/currency-item.njk
title: "OpenRouter 技能：创建智能体 TUI"
lang: zh
date: 2026-04-24
currencyType: "current"
currencyId: openrouter-create-agent-tui-skill
abstract: "一项 OpenRouter 技能，通过文本用户界面 (TUI) 启用基于终端的智能体创建与管理，优先考虑本地控制与脚本化能力。"
tags:
  - currency
permalink: /zh/currency/currents/openrouter-create-agent-tui-skill/
links:
  - id: skills-sh
    relation: "comparable skills layer pattern"
  - id: terminal-native-agentic-workflows
    relation: "part of the terminal-native circuit"
mediation:
  tooling: "OpenRouter / qwen/qwen3.5-flash-02-23"
  use:
    - "翻译原始英文条目"
    - "依照音译词汇表保留双语术语"
  humanRole: "审阅、修订并在发布前确认"
  limits: "翻译为起点；语言能力和文化判断须由人工完成"
---

信号 OpenRouterTeam/skills: create-agent-tui · GitHub · 2026-04-24 语境
OpenRouter Team 技能仓库中新发布的一项技能。该技能提供终端用户界面 (TUI)，用于直接在命令行中创建和管理 AI 智能体。此举旨在将"OpenRouter 技能”概念带入更具交互性、可视化的命令行 (CLI) 语境。

推断的关键特征：
输入：可能接受自然语言提示以生成智能体配置。
界面：TUI（例如 ncurses, ink 或类似工具），用于导航智能体创建步骤。
输出：结构化的智能体定义或部署工件。

关联
直接支持终端原生智能体工作流回路。通过将智能体创建移至终端，减少了图形界面仪表盘（如 OpenClaw Studio）与代码库之间的上下文切换。它契合“技能层”信号 ( skills.sh )，促进模块化与显式控制。

当前状态
仓库：属于主 OpenRouter 技能仓库的一部分。
格式：可能遵循 OpenRouter 技能标准（脚本 + 清单）。
工具：取决于底层 TUI 库与 OpenRouter 后端集成。

待解问题
技能格式是什么（Python, Bash, JSON）？
它支持本地智能体执行还是仅支持 OpenRouter 云部署？
它能否与现有的 skill.sh 或类似工作流交互？
它输出何种具体的“智能体”定义格式？

关联
与 skills-sh（模块化技能）、terminal-native-agentic-workflows（TUI 模式）及 openrouter（平台）相关。

**译注**
- **回路 (Circuit)**：此处将 "circuit" 译为“回路”，不仅指技术上的闭环，更暗示一种行为与数据在生态系统中完成并稳定下来的模式，呼应 Zhuangzi 中“理”的流转。
- **智能体 (Agent)**：保留 "Agent" 的自主性含义，"智能体" 比单纯的 "代理" 更能体现其作为修行者的能动性。
- **TUI**：保留英文缩写，因中文语境中 "终端用户界面" 略显冗长，且 TUI 已成为开发者社群的通用术语。
- **本地控制 (Local Control)**：强调修行者（用户）在终端环境中的主导地位，减少对外部云服务的依赖。