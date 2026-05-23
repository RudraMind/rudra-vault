---
type: concept
tags: [chrome-extension, nmh, ipc, node.js, protocol]
created: 2026-05-23
updated: 2026-05-23
sources: [2026-05-23-claude-code-chrome-post-mortem, 2026-05-23-chrome-extension-nmh-pty-build-spec]
related: [claude-code-chrome, chrome-sw-per-panel-routing]
disambiguates: ""
archived: ""
superseded_by: ""
---

# Native Messaging Host (NMH)

Chrome's IPC mechanism for extensions to communicate with a local native process (Node.js, Python, etc.). The extension's service worker connects via `chrome.runtime.connectNative(hostName)` and exchanges JSON messages with the host process over stdin/stdout.

## Protocol

- **Framing:** 4-byte little-endian length prefix + UTF-8 JSON body
- **Hard limit:** 1MB per message (Chrome enforces; messages over limit are dropped)
- **Direction:** bidirectional — extension → host via stdin, host → extension via stdout
- **Transport:** Chrome launches the host process fresh per connection; host dies when Chrome disconnects stdin

## 1MB Limit Trap

Raw PTY data looks small but JSON encoding adds overhead. Worst-case (backslash/null flood) is ~6× expansion:
- 512KB raw → up to 3MB JSON → **over limit, message dropped silently**
- **Safe chunk limit: 100KB raw** → ~600KB encoded → safely under 1MB

Always chunk PTY output at 100KB raw before sending.

## Windows Requirements

- Host entry point must be a `.bat` file — Chrome NMH on Windows cannot directly launch `.js`
- `.bat` file just calls `node path\to\host.js %*`
- Host registered in: `HKCU\Software\Google\Chrome\NativeMessagingHosts\com.your.host`
- Registry value: path to the NMH manifest JSON file

## NMH Manifest

```json
{
  "name": "com.your.host",
  "description": "...",
  "path": "C:\\path\\to\\host.bat",
  "type": "stdio",
  "allowed_origins": ["chrome-extension://<extension-id>/"]
}
```

## Keeping SW Alive

Use `connectNative()` (Port API) not `sendNativeMessage()` — Port keeps the service worker alive indefinitely. Add a 20s keepalive ping as insurance. Stop keepalive when no panels connected to avoid zombie SW.

## stdout = NMH pipe

**Never `console.log` in host.js** — stdout is the NMH pipe. Use file-based logging (`fs.appendFileSync`).

## Read Loop Pattern

```js
let readBuffer = Buffer.alloc(0);
process.stdin.on('data', (chunk) => {
  readBuffer = Buffer.concat([readBuffer, chunk]);
  while (readBuffer.length >= 4) {
    const msgLen = readBuffer.readUInt32LE(0);
    if (msgLen > 1024 * 1024) { readBuffer = Buffer.alloc(0); return; } // corrupt header guard
    if (readBuffer.length < 4 + msgLen) break; // partial read — wait for more
    const msg = JSON.parse(readBuffer.slice(4, 4 + msgLen));
    readBuffer = readBuffer.slice(4 + msgLen);
    handle(msg);
  }
});
```

Partial reads happen — always buffer and loop until a full message is available.

## Used In

- [[claude-code-chrome]] — NMH bridges Chrome extension ↔ Node.js companion (PTY + folder picker)
