# Data retention audit checklist

> **Not legal advice.** Sources checked as of 2026-11-12.
> GDPR text: https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32016R0679 · see `gdpr-articles.md`, `retention-guidance.md`, `legal-minimums.md`.

## Severity guidance
| Severity | Use when |
|---|---|
| **High** | Personal data kept indefinitely with no purge; no working erasure path; special-category data without basis/flag; erasure misses a processor that holds the data; data deleted to avoid an access request; AML/KYC data kept past its legal maximum. |
| **Medium** | Period defined but not enforced for some tables/stores; soft-delete without purge; backups/logs outside the erasure story; privacy notice gives only "as long as necessary"/"statutory periods"; no RoPA. |
| **Low** | Minor over-collection; periods not documented per category but enforced; missing deletion-job monitoring; vague vendor retention settings with short defaults. |
| **Info** | Good practice suggestions (deletion logs, anonymisation review, archive separation). |

Raise severity one level for special-category (Art. 9) or children's data, or large user bases.

## Per data item (run for every table / collection / bucket / third-party store with personal data)

| ID | Check | Look for in code / schema / services | Article(s) |
|---|---|---|---|
| DR-01 | **Documented purpose** | Data inventory, RoPA, schema comments, ADRs. Columns with no traceable use (`grep` for readers of the column) | 5(1)(b), 5(2), 30(1)(b) |
| DR-02 | **Lawful basis** recorded per purpose | Consent tables (`consents`, `marketing_opt_in`) with timestamp + version; contract vs legitimate-interest noted in RoPA | 6(1), 7 |
| DR-03 | **Retention period defined** with start trigger (e.g. "account closure + 3y") | Retention config/constants, policy doc, RoPA 30(1)(f) column | 5(1)(e), 30(1)(f), Recital 39 |
| DR-04 | **Automatic deletion/anonymisation job exists** | cron/scheduler (`pg_cron`, Sidekiq/Celery beat, k8s CronJob, GitHub Actions schedule, Lambda + EventBridge), DB TTL, lifecycle rules | 5(1)(e), 25(2) |
| DR-05 | **Job actually covers the table** | Compare job's table list with all tables holding PII; check join/child tables, audit tables, search indexes (Elastic/Algolia), caches, data warehouse copies, file uploads | 5(1)(e), 5(2) |
| DR-06 | **Job runs and is monitored** | Job logs/metrics, alerting on failure, row counts of records older than the period (`SELECT count(*) WHERE created_at < now() - interval '…'`) | 5(2) |
| DR-07 | **Erasure path for user requests** (self-service or admin) completes within 1 month | `DELETE /account` handler, admin tooling, ticket runbook; verify it removes or anonymises every store from DR-05 | 17, 12(3) |
| DR-08 | **Soft-delete pitfall** | `deleted_at`/`is_deleted`/`archived` flags with no hard purge after a grace period; ORM default scopes hiding rows that still exist | 17, 5(1)(e) |
| DR-09 | **Backups** | Backup retention (RDS automated backups/snapshots, PITR window, pg_dump to S3); documented overwrite cycle; restore procedure re-applies deletions (deletion log) | 17, 32(1)(c); EDPB 01/2022 para 110; ICO "beyond use" |
| DR-10 | **Logs** | App/access logs containing email, IP, user ID, tokens, request bodies; log retention in CloudWatch/Datadog/Loki/ELK; CNIL norm 6–12 months | 5(1)(c),(e), 32 |
| DR-11 | **Processors / third parties** | Every SDK/API receiving PII (Stripe, Mailchimp, HubSpot, Intercom, Zendesk, Segment, GA4, Mixpanel, Sentry, Twilio). Is there a DPA? Is erasure propagated via API? Is vendor retention configured? | 19, 28(3)(g) |
| DR-12 | **Legal-hold carve-out is narrow** | On erasure, invoices/ledger rows kept (Art. 17(3)(b)) but unrelated profile, login and marketing data deleted; archived copy separated and access-restricted | 17(3)(b),(e), 6(1)(c) |
| DR-13 | **Minimisation** | Fields not used by any feature (birth date, gender, phone, full address for digital goods, ID scans kept after verification, full card data); free-text fields collecting sensitive info | 5(1)(c), 25(2) |
| DR-14 | **Special-category data flagged** | Health, biometrics, religion, ethnicity, sexual orientation, union membership, political views (also inferred: diagnosis tags, dietary "halal/kosher", disability flags); plus criminal data (Art. 10) | 9, 10, 35 |
| DR-15 | **Records of processing exist** | RoPA with purposes, categories, recipients, transfers, erasure time limits, security description | 30 |
| DR-16 | **Retention communicated** | Privacy notice gives concrete periods/start triggers per category; not just "statutory periods" | 13(2)(a), 14(2)(a), 15(1)(d); EDPB 01/2022 para 118 |
| DR-17 | **Anonymisation is real** | "Anonymised" rows still hold user IDs, hashed emails, IPs, precise timestamps+location; hashing = pseudonymisation | 4(5), Recital 26; EDPB CEF 2025 report |
| DR-18 | **Access request before deletion** | Purge jobs pause for users with open access/erasure tickets; data found past retention is disclosed then deleted | 15, 12(3); EDPB 01/2022 Example 6 |
| DR-19 | **Inactive accounts** | Dormant-account policy (CNIL: 2 years after last action with prior warning) | 5(1)(e) |
| DR-20 | **Security of retained data** | Archives encrypted, pseudonymised where possible, separate credentials | 32(1)(a), 25(1) |

