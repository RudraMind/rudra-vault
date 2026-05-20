---
type: source
tags: [github, open-source, claude-code, handshake, rudramind, git]
created: 2026-05-13
updated: 2026-05-13
sources: []
related: [claude-handshake-project, rudramind-pages-hub, handshake-skill]
disambiguates: ""
archived: ""
superseded_by: ""
---

# claude-handshake v1.0.0 — GitHub Publish Sessions

**Type:** note
**Date:** 2026-05-13
**Original:** `~/.claude/backups/handshakes/handshake_1_Claude-skill-handshake-install-git.md`, `handshake_2_...`, `handshake_3_...`

## Summary

Three sessions covering the full GitHub publish of claude-handshake v1.0.0: repo creation with dynamic path fixes, push + tag + release, and README polish. First-ever public GitHub push for Raj (as rudrafuture, later renamed RudraMind).

## Key Claims

1. All `/c/Users/conne/` hardcoded paths replaced with `$HOME` before publish — dynamic paths required for cross-system install.
2. `gh` CLI not in bash PATH on Windows — must be invoked via full path `/c/Program Files/GitHub CLI/gh.exe`.
3. Branch stays `master` (not renamed to `main`) — renaming breaks downstream raw URLs in curl install commands.
4. `.gitattributes` forces LF on `*.sh` — Windows CRLF breaks bash on Linux/Mac cloners.
5. GitHub strips `style=` attributes from HTML — use emoji (🔴/🟢) instead of `<span style="color:red">`.
6. ASCII diagram preferred over mermaid — user preference, reverted mermaid via `git revert`.
7. install.sh hardened: `set -e` → `set -euo pipefail` before first push.
8. Repo description chosen: `"Context fades. /handshake remembers."` — names tool and explains the problem.

## Notable Quotes

> "Save the vibe before the wipe."

> "Never restart from zero again."

## Entities Mentioned

- [[RudraMind]]
- [[claude-handshake-project]]

## Concepts Introduced

- [[set-euo-pipefail]]
- [[crlf-lf-windows-git]]
- [[redirect-vs-mirror-install-pattern]]

## Contradictions Flagged

_None_
