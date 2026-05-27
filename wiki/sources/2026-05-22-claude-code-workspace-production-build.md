---
type: source
tags: [chrome-extension, nmh, pty, claude-code, build, windows, bugs]
created: 2026-05-22
updated: 2026-05-22
sources: []
related: [claude-code-chrome, native-messaging-host, node-pty, xterm-js]
disambiguates: ""
archived: ""
superseded_by: ""
---

# Claude Code Workspace — Production Build (17 Files, 11 Critical Bugs Fixed)

**Type:** session-handshake
**Date:** 2026-05-22
**Original:** `~/.claude/skills/handshake/backups/handshake_2026-05-23_034731.md`

## Summary

Full production build of Claude Code Workspace from BUILD_PRODUCTION_FINAL.md spec — 17 files written. 4-agent parallel code review caught 11 critical bugs before first test. PTY binary verified, NMH registered, extension loaded in Chrome. Companion detects Claude, folder picker confirmed working.

## Key Claims

1. `npm install --ignore-scripts` skips prebuilt binary download for `@homebridge/node-pty-prebuilt-multiarch` — must run `npm run install` manually in package subdir after
2. Security hook blocked shell-based `child_process` calls — file-based spawning used throughout (safer AND compliant)
3. `cmd.exe /c <claudePath>` required on Windows — `CreateProcess` cannot exec `.cmd` npm wrappers directly; ANSI colors + PTY dimensions preserved through cmd.exe layer (confirmed working)
4. `killed` flag on ClaudeBridge prevents `onExit` race — async PTY exit fires after `sessions.delete`, would delete newly created session without the flag
5. NMH 100KB chunk limit (reduced from 512KB) — worst-case JSON 6× expansion makes 512KB → 3MB, over 1MB hard limit
6. `handle()` not `_route()` in restart setTimeout — errors become sent messages, not uncaughtException
7. `panel_ready` must always be sent even if `initTerminal()` throws — companion buffers forever without it
8. `launching` guard prevents double-click spawning two orphaned PTY sessions
9. `requestAnimationFrame` for `fitAddon.fit()` — layout must settle before measuring terminal dimensions
10. `sessionId` filter on output/session_ended prevents multi-panel crosstalk
11. `detected || {}` guard — missing detected field in `folder_picked` crashes entire message handler

## Notable Quotes

> "Everything is built and all 11 bugs are fixed — just reload the extension in Chrome and hit Launch Claude Code, this should finally work end-to-end."

## Entities Mentioned

- [[claude-code-chrome]]
- [[rudramind]]

## Concepts Introduced

- [[pty-killed-flag-pattern]] — `killed` flag prevents onExit race on intentional kill
- [[chrome-sw-per-panel-routing]] — sessionId filter prevents multi-panel crosstalk

## Files Written (17)

`claudecode-runtime/`: package.json, bin/host.js, bin/host.bat, src/companion.js, src/claude-bridge.js, src/folder-picker.js, src/claude-detector.js, src/session-store.js, scripts/setup.js

`claudecode-workspace/`: manifest.json, service-worker.js, side-panel/panel.html, side-panel/panel.css, side-panel/panel.js, lib/xterm.min.js, lib/xterm.min.css, lib/xterm-addon-fit.min.js

## Contradictions Flagged

_None_
