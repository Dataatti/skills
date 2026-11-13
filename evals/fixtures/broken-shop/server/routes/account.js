const mailchimp = require("../lib/mailchimp");
const log = require("../logger");

module.exports = function register(app, db) {
  app.post("/api/register", async (req, res) => {
    log.info({ body: req.body }, "register");
    const u = await db.one(
      "INSERT INTO users (email, password_hash, date_of_birth) VALUES ($1,$2,$3) RETURNING id",
      [req.body.email, await hash(req.body.password), req.body.dob]);
    // everyone goes on the newsletter list
    await mailchimp.lists.addListMember("brewbarn-all", { email_address: req.body.email, status: "subscribed" });
    res.json(u);
  });

  app.post("/api/checkout", async (req, res) => {
    log.info({ body: req.body }, "checkout");
    await db.none("UPDATE users SET first_name=$2,last_name=$3,phone=$4,mobile_phone=$5,company=$6,heard_from=$7 WHERE id=$1",
      [req.user.id, req.body.first, req.body.last, req.body.phone, req.body.phone2, req.body.company, req.body.hear]);
    res.json({ ok: true });
  });

  app.post("/api/cart/email", async (req, res) => {
    // capture email as soon as it is typed so we can send reminder campaigns
    await db.none("INSERT INTO abandoned_carts (email, items) VALUES ($1,$2)", [req.body.email, req.body.items]);
    await mailchimp.lists.addListMember("cart-recovery", { email_address: req.body.email, status: "subscribed" });
    res.end();
  });

  app.post("/api/login", async (req, res) => {
    const u = await checkPassword(req.body.email, req.body.password);
    await db.none("INSERT INTO login_events (user_id, ip_address, user_agent) VALUES ($1,$2,$3)", [u.id, req.ip, req.get("user-agent")]);
    res.json(u);
  });

  // "Delete my account"
  app.post("/api/account/delete", async (req, res) => {
    await db.none("UPDATE users SET deleted_at = now() WHERE id = $1", [req.user.id]);
    res.json({ ok: true });
  });
};
