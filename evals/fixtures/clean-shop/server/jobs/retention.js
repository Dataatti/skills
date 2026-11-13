// Nightly retention job (scheduled in server/cron.js at 03:00).
// Each statement implements one row of docs/records-of-processing.md.
const OPEN_ACCESS = "SELECT customer_id FROM data_requests WHERE kind = 'access' AND closed_at IS NULL AND customer_id IS NOT NULL";
const RULES = [
  // Warn inactive customers 30 days before deletion (CNIL: prior notice for dormant accounts).
  { table: "customers (notice)", sql: "UPDATE customers SET inactivity_notice_sent_at = now() WHERE last_login_at < now() - interval '23 months' AND inactivity_notice_sent_at IS NULL RETURNING email", notify: "inactivity-warning" },
  { table: "customers", sql: `DELETE FROM customers WHERE last_login_at < now() - interval '24 months' AND inactivity_notice_sent_at < now() - interval '30 days' AND id NOT IN (${OPEN_ACCESS}) RETURNING stripe_customer_id, email`, processors: true },
  { table: "support_tickets", sql: "DELETE FROM support_tickets WHERE closed_at < now() - interval '12 months'" },
  // Orders: 6 years after the end of the financial year (Accounting Act 2:10).
  { table: "orders", sql: "DELETE FROM orders WHERE created_at < date_trunc('year', now()) - interval '6 years'" },
  // Order email is only needed for receipts, delivery and returns (30-day returns window + margin).
  { table: "orders (email)", sql: "UPDATE orders SET customer_email = NULL WHERE customer_email IS NOT NULL AND COALESCE(delivered_at, created_at + interval '30 days') < now() - interval '90 days'" },
  { table: "support_tickets (abandoned)", sql: "DELETE FROM support_tickets WHERE closed_at IS NULL AND last_activity_at < now() - interval '12 months'" },
  { table: "reviews", sql: "UPDATE reviews SET display_name = 'Verified buyer', customer_id = NULL WHERE published_at < now() - interval '3 years' AND display_name <> 'Verified buyer'" },
  { table: "newsletter_subscribers", sql: "DELETE FROM newsletter_subscribers WHERE last_engaged_at < now() - interval '3 years' RETURNING email", brevo: true },
  { table: "consent_log", sql: "DELETE FROM consent_log WHERE expires_at < now() - interval '3 years'" },
  { table: "data_requests", sql: "DELETE FROM data_requests WHERE closed_at < now() - interval '3 years'" },
];

async function runRetention(db, log, { processors, mailer, alert }) {
  for (const rule of RULES) {
    let res;
    try { res = await db.query(rule.sql); }
    catch (err) { log.error({ table: rule.table, err }, "retention rule failed"); await alert(`Retention rule failed: ${rule.table}`); continue; }
    for (const row of res.rows || []) {
      try {
        if (rule.notify) await mailer.send(rule.notify, row.email);
        if (rule.processors) await processors.erase({ email: row.email, stripeCustomerId: row.stripe_customer_id });
        if (rule.brevo) await processors.brevo.deleteContact(row.email);
      } catch (err) {
        // Failed processor erasures go to erasure_queue (jobs/erasure-queue.js retries them).
        await db.query("INSERT INTO erasure_queue (email, stripe_customer_id) VALUES ($1, $2)", [row.email, row.stripe_customer_id]);
        log.error({ table: rule.table, err }, "processor erasure queued for retry");
      }
    }
    log.info({ table: rule.table, affected: res.rowCount }, "retention run");
  }
}

module.exports = { runRetention, RULES };
