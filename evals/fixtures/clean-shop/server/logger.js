// Structured logging. Personal data is redacted; logs are kept 30 days (see infra/logging.tf).
const pino = require("pino");
module.exports = pino({ redact: ["req.headers.cookie", "req.headers.authorization", "*.email", "*.password"] });
