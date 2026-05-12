---
type: source
tags: [claude-code, tooling, context-management, automation]
created: 2026-05-12
updated: 2026-05-12
sources: []
related: [context-monitor, handshake-skill]
disambiguates: ""
archived: ""
superseded_by: ""
---

# Context Monitor System

**Type:** technical documentation
**Date:** 2026-05-12
**Original:** `raw/inbox/context-monitor/README.md`

## Summary

Auto-warning system that fires on UserPromptSubmit hook to alert when Claude Code session context approaches token limits (60%, 65%, 70%). Integrated with handshake protocol for session snapshot/recovery.

## Key Claims

1. Context monitor uses statusline's extracted context % (`context_window.used_percentage` from CC's stdin JSON)
2. Thresholds fire once per session: 60% (warning), 65% (escalation), 70% (critical)
3. Hook reads temp file (`~/.claude/docs/context-monitor/ctx_pct`) written by statusline
4. State tracking prevents duplicate warnings (`ctx_warned.json` stores threshold history)
5. Warnings reset when context drops below 55% (new session detection)
6. Warning output includes reminder to run `/handshake` for "excellent context brain usage on resume"

## Notable Quotes

> "⚠️ Context at ~{PCT}% (threshold {N}%). Run /handshake to save state — excellent context brain usage when you resume."

> "Warnings reset when context drops below 55% (assumed new session)"

## Entities Mentioned

- [[claude-code]] (Claude Code IDE)
- [[context-window]] (token limit tracking)
- [[handshake-skill]] (session save/restore)

## Concepts Introduced

- [[context-monitor]] — auto-warning for token limits
- [[context-recovery]] — handshake-based session management
- [[hook-based-automation]] — UserPromptSubmit hooks in CC
- [[context-pct-tracking]] — real-time context % monitoring

## Integration Points

- **Statusline hook** (`~/.claude/statusline-command.sh` line 10) — writes ctx_pct
- **UserPromptSubmit hook** (`~/.claude/hooks/context-monitor.js`) — reads and evaluates
- **Settings** — hook registered in `settings.json` > `hooks.UserPromptSubmit`
- **State folder** — `~/.claude/docs/context-monitor/` (user preference for non-root .claude)

## Contradictions Flagged

_None_
