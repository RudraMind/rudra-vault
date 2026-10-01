---
type: concept
tags: [ai-os, maps, claude-code, memory]
created: 2026-09-30
updated: 2026-09-30
sources: []
related: []
---

# AI OS Map

Layer M of a Claude-Code-native take on Pav Rusovs' MAPS framework (Memory, Agent, Pulse, Screen), built without a VPS.

- **Shape:** one master signpost that holds no facts, one signpost per area (rudra-apps, claude-setup, side-projects). Any file is two hops from the top.
- **Sections per area, fixed order:** Projects, State, Skills, Memory, Routines, Not here.
- **Hybrid upkeep:** hand-written notes plus generated blocks for fast-changing lists (apps, skills, plugins, hooks, side projects).
- **Checker:** a zero-dependency Node script flags broken paths, wrong sections, oversized files, unmapped folders, stale generated blocks and facts listed twice. Runs at session start.
- **Brain export:** the same walk produces a nodes/links graph for the RUDRA//OS brain view (layer S, next).
- **Private by design:** the map itself lives in a private repo; this page is the only public trace.

Rules carried from MAPS: Claude never marks tasks done; append, don't rewrite; deterministic code before model calls; dashboards show, never store; update the signpost when a file moves; archive, never delete; specs live in the repo.
