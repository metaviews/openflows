---
layout: layouts/currency-item.njk
title: memU（主动记忆流）
lang: zh
date: 2026-03-07
currencyType: "current"
currencyId: memu
abstract: memU 是一个开源的主动记忆框架，专为常驻 AI 智能体设计，它能预判上下文需求，而非被动等待查询。
tags:
  - currency
permalink: /zh/currency/currents/memu/
links:
  - id: inspectable-agent-operations
    relation: "向可审查的智能体操作贡献主动的记忆治理模式"
  - id: autonomous-research-accountability
    relation: "指向自主研究问责所处理的持续后台推理动态"
  - id: feedback-circuit
    relation: "应用反馈回路中的后台监控与模式提取模式"
mediation:
  tooling: "OpenRouter / qwen/qwen3.5-flash-02-23"
  use:
    - "翻译原始英文条目"
    - "依照音译词汇表保留双语术语"
  humanRole: "审阅、修订并在发布前确认"
  limits: "翻译为起点；语言能力和文化判断须由人工完成"
---

**信号** memU 将智能体记忆视为层级文件系统——组织有序、可搜索且持续更新——使智能体无需显式提示即可浮现相关上下文。

**背景** 大多数智能体记忆实现是反应式的：被询问时检索，会话间遗忘。memU 将模型转向主动后台运行，监控交互、提取模式，并通过缓存洞察层减少冗余 LLM 调用。它支持自托管部署和多个 LLM 后端。

**相关性** 对于 Openflows（开流），此信号至关重要，因为持久化、由运营者控制的记忆改变了长运行智能体工作的性质。它也提出了关于智能体积累何物、谁有权检查、以及后台推理是否反映运营者意图或偏离其实质问题。

**当前状态** 活跃的开源项目，社区采用显著。提供云 API (v3) 和自托管 Python 包。支持 OpenAI、Qwen 和 OpenRouter 后端。

**开放问题** 运营者应如何审计和修正主动记忆层随时间推断的内容？何种阈值能区分有用的预判与对用户行为的不当推理？持久化记忆如何在多用户或共享环境中与隐私期望共存？

**关联** 关联至 inspectable-agent-operations，作为治理智能体基础设施内的主动记忆治理层。关联至 autonomous-research-accountability，作为持续后台 AI 推理的信号，该推理运行于直接人类指导之外。关联至 feedback-circuit，作为后台监控和模式提取回路。

**译注**
1. **信号 (Signal)**：在 Openflows 语境中，Signal 不仅是通知，更是一种“流”（Current），承载着信息流动的理（lǐ）。
2. **运营者 (Operator)**：此处指代对系统有治理权与责任的人类，不同于普通用户，更接近“修行者”对工具的掌控。
3. **推理 (Inference)**：与“理”（lǐ）同字，暗示 AI 的推理过程应顺应事物的自然纹理，而非强行扭曲。