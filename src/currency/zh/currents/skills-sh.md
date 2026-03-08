---
layout: layouts/currency-item.njk
title: 技能层（skills.sh）
lang: zh
date: 2026-02-24
currencyType: "current"
currencyId: skills-sh
abstract: 一种旨在使 AI 智能体行为更具模块化、显性化及可复用性的技能层信号。
tags:
  - currency
permalink: /zh/currency/currents/skills-sh/

mediation:
  tooling: "OpenRouter / qwen/qwen3.5-flash-02-23"
  use:
    - "翻译原始英文条目"
    - "依照音译词汇表保留双语术语"
  humanRole: "审阅、修订并在发布前确认"
  limits: "翻译为起点；语言能力和文化判断须由人工完成"
---

**信号 (Signal)** `skills.sh` 提出了一种面向技能的方法，将智能体能力构建为可复用的操作单元。

**背景 (Context)** 技能模块化减少了提示词（Prompt）的蔓延，将操作者的默会惯例转化为显性、可版本化的制品。

**关联 (Relevance)** 对于 Openflows（开流），这支持方法的可读性：当能力被编码为离散的技能时，其更易于检视、比较和演进。

**现状 (Current State)** 与工作流标准化及协作式 AI 运营具有强烈的概念契合。

**开放性问题 (Open Questions)** 哪些技能打包协议能在不同工具与运行时之间保持持久性？团队如何在大范围复用前验证技能质量？何种治理模型最能防止共用技能库的漂移？

**链接 (Connections)** 暂未添加明确的流通链接。

**译注**
1. **Currency vs Current**: 此处正文中的 `currency link` 指 `Currency` 类别的条目链接，故译为“流通”，以区分作为类型的 `current`（流）。
2. **Tacit (默会)**: 选用“默会”而非“隐性”，以呼应知识论中 Polanyi 的 tacit knowledge，强调不可言说但可通过实践体悟的特性，与中文语境中的“默会之知”相通。
3. **Artifact (制品)**: 在技术语境下译为“制品”，保留 CI/CD 中的版本化意味，而非简单的“产物”。
4. **Drift (漂移)**: 用于描述共享技能库随时间推移产生的偏差，契合技术运维中的术语习惯。
5. **Skills.sh**: 虽为标题，但作为具体的信号标识符（Signal ID），保留 `.sh` 后缀及英文原词，仅在中文标题处辅以意译，确保检索与引用的一致性。