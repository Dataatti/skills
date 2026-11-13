#!/usr/bin/env bash
# Run one skill's eval cases with `claude plugin eval`.
#
#   scripts/run-evals.sh <skill-name> [extra claude plugin eval args...]
#
# `claude plugin eval` does not accept an eval dir inside a plugin's skills/ folder,
# so this wraps the skill in a throw-away plugin:
#   $tmp/.claude-plugin/plugin.json
#   $tmp/skills/<skill>/        (the skill, without its evals/)
#   $tmp/evals/<case>/          (the skill's cases, fixture symlinks dereferenced)
# Results: evals-results/<skill>/result.json (+ report.html)
set -euo pipefail
skill="$1"; shift
repo="$(cd "$(dirname "$0")/.." && pwd)"
src="$repo/skills/$skill"
[ -f "$src/SKILL.md" ] || { echo "no such skill: $skill" >&2; exit 1; }

tmp="$(mktemp -d)"
mkdir -p "$tmp/.claude-plugin" "$tmp/skills/$skill" "$tmp/evals"
printf '{"name":"eval-%s","version":"0.0.0"}\n' "$skill" > "$tmp/.claude-plugin/plugin.json"
( cd "$src" && tar --exclude=./evals -cf - . ) | ( cd "$tmp/skills/$skill" && tar -xf - )
for c in "$src"/evals/*/; do
  [ -f "$c/case.yaml" ] || [ -f "$c/prompt.md" ] || continue
  cp -RL "$c" "$tmp/evals/"
done

out="$repo/evals-results/$skill"; mkdir -p "$out"
cd "$tmp"
claude plugin eval . \
  --trust-plugin --scaffold --no-publish \
  --allow-tools Bash Write Edit \
  --json "$out/result.json" --report "$out/report.html" \
  "$@"
