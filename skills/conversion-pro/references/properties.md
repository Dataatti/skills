# Conversion properties to check

Sources checked as of 2026-11-12.

Severity scale:
- **Critical**: blocks or very often kills the main flow (e.g. hidden mandatory fees, broken CTA, no guest path).
- **High**: a measurable, well-documented leak.
- **Medium**: noticeable friction.
- **Low**: polish.

Raise severity when the issue sits on checkout or payment, or on mobile. Lower it on secondary pages.

Baymard figures come from the public pages only, because the full benchmark is paid. Quote them with the page's date.

---

### CV-01 Value proposition clarity
- **Look for:** Above the fold on landing, home and product pages, does the page say what it is, for whom, and the key benefit? Is a product noun in the H1? Are price and offer visible?
- **Test:** Fetch the page and read the H1, the first paragraph and the hero text. Ask: could a stranger answer "what is this and why buy here?" in 5 seconds? Flag jargon or slogan-only headings.
- **Severity:** High on landing and product pages, Medium elsewhere.
- **Source:** Fogg motivation, https://behaviormodel.org/ · https://www.nngroup.com/articles/minimize-cognitive-load/

### CV-02 Primary CTA clarity and prominence
- **Look for:** One visually dominant primary action per step, with a verb and object label ("Add to cart", "Start free trial"), not "Submit" or "Click here". Is it visible without scrolling on mobile? Do secondary CTAs compete with it?
- **Test:** List all `<button>`/`<a>` elements in the first viewport. Check label text, contrast and size. Check that the button is a real `<button>` reachable by keyboard.
- **Severity:** Critical if there is no CTA or it is broken. High if it is ambiguous or below the fold on product or checkout pages.
- **Source:** Fogg prompts, https://behaviormodel.org/prompts/ · https://lawsofux.com/hicks-law/

### CV-03 Steps and form length
- **Look for:** The number of checkout steps and of fields shown by default. Baymard benchmarks: an average of **23.48 form elements / 14.88 form fields** shown by default against an ideal of **12–14 elements / 7–8 fields** (list page, updated 2026-10-28). The checkout-length benchmark gives **11.3 fields and 5.1 steps** for new users in 2024, and "most sites need only 8 form fields". Flag a "confirm email" field, a separate name split where not needed, optional fields shown by default, "Company" or "Address line 2" always visible, and billing address not defaulting to "same as shipping".
- **Test:** Count the visible `input`/`select`/`textarea` elements on each checkout or signup step. Compare to the benchmarks. Mark every field that is not required to fulfil the order.
- **Severity:** High if more than about 15 fields or 5+ steps for a guest. Medium if 9–15 fields.
- **Source:** https://baymard.com/lists/cart-abandonment-rate · https://baymard.com/blog/checkout-flow-average-form-fields

### CV-04 Forced account creation / guest checkout
- **Look for:** Can a user buy without an account? Is "Guest checkout" the *most prominent* option? Baymard: 62% of sites don't make it most prominent (2026 guide). 18% of shoppers abandoned because the site wanted an account created. Account creation is best offered *after* purchase, on the confirmation step (42% of sites don't do this).
- **Test:** Walk the flow from the cart. Check whether a login or register wall appears before shipping details, and whether the guest option is a link or secondary button below login.
- **Severity:** Critical if there is no guest path (e-commerce). High if the guest option is buried.
- **Source:** https://baymard.com/blog/checkout-flow-ux-optimization · https://baymard.com/research-articles/make-guest-checkout-prominent · https://baymard.com/research-articles/delayed-account-creation

