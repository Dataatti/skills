# Recognised form, navigation and performance patterns

Sources checked as of 2026-11-12.

Use these as the "expected" behaviour when judging what the agent observes. Cite the pattern's source in the finding.

## Forms

| Pattern | Expected behaviour | Agent check | Source |
|---|---|---|---|
| Labels above fields | Visible label close to its field, above it on mobile and short forms; single-column layout | Every input has a visible `<label>` adjacent to it; label not equidistant between two fields | NN/g "Website Forms Usability: Top 10 Recommendations" (rec. 2, 3): https://www.nngroup.com/articles/web-form-design/ |
| No placeholder-as-label | Placeholder text causes usability problems; do not use it in place of a label | Type into a field; if the only hint disappears, flag (H6, WCAG 3.3.2) | NN/g rec. 5: https://www.nngroup.com/articles/web-form-design/ ; https://www.nngroup.com/articles/form-design-placeholders/ |
| Inline validation timing | Do not show an error before the user has finished with the field; validate after leaving the field (exception: e.g. password strength while typing) | Type one character into email, check for premature error; tab away, check message appears near field | NN/g "10 Design Guidelines for Reporting Errors in Forms": https://www.nngroup.com/articles/errors-forms-design-guidelines/ |
| Validate on submit (GOV.UK) | GOV.UK: do not validate as the user leaves a field; validate when they try to continue, unless research shows inline helps | Note which approach the app uses; either is acceptable if consistent and not premature | GOV.UK Validation pattern: https://design-system.service.gov.uk/patterns/validation/ |
| Error summary | On a failed submit: summary at top of `main` (below back link/breadcrumbs, above `h1`), heading "There is a problem", each error links to its field, focus moves to summary, page `<title>` prefixed "Error:"; plus an inline message at each field | Submit empty form; check focus position, links move focus to fields, title change | GOV.UK Error summary: https://design-system.service.gov.uk/components/error-summary/ ; Error message: https://design-system.service.gov.uk/components/error-message/ |
| One thing per page | Start with one question per page; group only when research supports it | In long flows, count questions per step; flag overloaded steps for low-confidence persona | GOV.UK Question pages: https://design-system.service.gov.uk/patterns/question-pages/ ; Service Manual form structure: https://www.gov.uk/service-manual/design/form-structure |
| Required/optional marking | Minimise optional fields and label them "(optional)"; GOV.UK: never mark mandatory fields with asterisks | Check that required/optional status is stated in text, consistently | GOV.UK Question pages (above); NN/g rec. 7: https://www.nngroup.com/articles/web-form-design/ |
| Input types and keyboards | Use `type=email`, `tel`, `url`, `number`/`inputmode=numeric`, `date` etc. so mobile shows the right keyboard and browsers validate | Inspect `type`/`inputmode` on each field | web.dev "Payment and address form best practices": https://web.dev/articles/payment-and-address-form-best-practices |
| Autocomplete attributes | Use the HTML autofill tokens (`name`, `email`, `tel`, `street-address`, `postal-code`, `cc-number`, `username`, `current-password`, `new-password`, `one-time-code`) | Inspect `autocomplete`; required for personal-data fields by WCAG 1.3.5 | HTML Standard autofill: https://html.spec.whatwg.org/multipage/form-control-infrastructure.html ; MDN: https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/autocomplete ; WCAG 2.2 input purposes: https://www.w3.org/TR/WCAG22/#input-purposes ; web.dev sign-in forms: https://web.dev/articles/sign-in-form-best-practices |
| Specific, recoverable errors | Errors visible, near the field, in plain language, not colour-only; keep the user's input | Trigger errors; verify text + icon/border, input preserved | NN/g rec. 10: https://www.nngroup.com/articles/web-form-design/ ; NN/g "Error-Message Guidelines": https://www.nngroup.com/articles/error-message-guidelines/ |

## Navigation

