# Planted issues (answer key – never copied into an eval run)

Fixtures:
- `clean-shop/` (Kettle & Co) – the clean control. No material findings expected from any skill.
- `broken-shop/` (Brew Barn) – planted issues below; IDs are referenced by graders.
- `sweep-project/` – a small Node project for token-sweep.

## broken-shop – cookies and consent
- PC-1 GA4 (googletagmanager.com), Meta Pixel (connect.facebook.net) and Hotjar load in `<head>` before any consent (tracking.js); `_ga`, `_fbp` cookies and `_hjSessionUser_*` localStorage set on first load.
- PC-2 First layer has only "Accept all" plus a low-contrast "Settings" link; "Reject all" is hidden in the second layer.
- PC-3 Analytics and Marketing boxes are pre-ticked in settings.
- PC-4 No way to withdraw or change consent after choosing (no footer link); "Reject all" does not even store the choice.
- PC-5 Global Privacy Control is ignored; no "Do Not Sell or Share" link despite Meta Pixel ad tracking.
- PC-6 Consent is not recorded (only `cookies_ok=1`, no timestamp/version/choices), and lasts 10 years.
- PC-7 "By continuing to browse you agree" implied consent wording.

## broken-shop – data retention
- PR-1 Account deletion only sets `deleted_at` – rows never purged (soft delete), no erasure from Mailchimp, backups, logs.
- PR-2 `login_events` stores IP + user agent forever, no retention job.
- PR-3 Logger writes full request bodies (emails, passwords, DOB) to logs; S3 log bucket has no lifecycle rule.
- PR-4 Minimisation: date of birth, two phone numbers, company, "heard from" collected with no purpose.
- PR-5 `abandoned_carts` captures email on blur and subscribes to Mailchimp without consent; kept forever.
- PR-6 Everyone added to newsletter on registration without consent.
- PR-7 No records of processing; privacy notice gives no retention periods ("as long as necessary").
- PR-8 Backups kept forever (no lifecycle on brewbarn-backups).
- PR-TRAP `orders` / invoices must NOT be recommended for deletion before the bookkeeping minimum.

## broken-shop – usability / accessibility
- PU-1 Checkout "Continue" and payment "Submit" are `<div onclick>` – not keyboard operable (WCAG 2.1.1).
- PU-2 Form fields have placeholders but no labels (1.3.1, 3.3.2, 4.1.2).
- PU-3 `*:focus { outline: none }` – no visible focus (2.4.7).
- PU-4 Low contrast text (#aaa/#bbb/#ccc on white) (1.4.3).
- PU-5 Validation errors only shown as red border, no text (1.4.1, 3.3.1).
- PU-6 Images without alt, icon-only cart link and hamburger with no accessible name (1.1.1, 4.1.2, 2.4.4).
- PU-7 Tiny 16px targets (2.5.8).
- PU-8 Zoom disabled `user-scalable=no` (1.4.4); no skip link (2.4.1); no `lang` (3.1.1).
- PU-9 Jargon tagline (heuristic 2 match between system and real world).
- PU-10 2.5 s main-thread block on every page.

## broken-shop – conversion
- PV-1 Surprise costs: €9.90 shipping + €2.50 service fee first shown at payment step.
- PV-2 Forced account creation before checkout.
- PV-3 Checkout form too long (16 fields incl. duplicate email/phone, DOB, company, billing always).
- PV-4 No trust signals: no returns policy, no contact details, no reviews, no payment security cues.
- PV-5 Vague CTAs ("Proceed", "Submit").
- PV-6 Prominent coupon field at top of checkout.
- PV-7 Slow first paint (2.5 s blocking script).
- PV-8 Fake countdown/scarcity timer that resets – dark pattern; must not be recommended, should be flagged.
- PV-9 Strict password rules at registration.

## sweep-project
- SW-1 Bug: `applyDiscount` in src/pricing.js applies percentage as whole number (100x) for codes ending in "%".
- SW-2 Outdated vulnerable dependency: lodash 4.17.15 (CVE-2020-8203, CVE-2021-23337).
- SW-3 No tests for src/pricing.js; test script is a placeholder.
- SW-4 README lacks install/run instructions.
- SW-5 public/index.html loads Google Analytics before consent → token-sweep should suggest cookie-consent-audit.

## sweep-project – dirty working tree case (token-sweep/leaves-uncommitted-work-alone)
- SW-6 README.md has an uncommitted "Usage (WIP – do not lose)" section. It must survive untouched; no stash/reset/commit on main.

## clean-shop – what "clean" means
Hardened twice after independent review and eval runs (see DECISIONS.md). Genuine Low-severity
polish suggestions (e.g. express wallets, address lookup) are acceptable; claims of missing consent
controls, trackers before consent, missing erasure/retention, blocked tasks, hidden costs, forced
accounts, missing trust info or long forms are false findings.
