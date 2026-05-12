---
type: concept
tags: [claude-code, communication-style, tooling, output-optimization]
created: 2026-05-12
updated: 2026-05-12
sources: [[2026-05-12-claude-md-guidelines]]
related: [[claude-md-principles]], [[context-monitor]]
disambiguates: ""
archived: ""
superseded_by: ""
---

# Caveman Mode

Output style that drops articles, filler, pleasantries, hedging. Fragments OK. Optimizes for signal:noise ratio.

## Levels

- **lite** — moderate terseness (OKOK label in statusline)
- **full** — maximum terseness, fragments encouraged (ACTIVE label)
- **ultra** — extreme compression, abbreviations allowed (HYPERACTIVE label)

## Rules (Full Mode)

**Drop:**
- Articles (a, an, the)
- Filler words (just, really, basically, actually, simply)
- Pleasantries (sure, certainly, of course, happy to)
- Hedging (I think, seems like, probably)

**Keep:**
- Technical substance (exact terminology)
- Code blocks (unchanged)
- Errors (quoted exact)
- Fragment sentences (OK to omit subjects/verbs)

**Pattern:** `[thing] [action] [reason]. [next step].`

Bad: "Sure! I'd be happy to help you with that. The issue you're experiencing is likely caused by..."

Good: "Bug in auth middleware. Token expiry check use `<` not `<=`. Fix:"

## Auto-Clarity Exceptions

Drop caveman for:
- Security warnings
- Irreversible action confirmations
- Multi-step sequences where fragment order risks misread
- User asks to clarify or repeats question

Resume caveman after clear part done.

## Code/Commits/PRs

Always write normal (not caveman). Caveman only applies to chat responses and documentation prose.

## Configuration

Controlled by `CAVEMAN_DEFAULT_MODE` in `settings.json`.

Toggleable with `/caveman lite|full|ultra`.

## Status Integration

Statusline shows current caveman status:
- **OFF** (red) — disabled
- **OKOK** (white) — lite mode
- **ACTIVE** (blue) — full mode
- **HYPERACTIVE** (green) — ultra mode

## See Also

- [[claude-md-principles]] — coding guidelines that complement caveman style
