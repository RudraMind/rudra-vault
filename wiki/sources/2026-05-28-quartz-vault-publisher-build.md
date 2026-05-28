---
type: source
tags: [quartz, obsidian, github-pages, github-actions, vault-publishing]
created: 2026-05-28
updated: 2026-05-28
sources: []
related: [quartz-v5, rudra-quartz-publisher, rudramind]
disambiguates: ""
archived: ""
superseded_by: ""
---

# Quartz Vault Publisher — Full Build Session

**Type:** note
**Date:** 2026-05-28
**Original:** `raw/notes/2026-05-28-quartz-vault-publisher-build.md`

## Summary

Built full end-to-end pipeline publishing Obsidian vault to GitHub Pages via Quartz v5. Two-repo architecture: private `rudra-vault` → public `rudra-quartz`. Pipeline triggers automatically on every Claude Code session end (via existing Stop hook). Site live at `rudramind.github.io/rudra-quartz` with 33 wiki pages and graph view.

## Key Claims

1. Two-repo pattern keeps vault private while Quartz site is public: `rudra-vault` (private) triggers `rudra-quartz` (public) via `repository_dispatch` GitHub Actions event.
2. Quartz v5 uses YAML config (`quartz.config.default.yaml`), not TypeScript — `baseUrl` must be set without protocol prefix.
3. Obsidian `[[wikilinks]]` in YAML frontmatter (`sources:`, `related:` fields) are invalid YAML — Quartz v5 build fails without a sanitization step.
4. `rsync -r --include="*/" --include="*.md" --exclude="*"` is required to traverse subdirectories — plain `--include="*.md" --exclude="*"` skips all subdirs.
5. SSH deploy key (read-only, ed25519) is correct mechanism for Quartz runner to clone private vault — key removed from agent (`ssh-add -D`) before npm/build steps to limit exposure window.
6. GitHub Pages `github-pages` environment defaults to `main` branch only — must explicitly add the `v5` branch via API or UI when Quartz branch differs.
7. `git-commit.ps1` Stop hook hardened: explicit `master` branch (not `HEAD`), push errors logged to `meta/push-error.log` (gitignored), no silent failures.
8. Quartz v5 `npx quartz plugin install` must run before `npx quartz build` — plugins fetched from GitHub at install time, cached in `.quartz/plugins/`.
9. `.gitattributes` with `*.yml text eol=lf` mandatory on Windows — workflow YAML files created in editors without CRLF conversion break GitHub Actions parsing.
10. GitHub Actions workflow files must use `.yaml` extension in this repo — `.yml` was not indexed by GitHub Actions runner.

## Entities Mentioned

- [[rudramind]]

## Concepts Introduced

- [[quartz-v5]]
- [[github-actions-cross-repo-dispatch]]

## Contradictions Flagged

_None_
