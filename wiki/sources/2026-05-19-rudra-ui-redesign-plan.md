---
type: source
tags: [node.js, terminal, browser, ui, redesign, xterm, split-pane, rudra]
created: 2026-05-19
updated: 2026-05-19
sources: []
related: [claude-web-terminal, xterm-js, node-pty]
disambiguates: ""
archived: ""
superseded_by: ""
---

# RUDRA UI Redesign — Implementation Plan

**Type:** note
**Date:** 2026-05-19
**Original:** `C:\Users\conne\.claude\projects\claudecli-web\docs\superpowers\plans\2026-05-19-rudra-ui-redesign.md`

## Summary

10-phase implementation plan for the RUDRA UI redesign of claude-web-terminal. Full rewrite of `index.html`, `styles.css`, and `app.js` only — server.js never touched. Adds product identity (RUDRA brand), split-pane view with draggable divider, dropdown menus, status bar, tab rename, About panel, and keyboard shortcuts. Tech: vanilla JS ES6 classes, xterm.js v5.3.0 CDN, JetBrains Mono font.

## Key Claims

1. Three managers: `Tab` (per-terminal state + WS), `TabManager` (lifecycle), `SplitManager` (split-pane layout + drag).
2. Split pane: min 20%, max 80% via ratio clamping; divider drag uses `mousemove`/`mouseup` on `document`.
3. Tab rename via `dblclick` → inline `<input>` → commit on Enter/blur, cancel on Escape. DOM methods only — never `innerHTML` with user input.
4. All special characters use HTML entities in markup to avoid encoding issues.
5. Dropdown closes on outside click or Escape — NOT on mouseleave.
6. `fitAddon.fit()` only in `requestAnimationFrame` after container is `display:block`.
7. `terminal.dispose()` on every tab close to prevent xterm memory leak.
8. `ws.readyState === WebSocket.OPEN` checked before every `ws.send()`.
9. Split mode guard in `activateTab()`: don't hide panes if split is active.
10. Boot: auto-creates one Claude Code tab (`tabManager.createTab('claude')`).

## Notable Quotes

> "CRITICAL: Do NOT modify `server.js` or `package.json`. Ever."

> "Security note: Tab names are user-controlled (rename feature). ALL tab DOM construction uses explicit `document.createElement` + `textContent` — never `innerHTML` with tab names."

## Entities Mentioned

- [[claude-web-terminal]]
- [[RudraMind]]

## Concepts Introduced

- [[split-pane-terminal]]
- [[xterm-js]]
- [[tab-rename-pattern]]

## Contradictions Flagged

_None_
