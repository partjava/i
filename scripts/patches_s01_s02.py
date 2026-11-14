"""Stage 01 & Stage 02 patches: starter fixes, solution fixes, Chinese comments, public & hidden test cases."""

def case(name, fn, args, expected=None, *, expected_exc=None, hidden=False, kwargs=None, check=None):
    c = {
        "name": name,
        "mode": "function",
        "function": fn,
        "args": args,
        "hidden": hidden,
    }
    if kwargs:
        c["kwargs"] = kwargs
    if expected_exc is not None:
        c["expectedException"] = expected_exc
    elif expected is not None:
        c["expected"] = expected
    if check is not None:
        c["_check"] = check
    return c


STARTER_OVERRIDES = {
    # --- Stage 01: strip leaked implementations in all 14 L2 challenges + encoding-system-log docstring ---
    "encoding-system-log-charset-detector": '''def decode_log_payload(payload: bytes | str) -> dict:
    # payload 支持 bytes 或十六进制字符串，返回 {"status": "OK"|"SUSPECT_REPLACEMENT"|"INVALID_UTF8", "text": "..."}
    pass
''',
    "cpu-cache-simulator-l2": '''def simulate_cache(accesses: list[int], cache_lines: int, line_size: int) -> int:
    """模拟 FIFO 缓存替换并返回命中次数"""
    pass

def cache_hit_rate(hits: int, total: int) -> float:
    """计算缓存命中率并保留 4 位小数"""
    pass
''',
    "os-memory-allocator-l2": '''def first_fit(free_list: list[list[int]], size: int) -> tuple:
    """首次适应算法，返回 (块索引, 起始地址, 结束地址)，失败返回 (-1, 0, 0)"""
    pass

def best_fit(free_list: list[list[int]], size: int) -> tuple:
    """最佳适应算法，返回最紧凑空闲块的 (块索引, 起始地址, 结束地址)"""
    pass
''',
    "network-subnet-calculator-l2": '''def subnet_calc(network_cidr: str, num_subnets: int) -> dict:
    """计算子网划分结果：new_prefix, subnets, hosts_per_subnet, bits_borrowed"""
    pass
''',
    "encoding-base64-tool-l2": '''import base64

def encode_base64(data: bytes | str) -> str:
    """将字节或 UTF-8 字符串编码为 Base64 字符串"""
    pass

def decode_base64(encoded: str) -> str:
    """将 Base64 字符串解码为 UTF-8 文本"""
    pass
''',
    "linux-find-grep-tool-l2": '''import fnmatch

def search_by_name(files: list[str], pattern: str) -> list[str]:
    """按通配符模式匹配文件名列表"""
    pass

def search_by_content(files: list[dict], keyword: str) -> list[str]:
    """在文件字典列表中搜索包含关键词的文件名"""
    pass
''',
    "linux-disk-quota-analyzer-l2": '''def check_quota(usage: int, soft_limit: int, hard_limit: int) -> dict:
    """根据硬限制与软限制返回配额状态字典"""
    pass
''',
    "linux-sudo-auditor-l2": '''def audit_sudoers(entries: list[dict]) -> list[str]:
    """审计 sudoers 配置中的高危权限条目"""
    pass
''',
    "linux-process-priority-l2": '''def calculate_vruntime(runtime: float, nice: int) -> float:
    """按 CFS 权重公式计算虚拟运行时间"""
    pass

def schedule_next(processes: list[dict]) -> int:
    """选择下一个应调度的进程 PID"""
    pass
''',
    "shell-log-rotate-l2": '''def simulate_logrotate(log_files: list[dict], max_age_days: int, max_size_mb: int) -> list[dict]:
    """模拟日志轮转与过期清理动作"""
    pass
''',
    "git-branch-cleaner-l2": '''def cleanup_branches(branches: list[str], merged_branches: list[str], default_branch: str) -> dict:
    """区分可安全删除的已合并分支与需审查的未合并分支"""
    pass
''',
    "git-commit-squasher-l2": '''def simulate_squash(commits: list[dict], target_count: int) -> list[dict]:
    """将早期多余提交压缩合并，使最终提交数不超过 target_count"""
    pass
''',
    "git-conflict-auto-resolver-l2": '''def auto_merge(base: dict, a_changes: dict, b_changes: dict) -> dict:
    """对比基线统计自动合并行数与冲突行数"""
    pass
''',
    "git-rebase-detector-l2": '''def predict_rebase_conflicts(feature_commits: list[dict], target_commits: list[dict]) -> dict:
    """预测变基区间重叠冲突数并给出建议"""
    pass
''',
    "git-conflict-resolution-strategies-l2": '''def recommend_strategy(branch_a: str, branch_b: str, situation: str) -> str:
    """根据分支协作场景推荐 Git 合并策略"""
    pass
''',

    # --- Stage 02: add evaluator helpers for OOP/decorator/generator/lambda + strip py-sort-lambda-l2 leak ---
    "python-memoize-decorator": '''import functools

def memoize_n(max_size: int):
    """
    装饰器工厂：缓存最近 max_size 次调用的结果。
    使用 functools.wraps 保留原函数元信息。
    缓存 key 由参数元组 (args, tuple(sorted(kwargs.items()))) 生成。
    返回值带缓存统计: {"result": ..., "cached": True/False}
    """
    pass

# 评测入口（请勿修改）
def eval_memoize(max_size: int, calls: list[list[int]]) -> list[dict]:
    @memoize_n(max_size)
    def add(a, b):
        return a + b
    return [add(*pair) for pair in calls]
''',
    "python-connection-pool-simulator": '''import time

class ConnectionPool:
    """简易连接池"""
    def __init__(self, max_size: int):
        """创建 max_size 个连接（用整数 ID 1..max_size 模拟）"""
        pass

    def acquire(self, timeout: float = 5.0) -> int:
        """获取连接，超时抛出 TimeoutError。timeout=0 不等待。"""
        pass

    def release(self, conn: int) -> None:
        """归还连接"""
        pass

    def close_all(self) -> None:
        """关闭所有连接"""
        pass

# 评测入口（请勿修改）
def eval_pool(max_size: int, actions: list[dict]) -> list:
    pool = ConnectionPool(max_size)
    out = []
    for act in actions:
        op = act.get("op")
        if op == "acquire":
            try:
                out.append(pool.acquire(act.get("timeout", 5.0)))
            except TimeoutError:
                out.append("timeout_error")
            except RuntimeError:
                out.append("closed_error")
        elif op == "release":
            pool.release(act["conn"])
            out.append(None)
        elif op == "close_all":
            pool.close_all()
            out.append(None)
    return out
''',
    "python-shopping-cart": '''class ShoppingCart:
    """购物车类，封装商品添加、计算逻辑"""
    def __init__(self):
        self._items = []

    def add_item(self, name: str, price: float, quantity: int = 1) -> None:
        """添加商品，已有则累加数量"""
        pass

    def remove_item(self, name: str) -> None:
        """移除某商品"""
        pass

    def update_quantity(self, name: str, quantity: int) -> None:
        """更新数量，quantity=0 时移除"""
        pass

    def get_subtotal(self) -> float:
        """原价总和"""
        pass

    def get_discount(self) -> float:
        """优惠金额：满10000减500，满5000减200"""
        pass

    def get_total(self) -> float:
        """实际应付"""
        pass

    def item_count(self) -> int:
        """商品种类数"""
        pass

# 评测入口（请勿修改）
def eval_cart(actions: list[dict]) -> dict:
    cart = ShoppingCart()
    for act in actions:
        op = act["op"]
        if op == "add":
            cart.add_item(act["name"], act["price"], act.get("qty", 1))
        elif op == "remove":
            cart.remove_item(act["name"])
        elif op == "update":
            cart.update_quantity(act["name"], act["qty"])
    return {
        "subtotal": cart.get_subtotal(),
        "discount": cart.get_discount(),
        "total": cart.get_total(),
    }
''',
    "python-cache-backend-abstraction": '''from abc import ABC, abstractmethod
import time

class CacheBackend(ABC):
    """缓存后端抽象基类"""
    @abstractmethod
    def get(self, key: str):
        pass

    @abstractmethod
    def set(self, key: str, value, ttl: int = 0) -> None:
        pass

    @abstractmethod
    def delete(self, key: str) -> bool:
        pass

    @abstractmethod
    def exists(self, key: str) -> bool:
        pass


class MemoryCache(CacheBackend):
    """内存缓存实现，数据存储在 _store 字典中"""
    def __init__(self):
        self._store = {}
        self._expiry = {}


class RedisCacheMock(CacheBackend):
    """模拟 Redis，key 自动加 "redis:" 前缀"""
    def __init__(self):
        self._store = {}
        self._expiry = {}

# 评测入口（请勿修改）
def eval_cache(cache_type: str, actions: list[dict]):
    cache = MemoryCache() if cache_type == "memory" else RedisCacheMock()
    last = None
    for act in actions:
        op = act["op"]
        if op == "set":
            cache.set(act["key"], act["value"], act.get("ttl", 0))
        elif op == "get":
            last = cache.get(act["key"])
        elif op == "delete":
            last = cache.delete(act["key"])
        elif op == "exists":
            last = cache.exists(act["key"])
    return last
''',
    "python-log-formatter-polymorphism": '''from abc import ABC, abstractmethod
import json

class LogRecord:
    """日志记录"""
    def __init__(self, level: str, message: str, source: str = ''):
        self.level = level
        self.message = message
        self.source = source
        self.timestamp = '2025-01-01 10:00:00'

class LogFormatter(ABC):
    """日志格式化器抽象基类"""
    @abstractmethod
    def format(self, record: LogRecord) -> str:
        pass

class PlainTextFormatter(LogFormatter):
    """纯文本格式: [LEVEL] message (source)"""
    def format(self, record: LogRecord) -> str:
        pass

class JsonFormatter(LogFormatter):
    """JSON 格式: {"level": "...", "message": "...", ...}"""
    def format(self, record: LogRecord) -> str:
        pass

class CompactFormatter(LogFormatter):
    """紧凑格式: LEVEL|message"""
    def format(self, record: LogRecord) -> str:
        pass

def format_log(record: LogRecord, formatter: LogFormatter) -> str:
    """多态调用：不管传什么 formatter，统一调 format"""
    pass

# 评测入口（请勿修改）
def eval_formatter(level: str, message: str, source: str, formatter_type: str) -> str:
    record = LogRecord(level, message, source)
    mapping = {
        "plain": PlainTextFormatter(),
        "json": JsonFormatter(),
        "compact": CompactFormatter(),
    }
    return format_log(record, mapping[formatter_type])
''',
    "python-paginated-iterator": '''class PaginatedIterator:
    """分页迭代器：每次迭代返回一页数据，自动翻页"""
    def __init__(self, all_data: list, page_size: int):
        self._all_data = all_data
        self._page_size = page_size
        self._index = 0

    def __iter__(self):
        """返回迭代器自身"""
        pass

    def __next__(self) -> list:
        """返回当前页数据列表，无更多数据时抛出 StopIteration"""
        pass

# 评测入口（请勿修改）
def eval_paginated(all_data: list, page_size: int) -> list[list]:
    return list(PaginatedIterator(all_data, page_size))
''',
    "python-retry-decorator": '''import time
import functools

def retry(max_attempts: int = 3, delay: float = 0, exceptions: tuple = (Exception,)):
    """装饰器：函数调用失败时自动重试，超过次数后抛出最后一次异常"""
    pass

# 评测入口（请勿修改）
def eval_retry(max_attempts: int, fail_times: int) -> str:
    state = {"count": 0}
    @retry(max_attempts=max_attempts, delay=0, exceptions=(ValueError,))
    def task():
        state["count"] += 1
        if state["count"] <= fail_times:
            raise ValueError("transient error")
        return "success"
    return task()
''',
    "python-lambda-expression-sorter": '''def sort_users(users: list[dict], *key_funcs) -> list[dict]:
    """按多个 lambda 排序规则依次升序排列，返回新列表"""
    pass

# 按年龄升序
by_age = None
# 按分数降序
by_score_desc = None
# 按姓名长度升序
by_name_length = None

# 评测入口（请勿修改）
def eval_sort_users(users: list[dict], rule_names: list[str]) -> list[dict]:
    rules_map = {
        "age": by_age,
        "score_desc": by_score_desc,
        "name_length": by_name_length,
    }
    funcs = [rules_map[name] for name in rule_names]
    return sort_users(users, *funcs)
''',
    "py-array-rotate-l2": '''def rotate(nums: list, k: int) -> list:
    """原地右旋数组 k 步并返回 nums"""
    pass
''',
    "py-stack-calculator-l2": '''class Calculator:
    @staticmethod
    def calculate(s: str) -> int:
        pass

# 评测入口（请勿修改）
def eval_calculate(s: str) -> int:
    return Calculator.calculate(s)
''',
    "py-bank-account-l2": '''class BankAccount:
    def __init__(self, owner: str, balance: float = 0):
        self.owner = owner
        self._balance = balance
    def deposit(self, amount): pass
    def withdraw(self, amount): pass
    def transfer(self, amount, target): pass
    def get_balance(self): pass

# 评测入口（请勿修改）
def eval_bank(owner: str, initial: float, actions: list[dict]) -> float:
    acc = BankAccount(owner, initial)
    for act in actions:
        op = act["op"]
        if op == "deposit":
            acc.deposit(act["amount"])
        elif op == "withdraw":
            acc.withdraw(act["amount"])
        elif op == "transfer":
            acc.transfer(act["amount"], BankAccount(act["target"], 0))
    return acc.get_balance()
''',
    "py-shape-area-l2": '''from abc import ABC, abstractmethod
import math

class Shape(ABC):
    @abstractmethod
    def area(self): pass

class Circle(Shape):
    def __init__(self, r): pass
    def area(self): pass

class Rectangle(Shape):
    def __init__(self, w, h): pass
    def area(self): pass

class Triangle(Shape):
    def __init__(self, b, h): pass
    def area(self): pass

# 评测入口（请勿修改）
def eval_shape(shape: str, args: list) -> float:
    cls = {"circle": Circle, "rectangle": Rectangle, "triangle": Triangle}[shape]
    return cls(*args).area()
''',
    "py-logger-polymorphism-l2": '''from abc import ABC, abstractmethod

class Logger(ABC):
    @abstractmethod
    def log(self, level, message): pass

class FileLogger(Logger):
    def __init__(self): self.lines = []
    def log(self, level, message): pass

class ConsoleLogger(Logger):
    def __init__(self): self.output = []
    def log(self, level, message): pass

def write_logs(logger: Logger, logs: list):
    pass

# 评测入口（请勿修改）
def eval_logger(logger_type: str, logs: list) -> list[str]:
    logger = FileLogger() if logger_type == "file" else ConsoleLogger()
    write_logs(logger, logs)
    return logger.lines if logger_type == "file" else logger.output
''',
    "py-range-iterator-l2": '''class RangeIterator:
    def __init__(self, *args): pass
    def __iter__(self): pass
    def __next__(self): pass

# 评测入口（请勿修改）
def eval_range(args: list[int]) -> list[int]:
    return list(RangeIterator(*args))
''',
    "py-fib-generator-l2": '''def fibonacci():
    pass

def first_n(g, n):
    pass

# 评测入口（请勿修改）
def eval_fib(n: int) -> list[int]:
    return first_n(fibonacci(), n)
''',
    "py-timing-decorator-l2": '''import time, functools

def timer(unit="s"):
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            pass
        return wrapper
    return decorator

# 评测入口（请勿修改）
def eval_timer(unit: str, a: int, b: int) -> int:
    @timer(unit=unit)
    def multiply(x, y):
        return x * y
    return multiply(a, b)
''',
    "py-sort-lambda-l2": '''def sort_words(words: list[str], key_func) -> list[str]:
    """按传入键函数对单词列表排序并返回"""
    pass

by_length = None
by_last_char = None
by_count_a = None

# 评测入口（请勿修改）
def eval_sort_words(words: list[str], key_name: str) -> list[str]:
    mapping = {
        "length": by_length,
        "last_char": by_last_char,
        "count_a": by_count_a,
    }
    return sort_words(words, mapping[key_name])
''',
}


