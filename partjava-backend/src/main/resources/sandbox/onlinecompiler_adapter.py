"""One native OnlineCompiler test. Expected values are never embedded in this program."""
import ast
import asyncio
import base64
import contextlib
import decimal
import inspect
import io
import json
import math
import sys
import traceback

_SOURCE = base64.b64decode("__PARTJAVA_SOURCE_B64__").decode("utf-8")
_LIMIT = 65536

class _ConfigurationError(Exception):
    pass

class _OutputLimit(Exception):
    pass

class _BoundedCapture(io.StringIO):
    def __init__(self):
        super().__init__()
        self.size = 0
    def write(self, value):
        self.size += len(value.encode("utf-8"))
        if self.size > _LIMIT:
            raise _OutputLimit("标准输出超过 64 KiB")
        return super().write(value)


def _canonical(value):
    if value is None:
        return "null"
    if isinstance(value, bool):
        return "true" if value else "false"
    if isinstance(value, int):
        return str(int(value))
    if isinstance(value, (float, decimal.Decimal)):
        if isinstance(value, float) and not math.isfinite(value):
            raise ValueError("返回值不能包含 NaN 或 Infinity")
        number = decimal.Decimal(str(value))
        if not number.is_finite():
            raise ValueError("返回值不能包含 NaN 或 Infinity")
        if not number:
            return "0"
        text = format(number, "f")
        return text.rstrip("0").rstrip(".") if "." in text else text
    if isinstance(value, str):
        return json.dumps(str(value), ensure_ascii=False, separators=(",", ":"))
    if isinstance(value, (list, tuple)):
        return "[" + ",".join(_canonical(item) for item in value) + "]"
    if isinstance(value, dict) and all(isinstance(key, str) for key in value):
        return "{" + ",".join(_canonical(key) + ":" + _canonical(value[key]) for key in sorted(value)) + "}"
    raise TypeError("函数返回值必须能表示为 JSON（对象键必须是字符串）")


def _entry(tree, requested):
    if requested:
        parts = requested.split(".")
        if len(parts) > 2 or any(not part.isidentifier() or part.startswith("_") for part in parts):
            raise _ConfigurationError("入口必须为公开函数名或 Solution.method")
        return requested
    functions = [node.name for node in tree.body if isinstance(node, (ast.FunctionDef, ast.AsyncFunctionDef)) and not node.name.startswith("_")]
    if "solve" in functions:
        return "solve"
    if len(functions) == 1:
        return functions[0]
    classes = [node for node in tree.body if isinstance(node, ast.ClassDef) and node.name == "Solution"]
    if not functions and len(classes) == 1:
        methods = [node.name for node in classes[0].body if isinstance(node, (ast.FunctionDef, ast.AsyncFunctionDef)) and not node.name.startswith("_")]
        if len(methods) == 1:
            return "Solution." + methods[0]
    raise _ConfigurationError("入口不明确：请配置 function/entryPoint，并用 args/kwargs 明确参数")


def _run(case):
    tree = ast.parse(_SOURCE, filename="submission.py")
    compiled = compile(tree, "submission.py", "exec")
    if case["mode"] == "stdin":
        output = _BoundedCapture()
        sys.stdin = io.StringIO(case["stdin"])
        with contextlib.redirect_stdout(output):
            try:
                exec(compiled, {"__name__": "__main__"})
            except SystemExit as error:
                if error.code not in (None, 0):
                    raise
        return output.getvalue()
    name = _entry(tree, case["function"])
    namespace = {"__name__": "submission"}
    with contextlib.redirect_stdout(sys.stderr):
        exec(compiled, namespace)
        parts = name.split(".")
        try:
            function = namespace[parts[0]] if len(parts) == 1 else getattr(namespace[parts[0]](), parts[1])
        except (KeyError, AttributeError):
            raise _ConfigurationError("指定入口不存在，请检查 function/entryPoint") from None
        try:
            inspect.signature(function).bind(*case["args"], **case["kwargs"])
        except (TypeError, ValueError):
            raise _ConfigurationError("入口参数不匹配，请检查 args/kwargs；不会猜测或调用其他函数") from None
        value = function(*case["args"], **case["kwargs"])
        if inspect.isawaitable(value):
            value = asyncio.run(value)
        return value


def _main():
    case = json.loads(sys.stdin.read())
    try:
        value = _run(case)
    except _OutputLimit:
        sys.stdout.write("x" * (_LIMIT + 1))
        sys.stdout.flush()
        return
    except _ConfigurationError as error:
        sys.stderr.write("评测配置错误：" + str(error) + "\n")
        raise SystemExit(79)
    except Exception as error:
        if not case.get("capture_exception", False):
            traceback.print_exc(file=sys.stderr)
            raise SystemExit(1)
        envelope = {"exception": type(error).__name__}
    else:
        envelope = {"value": value}
    encoded = _canonical(envelope)
    if len(encoded.encode("utf-8")) > _LIMIT:
        sys.stdout.write("x" * (_LIMIT + 1))
        sys.stdout.flush()
        return
    sys.stdout.write(encoded)
    sys.stdout.flush()


if __name__ == "__main__":
    _main()
