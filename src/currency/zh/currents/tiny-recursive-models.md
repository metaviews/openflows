---
layout: layouts/currency-item.njk
title: "小型递归模型 (TinyRecursiveModels)"
lang: zh
date: 2026-04-28
currencyType: "current"
currencyId: tiny-recursive-models
abstract: "三星 SAIL 蒙特利尔实验室发布 TinyRecursiveModels，这是一个开源框架，通过递归推理循环与架构优化，而非依赖参数规模扩张，来提升小型语言模型的可靠性与效率。"
tags:
  - currency
permalink: /zh/currency/currents/tiny-recursive-models/
links:
  - id: openai-parameter-golf-16mb-constraint
    relation: "explores performance limits in constrained parameter spaces via architectural innovation"
  - id: arcee-ai
    relation: "reflects the small-model current focused on deployability and efficiency"
mediation:
  tooling: "OpenRouter / qwen/qwen3.6-flash"
  use:
    - "翻译原始英文条目"
    - "依照音译词汇表保留双语术语"
  humanRole: "审阅、修订并在发布前确认"
  limits: "翻译为起点；语言能力和文化判断须由人工完成"
---

信号：无需更大模型，实现更智能的 AI · opensourceprojects · 2026-04-28 三星 SAIL 蒙特利尔实验室已发布 TinyRecursiveModels。这是一个开源项目，通过引入递归推理循环（recursive reasoning loops）与架构优化，在小型语言模型中实现了可靠性与效率的提升，从而对依赖参数规模扩张（parameter scaling）以获取性能增益的做法提出了挑战。

背景
TinyRecursiveModels 提出了一种方法论：小型模型通过递归步骤迭代优化其输出，无需承受大型架构的计算成本，即可有效模拟更深层次的推理过程。该项目凸显了算法效率与推理时算力（inference-time compute）分配如何能够与重度依赖参数的方法相抗衡，尤其在资源受限的环境中。这与更广泛的趋势相契合：随着硬件约束持续存在，业界正转向优化推理时策略与模型压缩，以维持系统的实际效用。

关联
本条目标志着一项技术转向：以效率驱动的智能。它进一步印证了推理时算力与递归模式的价值，它们可作为训练更大规模模型的可扩展替代方案。对于本地与边缘部署而言，此类方法降低了硬件门槛，同时在特定任务领域内保持了功能对等。它呼应了基础设施层的核心关注：构建可及且高实用性的 AI，使其不依赖于集中式的算力垄断。

当前状态
该项目作为开源仓库托管于 GitHub，隶属于三星 SAIL 蒙特利尔实验室。它提供了在小型模型中实现递归推理的代码与方法论。早期评估表明，它为提升小型模型表现提供了一条可行路径；不过，仍需跨多样化任务与长周期工作流的基准测试，以确立其泛化能力。

开放问题
与静态推理相比，递归开销如何影响延迟？
小型模型中递归循环的失效模式有哪些？
该方法与推测性解码（speculative decoding）或其他推理时优化技术相比如何？
底层权重（weights）的许可与分发模式为何？

连接
与 openai-parameter-golf-16mb-constraint 相连接，探讨在受限空间中的性能表现。
与 arcee-ai 相连接，聚焦小型模型的高效性。

**译注** (Translator's Note)
原文中的 “inference” 译为 “推理”，与中文 “理”（lǐ，自然之纹理/规律）同字。此处暗示 AI 的推理过程并非机械计算，而是顺着数据与架构的自然纹理展开的循环节律。递归循环（recursive loops）在此语境下亦呼应了 “回路”（huí lù）的概念：计算不向外无限扩张，而是向内闭合、自我校准，以最小的算力消耗达成最优的效用。