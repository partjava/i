#!/usr/bin/env python3
"""
Repair, comment, enrich with hidden evaluation cases, verify via onlinecompiler_adapter.py,
and export MySQL updates for all official challenges in challenges_bank/stage-*.json.
"""

from __future__ import annotations

import ast
import base64
import decimal
import glob
import json
import math
import os
import re
import subprocess
import sys
import tempfile
from concurrent.futures import ThreadPoolExecutor, as_completed
from typing import Any

SCRIPTS_DIR = os.path.dirname(os.path.abspath(__file__))
ROOT_DIR = os.path.dirname(SCRIPTS_DIR)
BANK_GLOB = os.path.join(ROOT_DIR, "challenges_bank", "stage-*.json")
ADAPTER_PATH = os.path.join(
    ROOT_DIR,
    "partjava-backend",
    "src",
    "main",
    "resources",
    "sandbox",
    "onlinecompiler_adapter.py",
)
SQL_OUT_PATH = os.path.join(SCRIPTS_DIR, "update_star_challenges_cases.sql")

if SCRIPTS_DIR not in sys.path:
    sys.path.insert(0, SCRIPTS_DIR)

import patches_s01_s02  # noqa: E402
import patches_s03_s06  # noqa: E402
import patches_s07_s11  # noqa: E402

PATCH_MODULES = [patches_s01_s02, patches_s03_s06, patches_s07_s11]
CJK_RE = re.compile(r"[\u4e00-\u9fff]")


def merge_patch_dicts() -> tuple[dict, dict, dict, dict, dict]:
    starter_ov: dict[str, str] = {}
    solution_ov: dict[str, str] = {}
    comments: dict[str, tuple[str, dict[str, str]]] = {}
    public_ov: dict[str, list[dict]] = {}
    hidden_cases: dict[str, list[dict]] = {}

    for mod in PATCH_MODULES:
        for name, dst in [
            ("STARTER_OVERRIDES", starter_ov),
            ("SOLUTION_OVERRIDES", solution_ov),
            ("COMMENTS", comments),
            ("PUBLIC_CASE_OVERRIDES", public_ov),
            ("HIDDEN_CASES", hidden_cases),
        ]:
            src = getattr(mod, name, {})
            overlap = set(dst) & set(src)
            if overlap:
                raise RuntimeError(f"Duplicate slugs in {mod.__name__}.{name}: {sorted(overlap)}")
            dst.update(src)

    return starter_ov, solution_ov, comments, public_ov, hidden_cases


def canonical(value: Any) -> str:
    """Exact mirror of onlinecompiler_adapter._canonical and SandboxServiceImpl.canonical."""
    if value is None:
        return "null"
    if isinstance(value, bool):
        return "true" if value else "false"
    if isinstance(value, int):
        return str(int(value))
    if isinstance(value, (float, decimal.Decimal)):
        if isinstance(value, float) and not math.isfinite(value):
            raise ValueError("Cannot serialize non-finite float")
        num = decimal.Decimal(str(value))
        if not num.is_finite():
            raise ValueError("Cannot serialize non-finite Decimal")
        if not num:
            return "0"
        text = format(num, "f")
        return text.rstrip("0").rstrip(".") if "." in text else text
    if isinstance(value, str):
        return json.dumps(str(value), ensure_ascii=False, separators=(",", ":"))
    if isinstance(value, (list, tuple)):
        return "[" + ",".join(canonical(item) for item in value) + "]"
    if isinstance(value, dict) and all(isinstance(k, str) for k in value):
        return (
            "{"
            + ",".join(canonical(k) + ":" + canonical(value[k]) for k in sorted(value))
            + "}"
        )
    raise TypeError(f"Unsupported type for canonical JSON: {type(value).__name__}")


