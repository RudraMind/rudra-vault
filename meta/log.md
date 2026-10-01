# Wiki Log

## [2026-09-30] create | AI OS Map
- Created: [[ai-os-map]] (concept) — overview of the private two-hop signpost map (MAPS layer M) and its checker
- Pages touched: [[ai-os-map]], meta/index.md (new Concepts row, page count 45 → 46)

## [2026-09-09] ingest | Repo Inventory and gh Tooling Audit
- Mode: **capture** — inbox was empty; material gathered live on 2026-09-09 from the
  filesystem, 26 local clones and the GitHub API, then written to
  `raw/inbox/2026-09-09-repo-inventory-and-gh-tooling-audit.md`
- Source: `raw/inbox/2026-09-09-repo-inventory-and-gh-tooling-audit.md` → moved to
  `raw/articles/`
- Origin: a request to "find trinket". Nothing named trinket exists — verified 7 ways
  (profile `find` to depth 6; `git log --all --grep` / `branch -a` / `stash list` over
  26 clones; GitHub tree API across 12 non-empty repos = 1,401 files, `truncated=false`
  on every call; `Temp-to-hold` empty via HTTP 409; `--depth 1` clone + `grep` of MiniMe;
  `gh gist list` = 0 gists; `gh search commits`). The search produced the inventory.
- Created: [[2026-09-09-repo-inventory-and-gh-tooling-audit]] (source),
  [[gh-code-search-false-negative]] (concept)
- Updated: [[rudramind]] — two claims superseded, both moved to `### Historical` with
  dates; new source listed first; repo roster expanded to all 13
- Stubs (not created): none new
- Contradictions:
  - ⚠️ [[rudramind]] said "GitHub organization". `gh api user` → `"type":"User"`,
    id 282997122; `gh api user/orgs` → empty. It is a personal account. Flagged on both
    the entity and the source page.
  - ⚠️ [[rudramind]] said "`gh` CLI not in bash PATH on Windows — use full path".
    `which gh` → `/c/Program Files/GitHub CLI/gh`. Every bare `gh` call succeeded.
- **`gh search code` discarded as evidence.** Its positive control failed: `xterm` in
  `RudraMind/claude-code-chrome` → 0 hits, and `search/code` API `total_count: 0`, while
  global search for `node-pty` works. These repos are not in GitHub's code-search index.
  `gh search repos` and `gh search commits` passed their controls and were kept.
- **New fact, not a vault contradiction:** `gh auth status` reports `Rudrafuture` while
  the API resolves to `RudraMind`. Root cause read from
  `AppData/Roaming/GitHub CLI/hosts.yml` — it still carries `user: Rudrafuture` from the
  2026-05-14 rename. Stale for ~4 months; token itself is valid.
- **Reported, not fixed — `$VAULT/CLAUDE.md` is stale.** All four RUDRA//OS pipeline
  paths it mandates are missing: `Downloads/{vault-graph.js, rudra-os.html, vault.json,
  rudra-vault}`. Canonical copy is now `C:/Users/conne/Rudra/Rudra-OS/` (`vault.json`
  49,232 bytes, mtime 2026-09-07 21:49); a diverged copy sits in `rudra-suite/Rudra-OS/`
  (mtime 2026-08-19, `diff -q` differs on `vault-graph.js` and `rudra-os.html`); the
  stale partial clone is now `Rudra/_archive/rudra-vault-partial-clone`. The doc's claim
  that `rudra-os.html` is "outside any repo… not version controlled" is also false now —
  `rudra-suite` is a clone of `RudraMind/rudra-suite`. Left uncorrected: that file is the
  authoritative rules doc and rewriting it was out of scope for this ingest.
- **Graph regen NOT run, no commit made.** The pipeline trigger is a commit or push; this
  ingest did neither. Regeneration is now due — `Rudra/Rudra-OS/vault.json` (2026-09-07
  21:49) is older than the `.md` files written today. The vault tree also carries
  unrelated in-progress work (` M .githooks/post-commit`, ` M .gitignore`,
  ` M meta/hooks/git-commit.ps1`, `?? .gitattributes`, `?? Welcome.md`), so a blanket
  `git add -A` would sweep it into an ingest commit. Left for the user to call.
- Counts verified against disk after writing: 45 files under `wiki/`, 45 index rows,
  20 files in `wiki/sources/`, `raw/inbox/` empty. Header updated 43/19 → 45/20.
- Pages touched: 3

