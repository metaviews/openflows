---
layout: layouts/currency-item.njk
title: "promptfoo"
lang: zh
date: 2026-04-01
currencyType: "current"
currencyId: promptfoo
abstract: "一款用于评估与大语言模型应用红队测试的命令行及库工具，支持声明式配置以实现 CI/CD 集成，并支持跨模型提供商的性能对比。"
tags:
  - currency
permalink: /zh/currency/currents/promptfoo/
links:
  - id: onyx-ai-open-llm-leaderboard
    relation: "evaluation benchmarking infrastructure"
  - id: feedback-circuit
    relation: "evaluation data feeding loop"
  - id: inspectable-agent-operations
    relation: "operational visibility layer"
  - id: anthropic-performance-engineering-take-home
    relation: "evaluation criteria standard"
mediation:
  tooling: "OpenRouter / qwen/qwen3.6-plus:free"
  use:
    - "翻译原始英文条目"
    - "依照音译词汇表保留双语术语"
  humanRole: "审阅、修订并在发布前确认"
  limits: "翻译为起点；语言能力和文化判断须由人工完成"
---

信号 promptfoo · github · 2026-04-01 一款用于评估与大语言模型应用红队测试（red-teaming）的 CLI 与库工具，支持声明式配置（declarative configuration），并兼容命令行与 CI/CD 集成。该工具便于跨 GPT、Claude、Gemini、Llama 及其他提供商进行性能对比，并因 OpenAI 与 Anthropic 的实际使用而受到关注。尽管近期被 OpenAI 收购，该项目仍保持开源（open source）状态并采用 MIT 许可证。

**Context** 评估基础设施正从临时脚本向标准化工程工具过渡，并深度嵌入开发生命周期之中。Promptfoo 代表了一种范式转变：将提示词与智能体（agent / 智能体）的可靠性视为可度量、可测试的工程学科，而非依赖经验直觉的启发式摸索。其与 CI/CD 流水线的集成，标志着大语言模型评估正常态化为部署流程中的关键准入机制。

**Relevance** 智能体系统的可靠性与安全性，依赖于始终如一的评估指标。Promptfoo 对红队测试与漏洞扫描的侧重，直接应对了自主智能体执行有害或非预期动作所带来的运行风险。通过提供统一的模型比对接口，它消解了各团队在验证不同提供商后端性能时的工作碎片化。

**Current State** 该工具持续活跃维护，支持通过 npm、brew 与 pip 进行安装。其提供的声明式配置格式，大幅简化了测试用例与评估标准的定义过程。OpenAI 的收购未改变其开源属性，但也引发了关于其未来将向专有评估标准靠拢，还是继续锚定社区驱动基准测试的疑问。

**Open Questions** 与 OpenAI 的隶属关系，将如何影响该工具在评估 OpenAI 模型与竞品时的中立性？该评估框架未来是否会演进为仅支持特定 OpenAI 智能体架构？相较于无状态提示词测试，该工具将如何处理具有状态记忆的智能体交互？

**Connections** 本条目链接至 onyx-ai-open-llm-leaderboard 以获取标准化基准测试语境，链接至 feedback-circuit 以接入评估结果反哺迭代的运行回路（circuit / 回路），链接至 inspectable-agent-operations 以实现对智能体行为的可观测性，并链接至 anthropic-performance-engineering-take-home 以对齐行业评估标准。这些连接确立了 promptfoo 作为智能体可靠性基础设施层中的基础构件地位。

**译注**
- 英文原文中的 "agent" 在此译为“智能体”，以区别于传统软件工程中的“代理”概念，强调其具备自主决策与上下文维持能力的 AI 实体。
- "gatekeeping mechanism" 译为“准入机制”，在中文 DevOps 语境中更贴合 CI/CD 流水线中控制部署权限的关卡逻辑。
- "stateful agent interactions" 与 "stateless prompt testing" 的对比，揭示了大模型应用从单次提示词响应向具备记忆与连贯性的智能体架构演进的技术理路（理，lǐ）。在此脉络中，评估不再仅是静态输出比对，而是对动态行为轨迹的追踪。