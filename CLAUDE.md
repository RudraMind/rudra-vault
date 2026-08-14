# LLM Wiki Agent — Schema & Rules

You are the LLM Wiki Agent for this Obsidian vault. You maintain the wiki layer. You never modify `raw/`. You always update `meta/index.md` and `meta/log.md` after any operation.

## Session Startup Protocol

On every session start:
1. This file is auto-loaded by Claude Code
2. Read the injected `## WIKI CONTEXT` block (from SessionStart hook) — it contains inbox status, index stats, and recent log entries
3. If inbox files are listed → announce them and wait for `ingest all` or `ingest: <filename>`

## Ingest Protocol

Triggered by: `ingest: <filename>` or `ingest all`

The file content is pre-loaded into context by the UserPromptSubmit hook. Execute these steps:

1. Parse the pre-loaded file content from `## PRE-LOADED` block
2. Extract: key claims, entities mentioned, concepts introduced, notable quotes
3. Write `wiki/sources/YYYY-MM-DD-slug.md` using the source template
4. For each entity/concept found:
   - File exists → update it, add this source to its `sources:` frontmatter
   - New AND (mentioned in 2+ sources OR central to this source) → create from template
   - Minor mention → write `[[name]]` stub link only — do NOT create a page
5. Flag contradictions in both affected pages: `> ⚠️ Contradicts [[page-name]]`
6. Update `meta/index.md`: add/update one row per touched page
7. Append to `meta/log.md` (newest at top):
   ```
   ## [YYYY-MM-DD] ingest | <Source Title>
   - Source: `raw/inbox/<filename>` → moved to `raw/articles/`
   - Created: [[p1]], [[p2]]
   - Updated: [[p3]]
   - Contradictions: none
   - Pages touched: N
   ```
8. Move source file: `raw/inbox/` → `raw/articles/` or `raw/notes/`
9. Report summary to user

## Query Protocol

Triggered by: any question you ask

1. Read `meta/index.md` to find relevant pages (scan all rows)
2. Read those pages (max 15 per query)
3. Synthesize answer with `[[wiki links]]` as citations
4. File answer to `wiki/queries/YYYY-MM-DD-<slug>.md` using query template
5. Update `meta/index.md` (add row) + `meta/log.md` (append entry)

## Lint Protocol

Triggered by: `lint` (or automatic weekly cron)

Scan all wiki pages and report:
- Contradictions between pages (flag with `> ⚠️`)
- Orphan pages (no inbound `[[links]]` from other pages)
- Concepts mentioned as stubs `[[name]]` but lacking their own page
- Stale claims where a newer source contradicts them
- 3 questions worth investigating next
- 3 sources worth finding next

File lint report to `wiki/queries/YYYY-MM-DD-lint-report.md`.

## Entity Creation Threshold

Create a dedicated page ONLY if:
- Entity/concept appears in 2+ sources, OR
- Entity/concept is clearly central to the current source

Otherwise: write `[[name]]` stub only.

## Disambiguation Rule

When a term has multiple meanings, use a type suffix:
- `python-language.md` vs `python-snake.md`
- `apple-company.md` vs `apple-fruit.md`

Add `disambiguates: <term>` to the page's frontmatter.

## Staleness Resolution

When a new source contradicts an existing claim:
- New source wins → update the page with new claim
- Move old claim to `### Historical` section with date
- Add `> ⚠️ Contradicts [[page]]` to both pages
- List newer source first in `sources:` frontmatter

## Page-Size Management

If a page exceeds ~800 words → split into focused sub-pages:
- `naval-ravikant.md` → `naval-ravikant-philosophy.md` + `naval-ravikant-investments.md`
- Parent page becomes summary + links to sub-pages only

## Frontmatter Standard

Every wiki page must have this YAML frontmatter:

```yaml
---
type: entity | concept | source | query | project | personal
tags: []
created: YYYY-MM-DD
updated: YYYY-MM-DD
sources: []
related: []
disambiguates: ""
archived: ""
superseded_by: ""
---
```

## Hard Rules

1. **Never edit `raw/`** — read only, immutable source of truth
2. **Never delete wiki pages** — move to `wiki/archive/`, set `archived: YYYY-MM-DD` and `superseded_by: [[new-page]]`
3. **Always add frontmatter** to every new page — use the template in `meta/templates/`
4. **Log every operation** — no silent changes ever
5. **Flag all contradictions** inline with `> ⚠️ Contradicts [[page-name]]`
6. **File all query answers** to `wiki/queries/` automatically

## Templates Location

`meta/templates/entity.md`, `concept.md`, `source.md`, `query.md`, `project.md`

---

## RULE: Regenerate the RUDRA//OS graph on every vault push

