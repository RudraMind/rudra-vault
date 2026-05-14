---
type: source
tags: [github-pages, git, install-scripts, rudramind, claude-code]
created: 2026-05-14
updated: 2026-05-14
sources: []
related: [handshake-skill, github-pages-install-hub, claude-handshake-project, rudramind-pages-hub]
disambiguates: ""
archived: ""
superseded_by: ""
---

# RudraMind GitHub Pages — Install Hub Runbook

**Type:** note (internal operational doc)
**Date:** 2026-05-14
**Original:** `~/.claude/docs/GIT/rudramind-pages-runbook.md`

## Summary

Operational runbook for the RudraMind GitHub Pages install hub (`rudramind.github.io`). Documents the two-repo architecture (skill repos + Pages hub), the full build process, daily git workflows, and a complete new skill creation checklist. Built and tested live during session on 2026-05-14.

## Key Claims

1. Two repo types: skill repos (code, SKILL.md, install.sh, README) and one install hub (`rudramind.github.io`) that routes clean install URLs to each skill repo.
2. Clean install URL pattern: `curl -fsSL https://rudramind.github.io/<toolname> | bash` — Pages hub serves a redirect script; no raw.githubusercontent.com exposed to users.
3. Option 2 (redirect) preferred over Option 1 (mirror): the Pages hub file calls the skill repo's install.sh dynamically — single source of truth, no sync required.
4. `set -euo pipefail` required in ALL install scripts (both Pages hub route files AND skill repo install.sh). `set -e` alone misses undefined variable errors and pipe failures.
5. `raw.githubusercontent.com` URLs do NOT redirect after a GitHub username rename — only `github.com/*` gets 301 redirects. Raw URLs must be updated immediately.
6. GitHub Pages requires public repo (free tier). Private = curl 404.
7. `gh` CLI is not in bash PATH on Windows — full path required: `/c/Program Files/GitHub CLI/gh.exe`.
8. `.gitattributes` with `eol=lf` is mandatory on Windows to prevent CRLF breaking scripts on Linux/Mac installers.
9. Skill repos use `master` branch; Pages hub uses `main` branch (GitHub default).
10. Pages URL (`rudramind.github.io/X`) is terminal-only — never browsed directly. The skill repo README is the marketing/discovery page.

## Notable Quotes

> "Never confuse them — skill repos hold code, Pages hub holds routing only."

> "Option 2 (redirect) over Option 1 (mirror) for beginners. One source of truth per tool."

> "raw.githubusercontent.com never redirects after username rename."

## Entities Mentioned

- [[RudraMind]] (GitHub account — Raj)
- [[claude-handshake-project]]
- [[rudramind-pages-hub]]

## Concepts Introduced

- [[github-pages-install-hub]]
- [[redirect-vs-mirror-install-pattern]]
- [[set-euo-pipefail]]
- [[crlf-lf-windows-git]]

## Contradictions Flagged

_None_
