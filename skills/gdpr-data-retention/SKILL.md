---
name: gdpr-data-retention
description: Reviews how an app stores personal data and how long it keeps it - inventories personal data in code, database schemas, logs, backups and third-party services, then checks each item for purpose, lawful basis, retention period, automatic deletion and an erasure path (GDPR Art. 5, 6, 17, 30), respecting legal minimums such as bookkeeping retention. Use whenever the user asks about GDPR compliance of their data model, data retention policy, "how long should we keep X", right to be forgotten / account deletion, data minimisation, records of processing, or a privacy review of a codebase. Not legal advice.
license: MIT
metadata:
  version: "1.0.0"
---

# gdpr-data-retention

Find every place personal data lives, then check that each has a reason to exist, a time limit, and a way to be deleted. Report only; change code only if the user asks afterwards.

> Not legal advice. This is a technical review against the GDPR text and regulator guidance; confirm retention periods and lawful bases with a lawyer.

## 1. Inventory personal data

Search the codebase; don't rely on docs alone. Personal data = anything relating to an identifiable person (Art. 4(1)): names, emails, phones, addresses, IPs, device/user-agent, user IDs, DOB, free text, payment refs, location.

Look in:
- **Schema / models / migrations**: tables and columns holding personal data; `deleted_at`, `created_at`, foreign keys and `ON DELETE` behaviour.
- **Code paths that write data**: signup, checkout, contact forms, login tracking, "capture email on blur", analytics events.
- **Logs**: what loggers write (request bodies, emails, IPs) and where logs go (files, S3, Datadog, Sentry).
- **Backups and storage**: backup jobs, buckets, lifecycle rules (`expiration`), DB backup retention.
- **Third parties / processors**: email (Mailchimp, Brevo), payments (Stripe), analytics (GA4 retention setting), session replay, CRM, error tracking.
- **Docs**: privacy notice, records of processing (Art. 30), retention policy.

`references/checklist.md` lists code patterns to grep for.

## 2. Check each item

For every data item run the checks in `references/checklist.md` (IDs DR-xx): purpose, lawful basis, retention period, automatic deletion that actually runs and covers it, erasure path (including processors, logs, backups – soft delete alone is not erasure), minimisation, special-category data, and whether the privacy notice states the period.

Recommended periods come from `references/retention-guidance.md` (regulator guidance, e.g. CNIL référentiels, ICO). **Legal minimums override deletion**: never recommend deleting bookkeeping records, invoices or AML data before the period in `references/legal-minimums.md` (e.g. Finland: accounting books 10 years, vouchers 6 years). For those, recommend restricting and unlinking on an erasure request (Art. 17(3)(b)), then deleting when the minimum ends. Where the jurisdiction is unknown, say which country you assumed.

Where sources disagree, follow the regulator; note the disagreement.

## 3. Report

The first line after the title is the score with exact counts ("Passed 18 of 22 checks", never "about").

```
# Data retention review – <app> – <date>
Passed X of Y checks · N data items · Jurisdiction assumed: <country>
Not legal advice.

| Data (where) | Current period | Recommended | Fix | Why (source) |
|---|---|---|---|---|
| users (soft-deleted rows) | Forever | Purge within 30 days of deletion request | Hard-delete job + Mailchimp delete | Art. 17(1); Art. 5(1)(e) |
| orders / invoices | Forever | 6 yrs after FY end (vouchers), then delete | Retention job; unlink on erasure | Accounting Act 2:10; Art. 17(3)(b) |
...

Other failures
| # | Failed check | Severity | Fix | Why (source) |
...
```

Y = checks × data items that apply. Only failing items in the table; one line per cell. A clean app gets the score line and "No failures found", plus the table only if the user asks for the full inventory.

Issues outside this skill's scope (e.g. security, performance, other laws): at most one line at the end naming them and the skill or specialist that covers them. Don't analyse them here.

## References (load when needed)
- `references/checklist.md` – DR-xx checks, code patterns to search, typical periods.
- `references/gdpr-articles.md` – the articles behind each check.
- `references/retention-guidance.md` – regulator guidance on setting periods.
- `references/legal-minimums.md` – bookkeeping, tax, AML minimums by country.
