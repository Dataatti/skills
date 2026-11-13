# Regenerates the static pages of evals/fixtures/clean-shop. Edit here, then run: python3 evals/fixtures/build_clean_shop.py
import os
D = os.path.join(os.path.dirname(os.path.abspath(__file__)), "clean-shop")
BANNER = '''<div id="consent-banner" role="region" aria-labelledby="consent-title" hidden>
  <h2 id="consent-title" tabindex="-1">Cookies on Kettle &amp; Co</h2>
  <p>We use necessary cookies for your cart. With your permission we also use Google Analytics to see which pages are used. No marketing cookies. <a href="privacy.html#cookies">Read more</a></p>
  <div class="actions">
    <button id="consent-accept" class="primary">Accept all</button>
    <button id="consent-reject" class="primary">Reject all</button>
    <button id="consent-customise" class="secondary" aria-expanded="false" aria-controls="consent-prefs">Choose cookies</button>
  </div>
  <div id="consent-prefs" hidden>
    <fieldset>
      <legend>Cookie categories</legend>
      <p><input type="checkbox" id="c-necessary" checked disabled> <label for="c-necessary" class="inline">Necessary – always on (cart, consent choice)</label></p>
      <p><input type="checkbox" id="c-analytics"> <label for="c-analytics" class="inline">Analytics – Google Analytics, page usage statistics</label></p>
      <p><input type="checkbox" id="c-marketing"> <label for="c-marketing" class="inline">Marketing – not used today</label></p>
    </fieldset>
    <button id="consent-save" class="secondary">Save my choices</button>
  </div>
</div>'''
def head(title, checkout=False):
    nav = '' if checkout else '''
  <nav aria-label="Main">
    <ul>
      <li><a href="index.html">Shop</a></li>
      <li><a href="cart.html">Cart</a></li>
      <li><a href="help.html">Help &amp; contact</a></li>
    </ul>
  </nav>
  <p>Free returns within 30 days · Shipping €4.90 in Finland, free over €40</p>'''
    return f'''<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{title} – Kettle &amp; Co</title>
<link rel="stylesheet" href="styles.css">
<script src="consent.js" defer></script>
<script src="shop.js" defer></script>
</head>
<body>
<a class="skip-link" href="#main">Skip to main content</a>
{BANNER}
<header>
  <a href="index.html"><strong>Kettle &amp; Co</strong> – loose-leaf tea</a>{nav}
  {'<p>Secure checkout · Need help? Call +358 2 555 0100</p>' if checkout else ''}
</header>
<main id="main">
'''
FOOT = '''</main>
<footer class="trust">
  <p>Secure payment by card, MobilePay or invoice. Questions? <a href="help.html">Contact us</a> – we reply within one working day. Phone +358 2 555 0100.</p>
  <p><a href="privacy.html">Privacy notice</a> · <a href="#" id="cookie-settings-link">Cookie settings</a> · <a href="privacy.html#choices">Your Privacy Choices</a> · <a href="returns.html">Returns policy</a></p>
  <p id="gpc-status" hidden>✓ Opt-out request honoured: your browser's Global Privacy Control signal is on, so analytics stays off.</p>
  <p>Kettle &amp; Co Oy, Business ID 1234567-8, Turku, Finland</p>
</footer>
</body>
</html>
'''
def stars(r, n):
    return f'<span aria-hidden="true">★★★★☆</span> {r} out of 5 ({n} reviews)'
def page(name, title, body, checkout=False):
    open(os.path.join(D, name), "w").write(head(title, checkout) + body + FOOT)

