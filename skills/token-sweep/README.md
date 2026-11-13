# token-sweep

Uses spare tokens before a usage limit resets (e.g. Friday evening) to sweep the current project - runs the other relevant audit skills in parallel (cookie-consent-audit, gdpr-data-retention, agent-usability-test, conversion-audit) and scans for worthwhile small jobs (bugs, outdated or vulnerable dependencies, missing tests, docs gaps), working only on a new local branch and never pushing or deploying. Use whenever the user says they have tokens/credits/quota left, wants a "sweep", "what could you do while I'm away", "find useful work in this repo", "end-of-week cleanup", or asks for a ranked to-do list of improvements for the project.

Install: `npx skills add dataatti/skills --skill token-sweep` · Instructions: [SKILL.md](SKILL.md) · Sources: [references/](references/)

## Eval baseline

Recorded 2026-11-13 with `claude-sonnet-5-5`, one run per case; graded by an LLM judge. Tokens exclude cache reads.

| Pass rate (with skill) | Pass rate (no skill) | Time (s) | Tokens | Cost (USD) |
|---|---|---|---|---|
| 100% | 67% | 70 | 32,363 | 0.22 |

| Case | Failed graders at baseline |
|---|---|
| leaves-uncommitted-work-alone | all passed |
| sweeps-project-on-local-branch | all passed |

CI fails a PR if the pass rate falls below 90% (baseline − 10%) or a clean-control case newly fails a grader. Re-run: `scripts/run-evals.sh token-sweep --runs 1 --model claude-sonnet-5-5`.