## [2026-09-07] ingest | MiniMe — Electron Desktop Companion, Build to Ship
- Mode: **capture** — inbox was empty; material gathered from
  `MiniMe/pixelpal/HANDSHAKE.md` (written 2026-09-03) and re-verified against git, the
  working tree and the GitHub API on 2026-09-07, then written to
  `raw/inbox/2026-09-07-minime-electron-companion.md`
- Source: `raw/inbox/2026-09-07-minime-electron-companion.md` → moved to `raw/articles/`
- Created: [[2026-09-07-minime-electron-companion]] (source), [[minime]] (project),
  [[sprite-sheet-masking]] (concept), [[semantic-animation-mapping]] (concept)
- Updated: [[rudramind]] — added `MiniMe` to published repos, added source and relation
- Stubs (not created): [[electron-transparent-click-through-window]],
  [[electron-builder-windows-symlink]], [[body-doubling]]
- Contradictions: none inside the vault. Recorded on [[minime]]: the GitHub repo
  description still says the companion "walks your screen edge", superseded by the
  free-roam 2D rewrite; and the published v1.1.0 installer predates four of the five
  characters the README advertises.
- **Index repair:** [[quartz-v5]] and [[2026-05-28-quartz-vault-publisher-build]] existed
  on disk but had never been added to `meta/index.md` (from the 2026-05-28 ingest). Rows
  added. Header counts corrected to **43 pages / 19 sources**, now matching disk exactly
  (43 files under `wiki/`, 43 index rows, 19 files in `wiki/sources/`). The old header
  read 41/16 and had been drifting since before this ingest.
- Pages touched: 7

## [2026-08-13] ingest | Claude Projects Folder Inventory
- Source: `raw/inbox/2026-08-13-claude-projects-inventory.md` → moved to `raw/articles/`
- Created: [[2026-08-13-claude-projects-inventory]] (source), [[homefinance]] (project), [[claude-code-session-stores]] (concept)
- Updated: [[raj-portfolio]] — added source, logged `Personal_old2` live remote finding; [[claude-code-chrome]] — added source; [[claude-web-terminal]] — added source
- Stubs (not created): [[homepulse]], [[resume-jd-tailor]], [[hermes-agent]], [[rudra-quartz]]
- Contradictions: none
- Pages touched: 6
- **Correction (same day):** initial write used an incomplete survey — `homefinance` and
  `homepulse` sizes were still pending. Corrected totals: footprint **2.45 GB** (not
  1.47 GB); `homefinance` **995 MB / 40%** is the largest folder, ahead of `hermes-agent`
  **781 MB / 31%**; `homepulse` 47 MB. Claim 4 and the summary in
  [[2026-08-13-claude-projects-inventory]] rewritten; [[homefinance]] gained the size fact.
  `raw/articles/2026-08-13-claude-projects-inventory.md` left untouched per Hard Rule 1 —
  it still shows the pre-correction 1.47 GB figure and its own "53%" observation.

## [2026-06-17] ingest | Raj Portfolio — v3 Deploy Prep & Frontend Pass
- Source: `raw/inbox/` (from `Raj-website/Personal/CHANGELOG.md`) → `raw/articles/2026-06-17-raj-portfolio-deploy.md`
- Created: [[raj-portfolio]] (project), [[2026-06-17-raj-portfolio-deploy]] (source)
- Updated: [[rudramind]] — added `portfolio` (private repo), new source + connection
- Stubs (not created): [[cloudflare-pages]]
- Contradictions: none
- Pages touched: 3

## [2026-05-27] ingest | Handshake backups — CWS submission + Chrome extension build sessions
- Sources: 5 new session handshakes from 2026-05-21 through 2026-05-27
- Created sources: [[2026-05-21-rudra-ui-shell-indicators-design]], [[2026-05-22-chrome-extension-spikes]], [[2026-05-22-claude-code-workspace-production-build]], [[2026-05-26-chrome-web-store-submission]], [[2026-05-27-cws-publisher-email-fix]]
- Created concepts: [[xterm-js]] (was stub), [[chrome-web-store-submission]], [[mv3-csp-local-bundle]]
- Updated: [[claude-code-chrome]] — CWS submission status, publisher email, progress log through 2026-05-27
- Updated: [[claude-web-terminal]] — v2 shell indicators plan added
- Contradictions: [[2026-05-27-cws-publisher-email-fix]] flags CLAUDE.md has wrong email (`rajcherryforever@gmail.com`) — correct is `aiforrudraraju@gmail.com`
- Pages touched: 5 sources + 3 concepts created, 2 projects updated, 2 meta = 12

