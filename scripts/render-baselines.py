#!/usr/bin/env python3
"""Render skills/<name>/evals/baseline.json into the root README and each skill's README.md."""
import json, os, re

repo = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
rows = ["| Skill | With skill | Without skill | Time (s) | Tokens | Cost (USD) |", "|---|---|---|---|---|---|"]
for name in sorted(os.listdir(os.path.join(repo, "skills"))):
    bp = os.path.join(repo, "skills", name, "evals", "baseline.json")
    if not os.path.exists(bp):
        continue
    b = json.load(open(bp))
    wo = f"{b['without_skill_pass_rate']:.0%}" if b.get("without_skill_pass_rate") is not None else "–"
    tok = f"{b['tokens']:,}" if b.get("tokens") else "n/a"
    rows.append(f"| {name} | {b['pass_rate']:.0%} | {wo} | {b['time_seconds']} | {tok} | {b['cost_usd']} |")
    cases = "\n".join(f"| {c} | {', '.join(v['failed']) or 'all passed'} |" for c, v in b["cases"].items())
    sr = os.path.join(repo, "skills", name, "README.md")
    desc = re.search(r"^description:\s*(.+)$", open(os.path.join(repo, "skills", name, "SKILL.md")).read(), re.M).group(1)
    open(sr, "w").write(f"""# {name}

{desc}

Install: `npx skills add dataatti/skills --skill {name}` · Instructions: [SKILL.md](SKILL.md) · Sources: [references/](references/)

## Eval baseline

Recorded {b['date']} with `{b['model']}`, one run per case; graded by an LLM judge. Tokens exclude cache reads.

| Pass rate (with skill) | Pass rate (no skill) | Time (s) | Tokens | Cost (USD) |
|---|---|---|---|---|
| {b['pass_rate']:.0%} | {wo} | {b['time_seconds']} | {tok} | {b['cost_usd']} |

| Case | Failed graders at baseline |
|---|---|
{cases}

CI fails a PR if the pass rate falls below {b['pass_rate'] - b.get('tolerance', 0.1):.0%} (baseline − {b.get('tolerance', 0.1):.0%}) or a clean-control case newly fails more than one grader (one is allowed as LLM-judge noise). Re-run: `scripts/run-evals.sh {name} --runs 1 --model {b['model']}`.
""")
readme = os.path.join(repo, "README.md")
t = open(readme).read()
t = re.sub(r"<!-- BASELINES:START -->.*<!-- BASELINES:END -->",
           "<!-- BASELINES:START -->\n" + "\n".join(rows) + "\n<!-- BASELINES:END -->", t, flags=re.S)
open(readme, "w").write(t)
print("\n".join(rows))
