---
type: source
tags: [chrome-extension, nmh, pty, claude-code, post-mortem, windows]
created: 2026-05-23
updated: 2026-05-23
sources: []
related: [claude-code-chrome, native-messaging-host, node-pty, claude-web-terminal]
disambiguates: ""
archived: ""
superseded_by: ""
---

# Claude Code Chrome Extension — Post-Mortem MVP v1

**Type:** note
**Date:** 2026-05-23
**Original:** `raw/articles/2026-05-23-claude-code-chrome-post-mortem.md`

## Summary

Full build + test record for [[claude-code-chrome]] — a Chrome MV3 extension that runs Claude Code CLI inside Chrome via Native Messaging Host + node-pty + xterm.js. 11 bugs caught via 4-agent parallel pre-test review before first launch; 4 more found during live testing. All fixed before commit.

## Key Claims

1. **4-agent parallel pre-test review caught 11 bugs before first launch** — zero runtime debugging needed for those issues. Cost: ~15 min. Saving: hours of PTY/NMH failure debugging.
2. **`cmd.exe /c <claudePath>` required on Windows** — `CreateProcess` cannot exec npm `.cmd` wrappers directly; node-pty fails silently or errors without this.
3. **NMH 1MB limit needs 100KB chunk cap** — worst-case JSON encoding is 6× raw size; 512KB raw → up to 3MB encoded → over limit. Use 100KB raw max.
4. **SW broadcast to all panels = state corruption** — Panel B's `pong` hits Panel A, which re-queries workspaces, resetting its state machine. Must route each response to the panel that made the request.
5. **`killed` flag mandatory on ClaudeBridge** — without it, onExit fires after intentional kill and deletes the newly spawned session.
6. **Claude Code security hooks block shell strings and `innerHTML`** — use `execFileSync(cmd, [args])` array form; use `replaceChildren()` not `innerHTML =`.
7. **`--ignore-scripts` breaks `node-pty-prebuilt-multiarch`** — binary download happens in install script; must run `npm run install` in package subdir separately.
8. **Destructive UI requires both icon change AND confirm dialog** — ↺ is read as "safe refresh" by browser users; 🗑 + `confirm()` together create necessary friction.
9. **`panel_ready` must always be sent even if `initTerminal()` throws** — companion buffers all PTY output until it receives `panel_ready`; if never sent, companion buffers forever.
10. **`restart_session` reuses same sessionId** — companion kills old bridge, starts new one with same ID 500ms later; SW routing handles this via `lastSessionStarter` fallback.

## Bugs Fixed

### Pre-Test (11 bugs, 4-agent review)
| # | Bug | Fix |
|---|-----|-----|
| 1 | `conpty.node` missing | `npm run install` in package subdir after `--ignore-scripts` |
| 2 | `tabs` permission missing | Added to manifest.json |
| 3 | `.cmd` spawn fails on Windows | `cmd.exe /c <claudePath>` |
| 4 | `onExit` race after restart | `killed` flag on ClaudeBridge |
| 5 | NMH 1MB breached | 100KB chunk limit |
| 6 | Restart error uncaught | `handle()` not `_route()` in setTimeout |
| 7 | `innerHTML =` blocked | `replaceChildren()` |
| 8 | Shell-based spawning blocked | `execFileSync` array args |
| 9 | Double-spawn on click | `launching` boolean guard |
| 10 | Cross-session output | sessionId filter on output/session_ended |
| 11 | `panel_ready` skipped on throw | try/catch + always send after |
| 12 | Missing `detected` field crash | `msg.detected \|\| {}` guard |

### Live Testing (3 bugs)
| # | Bug | Fix |
|---|-----|-----|
| 13 | Multi-panel crosstalk | Per-panel SW routing (sessionId map + lastRequester per type) |
| 14 | `claude_missing` broadcast destroys other panels | Route to `lastSessionStarter` only |
| 15 | ↺ button UX (no confirm, ambiguous icon) | 🗑 icon + confirm dialog |

## Entities Mentioned

- [[claude-code-chrome]]
- [[rudramind]]
- [[node-pty]]
- [[claude-web-terminal]]

## Concepts Introduced

- [[native-messaging-host]]
- [[chrome-sw-per-panel-routing]]
- [[pty-killed-flag-pattern]]

## Contradictions Flagged

_None_
