# Persona: Screen reader and low-vision user

Sources checked as of 2026-11-12.

This file covers two related modes. Run them as separate passes and label findings with the mode.

## Bio
Sam, 29, is blind and uses NVDA on Windows and VoiceOver on iPhone; navigates mostly by headings, landmarks and form controls.
Lena, 57, has low vision; uses 200% browser zoom and sometimes a 400% magnified view, and needs strong contrast.

Context: in WebAIM's Screen Reader User Survey #10 (Dec 2023-Jan 2024), 71.6% of respondents navigate by headings first on a lengthy page; NVDA (65.6%) and JAWS (60.5%) are the most commonly used desktop screen readers; 91.3% use a screen reader on mobile: https://webaim.org/projects/screenreadersurvey10/

## Goals
- Understand page structure and find the main task quickly.
- Fill in and submit forms knowing what each field is and whether submission succeeded.

## Mode A: screen reader - what the agent must simulate
- **Perceive only the accessibility tree**, never the screenshot. Use an accessibility snapshot (Playwright ARIA snapshot: https://playwright.dev/docs/aria-snapshots ; or CDP `Accessibility.getFullAXTree`: https://chromedevtools.github.io/devtools-protocol/tot/Accessibility/).
- **Rely only on role + accessible name + state.** An element with no name is "button" or "link" with nothing else. Visual-only cues (colour, position, icons, placeholder that disappears) do not exist for this persona.
- Navigate as screen-reader users do: list headings (outline), list landmarks, list links, list form controls; then move through the tree in DOM order. Operate controls with keyboard only (as `keyboard-only.md`).
- After each action, check whether a change was **announced**: focus moved to new content, or a live region / `role=status` / `role=alert` updated. If the screen changed visually but nothing in the tree announced it, record a 4.1.3 finding.
- Check the page `<title>` on load and after SPA route changes.
- Limitation: an automated snapshot approximates, but does not equal, real NVDA/JAWS/VoiceOver output. Mark findings "confirm with a real screen reader" when behaviour depends on the AT.

## Mode B: low vision - what the agent must simulate
- **200% zoom**: set browser zoom / `deviceScaleFactor`, or emulate a 640 px wide viewport from 1280 px. Check text is not clipped, overlapped or truncated and all functions remain (WCAG 1.4.4: https://www.w3.org/WAI/WCAG22/Understanding/resize-text.html).
- **320 px reflow check**: viewport 320 CSS px wide (equivalent to 1280 px at 400% zoom). Content must read in one direction without horizontal scrolling, except content that needs 2D layout such as data tables and maps (WCAG 1.4.10: https://www.w3.org/WAI/WCAG22/Understanding/reflow.html). Check `document.documentElement.scrollWidth <= 320`; if it is wider, find the element causing it and don't flag it when it is a data table or other 2D content that is scrollable on its own.
- **Contrast**: compute contrast for text (4.5:1, 3:1 large) and for input borders, icons and focus indicators (3:1) (1.4.3, 1.4.11).
- **Text spacing**: inject the 1.4.12 spacing CSS and look for clipped text: https://www.w3.org/WAI/WCAG22/Understanding/text-spacing.html
- At zoom, check that sticky headers/footers do not cover most of the viewport or hide focused elements (2.4.11).

## What this persona typically surfaces
- Unlabeled icon buttons, images without alt, inputs with no programmatic label.
- Missing or skipped heading levels, no `main` landmark, div-soup tables.
- Custom widgets with no role/state (dropdowns, toggles, tabs, accordions).
- Silent updates: toast messages, validation errors, cart counts, search results not announced.
- Ambiguous links ("Read more" x 10), generic page titles.
- Low-contrast placeholder/disabled-looking text and faint input borders; layouts that break or scroll sideways at 320 px; overlapping text at 200%.

## Maps to
- WCAG screen reader: 1.1.1, 1.3.1, 1.3.5, 2.4.2, 2.4.4, 2.4.6, 3.3.2, 4.1.2, 4.1.3. Low vision: 1.4.3, 1.4.4, 1.4.10, 1.4.11, 1.4.12, 2.4.11 (see `../wcag-22-aa.md`).
- Heuristics: H1 Visibility of system status (announcements), H6 Recognition rather than recall, H4 Consistency and standards.
