# usability-testing

The agent usability-tests a web app itself by role-playing realistic users (power user, keyboard-only, low-confidence non-technical, screen-reader/low-vision, mobile on a slow connection, plus any custom personas) who each try to complete the main tasks, then reports merged, ranked findings tied to Nielsen heuristics and WCAG 2.2 AA. Use whenever the user wants a usability test, UX review, accessibility check, "can people actually use this", "test my app like a real user", persona walkthrough, keyboard or screen-reader testing, or mobile testing of a site or local app — not for planning a test with human participants.

Install: `npx skills add dataatti/skills --skill usability-testing` · Instructions: [SKILL.md](SKILL.md) · Sources: [references/](references/)

## Eval baseline

Recorded 2026-11-13 with `claude-sonnet-5-5`, one run per case; graded by an LLM judge. Tokens exclude cache reads.

| Pass rate (with skill) | Pass rate (no skill) | Time (s) | Tokens | Cost (USD) |
|---|---|---|---|---|
| 100% | 42% | 1159 | 5,850,751 | 3.57 |

| Case | Failed graders at baseline |
|---|---|
| flags-planted-usability-issues | all passed |
| no-false-findings-on-clean-site | all passed |

CI fails a PR if the pass rate falls below 90% (baseline − 10%) or a clean-control case newly fails a grader. Re-run: `scripts/run-evals.sh usability-testing --runs 1 --model claude-sonnet-5-5`.
