-- Kettle & Co database schema (PostgreSQL)
-- Every table with personal data has a documented purpose, lawful basis and retention period.
-- See docs/records-of-processing.md (GDPR Art. 30).

CREATE TABLE customers (
  id            uuid PRIMARY KEY,
  email         text NOT NULL UNIQUE,          -- purpose: login, receipts | basis: contract | retention: 24 months after last_login_at
  full_name     text NOT NULL,
  password_hash text NOT NULL,
  last_login_at timestamptz NOT NULL,
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
  total_cents    integer NOT NULL,
  created_at     timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE newsletter_subscribers (
  email          text PRIMARY KEY,               -- basis: consent | retention: until unsubscribe
  consented_at   timestamptz NOT NULL,
  consent_text_version text NOT NULL
);

CREATE TABLE support_tickets (
  id          uuid PRIMARY KEY,
  customer_id uuid REFERENCES customers(id) ON DELETE CASCADE,
  email       text NOT NULL,
  body        text NOT NULL,
  closed_at   timestamptz                         -- retention: 12 months after closed_at
);

CREATE TABLE consent_log (
  id          uuid PRIMARY KEY,
  recorded_at timestamptz NOT NULL,
  policy_version text NOT NULL,
  choices     jsonb NOT NULL,                    -- no IP stored; consent id only
  expires_at  timestamptz NOT NULL               -- retention: expires_at + 3 years
);
