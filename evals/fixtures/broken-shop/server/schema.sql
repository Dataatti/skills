-- Brew Barn database (PostgreSQL)

CREATE TABLE users (
  id            serial PRIMARY KEY,
  email         text NOT NULL UNIQUE,
  password_hash text NOT NULL,
  first_name    text,
  last_name     text,
  phone         text,
  mobile_phone  text,
  date_of_birth date,
  company       text,
  heard_from    text,
  created_at    timestamptz DEFAULT now(),
  deleted_at    timestamptz            -- set when the user deletes their account
);

CREATE TABLE addresses (
  id       serial PRIMARY KEY,
  user_id  integer REFERENCES users(id),
  street   text, postcode text, city text, country text,
  kind     text  -- 'shipping' | 'billing'
);

CREATE TABLE orders (
  id          serial PRIMARY KEY,
  user_id     integer REFERENCES users(id),
  total_cents integer NOT NULL,
  invoice_pdf text,                    -- path to the invoice PDF in s3://brewbarn-invoices
  created_at  timestamptz DEFAULT now()
);

CREATE TABLE login_events (
  id         bigserial PRIMARY KEY,
  user_id    integer REFERENCES users(id),
  ip_address inet,
  user_agent text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE abandoned_carts (
  id         serial PRIMARY KEY,
  email      text,                     -- captured from the checkout email field on blur
  items      jsonb,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE support_messages (
  id         serial PRIMARY KEY,
  email      text,
  name       text,
  message    text,
  created_at timestamptz DEFAULT now()
);
