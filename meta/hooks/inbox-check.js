#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const VAULT = 'C:/Users/conne/docs/Vault/Rudra';
const INBOX = path.join(VAULT, 'raw/inbox');
const INDEX = path.join(VAULT, 'meta/index.md');
const LOG   = path.join(VAULT, 'meta/log.md');

const inboxFiles = fs.existsSync(INBOX)
  ? fs.readdirSync(INBOX).filter(f => f.endsWith('.md') || f.endsWith('.txt'))
  : [];

let indexStats = '0 pages';
if (fs.existsSync(INDEX)) {
  const m = fs.readFileSync(INDEX, 'utf8').match(/Pages:\s*(\d+)/);
  if (m) indexStats = `${m[1]} pages`;
}

let recentOps = '  (no operations yet)';
if (fs.existsSync(LOG)) {
  const entries = (fs.readFileSync(LOG, 'utf8').match(/^## \[.+$/gm) || []).slice(0, 3);
  if (entries.length > 0) recentOps = entries.map(e => `  ${e}`).join('\n');
}

const today = new Date().toISOString().split('T')[0];
let out = `\n## WIKI CONTEXT [auto-loaded ${today}]\n`;

if (inboxFiles.length > 0) {
  out += `Inbox: ${inboxFiles.length} file(s) pending\n`;
  inboxFiles.forEach(f => { out += `  - raw/inbox/${f}\n`; });
  out += `→ Type: ingest all\n`;
} else {
  out += `Inbox: empty — drop files into raw/inbox/ to ingest\n`;
}

out += `Index: ${indexStats}\n`;
out += `Recent operations:\n${recentOps}\n`;

process.stdout.write(out);
