---
layout: layouts/currency-item.njk
title: "Anthropic 网络安全技能"
lang: zh
date: 2026-03-15
currencyType: "current"
currencyId: anthropic-cybersecurity-skills
abstract: "一份精选的 611 项以上结构化网络安全技能集合，兼容 Claude Code、GitHub Copilot、Cursor 和 Gemini CLI，使 AI 编程智能体能够执行安全分析、威胁建模和漏洞评估任务。"
tags:
  - currency
permalink: /zh/currency/currents/anthropic-cybersecurity-skills/
links:
  - id: skills-sh
    relation: "可比较的结构化技能框架，用于 AI 智能体能力扩展"
  - id: openclaw
    relation: "技能型智能体可扩展性模式应用于安全领域"
  - id: inspectable-agent-operations
    relation: "安全导向的技能引发 AI 辅助分析的审计性问题"
  - id: heretic
    relation: "占据安全光谱的另一端——防御与解盟"
mediation:
  tooling: "OpenRouter / qwen/qwen3.5-flash-02-23"
  use:
    - "翻译原始英文条目"
    - "依照音译词汇表保留双语术语"
  humanRole: "审阅、修订并在发布前确认"
  limits: "翻译为起点；语言能力和文化判断须由人工完成"
---

信号源：GitHub (mukul975/Anthropic-Cybersecurity-Skills)。URL: https://github.com/mukul975/Anthropic-Cybersecurity-Skills。Stars: 492。License: Apache 2.0。Language: Python。

背景
此仓库提供结构化的网络安全技能集合——截至信号日期共 611 项以上——格式化为可在多个平台上使用的 AI 编程智能体：Claude Code、GitHub Copilot、Cursor 和 Gemini CLI。技能涵盖安全分析、威胁建模、漏洞评估及相关领域。平台无关的方法（支持四种不同的 AI 智能体环境）既反映了当前 AI 智能体市场的碎片化，也试图创建跨工具流通的可复用安全专业知识。Apache 2.0 许可证确保使用权限的宽松性和可修改性。

相关性
该集合代表了一种新兴模式：将领域专业知识编码为机器可读的技能，将 AI 智能体的能力从通用代码生成扩展到专业领域。网络安全是一个特别重要的早期领域，因为它既高风险（错误后果严重）又依赖技能（专业知识集中且难以分发）。如果结构化技能能可靠地扩展 AI 智能体在安全环境中的能力，该模式将迅速传播到其他专家领域。

当前状态
GitHub 上 492 个星标，活跃维护。611 项以上技能覆盖网络安全领域，涵盖多种任务类型。兼容四种主要 AI 编程智能体平台。Apache 2.0 许可证。鉴于其开放结构，似乎欢迎社区贡献。

开放问题
技能质量和准确性如何验证——谁审查编码在 611 项条目中的网络安全专业知识？跨四种支持平台的性能如何比较——为某一智能体设计的技能在其他智能体中是否同样有效？对于既可用于防御（威胁建模、漏洞评估）又可用于进攻（攻击面映射、漏洞研究）的技能，其治理模式是什么？这种结构化技能方法与微调或基于 RAG 的领域专业化方法相比如何？

连接
该集合与 skills.sh 并列，作为 AI 智能体可扩展技能模式的实例，但应用于安全领域而非通用工作流。安全技能的双重用途将其直接连接到 Heretic——两者都在定义安全研究的防御与进攻之间的空间运作。可观测智能体操作回路的关注点在于可审计的 AI 行为，当智能体执行安全分析时尤为紧迫：在安全环境中，知道智能体做了什么以及为什么比在其他大多数环境中更重要。

**译注**
- **智能体 (Agent)**：此处选用“智能体”而非“助手”，以强调其作为行动主体（Agent）的能动性，符合 Openflows 对 Agent 作为修行者（Practitioner）的隐喻。
- **回路 (Circuit)**：在“连接”部分将“circuit”译为“回路”，呼应 Zhuangzi 中“理”的循环与闭合，暗示安全审计不仅是线性检查，更是闭环的验证。
- **流 (Current)**：虽正文未直接用“流”字，但类型 `current` 对应“流”，指代生态系统中流动的个体信号，区别于静态的“Currency”（流通）。