def add_chinese_comments(slug: str, code: str, comment_spec: tuple[str, dict[str, str]]) -> str:
    """Idempotently inject top summary comment and per-definition Chinese comments."""
    header_summary, def_comments = comment_spec
    tree = ast.parse(code)
    lines = code.splitlines()

    # Record insertions keyed by 0-based line index
    insertions: dict[int, list[str]] = {}

    # Top-level function/class comments
    top_defs = {
        node.name: node
        for node in tree.body
        if isinstance(node, (ast.FunctionDef, ast.AsyncFunctionDef, ast.ClassDef))
    }

    for def_name, comment_text in def_comments.items():
        node = top_defs.get(def_name)
        if node is None:
            raise ValueError(f"[{slug}] COMMENTS references missing top-level symbol: {def_name}")
        start_lineno = min([d.lineno for d in node.decorator_list] + [node.lineno])
        idx = start_lineno - 1

        # Check contiguous comment lines immediately preceding this definition
        has_cn_comment = False
        scan = idx - 1
        while scan >= 0 and (lines[scan].strip().startswith("#") or lines[scan].strip() == ""):
            stripped = lines[scan].strip()
            if stripped.startswith("#") and CJK_RE.search(stripped):
                has_cn_comment = True
                break
            if stripped == "":
                # Stop after skipping at most one blank line unless inside comment block
                scan -= 1
                continue
            scan -= 1

        if not has_cn_comment:
            insertions.setdefault(idx, []).append(f"# {comment_text}")

    # Apply per-def insertions bottom-to-top
    for idx in sorted(insertions.keys(), reverse=True):
        lines[idx:idx] = insertions[idx]

    # Header summary comment (after optional shebang/encoding, avoid duplicating)
    has_header = any(line.strip().startswith("# 【算法思路】") for line in lines[:5])
    if not has_header:
        insert_at = 0
        if lines and lines[0].startswith("#!"):
            insert_at = 1
        lines.insert(insert_at, f"# 【算法思路】{header_summary}")

    result = "\n".join(lines) + "\n"
    ast.parse(result)
    return result


def normalize_case(raw_case: dict, hidden: bool) -> dict:
    """Copy a case dict (keeping optional _check temporarily for execution) and normalize flags."""
    c = dict(raw_case)
    c["mode"] = c.get("mode", "function")
    c["hidden"] = hidden
    return c


def run_adapter_case(adapter_file: str, case: dict) -> tuple[bool, Any, str]:
    """
    Execute a single case against an already-materialized onlinecompiler_adapter script.
    Returns (is_ok_status, parsed_envelope_or_error, raw_stdout).
    """
    payload = {
        "mode": case.get("mode", "function"),
        "function": case.get("function", ""),
        "args": case.get("args", []),
        "kwargs": case.get("kwargs", {}),
        "capture_exception": bool(case.get("expectedException")),
    }
    proc = subprocess.run(
        [sys.executable, adapter_file],
        input=json.dumps(payload, ensure_ascii=False),
        text=True,
        capture_output=True,
        timeout=10,
    )
    if proc.returncode != 0:
        return False, proc.stderr.strip() or f"exit={proc.returncode}", proc.stdout
    try:
        envelope = json.loads(proc.stdout)
    except Exception as exc:
        return False, f"Invalid adapter JSON stdout ({exc}): {proc.stdout[:200]!r}", proc.stdout
    return True, envelope, proc.stdout


