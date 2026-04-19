---
layout: layouts/currency-item.njk
title: "video-use: LLM-Driven Video Editing Skill"
date: 2026-04-19
currencyType: current
currencyId: video-use
tags: [currency, video-editing, llm-agent, claude-code, automation]
permalink: /currency/currents/video-use/
abstract: "An open-source Claude Code skill for automated video editing via transcript analysis and structured visual composites. Removes filler words, applies color grading, and manages rendering pipelines without frame-dumping."
---

# video-use

**video-use** is an open-source CLI skill for Claude Code that enables programmatic video editing through natural language interaction. It functions as an infrastructure layer for media production, translating high-level editing directives into FFmpeg operations via structured data pipelines rather than direct visual processing. The project operates on the principle that LLMs should reason over text representations of media (transcripts, timelines) rather than consuming high-token visual inputs like raw frames.

## Technical Architecture

The core innovation lies in the abstraction of video data into a text-first format. Instead of processing video frames directly, `video-use` constructs a `takes_packed.md` file containing word-level timestamps, speaker diarization, and audio events sourced from ElevenLabs Scribe. This reduces the token footprint significantly compared to naive frame-dumping strategies.

The system employs a two-layer reading model:
1.  **Primary Layer (Audio Transcript):** Always loaded. Provides word-level precision for cut decisions, filler word detection, and silence gap analysis.
2.  **Secondary Layer (Visual Composite):** On-demand generation. `timeline_view` creates filmstrip + waveform + word label PNGs only at decision points (e.g., ambiguous pauses, retake comparisons).

This architecture minimizes latency and token costs while maintaining word-boundary precision. The LLM reasons over the 12KB text representation rather than processing thousands of frames.

## Operational Pipeline

The editing workflow follows a deterministic sequence designed for safety and reproducibility:

1.  **Transcribe:** Sources are processed via ElevenLabs Scribe for word-level metadata.
2.  **Pack:** Metadata is consolidated into `takes_packed.md`.
3.  **LLM Reasons:** The agent proposes an editing strategy based on the transcript.
4.  **EDL (Edit Decision List):** A structured plan is generated for execution.
5.  **Render:** FFmpeg chains execute color grading, subtitle burning, and cuts.
6.  **Self-Eval:** The rendered output is analyzed at cut boundaries using `timeline_view` to catch visual jumps or audio pops.

If the self-evaluation fails, the system attempts a fix and re-render (max 3 attempts) before presenting the preview. Session memory is persisted in `project.md`, allowing for iterative workflows across sessions.

## Capabilities and Constraints

The tool supports specific production tasks without requiring manual intervention:
- **Filler Removal:** Automatic detection and removal of `umm`, `uh`, and false starts.
- **Audio Processing:** 30ms audio fades applied at every cut to prevent pops.
- **Visuals:** Auto color grading (warm cinematic, neutral punch, or custom FFmpeg chains).
- **Overlays:** Subtitles burned in customizable styles; animation overlays generated via Manim, Remotion, or PIL via parallel sub-agents.

**Constraints:**
- Requires local installation of Python, `ffmpeg`, and `yt-dlp`.
- Dependent on ElevenLabs API for transcription.
- LLM does not "watch" video; it relies on the accuracy of the transcript and generated composites.

## Linkage Check

- **Repository:** https://github.com/browser-use/video-use
- **Dependencies:** Python 3.10+, FFmpeg, ElevenLabs API.
- **Integration:** Symlinked to `~/.claude/skills/` for Claude Code access.
- **License:** Open Source (verify specific license in repo root).
- **Status:** Active development; requires manual verification of API key costs and transcription accuracy on source material.

## Mediation

```yaml
mediation:
  tooling: "OpenRouter / claude-3-5-sonnet"
  use: ["research synthesis", "entry drafting"]
  humanRole: "queued for review"
  limits: "sourced from public documentation; verify claims before promotion"