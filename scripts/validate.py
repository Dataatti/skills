#!/usr/bin/env python3
"""Static checks for every skill (no API key needed):
- SKILL.md frontmatter follows the Agent Skills spec (name = dir, [a-z0-9-], <=64; description 1..1024)
- SKILL.md body under 500 lines; every references/... or scripts/... path it mentions exists
- every eval case has prompt.md, case.yaml, at least one grader, and a resolvable files/ fixture
- every skill has trigger-evals.json with both should- and should-not-trigger queries
"""
import json, os, re, sys

repo = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
errors = []
for name in sorted(os.listdir(os.path.join(repo, "skills"))):
    d = os.path.join(repo, "skills", name)
    md = os.path.join(d, "SKILL.md")
    if not os.path.isfile(md):
        continue
    text = open(md).read()
    m = re.match(r"^---\n(.*?)\n---\n(.*)$", text, re.S)
    if not m:
        errors.append(f"{name}: SKILL.md has no frontmatter"); continue
    fm, body = m.groups()
    n = re.search(r"^name:\s*(.+)$", fm, re.M); desc = re.search(r"^description:\s*(.+)$", fm, re.M)
    if not n or n.group(1).strip() != name: errors.append(f"{name}: frontmatter name must equal directory name")
    if not re.fullmatch(r"[a-z0-9]+(-[a-z0-9]+)*", name) or len(name) > 64: errors.append(f"{name}: invalid name")
    if not desc or not (1 <= len(desc.group(1).strip()) <= 1024): errors.append(f"{name}: description must be 1-1024 chars")
    if len(text.splitlines()) > 500: errors.append(f"{name}: SKILL.md over 500 lines")
    for ref in set(re.findall(r"`((?:references|scripts)/[^`*<>\s]+)`", body)):
        if not os.path.exists(os.path.join(d, ref)): errors.append(f"{name}: SKILL.md mentions missing {ref}")
    ev = os.path.join(d, "evals")
    cases = [c for c in os.listdir(ev) if os.path.isdir(os.path.join(ev, c))] if os.path.isdir(ev) else []
    if not cases: errors.append(f"{name}: no eval cases")
    for c in cases:
        cd = os.path.join(ev, c)
        for f in ("prompt.md", "case.yaml"):
            if not os.path.isfile(os.path.join(cd, f)): errors.append(f"{name}/{c}: missing {f}")
        g = os.path.join(cd, "graders")
        if not os.path.isdir(g) or not os.listdir(g): errors.append(f"{name}/{c}: no graders")
        if os.path.lexists(os.path.join(cd, "files")) and not os.path.isdir(os.path.join(cd, "files")):
            errors.append(f"{name}/{c}: files/ fixture link is broken")
    te = os.path.join(ev, "trigger-evals.json")
    if not os.path.isfile(te): errors.append(f"{name}: missing evals/trigger-evals.json")
    else:
        flags = {q["should_trigger"] for q in json.load(open(te))}
        if flags != {True, False}: errors.append(f"{name}: trigger evals need both positive and negative queries")
print("\n".join(errors) or "All skills valid.")
sys.exit(1 if errors else 0)
