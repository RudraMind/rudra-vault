---
type: concept
tags: [chrome-extension, publishing, cws, google, permissions, privacy-policy]
created: 2026-05-27
updated: 2026-05-27
sources: [2026-05-26-chrome-web-store-submission, 2026-05-27-cws-publisher-email-fix]
related: [claude-code-chrome, native-messaging-host, mv3-csp-local-bundle]
disambiguates: ""
archived: ""
superseded_by: ""
---

# Chrome Web Store Submission

Process for submitting a Chrome MV3 extension to the Chrome Web Store for public distribution.

## Prerequisites

- $5 one-time developer registration fee (per account, not per extension)
- Verified publisher contact email (blocks Submit button if missing — Settings → Account → Add email)
- Privacy policy URL if any permission touches user data (nativeMessaging, storage, etc.)

## Permissions Hygiene (Policy-Critical)

Remove ALL unused permissions before submission — declared but unused = policy violation.

| Common over-declarations | Reality |
|--------------------------|---------|
| `storage` | Only needed if `chrome.storage.*` API called |
| `tabs` | NOT needed for `chrome.tabs.create()` — only for reading tab URLs/titles |
| `history`, `bookmarks` | Highly sensitive; always challenged |

## Privacy Policy

Required if extension touches user data. GitHub Pages works for hosting:
1. Add `privacy.md` with Jekyll frontmatter (`layout: default`, `title: Privacy Policy`)
2. Enable GitHub Pages on repo → renders at `https://user.github.io/repo/privacy`
3. **Critical:** without frontmatter, GitHub Pages returns raw markdown not HTML — CWS validator may reject

## nativeMessaging Justification

Most scrutinized permission. Prepare written justification:
> "Used solely to communicate with locally-installed companion process that spawns [tool] in a PTY terminal on the user's machine. No data leaves the machine. Open source: [repo URL]"

## Review Timeline

- Standard: 1–7 business days
- Up to "several weeks" for complex permissions (nativeMessaging, host_permissions)
- Rejection email → reply with justification → usually approved on second review

## Icon Requirements

- 128×128 PNG (required), 48×48, 16×16 (recommended)
- No transparency issues on store listing background
- Generated via PowerShell System.Drawing when no design tools available

## Screenshot Requirements

- Exactly 1280×800 or 640×400 (PNG or JPEG)
- Must show extension in use, not just UI mockup
- Letterbox scale preferred over cropping when showing multi-panel layout

## Submission Checklist

- [ ] All unused permissions removed
- [ ] Manifest validated (manifest.json at zip root, not inside subfolder)
- [ ] Publisher contact email verified
- [ ] Privacy policy URL live and rendering HTML
- [ ] Icon at 128px uploaded
- [ ] Screenshot(s) at correct dimensions
- [ ] "Single purpose" description matches permission justifications
- [ ] "Remote code" = No if scripts bundled locally
- [ ] All 3 certifications checked (accurate, doesn't violate policies, compliant)

## Used In

- [[claude-code-chrome]] — submitted 2026-05-27, pending review
