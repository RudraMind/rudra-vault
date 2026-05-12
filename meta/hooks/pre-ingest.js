#!/usr/bin/env node
const fs   = require('fs');
const path = require('path');

const VAULT = 'C:/Users/conne/docs/Vault/Rudra';
const INBOX = path.join(VAULT, 'raw/inbox');

let raw = '';
process.stdin.on('data', d => { raw += d; });
process.stdin.on('end', () => {
  let message = '';
  try {
    const data = JSON.parse(raw);
    message = data.message || '';
  } catch {
    message = raw;
  }

  const isIngestAll = /\bingest\s+all\b/i.test(message);
  const ingestMatch = message.match(/\bingest:\s*(\S+)/i);

  if (!isIngestAll && !ingestMatch) process.exit(0);
  if (!fs.existsSync(INBOX)) process.exit(0);

  let filesToLoad = [];

  if (isIngestAll) {
    filesToLoad = fs.readdirSync(INBOX)
      .filter(f => f.endsWith('.md') || f.endsWith('.txt'));
  } else if (ingestMatch) {
    const filename = ingestMatch[1].trim();
    if (fs.existsSync(path.join(INBOX, filename))) {
      filesToLoad = [filename];
    }
  }

  if (filesToLoad.length === 0) process.exit(0);

  let out = '\n## PRE-LOADED INBOX FILES\n';
  filesToLoad.forEach(f => {
    const content = fs.readFileSync(path.join(INBOX, f), 'utf8');
    out += `\n### File: raw/inbox/${f}\n\`\`\`\n${content}\n\`\`\`\n`;
  });

  process.stdout.write(out);
});