### CV-05 Cost transparency (total cost up front)
- **Look for:** Shipping, taxes and fees visible or estimable on the product page and in the cart, before the payment step. Baymard: **40%** abandon because extra costs are too high (the #1 reason). **12%** abandon because they couldn't see or calculate the total up front. **43%** of sites don't show shipping info on the product page, though 64% of users look for it there. In regulated sectors the law also applies: US FTC fees rule (live events, short-term lodging) and UK DMCC drip-pricing ban (all sectors). See ethics.md.
- **Test:** Add an item to the cart and record the price at each step (product, cart, shipping, payment, review). Any mandatory charge that first appears late is a finding. Check for a shipping cost estimator and a free-shipping threshold.
- **Severity:** Critical if mandatory fees appear only at the final step (a legal risk too). High if shipping cost is unknown until after address entry.
- **Source:** https://baymard.com/lists/cart-abandonment-rate · https://baymard.com/learn/ux-statistics

### CV-06 Trust and security cues
- **Look for:** Visually enclosed card fields, with a lock or seal *inside* that area. HTTPS everywhere. Recognizable payment logos. Contact info (phone, email, address) reachable from checkout. Company identity. No mixed-content warnings. Baymard: **19%** abandon over not trusting the site with card info.
- **Test:** Inspect the payment step: is the card section styled distinctly? Are there policy and contact links in the checkout footer? Check the TLS certificate and console warnings.
- **Severity:** High on payment step. Medium elsewhere.
- **Source:** https://baymard.com/research-articles/perceived-security-of-payment-form · https://baymard.com/blog/site-seal-trust

### CV-07 Social proof: reviews and ratings
- **Look for:** Ratings near the product title and CTA. Review count. Distribution including negative reviews. Merchant responses to negative reviews (80% of sites don't respond, per Baymard). Reviews must be genuine and verified. Fake or unverified "verified" claims are illegal in the EU and UK (see ethics.md).
- **Test:** Check that product pages show rating, count and recent dated reviews. Check for an all-5-star pattern or no way to see low ratings.
- **Severity:** Medium (High for unknown brands or expensive items).
- **Source:** https://baymard.com/learn/ux-statistics · https://www.influenceatwork.com/6-principles-of-persuasion/

### CV-08 Returns and delivery information
- **Look for:** Return policy summary or link on the product page and in checkout, in plain language. Delivery shown as a *date* ("Arrives Thu 14 Nov"), not just a speed ("3–5 business days"; 41% of sites don't use dates, per Baymard). Abandonment: **20%** delivery too slow, **13%** returns policy unsatisfactory.
- **Test:** Search the product page and checkout for return and delivery text. Check for jargon and whether the policy states the return window and who pays return shipping.
- **Severity:** Medium. High for apparel and expensive goods.
- **Source:** https://baymard.com/lists/cart-abandonment-rate · https://baymard.com/research-articles/shipping-speed-vs-delivery-date · https://baymard.com/learn/ux-statistics

### CV-09 Page speed / Core Web Vitals
- **Look for:** "Good" thresholds at the 75th percentile of real users: **LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1**. Business link: Deloitte/Google 2020 found +0.1 s speed across the journey went with +8.4% retail and +10.1% travel conversions. Google/SOASTA 2017 found bounce probability +32% going from 1 s to 3 s load.
- **Test:** Run Lighthouse or PageSpeed Insights (lab) and check the CrUX field data if it is available, for home, category, product, cart and checkout pages on mobile. Note third-party scripts on checkout.
- **Severity:** High if LCP > 4 s, INP > 500 ms or CLS > 0.25 (the "poor" thresholds) on key pages. Medium if in "needs improvement".
- **Source:** https://web.dev/articles/vitals · https://web.dev/case-studies/milliseconds-make-millions · https://www2.deloitte.com/content/dam/Deloitte/ie/Documents/Consulting/Milliseconds_Make_Millions_report.pdf

### CV-10 Form input usability
- **Look for:** Correct `type` / `inputmode` (email, tel, numeric) and `autocomplete` tokens (`name`, `email`, `street-address`, `postal-code`, `cc-number`, `one-time-code`). Visible labels, not placeholder-only. Address autocomplete or lookup. Single full-name field where possible. No split card number fields. Baymard: **61%** of mobile sites use the wrong keyboard for at least one field.
- **Test:** Parse the form HTML for each input's `type`, `inputmode`, `autocomplete` and `<label for>`. Try browser autofill.
- **Severity:** High if autofill is broken on checkout. Medium otherwise.
- **Source:** https://web.dev/articles/payment-and-address-form-best-practices · https://web.dev/articles/sign-up-form-best-practices · https://baymard.com/labs/touch-keyboard-types · https://baymard.com/learn/ux-statistics

### CV-11 Validation and error recovery
- **Look for:** Inline validation on blur, not on every keystroke and not only on submit. 31% of sites have none (Baymard). Specific, plain error messages next to the field (98% of sites don't use adaptive messages). Card data kept after an error (34% of sites clear it). Card numbers Luhn-checked client-side. Errors must not wipe the form. **17%** abandon due to site errors or crashes.
- **Test:** Submit empty and invalid values (bad email, short ZIP, wrong card number). Record whether the message is specific, where it appears, whether data persists, and whether focus moves to the first error.
- **Severity:** High if data is lost or messages are generic on checkout. Medium otherwise.
- **Source:** https://baymard.com/research-articles/inline-form-validation · https://baymard.com/research-articles/preserve-card-details-on-error · https://www.nngroup.com/articles/error-message-guidelines/

### CV-12 Payment options and decline handling
- **Look for:** Payment methods suited to the market (cards plus local wallets or methods), express checkout (Apple Pay, Google Pay, PayPal) offered early. A clear message and retry path for declined cards. Abandonment: **9%** not enough payment methods, **10%** card declined.
- **Test:** List the methods shown and compare them to the target market. Check whether express pay appears on the cart or product page. Read the decline copy if testable (use test cards only in test mode).
- **Severity:** Medium. High if a dominant local method is missing.
- **Source:** https://baymard.com/lists/cart-abandonment-rate

### CV-13 Mobile ergonomics
- **Look for:** Tap targets at least 24×24 CSS px (WCAG 2.2 AA minimum). Platform guidance is 44×44 pt on iOS and 48×48 dp on Android. Adequate spacing: Baymard finds 66% of mobile sites put tappable elements too close together and 32% make them too small. A sticky or always-reachable primary CTA on long product pages. No horizontal scroll. Correct keyboards (CV-10).
- **Test:** Emulate a 375 px viewport and measure bounding boxes of interactive elements. Check that the CTA is visible after scrolling the gallery or reviews.
- **Severity:** High if the CTA is unreachable or targets are misclicked on checkout. Medium otherwise.
- **Source:** https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html · https://developer.apple.com/design/human-interface-guidelines/accessibility · https://support.google.com/accessibility/android/answer/7101858 · https://baymard.com/learn/ux-statistics

### CV-14 Distractions and exits in the funnel
- **Look for:** Full site navigation, promo banners, pop-ups or newsletter overlays during checkout. 59% of sites use aggressive ads, pop-ups or overlays on the homepage (Baymard). A coupon field that is very prominent sends users off-site to hunt for codes. Interstitials that block the CTA.
- **Test:** Count the outbound links and overlays on the cart and checkout pages. Note modals that fire on entry or on exit intent.
- **Severity:** Medium. High if an overlay blocks the CTA on mobile.
- **Source:** https://baymard.com/learn/ux-statistics · https://www.nngroup.com/articles/minimize-cognitive-load/

### CV-15 Choice architecture and plan or option clarity
- **Look for:** Pricing tables with too many equally weighted tiers. No recommended or default option. Variant selectors (size, color) with unclear stock state. Hidden differences between plans. Defaults must be honest: no pre-ticked paid add-ons (see ethics.md).
- **Test:** Count options per decision. Check for a highlighted recommendation and a comparison of key differences. Check that unavailable variants are shown as such.
- **Severity:** Medium.
- **Source:** https://lawsofux.com/hicks-law/ · https://www.nngroup.com/articles/minimize-cognitive-load/

### CV-16 Lead or signup form specifics
- **Look for:** Only the fields needed for the first value (often email only, or SSO). The password rules shown up front, with a show-password toggle. No forced phone number without a stated reason. A clear statement of what happens next. Consent checkboxes left unticked.
- **Test:** Count fields, check the `autocomplete="new-password"` / `email` tokens, try the flow with a password manager, check that the success state explains the next step.
- **Severity:** High if more than about 5 fields for a top-of-funnel lead. Medium otherwise.
- **Source:** https://web.dev/articles/sign-up-form-best-practices · https://www.nngroup.com/articles/4-principles-reduce-cognitive-load/

### CV-17 Product page completeness
- **Look for:** Images that show scale (42% of users struggled to judge size; 28% of sites lacked an "in scale" image). Clarity on included accessories (44% of sites fail). Specifications. Shipping and returns info (CV-05, CV-08).
- **Test:** Compare the product page content against the questions a buyer must answer before buying (size or fit, what's included, cost to door, when it arrives, can I return it).
- **Severity:** Medium to High depending on the category.
- **Source:** https://baymard.com/learn/ux-statistics
