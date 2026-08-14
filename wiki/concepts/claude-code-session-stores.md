---
type: concept
tags: [claude-code, workspace, transcripts, disk-usage]
created: 2026-08-13
updated: 2026-08-13
sources: [2026-08-13-claude-projects-inventory]
related: [context-recovery, handshake-skill]
disambiguates: ""
archived: ""
superseded_by: ""
---

# Claude Code Session Stores

Claude Code writes every session's transcript into `~/.claude/projects/<slug>/`, where
`<slug>` is the working directory path with separators replaced by dashes.

`C:\Users\conne`        → `C--Users-conne`
`C:\Windows\System32`   → `C--Windows-system32`
`C:\Users\conne\.claude` → `C--Users-conne--claude`

Each store holds one `<session-uuid>.jsonl` per session, and sometimes a `memory/`
directory.

## Why it matters

**These stores sit in the same directory as real project folders**, with nothing in the
name or structure marking the difference. Anything that enumerates
`~/.claude/projects/*` gets a mix of auto-generated caches and genuine codebases.

**They are the only local record of past Claude Code sessions.** Unlike Claude Desktop
and claude.ai — whose conversations live server-side — these `.jsonl` files are on disk
and greppable. That makes them the go-to source when reconstructing prior work.

**They grow without bound.** As of 2026-08-13: `C--Windows-system32` at 39 MB from just
2 sessions, `C--Users-conne` at 14 MB across 9. Nothing prunes them.

## Gotcha: inherited git remotes

`~/.claude` is itself a git repo (`RudraMind/claude-lab`). Running `git remote get-url
origin` inside any session store walks *up* and returns claude-lab, implying a repo that
does not exist at that level. Always test for a local `.git` first:

```bash
[ -e "$dir/.git" ] && git -C "$dir" remote get-url origin
```

In the 2026-08-13 inventory this false positive affected 14 of 18 folders.

## Related

- [[context-recovery]] — what you do when a session's context is gone
- [[handshake-skill]] — the deliberate alternative to scraping transcripts

## Sources

- [[wiki/sources/2026-08-13-claude-projects-inventory]]
