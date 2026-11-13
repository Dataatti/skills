#!/usr/bin/env python3
"""Print a compact view of an eval run trace (tool calls, results, text). Usage: show-trace.py <trace.jsonl> [maxlen]"""
import json, sys
n = int(sys.argv[2]) if len(sys.argv) > 2 else 300
for line in open(sys.argv[1]):
    e = json.loads(line)
    if e.get("type") == "result":
        print("RESULT", {k: e.get(k) for k in ("num_turns", "duration_ms", "total_cost_usd")}, e.get("usage", {}).get("output_tokens"))
    if e.get("type") not in ("assistant", "user"):
        continue
    content = e["message"]["content"]
    for c in content if isinstance(content, list) else [{"type": "text", "text": content}]:
        if c.get("type") == "tool_use":
            print("TOOL", c["name"], json.dumps(c["input"])[:n])
        elif c.get("type") == "tool_result":
            print("  RES", str(c.get("content"))[:n])
        elif c.get("type") == "text" and e["type"] == "assistant":
            print("TXT", c["text"][:n * 6])
