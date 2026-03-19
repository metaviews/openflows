
</think>

---
layout: layouts/currency-item.njk
title: "AionUi"
lang: zh
date: 2026-03-16
currencyType: "current"
currencyId: aion-ui
abstract: "AionUi 是一款跨平台开源协同应用，聚合了跨越本地与云端大语言模型接口的多智能体自动化能力，并支持各类命令行与基于 Web 的编码助手。"
tags:
  - currency
permalink: /zh/currency/currents/aion-ui/
links:
  - id: openclaw
    relation: "Utilizes OpenClaw framework for agent task execution and skill integration"
  - id: opencode-ai
    relation: "Compatible with OpenCode runtime for provider-flexible coding workflows"
  - id: cherry-studio
    relation: "Comparable desktop interface pattern for aggregating multiple AI assistants"
mediation:
  tooling: "OpenRouter / qwen/qwen3.5-flash-02-23"
  use:
    - "翻译原始英文条目"
    - "依照音译词汇表保留双语术语"
  humanRole: "审阅、修订并在发布前确认"
  limits: "翻译为起点；语言能力和文化判断须由人工完成"
---

**信号源：** GitHub 仓库 iOfficeAI/AionUi。许可证：Apache-2.0。平台：macOS, Windows, Linux。核心功能：开源协同应用，内置支持 24/7 自动化的 AI 智能体。支持的接口包括 Gemini CLI, Claude Code, Codex, OpenCode, Qwen Code, Goose CLI, 和 Auggie。

**语境：** AionUi 运行于桌面智能体编排层，弥合命令行智能体工具与持久化图形工作空间之间的鸿沟。它将自身定位为本地优先的协同环境，允许多种类型的智能体并发运行。这与更广泛的趋势一致，即可组合智能体接口将提供商差异抽象为统一 UI，类似于 Cherry Studio 和 AnythingLLM 中观察到的趋势。

**关联：** 该工具将异构智能体框架（CLI 和 GUI）的访问整合到单个应用中。通过支持"任意 API 密钥”，它减少了管理多个提供商凭据的用户摩擦。对"24/7 自动化”的强调暗示了超越简单聊天交互的后台任务执行能力，向着持久化智能体状态迈进。

**当前状态：** 仓库活跃，主要桌面平台均有可用发布版。支持多语言（英语、中文、日语、韩语、西班牙语、葡萄牙语、土耳其语）。项目采用 Apache-2.0 许可证，允许商业和私有修改。文档包含各种支持编码助手的具体设置指南。

**开放问题：** 沙箱：该应用是否将智能体代码执行与主机系统隔离，还是以完全用户权限运行？状态持久化：在没有集中式后端的情况下，如何跨会话持久化智能体状态和记忆？安全：API 密钥和智能体日志使用何种加密或本地存储实践？维护：上游仓库是由单一操作员还是社区维护，发布周期如何？

**连接：** OpenClaw：AionUi 明确引用了与 OpenClaw 智能体框架的集成。OpenCode：支持 OpenCode 运行时工作流以实现提供商灵活的编码。Cherry Studio：桌面环境中管理多个 LLM 助手的主要竞争入口。本地推理：通过启用本地模型使用与远程 API 并存，符合 local-inference-baseline 回路。

**译注**：在 Openflows 体系中，“流”（Current）指代动态的信号与流动，而“回路”（Circuit）指代已闭合并稳定的模式。本条目虽为“流”，但其“本地推理”连接指向了“回路”范畴，体现了从动态信号到稳定模式的转化过程。