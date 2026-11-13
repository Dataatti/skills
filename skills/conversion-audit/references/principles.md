# Principles behind conversion suggestions

Sources checked as of 2026-11-12.

Each section gives what the principle says, how a breach of it shows up as a conversion leak, and where it comes from. Use these to explain *why* a finding matters. They are not a license to manipulate (see `ethics.md`).

---

## 1. Fogg Behavior Model (B = MAP)

**What it says.** A behavior happens when Motivation, Ability and a Prompt come together at the same moment. "When a behavior does not occur, at least one of those three elements is missing." Ability is a matter of simplicity, and "your weakest link determines what makes a behavior hard to do" (time, money, effort and so on). A prompt is whatever tells the person to act, such as a call to action or a request. "Without a Prompt, the target behavior will not happen."

**How it leaks.**
- *Motivation gap:* the value proposition is unclear or missing above the fold, or there are no benefits next to the CTA.
- *Ability gap:* long forms, forced account creation, unclear pricing, slow pages. Each one makes the task harder, and the hardest step decides the outcome.
- *Prompt gap:* the primary CTA is missing, weak, below the fold, competes with secondary buttons, or does not appear at the moment motivation peaks (for example, no "Add to cart" next to reviews).

**Agent heuristic.** For each step that drops off, ask which of M, A or P is weakest. Fix ability first, because it is usually cheaper and more reliable than raising motivation.

Sources: https://behaviormodel.org/ · https://behaviormodel.org/ability/ · https://behaviormodel.org/prompts/

---

## 2. Cialdini's seven principles of influence

**What it says.** The seven are reciprocity, commitment/consistency, social proof, authority, liking, scarcity, and **unity** (shared identity, the "we"). Unity was added in the revised edition of *Influence* (2021). Cialdini presents these as ethical shortcuts that work only when they are *true*.

| Principle | Legitimate use in a flow | Leak when absent or misused |
|---|---|---|
| Reciprocity | Free shipping or returns, useful content, a free sample | Asking for email or phone before giving any value |
| Commitment/consistency | Small first step (e.g. pick a plan, then details), progress indicator | Big ask up front, with no sense of progress |
| Social proof | Real reviews, ratings, counts of real customers | No reviews, or only 5-star reviews (seen as fake) |
| Authority | Real certifications, expert endorsements, press | Unverifiable badges |
| Liking | Human tone, real team photos, consistent brand | Generic stock photos, hostile copy |
| Scarcity | *Real* stock levels, *real* deadlines | Fake timers and fake "only 2 left" (illegal, see ethics.md) |
| Unity | Community or "made by people like you" when true | Fake "insider" framing |

Sources: https://www.influenceatwork.com/6-principles-of-persuasion/ · https://www.influenceatwork.com/announcement/the-new-revision-of-influence/

---

## 3. Cognitive load theory (Sweller)

**What it says.** Working memory is limited. Load that does not serve the task ("extraneous" load) uses up capacity the person needs for the task itself. The theory comes from learning research (Sweller 1988). NN/g applies it to UI: an interface's cognitive load is the mental resources needed to operate it, so remove extraneous load. Forms should follow four principles: structure, transparency, clarity and support. Put error messages next to the field they refer to.

**How it leaks.** Dense product pages, jargon, unlabelled fields (placeholder-only labels), memory demands (re-typing a card number after an error), ambiguous options (shipping speed in days instead of a delivery date), and too much on screen during checkout.

Sources: Sweller, J. (1988) *Cognitive Science* 12(2):257–285, https://doi.org/10.1207/s15516709cog1202_4 · https://www.nngroup.com/articles/minimize-cognitive-load/ · https://www.nngroup.com/articles/4-principles-reduce-cognitive-load/

---

## 4. Hick's law (choice overload)

**What it says.** Decision time grows (logarithmically) with the number and uncertainty of options (Hick 1952; Hyman 1953). Laws of UX says to minimize choices when response time matters and to highlight recommended options. Fewer is not always better: too few options can hide important differences.

**How it leaks.** Many plan tiers with no recommended option, mega-menus with no hierarchy, many equally weighted CTAs, unfiltered long payment or shipping lists.

