---
type: concept
tags: [chrome-extension, service-worker, routing, multi-panel, pattern]
created: 2026-05-23
updated: 2026-05-23
sources: [2026-05-23-claude-code-chrome-post-mortem, 2026-05-23-chrome-extension-nmh-pty-build-spec]
related: [native-messaging-host, claude-code-chrome]
disambiguates: ""
archived: ""
superseded_by: ""
---

# Chrome SW Per-Panel Routing

Architectural pattern for Chrome extensions where a service worker manages multiple panel connections (side panel + full-tab views). Prevents multi-panel state corruption by routing companion/backend responses to the specific panel that made the request, instead of broadcasting to all.

## The Problem

Broadcasting all messages to all panels causes:
- Panel B's `pong` hits Panel A → Panel A re-requests workspaces → state machine resets → terminal destroyed
- PTY `output` chunks go to all panels → both xterms write same stream simultaneously → garbled characters
- `claude_missing` from Panel B's session start hits Panel A → Panel A's terminal replaced with error state

## The Pattern

**Track who initiated each request. Route the response back to them only.**

```js
// Routing state in service worker
const sessionOwners     = new Map(); // sessionId → portId
let lastFolderPicker    = null;      // portId
let lastPinger          = null;      // portId
let lastWorkspaceReq    = null;      // portId
let lastSessionStarter  = null;      // portId

// When panel sends a message — record the requester
port.onMessage.addListener((msg) => {
  switch (msg.type) {
    case 'ping':                  lastPinger = id; break;
    case 'get_recent_workspaces': lastWorkspaceReq = id; break;
    case 'pick_folder':           lastFolderPicker = id; break;
    case 'start_session':
      lastSessionStarter = id;
      sessionOwners.set(msg.sessionId, id);
      break;
    case 'restart_session':
      lastSessionStarter = id;
      sessionOwners.delete(msg.sessionId); // new session coming
      break;
  }
  nativePort.postMessage(msg);
});

// When companion responds — route to requester, not all panels
function routeCompanionMessage(msg) {
  switch (msg.type) {
    case 'output':
    case 'session_ended': {
      const owner = sessionOwners.get(msg.sessionId);
      if (owner) routeToPort(owner, msg);
      if (msg.type === 'session_ended') sessionOwners.delete(msg.sessionId);
      break;
    }
    case 'session_started':
    case 'claude_missing': {
      const owner = (msg.sessionId ? sessionOwners.get(msg.sessionId) : null) || lastSessionStarter;
      if (owner) { if (msg.sessionId) sessionOwners.set(msg.sessionId, owner); routeToPort(owner, msg); }
      else broadcast(msg);
      lastSessionStarter = null;
      break;
    }
    case 'pong':              routeToPort(lastPinger, msg); lastPinger = null; break;
    case 'recent_workspaces': routeToPort(lastWorkspaceReq, msg); lastWorkspaceReq = null; break;
    case 'folder_picked':
    case 'folder_pick_cancelled':
    case 'folder_pick_error': routeToPort(lastFolderPicker, msg); lastFolderPicker = null; break;
    default: broadcast(msg); // companion_ready, companion_disconnected
  }
}
```

## Cleanup on Panel Disconnect

```js
port.onDisconnect.addListener(() => {
  panelPorts.delete(id);
  for (const [sid, oid] of sessionOwners) if (oid === id) sessionOwners.delete(sid);
  if (lastFolderPicker === id)   lastFolderPicker = null;
  if (lastPinger === id)         lastPinger = null;
  if (lastWorkspaceReq === id)   lastWorkspaceReq = null;
  if (lastSessionStarter === id) lastSessionStarter = null;
});
```

## What to Broadcast

Only events every panel must know regardless of who initiated:
- `companion_ready` — connection state
- `companion_disconnected` — connection state
- Any other global event with no specific requester

## Known Limitation

`lastPinger`, `lastWorkspaceReq` etc. are single slots — overwritten if two panels send the same request before the response arrives. In practice this is rare (panels don't initialize simultaneously). A queue-based approach would handle it but adds complexity.

## Used In

- [[claude-code-chrome]] — fixed multi-panel crosstalk bug
