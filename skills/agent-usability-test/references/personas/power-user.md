# Persona: Power user

Sources checked as of 2026-11-12.

## Bio
Priya, 34, uses the app daily for several hours; fast typist, many tabs open, expects tools to keep up with her.
Represents expert, high-frequency users for whom accelerators matter (Nielsen H7: https://www.nngroup.com/articles/ten-usability-heuristics/).

## Goals
- Do routine tasks in as few actions and as little waiting as possible.
- Work across several items or tabs at once; share and bookmark exact states.

## Behaviours and constraints the agent must simulate
- **Speed**: move immediately after each action; do not wait for animations. Double-submit is a realistic risk: press Enter twice on submit and check for duplicates.
- **Keyboard shortcuts**: try common accelerators (`/` or `Ctrl/Cmd+K` for search, `Ctrl/Cmd+Enter` to submit, `Escape` to close, `Ctrl/Cmd+S`, `?` for shortcut help). Note which exist and whether they are discoverable (NN/g "UI Accelerators": https://www.nngroup.com/articles/ui-accelerators/). Check that single-character shortcuts can be turned off or only work when focused (WCAG 2.1.4: https://www.w3.org/WAI/WCAG22/Understanding/character-key-shortcuts.html).
- **Bulk actions**: look for select-all, multi-select (Shift/Ctrl+click), batch edit/delete/export on lists and tables.
- **Back button**: after search, filter, pagination, opening a detail view and editing a form, press browser Back; state should be restored, not reset or broken.
- **Deep links**: copy the URL of a filtered/sorted/paged list or an open item, load it in a new tab/context; the same state should appear.
- **Tabs**: open items with middle-click/`Ctrl+click` equivalents (new page in the same context); real links (`<a href>`) should allow this. Edit in two tabs and observe conflicts/stale data.
- **Data entry**: paste multi-line or bulk values; use autofill; tab rapidly through forms.
- Measure action-to-feedback time; anything over 1 s with no feedback is noticed (https://www.nngroup.com/articles/response-times-3-important-limits/).

## What this persona typically surfaces
- No shortcuts, or shortcuts that are undocumented or conflict with browser/screen-reader keys.
- No bulk operations; repetitive one-by-one workflows.
- SPA state not in the URL: Back leaves the app, filters lost, links unshareable.
- Buttons/links built as non-links (cannot open in a new tab).
- Double submissions, race conditions, stale data across tabs.
- Excessive confirmations and slow transitions that block flow.

## Maps to
- Heuristics: H7 Flexibility and efficiency of use (primary), H3 User control and freedom, H1 Visibility of system status, H5 Error prevention (double submit).
- WCAG: 2.1.4 Character Key Shortcuts (A), 2.1.1 Keyboard.
- Performance: INP 200 ms "good" (https://web.dev/articles/inp); see `../patterns.md`.
