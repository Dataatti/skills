#!/usr/bin/env bash
# Copies the sweep-project fixture, commits it, then leaves the user's work-in-progress uncommitted.
set -eu
cp -RL "$(dirname "$0")/files/." .
git init -q -b main . && git add -A && git -c user.name=fixture -c user.email=fixture@example.com commit -qm "initial"
printf '\n## Usage (WIP – do not lose)\n\nGET /?items=[...]&code=10%%\n' >> README.md
