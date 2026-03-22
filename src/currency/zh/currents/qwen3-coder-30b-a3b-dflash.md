---
layout: layouts/currency-item.njk
title: "Qwen3-Coder-30B-A3B-DFlash 推测解码模型"
lang: zh
date: 2026-03-20
currencyType: "current"
currencyId: qwen3-coder-30b-a3b-dflash
abstract: "一种利用块扩散（block diffusion）架构的推测解码（speculative decoding）起草模型，旨在通过 SGLang 和 vLLM 加速 Qwen3-Coder 推理。"
tags:
  - currency
permalink: /zh/currency/currents/qwen3-coder-30b-a3b-dflash/
links:
  - id: sglang
    relation: "SGLang 集成支持 DFlash 推测解码以实现推理加速"
  - id: vllm
    relation: "vLLM 集成目前正在进行中，以兼容 DFlash"
mediation:
  tooling: "OpenRouter / qwen/qwen3.5-flash-02-23"
  use:
    - "翻译原始英文条目"
    - "依照音译词汇表保留双语术语"
  humanRole: "审阅、修订并在发布前确认"
  limits: "翻译为起点；语言能力和文化判断须由人工完成"
---

信号：HuggingFace 条目 z-lab/Qwen3-Coder-30B-A3B-DFlash（2026-03-17）。模型卡（model card）显示采用 MIT 许可证、transformers 库及文本生成管道（text-generation pipeline）标签。标签包括 dflash、speculative-decoding、diffusion、efficiency、flash-decoding、qwen 及 diffusion-language-model。

背景：DFlash 是一种推测解码（speculative decoding）方法，利用轻量级块扩散（block diffusion）模型进行起草（drafting）。它支持高效、高质量的并行起草，以突破推理（inference）速度的极限。该模型作为起草组件运行，并需要目标模型（Qwen/Qwen3-Coder-30B-A3B-Instruct）配合。

相关性：该模型展示了训练效率和可扩展性，尽管使用的训练数据显著少于 EAGLE-3（289K 样本对比 EAGLE-3 的 1.4M），但在推理加速方面表现更优。这表明块扩散架构可能比标准自回归（autoregressive）起草提供更数据高效的推测解码优化路径。

当前状态：截至信号日期，HuggingFace 上有 694 次下载和 27 个赞。支持 SGLang 集成。vLLM 集成正在进行中。模型在 nvidia/Nemotron-Post-Training-Dataset-v2、theblackcat102/evol-codealpaca-v1 的代码拆分及 Cline 执行轨迹上训练。

开放问题：vLLM 集成和支持的时间表为何？性能如何随超过初始 289K 样本的更大训练数据集扩展？块扩散起草机制是否泛化至非代码模型家族？

连接：此条目连接到 sglang 和 vllm，作为支持 DFlash 架构的主要服务框架。该推理优化技术与更广泛的 local-inference-baseline 回路（circuit）相关，特别是在消费级或边缘硬件上的效率增益方面。

**译注**
- **流 (liú) 与 流通 (liú tōng)**：本条目类型为 `current`，译为“流”，指代生态系统中流动的具体信号或动态；而 `Currency` 译为“流通”，指代更宏观的循环层。此处强调其作为流动中的具体节点。
- **推理 (tuī lǐ)**：与“理 (lǐ)"共享字符，暗示推理不仅是计算，更是对事物内在纹理（grain）的顺应与解析。
- **回路 (huí lù)**：在“连接”部分提及的 `circuit`，指代已闭合且稳定的模式；此处指该优化技术如何嵌入更广泛的本地推理基础设施中。
- **双语术语**：关键技术词保留英文原词（如 speculative decoding, block diffusion），以便在技术实践中与源码及文档保持对应，体现“持术语于双语之间”的音译原则。