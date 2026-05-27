---
type: source
tags: [rudra, claude-web-terminal, ui-design, terminal, search, xterm-js]
created: 2026-05-21
updated: 2026-05-21
sources: []
related: [claude-web-terminal, xterm-js]
disambiguates: ""
archived: ""
superseded_by: ""
---

# RUDRA UI — Shell Indicators, Terminal Search, Clear Button Design

**Type:** session-handshake
**Date:** 2026-05-20 (session) / 2026-05-21 (handshake saved)
**Original:** `~/.claude/skills/handshake/backups/handshake_2026-05-22_205719.md`

## Summary

Full design spec session for 3 new RUDRA features: shell indicator buttons (Claude/CMD), terminal search (Ctrl+F via xterm-addon-search), and a clear button. Spec went through expert review (6 issues found and resolved) before producing a 10-task implementation plan with exact code.

## Key Claims

1. xterm.js keyboard intercept must use `term.attachCustomKeyEventHandler` per Tab instance — `document.addEventListener` fails because xterm captures keyboard when focused, causing Ctrl+F to pass through to PTY (breaks vim/less search)
2. Search re-run on tab switch belongs in `TabManager.activateTab`, not `updateStatusBar` — updateStatusBar fires from too many contexts and would cause false re-runs
3. Shell indicator click behavior: always open NEW tab of that type, consistent with existing Ctrl+Shift-C / Ctrl+Shift+T shortcuts
4. Clear button must be icon-only (`⌫`) — status bar is 28px tall, text label crowds it
5. Active button color must use existing CSS vars (`--accent-claude-bright`, `--accent-cmd`), not hardcoded values

## Notable Quotes

> "Design is done and rock solid — just run the Task 1 curl command to verify the addon version, then it's straight HTML/CSS/JS changes across 3 files, nothing tricky."

## Entities Mentioned

- [[claude-web-terminal]] (RUDRA)
- [[rudramind]]

## Concepts Introduced

- [[xterm-addon-search]] — `@xterm/addon-search@0.13.0`, requires peer dep check vs xterm@5.3.0
- [[xterm-js]] — `attachCustomKeyEventHandler` per-Tab pattern

## Implementation Plan (10 Tasks)

| Task | Description |
|------|-------------|
| 1 | Verify `xterm-addon-search@0.13.0` peer dep + SRI hash |
| 2 | HTML: swap +/split order, add shell-indicators, search-bar, btn-clear, CDN script |
| 3 | CSS: append `.shell-ind`, `#search-bar`, `.status-action-btn` rules |
| 4 | JS: insert module section after splitManager init (line 496) |
| 5 | JS: modify `updateStatusBar` — add `updateShellIndicators` + `btnClear.disabled` |
| 6 | JS: modify `Tab` constructor — SearchAddon null-safe init + `attachCustomKeyEventHandler` |
| 7 | JS: modify `TabManager.activateTab` — search re-run on tab switch |
| 8 | `/code-review` quality gate |
| 9 | `/security-review` quality gate |
| 10 | Smoke test + git commit |

## Contradictions Flagged

_None_
