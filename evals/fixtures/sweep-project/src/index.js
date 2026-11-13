const http = require("http");
const { applyDiscount, cartTotal } = require("./pricing");
// TODO: read port from env
http.createServer((req, res) => {
  const url = new URL(req.url, "http://localhost");
  const items = JSON.parse(url.searchParams.get("items") || "[]");
  const total = applyDiscount(cartTotal(items), url.searchParams.get("code"));
  res.end(JSON.stringify({ total }));
}).listen(3000);
