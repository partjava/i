"""Extra hidden evaluation cases for Stage 01 & Stage 02 (expanding every challenge to 4 hidden cases)."""

try:
    from patches_s01_s02 import case
except ImportError:
    from scripts.patches_s01_s02 import case


EXTRA_HIDDEN_CASES: dict[str, list[dict]] = {
    # =========================================================================
    # Stage 01 (28 challenges)
    # =========================================================================
    "computer-architecture-pipeline-stall-profiler": [
        case(
            "high count small stall beats low count large stall",
            "profile_pipeline_workload",
            [{"alu": {"count": 10000, "base_cpi": 1, "stall": 0.5}, "mem": {"count": 100, "base_cpi": 2, "stall": 5.0}}, 1000000000],
            {"time_ms": 0.0157, "bottleneck": "alu"},
            hidden=True,
        ),
    ],
    "operating-system-lru-cache-pressure-simulator": [
        case(
            "capacity one consecutive hits and thrashing",
            "simulate_page_cache",
            [[1, 1, 2, 2, 3, 1], 1],
            {"hits": 2, "misses": 4, "hit_rate": 0.3333},
            hidden=True,
        ),
    ],
    "network-longest-prefix-match-engine": [
        case(
            "exact /32 host route overrides /24",
            "lookup_route",
            [[{"cidr": "192.168.10.0/24", "next_hop": "subnet"}, {"cidr": "192.168.10.42/32", "next_hop": "host"}], "192.168.10.42"],
            "host",
            hidden=True,
        ),
    ],
    "encoding-system-log-charset-detector": [
        case(
            "uppercase spaced hex string decodes cleanly",
            "decode_log_payload",
            ["48 45 4C 4C 4F"],
            {"status": "OK", "text": "HELLO"},
            hidden=True,
        ),
    ],
    "linux-command-safe-batch-runner": [
        case(
            "spaces and shell metacharacters preserved",
            "build_grep_args",
            ["ERR|WARN", "my $(file).log"],
            ["grep", "--", "ERR|WARN", "my $(file).log"],
            hidden=True,
        ),
    ],
    "linux-filesystem-inode-capacity-planner": [
        case(
            "both exhausted reports inode bottleneck first",
            "plan_small_file_storage",
            [20, 5000, 4096, 10, 10],
            {"fits": False, "bottleneck": "inode"},
            hidden=True,
        ),
    ],
    "linux-permission-policy-auditor": [
        case(
            "world writable script with owner exec",
            "audit_permission",
            ["777", "script"],
            ["group_writable", "others_writable"],
            hidden=True,
        ),
    ],
    "linux-process-zombie-detector": [
        case(
            "exact rate boundary does not alert below count",
            "detect_process_anomaly",
            [[{"pid": 1, "state": "Z"}, {"pid": 2, "state": "R"}], 2, 0.5],
            {"zombies": 1, "zombie_rate": 0.5, "alert": False},
            hidden=True,
        ),
        case(
            "rate above threshold alerts with missing state field",
            "detect_process_anomaly",
            [[{"pid": 1, "state": "Z"}, {"pid": 2}, {"pid": 3, "state": "Z"}], 5, 0.6],
            {"zombies": 2, "zombie_rate": 0.6667, "alert": True},
            hidden=True,
        ),
    ],
    "shell-script-pipeline-failure-guard": [
        case(
            "pipefail false returns last exit code",
            "evaluate_pipeline",
            [[1, 0, 2], False],
            2,
            hidden=True,
        ),
    ],
    "git-init-clone-repo-health-checker": [
        case(
            "empty metadata flags all missing fields",
            "check_repo_ready",
            [{}],
            {"ready": False, "issues": ["missing_git_dir", "missing_origin", "missing_default_branch"]},
            hidden=True,
        ),
        case(
            "missing git dir and default branch",
            "check_repo_ready",
            [{"has_git_dir": False, "origin_url": "git@x:y.git", "default_branch": "", "detached_head": False}],
            {"ready": False, "issues": ["missing_git_dir", "missing_default_branch"]},
            hidden=True,
        ),
    ],
    "git-add-commit-push-change-batch-planner": [
        case(
            "docs non-md and extra config files",
            "plan_commit_batches",
            [["docs/arch.png", ".eslintrc.json", "next.config.js", "src/utils/helper.py"]],
            {"code": ["src/utils/helper.py"], "test": [], "docs": ["docs/arch.png"], "config": [".eslintrc.json", "next.config.js"]},
            hidden=True,
        ),
        case(
            "test rule takes precedence over docs and code",
            "plan_commit_batches",
            [["docs/test/fixture.json", "app/login.tsx", "CHANGELOG.md"]],
            {"code": ["app/login.tsx"], "test": ["docs/test/fixture.json"], "docs": ["CHANGELOG.md"], "config": []},
            hidden=True,
        ),
    ],
    "git-branch-merge-conflict-risk-estimator": [
        case(
            "multiple files deduplicated and sorted",
            "estimate_merge_conflicts",
            [
                [{"file": "z.py", "start": 1, "end": 5}, {"file": "a.py", "start": 10, "end": 20}, {"file": "z.py", "start": 20, "end": 25}],
                [{"file": "z.py", "start": 3, "end": 22}, {"file": "a.py", "start": 12, "end": 12}],
            ],
            {"risk": "high", "files": ["a.py", "z.py"]},
            hidden=True,
        ),
        case(
            "empty branch_a has low risk",
            "estimate_merge_conflicts",
            [[], [{"file": "a.py", "start": 1, "end": 5}]],
            {"risk": "low", "files": []},
            hidden=True,
        ),
    ],
    "git-rebase-commit-history-rewriter": [
        case(
            "both base and feature empty",
            "simulate_rebase",
            [[], []],
            [],
            hidden=True,
        ),
        case(
            "preserves multi-commit order",
            "simulate_rebase",
            [["c1", "c2", "c3"], ["f1", "f2", "f3"]],
            ["c1", "c2", "c3", "rebased-f1", "rebased-f2", "rebased-f3"],
            hidden=True,
        ),
    ],
    "git-conflict-resolution-marker-parser": [
        case(
            "empty ours block",
            "parse_conflict_blocks",
            ["<<<<<<< HEAD\n=======\nadded line\n>>>>>>> feat"],
            {"count": 1, "blocks": [{"ours": "", "theirs": "added line"}]},
            hidden=True,
        ),
        case(
            "empty theirs block",
            "parse_conflict_blocks",
            ["<<<<<<< HEAD\nremoved line\n=======\n>>>>>>> feat"],
            {"count": 1, "blocks": [{"ours": "removed line", "theirs": ""}]},
            hidden=True,
        ),
    ],
    "cpu-cache-simulator-l2": [
        case(
            "fractional hit rate rounded to 4 decimals",
            "cache_hit_rate",
            [2, 3],
            0.6667,
            hidden=True,
        ),
    ],
    "os-memory-allocator-l2": [
        case(
            "first fit skips small block picks first sufficient",
            "first_fit",
            [[[0, 10], [20, 120], [200, 250]], 50],
            [1, 20, 70],
            hidden=True,
        ),
    ],
    "network-subnet-calculator-l2": [
        case(
            "single subnet borrows zero bits",
            "subnet_calc",
            ["10.0.0.0/16", 1],
            {"new_prefix": 16, "subnets": 1, "hosts_per_subnet": 65534, "bits_borrowed": 0},
            hidden=True,
        ),
        case(
            "/24 split into 2 subnets borrows 1 bit",
            "subnet_calc",
            ["172.16.0.0/24", 2],
            {"new_prefix": 25, "subnets": 2, "hosts_per_subnet": 126, "bits_borrowed": 1},
            hidden=True,
        ),
    ],
    "encoding-base64-tool-l2": [
        case(
            "decode invalid utf8 replaces bad bytes",
            "decode_base64",
            ["//5B"],
            "\ufffd\ufffdA",
            hidden=True,
        ),
    ],
    "linux-find-grep-tool-l2": [
        case(
            "character class glob matching",
            "search_by_name",
            [["log1.txt", "log2.txt", "log10.txt", "loga.txt"], "log[0-9].txt"],
            ["log1.txt", "log2.txt"],
            hidden=True,
        ),
        case(
            "missing content key handled safely",
            "search_by_content",
            [[{"name": "empty.txt"}, {"name": "data.txt", "content": "ok"}], "missing"],
            [],
            hidden=True,
        ),
    ],
    "linux-disk-quota-analyzer-l2": [
        case(
            "equal soft and hard limit blocks",
            "check_quota",
            [50, 50, 50],
            {"status": "blocked", "usage": 50, "limit": 50},
            hidden=True,
        ),
    ],
    "linux-sudo-auditor-l2": [
        case(
            "ALL commands on restricted target with password is safe",
            "audit_sudoers",
            [[{"user": "dev", "commands": "ALL", "target": "root", "nopasswd": False}]],
            [],
            hidden=True,
        ),
        case(
            "mixed safe nopasswd and full access entries",
            "audit_sudoers",
            [[
                {"user": "u1", "commands": "/bin/ls", "target": "root", "nopasswd": False},
                {"user": "u2", "commands": "/bin/cat", "target": "root", "nopasswd": True},
                {"user": "u3", "commands": "ALL", "target": "ALL", "nopasswd": False},
            ]],
            ["u2 - NOPASSWD", "u3 - FULL ACCESS"],
            hidden=True,
        ),
    ],
    "linux-process-priority-l2": [
        case(
            "vruntime formula positive nice",
            "calculate_vruntime",
            [1024, 2],
            1.56,
            hidden=True,
        ),
        case(
            "schedule mixes explicit vruntime and dynamic calculation",
            "schedule_next",
            [[{"pid": 1, "vruntime": 0.05}, {"pid": 2, "runtime": 100, "nice": 0}]],
            1,
            hidden=True,
        ),
    ],
    "shell-log-rotate-l2": [
        case(
            "exact size and age boundaries do not trigger",
            "simulate_logrotate",
            [[{"name": "edge.log", "size_mb": 100, "age_days": 7}], 7, 100],
            [],
            hidden=True,
        ),
        case(
            "mixed rotate keep and delete actions",
            "simulate_logrotate",
            [[
                {"name": "a.log", "size_mb": 101, "age_days": 1},
                {"name": "b.log", "size_mb": 10, "age_days": 5},
                {"name": "c.log", "size_mb": 10, "age_days": 8},
            ], 7, 100],
            [
                {"original": "a.log", "rotated": "a.log.1.gz", "compressed_size": 20.2},
                {"original": "c.log", "action": "deleted"},
            ],
            hidden=True,
        ),
    ],
    "git-branch-cleaner-l2": [
        case(
            "ignores merged branches absent from local list",
            "cleanup_branches",
            [["main", "feat-a"], ["feat-a", "deleted-remote"], "main"],
            {"safe_to_delete": ["feat-a"], "needs_review": []},
            hidden=True,
        ),
        case(
            "empty local branches",
            "cleanup_branches",
            [[], ["feat-a"], "main"],
            {"safe_to_delete": [], "needs_review": []},
            hidden=True,
        ),
    ],
    "git-commit-squasher-l2": [
        case(
            "equal count keeps commits unchanged",
            "simulate_squash",
            [[{"id": "1", "message": "a"}, {"id": "2", "message": "b"}], 2],
            [{"id": "1", "message": "a"}, {"id": "2", "message": "b"}],
            hidden=True,
        ),
        case(
            "squash 5 commits into 3 keeps last two",
            "simulate_squash",
            [[
                {"id": "1", "message": "m1"},
                {"id": "2", "message": "m2"},
                {"id": "3", "message": "m3"},
                {"id": "4", "message": "m4"},
                {"id": "5", "message": "m5"},
            ], 3],
            [
                {"id": "1", "message": "m1; m2; m3"},
                {"id": "4", "message": "m4"},
                {"id": "5", "message": "m5"},
            ],
            hidden=True,
        ),
    ],
    "git-conflict-auto-resolver-l2": [
        case(
            "unchanged relative to base yields zero actions",
            "auto_merge",
            [{"1": "x", "2": "y"}, {"1": "x"}, {"2": "y"}],
            {"conflicts": 0, "auto_merged": 0, "status": "clean"},
            hidden=True,
        ),
        case(
            "multiple simultaneous conflicts and one auto merge",
            "auto_merge",
            [{"1": "a", "2": "b"}, {"1": "a1", "2": "b1", "3": "c1"}, {"1": "a2", "2": "b2"}],
            {"conflicts": 2, "auto_merged": 1, "status": "conflict"},
            hidden=True,
        ),
    ],
    "git-rebase-detector-l2": [
        case(
            "empty feature commits",
            "predict_rebase_conflicts",
            [[], [{"file": "a.py", "start": 1, "end": 5}]],
            {"total_conflicts": 0, "recommendation": "rebase ok"},
            hidden=True,
        ),
        case(
            "one feature commit overlapping three target commits",
            "predict_rebase_conflicts",
            [
                [{"file": "app.py", "start": 1, "end": 20}],
                [
                    {"file": "app.py", "start": 1, "end": 3},
                    {"file": "app.py", "start": 5, "end": 8},
                    {"file": "app.py", "start": 10, "end": 12},
                ],
            ],
            {"total_conflicts": 3, "recommendation": "merge instead"},
            hidden=True,
        ),
    ],
    "git-conflict-resolution-strategies-l2": [
        case(
            "standard strategy",
            "recommend_strategy",
            ["feat", "main", "standard"],
            "recursive (default)",
            hidden=True,
        ),
        case(
            "trivial fast-forward strategy",
            "recommend_strategy",
            ["feat", "main", "trivial"],
            "merge --ff-only (快进)",
            hidden=True,
        ),
    ],

    # =========================================================================
    # Stage 02 (38 challenges)
    # =========================================================================
    "python-typed-config-value-parser": [
        case(
            "str preserves raw value",
            "parse_config_value",
            ["  raw text  ", "str"],
            "  raw text  ",
            hidden=True,
        ),
    ],
    "python-log-level-filter": [
        case(
            "debug filter skips unknown level and sorts",
            "filter_logs",
            [[
                {"timestamp": "10:00:02", "level": "DEBUG", "message": "d"},
                {"timestamp": "10:00:01", "level": "TRACE", "message": "t"},
                {"timestamp": "10:00:00", "level": "INFO", "message": "i"},
            ], "DEBUG"],
            [
                {"timestamp": "10:00:00", "level": "INFO", "message": "i"},
                {"timestamp": "10:00:02", "level": "DEBUG", "message": "d"},
            ],
            hidden=True,
        ),
        case(
            "fatal threshold excludes error",
            "filter_logs",
            [[
                {"timestamp": "01:00:00", "level": "ERROR", "message": "e"},
                {"timestamp": "02:00:00", "level": "FATAL", "message": "f"},
            ], "FATAL"],
            [{"timestamp": "02:00:00", "level": "FATAL", "message": "f"}],
            hidden=True,
        ),
    ],
    "python-batch-task-scheduler": [
        case(
            "execute_task processes valid payload",
            "execute_task",
            [{"id": 1, "payload": "job"}],
            "processed:job",
            hidden=True,
        ),
        case(
            "execute_task negative int raises ValueError",
            "execute_task",
            [{"id": 2, "payload": -5}],
            expected_exc="ValueError",
            hidden=True,
        ),
    ],
    "python-memoize-decorator": [
        case(
            "capacity one evicts immediately on new args",
            "eval_memoize",
            [1, [[1, 2], [1, 2], [3, 4], [1, 2]]],
            [
                {"result": 3, "cached": False},
                {"result": 3, "cached": True},
                {"result": 7, "cached": False},
                {"result": 3, "cached": False},
            ],
            hidden=True,
        ),
        case(
            "negative max_size raises ValueError",
            "eval_memoize",
            [-1, [[1, 2]]],
            expected_exc="ValueError",
            hidden=True,
        ),
    ],
    "python-sliding-window-stats": [
        case(
            "float inputs rounded to two decimals",
            "sliding_window_stats",
            [[1.5, 2.5, 3.0, 4.0], 2],
            [
                {"avg": 2, "max": 2.5, "min": 1.5},
                {"avg": 2.75, "max": 3, "min": 2.5},
                {"avg": 3.5, "max": 4, "min": 3},
            ],
            hidden=True,
        ),
    ],
    "python-multi-field-sorter": [
        case(
            "empty input list",
            "multi_field_sort",
            [[], [{"field": "score", "desc": True}]],
            [],
            hidden=True,
        ),
        case(
            "all missing primary falls back to secondary rules",
            "multi_field_sort",
            [
                [{"name": "B", "age": 20}, {"name": "A", "age": 20}, {"name": "C", "age": 10}],
                [{"field": "score", "desc": True}, {"field": "age", "desc": False}, {"field": "name", "desc": False}],
            ],
            [{"name": "C", "age": 10}, {"name": "A", "age": 20}, {"name": "B", "age": 20}],
            hidden=True,
        ),
    ],
    "python-deep-dict-merger": [
        case(
            "merge strategy handles 3-level nested dicts",
            "deep_merge",
            [{"a": {"b": {"c": 1, "d": 2}}}, {"a": {"b": {"c": 9, "e": 3}}}, "merge"],
            {"a": {"b": {"c": 9, "d": 2, "e": 3}}},
            hidden=True,
        ),
        case(
            "ignore strategy keeps dict when override is scalar",
            "deep_merge",
            [{"a": {"x": 1}}, {"a": 42}, "ignore"],
            {"a": {"x": 1}},
            hidden=True,
        ),
    ],
    "python-permission-intersection-analyzer": [
        case(
            "overlapping roles deduplicated without delete",
            "analyze_permissions",
            [{"r1": ["read", "write"], "r2": ["write", "exec"]}, {"bob": ["r1", "r2"]}],
            {"users": {"bob": {"permissions": ["exec", "read", "write"], "can_delete": False}}, "unused_permissions": []},
            hidden=True,
        ),
        case(
            "no users marks all permissions unused",
            "analyze_permissions",
            [{"admin": ["delete", "read"], "guest": ["read"]}, {}],
            {"users": {}, "unused_permissions": ["delete", "read"]},
            hidden=True,
        ),
    ],
    "python-log-word-frequency": [
        case(
            "equal counts preserve original keyword order",
            "count_keywords",
            [["alpha beta", "gamma"], ["gamma", "alpha", "delta"]],
            [{"keyword": "gamma", "count": 1}, {"keyword": "alpha", "count": 1}, {"keyword": "delta", "count": 0}],
            hidden=True,
        ),
        case(
            "repeated keyword on same line counts once",
            "count_keywords",
            [["error error error", "ok"], ["error"]],
            [{"keyword": "error", "count": 1}],
            hidden=True,
        ),
    ],
    "python-json-data-pipeline": [
        case(
            "nested dict drops blank and None fields",
            "clean_json_record",
            [{"outer_box": {"inner_val": "  42  ", "empty_str": "   ", "nil_val": None}, "flag_ok": "True"}],
            {"outerBox": {"innerVal": 42}, "flagOk": True},
            hidden=True,
        ),
        case(
            "snake_to_camel single word unchanged",
            "snake_to_camel",
            ["username"],
            "username",
            hidden=True,
        ),
    ],
    "python-csv-group-aggregator": [
        case(
            "max aggregation treats None as zero",
            "group_aggregate",
            [[{"team": "A", "score": None}, {"team": "A", "score": 5}, {"team": "B", "score": 12}], "team", "score", "max"],
            [{"team": "B", "score": 12, "count": 1}, {"team": "A", "score": 5, "count": 2}],
            hidden=True,
        ),
        case(
            "count aggregation sorted descending",
            "group_aggregate",
            [[{"k": "x", "v": 1}, {"k": "x", "v": 2}, {"k": "y", "v": 3}], "k", "v", "count"],
            [{"k": "x", "v": 2, "count": 2}, {"k": "y", "v": 1, "count": 1}],
            hidden=True,
        ),
    ],
    "python-connection-pool-simulator": [
        case(
            "unknown release ignored and lifo reuse order",
            "eval_pool",
            [2, [{"op": "acquire"}, {"op": "acquire"}, {"op": "release", "conn": 999}, {"op": "release", "conn": 1}, {"op": "release", "conn": 2}, {"op": "acquire"}]],
            [1, 2, None, None, None, 2],
            hidden=True,
        ),
        case(
            "zero max_size raises ValueError",
            "eval_pool",
            [0, []],
            expected_exc="ValueError",
            hidden=True,
        ),
    ],
    "python-shopping-cart": [
        case(
            "just under 5000 gets no discount and price updates",
            "eval_cart",
            [[{"op": "add", "name": "Monitor", "price": 2000, "qty": 1}, {"op": "add", "name": "Monitor", "price": 2499.5, "qty": 1}]],
            {"subtotal": 4999, "discount": 0, "total": 4999},
            hidden=True,
        ),
        case(
            "remove existing item and update quantity",
            "eval_cart",
            [[
                {"op": "add", "name": "A", "price": 3000, "qty": 2},
                {"op": "add", "name": "B", "price": 500, "qty": 1},
                {"op": "remove", "name": "B"},
                {"op": "update", "name": "A", "qty": 1},
            ]],
            {"subtotal": 3000, "discount": 0, "total": 3000},
            hidden=True,
        ),
    ],
    "python-cache-backend-abstraction": [
        case(
            "memory overwrite updates existing key",
            "eval_cache",
            ["memory", [{"op": "set", "key": "a", "value": 1}, {"op": "set", "key": "a", "value": 2}, {"op": "get", "key": "a"}]],
            2,
            hidden=True,
        ),
        case(
            "redis exists true with positive ttl",
            "eval_cache",
            ["redis", [{"op": "set", "key": "token", "value": "abc", "ttl": 60}, {"op": "exists", "key": "token"}]],
            True,
            hidden=True,
        ),
    ],
    "python-log-formatter-polymorphism": [
        case(
            "compact formatter ignores source",
            "eval_formatter",
            ["INFO", "ok", "auth.py", "compact"],
            "INFO|ok",
            hidden=True,
        ),
        case(
            "json formatter with empty source",
            "eval_formatter",
            ["ERROR", "boom", "", "json"],
            '{"level": "ERROR", "message": "boom", "source": "", "timestamp": "2025-01-01 10:00:00"}',
            hidden=True,
        ),
    ],
    "python-paginated-iterator": [
        case(
            "page size one yields singletons",
            "eval_paginated",
            [["a", "b", "c"], 1],
            [["a"], ["b"], ["c"]],
            hidden=True,
        ),
        case(
            "page size equal to length yields one page",
            "eval_paginated",
            [[1, 2, 3], 3],
            [[1, 2, 3]],
            hidden=True,
        ),
    ],
    "python-log-parser-generator": [
        case(
            "skips lines with more than four pipe fields",
            "parse_log_lines",
            [["INFO | 01:00 | mod | msg | extra", "DEBUG | 02:00 | core | ok"]],
            [{"level": "DEBUG", "timestamp": "02:00", "module": "core", "message": "ok"}],
            hidden=True,
        ),
        case(
            "only comments and whitespace returns empty",
            "parse_log_lines",
            [["# header", "   ", "\t# another"]],
            [],
            hidden=True,
        ),
    ],
    "python-retry-decorator": [
        case(
            "succeeds on 4th attempt after 3 transient failures",
            "eval_retry",
            [4, 3],
            "success",
            hidden=True,
        ),
        case(
            "zero max_attempts raises ValueError",
            "eval_retry",
            [0, 0],
            expected_exc="ValueError",
            hidden=True,
        ),
    ],
    "python-lambda-expression-sorter": [
        case(
            "multi rule name_length then age",
            "eval_sort_users",
            [
                [
                    {"name": "Amy", "age": 30, "score": 80},
                    {"name": "Bob", "age": 20, "score": 70},
                    {"name": "Alex", "age": 18, "score": 90},
                ],
                ["name_length", "age"],
            ],
            [
                {"name": "Bob", "age": 20, "score": 70},
                {"name": "Amy", "age": 30, "score": 80},
                {"name": "Alex", "age": 18, "score": 90},
            ],
            hidden=True,
        ),
        case(
            "empty users list",
            "eval_sort_users",
            [[], ["age", "score_desc"]],
            [],
            hidden=True,
        ),
    ],
    "py-valid-parentheses-l2": [
        case(
            "deeply nested mixed valid brackets",
            "is_valid",
            ["{[()()]}"],
            True,
            hidden=True,
        ),
        case(
            "trailing unmatched closing bracket",
            "is_valid",
            ["()[]{}}"],
            False,
            hidden=True,
        ),
    ],
    "py-fizzbuzz-l2": [
        case(
            "n=3 ends with Fizz",
            "fizzbuzz",
            [3],
            ["1", "2", "Fizz"],
            hidden=True,
        ),
        case(
            "n=30 contains two FizzBuzz entries",
            "fizzbuzz",
            [30],
            [
                "1", "2", "Fizz", "4", "Buzz", "Fizz", "7", "8", "Fizz", "Buzz",
                "11", "Fizz", "13", "14", "FizzBuzz", "16", "17", "Fizz", "19", "Buzz",
                "Fizz", "22", "23", "Fizz", "Buzz", "26", "Fizz", "28", "29", "FizzBuzz",
            ],
            hidden=True,
        ),
    ],
    "py-two-sum-l2": [
        case(
            "no matching pair returns empty",
            "two_sum",
            [[1, 2, 3], 10],
            [],
            hidden=True,
        ),
        case(
            "two zeros sum to zero",
            "two_sum",
            [[0, 4, 3, 0], 0],
            [0, 3],
            hidden=True,
        ),
    ],
    "py-palindrome-checker-l2": [
        case(
            "punctuation only is palindrome",
            "is_palindrome",
            ["!@#.,"],
            True,
            hidden=True,
        ),
        case(
            "mixed case palindrome",
            "is_palindrome",
            ["RaceCar"],
            True,
            hidden=True,
        ),
    ],
    "py-array-rotate-l2": [
        case(
            "empty array unchanged",
            "rotate",
            [[], 5],
            [],
            hidden=True,
        ),
        case(
            "single element array",
            "rotate",
            [[42], 7],
            [42],
            hidden=True,
        ),
    ],
    "py-merge-intervals-l2": [
        case(
            "single interval",
            "merge_intervals",
            [[[3, 9]]],
            [[3, 9]],
            hidden=True,
        ),
        case(
            "negative bounds chained merge",
            "merge_intervals",
            [[[-5, -1], [-2, 3], [3, 6], [8, 10]]],
            [[-5, 6], [8, 10]],
            hidden=True,
        ),
    ],
    "py-word-count-l2": [
        case(
            "empty text returns empty",
            "top_k_frequent",
            ["", 3],
            [],
            hidden=True,
        ),
        case(
            "k larger than unique words",
            "top_k_frequent",
            ["one two two", 5],
            [["two", 2], ["one", 1]],
            hidden=True,
        ),
    ],
    "py-set-operations-l2": [
        case(
            "empty second array",
            "set_operations",
            [[4, 2, 4], []],
            {"intersection": [], "difference": [2, 4]},
            hidden=True,
        ),
        case(
            "negative integers sorted output",
            "set_operations",
            [[-1, 3, 0, -5], [0, -5, 7]],
            {"intersection": [-5, 0], "difference": [-1, 3]},
            hidden=True,
        ),
    ],
    "py-file-finder-l2": [
        case(
            "missing content key searches path safely",
            "find_files",
            [[{"path": "/var/log/app.log"}, {"path": "/etc/hosts", "content": "localhost"}], "app.log"],
            ["/var/log/app.log"],
            hidden=True,
        ),
        case(
            "matches across both path and content",
            "find_files",
            [[{"path": "/a/cache.py", "content": ""}, {"path": "/b/db.py", "content": "use CACHE here"}], "cache"],
            ["/a/cache.py", "/b/db.py"],
            hidden=True,
        ),
    ],
    "py-json-flattener-l2": [
        case(
            "three-level nesting with null and zero",
            "flatten_json",
            [{"a": {"b": {"c": None, "d": 0}}}],
            {"a.b.c": None, "a.b.d": 0},
            hidden=True,
        ),
        case(
            "empty nested list produces no keys",
            "flatten_json",
            [{"items": [], "count": 0}],
            {"count": 0},
            hidden=True,
        ),
    ],
    "py-csv-parser-l2": [
        case(
            "empty csv string returns empty list",
            "parse_csv",
            [""],
            [],
            hidden=True,
        ),
        case(
            "trimmed headers and multiple quoted fields",
            "parse_csv",
            [' id , full_name , note \n1,"Doe, John","ok, yes"'],
            [{"id": "1", "full_name": "Doe, John", "note": "ok, yes"}],
            hidden=True,
        ),
    ],
    "py-stack-calculator-l2": [
        case(
            "single integer with spaces",
            "eval_calculate",
            ["  42 "],
            42,
            hidden=True,
        ),
        case(
            "leading negative division truncates toward zero",
            "eval_calculate",
            ["-7/2 + 1"],
            -2,
            hidden=True,
        ),
    ],
    "py-bank-account-l2": [
        case(
            "negative initial balance clamped to zero",
            "eval_bank",
            ["Zero", -500, []],
            0,
            hidden=True,
        ),
        case(
            "zero deposit raises ValueError",
            "eval_bank",
            ["Zero", 100, [{"op": "deposit", "amount": 0}]],
            expected_exc="ValueError",
            hidden=True,
        ),
    ],
    "py-shape-area-l2": [
        case(
            "float rectangle dimensions",
            "eval_shape",
            ["rectangle", [2.5, 4]],
            10,
            hidden=True,
        ),
        case(
            "fractional triangle area",
            "eval_shape",
            ["triangle", [3, 5]],
            7.5,
            hidden=True,
        ),
    ],
    "py-logger-polymorphism-l2": [
        case(
            "console empty logs",
            "eval_logger",
            ["console", []],
            [],
            hidden=True,
        ),
        case(
            "file logger multiple levels",
            "eval_logger",
            ["file", [["DEBUG", "init"], ["WARN", "retry"], ["FATAL", "halt"]]],
            ["[DEBUG] init", "[WARN] retry", "[FATAL] halt"],
            hidden=True,
        ),
    ],
    "py-range-iterator-l2": [
        case(
            "negative multi-step countdown",
            "eval_range",
            [[10, 0, -3]],
            [10, 7, 4, 1],
            hidden=True,
        ),
        case(
            "negative step with start below stop yields empty",
            "eval_range",
            [[1, 5, -1]],
            [],
            hidden=True,
        ),
    ],
    "py-fib-generator-l2": [
        case(
            "first 2 numbers",
            "eval_fib",
            [2],
            [0, 1],
            hidden=True,
        ),
        case(
            "first 10 numbers",
            "eval_fib",
            [10],
            [0, 1, 1, 2, 3, 5, 8, 13, 21, 34],
            hidden=True,
        ),
    ],
    "py-timing-decorator-l2": [
        case(
            "negative times negative returns positive",
            "eval_timer",
            ["s", -8, -9],
            72,
            hidden=True,
        ),
        case(
            "unknown unit fallback returns product",
            "eval_timer",
            ["us", 11, 12],
            132,
            hidden=True,
        ),
    ],
    "py-sort-lambda-l2": [
        case(
            "last_char handles empty string safely",
            "eval_sort_words",
            [["b", "", "a"], "last_char"],
            ["", "a", "b"],
            hidden=True,
        ),
        case(
            "length sort preserves stability on ties",
            "eval_sort_words",
            [["cat", "dog", "ant", "ox"], "length"],
            ["ox", "cat", "dog", "ant"],
            hidden=True,
        ),
    ],
}
