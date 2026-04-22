---
layout: layouts/currency-item.njk
title: "Xiaomi-Robotics-0"
lang: zh
date: 2026-03-28
currencyType: "current"
currencyId: xiaomi-robotics-0
abstract: "Xiaomi-Robotics-0 是一个开源视觉-语言-动作模型，采用双脑架构，在消费级硬件上支持实时控制。"
tags:
  - currency
permalink: /zh/currency/currents/xiaomi-robotics-0/
links:
  - id: rynnbrain
    relation: "可与阿里开放具身基础模型进行比较"
  - id: dimensionalos
    relation: "连接基于 ROS2 技能架构的智能体机器人框架"
  - id: distributed-physical-agent-infrastructure
    relation: "贡献连接智能与控制的分布式物理系统基础设施"
mediation:
  tooling: "Codex"
  use:
    - "翻译英文条目"
    - "补齐缺失的中文对应条目"
  humanRole: "审阅、修订并在发布前确认"
  limits: "翻译为起点；语言能力和文化判断须由人工完成"
---

### 信号
英文条目引用了关于具身大脑模型的 [CSDN 信号](https://blog.csdn.net/qq_29462849/article/details/159417734)，记录 Xiaomi-Robotics-0 作为 47 亿参数视觉-语言-动作模型发布，并采用视觉语言脑与运动控制脑分离的双脑架构。

### 背景
具身 AI 基础设施正在从封闭、高成本系统转向可本地部署的开放模型。双脑架构试图把高层指令理解与低延迟动作控制分离，以满足机器人控制对实时性的要求。

### 关联
该条目连接 `rynnbrain`、`dimensionalos` 和 `distributed-physical-agent-infrastructure`。它的意义在于把开放模型讨论带入物理控制和机器人执行层，而不只停留在文本或代码任务。

### 当前状态
英文条目记录该模型面向消费级 NVIDIA GPU 优化，并宣称支持 30Hz 控制。仍需独立验证真实环境下的安全性、长期任务可靠性和不同光照条件下的表现。
