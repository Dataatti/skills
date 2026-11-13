const cron = require("node-cron");
const { runRetention } = require("./jobs/retention");
const processors = require("./lib-processors");
const mailer = require("./lib/mailer");
module.exports = (db, log) => cron.schedule("0 3 * * *", () => runRetention(db, log, { processors, mailer }));
