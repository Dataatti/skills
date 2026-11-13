#!/usr/bin/env python3
"""Summarise a `claude plugin eval` result for one skill and gate it against its baseline.

  summarize-evals.py <skill> [--result evals-results/<skill>/result.json] [--gate] [--write-baseline]

Pass rate = passed graders / all graders over the with-skill runs (the same number
skill-creator's benchmark reports). Tokens come from each run's trace when it was kept
(--keep-temp); cost and time come from the result file.
--gate            exit 1 if the pass rate is below baseline.json pass_rate - tolerance,
                  or if any clean-control case (name starts with no-false-) loses a grader
                  it passed in the baseline.
--write-baseline  write skills/<skill>/evals/baseline.json from this result.
Prints a Markdown summary (suitable for $GITHUB_STEP_SUMMARY).
"""
import json, os, sys, argparse

repo = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ap = argparse.ArgumentParser()
ap.add_argument("skill"); ap.add_argument("--result"); ap.add_argument("--gate", action="store_true")
ap.add_argument("--write-baseline", action="store_true")
a = ap.parse_args()
result = json.load(open(a.result or os.path.join(repo, "evals-results", a.skill, "result.json")))
base_path = os.path.join(repo, "skills", a.skill, "evals", "baseline.json")

def tokens(trace):
    if not trace or not os.path.exists(trace):
        return None
    total = 0
    for line in open(trace):
        e = json.loads(line)
        if e.get("type") == "result":
            for m in (e.get("modelUsage") or {}).values():
                total += sum(m.get(k, 0) for k in ("inputTokens", "outputTokens", "cacheCreationInputTokens"))
    return total or None

def arm_stats(arm):
    passed = total = 0; secs = cost = 0.0; toks = []; per_case = {}
    for c in result["cases"]:
        for r in c["arms"].get(arm) or []:
            g = [x for x in r["graders"] if x.get("scored", True)]
            p = sum(1 for x in g if x["passed"])
            passed += p; total += len(g)
            secs += r.get("durationSeconds") or 0; cost += r.get("costUsd") or 0
            t = tokens(r.get("tracePath")); toks.append(t)
            per_case[c["name"]] = {"passed": p, "total": len(g), "failed": [x["name"] for x in g if not x["passed"]]}
    if not total:
        return None
    known = [t for t in toks if t]
    return {"pass_rate": round(passed / total, 3), "passed": passed, "total": total,
            "time_seconds": round(secs), "cost_usd": round(cost, 2),
            "tokens": sum(known) if known and len(known) == len(toks) else None, "cases": per_case}

w, wo = arm_stats("with"), arm_stats("without")
lines = [f"### {a.skill}", "", "| Config | Pass rate | Graders | Time (s) | Tokens (excl. cache reads) | Cost (USD) |", "|---|---|---|---|---|---|"]
for name, s in (("with skill", w), ("without skill", wo)):
    if s:
        lines.append(f"| {name} | {s['pass_rate']:.0%} | {s['passed']}/{s['total']} | {s['time_seconds']} | {s['tokens'] or 'n/a'} | {s['cost_usd']} |")
lines += ["", "| Case | With skill | Failed graders |", "|---|---|---|"]
for case, s in (w or {}).get("cases", {}).items():
    lines.append(f"| {case} | {s['passed']}/{s['total']} | {', '.join(s['failed']) or '–'} |")

code = 0
if a.gate and w:
    if os.path.exists(base_path):
        b = json.load(open(base_path))
        floor = b["pass_rate"] - b.get("tolerance", 0.1)
        lines.append(f"\nBaseline {b['pass_rate']:.0%} (tolerance {b.get('tolerance', 0.1):.0%}) → floor {floor:.0%}.")
        if w["pass_rate"] < floor:
            lines.append(f"**FAIL**: pass rate {w['pass_rate']:.0%} is below the floor."); code = 1
        for case, s in w["cases"].items():
            if case.startswith("no-false-"):
                lost = set(s["failed"]) - set(b.get("cases", {}).get(case, {}).get("failed", []))
                if lost:
                    lines.append(f"**FAIL**: clean-control case {case} regressed: {', '.join(sorted(lost))}"); code = 1
        if code == 0:
            lines.append("**PASS**: no regression against baseline.")
    else:
        lines.append("\nNo baseline.json yet – not gating.")
if a.write_baseline and w:
    json.dump({"pass_rate": w["pass_rate"], "tolerance": 0.1, "model": (result.get("suite") or {}).get("modelOverride"),
               "date": result.get("startedAt", "")[:10], "time_seconds": w["time_seconds"], "tokens": w["tokens"],
               "cost_usd": w["cost_usd"], "without_skill_pass_rate": wo["pass_rate"] if wo else None,
               "cases": {k: {"failed": v["failed"]} for k, v in w["cases"].items()}},
              open(base_path, "w"), indent=2)
    lines.append(f"\nWrote {os.path.relpath(base_path, repo)}")
print("\n".join(lines))
sys.exit(code)
