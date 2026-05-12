---
type: concept
tags: [claude-code, tooling, session-management]
created: 2026-05-12
updated: 2026-05-12
sources: [wiki/sources/2026-05-12-handshake-skill.md]
related: [session-continuity, voice-note]
disambiguates: ""
archived: ""
superseded_by: ""
---

# Handshake Skill

A two-mode Claude Code slash command that captures and restores session state across `/clear` or new sessions.

## Explanation

`/handshake` (SAVE) snapshots the full conversation state — what ran, what worked, what failed, decisions made, next steps — into `~/.claude/handshake.md` in ≤250 lines. `/handshake upload` (LOAD) reads that file back into context, presents a structured summary, and waits for confirmation before continuing work. Archives are kept at `~/.claude/backups/handshakes/`.

## Key Principles

- **250-line hard cap** with defined prune order — critical sections (Next Steps, Active Errors, Pending Tasks, Voice Note) are never cut
- **18 data categories** captured per session
- **[[voice-note]]** is mandatory: one casual first-person sentence, no AI-isms — "write like texting yourself"
- **LOAD waits for confirmation** before acting — prevents accidental continuation in wrong state
- **Archive-before-overwrite** — previous handshake always backed up

## Examples

- After complex build session: `/handshake` → `/clear` → new session → `/handshake upload` → continue exactly where left off
- Voice note example: "The auth flow is almost done — just wire up the token refresh and it ships."

## Connections

- Enables [[session-continuity]]
- Designed for [[claude-code]]

## Sources

- [[wiki/sources/2026-05-12-handshake-skill]]
