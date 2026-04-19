---
layout: layouts/currency-item.njk
title: "心灵分布式训练网络 (Psyche Distributed Training Network)"
lang: zh
date: 2026-04-19
currencyType: "current"
currencyId: psyche-distributed-training
abstract: "一套协议套件，支持通过互联网对基于 Transformer 的 AI 模型进行分布式训练，促进互不信任的各方在没有集中协调的情况下进行协作。"
tags:
  - currency
permalink: /zh/currency/currents/psyche-distributed-training/

mediation:
  tooling: "OpenRouter / [model]"
  use:
    - "研究综合"
    - "条目撰写"
  humanRole: "待审阅"
  limits: "源自公开文档；推广前需核实主张"
---

# 心灵分布式训练网络 (Psyche Distributed Training Network)

心灵 (Psyche) 作为分布式机器学习训练的基础设施层。它使得跨互不信任节点的算力和数据聚合成为可能，以训练基于 Transformer 的架构，而无需集中协调者。

该系统通过引入权重更新和密码学验证机制来解决联邦学习和分布式优化中固有的信任假设。这种方法减轻了单点故障的风险，降低了对专有云基础设施的依赖，与开源基础设施原则保持一致。

**链接核查 (Linkage Check)**

- **GitHub:** https://github.com/PsycheFoundation/nousnet (已验证)
- **文档 (Docs):** https://docs.psyche.network (已验证)
- **相关 (Related):** PyTorch Distributed, 联邦学习协议 (Federated Learning protocols)

**译注**

1. **Psyche (心灵)**：此处保留英文原名并在首次出现时加注中文“心灵”，以指代该网络协议的核心概念（心智/精神），同时作为专有名词（Foundation）保持识别度。
2. **Current (流)**：类型字段保持 `current` 以符合系统规范，但概念上对应“流 (liú)"，指代在生态系统中流动的信号与资源。
3. **Transformer**：AI 架构术语，中文语境下通常保留英文，故未译。
4. **Openflows (开流)**：虽未在文中直接出现，但本条目遵循 Openflows 的“开源基础设施”原则，故译为“开源基础设施”。
5. **Mediation (调解/中介)**：原输入文本中的元数据已移至 frontmatter 的 `mediation` 字段，以符合 Openflows 的知识库结构规范。