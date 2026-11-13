#!/usr/bin/env bash
# Copies this case's input files (a shared fixture from evals/fixtures/) into the run's working dir.
set -eu
cp -RL "$(dirname "$0")/files/." .