SOLUTION_OVERRIDES = {
    "encoding-system-log-charset-detector": '''def decode_log_payload(payload: bytes | str) -> dict:
    # 若传入十六进制字符串，则先转换为字节序列
    if isinstance(payload, str):
        payload = bytes.fromhex(payload)
    try:
        # 严格按 UTF-8 解码，遇到非法字节序列抛出异常
        text = payload.decode('utf-8')
    except UnicodeDecodeError:
        return {"status": "INVALID_UTF8", "text": ""}

    # 检测到 U+FFFD 替换符说明存在潜在乱码或前期损毁替换
    if '\\ufffd' in text:
        return {"status": "SUSPECT_REPLACEMENT", "text": text}
    return {"status": "OK", "text": text}
''',
    "encoding-base64-tool-l2": '''import base64

def encode_base64(data):
    # 兼容字符串输入，统一转为 UTF-8 字节后执行 Base64 编码
    if isinstance(data, str):
        data = data.encode('utf-8')
    return base64.b64encode(data).decode('ascii')

def decode_base64(encoded):
    # 解码 Base64 字节并以 UTF-8 文本返回（非法字节用替换符兜底）
    return base64.b64decode(encoded).decode('utf-8', errors='replace')
''',
    "linux-process-priority-l2": '''def calculate_vruntime(runtime, nice):
    # CFS 调度器中权重按 1.25^(-nice) 缩放
    weight = 1024 / (1.25 ** nice)
    return round(runtime / weight, 2)

def schedule_next(processes):
    # 若进程条目尚未携带 vruntime 字段，则动态依据 runtime 与 nice 计算
    return min(
        processes,
        key=lambda p: p['vruntime'] if 'vruntime' in p else calculate_vruntime(p['runtime'], p['nice'])
    )['pid']
''',
    "git-conflict-auto-resolver-l2": '''def auto_merge(base, a_changes, b_changes):
    # 仅统计相对于基线真正发生改动的行
    a_diff = {line for line, val in a_changes.items() if base.get(line) != val}
    b_diff = {line for line, val in b_changes.items() if base.get(line) != val}
    # 双方都修改且内容不同则判定为冲突行
    conflicts = [line for line in (a_diff & b_diff) if a_changes[line] != b_changes[line]]
    # 无冲突的唯一改动行均可自动合并
    auto_merged = len((a_diff | b_diff) - set(conflicts))
    return {
        'conflicts': len(conflicts),
        'auto_merged': auto_merged,
        'status': 'conflict' if conflicts else 'clean',
    }
''',
    "python-batch-task-scheduler": '''import time

def execute_task(task: dict) -> str:
    # 模拟单个任务执行，负数载荷触发异常以便批处理捕获
    if isinstance(task.get('payload'), int) and task['payload'] < 0:
        raise ValueError('negative payload')
    return f"processed:{task['payload']}"

def run_batches(tasks: list[dict], batch_size: int, interval: float) -> list[dict]:
    # 校验批大小必须为正整数
    if batch_size <= 0:
        raise ValueError('batch_size must be positive')
    batches = []
    batch_no = 1
    i = 0
    # 按 batch_size 切片分批执行并隔离单任务失败
    while i < len(tasks):
        batch_tasks = tasks[i:i + batch_size]
        results = []
        for task in batch_tasks:
            try:
                execute_task(task)
                results.append({'id': task['id'], 'status': 'success'})
            except Exception as e:
                results.append({'id': task['id'], 'status': 'failed', 'error': str(e)})
        batches.append({'batch': batch_no, 'results': results})
        batch_no += 1
        i += batch_size
        # 批间等待（非最后一批且 interval>0）
        if i < len(tasks) and interval > 0:
            time.sleep(interval)
    return batches
''',
    "python-multi-field-sorter": '''def multi_field_sort(data: list[dict], rules: list[dict]) -> list[dict]:
    # 复制列表避免修改原数据，利用 Python 稳定排序从次要规则向主要规则逆序归并
    result = list(data)
    for rule in reversed(rules):
        field = rule['field']
        desc = rule.get('desc', False)
        # 缺失值(None)无论升降序始终排在最后
        present = [item for item in result if item.get(field) is not None]
        missing = [item for item in result if item.get(field) is None]
        present.sort(key=lambda item: item[field], reverse=desc)
        result = present + missing
    return result
''',
    "python-permission-intersection-analyzer": '''def analyze_permissions(role_permissions: dict, user_roles: dict) -> dict:
    # 将各角色权限统一转换为集合后再求并集，统计用户权限及未被授予的冗余权限
    normalized_roles = {role: set(perms) for role, perms in role_permissions.items()}
    result_users = {}
    all_granted = set()
    for user, roles in user_roles.items():
        perms = set()
        for role in roles:
            if role in normalized_roles:
                perms |= normalized_roles[role]
        result_users[user] = {
            'permissions': sorted(perms),
            'can_delete': 'delete' in perms,
        }
        all_granted |= perms
    all_perms = set()
    for perms in normalized_roles.values():
        all_perms |= perms
    unused = all_perms - all_granted
    return {'users': result_users, 'unused_permissions': sorted(unused)}
''',
    "python-log-word-frequency": '''def count_keywords(log_lines: list[str], keywords: list[str]) -> list[dict]:
    # 统计日志行中出现各关键词的行数（不区分大小写），按频次降序、原顺序稳定输出
    counts = {kw: 0 for kw in keywords}
    for line in log_lines:
        line_lower = line.lower()
        for kw in keywords:
            if kw.lower() in line_lower:
                counts[kw] += 1
    result = [{'keyword': kw, 'count': counts[kw]} for kw in keywords]
    order_map = {kw: idx for idx, kw in enumerate(keywords)}
    result.sort(key=lambda x: (-x['count'], order_map[x['keyword']]))
    return result
''',
    "python-memoize-decorator": '''import functools

def memoize_n(max_size: int):
    # LRU 缓存装饰器工厂：保留最近 max_size 次不同参数组合的返回值
    if max_size <= 0:
        raise ValueError('max_size must be positive')
    def decorator(func):
        cache = {}
        order = []
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            key = (args, tuple(sorted(kwargs.items())))
            if key in cache:
                order.remove(key)
                order.append(key)
                return {'result': cache[key], 'cached': True}
            result = func(*args, **kwargs)
            cache[key] = result
            order.append(key)
            if len(order) > max_size:
                oldest = order.pop(0)
                del cache[oldest]
            return {'result': result, 'cached': False}
        return wrapper
    return decorator

# 评测入口（请勿修改）
def eval_memoize(max_size: int, calls: list[list[int]]) -> list[dict]:
    @memoize_n(max_size)
    def add(a, b):
        return a + b
    return [add(*pair) for pair in calls]
''',
    "python-connection-pool-simulator": '''import time

class ConnectionPool:
    """基于空闲栈与占用集合的简易数据库连接池"""
    def __init__(self, max_size: int):
        if max_size <= 0:
            raise ValueError('max_size must be positive')
        # 使用 pop() 从尾部分配，初始化倒序使首个 acquire 返回连接 1
        self._idle = list(range(max_size, 0, -1))
        self._busy = set()
        self._closed = False

    def acquire(self, timeout: float = 5.0) -> int:
        if self._closed:
            raise RuntimeError('pool is closed')
        if self._idle:
            conn = self._idle.pop()
            self._busy.add(conn)
            return conn
        if timeout <= 0:
            raise TimeoutError('no available connection')
        deadline = time.monotonic() + timeout
        while time.monotonic() < deadline:
            if self._closed:
                raise RuntimeError('pool is closed')
            if self._idle:
                conn = self._idle.pop()
                self._busy.add(conn)
                return conn
            time.sleep(0.01)
        raise TimeoutError('acquire timed out')

    def release(self, conn: int) -> None:
        if conn in self._busy:
            self._busy.remove(conn)
            self._idle.append(conn)

    def close_all(self) -> None:
        self._closed = True
        self._idle.clear()
        self._busy.clear()

# 评测入口（请勿修改）
def eval_pool(max_size: int, actions: list[dict]) -> list:
    pool = ConnectionPool(max_size)
    out = []
    for act in actions:
        op = act.get("op")
        if op == "acquire":
            try:
                out.append(pool.acquire(act.get("timeout", 5.0)))
            except TimeoutError:
                out.append("timeout_error")
            except RuntimeError:
                out.append("closed_error")
        elif op == "release":
            pool.release(act["conn"])
            out.append(None)
        elif op == "close_all":
            pool.close_all()
            out.append(None)
    return out
''',
    "python-shopping-cart": '''class ShoppingCart:
    """购物车类：维护商品数量增删改及满减价格计算"""
    def __init__(self):
        self._items = []

    def add_item(self, name: str, price: float, quantity: int = 1) -> None:
        for item in self._items:
            if item['name'] == name:
                item['quantity'] += quantity
                item['price'] = price
                return
        self._items.append({'name': name, 'price': price, 'quantity': quantity})

    def remove_item(self, name: str) -> None:
        self._items = [it for it in self._items if it['name'] != name]

    def update_quantity(self, name: str, quantity: int) -> None:
        for item in self._items:
            if item['name'] == name:
                if quantity <= 0:
                    self._items.remove(item)
                else:
                    item['quantity'] = quantity
                return

    def get_subtotal(self) -> float:
        return sum(it['price'] * it['quantity'] for it in self._items)

    def get_discount(self) -> float:
        sub = self.get_subtotal()
        if sub >= 10000:
            return 500
        elif sub >= 5000:
            return 200
        return 0

    def get_total(self) -> float:
        return max(0, self.get_subtotal() - self.get_discount())

    def item_count(self) -> int:
        return len(self._items)

# 评测入口（请勿修改）
def eval_cart(actions: list[dict]) -> dict:
    cart = ShoppingCart()
    for act in actions:
        op = act["op"]
        if op == "add":
            cart.add_item(act["name"], act["price"], act.get("qty", 1))
        elif op == "remove":
            cart.remove_item(act["name"])
        elif op == "update":
            cart.update_quantity(act["name"], act["qty"])
    return {
        "subtotal": cart.get_subtotal(),
        "discount": cart.get_discount(),
        "total": cart.get_total(),
    }
''',
    "python-cache-backend-abstraction": '''from abc import ABC, abstractmethod
import time

class CacheBackend(ABC):
    """统一缓存后端抽象接口"""
    @abstractmethod
    def get(self, key: str): pass

    @abstractmethod
    def set(self, key: str, value, ttl: int = 0) -> None: pass

    @abstractmethod
    def delete(self, key: str) -> bool: pass

    @abstractmethod
    def exists(self, key: str) -> bool: pass

class MemoryCache(CacheBackend):
    """基于本地字典的内存缓存实现"""
    def __init__(self):
        self._store = {}
        self._expiry = {}

    def _is_expired(self, key: str) -> bool:
        if key in self._expiry and time.time() > self._expiry[key]:
            del self._store[key]
            del self._expiry[key]
            return True
        return False

    def get(self, key: str):
        if self._is_expired(key):
            return None
        return self._store.get(key)

    def set(self, key: str, value, ttl: int = 0) -> None:
        self._store[key] = value
        if ttl > 0:
            self._expiry[key] = time.time() + ttl
        elif key in self._expiry:
            del self._expiry[key]

    def delete(self, key: str) -> bool:
        existed = key in self._store
        self._store.pop(key, None)
        self._expiry.pop(key, None)
        return existed

    def exists(self, key: str) -> bool:
        if self._is_expired(key):
            return False
        return key in self._store

class RedisCacheMock(CacheBackend):
    """带 redis: 前缀隔离的模拟 Redis 缓存"""
    def __init__(self):
        self._store = {}
        self._expiry = {}

    def _prefix(self, key: str) -> str:
        return f'redis:{key}'

    def _is_expired(self, key: str) -> bool:
        pk = self._prefix(key)
        if pk in self._expiry and time.time() > self._expiry[pk]:
            del self._store[pk]
            del self._expiry[pk]
            return True
        return False

    def get(self, key: str):
        pk = self._prefix(key)
        if self._is_expired(key):
            return None
        return self._store.get(pk)

    def set(self, key: str, value, ttl: int = 0) -> None:
        pk = self._prefix(key)
        self._store[pk] = value
        if ttl > 0:
            self._expiry[pk] = time.time() + ttl
        elif pk in self._expiry:
            del self._expiry[pk]

    def delete(self, key: str) -> bool:
        pk = self._prefix(key)
        existed = pk in self._store
        self._store.pop(pk, None)
        self._expiry.pop(pk, None)
        return existed

    def exists(self, key: str) -> bool:
        if self._is_expired(key):
            return False
        return self._prefix(key) in self._store

# 评测入口（请勿修改）
def eval_cache(cache_type: str, actions: list[dict]):
    cache = MemoryCache() if cache_type == "memory" else RedisCacheMock()
    last = None
    for act in actions:
        op = act["op"]
        if op == "set":
            cache.set(act["key"], act["value"], act.get("ttl", 0))
        elif op == "get":
            last = cache.get(act["key"])
        elif op == "delete":
            last = cache.delete(act["key"])
        elif op == "exists":
            last = cache.exists(act["key"])
    return last
''',
    "python-log-formatter-polymorphism": '''from abc import ABC, abstractmethod
import json

class LogRecord:
    """结构化日志条目对象"""
    def __init__(self, level: str, message: str, source: str = ''):
        self.level = level
        self.message = message
        self.source = source
        self.timestamp = '2025-01-01 10:00:00'

class LogFormatter(ABC):
    @abstractmethod
    def format(self, record: LogRecord) -> str: pass

class PlainTextFormatter(LogFormatter):
    def format(self, record: LogRecord) -> str:
        src = f' ({record.source})' if record.source else ''
        return f'[{record.level}] {record.message}{src}'

class JsonFormatter(LogFormatter):
    def format(self, record: LogRecord) -> str:
        return json.dumps({
            'level': record.level,
            'message': record.message,
            'source': record.source,
            'timestamp': record.timestamp
        }, ensure_ascii=False, sort_keys=True)

class CompactFormatter(LogFormatter):
    def format(self, record: LogRecord) -> str:
        return f'{record.level}|{record.message}'

def format_log(record: LogRecord, formatter: LogFormatter) -> str:
    # 多态分发至具体格式化器
    return formatter.format(record)

# 评测入口（请勿修改）
def eval_formatter(level: str, message: str, source: str, formatter_type: str) -> str:
    record = LogRecord(level, message, source)
    mapping = {
        "plain": PlainTextFormatter(),
        "json": JsonFormatter(),
        "compact": CompactFormatter(),
    }
    return format_log(record, mapping[formatter_type])
''',
    "python-paginated-iterator": '''class PaginatedIterator:
    """惰性分页迭代器：按 page_size 切片并在耗尽时抛出 StopIteration"""
    def __init__(self, all_data: list, page_size: int):
        self._all_data = all_data
        self._page_size = page_size
        self._index = 0

    def __iter__(self):
        return self

    def __next__(self) -> list:
        if self._index >= len(self._all_data):
            raise StopIteration
        start = self._index
        end = min(start + self._page_size, len(self._all_data))
        page = self._all_data[start:end]
        self._index = end
        return page

# 评测入口（请勿修改）
def eval_paginated(all_data: list, page_size: int) -> list[list]:
    return list(PaginatedIterator(all_data, page_size))
''',
    "python-retry-decorator": '''import time
import functools

def retry(max_attempts: int = 3, delay: float = 0, exceptions: tuple = (Exception,)):
    # 失败自动重试装饰器，仅捕获声明的异常类型
    if max_attempts < 1:
        raise ValueError('max_attempts must be >= 1')

    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            last_exc = None
            for attempt in range(max_attempts):
                try:
                    return func(*args, **kwargs)
                except exceptions as e:
                    last_exc = e
                    if attempt < max_attempts - 1 and delay > 0:
                        time.sleep(delay)
            raise last_exc
        return wrapper
    return decorator

# 评测入口（请勿修改）
def eval_retry(max_attempts: int, fail_times: int) -> str:
    state = {"count": 0}
    @retry(max_attempts=max_attempts, delay=0, exceptions=(ValueError,))
    def task():
        state["count"] += 1
        if state["count"] <= fail_times:
            raise ValueError("transient error")
        return "success"
    return task()
''',
    "python-lambda-expression-sorter": '''def sort_users(users: list[dict], *key_funcs) -> list[dict]:
    # 将多个 lambda 键组合为复合元组排序键
    if not key_funcs:
        return list(users)
    return sorted(users, key=lambda u: tuple(f(u) for f in key_funcs))

# 常用排序 lambda 规则
by_age = lambda u: u['age']
by_score_desc = lambda u: -u['score']
by_name_length = lambda u: len(u['name'])

# 评测入口（请勿修改）
def eval_sort_users(users: list[dict], rule_names: list[str]) -> list[dict]:
    rules_map = {
        "age": by_age,
        "score_desc": by_score_desc,
        "name_length": by_name_length,
    }
    funcs = [rules_map[name] for name in rule_names]
    return sort_users(users, *funcs)
''',
    "py-array-rotate-l2": '''def rotate(nums: list, k: int) -> list:
    # 三次翻转实现 O(n) 原地右旋并返回旋转后数组
    if not nums:
        return nums
    n = len(nums)
    k %= n
    if k == 0:
        return nums
    def rev(l, r):
        while l < r:
            nums[l], nums[r] = nums[r], nums[l]
            l += 1
            r -= 1
    rev(0, n - 1)
    rev(0, k - 1)
    rev(k, n - 1)
    return nums
''',
    "py-stack-calculator-l2": '''class Calculator:
    """利用栈处理加减乘除优先级表达式"""
    @staticmethod
    def calculate(s: str) -> int:
        stack, num, sign = [], 0, "+"
        s = s.replace(" ", "")
        for i, ch in enumerate(s):
            if ch.isdigit():
                num = num * 10 + int(ch)
            if not ch.isdigit() or i == len(s) - 1:
                if sign == "+": stack.append(num)
                elif sign == "-": stack.append(-num)
                elif sign == "*": stack.append(stack.pop() * num)
                elif sign == "/": stack.append(int(stack.pop() / num))
                sign = ch
                num = 0
        return sum(stack)

# 评测入口（请勿修改）
def eval_calculate(s: str) -> int:
    return Calculator.calculate(s)
''',
    "py-bank-account-l2": '''class BankAccount:
    """银行账户：支持存款、取款校验与转账"""
    def __init__(self, owner, balance=0):
        self.owner = owner
        self._balance = max(0, balance)
        self._txns = []
    def deposit(self, amount):
        if amount <= 0: raise ValueError("positive only")
        self._balance += amount
        self._txns.append(f"DEPOSIT +{amount}")
    def withdraw(self, amount):
        if amount <= 0: raise ValueError("positive only")
        if amount > self._balance: raise ValueError("insufficient")
        self._balance -= amount
        self._txns.append(f"WITHDRAW -{amount}")
    def transfer(self, amount, target):
        self.withdraw(amount)
        target.deposit(amount)
    def get_balance(self):
        return self._balance

# 评测入口（请勿修改）
def eval_bank(owner: str, initial: float, actions: list[dict]) -> float:
    acc = BankAccount(owner, initial)
    for act in actions:
        op = act["op"]
        if op == "deposit":
            acc.deposit(act["amount"])
        elif op == "withdraw":
            acc.withdraw(act["amount"])
        elif op == "transfer":
            acc.transfer(act["amount"], BankAccount(act["target"], 0))
    return acc.get_balance()
''',
    "py-shape-area-l2": '''from abc import ABC, abstractmethod
import math

class Shape(ABC):
    @abstractmethod
    def area(self): pass

class Circle(Shape):
    def __init__(self, r): self.r = r
    def area(self): return round(math.pi * self.r**2, 2)

class Rectangle(Shape):
    def __init__(self, w, h): self.w, self.h = w, h
    def area(self): return self.w * self.h

class Triangle(Shape):
    def __init__(self, b, h): self.b, self.h = b, h
    def area(self): return 0.5 * self.b * self.h

# 评测入口（请勿修改）
def eval_shape(shape: str, args: list) -> float:
    cls = {"circle": Circle, "rectangle": Rectangle, "triangle": Triangle}[shape]
    return cls(*args).area()
''',
    "py-logger-polymorphism-l2": '''from abc import ABC, abstractmethod

class Logger(ABC):
    @abstractmethod
    def log(self, level, message): pass

class FileLogger(Logger):
    def __init__(self): self.lines = []
    def log(self, level, message): self.lines.append(f"[{level}] {message}")

class ConsoleLogger(Logger):
    def __init__(self): self.output = []
    def log(self, level, message): self.output.append(f"[CONSOLE][{level}] {message}")

def write_logs(logger: Logger, logs: list):
    # 多态遍历日志二元组列表并写入对应记录器
    for level, msg in logs:
        logger.log(level, msg)

# 评测入口（请勿修改）
def eval_logger(logger_type: str, logs: list) -> list[str]:
    logger = FileLogger() if logger_type == "file" else ConsoleLogger()
    write_logs(logger, logs)
    return logger.lines if logger_type == "file" else logger.output
''',
    "py-range-iterator-l2": '''class RangeIterator:
    """支持 1~3 个参数与负步长的自定义整数范围迭代器"""
    def __init__(self, *args):
        if len(args) == 1: self.s, self.st, self.step = 0, args[0], 1
        elif len(args) == 2: self.s, self.st, self.step = args[0], args[1], 1
        else: self.s, self.st, self.step = args[0], args[1], args[2]
        self.c = self.s
    def __iter__(self): return self
    def __next__(self):
        if (self.step > 0 and self.c >= self.st) or (self.step < 0 and self.c <= self.st):
            raise StopIteration
        v = self.c
        self.c += self.step
        return v

# 评测入口（请勿修改）
def eval_range(args: list[int]) -> list[int]:
    return list(RangeIterator(*args))
''',
    "py-fib-generator-l2": '''def fibonacci():
    # 无限斐波那契数列生成器
    a, b = 0, 1
    while True:
        yield a
        a, b = b, a + b

def first_n(g, n):
    # 从生成器中拉取前 n 项
    return [next(g) for _ in range(n)]

# 评测入口（请勿修改）
def eval_fib(n: int) -> list[int]:
    return first_n(fibonacci(), n)
''',
    "py-timing-decorator-l2": '''import time, functools

def timer(unit="s"):
    # 支持秒(s)或毫秒(ms)单位的函数执行耗时统计装饰器
    def deco(func):
        @functools.wraps(func)
        def wrapper(*a, **kw):
            start = time.perf_counter()
            r = func(*a, **kw)
            t = time.perf_counter() - start
            u = "ms" if unit == "ms" else "s"
            d = t * 1000 if unit == "ms" else t
            print(f"{func.__name__} 耗时: {d:.3f}{u}")
            return r
        return wrapper
    return deco

# 评测入口（请勿修改）
def eval_timer(unit: str, a: int, b: int) -> int:
    @timer(unit=unit)
    def multiply(x, y):
        return x * y
    return multiply(a, b)
''',
    "py-sort-lambda-l2": '''def sort_words(words, key_func):
    # 使用传入的排序键函数返回新的有序单词列表
    return sorted(words, key=key_func)

# 定义三种常用的 lambda 排序规则
by_length = lambda w: len(w)
by_last_char = lambda w: w[-1] if w else ""
by_count_a = lambda w: w.count("a")

# 评测入口（请勿修改）
def eval_sort_words(words: list[str], key_name: str) -> list[str]:
    mapping = {
        "length": by_length,
        "last_char": by_last_char,
        "count_a": by_count_a,
    }
    return sort_words(words, mapping[key_name])
''',
}


