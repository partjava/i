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
    if type(value).__module__.startswith("numpy") and hasattr(value, "tolist"):
        return _canonical(value.tolist())
    raise TypeError("函数返回值必须能表示为 JSON（对象键必须是字符串）")


def _to_snake(s):
    res = []
    for i, ch in enumerate(s):
        if ch.isupper() and i > 0 and (s[i - 1].islower() or (i + 1 < len(s) and s[i + 1].islower())):
            res.append("_")
        res.append(ch.lower())
    return "".join(res)


def _adapt_args(function, args, kwargs, legacy_input=False):
    try:
        inspect.signature(function).bind(*args, **kwargs)
        return args, kwargs
    except (TypeError, ValueError):
        pass

    if legacy_input and len(args) == 1 and isinstance(args[0], dict) and not kwargs:
        d = args[0]
        sig = inspect.signature(function)
        params = [p for p in sig.parameters.values() if p.name != "self"]
        num_defaults = len([p for p in params if p.default is not inspect.Parameter.empty])
        required_params = params[:-num_defaults] if num_defaults > 0 else params

        key_map = {}
        for k, v in d.items():
            key_map[k] = v
            key_map[_to_snake(k)] = v
            key_map[k.lower().replace("_", "")] = v

        if all(p.name in d or _to_snake(p.name) in key_map or p.name.lower().replace("_", "") in key_map for p in required_params):
            new_args = []
            for p in params:
                if p.name in d:
                    new_args.append(d[p.name])
                elif _to_snake(p.name) in key_map:
                    new_args.append(key_map[_to_snake(p.name)])
                elif p.name.lower().replace("_", "") in key_map:
                    new_args.append(key_map[p.name.lower().replace("_", "")])
                else:
                    break
            try:
                sig.bind(*new_args, **kwargs)
                return new_args, kwargs
            except (TypeError, ValueError):
                pass

    raise _ConfigurationError("入口参数不匹配，请检查 args/kwargs；不会猜测或调用其他函数")


def _entry(tree, requested, case=None):
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
    if case and case.get("legacy_input") and functions:
        args = case.get("args", [])
        if len(args) == 1 and isinstance(args[0], dict):
            d = args[0]
            matched_funcs = []
            for node in tree.body:
                if isinstance(node, (ast.FunctionDef, ast.AsyncFunctionDef)) and node.name in functions:
                    p_names = [a.arg for a in node.args.args if a.arg != "self"]
                    key_map = {k: k for k in d.keys()}
                    key_map.update({_to_snake(k): k for k in d.keys()})
                    key_map.update({k.lower().replace("_", ""): k for k in d.keys()})
                    if p_names and all(p in key_map for p in p_names):
                        matched_funcs.append(node.name)
            if len(matched_funcs) == 1:
                return matched_funcs[0]
    raise _ConfigurationError("入口不明确：请配置 function/entryPoint，并用 args/kwargs 明确参数")


def _is_numeric_list(val):
    if not isinstance(val, list) or not val:
        return False
    first = val[0]
    if isinstance(first, (int, float)) and not isinstance(first, bool):
        return all(isinstance(x, (int, float)) and not isinstance(x, bool) for x in val)
    if isinstance(first, list):
        return all(_is_numeric_list(x) for x in val)
    return False


def _to_ndarray_deep(np_mod, val, float_fallback=False):
    if isinstance(val, list):
        if _is_numeric_list(val):
            return np_mod.asarray(val, dtype=float) if float_fallback else np_mod.asarray(val)
        return [_to_ndarray_deep(np_mod, item, float_fallback) for item in val]
    if isinstance(val, dict):
        return {k: _to_ndarray_deep(np_mod, v, float_fallback) for k, v in val.items()}
    return val


def _needs_ndarray(ann, np_mod):
    if ann is inspect.Parameter.empty or np_mod is None:
        return False
    if ann is getattr(np_mod, "ndarray", None):
        return True
    return isinstance(ann, str) and "ndarray" in ann


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
    name = _entry(tree, case.get("function", ""), case)
    namespace = {"__name__": "submission"}
    with contextlib.redirect_stdout(sys.stderr):
        exec(compiled, namespace)
        parts = name.split(".")
        try:
            function = namespace[parts[0]] if len(parts) == 1 else getattr(namespace[parts[0]](), parts[1])
        except (KeyError, AttributeError):
            raise _ConfigurationError("指定入口不存在，请检查 function/entryPoint") from None
        args, kwargs = _adapt_args(
            function,
            list(case.get("args", [])),
            dict(case.get("kwargs", {})),
            bool(case.get("legacy_input", False)),
        )
        np_mod = next(
            (v for v in namespace.values() if inspect.ismodule(v) and v.__name__ == "numpy"),
            None,
        )
        if np_mod is not None:
            sig = inspect.signature(function)
            bound = sig.bind(*args, **kwargs)
            for p_name, p_obj in sig.parameters.items():
                if p_name in bound.arguments and _needs_ndarray(p_obj.annotation, np_mod):
                    val = bound.arguments[p_name]
                    if isinstance(val, list):
                        bound.arguments[p_name] = np_mod.asarray(val)
            args = list(bound.args)
            kwargs = dict(bound.kwargs)
        try:
            value = function(*args, **kwargs)
        except (AttributeError, TypeError) as err:
            msg = str(err)
            numpy_err = (
                np_mod is not None
                and any(
                    hint in msg
                    for hint in (
                        "has no attribute",
                        "unsupported operand type(s)",
                        "can't multiply sequence",
                        "only integer scalar arrays",
                        "list indices must be integers or slices",
                    )
                )
            )
            if not numpy_err:
                raise
            np_args = [_to_ndarray_deep(np_mod, a, float_fallback=False) for a in args]
            np_kwargs = {k: _to_ndarray_deep(np_mod, v, float_fallback=False) for k, v in kwargs.items()}
            value = function(*np_args, **np_kwargs)
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
