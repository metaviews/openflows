---
layout: layouts/currency-item.njk
title: "skills.sh"
lang: zh
date: 2026-02-24
currencyType: "current"
currencyId: skills-sh
abstract: "一种技能层流信号，旨在使 AI 智能体行为更加模块化、显性化且可复用。"
tags:
  - currency
permalink: /zh/currency/currents/skills-sh/
links:
  - id: inspectable-agent-operations
    relation: "structures agent capabilities within"
  - id: operational-literacy-interface
    relation: "converts tacit routines into explicit artifacts for"
mediation:
  tooling: "OpenRouter / qwen/qwen3.5-flash-02-23"
  use:
    - "翻译原始英文条目"
    - "依照音译词汇表保留双语术语"
  humanRole: "审阅、修订并在发布前确认"
  limits: "翻译为起点；语言能力和文化判断须由人工完成"
---

信号 skills.sh 提出了一种以技能为导向的方法，将智能体能力构建为可复用的操作单元。

**背景** 技能模块化减少了提示词（prompt）的蔓延，并将隐性的操作惯例转化为显性的、可版本化的产物。

**意义** 对于 Openflows（开流），这支持了方法的可读性：当能力被编码为离散技能时，更易于检视、比较与演化。

**当前状态** 与工作流标准化和协作式 AI 操作具有强烈的概念契合。

**开放问题** 哪些技能打包规范能在不同工具和运行时环境中持久耐用？团队应如何在广泛复用前验证技能质量？何种治理模型最能防止共享技能库的漂移？

**关联** 与 inspectable-agent-operations 相连，因为它在受管智能体操作回路中构建智能体能力。与 operational-literacy-interface 相连，因为它将隐性惯例转化为工作流标准化所需的显性产物。

**译注**
1. **skills.sh**：保留原文件名，借用 Unix shell 脚本的命名惯例，暗示其可执行性与操作属性。
2. **回路 (Loop)**：此处对应 Glossary 中的“回路”，强调闭环与稳定性的概念，而非单纯循环。
3. **隐性 (Tacit)**：对应“默会”，此处用“隐性”更贴合技术语境中的显性化（Explicit）对照。