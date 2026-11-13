---
name: conversion-audit
description: Finds conversion leaks in a site's or app's main user flows (browse → product → cart → checkout, signup, lead or demo forms, pricing → trial) by running five independent reviewer agents and ranking issues by how many found them. Use whenever the user asks why visitors don't buy or sign up, wants a CRO / conversion audit, checkout or funnel review, cart-abandonment or drop-off diagnosis, landing-page or pricing-page critique, or "how do I get more sales/signups from this site", even if they don't say "conversion".
license: MIT
metadata:
  version: "1.1.0"
---

# conversion-audit

Find where the main flows lose people, and back every finding with established research. Report only; change code only if the user asks afterwards, and never push or deploy.

## 1. Identify the main flows

From the site (or code: routes, nav, CTAs, forms, payment integration), list the 1–3 flows that make money or leads, e.g. *home → product → cart → checkout → confirmation* or *pricing → signup → onboarding*. Write each as a numbered list of pages/steps. If unclear, pick the flow that ends in payment or a submitted lead form.

## 2. Pick how to browse

Use whatever browser tool exists (Playwright MCP, Claude in Chrome, built-in browser). For Playwright scripts, load it through `scripts/pw.cjs` in this skill's folder (`const { launch } = require("<skill-dir>/scripts/pw.cjs")`; check with `node <skill-dir>/scripts/pw.cjs --check`); it fixes read-only temp dirs and hidden browser installs in sandboxes. For a local project, serve it first (e.g. `python3 -m http.server`) and give reviewers the URL. If no browser is possible, review the code instead and say so in the report ("Code-only review: speed, layout and mobile were inferred, not observed").

If you start a local server, run it as a plain shell background process in the same command (e.g. `python3 -m http.server 8000 >/dev/null 2>&1 &`), not with a background-task tool, and stop it before writing the report. The report must be your last message.

## 3. Safe submission

Walking a checkout means filling in forms, so set the limits before anyone starts:
- Never place a real order, make a real payment or create real accounts on a production site. Use test cards, test accounts and throwaway sign-up addresses only when the user provides them, the site is clearly in test mode (e.g. a Stripe test key), or it is a local copy you serve yourself.
- Without that, go up to the final submit or pay button, audit that page, and stop there. Mark later steps (confirmation, emails) "not submitted".
- If a staging site links into production (payment provider, login, account pages), don't submit anything on the production side.

Write down **environment notes**: base URL, test card or test account, what may and may not be submitted, and the market (country and language). Take them from the user's request; if they're missing for a live site and you can ask, ask once. If you can't ask, assume nothing may be submitted.

## 4. Run five independent reviewers

Run **five reviewers with no shared context**. This is the expensive part: on a real checkout each reviewer can take 10–30 minutes, and the five together use several hundred thousand to a few million tokens. Tell the user before starting on a large site.

Independence is the point: agreement between agents that did not see each other's notes is the confidence signal, so never pass one reviewer's findings to another.

- **With subagents** (Agent/Task tool): spawn five in one turn. Give each the same brief only: the URL or path, the flows from step 1, the environment notes (word for word, the same for all five), the paths to `references/properties.md`, `scripts/pw.cjs` and `scripts/vitals.cjs`, its own empty work folder (e.g. `<scratch>/reviewer-1/` … `reviewer-5/`), and the instruction below. Nothing else. Separate folders matter: reviewers that see each other's scripts or screenshots are no longer independent.
- **Without subagents but with `claude` CLI**: run five separate `claude -p` processes with the same brief, each started in its own work folder.
- **Neither**: do five separate passes yourself, each starting from the flow list only, and mark the report "Reviewers not independent (single agent)".

Reviewer brief:
> Walk these flows as a first-time visitor who wants to complete them. Check every property in references/properties.md that applies. Follow the environment notes and never submit what they don't allow. Work only in your own folder. Set the browser locale and timezone to the site's market (e.g. `locale: "fi-FI", timezoneId: "Europe/Helsinki"`), so native validation messages aren't misread as untranslated. If a step is hard-blocked (server error, broken button), report it, retry at most twice, then reach the remaining steps another way (deep link, code) or mark them "unverified". Report findings only, no fixes to code, one line per finding in exactly this format:
> `step | CV-xx | severity (Critical/High/Medium/Low) | evidence (element text, field count, price shown) | screenshot path or –`
> Then one line listing the CV IDs you checked that passed, by step. Under 40 lines.

## 5. Merge and rank

1. Merge findings that describe the same problem at the same step (same element or same property at the same step = one finding).
2. **Agents** = how many of the five reported it. 4–5 = high confidence, 2–3 = medium, 1 = low confidence (keep it, but label it).
3. **Severity** = the median of the reviewers' ratings (on a tie, the higher). Don't raise it again for checkout or payment; reviewers already did that per properties.md.
4. Rank by agents, then severity. Severity guidance per property is in `references/properties.md`.
5. For each finding, attach the principle and source from `references/properties.md`, `references/principles.md` or `references/common-findings.md` (e.g. "Baymard: extra costs are the #1 abandonment reason, 40%"). No finding without a why and a source: the Why cell names the source itself (Baymard, NN/g, web.dev, Fogg…), not just a CV ID.
6. Check every proposed fix against `references/ethics.md`. Never recommend fake urgency or scarcity, drip pricing, confirmshaming, pre-ticked add-ons or hidden opt-outs. If the site **already uses** one of these, report it as a finding (legal and trust risk), not as a strength.

Score: Y = property × step pairs the reviewers checked. A pair counts as failed when a majority of the reviewers who ran failed it (3 of 5). X = the pairs that didn't fail. A single reviewer's finding stays in the report as low confidence, but doesn't fail a pair on its own.

## 6. Report

The first line after the title is the score with exact counts ("Passed 18 of 22 checks", never "about").

Use this shape, nothing longer:

```
# Conversion audit – <site> – <date>
Passed X of Y checks · N issues (H high-confidence) · Flow: home → product → cart → checkout
How tested: <browser tool | code-only> · 5 independent reviewers

| # | Issue (step) | Severity | Agents | Fix | Why (principle, source) |
|---|---|---|---|---|---|
| 1 | Trial signup asks for a card before showing what's included | High | 5/5 | Show plan contents first; make the card optional for the trial | CV-01 / CV-03 – Fogg B=MAP (ability); Baymard: long or complicated forms (17%) |
...
Low confidence (1 agent): #7, #8
```

Keep each cell to one line. Add a reviewer's screenshot path in brackets at the end of the Issue cell when one exists. No essay, no list of passed checks unless asked.

Issues outside this skill's scope (e.g. security, performance, other laws): at most one line at the end naming them and the skill or specialist that covers them. Don't analyse them here.

## References (load when needed)
- `references/properties.md` – the CV-xx checks, how to test, severity. Give to every reviewer.
- `references/principles.md` – Fogg B=MAP, Cialdini, cognitive load, Hick's law, friction, trust.
- `references/common-findings.md` – most common conversion killers with figures.
- `references/ethics.md` – persuasion vs dark patterns, with the laws that ban them.
- `scripts/pw.cjs` – sandbox-safe Playwright launcher. `scripts/vitals.cjs` – fixed-profile LCP/CLS/load measurement for CV-09.
