# WCAG 2.2 Level A and AA: agent-testable criteria

Sources checked as of 2026-11-12.

## Status

- WCAG 2.2 is a W3C Recommendation, first published 5 October 2023; the current edition is dated 12 December 2024: https://www.w3.org/TR/WCAG22/
- WCAG 2.2 (the October 2023 version) is approved as ISO/IEC 40500:2025, announced by W3C on 21 October 2025: https://www.w3.org/WAI/news/2025-10-21/wcag22-iso
- 4.1.1 Parsing is obsolete and removed in WCAG 2.2: https://www.w3.org/WAI/WCAG22/Understanding/parsing.html
- EU: the European Accessibility Act, Directive (EU) 2019/882, applies from 28 June 2025 (Art. 31): https://eur-lex.europa.eu/eli/dir/2019/882/oj . Its harmonised standard EN 301 549 (V3.2.1) maps web content to WCAG 2.1 Level AA: https://www.etsi.org/deliver/etsi_en/301500_301599/301549/03.02.01_60/en_301549v030201p.pdf . W3C says it is working to update EN 301 549 to WCAG 2.2 (announcement above). Testing to 2.2 AA covers 2.1 AA.
- Automated or agent checks do not prove conformance. Report them as "likely failure / needs human verification" unless the failure is unambiguous.

## How to read this file

Each row: number, name, level, one test an agent can run, link to the W3C Understanding document. Grouped by the persona that most naturally surfaces it (see `personas/`).

## Keyboard (persona: keyboard-only)

| SC | Name | Level | Agent test | Understanding |
|---|---|---|---|---|
| 2.1.1 | Keyboard | A | Complete every core task using only Tab/Shift+Tab/Enter/Space/Arrows/Escape; any task needing a click is a failure | https://www.w3.org/WAI/WCAG22/Understanding/keyboard.html |
| 2.1.2 | No Keyboard Trap | A | Tab into every widget (modal, editor, iframe, date picker) and confirm you can leave it with Tab/Shift+Tab/Escape | https://www.w3.org/WAI/WCAG22/Understanding/no-keyboard-trap.html |
| 2.4.1 | Bypass Blocks | A | First Tab on a page reaches a working "Skip to main content" link (or landmarks/headings exist) | https://www.w3.org/WAI/WCAG22/Understanding/bypass-blocks.html |
| 2.4.3 | Focus Order | A | Record the sequence of focused elements; flag order that contradicts visual/reading order, or focus not moving into an opened dialog / not returning after close | https://www.w3.org/WAI/WCAG22/Understanding/focus-order.html |
| 2.4.7 | Focus Visible | AA | Screenshot after each Tab; flag any focused element with no visible indicator | https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html |
| 2.4.11 | Focus Not Obscured (Minimum) | AA | For each focused element, check it is not entirely hidden by a sticky header/footer, cookie banner or chat widget | https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html |

## Screen reader (persona: screen-reader-low-vision)

| SC | Name | Level | Agent test | Understanding |
|---|---|---|---|---|
| 1.1.1 | Non-text Content | A | In the accessibility tree, every informative image/icon button has a meaningful name; decorative images are hidden | https://www.w3.org/WAI/WCAG22/Understanding/non-text-content.html |
| 1.3.1 | Info and Relationships | A | Headings, lists, tables, form groups (fieldset/legend) and landmarks exist as roles in the tree, not just as visual styling | https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html |
| 1.3.5 | Identify Input Purpose | AA | Personal-data fields (name, email, tel, address, cc-*) carry the correct `autocomplete` token | https://www.w3.org/WAI/WCAG22/Understanding/identify-input-purpose.html |
| 2.4.2 | Page Titled | A | `document.title` is unique and describes the page/step; changes on SPA route changes | https://www.w3.org/WAI/WCAG22/Understanding/page-titled.html |
| 2.4.4 | Link Purpose (In Context) | A | List all link names; flag "click here", "more", duplicates going to different places without context | https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context.html |
| 2.4.6 | Headings and Labels | AA | Headings and labels describe topic/purpose (read the heading outline alone) | https://www.w3.org/WAI/WCAG22/Understanding/headings-and-labels.html |
| 3.3.2 | Labels or Instructions | A | Every input has a visible label or instruction; required formats are stated before input | https://www.w3.org/WAI/WCAG22/Understanding/labels-or-instructions.html |
| 4.1.2 | Name, Role, Value | A | Every interactive element has an accessible name, a correct role, and exposes state (expanded, checked, selected, pressed) | https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html |
| 4.1.3 | Status Messages | AA | Success/error/"loading"/"3 results" messages are in a live region or role=status/alert, so they are announced without moving focus | https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html |

