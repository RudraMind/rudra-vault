---
type: project
tags: [nextjs, dashboard, household, bills, three-js, personal]
created: 2026-08-13
updated: 2026-08-13
sources: [2026-08-13-claude-projects-inventory]
related: [homepulse, claude-code-session-stores]
disambiguates: ""
archived: ""
superseded_by: ""
---

# HomeFinance

**Status:** active
**Started:** ~2026-07-18
**Domain:** personal

## Goal

Next.js household dashboard — bills, solar, water, cameras — fronted by a 3D model of
the actual house, running locally on `localhost:3000`.

## Key Facts

- **Path:** `C:\Users\conne\.claude\projects\homefinance` — 108 files excluding
  `node_modules` / `.next`. **On disk it is 995 MB** — the largest folder under
  `.claude/projects/`, ~40% of that tree, almost entirely `node_modules` + `.next`.
- **Port 3000**, started with `npm run dev`. Global CLAUDE.md sets it to auto-start each
  session until ~2026-10.
- **No own git repo** — inherits `RudraMind/claude-lab` from the parent `~/.claude`.
- **Build/design doc:** `docs/BUILD.md`.
- **Predecessor:** [[homepulse]]. Both still carry the same
  `Monthly_expense_homepulse.csv`.

## Structure

| Path | Role |
|---|---|
| `app/page.tsx` | Dashboard: Header → HouseView → placeholders → monthly ledger |
| `app/api/{bills,data,pull,control}` | Route handlers; bills is GET/PUT with zod validation |
| `components/house/HouseScene.tsx` | 3D house, 12 hotspots mapped to bill categories, side-yard |
| `components/house/HouseView.tsx` | Toggles 3D house vs classic grid; persists choice to localStorage |
| `components/house/BackyardPanel.tsx` | Backyard plant-care popup |
| `components/ui/` | shadcn-style primitives on base-ui |
| `data/bills/`, `data/snapshots/` | Per-month JSON, runtime-mutable via `lib/storage.ts` |
| `data/backyard.json` | Static plant/project reference data |

## Design Notes

- **Blank ≠ zero** — `data/bills` entries only ever hold present numeric values; an
  absent key is never coerced to `0`.
- **Hero fits the viewport** — house ~60% left, live ledger ~40% right, no page scroll.
- WebGL is capability-probed; falls back to the classic grid with a toast.

## Progress Log

- 2026-07-18: Next.js app scaffolded; bills API + monthly ledger.
- 2026-07-19: 3D house scene rebuilt to match the real house — single-storey massing,
  multi-gable tile roof, side-yard backyard. Idle auto-spin removed. Hydration error fixed.
- 2026-08-13: Backyard panel added — plants, projects and feeding schedule sourced from
  the Claude "Backyard" project consultation; tabbed UI; plant photos.

## Sources

- [[wiki/sources/2026-08-13-claude-projects-inventory]]