Sources for the guidance references: EDPB 01/2022 https://www.edpb.europa.eu/system/files/2023-04/edpb_guidelines_202201_data_subject_rights_access_v2_en.pdf · ICO erasure https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/individual-rights/individual-rights/right-to-erasure/ · EDPB CEF 2025 https://www.edpb.europa.eu/news/edpb-identifies-challenges-hindering-the-full-implementation-of-the-right-to-erasure_en · CNIL logs https://www.cnil.fr/fr/la-cnil-publie-une-recommandation-relative-aux-mesures-de-journalisation · CNIL inactive accounts https://www.cnil.fr/fr/questions-reponses-sur-les-referentiels-relatifs-la-gestion-des-activites-commerciales-et-des

## Common code patterns to search for

| Pattern | Search hints | Why it matters |
|---|---|---|
| Soft delete without purge | `deleted_at`, `is_deleted`, `paranoid: true` (Sequelize), `acts_as_paranoid`/`discard` (Rails), `SoftDeletes` (Laravel), `@SQLDelete`/`@Where` (Hibernate); then look for a job that hard-deletes after N days | Rows survive "deletion" forever (DR-08) |
| Timestamps with no TTL job | `created_at`, `last_login_at`, `updated_at` on PII tables but no scheduled `DELETE ... WHERE created_at < now() - interval` | Indefinite retention (DR-04) |
| Postgres scheduled purge | `cron.schedule(` (pg_cron), `pg_partman` retention, `DROP PARTITION` | Evidence of DR-04; check table coverage |
| MongoDB / DynamoDB TTL | `expireAfterSeconds` index; DynamoDB `TimeToLiveSpecification` | Native TTL (DR-04) |
| Redis TTL | `SET` without `EX`/`PX`, `EXPIRE` missing on session/profile keys, `maxmemory-policy noeviction` | Session/PII caches without expiry |
| S3 / GCS / Azure lifecycle | `LifecycleConfiguration`/`aws_s3_bucket_lifecycle_configuration` with `Expiration`; `NoncurrentVersionExpiration` when versioning is on; GCS `lifecycle_rule`; Azure `management_policy` | Uploads and exports kept forever; versioned buckets keep "deleted" objects |
| Log retention | CloudWatch `retention_in_days` (unset = never expire), Datadog/Elastic ILM policies, `logrotate` `rotate`/`maxage`, Loki `retention_period`, journald `MaxRetentionSec` | DR-10 |
| Email/PII in logs | `logger.*(.*email`, `console.log(user`, `print(request.body`, logging full request/response bodies, `Authorization` headers | PII spread into logs/processors (DR-10, DR-13) |
| Sentry PII | `sendDefaultPii: true` / `send_default_pii=True`, `setUser({ email`, `beforeSend` missing scrubbing; enable server-side data scrubbing | Error tracker becomes a PII store (DR-11) – [Sentry docs](https://docs.sentry.io/platforms/javascript/data-management/sensitive-data/) |
| GA4 retention | Admin > Data retention: user-level & event data **2 or 14 months** (standard GA4; 26/38/50 months for event data in GA4 360 only); "reset on new activity" extends user-level data indefinitely for active users. Affects explorations, not aggregated reports | DR-11 – [Google help](https://support.google.com/analytics/answer/7667196) |
| Stripe | Customer delete in app ≠ erasure at Stripe; Redaction Jobs API (`/v1/privacy/redaction_jobs`, preview) redacts customer + related objects, not invoices (kept for tax) | DR-11, DR-12 – [Stripe redaction](https://docs.stripe.com/privacy/redaction), [deletion requests](https://docs.stripe.com/privacy/deletion-requests) |
| Mailchimp | Unsubscribe/archive keeps the contact; erasure needs `POST /lists/{list_id}/members/{subscriber_hash}/actions/delete-permanent` | DR-11 – [Mailchimp API](https://mailchimp.com/developer/marketing/api/list-members/delete-list-member/) |
| Backups | RDS `backup_retention_period`, snapshot copies without expiry, `pg_dump` cron to buckets without lifecycle | DR-09 |
| Analytics/warehouse copies | ETL to BigQuery/Snowflake/Redshift with no partition expiration (`partition_expiration_days`, time-travel/fail-safe windows) | DR-05 |
| Search indexes / caches | Algolia/Elastic/Meilisearch indexes not updated on delete; CDN caches of profile pages | DR-05, DR-07 |
| ID document / KYC uploads | Files kept after verification; no link to AML 5-year max | DR-13, DR-12 |

## Typical recommended retention periods (starting points – justify per purpose)

| Data type | Typical period | Source / nature |
|---|---|---|
| Customer data used for marketing | relationship + 3 years | CNIL référentiel (non-binding) – [CNIL Q&A](https://www.cnil.fr/fr/questions-reponses-sur-les-referentiels-relatifs-la-gestion-des-activites-commerciales-et-des) |
| Prospects / newsletter-only contacts | 3 years from collection or last contact from them | CNIL (same) |
| Inactive accounts | 2 years after last action, warn first | CNIL (same) |
| Opt-out/suppression list | ≥ 3 years, used only to honour opt-out | CNIL (same) |
| Rejected job applicants | ≤ 2 years | CNIL – [durées de conservation](https://www.cnil.fr/fr/les-durees-de-conservation-des-donnees) |
| Access/security logs | 6 months – 1 year (≤ 3 years if documented risk) | CNIL – [journalisation](https://www.cnil.fr/fr/la-cnil-publie-une-recommandation-relative-aux-mesures-de-journalisation) |
| CCTV footage | ≤ 1 month (days usually enough) | CNIL – [vidéoprotection](https://www.cnil.fr/fr/la-videoprotection) |
| Invoices / accounting vouchers | FI 6 y; DE 8 y; SE 7 y; FR 10 y; UK 6 y (HMRC) | Statute – see `legal-minimums.md` |
| Ledgers, financial statements | FI 10 y; DE 10 y; FR 10 y; UK 3 y private / 6 y public (Companies Act) | Statute – see `legal-minimums.md` |
| AML/KYC records (obliged entities) | 5 years after relationship ends, then delete (max +5 if national law) | AMLD Art. 40 – [EUR-Lex](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32015L0849) |
| Order data for warranty claims | ≥ 2 years after delivery (EU minimum seller liability) | Directive 2019/771 Art. 10 – [EUR-Lex](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32019L0771) |
| Payslips (France) | 5 years | Code du travail L3243-4 via [CNIL](https://www.cnil.fr/fr/les-durees-de-conservation-des-donnees) |
| UK payroll (PAYE) records | 3 years from end of tax year | HMRC – [gov.uk](https://www.gov.uk/paye-for-employers/keeping-records) |
| Web analytics (GA4) user/event data | 2 or 14 months setting – choose the shortest that meets the purpose | Product setting – [Google help](https://support.google.com/analytics/answer/7667196) |

When a period above conflicts with the competent supervisory authority's guidance or a national statute, **the regulator/statute wins** (see `retention-guidance.md`).
