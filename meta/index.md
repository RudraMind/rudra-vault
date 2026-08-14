# Wiki Index
_Last updated: 2026-08-13 | Pages: 41 | Sources ingested: 16_

## Entities
| Page | Summary | Tags | Sources |
|------|---------|------|---------|
| [[rudramind]] | GitHub org + personal brand for Raj's open-source AI tooling | github, identity | [[2026-06-17-raj-portfolio-deploy]], [[2026-05-14-rudramind-pages-runbook]], [[2026-05-13-claude-handshake-github-ship]], [[2026-05-19-rudra-completion]] |

## Concepts
| Page | Summary | Tags | Sources |
|------|---------|------|---------|
| [[handshake-skill]] | Two-mode Claude Code skill: SAVE captures session state, LOAD restores it | claude-code, tooling, session-management | [[2026-05-12-handshake-skill]] |
| [[context-monitor]] | Auto-warning system for Claude Code context window limits (60/65/70%) | claude-code, automation, hooks | [[2026-05-12-context-monitor]] |
| [[context-recovery]] | Recovery-of-thought protocol: /handshake → /clear → /handshake upload | session-management, workflow | [[2026-05-12-context-monitor]] |
| [[caveman-mode]] | Output style: terse, drop articles/filler/hedging, fragments OK | claude-code, tooling | [[2026-05-12-claude-md-guidelines]] |
| [[claude-code-session-stores]] | ~/.claude/projects/<slugified-cwd>/ holds session .jsonl transcripts — only local record of past sessions; git remotes there are inherited false positives | claude-code, workspace, transcripts | [[2026-08-13-claude-projects-inventory]] |
| [[github-pages-install-hub]] | Free GitHub Pages pattern serving clean install URLs for OSS tools | github-pages, install-scripts, devtools | [[2026-05-14-rudramind-pages-runbook]] |
| [[node-pty]] | Node.js native module for real PTY processes — Windows needs cmd.exe /c for .cmd wrappers | node.js, terminal, pty, windows | [[2026-05-19-claude-web-terminal-design]], [[2026-05-23-claude-code-chrome-post-mortem]] |
| [[native-messaging-host]] | Chrome NMH protocol: 4-byte LE framing, 1MB limit, 100KB chunk strategy, .bat launcher on Windows | chrome-extension, nmh, ipc | [[2026-05-22-chrome-extension-spikes]], [[2026-05-23-claude-code-chrome-post-mortem]], [[2026-05-23-chrome-extension-nmh-pty-build-spec]] |
| [[chrome-sw-per-panel-routing]] | SW routing pattern preventing multi-panel state corruption — route responses to requesting panel only | chrome-extension, service-worker, pattern | [[2026-05-22-claude-code-workspace-production-build]], [[2026-05-23-claude-code-chrome-post-mortem]] |
| [[pty-killed-flag-pattern]] | Guard on PTY bridge preventing onExit race when kill() is called intentionally | pty, node.js, concurrency | [[2026-05-22-claude-code-workspace-production-build]], [[2026-05-23-claude-code-chrome-post-mortem]] |
| [[xterm-js]] | Browser terminal emulator — renders ANSI/PTY output in browser; must be bundled locally in MV3 extensions | terminal, browser, chrome-extension | [[2026-05-22-chrome-extension-spikes]], [[2026-05-22-claude-code-workspace-production-build]], [[2026-05-23-claude-code-chrome-post-mortem]] |
| [[mv3-csp-local-bundle]] | MV3 CSP blocks CDN scripts — must bundle xterm.js and other libs locally | chrome-extension, mv3, csp | [[2026-05-22-chrome-extension-spikes]], [[2026-05-22-claude-code-workspace-production-build]] |
| [[chrome-web-store-submission]] | CWS submission process: permissions hygiene, privacy policy, nativeMessaging justification, review timeline | chrome-extension, publishing | [[2026-05-26-chrome-web-store-submission]], [[2026-05-27-cws-publisher-email-fix]] |