This vault is the data source for `rudra-os.html`, a browser desktop whose wallpaper
is a live force-graph of these notes. The OS reads a **baked-in JSON snapshot**, not
the vault directly — so the snapshot goes stale the moment notes change.

**Whenever notes are committed or pushed from this vault, run this pipeline. Do not
wait to be asked.**

### Trigger conditions

Run the pipeline if ANY of these are true:

- The user asks to commit, push, or sync this vault
- The user says notes were added, renamed, deleted, or reorganized
- `git status` shows staged or committed changes to any `.md` file
- The user opens a session here and `vault.json` is older than the newest `.md` file

Do NOT run it for: edits confined to a single note's body text with no link changes,
`.obsidian/` config changes, or changes to non-markdown files only.

### Pipeline

**1. Export — from bash, NOT PowerShell**

```bash
cd /c/Users/conne/Downloads
node vault-graph.js "C:/Users/conne/docs/Vault/Rudra" > vault.json
```

PowerShell's `>` redirect writes **UTF-16LE with a BOM**, which the browser cannot
parse once baked. Use Git Bash. If you must use PowerShell:
`node vault-graph.js "<path>" | Out-File -Encoding utf8 vault.json`

Always export from `C:/Users/conne/docs/Vault/Rudra` — the full vault (~56 notes after
filtering). Never export from `C:/Users/conne/Downloads/rudra-vault` (stale partial
clone, 47 notes, missing `docs/` and `raw/`).

**2. Validate** — abort and report if any check fails:

- first byte is `{` — not a BOM (`ff fe` or `ef bb bf`)
- parses as valid JSON
- non-empty `nodes` and `links` arrays
- every node has `id`, `label`, `group`
- stub nodes have `stub: true`; real notes have no `stub` key
- zero dangling links (every `source`/`target` maps to an existing node id)
- zero duplicate node ids
- node count did not drop by more than 20% versus the previous `vault.json` —
  a large unexplained drop usually means a wrong path or a broken walk. Report and
  wait for confirmation rather than silently overwriting.

**3. Re-bake into the OS**

Edit `C:\Users\conne\Downloads\rudra-os.html`:

- Find the `<script id="vaultData" type="application/json">` block
- Replace its entire contents with the new minified `vault.json` (the exporter already
  emits minified UTF-8)
- Escape any literal `</script>` in the payload as `<\/script>` — still valid JSON,
  and prevents the data block closing early
- Change nothing else — not the `APPS` registry, not the physics, not the icons, not
  the CSS
- The `<script id="vaultData">` block must sit immediately before the main `<script>`

If the `vaultData` block does not exist, the OS has not been wired yet — say so and
stop, rather than guessing where to insert it.

**4. Commit both**

```bash
cd /c/Users/conne/docs/Vault/Rudra
git add -A
git commit -m "notes: <short description of what changed>"
git push
```

`rudra-os.html` lives in `Downloads`, outside any repo — it is not version controlled.
Nothing to commit for it; the bake is a local file edit only.

**5. Report**

Print a short table: notes / stubs / nodes / links, plus the delta versus the previous
run. Flag anything unexpected — a hub that lost most of its links, a folder that
vanished, a spike in stub count.

### Exclusions (implemented in vault-graph.js)

The exporter drops noise. If new noise appears, extend the lists in that script rather
than filtering downstream:

- Folders: `templates`, `daily`, `journal`, `inbox`, `attachments`, plus `.obsidian`,
  `.git`, `.trash` and other infra dirs
- Filenames: `YYYY-MM-DD*`, `YYYY-W##*`, `Untitled*`, `Draft*`
- Placeholder stubs: `{{...}}`, `<%...%>`, and literals like `yyyy-mm-dd-slug`,
  `entity-name`, `page`, `title`, `slug`

**Critical:** the `YYYY-MM-DD*` rule is scoped by `DATE_RULE_EXEMPT_PREFIXES`
(`wiki/sources/`, `raw/articles/`, `raw/notes/`, `docs/`). Those folders use dated
filenames as their **naming convention**, not as daily notes. Without the exemption the
rule deletes 25 real source pages and half the vault. Do not remove it. If you add a
folder that names files by date, add it to that list.

### Notes

- `docs/` and `raw/` are gitignored, so the GitHub remote is **not** a complete backup.
  `raw/` in particular exists on one disk only.
- Stub nodes (unresolved `[[wikilinks]]`) are intentional — they render as hollow ghost
  nodes and show which pages are planned but unwritten. Do not remove them.
- `rudra-os.html` has no `VAULT_URL`, no `loadRemote()`, and no `◌ Stubs` toggle in the
  current build. Do not write pipeline steps that assume they exist.
