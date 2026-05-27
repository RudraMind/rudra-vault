---
type: project
tags: [chrome-extension, nmh, pty, claude-code, xterm-js, open-source, rudramind, windows]
created: 2026-05-23
updated: 2026-05-27
sources: [2026-05-22-chrome-extension-spikes, 2026-05-22-claude-code-workspace-production-build, 2026-05-23-claude-code-chrome-post-mortem, 2026-05-23-chrome-extension-nmh-pty-build-spec, 2026-05-26-chrome-web-store-submission, 2026-05-27-cws-publisher-email-fix]
related: [claude-web-terminal, native-messaging-host, node-pty, rudramind, chrome-web-store-submission]
disambiguates: ""
archived: ""
superseded_by: ""
---

# claude-code-chrome

**Status:** MVP v1 submitted to Chrome Web Store 2026-05-27 — pending review
**GitHub:** https://github.com/RudraMind/claude-code-chrome
**Extension ID:** `cjcfkdoemhgfpifpoglefahmllomlldi`

## Goal

Run Claude Code CLI directly inside Chrome — side panel or full tab — with full ANSI terminal rendering, native folder picker, and multi-session support.

## What It Is

Chrome MV3 extension using Native Messaging Host to bridge Chrome ↔ a Node.js companion process that spawns Claude Code CLI in a real PTY. xterm.js renders the Claude Code TUI inside the extension panel with full color support.

**Contrast with [[claude-web-terminal]]:** RUDRA is a localhost WebSocket server (requires `npm start`). claude-code-chrome is a Chrome extension with NMH (no server process; companion is launched on-demand by Chrome).

## Architecture

```
Chrome Extension (MV3)
  ├── service-worker.js     — NMH bridge, per-panel routing, keepalive
  ├── manifest.json         — permissions, NMH host name, side panel
  └── side-panel/
        ├── panel.html      — 6 UI states
        ├── panel.js        — state machine, xterm.js, message handler
        └── panel.css       — VS Code dark theme

Native Messaging Host (Node.js)
  ├── bin/host.js           — NMH entry point, stdin/stdout framing
  ├── bin/host.bat          — Windows launcher (.bat required by Chrome)
  ├── src/companion.js      — message router, all state lives here
  ├── src/claude-bridge.js  — PTY spawner (node-pty), one per session
  ├── src/folder-picker.js  — PowerShell FolderBrowserDialog
  ├── src/claude-detector.js — find claude CLI in PATH + known locations
  └── src/session-store.js  — atomic JSON persistence
```

## Key Technical Decisions

| Decision | Reason |
|----------|--------|
| `@homebridge/node-pty-prebuilt-multiarch` | No node-gyp; prebuilt binaries for all platforms |
| `cmd.exe /c <claudePath>` on Windows | `CreateProcess` can't exec `.cmd` npm wrappers directly |
| 100KB NMH chunk limit | Worst-case JSON encoding is 6×; 100KB → ~600KB encoded → safely under 1MB |
| Per-panel SW routing | Broadcast destroys multi-panel state — route to requesting panel only |
| `killed` flag on ClaudeBridge | Prevents `onExit` race when intentional kill fires async |
| `handle()` not `_route()` in setTimeout | Errors become sent messages, not uncaughtException |
| `panel_ready` always sent | Companion buffers forever if never received |
| 🗑 + `confirm()` for new session | ↺ mistaken for safe refresh; destructive actions need friction |

## MVP v1 Features

- Side panel + full tab view (independent sessions possible)
- Native OS folder picker (PowerShell on Windows, osascript on Mac, zenity/kdialog on Linux)
- Project detection: git, CLAUDE.md, package manager, framework type
- xterm.js terminal: full ANSI/256-color, resize reflow, 5000-line scrollback
- Session persistence: last folder remembered across panel reopens
- Multi-panel safe: two panels in different folders, no crosstalk
- Log rotation at 5MB, atomic session.json writes

## Verified Test Results (2026-05-23)

| Test | Result |
|------|--------|
| Resize (drag + expand) | PASS |
| New Session (🗑 + confirm) | PASS |
| Folder picker → different project | PASS |
| Panel reopen | PASS |
| Two panels simultaneously | PASS — independent sessions, no crosstalk |

## Known MVP Trade-offs (v2 Backlog)

- `appendOutput` on every PTY chunk → high I/O rate (antivirus EPERM risk)
- PTY crash before `panel_ready` → CRASHED state with no output visible
- `pick_folder` (PowerShell) blocks Node.js event loop during dialog
- SW restart disconnects panel (no auto-reconnect)
- `storage` permission declared but unused

## Key Concepts

- [[native-messaging-host]] — NMH protocol, 1MB limit, framing
- [[chrome-sw-per-panel-routing]] — routing pattern fixing multi-panel corruption
- [[node-pty]] — PTY module, Windows cmd.exe workaround
- [[pty-killed-flag-pattern]] — prevents onExit race on intentional kill

## Chrome Web Store

- **Status:** Pending review (submitted 2026-05-27)
- **Publisher:** aiforrudraraju@gmail.com
- **Privacy URL:** https://rudramind.github.io/claude-code-chrome/privacy (live)
- **Rejection prep:** nativeMessaging justification ready — "companion spawns Claude Code CLI in local PTY, no external data"

## Progress Log

- 2026-05-22: Architecture validated via spikes 0/2/3 (folder picker, NMH streaming, xterm.js).
- 2026-05-22: All 17 source files written from spec. 4-agent review caught 11 bugs. PTY binary verified. Extension loaded in Chrome. Companion detects Claude, folder picker works.
- 2026-05-23: Live testing — 4 more bugs found and fixed (multi-panel crosstalk, claude_missing broadcast, ↺ UX). Full audit passed. Committed + pushed to GitHub.
- 2026-05-26: README rewrite, privacy.md + GitHub Pages, new icons (Anthropic ✳ + teal `>_`), removed unused `storage`+`tabs` permissions. 3-agent review. Store listing filled.
- 2026-05-27: Publisher email corrected (aiforrudraraju@gmail.com). Submitted for review. Privacy URL confirmed live.
