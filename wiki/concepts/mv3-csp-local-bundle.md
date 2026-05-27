---
type: concept
tags: [chrome-extension, mv3, csp, security, bundling, xterm-js]
created: 2026-05-27
updated: 2026-05-27
sources: [2026-05-22-chrome-extension-spikes, 2026-05-22-claude-code-workspace-production-build]
related: [xterm-js, claude-code-chrome, native-messaging-host]
disambiguates: ""
archived: ""
superseded_by: ""
---

# MV3 CSP Local Bundle Pattern

Chrome Manifest V3 enforces `Content-Security-Policy: script-src 'self'` — CDN-hosted scripts are blocked. Any extension using a third-party JS library must bundle it locally.

## The Problem

```html
<!-- BREAKS in MV3 — CSP blocks this -->
<script src="https://cdn.jsdelivr.net/npm/xterm@5.3.0/lib/xterm.min.js"></script>
```

Chrome refuses to load the script. Silent failure in some contexts; console error in others.

## The Fix

Download the library and commit to the extension directory:

```
claudecode-workspace/
  lib/
    xterm.min.js
    xterm.min.css
    xterm-addon-fit.min.js
```

Reference locally:
```html
<script src="../lib/xterm.min.js"></script>
<link rel="stylesheet" href="../lib/xterm.min.css">
```

## Download Command

```bash
node -e "
const https = require('https');
const fs = require('fs');
const files = [
  ['https://cdn.jsdelivr.net/npm/xterm@5.3.0/lib/xterm.min.js', 'lib/xterm.min.js'],
  // ...
];
files.forEach(([url, dest]) => {
  https.get(url, r => r.pipe(fs.createWriteStream(dest)));
});
"
```

## Affected Libraries (Common)

- `xterm.js` + addons (fit, search, web-links)
- Any analytics, utility, or UI framework library

## Used In

- [[claude-code-chrome]] — bundles xterm.js + fit addon locally
- [[claude-web-terminal]] — loads from jsDelivr (no MV3 restriction for web apps)
