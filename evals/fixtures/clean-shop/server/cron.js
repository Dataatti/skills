const cron = require("node-cron");
const { runRetention } = require("./jobs/retention");
const processors = require("./lib-processors");
const mailer = require("./lib/mailer");
const alert = require("./lib/alert"); // pages the on-call developer
const drainErasureQueue = require("./jobs/erasure-queue");
module.exports = (db, log) => {
  cron.schedule("0 3 * * *", () => runRetention(db, log, { processors, mailer, alert }));
  cron.schedule("*/15 * * * *", () => drainErasureQueue(db, log, alert));
};
