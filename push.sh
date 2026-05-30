#!/usr/bin/env bash
# Push to github.com/TailoredTechSolutions/tailor-built-ai
set -e
REMOTE="https://github.com/TailoredTechSolutions/tailor-built-ai.git"

# Remote is already wired in .git/config — just push.
if command -v gh >/dev/null 2>&1 && gh auth status >/dev/null 2>&1; then
  # If the repo exists empty on GitHub, push works directly.
  # If it doesn't exist yet, create it first.
  if ! gh repo view TailoredTechSolutions/tailor-built-ai >/dev/null 2>&1; then
    gh repo create TailoredTechSolutions/tailor-built-ai --private --source=. --remote=origin --push
  else
    git push -u origin main
  fi
else
  echo "No gh CLI. Either:"
  echo "  1) Install gh:  brew install gh && gh auth login   then rerun ./push.sh"
  echo "  2) Or push directly (needs the empty repo to exist on github):"
  echo "       git push -u origin main"
fi
echo "Done: https://github.com/TailoredTechSolutions/tailor-built-ai"
