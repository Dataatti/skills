# Site audit skills

Five agent skills that audit a web app the way a careful specialist would. Each finding is backed by a named principle and a source, and each skill is backed by evals that run on every change.

```bash
npx skills add dataatti/skills
```

Install one skill only: `npx skills add dataatti/skills --skill cookie-consent-audit`. They follow the open [Agent Skills](https://agentskills.io/specification) format, so they work in Claude Code, Codex, Cursor, Gemini CLI and other agents supported by [`npx skills`](https://github.com/vercel-labs/skills). In Claude Code you can also add the repo as a plugin, using the manifest in `.claude-plugin/`.

> **Not legal advice.** `cookie-consent-audit` and `gdpr-data-retention` check a site or codebase against published law and regulator guidance. They help you find problems; they don't replace a lawyer.

## The skills

| Skill | What it does | Ask it |
|---|---|---|
| [cookie-consent-audit](skills/cookie-consent-audit/SKILL.md) | Loads the site with a fresh browser profile. It lists every cookie, storage item and third-party request before any interaction, then tests the banner: reject vs accept, pre-ticked boxes, granularity, withdrawal, proof of consent, and GPC / "Do Not Sell or Share". Covers EU (ePrivacy, GDPR, EDPB, CNIL, ICO, Traficom) and US (CCPA/CPRA plus state laws). | "Is our cookie banner compliant for the EU and US?" |
| [gdpr-data-retention](skills/gdpr-data-retention/SKILL.md) | Inventories personal data across the schema, code, logs, backups and processors. Checks each item for purpose, lawful basis, retention period, automatic deletion and erasure path. Respects legal minimums such as bookkeeping. | "How long may we keep this data, and does account deletion really delete?" |
| [agent-usability-test](skills/agent-usability-test/SKILL.md) | The agent tests the app itself as five users: power user, keyboard-only, low-confidence, screen-reader/low-vision, and mobile on a slow connection. One subagent per persona, run in parallel. Findings are merged and ranked by severity and by how many personas hit them, citing WCAG 2.2 and Nielsen. Add your own personas from `references/personas/TEMPLATE.md`. | "Usability-test our checkout like real customers would" |
| [conversion-audit](skills/conversion-audit/SKILL.md) | Finds the main money flows, then runs five fully independent reviewers over them. Ranks leaks by how many reviewers found each one: 1 reviewer = low confidence. Cites Baymard, Fogg, Cialdini and Core Web Vitals, and never suggests dark patterns. | "We get traffic but nobody buys – where do we lose them?" |
| [token-sweep](skills/token-sweep/SKILL.md) | For spare tokens before your limit resets. Runs the relevant audits above in parallel and scans for bugs, vulnerable or outdated dependencies, missing tests and docs gaps. Fixes the small safe ones on a new local branch and never pushes. | "I've got tokens left tonight – sweep this repo" |

Shared rules:
- Every finding names its principle and source, kept in that skill's `references/`, with an as-of date.
- Output leads with a score and then lists failures only.
- The skills use whatever browser tool your agent has, and fall back to reading code and say so.
- They are read-only unless you ask for fixes, and they never push or deploy.

## Example report

From `cookie-consent-audit` on the planted-issue fixture (abridged, real eval output):

```
# Cookie consent audit – Brew Barn (local site) – 2026-11-12
Passed 2 of 16 checks · How tested: code-only review · Scope: EU + US
Not legal advice.

Before consent (every page): 2 cookies (_ga, _fbp), 1 localStorage item (_hjSessionUser_3141592),
3 third-party scripts (googletagmanager.com, connect.facebook.net, static.hotjar.com).

| # | Failed check | Severity | Evidence | Fix | Rule (source) |
|---|---|---|---|---|---|
| 1 | CC-01 Trackers before consent | Critical | tracking.js loads GA4, Meta Pixel, Hotjar on load | Load no tag until opt-in | ePrivacy Art. 5(3); EDPB 2/2023 |
| 3 | CC-03 Reject as easy as Accept | Critical | First layer has only "Accept all" and "Settings" | Add an equally prominent "Reject all" | GDPR Art. 7; EDPB Taskforce; CNIL |
| 5 | CC-14 GPC honoured | Critical | No Sec-GPC / navigator.globalPrivacyControl handling; Meta fires | Detect GPC, suppress sale/share tags | CCPA regs §7025 |
| 7 | CC-04 No pre-ticked boxes | High | Analytics and Marketing checked by default | Default all to off | GDPR Recital 32; Planet49 |
| 8 | CC-09 Withdrawal as easy as consent | High | No footer link to reopen the banner | Add a persistent "Cookie settings" link | GDPR Art. 7(3) |
| 13 | CC-10 Proof of consent | Medium | Only cookies_ok=1 – no timestamp, version or choices | Store choices + timestamp + version | GDPR Art. 7(1) |
...
```

## Evals

Each skill has eval cases in `skills/<name>/evals/`, written in [skill-creator](https://github.com/anthropics/skills)'s case-folder format: `prompt.md`, `case.yaml` and one grader file per assertion. The cases run against small static sites in `evals/fixtures/`:

- **`broken-shop`** has planted problems: trackers before consent, Reject hidden in settings, soft-delete-only "erasure", a keyboard-unusable checkout, and surprise shipping and fees at payment. The answer key, [`evals/fixtures/PLANTED.md`](evals/fixtures/PLANTED.md), is never shown to the agent.
- **`clean-shop`** is the clean control. A skill must not report false issues on it.
- **`sweep-project`** is a tiny Node repo for token-sweep, with a pricing bug, a vulnerable lodash, no tests and GA loaded before consent.

`evals/trigger-evals.json` in each skill holds 12 prompts (6 that should trigger the skill, 6 near misses that shouldn't), for tuning descriptions with skill-creator.

### Baselines

The tables below give one run per case. Both arms use the same model (Claude Sonnet 5.5) and an LLM judge. Pass rate is the share of graders passed. Tokens exclude cache reads.

<!-- BASELINES:START -->
| Skill | With skill | Without skill | Time (s) | Tokens | Cost (USD) |
|---|---|---|---|---|---|
| agent-usability-test | 100% | 42% | 1159 | 5,850,751 | 3.57 |
| conversion-audit | 85% | 69% | 450 | 1,517,431 | 2.0 |
| cookie-consent-audit | 93% | 73% | 231 | 61,591 | 0.37 |
| gdpr-data-retention | 87% | 73% | 145 | 72,698 | 0.48 |
| token-sweep | 100% | 67% | 70 | 32,363 | 0.22 |
<!-- BASELINES:END -->

### Run them yourself

You need Claude Code 2.1.269 or later, plus `bubblewrap` and `socat` on Linux (the eval sandbox needs them) and Playwright with Chromium:

```bash
scripts/run-evals.sh cookie-consent-audit --runs 1 --model claude-sonnet-5-5
```

```bash
python3 scripts/summarize-evals.py cookie-consent-audit --gate
```

### CI

`.github/workflows/evals.yml` runs on every pull request:
1. `validate` checks frontmatter, referenced files and case structure. It needs no API key.
2. `select` picks only the skills whose files changed. A change to shared fixtures or scripts selects all skills.
3. `eval` serves the fixtures, runs each selected skill headless with `claude plugin eval`, and grades the assertions. The PR fails if the pass rate drops more than 10 points below `baseline.json`, or if a clean-control case newly fails a grader.

**Setup:** CI runs on a Claude subscription. Run `claude setup-token` locally (needs a Pro or Max plan) and save the token as the repository secret `CLAUDE_CODE_OAUTH_TOKEN` (Settings → Secrets and variables → Actions). An `ANTHROPIC_API_KEY` secret works instead if you'd rather pay per token. Eval runs count against your plan's usage limits (a full run of all five skills is roughly what $7 of API usage would buy), so CI evaluates skills one at a time and only those that changed. Forked PRs don't receive secrets; a maintainer can re-run the evals with *Run workflow*.

## Repo layout

```
skills/<name>/SKILL.md        when to use + the workflow (short)
skills/<name>/references/     theory, checklists, legal sources, personas (loaded on demand)
skills/<name>/scripts/        deterministic helpers (cookie scanner)
skills/<name>/evals/          eval cases, trigger evals, baseline.json
evals/fixtures/               shared test sites + answer key
scripts/                      eval runner, CI helpers, validator
DECISIONS.md                  every choice made without the owner, with reasoning
```

## Licence

MIT – see [LICENSE](LICENSE).
