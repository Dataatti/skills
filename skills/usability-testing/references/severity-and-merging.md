# Ranking and merging findings

Sources checked as of 2026-11-12.

## 1. Rate each finding with Nielsen's 0-4 scale

Source: Nielsen, "Severity Ratings for Usability Problems": https://www.nngroup.com/articles/how-to-rate-the-severity-of-usability-problems/

| Rating | Meaning (Nielsen) | Agent rule of thumb (this skill's convention, not Nielsen's) |
|---|---|---|
| 0 | Not a usability problem | Drop it; do not report |
| 1 | Cosmetic only | Visual polish, no effect on task completion or speed |
| 2 | Minor, low priority | Slows or annoys, persona recovers quickly unaided |
| 3 | Major, high priority | Persona recovers only with significant effort, errors, or by guessing; or a WCAG A/AA failure on a non-core path |
| 4 | Catastrophe, fix before release | Persona cannot complete a core task (blocked, trapped, data lost); or a WCAG A/AA failure that blocks a core task |

## 2. The factors behind the number

Nielsen: severity is a combination of (same source as above):
- **Frequency**: is it common or rare? (agent proxy: how many pages/steps/elements show it)
- **Impact**: will users find it easy or hard to overcome? (agent proxy: did the persona recover, and how many attempts did it take)
- **Persistence**: one-time problem users learn to avoid, or does it keep bothering them? (agent proxy: does it recur on every visit or every item)
- **Market impact**: effect on the product's popularity even if easy to overcome (agent: note only, do not guess commercial impact)

Write the evidence for each factor in the finding; the number alone is not enough.

Nielsen recommends that severity be judged by several evaluators and averaged, because a single rater is unreliable (same source). An agent is one rater: say so, and mark borderline ratings as "2-3" with reasons rather than inventing precision.

## 3. Merge duplicates across personas

Heuristic evaluations use several independent evaluators and then group similar problems (NN/g, "How to Conduct a Heuristic Evaluation": https://www.nngroup.com/articles/how-to-conduct-a-heuristic-evaluation/). Personas play the role of evaluators here, so findings must be merged before ranking.

Merge rule (this skill's convention):

> **Same element + same principle = same finding.**

- *Same element*: same component instance or the same reusable component (e.g. "primary nav menu button", "date-of-birth field", the shared `<Modal>` used on 4 pages). Identify by accessible name + role + page/URL, or a stable selector.
- *Same principle*: same heuristic (H1-H10) or same WCAG success criterion.
- Same element, different principle: keep separate findings, cross-link them (e.g. icon button with no name = 4.1.2; same button 20x20 px = 2.5.8).
- Same principle, different element: separate findings, unless it is one shared component or a site-wide pattern; then merge into one finding with an "instances" list.

When merging:
- Keep the **highest** severity any persona assigned, and record which persona saw it worst.
- List every persona affected and each one's evidence (steps, screenshot, snapshot excerpt).
- Union the WCAG/heuristic references; keep one primary reference.

## 4. Rank the merged list

1. Severity, descending (4 before 3 ...).
2. Then number of personas affected, descending.
3. Then, as tie-breaker, whether it is on a core task path (sign-up, checkout, main job) before secondary paths.

## 5. Finding record (suggested fields)

```
ID | Title (problem, not solution)
Severity 0-4 + factor notes (frequency / impact / persistence)
Principle: Hx name and/or WCAG x.x.x name (level)
Element: role + accessible name + URL (+ selector)
Personas affected: [...]  (count)
Steps to reproduce + expected vs actual
Evidence: screenshot / a11y snapshot excerpt / timing
Suggested fix (optional, cite pattern from patterns.md)
Confidence: confirmed / likely / needs human check
```
