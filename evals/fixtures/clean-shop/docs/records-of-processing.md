# Records of processing (GDPR Art. 30) – Kettle & Co Oy

| Data | Purpose | Lawful basis | Retention | Deletion mechanism |
|---|---|---|---|---|
| customers (email, name, password hash) | Account | Contract 6(1)(b) | 24 months after last login | jobs/retention.js; DELETE /api/me |
| addresses | Delivery | Contract | With customer | ON DELETE CASCADE |
| orders | Bookkeeping | Legal obligation 6(1)(c), Accounting Act 2:10 | 6 years after end of financial year | jobs/retention.js; unlinked on erasure |
| newsletter_subscribers | Newsletter | Consent 6(1)(a) | Until unsubscribe | unsubscribe link; DELETE /api/me; Brevo deleteContact |
| support_tickets | Customer support | Legitimate interest 6(1)(f) | 12 months after closing | jobs/retention.js |
| consent_log | Proof of consent | Legal obligation (Art. 7(1)) | consent expiry + 3 years | jobs/retention.js |
| server logs | Security | Legitimate interest | 30 days | object storage lifecycle |
| backups | Disaster recovery | Legitimate interest | 35 days | managed DB setting |

Processors: Stripe (payments), Brevo (email), UpCloud (hosting, FI). DPAs signed.
Reviewed: 2026-10-01.
