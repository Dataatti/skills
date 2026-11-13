# Common conversion killers (with evidence)

Sources checked as of 2026-11-12.

Baymard's full benchmark database is paid. All figures below are the ones Baymard publishes on public pages, with each page's date. When citing, quote the figure *and* the as-of date. Baymard re-surveys periodically, so the numbers change.

---

## 1. Cart abandonment baseline

- **70.22%** average documented online cart abandonment rate. This is an average of 50 studies from 2006–2025, with a range of 55–84%.
- Better checkout design could raise conversion **35.26%** for an average large e-commerce site, about **$260B** of recoverable orders in the US and EU.
- As of: Baymard list page, updated 2026-10-28. https://baymard.com/lists/cart-abandonment-rate

## 2. Reasons for abandonment during checkout (Baymard, latest survey)

These are US online shoppers who abandoned during checkout in the past 3 months, with "just browsing" excluded. Separately, 42% said they abandoned because they were "just browsing". Shoppers could pick several reasons. The public page does not state the survey year or sample size. Baymard's own articles reference a 2025 survey.

| # | Reason | % | Agent check |
|---|---|---|---|
| 1 | Extra costs too high (shipping, tax, fees) | **40%** | CV-05 |
| 2 | Delivery was too slow | **20%** | CV-08 |
| 3 | Didn't trust site with credit card info | **19%** | CV-06 |
| 4 | Site wanted me to create an account | **18%** | CV-04 |
| 5 | Too long / complicated checkout | **17%** | CV-03 |
| 5 | Website had errors / crashed | **17%** | CV-11, CV-09 |
| 7 | Returns policy wasn't satisfactory | **13%** | CV-08 |
| 8 | Couldn't see / calculate total cost up front | **12%** | CV-05 |
| 9 | Credit card was declined | **10%** | CV-12 |
| 10 | Not enough payment methods | **9%** | CV-12 |
| — | Don't know | 7% | — |

As of: https://baymard.com/lists/cart-abandonment-rate (updated 2026-10-28). The figures also appear in https://baymard.com/blog/checkout-flow-ux-optimization (updated 2026-11-02).

**Version note.** Baymard's "UX statistics" page (updated 2026-06-08) still shows an *earlier* survey's figures: extra costs 48%, account creation 24%, slow delivery 22%, trust 18%, too long 17%, total cost not visible 16%, errors 13%, returns 12%, payment methods 9%, declined card 4%. Use the list page above as the current figures. Cite the older numbers only as historical comparison. https://baymard.com/learn/ux-statistics

---

## 3. Checkout findings

| Finding | Evidence | Source / as-of |
|---|---|---|
| Too many form fields | Avg US checkout shows 23.48 form elements (14.88 fields) by default; ideal 12–14 elements (7–8 fields). Most sites can cut displayed fields by 20–60%. | baymard.com/lists/cart-abandonment-rate (2026-10-28); baymard.com/learn/ux-statistics (2026-06-08) |
| Checkout length (benchmark) | 11.3 fields and 5.1 steps on average for new users (2024), down from 11.8 (2021) and 12.7 (2019). "Most sites need only 8 form fields". | https://baymard.com/blog/checkout-flow-average-form-fields |
| Guest checkout not prominent | 62% of sites don't make guest checkout the most prominent option. | https://baymard.com/blog/checkout-flow-ux-optimization (2026-11-02). An earlier article said 47%: https://baymard.com/research-articles/make-guest-checkout-prominent |
| Account creation asked too early | 42% of sites don't delay account creation to the confirmation step. | https://baymard.com/research-articles/delayed-account-creation |
| No inline validation | 31% of sites have no live inline validation. | https://baymard.com/research-articles/inline-form-validation (Jan 2024) |
| Generic error messages | 98% of sites don't use specific, adaptive error messages. | https://baymard.com/blog/checkout-flow-ux-optimization |
| Card data wiped on error | 34% of sites don't keep card data after validation errors. | https://baymard.com/research-articles/preserve-card-details-on-error |
| Delivery shown as speed, not date | 41% of sites don't show a delivery date. | https://baymard.com/research-articles/shipping-speed-vs-delivery-date |
| Card fields not visually set apart | Users judge security from visual cues. Enclosing the card fields and placing 1–2 seals inside works well. 89% got this wrong in the original (2012-era) benchmark, so the figure is dated. | https://baymard.com/blog/visually-reinforce-sensitive-fields ; https://baymard.com/research-articles/perceived-security-of-payment-form |

## 4. Product page findings

| Finding | Evidence | Source / as-of |
|---|---|---|
| Shipping cost missing on product page | 43% of sites don't show shipping info there; 64% of users look for it there. | https://baymard.com/learn/ux-statistics (2026-06-08) |
| Returns info missing | 42% of sites don't show or link to return info on the product page. 10% of those that link use jargon. | same |
| Can't judge size or scale | 42% of test users struggled to judge size from images. 28% of sites lack an "in scale" image. | same |
| Included accessories unclear | 44% of sites don't show included accessories or make clear what's in the price. | same |
| Negative reviews ignored | 80% of sites don't respond to negative reviews. | same |

## 5. Mobile findings

| Finding | Evidence | Source / as-of |
|---|---|---|
| Wrong keyboard type | 61% of mobile sites use the wrong keyboard for at least one field (an earlier version of the page said 63%). | https://baymard.com/learn/ux-statistics (2026-06-08) |
| Tap targets too close or small | 66% too close together; 32% too small. | same |
| Ads and overlays on the homepage | 59% use aggressive ads, pop-ups or overlays. 95% of mobile sites put ads in primary homepage areas. | same |
| Search not prominent | 22% don't show the search field prominently on the homepage. | same |

## 6. Speed findings

| Finding | Evidence | Source / as-of |
|---|---|---|
| Small speed gains move revenue | +0.1 s across mobile journey: +8.4% retail conversions, +10.1% travel, +9.2% retail AOV. Google-commissioned, Deloitte, 2020, 37 brands. | https://www.deloitte.com/ie/en/services/consulting/research/milliseconds-make-millions.html ; https://web.dev/case-studies/milliseconds-make-millions |
| Bounce rises with load time | Probability of bounce +32% from 1 s to 3 s load (Google/SOASTA, 2017). The original Think with Google URL now redirects; the figure is reproduced in the Deloitte report. | https://www2.deloitte.com/content/dam/Deloitte/ie/Documents/Consulting/Milliseconds_Make_Millions_report.pdf |
| CWV thresholds | Good: LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1 (p75). | https://web.dev/articles/vitals |

**Caution.** The widely quoted "53% of mobile visits abandoned after 3 s" could not be traced to a live primary source in this check. Don't cite it unless you can verify it.

## 7. Lead and signup form findings (qualitative, well established)

- **Asking for too much too early.** Phone, company size and job title before any value. This works against reciprocity and adds ability cost. https://web.dev/articles/sign-up-form-best-practices
- **Placeholder-only labels, no autofill tokens, password rules hidden until an error.** https://web.dev/articles/sign-up-form-best-practices · https://www.nngroup.com/articles/4-principles-reduce-cognitive-load/
- **Errors shown far from the field or only after submit.** https://www.nngroup.com/articles/4-principles-reduce-cognitive-load/ · https://www.nngroup.com/articles/error-message-guidelines/
- **No confirmation of what happens next** (no expectation set for an email or call). A prompt with no clear outcome. https://behaviormodel.org/prompts/

## 8. How to report a finding

Use one line per issue: `CV-xx | page/step | evidence observed | why it leaks (principle + stat with as-of date) | fix | severity`. Never present a Baymard average as the site's own measured loss. Present it as industry evidence.
