---
type: project
tags: [node.js, terminal, browser, pty, claude-code, open-source, rudramind]
created: 2026-05-19
updated: 2026-05-19
sources: []
related: [claude-handshake-project, rudramind-pages-hub]
disambiguates: ""
archived: ""
superseded_by: ""
---

# claude-web-terminal / RUDRA

**Status:** active
**Started:** 2026-05-19
**Domain:** personal / open-source

## Goal

Browser-based real PTY terminal with tab switching — CMD and Claude Code — served from localhost via Node.js.

## What It Is

Locally-hosted Node.js server serving real interactive terminals in the browser. Not emulated — uses `node-pty` (ConPTY on Windows) for actual pseudo-terminal processes. Zero build step: `npm install && npm start`.

## Architecture

- **server.js** — Express + WebSocket (`ws`) + `node-pty` bridge. Binds `127.0.0.1` only. Origin header validated on every WS upgrade. Shell commands from hardcoded `SHELLS` map only (never client input).
- **public/index.html** — HTML shell, loads xterm.js from jsDelivr CDN (no bundler)
- **public/styles.css** — Dark theme UI
- **public/app.js** — `TabManager` + `Tab` classes, xterm wiring, WS client

## Location

`C:\Users\conne\.claude\projects\claudecli-web`

## v1 Status (complete 2026-05-19)

- `npm start` → `http://localhost:3000`
- CMD tab: real shell, dir/arrow keys/Ctrl+C/tab-complete all work
- Claude Code tab: auto-launches `claude` after 500ms, full ANSI rendering
- Tab switching, close, keyboard shortcuts (Ctrl+Shift+T/W, Ctrl+Tab)
- Resize syncs to PTY via JSON messages over WebSocket
- Dead tab shows `[Process exited]` + strikethrough, no auto-reconnect

## RUDRA UI Redesign (pending)

Full frontend rewrite (`index.html` + `styles.css` + `app.js` only — `server.js` unchanged).

Key additions:
- Product identity: `◉ RUDRA` header + About panel
- Split-pane view with draggable divider (min 20%, max 80%)
- Status bar: live dot + connection + shell type + tab name + dimensions
- Dropdown menus for new terminal + split actions
- Tab rename (double-click)
- JetBrains Mono font (jsDelivr), new deep dark color system
- `SplitManager` class, `updateStatusBar()`, `makeTabLabelEditable()`
- RUDRA_THEME xterm: violet cursor `#a78bfa`, full 16-color palette

Spec: `C:\Users\conne\.claude\projects\claudecli-web\design requirement\Extended URL design\ui.md`

## Key Concepts

- [[node-pty]] — real PTY vs child_process pipes
- [[xterm-js]] — browser terminal renderer
- [[websocket-pty-bridge]] — raw byte streaming, no socket.io

## Security Model

| Threat | Mitigation |
|---|---|
| Remote access | Binds `127.0.0.1` only |
| Cross-origin WS | Origin header validated every upgrade |
| Shell injection | `SHELLS` map only, never client input |
| Zombie processes | PTY killed on WS close + SIGINT/SIGTERM |

## Progress Log

- 2026-05-19: v1 complete. server.js + 3 frontend files + README. npm start working, both tab types confirmed live.
- 2026-05-19: RUDRA UI redesign spec read. Next: implement 10-phase rewrite.
