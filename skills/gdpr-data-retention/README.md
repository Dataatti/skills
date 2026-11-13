# gdpr-data-retention

Reviews how an app stores personal data and how long it keeps it - inventories personal data in code, database schemas, logs, backups and third-party services, then checks each item for purpose, lawful basis, retention period, automatic deletion and an erasure path (GDPR Art. 5, 6, 17, 30), respecting legal minimums such as bookkeeping retention. Use whenever the user asks about GDPR compliance of their data model, data retention policy, "how long should we keep X", right to be forgotten / account deletion, data minimisation, records of processing, or a privacy review of a codebase. Not legal advice.

Install: `npx skills add dataatti/skills --skill gdpr-data-retention` · Instructions: [SKILL.md](SKILL.md) · Sources: [references/](references/)

## Eval baseline

Recorded 2026-11-13 with `claude-sonnet-5-5`, one run per case; graded by an LLM judge. Tokens exclude cache reads.

| Pass rate (with skill) | Pass rate (no skill) | Time (s) | Tokens | Cost (USD) |
|---|---|---|---|---|
| 87% | 73% | 145 | 72,698 | 0.48 |

| Case | Failed graders at baseline |
|---|---|
| flags-planted-retention-issues | all passed |
| no-false-findings-on-clean-app | 01-the-report-does-not-list-any, 05-no-invented-failures |

CI fails a PR if the pass rate falls below 77% (baseline − 10%) or a clean-control case newly fails a grader. Re-run: `scripts/run-evals.sh gdpr-data-retention --runs 1 --model claude-sonnet-5-5`.
