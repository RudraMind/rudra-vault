---
type: entity
tags: [github, open-source, identity, rudramind]
created: 2026-05-14
updated: 2026-09-09
sources: [2026-09-09-repo-inventory-and-gh-tooling-audit, 2026-09-07-minime-electron-companion, 2026-06-17-raj-portfolio-deploy, 2026-05-14-rudramind-pages-runbook, 2026-05-13-claude-handshake-github-ship, 2026-05-19-rudra-completion]
related: [claude-handshake-project, rudramind-pages-hub, claude-web-terminal, raj-portfolio, minime, gh-code-search-false-negative]
disambiguates: ""
archived: ""
superseded_by: ""
---

# RudraMind

Personal GitHub account and brand for Raj's open-source AI tooling.

## Overview

GitHub username `RudraMind` (previously `Rudrafuture`, previously `Rudraraju` — migration complete 2026-05-14). Email: rajcherryforever@gmail.com. Git global user.name: `RudraMind`. All published repos and install URLs use this name — never rename again.

`RudraMind` is a **personal user account, not an organisation** — `gh api user` returns `"type":"User"`, id 282997122, created 2026-05-08, and `gh api user/orgs` is empty (verified 2026-09-09).

> ⚠️ Contradicts the pre-2026-09-09 wording of this page — see Historical.

## Key Facts

- GitHub account: https://github.com/RudraMind
- Pages install hub: https://rudramind.github.io (branch: `main`)
- **13 repos** as of 2026-09-09 — 8 public, 5 private, 1,401 tracked files. Full table in [[2026-09-09-repo-inventory-and-gh-tooling-audit]].
- Published repos: `claude-handshake` (master), `claude-web-terminal` (master), `claude-code-chrome` (master), `resume-jd-tailor` (master), `rudra-quartz` (`v5`), `rudra-vault` (master), `rudramind.github.io` (main), `MiniMe` (main — desktop companion, created 2026-08-27, renamed from `Mini-Assistant` between 2026-09-02 and 2026-09-07, GitHub redirects the old URL)
- Private repos: `portfolio` (main — personal site), `Command_Center` (master), `claude-lab` (master), `rudra-suite` (master), `Temp-to-hold` (main — **empty repo**, tree API returns HTTP 409)
- Install command convention: `curl -fsSL https://rudramind.github.io/<tool> | bash`
- Skill repos use `master` branch; Pages hub uses `main` — never mix
- `~/.claude` is itself a working clone of `RudraMind/claude-lab`
- 26 local git clones exist on this machine; only `MiniMe` and `Temp-to-hold` have no local clone
- `gh` **is** on the bash PATH — `which gh` → `/c/Program Files/GitHub CLI/gh` (verified 2026-09-09)
- **`gh auth status` displays the wrong username.** It reports `Rudrafuture`; `gh api user --jq .login` returns `RudraMind`. Root cause: `C:/Users/conne/AppData/Roaming/GitHub CLI/hosts.yml` still carries `user: Rudrafuture` from the 2026-05-14 rename and was never refreshed. The token itself is valid — scopes `gist`, `read:org`, `repo`, `workflow`. Only the cached display name is stale.
- `gh search code` returns false negatives on these repos — see [[gh-code-search-false-negative]]

## Historical

- 2026-05-13: GitHub username was `Rudrafuture` — first public push of claude-handshake
- 2026-05-14: Renamed to `RudraMind` — all URLs updated, 0 old refs in working tree
- 2026-05-14 → 2026-09-09: this page described RudraMind as a "GitHub organization". Superseded 2026-09-09 — `gh api user` reports `type: User` and the account belongs to no orgs.
- 2026-05-14 → 2026-09-09: this page claimed "`gh` CLI not in bash PATH on Windows — use full path `/c/Program Files/GitHub CLI/gh.exe`". Superseded 2026-09-09 — `which gh` resolves and every bare `gh` call in that session succeeded.

## Connections

- Publishes [[claude-handshake-project]]
- Publishes [[claude-web-terminal]]
- Publishes [[claude-code-chrome]]
- Publishes [[raj-portfolio]] (private repo)
- Publishes [[minime]] (public repo)
- Routes installs via [[rudramind-pages-hub]]
- Its repos are unindexed by GitHub code search — [[gh-code-search-false-negative]]

## Sources

- [[wiki/sources/2026-09-09-repo-inventory-and-gh-tooling-audit]]
- [[wiki/sources/2026-09-07-minime-electron-companion]]
- [[wiki/sources/2026-06-17-raj-portfolio-deploy]]
- [[wiki/sources/2026-05-14-rudramind-pages-runbook]]
- [[wiki/sources/2026-05-13-claude-handshake-github-ship]]
- [[wiki/sources/2026-05-19-rudra-completion]]
