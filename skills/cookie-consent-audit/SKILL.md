---
name: cookie-consent-audit
description: Audits a website's cookies, local storage, trackers and consent banner against EU rules (ePrivacy Art. 5(3), GDPR consent, EDPB/CNIL/ICO/Traficom guidance) and US opt-out rules (CCPA/CPRA "Do Not Sell or Share", Global Privacy Control, state laws). Use whenever the user asks if their cookie banner or consent setup is compliant, GDPR/ePrivacy cookie checks, CMP review, "are we tracking before consent", GPC support, Google Analytics / Meta Pixel consent questions, or a privacy check of a site before launch. Not legal advice.
license: MIT
metadata:
  version: "1.0.0"
---

# cookie-consent-audit

Load the site as a brand-new visitor, inventory everything it stores and sends before any interaction, then test the banner. Every failure cites the rule it breaks. Report only; change code only if the user asks afterwards, and never push or deploy.

> Not legal advice. This is a technical check against published law and regulator guidance; a lawyer should confirm conclusions for your situation.

## 1. Inventory before interaction (fresh profile)

Use a clean browser context (no cookies, no storage). Prefer the bundled script `scripts/scan.cjs` (path relative to this skill's folder; pass its absolute path to `node`), which does exactly this:

```bash
node <skill-dir>/scripts/scan.cjs <url>                          # before any click
node <skill-dir>/scripts/scan.cjs <url> --click "Reject all"     # before + after rejecting (reloads)
node <skill-dir>/scripts/scan.cjs <url> --click "Accept all"     # confirm tags load only after accept
node <skill-dir>/scripts/scan.cjs <url> --gpc                    # US: Global Privacy Control on
```

Run the script first rather than checking for Playwright yourself: it finds global installs and sandboxed browser paths on its own, and prints `playwright-not-installed` only if it really can't. Add `--block-third-party` when offline: requests are still recorded. If the script can't run, use any other browser tool (Playwright MCP, Claude in Chrome, built-in browser) with a fresh profile and read cookies, `localStorage`, `sessionStorage` and network requests yourself. If no browser works, read the code (tag scripts in `<head>`, tag managers, CMP config, `document.cookie` writes) and state "code-only review" in the report.

Classify every item with `references/tracker-domains.md`: strictly necessary (session, cart, CSRF, load balancer, the consent cookie itself) vs. non-essential (analytics, ads, session replay, A/B testing, social pixels). Local storage and pixels count the same as cookies (EDPB Guidelines 2/2023).

If you start a local server, run it as a plain shell background process in the same command (e.g. `python3 -m http.server 8000 >/dev/null 2>&1 &`), not with a background-task tool, and stop it before writing the report. The report must be your last message.

## 2. Test the banner and consent flow

Run every check in `references/checklist.md` (IDs CC-xx). Interact like a visitor: look at the first layer, try to reject, open settings, look for a way to change your mind later, reload. Determine what is stored as proof of consent (timestamp, policy version, choices). For US scope, test with GPC on and look for a "Do Not Sell or Share" link when ad or cross-context tracking exists.

Apply EU checks to every site; apply US checks when the site targets US visitors or uses ad/cross-context tracking. If unsure, run both and say which applies.

Where sources disagree, follow the regulator's guidance (`references/eu-rules.md`, `references/us-rules.md` note the disagreements).

## 3. Report

The first line after the title is the score with exact counts ("Passed 18 of 22 checks", never "about").

```
# Cookie consent audit – <site> – <date>
Passed X of Y checks · How tested: <scan.cjs | browser tool | code-only> · Scope: EU + US
Not legal advice.

Before consent: 1 cookie (_uetsid), 0 storage items, 2 third-party requests (bat.bing.com, snap.licdn.com)

| # | Failed check | Severity | Evidence | Fix | Rule (source) |
|---|---|---|---|---|---|
| 1 | CC-01 Trackers before consent | Critical | Microsoft UET and LinkedIn Insight load on first page view | Load tags only after opt-in (gate in CMP / consent mode) | ePrivacy Art. 5(3); EDPB 2/2023 |
...
```

Y = checks that apply. Show failures only, most severe first, one line per cell. A clean site gets the score line, the inventory line and "No failures found."

Issues outside this skill's scope (e.g. security, performance, other laws): at most one line at the end naming them and the skill or specialist that covers them. Don't analyse them here.

## References (load when needed)
- `references/checklist.md` – all checks: how to test, severity, legal source.
- `references/eu-rules.md` – ePrivacy, GDPR, CJEU, EDPB, CNIL, ICO, Traficom.
- `references/us-rules.md` – CCPA/CPRA, GPC, state laws table.
- `references/tracker-domains.md` – classify cookies and domains.
- `scripts/scan.cjs` – fresh-profile inventory (Playwright).
