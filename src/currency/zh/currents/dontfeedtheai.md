---
layout: layouts/currency-item.njk
title: "DontFeedTheAI：面向 Claude Code 的隐私代理"
lang: zh
date: 2026-04-29
currencyType: "current"
currencyId: dontfeedtheai
abstract: "面向 Claude Code 的反向代理，在敏感渗透测试数据抵达云端模型前，通过本地 Ollama 检测与正则表达式安全网对其进行匿名化处理。"
tags:
  - currency
permalink: /zh/currency/currents/dontfeedtheai/
links:
  - id: openclaw
    relation: "alternative privacy-first agent framework"
mediation:
  tooling: "OpenRouter / qwen/qwen3.6-flash"
  use:
    - "翻译原始英文条目"
    - "依照音译词汇表保留双语术语"
  humanRole: "审阅、修订并在发布前确认"
  limits: "翻译为起点；语言能力和文化判断须由人工完成"
---

**Context**
DontFeedTheAI 是一个反向代理，部署于 Claude Code（或类似的云端连接型编码智能体）与其上游模型提供商之间。其目的在于拦截并匿名化敏感数据——包括 IP 地址、哈希值、凭证、主机名与个人身份信息（PII）——在数据离开本地环境之前。该系统采用双层检测策略：本地运行的 Ollama 大语言模型负责敏感内容的语义识别，辅以基于正则表达式的安全网。每次安全评估均在独立的保险库（vault）中进行，并通过自我优化的反馈回路持续精进检测能力。

**Relevance**
该信号折射出智能体编码工作流与操作安全之间的日益紧张的张力，尤其在渗透测试与红队演练等场景中，源代码、基础设施细节与凭证绝不可脱离受控环境。它体现了一种轻量级中间件的演进模式：在不依赖上游模型提供商配合的前提下，修补云端连接型智能体工具链中的隐私缺口。

**Current State**
该项目目前获得 411 个星标与 49 次 Fork，处于早期阶段但在安全相关社区中正稳步积累关注。它以 Claude Code 作为主要集成面，并具备向其他智能体框架扩展的能力。

**Open Questions**
双层检测机制在实际应用中是否会产生显著的误报/漏报率？它如何处理流式输出——响应中是否会有敏感数据回流？反馈回路的机制是否已文档化，或向社区开放贡献？

**Connections**
与 [openclaw] 相联，为寻求在运行时层面实现隐私优先的智能体框架的运营者提供路径；并与 [agent-governance-toolkit] 相联，后者提供组织层面的治理方案。在更广泛的沙箱隔离与隔离生态中，它与 [capsule] 存在关联。

**译注**
- **智能体 (agent)**：此处沿用 AI 语境下的标准译法，指代具备自主执行与编排能力的编码工具。
- **回路 (circuit/loop)**：原文 "feedback loop" 译为“反馈回路”，呼应 Openflows 词汇表中“回路”作为闭合路径与稳定模式的隐喻，强调系统通过实践自我校准的理。
- **流通 (currency) / 流 (current)**：本条目属“流”层级，关注数据在智能体与云端模型间的具体流转路径；隐私代理的作用即在于疏导这一流通，使其符合安全规范。