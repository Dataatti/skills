---
name: token-sweep
description: Uses spare tokens before a usage limit resets (e.g. Friday evening) to sweep the current project - runs the other relevant audit skills in parallel (cookie-consent-audit, gdpr-data-retention, usability-testing, conversion-pro) and scans for worthwhile small jobs (bugs, outdated or vulnerable dependencies, missing tests, docs gaps), working only on a new local branch and never pushing or deploying. Use whenever the user says they have tokens/credits/quota left, wants a "sweep", "what could you do while I'm away", "find useful work in this repo", "end-of-week cleanup", or asks for a ranked to-do list of improvements for the project.
license: MIT
metadata:
  version: "1.0.0"
---

# token-sweep

Turn leftover budget into a ranked list of useful work, plus small safe fixes already done on a separate branch.

## Ground rules

The user is usually away, so never block on a question: when unsure, leave the item as "Suggested".

- **New branch only.** Create `token-sweep/<YYYY-MM-DD>` from the current HEAD (add `-2`, `-3`… if it exists) and commit there.
- **Never touch uncommitted work.** If `git status` shows changes, don't stash, commit or check out over them: create the branch in a separate worktree (`git worktree add ../<repo>-token-sweep -b token-sweep/<date> HEAD`) and work there. If that isn't possible, do the sweep read-only.
- **If a branch can't be created** (no git, read-only `.git`, sandbox), don't edit tracked files at all. Do the whole sweep read-only, mark everything "Suggested", and say why in the report.
- **Never push, deploy, publish, or open PRs.** Never run release, deploy or migration scripts. The user reviews the branch.
- Prefer finishing a few things well over starting many.
- Anything costly or irreversible (major upgrades, deleting files, migrations) stays "Suggested".

## 1. Look at the project (5 minutes)

Read README, manifest files (`package.json`, `pyproject.toml`, `go.mod`...), test setup, CI config, and top-level source layout. Decide which audit skills apply:

| Skill | Run when the project has |
|---|---|
| cookie-consent-audit | a public web front end, analytics/ad tags, a cookie banner |
| gdpr-data-retention | a database, user accounts, logs or third-party processors holding personal data |
| usability-testing | a UI people use (web app or site) that can be served locally |
| conversion-pro | a checkout, signup, lead form or pricing page |

Skip the ones that don't apply and say why in one line. If a skill is not installed, mention it as a suggestion instead of running it.

## 2. Run in parallel

Spawn subagents in one turn when you can: one per applicable audit skill (each tells it to use that skill on this project, report only) plus one **job scanner** using `references/jobs.md`. Without subagents, run them one after another, the job scanner first. Audit skills that normally fan out (usability-testing's personas, conversion-pro's five reviewers) use their own documented fallback when running inside a subagent that can't spawn more.

The job scanner looks for: likely bugs (wrong maths, unchecked errors, off-by-one, TODO/FIXME that describe real defects), outdated or vulnerable dependencies (`npm outdated`/`npm audit`, `pip list --outdated`, etc. – or compare versions to known CVEs when offline), code without tests, failing or placeholder test scripts, docs gaps (no install/run steps), and lint/type errors. Every item gets evidence (file:line, command output) and a principle or source from `references/jobs.md`.

## 3. Do the small, safe ones

On the branch, finish items that are **low effort and low risk**: e.g. a clear bug fix with a new test proving it, a patch-level dependency bump with tests passing, a missing README section. One commit per item with a clear message. Run the tests after each. If tests fail and you can't fix it quickly, revert that commit and keep it as a suggestion.

## 4. Report

The first line after the title is the score with exact counts ("Passed 18 of 22 checks", never "about").

Rank by impact ÷ effort (impact: High/Med/Low; effort: S ≤ 30 min, M ≤ half day, L > half day). Security and data-loss issues go first at equal ratio.

```
# Token sweep – <repo> – <date>
Checked 6 areas · Done 3 · Suggested 9 · Branch: token-sweep/<date> (local, not pushed)
Skills run: cookie-consent-audit, gdpr-data-retention · Skipped: conversion-pro (no checkout)

| # | Item | Impact | Effort | Status | Evidence / why |
|---|---|---|---|---|---|
| 1 | Pagination skips the last item (off-by-one) | High | S | Done (abc123, test added) | src/list.js:42 |
| 2 | axios pinned to a version with a known CVE | High | S | Done (patch bump) | npm audit; OWASP A03:2025 |
| 3 | Account deletion only soft-deletes | High | M | Suggested | gdpr-data-retention DR-08 |
...
Review with: git log main..token-sweep/<date>
```

One line per cell. Merge in the top findings from each audit skill rather than pasting their full reports; say where the full report is if you saved one.

## References
- `references/jobs.md` – what counts as worthwhile, how to estimate effort/impact, sources.
