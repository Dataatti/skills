# Persona: <Name / short label>

Sources checked as of <YYYY-MM-DD>.

Copy this file to `personas/<kebab-case-name>.md`. Keep it under ~80 lines. Every factual claim (statistics, standards, thresholds) needs a source link.

## Bio
<Two lines: who they are, context of use, device, relevant ability or expertise.>
<Who else this persona stands for. Link a source if you cite data, e.g. W3C user stories: https://www.w3.org/WAI/people-use-web/user-stories/>

## Goals
- <The task(s) this persona must complete, in their words.>
- <What "success" feels like for them.>

## Behaviours and constraints the agent must simulate
Write these as concrete browser-automation rules, not adjectives.
- **Input allowed**: <e.g. only Tab/Enter; touch only; mouse only>
- **Input forbidden**: <e.g. never click; no keyboard shortcuts>
- **Perception**: <screenshot / accessibility tree only / zoomed viewport>
- **Environment**: <viewport WxH, zoom %, network profile with values and source, locale, time zone>
- **Knowledge**: <conventions and terms they know / do not know>
- **Patience**: <give-up rule, e.g. after N failed attempts or T seconds>
- **Data they enter**: <realistic and edge-case inputs>

## What this persona typically surfaces
- <Problem class 1>
- <Problem class 2>

## Maps to
- Heuristics: <H# names from ../heuristics.md>
- WCAG: <SC numbers and names from ../wcag-22-aa.md>
- Patterns: <items from ../patterns.md>