| Pattern | Expected behaviour | Agent check | Source |
|---|---|---|---|
| Skip link | First focusable element is "Skip to main content", visible on focus, moves focus to main | Press Tab once on a fresh page | GOV.UK Skip link: https://design-system.service.gov.uk/components/skip-link/ ; WebAIM: https://webaim.org/techniques/skipnav/ ; WCAG technique G1: https://www.w3.org/WAI/WCAG22/Techniques/general/G1 |
| Breadcrumbs | Secondary aid; show site hierarchy, not session history; current page last and not a link; compact on mobile | Compare trail with URL/hierarchy; check last item is not a link | NN/g "Breadcrumbs: 11 Design Guidelines": https://www.nngroup.com/articles/breadcrumbs/ ; GOV.UK: https://design-system.service.gov.uk/components/breadcrumbs/ |
| Consistent navigation | Same navigation in the same order across pages; same names for same functions | Snapshot nav on 3+ pages and diff | NN/g "Consistency and Standards": https://www.nngroup.com/articles/consistency-and-standards/ ; WCAG 3.2.3 Consistent Navigation (AA): https://www.w3.org/WAI/WCAG22/Understanding/consistent-navigation.html |
| Visible navigation over hidden | Hiding main navigation behind a hamburger cut discoverability almost in half on desktop | On desktop widths, note if primary nav is hidden behind an icon | NN/g "Hamburger Menus and Hidden Navigation Hurt UX Metrics": https://www.nngroup.com/articles/hamburger-menus/ |
| Visible focus | Every focused element has a visible indicator with sufficient contrast | Screenshot after each Tab | WCAG 2.4.7: https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html ; 1.4.11: https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html |
| Widget keyboard conventions | Tab moves between widgets; Arrows inside composite widgets (tabs, menus, radio groups, listbox); Escape closes dialogs/menus; focus returns to trigger | Exercise each widget per its APG pattern | WAI-ARIA APG "Developing a Keyboard Interface": https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/ ; patterns index: https://www.w3.org/WAI/ARIA/apg/patterns/ |

## Touch target sizes

| Guideline | Size | Source |
|---|---|---|
| WCAG 2.2 SC 2.5.8 (AA, normative) | at least 24x24 CSS px (or spacing exception) | https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html |
| WCAG 2.2 SC 2.5.5 (AAA) | at least 44x44 CSS px | https://www.w3.org/WAI/WCAG22/Understanding/target-size-enhanced.html |
| Apple HIG (iOS/iPadOS) | hit region at least 44x44 pt default; 28x28 pt minimum | https://developer.apple.com/design/human-interface-guidelines/buttons ; https://developer.apple.com/design/human-interface-guidelines/accessibility |
| Android / Material | at least 48x48 dp, separated by 8 dp or more | https://support.google.com/accessibility/android/answer/7101858 |

Report under-24 px as a WCAG failure; 24-44 px on touch as a usability (Fitts) finding citing Apple/Material.

## Performance

Core Web Vitals "good" thresholds, assessed at the 75th percentile of page loads (web.dev "Web Vitals": https://web.dev/articles/vitals):

| Metric | Good | Poor | Source |
|---|---|---|---|
| LCP (Largest Contentful Paint) | at most 2.5 s | over 4.0 s | https://web.dev/articles/lcp |
| INP (Interaction to Next Paint) | at most 200 ms | over 500 ms | https://web.dev/articles/inp |
| CLS (Cumulative Layout Shift) | at most 0.1 | over 0.25 | https://web.dev/articles/cls |

A single agent run is lab data, not field (75th percentile) data. Label numbers as "lab, single run, throttled profile X".

Nielsen's response-time limits (NN/g "Response Times: The 3 Important Limits": https://www.nngroup.com/articles/response-times-3-important-limits/):
- 0.1 s: feels instantaneous; no feedback needed beyond the result.
- 1 s: user's flow of thought stays uninterrupted, though the delay is noticed.
- 10 s: limit for keeping attention on the task; longer needs a progress indicator (percent-done) and the ability to do something else.

Agent check: time from action to visible feedback. Over 1 s with no feedback is H1 (visibility of system status); over 10 s without progress indication is severity 3 or more if it blocks the task.