COMMENTS = {
    # Stage 01
    "computer-architecture-pipeline-stall-profiler": (
        "按指令类型汇总基础 CPI 与停顿周期，计算总耗时(ms)并定位最大停顿瓶颈。",
        {"profile_pipeline_workload": "遍历各类指令统计周期总开销与最大停顿贡献项"},
    ),
    "operating-system-lru-cache-pressure-simulator": (
        "用列表尾部表示最近使用、头部表示最久未用，模拟页面置换并统计命中率。",
        {"simulate_page_cache": "按页请求序列执行 LRU 命中提升与满容量头部淘汰"},
    ),
    "network-longest-prefix-match-engine": (
        "将 IPv4 地址转为 32 位整数掩码按位与匹配，选取前缀长度最大的路由下一跳。",
        {"ip_to_int": "将点分十进制 IP 转为无符号 32 位整数", "lookup_route": "遍历路由表按前缀长度优先规则匹配下一跳"},
    ),
    "encoding-system-log-charset-detector": (
        "安全解码字节日志：区分正常 UTF-8、含替换字符的可疑乱码与解码失败。",
        {"decode_log_payload": "先兼容十六进制输入再按 UTF-8 解码并检测 U+FFFD"},
    ),
    "linux-command-safe-batch-runner": (
        "构造参数列表并在标志后追加 `--`，防止以连字符开头的危险文件名被误解析为选项。",
        {"build_grep_args": "校验非空参数后返回带 `--` 选项分隔符的参数列表"},
    ),
    "linux-filesystem-inode-capacity-planner": (
        "同时核算文件数(inode)与向上取整的数据块(block)消耗，识别率先耗尽的资源瓶颈。",
        {"plan_small_file_storage": "分别计算所需 inode 与 block 并判定容量与瓶颈"},
    ),
    "linux-permission-policy-auditor": (
        "将三位八进制权限按位拆解，结合文件类型检测组/其他写权限与不当可执行位。",
        {"audit_permission": "解析 rwx 比特位并依据 config/script 类型输出风险标签"},
    ),
    "linux-process-zombie-detector": (
        "统计僵尸进程(state=='Z')数量与占比，满足任一阈值即触发运维告警。",
        {"detect_process_anomaly": "汇总僵尸态数量、占比及是否超出阈值的布尔标志"},
    ),
    "shell-script-pipeline-failure-guard": (
        "模拟 bash pipefail 行为：关闭时仅看末命令退出码，开启时从右向左返回首个非零码。",
        {"evaluate_pipeline": "依据 pipefail 开关从管道退出码列表中提取最终状态码"},
    ),
    "git-init-clone-repo-health-checker": (
        "检查仓库元数据关键字段(.git 目录、远端 origin、默认分支与游离头状态)是否就绪。",
        {"check_repo_ready": "逐项校验仓库就绪条件并收集缺失问题列表"},
    ),
    "git-add-commit-push-change-batch-planner": (
        "根据路径后缀与目录规则把改动文件自动归类至代码、测试、文档、配置四个提交批次。",
        {"plan_commit_batches": "遍历文件路径按规则分桶，生成逻辑清晰的提交批次"},
    ),
    "git-branch-merge-conflict-risk-estimator": (
        "检测两分支在同文件上的行号闭区间是否相交，估算合并冲突风险与涉及文件。",
        {"estimate_merge_conflicts": "双层遍历比对同文件修改区间重叠情况"},
    ),
    "git-rebase-commit-history-rewriter": (
        "将特性分支提交依次追加到目标基线分支之后并生成新的变基提交标识。",
        {"simulate_rebase": "复制基线提交并在末尾按顺序重放特性提交"},
    ),
    "git-conflict-resolution-marker-parser": (
        "状态机解析 Git 冲突标记段(`<<<<<<<` / `=======` / `>>>>>>>`)，提取双边代码块。",
        {"parse_conflict_blocks": "逐行扫描冲突起止标记并收集每处冲突的 ours 与 theirs 内容"},
    ),
    "cpu-cache-simulator-l2": (
        "将内存地址整除块大小映射为缓存行号，按 FIFO 策略统计缓存命中次数与命中率。",
        {"simulate_cache": "维护固定容量缓存行队列模拟访问命中与队首淘汰", "cache_hit_rate": "计算命中率并保留四位小数"},
    ),
    "os-memory-allocator-l2": (
        "实现连续内存分配的首次适应(First Fit)与最小剩余块最佳适应(Best Fit)策略。",
        {"first_fit": "返回首个满足所需大小的空闲分区切片信息", "best_fit": "筛选满足大小且碎片最小的空闲分区"},
    ),
    "network-subnet-calculator-l2": (
        "计算划分目标子网数所需借用的主机比特位、新前缀长度及每个子网可用主机数。",
        {"subnet_calc": "按 2^k >= num_subnets 求借位数并换算可用主机数 2^(32-p)-2"},
    ),
    "encoding-base64-tool-l2": (
        "使用标准库 base64 模块实现 UTF-8 文本与 Base64 编码字符串之间的安全双向转换。",
        {"encode_base64": "支持字节与字符串输入的 Base64 编码", "decode_base64": "解码 Base64 并采用容错 UTF-8 还原文本"},
    ),
    "linux-find-grep-tool-l2": (
        "结合 fnmatch 通配符匹配文件名与子串过滤文件内容，模拟 find+grep 联合检索。",
        {"search_by_name": "使用 shell 通配符筛选文件名", "search_by_content": "扫描文件内容字典并提取命中文件名"},
    ),
    "linux-disk-quota-analyzer-l2": (
        "对比用户已用空间与硬/软配额阈值，输出 blocked、warning 或 ok 限额状态。",
        {"check_quota": "优先判断是否触达硬限制，其次判断软限制并返回状态详情"},
    ),
    "linux-sudo-auditor-l2": (
        "审查 sudoers 规则列表，识别 ALL=(ALL) 全权限授予与 NOPASSWD 免密高危配置。",
        {"audit_sudoers": "遍历授权条目并标记全权限或免密风险字符串"},
    ),
    "linux-process-priority-l2": (
        "依据 Linux CFS 调度器的 nice 权重指数衰减公式计算虚拟运行时间并择小调度。",
        {"calculate_vruntime": "按 nice 值换算权重并得出虚拟运行时间", "schedule_next": "选取当前 vruntime 最小的进程 PID"},
    ),
    "shell-log-rotate-l2": (
        "按文件体积上限执行压缩归档并清零体积，对超时陈旧日志标记删除以模拟 logrotate。",
        {"simulate_logrotate": "遍历日志列表根据 max_size_mb 与 max_age_days 生成轮转操作"},
    ),
    "git-branch-cleaner-l2": (
        "结合已合并分支清单与受保护默认分支，区分可安全删除分支与待人工确认分支。",
        {"cleanup_branches": "将非默认分支按是否已合并划分至 safe_to_delete 与 needs_review"},
    ),
    "git-commit-squasher-l2": (
        "模拟交互式 squash，将最前端连续提交消息合并为单条提交以保留目标提交总数。",
        {"simulate_squash": "将头部多余提交并入首条记录并保留末尾 target_count-1 条提交"},
    ),
    "git-conflict-auto-resolver-l2": (
        "对比基线版本与双分支修改集合，分离可自动合入的非重叠变更与实质内容冲突。",
        {"auto_merge": "提取相对 base 的真实改动行并计算冲突数与自动合并数"},
    ),
    "git-rebase-detector-l2": (
        "逐对检查特性分支与目标分支的文件行区间重叠次数，低于阈值建议 rebase 否则建议 merge。",
        {"predict_rebase_conflicts": "统计重叠改动区块数并生成合并策略建议"},
    ),
    "git-conflict-resolution-strategies-l2": (
        "基于团队协作模式（长期分支/实验分支/多人协同/快进）映射最优 Git 合并策略。",
        {"recommend_strategy": "查表返回与场景匹配的 Git 合并参数及说明"},
    ),

    # Stage 02
    "python-typed-config-value-parser": (
        "将配置字符串安全解析为 int/float/bool/str/list[int] 类型，非法字面量抛出 ValueError。",
        {"parse_config_value": "按目标类型分发转换逻辑，严格校验布尔与列表格式"},
    ),
    "python-log-level-filter": (
        "按日志严重等级权重过滤掉低于最低阈值的日志，并按时间戳升序输出。",
        {"filter_logs": "校验等级名称合法性、过滤并按时间戳排序日志列表"},
    ),
    "python-batch-task-scheduler": (
        "按固定批大小切分任务并逐个捕获异常，同时在批次之间保留可配置等待间隔。",
        {"execute_task": "执行单任务并对负数载荷模拟抛出 ValueError", "run_batches": "分批执行任务、收集成功/失败状态并在批间睡眠"},
    ),
    "python-memoize-decorator": (
        "利用闭包字典与访问顺序列表实现容量受限的 LRU 函数结果缓存装饰器。",
        {"memoize_n": "构建缓存装饰器维护最近 max_size 次调用键与命中统计", "eval_memoize": "评测辅助入口：对测试调用序列返回缓存统计结果"},
    ),
    "python-sliding-window-stats": (
        "以固定长度窗口在数值序列上右移切片，逐窗口输出均值、最大值与最小值。",
        {"sliding_window_stats": "校验窗口尺寸并切片计算每个窗口的三项统计量"},
    ),
    "python-multi-field-sorter": (
        "从次高优先级到最高优先级逆序稳定排序，并始终将字段缺失记录置于末尾。",
        {"multi_field_sort": "对每条排序规则拆出非空记录与缺失记录后再按升降序重排"},
    ),
    "python-deep-dict-merger": (
        "递归深合并两个嵌套字典：子字典继续向下合并，标量按 overwrite/ignore/merge 策略处理。",
        {"deep_merge": "克隆基础字典并按冲突策略递归合并覆盖键值"},
    ),
    "python-permission-intersection-analyzer": (
        "汇总用户多角色对应的权限集合并判断 delete 权限，同时识别从未被分配的权限项。",
        {"analyze_permissions": "聚合各用户角色权限与全局权限总集，计算差集得到未使用权限"},
    ),
    "python-log-word-frequency": (
        "忽略大小写统计每个关键词在日志行中的匹配次数，并按频次降序（同频保持原序）排列。",
        {"count_keywords": "遍历日志行累加关键词匹配行频次并稳定排序"},
    ),
    "python-json-data-pipeline": (
        "完成下划线命名到小驼峰的键名标准化，同时清洗布尔/数字字符串并剔除 null 值字段。",
        {"snake_to_camel": "将下划线风格字段名转为小驼峰", "clean_json_record": "遍历字典递归清洗键值类型并过滤空值"},
    ),
    "python-csv-group-aggregator": (
        "按指定分组字段聚合记录并支持 sum/avg/count/max/min 五种聚合算子，结果降序排列。",
        {"group_aggregate": "分桶收集数值后按聚合函数计算指标并按结果降序排列"},
    ),
    "python-connection-pool-simulator": (
        "利用空闲队列与占用集合模拟连接池的获取、归还、超时等待及关闭状态隔离。",
        {"ConnectionPool": "管理空闲与活跃连接 ID 集合并提供超时等待获取逻辑", "eval_pool": "评测辅助入口：按操作序列驱使连接池收集返回值与异常状态"},
    ),
    "python-shopping-cart": (
        "维护购物车商品列表的增删改数量逻辑，并实现满 5000 减 200 / 满 10000 减 500 的阶梯折扣。",
        {"ShoppingCart": "封装商品行维护、原价小计与阶梯满减计算方法", "eval_cart": "评测辅助入口：执行加减改操作后返回账单汇总字典"},
    ),
    "python-cache-backend-abstraction": (
        "通过 ABC 抽象基类约束统一缓存接口，分别实现本地内存缓存与带前缀隔离的模拟 Redis 缓存。",
        {"CacheBackend": "声明 get/set/delete/exists 抽象方法契约", "MemoryCache": "内存字典与 TTL 过期时间戳维护", "RedisCacheMock": "自动添加 redis: 前缀的后端实现", "eval_cache": "评测辅助入口：按操作脚本验证两种后端行为"},
    ),
    "python-log-formatter-polymorphism": (
        "利用抽象基类与统一调度函数 format_log 实现纯文本、JSON 与紧凑三种日志格式的多态扩展。",
        {"LogRecord": "封装日志级别、正文、来源与固定时间戳", "LogFormatter": "日志格式化抽象基类", "PlainTextFormatter": "纯文本格式器", "JsonFormatter": "结构化 JSON 格式器", "CompactFormatter": "竖线分隔紧凑格式器", "format_log": "统一通过多态接口调用具体格式器", "eval_formatter": "评测辅助入口：根据 formatter_type 构造格式化器并输出文本"},
    ),
    "python-paginated-iterator": (
        "实现 __iter__ 与 __next__ 迭代器协议，每次按页大小切分列表直到越界抛出 StopIteration。",
        {"PaginatedIterator": "维护游标 _index 逐页截取数据", "eval_paginated": "评测辅助入口：收集分页迭代器的所有页数据"},
    ),
    "python-log-parser-generator": (
        "使用内部生成器按竖线拆分日志行，自动跳过空行、注释行与字段不全的畸形日志。",
        {"parse_log_lines": "生成器过滤无效行并拆出四字段日志字典列表"},
    ),
    "python-retry-decorator": (
        "捕获指定异常类型进行有限次重试，并可选等待延迟后在最终失败时重抛末次异常。",
        {"retry": "构建异常过滤与重试循环装饰器", "eval_retry": "评测辅助入口：模拟前 fail_times 次抛错并在恢复时返回 success"},
    ),
    "python-lambda-expression-sorter": (
        "支持任意个 lambda 提取函数组合多维排序键，实现年龄、降序分数与姓名长度组合排序。",
        {"sort_users": "将多个键函数组合为排序元组并返回新列表", "eval_sort_users": "评测辅助入口：将规则名映射为预设 lambda 并执行排序"},
    ),
    "py-valid-parentheses-l2": (
        "经典括号栈匹配：遇左括号入栈，遇右括号检查栈顶是否为对应开括号。",
        {"is_valid": "用栈校验圆括号、方括号与花括号的嵌套配对完整性"},
    ),
    "py-fizzbuzz-l2": (
        "按 1..n 顺序检查能否被 15、3、5 整除并生成相应字符串序列。",
        {"fizzbuzz": "优先判断 15 的倍数以免被单一整除分支掩盖"},
    ),
    "py-two-sum-l2": (
        "利用哈希表在单遍扫描中记录已遍历数值索引，快速查找与当前数互补的目标索引。",
        {"two_sum": "O(n) 时间一遍哈希查找两数之和下标对"},
    ),
    "py-palindrome-checker-l2": (
        "清洗掉非字母数字字符并统一小写后对比正序与反转切片是否完全相等。",
        {"is_palindrome": "过滤符号大小写归一化并检测回文对称性"},
    ),
    "py-array-rotate-l2": (
        "利用三次局部反转（整体反转+前k反转+后n-k反转）实现 O(1) 额外空间的原地数组右旋。",
        {"rotate": "对 k 取模后分三段反转数组并原地返回"},
    ),
    "py-merge-intervals-l2": (
        "按区间起点升序排序后线性扫描，若当前区间起点不大于末尾区间终点则合并扩展右边界。",
        {"merge_intervals": "先排序后贪心合并重叠或相邻区间"},
    ),
    "py-word-count-l2": (
        "使用正则提取纯单词词频统计后按频次降序、字典序升序选出 Top-K 单词元组。",
        {"top_k_frequent": "统计词频哈希表并通过复合排序键提取前 k 高频词"},
    ),
    "py-set-operations-l2": (
        "利用 Python 集合交集(`&`)与差集(`-`)运算符求有序去重交集与仅在首数组中出现的元素。",
        {"set_operations": "将列表转为集合并返回排序后的 intersection 与 difference"},
    ),
    "py-file-finder-l2": (
        "忽略大小写同时检索文件路径与内容中的关键词，返回全部命中路径。",
        {"find_files": "列表推导按大小写无关子串过滤符合条件的文件路径"},
    ),
    "py-json-flattener-l2": (
        "递归展开嵌套字典与列表，使用点号 `.` 拼接层级键名与数组下标扁平化输出。",
        {"flatten_json": "递归处理 dict 与 list 节点生成单层点分键值字典"},
    ),
    "py-csv-parser-l2": (
        "逐字符状态机追踪双引号包围状态，确保引号内的逗号不会被错误切分为新列。",
        {"parse_csv": "解析首行表头后按引号状态机切分每行字段组装字典列表"},
    ),
    "py-stack-calculator-l2": (
        "单栈实现四则运算表达式求值：乘除法立即与栈顶归并，加减法连带符号入栈最终求和。",
        {"Calculator": "用单栈处理运算符优先级，除法向零取整", "eval_calculate": "评测辅助入口：调用静态方法计算字符串算式结果"},
    ),
    "py-bank-account-l2": (
        "实现账户存/取/转账额度合法性检验并记录流水，确保余额不为负。",
        {"BankAccount": "封装账户余额保护与账户间转账逻辑", "eval_bank": "评测辅助入口：重放存取转动作并返回最终账户余额"},
    ),
    "py-shape-area-l2": (
        "基于抽象基类 Shape 统一面积接口，分别为圆、矩形与三角形实现多态 area 计算。",
        {"Shape": "几何图形抽象基类", "Circle": "按 πr^2 保留两位小数算圆面积", "Rectangle": "按宽乘高算矩形面积", "Triangle": "按底乘高除以 2 算三角形面积", "eval_shape": "评测辅助入口：按图形名实例化并求面积"},
    ),
    "py-logger-polymorphism-l2": (
        "面向抽象 Logger 接口编程，使业务写入函数 write_logs 无需关心文件与控制台实现差异。",
        {"Logger": "日志抽象基类", "FileLogger": "将日志行追加写入 lines 列表", "ConsoleLogger": "生成带 [CONSOLE] 前缀的输出列表", "write_logs": "多态接收日志列表并写入指定记录器", "eval_logger": "评测辅助入口：返回日志器收到的输出列表"},
    ),
    "py-range-iterator-l2": (
        "兼容 1/2/3 参数签名的自定义步长整数范围迭代器，并支持负步长倒序终止判断。",
        {"RangeIterator": "解析 start/stop/step 并在越界时触发 StopIteration", "eval_range": "评测辅助入口：将迭代器转为列表返回完整序列"},
    ),
    "py-fib-generator-l2": (
        "用 yield 构建无限惰性斐波那契数列生成器，并按需拉取前 n 项。",
        {"fibonacci": "持续递推生成 a, b 无限斐波那契项", "first_n": "借助 next() 从生成器提取指定个数元素", "eval_fib": "评测辅助入口：生成前 n 项斐波那契数列列表"},
    ),
    "py-timing-decorator-l2": (
        "外层带 unit 参数的三层装饰器，利用 perf_counter 记录高精度函数运行耗时并透传返回值。",
        {"timer": "按秒或毫秒格式化打印被装饰函数运行耗时", "eval_timer": "评测辅助入口：验证被计时函数返回值不受包装影响"},
    ),
    "py-sort-lambda-l2": (
        "通过高阶函数接收不同 lambda 排序策略，实现按长度、末字符或字母 'a' 次数排序。",
        {"sort_words": "使用 key_func 排序单词列表", "eval_sort_words": "评测辅助入口：将键名称映射到 lambda 规则完成排序"},
    ),
}


