---
layout: layouts/currency-item.njk
title: "CellGuard：蜂窝网络监控检测"
lang: zh
date: 2026-04-19
currencyType: "current"
currencyId: cellguard
abstract: "开源 iOS 应用与框架，用于检测非法基站并分析蜂窝基带流量。由 SEEMOO 实验室开发，旨在揭露移动网络上的监控基础设施。"
tags:
  - currency
permalink: /zh/currency/currents/cellguard/

mediation:
  tooling: "OpenRouter / qwen/qwen3.5-flash-02-23"
  use:
    - "翻译原始英文条目"
    - "依照音译词汇表保留双语术语"
  humanRole: "审阅、修订并在发布前确认"
  limits: "翻译为起点；语言能力和文化判断须由人工完成"
---

CellGuard 是一款由达姆施塔特工业大学（TU Darmstadt）SEEMOO 实验室开发的安全研究套件，旨在审计 iOS 设备上的蜂窝网络安全。它作为检测非法基站（IMSI 捕获器/斯廷格雷）的检测机制，通过监控基带通信协议运作。该项目弥合了不透明的蜂窝基础设施与终端用户可见性之间的鸿沟，允许安全研究者和注重隐私的用户识别试图拦截或操纵移动流量的未经授权网络设备。技术实现依赖于原生与系统级组件的结合。核心 iOS 应用使用 Swift 编写，辅以 Rust 扩展以进行高性能数据包处理。系统微调（CapturePacketsTweak）在基带层面拦截二进制 QMI（高通移动接口）和 ARI 数据包，随后由守护进程（RotateKeysDaemon）处理以管理进程间通信令牌。通过 Python 脚本（AnalyzeCells）促进导出数据集的分析。该项目利用 Apple Cell Location Database 将观测到的小区 ID 与已知基础设施关联，增强非法基站识别的准确性。

Linkage Check BaseTrace：CellGuard 利用底层的 BaseTrace 框架进行 iOS 基带接口探索。

SEEMOO Lab：主要维护者；与移动网络安全和隐私的更广泛研究相关联。

Publication：《Catch You Cause I Can: Busting Rogue Base Stations using CellGuard and the Apple Cell Location Database》（2024）。

Ecosystem：开源移动安全工具生态的一部分，与 NetGuard 或 Wireshark 等用于蜂窝流量的工具互补。

中介：
  tooling: "OpenRouter / [模型]"
  use:
    - "研究综合"
    - "条目起草"
  humanRole: "待审队列"
  limits: "源自公开文档；推广前需验证主张"

**译注**
- **Current (流)**：此处 `current` 译为 `流`，呼应 Zhuangzi 中“流”的意象，指代知识在生态中的流动与信号，而非静态的货币（Currency/流通）。
- **Rogue Base Stations**：译为“非法基站”或“流氓基站”。中文语境中“流氓”常指代此类隐蔽的、非授权的硬件，比直译“邪恶”更贴近技术社区用语。
- **Stingray**：保留英文或译为“斯廷格雷”，因其在间谍技术圈层中为专有名词，直接意译会损失其特定指涉。
- **Tweak**：iOS 越狱生态中的特定术语，指系统级修改，译为“微调”并保留英文，以区分于常规的软件插件。
- **Mediation**：在 Openflows 语境下指知识条目生成过程中的中介机制，译为“中介”以强调人工与工具之间的协作关系。