## [2026-05-23] ingest | Claude Code Chrome Extension — Post-Mortem + Build Spec
- Sources: `raw/articles/2026-05-23-claude-code-chrome-post-mortem.md`, `raw/articles/2026-05-23-chrome-extension-nmh-pty-build-spec.md`
- Created: [[claude-code-chrome]], [[native-messaging-host]], [[chrome-sw-per-panel-routing]], [[pty-killed-flag-pattern]], [[2026-05-23-claude-code-chrome-post-mortem]], [[2026-05-23-chrome-extension-nmh-pty-build-spec]]
- Updated: [[node-pty]] — added Windows cmd.exe workaround + prebuilt vs build-from-source section
- Stubs: [[xterm-js]], [[websocket-pty-bridge]] (still pending from prior sessions)
- Contradictions: none
- Pages touched: 6 created + 1 updated + 2 meta = 9

## [2026-05-20] ingest | Handshake backup files — claude-handshake ship + RUDRA completion
- Sources: `~/.claude/backups/handshakes/` — 8 named backup files read and evaluated
- New sources created: [[2026-05-13-claude-handshake-github-ship]], [[2026-05-19-rudra-completion]]
- New entities: [[rudramind]] (was stub [[RudraMind]] in 3 pages — now a full entity page)
- Updated: [[claude-web-terminal]] project — RUDRA status changed from pending → complete, security fixes documented
- Updated: [[claude-handshake-project]] — added [[2026-05-13-claude-handshake-github-ship]] as source
- Updated: meta/index.md — synced to 19 pages (was showing 12, wiki had 15 unindexed)
- Stubs resolved: [[RudraMind]] → rudramind entity page created
- Stubs still pending: [[set-euo-pipefail]], [[redirect-vs-mirror-install-pattern]], [[crlf-lf-windows-git]], [[xterm-js]], [[websocket-pty-bridge]], [[sri-integrity-hashes]]
- Contradictions: [[2026-05-19-rudra-completion]] flags WS protocol mismatch vs [[2026-05-19-rudra-ui-redesign-plan]]
- Pages touched: 3 created + 3 updated + 2 meta = 8

## [2026-05-14] ingest | RudraMind GitHub Pages — Install Hub Runbook
- Source: `~/.claude/docs/GIT/rudramind-pages-runbook.md` → copied to `raw/notes/2026-05-14-rudramind-pages-runbook.md`
- Created: [[2026-05-14-rudramind-pages-runbook]], [[claude-handshake-project]], [[rudramind-pages-hub]], [[github-pages-install-hub]]
- Updated: meta/index.md, meta/log.md
- Stubs: [[redirect-vs-mirror-install-pattern]], [[set-euo-pipefail]], [[crlf-lf-windows-git]], [[RudraMind]]
- Contradictions: none
- Pages touched: 4 created + 2 meta updated = 6
- Notes: Pages hub live at rudramind.github.io. claude-handshake install URL updated to Pages URL. 11 lessons documented.

## [2026-05-12] ingest | Claude Code Config + Context Monitor
- Sources: `raw/inbox/` — context-monitor/, CLAUDE.md, notes.md, settings.json, hooks/, skills/, portfolio-index.html
- Created: [[context-monitor]], [[context-recovery]], [[caveman-mode]], [[2026-05-12-context-monitor]], [[2026-05-12-claude-md-guidelines]]
- Updated: meta/index.md, meta/log.md
- Stubs: [[context-window]], [[session-state]], [[hook-based-automation]], [[claude-md-principles]]
- Contradictions: none
- Pages touched: 8
- Files moved: context-monitor/ → raw/articles/, CLAUDE.md → raw/notes/, notes.md → raw/notes/

## [2026-05-12] ingest | Handshake Skill (SKILL.md)
- Source: `C:\Users\conne\.claude\skills\handshake\SKILL.md` (not from inbox — read directly)
- Created: [[handshake-skill]], [[2026-05-12-handshake-skill]]
- Updated: meta/index.md
- Stubs: [[session-continuity]], [[voice-note]], [[claude-code]]
- Contradictions: none
- Pages touched: 4

## [2026-05-11] init | Wiki initialized
- Structure created. CLAUDE.md loaded at vault root. Index and log initialized.
- Folders: raw/inbox, raw/articles, raw/notes, raw/assets
- Wiki: entities, concepts, projects, sources, queries, personal, archive
- Meta: index.md, log.md, templates/, hooks/
- Git initialized at vault root
