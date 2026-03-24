---
layout: layouts/currency-item.njk
title: "本地多模态感知基础设施"
lang: zh
date: 2026-03-23
currencyType: "circuit"
currencyId: local-multimodal-perception-infrastructure
abstract: "此回路稳定了设备端多模态感知的模式，使智能体能够在不依赖云端的情况下处理音频、视觉和空间数据。"
tags:
  - currency
permalink: /zh/currency/circuits/local-multimodal-perception-infrastructure/
links:
  - id: lux-tts
    relation: "provides local voice synthesis capability"
  - id: apple-ml-sharp
    relation: "provides local vision reconstruction capability"
  - id: ibm-granite-4-0-1b-speech
    relation: "provides local speech recognition capability"
  - id: corbeau-splat
    relation: "provides local spatial mapping capability"
mediation:
  tooling: "OpenRouter / qwen/qwen3.5-flash-02-23"
  use:
    - "翻译原始英文条目"
    - "依照音译词汇表保留双语术语"
  humanRole: "审阅、修订并在发布前确认"
  limits: "翻译为起点；语言能力和文化判断须由人工完成"
---

此回路始于语言聚焦的本地推理基线之上的一级。它稳定了完全在边缘设备上发生的感官输入与运动输出的循环。虽然基线处理文本，而此基础设施处理文本周遭的世界。ibm-granite-4-0-1b-speech 流以高效的自动语音识别锚定输入端。它允许智能体在本地解析人类语音，无需传输音频流。lux-tts 流通过从同一设备合成高保真语音输出来闭合回路。它们共同形成一个抵抗云延迟和隐私泄露的封闭音频通道。视觉和空间数据需要与纯文本不同的处理方式。apple-ml-sharp 流实时从单张图片生成新颖的 3D 视角。corbeau-splat 流将原始视频转换为交互式 3D Gaussian Splat 表示。这些工具将空间重建从批处理转移到运行时感知。此集群不同于分布式物理智能体基础设施，后者专注于机器人控制而非通用感官感知。集群抵抗分布式感知的故障模式，即数据必须离开设备才能被理解。它避免了工具的分片，其中视觉、音频和语言生活在不同的孤岛中。相反，它为具身自主性建立了共享基础设施。回路在此刻闭合：当智能体能够摄入音频和视频，重建 3D 环境，并无需任何数据包离开本地硬件即可语音回应时。

**译注**
*   **回路 (Circuit)** 与 **流 (Current)**：中文语境中，“回路”强调闭合与回归，暗含系统自洽的完整性；“流”则捕捉了数据在基础设施内部动态运作的生命力，二者共同构建了“理”的层次。
*   **智能体 (Agent)**：此处选用“智能体”而非“代理”，旨在强调其具备感知与行动能力的主体性，接近修行者的意涵。
*   **具身 (Embodied)**：对应英文 "embodied"，强调感知与行动必须依托于物理实体，而非纯粹的数字模拟。