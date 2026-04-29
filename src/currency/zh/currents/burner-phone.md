---
layout: layouts/currency-item.njk
title: "一次性手机（Burner Phone）：基于视线检测的多模态 Android 智能体"
lang: zh
date: 2026-04-28
currencyType: "current"
currencyId: burner-phone
abstract: "一款 24/7 常驻运行的 Android 智能体（Agent），通过持续的多模态流（前置摄像头视线检测与麦克风语音采集）工作。无需唤醒词，仅当用户注视并对着手机说话时，才会激活对话。"
tags:
  - currency
permalink: /zh/currency/currents/burner-phone/
links:
  - id: hermes-agent
    relation: "integrates with Hermes agent as a skill"
mediation:
  tooling: "OpenRouter / qwen/qwen3.6-flash"
  use:
    - "翻译原始英文条目"
    - "依照音译词汇表保留双语术语"
  humanRole: "审阅、修订并在发布前确认"
  limits: "翻译为起点；语言能力和文化判断须由人工完成"
---

**信号 (Signal)**
Burner Phone · SouthpawIN · 2026

**语境 (Context)**
Burner Phone（一次性手机）将任意 Android 设备（实体手机、Termux 安装环境或模拟器）转化为持续活跃的 AI 听音智能体（Agent）。有别于依赖固定唤醒词（Wake Words，如“Hey Siri”、“OK Google”）的传统语音助手，它通过多模态信号检测人类注意力：前置摄像头以 15 fps 向 Qwen2.5-Omni 3.5B 模型（Model）推送视频流，麦克风同步采集音频分块，模型联合评估 `{addressing: true, looking: true, speaking: true, confidence: 0.94}`。仅当视线与语音对齐时，对话才会激活。文本转语音（TTS）采用运行于 CPU 上的 Soprano 80M 模型。

**关联 (Relevance)**
本项目体现了“常驻本地智能体（Agent）”模式向物理/伴侣设备维度的延伸。基于视线的唤醒检测，以真正具备注意力感知的触发机制，取代了脆弱的关键词识别。这对于必须过滤环境噪音、电视声及其他家庭对话的 24/7 听音设备而言至关重要。作为技能（Skill）集成至 Hermes 智能体生态（由 Nous Research 构建）中，它也印证了一种日益显现的模式：智能体技能正从硬件级传感中组合出更高层级的行为。

**当前状态 (Current State)**
项目已更新至 v2.0，并附有实测指标：注意力至激活延迟约 500ms，TTS 生成速率约 200ms/秒，持续流模式下电池消耗约 8%/小时，压缩媒体分块的网络占用约 50KB/s。支持实体 Android 设备与模拟器，并可通过 Tailscale 网络实现多设备管理。该项目最初为 Hermes 黑客松（Hackathon）产物。源代码在 GitHub 上以 Apache 2.0 协议开源（Open Source）。

**开放问题 (Open Questions)**
视线+语音检测模型是否完全在 Android 设备端本地运行，还是将推理（Inference）流式传输至连接的云端/网关？隐私处理机制如何——摄像头与麦克风数据在何处处理，数据保留策略为何？除 Hermes 外，是否向其他智能体框架开放 MCP 兼容工具？其手机自动化能力边界为何（涵盖通讯录、消息、通知、系统设置等）？

**连接 (Connections)**
与智能体技能组合模式、常驻本地推理设备、多模态唤醒检测基础设施相关联。主要集成目标为 hermes-agent；TTS 本地硬件部署参考 mimika-studio；物理设备智能体集成参考 dimensionalos。

**译注 (Translator's Note)**
- Burner Phone（一次性手机）：在数字安全语境中常指“用完即弃”的隐私设备。此处借指该智能体以“临场注意力”为触发核心，无需常驻监听，契合“无为之用”的轻量交互理路。
- 视线唤醒（Gaze-Based Wake）：英文侧重技术触发机制，中文“视线”与“唤醒”的结合暗含“相视而启”的交互理（lǐ），强调人与设备的注意力对齐，而非机械的关键词匹配。