def verify_single_challenge(
    item: dict,
    adapter_template: str,
    starter_ov: dict[str, str],
    solution_ov: dict[str, str],
    comments: dict[str, tuple[str, dict[str, str]]],
    public_ov: dict[str, list[dict]],
    hidden_cases_map: dict[str, list[dict]],
) -> tuple[str, dict, list[str]]:
    slug = item["slug"]
    errors: list[str] = []
    updated = dict(item)

    # 1. Starter code
    starter = starter_ov.get(slug, item.get("starterCode", ""))
    try:
        ast.parse(starter)
    except SyntaxError as exc:
        errors.append(f"starterCode SyntaxError: {exc}")
        return slug, updated, errors
    updated["starterCode"] = starter

    # 2. Solution code + Chinese comments
    solution = solution_ov.get(slug, item.get("solutionCode", ""))
    try:
        solution = add_chinese_comments(slug, solution, comments[slug])
    except Exception as exc:
        errors.append(f"solutionCode comment/AST error: {exc}")
        return slug, updated, errors

    if not CJK_RE.search(solution):
        errors.append("solutionCode lacks Chinese comments")
        return slug, updated, errors
    updated["solutionCode"] = solution

    # 3. Prepare public & hidden test cases
    raw_public = public_ov.get(slug, item.get("testCases", []))
    raw_hidden = hidden_cases_map[slug]

    pub_cases = [normalize_case(c, hidden=False) for c in raw_public]
    hid_cases = [normalize_case(c, hidden=True) for c in raw_hidden]

    if len(pub_cases) < 2:
        errors.append(f"Need >=2 public testCases, got {len(pub_cases)}")
        return slug, updated, errors
    if len(hid_cases) < 2:
        errors.append(f"Need >=2 hidden evaluationCases, got {len(hid_cases)}")
        return slug, updated, errors

    # Check SandboxServiceImpl size limits
    sol_b64 = base64.b64encode(solution.encode("utf-8")).decode("ascii")
    adapted_solution = adapter_template.replace("__PARTJAVA_SOURCE_B64__", sol_b64)
    if len(solution.encode("utf-8")) > 64 * 1024:
        errors.append("solutionCode exceeds 64 KiB SandboxServiceImpl limit")
    if len(adapted_solution.encode("utf-8")) > 100000:
        errors.append("wrapped solution exceeds 100 KB OnlineCompiler limit")

    starter_b64 = base64.b64encode(starter.encode("utf-8")).decode("ascii")
    adapted_starter = adapter_template.replace("__PARTJAVA_SOURCE_B64__", starter_b64)

    with tempfile.TemporaryDirectory() as tmpdir:
        sol_file = os.path.join(tmpdir, "sol_adapter.py")
        sta_file = os.path.join(tmpdir, "sta_adapter.py")
        with open(sol_file, "w", encoding="utf-8") as f:
            f.write(adapted_solution)
        with open(sta_file, "w", encoding="utf-8") as f:
            f.write(adapted_starter)

        # Verify solution against all public + hidden cases
        all_cases = pub_cases + hid_cases
        combined_bytes = 0
        for idx, case in enumerate(all_cases):
            label = f"{'hidden' if case['hidden'] else 'public'}[{idx}:{case.get('name', '')}]"
            check_fn = case.pop("_check", None)

            if "expectedException" in case and "expected" in case:
                errors.append(f"{label}: cannot have both expectedException and expected")
                continue
            if "expectedException" not in case and "expected" not in case:
                errors.append(f"{label}: missing expected or expectedException")
                continue

            ok, res, raw_out = run_adapter_case(sol_file, case)
            if not ok:
                errors.append(f"{label}: execution failed -> {res}")
                continue

            if "expectedException" in case:
                expected_exc = case["expectedException"]
                if res.get("exception") != expected_exc:
                    errors.append(f"{label}: expected exception {expected_exc}, got {res}")
                    continue
                expected_canonical = canonical({"exception": expected_exc})
                if raw_out != expected_canonical:
                    errors.append(f"{label}: canonical mismatch {raw_out} != {expected_canonical}")
                    continue
            else:
                if "value" not in res:
                    errors.append(f"{label}: expected value, got {res}")
                    continue
                actual = res["value"]
                if check_fn is not None:
                    try:
                        passed_check = bool(check_fn(actual))
                    except Exception as exc:
                        errors.append(f"{label}: _check raised {exc} on actual={actual!r}")
                        continue
                    if not passed_check:
                        errors.append(f"{label}: _check returned False for actual={actual!r}")
                        continue
                if case.get("expected") == "__COMPUTE__":
                    case["expected"] = actual
                else:
                    try:
                        exp_canonical = canonical({"value": case["expected"]})
                    except Exception as exc:
                        errors.append(f"{label}: canonical(expected) error: {exc}")
                        continue
                    if raw_out != exp_canonical:
                        errors.append(
                            f"{label}: mismatch\n  actual:   {raw_out}\n  expected: {exp_canonical}"
                        )
                        continue

            in_bytes = len(
                json.dumps(
                    {
                        "mode": case.get("mode", "function"),
                        "capture_exception": bool(case.get("expectedException")),
                        "args": case.get("args", []),
                        "kwargs": case.get("kwargs", {}),
                        "function": case.get("function", ""),
                    },
                    ensure_ascii=False,
                ).encode("utf-8")
            )
            out_bytes = len(raw_out.encode("utf-8"))
            if in_bytes > 100000 or out_bytes > 65536:
                errors.append(f"{label}: exceeds OnlineCompiler single-test byte cap")
            combined_bytes += in_bytes + out_bytes

        if combined_bytes > 1024 * 1024:
            errors.append(f"combined test bytes ({combined_bytes}) exceed 1 MiB limit")

        # Verify starterCode MUST NOT pass all public testCases
        if not errors:
            starter_passed = 0
            for case in pub_cases:
                ok, res, raw_out = run_adapter_case(sta_file, case)
                if not ok:
                    continue
                if "expectedException" in case:
                    if res.get("exception") == case["expectedException"]:
                        starter_passed += 1
                else:
                    if "value" in res and raw_out == canonical({"value": case["expected"]}):
                        starter_passed += 1
            if starter_passed == len(pub_cases):
                errors.append(
                    f"starterCode leaked implementation: passed all {len(pub_cases)} public testCases"
                )

    updated["testCases"] = pub_cases
    updated["evaluationCases"] = hid_cases
    return slug, updated, errors


