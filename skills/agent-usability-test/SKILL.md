---
name: agent-usability-test
description: The agent usability-tests a web app itself by role-playing realistic users (power user, keyboard-only, low-confidence non-technical, screen-reader/low-vision, mobile on a slow connection, plus any custom personas) who each try to complete the main tasks, then reports merged, ranked findings tied to Nielsen heuristics and WCAG 2.2 AA. Use whenever the user wants a usability test, UX review, accessibility check, "can people actually use this", "test my app like a real user", persona walkthrough, keyboard or screen-reader testing, or mobile testing of a site or local app — not for planning a test with human participants.
license: MIT
metadata:
  version: "1.1.0"
---

# agent-usability-test

You run the usability test yourself: each persona tries to complete the same tasks in a real browser, and you report what blocked or slowed them, with the principle behind each finding. Report only; change code only if the user asks afterwards, and never push or deploy.

## 1. Set up

1. **Target**: a URL, or a local project you serve (e.g. `python3 -m http.server 8000`, or the project's dev script).
2. **Main tasks** (2–4): what users come to do, from the nav, CTAs and forms (e.g. "find a product and buy it", "sign up", "change your email"). State them as goals, not click paths.
3. **Personas**: every file in `references/personas/` except `TEMPLATE.md` (five ship by default; users may add their own from the template). If the user names a subset, use that.
4. **Environment notes**, written once and given word for word to every persona:
   - which environment this is;
   - the test accounts and test cards to use;
   - what may be submitted;
   - the site's language and locale (e.g. `cs-CZ`);
   - known product constraints (e.g. "brand colours fixed", "no visible labels on the register form").

   Take them from the user's request. If they're missing for a live site and you can ask, ask once; if you can't, assume nothing may be submitted.
5. **Browser**: any browser tool the agent has (Playwright MCP, Claude in Chrome, built-in browser). For Playwright scripts, load it through `scripts/pw.cjs` in this skill's folder (`const { launch } = require("<skill-dir>/scripts/pw.cjs")`); it fixes read-only temp dirs and hidden browser installs that break launches in sandboxes. Check first with `node <skill-dir>/scripts/pw.cjs --check`. Only if no browser works, do a code-only review and say so at the top of the report; keyboard and screen-reader findings then come from markup (e.g. `<div onclick>` without `tabindex`/`role`, inputs without labels), and mark rendering-dependent findings (contrast, reflow, overlap) "unverified" with severity at most 2.

If you need a local server, start it once, before the smoke pass, as a plain shell background process (e.g. `nohup python3 -m http.server 8000 >/dev/null 2>&1 &`), not with a background-task tool. Leave it running until every persona has finished. Check it still answers (`curl -sI <url>`) right before you spawn the personas, and stop it only just before writing the report. Some sandboxes kill background processes when the command that started them ends. If the server is gone by your next command, a static site can be opened straight from disk with `file://` URLs, which needs no server. Otherwise each script has to start the server in the same command it runs in. Tell the personas which of these to use. The report must be your last message.

## 2. Safety and a smoke pass

Tasks like sign-up or checkout create real records:
- Never enter data or submit forms on a production site. Use test accounts, test cards and throwaway addresses only on test or staging environments, or a local copy you serve yourself.
- If a page on a test environment links to production (payment, login, the live site), don't follow it to submit anything there. Record it under Environment.
- Otherwise go up to the final submit, test that page, and stop.
- Every persona lists the records it created (accounts, orders, bookings), so they can be cleaned up.

Then do **one fast pass of every task yourself** against the running server, without personas or throttling. It finds blockers that would stop every persona, such as a server error on submit or a dead link. You don't report usability findings from it. Add each blocker and its workaround (deep link, alternative path, "skip this step") to the environment notes before the personas start. Five long runs shouldn't each rediscover the same bug.

Work folders and the smoke pass are aids, not gates. Give the smoke pass about two minutes; if it can't run or hangs, note that and start the personas anyway. If you can't create work folders (some sandboxes make every path read-only to shell commands), skip them. Never fall back to a code-only review because of either: only a browser that won't launch justifies that.

## 3. Run one tester per persona

If you have a subagent tool (Agent/Task), you **must** spawn one subagent per persona, all in one turn, in the foreground: wait for all of them before merging, and don't start them as background tasks. Don't role-play the personas yourself when subagents exist: separate contexts are what keep each persona's experience independent. Give each only: the target URL (start the server first so they all share it; each uses its own fresh browser context), the task list, its persona file path, `references/wcag-22-aa.md`, `references/heuristics.md`, the path to `scripts/pw.cjs`, the environment notes, its own work folder if you can create one (e.g. `./ux-work/keyboard/`), and this brief:

> You are this persona; follow its constraints strictly (e.g. keyboard-only never clicks; screen-reader uses only the accessibility tree; mobile uses the given viewport and throttling). Set the browser locale to the site's language, and judge wording in that language. Follow the environment notes and never submit what they don't allow. If you have a work folder, keep scripts and screenshots only there; if you can't write files, keep evidence as DOM excerpts in your report and carry on. Use the target exactly as given (an http URL, or `file://` paths for a static site). If it doesn't answer, say so, then review the code for your persona's concerns and mark those findings "unverified". Aim to finish within about 10 minutes.
>
> Try every task and report each one as completed, completed with difficulty, failed, "blocked by task N" (an earlier task you failed makes it impossible), or "not attempted" (only for an environment blocker named in the notes).
>
> If you're blocked in character, record the failure, then finish the remaining steps as a plain tester (any input method, workaround allowed). Mark findings from that point "after block".
>
> For each problem give: page, element, what happened, the WCAG criterion or heuristic it breaks, and evidence: a short DOM excerpt or a screenshot path in your folder.
>
> End with the records you created. Report only, under 40 lines.

Only if you cannot spawn subagents, run the personas one after another yourself, resetting the browser state (new context, no cookies) between personas.

Personas stay in character: a low-confidence user really does give up after two failed tries, and a keyboard-only user really cannot proceed past a control that won't take focus. That is the finding, and the task counts as failed. Continuing as a plain tester afterwards only makes sure the later steps still get tested.

## 4. Check, merge and rank

1. **Check before you trust.** Personas misread products: a "family box" taste profile isn't a box size. Drop any finding without evidence. Re-check every severity 3–4 finding yourself in the browser or the DOM, and drop or downgrade the ones you can't reproduce.
2. **Sort out environment problems.** Staging linking to production, a flaky preview server or missing test data aren't usability findings; put them in the Environment line. Before blaming the product for a failure, check it against a known-good environment if there is one.
3. Same element + same principle = one finding; list every persona that hit it.
4. Severity on Nielsen's 0–4 scale (`references/severity-and-merging.md`). A persona blocked on a core task = 4; a non-blocking WCAG A/AA failure = 2–3 depending on impact. Findings you could not observe in a browser (code-only) are at most 2 unless the markup proves a blocker.
5. Rank by severity, then by number of personas affected. The table must be in that order, and every row lists the personas it affected.
6. Every finding names its principle: a WCAG 2.2 criterion (number + name), a Nielsen heuristic, Fitts's/Hick's law, or a pattern from `references/patterns.md`. No principle, no finding.
7. **Fixes respect the stated product constraints.** If the only real fix breaks a constraint, still report the finding. Mark the fix "needs design change". A WCAG failure stays a failure even when the brand colours are fixed.

Score: Y = tasks × personas, minus task runs "not attempted" because of an **environment** blocker (list those in the task results). A task "blocked by task N" counts as failed: that user didn't get there. A persona with several modes counts once. X = task runs completed without a blocker.

## 5. Report

The first line after the title is the score with exact counts ("Passed 18 of 22 checks", never "about").

```
# Usability test – <app> – <date>
Passed X of Y task runs · N findings · Personas: power, keyboard, low-confidence, screen-reader/low-vision, mobile-slow
How tested: <browser tool | code-only>

| # | Finding (where) | Sev | Personas | Fix | Principle |
|---|---|---|---|---|---|
| 1 | Date picker opens only on mouse click (booking) [keyboard/datepicker.png] | 4 | keyboard, screen-reader | Make the trigger a <button>; support arrow keys in the grid | WCAG 2.1.1 Keyboard (A) |
...
Task results (every persona × task): power ✓ book, ✓ change email · keyboard ✗ book, blocked by book: pay · low-confidence ✓ book, ✗ change email · screen-reader ✓ book, ✓ change email · mobile ✓ book (6 s to first paint), ✓ change email
Copy: "Proceed" (cart) is vague · EN string "Loading…" on a Czech page (checkout)
Environment: "Pay" on staging links to the production payment page (not followed)
Test data created: 2 accounts (ux-test+1@example.com, ux-test+2@example.com), 1 order #S-1042 on staging
```

One line per cell; put an evidence path in brackets at the end of the Finding cell. No essay. The Task results line names every persona and gives a status for each of its tasks (✓, ✗, "blocked by <task>", "not attempted"); it is the only place passes are listed. If every persona completed every task, say so in words as well: "All 5 personas completed all tasks." Wording problems that cost a persona a task go in the table. Minor copy issues go on the one Copy line. Always end with the Environment and Test data created lines, writing "none" if empty.

Issues outside this skill's scope (e.g. security, performance, other laws): at most one line at the end naming them and the skill or specialist that covers them. Don't analyse them here.

## References (load when needed)
- `references/personas/*.md` – the testers; `TEMPLATE.md` to add one.
- `references/wcag-22-aa.md` – criteria grouped by persona, with how to test each.
- `references/heuristics.md` – Nielsen's 10, severity scale, Fitts's and Hick's laws.
- `references/patterns.md` – form, navigation, mobile and performance patterns.
- `references/severity-and-merging.md` – ranking and de-duplication rules.
