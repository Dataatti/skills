# Records of processing (GDPR Art. 30) – Kettle & Co Oy

| Data | Purpose | Lawful basis | Retention | Deletion mechanism |
|---|---|---|---|---|
| customers (email, name, password hash, Stripe id) | Account | Contract 6(1)(b) | 24 months after last login (warning 30 days before) | jobs/retention.js; DELETE /api/me; Stripe redaction + Brevo delete |
| addresses | Delivery | Contract | With customer | ON DELETE CASCADE |
| orders (billing name/address) | Bookkeeping | Legal obligation 6(1)(c), Accounting Act 2:10 | 6 years after end of financial year | jobs/retention.js; unlinked on erasure |
| orders.customer_email | Receipts, delivery, returns | Contract 6(1)(b) | 90 days after delivery | jobs/retention.js |
| newsletter_subscribers | Newsletter | Consent 6(1)(a) | Until unsubscribe, or 3 years without engagement (CNIL) | unsubscribe link; DELETE /api/me; jobs/retention.js; Brevo deleteContact |
| support_tickets | Customer support | Legitimate interest 6(1)(f) | 12 months after closing or of inactivity | jobs/retention.js; DELETE /api/me (by id or email) |
| consent_log | Proof of consent | Legal obligation (Art. 7(1)) | consent expiry + 3 years | jobs/retention.js |
| data_requests (access/erasure log) | Demonstrate compliance | Legal obligation (Art. 5(2), 12) | 3 years after closing | jobs/retention.js |
| reviews (display name, text) | Show product reviews | Consent 6(1)(a) | 3 years, then anonymised | jobs/retention.js; DELETE /api/me (cascade) |
| server logs | Security | Legitimate interest | 30 days | object storage lifecycle |
| backups | Disaster recovery | Legitimate interest | 35 days | managed DB setting; deletion log re-applied after restore |

Processors: Stripe (payments; erasure via redaction job), Brevo (email), UpCloud (hosting, FI). DPAs signed.
Purges skip customers with an open access request until it is answered.
Reviewed: 2026-10-01.
