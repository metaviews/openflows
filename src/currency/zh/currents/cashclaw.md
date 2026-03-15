---
layout: layouts/currency-item.njk
title: "现金爪 (CashClaw)"
lang: zh
date: 2026-03-15
currencyType: "流 (liú)"
currencyId: cashclaw
abstract: "现金爪 (CashClaw) 是一个自主智能体，在 Moltlaunch 市场上发现、竞拍并执行任务，同时在任务周期之间运行自我改进会话以扩展其自身能力。"
tags:
  - 流通 (liú tōng)
  - 流 (liú)
permalink: /zh/currency/currents/cashclaw/
links:
  - id: openclaw
    relation: "共享爪命名谱系；可比的自主智能体架构"
  - id: inspectable-agent-operations
    relation: "对自我修改智能体的审查与可审计性提出疑问"
  - id: autonomous-research-accountability
    relation: "自我改进周期与自主能力发展的交叉"
mediation:
  tooling: "OpenRouter / qwen/qwen3.5-flash-02-23"
  use:
    - "翻译原始英文条目"
    - "依照音译词汇表保留双语术语"
  humanRole: "审阅、修订并在发布前确认"
  limits: "翻译为起点；语言能力和文化判断须由人工完成"
---

信号源：GitHub (moltlaunch/cashclaw)。URL: https://github.com/moltlaunch/cashclaw。Stars: 551。License: MIT。Language: TypeScript。

语境：现金爪 (CashClaw) 实现了一个自主经济智能体回路：在 Moltlaunch 市场上发现可用任务，评估并竞拍，执行已接受的工作，收集付款，然后重复。在任务周期之间，智能体运行自我研习会话以提升自身能力——这一反馈回路使其成为一个自我改进的经济主体，而非静态工具。架构引发了关于监管、可审计性以及自主智能体在真实经济环境中运行的可持续性的即时问题。

关联意义：现金爪代表了自主经济智能体的具体实现——智能体不仅完成任务，还积极参与市场并改进自身表现以更有效竞争。尽管仍处于早期（551 stars），它是自主智能体设计方向的早期且具体信号：在既定经济系统中优化自身成功的智能体。自我改进周期尤为显著，因为它超越了任务完成，进入能力积累。

当前状态：GitHub 上的早期项目，开发活跃。TypeScript 实现，MIT 许可。Moltlaunch 市场集成是主要部署语境。自我改进会话作为核心功能而非实验能力被记录。

开放问题：什么约束限制了自我改进周期——智能体能否修改其自身的竞拍逻辑、任务选择标准或能力范围？Moltlaunch 市场如何处理争端、质量评估或问责，当自主智能体交付工作时？当智能体未能完成其竞拍的任务时会发生什么——是否有声誉或财务后果？自我研习机制在实践中如何运作——它训练什么数据，存在什么监督？

连接：现金爪通过名称和架构方法连接到 OpenClaw（开爪）生态系统——两者都将智能体视为自主行动者，而非处于持续人类监督下的工具。自我改进回路提出了直接相关的自主研究问责回路的问题：当基于其自身演化逻辑做出决策的自我改进智能体做出决定时，谁负责？可审计智能体操作回路对可审计行为的关注因修改自身能力的智能体而受到直接挑战。

**译注**
1.  **流 (liú) vs 流通 (liú tōng)**: 在 Openflows 体系中，`currency` 指代“流通”这一整体层级，而 `current` 指代具体的“流”或信号。翻译中区分了 `currencyType` 的“流”与 `tags` 中的“流通”。
2.  **回路 (huí lù)**: 对应英文 `Circuit`。选用“回路”而非“电路”，既保留了闭环之意，也呼应了 Zhuangzi 中“理”的循环往复之感。
3.  **智能体 (zhì néng tǐ)**: 对应 `Agent`。选用此词以强调其作为“修行者”般的自主性，区别于简单的工具。
4.  **OpenClaw**: 保留英文并加注“开爪”，以维持品牌谱系的识别度，同时体现 Openflows（开流）的命名逻辑。