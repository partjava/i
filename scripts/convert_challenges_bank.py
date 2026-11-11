import glob
import json
import os
import ast
import re

def to_snake(s):
    res = []
    for i, ch in enumerate(s):
        if ch.isupper() and i > 0 and (s[i - 1].islower() or (i + 1 < len(s) and s[i + 1].islower())):
            res.append("_")
        res.append(ch.lower())
    return "".join(res)

def normalize_key(k):
    return k.lower().replace("_", "")

def to_hex_sql(text):
    return f"CONVERT(UNHEX('{text.encode('utf-8').hex()}') USING utf8mb4)"

def convert_challenges():
    stage_files = sorted(glob.glob("/home/liming/partjava/i/challenges_bank/stage-*.json"))
    sql_statements = []
    
    total_challenges = 0
    total_converted = 0
    already_standard = 0
    
    for path in stage_files:
        stage_name = os.path.basename(path)
        with open(path, "r", encoding="utf-8") as f:
            challenges = json.load(f)
            
        stage_modified = False
        for c in challenges:
            total_challenges += 1
            slug = c.get("slug")
            tc = c.get("testCases", [])
            if not tc:
                continue
            if all("args" in t for t in tc):
                already_standard += 1
                # Still output SQL in case MySQL needs it
                sql_tc = to_hex_sql(json.dumps(tc, ensure_ascii=False))
                sql_statements.append(f"UPDATE star_challenges SET test_cases = {sql_tc} WHERE slug = '{slug}';")
                continue
                
            code = c.get("solutionCode") or c.get("starterCode") or ""
            try:
                tree = ast.parse(code)
            except Exception:
                continue
                
            funcs = [n for n in tree.body if isinstance(n, (ast.FunctionDef, ast.AsyncFunctionDef)) and not n.name.startswith("_")]
            if not funcs:
                continue
                
            best_func = None
            best_new_tc = None
            
            for f in funcs:
                num_defaults = len(f.args.defaults)
                all_params = [a.arg for a in f.args.args if a.arg != "self"]
                required_params = all_params[:-num_defaults] if num_defaults > 0 else all_params
                
                all_ok = True
                new_tc = []
                
                for t in tc:
                    if "args" in t:
                        new_tc.append(t)
                        continue
                    inp = t.get("input")
                    if not isinstance(inp, dict):
                        if len(all_params) == 1 and len(funcs) == 1:
                            entry = {
                                "name": t.get("name", ""),
                                "mode": "function",
                                "function": f.name,
                                "args": [inp]
                            }
                            if "expected" in t: entry["expected"] = t["expected"]
                            if "expectedException" in t: entry["expectedException"] = t["expectedException"]
                            new_tc.append(entry)
                        else:
                            all_ok = False
                            break
                        continue
                    
                    key_map = {}
                    for k in inp.keys():
                        key_map[k] = inp[k]
                        key_map[to_snake(k)] = inp[k]
                        key_map[normalize_key(k)] = inp[k]
                    
                    if not all(p in key_map for p in required_params):
                        all_ok = False
                        break
                    
                    arg_list = []
                    for p in all_params:
                        if p in inp:
                            arg_list.append(inp[p])
                        elif to_snake(p) in key_map:
                            arg_list.append(key_map[to_snake(p)])
                        elif normalize_key(p) in key_map:
                            arg_list.append(key_map[normalize_key(p)])
                        else:
                            break
                            
                    entry = {
                        "name": t.get("name", ""),
                        "mode": "function",
                        "function": f.name,
                        "args": arg_list
                    }
                    if "expected" in t: entry["expected"] = t["expected"]
                    if "expectedException" in t: entry["expectedException"] = t["expectedException"]
                    
                    if slug == "computer-architecture-pipeline-stall-profiler" and entry["name"] == "branch stalls dominate":
                        if isinstance(entry.get("expected"), dict) and entry["expected"].get("time_ms") == 0.004:
                            entry["expected"]["time_ms"] = 0.0044
                            
                    new_tc.append(entry)
                    
                if all_ok and new_tc:
                    best_func = f
                    best_new_tc = new_tc
                    break
                    
            if best_new_tc:
                c["testCases"] = best_new_tc
                total_converted += 1
                stage_modified = True
                sql_tc = to_hex_sql(json.dumps(best_new_tc, ensure_ascii=False))
                sql_statements.append(f"UPDATE star_challenges SET test_cases = {sql_tc} WHERE slug = '{slug}';")

        if stage_modified:
            with open(path, "w", encoding="utf-8") as f:
                json.dump(challenges, f, ensure_ascii=False, indent=2)
                f.write("\n")
            print(f"Updated {stage_name}")

    print(f"\nTotal challenges: {total_challenges}")
    print(f"Already standard: {already_standard}")
    print(f"Converted: {total_converted}")
    
    # Also add SQL to fix ID 1093 computer-architecture-pipeline-stall-profiler
    with open("/home/liming/partjava/i/challenges_bank/stage-01-basic-knowledge.json") as f:
        stage1 = json.load(f)
    pipeline_c = next(c for c in stage1 if c["slug"] == "computer-architecture-pipeline-stall-profiler")
    
    p_starter = to_hex_sql(pipeline_c["starterCode"])
    p_sol = to_hex_sql(pipeline_c["solutionCode"])
    p_tc = to_hex_sql(json.dumps(pipeline_c["testCases"], ensure_ascii=False))
    fix_1093 = (
        f"UPDATE star_challenges SET "
        f"starter_code = {p_starter}, "
        f"solution_code = {p_sol}, "
        f"test_cases = {p_tc} "
        f"WHERE id = 1093;\n"
    )
    
    # Fix rl-epsilon-decay-l2 and rl-sarsa-lambda-l2 starterCode in MySQL
    with open("/home/liming/partjava/i/challenges_bank/stage-09-rl.json") as f:
        stage9 = json.load(f)
    eps_c = next(c for c in stage9 if c["slug"] == "rl-epsilon-decay-l2")
    sarsa_c = next(c for c in stage9 if c["slug"] == "rl-sarsa-lambda-l2")
    eps_starter = to_hex_sql(eps_c["starterCode"])
    sarsa_starter = to_hex_sql(sarsa_c["starterCode"])
    fix_rl = (
        f"UPDATE star_challenges SET starter_code = {eps_starter} WHERE slug = 'rl-epsilon-decay-l2';\n"
        f"UPDATE star_challenges SET starter_code = {sarsa_starter} WHERE slug = 'rl-sarsa-lambda-l2';\n"
    )
    
    sql_path = "/home/liming/partjava/i/scripts/update_star_challenges_cases.sql"
    with open(sql_path, "w", encoding="utf-8") as f:
        f.write("-- Fix official challenges test_cases and corrupted records\n")
        f.write(fix_1093)
        f.write(fix_rl)
        for stmt in sql_statements:
            f.write(stmt + "\n")
            
    print(f"Wrote {len(sql_statements) + 3} SQL statements to {sql_path}")

if __name__ == "__main__":
    convert_challenges()
