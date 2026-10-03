#!/usr/bin/env bash
# Run from the root of the portfolio repo:  bash /path/to/arshos/apply-arshos.sh
set -euo pipefail
SRC="$(cd "$(dirname "$0")" && pwd)"
[ -f angular.json ] || { echo "Run this from the portfolio repo root"; exit 1; }
git checkout -B redesign/dev-os >/dev/null 2>&1 || true
cp -R "$SRC/projects/." projects/
python3 "$SRC/patch_index.py" projects/portfolio/src/index.html
echo "arshOS applied. Try: npm run start:portfolio"