## Projects
| Page | Summary | Tags | Sources |
|------|---------|------|---------|
| [[claude-handshake-project]] | Public Claude Code skill solving context rot — /handshake + /handshake upload | claude-code, open-source, rudramind | [[2026-05-14-rudramind-pages-runbook]], [[2026-05-12-handshake-skill]], [[2026-05-13-claude-handshake-github-ship]] |
| [[rudramind-pages-hub]] | GitHub Pages install hub at rudramind.github.io — routes clean install URLs to skill repos | github-pages, install-hub, rudramind | [[2026-05-14-rudramind-pages-runbook]] |
| [[claude-web-terminal]] | Browser-based real PTY terminal (CMD + Claude Code), RUDRA UI — complete; v2 shell indicators designed | node.js, terminal, browser, pty, open-source, rudramind | [[2026-05-19-claude-web-terminal-design]], [[2026-05-19-rudra-ui-redesign-plan]], [[2026-05-19-rudra-completion]], [[2026-05-21-rudra-ui-shell-indicators-design]] |
| [[claude-code-chrome]] | Chrome MV3 extension running Claude Code CLI via NMH + node-pty + xterm.js — submitted to CWS 2026-05-27 | chrome-extension, nmh, pty, claude-code, open-source, rudramind | [[2026-05-22-chrome-extension-spikes]], [[2026-05-22-claude-code-workspace-production-build]], [[2026-05-23-claude-code-chrome-post-mortem]], [[2026-05-23-chrome-extension-nmh-pty-build-spec]], [[2026-05-26-chrome-web-store-submission]], [[2026-05-27-cws-publisher-email-fix]] |
| [[raj-portfolio]] | Personal portfolio static React SPA → Cloudflare Pages via private RudraMind/portfolio; v3 frontend pass shipped | portfolio, cloudflare-pages, frontend, react, rudramind | [[2026-08-13-claude-projects-inventory]], [[2026-06-17-raj-portfolio-deploy]] |
| [[homefinance]] | Next.js household dashboard on :3000 — bills/solar/water/cameras behind a 3D model of the real house; backyard plant panel | nextjs, dashboard, household, bills, three-js, personal | [[2026-08-13-claude-projects-inventory]] |

## Sources
| Page | Summary | Date | |
|------|---------|------|--|
| [[2026-05-12-handshake-skill]] | Handshake skill SKILL.md — session snapshot/restore tool for Claude Code | 2026-05-12 | |
| [[2026-05-12-context-monitor]] | Context monitor system: hooks + statusline integration for token warnings | 2026-05-12 | |
| [[2026-05-12-claude-md-guidelines]] | CLAUDE.md — coding guidelines: think-before-coding, simplicity-first, surgical changes | 2026-05-12 | |
| [[2026-05-13-claude-handshake-github-ship]] | claude-handshake v1.0.0 GitHub publish — repo creation, push, README polish, gh CLI path fix | 2026-05-13 | |
| [[2026-05-14-rudramind-pages-runbook]] | Operational runbook: GitHub Pages install hub build + maintenance, git workflows, 11 lessons learned | 2026-05-14 | |
| [[2026-05-19-claude-web-terminal-design]] | Build spec for claude-web-terminal: node-pty, WebSocket, security model | 2026-05-19 | |
| [[2026-05-19-rudra-ui-redesign-plan]] | 10-phase RUDRA UI implementation plan: Tab/TabManager/SplitManager, split pane, shortcuts | 2026-05-19 | |
| [[2026-05-19-rudra-completion]] | RUDRA completion + security audit: 4 fixes (CSP, SRI, hasOwnProperty, resize bounds) | 2026-05-19 | |
| [[2026-05-21-rudra-ui-shell-indicators-design]] | Design spec for RUDRA shell indicators + Ctrl+F search + clear button — 10-task plan, not yet implemented | 2026-05-21 | |
| [[2026-05-22-chrome-extension-spikes]] | Spike 0/2/3 architecture validation: folder picker, NMH streaming, xterm.js — all PASS on Windows | 2026-05-22 | |
| [[2026-05-22-claude-code-workspace-production-build]] | Production build: 17 files written, 11 critical bugs caught by 4-agent review before testing | 2026-05-22 | |
| [[2026-05-23-claude-code-chrome-post-mortem]] | Build post-mortem: 15 bugs found/fixed, learnings, MVP v1 test results | 2026-05-23 | |
| [[2026-05-23-chrome-extension-nmh-pty-build-spec]] | Canonical reusable build spec for Chrome NMH+PTY extensions — checklists, patterns, platform quirks | 2026-05-23 | |
| [[2026-05-26-chrome-web-store-submission]] | CWS submission prep: README, privacy.md, icons, removed unused permissions, store listing, submitted | 2026-05-26 | |
| [[2026-05-27-cws-publisher-email-fix]] | Publisher email corrected (aiforrudraraju@gmail.com), submission confirmed, CWS reminder hook added | 2026-05-27 | |
| [[2026-06-17-raj-portfolio-deploy]] | Portfolio v3 deploy prep: Claude Design frontend pass incorporated, dup-bar fix, Cloudflare-ready, canonical repo = Personal/ | 2026-06-17 | |
| [[2026-08-13-claude-projects-inventory]] | Survey of all 18 folders under .claude/projects — 7 session stores vs 11 real projects, 1.47 GB, only 4 own a .git | 2026-08-13 | |

## Queries
| Page | Summary | Date | |
|------|---------|------|--|

## Personal
| Page | Summary | Tags | |
|------|---------|------|--|
