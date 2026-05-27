---
type: project
tags: [node.js, terminal, browser, pty, claude-code, open-source, rudramind]
created: 2026-05-19
updated: 2026-05-19
sources: [2026-05-19-claude-web-terminal-design, 2026-05-19-rudra-ui-redesign-plan, 2026-05-19-rudra-completion]
related: [claude-handshake-project, rudramind-pages-hub, rudramind]
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

## RUDRA UI Redesign (COMPLETE 2026-05-19)

Full frontend rewrite — `index.html` + `styles.css` + `app.js` (server.js unchanged). 588-line app.js. Pushed to GitHub as 10-commit history, user confirmed working in browser.

Key additions shipped:
- Product identity: `◉ RUDRA` header + About panel
- Split-pane view with draggable divider (min 20%, max 80%) via `SplitManager`
- Status bar: live dot + connection + shell type + tab name + dimensions
- Dropdown menus for new terminal + split actions
- Tab rename (double-click → inline input → Enter to commit)
- JetBrains Mono font (jsDelivr), deep dark color system (`--bg-workspace: #0d0d14`)
- RUDRA_THEME xterm: violet cursor `#a78bfa`, full 16-color palette

Security fixes added post-review:
- CSP + `X-Frame-Options` + `X-Content-Type-Options` headers in Express
- SRI integrity hashes on all 5 CDN resources
- `hasOwnProperty` shell check (was `!SHELLS[shellKey]` — `__proto__` bypass)
- Resize bounds validation: `Number.isInteger` + range check (1-1000 cols, 1-500 rows)

GitHub: https://github.com/RudraMind/claude-web-terminal (master, 10 commits, HEAD 5e4b009)

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

## Planned Features (v2 Backlog)

Shell indicators + terminal search (Ctrl+F) + clear button — 10-task design spec completed 2026-05-21, NOT yet implemented. See [[2026-05-21-rudra-ui-shell-indicators-design]].

Key design decisions pre-made:
- Keyboard intercept: `term.attachCustomKeyEventHandler` per Tab (not `document.addEventListener`)
- Search re-run on tab switch: in `TabManager.activateTab` (not `updateStatusBar`)
- Clear button: icon-only `⌫`, no text label (status bar 28px)

## Progress Log

- 2026-05-19: v1 complete. server.js + 3 frontend files + README. npm start working, both tab types confirmed live.
- 2026-05-19: RUDRA UI redesign spec read, 10-phase rewrite implemented.
- 2026-05-19: RUDRA complete — 588-line app.js, code review + security audit passed, pushed to GitHub (10 commits).
- 2026-05-19: User confirmed RUDRA working in browser. Project complete.
- 2026-05-21: Shell indicators + search + clear feature designed. Spec v2 approved. 10-task plan written. Not yet implemented.
