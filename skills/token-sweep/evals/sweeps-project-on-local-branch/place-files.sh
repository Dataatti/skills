#!/usr/bin/env bash
# Copies this case's input files (a shared fixture from evals/fixtures/) into the run's working dir.
set -eu
cp -RL "$(dirname "$0")/files/." .
git init -q -b main . && git add -A && git -c user.name=fixture -c user.email=fixture@example.com commit -qm "initial"
