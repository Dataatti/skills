# conversion-audit

Finds conversion leaks in a site's or app's main user flows (browse → product → cart → checkout, signup, lead or demo forms, pricing → trial) by running five independent reviewer agents and ranking issues by how many found them. Use whenever the user asks why visitors don't buy or sign up, wants a CRO / conversion audit, checkout or funnel review, cart-abandonment or drop-off diagnosis, landing-page or pricing-page critique, or "how do I get more sales/signups from this site", even if they don't say "conversion".

Install: `npx skills add dataatti/skills --skill conversion-audit` · Instructions: [SKILL.md](SKILL.md) · Sources: [references/](references/)

## Eval baseline

Recorded 2026-11-13 with `claude-sonnet-5-5`, one run per case; graded by an LLM judge. Tokens exclude cache reads.

| Pass rate (with skill) | Pass rate (no skill) | Time (s) | Tokens | Cost (USD) |
|---|---|---|---|---|
| 85% | 69% | 450 | 1,517,431 | 2.0 |

| Case | Failed graders at baseline |
|---|---|
| flags-planted-conversion-leaks | 08-every-finding-cites-a-principle-or |
| no-false-findings-on-clean-site | 03-no-finding-is-rated-high-severity |

CI fails a PR if the pass rate falls below 75% (baseline − 10%) or a clean-control case newly fails a grader. Re-run: `scripts/run-evals.sh conversion-audit --runs 1 --model claude-sonnet-5-5`.
