---
type: source
tags: [electron, windows, desktop-app, pixel-art, sprite-sheets, rudramind, minime]
created: 2026-09-07
updated: 2026-09-07
sources: []
related: [minime, sprite-sheet-masking, semantic-animation-mapping, rudramind]
disambiguates: ""
archived: ""
superseded_by: ""
---

# MiniMe — Electron Desktop Companion, Build to Ship

**Type:** note (session capture)
**Date:** 2026-09-07
**Original:** `raw/articles/2026-09-07-minime-electron-companion.md`

## Summary

Capture of the build of **MiniMe**, a pixel-art Electron desktop companion for Windows
that free-roams the screen and nudges the user to stretch and drink water. Built from a
spec (`PIXELPAL-BUILD-PLAN.md`, originally "PixelPal"), shipped public at
[[rudramind]]/MiniMe with an NSIS installer and CI, then extended from one character to
five. Source material is the project's own 366-line `HANDSHAKE.md` written 2026-09-03,
with every structural claim re-verified against git, the working tree and the GitHub API
on 2026-09-07.

## Key Claims

1. Repo `RudraMind/MiniMe` is PUBLIC, created 2026-08-27T06:26:43Z, last pushed
   2026-09-03T08:05:35Z. Local path `C:\Users\conne\Downloads\AI\Innovation\MiniMe\pixelpal`
   — the folder is still named `pixelpal`, the product is MiniMe.
2. Releases: v1.0.0 (2026-08-27), v1.1.0 (2026-09-03, Latest). No `v1.2.0` tag exists as
   of 2026-09-07, so **the published installer ships Raj only while the README advertises
   five characters**.
3. HEAD is `0a9651a` "Fix backwards walking, add the dog's idle play"; the tree is clean
   except a modified `.gitignore` that adds `HANDSHAKE.md`.
4. 3,684 lines of first-party JS across 14 files. Largest: `main.js` 938, `state.js` 620,
   `tools/slice-character.js` 425.
5. Runtime dependency is `electron-store` alone. `sharp` and `to-ico` are
   **optionalDependencies**, deliberately, so a failed native build cannot block install.
6. Art is committed to the repo (`pal` 32 files, `boy`/`girl`/`dog` 13 each, `hanu` 10,
   `house` 4, `props` 1) — no postinstall slicing, so installing needs no native toolchain.
7. The central design rule: `state.js` emits SEMANTIC animation names
   (`idle/walk/run/stretch/drink/sit/wave/play/lie`) and each character maps them onto
   whatever art it owns, falling back to `idle`. This is why a 9-frame character and a
   31-frame character both work unchanged. See [[semantic-animation-mapping]].
8. `state.js` is kept free of Electron imports so behaviour is testable in plain node.
9. Sprite masking by raw colour distance punched holes through the characters; border
   flood-fill plus morphological closing at radius 2 fixed it. Tolerance constants do
   **not** transfer between sheets — measured 20 (dark navy), 25 (house), 10 (white
   backgrounds). See [[sprite-sheet-masking]].
10. The dog's paws could not be separated from its drop shadow by colour at all — fur
    shading and shadow occupy the same brightness and saturation range. Only a geometric
    rule worked: a shadow lies below all linework in its column, a paw sits above its own
    bottom outline.
11. `sharp`'s `.flop()` is a **silent no-op when applied after `.composite()`** onto a
    created canvas — no error, plausible-looking output. Caught only by watching the
    output md5 fail to change.
12. Characters walked backwards because the renderer assumed every sheet faced right.
    Raj, Hanu, Boy and Girl are drawn facing left; the dog faces right. Fixed with
    `nativeFacing` per character, verified present in `renderer/animations.js`.
13. The companion "flash-ran" at roughly 1400 px/sec because `walkSpeed` was calibrated
    as px-per-tick but applied as px-per-ms. Fixed with `REFERENCE_TICK_MS = 16`
    (`state.js:26`, applied at `state.js:231`).
14. A 60-minute stretch reminder and a 45-minute water reminder collide every 180 minutes
    of uptime — their LCM, so guaranteed rather than rare. One reminder was silently
    overwritten; a one-slot queue now holds it. A third collision is still dropped.
15. Dragging the house wrote to `electron-store` on every mousemove: measured 1.5ms per
    synchronous write, ~270 writes per 3-second drag, ≈408ms of blocking I/O on the same
    thread as the 16ms tick. Fixed by holding position in memory and persisting on drop.
16. `electron-builder` cannot unpack its own `winCodeSign` archive on Windows without
    Developer Mode, because the archive contains macOS `.dylib` symlinks.
    `CSC_IDENTITY_AUTO_DISCOVERY=false` does not help — `rcedit` lives in the same
    archive. Worked around by pre-extracting the cache with `-xr!darwin`. Not an issue in CI.
17. `build.files` listed `assets/*.ico`, which never matches `tray.png`, so the packaged
    app omitted its own tray icon and would have failed its asset check on launch —
    invisible when running from source, caught with `npx asar list`.
18. Hover tracking is skipped during a drag, so `hovering` stayed true after the cursor
    moved away and the window swallowed every click on screen. Harmless while the window
    was a 140px strip, catastrophic once free-roam made it full-screen.
19. Verification performed before shipping: fresh clone → `npm ci` → run → `npm run dist`
     → install → launch; the published installer downloaded, silently installed and
    launched; `app.asar` contents inspected; all 7 README images returning HTTP 200;
    16-minute state-machine soaks per character.
20. Motion has only ever been judged from stills — whether the dog's trot and bone-play
    read correctly in movement is still unverified.

## Notable Quotes

> "The art pipeline was the brutal part and it fought me for hours across four different
> masking strategies. If you touch the slicer again: re-run the magenta/red/green
> composite test before trusting ANYTHING, and remember sharp's `.flop()` silently does
> nothing after `.composite()`."

> "Masking constants DO NOT transfer between sheets."

## Entities Mentioned

- [[rudramind]]

## Concepts Introduced

- [[sprite-sheet-masking]]
- [[semantic-animation-mapping]]
- [[electron-transparent-click-through-window]] (stub)
- [[electron-builder-windows-symlink]] (stub)
- [[body-doubling]] (stub)

## Contradictions Flagged

The GitHub repo description still reads "walks your screen edge", which the free-roam 2D
rewrite superseded. Recorded on [[minime]]; no existing wiki page carried the old claim,
so nothing in the vault needed correcting.
