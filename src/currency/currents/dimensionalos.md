---
layout: layouts/currency-item.njk
title: "DimensionalOS"
date: 2026-03-07
currencyType: "current"
currencyId: dimensionalos
abstract: "An open-source agentic robotics framework that connects LLM agents directly to robot control primitives through a skills-based ROS2 architecture."
tags:
  - currency
permalink: /currency/currents/dimensionalos/
links:
  - id: embodied-ai-governance
    relation: "is a founding signal for the physical-world deployment governance loop represented by"
  - id: inspectable-agent-operations
    relation: "extends software agent orchestration principles into physical control systems, raising the stakes addressed by"
lastReviewed: 2026-03-15
---

### Signal

[DimensionalOS](https://dimensionalos.com/) (DimOS) is an open-source framework for commanding physical robots in natural language, wiring LLM agents to sensor data, navigation, and actuator control through a reactive, skills-based layer built on ROS2.

### Context

Most robotics stacks treat intelligence and control as separate subsystems. DimOS integrates them through a skill architecture that gives agents direct access to robot capabilities — camera streams, lidar, locomotion — while managing real-time data flow with reactive stream processing (RxPY). The framework targets generalist robots and has demonstrated integration with the Unitree Go2 quadruped.

### Relevance

For Openflows, this is a meaningful signal in the physical extension of agentic systems. As language models gain direct access to actuators in the world, the inspectability and governance questions that apply to software agents become urgent in new ways — with physical consequences that software rollback cannot undo.

### Current State

Active open-source development. Framework and robotics-specific integration (dimos-unitree) both publicly available on GitHub.

### Open Questions

- What operator oversight patterns are appropriate when agents control physical systems in real-time?
- How should skill boundaries be defined to preserve human intervention opportunities without breaking reactive control loops?
- What accountability structures apply when an agentic robotics system causes physical harm or unintended action?

### Connections

- Linked to `embodied-ai-governance` as a founding current for the physical-world AI deployment governance loop.
- Linked to `inspectable-agent-operations` as a physical extension of software agent orchestration principles where the governance stakes are higher.
