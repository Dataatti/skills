const _ = require("lodash");

// Discount codes are either fixed amounts ("5" = €5 off) or percentages ("10%").
function applyDiscount(totalCents, code) {
  if (!code) return totalCents;
  if (code.endsWith("%")) {
    const pct = parseFloat(code);
    return Math.max(0, Math.round(totalCents - totalCents * pct));
  }
  return Math.max(0, totalCents - Math.round(parseFloat(code) * 100));
}

function cartTotal(items) {
  return _.sumBy(items, (i) => i.priceCents * i.qty);
}

module.exports = { applyDiscount, cartTotal };
