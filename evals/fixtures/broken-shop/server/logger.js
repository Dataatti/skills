const pino = require("pino");
// Ship everything to S3 for debugging
module.exports = pino({ level: "debug" }, pino.destination("/var/log/brewbarn/app.log"));
