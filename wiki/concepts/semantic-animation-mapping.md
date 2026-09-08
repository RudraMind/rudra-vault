---
type: concept
tags: [architecture, state-machine, animation, pattern, electron]
created: 2026-09-07
updated: 2026-09-07
sources: [2026-09-07-minime-electron-companion]
related: [minime, sprite-sheet-masking]
disambiguates: ""
archived: ""
superseded_by: ""
---

# Semantic Animation Mapping

The behaviour layer emits an animation *meaning* (`walk`, `sit`, `wave`) rather than a
frame list, and each character resolves that meaning against whatever art it actually
owns, falling back to a guaranteed animation.

## Explanation

A state machine that names concrete frames is welded to one character's art. Naming
intent instead decouples them: the state machine says `stretch`, and a character with 31
frames plays a real stretch while a character with 9 frames falls back to `idle`. Adding
a character becomes a data change — a new art table — with no behaviour code touched.

## Key Principles

- **The behaviour layer owns meanings, the art layer owns frames.** In MiniMe the
  vocabulary is `idle/walk/run/stretch/drink/sit/wave/play/lie`.
- **Guarantee one fallback animation.** `idle` must exist for every character, so an
  unmapped meaning degrades instead of throwing.
- **Keep the state machine free of framework imports.** MiniMe's `state.js` has no
  Electron imports at all, so behaviour is drivable and assertable in plain node —
  16-minute soaks per character ran without a window.
- **Per-character orientation is data, not an assumption.** A renderer that assumes every
  sheet faces one way will mirror on travel direction alone and make characters moonwalk.
  MiniMe stores `nativeFacing` per character (`left` for raj/hanu/boy/girl, `right` for
  the dog) and mirrors only when travel disagrees with it.
- **Per-character capability flags belong in the same table** — MiniMe's `recolorable` is
  true for Raj only, so the recolour feature simply does not offer itself elsewhere.

## Failure Modes Seen

- **Duplicated tables.** MiniMe keeps flourish sets in both `main.js` (behaviour, CommonJS)
  and `renderer/animations.js` (art, ES module). Adding a character without updating both
  makes the flourish silently fall back to `idle` — the fallback hides the bug.
- **Undefined lookups become `NaN` timers.** A duration table keyed by animation name
  returned `undefined` for a name outside the original set, so the phase timer was `NaN`
  and the flourish never ended. Default the lookup (`?? FLOURISH_DEFAULT_MS`).
- **Empty sets crash the tick loop.** A weighted pick reading `entries[entries.length-1]`
  on an empty array runs inside a 60fps loop, so it kills the app. Return `null` and let
  the caller skip.
- **Drive the animation off the animation, not the state.** A sit branch guarded by
  `if (state !== RESTING)` could never restore, because the state was already `RESTING`
  with the animation overwritten to `wave`.

## Examples

- [[minime]] — five characters with 9 to 31 frames each, sharing one state machine

## Connections

- Consumes art produced by [[sprite-sheet-masking]]
- Implemented in [[minime]]

## Sources

- [[wiki/sources/2026-09-07-minime-electron-companion]]
