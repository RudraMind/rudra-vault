---
type: source
tags: [chrome-extension, nmh, pty, build-spec, reference, windows]
created: 2026-05-23
updated: 2026-05-23
sources: []
related: [claude-code-chrome, native-messaging-host, node-pty, chrome-sw-per-panel-routing]
disambiguates: ""
archived: ""
superseded_by: ""
---

# Build Spec: Chrome Extension with NMH + PTY Terminal

**Type:** note
**Date:** 2026-05-23
**Original:** `raw/articles/2026-05-23-chrome-extension-nmh-pty-build-spec.md`

## Summary

Canonical reusable spec for building any Chrome MV3 extension that runs a CLI tool in a PTY terminal via Native Messaging Host. Derived from [[claude-code-chrome]] MVP v1. Structured as top-to-bottom agent instructions with pre-build checklists, required code patterns, and platform quirks reference.

## Key Claims

1. **Pre-build checklist eliminates all known runtime failure modes** — covers NMH framing, PTY quirks, security hooks, manifest gotchas, and SW routing before any code is written.
2. **NMH requires `.bat` launcher on Windows** — Chrome NMH on Windows requires a batch file entry point; `.js` files cannot be the NMH host directly.
3. **SW per-panel routing pattern is the canonical fix for multi-panel corruption** — track `sessionId → portId` map + `lastRequester` per request type; only broadcast connection state events.
4. **Chunk PTY output at 100KB raw** — 6× JSON encoding headroom keeps messages under 1MB NMH limit.
5. **xterm.js `fitAddon.fit()` requires `requestAnimationFrame`** — layout must settle before measuring terminal dimensions; calling fit() synchronously after open() measures wrong dimensions.
6. **Resize needs 100ms debounce** — ResizeObserver fires on every pixel; debounce prevents PTY resize flood.
7. **Parallel multi-agent pre-ship review checklist** — covers 8 categories: NMH framing, PTY spawning, SW routing, panel state machine, error paths, security, manifest, UX.

## Notable Quotes

> "Run a parallel multi-agent code review covering these areas before first launch... Cost: ~15 min. Saving: hours of debugging."

## Entities Mentioned

- [[claude-code-chrome]]
- [[native-messaging-host]]
- [[node-pty]]

## Concepts Introduced

- [[chrome-sw-per-panel-routing]]
- [[pty-killed-flag-pattern]]
- [[native-messaging-host]]

## Contradictions Flagged

_None_
