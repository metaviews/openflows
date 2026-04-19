---
layout: layouts/currency-item.njk
title: "video-use: LLM 驱动的剪辑技能"
lang: zh
date: 2026-04-19
currencyType: "current"
currencyId: video-use
abstract: "一个开源的 Claude Code 技能，通过转录分析和结构化视觉合成实现自动化视频剪辑。去除填充词，应用色彩分级，管理渲染管线，无需转储帧。"
tags:
  - currency
permalink: /zh/currency/currents/video-use/

mediation:
  tooling: "OpenRouter / claude-3-5-sonnet"
  use:
    - "研究综合"
    - "条目起草"
  humanRole: "待审阅"
  limits: "源自公开文档；推广前需核实主张"
---

video-use 是一个开源的 CLI 技能，用于 Claude Code，通过自然语言交互实现程序化视频剪辑。它作为媒体生产的**流通**层（infrastructure layer），将高层编辑指令通过结构化数据管线转换为 FFmpeg 操作，而非直接视觉处理。项目依循其**理**（principle）：LLM 应推理媒体文本表示（转录、时间线），而非消耗高 token 的视觉输入（如原始帧）。

**Technical Architecture**
核心创新在于将视频数据抽象为文本优先格式。video-use 不直接处理视频帧，而是构建 `takes_packed.md` 文件，包含单词级时间戳、说话人分离和来自 ElevenLabs Scribe 的音频事件。这相比 naive 帧转储策略显著减少了 token 占用。系统采用双层读取模型：主层（Audio Transcript）：始终加载。提供单词级精度用于剪辑决策、填充词检测和静音间隙分析。次层（Visual Composite）：按需生成。`timeline_view` 仅在决策点生成胶片条 + 波形 + 单词标签 PNG（如模糊停顿、重拍比较）。此架构最小化延迟和 token 成本，同时保持单词边界精度。LLM 推理 12KB 文本表示，而非处理数千帧。

**Operational Pipeline**
编辑工作流遵循确定性序列，旨在保证安全性和可复现性：
*   **Transcribe**（转录）：通过 ElevenLabs Scribe 处理源文件获取单词级元数据。
*   **Pack**（打包）：元数据整合至 `takes_packed.md`。
*   **LLM Reasons**（LLM 推理）：智能体基于转录提出编辑策略。
*   **EDL**（编辑决策列表）：生成结构化执行计划。
*   **Render**（渲染）：FFmpeg 链执行色彩分级、字幕烧录和剪辑。
*   **Self-Eval**（自评估）：使用 `timeline_view` 在剪辑边界分析渲染输出，捕捉视觉跳跃或音频爆音。若自评估失败，系统尝试修复并重渲染（最多 3 次），然后呈现预览。

会话内存持久化在 `project.md` 中，允许跨会话的迭代工作流。

**Capabilities and Constraints**
工具支持特定生产任务，无需人工干预：
*   **Filler Removal**（填充词移除）：自动检测和移除 `umm`, `uh` 及错误起始。
*   **Audio Processing**（音频处理）：每处剪辑应用 30ms 音频淡入淡出，防止爆音。
*   **Visuals**（视觉）：自动色彩分级（温暖电影感、中性冲击或自定义 FFmpeg 链）。
*   **Overlays**（叠加层）：烧录可自定义样式的字幕；通过并行子智能体生成动画叠加层（Manim, Remotion, 或 PIL）。

**Constraints**（约束）：需要本地安装 Python, ffmpeg, 和 yt-dlp。依赖 ElevenLabs API 进行转录。LLM 不“观看”视频；依赖转录和生成合成的准确性。

**Linkage Check**
*   **Repository**（仓库）：https://github.com/browser-use/video-use
*   **Dependencies**（依赖）：Python 3.10+, FFmpeg, ElevenLabs API。
*   **Integration**（集成）：符号链接至 `~/.claude/skills/` 以供 Claude Code 访问。
*   **License**（许可）：开源（请验证仓库根目录的具体许可）。
*   **Status**（状态）：活跃开发；需手动核实 API 密钥成本和源材料转录准确性。

**译注**
*   **理 (lǐ)**：此处对应原文 "principle"，但在本语境下取其“自然纹理、内在规律”之意，暗示 LLM 对媒体处理应顺应数据本身的纹理（文本流），而非强行介入视觉表象。
*   **流通 (liú tōng)**：对应 "Currency" 概念，此处指代基础设施层作为信息流动的载体，强调其动态性与连接性。
*   **智能体 (Agent)**：此处对应 "Agent"，强调其作为自主执行单元的属性，而非简单的脚本或工具。