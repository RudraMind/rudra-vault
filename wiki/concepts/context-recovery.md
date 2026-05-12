---
type: concept
tags: [claude-code, session-management, workflow, continuity]
created: 2026-05-12
updated: 2026-05-12
sources: [[2026-05-12-context-monitor]]
related: [[handshake-skill]], [[context-monitor]], [[session-state]]
disambiguates: ""
archived: ""
superseded_by: ""
---

# Context Recovery (ROT)

Recovery-of-thought protocol. Saves session state before context compaction, then restores full context in next session.

## The Pattern

Three-step workflow:

1. **`/handshake`** — SAVE mode. Captures current session state (decisions, errors, pending tasks, voice note) to `~/.claude/handshake.md`
2. **`/clear`** — Clear session. Wipes conversation history, resets context window to ~0%
3. **`/handshake upload`** — LOAD mode. Restores saved state from handshake.md into new session context

## Why It Matters

- **No context waste** — captures only essential state, not entire 200K token dump
- **Continuity preserved** — next session knows what was tried, decisions made, blockers hit
- **Brain usage excellent** — focused restoration vs. re-reading full history
- **Explicit over implicit** — you decide what's worth saving, not auto-memory blur

## State Captured

- Session topic
- What was run (commands, tools)
- Successes / Failures
- Active errors (unresolved blockers)
- Decisions made (what was decided, why, rejected alternatives)
- Pending tasks (priority ordered)
- Next steps (immediate, actionable)
- Voice note (casual message from past-you to future-you)
- Risks / unknowns

## Integration with Context Monitor

When [[context-monitor]] hits 70%, warning says:
> "Run /handshake to save state — excellent context brain usage when you resume."

Triggers the ROT cycle before compaction becomes necessary.

## See Also

- [[handshake-skill]] — the tool implementing this
- [[context-monitor]] — auto-triggers awareness of limits
