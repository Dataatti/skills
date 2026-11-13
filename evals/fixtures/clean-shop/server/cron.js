const cron = require("node-cron");
const { runRetention } = require("./jobs/retention");
module.exports = (db, log) => cron.schedule("0 3 * * *", () => runRetention(db, log));
