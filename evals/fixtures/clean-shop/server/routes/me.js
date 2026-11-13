// DELETE /api/me – erasure request from the logged-in customer (GDPR Art. 17).
const processors = require("../lib-processors");

module.exports = function register(app, db) {
  app.delete("/api/me", requireLogin, async (req, res) => {
    const id = req.user.id;
    const { email, stripe_customer_id: stripeCustomerId } = req.user;
    await db.tx(async (t) => {
      // Orders are kept for bookkeeping (Art. 17(3)(b)); unlink them from the person.
      await t.query("UPDATE orders SET customer_id = NULL WHERE customer_id = $1", [id]);
      await t.query("DELETE FROM customers WHERE id = $1", [id]); // cascades to addresses, tickets
      await t.query("DELETE FROM newsletter_subscribers WHERE email = $1", [email]);
    });
    // Erase at processors and tell recipients (Art. 17, 19): Brevo contact + Stripe redaction job.
    await processors.erase({ email, stripeCustomerId });
    req.session.destroy();
    res.status(204).end();
  });
};

function requireLogin(req, res, next) { return req.user ? next() : res.status(401).end(); }
