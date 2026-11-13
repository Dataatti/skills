// Nightly retention job (scheduled in server/cron.js at 03:00).
// Each statement implements one row of docs/records-of-processing.md.
const RULES = [
  { table: "customers",       sql: "DELETE FROM customers WHERE last_login_at < now() - interval '24 months'" },
  { table: "support_tickets", sql: "DELETE FROM support_tickets WHERE closed_at < now() - interval '12 months'" },
  // Orders: 6 years after the end of the financial year (Accounting Act 2:10).
  { table: "orders",          sql: "DELETE FROM orders WHERE created_at < date_trunc('year', now()) - interval '6 years'" },
  { table: "consent_log",     sql: "DELETE FROM consent_log WHERE expires_at < now() - interval '3 years'" },
];

async function runRetention(db, log) {
  for (const rule of RULES) {
    const res = await db.query(rule.sql);
    log.info({ table: rule.table, deleted: res.rowCount }, "retention purge");
  }
}

module.exports = { runRetention, RULES };
