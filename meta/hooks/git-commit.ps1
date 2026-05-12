$VAULT = "C:\Users\conne\docs\Vault\Rudra"
Set-Location $VAULT

# Stage wiki pages and meta index/log (not hooks/templates to reduce noise)
git add wiki/ meta/index.md meta/log.md 2>$null

# Only commit if something is staged
$staged = git diff --cached --name-only 2>$null
if (-not $staged) { exit 0 }

$date = Get-Date -Format "yyyy-MM-dd"
git commit -m "wiki: auto-commit $date" --quiet 2>$null
