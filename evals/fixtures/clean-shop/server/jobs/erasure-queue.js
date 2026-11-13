// Every 15 minutes: retry processor erasures; delete queue rows once the processor confirms.
const processors = require("../lib-processors");
module.exports = async function drain(db, log, alert) {
  const { rows } = await db.query("SELECT ctid, * FROM erasure_queue ORDER BY created_at LIMIT 100");
  for (const r of rows) {
    try {
      await processors.erase({ email: r.email, stripeCustomerId: r.stripe_customer_id });
      await db.query("DELETE FROM erasure_queue WHERE ctid = $1", [r.ctid]);
    } catch (err) {
      await db.query("UPDATE erasure_queue SET attempts = attempts + 1 WHERE ctid = $1", [r.ctid]);
      if (r.attempts + 1 >= 3) await alert(`Processor erasure failing for queued request from ${r.created_at.toISOString()}`);
      log.error({ err }, "processor erasure retry failed");
    }
  }
};
