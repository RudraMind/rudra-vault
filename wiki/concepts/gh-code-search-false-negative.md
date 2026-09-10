---
type: concept
tags: [gh-cli, github, search, tooling, verification]
created: 2026-09-09
updated: 2026-09-09
sources: [2026-09-09-repo-inventory-and-gh-tooling-audit]
related: [rudramind]
disambiguates: ""
archived: ""
superseded_by: ""
---

# gh Code Search False Negative

`gh search code` returns 0 hits for terms that are demonstrably present in
RudraMind's own repos, so it can never be used to prove absence there.

## Explanation

GitHub's code search runs off a separate index from the repo contents. Repos that
were never indexed answer every query with 0 rather than an error, so the call
looks like a clean negative. Global code search works fine, which makes the
failure easy to miss — the tool is obviously alive, it just cannot see these
repos.

## Key Principles

- **Always run a positive control before recording a negative.** Search for a
  term you know is present. If the control returns 0, the negative is worthless.
- A silent 0 from a search API is not evidence of absence. An error would be
  honest; 0 is not.
- Substitutes that were verified working on these repos:
  - **Filenames:** `gh api repos/<repo>/git/trees/<branch>?recursive=1 --jq '.tree[].path'`
    — check `.truncated` is `false`, otherwise coverage is partial.
  - **Commit messages:** `gh search commits <term> --owner <owner>`.
  - **File contents:** `git clone --depth 1` then `grep -ri`.
  - An empty repo returns HTTP 409 `Git Repository is empty` from the tree API —
    that is a valid "nothing here", not a failure.

## Examples

Measured 2026-09-09 in [[2026-09-09-repo-inventory-and-gh-tooling-audit]]:

```
gh search code "node-pty" --limit 3                            -> 3 hits (other repos)
gh search code "xterm"  --repo RudraMind/claude-code-chrome     -> 0 hits
gh search code "manifest" --repo RudraMind/claude-code-chrome   -> 0 hits
gh api -X GET search/code -f q="xterm repo:RudraMind/claude-code-chrome" --jq .total_count
                                                                -> 0
```

`xterm.js` is bundled in `claude-code-chrome` — see [[xterm-js]] and
[[mv3-csp-local-bundle]]. The term is certainly in those files.

Controls that passed, and are therefore usable:

```
gh search commits fix --owner RudraMind       -> 3 hits
gh search repos handshake --owner RudraMind   -> 1 hit
```

## Connections

- Relates to [[rudramind]] — the account whose repos are unindexed
- Applies to any absence claim made about [[claude-code-chrome]],
  [[claude-web-terminal]], [[minime]] or the other owned repos

## Historical

_None._

## Sources

- [[wiki/sources/2026-09-09-repo-inventory-and-gh-tooling-audit]]
