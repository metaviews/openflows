---
layout: layouts/currency-item.njk
title: zai-org GLM-5
lang: zh
date: 2026-03-24
currencyType: "current"
currencyId: zai-org-glm-5
abstract: zai-org/GLM-5 是一个拥有 7440 亿参数的稀疏注意力文本生成模型，利用异步强化学习基础设施来优化长程智能体任务的性能。
tags:
  - currency
permalink: /zh/currency/currents/zai-org-glm-5/
links:
  - id: z-ai
    relation: "API platform hosting GLM-5 inference services"
  - id: chinese-open-source-llm-landscape-2026
    relation: "Primary infrastructure example within the Chinese open-weight model ecosystem"
  - id: transformers-library
    relation: "Primary Python interface for model loading and inference"
mediation:
  tooling: "OpenRouter / qwen/qwen3.5-flash-02-23"
  use:
    - "翻译原始英文条目"
    - "依照音译词汇表保留双语术语"
  humanRole: "审阅、修订并在发布前确认"
  limits: "翻译为起点；语言能力和文化判断须由人工完成"
---

信号源：HuggingFace
标题：zai-org/GLM-5
URL: https://huggingface.co/zai-org/GLM-5
日期：2026-03-24
内容：文本生成模型 | 点赞：1860 | 下载：136040
许可证：MIT
库：transformers
管道标签：文本生成
语言：en, zh

上下文
GLM-5 代表了 Zai Org（前身为 THUDM）开发的 GLM 模型家族的最新迭代。其规模从之前的 GLM-4.5 配置（3550 亿参数，320 亿活跃）扩展至 7440 亿参数（400 亿活跃）。预训练数据量从 23T 令牌增加至 28.5T。架构集成了 DeepSeek 稀疏注意力（DSA）以降低部署成本，同时保持长上下文容量。发布包含 slime 异步强化学习基础设施，以提高训练吞吐量。

相关性
本条目记录了一个明确针对复杂系统工程和长程智能体任务的高参数开放权重模型。它标志着 GLM 家族向专用智能体工作负载的转变，而非通用聊天界面。稀疏注意力机制的使用凸显了规模化推理效率的持续优化。

当前状态
权重在 HuggingFace 上公开可用，采用 MIT 许可证。API 服务可通过 Z.ai API 平台访问。模型支持英语和中文生成。主要信号中暂无官方本地量化指南。

开放问题
异步强化学习基础设施（slime）在模型对齐稳定性方面与标准监督微调（SFT）管道相比如何？7440 亿参数模型在消费级硬件与企业集群上的实际推理成本是多少？是否有特定的智能体框架（例如 OpenClaw, Sage）已为工具使用适配了 GLM-5 架构？

关联
该模型运行于更广泛的中国开源模型基础设施之中，与西方模型发布形成竞争并互补。它依赖标准的 transformers 库进行本地交互。部署通过 Z.ai API 生态系统实现，抽象了底层模型复杂性。

**译注**
本条目类型标注为 `current`（流），在 Openflows 的术语体系中，`流`（liú）指代生态系统中移动的信号与动态过程，区别于静态的 `流通`（liú tōng，流通）。此处强调 GLM-5 作为动态技术信号在开源生态中的流转与影响，而非仅作为静态资源存在。此外，`Agent` 译为 `智能体`，保留了其作为自主行动者的意涵，呼应修行者（practitioner）在系统中主动介入的语境。