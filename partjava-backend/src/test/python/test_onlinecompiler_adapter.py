"""Controlled adapter fixtures only; production never executes submissions on the application host."""
import base64
import json
import pathlib
import subprocess
import sys
import unittest

TEMPLATE = (pathlib.Path(__file__).resolve().parents[2] / "main/resources/sandbox/onlinecompiler_adapter.py").read_text(encoding="utf-8")

class OnlineCompilerAdapterTest(unittest.TestCase):
    def run_fixture(self, source, case=None):
        program = TEMPLATE.replace("__PARTJAVA_SOURCE_B64__", base64.b64encode(source.encode()).decode())
        inputs = {"mode": "function", "function": "", "args": [], "kwargs": {}, "capture_exception": False}
        inputs.update(case or {})
        return subprocess.run([sys.executable, "-c", program], input=json.dumps(inputs), text=True, encoding="utf-8", capture_output=True, timeout=4)

    def test_multiple_arguments_kwargs_and_logs(self):
        run = self.run_fixture("def add(a,b,scale=1):\n print('debug')\n return (a+b)*scale", {"function":"add", "args":[1,2],"kwargs":{"scale":2}})
        self.assertEqual(0,run.returncode,run.stderr)
        self.assertEqual('{"value":6}',run.stdout)
        self.assertIn("debug",run.stderr)

    def test_nested_values_have_sorted_keys_plain_numbers_and_json_types(self):
        run = self.run_fixture("def solve(): return {'z':[1.0,1e-7,-0.0,None,False], 'a':True}")
        self.assertEqual(0,run.returncode,run.stderr)
        self.assertEqual('{"value":{"a":true,"z":[1,0.0000001,0,null,false]}}',run.stdout)

    def test_unicode_key_order_matches_codepoints(self):
        run = self.run_fixture("def solve(): return {'😀':1, '\\ue000':2, 'a':3}")
        self.assertEqual('{"value":{"a":3,"\ue000":2,"😀":1}}',run.stdout)

    def test_expected_exception_has_typed_envelope_without_exception_message(self):
        run = self.run_fixture("def solve(): raise ValueError('sensitive input')",{"capture_exception":True})
        self.assertEqual(0,run.returncode,run.stderr)
        self.assertEqual('{"exception":"ValueError"}',run.stdout)
        self.assertNotIn("sensitive",run.stdout)

    def test_unexpected_exception_is_nonzero_instead_of_success_envelope(self):
        run = self.run_fixture("def solve(): return 1/0")
        self.assertNotEqual(0,run.returncode)
        self.assertEqual("",run.stdout)
        self.assertIn("ZeroDivisionError",run.stderr)

    def test_ambiguous_entry_and_bad_arguments_fail_without_fallback(self):
        run = self.run_fixture("def first(): return 1\ndef second(): return 2")
        self.assertEqual(79,run.returncode)
        self.assertIn("入口不明确",run.stderr)
        run = self.run_fixture("def solve(a,b): return a+b",{"args":[{"a":1,"b":2}]})
        self.assertEqual(79,run.returncode)
        self.assertIn("参数不匹配",run.stderr)

    def test_stdin_is_captured_exactly_and_systemexit_zero_completes(self):
        run = self.run_fixture("import sys\nprint(input())\nsys.exit(0)",{"mode":"stdin","stdin":"hello\n"})
        self.assertEqual(0,run.returncode,run.stderr)
        self.assertEqual('{"value":"hello\\n"}',run.stdout)

    def test_unique_solution_method_and_async_function(self):
        run = self.run_fixture("class Solution:\n def add(self,a,b): return a+b",{"args":[1,2]})
        self.assertEqual('{"value":3}',run.stdout)
        run = self.run_fixture("async def solve(): return 2")
        self.assertEqual('{"value":2}',run.stdout)

    def test_unsupported_values_and_nonfinite_numbers_never_succeed(self):
        for source in ["def solve(): return float('nan')", "def solve(): return {1:2}"]:
            run = self.run_fixture(source)
            self.assertNotEqual(0,run.returncode)
            self.assertEqual("",run.stdout)

    def test_oversized_function_value_and_stdin_output_trigger_native_stdout_cap(self):
        for source,case in [("def solve(): return 'x'*65537",{}),("print('x'*65537)",{"mode":"stdin","stdin":""})]:
            run = self.run_fixture(source,case)
            self.assertEqual(0,run.returncode,run.stderr)
            self.assertGreater(len(run.stdout.encode()),65536)
            self.assertLessEqual(len(run.stdout.encode()),65537)

    def test_syntax_error_never_produces_success(self):
        run = self.run_fixture("def solve(: return 3")
        self.assertNotEqual(0,run.returncode)
        self.assertEqual("",run.stdout)
        self.assertIn("SyntaxError",run.stderr)

if __name__ == "__main__":
    unittest.main()
