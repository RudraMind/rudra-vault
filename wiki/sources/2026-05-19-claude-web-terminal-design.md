---
type: source
tags: [node.js, terminal, browser, pty, xterm, websocket, security, open-source]
created: 2026-05-19
updated: 2026-05-19
sources: []
related: [claude-web-terminal, node-pty, xterm-js, websocket-pty-bridge]
disambiguates: ""
archived: ""
superseded_by: ""
---

# claude-web-terminal — Design & Build Specification

**Type:** note
**Date:** 2026-05-19
**Original:** `C:\Users\conne\.claude\projects\claudecli-web\design.md`

## Summary

Complete unambiguous build blueprint for a localhost Node.js web server that provides real interactive browser terminals. Two shell types: CMD/bash and Claude Code (auto-launches `claude` CLI). Uses `node-pty` for real PTY processes, `ws` for raw WebSocket streaming, and `xterm.js` from CDN — zero build step.

## Key Claims

1. `node-pty` mandatory — `child_process.spawn` creates pipes, not PTY; interactive CLI tools (colors, Ctrl+C, readline) break without real PTY.
2. Bind address hardcoded `127.0.0.1` — never configurable, never `0.0.0.0`.
3. Shell commands only from hardcoded `SHELLS` map — never derived from client input.
4. Origin header validated on every WebSocket upgrade — cross-site JS blocked.
5. PTY must be killed on WS close AND WS must be closed on PTY exit — both sides required.
6. `fitAddon.fit()` only after `display:block` + inside `requestAnimationFrame` — hidden element returns 0×0.
7. WebSocket opened AFTER `terminal.open()` — data arriving before open() is silently dropped.
8. `initCommand` for Claude tab sent after 500ms delay — shell needs init time.
9. Message protocol: raw string = keystroke; starts with `{` = JSON resize — avoids JSON parse overhead on 99% of messages.
10. `socket.io` explicitly rejected — auto-reconnect harmful for dead PTY model; `ws` raw streaming sufficient.

## Notable Quotes

> "Do NOT bind to `0.0.0.0` or `::`. Anyone on the same WiFi can run commands on your machine."

> "If you write `claude\r` immediately, the shell may not have started reading input yet, and the command is lost."

> "`terminal.dispose()` when closing a tab — After 50+ tabs, the browser becomes unresponsive."

## Entities Mentioned

- [[claude-web-terminal]]
- [[RudraMind]]

## Concepts Introduced

- [[node-pty]]
- [[xterm-js]]
- [[websocket-pty-bridge]]
- [[conpty-windows]]

## Contradictions Flagged

_None_