Sources: https://lawsofux.com/hicks-law/ · https://en.wikipedia.org/wiki/Hick%27s_law (background on the original 1952 study)

---

## 5. Friction

**What it says.** Every extra field, step, decision, page load or context switch costs ability (Fogg) and attention (cognitive load). Baymard's large-scale checkout testing finds that the average US checkout shows about 23.5 form elements by default (about 14.9 counting only form fields), while an ideal checkout needs about 12–14 elements (7–8 fields). Baymard's checkout benchmark also counts 11.3 fields and 5.1 steps on average for new users (2024), and "most sites need only 8 form fields". Most sites can cut displayed fields by 20–60%.

**How it leaks.** Forced account creation, separate "confirm email" fields, a separate billing address shown by default, optional fields shown up front, "Address line 2" always visible, re-entering data, CAPTCHA before purchase.

Sources: https://baymard.com/lists/cart-abandonment-rate (updated 2026-10-28) · https://baymard.com/blog/checkout-flow-average-form-fields · https://baymard.com/learn/ux-statistics

---

## 6. Trust signals

**What it says.** People decide whether a site is safe from visual cues, not from encryption. Baymard found that users see some parts of a checkout page as more secure than others even though every field on an HTTPS page is equally encrypted. Visually enclosing the card fields and placing 1–2 seals or icons inside that area tested well. In Baymard's seal study, *some* visible seal mattered more than *which* one. 19% of shoppers abandoned because they "didn't trust the site with credit card information".

**How it leaks.** No contact info, no returns policy link near the CTA, unstyled payment iframe, third-party redirects with no warning, broken images or typos, no reviews.

Sources: https://baymard.com/research-articles/perceived-security-of-payment-form · https://baymard.com/blog/site-seal-trust · https://baymard.com/lists/cart-abandonment-rate

---

## 7. Speed as part of ability

**What it says.** Delay adds friction at every step. In a Google-commissioned study by Deloitte (2020; 37 brands, EU and US), a 0.1 s improvement in mobile speed metrics *across the whole journey* went with +8.4% conversions on retail sites and +10.1% on travel sites, plus +9.2% average order value on retail. Google/SOASTA (2017) reported that the probability of a bounce rises 32% as page load goes from 1 s to 3 s. Core Web Vitals give the thresholds to test against (see properties.md).

**How it leaks.** Slow LCP on product pages, janky INP on "Add to cart", layout shift (CLS) that moves the CTA, heavy third-party scripts on checkout.

Sources: https://www.deloitte.com/ie/en/services/consulting/research/milliseconds-make-millions.html · https://web.dev/case-studies/milliseconds-make-millions · https://www.thinkwithgoogle.com/marketing-strategies/app-and-mobile/page-load-time-statistics/ (original URL, now redirects to business.google.com, so cite the figure as Google/SOASTA 2017) · https://web.dev/articles/vitals

---

## 8. Baymard's checkout findings (summary)

**What it says.** Average documented cart abandonment is **70.22%** (average of 50 studies, 2006–2025). The top abandonment reason is extra costs too high (shipping, tax, fees), at **40%** of shoppers once "just browsing" is excluded. Baymard estimates that better checkout design can raise conversion by **35.26%** for an average large e-commerce site (about $260B in recoverable orders in the US and EU). The full reasons list is in common-findings.md.

**How it leaks.** Price surprises late in the flow, account walls, long forms, weak error handling, missing payment methods.

Source: https://baymard.com/lists/cart-abandonment-rate (updated 2026-10-28). Baymard's full benchmark is paid, so only the public figures are used here.

---

## 9. Clarity of value proposition and CTA

**What it says.** Users scan; they don't read (NN/g). If the page does not say what is offered, for whom, and why it is better, motivation never builds (Fogg's M). If the next action is ambiguous, there is no effective prompt (Fogg's P). Copy should use plain words, short sentences and the user's own vocabulary.

**How it leaks.** Clever headlines with no product noun, "Submit" or "Learn more" on a primary button, two equally prominent CTAs.

Sources: https://www.nngroup.com/articles/legibility-readability-comprehension/ · https://www.nngroup.com/articles/minimize-cognitive-load/ · https://behaviormodel.org/prompts/
