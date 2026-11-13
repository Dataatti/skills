# Decisions

Choices made without asking, one line of reasoning each. Newest at the bottom of each section.

## Repo and format
- **Layout**: `skills/<name>/` with `SKILL.md`, `references/`, `scripts/` (cookie only) and `evals/`. `npx skills add` discovers `skills/*/SKILL.md`, and the same folder is the default skills location for a Claude Code plugin.
- **Plugin manifest** `.claude-plugin/plugin.json` (name `site-audit-skills`): lets the repo also install as a Claude Code plugin (`/plugin`) and lets `claude plugin eval` run it.
- **Frontmatter**: `name`, `description`, `license: MIT`, `metadata.version`. These are the spec's optional fields; `allowed-tools` was left out because it is experimental and differs between agents.
- **Descriptions are "pushy"** and list trigger phrases, per skill-creator's guidance, because skills tend to under-trigger.
- **Shared output contract**: the first line is `Passed X of Y`, then a table of failures only, one line per cell, each with fix and principle. This meets rule 2. Exact counts are required because the judge failed "about 40 of 46" in round 1.
- **One-line out-of-scope rule** in the four audit skills: round-1 reports drifted into extra paragraphs about other domains, which breaks "no essays".

## Names (working names kept; proposals for you to decide)
- Kept all five working names so your install commands and brief match.
- Proposal: rename `conversion-pro` → `conversion-audit` to match `cookie-consent-audit` (a verb-noun pattern that says what it does). Not done, because renaming changes the install name.
- Proposal: rename `usability-testing` → `agent-usability-test`, which makes it clear the agent runs the test, not a human study. That distinction is the skill's differentiator. Not done, for the same reason.

## Research
- **Five parallel research subagents**: one per domain, plus one on format/CI. Results are in each skill's `references/`, every claim with a link and "Sources checked as of 2026-11-12".
- **Regulator over commentary**: where sources disagree, the files say so and follow the regulator. Examples: reject-button rules across EU DPAs, cookie walls (EDPB vs CNIL), state GPC dates, and Baymard figures that differ between Baymard's own pages.
- **Flagged rather than dropped**: unconfirmed items stay in the files, marked "to re-check". These are the EU Digital Omnibus (proposal, not adopted), France's 2026 tax-audit period, the NJ opt-out-signal rules, and the Hotjar cookie names.
- **Chrome throttling presets**: they changed in Chrome 127 ("3G" / "Slow 4G" replace "Slow 3G" / "Fast 3G"). The mobile persona uses the new values.
- **UK Companies Act**: the brief said 6 years. It is 3 years for private companies (s.388), and HMRC's 6 years usually governs. The references say this.

## Skills
- **cookie-consent-audit ships `scripts/scan.cjs`**: the "before any interaction" inventory must be deterministic and repeatable (fresh profile, cookies, storage, third-party requests, optional Reject/Accept click, GPC on). It is the only skill with a script. It finds Playwright and browsers in sandboxed or non-standard paths itself, so agents should run it first.
- **Third-party requests are recorded even when blocked** (`--block-third-party`), so the audit works offline and in CI.
- **gdpr-data-retention never recommends deleting records under a legal minimum**. It recommends unlinking under Art. 17(3)(b) and deleting at the end of the period. The broken fixture has a planted trap for this, PR-TRAP.
- **usability-testing / conversion-pro fallbacks**: without subagents, personas run one after another in fresh contexts. Conversion reviewers use separate `claude -p` processes if available, or the report is labelled "not independent". Without a browser, the review is code-only and labelled so.
- **conversion-pro checks every fix against `references/ethics.md`**: it never recommends dark patterns, and it reports existing ones (e.g. a fake countdown) as risks.
- **token-sweep works on `token-sweep/<date>`**, commits one item at a time and never pushes. If a branch can't be created (e.g. a read-only `.git` in a sandbox), it edits nothing and only suggests. This was added after the eval sandbox showed exactly that case.

## Fixtures and evals
- **Three shared fixtures** in `evals/fixtures/`, not one per skill, to keep the repo small and the scenarios realistic:
  - `broken-shop` (Brew Barn): every planted issue.
  - `clean-shop` (Kettle & Co): the clean control for all four audit skills.
  - `sweep-project`: a tiny Node repo for token-sweep.
- **Answer key `evals/fixtures/PLANTED.md`** lives outside the fixtures, so an eval run never sees it. Fixture READMEs and file names give no hints.
- **Eval cases** use skill-creator's case-folder format (`prompt.md`, `case.yaml`, `graders/NN-*.md`, `place-files.sh`), so the same cases work with skill-creator and with `claude plugin eval`. `files/` is a symlink to the shared fixture.
- **Two cases per audit skill** (planted issues + clean control) and one for token-sweep. A clean control makes little sense for a sweep, so none was written.
- **The clean fixture was hardened after round 1**. Reviewers correctly found real issues in it: Earl Grey linked to the Sencha page, a static cart that ignored quantity, form data sent in the URL, thin product info, weak payment trust cues and banner focus handling. All were fixed, so the "no false findings" cases are fair.
- **Trigger evals**: 12 queries per skill (6 should-trigger, 6 near-miss should-not) in `evals/trigger-evals.json`, in skill-creator's format. The description-optimisation loop was not run, to save tokens. Run it with skill-creator's `run_loop.py` when tuning.
- **Baselines**: one run per case, with and without the skill. The model is `claude-sonnet-5-5` for both runs and CI, and the judge is CI's default (haiku), which keeps CI cheap. Numbers are in `skills/<name>/evals/baseline.json` and the README.

## CI
- **Evals run in GitHub Actions** via `claude plugin eval`. It is Claude Code's own headless eval runner and reads skill-creator's case format.
- **`scripts/run-evals.sh` wraps each skill in a temporary plugin**: `claude plugin eval` refuses an eval dir inside `skills/`, and per-skill wrapping is what lets CI run only the skills that changed.
- **Changed-skill selection** (`scripts/changed-skills.py`): a change under `skills/<name>/` runs that skill. A change to shared fixtures, scripts or the workflow runs all skills.
- **Gate** (`scripts/summarize-evals.py --gate`): the PR fails if the with-skill grader pass rate falls below `baseline − 10 points`, or if a clean-control case fails a grader it passed at baseline. The 10-point tolerance absorbs LLM-judge noise at one run per case.
- **CI runs with the skill only** (`--ablation none`): the no-skill comparison isn't needed to detect regressions, and dropping it halves the cost. The cost cap is $15 per skill per run.
- **CI installs bubblewrap and socat**, because `claude plugin eval` refuses to grant Bash without an OS sandbox. It also relaxes Ubuntu 24.04's user-namespace restriction, which bubblewrap needs.
- **A static `validate` job** (frontmatter, referenced files, case structure, trigger evals) runs first and needs no API key.
- **Forked PRs don't get secrets**, so the eval job fails with a clear message there. Maintainers can re-run via `workflow_dispatch`.
