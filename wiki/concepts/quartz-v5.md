---
type: concept
tags: [quartz, obsidian, static-site, github-pages, publishing]
created: 2026-05-28
updated: 2026-05-28
sources: [2026-05-28-quartz-vault-publisher-build]
related: [rudra-quartz-publisher, github-actions-cross-repo-dispatch]
disambiguates: ""
archived: ""
superseded_by: ""
---

# Quartz v5

Static site generator that publishes Obsidian vaults as interconnected web pages with interactive graph view.

## Explanation

Quartz v5 (jackyzha0/quartz, `v5` branch) reads Markdown from a `content/` directory, resolves Obsidian `[[wikilinks]]`, and outputs a static site with full-text search, backlinks, and a D3 force graph. Config is YAML (`quartz.config.default.yaml`) — no TypeScript required unless customizing components. Plugins are fetched from GitHub at build time via `npx quartz plugin install` and cached in `.quartz/plugins/`.

## Key Principles

- `baseUrl` must be set WITHOUT protocol prefix — `rudramind.github.io/rudra-quartz` not `https://...`
- `[[wikilinks]]` in YAML frontmatter are invalid YAML — must be stripped before build
- `npx quartz plugin install` must run before `npx quartz build`
- Content directory is `content/` — subdirectory structure mirrors vault folder layout
- GitHub Actions workflow files must use `.yaml` not `.yml` extension (repo-specific quirk observed 2026-05-28)

## Examples

- [[rudra-quartz-publisher]] — live deployment at `rudramind.github.io/rudra-quartz`

## Connections

- Builds on [[obsidian-vault]] structure and `[[wikilink]]` syntax
- Deployed via [[github-actions-cross-repo-dispatch]] from [[rudramind]] vault

## Sources

- [[wiki/sources/2026-05-28-quartz-vault-publisher-build]]
