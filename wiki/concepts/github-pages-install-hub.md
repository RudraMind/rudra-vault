---
type: concept
tags: [github-pages, install-scripts, open-source, devtools]
created: 2026-05-14
updated: 2026-05-14
sources: [2026-05-14-rudramind-pages-runbook]
related: [redirect-vs-mirror-install-pattern, claude-handshake-project, rudramind-pages-hub]
disambiguates: ""
archived: ""
superseded_by: ""
---

# GitHub Pages Install Hub

A free static hosting pattern where a GitHub `username.github.io` repo serves as a routing layer for clean install commands, hiding raw repository URLs from end users.

## Explanation

Instead of exposing `raw.githubusercontent.com/username/repo/branch/install.sh` in install commands, a Pages hub repo (`username.github.io`) serves short named files that redirect to the real install scripts. Each tool gets one file (e.g. `handshake`, `keepalive`) in the hub repo root, served at `https://username.github.io/<toolname>`.

The hub contains no skill code — only routing scripts. Skill code lives in dedicated repos.

## Key Principles

- One Pages hub per GitHub account (not per tool)
- Flat files in root — no subfolders, no `.sh` extension
- Each file is a 2-line redirect script (Option 2) pointing to the real install.sh
- Hub uses `main` branch; skill repos use `master` (or their own default)
- Public repo required (GitHub Pages free tier)

## Why It Matters

- **Memorability:** `rudramind.github.io/handshake` vs `raw.githubusercontent.com/RudraMind/claude-handshake/master/install.sh`
- **Resilience to renames:** hub URL never changes even if skill repo moves
- **Extensibility:** add `/install` meta-installer and `/index.html` landing page later
- **Zero cost:** 100% free GitHub infrastructure

## Examples

- [[rudramind-pages-hub]] — RudraMind's implementation
- Pattern used by: Homebrew (`brew.sh`), Rust (`sh.rustup.rs`), Docker (`get.docker.com`)

## Connections

- Implements [[redirect-vs-mirror-install-pattern]]
- Pairs with [[claude-handshake-project]] as first hosted tool
- Relates to [[set-euo-pipefail]] — all route files must use strict error handling

## Sources

- [[wiki/sources/2026-05-14-rudramind-pages-runbook]]
