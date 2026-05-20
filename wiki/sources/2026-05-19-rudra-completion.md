---
type: source
tags: [node.js, terminal, browser, pty, xterm, security, open-source, rudra, github]
created: 2026-05-19
updated: 2026-05-19
sources: []
related: [claude-web-terminal, rudramind-pages-hub, security-audit]
disambiguates: ""
archived: ""
superseded_by: ""
---

# RUDRA UI Redesign — Completion + Security Audit

**Type:** note
**Date:** 2026-05-19
**Original:** `~/.claude/backups/handshakes/handshake_3_Claude_web_terminal_GIT commit.md`, `handshake_4_Claude_web_terminal(Git check - rectify).md`

## Summary

RUDRA UI redesign complete and shipped to GitHub (RudraMind/claude-web-terminal, 10 commits). Full rewrite of index.html + styles.css + app.js with Tab/TabManager/SplitManager architecture, security audit found and fixed 4 vulnerabilities, user confirmed working in browser.

## Key Claims

1. `term.onData` must be registered — without it the terminal is read-only; this was a critical missing wire-up caught in code review.
2. WS protocol: server uses `/pty?shell=X` URL query param to select shell, NOT a JSON `{"type":"shell"}` message — spec was wrong, server.js is authoritative.
3. WebSocket connects to `/pty` path only — server returns 404 for all other paths.
4. `__proto__` shell bypass: `!SHELLS[shellKey]` passes prototype keys (`__proto__`, `constructor`) — fixed with `hasOwnProperty`.
5. Resize bounds must be validated: `Number.isInteger` + range (1-1000 cols, 1-500 rows) — unvalidated resize is a crash vector.
6. CDN resources need SRI integrity hashes — 5 CDN resources (xterm, FitAddon, WebLinksAddon, JetBrains Mono) all got `integrity=sha384-...`.
7. Express security headers required: CSP + `X-Frame-Options` + `X-Content-Type-Options` — none present in v1.
8. `target="_blank"` links need `rel="noopener noreferrer"` — tabnabbing vulnerability.
9. Ctrl+Shift+Tab dead branch: outer `if (ctrlKey && shiftKey)` block shadowed inner Tab check — must move inside the block.
10. `fitAddon.fit()` only in `requestAnimationFrame` after container is `display:block` — hidden element returns 0×0.

## Notable Quotes

> "CRITICAL: Do NOT modify `server.js` or `package.json`. Ever."

## Entities Mentioned

- [[RudraMind]]
- [[claude-web-terminal]]

## Concepts Introduced

- [[sri-integrity-hashes]]
- [[csp-express-middleware]]
- [[websocket-pty-bridge]]

## Contradictions Flagged

> ⚠️ Contradicts [[2026-05-19-rudra-ui-redesign-plan]] — plan spec said WebSocket connects to root path `ws://host` with JSON shell selection message. Reality: server only accepts `/pty?shell=X`, selects shell via URL query param at upgrade time.
