---
type: concept
tags: [claude-code, automation, token-management, hooks]
created: 2026-05-12
updated: 2026-05-12
sources: [[2026-05-12-context-monitor]]
related: [[context-recovery]], [[handshake-skill]], [[context-window]]
disambiguates: ""
archived: ""
superseded_by: ""
---

# Context Monitor

Auto-warning system that tracks Claude Code session context window usage and alerts when approaching token limits.

## Overview

Fires on every UserPromptSubmit hook. Reads current context % from statusline's temp file (`ctx_pct`). Compares against three thresholds and warns once per session at each level.

## Thresholds

- **60%** — first warning (yellow) — time to consider saving state
- **65%** — escalation (orange) — context getting tight
- **70%** — critical (red) — urgent to save before compaction

## Implementation

**Architecture:**
1. Statusline writes context % to `~/.claude/docs/context-monitor/ctx_pct`
2. UserPromptSubmit hook reads file, evaluates thresholds
3. State file `ctx_warned.json` tracks which thresholds have fired
4. Output goes to chat as system-reminder

**Files:**
- `~/.claude/hooks/context-monitor.js` — hook logic
- `~/.claude/statusline-command.sh` line 10 — writes ctx_pct
- `~/.claude/settings.json` > hooks.UserPromptSubmit — registration
- `~/.claude/docs/context-monitor/` — state storage

## Why Thresholds Reset at 55%

Assumes new session started. Clears warning flags to re-alert if limits approach again.

## Integration with Handshake

Warnings always include reminder: "Run /handshake to save state — excellent context brain usage when you resume."

Handshake snapshots current session context → next session can be `/handshake upload`-restored with full prior context intact.

## See Also

- [[context-recovery]] — full handshake protocol
- [[handshake-skill]] — session snapshot/restore tool
- [[context-window]] — token limits in Claude models
