---
type: source
tags: [portfolio, cloudflare-pages, frontend, deploy, rudramind]
created: 2026-06-17
updated: 2026-06-17
sources: []
related: [raj-portfolio, rudramind]
disambiguates: ""
archived: ""
superseded_by: ""
---

# Raj Portfolio — v3 Deploy Prep & Frontend Pass

**Type:** note
**Date:** 2026-06-17
**Original:** `raw/articles/2026-06-17-raj-portfolio-deploy.md`

## Summary

Deploy-prep session for Raj Rudraraju's personal portfolio (static React SPA, no
build step) targeting Cloudflare Pages. Incorporated a Claude Design frontend pass
(5 improvements + bug fix + SEO bonuses) into the canonical git repo and pushed to
the private `RudraMind/portfolio` GitHub repo. Established `Raj-website/Personal/`
as the single source of truth for the project.

## Key Claims

1. **Canonical root = `Raj-website/Personal/`** — the git repo, GitHub source, and
   Cloudflare deploy origin. Deploy source is `Personal/export/` (build output dir
   `export/`, no build step).
2. **GitHub repo `RudraMind/portfolio` is PRIVATE** (unlike RudraMind's other public
   skill repos), branch `main`.
3. **Claude Design exports land at sibling `Raj-website/export/`**, NOT inside
   `Personal/` — they must be mirrored into `Personal/export/` before commit, or
   (preferred) Design should export directly into `Personal/export/` to kill drift.
4. Frontend pass (v3) shipped: opening animation 3.5s→1.6s; Fortune 500 client strip
   below hero; scroll-progress + active-nav via framework-agnostic `enhance.js`;
   larger stat numbers `clamp(34px,4.2vw,56px)`; sticky mobile CTA bar.
5. **Dup-bar bug fixed:** an interim build rendered scroll-progress + active-nav both
   via React AND `enhance.js` → two overlapping bars + double observers. Resolved by
   making `enhance.js` the single owner.
6. SEO bonuses: 1200×630 `raj-og.png` OG card + `og:image:width/height/type` + Twitter
   card on all pages; per-page canonical JS-injected.
7. **Cloudflare-ready:** `_headers` (CSP, HSTS, X-Frame-Options, nosniff,
   Referrer/Permissions-Policy), `_redirects` (pretty-URL→`.html` 200), SRI on
   self-hosted React. Only post-domain task left: absolute `og:image` URL + static
   canonical + `og:url` + `sitemap.xml` (documented in `export/GO-LIVE.md`).
8. Site contact email is `connectwithrudraraju@gmail.com` (distinct from RudraMind
   org email `rajcherryforever@gmail.com`).

## Notable Quotes

> "enhance.js is now the single owner" — dup scroll-bar / active-nav resolution.

## Entities Mentioned

- [[rudramind]]
- [[cloudflare-pages]]

## Concepts Introduced

- [[raj-portfolio]] (project)

## Contradictions Flagged

_None_
