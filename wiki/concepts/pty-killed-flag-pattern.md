---
type: concept
tags: [pty, node.js, concurrency, pattern]
created: 2026-05-23
updated: 2026-05-23
sources: [2026-05-23-claude-code-chrome-post-mortem, 2026-05-23-chrome-extension-nmh-pty-build-spec]
related: [node-pty, claude-code-chrome, native-messaging-host]
disambiguates: ""
archived: ""
superseded_by: ""
---

# PTY Killed Flag Pattern

A guard on PTY bridge classes that prevents `onExit` from firing after an intentional `kill()` call. Necessary because node-pty's `onExit` fires asynchronously — after `kill()` returns, the process may not have exited yet, so `onExit` fires later.

## The Race Condition

```
restart_session received
  → bridge.kill() called         ← sets sessions.delete(sessionId)
  → new bridge created           ← sessions.set(sessionId, newBridge)
  → old bridge's onExit fires    ← sessions.delete(sessionId) AGAIN
  → new bridge deleted! Session lost.
```

## The Fix

```js
class PTYBridge {
  constructor() {
    this.killed = false;
  }

  kill() {
    this.killed = true;   // mark BEFORE killing
    try { this.process.kill(); } catch (_) {}
    // Windows tree kill
    if (os.platform() === 'win32' && this.process?.pid) {
      try { execFileSync('taskkill', ['/PID', String(this.process.pid), '/T', '/F'], { stdio: 'pipe' }); } catch (_) {}
    }
    this.process = null;
  }
}

// In start():
this.process.onExit(({ exitCode, signal }) => {
  if (this.killed) return;  // intentional kill — do not fire callback
  this.onExit(exitCode, signal);
});
```

## Rule

Set `this.killed = true` **before** calling `process.kill()` — not after. If set after, the async `onExit` can fire in the window between the kill call and the flag being set.

## Used In

- [[claude-code-chrome]] — ClaudeBridge prevents session deletion race on restart
