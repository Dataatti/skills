---
name: agent-usability-test
description: The agent usability-tests a web app itself by role-playing realistic users (power user, keyboard-only, low-confidence non-technical, screen-reader/low-vision, mobile on a slow connection, plus any custom personas) who each try to complete the main tasks, then reports merged, ranked findings tied to Nielsen heuristics and WCAG 2.2 AA. Use whenever the user wants a usability test, UX review, accessibility check, "can people actually use this", "test my app like a real user", persona walkthrough, keyboard or screen-reader testing, or mobile testing of a site or local app — not for planning a test with human participants.
license: MIT
metadata:
  version: "1.0.0"
---

# agent-usability-test

You run the usability test yourself: each persona tries to complete the same tasks in a real browser, and you report what blocked or slowed them, with the principle behind each finding. Report only; change code only if the user asks afterwards, and never push or deploy.

## 1. Set up

1. **Target**: a URL, or a local project you serve (e.g. `python3 -m http.server 8000`, or the project's dev script).
2. **Main tasks** (2–4): what users come to do, from the nav, CTAs and forms (e.g. "find a product and buy it", "sign up", "change your email"). State them as goals, not click paths.
3. **Personas**: every file in `references/personas/` except `TEMPLATE.md` (five ship by default; users may add their own from the template). If the user names a subset, use that.
4. **Browser**: any browser tool the agent has (Playwright MCP, Claude in Chrome, built-in browser). For Playwright scripts, load it through `scripts/pw.cjs` in this skill's folder (`const { launch } = require("<skill-dir>/scripts/pw.cjs")`); it fixes read-only temp dirs and hidden browser installs that break launches in sandboxes. Check first with `node <skill-dir>/scripts/pw.cjs --check`. Only if no browser works, do a code-only review and say so at the top of the report; keyboard and screen-reader findings then come from markup (e.g. `<div onclick>` without `tabindex`/`role`, inputs without labels), and mark rendering-dependent findings (contrast, reflow, overlap) "unverified" with severity at most 2.

If you start a local server, run it as a plain shell background process in the same command (e.g. `python3 -m http.server 8000 >/dev/null 2>&1 &`), not with a background-task tool, and stop it before writing the report. The report must be your last message.

## 2. Run one tester per persona

If you have a subagent tool (Agent/Task), you **must** spawn one subagent per persona, all in one turn. Don't role-play the personas yourself when subagents exist: separate contexts are what keep each persona's experience independent. Give each only: the target URL (start the server first so they all share it; each uses its own fresh browser context), the task list, its persona file path, `references/wcag-22-aa.md`, `references/heuristics.md`, the path to `scripts/pw.cjs`, and this brief:

> You are this persona; follow its constraints strictly (e.g. keyboard-only never clicks; screen-reader uses only the accessibility tree; mobile uses the given viewport and throttling). Try every task. For each task report: completed / completed with difficulty / failed, and each problem with the page, element, what happened, and the WCAG criterion or heuristic it breaks. Report only, under 40 lines.

Only if you cannot spawn subagents, run the personas one after another yourself, resetting the browser state (new context, no cookies) between personas.

Personas stay in character: a low-confidence user really does give up after two failed tries, and a keyboard-only user really cannot proceed past a control that won't take focus. That is the finding.

## 3. Merge and rank

1. Same element + same principle = one finding; list every persona that hit it.
2. Severity on Nielsen's 0–4 scale (`references/severity-and-merging.md`). A persona blocked on a core task = 4; a non-blocking WCAG A/AA failure = 2–3 depending on impact. Findings you could not observe in a browser (code-only) are at most 2 unless the markup proves a blocker.
3. Rank by severity, then by number of personas affected. The table must be in that order, and every row lists the personas it affected.
4. Every finding names its principle: a WCAG 2.2 criterion (number + name), a Nielsen heuristic, Fitts's/Hick's law, or a pattern from `references/patterns.md`. No principle, no finding.

Score: Y = tasks × personas attempted (a persona with several modes counts once); X = attempts completed without a blocker.

## 4. Report

The first line after the title is the score with exact counts ("Passed 18 of 22 checks", never "about").

```
# Usability test – <app> – <date>
Passed X of Y task runs · N findings · Personas: power, keyboard, low-confidence, screen-reader/low-vision, mobile-slow
How tested: <browser tool | code-only>

| # | Finding (where) | Sev | Personas | Fix | Principle |
|---|---|---|---|---|---|
| 1 | Date picker opens only on mouse click (booking) | 4 | keyboard, screen-reader | Make the trigger a <button>; support arrow keys in the grid | WCAG 2.1.1 Keyboard (A) |
...
Task results: keyboard ✗ book a table · low-confidence ✗ change email · mobile ✓ (slow: 6 s to first paint)
```

One line per cell. No essay. Mention what passed only in the task results line.

Issues outside this skill's scope (e.g. security, performance, other laws): at most one line at the end naming them and the skill or specialist that covers them. Don't analyse them here.

## References (load when needed)
- `references/personas/*.md` – the testers; `TEMPLATE.md` to add one.
- `references/wcag-22-aa.md` – criteria grouped by persona, with how to test each.
- `references/heuristics.md` – Nielsen's 10, severity scale, Fitts's and Hick's laws.
- `references/patterns.md` – form, navigation, mobile and performance patterns.
- `references/severity-and-merging.md` – ranking and de-duplication rules.
