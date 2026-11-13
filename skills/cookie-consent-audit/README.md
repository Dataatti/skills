# cookie-consent-audit

Audits a website's cookies, local storage, trackers and consent banner against EU rules (ePrivacy Art. 5(3), GDPR consent, EDPB/CNIL/ICO/Traficom guidance) and US opt-out rules (CCPA/CPRA "Do Not Sell or Share", Global Privacy Control, state laws). Use whenever the user asks if their cookie banner or consent setup is compliant, GDPR/ePrivacy cookie checks, CMP review, "are we tracking before consent", GPC support, Google Analytics / Meta Pixel consent questions, or a privacy check of a site before launch. Not legal advice.

Install: `npx skills add dataatti/skills --skill cookie-consent-audit` · Instructions: [SKILL.md](SKILL.md) · Sources: [references/](references/)

## Eval baseline

Recorded 2026-11-13 with `claude-sonnet-5-5`, one run per case; graded by an LLM judge. Tokens exclude cache reads.

| Pass rate (with skill) | Pass rate (no skill) | Time (s) | Tokens | Cost (USD) |
|---|---|---|---|---|
| 93% | 73% | 231 | 61,591 | 0.37 |

| Case | Failed graders at baseline |
|---|---|
| flags-planted-consent-issues | 08-every-listed-failure-includes-a-fix |
| no-false-findings-on-clean-site | all passed |

CI fails a PR if the pass rate falls below 83% (baseline − 10%) or a clean-control case newly fails a grader. Re-run: `scripts/run-evals.sh cookie-consent-audit --runs 1 --model claude-sonnet-5-5`.
