---
type: source
tags: [chrome-web-store, publishing, hooks, claude-code, session-management]
created: 2026-05-27
updated: 2026-05-27
sources: []
related: [claude-code-chrome, chrome-web-store-submission, rudramind]
disambiguates: ""
archived: ""
superseded_by: ""
---

# CWS Publisher Email Correction + Submission Complete + CWS Reminder Hook

**Type:** session-handshake
**Date:** 2026-05-27
**Original:** current session

## Summary

Discovered CLAUDE.md had wrong publisher email (`rajcherryforever@gmail.com`); correct email is `aiforrudraraju@gmail.com`. Verified publisher email in CWS Dashboard, submitted Claude Code Workspace for review, confirmed privacy URL live. Added `SessionStart` hook to remind about CWS review status after 5+ hour login gaps.

## Key Claims

1. Publisher email for Chrome Web Store is `aiforrudraraju@gmail.com` — CLAUDE.md system config had wrong email (`rajcherryforever@gmail.com`)
2. CWS Dashboard → Settings → "Add contact email" is the unlock path for the Submit button
3. Privacy URL `https://rudramind.github.io/claude-code-chrome/privacy` confirmed live and rendering as HTML
4. `SessionStart` hook with 5-hour gap detection: writes timestamp to `~/.claude/hooks/last-login.txt`, outputs `systemMessage` JSON if gap > 5 hours, silent otherwise
5. Screenshot folder convention: `C:\Users\conne\Documents\ShareX\Screenshots\YYYY-MM\` for current month

## Notable Quotes

> "Submitted. Extension is under review. Check aiforrudraraju@gmail.com in 1-7 days."

## Entities Mentioned

- [[claude-code-chrome]]
- [[rudramind]]

## Concepts Introduced

_None_

## Files Created / Modified

- `~/.claude/hooks/cws-reminder.js` — SessionStart hook, 5-hour gap detection, CWS review reminder
- `~/.claude/settings.json` — added `cws-reminder.js` to SessionStart hooks array
- `~/.claude/projects/C--Users-conne--claude/memory/user_profile.md` — corrected email + publisher info
- `~/.claude/projects/C--Users-conne--claude/memory/reference_screenshot_folder.md` — ShareX path convention

## Contradictions Flagged

> ⚠️ CLAUDE.md `userEmail` field contains `rajcherryforever@gmail.com` — contradicts actual publisher email `aiforrudraraju@gmail.com`. Trust this source (user confirmed directly).
