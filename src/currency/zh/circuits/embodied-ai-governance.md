---
layout: layouts/currency-item.njk
title: "具身 AI 治理回路"
lang: zh
date: 2026-03-07
currencyType: "circuit"
currencyId: embodied-ai-governance
abstract: "面向物理世界运作的 AI 系统的治理回路：协同设计部署、监控、干预与问责，以应对不可逆的实时后果。"
tags:
  - currency
permalink: /zh/currency/circuits/embodied-ai-governance/
links:
  - id: dimensionalos
    relation: "contributes the agentic robotics control architecture signal to"
  - id: rynnbrain
    relation: "contributes the open embodied foundation model stack to"
  - id: viam
    relation: "contributes robotics software infrastructure and fleet operations patterns to"
  - id: openpilot
    relation: "contributes open, safety-critical real-world control practice to"
  - id: inspectable-agent-operations
    relation: "extends general inspectable agent infrastructure into physical-world deployment conditions represented by"
  - id: feedback-circuit
    relation: "depends on observation, incident logging, and revision patterns represented by"
  - id: george-hotz
    relation: "draws on operator-level practice in legible real-world autonomy from"
  - id: eliot-horowitz
    relation: "draws on operator-level practice in integrated robotics software infrastructure from"
mediation:
  tooling: "OpenRouter / qwen/qwen3.5-flash-02-23"
  use:
    - "翻译原始英文条目"
    - "依照音译词汇表保留双语术语"
  humanRole: "审阅、修订并在发布前确认"
  limits: "翻译为起点；语言能力和文化判断须由人工完成"
---

此回路开启于软件智能体治理的假设与物理后果相遇之处。关键在于不可逆性。当软件智能体犯错时，回滚（rollback）往往可行。当物理系统行动有误——机器人错误识别地形，自动驾驶车辆做出车道决策，田间系统施加了错误的干预——后果便真实存在于世界之中，任何修正机制都无法先于后果运行。这种不对称性改变了治理必须完成的任务。它不能依赖在执行后捕获错误。它必须约束执行的方式。数条流（currents）此刻汇聚于此境。DimensionalOS 通过基于 ROS2 的技能架构，将 LLM 智能体直接接线至机器人执行器。RynnBrain 提供面向感知、规划与空间推理的开放具身基础模型（open embodied foundation models）。Viam 提供软件基础设施，连接、编排并观测分布于部署中的机器人硬件。Openpilot 展示了在开源环境下迭代安全关键自主性（safety-critical autonomy）为何种面貌——真实车辆，真实反馈。这些流共同构成了一个新的运作层（operational surface）。语言模型现在可以发布指令给物理系统。规划表征（Planning representations）现在可以在无控环境中驱动运动。集群软件现在可以远程管理并更新具身智能体。每一项能力都是真正有益的。每一项同时也压缩了模型错误与物理结果之间的距离。因此，治理必须被设计进部署层，而非追加于其上。

回路在此通过四项并发承诺而稳定。技能边界是显性的：任何智能体被允许调用的能力，由能力声明限定，而非从通用模型访问中推断。干预路径得到维护：人工接管（human override）必须在行动序列之前、期间及之后都可到达——不仅作为紧急停止，也作为正常运作模式。事件捕获成为常规：意外行为、险肇（near-misses）与环境边界情况均被记录并审查，而非视为孤立的异常。问责分散于设计链条：模型选择、技能授权、部署配置与运作背景均承担责权，不仅仅是最终的执行器指令。

改变的是自主性的图景（frame）。问题不在于物理智能体在一般意义上应拥有多少自主权。问题在于：哪些行动可在无人类审查的情况下安全执行，哪些需要暂停以确认，以及结合当前的可靠性与后果属性，哪些根本不应自动化。随着能力的变化，这种分类必须被重新审视。在 Openflows（开流）体系内，此回路将可审查的智能体运作基础设施扩展至物理部署条件。逻辑是相同的——受治理、可视、可修正——但代价更高，因为静默失败（silent failure）的余地更窄。

回路在此刻闭合：当物理 AI 系统被部署，且其问责几何体（accountability geometry）与其后果轮廓（consequence profile）相匹配之时：在可靠性得到验证之处运行快速，在不可靠之处更为受限，且始终保留成本低于其防范之风险的人工接管。

**译注**
具身 (Embodied) ：在 AI 领域指具备物理载体并能与物理世界交互的 AI（Embodied AI），区别于纯数字领域的语言模型。
流 (Currents) ：此处对应 Openflows 生态中的术语，指汇聚于此议题的技术流、信号或实践流。
回路 (Circuit) ：在此指一种治理的闭环结构或循环机制，暗示反馈与修正，而非单纯的线性流程。
问责几何 (Accountability Geometry) ：原文用几何学隐喻指代问责的结构性与分布形态（如何分配、多大比例、何种形状），而非实际的几何图形。
回路在此刻闭合：遵循 Openflows 翻译规范，以强调此条目作为治理实践闭环在当下语境中的完成状态。