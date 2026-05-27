---
type: source
tags: [chrome-web-store, chrome-extension, publishing, privacy-policy, github-pages, icons]
created: 2026-05-26
updated: 2026-05-26
sources: []
related: [claude-code-chrome, chrome-web-store-submission, rudramind]
disambiguates: ""
archived: ""
superseded_by: ""
---

# Chrome Web Store Submission — Claude Code Workspace v1.0.0

**Type:** session-handshake
**Date:** 2026-05-26
**Original:** `~/.claude/skills/handshake/backups/handshake_2026-05-26_002205.md`

## Summary

Full Chrome Web Store preparation and submission: README rewrite, privacy.md with GitHub Pages Jekyll frontmatter, new icons (Anthropic ✳ orange + teal `>_`), 3-agent code review catching 5 issues, screenshot prep, store listing filled, submitted for review. All blockers cleared.

## Key Claims

1. `storage` + `tabs` permissions over-declared — unused permissions trigger CWS policy violation; `storage` was never called, `tabs` not required for `chrome.tabs.create()`
2. Privacy policy must use Jekyll frontmatter (`layout: default`, `title:`) for GitHub Pages to render as HTML at `/privacy` — bare `.md` without frontmatter returns raw markdown
3. CWS requires verified publisher contact email before "Submit for review" button activates
4. NMH justification accepted: "used solely to communicate with locally-installed companion that spawns Claude Code CLI in PTY on user's machine — no data leaves machine"
5. Icon: Anthropic ✳ snowflake (orange `#D47356`) + `>_` (teal `#4EC9B0`) on dark separator background — generated via PowerShell System.Drawing
6. Screenshot: full-image letterbox scale at 1280×800 (shows both panels) — preferred over cropping to single panel
7. Remote code = No: xterm.js bundled locally, MV3 CSP compliant

## Notable Quotes

> "One step away from submit — just verify the email at aiforrudraraju@gmail.com in Chrome Web Store Settings and hit the button."

## Entities Mentioned

- [[claude-code-chrome]]
- [[rudramind]]

## Concepts Introduced

- [[chrome-web-store-submission]] — CWS submission process, permissions policy, privacy requirements

## Submission Checklist (All Complete)

| Item | Status |
|------|--------|
| Unused permissions removed (`storage`, `tabs`) | ✓ |
| README with correct install steps + Windows commands | ✓ |
| privacy.md with Jekyll frontmatter, GitHub Pages live | ✓ |
| Icon: Anthropic ✳ + `>_` at 128/48/16px | ✓ |
| Screenshot: 1280×800, both panels visible, toolbar cleaned | ✓ |
| Store listing: description, category, language, icon, screenshot | ✓ |
| Privacy tab: single purpose, permission justifications, No remote code, 3 certifications, privacy URL | ✓ |
| Publisher contact email verified | ✓ |
| Submitted for review | ✓ 2026-05-27 |

## Files Modified

- `README.md` — rewrite with correct install flow, Windows PowerShell log command, PTY package name
- `privacy.md` — Jekyll frontmatter added; session.json disclosure (PTY output may contain secrets)
- `claudecode-workspace/manifest.json` — removed `storage` + `tabs` permissions
- `claudecode-workspace/icons/icon-{128,48,16}.png` — new icons (orange ✳ + teal `>_`)
- `claude-code-chrome-v1.0.0.zip` — submission zip at repo root
- `screenshot-store-1280x800.png` — store screenshot

## Contradictions Flagged

_None_
