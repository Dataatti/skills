// Erasure at processors (GDPR Art. 17, 19, 28(3)(g)).
// Stripe: deleting a Customer object does not erase all personal data Stripe holds, so we
// create a Stripe privacy redaction job for the customer (Stripe docs: "Redaction" /
// privacy requests), and keep the job id for our records.
const stripe = require("./lib/stripe");
const brevo = require("./lib/brevo");

async function erase({ email, stripeCustomerId }) {
  if (stripeCustomerId) await stripe.redactCustomer(stripeCustomerId); // wraps Stripe's redaction-job API
  if (email) await brevo.deleteContact(email);
}

module.exports = { erase, brevo };
