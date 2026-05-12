---
type: source
tags: [claude-code, tooling, session-management]
created: 2026-05-12
updated: 2026-05-12
sources: []
related: [wiki/concepts/handshake-skill.md]
disambiguates: ""
archived: ""
superseded_by: ""
---

# Handshake Skill (SKILL.md)

**Type:** note
**Date:** 2026-05-12
**Original:** `C:\Users\conne\.claude\skills\handshake\SKILL.md`

## Summary

The handshake skill is a two-mode session snapshot tool for [[claude-code]]. SAVE mode (`/handshake`) captures full session state into `~/.claude/handshake.md` in ≤250 lines. LOAD mode (`/handshake upload`) restores that state into a new session, enabling continuity across `/clear` or session restarts.

## Key Claims

1. Two modes: no argument = SAVE, argument `upload` = LOAD
2. SAVE captures 18 data categories: commands run, successes, failures, active errors, files modified, decisions, current state, user profile, skills, MCP references, crons, feedback, errors resolved, unanswered question, voice note, pending tasks, next steps, risks
3. Hard cap of 250 lines; prune order protects Next Steps, Active Errors, Pending Tasks, Voice Note, Unanswered Question — these are never cut
4. Archives previous handshake to `~/.claude/backups/handshakes/` before overwriting
5. Voice note is mandatory: one casual first-person sentence from past-you to future-you, no AI-isms
6. LOAD mode waits for user confirmation before taking any action after restore

## Notable Quotes

> "Voice note — one casual sentence from past-you to future-you. First person, human tone. No 'I noticed', 'It appears', 'Looks like'. Write like texting yourself."

## Entities Mentioned

- [[claude-code]]

## Concepts Introduced

- [[handshake-skill]]
- [[session-continuity]]
- [[voice-note]]

## Contradictions Flagged

_None_
