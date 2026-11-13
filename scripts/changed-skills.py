#!/usr/bin/env python3
"""Print `skills=<json list>` for GITHUB_OUTPUT: the skills whose evals must run.

Usage: changed-skills.py <base-ref> | changed-skills.py --all | changed-skills.py --only a,b
A change under skills/<name>/ selects that skill. A change to shared eval
infrastructure (evals/fixtures/, scripts/, the workflow) selects every skill.
"""
import json, os, subprocess, sys

repo = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
all_skills = sorted(d for d in os.listdir(os.path.join(repo, "skills"))
                    if os.path.isfile(os.path.join(repo, "skills", d, "SKILL.md")))
SHARED = ("evals/fixtures/", "scripts/", ".github/workflows/evals.yml")

def select(args):
    if not args or args[0] == "--all":
        return all_skills
    if args[0] == "--only":
        wanted = [s.strip() for s in args[1].split(",") if s.strip()]
        return all_skills if wanted == ["all"] else [s for s in wanted if s in all_skills]
    files = subprocess.run(["git", "diff", "--name-only", f"{args[0]}...HEAD"], cwd=repo,
                           capture_output=True, text=True, check=True).stdout.split()
    if any(f.startswith(SHARED) for f in files):
        return all_skills
    return sorted({f.split("/")[1] for f in files if f.startswith("skills/") and f.count("/") >= 2} & set(all_skills))

print("skills=" + json.dumps(select(sys.argv[1:])))