page("index.html", "Shop", f'''<h1>Loose-leaf tea, packed in Turku</h1>
<p>Organic teas, packed by hand. Order by 14:00 and it ships the same day.</p>
<ul class="products">
  <li><a href="product.html"><img src="img/sencha.svg" alt="Green sencha leaves in a white bowl" width="200" height="140"></a>
    <h2><a href="product.html">Sencha Morning</a></h2><p class="price">€12.50 / 100 g</p>
    <p>{stars(4.6,128)}</p></li>
  <li><a href="product-earl.html"><img src="img/earl.svg" alt="Black tea leaves with blue cornflower petals" width="200" height="140"></a>
    <h2><a href="product-earl.html">Earl Grey Blue</a></h2><p class="price">€10.90 / 100 g</p>
    <p>{stars(4.8,342)}</p></li>
</ul>
''')
def product(fname, pid, name, price, img, alt, desc, origin, rating, n, reviews):
    revs = "".join(f"<li><p>{t}</p><p class=\"hint\">{who}</p></li>" for t, who in reviews)
    page(fname, name, f'''<nav aria-label="Breadcrumb"><a href="index.html">Shop</a> › {name}</nav>
<h1>{name}</h1>
<p>{stars(rating,n)} · <a href="#reviews">Read reviews</a></p>
<p class="price">€{price} / 100 g resealable pouch</p>
<p>{desc}</p>
<form action="cart.html" method="get">
  <input type="hidden" name="item" value="{pid}">
  <label for="qty">Quantity</label>
  <select id="qty" name="qty"><option>1</option><option>2</option><option>3</option><option>4</option><option>5</option><option>6</option><option>7</option><option>8</option><option>9</option><option>10</option></select>
  <p><button type="submit" class="primary">Add to cart</button></p>
</form>
<img src="img/{img}.svg" alt="{alt}" width="400" height="280">
<ul>
  <li>Origin: {origin}. Certified organic (EU organic logo).</li>
  <li>About 50 cups per pouch. Store cool and dry.</li>
  <li>Shipping €4.90, free over €40. Order by 14:00 for same-day dispatch – estimated delivery <strong data-eta>in 1–3 working days</strong>.</li>
  <li>Free returns within 30 days (<a href="returns.html">returns policy</a>).</li>
</ul>
<section id="reviews"><h2>Reviews</h2><p>Showing the 2 most recent reviews, including critical ones. <a href="reviews.html">Read all reviews and the rating breakdown</a></p><ul class="reviews">{revs}</ul></section>
''')
product("product.html", "sencha", "Sencha Morning", "12.50", "sencha", "Green sencha leaves in a white bowl",
        "Fresh, grassy Japanese green tea. Brew 1 tsp at 75 °C for 2 minutes.", "Shizuoka, Japan", 4.6, 128,
        [("“Smooth and fresh, arrived in two days.”", "Aino, Tampere – 4 out of 5 – October 2026"),
         ("“Good tea but I'd like a bigger pouch.”", "Mikko, Oulu – 3 out of 5 – September 2026")])
product("product-earl.html", "earl", "Earl Grey Blue", "10.90", "earl", "Black tea leaves with blue cornflower petals",
        "Ceylon black tea with bergamot and cornflower. Brew 1 tsp at 95 °C for 3–4 minutes.", "Sri Lanka", 4.8, 342,
        [("“The best Earl Grey I've had, very fragrant.”", "Laura, Helsinki – 5 out of 5 – October 2026"),
         ("“Lovely, a bit strong for me.”", "Pekka, Turku – 4 out of 5 – August 2026")])

