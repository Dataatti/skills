// Cart and checkout for the demo shop. The cart lives in sessionStorage (strictly necessary:
// it only remembers what you put in your basket during this visit).
(function () {
  var PRODUCTS = {
    sencha: { name: "Sencha Morning 100 g", price: 1250, url: "product.html" },
    earl:   { name: "Earl Grey Blue 100 g", price: 1090, url: "product-earl.html" }
  };
  var SHIPPING = 490, FREE_FROM = 4000;
  function eur(c) { return "€" + (c / 100).toFixed(2); }
  function load(key) { try { return JSON.parse(sessionStorage.getItem(key)) || {}; } catch (e) { return {}; } }
  function save(key, v) { try { sessionStorage.setItem(key, JSON.stringify(v)); } catch (e) {} }
  function totals(cart) {
    var sub = 0; Object.keys(cart).forEach(function (id) { sub += PRODUCTS[id].price * cart[id]; });
    var ship = sub === 0 || sub >= FREE_FROM ? 0 : SHIPPING;
    return { sub: sub, ship: ship, total: sub + ship };
  }
  function summary(cart, list, totalEl) {
    list.innerHTML = "";
    Object.keys(cart).forEach(function (id) {
      var li = document.createElement("li");
      li.textContent = cart[id] + " × " + PRODUCTS[id].name + " – " + eur(PRODUCTS[id].price * cart[id]);
      list.appendChild(li);
    });
    var t = totals(cart), li = document.createElement("li");
    li.textContent = "Shipping – " + (t.ship ? eur(t.ship) : "free");
    list.appendChild(li);
    totalEl.textContent = eur(t.total);
    return t;
  }

  function cartPage() {
    var cart = load("kc_cart"), q = new URLSearchParams(location.search);
    if (q.get("item") && PRODUCTS[q.get("item")]) {
      cart[q.get("item")] = (cart[q.get("item")] || 0) + Math.max(1, parseInt(q.get("qty"), 10) || 1);
      save("kc_cart", cart); history.replaceState(null, "", "cart.html");
    }
    function render(msg) {
      var rows = document.getElementById("cart-rows"); rows.innerHTML = "";
      var ids = Object.keys(cart);
      document.getElementById("cart-empty").hidden = ids.length > 0;
      document.getElementById("cart-form").hidden = ids.length === 0;
      ids.forEach(function (id) {
        var tr = document.createElement("tr"), p = PRODUCTS[id];
        tr.innerHTML = '<td><a href="' + p.url + '">' + p.name + '</a></td>' +
          '<td><label class="visually-hidden" for="q-' + id + '">Quantity of ' + p.name + '</label>' +
          '<select id="q-' + id + '">' + [1, 2, 3, 4, 5, 6].map(function (n) { return "<option" + (n === cart[id] ? " selected" : "") + ">" + n + "</option>"; }).join("") + "</select></td>" +
          "<td>" + eur(p.price * cart[id]) + "</td>" +
          '<td><button type="button" class="secondary" id="rm-' + id + '">Remove<span class="visually-hidden"> ' + p.name + "</span></button></td>";
        rows.appendChild(tr);
        tr.querySelector("select").addEventListener("change", function (e) { cart[id] = parseInt(e.target.value, 10); save("kc_cart", cart); render("Cart updated"); });
        tr.querySelector("button").addEventListener("click", function () { delete cart[id]; save("kc_cart", cart); render(p.name + " removed"); });
      });
      var t = totals(cart);
      document.getElementById("cart-shipping").textContent = t.ship ? eur(t.ship) : "Free";
      document.getElementById("cart-total").textContent = eur(t.total);
      document.getElementById("cart-status").textContent = msg || "";
    }
    render();
  }

  function checkoutPage() {
    var cart = load("kc_cart");
    if (!Object.keys(cart).length) { location.replace("cart.html"); return; }
    var t = summary(cart, document.getElementById("summary-items"), document.getElementById("summary-total"));
    var pay = document.getElementById("pay-button"); pay.textContent = "Pay " + eur(t.total);
    var card = document.getElementById("card-fields");
    document.querySelectorAll('input[name="pay"]').forEach(function (r) {
      r.addEventListener("change", function () { card.hidden = !document.getElementById("pay-card").checked; });
    });
    document.getElementById("checkout").addEventListener("submit", function (e) {
      e.preventDefault();
      var checks = {
        email: function (v) { return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v); },
        name: function (v) { return v.length > 0; },
        address: function (v) { return v.length > 0; },
        postcode: function (v) { return /^\d{5}$/.test(v.replace(/^FI-?/i, "").replace(/\s/g, "")); },
        city: function (v) { return v.length > 0; }
      };
      if (!card.hidden) {
        checks["cc-number"] = function (v) { return /^\d{13,19}$/.test(v.replace(/[\s-]/g, "")); };
        checks["cc-exp"] = function (v) { return /^(0[1-9]|1[0-2])\s*\/\s*\d{2}$/.test(v); };
        checks["cc-csc"] = function (v) { return /^\d{3,4}$/.test(v); };
      }
      var errors = [];
      Object.keys(checks).forEach(function (id) {
        var el = document.getElementById(id), err = document.getElementById(id + "-err");
        var bad = !checks[id](el.value.trim());
        err.hidden = !bad; el.setAttribute("aria-invalid", bad ? "true" : "false");
        if (bad) errors.push('<li><a href="#' + id + '">' + err.textContent + "</a></li>");
      });
      var s = document.getElementById("error-summary");
      if (errors.length) {
        document.getElementById("error-list").innerHTML = errors.join("");
        s.hidden = false; s.focus(); return;
      }
      save("kc_last_order", cart); sessionStorage.removeItem("kc_cart");
      location.href = "confirm.html";
    });
  }

  function confirmPage() {
    var order = load("kc_last_order");
    if (Object.keys(order).length) summary(order, document.getElementById("summary-items"), document.getElementById("summary-total"));
  }

  document.addEventListener("DOMContentLoaded", function () {
    var page = location.pathname.split("/").pop();
    if (page === "cart.html") cartPage();
    if (page === "checkout.html") checkoutPage();
    if (page === "confirm.html") confirmPage();
  });
})();