# Fix CSV parser unescape + valid cases for stage-01 & stage-02
SOLUTION_OVERRIDES["py-csv-parser-l2"] = '''def parse_csv(text: str) -> list:
    # 将转义换行字面量归一化为真实换行，按行切分并处理空文本
    if "\\n" not in text and "\\\\n" in text:
        text = text.replace("\\\\n", "\\n")
    lines = [ln for ln in text.strip().split("\\n") if ln]
    if len(lines) <= 1:
        return []
    headers = [h.strip() for h in lines[0].split(",")]
    result = []
    # 逐字符状态机切分 CSV 字段，避免双引号内部逗号误拆列
    for line in lines[1:]:
        row, field, in_q = [], "", False
        for ch in line:
            if ch == '"':
                in_q = not in_q
            elif ch == "," and not in_q:
                row.append(field)
                field = ""
            else:
                field += ch
        row.append(field)
        result.append({headers[i]: row[i] for i in range(len(headers))})
    return result
'''


# Exact public testCases overrides (only where broken or <2 cases)
PUBLIC_CASE_OVERRIDES = {
    "encoding-system-log-charset-detector": [
        case("valid utf8", "decode_log_payload", ["68656c6c6f"], {"status": "OK", "text": "hello"}),
        case("invalid utf8", "decode_log_payload", ["fffe6869"], {"status": "INVALID_UTF8", "text": ""}),
    ],
    "cpu-cache-simulator-l2": [
        case("sequential misses and hits", "simulate_cache", [[0, 4, 8, 12, 16, 20, 24, 28], 4, 8], 4),
        case("hit rate calculation", "cache_hit_rate", [4, 8], 0.5),
    ],
    "os-memory-allocator-l2": [
        case("first fit basic", "first_fit", [[[0, 100], [200, 300], [400, 600]], 50], [0, 0, 50]),
        case("best fit tightest block", "best_fit", [[[0, 100], [200, 260], [400, 600]], 50], [1, 200, 250]),
    ],
    "network-subnet-calculator-l2": [
        case("/24 to 8 subnets", "subnet_calc", ["192.168.0.0/24", 8], {"new_prefix": 27, "subnets": 8, "hosts_per_subnet": 30, "bits_borrowed": 3}),
        case("/24 to 4 subnets", "subnet_calc", ["10.0.0.0/24", 4], {"new_prefix": 26, "subnets": 4, "hosts_per_subnet": 62, "bits_borrowed": 2}),
    ],
    "encoding-base64-tool-l2": [
        case("encode hello", "encode_base64", ["Hello"], "SGVsbG8="),
        case("decode hello", "decode_base64", ["SGVsbG8="], "Hello"),
    ],
    "linux-find-grep-tool-l2": [
        case("glob matching", "search_by_name", [["readme.md", "main.py", "test.py", "notes.txt"], "*.md"], ["readme.md"]),
        case("content search", "search_by_content", [[{"name": "a.py", "content": "def foo(): pass"}, {"name": "b.py", "content": "print(1)"}], "def"], ["a.py"]),
    ],
    "linux-disk-quota-analyzer-l2": [
        case("over soft limit", "check_quota", [85, 80, 100], {"status": "warning", "usage": 85, "limit": 80}),
        case("over hard limit", "check_quota", [105, 80, 100], {"status": "blocked", "usage": 105, "limit": 100}),
    ],
    "linux-sudo-auditor-l2": [
        case("detect full access", "audit_sudoers", [[{"user": "alice", "commands": "ALL", "target": "ALL", "nopasswd": False}, {"user": "bob", "commands": "/usr/bin/ls", "target": "ALL", "nopasswd": True}]], ["alice - FULL ACCESS", "bob - NOPASSWD"]),
        case("clean sudoers list", "audit_sudoers", [[{"user": "ops", "commands": "/bin/systemctl", "target": "root", "nopasswd": False}]], []),
    ],
    "linux-process-priority-l2": [
        case("lower nice = higher priority", "schedule_next", [[{"pid": 1, "runtime": 10, "nice": 0}, {"pid": 2, "runtime": 10, "nice": 5}]], 1),
        case("explicit vruntime selects lowest", "schedule_next", [[{"pid": 7, "vruntime": 25}, {"pid": 3, "vruntime": 12}]], 3),
    ],
    "shell-log-rotate-l2": [
        case("rotate large file and delete old", "simulate_logrotate", [[{"name": "app.log", "size_mb": 150, "age_days": 1}, {"name": "debug.log", "size_mb": 5, "age_days": 30}], 7, 100], [{"original": "app.log", "rotated": "app.log.1.gz", "compressed_size": 30}, {"original": "debug.log", "action": "deleted"}]),
        case("within limits no action", "simulate_logrotate", [[{"name": "sys.log", "size_mb": 20, "age_days": 2}], 7, 100], []),
    ],
    "git-branch-cleaner-l2": [
        case("safe branches", "cleanup_branches", [["main", "feature-old", "feature-wip"], ["feature-old"], "main"], {"safe_to_delete": ["feature-old"], "needs_review": ["feature-wip"]}),
        case("protect default even if merged", "cleanup_branches", [["main", "dev"], ["main", "dev"], "main"], {"safe_to_delete": ["dev"], "needs_review": []}),
    ],
    "git-commit-squasher-l2": [
        case("squash 3 to 2", "simulate_squash", [[{"id": "a", "message": "WIP 1"}, {"id": "b", "message": "WIP 2"}, {"id": "c", "message": "final"}], 2], [{"id": "a", "message": "WIP 1; WIP 2"}, {"id": "c", "message": "final"}]),
        case("already within target", "simulate_squash", [[{"id": "a", "message": "init"}], 2], [{"id": "a", "message": "init"}]),
    ],
    "git-conflict-auto-resolver-l2": [
        case("no conflict", "auto_merge", [{"10": "a"}, {"10": "a", "15": "new"}, {"10": "a", "20": "new2"}], {"conflicts": 0, "auto_merged": 2, "status": "clean"}),
        case("same line conflict", "auto_merge", [{"5": "old"}, {"5": "v1"}, {"5": "v2"}], {"conflicts": 1, "auto_merged": 0, "status": "conflict"}),
    ],
    "git-rebase-detector-l2": [
        case("low conflict", "predict_rebase_conflicts", [[{"file": "a.py", "start": 1, "end": 5}], [{"file": "a.py", "start": 10, "end": 15}]], {"total_conflicts": 0, "recommendation": "rebase ok"}),
        case("high conflict recommends merge", "predict_rebase_conflicts", [[{"file": "a.py", "start": 1, "end": 10}, {"file": "b.py", "start": 1, "end": 5}, {"file": "c.py", "start": 2, "end": 8}], [{"file": "a.py", "start": 5, "end": 12}, {"file": "b.py", "start": 3, "end": 7}, {"file": "c.py", "start": 4, "end": 6}]], {"total_conflicts": 3, "recommendation": "merge instead"}),
    ],
    "git-conflict-resolution-strategies-l2": [
        case("collaborative project", "recommend_strategy", ["feature", "main", "collaborative"], "merge --no-ff (保留分支痕迹)"),
        case("experimental branch", "recommend_strategy", ["exp", "main", "experimental"], "rebase (保持历史线性)"),
    ],
    # Stage 02 fixes / additions
    "python-memoize-decorator": [
        case("second call returns cached", "eval_memoize", [3, [[2, 3], [2, 3]]], [{"result": 5, "cached": False}, {"result": 5, "cached": True}]),
        case("evicts oldest when full", "eval_memoize", [2, [[1, 0], [2, 0], [3, 0], [1, 0]]], [{"result": 1, "cached": False}, {"result": 2, "cached": False}, {"result": 3, "cached": False}, {"result": 1, "cached": False}]),
    ],
    "python-permission-intersection-analyzer": [
        case("basic analysis", "analyze_permissions", [{"admin": ["read", "write", "delete"], "viewer": ["read"]}, {"alice": ["admin"], "bob": ["viewer"]}], {"users": {"alice": {"permissions": ["delete", "read", "write"], "can_delete": True}, "bob": {"permissions": ["read"], "can_delete": False}}, "unused_permissions": []}),
        case("unknown role ignored", "analyze_permissions", [{"user": ["read"], "auditor": ["audit"]}, {"alice": ["user", "superadmin"]}], {"users": {"alice": {"permissions": ["read"], "can_delete": False}}, "unused_permissions": ["audit"]}),
    ],
    "python-connection-pool-simulator": [
        case("acquire and release", "eval_pool", [3, [{"op": "acquire"}, {"op": "release", "conn": 1}, {"op": "acquire"}]], [1, None, 1]),
        case("timeout when empty", "eval_pool", [1, [{"op": "acquire"}, {"op": "acquire", "timeout": 0}]], [1, "timeout_error"]),
    ],
    "python-shopping-cart": [
        case("discount >= 10000", "eval_cart", [[{"op": "add", "name": "iPhone", "price": 5999, "qty": 2}]], {"subtotal": 11998, "discount": 500, "total": 11498}),
        case("accumulate same item", "eval_cart", [[{"op": "add", "name": "Book", "price": 30, "qty": 1}, {"op": "add", "name": "Book", "price": 30, "qty": 2}]], {"subtotal": 90, "discount": 0, "total": 90}),
    ],
    "python-cache-backend-abstraction": [
        case("memory cache set/get", "eval_cache", ["memory", [{"op": "set", "key": "name", "value": "hello"}, {"op": "get", "key": "name"}]], "hello"),
        case("redis mock set/get", "eval_cache", ["redis", [{"op": "set", "key": "x", "value": 1}, {"op": "get", "key": "x"}]], 1),
    ],
    "python-log-formatter-polymorphism": [
        case("plain text formatter", "eval_formatter", ["INFO", "server started", "main.py", "plain"], "[INFO] server started (main.py)"),
        case("compact formatter", "eval_formatter", ["ERROR", "crash", "", "compact"], "ERROR|crash"),
    ],
    "python-paginated-iterator": [
        case("iterate pages", "eval_paginated", [[1, 2, 3, 4, 5], 2], [[1, 2], [3, 4], [5]]),
        case("empty data", "eval_paginated", [[], 10], []),
    ],
    "python-retry-decorator": [
        case("succeeds on first try", "eval_retry", [3, 0], "success"),
        case("retries until success", "eval_retry", [3, 2], "success"),
    ],
    "python-lambda-expression-sorter": [
        case("sort by age", "eval_sort_users", [[{"name": "Alice", "age": 30, "score": 85}, {"name": "Bob", "age": 25, "score": 90}], ["age"]], [{"name": "Bob", "age": 25, "score": 90}, {"name": "Alice", "age": 30, "score": 85}]),
        case("sort by score desc", "eval_sort_users", [[{"name": "Alice", "age": 30, "score": 85}, {"name": "Bob", "age": 25, "score": 90}], ["score_desc"]], [{"name": "Bob", "age": 25, "score": 90}, {"name": "Alice", "age": 30, "score": 85}]),
    ],
    "py-word-count-l2": [
        case("top 2", "top_k_frequent", ["i love coding and i love python", 2], [["i", 2], ["love", 2]]),
        case("tie breaks alphabetically", "top_k_frequent", ["banana apple apple banana cherry", 2], [["apple", 2], ["banana", 2]]),
    ],
    "py-set-operations-l2": [
        case("basic", "set_operations", [[1, 2, 2, 1], [2, 2]], {"intersection": [2], "difference": [1]}),
        case("disjoint sets", "set_operations", [[3, 1], [2, 4]], {"intersection": [], "difference": [1, 3]}),
    ],
    "py-json-flattener-l2": [
        case("nested", "flatten_json", [{"a": 1, "b": {"c": 2, "d": [3, 4]}}], {"a": 1, "b.c": 2, "b.d.0": 3, "b.d.1": 4}),
        case("empty object", "flatten_json", [{}], {}),
    ],
    "py-csv-parser-l2": [
        case("simple", "parse_csv", ["name,age\nAlice,30\nBob,25"], [{"name": "Alice", "age": "30"}, {"name": "Bob", "age": "25"}]),
        case("quoted comma field", "parse_csv", ['name,note\nAlice,"hello, world"'], [{"name": "Alice", "note": "hello, world"}]),
    ],
    "py-stack-calculator-l2": [
        case("basic precedence", "eval_calculate", ["3+2*2"], 7),
        case("with spaces and div", "eval_calculate", [" 3+5 / 2 "], 5),
    ],
    "py-bank-account-l2": [
        case("withdraw", "eval_bank", ["Alice", 1000, [{"op": "withdraw", "amount": 100}]], 900),
        case("transfer", "eval_bank", ["Alice", 500, [{"op": "transfer", "amount": 200, "target": "Bob"}]], 300),
    ],
    "py-shape-area-l2": [
        case("circle area", "eval_shape", ["circle", [5]], 78.54),
        case("rectangle area", "eval_shape", ["rectangle", [3, 4]], 12),
    ],
    "py-logger-polymorphism-l2": [
        case("file logger", "eval_logger", ["file", [["ERROR", "disk full"], ["INFO", "started"]]], ["[ERROR] disk full", "[INFO] started"]),
        case("console logger", "eval_logger", ["console", [["WARN", "low mem"]]], ["[CONSOLE][WARN] low mem"]),
    ],
    "py-range-iterator-l2": [
        case("single arg", "eval_range", [[5]], [0, 1, 2, 3, 4]),
        case("with step", "eval_range", [[2, 8, 2]], [2, 4, 6]),
        case("negative step", "eval_range", [[5, 0, -1]], [5, 4, 3, 2, 1]),
    ],
    "py-fib-generator-l2": [
        case("first 6", "eval_fib", [6], [0, 1, 1, 2, 3, 5]),
        case("first 1", "eval_fib", [1], [0]),
    ],
    "py-timing-decorator-l2": [
        case("timer seconds returns value", "eval_timer", ["s", 6, 7], 42),
        case("timer ms returns value", "eval_timer", ["ms", -3, 9], -27),
    ],
    "py-sort-lambda-l2": [
        case("by length", "eval_sort_words", [["apple", "banana", "cherry", "date"], "length"], ["date", "apple", "banana", "cherry"]),
        case("by last char", "eval_sort_words", [["apple", "banana", "cherry", "date"], "last_char"], ["banana", "apple", "date", "cherry"]),
    ],
}