def to_hex_sql(text: str) -> str:
    return f"CONVERT(UNHEX('{text.encode('utf-8').hex()}') USING utf8mb4)"


def main() -> int:
    starter_ov, solution_ov, comments, public_ov, hidden_cases_map = merge_patch_dicts()

    with open(ADAPTER_PATH, "r", encoding="utf-8") as f:
        adapter_template = f.read()

    stage_files = sorted(glob.glob(BANK_GLOB))
    if len(stage_files) != 11:
        print(f"ERROR: expected 11 stage files, found {len(stage_files)}")
        return 1

    stage_data: list[tuple[str, list[dict]]] = []
    all_items: list[dict] = []
    for path in stage_files:
        with open(path, "r", encoding="utf-8") as f:
            items = json.load(f)
        stage_data.append((path, items))
        all_items.extend(items)

    all_slugs = {item["slug"] for item in all_items}
    missing_comments = sorted(all_slugs - set(comments))
    missing_hidden = sorted(all_slugs - set(hidden_cases_map))
    extra_comments = sorted(set(comments) - all_slugs)
    extra_hidden = sorted(set(hidden_cases_map) - all_slugs)

    if missing_comments or missing_hidden or extra_comments or extra_hidden:
        print("Coverage mismatch:")
        if missing_comments:
            print(f"  missing COMMENTS ({len(missing_comments)}): {missing_comments[:10]}")
        if missing_hidden:
            print(f"  missing HIDDEN_CASES ({len(missing_hidden)}): {missing_hidden[:10]}")
        if extra_comments:
            print(f"  extra COMMENTS ({len(extra_comments)}): {extra_comments[:10]}")
        if extra_hidden:
            print(f"  extra HIDDEN_CASES ({len(extra_hidden)}): {extra_hidden[:10]}")
        return 1

    print(f"Loaded {len(all_items)} challenges across {len(stage_files)} stages. Verifying via onlinecompiler_adapter.py...")

    results_by_slug: dict[str, dict] = {}
    failures: list[tuple[str, list[str]]] = []

    with ThreadPoolExecutor(max_workers=10) as pool:
        futures = {
            pool.submit(
                verify_single_challenge,
                item,
                adapter_template,
                starter_ov,
                solution_ov,
                comments,
                public_ov,
                hidden_cases_map,
            ): item["slug"]
            for item in all_items
        }
        for fut in as_completed(futures):
            slug, updated, errs = fut.result()
            results_by_slug[slug] = updated
            if errs:
                failures.append((slug, errs))

    passed_count = len(all_items) - len(failures)
    print(f"Verification complete: {passed_count}/{len(all_items)} PASSED, {len(failures)} FAILED.")

    if failures:
        for slug, errs in sorted(failures):
            print(f"\n[FAIL] {slug}:")
            for e in errs:
                print(f"  - {e}")
        return 1

    # Write updated stage JSON files and MySQL update script only when 0 failures
    sql_lines = [
        "-- Auto-generated by scripts/repair_and_enrich_challenges.py",
        "-- Updates starter_code, solution_code (with Chinese comments), test_cases (public), and evaluation_cases (hidden)",
        "SET NAMES utf8mb4;",
    ]

    for path, items in stage_data:
        new_items = [results_by_slug[item["slug"]] for item in items]
        with open(path, "w", encoding="utf-8") as f:
            json.dump(new_items, f, ensure_ascii=False, indent=2)
            f.write("\n")

        for item in new_items:
            slug = item["slug"].replace("'", "''")
            tc_json = json.dumps(item["testCases"], ensure_ascii=False)
            ec_json = json.dumps(item["evaluationCases"], ensure_ascii=False)
            sql_lines.append(
                "UPDATE star_challenges SET "
                f"starter_code = {to_hex_sql(item['starterCode'])}, "
                f"solution_code = {to_hex_sql(item['solutionCode'])}, "
                f"test_cases = {to_hex_sql(tc_json)}, "
                f"evaluation_cases = {to_hex_sql(ec_json)} "
                f"WHERE slug = '{slug}';"
            )

    with open(SQL_OUT_PATH, "w", encoding="utf-8") as f:
        f.write("\n".join(sql_lines) + "\n")

    print(f"Successfully updated {len(stage_files)} JSON files and wrote {SQL_OUT_PATH} ({len(all_items)} UPDATE statements).")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
