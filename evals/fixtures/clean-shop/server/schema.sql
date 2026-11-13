-- Kettle & Co database schema (PostgreSQL)
-- Every table with personal data has a documented purpose, lawful basis and retention period.
-- See docs/records-of-processing.md (GDPR Art. 30).

CREATE TABLE customers (
  id            uuid PRIMARY KEY,
  email         text NOT NULL UNIQUE,          -- purpose: login, receipts | basis: contract | retention: 24 months after last_login_at
  full_name     text NOT NULL,
  password_hash text NOT NULL,
  stripe_customer_id text,                       -- Stripe reference; erased via Stripe redaction on deletion
  last_login_at timestamptz NOT NULL,
  inactivity_notice_sent_at timestamptz,         -- warned 30 days before the 24-month inactivity purge; reset to NULL on login
  created_at    timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE addresses (
  id          uuid PRIMARY KEY,
  customer_id uuid NOT NULL REFERENCES customers(id) ON DELETE CASCADE, -- deleted with the customer
  street      text NOT NULL,
  postcode    text NOT NULL,
  city        text NOT NULL
);

-- Orders are bookkeeping records (Finnish Accounting Act 2:10): kept 6 years after the
-- end of the financial year, then deleted by jobs/retention.js. On erasure requests the
-- customer link is removed and the record is kept only for bookkeeping (Art. 17(3)(b)).
CREATE TABLE orders (
  id             uuid PRIMARY KEY,
  customer_id    uuid REFERENCES customers(id) ON DELETE SET NULL,
  billing_name   text NOT NULL,
  billing_street text NOT NULL,
  customer_email text,                          -- receipt/delivery/returns only: nulled 90 days after delivery
  delivered_at   timestamptz,
  total_cents    integer NOT NULL,
  created_at     timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE newsletter_subscribers (
  email          text PRIMARY KEY,               -- basis: consent | retention: until unsubscribe or 3 years without opening a letter
  consented_at   timestamptz NOT NULL,
  last_engaged_at timestamptz NOT NULL,
  consent_text_version text NOT NULL
);

CREATE TABLE support_tickets (
  id          uuid PRIMARY KEY,
  customer_id uuid REFERENCES customers(id) ON DELETE CASCADE,
  email       text NOT NULL,
  body        text NOT NULL,
  last_activity_at timestamptz NOT NULL DEFAULT now(),
  closed_at   timestamptz                         -- retention: 12 months after closed_at (or 12 months of inactivity if never closed)
);

-- Pending erasures at processors (Stripe redaction, Brevo delete). Rows are deleted as soon as the
-- processor confirms; jobs/erasure-queue.js retries every 15 minutes and alerts after 3 failures.
CREATE TABLE erasure_queue (
  email text, stripe_customer_id text, attempts integer NOT NULL DEFAULT 0, created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE consent_log (
  id          uuid PRIMARY KEY,
  recorded_at timestamptz NOT NULL,
  policy_version text NOT NULL,
  choices     jsonb NOT NULL,                    -- no IP stored; consent id only
  expires_at  timestamptz NOT NULL               -- retention: expires_at + 3 years
);

-- Open access/erasure requests (GDPR Art. 12(3): answered within one month). Purges skip people
-- with an open access request so the data can still be disclosed first.
CREATE TABLE data_requests (
  id          uuid PRIMARY KEY,
  customer_id uuid,
  email       text NOT NULL,
  kind        text NOT NULL CHECK (kind IN ('access', 'erasure')),
  opened_at   timestamptz NOT NULL DEFAULT now(),
  closed_at   timestamptz                         -- retention: request log kept 3 years after closing
);

-- Product reviews: shown with first name and city only. Retention: 3 years after publication,
-- then anonymised to "Verified buyer". Deleted on erasure.
CREATE TABLE reviews (
  id           uuid PRIMARY KEY,
  customer_id  uuid REFERENCES customers(id) ON DELETE CASCADE,
  display_name text NOT NULL,                    -- first name + city, chosen by the reviewer
  body         text NOT NULL,
  rating       smallint NOT NULL,
  published_at timestamptz NOT NULL
);
