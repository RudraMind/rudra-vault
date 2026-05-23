---
type: concept
tags: [node.js, terminal, pty, windows, conpty, native-module]
created: 2026-05-19
updated: 2026-05-23
sources: [2026-05-19-claude-web-terminal-design, 2026-05-23-claude-code-chrome-post-mortem]
related: [websocket-pty-bridge, xterm-js, claude-web-terminal, claude-code-chrome, pty-killed-flag-pattern]
disambiguates: ""
archived: ""
superseded_by: ""
---

# node-pty

Node.js native module that spawns real pseudo-terminal (PTY) processes — mandatory for interactive CLI tools in the browser.

## Explanation

`child_process.spawn` creates pipes, not a PTY. Programs needing TTY features (ANSI colors, cursor movement, readline, Ctrl+C handling, tab-completion) break completely with pipes. `node-pty` creates a real PTY using OS primitives: ConPTY on Windows 10 1809+, `/dev/ptmx` on Linux/macOS. Requires a C++ compiler to build its native `.node` module at install time.

## Key Principles

- No substitute: any app using arrow keys, colors, or Ctrl+C requires a real PTY
- Windows: needs Visual Studio Build Tools 2022 with "Desktop development with C++" for `npm install`
- Linux: `build-essential` + `python3`; macOS: Xcode Command Line Tools
- Node.js ≥ 18.x required for node-pty@1.x
- On process death, PTY must be explicitly killed — `ptyProcess.kill()` on WebSocket close

## Windows: `.cmd` Wrapper Problem

`pty.spawn('claude')` fails on Windows — `CreateProcess` cannot execute `.cmd` npm wrappers. Solution:

```js
const spawnFile = os.platform() === 'win32' ? 'cmd.exe' : claudePath;
const spawnArgs = os.platform() === 'win32' ? ['/c', claudePath] : [];
pty.spawn(spawnFile, spawnArgs, { ... });
```

Route through `cmd.exe /c` to let the shell resolve `.cmd` launchers.

## Prebuilt vs Build-from-Source

`@homebridge/node-pty-prebuilt-multiarch` — no C++ compiler needed; downloads prebuilt `.node` binaries. **Gotcha:** `npm install --ignore-scripts` skips the binary download. Must run `npm run install` in the package subdirectory manually after.

## Examples

- [[claude-web-terminal]] — uses node-pty as sole PTY provider; explicitly rejects `child_process`
- [[claude-code-chrome]] — uses `@homebridge/node-pty-prebuilt-multiarch` + `cmd.exe /c` on Windows

## Connections

- Pairs with [[websocket-pty-bridge]] to stream bytes to browser
- Browser renders output via [[xterm-js]]

## Sources

- [[wiki/sources/2026-05-19-claude-web-terminal-design]]
