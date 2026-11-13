# Ethics: persuasion, not manipulation

Sources checked as of 2026-11-12.

**Rule for this skill.** Recommend changes that help users decide *with accurate information and less effort*. Never recommend a change that works by deceiving users, hiding information, or making it harder to refuse. If a site already uses a pattern below, report it as a **Critical** finding: it is both a conversion-trust risk and a legal risk. This file is not legal advice. Tell users to check with counsel for their jurisdiction.

## Persuasion vs manipulation: the test

| Persuasion (OK) | Manipulation (never) |
|---|---|
| True scarcity: real stock count, real sale end date | Fake countdowns, timers that reset, invented "only 2 left" |
| Real reviews, including negative ones | Fake, bought, or filtered-to-5-star reviews; unverified "verified buyer" claims |
| All-in price shown first | Drip pricing: mandatory fees revealed late |
| Clear, equal "No thanks" option | Confirmshaming ("No, I don't like saving money") |
| Opt-in add-ons | Pre-ticked paid add-ons or insurance (sneaking into the basket) |
| Cancel as easy as signup | Roach motel or obstruction: hard-to-cancel subscriptions |
| Neutral consent choices | Visual prominence that steers privacy or consent choices; nagging pop-ups |

Ask two questions. Would the user make the same choice if they saw everything plainly? Is every claim true? If either answer is "no", don't recommend it.

## Dark patterns the skill must NEVER recommend

1. **Fake urgency or scarcity.** False countdown timers, false "low stock", false "X people viewing".
2. **Drip pricing / hidden fees.** Mandatory charges left out of the headline price, or vague "service fees".
3. **Confirmshaming.** Guilt-tripping decline copy.
4. **Sneaking.** Pre-checked add-ons, items added to the basket, hidden auto-renewal.
5. **Obstruction / roach motel.** Cancellation harder than signup, or forced chat or phone to cancel.
6. **Disguised ads or bait-and-switch.** Ads styled as content; advertised price not actually available.
7. **Fake social proof.** Fabricated or incentivized-but-undisclosed reviews, fake activity notifications.
8. **Nagging and interface interference.** Repeated pop-ups after a choice was made, trick questions, double negatives, visual steering in consent dialogs.
9. **Forced continuity.** Free trial turning into a paid plan without a clear disclosure and reminder.

## Legal anchors

### United States
- **FTC staff report "Bringing Dark Patterns to Light" (Sept 15, 2022).** Catalogs dark patterns in e-commerce, subscriptions, cookie banners and children's apps. Groups them as: inducing false beliefs (fake scarcity, fake reviews, disguised ads), hiding or delaying material information (drip pricing, hidden fees), unauthorized charges (sneaking, hard-to-cancel subscriptions), and obscuring privacy choices. The FTC says some are consistently unlawful under the FTC Act §5 and ROSCA. https://www.ftc.gov/system/files/ftc_gov/pdf/P214800%20Dark%20Patterns%20Report%209.14.2022%20-%20FINAL.pdf
- **FTC Rule on Unfair or Deceptive Fees (16 CFR Part 464), effective May 12, 2025.** Covers **live-event tickets and short-term lodging**. The total price, including all mandatory fees, must be shown up front and more prominently than other pricing. Fees must be truthfully described; vague labels such as "service", "convenience" or "processing" fee are called out. Government charges, shipping and optional add-ons may be left out of the total but must be disclosed before payment. Outside these two sectors, hidden fees can still be deceptive under FTC Act §5. https://www.ftc.gov/business-guidance/resources/rule-unfair-or-deceptive-fees-frequently-asked-questions
- **Subscriptions.** The FTC's amended "click-to-cancel" Negative Option Rule was **vacated by the 8th Circuit on July 8, 2025** (on procedural grounds). **ROSCA** and the 1973 Negative Option Rule still apply, and state auto-renewal laws (e.g. California) remain. Simple cancellation is still the safe recommendation. https://www.steptoe.com/en/news-publications/ftcs-click-to-cancel-rule-vacated-by-eighth-circuit.html

### European Union
- **Digital Services Act, Art. 25.** Online platforms "shall not design, organise or operate their online interfaces in a way that deceives or manipulates" users or "materially distorts or impairs" their ability to make free and informed decisions. The Commission may give guidance on giving more prominence to some choices, repeatedly asking for a choice already made, and making cancellation harder than signup. Art. 25 does not apply where the UCPD or GDPR already covers the practice. https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32022R2065
- **Unfair Commercial Practices Directive 2005/29/EC.** This is the main rule for B2C dark patterns. Annex I ("blacklist", banned in all cases) includes falsely stating that a product is available only for a very limited time (point 7) and, since the Omnibus Directive 2019/2161, claiming that reviews come from real buyers without reasonable checks (23b) and submitting or commissioning fake reviews (23c). Commission guidance on interpreting the UCPD (C/2021/9320, Dec 2021), §4.2.7, says the UCPD applies to dark patterns whatever they are called. https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:02005L0029-20220528 · https://commission.europa.eu/law/law-topic/consumer-protection-law/unfair-commercial-practices-law/unfair-commercial-practices-directive_en
- **Price Indication Directive 98/6/EC and Consumer Rights Directive 2011/83/EU** require the total price including taxes, and require express consent for extra payments (no pre-ticked boxes, CRD Art. 22).
- **Digital Fairness Act (pending).** A Commission proposal targeting dark patterns, drip pricing and subscription traps was expected in Q4 2026 (a leaked draft points to around 11 Nov 2026). Its adoption was **not confirmed** in this check. Re-check before citing. https://www.sidley.com/en/insights/newsupdates/2025/07/eu-consults-on-digital-fairness-act-big-changes-ahead-for-consumer-facing-platforms

### United Kingdom
- **Digital Markets, Competition and Consumers Act 2024 (DMCC).** Its consumer provisions came into force **6 April 2025**. The CMA can now fine directly (up to 10% of global turnover). Drip pricing is a banned practice: mandatory charges must be in the headline price. CMA guidance on unfair commercial practices (CMA207, 4 Apr 2025, updated 18 Nov 2025) and **price transparency guidance CMA209 (18 Nov 2025)** cover this. Booking, service, admin and mandatory delivery fees belong in the first price shown, including in ads. "Partitioned pricing" without a total is also addressed. Fake reviews have separate guidance (CMA208). The CMA has also acted on fake countdown timers and pressure selling. https://www.gov.uk/government/publications/unfair-commercial-practices-cma207 · https://www.gov.uk/government/publications/price-transparency-cma209

## What to recommend instead

- Show the **all-in price** early; show shipping estimates on the product page.
- Use **true** urgency only: real stock and real deadlines, and state them precisely.
- Use **real, verifiable reviews**, including negative ones, with merchant responses.
- Give decline options in neutral copy with equal visual weight.
- Make cancellation as easy as signup; send trial-end reminders.
- Use opt-in add-ons only; leave consent boxes unticked.

These also match Baymard's evidence that hidden costs (40%) and distrust (19%) drive abandonment (https://baymard.com/lists/cart-abandonment-rate, updated 2026-10-28). Honest design and conversion point the same way.