## Low vision (persona: screen-reader-low-vision)

| SC | Name | Level | Agent test | Understanding |
|---|---|---|---|---|
| 1.4.3 | Contrast (Minimum) | AA | Text contrast at least 4.5:1, or 3:1 for large text (18pt / 14pt bold) | https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html |
| 1.4.4 | Resize Text | AA | Zoom to 200%; no text clipped, overlapping or missing; functionality intact | https://www.w3.org/WAI/WCAG22/Understanding/resize-text.html |
| 1.4.10 | Reflow | AA | 320 CSS px wide viewport (equals 1280 px at 400%): no two-dimensional scrolling for text content, nothing lost | https://www.w3.org/WAI/WCAG22/Understanding/reflow.html |
| 1.4.11 | Non-text Contrast | AA | Input borders, focus indicators, icons and control states at least 3:1 against adjacent colours | https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html |
| 1.4.12 | Text Spacing | AA | Inject line-height 1.5, paragraph spacing 2em, letter-spacing 0.12em, word-spacing 0.16em; no clipped or overlapping text | https://www.w3.org/WAI/WCAG22/Understanding/text-spacing.html |

## Mobile and motor (persona: mobile-slow-connection, also keyboard-only)

| SC | Name | Level | Agent test | Understanding |
|---|---|---|---|---|
| 2.5.8 | Target Size (Minimum) | AA | Pointer targets at least 24x24 CSS px, or spaced so a 24 px circle around each does not overlap another; exceptions: inline links, equivalent control, user-agent default, essential | https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html |
| 2.5.7 | Dragging Movements | AA | Every drag operation (sortable lists, sliders, maps, kanban) has a single-pointer alternative (buttons, click-to-move) | https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements.html |
| 1.3.4 | Orientation | AA | Rotate viewport (e.g. 375x667 and 667x375); content is not locked to one orientation | https://www.w3.org/WAI/WCAG22/Understanding/orientation.html |

## Forms and authentication (all personas, especially low-confidence)

| SC | Name | Level | Agent test | Understanding |
|---|---|---|---|---|
| 3.3.1 | Error Identification | A | Submit invalid/empty data; the error names the field and describes the problem in text (not colour only) | https://www.w3.org/WAI/WCAG22/Understanding/error-identification.html |
| 3.3.3 | Error Suggestion | AA | Error text suggests a correction when one is known ("Enter a date like 27 3 2007") | https://www.w3.org/WAI/WCAG22/Understanding/error-suggestion.html |
| 3.3.7 | Redundant Entry | A | In multi-step flows, information already entered is auto-filled or selectable, not retyped (except for security or when it is essential) | https://www.w3.org/WAI/WCAG22/Understanding/redundant-entry.html |
| 3.3.8 | Accessible Authentication (Minimum) | AA | Login does not require a cognitive test (memorise, transcribe, puzzle) without an alternative; paste and password managers work in password/code fields | https://www.w3.org/WAI/WCAG22/Understanding/accessible-authentication-minimum.html |
| 3.2.6 | Consistent Help | A | If help (contact, chat, FAQ link) appears on several pages, it is in the same relative order on each | https://www.w3.org/WAI/WCAG22/Understanding/consistent-help.html |

## Not covered here

AAA criteria (e.g. 2.4.13 Focus Appearance, 2.5.5 Target Size (Enhanced) 44x44) are useful stretch checks but not required for AA: https://www.w3.org/TR/WCAG22/
Full list and techniques: https://www.w3.org/WAI/WCAG22/quickref/
