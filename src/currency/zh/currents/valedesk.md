---
layout: layouts/currency-item.njk
title: "ValeDesk（瓦尔德斯克）"
lang: zh
date: 2026-03-24
currencyType: "current"
currencyId: valedesk
abstract: "ValeDesk 是一款跨平台桌面应用，通过 Ollama 和 vLLM 集成本地 LLM 推理，并整合任务管理与沙箱代码执行。"
tags:
  - currency
permalink: /zh/currency/currents/valedesk/
links:
  - id: ollama
    relation: "本地推理运行时依赖"
  - id: vllm
    relation: "本地推理运行时依赖"
  - id: lm-studio
    relation: "本地推理运行时依赖"
  - id: cherry-studio
    relation: "可比较的桌面 LLM 界面"
  - id: zero-boot-sub-millisecond-sandboxes
    relation: "相关的安全沙箱概念"
mediation:
  tooling: "OpenRouter / qwen/qwen3.5-flash-02-23"
  use:
    - "翻译原始英文条目"
    - "依照音译词汇表保留双语术语"
  humanRole: "审阅、修订并在发布前确认"
  limits: "翻译为起点；语言能力和文化判断须由人工完成"
---

**信号** ValeDesk (https://github.com/vakovalskii/ValeDesk) 是一款跨平台桌面应用（Windows, macOS, Linux），基于 Tauri、Rust 和 TypeScript 构建。版本 0.0.8 支持通过 Ollama、vLLM 和 LM Studio 进行本地 LLM 推理，并兼容 OpenAI SDK。核心功能包括带可视化待办面板的任务规划、计划任务执行、代码沙箱（Node.js vm, Python subprocess）、文档提取（PDF, DOCX）以及通过 SQLite 实现的会话持久化。安全功能包括文件操作目录沙箱和工具执行的权限系统。

**语境** 该条目位于本地推理基线回路中，桌面应用在此为终端用户工作流抽象出硬件和运行时复杂性。与云优先智能体框架不同，ValeDesk 优先考虑数据本地化和离线能力，将其定位为个人助理层而非服务器端编排引擎。它弥合了原始模型推理运行时与面向用户的任务管理界面之间的差距。

**相关性** ValeDesk 展示了推理运行时、任务管理和安全沙箱整合到单个桌面二进制文件中的能力。这降低了需要持久内存和安全代码执行的操作者的运维开销，而无需管理独立服务。Telegram 解析和 Web 搜索集成的加入将智能体的范围从纯文本生成扩展到信息检索和通信渠道。

**当前状态** 项目处于早期开发阶段（v0.0.8），专注于本地工作流的功能完备性。栈依赖 Tauri 作为前端，Rust 作为后端逻辑，确保低内存占用和跨平台兼容性。SQLite 处理会话持久化，允许聊天历史和任务状态在应用重启后幸存。代码执行被沙箱化，但依赖标准子进程和虚拟机而非容器化。

**开放问题** Tauri 和 Rust 工具链的长期维护节奏和依赖更新。目录沙箱模型与基于容器的隔离方法相比的深度。SQLite 在大规模会话历史和内存管理中的可扩展性。与提供的 OpenAI SDK 包装器之外的外部智能体框架的集成潜力。

**连接** 该应用作为 ollama 和 vllm 运行时的客户端层，利用其推理能力进行本地模型服务。它与 cherry-studio 共享桌面界面类别，但 ValeDesk 更强调任务管理和代码执行。关于代码执行的安全顾虑与 zero-boot-sub-millisecond-sandboxes 中探索的概念一致，尽管 ValeDesk 目前实施基于目录的约束而非写时复制分叉。

回路在此刻闭合：当本地推理与任务管理在单点二进制中达成统一，修行者得以在离线中持守数据主权。

**译注**
- **Current / 流**：此处 `currencyType` 为 `current`，对应词汇表中的 `Current(s)`（流）。意指生态系统中流动的信号，而非静态的 `Currency`（流通）。
- **Circuit / 回路**：文中提及 "baseline circuit"，译为“基线回路”。在 Openflows 语境中，回路指已完整且稳定的模式，此处特指本地推理的工作流闭环。
- **Agent / 智能体**：保留 AI 智能体的标准译法，强调其作为自主执行单元的属性。
- **Inference / 推理**：与“理”（lǐ）同源，暗示推理过程需顺应模型内在的自然纹理。
- **ValeDesk**：保留原名，音译为“瓦尔德斯克”，以维持品牌识别度。