page("cart.html", "Cart", '''<h1 id="cart-heading" tabindex="-1">Your cart</h1>
<p id="cart-status" role="status"></p>
<div id="cart-empty" hidden><p>Your cart is empty. <a href="index.html">Browse teas</a></p></div>
<form id="cart-form" action="checkout.html" method="get">
<div class="table-wrap"><table>
  <thead><tr><th scope="col">Item</th><th scope="col">Quantity</th><th scope="col">Price</th><th scope="col"><span class="visually-hidden">Remove</span></th></tr></thead>
  <tbody id="cart-rows"></tbody>
  <tfoot>
    <tr><th scope="row">Shipping</th><td></td><td id="cart-shipping"></td><td></td></tr>
    <tr><th scope="row">Total incl. VAT</th><td></td><td><strong id="cart-total"></strong></td><td></td></tr>
  </tfoot>
</table></div>
<p><button type="submit" class="primary">Go to checkout</button></p>
<p>Estimated delivery: <strong data-eta>1–3 working days</strong>. No account needed – you can check out as a guest.</p>
</form>
''')
page("checkout.html", "Checkout", '''<h1>Checkout</h1>
<section aria-labelledby="summary-title">
  <h2 id="summary-title">Order summary</h2>
  <ul id="summary-items"></ul>
  <p>Total to pay: <strong id="summary-total"></strong> (VAT included). No other fees. Estimated delivery: <strong data-eta>1–3 working days</strong>. <a href="cart.html" id="edit-cart">Change cart</a></p>
</section>
<div id="error-summary" tabindex="-1" hidden>
  <h2>There is a problem</h2><ul id="error-list"></ul>
</div>
<form id="checkout" action="confirm.html" method="post" novalidate>
  <label for="email">Email <span class="hint">For your receipt and delivery updates</span></label>
  <input id="email" name="email" type="email" autocomplete="email" required aria-describedby="email-err">
  <span id="email-err" class="error-msg" hidden>Enter an email address like name@example.com</span>

  <label for="name">Full name</label>
  <input id="name" name="name" autocomplete="name" required aria-describedby="name-err">
  <span id="name-err" class="error-msg" hidden>Enter your full name</span>

  <label for="address">Street address</label>
  <input id="address" name="address" autocomplete="street-address" required aria-describedby="address-err">
  <span id="address-err" class="error-msg" hidden>Enter your street address</span>

  <label for="postcode">Postcode <span class="hint">5 digits, for example 20100</span></label>
  <input id="postcode" name="postcode" autocomplete="postal-code" inputmode="numeric" required aria-describedby="postcode-err">
  <span id="postcode-err" class="error-msg" hidden>Enter a 5-digit Finnish postcode, for example 20100</span>

  <label for="city">City</label>
  <input id="city" name="city" autocomplete="address-level2" required aria-describedby="city-err">
  <span id="city-err" class="error-msg" hidden>Enter your city</span>

  <fieldset>
    <legend>Payment method</legend>
    <p><input type="radio" id="pay-card" name="pay" value="card" checked> <label for="pay-card" class="inline">Card (Visa, Mastercard)</label></p>
    <p><input type="radio" id="pay-mobilepay" name="pay" value="mobilepay"> <label for="pay-mobilepay" class="inline">MobilePay</label></p>
    <p><input type="radio" id="pay-invoice" name="pay" value="invoice"> <label for="pay-invoice" class="inline">Invoice (14 days, no fee)</label></p>
  </fieldset>
  <!-- Card fields are rendered by Stripe Elements (stripe.js) in production; values never touch our server. -->
  <fieldset id="card-fields" class="secure">
    <legend>🔒 Card details – secure payment by Stripe</legend>
    <label for="cc-number">Card number</label>
    <input id="cc-number" name="cc-number" autocomplete="cc-number" inputmode="numeric" aria-describedby="cc-number-err">
    <span id="cc-number-err" class="error-msg" hidden>Check your card number – it looks mistyped</span>
    <label for="cc-exp">Expiry date <span class="hint">MM/YY</span></label>
    <input id="cc-exp" name="cc-exp" autocomplete="cc-exp" inputmode="numeric" aria-describedby="cc-exp-err">
    <span id="cc-exp-err" class="error-msg" hidden>Enter the expiry date as MM/YY</span>
    <label for="cc-csc">Security code <span class="hint">3 or 4 digits, on the back of the card</span></label>
    <input id="cc-csc" name="cc-csc" autocomplete="cc-csc" inputmode="numeric" aria-describedby="cc-csc-err">
    <span id="cc-csc-err" class="error-msg" hidden>Enter the 3- or 4-digit security code</span>
    <p class="hint">Your card details go straight to Stripe over an encrypted connection; we never see or store them.</p>
  </fieldset>

  <p><input type="checkbox" id="newsletter" name="newsletter"> <label for="newsletter" class="inline">Send me the monthly tea letter (optional, unsubscribe any time)</label></p>

  <p><button type="submit" class="primary" id="pay-button">Pay</button></p>
</form>
''', checkout=True)
page("confirm.html", "Order confirmed", '''<h1>Thank you – your order is confirmed</h1>
<p>Order number KC-10482. A receipt is on its way to your email.</p>
<ul id="summary-items"></ul>
<p>Total paid: <strong id="summary-total"></strong>. Your tea ships today. Estimated delivery: <strong data-eta>1–3 working days</strong>.</p>
<p>Want to track orders next time? <a href="account.html">Create an account with one click</a> – optional.</p>
<p><a href="index.html">Continue shopping</a></p>
''')
page("help.html", "Help and contact", '''<h1>Help and contact</h1>
<p>Email <a href="mailto:hello@kettle.example">hello@kettle.example</a> or call +358 2 555 0100 (Mon–Fri 9–16).</p>
<h2>Delete my data</h2>
<p>You can ask us to delete your personal data at any time from <a href="account.html#delete">your account page</a> or by emailing privacy@kettle.example. We reply within one month.</p>
''')
page("returns.html", "Returns policy", '''<h1>Returns policy</h1><p>Return unopened tea within 30 days for a full refund. Return shipping is free – use the prepaid label in your parcel.</p>
''')
page("account.html", "Your account", '''<h1>Your account</h1>
<h2 id="delete">Delete my account and data</h2>
<p>This deletes your profile, addresses and newsletter subscription straight away. Order records are kept for 6 years because Finnish bookkeeping law requires it, then deleted automatically.</p>
<form action="/api/me" method="post"><input type="hidden" name="_method" value="DELETE"><button class="secondary" type="submit">Delete my account</button></form>
''')
page("reviews.html", "Reviews", """<h1>Customer reviews</h1>
<p>All reviews are from verified buyers. We publish every review, positive or negative.</p>
<h2>Sencha Morning – 4.6 out of 5 (128 reviews)</h2>
<p>5 stars: 82 · 4 stars: 31 · 3 stars: 10 · 2 stars: 3 · 1 star: 2</p>
<ul class="reviews"><li><p>“Smooth and fresh, arrived in two days.”</p><p class="hint">Aino, Tampere – 4 out of 5 – October 2026</p></li>
<li><p>“Good tea but I'd like a bigger pouch.”</p><p class="hint">Mikko, Oulu – 3 out of 5 – September 2026</p></li>
<li><p>“Too grassy for my taste.”</p><p class="hint">Sanna, Espoo – 2 out of 5 – July 2026</p></li></ul>
<h2>Earl Grey Blue – 4.8 out of 5 (342 reviews)</h2>
<p>5 stars: 281 · 4 stars: 48 · 3 stars: 9 · 2 stars: 3 · 1 star: 1</p>
<ul class="reviews"><li><p>“The best Earl Grey I've had, very fragrant.”</p><p class="hint">Laura, Helsinki – 5 out of 5 – October 2026</p></li>
<li><p>“Lovely, a bit strong for me.”</p><p class="hint">Pekka, Turku – 4 out of 5 – August 2026</p></li></ul>
""")
print("pages ok")
