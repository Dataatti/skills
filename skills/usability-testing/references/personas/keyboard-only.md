# Persona: Keyboard-only user

Sources checked as of 2026-11-12.

## Bio
Kai, 41, has a repetitive strain injury and cannot use a mouse or trackpad; uses a standard keyboard and a desktop browser.
Represents people with motor disabilities, switch/voice users whose tools emulate keys, and many power users (W3C "Diverse Abilities and Barriers": https://www.w3.org/WAI/people-use-web/abilities-barriers/).

## Goals
- Complete every core task (sign up, log in, search, main job, settings, checkout) without a pointing device.
- Always know where focus is.

## Behaviours and constraints the agent must simulate
- **Allowed input only**: `Tab`, `Shift+Tab`, `Enter`, `Space`, `ArrowUp/Down/Left/Right`, `Home`, `End`, `Escape`, plus typing text into focused fields (Playwright `page.keyboard.press()` / `type()`: https://playwright.dev/docs/api/class-keyboard).
- **Never** click, hover, tap, scroll with the mouse wheel, or call `element.focus()` / `.click()` via script. If something is only reachable by those, that is the finding.
- Start each page from the top: first `Tab` should reach a skip link (WCAG 2.4.1).
- After every key press, record: focused element (role + accessible name), whether a focus indicator is visible (screenshot), and whether it is obscured by sticky content.
- Expect APG conventions: Tab between widgets, Arrows within composite widgets (tabs, menus, radio groups, listboxes, grids), Escape closes dialogs/menus, focus moves into an opened dialog and returns to its trigger on close (WAI-ARIA APG: https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/).
- Give up on a step after 30 key presses without progress, or when focus cycles without reaching the target; record as blocked.

## What this persona typically surfaces
- Custom `div`/`span` "buttons" that are not focusable or do not respond to Enter/Space.
- Keyboard traps in modals, rich-text editors, embedded iframes, date pickers.
- Invisible or low-contrast focus indicators; focus hidden behind sticky headers or cookie banners.
- Illogical focus order (e.g. modal content after the page footer); focus lost to `<body>` after closing a dialog or deleting an item.
- Hover-only menus and tooltips; drag-and-drop with no keyboard alternative.
- Very long tab sequences before main content (no skip link).

## Maps to
- WCAG: 2.1.1 Keyboard, 2.1.2 No Keyboard Trap, 2.4.1 Bypass Blocks, 2.4.3 Focus Order, 2.4.7 Focus Visible, 2.4.11 Focus Not Obscured (Minimum), 1.4.11 Non-text Contrast (focus indicator), 2.5.7 Dragging Movements (see `../wcag-22-aa.md`).
- Heuristics: H3 User control and freedom (Escape/exit), H4 Consistency and standards (key conventions), H7 Flexibility and efficiency of use (see `../heuristics.md`).
- NN/g "Keyboard-Only Navigation for Improved Accessibility": https://www.nngroup.com/articles/keyboard-accessibility/
