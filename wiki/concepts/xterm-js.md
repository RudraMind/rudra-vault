---
type: concept
tags: [terminal, browser, xterm, renderer, ansi, chrome-extension, node.js]
created: 2026-05-27
updated: 2026-05-27
sources: [2026-05-22-chrome-extension-spikes, 2026-05-22-claude-code-workspace-production-build, 2026-05-23-claude-code-chrome-post-mortem]
related: [node-pty, claude-web-terminal, claude-code-chrome, mv3-csp-local-bundle]
disambiguates: ""
archived: ""
superseded_by: ""
---

# xterm.js

Browser terminal emulator library. Renders a full VT100/ANSI terminal in a `<div>` — colors, cursor movement, bold, italics, 256-color, resize, scrollback. Used anywhere you need an interactive terminal in a browser or Electron app.

## Why Needed

`<textarea>` or `<pre>` output breaks on ANSI escape sequences. PTY processes emit raw escape codes — xterm.js interprets them correctly and renders the TUI as it would appear in a native terminal.

## Key API Patterns

```js
// Init
const term = new Terminal({ cursorBlink: true, scrollback: 5000 });
const fitAddon = new FitAddon.FitAddon();
term.loadAddon(fitAddon);
term.open(containerElement);

// CRITICAL: use requestAnimationFrame before fit()
// Layout must settle before measuring dimensions
requestAnimationFrame(() => fitAddon.fit());

// Input → PTY
term.onData(data => send({ type: 'input', data }));

// PTY output → terminal
term.write(chunk);

// Resize
term.onResize(({ cols, rows }) => send({ type: 'resize', cols, rows }));
```

## attachCustomKeyEventHandler (Critical for Ctrl+F)

When building Ctrl+F search, use per-Tab instance handler — NOT `document.addEventListener`:

```js
term.attachCustomKeyEventHandler((e) => {
  if (e.ctrlKey && e.key === 'f') {
    openSearch();
    return false; // prevent PTY receiving Ctrl+F
  }
  return true;
});
```

`document.addEventListener` fails — xterm captures keyboard when focused, so Ctrl+F passes to PTY (breaks vim/less search).

## MV3 Chrome Extension: Bundle Locally

CDN `<script src="https://...">` is blocked by MV3 Content Security Policy (`script-src 'self'`). Must download and bundle:

```
lib/xterm.min.js
lib/xterm.min.css
lib/xterm-addon-fit.min.js
```

See [[mv3-csp-local-bundle]].

## FitAddon Cosmetic Noise on Load

FitAddon fires resize immediately on init → shows `[Resized to 2x1]` artifact in terminal. Suppress by skipping the initial resize event or wrapping in `requestAnimationFrame`.

## Used In

- [[claude-web-terminal]] — loads xterm.js from jsDelivr CDN, `@xterm/xterm@5.3.0`
- [[claude-code-chrome]] — bundles xterm.js locally (MV3 CSP requirement)

