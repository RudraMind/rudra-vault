---
type: source
tags: [github, gh-cli, inventory, tooling, rudramind]
created: 2026-09-09
updated: 2026-09-09
sources: []
related: [rudramind, gh-code-search-false-negative]
disambiguates: ""
archived: ""
superseded_by: ""
---

# Repo Inventory and gh Tooling Audit

**Type:** capture (session survey)
**Date:** 2026-09-09
**Original:** `raw/articles/2026-09-09-repo-inventory-and-gh-tooling-audit.md`

## Summary

A search for an artefact named "trinket" came back empty across every reachable
surface. The search itself produced a complete GitHub and local-clone inventory,
and exposed three tooling facts worth keeping: `gh search code` silently returns
false negatives on this account's repos, `gh auth status` has displayed the wrong
username since the 2026-05-14 rename, and the vault's own RUDRA//OS pipeline
points at four paths that no longer exist.

## Key Claims

1. **No "trinket" exists.** 0 hits across: profile filesystem to depth 6; `git
   log --all --grep`, `branch -a` and `stash list` over 26 local clones; GitHub
   file trees for all 12 non-empty repos (1,401 tracked files, `truncated=false`
   on every call); a `--depth 1` clone + `grep -ri` of MiniMe; `gh gist list`
   (0 gists); `gh search commits`. Filename and content coverage are both
   complete.
2. **`RudraMind` is a personal user account, not an organisation.** `gh api user`
   returns `"type":"User"`, id 282997122, created 2026-05-08; `gh api user/orgs`
   is empty. ⚠️ Contradicts [[rudramind]].
3. **13 GitHub repos** — 8 public, 5 private, 1,401 tracked files.
   `Temp-to-hold` is an empty repo (tree API returns HTTP 409 `Git Repository is
   empty`).
4. **26 local git clones**: 13 of RudraMind repos (covering 11 distinct repos —
   `portfolio` and `rudra-vault` are each cloned twice), 8 of third-party repos,
   5 with no remote. Only `MiniMe` and `Temp-to-hold` have no local clone.
5. **`~/.claude` is itself a working clone of `RudraMind/claude-lab`.**
6. **`gh search code` cannot prove absence in these repos.** See
   [[gh-code-search-false-negative]].
7. **`gh auth status` shows `Rudrafuture`; the API resolves to `RudraMind`.** Root
   cause: `AppData/Roaming/GitHub CLI/hosts.yml` still carries `user:
   Rudrafuture` from the 2026-05-14 rename. The token is fine; only the cached
   display name is stale, and has been for ~4 months.
8. **`gh` is on the bash PATH** — `which gh` → `/c/Program Files/GitHub CLI/gh`.
   ⚠️ Contradicts [[rudramind]].
9. **All four RUDRA//OS pipeline paths in `$VAULT/CLAUDE.md` are missing.**
   `Downloads/{vault-graph.js, rudra-os.html, vault.json, rudra-vault}` do not
   exist. The canonical copy is `C:/Users/conne/Rudra/Rudra-OS/` (`vault.json`
   49,232 bytes, mtime 2026-09-07 21:49). A second, diverged copy sits in
   `rudra-suite/Rudra-OS/` (mtime 2026-08-19; `diff -q` differs on both
   `vault-graph.js` and `rudra-os.html`). The stale partial clone the doc warns
   about is now at `Rudra/_archive/rudra-vault-partial-clone`. This follows the
   2026-08-19 move of all local apps into `C:\Users\conne\Rudra\`; the vault
   rules doc was never updated.
10. **`rudra-os.html` is now version controlled** — a copy lives inside
    `rudra-suite`, a clone of `RudraMind/rudra-suite`. `$VAULT/CLAUDE.md` states
    it "lives in `Downloads`, outside any repo". No longer true.
11. **`Mini-Assistant` was renamed to `MiniMe`** between 2026-09-02 and
    2026-09-07 — a listing earlier in the same session still showed the old name.

## Repo Inventory

| Repo | Vis | Branch | Last push | Files | Local clone |
|---|---|---|---|---|---|
| claude-code-chrome | public | master | 2026-05-26 | 34 | `.claude/projects/claudeC-web-chrome` |
| claude-handshake | public | master | 2026-09-03 | 6 | `~/claude-handshake` |
| claude-lab | private | master | 2026-05-27 | 44 | `~/.claude` |
| claude-web-terminal | public | master | 2026-05-20 | 12 | `Rudra/claudecli-web` |
| Command_Center | private | master | 2026-06-06 | 20 | `Rudra/rudra-command-center` |
| MiniMe | public | main | 2026-09-03 | 146 | — |
| portfolio | private | main | 2026-06-18 | 31 | `Personal`, `Personal_old2` |
| resume-jd-tailor | public | master | 2026-05-30 | 61 | `Rudra/Resume-JD-Tailor` |
| rudra-quartz | public | v5 | 2026-07-30 | 336 | `Rudra/rudra-quartz` |
| rudra-suite | private | master | 2026-08-25 | 640 | `~/rudra-suite` |
| rudra-vault | public | master | 2026-09-08 | 68 | `docs/Vault/Rudra`, `_archive/…-partial-clone` |
| rudramind.github.io | public | main | 2026-05-14 | 3 | `~/rudramind.github.io` |
| Temp-to-hold | private | main | 2026-05-08 | 0 (empty) | — |

## Method

Windows 11 Pro 10.0.26200, Git Bash, `gh` 2.92.0. Full commands and raw output in
the source file. The load-bearing ones:

```bash
find /c/Users/conne -maxdepth 6 -iname "*trinket*" -not -path "*/node_modules/*"
find /c/Users/conne -maxdepth 5 -type d -name ".git" -not -path "*/node_modules/*"
gh api "user/repos?per_page=100&affiliation=owner,collaborator,organization_member"
gh api "repos/<repo>/git/trees/<default_branch>?recursive=1" --jq '.tree[].path'
gh api user --jq '{login,id,type,name,created_at}'
```

Every negative was checked against a positive control before being recorded.
`gh search repos` and `gh search commits` passed theirs; `gh search code` failed
its own and was discarded as evidence.

## Entities Mentioned

- [[rudramind]]

## Concepts Introduced

- [[gh-code-search-false-negative]]

## Contradictions Flagged

> ⚠️ Contradicts [[rudramind]] — "GitHub organization" (it is a personal user
> account, `type: User`, no orgs) and "`gh` CLI not in bash PATH on Windows"
> (`which gh` resolves).

Also recorded, against `$VAULT/CLAUDE.md` rather than a wiki page: all four
RUDRA//OS pipeline paths are dead, and the "not version controlled" claim for
`rudra-os.html` no longer holds. Not corrected here — see `meta/log.md`.
