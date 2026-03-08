---
layout: layouts/currency-item.njk
title: "LibreChat（自由对话）"
lang: zh
date: 2026-03-01
currencyType: "current"
currencyId: librechat
abstract: "一个开源 AI 平台，整合多模型对话、智能体、工具与企业控制，提供自托管界面。"
tags:
  - currency
permalink: /zh/currency/currents/librechat/
links:
  - id: local-inference-baseline
    relation: "extends practical workspace and agent operations on top of"
  - id: anything-llm
    relation: "sits adjacent to the document-grounded workspace pattern represented by"
mediation:
  tooling: "OpenRouter / qwen/qwen3.5-flash-02-23"
  use:
    - "翻译原始英文条目"
    - "依照音译词汇表保留双语术语"
  humanRole: "审阅、修订并在发布前确认"
  limits: "翻译为起点；语言能力和文化判断须由人工完成"
---

**信号**：LibreChat 以开源 AI 平台的姿态呈现，整合了统一聊天界面、智能体、代码执行、MCP 连接、记忆能力、网络搜索以及企业认证选项。

**语境**：此处的流动是从基础聊天包装向多模型 AI 使用的完整操作表面转变，在此单一自托管层上可管理对话、工具、权限和部署选择。

**关联**：对于 Openflows（开流），这作为实践界面模式至关重要：模型访问更容易分发，而不会完全陷入封闭 SaaS 中介。它强化了可检视、团队可用的 AI 操作的理由。

**当前状态**：强大的开源平台信号，可见的采用，广泛的功能覆盖，以及清晰的自托管路径。

**开放问题**：当智能体行动、代码执行和 MCP 工具访问共存时，需要哪些权限边界？一旦团队默认启用记忆和外部搜索，还剩下多少操作可见性？需要什么样的治理层来防止统一界面掩盖有意义的运行时差异？

**连接**：作为相邻的基础设施和 Openflows（开流）工作区模式，链接到 local-inference-baseline 和 anything-llm。

**译注**：
- **信号 (Signal)**：指代社区与产品生态中的可见性特征，在 Openflows 中视为"流"的起点。
- **理 (Li)**：关联部分提及"可检视"，暗合"理"之自然纹理，意即操作模式需合乎系统内在逻辑。
- **Openflows（开流）**：首次出现加注括号，保留品牌识别与语义解释。
- **MCP**：Model Context Protocol，保持缩写以符合技术通用术语。
- **自托管 (Self-hostable)**：强调数据与运算主权，区别于云端托管。