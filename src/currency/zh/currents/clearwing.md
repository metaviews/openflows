---
layout: layouts/currency-item.njk
title: 清翼 (Clearwing)
lang: zh
date: 2026-04-19
currencyType: "current"
currencyId: clearwing
abstract: 基于 LangGraph 构建的自主双模攻防工具，利用可访问的 LLM 进行网络渗透测试与源代码漏洞挖掘。
tags:
  - currency
permalink: /zh/currency/currents/clearwing/

mediation:
  tooling: "OpenRouter / Claude-Opus-4"
  use:
    - "研究综合"
    - "条目起草"
  humanRole: "排队待审"
  limits: "源自公开文档；推广前需核实声明"
---

清翼（Clearwing）是由 Lazarus AI 开发的自主攻防框架，旨在利用广泛可访问的模型端点，复刻先进的漏洞扫描能力。受 Anthropic 的 Glasswing 启发，它充当安全操作的双模基础设施层：网络渗透智能体与源代码狩猎智能体。该系统利用 LangGraph 进行编排，支持复杂的智能体工作流，整合沙箱环境、静态分析工具与动态利用逻辑。

网络渗透模式作为 ReAct 回路智能体运行，配备 63 个绑定工具（bind-tools）。它扫描实时目标、识别服务，并执行沙箱化的 Kali Linux 实用程序。关键的是，利用执行被人类审批护栏（guardrail）所限制，确保操作员对主动测试阶段的控制。输出被持久化至知识图谱，用于纵向追踪。

源代码狩猎模式利用文件并行智能体流水线。它排名源文件，部署单文件狩猎智能体，并利用地址安全器（ASan）与未定义行为安全器（UBSan）的崩溃作为漏洞验证的事实基准（ground truth）。发现结果需经第二轮智能体进行对抗性验证。报告结构强制规定明确的证据等级，从怀疑到补丁已验证（patch_validated），生成与 CI/CD 流水线兼容的 SARIF、Markdown 或 JSON 工件。

技术实现依赖 Python 3.10+，并利用 Rust 工具链构建 genai-pyo3 桥接。Docker 隔离用于 Kali 容器与 sanitizer-image 沙箱。配置通过 `~/.clearwing/config.yaml` 或环境变量管理，支持 OpenAI 兼容端点（OpenRouter、Ollama、vLLM 等）。

链接检查依赖验证：验证 genai-pyo3 Rust 编译与本地工具链版本的一致性（需 `rustup update stable`）。端点兼容性：确认模型提供商支持 LangGraph 智能体所需的功能调用模式（tool-calling schemas）。网络隔离：确保沙箱化 Kali 容器不泄露至主机网络；验证实时扫描目标的防火墙规则。法律范围：确认所有扫描目标均存在书面授权；审计日志必须保留以符合合规要求。

调解
  tooling: "OpenRouter / Claude-Opus-4"
  use:
    - "研究综合"
    - "条目起草"
  humanRole: "排队待审"
  limits: "源自公开文档；推广前需核实声明"

---

**译注**

- **ReAct 回路**：指 Reasoning + Action（推理 + 行动）的循环模式，此处译为“回路”以呼应“Circuit — 回路 (huí lù)"的词汇表定义，强调动作的闭环与反馈。
- **护栏 (guardrail)**：在安全语境下指约束智能体行为的边界机制，此处保留“护栏”意象，亦含“边界”之意。
- **清翼 (Clearwing)**：译为“清翼”取其“透明（Clear）”与“敏捷（Wing）”之意，同时保留英文原名以便检索，符合 Openflows 品牌保留原则。
- **流通与流**：本条目类型为 `current`，对应词汇表中的“流 (liú)"，指代在“流通 (liú tōng)"层中流动的特定信号或能力。
- **智能体 (Agent)**：对应词汇表中的“智能体 (zhì néng tǐ)"，强调其作为具备自主性的实体，而非简单的程序脚本。