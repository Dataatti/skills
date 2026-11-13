Backend: Express + PostgreSQL. Logs are synced hourly from /var/log/brewbarn to s3://brewbarn-logs.
Newsletter + cart-recovery emails via Mailchimp. Session replay via Hotjar. Analytics via GA4 (data retention: 14 months).
Nightly job: `jobs/backup.sh` (full pg_dump to s3://brewbarn-backups).
