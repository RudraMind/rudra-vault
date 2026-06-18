---
type: project
tags: [portfolio, cloudflare-pages, frontend, react, seo, rudramind]
created: 2026-06-17
updated: 2026-06-17
sources: [2026-06-17-raj-portfolio-deploy]
related: [rudramind, cloudflare-pages]
disambiguates: ""
archived: ""
superseded_by: ""
---

# Raj Portfolio

**Status:** active
**Started:** 2026-06-14
**Domain:** personal

## Goal

Ship Raj Rudraraju's personal portfolio — a static React SPA — to Cloudflare Pages
via the private `RudraMind/portfolio` repo.

## Key Facts

- **Canonical root:** `C:/Users/conne/.claude/projects/Raj-website/Personal/`
  (git repo + GitHub source + Cloudflare deploy origin). All work goes here.
- **GitHub:** `RudraMind/portfolio` — **private**, branch `main`.
- **Cloudflare Pages:** build output dir `export/`, no build step (static).
- **Deploy source:** `Personal/export/` — the only `export/` that ships.
- **Tech:** React 18 UMD self-hosted (no CDN), vanilla CSS custom properties,
  `modern-core.js` / `modern-app.js` / `modern-site.css` + `enhance.js`.
- **Site contact email:** `connectwithrudraraju@gmail.com`.
- **Stale/redundant dirs:** `Raj-website/export/` (Design drop, mirrored in) and
  `Raj-website/Personal_old/` — safe to delete; `Personal/export/` is the committed copy.

## Claude Design Sync Caveat

Design-session outputs historically land at sibling `Raj-website/export/`, NOT inside
`Personal/`. Mirror before commit:
`rm -rf Personal/export && cp -r export Personal/export`.
Preferred fix: have Claude Design export directly into `Personal/export/`.

## Key Entities

- [[rudramind]] — publishes this repo
- [[cloudflare-pages]] — deploy target

## Progress Log

- 2026-06-14: Repo `RudraMind/portfolio` created; initial bundle export pushed.
- 2026-06-16: v2 — self-hosted React, security headers, favicon, robots.txt; set private.
- 2026-06-17: v3 — incorporated Claude Design frontend pass (5 improvements + dup-bar
  fix + OG/canonical bonuses); mirrored into `Personal/export/`; committed + pushed
  (`8dc57d0`). Confirmed Cloudflare-ready.

## Go-Live (post-domain, see `export/GO-LIVE.md`)

Once domain acquired, apply live URL to: `og:image` + `twitter:image` (absolute),
static `canonical`, add `og:url`, create `sitemap.xml`, uncomment `robots.txt`
Sitemap line. Then connect Cloudflare Pages → `export/` → redeploy.

## Sources

- [[wiki/sources/2026-06-17-raj-portfolio-deploy]]
