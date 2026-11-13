// POST /api/consent-log – stores proof of cookie consent (GDPR Art. 7(1)). No IP address is stored.
module.exports = function register(app, db) {
  app.post("/api/consent-log", express.text({ type: "*/*", limit: "2kb" }), async (req, res) => {
    const r = JSON.parse(req.body);
    const days = 180;
    await db.query(
      "INSERT INTO consent_log (id, recorded_at, policy_version, choices, expires_at) VALUES ($1, $2, $3, $4, $2::timestamptz + $5 * interval '1 day') ON CONFLICT (id) DO NOTHING",
      [r.id, r.ts, r.version, JSON.stringify(r.choices), days]);
    res.status(204).end();
  });
};
const express = require("express");
