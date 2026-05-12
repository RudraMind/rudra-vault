---
type: source
tags: [coding-standards, engineering, best-practices, personal-guidelines]
created: 2026-05-12
updated: 2026-05-12
sources: []
related: [claude-md-principles, caveman-mode, surgical-changes]
disambiguates: ""
archived: ""
superseded_by: ""
---

# CLAUDE.md — Personal Coding Guidelines

**Type:** technical standards document
**Date:** 2026-05-12
**Original:** `raw/inbox/CLAUDE.md`

## Summary

Behavioral guidelines for reducing common LLM coding mistakes. Emphasizes caution over speed, simplicity-first approach, surgical changes, goal-driven execution, and self-improvement loops. Includes file reading chunking strategy and notes management.

## Key Claims

1. **Think Before Coding** — surface assumptions, present tradeoffs before implementing
2. **Simplicity First** — minimum code solving problem, no speculative features
3. **Surgical Changes** — touch only what's needed, match existing style, remove only self-created orphans
4. **Goal-Driven Execution** — define success criteria, loop until verified
5. **Plan Mode Default** — use for 3+ step tasks, architecture decisions
6. **Self-Improvement Loop** — after corrections, add to notes.md Lessons section with index
7. **Large Files** — chunk via `wc -l` first, read with offset+limit parameters
8. **Notes Management** — append to `~/.claude/notes.md` with symbol+fragment format, index when >10 entries

## Notable Quotes

> "Minimum code that solves the problem. Nothing speculative."

> "Would a senior engineer say this is overcomplicated? If yes, simplify."

> "Every changed line should trace directly to the user's request."

> "Trust internal code and framework guarantees. Only validate at system boundaries."

## Entities Mentioned

- [[claude-code]] (the IDE these guidelines are for)

## Concepts Introduced

- [[surgical-changes]] — editing without adjacent refactoring
- [[goal-driven-execution]] — verification-based task completion
- [[simplicity-first]] — minimal, non-speculative solutions
- [[self-improvement-loop]] — lessons indexing and pattern recognition
- [[caveman-mode]] — terse output style

## Testing Strategy

- TDD London School preferred
- Tests before implementation
- No error handling for impossible scenarios

## Contradictions Flagged

_None_
