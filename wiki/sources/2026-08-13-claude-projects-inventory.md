---
type: source
tags: [claude-code, workspace, inventory, disk-usage, git]
created: 2026-08-13
updated: 2026-08-13
sources: []
related: [claude-code-session-stores, homefinance, raj-portfolio, claude-code-chrome, claude-web-terminal]
disambiguates: ""
archived: ""
superseded_by: ""
---

# Claude Projects Folder Inventory

**Type:** note
**Date:** 2026-08-13
**Original:** `raw/articles/2026-08-13-claude-projects-inventory.md`

## Summary

Full survey of the 18 folders under `C:\Users\conne\.claude\projects\` — size, file
count, git ownership and last-touched date. The directory turns out to hold two
unrelated kinds of thing: seven auto-generated Claude Code session transcript stores
and eleven real working project directories. Combined footprint ≈ 1.47 GB, of which a
single third-party clone accounts for over half.

## Key Claims

1. **`.claude/projects/` is not a projects folder — it is two folders wearing one coat.**
   Session stores (named by slugified cwd, e.g. `C--Users-conne`) sit beside genuine
   codebases with no naming or structural separation. See [[claude-code-session-stores]].
2. **Only 4 of 18 top-level folders own a `.git`:** `Resume-JD-Tailor`,
   `claudeC-web-chrome`, `claudecli-web`, `hermes-agent`.
3. **Every other folder falsely reports `RudraMind/claude-lab.git`** — `git -C` walks up
   to the parent `~/.claude` repo. Any inventory that trusts `git remote` without
   checking for a local `.git` will mis-attribute 14 folders.
4. **`hermes-agent` is 781 MB / 13,153 files — 53% of the entire footprint** — and is a
   third-party clone of `nousresearch/hermes-agent`, not the user's own work.
5. **Nested repos exist one level down:** `Raj-website/Personal` and
   `Raj-website/Personal_old2` both point at `RudraMind/portfolio.git`;
   `claude-vault/rudra-quartz` points at `RudraMind/rudra-quartz.git`.
6. **`Raj-website` carries three stale iterations** (`Personal_old`, `_old2`, `_old3`),
   and `_old2` still holds a live portfolio.git remote — a second writable copy of the
   deploy source. Corroborates the stale-dirs warning in [[raj-portfolio]].
7. **`Command_Center` is an empty shell** (1 KB). The real Rudra Command Center app
   lives at `Downloads/AI/Innovation/Command center/rudra-command-center`.
8. **`homepulse` is the predecessor of [[homefinance]]** — both still carry the same
   `Monthly_expense_homepulse.csv`.
9. **Session stores grow unbounded.** `C--Windows-system32` reached 39 MB from 2
   sessions; `C--Users-conne` holds 9 transcripts at 14 MB.

## Notable Quotes

> "Every other folder reports `RudraMind/claude-lab.git` — that is inherited from the
> parent `~/.claude` repo walking up, not a repo of its own. Easy false positive."

## Entities Mentioned

- [[rudramind]] — owns 5 of the 6 distinct remotes found
- [[homefinance]]
- [[raj-portfolio]]
- [[claude-code-chrome]]
- [[claude-web-terminal]]
- [[homepulse]]
- [[resume-jd-tailor]]
- [[hermes-agent]]
- [[rudra-quartz]]

## Concepts Introduced

- [[claude-code-session-stores]]

## Contradictions Flagged

_None_
