---
type: project
tags: [electron, windows, desktop-app, pixel-art, open-source, rudramind, minime]
created: 2026-09-07
updated: 2026-09-07
sources: [2026-09-07-minime-electron-companion]
related: [rudramind, sprite-sheet-masking, semantic-animation-mapping]
disambiguates: ""
archived: ""
superseded_by: ""
---

# MiniMe

**Status:** active
**Started:** 2026-08-27 (repo created)
**Domain:** personal

## Goal

A pixel-art Electron desktop companion for Windows that free-roams the screen, keeps the
user company while working, and nudges them to stretch and drink water.

## Key Facts

- Repo: https://github.com/RudraMind/MiniMe — **PUBLIC**, created 2026-08-27
- Local: `C:\Users\conne\Downloads\AI\Innovation\MiniMe\pixelpal` (folder still named
  `pixelpal`; the product was renamed to MiniMe, and GitHub redirects the old
  `Mini-Assistant` URL)
- Releases: v1.0.0 (2026-08-27), **v1.1.0 (2026-09-03, Latest)**, `MiniMe-Setup-1.1.0.exe`
  ≈83MB via NSIS, built by CI
- HEAD `0a9651a`; only `.gitignore` uncommitted (it adds `HANDSHAKE.md`, which is kept out
  of the public repo)
- 3,684 lines of first-party JS; runtime dependency is `electron-store` alone
- Five characters: Raj (default name Chotu), Hanu, Boy, Girl, Dog
- Also installed locally from the installer at `%LOCALAPPDATA%\Programs\MiniMe`
- Config at `%APPDATA%\mini-me\config.json`

## Architecture

```
main.js               lifecycle, windows, tray, timers, screen geometry,
                      CHARACTERS behaviour metadata, focus-session controller
state.js              state machine — PURE, no Electron imports, testable in node
timers.js             pausable stretch/water schedulers
preload.js            contextBridge IPC allowlist
renderer/chotu.*      the on-screen companion (renamed from pet.*)
renderer/animations.js per-character art tables + nativeFacing
renderer/recolor.js   live HSL outfit recolour (Raj only)
renderer/overlay.*    water-break full-screen overlay
tools/slice-*.js      sprite-sheet slicers
assets/{pal,hanu,boy,girl,dog,house,props}/
```

Behaviour states include `FOLLOWING`, `RESTING`, `WORKING` (focus session),
`BREAK` and `PLAYING` (the dog's bone game).

**Duplication to watch:** flourish sets live in BOTH `main.js` (behaviour) and
`renderer/animations.js` (art), because main is CommonJS and animations.js is an ES
module. Add a character without updating both and the flourish silently falls back to
`idle`.

## Features

Free-roam 2D movement over the whole work area in a full-screen click-through window;
stretch and water reminders with a soft-block overlay; focus sessions on a 25/5 loop with
reminders deliberately paused and a draggable work spot; cursor following at 0.7× speed
that sits after 3s of cursor idle; reaction to the foreground application via a single
long-lived PowerShell helper reading only the process name; draggable companion and house;
live HSL outfit recolour (Raj only); tray restart; per-character naming.

## Decisions — do not re-litigate

- **Free-roam 2D**; the lane-orientation setting was deliberately removed once free roam
  superseded it
- **Art is committed** to the repo — no postinstall slicing, so installing needs no native
  toolchain
- `sharp` and `to-ico` are **optionalDependencies** so a failed native build cannot block
  install
- `state.js` stays **Electron-free** so behaviour is testable in plain node
- Outfit recolour applies to **Raj only** (`recolorable: false` on the rest); pre-baking
  1116 recoloured PNGs was rejected in favour of live per-pixel recolour
- Focus-session reminders are paused deliberately — that is the point of the feature
- The water overlay is a **soft block**: Esc, blur-to-close, never traps the user
- Sizes change by **re-slicing from source**, never by downscaling a sliced PNG
- `HANDSHAKE.md` is gitignored because the repo is public

## Key Concepts

- [[sprite-sheet-masking]]
- [[semantic-animation-mapping]]
- [[electron-transparent-click-through-window]]
- [[electron-builder-windows-symlink]]
- [[body-doubling]]

## Key Entities

- [[rudramind]]

## Open / Next

1. **Tag `v1.2.0`** — the published installer predates Hanu, Boy, Girl and Dog while the
   README advertises five characters. Actively misleading until it ships.
2. Eyeball the motion: walk direction for hanu/boy/girl, the dog's trot, the dog's
   bone-play. Frames, bounds and baselines are objectively verified; movement is not.
3. GitHub repo description still says the companion "walks your screen edge" — stale since
   the free-roam rewrite.
4. README `poses.png` and `outfits.png` still show Raj only.
5. Decide whether to uninstall the verification install at `%LOCALAPPDATA%\Programs\MiniMe`.
6. Unused sliced frames: dog `sleep`/`lie`, kids' `bed` — no flow references them.
7. Candidate next feature: **streaks**. Every reminder is already logged to `history`
   (capped at 500, with `dismissed: "esc"|"timeout"`) and nothing reads it yet.

## Risks

- Renderer console errors are not surfaced to main, so a renderer-only fault could go
  unseen; verification has been main-process logs plus visual checks
- Only one reminder can queue at a time — a third colliding reminder is still dropped
- Multi-monitor untested beyond "does not crash"; primary display only
- Flourish sets duplicated between `main.js` and `renderer/animations.js`

## Progress Log

- 2026-08-27: Repo created, v1.0.0 released
- 2026-09-03: v1.1.0 released with NSIS installer and green CI; four more characters added
  on `main` afterwards (`7656f83`, `08dbc9c`, `0a9651a`) but not yet tagged
- 2026-09-07: Captured into the vault; state re-verified — still no v1.2.0

## Sources

- [[wiki/sources/2026-09-07-minime-electron-companion]]
