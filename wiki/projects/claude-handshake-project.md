---
type: project
tags: [claude-code, skill, github, open-source, rudramind]
created: 2026-05-14
updated: 2026-05-14
sources: [2026-05-14-rudramind-pages-runbook, 2026-05-12-handshake-skill]
related: [handshake-skill, rudramind-pages-hub, github-pages-install-hub]
disambiguates: ""
archived: ""
superseded_by: ""
---

# claude-handshake (Project)

**Status:** active
**Started:** 2026-05-13
**Domain:** personal / open-source
**GitHub:** https://github.com/RudraMind/claude-handshake

## Goal

Public Claude Code skill that solves context rot — saves full session state before `/clear`, restores it in a new session via `/handshake upload`.

## Key Entities

- [[RudraMind]] — owner
- [[handshake-skill]] — the skill itself (SKILL.md)

## Key Concepts

- [[github-pages-install-hub]] — install served via rudramind.github.io/handshake
- [[context-recovery]] — the problem this solves
- [[set-euo-pipefail]] — used in install.sh

## Repo Structure

```
RudraMind/claude-handshake/
├── SKILL.md          ← Claude Code skill (the actual product)
├── install.sh        ← copies SKILL.md to ~/.claude/skills/handshake/
├── README.md         ← marketing page + install command
├── LICENSE           ← MIT 2026 RudraMind
└── .gitattributes    ← forces LF on .sh files
```

## Install Command (current)

```bash
curl -fsSL https://rudramind.github.io/handshake | bash
```

## Branch

`master` (not main — do not rename without updating all downstream raw URLs)

## Progress Log

- 2026-05-13: Built locally, all 6 files created, first commit eec3b5f
- 2026-05-13: Pushed to GitHub as Rudrafuture/claude-handshake, v1.0.0 tagged
- 2026-05-13: README polished — comparison table, ASCII diagram, Time Travel feature
- 2026-05-13: Username renamed Rudrafuture → RudraMind, all URLs updated
- 2026-05-14: GitHub Pages install URL live: rudramind.github.io/handshake
- 2026-05-14: install.sh hardened: set -e → set -euo pipefail

## Sources

- [[wiki/sources/2026-05-14-rudramind-pages-runbook]]
- [[wiki/sources/2026-05-12-handshake-skill]]