HIDDEN_CASES = {
    # Stage 01 (28 challenges, 2-3 hidden cases each)
    "computer-architecture-pipeline-stall-profiler": [
        case("single instruction type zero stall", "profile_pipeline_workload", [{"alu": {"count": 500, "base_cpi": 2, "stall": 0}}, 1000000000], {"time_ms": 0.001, "bottleneck": "alu"}, hidden=True),
        case("empty workload", "profile_pipeline_workload", [{}, 2000000000], {"time_ms": 0, "bottleneck": None}, hidden=True),
        case("invalid zero frequency raises", "profile_pipeline_workload", [{"alu": {"count": 10, "base_cpi": 1, "stall": 0}}, 0], expected_exc="ValueError", hidden=True),
    ],
    "operating-system-lru-cache-pressure-simulator": [
        case("all hits after warmup", "simulate_page_cache", [[1, 2, 1, 2, 1, 2], 2], {"hits": 4, "misses": 2, "hit_rate": 0.6667}, hidden=True),
        case("lru eviction order check", "simulate_page_cache", [[1, 2, 1, 3, 2, 1], 2], {"hits": 1, "misses": 5, "hit_rate": 0.1667}, hidden=True),
        case("empty requests", "simulate_page_cache", [[], 4], {"hits": 0, "misses": 0, "hit_rate": 0}, hidden=True),
    ],
    "network-longest-prefix-match-engine": [
        case("default route /0 fallback", "lookup_route", [[{"cidr": "0.0.0.0/0", "next_hop": "gw"}, {"cidr": "192.168.1.0/24", "next_hop": "lan"}], "8.8.8.8"], "gw", hidden=True),
        case("ip_to_int boundary", "ip_to_int", ["192.168.1.1"], 3232235777, hidden=True),
        case("unsorted table picks longest prefix", "lookup_route", [[{"cidr": "172.16.0.0/20", "next_hop": "sub"}, {"cidr": "172.16.0.0/12", "next_hop": "root"}], "172.16.5.9"], "sub", hidden=True),
    ],
    "encoding-system-log-charset-detector": [
        case("utf8 chinese text", "decode_log_payload", ["e4b8ade69687"], {"status": "OK", "text": "中文"}, hidden=True),
        case("suspect replacement U+FFFD", "decode_log_payload", ["efbfbd61"], {"status": "SUSPECT_REPLACEMENT", "text": "\ufffda"}, hidden=True),
        case("empty payload", "decode_log_payload", [""], {"status": "OK", "text": ""}, hidden=True),
    ],
    "linux-command-safe-batch-runner": [
        case("dash-prefixed pattern kept safe", "build_grep_args", ["-v", "-rf"], ["grep", "--", "-v", "-rf"], hidden=True),
        case("empty keyword raises", "build_grep_args", ["", "a.log"], expected_exc="ValueError", hidden=True),
        case("empty filename raises", "build_grep_args", ["err", ""], expected_exc="ValueError", hidden=True),
    ],
    "linux-filesystem-inode-capacity-planner": [
        case("exact fit succeeds", "plan_small_file_storage", [100, 4096, 4096, 100, 100], {"fits": True, "bottleneck": "none"}, hidden=True),
        case("zero block_size raises", "plan_small_file_storage", [10, 100, 0, 100, 100], expected_exc="ValueError", hidden=True),
        case("non-multiple avg size rounds up blocks", "plan_small_file_storage", [3, 4097, 4096, 5, 10], {"fits": False, "bottleneck": "block"}, hidden=True),
    ],
    "linux-permission-policy-auditor": [
        case("executable config and world writable", "audit_permission", ["742", "config"], ["others_writable", "config_executable"], hidden=True),
        case("script missing owner exec", "audit_permission", ["644", "script"], ["owner_not_executable"], hidden=True),
        case("malformed octal raises", "audit_permission", ["99a", "file"], expected_exc="ValueError", hidden=True),
    ],
    "linux-process-zombie-detector": [
        case("exact count threshold triggers", "detect_process_anomaly", [[{"pid": 1, "state": "Z"}, {"pid": 2, "state": "S"}], 1, 0.9], {"zombies": 1, "zombie_rate": 0.5, "alert": True}, hidden=True),
        case("healthy cluster no alert", "detect_process_anomaly", [[{"pid": 1, "state": "R"}, {"pid": 2, "state": "S"}, {"pid": 3, "state": "Z"}, {"pid": 4, "state": "R"}, {"pid": 5, "state": "R"}], 2, 0.25], {"zombies": 1, "zombie_rate": 0.2, "alert": False}, hidden=True),
    ],
    "shell-script-pipeline-failure-guard": [
        case("empty exit codes returns 0", "evaluate_pipeline", [[], True], 0, hidden=True),
        case("rightmost nonzero under pipefail", "evaluate_pipeline", [[2, 127, 0], True], 127, hidden=True),
        case("all zero succeeds", "evaluate_pipeline", [[0, 0, 0], True], 0, hidden=True),
    ],
    "git-init-clone-repo-health-checker": [
        case("multiple issues collected", "check_repo_ready", [{"has_git_dir": False, "origin_url": "", "default_branch": "", "detached_head": True}], {"ready": False, "issues": ["missing_git_dir", "missing_origin", "missing_default_branch", "detached_head"]}, hidden=True),
        case("only detached head fails", "check_repo_ready", [{"has_git_dir": True, "origin_url": "https://a/b.git", "default_branch": "main", "detached_head": True}], {"ready": False, "issues": ["detached_head"]}, hidden=True),
    ],
    "git-add-commit-push-change-batch-planner": [
        case("spec and test dir detection", "plan_commit_batches", [["src/test/foo.py", "ui/btn.spec.ts", "README.md", "tsconfig.json"]], {"code": [], "test": ["src/test/foo.py", "ui/btn.spec.ts"], "docs": ["README.md"], "config": ["tsconfig.json"]}, hidden=True),
        case("empty changes list", "plan_commit_batches", [[]], {"code": [], "test": [], "docs": [], "config": []}, hidden=True),
    ],
    "git-branch-merge-conflict-risk-estimator": [
        case("touching boundary line conflicts", "estimate_merge_conflicts", [[{"file": "main.py", "start": 10, "end": 15}], [{"file": "main.py", "start": 15, "end": 20}]], {"risk": "high", "files": ["main.py"]}, hidden=True),
        case("different files no conflict", "estimate_merge_conflicts", [[{"file": "a.py", "start": 1, "end": 10}], [{"file": "b.py", "start": 1, "end": 10}]], {"risk": "low", "files": []}, hidden=True),
    ],
    "git-rebase-commit-history-rewriter": [
        case("empty base with features", "simulate_rebase", [[], ["X", "Y"]], ["rebased-X", "rebased-Y"], hidden=True),
        case("single base single feature", "simulate_rebase", [["main1"], ["feat1"]], ["main1", "rebased-feat1"], hidden=True),
    ],
    "git-conflict-resolution-marker-parser": [
        case("two multiline conflicts", "parse_conflict_blocks", ["top\n<<<<<<< A\na1\na2\n=======\nb1\n>>>>>>> B\nmid\n<<<<<<< A\nx\n=======\ny\n>>>>>>> B"], {"count": 2, "blocks": [{"ours": "a1\na2", "theirs": "b1"}, {"ours": "x", "theirs": "y"}]}, hidden=True),
        case("empty string clean", "parse_conflict_blocks", [""], {"count": 0, "blocks": []}, hidden=True),
    ],
    "cpu-cache-simulator-l2": [
        case("fifo eviction miss loop", "simulate_cache", [[0, 8, 16, 0, 8], 2, 8], 0, hidden=True),
        case("repeated same block hits", "simulate_cache", [[1, 2, 3, 4], 1, 8], 3, hidden=True),
        case("zero total hit rate", "cache_hit_rate", [0, 0], 0, hidden=True),
    ],
    "os-memory-allocator-l2": [
        case("first fit failure returns -1", "first_fit", [[[0, 20], [30, 40]], 50], [-1, 0, 0], hidden=True),
        case("best fit failure returns -1", "best_fit", [[[0, 30]], 40], [-1, 0, 0], hidden=True),
        case("best fit exact fit preferred", "best_fit", [[[0, 100], [100, 150]], 50], [1, 100, 150], hidden=True),
    ],
    "network-subnet-calculator-l2": [
        case("/24 to 6 non-power-of-2 rounds up bits", "subnet_calc", ["192.168.1.0/24", 6], {"new_prefix": 27, "subnets": 6, "hosts_per_subnet": 30, "bits_borrowed": 3}, hidden=True),
        case("/30 with 4 subnets yields 0 hosts", "subnet_calc", ["10.0.0.0/30", 4], {"new_prefix": 32, "subnets": 4, "hosts_per_subnet": 0, "bits_borrowed": 2}, hidden=True),
    ],
    "encoding-base64-tool-l2": [
        case("unicode roundtrip encode", "encode_base64", ["你好AI"], "5L2g5aW9QUk=", hidden=True),
        case("unicode decode", "decode_base64", ["5L2g5aW9QUk="], "你好AI", hidden=True),
        case("empty string encode", "encode_base64", [""], "", hidden=True),
    ],
    "linux-find-grep-tool-l2": [
        case("no files matched by name", "search_by_name", [["a.txt", "b.log"], "*.py"], [], hidden=True),
        case("multiple content matches", "search_by_content", [[{"name": "f1", "content": "ERROR: db"}, {"name": "f2", "content": "ok"}, {"name": "f3", "content": "ERROR: net"}], "ERROR"], ["f1", "f3"], hidden=True),
    ],
    "linux-disk-quota-analyzer-l2": [
        case("healthy usage", "check_quota", [50, 80, 100], {"status": "ok", "usage": 50}, hidden=True),
        case("exact soft threshold warns", "check_quota", [80, 80, 100], {"status": "warning", "usage": 80, "limit": 80}, hidden=True),
        case("exact hard threshold blocks", "check_quota", [100, 80, 100], {"status": "blocked", "usage": 100, "limit": 100}, hidden=True),
    ],
    "linux-sudo-auditor-l2": [
        case("full access prioritized over nopasswd", "audit_sudoers", [[{"user": "root2", "commands": "ALL", "target": "ALL", "nopasswd": True}]], ["root2 - FULL ACCESS"], hidden=True),
        case("empty entries", "audit_sudoers", [[]], [], hidden=True),
    ],
    "linux-process-priority-l2": [
        case("vruntime formula negative nice", "calculate_vruntime", [1024, -1], 0.8, hidden=True),
        case("schedule chooses smaller dynamic vruntime", "schedule_next", [[{"pid": 10, "runtime": 20, "nice": 0}, {"pid": 20, "runtime": 20, "nice": -2}]], 20, hidden=True),
    ],
    "shell-log-rotate-l2": [
        case("oversize takes priority over age", "simulate_logrotate", [[{"name": "big.log", "size_mb": 200, "age_days": 50}], 7, 100], [{"original": "big.log", "rotated": "big.log.1.gz", "compressed_size": 40}], hidden=True),
        case("empty file list", "simulate_logrotate", [[], 7, 100], [], hidden=True),
    ],
    "git-branch-cleaner-l2": [
        case("all unmerged branches kept for review", "cleanup_branches", [["main", "feat1", "feat2"], [], "main"], {"safe_to_delete": [], "needs_review": ["feat1", "feat2"]}, hidden=True),
        case("only default branch", "cleanup_branches", [["master"], ["master"], "master"], {"safe_to_delete": [], "needs_review": []}, hidden=True),
    ],
    "git-commit-squasher-l2": [
        case("squash 5 commits into 2", "simulate_squash", [[{"id": "1", "message": "a"}, {"id": "2", "message": "b"}, {"id": "3", "message": "c"}, {"id": "4", "message": "d"}, {"id": "5", "message": "e"}], 2], [{"id": "1", "message": "a; b; c; d"}, {"id": "5", "message": "e"}], hidden=True),
        case("squash to 1 commit keeps only first", "simulate_squash", [[{"id": "1", "message": "x"}, {"id": "2", "message": "y"}], 1], [{"id": "1", "message": "x; y"}], hidden=True),
    ],
    "git-conflict-auto-resolver-l2": [
        case("both branches make identical edit cleanly", "auto_merge", [{"1": "init"}, {"1": "fixed", "2": "extra"}, {"1": "fixed"}], {"conflicts": 0, "auto_merged": 2, "status": "clean"}, hidden=True),
        case("mixed conflict and clean edits", "auto_merge", [{"1": "a"}, {"1": "b", "2": "x"}, {"1": "c", "3": "y"}], {"conflicts": 1, "auto_merged": 2, "status": "conflict"}, hidden=True),
    ],
    "git-rebase-detector-l2": [
        case("borderline 2 conflicts still rebase ok", "predict_rebase_conflicts", [[{"file": "a.py", "start": 1, "end": 3}, {"file": "b.py", "start": 5, "end": 8}], [{"file": "a.py", "start": 3, "end": 6}, {"file": "b.py", "start": 8, "end": 9}]], {"total_conflicts": 2, "recommendation": "rebase ok"}, hidden=True),
        case("empty target commits", "predict_rebase_conflicts", [[{"file": "a.py", "start": 1, "end": 5}], []], {"total_conflicts": 0, "recommendation": "rebase ok"}, hidden=True),
    ],
    "git-conflict-resolution-strategies-l2": [
        case("long-lived squash", "recommend_strategy", ["feat", "main", "long-lived"], "merge --squash (压缩为1个提交)", hidden=True),
        case("unknown situation falls back", "recommend_strategy", ["feat", "main", "hotfix"], "recursive", hidden=True),
    ],

    # Stage 02 (38 challenges, 2-3 hidden cases each)
    "python-typed-config-value-parser": [
        case("parses negative float", "parse_config_value", ["-3.14", "float"], -3.14, hidden=True),
        case("parses bool no/false variants", "parse_config_value", [" NO ", "bool"], False, hidden=True),
        case("empty list[int] raises", "parse_config_value", [" , ", "list[int]"], expected_exc="ValueError", hidden=True),
    ],
    "python-log-level-filter": [
        case("sorts ascending by timestamp", "filter_logs", [[{"timestamp": "12:00:00", "level": "FATAL", "message": "down"}, {"timestamp": "09:00:00", "level": "error", "message": "oops"}, {"timestamp": "08:00:00", "level": "WARN", "message": "slow"}], "ERROR"], [{"timestamp": "09:00:00", "level": "error", "message": "oops"}, {"timestamp": "12:00:00", "level": "FATAL", "message": "down"}], hidden=True),
        case("unknown min level raises", "filter_logs", [[], "TRACE"], expected_exc="ValueError", hidden=True),
    ],
    "python-batch-task-scheduler": [
        case("exact batch multiple", "run_batches", [[{"id": 1, "payload": "a"}, {"id": 2, "payload": "b"}], 2, 0], [{"batch": 1, "results": [{"id": 1, "status": "success"}, {"id": 2, "status": "success"}]}], hidden=True),
        case("non-positive batch_size raises", "run_batches", [[{"id": 1, "payload": "a"}], 0, 0], expected_exc="ValueError", hidden=True),
    ],
    "python-memoize-decorator": [
        case("lru refresh promotes existing key", "eval_memoize", [2, [[1, 1], [2, 2], [1, 1], [3, 3], [1, 1]]], [{"result": 2, "cached": False}, {"result": 4, "cached": False}, {"result": 2, "cached": True}, {"result": 6, "cached": False}, {"result": 2, "cached": True}], hidden=True),
        case("invalid zero capacity raises", "eval_memoize", [0, [[1, 1]]], expected_exc="ValueError", hidden=True),
    ],
    "python-sliding-window-stats": [
        case("window size 1 mirrors values", "sliding_window_stats", [[5, 2, 9], 1], [{"avg": 5, "max": 5, "min": 5}, {"avg": 2, "max": 2, "min": 2}, {"avg": 9, "max": 9, "min": 9}], hidden=True),
        case("window size equal array len", "sliding_window_stats", [[-3, 0, 6], 3], [{"avg": 1, "max": 6, "min": -3}], hidden=True),
        case("zero window size raises", "sliding_window_stats", [[1, 2], 0], expected_exc="ValueError", hidden=True),
    ],
    "python-multi-field-sorter": [
        case("multi rule tie-break with string asc", "multi_field_sort", [[{"name": "Zoe", "score": 90}, {"name": "Amy", "score": 90}, {"name": "Bob", "score": 95}], [{"field": "score", "desc": True}, {"field": "name", "desc": False}]], [{"name": "Bob", "score": 95}, {"name": "Amy", "score": 90}, {"name": "Zoe", "score": 90}], hidden=True),
        case("missing field stays last under asc too", "multi_field_sort", [[{"name": "A"}, {"name": "B", "score": 10}, {"name": "C", "score": 5}], [{"field": "score", "desc": False}]], [{"name": "C", "score": 5}, {"name": "B", "score": 10}, {"name": "A"}], hidden=True),
    ],
    "python-deep-dict-merger": [
        case("ignore strategy keeps original scalar", "deep_merge", [{"a": {"x": 1, "y": 2}}, {"a": {"x": 9, "z": 3}}, "ignore"], {"a": {"x": 1, "y": 2, "z": 3}}, hidden=True),
        case("invalid conflict strategy raises", "deep_merge", [{"a": 1}, {"a": 2}, "error"], expected_exc="ValueError", hidden=True),
    ],
    "python-permission-intersection-analyzer": [
        case("multi role union + unused detection", "analyze_permissions", [{"dev": ["read", "write"], "ops": ["delete", "deploy"], "sec": ["audit"]}, {"u1": ["dev", "ops"], "u2": []}], {"users": {"u1": {"permissions": ["delete", "deploy", "read", "write"], "can_delete": True}, "u2": {"permissions": [], "can_delete": False}}, "unused_permissions": ["audit"]}, hidden=True),
        case("empty input dicts", "analyze_permissions", [{}, {}], {"users": {}, "unused_permissions": []}, hidden=True),
    ],
    "python-log-word-frequency": [
        case("case insensitive matches preserve keyword case", "count_keywords", [["Fatal error here", "FATAL crash"], ["Error", "FATAL"]], [{"keyword": "FATAL", "count": 2}, {"keyword": "Error", "count": 1}], hidden=True),
        case("empty logs list", "count_keywords", [[], ["warn", "err"]], [{"keyword": "warn", "count": 0}, {"keyword": "err", "count": 0}], hidden=True),
    ],
    "python-json-data-pipeline": [
        case("drops null and False/int string coercion", "clean_json_record", [{"user_score": "88", "is_admin": "false", "deleted_at": "null", "note_text": "hello"}], {"userScore": 88, "isAdmin": False, "noteText": "hello"}, hidden=True),
        case("snake_to_camel helper", "snake_to_camel", ["first_middle_last_name"], "firstMiddleLastName", hidden=True),
    ],
    "python-csv-group-aggregator": [
        case("min/max/count modes", "group_aggregate", [[{"g": "x", "v": 10}, {"g": "x", "v": 30}, {"g": "y", "v": 25}], "g", "v", "min"], [{"g": "y", "v": 25, "count": 1}, {"g": "x", "v": 10, "count": 2}], hidden=True),
        case("unsupported agg raises", "group_aggregate", [[{"g": "x", "v": 1}], "g", "v", "median"], expected_exc="ValueError", hidden=True),
    ],
    "python-connection-pool-simulator": [
        case("reuse multiple connections", "eval_pool", [2, [{"op": "acquire"}, {"op": "acquire"}, {"op": "acquire", "timeout": 0}, {"op": "release", "conn": 1}, {"op": "acquire"}]], [1, 2, "timeout_error", None, 1], hidden=True),
        case("acquire after close_all fails", "eval_pool", [1, [{"op": "close_all"}, {"op": "acquire"}]], [None, "closed_error"], hidden=True),
    ],
    "python-shopping-cart": [
        case("tier 5000 discount + update remove", "eval_cart", [[{"op": "add", "name": "TV", "price": 5000, "qty": 1}, {"op": "add", "name": "Cable", "price": 100, "qty": 2}, {"op": "update", "name": "Cable", "qty": 0}]], {"subtotal": 5000, "discount": 200, "total": 4800}, hidden=True),
        case("remove non-existent item safe", "eval_cart", [[{"op": "remove", "name": "ghost"}]], {"subtotal": 0, "discount": 0, "total": 0}, hidden=True),
    ],
    "python-cache-backend-abstraction": [
        case("memory delete and missing get", "eval_cache", ["memory", [{"op": "set", "key": "k", "value": 99}, {"op": "delete", "key": "k"}, {"op": "exists", "key": "k"}]], False, hidden=True),
        case("redis delete missing key returns false", "eval_cache", ["redis", [{"op": "delete", "key": "missing"}]], False, hidden=True),
    ],
    "python-log-formatter-polymorphism": [
        case("plain without source omits parens", "eval_formatter", ["WARN", "slow query", "", "plain"], "[WARN] slow query", hidden=True),
        case("json formatter deterministic keys", "eval_formatter", ["DEBUG", "ping", "net.py", "json"], '{"level": "DEBUG", "message": "ping", "source": "net.py", "timestamp": "2025-01-01 10:00:00"}', hidden=True),
    ],
    "python-paginated-iterator": [
        case("exact multiple of page size", "eval_paginated", [[10, 20, 30, 40], 2], [[10, 20], [30, 40]], hidden=True),
        case("page size larger than total", "eval_paginated", [[1, 2], 10], [[1, 2]], hidden=True),
    ],
    "python-retry-decorator": [
        case("exhausting retries raises ValueError", "eval_retry", [2, 2], expected_exc="ValueError", hidden=True),
        case("succeeds right on last allowed attempt", "eval_retry", [3, 2], "success", hidden=True),
    ],
    "python-lambda-expression-sorter": [
        case("multi rule score_desc then name_length", "eval_sort_users", [[{"name": "Christopher", "age": 20, "score": 90}, {"name": "Bo", "age": 30, "score": 90}, {"name": "Dan", "age": 25, "score": 95}], ["score_desc", "name_length"]], [{"name": "Dan", "age": 25, "score": 95}, {"name": "Bo", "age": 30, "score": 90}, {"name": "Christopher", "age": 20, "score": 90}], hidden=True),
        case("no rules preserves input order", "eval_sort_users", [[{"name": "B", "age": 2, "score": 1}, {"name": "A", "age": 1, "score": 2}], []], [{"name": "B", "age": 2, "score": 1}, {"name": "A", "age": 1, "score": 2}], hidden=True),
    ],
    "py-valid-parentheses-l2": [
        case("single unclosed left bracket", "is_valid", ["((("], False, hidden=True),
        case("leading closing bracket", "is_valid", ["]()"], False, hidden=True),
    ],
    "py-fizzbuzz-l2": [
        case("n=15 ends with FizzBuzz", "fizzbuzz", [15], ["1", "2", "Fizz", "4", "Buzz", "Fizz", "7", "8", "Fizz", "Buzz", "11", "Fizz", "13", "14", "FizzBuzz"], hidden=True),
        case("n=0 empty list", "fizzbuzz", [0], [], hidden=True),
    ],
    "py-two-sum-l2": [
        case("duplicate numbers sum target", "two_sum", [[3, 3], 6], [0, 1], hidden=True),
        case("negative target", "two_sum", [[-3, 4, 3, 90], 0], [0, 2], hidden=True),
    ],
    "py-palindrome-checker-l2": [
        case("alphanumeric palindrome", "is_palindrome", ["1221!"], True, hidden=True),
        case("numeric non-palindrome", "is_palindrome", ["0P"], False, hidden=True),
    ],
    "py-array-rotate-l2": [
        case("k=0 unchanged", "rotate", [[1, 2, 3], 0], [1, 2, 3], hidden=True),
        case("negative elements multiple of n", "rotate", [[-1, -100, 3, 99], 4], [-1, -100, 3, 99], hidden=True),
    ],
    "py-merge-intervals-l2": [
        case("unsorted nested intervals", "merge_intervals", [[[2, 6], [1, 10], [3, 4]]], [[1, 10]], hidden=True),
        case("disjoint reverse order", "merge_intervals", [[[5, 7], [1, 3]]], [[1, 3], [5, 7]], hidden=True),
    ],
    "py-word-count-l2": [
        case("case-insensitive punctuation ignored", "top_k_frequent", ["AI, ai! Ml? AI.", 2], [["ai", 3], ["ml", 1]], hidden=True),
        case("k=0 returns empty", "top_k_frequent", ["hello world", 0], [], hidden=True),
    ],
    "py-set-operations-l2": [
        case("identical duplicate arrays", "set_operations", [[5, 5, 5], [5]], {"intersection": [5], "difference": []}, hidden=True),
        case("empty first array", "set_operations", [[], [1, 2]], {"intersection": [], "difference": []}, hidden=True),
    ],
    "py-file-finder-l2": [
        case("case insensitive path match", "find_files", [[{"path": "/SRC/Main.PY", "content": ""}, {"path": "/README", "content": ""}], "main.py"], ["/SRC/Main.PY"], hidden=True),
        case("empty files list", "find_files", [[], "test"], [], hidden=True),
    ],
    "py-json-flattener-l2": [
        case("deep nested scalar array", "flatten_json", [{"cfg": {"hosts": ["h1", "h2"], "port": 8080}}], {"cfg.hosts.0": "h1", "cfg.hosts.1": "h2", "cfg.port": 8080}, hidden=True),
        case("already flat dict", "flatten_json", [{"x": True, "y": "ok"}], {"x": True, "y": "ok"}, hidden=True),
    ],
    "py-csv-parser-l2": [
        case("escaped newline string", "parse_csv", ["col1,col2\\n1,2\\n3,4"], [{"col1": "1", "col2": "2"}, {"col1": "3", "col2": "4"}], hidden=True),
        case("header only returns empty", "parse_csv", ["a,b,c"], [], hidden=True),
    ],
    "py-stack-calculator-l2": [
        case("negative division truncates toward zero", "eval_calculate", ["14-3/2"], 13, hidden=True),
        case("multi-digit chained mul div", "eval_calculate", ["10*2/5-3+1"], 2, hidden=True),
    ],
    "py-bank-account-l2": [
        case("deposit then withdraw", "eval_bank", ["Bob", 0, [{"op": "deposit", "amount": 300}, {"op": "withdraw", "amount": 120}]], 180, hidden=True),
        case("overdraft raises ValueError", "eval_bank", ["Bob", 50, [{"op": "withdraw", "amount": 100}]], expected_exc="ValueError", hidden=True),
    ],
    "py-shape-area-l2": [
        case("triangle area", "eval_shape", ["triangle", [6, 5]], 15, hidden=True),
        case("zero radius circle", "eval_shape", ["circle", [0]], 0, hidden=True),
    ],
    "py-logger-polymorphism-l2": [
        case("multiple console entries", "eval_logger", ["console", [["INFO", "a"], ["ERROR", "b"]]], ["[CONSOLE][INFO] a", "[CONSOLE][ERROR] b"], hidden=True),
        case("empty logs", "eval_logger", ["file", []], [], hidden=True),
    ],
    "py-range-iterator-l2": [
        case("start equals stop empty", "eval_range", [[3, 3]], [], hidden=True),
        case("start and stop", "eval_range", [[-2, 2]], [-2, -1, 0, 1], hidden=True),
    ],
    "py-fib-generator-l2": [
        case("first 8 numbers", "eval_fib", [8], [0, 1, 1, 2, 3, 5, 8, 13], hidden=True),
        case("first 0 empty", "eval_fib", [0], [], hidden=True),
    ],
    "py-timing-decorator-l2": [
        case("zero multiplication", "eval_timer", ["ms", 0, 99], 0, hidden=True),
        case("large multiplication", "eval_timer", ["s", 123, 10], 1230, hidden=True),
    ],
    "py-sort-lambda-l2": [
        case("by count of letter a", "eval_sort_words", [["banana", "apple", "pear", "fig"], "count_a"], ["fig", "apple", "pear", "banana"], hidden=True),
        case("empty list", "eval_sort_words", [[], "length"], [], hidden=True),
    ],
    "python-log-parser-generator": [
        case("filters blanks comments and malformed lines with spaces", "parse_log_lines", [["  # comment  ", "", "   WARN | 12:00:00 | cache | high mem  ", "only|two|parts"]], [{"level": "WARN", "timestamp": "12:00:00", "module": "cache", "message": "high mem"}], hidden=True),
        case("all empty input", "parse_log_lines", [[]], [], hidden=True),
    ],
}
