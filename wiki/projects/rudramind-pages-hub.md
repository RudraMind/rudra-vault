---
type: project
tags: [github-pages, install-hub, rudramind, open-source]
created: 2026-05-14
updated: 2026-05-14
sources: [2026-05-14-rudramind-pages-runbook]
related: [claude-handshake-project, github-pages-install-hub]
disambiguates: ""
archived: ""
superseded_by: ""
---

# rudramind.github.io (Install Hub)

**Status:** active
**Started:** 2026-05-14
**Domain:** personal / open-source infrastructure
**GitHub:** https://github.com/RudraMind/rudramind.github.io
**Live URL:** https://rudramind.github.io

## Goal

Free GitHub Pages hub that serves clean install URLs for all RudraMind Claude Code skills. Users run one short command instead of a long raw.githubusercontent.com URL.

## Key Concepts

- [[github-pages-install-hub]] — the pattern this implements
- [[redirect-vs-mirror-install-pattern]] — Option 2 (redirect) chosen

## Repo Structure

```
RudraMind/rudramind.github.io/   (branch: main)
├── README.md         ← auto-generated (update when 3+ tools ship)
├── .gitattributes    ← forces LF on all install files
├── handshake         ← redirects to claude-handshake/install.sh  ✅ LIVE
├── keepalive         ← add when claude-keepalive ships
└── install           ← add when 2+ tools ship (meta-installer)
```

## Active Routes

| File | URL | Status |
|------|-----|--------|
| `handshake` | https://rudramind.github.io/handshake | ✅ Live |
| `keepalive` | https://rudramind.github.io/keepalive | ❌ Pending |
| `install` | https://rudramind.github.io/install | ❌ Pending |

## Branch

`main` (GitHub default for Pages hub — do not rename)

## Adding a New Route

1. Create file `<toolname>` (no extension) in repo root:
```bash
#!/usr/bin/env bash
set -euo pipefail
curl -fsSL https://raw.githubusercontent.com/RudraMind/<skill-repo>/master/install.sh | bash
```
2. Add to `.gitattributes`: `<toolname> text eol=lf`
3. Commit + push to main
4. Wait ~1 min, test: `curl -fsSL https://rudramind.github.io/<toolname>`

## Progress Log

- 2026-05-14: Repo created via gh CLI, Pages auto-enabled
- 2026-05-14: `handshake` route added, .gitattributes added
- 2026-05-14: Full end-to-end install verified working

## Sources

- [[wiki/sources/2026-05-14-rudramind-pages-runbook]]
