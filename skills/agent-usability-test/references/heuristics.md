# Heuristics and interaction laws

Sources checked as of 2026-11-12.

## Nielsen's 10 usability heuristics

Source: Jakob Nielsen, "10 Usability Heuristics for User Interface Design", NN/g (first published 24 Apr 1994, last updated 30 Jan 2024): https://www.nngroup.com/articles/ten-usability-heuristics/

Use the exact names below in findings. "Observable violations" are examples an agent can see while driving a browser. They are applications of the heuristic, not quotations.

| # | Heuristic (exact name) | Meaning | Observable violations in a web app |
|---|---|---|---|
| H1 | Visibility of system status | Keep users informed about what is happening, with timely feedback | Button gives no pressed/loading state; submit with no confirmation; spinner with no end; no indication of current page/step; upload with no progress |
| H2 | Match between the system and the real world | Use the users' words and concepts; follow real-world order | Internal jargon or error codes ("ERR_422", "entity", "tenant"); developer field names as labels; dates/units in unfamiliar formats |
| H3 | User control and freedom | Give a clearly marked "emergency exit" and undo | No cancel/back in a multi-step flow; browser Back loses all form data; modal cannot be closed (no X, no Escape); destructive action without undo |
| H4 | Consistency and standards | Same words and actions mean the same thing; follow platform conventions | "Save" vs "Submit" vs "Apply" for the same thing; links styled as buttons and buttons as links; logo does not go home; nav moves between pages |
| H5 | Error prevention | Remove error-prone conditions or confirm before commit | Free-text date field with no format; delete without confirmation; allows submitting obviously invalid data; similar-looking adjacent destructive and safe buttons |
| H6 | Recognition rather than recall | Make options and information visible instead of remembered | Instructions shown only on the previous page; placeholder-only labels that vanish when typing; icon-only controls with no label or tooltip |
| H7 | Flexibility and efficiency of use | Accelerators for experts; let users tailor frequent actions | No keyboard shortcuts or bulk actions; no deep-linkable URLs for filtered/search state; no search on long lists; must repeat the same configuration each visit |
| H8 | Aesthetic and minimalist design | Remove irrelevant or rarely needed information | Primary action competes with many equal-weight buttons; walls of text before the task; promotional pop-ups covering the task |
| H9 | Help users recognize, diagnose, and recover from errors | Plain-language errors that state the problem and suggest a fix | "Invalid input" with no field; error shown only in color; error far from the field; form cleared after an error |
| H10 | Help and documentation | Easy-to-find, task-focused help | No help link in a complex flow; help is a generic FAQ unrelated to the current step; contact info hidden |

## Severity rating scale (0-4)

Source: Nielsen, "Severity Ratings for Usability Problems", NN/g: https://www.nngroup.com/articles/how-to-rate-the-severity-of-usability-problems/

| Rating | Nielsen's wording |
|---|---|
| 0 | I don't agree that this is a usability problem at all |
| 1 | Cosmetic problem only: need not be fixed unless extra time is available on project |
| 2 | Minor usability problem: fixing this should be given low priority |
| 3 | Major usability problem: important to fix, so should be given high priority |
| 4 | Usability catastrophe: imperative to fix this before product can be released |

Severity combines frequency, impact and persistence (plus market impact). See `severity-and-merging.md`.

## Fitts's law (pointing time)

- Original: Fitts, P. M. (1954). "The information capacity of the human motor system in controlling the amplitude of movement." Journal of Experimental Psychology, 47(6), 381-391. https://doi.org/10.1037/h0055392
- HCI formulation (Shannon form): MacKenzie, I. S. (1992). "Fitts' Law as a Research and Design Tool in Human-Computer Interaction." Human-Computer Interaction, 7(1), 91-139. https://doi.org/10.1207/s15327051hci0701_3

Formula (Shannon form, MacKenzie 1992):

    MT = a + b * log2(D / W + 1)

MT = movement time; D = distance to the target centre; W = target width along the axis of motion; a, b = empirically fitted constants. Fitts's original index of difficulty was log2(2D / W).

Practical implications (NN/g, "Fitts's Law and Its Applications in UX": https://www.nngroup.com/articles/fitts-law/):
- Bigger targets are faster and less error-prone; make the whole label + icon clickable, not just the icon.
- Put frequently or sequentially used controls near where the pointer already is (e.g. submit next to the last field).
- Keep small targets apart so an overshoot does not hit a neighbour.
- Screen edges/corners act as very large targets for a mouse, but give little advantage on touch.
- Agent check: measure bounding boxes of interactive elements; flag targets under 24x24 CSS px (WCAG 2.5.8, see `wcag-22-aa.md`) and under platform guidance (44 pt Apple, 48 dp Material, see `patterns.md`).

## Hick's law / Hick-Hyman law (choice time)

- Hick, W. E. (1952). "On the rate of gain of information." Quarterly Journal of Experimental Psychology, 4(1), 11-26. https://doi.org/10.1080/17470215208416600
- Hyman, R. (1953). "Stimulus information as a determinant of reaction time." Journal of Experimental Psychology, 45(3), 188-196. https://doi.org/10.1037/h0056940

Formula (common form for n equally likely choices):

    RT = a + b * log2(n + 1)

Hick used log2(n + 1) to account for the "no signal" possibility; Hyman generalised it to RT = a + b * H, where H is the information (in bits) of the stimulus set, so unequal probabilities matter.

Practical implications:
- More options means longer decisions (NN/g video "Hick's Law: Designing Long Menu Lists": https://www.nngroup.com/videos/hicks-law-long-menus/).
- The law applies to choices among known, equally relevant options. It does not say "always fewer items": a long, well-ordered (e.g. alphabetical) list that users scan for a known item can still be fast.
- Reduce simultaneous equal-weight choices in decision points (pricing tiers, primary actions, onboarding); group and progressively disclose rarely used options; give one clear primary action.
- Agent check: count visible, equally weighted primary choices at each decision point; flag where many options compete with no default or hierarchy (H8, H6).
