---
layout: layouts/currency-item.njk
title: "费曼：面向科学文献的开源研究智能体"
lang: zh
date: 2026-04-19
currencyType: "current"
currencyId: feynman
abstract: "费曼是一个原生命令行开源 AI 研究智能体，专注于科学文献综合、多智能体调查与代码审计，支持本地与云端推理后端。"
tags:
  - currency
permalink: /zh/currency/currents/feynman/

mediation:
  tooling: "OpenRouter / qwen/qwen3.5-flash-02-23"
  use:
    - "翻译原始英文条目"
    - "依照音译词汇表保留双语术语"
  humanRole: "审阅、修订并在发布前确认"
  limits: "翻译为起点；语言能力和文化判断须由人工完成"
---

费曼（Feynman）是一个原生命令行（CLI-native）开源 AI 研究智能体，旨在自动化科学文献的综合，实现多智能体调查工作流，并审计研究代码。不同于通用 AI 助手，费曼专为研究密集型任务而设计——阅读论文、提取见解、比较方法论，并在文献中追踪主张。

**核心能力 (Core Capabilities)**

*   **文献综合 (Literature Synthesis)**：费曼能够摄取和处理科学论文、技术报告及 arXiv 预印本，将关键主张、方法论和结果提取为结构化摘要。它在多份文档间维持上下文，以识别研究发现的收敛与分歧。
*   **多智能体调查 (Multi-Agent Investigation)**：该框架支持将子任务委派给专用子智能体——例如，一个智能体负责文献搜索，另一个专注于代码审计，第三个负责综合发现。这种分工加速了跨越多个领域的复杂研究问题的解决。
*   **代码审计 (Code Auditing)**：对于计算研究，费曼可对照已发表的方法论审计实现代码，识别差异，运行单元测试，并验证可复现性主张。这填补了研究流程中从论文到实践的关键空白。
*   **后端灵活性 (Backend Flexibility)**：费曼支持本地推理（通过 Ollama、Llama.cpp 或本地 vLLM 部署）和云端后端（OpenAI、Anthropic 等），使注重隐私的研究者能在本地运行敏感工作，同时保留扩展至更大模型以处理复杂任务的选项。

**架构 (Architecture)**

费曼主要通过终端运行，其 CLI 界面支持：
*   `feynman ask <query>`：提出研究问题并接收带有引用的综合答案
*   `feynman audit <repository>`：对照研究主张审计代码仓库
*   `feynman investigate <topic>`：为给定研究主题启动多智能体调查工作流
*   `feynman sync`：从配置的 arXiv 类别拉取最新预印本

CLI 设计优先考虑可复现性和审计追踪——每条响应均记录来源引用，使研究者能将结论追溯至原始文档。

**与现有工具的关系 (Relation to Existing Tools)**

费曼占据了一个细分领域，介于通用代码智能体（如 Aider 或 Cursor）与特定领域研究工具（如 Consensus 或 Scite）之间。与 AutoResearch 或 AutoGen 等工具不同，费曼专为科学探究而构建，而非通用软件开发或开放式任务自动化。它补充了如 Obsidian AI Agents 等工具，提供专注于研究的工作流，而非通用知识管理。

**治理与问责 (Governance and Accountability)**

费曼的开源性质确保研究流程保持可检查性和可编辑性。研究者可以修改智能体行为，审计代码本身，并验证其分析流程是否符合其认识论价值——这解决了困扰专有研究工具的“黑箱”问题。

**回路与连接 (Circuits and Connections)**

本项目与 Openflows（开流）文档中记录的若干基础设施模式相交：

*   **自主研究问责回路 (Autonomous Research Accountability Circuit)**：费曼通过记录引用和实现可追溯性，体现了人类维护的解释权威。
*   **终端原生智能体工作流回路 (Terminal-Native Agentic Workflows Circuit)**：CLI 优先的设计符合优先考虑脚本化和可审计工作流而非基于聊天的界面这一模式。
*   **可检查智能体操作回路 (Inspectable Agent Operations Circuit)**：带有来源引用的完整日志创建了一个可治理的智能体操作回路，其中调解保持可见且可修订。

相关条目包括 autoresearch-karpathy（最小化自主 ML 实验）、agentation（检查智能体屏幕状态以进行调试）以及通用研究工具化景观。

**调解块 (Mediation Block)**：本条目起草自费曼仓库的 README 和源代码。它反映了该项目截至 2026 年 4 月的当前设计理念，并不背书具体的模型推荐或实施权衡。

**译注**
*   **回路 (huí lù)**：此处对应英文 "Circuit"。在 Openflows 的语境中，它不仅仅指电子回路，更指一种经过验证、闭合且稳定的模式或路径。中文“回路”保留了“返回”与“路径”的双重含义，暗示了知识或工作流程的闭环与反馈。
*   **智能体 (zhì néng tǐ)**：对应 "Agent"。此处选用“智能体”而非“代理”，以强调其作为具有自主性的智能实体的身份，而非单纯的工具执行人。
*   **推理 (tuī lǐ)**：对应 "Inference"。此词与“理”（lǐ，自然纹理/规律）共享字符，暗示 AI 推理过程是在遵循数据的内在纹理，而非机械计算。
*   **Openflows（开流）**：品牌名保留英文，括号内“开流”取自《庄子》“开流”之意，呼应“流通”与“流”的语境，指代开放的知识与数据流动。