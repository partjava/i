import { STAGE_1_CONFIGS } from './challenges/stage1';
import { executeQuery, initDatabase } from './database';
import { STAGES } from '@/app/challenges/data/stages';

// 接口定义
interface SubtopicConfig {
  theory: string;
  latexFormulas: string[];
  code: string;
  solution: string;
  expected: string;
  quizzes: Array<{ question: string; options: string[]; answer: number; explanation: string }>;
  thinkingQuestion: string;
  aiPrompt: string;
}

// ==========================================
// STAGE 1: 基础知识 (14 subtopics)
// STAGE 1: 基础知识 (14 subtopics) - Loaded from challenges/stage1.ts
// ==========================================
// STAGE 2: Python编程 (19 subtopics)
// ==========================================
const STAGE_2_CONFIGS: Record<string, SubtopicConfig> = {
  "变量与数据类型": {
    theory: "### Python 变量与数据类型\n变量是指向内存对象的引用。基本类型包含整型、浮点型、布尔型与字符串。\n$$\\text{Type}(x) \\rightarrow \\text{Class\\ Type}$$",
    latexFormulas: ["Type(x) \\rightarrow Class\\ Type"],
    code: "def get_str_type(x) -> str:\n    # 待补全\n    pass",
    solution: "def get_str_type(x) -> str:\n    return type(x).__name__",
    expected: "str",
    quizzes: [{ question: "Python的变量是？", options: ["A. 对象内存引用指针", "B. 固定的物理内存槽"], answer: 0, explanation: "Python 变量不需要显式声明，都是对象的引用。" }],
    thinkingQuestion: "Python中可变类型（如列表）和不可变类型（如元组）在内存引用上的区别？",
    aiPrompt: "评估可变性与引用的变化，打分 0-10。"
  },
  "条件语句": {
    theory: "### Python 条件分支控制\n条件判定根据布尔表达式控制语句流向。\n$$\\text{Result} = A \\text{ and } B$$",
    latexFormulas: ["Result = A \\text{ and } B"],
    code: "def is_valid_age(age: int) -> bool:\n    # 待补全\n    pass",
    solution: "def is_valid_age(age: int) -> bool:\n    return age >= 18 and age <= 60",
    expected: "True",
    quizzes: [{ question: "条件语句依靠什么界定范围？", options: ["A. 强制缩进", "B. 花括号 {}"], answer: 0, explanation: "Python 依靠缩进来控制代码块层级。" }],
    thinkingQuestion: "Python中 if-elif-else 的短路求值特性？",
    aiPrompt: "评估短路运算逻辑，打分 0-10。"
  },
  "循环": {
    theory: "### Python 循环迭代控制\n\`for\` 循环遍历可迭代序列；\`while\` 循环根据条件条件决定反复。\n$$S = \\frac{N(N+1)}{2}$$",
    latexFormulas: ["S = \\frac{N(N+1)}{2}"],
    code: "def sum_to_n(n: int) -> int:\n    # 待补全\n    pass",
    solution: "def sum_to_n(n: int) -> int:\n    return sum(range(1, n + 1))",
    expected: "15",
    quizzes: [{ question: "break 和 continue 的区别？", options: ["A. break 退出整个循环；continue 跳过本次迭代", "B. 作用完全相同"], answer: 0, explanation: "break终止循环；continue继续下轮判断。" }],
    thinkingQuestion: "如何防止 while 循环陷入死循环？",
    aiPrompt: "评估边界条件与终止信号设计，打分 0-10。"
  },
  "函数": {
    theory: "### Python 函数与作用域\n函数封装了代码以复用。遵循 LEGB 作用域查找法则。\n$$f(x) = y$$",
    latexFormulas: ["f(x) = y"],
    code: "def get_mul(a: int, b: int) -> int:\n    # 待补全\n    pass",
    solution: "def get_mul(a: int, b: int) -> int:\n    return a * b",
    expected: "20",
    quizzes: [{ question: "函数内部修改全局不可变变量需要？", options: ["A. 使用 global 关键字", "B. 不需要任何处理"], answer: 0, explanation: "修改全局作用域变量指针需要 global 显式声明。" }],
    thinkingQuestion: "闭包（Closure）的底层存储机制是什么？",
    aiPrompt: "评估闭包中 __closure__ 和自由变量的作用，打分 0-10。"
  },
  "List 列表": {
    theory: "### Python 列表的扩容与切片\n列表是可变序列，底层采用连续动态数组实现。\n$$\\text{Slice} = \\mathcal{O}(\\text{end} - \\text{start})$$",
    latexFormulas: ["Complexity = \\mathcal{O}(K)"],
    code: "def get_head_tail(lst: list) -> list:\n    # 待补全\n    pass",
    solution: "def get_head_tail(lst: list) -> list:\n    return [lst[0], lst[-1]]",
    expected: "[1, 3]",
    quizzes: [{ question: "在列表头部插入元素（insert(0)）的时间复杂度是？", options: ["A. O(N)", "B. O(1)"], answer: 0, explanation: "需要移动头部后面的所有元素位置。" }],
    thinkingQuestion: "Python 列表的翻倍扩容策略及其对分摊复杂度的一致性？",
    aiPrompt: "评估动态数组分摊复杂度分析，打分 0-10。"
  },
  "Tuple 元组": {
    theory: "### Python 不可变元组\n元组为不可变容器，常用于多返回值解包或充当散列容器的 Key。\n$$\\text{Unpack} \\rightarrow (x, y) = (a, b)$$",
    latexFormulas: ["Unpack \\rightarrow (x, y) = (a, b)"],
    code: "def swap_vars(a, b) -> tuple:\n    # 待补全\n    pass",
    solution: "def swap_vars(a, b) -> tuple:\n    return b, a",
    expected: "(2, 1)",
    quizzes: [{ question: "元组是否可以作为字典的 Key？", options: ["A. 只要元组内所有元素均不可变即可", "B. 绝对不可"], answer: 0, explanation: "不可变元组是可哈希的，能作为字典的键。" }],
    thinkingQuestion: "元组和列表的底层分配开销比较？",
    aiPrompt: "评估只读数据的性能优化考量，打分 0-10。"
  },
  "Dict 字典": {
    theory: "### Python 字典映射哈希表\n字典是基于哈希表实现的键值容器，时间复杂度平均为 $O(1)$。\n$$\\text{Lookup Complexity} = \\mathcal{O}(1)$$",
    latexFormulas: ["Lookup\\ Complexity = \\mathcal{O}(1)"],
    code: "def get_fallback(d: dict, k: str) -> str:\n    # 待补全\n    pass",
    solution: "def get_fallback(d: dict, k: str) -> str:\n    return d.get(k, 'N/A')",
    expected: "N/A",
    quizzes: [{ question: "字典的查找平均复杂度是？", options: ["A. O(1)", "B. O(N)"], answer: 0, explanation: "在低冲突率下，哈希检索时间为常数阶。" }],
    thinkingQuestion: "哈希冲突频发时，Python 字典的性能是如何衰减的？",
    aiPrompt: "评估哈希碰撞引发的冲突寻址链开销，打分 0-10。"
  },
  "Set 集合": {
    theory: "### Python 集合与交并差集\n集合无序且元素唯一。支持快速成员资格测试与集合代数运算。\n$$|A \\cap B| \\le \\min(|A|, |B|)$$",
    latexFormulas: ["|A \\cap B| \\le \\min(|A|, |B|)"],
    code: "def get_diff(a: set, b: set) -> set:\n    # 待补全\n    pass",
    solution: "def get_diff(a: set, b: set) -> set:\n    return a - b",
    expected: "{1}",
    quizzes: [{ question: "集合中是否允许存在可变对象（如列表）？", options: ["A. 不允许，集合内元素必须可哈希", "B. 允许"], answer: 0, explanation: "可哈希即要求对象在生命周期内不可变。" }],
    thinkingQuestion: "如何利用 Set 进行大规模数据查重与过滤？",
    aiPrompt: "评估 Set 哈希加速成员查找的应用，打分 0-10。"
  },
  "文件读写": {
    theory: "### Python 上下文管理器与 I/O\n使用 with 上下文管理保证文件在发生异常时能自动关闭句柄。\n$$\\text{Sync Time} = \\text{Disk Write latency} + \\text{Buffer flush time}$$",
    latexFormulas: ["Sync\\ Time = Write\\ Latency + Flush\\ Time"],
    code: "def get_read_mode() -> str:\n    # 待补全\n    pass",
    solution: "def get_read_mode() -> str:\n    return 'r'",
    expected: "r",
    quizzes: [{ question: "with open() 的底层基于什么协议？", options: ["A. 上下文管理器协议（__enter__/__exit__）", "B. 装饰器函数劫持"], answer: 0, explanation: "实现上下文协议的类均可配合 with 使用。" }],
    thinkingQuestion: "对于 20GB 大文件，如何使用 chunk 分块迭代读取？",
    aiPrompt: "评估大文件流式读取策略，防止 OOM 溢出，打分 0-10。"
  },
  "JSON解析": {
    theory: "### Python JSON 数据交换\nJSON 是轻量级的离散文本数据交换格式。\n$$\\text{Time} = \\mathcal{O}(L)$$",
    latexFormulas: ["Time = \\mathcal{O}(L)"],
    code: "import json\ndef parse_str(s: str) -> dict:\n    # 待补全\n    pass",
    solution: "import json\ndef parse_str(s: str) -> dict:\n    return json.loads(s)",
    expected: "{'x': 1}",
    quizzes: [{ question: "json.dumps 作用是？", options: ["A. 将 Python 数据转为 JSON 字符串", "B. 解析文本文件"], answer: 0, explanation: "dumps 将内存对象编码输出为文本。" }],
    thinkingQuestion: "当对象包含非标准格式（如 datetime）时，json.dumps 报错如何自定义 Encoder 解决？",
    aiPrompt: "考核 json 复杂类型自定义解析序列化，打分 0-10。"
  },
  "CSV数据分析": {
    theory: "### CSV 数据表分析\nCSV 是最常用的二维关系型表格文本交换格式。\n$$\\text{CSV} \\rightarrow \\text{Tabular\\ Format}$$",
    latexFormulas: ["CSV \\rightarrow Tabular\\ Format"],
    code: "def split_row(line: str) -> list:\n    # 待补全\n    pass",
    solution: "def split_row(line: str) -> list:\n    return line.strip().split(',')",
    expected: "['name', 'age']",
    quizzes: [{ question: "CSV 的英文全称是？", options: ["A. Comma-Separated Values", "B. Common Sorter Vector"], answer: 0, explanation: "指逗号分隔值格式。" }],
    thinkingQuestion: "如何利用 Python 的 csv.DictReader 自动处理头部对齐问题？",
    aiPrompt: "评估 csv 模块高级读写器的使用，打分 0-10。"
  },
  "Class类": {
    theory: "### Python 基础类声明\n面向对象通过 class 封装数据属性和方法行为。\n$$\\text{Class} \\rightarrow \\text{Instance}$$",
    latexFormulas: ["Class \\rightarrow Instance"],
    code: "class User:\n    def __init__(self, name):\n        self.name = name\ndef create_name(name) -> str:\n    return User(name).name",
    solution: "class User:\n    def __init__(self, name):\n        self.name = name\ndef create_name(name) -> str:\n    return User(name).name",
    expected: "Alex",
    quizzes: [{ question: "__init__ 方法主要起什么作用？", options: ["A. 构造实例时的初始化赋值", "B. 物理创建对象内存空间"], answer: 0, explanation: "__new__ 创建实例，__init__ 执行属性复值。" }],
    thinkingQuestion: "类变量与实例变量在类中作用域与生命周期的核心差别？",
    aiPrompt: "评估类属性与对象实例属性的区别，打分 0-10。"
  },
  "封装": {
    theory: "### Python 私有封装\n使用前置双下划线 \`__\` 触发名称修饰（Name Mangling），保障数据隔离。\n$$\\text{Private} \\rightarrow \\text{\\_ClassName\\_\\_var}$$",
    latexFormulas: ["Private \\rightarrow \\_ClassName\\_\\_var"],
    code: "class Enc:\n    def __init__(self):\n        self.__v = 10\n    def get_v(self) -> int:\n        return self.__v\ndef call_enc() -> int:\n    return Enc().get_v()",
    solution: "class Enc:\n    def __init__(self):\n        self.__v = 10\n    def get_v(self) -> int:\n        return self.__v\ndef call_enc() -> int:\n    return Enc().get_v()",
    expected: "10",
    quizzes: [{ question: "双下划线属性在外部是否可以硬访问？", options: ["A. 可以，通过特定别名如 _Enc__v", "B. 绝对被物理隔离不可访问"], answer: 0, explanation: "只是触发了名称重组，未进行底层加密隔离。" }],
    thinkingQuestion: "Python中 property 装饰器在实现封装上的作用是什么？",
    aiPrompt: "评估 property 对属性读写接口控制的使用，打分 0-10。"
  },
  "继承": {
    theory: "### Python 单继承与多继承\n子类可以复用父类的属性和方法。多继承基于 MRO 算法排序。\n$$\\text{MRO} = \\text{C3\\ Linearization}$$",
    latexFormulas: ["MRO = C3\\ Linearization"],
    code: "class Parent:\n    def speak(self): return 'P'\nclass Child(Parent):\n    pass\ndef test_inh() -> str:\n    return Child().speak()",
    solution: "class Parent:\n    def speak(self): return 'P'\nclass Child(Parent):\n    pass\ndef test_inh() -> str:\n    return Child().speak()",
    expected: "P",
    quizzes: [{ question: "多继承中 Python 查找方法顺序所用到的算法是？", options: ["A. C3 线性化算法", "B. 广度优先二叉查找"], answer: 0, explanation: "C3算法决定了多继承多路解析（mro）顺序。" }],
    thinkingQuestion: "多继承中 super() 的具体执行链机制？",
    aiPrompt: "考核 super 协作继承链条运作原理，打分 0-10。"
  },
  "多态": {
    theory: "### Python 动态鸭子类型\n动态语言不强制要求接口继承，只要对象具有指定签名的方法即可实现多态。\n$$\\text{Duck\\ Typing} \\rightarrow \\text{Behavior\\ Match}$$",
    latexFormulas: ["Duck\\ Typing \\rightarrow Behavior\\ Match"],
    code: "class Duck:\n    def quack(self): return 'Quack'\nclass Person:\n    def quack(self): return 'ImDuck'\ndef make_quack(obj) -> str:\n    return obj.quack()",
    solution: "class Duck:\n    def quack(self): return 'Quack'\nclass Person:\n    def quack(self): return 'ImDuck'\ndef make_quack(obj) -> str:\n    return obj.quack()",
    expected: "Quack",
    quizzes: [{ question: "多态在 Python 中表现为？", options: ["A. 鸭子类型：如果走起路来像鸭子，就视为鸭子", "B. 必须基于抽象基类的强制覆写"], answer: 0, explanation: "更看重方法的行为表现而非严格的静态类型树。" }],
    thinkingQuestion: "什么是抽象基类（ABC）与 @abstractmethod？它们在规范面向对象接口时的意义？",
    aiPrompt: "评估 Python 静态接口规范工具 abc，打分 0-10。"
  },
  "迭代器": {
    theory: "### Python 迭代器协议\n迭代器是实现了 \`__iter__\` 和 \`__next__\` 方法的对象。迭代完成抛出 StopIteration。\n$$\\text{Iterator} \\rightarrow \\text{next}() \\rightarrow \\text{Element}$$",
    latexFormulas: ["Iterator \\rightarrow next() \\rightarrow Element"],
    code: "def get_next_val(it) -> int:\n    # 待补全\n    pass",
    solution: "def get_next_val(it) -> int:\n    return next(it)",
    expected: "1",
    quizzes: [{ question: "迭代器在迭代结束后触发什么异常？", options: ["A. StopIteration", "B. IndexError"], answer: 0, explanation: "系统依靠抛出 StopIteration 来宣告遍历终止。" }],
    thinkingQuestion: "可迭代对象（Iterable）与迭代器（Iterator）的本质差异与关联？",
    aiPrompt: "评估 iter() 转化机制与可迭代协议的区别，打分 0-10。"
  },
  "生成器": {
    theory: "### Python 生成器与惰性求值\n生成器是利用 yield 构成的特殊迭代器，具有节约内存的惰性加载特性。\n$$\\text{yield} \\rightarrow \\text{Pause\\ and\\ Return}$$",
    latexFormulas: ["yield \\rightarrow Pause\\ and\\ Return"],
    code: "def gen_cube(n: int):\n    for i in range(1, n + 1):\n        yield i ** 3\ndef first_cube(n) -> int:\n    return next(gen_cube(n))",
    solution: "def gen_cube(n: int):\n    for i in range(1, n + 1):\n        yield i ** 3\ndef first_cube(n) -> int:\n    return next(gen_cube(n))",
    expected: "1",
    quizzes: [{ question: "生成器的首要优势是？", options: ["A. 惰性求值，极大地节约内存空间开销", "B. 相比普通函数运行速度翻倍"], answer: 0, explanation: "它逐个生成元素而不是一次性分配巨大列表。" }],
    thinkingQuestion: "生成器表达式与列表推导式在内存分配上的巨大差异？",
    aiPrompt: "评估内存友好计算与惰性序列的工程应用，打分 0-10。"
  },
  "装饰器": {
    theory: "### Python 装饰器函数劫持\n装饰器是用于修改其他函数功能的高阶函数，通常采用闭包机制实现。\n$$f'(x) = \\text{Wrapper}(f(x))$$",
    latexFormulas: ["f'(x) = Wrapper(f(x))"],
    code: "def my_dec(func):\n    def wrapper(*args, **kwargs):\n        return func(*args, **kwargs) * 2\n    return wrapper\n@my_dec\ndef add_five(x): return x + 5",
    solution: "def my_dec(func):\n    def wrapper(*args, **kwargs):\n        return func(*args, **kwargs) * 2\n    return wrapper\n@my_dec\ndef add_five(x): return x + 5",
    expected: "20",
    quizzes: [{ question: "被装饰的函数其元数据（如 __name__）丢失如何解决？", options: ["A. 使用 @functools.wraps 装饰内层函数", "B. 无法恢复"], answer: 0, explanation: "wraps 装饰器会自动复制被装饰函数的元信息。" }],
    thinkingQuestion: "如何编写一个接收参数的装饰器（三层闭包结构）？",
    aiPrompt: "考核带参装饰器的设计逻辑，打分 0-10。"
  },
  "Lambda表达式": {
    theory: "### Python Lambda 匿名表达式\nLambda 用于声明一次性简单的单行匿名函数结构。\n$$\\lambda x, y: x + y$$",
    latexFormulas: ["\\lambda x, y: x + y"],
    code: "def get_lambda():\n    # 待补全: 返回一个匿名 lambda，该函数接收 x 并返回其 2 倍\n    pass",
    solution: "def get_lambda():\n    return lambda x: x * 2",
    expected: "20",
    quizzes: [{ question: "Lambda 表达式最多可以编写多少条语句？", options: ["A. 只能编写单行表达式，不可有复杂控制流", "B. 任意条，通过缩进区分"], answer: 0, explanation: "Lambda 只能包含一个表达式而不能包含复杂的命令语句。" }],
    thinkingQuestion: "匿名函数和用 def 声明的具名函数的运行效率差异及局限性？",
    aiPrompt: "评估 lambda 的使用场景，打分 0-10。"
  }
};

// ==========================================
// STAGE 3: 数学基础 (10 subtopics)
// ==========================================
const STAGE_3_CONFIGS: Record<string, SubtopicConfig> = {
  "向量与空间": {
    theory: "### 线性代数：度量空间与范数\n向量模长使用 L2 范数衡量两点在多维空间中的物理位置差。\n$$||u - v||_2 = \\sqrt{\\sum_{i=1}^{n} (u_i - v_i)^2}$$",
    latexFormulas: ["||u - v||_2 = \\sqrt{\\sum_{i=1}^{n} (u_i - v_i)^2}"],
    code: "import numpy as np\ndef get_norm(v: list) -> float:\n    # 待补全\n    pass",
    solution: "import numpy as np\ndef get_norm(v: list) -> float:\n    return float(np.linalg.norm(v))",
    expected: "5.0",
    quizzes: [{ question: "向量的点积（内积）如果为 0，代表两个向量？", options: ["A. 相互垂直/正交", "B. 物理方向完全重合"], answer: 0, explanation: "内积为 0 即夹角为 90 度，空间正交。" }],
    thinkingQuestion: "余弦相似度与欧式距离在大维稀疏向量匹配时的区别？",
    aiPrompt: "评估空间夹角与绝对位置在表达语义上的不同，打分 0-10。"
  },
  "矩阵乘法与逆": {
    theory: "### 线性变换与矩阵乘法\n矩阵相乘代表连续线性空间的坐标转换。\n$$C_{ij} = \\sum_{k=1}^{n} A_{ik} B_{kj}$$",
    latexFormulas: ["C_{ij} = \\sum_{k=1}^{n} A_{ik} B_{kj}"],
    code: "import numpy as np\ndef get_prod(A: list, B: list) -> list:\n    # 待补全\n    pass",
    solution: "import numpy as np\ndef get_prod(A: list, B: list) -> list:\n    return np.dot(A, B).tolist()",
    expected: "[[19, 22], [43, 50]]",
    quizzes: [{ question: "矩阵乘法是否满足交换律？", options: ["A. 绝大多数情况下不满足 AB = BA", "B. 恒等成立"], answer: 0, explanation: "矩阵乘法无交换律，左右乘表示不同的空间变换。" }],
    thinkingQuestion: "矩阵的逆存在的充要条件及其在求解线性方程组中的物理意义？",
    aiPrompt: "评估矩阵行列式不为零、满秩与线性变换可逆，打分 0-10。"
  },
  "SVD奇异值分解": {
    theory: "### 矩阵 SVD 特征提取\n奇异值分解能对任意非方阵做正交旋转和轴拉伸缩放投影。\n$$A = U \\Sigma V^T$$",
    latexFormulas: ["A = U \\Sigma V^T"],
    code: "import numpy as np\ndef get_singular_values(A: list) -> list:\n    # 待补全\n    pass",
    solution: "import numpy as np\ndef get_singular_values(A: list) -> list:\n    _, s, _ = np.linalg.svd(A)\n    return s.tolist()",
    expected: "[5.0]",
    quizzes: [{ question: "SVD 分解的核心价值在于？", options: ["A. 能对任意非方阵降维，保留主要奇异值压缩矩阵", "B. 只能计算二次型极值"], answer: 0, explanation: "任何矩阵均可SVD分解，大奇异值对应主要信息。" }],
    thinkingQuestion: "SVD 如何应用于协同过滤推荐系统中的隐含矩阵分解？",
    aiPrompt: "评估 SVD 降维在推荐或图像压缩中的应用，打分 0-10。"
  },
  "特征值与特征向量": {
    theory: "### 特征空间变换\n特征向量在线性变换下方向不变，仅发生大小拉伸。\n$$A v = \\lambda v$$",
    latexFormulas: ["A v = \\lambda v"],
    code: "import numpy as np\ndef get_eigenvalues(A: list) -> list:\n    # 待补全\n    pass",
    solution: "import numpy as np\ndef get_eigenvalues(A: list) -> list:\n    w, _ = np.linalg.eig(A)\n    return w.tolist()",
    expected: "[2.0, 5.0]",
    quizzes: [{ question: "特征向量在线性变换的作用下？", options: ["A. 方向保持不变，只进行模长拉伸", "B. 发生任意角度偏转"], answer: 0, explanation: "变换特征仅在长度维度按 $\\lambda$ 缩放。" }],
    thinkingQuestion: "PageRank 算法是如何将网页排名问题归结为求解特征向量问题的？",
    aiPrompt: "评估马尔科夫转移矩阵最大特征值对应的特征向量计算，打分 0-10。"
  },
  "贝意斯公式": {
    theory: "### 先验与后验概率转换\n贝叶斯公式描述条件概率转移，由已知先验修正后验。\n$$P(A \\mid B) = \\frac{P(B \\mid A) \\cdot P(A)}{P(B)}$$",
    latexFormulas: ["P(A \\mid B) = \\frac{P(B \\mid A) P(A)}{P(B)}"],
    code: "def calc_bayes(prior: float, likelihood: float, evidence: float) -> float:\n    # 待补全\n    pass",
    solution: "def calc_bayes(prior: float, likelihood: float, evidence: float) -> float:\n    return (likelihood * prior) / evidence",
    expected: "0.75",
    quizzes: [{ question: "贝叶斯公式中的先验概率指？", options: ["A. 根据以往经验做出的概率判定", "B. 观测到证据后修正的条件概率"], answer: 0, explanation: "先验是事件尚未发生前的主观或经验分布估计。" }],
    thinkingQuestion: "朴素贝叶斯模型中的“朴素”假设对文本分类计算复杂度有什么影响？",
    aiPrompt: "评估条件独立性假设对概率连乘的简化，打分 0-10。"
  },
  "高斯/伯努利分布": {
    theory: "### 概率质量与概率密度分布\n伯努利分布描述单次二分类决策；高斯（正态）分布表达多因子累加。\n$$f(x) = \\frac{1}{\\sqrt{2\\pi}\\sigma} e^{-\\frac{(x-\\mu)^2}{2\\sigma^2}}$$",
    latexFormulas: ["f(x) = \\frac{1}{\\sqrt{2\\pi}\\sigma} e^{-\\frac{(x-\\mu)^2}{2\\sigma^2}}"],
    code: "import math\ndef get_normal_pdf(x: float, mu: float, sigma: float) -> float:\n    # 待补全\n    pass",
    solution: "import math\ndef get_normal_pdf(x: float, mu: float, sigma: float) -> float:\n    return (1 / (math.sqrt(2 * math.pi) * sigma)) * math.exp(-((x - mu)**2) / (2 * sigma**2))",
    expected: "0.3989422804014327",
    quizzes: [{ question: "高斯分布的一阶统计矩表示？", options: ["A. 均值 $\\mu$ 决定对称中心", "B. 标准差决定离散宽度"], answer: 0, explanation: "均值控制密度曲线的水平偏移和几何中轴。" }],
    thinkingQuestion: "中心极限定理（CLT）为什么奠定了高斯分布在工程测量中的核心位置？",
    aiPrompt: "评估多个独立随机变量和趋于正态分布的物理含义，打分 0-10。"
  },
  "最大似然估计(MLE)": {
    theory: "### 似然函数最大化估计\n寻求一组参数，使得在参数空间中产生已知观测集样本的概率最大。\n$$L(\\theta) = \\prod_{i=1}^n f(x_i \\mid \\theta)$$",
    latexFormulas: ["L(\\theta) = \\prod_{i=1}^n f(x_i \\mid \\theta)"],
    code: "import numpy as np\ndef get_log_likelihood(x: list, p: float) -> float:\n    # 待补全\n    pass",
    solution: "import numpy as np\ndef get_log_likelihood(x: list, p: float) -> float:\n    successes = sum(x)\n    return float(successes * np.log(p) + (len(x) - successes) * np.log(1 - p))",
    expected: "-6.931471805599453",
    quizzes: [{ question: "最大似然估计为什么要常取对数似然？", options: ["A. 将复杂的概率连乘求导转化为简单项求和", "B. 提高概率值"], answer: 0, explanation: "取对数单调性不变，且乘法求导变加法求导极其高效。" }],
    thinkingQuestion: "最大似然估计（MLE）与最大后验估计（MAP）在正则化惩罚上的联系？",
    aiPrompt: "评估 MAP 引入参数先验分布对模型正则化的作用，打分 0-10。"
  },
  "偏导数与梯度": {
    theory: "### 偏导数与多维特征空间梯度\n梯度向量是由函数对各个自变量偏导数构成的方向向量，指向增长最快处。\n$$\\nabla f(x) = \\left[ \\frac{\\partial f}{\\partial x_1}, \\dots, \\frac{\\partial f}{\\partial x_n} \\right]$$",
    latexFormulas: ["\\nabla f(x) = [ \\frac{\\partial f}{\\partial x_1}, \\dots ]"],
    code: "def get_grad_2d(x: float, y: float) -> list:\n    # 待补全: f = x^2 + 3y, 计算其在(x,y)处的梯度向量\n    pass",
    solution: "def get_grad_2d(x: float, y: float) -> list:\n    return [2.0 * x, 3.0]",
    expected: "[4.0, 3.0]",
    quizzes: [{ question: "沿着梯度的反方向（负梯度）进行函数运算？", options: ["A. 函数值下降最快", "B. 没有任何变化"], answer: 0, explanation: "负梯度方向即局部的最速下降方向。" }],
    thinkingQuestion: "雅克比矩阵（Jacobian Matrix）与黑塞矩阵（Hessian Matrix）分别的阶数及作用？",
    aiPrompt: "评估一阶导数矩阵与二阶偏导数二次型矩阵的含义，打分 0-10。"
  },
  "梯度下降算法": {
    theory: "### 梯度迭代优化求解\n以负梯度方向不断迭代修正自变量，以逐步收敛逼近损失函数的极小值。\n$$w \\leftarrow w - \\eta \\cdot \\nabla L(w)$$",
    latexFormulas: ["w \\leftarrow w - \\eta \\nabla L(w)"],
    code: "def sgd_update(w: float, grad: float, lr: float) -> float:\n    # 待补全\n    pass",
    solution: "def sgd_update(w: float, grad: float, lr: float) -> float:\n    return w - lr * grad",
    expected: "0.95",
    quizzes: [{ question: "学习率（Learning Rate）设置过大会导致？", options: ["A. 发生振荡且不收敛发散", "B. 永远无法计算局部偏导"], answer: 0, explanation: "太大的学习率会越过极小值，引起震荡。" }],
    thinkingQuestion: "局部最优（Local Minima）和鞍点（Saddle Point）有什么异同？如何走出鞍点？",
    aiPrompt: "评估非凸损失优化中摆脱鞍点的方法，打分 0-10。"
  },
  "泰勒展开式": {
    theory: "### 多项式泰勒拟合近似\n使用自变量某点的一阶和二阶导数构成的多项式，局部近似代替复杂的非线性函数。\n$$f(x) \\approx f(x_0) + f'(x_0)(x - x_0) + \\frac{1}{2}f''(x_0)(x - x_0)^2$$",
    latexFormulas: ["f(x) \\approx f(x_0) + f'(x_0)(x - x_0)"],
    code: "def taylor_exp_approx(x: float) -> float:\n    # 待补全: f(x)=e^x 在 x_0=0 处的二阶近似\n    pass",
    solution: "def taylor_exp_approx(x: float) -> float:\n    return 1.0 + x + 0.5 * (x ** 2)",
    expected: "1.22",
    quizzes: [{ question: "XGBoost 算法在拟合目标损失时应用了泰勒展开的？", options: ["A. 二阶泰勒展开，获取一阶导与二阶导", "B. 仅使用一阶展开"], answer: 0, explanation: "XGBoost 损失函数在当前预测值处进行二阶展开以实现参数快速闭合。" }],
    thinkingQuestion: "二阶泰勒展开式中的二次项能为最优化过程带来什么维度的加速度？",
    aiPrompt: "评估牛顿法与梯度下降法收敛效率差异，打分 0-10。"
  }
};

// ==========================================
// STAGE 4: 机器学习 (13 subtopics)
// ==========================================
const STAGE_4_CONFIGS: Record<string, SubtopicConfig> = {
  "线性回归": {
    theory: "### 线性回归模型\n通过特征的线性加权组合预测连续目标值。\n$$y = w^T x + b$$",
    latexFormulas: ["y = w^T x + b"],
    code: "import numpy as np\ndef linear_predict(w: np.ndarray, x: np.ndarray, b: float) -> float:\n    # 待补全\n    pass",
    solution: "import numpy as np\ndef linear_predict(w: np.ndarray, x: np.ndarray, b: float) -> float:\n    return float(np.dot(x, w) + b)",
    expected: "5.5",
    quizzes: [{ question: "线性回归中最常用的损失函数是？", options: ["A. 均方误差 (MSE)", "B. 交叉熵 (Cross Entropy)"], answer: 0, explanation: "MSE 能够衡量预测值与真实值的平均平方偏差。" }],
    thinkingQuestion: "L1 正则化 (Lasso) 和 L2 正则化 (Ridge) 的数学表达及其在特征选择上的本质区别？",
    aiPrompt: "评估特征稀疏性及权重衰减的原理，打分 0-10。"
  },
  "Logistic回归": {
    theory: "### Logistic回归分类\n利用 Sigmoid 激活函数将线性实数值映射到 0~1 的条件分类概率中。\n$$p = \\frac{1}{1 + e^{-z}}$$",
    latexFormulas: ["p = \\frac{1}{1 + e^{-z}}"],
    code: "import numpy as np\ndef sigmoid(z: float) -> float:\n    # 待补全\n    pass",
    solution: "import numpy as np\ndef sigmoid(z: float) -> float:\n    return float(1.0 / (1.0 + np.exp(-z)))",
    expected: "0.5",
    quizzes: [{ question: "Logistic回归输出的取值范围是？", options: ["A. (0, 1)", "B. [-1, 1]"], answer: 0, explanation: "Sigmoid 函数将任意实数映射到开区间 (0, 1) 内。" }],
    thinkingQuestion: "Logistic回归是线性模型还是非线性模型？为什么？",
    aiPrompt: "评估线性决策边界与非线性激活映射的联系，打分 0-10。"
  },
  "支持向量机 (SVM)": {
    theory: "### 支持向量机 (SVM) 分类\n它的目标是寻找一个超平面，使得两类数据样本之间的几何间隔（Margin）最大化。\n$$\\min_{w, b} \\frac{1}{2}||w||^2$$",
    latexFormulas: ["w^T x + b = 0", "\\min_{w, b} \\frac{1}{2}||w||^2"],
    code: "import numpy as np\nfrom sklearn.svm import SVC\nclass SVMClassifier:\n    def train_and_predict(self, X_train: np.ndarray, y_train: np.ndarray, X_test: np.ndarray) -> np.ndarray:\n        # 待补全\n        pass",
    solution: "import numpy as np\nfrom sklearn.svm import SVC\nclass SVMClassifier:\n    def train_and_predict(self, X_train: np.ndarray, y_train: np.ndarray, X_test: np.ndarray) -> np.ndarray:\n        model = SVC(kernel='linear', C=1.0)\n        model.fit(X_train, y_train)\n        return model.predict(X_test)",
    expected: "[0 0 1 1]",
    quizzes: [{ question: "下列关于支持向量的描述，正确的是？", options: ["A. 距离分类超平面最近的样本点决定了超平面位置", "B. 距离超平面最远的噪点"], answer: 0, explanation: "支持向量唯一决定超平面的斜率与偏置。" }],
    thinkingQuestion: "核函数映射如何避免高维空间中的维度灾难？",
    aiPrompt: "评估核技巧低维内积计算对高维映射的等价性，打分 0-10。"
  },
  "决策树": {
    theory: "### 决策树分裂特征选择\n通过递归地选择最佳分裂特征将数据集划分为纯度更高的子集。\n$$H(D) = -\\sum p_i \\log_2 p_i$$",
    latexFormulas: ["H(D) = -\\sum p_i \\log_2 p_i"],
    code: "import numpy as np\ndef calc_entropy(p: float) -> float:\n    # 待补全: 计算伯努利分布下概率为 p 时的二分类熵\n    pass",
    solution: "import numpy as np\ndef calc_entropy(p: float) -> float:\n    if p <= 0 or p >= 1: return 0.0\n    return float(-p * np.log2(p) - (1 - p) * np.log2(1 - p))",
    expected: "1.0",
    quizzes: [{ question: "ID3, C4.5 和 CART 三种决策树分裂标准分别是？", options: ["A. 信息增益、信息增益比、基尼指数", "B. 基尼指数、香农熵、方差归一"], answer: 0, explanation: "ID3基于信息增益，C4.5克服了增益偏向，CART使用Gini。" }],
    thinkingQuestion: "决策树后剪枝（Post-Pruning）与前剪枝（Pre-Pruning）在泛化控制上的区别？",
    aiPrompt: "评估过拟合控制与局部贪心划分，打分 0-10。"
  },
  "随机森林": {
    theory: "### 随机森林集成 Bagging\n通过自助采样 (Bootstrap) 构建多棵不相关的决策树并并行投票投票平均输出。\n$$y = \\frac{1}{B}\\sum_{b=1}^{B} f_b(x)$$",
    latexFormulas: ["y = \\frac{1}{B}\\sum_{b=1}^{B} f_b(x)"],
    code: "import numpy as np\ndef forest_aggregate(predictions: list) -> float:\n    # 待补全\n    pass",
    solution: "import numpy as np\ndef forest_aggregate(predictions: list) -> float:\n    return float(np.mean(predictions))",
    expected: "4.5",
    quizzes: [{ question: "随机森林引入的双重随机性是指？", options: ["A. 样本随机采样和特征随机选择", "B. 节点随机剪枝与学习率随机"], answer: 0, explanation: "每棵树都基于 Bootstrap 样本，且分裂特征从全部特征子集中随机选择。" }],
    thinkingQuestion: "为什么随机森林虽然深度很大，却通常能有效对抗过拟合？",
    aiPrompt: "评估 Bagging 降低模型方差 (Variance) 的数学机理，打分 0-10。"
  },
  "XGBoost": {
    theory: "### 梯度提升决策树 (GBDT) 极致变体\nXGBoost 在损失函数上进行二阶泰勒展开，同时在目标函数中加入显式正则项。\n$$\\text{Obj} \\approx \\sum [g_i f(x_i) + \\frac{1}{2} h_i f^2(x_i)] + \\gamma T + \\frac{1}{2}\\lambda w^2$$",
    latexFormulas: ["Obj \\approx \\sum [g_i f(x_i) + \\frac{1}{2} h_i f^2(x_i)]"],
    code: "def calc_leaf_weight(g_sum: float, h_sum: float, reg_lambda: float) -> float:\n    # 待补全: 计算叶子节点最优权重 w_j = -G_j / (H_j + lambda)\n    pass",
    solution: "def calc_leaf_weight(g_sum: float, h_sum: float, reg_lambda: float) -> float:\n    return -g_sum / (h_sum + reg_lambda)",
    expected: "-2.0",
    quizzes: [{ question: "XGBoost 优化目标中 g_i 和 h_i 的定义是？", options: ["A. 损失函数对当前预测值的一阶导与二阶导", "B. 样本的学习率权重"], answer: 0, explanation: "g_i和h_i为损失函数在当前残差处的一阶导和二阶偏导数。" }],
    thinkingQuestion: "XGBoost 与 LightGBM 在树生长策略（Level-wise vs Leaf-wise）上的本质差异？",
    aiPrompt: "评估划分策略、效率折中与直方图加速机制，打分 0-10。"
  },
  "KNN": {
    theory: "### K最近邻近算法 (KNN)\n基于空间距离度量，投票选择最邻近的 $K$ 个样本类别作为当前点的预测输出。\n$$d(x, y) = ||x - y||_2$$",
    latexFormulas: ["d(x, y) = ||x - y||_2"],
    code: "import numpy as np\ndef calc_distance(x: np.ndarray, y: np.ndarray) -> float:\n    # 待补全\n    pass",
    solution: "import numpy as np\ndef calc_distance(x: np.ndarray, y: np.ndarray) -> float:\n    return float(np.linalg.norm(x - y))",
    expected: "5.0",
    quizzes: [{ question: "KNN 算法中的 $K$ 值设置过小时，容易引发？", options: ["A. 模型过拟合，对噪声敏感", "B. 模型欠拟合，决策过于平滑"], answer: 0, explanation: "$K$ 越小决策边界越复杂，容易被异常孤立噪点带跑偏导致过拟合。" }],
    thinkingQuestion: "当数据集特征维度非常大时，KNN 在查找最近邻时面临的计算效率与空间瓶颈如何突破？",
    aiPrompt: "评估 KD 树、球树与局部敏感哈希 (LSH) 在近邻检索中的应用，打分 0-10。"
  },
  "K-Means聚类": {
    theory: "### K-Means 聚类中心划分\n无监督分割算法，迭代交替分配簇成员并更新中心位置。\n$$J = \\sum_{i=1}^{k} \\sum_{x \\in S_i} ||x - \\mu_i||^2$$",
    latexFormulas: ["J = \\sum_{i=1}^{k} \\sum_{x \\in S_i} ||x - \\mu_i||^2"],
    code: "import numpy as np\nfrom sklearn.cluster import KMeans\nclass KMeansClustering:\n    def fit(self, X: np.ndarray, k: int) -> np.ndarray:\n        # 待补全\n        pass",
    solution: "import numpy as np\nfrom sklearn.cluster import KMeans\nclass KMeansClustering:\n    def fit(self, X: np.ndarray, k: int) -> np.ndarray:\n        model = KMeans(n_clusters=k, random_state=42, n_init='auto')\n        model.fit(X)\n        return model.cluster_centers_",
    expected: "[3, 3]",
    quizzes: [{ question: "K-Means 的距离评估标准是？", options: ["A. 欧氏距离", "B. 余弦相似度"], answer: 0, explanation: "经典 K-Means 默认使用欧氏空间距离度量分配质心。" }],
    thinkingQuestion: "K-Means++ 的初始化质心选择思想是如何克服局部最优敏感性的？",
    aiPrompt: "评估首质心按概率分布彼此分离的设计，打分 0-10。"
  },
  "DBSCAN": {
    theory: "### 密度空间聚类 (DBSCAN)\n通过 ε-邻域与 MinPts 邻域定义核心点、边界点与噪声，能够识别任意形状的簇。\n$$N_{\\epsilon}(p) = \\{ q \\in D \\mid d(p, q) \\le \\epsilon \\}$$",
    latexFormulas: ["N_{\\epsilon}(p) = \\{ q \\in D \\mid d(p, q) \\le \\epsilon \\}"],
    code: "def is_core_point(neighbors_count: int, min_pts: int) -> bool:\n    # 待补全: 如果邻域内点数（含自身）大于等于 min_pts 则为核心点\n    pass",
    solution: "def is_core_point(neighbors_count: int, min_pts: int) -> bool:\n    return neighbors_count >= min_pts",
    expected: "True",
    quizzes: [{ question: "DBSCAN 相对于 K-Means 最突出的优点是？", options: ["A. 不需要预先指定聚类簇数，且能天然剔除噪点", "B. 执行速度显著快于一阶聚类"], answer: 0, explanation: "它基于密度流，自动聚成自然形状且有 Noise 分割机制。" }],
    thinkingQuestion: "DBSCAN 算法中两个超参数 $\\epsilon$ 与 MinPts 对应空间尺度的含义与调参思路？",
    aiPrompt: "评估密度连通与参数尺度的对应关系，打分 0-10。"
  },
  "层次聚类": {
    theory: "### 凝聚式分层树状聚类\n自底向上将每个点初始化为单独类，计算类间距离矩阵，逐步合并相似簇。\n$$d_{\\text{min}}(A, B) = \\min \\{ d(x, y) \\mid x \\in A, y \\in B \\}$$",
    latexFormulas: ["d_{\\text{min}}(A, B) = \\min \\{ d(x, y) \\}"],
    code: "import numpy as np\ndef min_linkage_distance(dist_matrix: np.ndarray) -> float:\n    # 待补全: 从对称距离矩阵（对角线为0，上三角有效）中提取簇间最近距离的极小值\n    pass",
    solution: "import numpy as np\ndef min_linkage_distance(dist_matrix: np.ndarray) -> float:\n    # 提取非零元素极小值\n    return float(np.min(dist_matrix[dist_matrix > 0]))",
    expected: "1.2",
    quizzes: [{ question: "层次聚类展示合并演进历史所使用的可视化工具是？", options: ["A. 树状图 (Dendrogram)", "B. 特征散点热图"], answer: 0, explanation: "Dendrogram 树状分裂图能直观展现每一次合流的阶段高度。" }],
    thinkingQuestion: "单链接（Single Linkage）和全链接（Complete Linkage）在应对链条效应（Chaining Effect）上的差异？",
    aiPrompt: "评估不同类间距计算准则对合并簇形状的影响，打分 0-10。"
  },
  "PCA主成分分析": {
    theory: "### 无监督主成分空间投影\n通过对特征协方差矩阵做特征值分解，将数据正交投影到方差最大的主成分方向。\n$$\\max_w \\quad w^T \\Sigma w \\quad s.t. \\quad w^T w = 1$$",
    latexFormulas: ["\\max_w \\quad w^T \\Sigma w"],
    code: "import numpy as np\ndef pca_project(X: np.ndarray, W: np.ndarray) -> np.ndarray:\n    # 待补全: 将数据矩阵 X 乘上变换权重投影矩阵 W 并返回\n    pass",
    solution: "import numpy as np\ndef pca_project(X: np.ndarray, W: np.ndarray) -> np.ndarray:\n    return np.dot(X, W)",
    expected: "[5.5]",
    quizzes: [{ question: "PCA 算法中最大化方差的目标物理意义是？", options: ["A. 尽量保留降维后投影数据点的信息离散度", "B. 强制消除非线性项"], answer: 0, explanation: "方差越大，说明投影后保留的数据特异性与分辨度越完整。" }],
    thinkingQuestion: "PCA 与线性判别分析 (LDA) 的最本质区别（监督性与优化目标）？",
    aiPrompt: "评估最大化方差 vs 最大化类间/类内方差比，打分 0-10。"
  },
  "特征标准化": {
    theory: "### Z-score 均值归零标准化\n消除物理量纲差异，使均值为 0，方差为 1，加速最优化收敛。\n$$z = \\frac{x - \\mu}{\\sigma}$$",
    latexFormulas: ["z = \\frac{x - \\mu}{\\sigma}"],
    code: "def standardize_val(x: float, mu: float, std: float) -> float:\n    # 待补全\n    pass",
    solution: "def standardize_val(x: float, mu: float, std: float) -> float:\n    return (x - mu) / std",
    expected: "2.0",
    quizzes: [{ question: "关于标准化，以下说法正确的是？", options: ["A. 它使各个维度的均值为 0，标准差为 1", "B. 它强行将所有数据压缩到 [0, 1]"], answer: 0, explanation: "标准Z-score变换将原始分布缩放到以0为均值，1为标准差的分布。" }],
    thinkingQuestion: "对于含有大量孤立异常噪点（Outliers）的数据集，为什么标准化通常比 Min-Max 归一化更稳健？",
    aiPrompt: "评估极值对尺度缩放鲁棒性的制约，打分 0-10。"
  },
  "数据归一化": {
    theory: "### 极差 Min-Max 归一化\n将原始特征的分布线性拉伸缩放到预定的数值开区间内，如 [0, 1]。\n$$x' = \\frac{x - x_{\\min}}{x_{\\max} - x_{\\min}}$$",
    latexFormulas: ["x' = \\frac{x - x_{\\min}}{x_{\\max} - x_{\\min}}"],
    code: "def min_max_normalize(x: float, x_min: float, x_max: float) -> float:\n    # 待补全\n    pass",
    solution: "def min_max_normalize(x: float, x_min: float, x_max: float) -> float:\n    return (x - x_min) / (x_max - x_min)",
    expected: "0.5",
    quizzes: [{ question: "归一化对神经网络最直接的好处是？", options: ["A. 统一尺度防权重偏移，加速求解", "B. 增加训练样本量"], answer: 0, explanation: "一致的尺度防止了某一维度权重梯度占比过大主导更新。" }],
    thinkingQuestion: "在机器学习流中，验证集/测试集做归一化时，应当使用谁的极值（Max/Min）？",
    aiPrompt: "评估测试集数据泄漏（Data Leakage）防范。必须只能使用训练集的元数据极值，打分 0-10。"
  }
};

// ==========================================
// STAGE 5: 深度学习 (7 subtopics)
// ==========================================
const STAGE_5_CONFIGS: Record<string, SubtopicConfig> = {
  "MLP多层感知机": {
    theory: "### 多层前馈感知机网络\n层级密连稠密投影。前向传播根据层权与偏置级联相乘求和。\n$$z^{[l]} = W^{[l]} a^{[l-1]} + b^{[l]}$$",
    latexFormulas: ["z^{[l]} = W^{[l]} a^{[l-1]} + b^{[l]}"],
    code: "import numpy as np\ndef mlp_linear_forward(W: np.ndarray, a_prev: np.ndarray, b: np.ndarray) -> np.ndarray:\n    # 待补全\n    pass",
    solution: "import numpy as np\ndef mlp_linear_forward(W: np.ndarray, a_prev: np.ndarray, b: np.ndarray) -> np.ndarray:\n    return np.dot(W, a_prev) + b",
    expected: "[4.5]",
    quizzes: [{ question: "若多层感知机没有激活函数的非线性映射，其等价于？", options: ["A. 只能退化为单一的单层线性回归器", "B. 无法构建计算图"], answer: 0, explanation: "多层线性矩阵连续点乘仍是一个单一的线性映射矩阵。" }],
    thinkingQuestion: "MLP 的万能逼近定理（Universal Approximation Theorem）说的是什么？",
    aiPrompt: "评估单隐层前馈网络在神经元数量足够时对任意连续函数的逼近界，打分 0-10。"
  },
  "激活函数与梯度消失": {
    theory: "### 激活饱和区与梯度消失\nSigmoid/Tanh 在输入过大或过小时偏导导数极小，引发深层链式偏导乘积消失。\n$$\\sigma'(z) = \\sigma(z) \\cdot (1 - \\sigma(z))$$",
    latexFormulas: ["\\sigma'(z) = \\sigma(z)(1 - \\sigma(z))"],
    code: "def get_sigmoid_grad(out_y: float) -> float:\n    # 待补全\n    pass",
    solution: "def get_sigmoid_grad(out_y: float) -> float:\n    return out_y * (1.0 - out_y)",
    expected: "0.24",
    quizzes: [{ question: "为什么深层神经网络偏向使用 ReLU 激活函数？", options: ["A. 在正数区其导数恒为 1，完全缓解梯度消失", "B. 其输出是有界的"], answer: 0, explanation: "ReLU 导数在正半轴为 1，防止链式相乘乘积无限缩小。" }],
    thinkingQuestion: "Dead ReLU（神经元坏死）现象是如何发生的？有什么改进版激活函数能解决？",
    aiPrompt: "评估负激活区域权重归零及 Leaky ReLU/ELU 对此的改进，打分 0-10。"
  },
  "损失函数": {
    theory: "### 二分类与多分类损失\n交叉熵计算预测条件分布与真实标签分布的 KL 散度距离。\n$$L = -\\sum_{i=1}^{C} y_i \\log \\hat{y}_i$$",
    latexFormulas: ["L = -\\sum_{i=1}^{C} y_i \\log \\hat{y}_i"],
    code: "import numpy as np\ndef compute_cross_entropy(y_true: np.ndarray, y_pred: np.ndarray) -> float:\n    # 待补全\n    pass",
    solution: "import numpy as np\ndef compute_cross_entropy(y_true: np.ndarray, y_pred: np.ndarray) -> float:\n    return -float(np.sum(y_true * np.log(y_pred)))",
    expected: "0.3566749",
    quizzes: [{ question: "回归预测和分类预测各自最常用的损失函数是？", options: ["A. MSE 与 交叉熵", "B. Hinge 损失与 Huber 损失"], answer: 0, explanation: "MSE度量物理差值，交叉熵度量条件分类概率逼近。" }],
    thinkingQuestion: "为什么在分类任务中，交叉熵损失通常比均方误差 (MSE) 损失收敛更快？",
    aiPrompt: "评估 MSE 梯度更新受 Sigmoid 饱和区导数控制引起的迟钝现象，打分 0-10。"
  },
  "反向传播": {
    theory: "### 反向传播误差传递\n通过多维微积分的链式求导，将顶层损失误差向底层各隐藏层矩阵分发。\n$$\\delta^{[l]} = \\left( W^{[l+1]T} \\delta^{[l+1]} \\right) \\odot g'(z^{[l]})$$",
    latexFormulas: ["\\delta^{[l]} = ( W^{[l+1]T} \\delta^{[l+1]} ) \\odot g'(z^{[l]})"],
    code: "import numpy as np\ndef backprop_error_pass(next_delta: np.ndarray, W: np.ndarray) -> np.ndarray:\n    # 待补全: 计算不含激活偏导的上一层传递误差量 W^T * delta\n    pass",
    solution: "import numpy as np\ndef backprop_error_pass(next_delta: np.ndarray, W: np.ndarray) -> np.ndarray:\n    return np.dot(W.T, next_delta)",
    expected: "[4.5]",
    quizzes: [{ question: "反向传播在本质上是微积分中哪个法则的应用？", options: ["A. 链式法则 (Chain Rule)", "B. 分部积分法"], answer: 0, explanation: "通过导数链条逐级相乘传递误差。" }],
    thinkingQuestion: "在计算图中，如何理解自前向传播的‘值保留’机制对于反向传播求导性能的核心支撑作用？",
    aiPrompt: "评估前向传播时隐层激活值缓存（Cache）对反向求导计算的意义，打分 0-10。"
  },
  "SGD与Adam优化器": {
    theory: "### 梯度自适应更新优化器\nAdam 优化器使用一阶动量抗震荡，二阶自适应学习率调节平缓步长。\n$$m_t = \\beta_1 m_{t-1} + (1-\\beta_1)g_t$$",
    latexFormulas: ["m_t = \\beta_1 m_{t-1} + (1-\\beta_1)g_t"],
    code: "def update_first_momentum(m_prev: float, g: float, beta1: float) -> float:\n    # 待补全\n    pass",
    solution: "def update_first_momentum(m_prev: float, g: float, beta1: float) -> float:\n    return beta1 * m_prev + (1 - beta1) * g",
    expected: "0.19",
    quizzes: [{ question: "优化器中引入动量（Momentum）项的主要物理作用是？", options: ["A. 抑制参数迭代更新方向振荡，加速越过局小马鞍点", "B. 物理改变模型复杂度"], answer: 0, explanation: "动量累计历史梯度速度，帮助走出局部平台。" }],
    thinkingQuestion: "Adam 的偏差修正（Bias Correction）为什么只在训练初始的若干 Step 显著发挥作用？",
    aiPrompt: "评估指数加权移动平均在初始项缺失引起的冷启动纠偏数学原理，打分 0-10。"
  },
  "Batch Normalization": {
    theory: "### 批特征标准化 (BN)\n消除各层内部协变量偏移，稳定输入分布，支持大步长参数更新加速收敛。\n$$\\hat{x} = \\frac{x - \\mu}{\\sqrt{\\sigma^2 + \\epsilon}}$$",
    latexFormulas: ["\\hat{x} = \\frac{x - \\mu}{\\sqrt{\\sigma^2 + \\epsilon}}"],
    code: "import numpy as np\ndef bn_scale(x: float, mu: float, var: float, eps: float) -> float:\n    # 待补全\n    pass",
    solution: "import numpy as np\ndef bn_scale(x: float, mu: float, var: float, eps: float) -> float:\n    return (x - mu) / np.sqrt(var + eps)",
    expected: "2.0",
    quizzes: [{ question: "Batch Normalization 在训练和推理（Test）时，均值均值的计算区别是？", options: ["A. 训练时采用 Mini-batch 内部统计，推理时采用移动平均累积得到的全局均值", "B. 完全一致"], answer: 0, explanation: "推理时需要静态确定性特征，使用全局运行均值/方差。" }],
    thinkingQuestion: "层归一化 (Layer Normalization) 与批归一化 (Batch Normalization) 提取维度的数学差异？为什么 Transformer 多采用 LN？",
    aiPrompt: "评估 LN 针对 Batch 和 Feature 各轴方向计算的区别及对变长文本处理的适应度，打分 0-10。"
  },
  "Dropout正则化": {
    theory: "### 神经元随机失活 (Dropout)\n训练时按概率 $p$ 随机断开隐层连接，防止共适应性，起集成泛化作用。\n$$a_{\\text{drop}} = \\frac{a \\odot r}{1 - p}$$",
    latexFormulas: ["a_{drop} = \\frac{a \\odot r}{1 - p}"],
    code: "import numpy as np\ndef inverted_dropout(a: np.ndarray, mask: np.ndarray, p: float) -> np.ndarray:\n    # 待补全\n    pass",
    solution: "import numpy as np\ndef inverted_dropout(a: np.ndarray, mask: np.ndarray, p: float) -> np.ndarray:\n    return (a * mask) / (1.0 - p)",
    expected: "[2. 0. 6.]",
    quizzes: [{ question: "为什么 Dropout 会在除以 (1-p) 时进行 Inverted 操作？", options: ["A. 为了保持训练与测试时隐层神经元输出期望的一致性，省去测试时的缩放", "B. 增加激活强度"], answer: 0, explanation: "反向随机失活使测试阶段无需再乘 (1-p) 调整权值尺度。" }],
    thinkingQuestion: "Dropout 在神经网络中作为集成学习（Ensemble）的一种隐含解释是什么？",
    aiPrompt: "评估随机子网络拟合共享权值的多合一集成解释，打分 0-10。"
  }
};

// ==========================================
// STAGE 6: 计算机视觉 (8 subtopics)
// ==========================================
const STAGE_6_CONFIGS: Record<string, SubtopicConfig> = {
  "图像滤波与增强": {
    theory: "### 图像滤波与增强\n利用卷积核（Kernel）在图像上进行滑动窗口乘积求和，以实现降噪或边缘提取。\n$$g(x, y) = \\sum_{i=-k}^{k} \\sum_{j=-k}^{k} f(x-i, y-j) \\cdot h(i, j)$$",
    latexFormulas: ["g(x, y) = \\sum f(x-i, y-j) h(i, j)"],
    code: "import numpy as np\ndef test_conv(x: np.ndarray, k: np.ndarray) -> float:\n    # 待补全: 3x3 图像块元素对位相乘并求和\n    pass",
    solution: "import numpy as np\ndef test_conv(x: np.ndarray, k: np.ndarray) -> float:\n    return float(np.sum(x * k))",
    expected: "12.0",
    quizzes: [{ question: "高斯滤波核常用来滤除什么噪声？", options: ["A. 随机高斯高斯底噪与高频随机噪声", "B. 物理划痕噪声"], answer: 0, explanation: "高斯滤波器是一种低通线性滤波器，能平滑去除图像随机起伏底噪。" }],
    thinkingQuestion: "均值滤波与中值滤波在去除椒盐噪声（Salt & Pepper Noise）时的效果差异与物理机制？",
    aiPrompt: "评估中值滤波排序去极值点对孤立异常坏点的强抗噪性，打分 0-10。"
  },
  "边缘检测 (Canny)": {
    theory: "### Canny 边缘检测算子\n通过计算图像灰度梯度的幅值和方向，利用非极大值抑制和双阈值算法确定精确边缘特征。\n$$G = \\sqrt{G_x^2 + G_y^2}$$",
    latexFormulas: ["G = \\sqrt{G_x^2 + G_y^2}"],
    code: "import numpy as np\ndef get_grad_magnitude(gx: float, gy: float) -> float:\n    # 待补全\n    pass",
    solution: "import numpy as np\ndef get_grad_magnitude(gx: float, gy: float) -> float:\n    return float(np.sqrt(gx**2 + gy**2))",
    expected: "5.0",
    quizzes: [{ question: "Canny 算法中双阈值检测（Hysteresis Thresholding）的作用是？", options: ["A. 连通边缘：利用高阈值锚定强边缘，低阈值延伸弱边缘线", "B. 增加颜色亮度"], answer: 0, explanation: "双阈值检测能保证弱边缘线如果与强强边缘线相连则被保留，否则被视为噪声滤除。" }],
    thinkingQuestion: "非极大值抑制（NMS）在 Canny 边缘检测中的物理作用是什么？",
    aiPrompt: "评估梯度法线方向局部极值筛选，实现边缘线条变细变窄，打分 0-10。"
  },
  "色彩空间转换": {
    theory: "### 色彩空间维度映射\n常用的 RGB、HSV 与灰度空间（Grayscale）具有不同的颜色表达维度特征。\n$$Y = 0.299R + 0.587G + 0.114B$$",
    latexFormulas: ["Y = 0.299R + 0.587G + 0.114B"],
    code: "def rgb_to_grayscale(r: float, g: float, b: float) -> float:\n    # 待补全\n    pass",
    solution: "def rgb_to_grayscale(r: float, g: float, b: float) -> float:\n    return round(0.299 * r + 0.587 * g + 0.114 * b, 2)",
    expected: "128.9",
    quizzes: [{ question: "在目标分割或颜色提取任务中，相比 RGB，为什么常选用 HSV 空间？", options: ["A. HSV 空间的 H 轴（色调）将颜色属性分离，不易受光照强度明暗干扰", "B. HSV 存储内存小"], answer: 0, explanation: "RGB 三通道高度关联，而 HSV 解耦了亮度和纯色分量。" }],
    thinkingQuestion: "如何理解 RGB 与 YCrCb 空间的转换及其在视频流硬件编解码压缩中的应用？",
    aiPrompt: "评估亮度和色度分离采样压缩的工程考虑，打分 0-10。"
  },
  "SIFT特征提取": {
    theory: "### 尺度无关特征变换 (SIFT)\n构建高斯尺度空间差分（DoG），提取在平移、旋转及缩放变化下均保持稳定的局部特征点。\n$$D(x, y, \\sigma) = L(x, y, k\\sigma) - L(x, y, \\sigma)$$",
    latexFormulas: ["D(x, y, \\sigma) = L(x, y, k\\sigma) - L(x, y, \\sigma)"],
    code: "import numpy as np\ndef calc_dog_space(octave_k: np.ndarray, octave_1: np.ndarray) -> np.ndarray:\n    # 待补全: 计算 DoG 差分特征图\n    pass",
    solution: "import numpy as np\ndef calc_dog_space(octave_k: np.ndarray, octave_1: np.ndarray) -> np.ndarray:\n    return octave_k - octave_1",
    expected: "[1. 1.]",
    quizzes: [{ question: "SIFT 特征点所具备的主要鲁棒性是？", options: ["A. 对图像的平移、旋转、缩放比例等具备不变性，对光照和视角稳定", "B. 只能对黑白图生效"], answer: 0, explanation: "SIFT通过方向直方图和尺度金字塔描述子实现了极强的不变性。" }],
    thinkingQuestion: "DoG (Difference of Gaussians) 是如何近似 LoG (Laplacian of Gaussian) 以大幅降低尺度计算开销的？",
    aiPrompt: "评估尺度空间图像相减近似二阶偏导数导数的数学近似关系，打分 0-10。"
  },
  "LeNet/ResNet分类": {
    theory: "### 残差学习与卷积演进\n随着网络加深易发生梯度退化。ResNet 引入恒等残差跨越连接解决该瓶颈。\n$$H(x) = F(x) + x$$",
    latexFormulas: ["H(x) = F(x) + x"],
    code: "import numpy as np\ndef residual_block_add(fx: np.ndarray, x: np.ndarray) -> np.ndarray:\n    # 待补全\n    pass",
    solution: "import numpy as np\ndef residual_block_add(fx: np.ndarray, x: np.ndarray) -> np.ndarray:\n    return fx + x",
    expected: "[5. 5.]",
    quizzes: [{ question: "残差连接（Skip Connection）解决深层神经网络问题的本质是？", options: ["A. 在反向传播中提供恒等求导的 1 因子，防止多层连续乘梯度消失", "B. 降低参数计算量"], answer: 0, explanation: "导数链中残差通路使得浅层参数可以直接收到顶层误差流的拉动。" }],
    thinkingQuestion: "瓶颈残差结构（Bottleneck Block）在 ResNet-50 及其更深层模型中是如何起到降参降参作用的？",
    aiPrompt: "评估 1x1 卷积升降维控制参数密度的工程优化，打分 0-10。"
  },
  "目标检测 (YOLO)": {
    theory: "### 一阶段目标检测与回归\nYOLO 将检测重构为单个回归任务，网格一次前向计算即完成目标定位与分类。\n$$\\text{IoU} = \\frac{\\text{Area of Overlap}}{\\text{Area of Union}}$$",
    latexFormulas: ["IoU = \\frac{Area\\ of\\ Overlap}{Area\\ of\\ Union}"],
    code: "def calc_simple_iou(overlap: float, size_a: float, size_b: float) -> float:\n    # 待补全: 计算 IoU 比例\n    pass",
    solution: "def calc_simple_iou(overlap: float, size_a: float, size_b: float) -> float:\n    union = size_a + size_b - overlap\n    return round(overlap / union, 2)",
    expected: "0.5",
    quizzes: [{ question: "非极大值抑制（NMS）在 YOLO 推理阶段的用途是？", options: ["A. 滤除对同一个目标重复预测的冗余多余边界框，只保留置信度最高的一个", "B. 提高图像对比度"], answer: 0, explanation: "NMS利用 IoU 大小判定多个候选框的冗余程度，保留最优回归框。" }],
    thinkingQuestion: "YOLO 中 Anchor Box（锚框）机制的物理作用以及在最新 YOLO 版本中如何向 Anchor-free 演进？",
    aiPrompt: "评估多类别多中心点特征直接回归与先验比例框的差异，打分 0-10。"
  },
  "图像分割 (U-Net)": {
    theory: "### 编解码医学图像分割\nU-Net 具备经典的 U 形对称结构，通过跳跃连接将浅层细节拼接到深层语义以实现高精分割。\n$$x_{\\text{dec}} = \\text{Concat}\\left( x_{\\text{dec}}, \\; x_{\\text{enc}} \\right)$$",
    latexFormulas: ["x_{dec} = Concat(x_{dec}, x_{enc})"],
    code: "import numpy as np\ndef unet_skip_concat(decoder_feat: np.ndarray, encoder_feat: np.ndarray) -> np.ndarray:\n    # 待补全\n    pass",
    solution: "import numpy as np\ndef unet_skip_concat(decoder_feat: np.ndarray, encoder_feat: np.ndarray) -> np.ndarray:\n    return np.concatenate([decoder_feat, encoder_feat], axis=-1)",
    expected: "[[1. 2.]]",
    quizzes: [{ question: "U-Net 中的跳跃连接（Skip Connection）是沿哪个轴拼接特征图的？", options: ["A. 沿通道维度（Channel Axis）进行 Concat 堆叠拼接", "B. 沿长宽物理空间求和"], answer: 0, explanation: "U-Net通过在 Channel 轴上拼接保留了大量的局部空间位置高频特征。" }],
    thinkingQuestion: "转置卷积（Transposed Convolution）与双线性上采样在 U-Net 译码器路径中的差异？",
    aiPrompt: "评估可学习权重插值与静态线性插值在生成分割边界处的表现区别，打分 0-10。"
  },
  "SAM分割大模型": {
    theory: "### 提示引导通用分割大模型\nSegment Anything (SAM) 通过基于 Prompt（点、框、文本）引导的视觉自注意力解码器，实现零样本泛化分割。\n$$P(\\text{Mask} \\mid I, \\; \\text{Prompt})$$",
    latexFormulas: ["P(Mask \\mid I, Prompt)"],
    code: "def is_valid_mask_score(iou_score: float) -> bool:\n    # 待补全: 如果分割置信度大于等于 0.8 则认为有效\n    pass",
    solution: "def is_valid_mask_score(iou_score: float) -> bool:\n    return iou_score >= 0.8",
    expected: "True",
    quizzes: [{ question: "SAM 大模型的核心架构组成包含？", options: ["A. 重型图像编码器(ViT)、轻量提示词编码器、双向交叉注意力分割掩码解码器", "B. 纯 CNN 特征层"], answer: 0, explanation: "SAM 利用超大 ViT 提取全局特征，再基于轻量解码器响应用户的交互式提示指令。" }],
    thinkingQuestion: "SAM 在处理“分割多义性”（如点选了背包是分割包带还是整体）时，是如何输出三种不同层级的掩码结果的？",
    aiPrompt: "评估其多分支解码输出并预测各自置信度排名的多路生成设计，打分 0-10。"
  }
};

// ==========================================
// STAGE 7: 自然语言处理 (8 subtopics)
// ==========================================
const STAGE_7_CONFIGS: Record<string, SubtopicConfig> = {
  "分词与词性标注": {
    theory: "### 文本分词边界切分\n将连续文本切分为有意义词汇。切分算法基于词典及最大正向匹配逻辑。\n$$\\text{Text} \\rightarrow \\{ w_1, w_2, \\dots, w_n \\}$$",
    latexFormulas: ["Text \\rightarrow \\{ w_1, w_2, \\dots \\}"],
    code: "def get_word_list(text: str) -> list:\n    # 待补全: 以空格为切分线返回词汇列表\n    pass",
    solution: "def get_word_list(text: str) -> list:\n    return text.strip().split()",
    expected: "['hello', 'world']",
    quizzes: [{ question: "中文分词面临的两个最核心难题是？", options: ["A. 歧义切分与未登录词识别", "B. 大小写敏感变换"], answer: 0, explanation: "词语边界模糊导致不同切分逻辑含义迥异，而新词则无法命中词典。" }],
    thinkingQuestion: "基于隐马尔可夫模型 (HMM) 进行序列词性标注时的维特比算法 (Viterbi) 计算原理？",
    aiPrompt: "评估动态规划求解最可能状态路径的计算复杂度与最优子结构，打分 0-10。"
  },
  "TF-IDF特征": {
    theory: "### 词频-逆文档频率特征\n评估一个词在整包文档集合中的重要性占比权重指标。\n$$\\text{TF-IDF} = \\text{TF} \\times \\log \\frac{N}{\\text{DF} + 1}$$",
    latexFormulas: ["\\text{TF-IDF} = \\text{TF} \\times \\log \\frac{N}{\\text{DF}}"],
    code: "import numpy as np\ndef calc_tfidf(tf: float, N: int, df: int) -> float:\n    # 待补全\n    pass",
    solution: "import numpy as np\ndef calc_tfidf(tf: float, N: int, df: int) -> float:\n    return round(tf * np.log10(N / (df + 1)), 4)",
    expected: "0.3398",
    quizzes: [{ question: "如果一个词在所有文档中都频繁出现，它的 IDF 值将趋向于？", options: ["A. 接近于 0", "B. 趋近于无穷大"], answer: 0, explanation: "所有文档都出现的词语不具备区隔分类信息的特异性，其分子分母一致，对数值趋于0。" }],
    thinkingQuestion: "TF-IDF 空间表征文本的主要弊端是什么？它如何丢失了上下文词序关系？",
    aiPrompt: "评估词袋模型（Bag of Words）只计数不考虑结构、近义词语义缺失问题，打分 0-10。"
  },
  "Word2Vec词向量": {
    theory: "### 分布式词汇语义表征\n通过双层浅网络在上下文滑动窗口预测中间词或周边词，映射为稠密向量特征。\n$$\\text{Sim}(u, v) = \\frac{u \\cdot v}{||u||_2 \\cdot ||v||_2}$$",
    latexFormulas: ["Sim(u, v) = \\frac{u \\cdot v}{||u||_2 ||v||_2}"],
    code: "import numpy as np\ndef get_vec_sim(u: np.ndarray, v: np.ndarray) -> float:\n    # 待补全\n    pass",
    solution: "import numpy as np\ndef get_vec_sim(u: np.ndarray, v: np.ndarray) -> float:\n    return float(np.dot(u, v) / (np.linalg.norm(u) * np.linalg.norm(v)))",
    expected: "1.0",
    quizzes: [{ question: "Word2Vec 包含的两种核心预训练模型架构是？", options: ["A. CBOW (上下文预测中间) 与 Skip-gram (中间预测上下文)", "B. 编码器与解码器"], answer: 0, explanation: "CBOW 适合小规模数据，Skip-gram 在海量数据词义泛化上更强。" }],
    thinkingQuestion: "负采样（Negative Sampling）在 Word2Vec 训练中是如何优化 Softmax 巨大参数量的？",
    aiPrompt: "评估仅更新少量目标词与特定噪点词对应权重的加速机制，打分 0-10。"
  },
  "BERT预训练模型": {
    theory: "### 双向 Transformer 预训练\n利用掩码语言模型（MLM）和下句预测（NSP）自大规模文本中预训练深度双向表征特征。\n$$P\\left( w_i \\mid w_{1}, \\dots, w_{i-1}, w_{i+1}, \\dots, w_n \\right)$$",
    latexFormulas: ["P(w_i \\mid w_{\\backslash i})"],
    code: "def get_mask_loss_weight(is_mask: bool) -> float:\n    # 待补全: 如果当前 Token 是 MASK 状态，才计算损失，返回权重 1.0，否则为 0\n    pass",
    solution: "def get_mask_loss_weight(is_mask: bool) -> float:\n    return 1.0 if is_mask else 0.0",
    expected: "1.0",
    quizzes: [{ question: "BERT 在掩码预训练中，[MASK] 替换策略的设定是？", options: ["A. 80% 替换为 MASK，10% 随机词，10% 保持原词", "B. 100% 强行抹去"], answer: 0, explanation: "该混合策略的目的是防止模型在微调（下游没有MASK）时出现表达失衡偏差。" }],
    thinkingQuestion: "为什么 BERT 在执行下游生成任务（如文本翻译）时力不从心？",
    aiPrompt: "评估自编码（Autoencoding）掩码预测与自回归序列解码翻译生成的结构差异，打分 0-10。"
  },
  "LSTM/GRU序列建模": {
    theory: "### 长短时记忆循环神经网络\n通过遗忘门、输入门与输出门机制传递长时记忆，规避循环梯度爆炸。\n$$f_t = \\sigma\\left( W_f \\cdot x_t + U_f \\cdot h_{t-1} + b_f \\right)$$",
    latexFormulas: ["f_t = \\sigma( W_f x_t + U_f h_{t-1} + b_f )"],
    code: "import numpy as np\ndef lstm_forget_gate(x: float, h_prev: float, w: float, u: float, b: float) -> float:\n    # 待补全\n    pass",
    solution: "import numpy as np\ndef lstm_forget_gate(x: float, h_prev: float, w: float, u: float, b: float) -> float:\n    z = w * x + u * h_prev + b\n    return float(1.0 / (1.0 + np.exp(-z)))",
    expected: "0.5",
    quizzes: [{ question: "LSTM 内部状态 Cell State 与 Hidden State 传递的最关键差异是？", options: ["A. Cell State 沿直线进行点对点加法线性流，梯度在传递时几乎没有乘积衰减", "B. 完全一致"], answer: 0, explanation: "Cell 状态是线性加法管道；Hidden 状态有非线性门控阻断。" }],
    thinkingQuestion: "门控循环单元 (GRU) 相较于 LSTM 简化了哪些门？参数有什么变化？",
    aiPrompt: "评估合并了输入和遗忘门为更新门（Update Gate）、精简重置门（Reset Gate）的机制，打分 0-10。"
  },
  "Self-Attention自注意力": {
    theory: "### 空间词对自注意力映射\n通过 Query, Key, Value 矩阵交叉点积计算两两距离以建立长依赖关系。\n$$\\text{Attention}(Q, K, V) = \\text{softmax}\\left( \\frac{Q K^T}{\\sqrt{d_k}} \\right) V$$",
    latexFormulas: ["Attention(Q, K, V) = softmax(\\frac{Q K^T}{\\sqrt{d_k}}) V"],
    code: "import numpy as np\ndef attention_scores(Q: np.ndarray, K: np.ndarray) -> np.ndarray:\n    # 待补全: 计算 Q K^T 点积注意力得分矩阵\n    pass",
    solution: "import numpy as np\ndef attention_scores(Q: np.ndarray, K: np.ndarray) -> np.ndarray:\n    return np.dot(Q, K.T)",
    expected: "[[5.]]",
    quizzes: [{ question: "为什么点积计算后要除以系数 $\\sqrt{d_k}$ 进行缩放？", options: ["A. 避免在大维度下数值过大导致 Softmax 进入偏导极小的饱和区，防梯度消失", "B. 增加计算量"], answer: 0, explanation: "方差变大导致 Softmax 概率过度分化到 1 或 0 附近，导数归零。" }],
    thinkingQuestion: "自注意力机制（Self-Attention）与循环神经网络在并行计算效率和长距离信息流转上的核心差异？",
    aiPrompt: "评估 $O(1)$ 长程穿透及全序列并发计算与 $O(N)$ 时序串行传递的对比，打分 0-10。"
  },
  "多头注意力机制": {
    theory: "### 多头空间表征映射\n通过多组 Q/K/V 参数矩阵映射，使模型在不同投影空间内关注各异层级的上下文。\n$$\\text{MultiHead}(Q, K, V) = \\text{Concat}(\\text{head}_1, \\dots, \\text{head}_h) W^O$$",
    latexFormulas: ["MultiHead(Q, K, V) = Concat(head_1, \\dots, head_h) W^O"],
    code: "import numpy as np\ndef concat_attention_heads(head1: np.ndarray, head2: np.ndarray) -> np.ndarray:\n    # 待补全: 将两个特征头矩阵沿通道列方向（最后一个维度）进行 Concat 拼接\n    pass",
    solution: "import numpy as np\ndef concat_attention_heads(head1: np.ndarray, head2: np.ndarray) -> np.ndarray:\n    return np.concatenate([head1, head2], axis=-1)",
    expected: "[[1. 2.]]",
    quizzes: [{ question: "多头注意力主要赋予了模型什么能力？", options: ["A. 能够同时从不同的投影表示子空间去捕捉语义关联和代词指代", "B. 减少显存消耗"], answer: 0, explanation: "每个“头”可以使用各自的投影矩阵捕获不同维度的特征（如指代关系、定语从句等）。" }],
    thinkingQuestion: "在多头自注意力层中，如何从张量变形（Tensor Reshape）和维度切分的视角实现没有开销的多头并行矩阵相乘计算？",
    aiPrompt: "评估利用 batch 轴进行多头拆分并置的工程计算技巧，打分 0-10。"
  },
  "编码与解码器": {
    theory: "### Seq2Seq 自回归翻译生成\n编码器提取全局语义，解码器根据交叉注意力机制和先前 Token 自回归输出下一个词。\n$$P\\left( y_t \\mid y_{<t}, \\; X \\right)$$",
    latexFormulas: ["P(y_t \\mid y_{<t}, X)"],
    code: "def build_next_token_input(history_tokens: list, next_predicted: str) -> list:\n    # 待补全: 在解码输入历史列表中追加新生成的单词\n    pass",
    solution: "def build_next_token_input(history_tokens: list, next_predicted: str) -> list:\n    return history_tokens + [next_predicted]",
    expected: "['hi', 'ai']",
    quizzes: [{ question: "自回归解码器（Decoder-only）在训练时能并行计算，是因为应用了什么？", options: ["A. 因果遮蔽机制（Causal/Masked Attention）阻止关注未来词", "B. 它不需要梯度回传"], answer: 0, explanation: "利用下三角掩码遮蔽未来上下文，使教师迫近（Teacher Forcing）训练可并行处理。" }],
    thinkingQuestion: "在 Decoder-only 架构中，KV Cache（键值缓存）是如何减少推理时的多余计算量的？",
    aiPrompt: "评估缓存先前 Token 的 K 和 V 矩阵对于省略历史自注意力重复点积的核心价值，打分 0-10。"
  }
};

// ==========================================
// STAGE 8: 大模型（LLM） (12 subtopics)
// ==========================================
const STAGE_8_CONFIGS: Record<string, SubtopicConfig> = {
  "Few-shot提示": {
    theory: "### 大模型上下文小样本微调\n无需调整神经网络参数，仅通过在输入提示词中附带少量高质量的“输入-输出”示例，唤醒模型推理分布。\n$$P\\left( y \\mid x, \\; \\mathcal{D}_{\\text{examples}} \\right)$$",
    latexFormulas: ["P(y \\mid x, \\mathcal{D}_{examples})"],
    code: "def format_few_shot_prompt(examples: list, query: str) -> str:\n    # 待补全: 拼接示例与 query 返回提示词文本\n    pass",
    solution: "def format_few_shot_prompt(examples: list, query: str) -> str:\n    text = \"\\n\".join([f\"Q: {e['q']}\\nA: {e['a']}\" for e in examples])\n    return f\"{text}\\nQ: {query}\\nA:\"",
    expected: "Q: 1+1\\nA: 2\\nQ: 2+2\\nA:",
    quizzes: [{ question: "Few-shot 机制（In-context Learning）的物理本质是？", options: ["A. 利用大模型的条件概率推理，不更新底层神经网络的任何参数", "B. 执行小批量的权重微调"], answer: 0, explanation: "它仅仅是在推理（Inference）阶段引导上下文注意力计算，未改变模型参数。" }],
    thinkingQuestion: "为什么大模型在样本数量（Exemplars）非常多时（例如 100-shot），其预测表现可能会遇到瓶颈，或者呈现注意力漂移？",
    aiPrompt: "评估上下文注意力丢失与长依赖长文本干扰，打分 0-10。"
  },
  "CoT链式思维": {
    theory: "### 链式思维 (Chain of Thought, CoT)\n通过促使大模型生成一系列中间推理步骤，来显著提高其解决复杂数学、逻辑推理和符号处理任务的能力。\n$$P(\\text{Answer} \\mid \\text{Question}, Z) \\cdot P(Z \\mid \\text{Question})$$",
    latexFormulas: ["P(Answer \\mid Question, Z)"],
    code: "class CoTPromptBuilder:\n    def build_cot_prompt(self, question: str) -> str:\n        # 待补全\n        pass",
    solution: "class CoTPromptBuilder:\n    def build_cot_prompt(self, question: str) -> str:\n        return f\"{question}\\n让我们一步一步思考并给出中间逻辑推理步骤：\"",
    expected: "让我们一步一步思考并给出中间逻辑推理步骤：",
    quizzes: [{ question: "为什么 CoT 可以提高逻辑推理的计算准确率？", options: ["A. 它使模型将计算分布到多个推理 Token 上，减轻了单 Token 预测的压力", "B. 它是通过外部编译器编译运行验证的"], answer: 0, explanation: "增加推理轨迹 Token，为注意力机制提供了计算缓冲空间。" }],
    thinkingQuestion: "零样本链式思维 (Zero-shot CoT) 和少样本链式思维 (Few-shot CoT) 的区别与各自的使用场景是什么？",
    aiPrompt: "考点：1. Zero-shot CoT 提示词魔法；2. Few-shot CoT 模板化多示例指引，打分 0-10。"
  },
  "ReAct框架": {
    theory: "### 大模型推理与外部动作协同\nReAct 将 Thought（推理思考）与 Action（执行外部工具动作）结合，迭代循环完成复杂逻辑目标。\n$$\\text{Thought} \\rightarrow \\text{Action} \\rightarrow \\text{Observation} \\rightarrow \\text{Thought}$$",
    latexFormulas: ["Thought \\rightarrow Action \\rightarrow Observation"],
    code: "def build_react_agent_output(thought: str, action: str, params: str) -> str:\n    # 待补全: 格式化返回 Agent 的 Thought 和 Action 调用格式\n    pass",
    solution: "def build_react_agent_output(thought: str, action: str, params: str) -> str:\n    return f\"Thought: {thought}\\nAction: {action}[{params}]\"",
    expected: "Thought: check weather\\nAction: get_weather[Beijing]",
    quizzes: [{ question: "ReAct 核心解决的最关键问题是？", options: ["A. 大模型无法感知外部实时环境、无法调用外界 API 并将结果合流的短板", "B. 代码格式对齐"], answer: 0, explanation: "它规范了模型进行‘推理-规划-执行工具-解析观测-重新决策’的闭环流程。" }],
    thinkingQuestion: "在 ReAct 循环中，若外部工具返回了异常（Error / Exception），如何设计提示词以促使模型自动纠错（Self-Correction）？",
    aiPrompt: "评估将异常信息加入 Observation 激发反思纠错的思路，打分 0-10。"
  },
  "LoRA轻量化微调": {
    theory: "### 大模型轻量级参数微调 (LoRA)\n保持原有重型骨干模型参数冻结，在旁路引入两个低秩乘积降维与升维可训练矩阵。\n$$\\Delta W = B \\cdot A$$",
    latexFormulas: ["\\Delta W = B \\cdot A"],
    code: "import numpy as np\ndef compute_lora_delta(A: np.ndarray, B: np.ndarray, alpha: float, r: int) -> np.ndarray:\n    # 待补全: 计算低秩权重更新 delta = (B * A) * (alpha / r)\n    pass",
    solution: "import numpy as np\ndef compute_lora_delta(A: np.ndarray, B: np.ndarray, alpha: float, r: int) -> np.ndarray:\n    return np.dot(B, A) * (alpha / r)",
    expected: "[[4.]]",
    quizzes: [{ question: "LoRA 微调对显存消耗极低的最主要因素是？", options: ["A. 绝大多数底层参数冻结，反向传播只需计算极少旁支参数的梯度并缓存", "B. 使用了模型剪枝技术"], answer: 0, explanation: "冻结参数无需保存大量的一阶动量与二阶自适应学习率梯度状态。" }],
    thinkingQuestion: "LoRA 在微调结束后，如何将其参数与原模型基底参数进行“无损合并”（Merge Weights），以实现零额外推理延时？",
    aiPrompt: "评估利用矩阵加法分配律，直接将 Delta W 加回到原有 Dense 权重的方案，打分 0-10。"
  },
  "RLHF对齐": {
    theory: "### 人类反馈强化学习对齐\n使用人类对模型回答的排序偏好数据训练奖励模型（RM），并利用 PPO 算法微调大模型以对齐安全价值观。\n$$L(\\theta) = -\\mathbb{E}_{(x, y_w, y_l) \\sim D} \\left[ \\log \\sigma \\left( r_w(x, y_w) - r_l(x, y_l) \\right) \\right]$$",
    latexFormulas: ["L = -\\mathbb{E} [ \\log \\sigma ( r_w - r_l ) ]"],
    code: "import numpy as np\ndef calc_preference_prob(reward_w: float, reward_l: float) -> float:\n    # 待补全: 计算偏好 sigmoid(r_w - r_l)\n    pass",
    solution: "import numpy as np\ndef calc_preference_prob(reward_w: float, reward_l: float) -> float:\n    return float(1.0 / (1.0 + np.exp(-(reward_w - reward_l))))",
    expected: "0.7310585786300049",
    quizzes: [{ question: "在 RLHF 的 PPO 微调阶段，为了防止微调模型彻底偏离预训练模型的语言基底，引入了什么惩罚项？", options: ["A. KL 散度约束惩罚项 (KL Divergence Penalty)", "B. L2 正则参数衰减项"], answer: 0, explanation: "KL散度惩罚项确保模型输出与预训练模型概率相差不能太大，防止策略崩溃。" }],
    thinkingQuestion: "DPO（Direct Preference Optimization，直接偏好优化）是如何推导公式以省去显式训练奖励模型与昂贵 PPO 对齐调试成本的？",
    aiPrompt: "评估 DPO 对隐式奖励模型的闭式求解推导及其在策略模型上的直接监督微调，打分 0-10。"
  },
  "Qwen开源大模型": {
    theory: "### Qwen 开源大模型家族\n千问大模型具备优异的中文及代码逻辑指令遵从和自回归解码特征。\n$$\\text{Tokens / Sec} = \\frac{\\text{Generated Tokens}}{\\text{Elapsed Time}}$$",
    latexFormulas: ["Tokens\\ /\\ Sec = \\frac{Tokens}{Time}"],
    code: "def calc_generation_speed(tokens_count: int, time_spent_sec: float) -> float:\n    # 待补全\n    pass",
    solution: "def calc_generation_speed(tokens_count: int, time_spent_sec: float) -> float:\n    return round(tokens_count / time_spent_sec, 1)",
    expected: "25.5",
    quizzes: [{ question: "Qwen 架构采用什么位置编码以支持长文本外推？", options: ["A. RoPE（旋转位置编码，Rotary Position Embedding）", "B. 静态正弦位置编码"], answer: 0, explanation: "RoPE 利用旋转矩阵具有极佳的相对位置表达和外推稳定性。" }],
    thinkingQuestion: "大语言模型分词器（Tokenizer，如 BPE 与 SentencePiece）在将原始文本转换为 Token ID 时，遇到“未登录词”是如何处理的？",
    aiPrompt: "评估子词（Subword）切分及单字符回退处理机制，打分 0-10。"
  },
  "文本切分与清洗": {
    theory: "### RAG 文档语义分块切分\n文档导入需进行清洗并合理切块。通过设定 Chunk Size 及 Overlap 防止上下文语义断档。\n$$\\text{Overlap Size} = \\text{Chunk Size} \\times \\text{Overlap Ratio}$$",
    latexFormulas: ["Overlap\\ Size = Chunk\\ Size \\times Overlap\\ Ratio"],
    code: "def get_overlap_length(chunk_size: int, ratio: float) -> int:\n    # 待补全\n    pass",
    solution: "def get_overlap_length(chunk_size: int, ratio: float) -> int:\n    return int(chunk_size * ratio)",
    expected: "51",
    quizzes: [{ question: "在 RAG 文本切分时，引入 Chunk Overlap 的核心物理作用是？", options: ["A. 保证相邻文本块之间具有平滑过渡，防止关键语境在切分边界断裂", "B. 物理上将文档翻倍以扩充样本"], answer: 0, explanation: "交叉重叠部分可以让被切成两段的完整段落或句子的上下文在两个分块中均被局部保留。" }],
    thinkingQuestion: "如何设计基于 Markdown 层级标题语义切分器（Recursive Character Text Splitter）的切分层次，以保留最高精度的语义单元？",
    aiPrompt: "评估基于段落、标点及标题进行结构性自适应缩进分割的逻辑，打分 0-10。"
  },
  "向量Embedding": {
    theory: "### 文本语义向量空间投影\n利用深度编码模型，将任意长句子映射为高维实数空间内的稠密浮点向量。\n$$\\mathbf{v} = \\frac{\\mathbf{v}_{\\text{raw}}}{\\|\\mathbf{v}_{\\text{raw}}\\|_2}$$",
    latexFormulas: ["v_{norm} = \\frac{v}{||v||_2}"],
    code: "import numpy as np\ndef normalize_vector(v: np.ndarray) -> np.ndarray:\n    # 待补全\n    pass",
    solution: "import numpy as np\ndef normalize_vector(v: np.ndarray) -> np.ndarray:\n    norm = np.linalg.norm(v)\n    return v if norm == 0 else v / norm",
    expected: "[0.6 0.8]",
    quizzes: [{ question: "向量 Embedding 空间的物理距离可以代表？", options: ["A. 文本在语义层面的关联相似度", "B. 文件在物理磁盘上的相对深度"], answer: 0, explanation: "语义越接近的词或句子，其对应的 Embedding 向量在空间中的余弦夹角或欧氏距离越小。" }],
    thinkingQuestion: "在检索模型中，为什么通常在计算相似度之前对向量执行 L2 归一化，它的计算开销好处是什么？",
    aiPrompt: "说明归一化后计算余弦相似度可以直接转化为快速的向量点积乘法，无需在检索中重复计算模长，打分 0-10。"
  },
  "向量数据库检索": {
    theory: "### RAG 检索增强生成 (RAG)\n检索增强生成结合外部向量数据库，将专属或实时外部数据提供给大模型，解决幻觉问题。\n$$\\text{Query} \\rightarrow \\text{Vector Search} \\rightarrow \\text{Context Retrieval}$$",
    latexFormulas: ["Query \\rightarrow Vector Search \\rightarrow Context Retrieval"],
    code: "class RAGPipeline:\n    def generate_context_prompt(self, query: str, retrieved_docs: list) -> str:\n        # 待补全\n        pass",
    solution: "class RAGPipeline:\n    def generate_context_prompt(self, query: str, retrieved_docs: list) -> str:\n        docs_text = \"\\n\".join(retrieved_docs)\n        return f\"参考信息：\\n{docs_text}\\n\\n根据上述参考信息回答问题：{query}\"",
    expected: "参考信息：",
    quizzes: [{ question: "在 RAG 管道中，将大文档切分成块 (Chunk) 时，以下哪项设计是不科学的？", options: ["A. 保持适当的 Chunk Size，有 Chunk Overlap", "B. 将长达 500 页的 PDF 直接作为单个向量写入以保证绝对完整"], answer: 1, explanation: "长文档一整段写入会导致信息噪音过多，检索出的向量语义非常模糊。" }],
    thinkingQuestion: "RAG 检索中面临的“针锋相对”（Lost in the Middle）现象是指什么？如何通过重排（Rerank）来缓解此问题？",
    aiPrompt: "评估大模型对上下文中间段落信息提取度低这一瓶颈及 Reranker 对检索结果重排的方案，打分 0-10。"
  },
  "工具调用 (Tool Use)": {
    theory: "### 大模型外部 API 工具调用\n模型根据用户指令，自动分析并识别出所需调用的 API 接口及其必要参数参数名。\n$$\\text{Arguments} = \\text{Extract}(I, \\; \\text{Schema})$$",
    latexFormulas: ["Arguments = Extract(I, Schema)"],
    code: "def check_api_arguments(required: list, predicted: dict) -> bool:\n    # 待补全: 验证大模型解析出的参数字典中是否包含所有必填项\n    pass",
    solution: "def check_api_arguments(required: list, predicted: dict) -> bool:\n    return all(k in predicted for k in required)",
    expected: "True",
    quizzes: [{ question: "工具调用（Tool Use）流程中，大模型本身是否物理执行了外部 API 代码？", options: ["A. 不执行，大模型只输出包含调用意图和参数的 JSON，由应用系统代码执行", "B. 大模型在底层沙箱中物理直接运行 API"], answer: 0, explanation: "大模型只是生成符合接口规范的调用结构文本，执行动作由外部宿主端驱动。" }],
    thinkingQuestion: "如何在大模型工具调用的系统级闭环中，防止恶意的外部输入参数（如 SQL 注入或 Shell 注入代码）危害服务器安全？",
    aiPrompt: "评估输入参数清洗、沙箱环境运行及最小权限原则，打分 0-10。"
  },
  "Function Calling": {
    theory: "### 结构化 JSON 函数调用生成\n通过声明函数 Schema 定义（JSON 格式描述），限制大模型必须按指定 schema 生成合法的结构化调用参数。\n$$P\\left( X_{\\text{json}} \\mid \\text{Schema} \\right)$$",
    latexFormulas: ["P(X_{json} \\mid Schema)"],
    code: "import json\ndef build_function_schema(name: str, desc: str) -> str:\n    # 待补全: 返回包含基本函数名称和描述信息的 json 格式描述文本\n    pass",
    solution: "import json\ndef build_function_schema(name: str, desc: str) -> str:\n    return json.dumps({\"name\": name, \"description\": desc})",
    expected: "{\"name\": \"query_db\", \"description\": \"sql query\"}",
    quizzes: [{ question: "在 Function Calling 中，如何保证模型输出的 JSON 必定格式合法？", options: ["A. 在底层采样时使用 Guided Decoding（语法词法树限制输出词表采样）或在提示词中强制正则定义", "B. 让模型多重复输出几次并自动纠错"], answer: 0, explanation: "通过限制推理时各 Token 采样的词法语法树（JSON 状态机），可以百分之百保证其输出格式的完整合法。" }],
    thinkingQuestion: "Function Calling 的应用场景中，如何解决大模型可能缺失某项必填参数的异常流程？",
    aiPrompt: "评估澄清对话引导、Fallback 提示词及参数重解析机制，打分 0-10。"
  },
  "LangChain/CrewAI": {
    theory: "### 智能代理 Agent 开发框架\n通过链式路由、共享记忆存储和自动 Orchestration 编排，粘合大模型与外部执行组件。\n$$\\text{Agent}_1 \\xrightarrow{\\text{Memory}} \\text{Agent}_2$$",
    latexFormulas: ["Agent_1 \\xrightarrow{Memory} Agent_2"],
    code: "def run_sequential_chain(agent_a_out: str, agent_b_prompt: str) -> str:\n    # 待补全: 将 agent A 的输出作为上下文拼接到 B 的提示词后面\n    pass",
    solution: "def run_sequential_chain(agent_a_out: str, agent_b_prompt: str) -> str:\n    return f\"{agent_b_prompt}\\n上下文：{agent_a_out}\"",
    expected: "Translate:\\n上下文：hello",
    quizzes: [{ question: "在多智能体框架中，Agent 之间的协作关系是基于什么传递的？", options: ["A. 消息流/提示词上下文传递与结构化的动作流控制", "B. 共享物理网络底层连接"], answer: 0, explanation: "多智能体通过将先前 Agent 的结果融入后续 Agent 的提示词上下文来实现任务交接和协同。" }],
    thinkingQuestion: "设计一个 Agent 团队（如包含程序员、测试员、产品经理）时，如何避免它们在沟通循环中陷入无限消息重试死锁？",
    aiPrompt: "评估最大对话轮数设定、明确的状态机转移设计以及全局调度器的退出机制，打分 0-10。"
  }
};

// ==========================================
// STAGE 9: 强化学习 (6 subtopics)
// ==========================================
const STAGE_9_CONFIGS: Record<string, SubtopicConfig> = {
  "马尔可夫决策(MDP)": {
    theory: "### 马尔可夫决策过程 (MDP)\n强化学习基本框架。下一状态仅取决于当前状态 $s$ 和当前采取的动作 $a$。\n$$P(s', r \\mid s, a) = \\mathbb{P}(S_t=s', R_t=r \\mid S_{t-1}=s, A_{t-1}=a)$$",
    latexFormulas: ["P(s', r \\mid s, a)"],
    code: "def get_next_state_prob(trans_matrix: list, current_state: int, action: int, next_state: int) -> float:\n    # 待补全\n    pass",
    solution: "def get_next_state_prob(trans_matrix: list, current_state: int, action: int, next_state: int) -> float:\n    return trans_matrix[current_state][action][next_state]",
    expected: "0.8",
    quizzes: [{ question: "马尔可夫性质（Markov Property）的数学本质是？", options: ["A. 未来状态的转移概率仅取决于当前状态，与过去的历史无关", "B. 状态只能取正整数"], answer: 0, explanation: "历史信息已经完全浓缩体现在当前状态值中。" }],
    thinkingQuestion: "马尔可夫决策过程（MDP）中的折扣因子 $\\gamma$（Discount Factor）对智能体规避远期风险的影响？",
    aiPrompt: "评估当前回报与远期回报期望求和时的衰减收敛数学机制，打分 0-10。"
  },
  "Q-Learning": {
    theory: "### 时序差分 Q-table 迭代\n无模型离线控制算法。通过 Bellman 期望方程更新状态-行动价值矩阵的期望回报。\n$$Q(s, a) \\leftarrow Q(s, a) + \\alpha \\left[ R + \\gamma \\max_{a'} Q(s', a') - Q(s, a) \\right]$$",
    latexFormulas: ["Q(s, a) \\leftarrow Q + \\alpha [ R + \\gamma \\max Q - Q ]"],
    code: "def q_learning_update(q_val: float, reward: float, max_next_q: float, lr: float, gamma: float) -> float:\n    # 待补全\n    pass",
    solution: "def q_learning_update(q_val: float, reward: float, max_next_q: float, lr: float, gamma: float) -> float:\n    return round(q_val + lr * (reward + gamma * max_next_q - q_val), 3)",
    expected: "10.45",
    quizzes: [{ question: "Q-learning 属于 Off-policy 还是 On-policy？", options: ["A. Off-policy (更新时采用贪心行为 maxQ，与当前探索策略解耦)", "B. On-policy"], answer: 0, explanation: "更新Q值时使用 max(Q)，不用考虑智能体实际采取的探索性下一步动作。" }],
    thinkingQuestion: "什么是强化学习中的“探索与利用”（Exploration vs Exploitation）博弈？以 $\\epsilon$-greedy 为例说明？",
    aiPrompt: "评估随机探索新空间与利用已知最高收益的平衡，打分 0-10。"
  },
  "SARSA": {
    theory: "### 同策略时序差分算法 (SARSA)\n在轨（On-policy）控制算法。在更新价值函数时，实际使用下一步正在交互的动作 $a'$ 对应的估值。\n$$Q(s, a) \\leftarrow Q(s, a) + \\alpha \\left[ R + \\gamma Q(s', a') - Q(s, a) \\right]$$",
    latexFormulas: ["Q(s, a) \\leftarrow Q + \\alpha [ R + \\gamma Q(s', a') - Q ]"],
    code: "def sarsa_learning_update(q_val: float, reward: float, actual_next_q: float, lr: float, gamma: float) -> float:\n    # 待补全\n    pass",
    solution: "def sarsa_learning_update(q_val: float, reward: float, actual_next_q: float, lr: float, gamma: float) -> float:\n    return round(q_val + lr * (reward + gamma * actual_next_q - q_val), 3)",
    expected: "9.95",
    quizzes: [{ question: "SARSA 与 Q-learning 最本质的差别是？", options: ["A. 更新时直接使用实际执行的行为 a' 的 Q 值，属于 On-policy", "B. 它不需要计算时间差分误差"], answer: 0, explanation: "SARSA 顺应正在探索动作的分布，因而其决策风格更趋向于保守安全。" }],
    thinkingQuestion: "在经典的悬崖寻路（Cliff Walking）实验中，为什么 SARSA 倾向于走安全的远路，而 Q-Learning 会选择走悬崖边险路？",
    aiPrompt: "评估 Off-policy 假设的极值探索与 On-policy 的保守避障选择，打分 0-10。"
  },
  "DQN算法": {
    theory: "### 深度 Q 网络与动作评估\n结合深度神经网络以近似表达大连续状态空间的 Q 值函数。引入经验回放与双网络机制保障收敛。\n$$L(\\theta) = \\mathbb{E} \\left[ \\left( r + \\gamma \\max_{a'} Q(s', a'; \\theta^-) - Q(s, a; \\theta) \\right)^2 \\right]$$",
    latexFormulas: ["L = \\mathbb{E} [ ( r + \\gamma \\max Q(s', a'; \\theta^-) - Q )^2 ]"],
    code: "def dqn_td_loss(target_y: float, predicted_q: float) -> float:\n    # 待补全: 计算单样本 TD 平方误差损失\n    pass",
    solution: "def dqn_td_loss(target_y: float, predicted_q: float) -> float:\n    return float((target_y - predicted_q) ** 2)",
    expected: "0.25",
    quizzes: [{ question: "DQN 中引入经验回放区（Replay Buffer）的最核心物理作用是？", options: ["A. 打破训练样本之间的时间关联性，满足独立同分布假设，稳定梯度", "B. 增加训练内存"], answer: 0, explanation: "通过打乱先后次序随机抽取 Transition，避免参数产生时序死锁波动。" }],
    thinkingQuestion: "Double DQN 是如何解决传统 DQN 算法在动作评估上严重的“过高估计”（Overestimation）缺陷的？",
    aiPrompt: "评估解耦行为选择与目标值计算的两个独立神经网络参数机制，打分 0-10。"
  },
  "PPO优化": {
    theory: "### 剪切近端策略优化 (PPO)\n基于 Actor-Critic，通过截断策略概率变化比例（Ratio），避免策略更新跨度过大导致崩溃。\n$$L^{\\text{CLIP}}(\\theta) = \\hat{\\mathbb{E}}_t \\left[ \\min\\left( r_t(\\theta) \\hat{A}_t, \\; \\text{clip}\\left(r_t(\\theta), \\; 1-\\epsilon, \\; 1+\\epsilon\\right) \\hat{A}_t \\right) \\right]$$",
    latexFormulas: ["L^{CLIP} = \\hat{\\mathbb{E}}_t [ \\min( r_t A_t, clip(r_t) A_t ) ]"],
    code: "import numpy as np\ndef ppo_clip_ratio(ratio: float, eps: float) -> float:\n    # 待补全: 将比例裁剪到 [1-eps, 1+eps] 的区间内\n    pass",
    solution: "import numpy as np\ndef ppo_clip_ratio(ratio: float, eps: float) -> float:\n    return float(np.clip(ratio, 1.0 - eps, 1.0 + eps))",
    expected: "1.2",
    quizzes: [{ question: "PPO 属于以下哪类强化学习算法？", options: ["A. 策略梯度方法 (Policy Gradient Method)", "B. 纯值函数迭代方法"], answer: 0, explanation: "PPO 直接优化智能体采取动作的概率模型参数。" }],
    thinkingQuestion: "信赖域策略优化（TRPO）与近端策略优化（PPO）在约束策略散度步长上的复杂度差异？",
    aiPrompt: "评估 KL 散度拉格朗日乘子约束计算的复杂度与 PPO 直接 Clipping 裁剪比例的计算效率对比，打分 0-10。"
  },
  "AC双网络架构": {
    theory: "### 演员-评判家双网络协同\nActor 网络根据概率策略采取行动，Critic 网络评估当前状态的期望回报并计算优势函数。\n$$A_t = Q(s_t, a_t) - V(s_t) \\approx R_t + \\gamma V(s_{t+1}) - V(s_t)$$",
    latexFormulas: ["A_t = R_t + \\gamma V(s_{t+1}) - V(s_t)"],
    code: "def calc_td_advantage(reward: float, gamma: float, next_v: float, curr_v: float) -> float:\n    # 待补全: 计算时序差分优势函数 A = R + gamma * V(s') - V(s)\n    pass",
    solution: "def calc_td_advantage(reward: float, gamma: float, next_v: float, curr_v: float) -> float:\n    return round(reward + gamma * next_v - curr_v, 2)",
    expected: "1.5",
    quizzes: [{ question: "在 AC 架构中，优势函数（Advantage Function）主要用于指导？", options: ["A. 指导 Actor 是否要增大所采取动作的概率：如果优势为正，则朝该方向强化", "B. 增加神经网络复杂度"], answer: 0, explanation: "优势函数度量了该动作是否好于当前的平均状态表现期望。" }],
    thinkingQuestion: "传统的 Policy Gradient 中使用全回合回报作为基准，相比 AC 架构面临什么显著的方差瓶颈？",
    aiPrompt: "评估 Monte Carlo 采样完整轨迹引入的巨大方差问题与 Critic 单步时序差分降噪的物理效果，打分 0-10。"
  }
};

// ==========================================
// STAGE 10: 工程部署 (5 subtopics)
// ==========================================
const STAGE_10_CONFIGS: Record<string, SubtopicConfig> = {
  "FastAPI开发": {
    theory: "### FastAPI 异步服务架构\n凭借 Python 异步网络库，快速封装具备自动类型推导和 Pydantic 校验的高并发模型推理服务。\n$$\\text{Inference Latency} = \\text{API Route Time} + \\text{GPU Computation Time}$$",
    latexFormulas: ["Latency = API\\ Route\\ Time + Model\\ Compute\\ Time"],
    code: "def fastapi_response_dict(is_success: bool, class_name: str) -> dict:\n    # 待补全: 返回 API 路由标准响应格式字典\n    pass",
    solution: "def fastapi_response_dict(is_success: bool, class_name: str) -> dict:\n    return {\"status\": \"ok\" if is_success else \"error\", \"prediction\": class_name}",
    expected: "{'status': 'ok', 'prediction': 'cat'}",
    quizzes: [{ question: "使用 async def 声明 API 路由的最大优势是？", options: ["A. 在等待模型 I/O 或数据库响应期间，挂起当前请求以并发处理其他路由包", "B. 可以使 GPU 自动并发计算"], answer: 0, explanation: "利用单线程协程事件循环，在高并发模型网关中有着卓越的并发表现。" }],
    thinkingQuestion: "在大并发场景下部署 Python Web 接口时，Gunicorn 结合 Uvicorn 工作进程（Workers）的部署拓扑是如何规避 Python GIL 局限性的？",
    aiPrompt: "评估多进程 Workers 物理利用多核 CPU 的网关拓扑结构，打分 0-10。"
  },
  "模型序列化(ONNX)": {
    theory: "### 跨平台中间图表示 (ONNX)\n将各算子及张量网络抽象为标准的数据流图表示，摆脱 Python 及 PyTorch 框架依赖，便于芯片推理加速。\n$$\\text{FLOPs} = \\sum_{g \\in G} \\text{Ops}(g)$$",
    latexFormulas: ["FLOPs = \\sum_{g \\in G} \\text{Ops}(g)"],
    code: "def get_onnx_input_payload(node_name: str, dims: list) -> dict:\n    # 待补全\n    pass",
    solution: "def get_onnx_input_payload(node_name: str, dims: list) -> dict:\n    return {\"input_name\": node_name, \"shape\": dims}",
    expected: "{'input_name': 'image', 'shape': [1, 3, 224, 224]}",
    quizzes: [{ question: "将模型导出为 ONNX 格式，其最重要的优势是？", options: ["A. 统一各平台底层编译图表示，能直接配合 TensorRT/OpenVINO 等硬件推理端加速", "B. 大幅缩减模型物理文件大小"], answer: 0, explanation: "解耦了上游深度学习框架与下游边缘/服务器端硬件芯片编译架构。" }],
    thinkingQuestion: "在将 PyTorch 动态控制流（如 if/else 分支）导出到静态 ONNX 图时，为什么会发生控制流截断？该如何避免？",
    aiPrompt: "评估静态追踪（Tracing）与脚本形式（Scripting）在导出控制流上的差异，打分 0-10。"
  },
  "Docker镜像打包": {
    theory: "### 隔离容器与镜像构建\n将业务代码、模型权重与系统级 CUDA 依赖打包，保证环境在本地与线上运行的绝对一致性。\n$$\\text{Total Image Size} = \\sum_{i=1}^{N} \\text{Size}\\left( \\text{Layer}_i \\right)$$",
    latexFormulas: ["Total\\ Size = \\sum Layer\\ Size"],
    code: "def build_docker_expose_line(port: int) -> str:\n    # 待补全\n    pass",
    solution: "def build_docker_expose_line(port: int) -> str:\n    return f\"EXPOSE {port}\"",
    expected: "EXPOSE 8000",
    quizzes: [{ question: "在 Dockerfile 构建大模型镜像时，如何减小最终输出的镜像体积？", options: ["A. 使用多阶段构建（Multi-stage Builds）并及时清理 pip 缓存", "B. 将所有命令都写在一条 RUN 语句中且不清理任何包"], answer: 0, explanation: "多阶段构建可以将不需要的编译期依赖剔除在最终只读容器层之外。" }],
    thinkingQuestion: "在容器内运行大模型推理时，如何通过 docker-compose 或宿主端安全挂载物理主机的英伟达 GPU（--gpus all）？",
    aiPrompt: "评估 nvidia-container-runtime 映射和底层驱动透传的机制，打分 0-10。"
  },
  "Ollama本地推理": {
    theory: "### 本地轻量化模型 Serving\n利用高效的 C/C++（llama.cpp）底盘，提供对本地开源模型（如 Llama3、Qwen）的低延时零门槛部署服务。\n$$\\text{Prompt Tokens / Sec} \\propto \\text{GPU\\ Bandwidth}$$",
    latexFormulas: ["Prompt\\ Tokens\\ /\\ Sec \\propto GPU\\ Bandwidth"],
    code: "import json\ndef build_ollama_chat_payload(model_name: str, message: str) -> str:\n    # 待补全: 返回向本地 Ollama chat api 发送请求的 json payload 文本\n    pass",
    solution: "import json\ndef build_ollama_chat_payload(model_name: str, message: str) -> str:\n    return json.dumps({\"model\": model_name, \"messages\": [{\"role\": \"user\", \"content\": message}], \"stream\": False})",
    expected: "{\"model\": \"qwen\", \"messages\": [{\"role\": \"user\", \"content\": \"hello\"}], \"stream\": false}",
    quizzes: [{ question: "Ollama 等本地工具运行的 4-bit 量化模型（GGUF），其牺牲了什么以换取小显存运行？", options: ["A. 牺牲了微弱的预测精度，换取了显存占用下降 70% 和解码速度的大幅提升", "B. 牺牲了全部的长依赖外推"], answer: 0, explanation: "将 FP16 的浮点权重压缩到 Int4 等整型表达，大大减小了显存吞吐压力。" }],
    thinkingQuestion: "模型量化（Post-Training Quantization, PTQ）在数学上是如何将浮点范围（FP32）拉伸映射到整型范围（Int8/Int4）的？",
    aiPrompt: "评估线性比例缩放、偏置校准及饱和截断的数学机制，打分 0-10。"
  },
  "vLLM加速部署": {
    theory: "### continuous batching 与 PagedAttention\nvLLM 采用虚拟内存页管理缓存 KV 矩阵碎片，将大模型服务的吞吐率提升了十倍以上。\n$$\\text{Memory Utilization} = \\frac{\\text{Allocated Blocks}}{\\text{Total Blocks}} \\approx 96\\%$$",
    latexFormulas: ["Memory\\ Utilization = \\frac{Allocated\\ Blocks}{Total\\ Blocks}"],
    code: "def calculate_page_blocks(total_tokens: int, block_size: int) -> int:\n    # 待补全: 根据 Token 总量和每页承载量计算所需的页区块数（向上取整）\n    pass",
    solution: "def calculate_page_blocks(total_tokens: int, block_size: int) -> int:\n    import math\n    return math.ceil(total_tokens / block_size)",
    expected: "4",
    quizzes: [{ question: "vLLM 的 PagedAttention 解决的最本质痛点是？", options: ["A. 推理时变长文本分配引起的显存碎片化与显存提前耗尽瓶颈", "B. 模型加载速度慢"], answer: 0, explanation: "传统方法为变长序列预留了连续大显存块，导致 60% 以上空间被碎片浪费。" }],
    thinkingQuestion: " continuous batching（持续批处理）相较于传统静态 Batching（Padding 对齐）在处理并发大模型请求时的延迟优化机制？",
    aiPrompt: "评估动态插入与移除迭代行、避免等待慢响应对齐的推理调度优化，打分 0-10。"
  }
};

// ==========================================
// STAGE 11: 项目实战 (5 subtopics)
// ==========================================
const STAGE_11_CONFIGS: Record<string, SubtopicConfig> = {
  "AI客服代理": {
    theory: "### 智能对话意图匹配系统\n根据用户输入意图提取槽位特征，通过大模型及预设指令流实现闭环售后自动答复。\n$$P(\\text{Intent} \\mid X) = \\text{Extract}(X)$$",
    latexFormulas: ["P(Intent \\mid X) = Extract(X)"],
    code: "def match_user_intent(query: str, keyword_map: dict) -> str:\n    # 待补全: 根据查询词中是否包含特定关键字，返回匹配的意图名\n    pass",
    solution: "def match_user_intent(query: str, keyword_map: dict) -> str:\n    for k, v in keyword_map.items():\n        if k in query:\n            return v\n    return \"unknown\"",
    expected: "refund",
    quizzes: [{ question: "智能客服中，如何优雅应对超出知识边界的“幻觉”提问？", options: ["A. 设定严格的系统提示词限制只能基于上下文回答，若无匹配则 Fallback 到人工客服", "B. 允许模型随意联想猜测"], answer: 0, explanation: "设定严格边界和澄清引导是保证垂直业务回复安全合规的底线。" }],
    thinkingQuestion: "如何实现多轮对话状态机（Session State Manager）以保障客服在询问退款原因等场景下保留上下文属性？",
    aiPrompt: "评估会话状态生命周期、Redis 会话缓存及实体槽位填充机制，打分 0-10。"
  },
  "自动编程助手": {
    theory: "### 代码生成与静态编译校验\n将 LLM 生成的代码提取出代码块，并在后台通过 Python 沙箱编译器动态执行以验证正确性。\n$$\\text{Compile Success} \\rightarrow \\text{Exit Code} = 0$$",
    latexFormulas: ["Success \\rightarrow Exit\\ Code = 0"],
    code: "def check_code_syntax(code_string: str) -> bool:\n    # 待补全: 利用 Python 内建 compile 函数检验一段代码字符串是否无语法语法错误\n    pass",
    solution: "def check_code_syntax(code_string: str) -> bool:\n    try:\n        compile(code_string, '<string>', 'exec')\n        return True\n    except SyntaxError:\n        return False",
    expected: "True",
    quizzes: [{ question: "编程助手中，为什么提取出的代码一定要在沙箱沙盒（Sandbox）中运行校验？", options: ["A. 防止生成的代码中包含恶意删除磁盘、网络攻击等高危越权指令危害物理机安全", "B. 沙箱执行速度快"], answer: 0, explanation: "任何未经校验的用户或大模型动态代码都有可能包含木马等系统级破坏性动作。" }],
    thinkingQuestion: "设计一个能实现“自我纠错”（Self-Healing）的自动编程管道，该如何将编译错误回传给大模型以迭代修正代码？",
    aiPrompt: "评估将 stderr 异常捕获结果作为 System Prompt 重新喂给生成模型的反馈链设计，打分 0-10。"
  },
  "多Agent协同工作流": {
    theory: "### 多智能体状态机编排\n通过明确的角色职责划分，由控制中心调度器在 Agent 之间通过传递消息串联复杂工作流。\n$$\\text{Orchestrator}(A_1 \\rightarrow A_2 \\rightarrow A_3)$$",
    latexFormulas: ["Orchestrator(A_1 \\rightarrow A_2)"],
    code: "def dispatch_task(state_name: str, route_map: dict) -> str:\n    # 待补全: 根据当前工作流状态值，路由到下一个协作 Agent 角色名\n    pass",
    solution: "def dispatch_task(state_name: str, route_map: dict) -> str:\n    return route_map.get(state_name, \"orchestrator\")",
    expected: "coder",
    quizzes: [{ question: "在 CrewAI/LangGraph 等框架中，为什么常用基于图（Graph）的模型来描述多 Agent 协同？", options: ["A. 能够直观表达复杂对话的分支循环、条件跳转与并行合流状态", "B. 图模型只占用很少的 CPU 资源"], answer: 0, explanation: "复杂的真实流程充斥着分支和退回重试，图的节点和边天然适应这一业务拓扑。" }],
    thinkingQuestion: "在多智能体开发流程中，如何协调并防止多个 Agent 同时调用外部工具产生的“竞争条件”与数据不一致？",
    aiPrompt: "评估全局锁分配、事件排队总线与状态互斥访问锁设计，打分 0-10。"
  },
  "Gradio模型演示": {
    theory: "### 快速交互模型可视化原型\n通过 Python 声明输入输入组件类型，以直观展现深度学习算法原型的动态变化。\n$$\\text{Interface}(fn, \\; \\text{inputs}, \\; \\text{outputs})$$",
    latexFormulas: ["Interface(fn, inputs, outputs)"],
    code: "def build_gradio_config(title: str) -> dict:\n    # 待补全\n    pass",
    solution: "def build_gradio_config(title: str) -> dict:\n    return {\"title\": title, \"theme\": \"compact\"}",
    expected: "{'title': 'AI Demo', 'theme': 'compact'}",
    quizzes: [{ question: "Gradio 能够快速展示模型效果，它的核心工作方式是？", options: ["A. 后端启动 Python 服务提供 API，前端通过 Websocket/HTTP 自动双向绑定交互", "B. 静态编译成独立 EXE 桌面端"], answer: 0, explanation: "它本质上是一个微型的 web 框架，会自动在本地拉起服务并生成交互网页。" }],
    thinkingQuestion: "当在 Gradio 界面中展示实时视频流（Webcam/Video）推理时，如何优化数据帧传输以防页面发生严重延迟卡顿？",
    aiPrompt: "评估异步生成器迭代返回图像、视频按帧率下采样及减少 JSON 大开销传输，打分 0-10。"
  },
  "Streamlit数据看板": {
    theory: "### 反应式模型状态看板\nStreamlit 采用反应式状态刷新机制。每次前端交互都会触发脚本自顶向下重新执行一遍。\n$$\\text{State Change} \\rightarrow \\text{Rerun Script}$$",
    latexFormulas: ["State\\ Change \\rightarrow Rerun\\ Script"],
    code: "def manage_dashboard_state(state_dict: dict, key: str, val: int) -> dict:\n    # 待补全: 模拟 streamlit 的 session_state 更新状态值并返回新状态字典\n    pass",
    solution: "def manage_dashboard_state(state_dict: dict, key: str, val: int) -> dict:\n    state_dict[key] = val\n    return state_dict",
    expected: "{'counter': 1}",
    quizzes: [{ question: "Streamlit 的“每次交互都重新自顶向下执行整个 python 脚本”这一机制的弊端是？", options: ["A. 大模型权重加载如果没用 @st.cache_resource 装饰，每次点击都会重复加载导致崩溃", "B. 模型推理会发生偏差"], answer: 0, explanation: "由于脚本是重新运行，昂贵的初始化开销必须通过缓存（Cache）装饰器保护起来。" }],
    thinkingQuestion: "如何合理在 Streamlit 数据看板中利用 @st.cache_data 与 @st.cache_resource 装饰器分别缓存轻量计算数据和重型数据库/模型连接？",
    aiPrompt: "评估内存驻留模型对象与可序列化文本的缓存分流逻辑，打分 0-10。"
  }
};

// ==========================================
// 整合所有的子话题配置 (全站 107 个小节彻底覆盖)
// ==========================================
const MASTER_CONFIGS: Record<string, SubtopicConfig> = {
  ...STAGE_1_CONFIGS,
  ...STAGE_2_CONFIGS,
  ...STAGE_3_CONFIGS,
  ...STAGE_4_CONFIGS,
  ...STAGE_5_CONFIGS,
  ...STAGE_6_CONFIGS,
  ...STAGE_7_CONFIGS,
  ...STAGE_8_CONFIGS,
  ...STAGE_9_CONFIGS,
  ...STAGE_10_CONFIGS,
  ...STAGE_11_CONFIGS
};

// 获取子话题的配置
function getSubtopicDetails(subtopicName: string, stageId: number): SubtopicConfig {
  if (MASTER_CONFIGS[subtopicName]) {
    return MASTER_CONFIGS[subtopicName];
  }
  
  // 兜底保障（由于上面我们已经手工写完了 11 个阶段共 107 个所有子话题的专属映射，因此理论上绝不会触发此 Fallback）
  return {
    theory: `### 关于 ${subtopicName} 的核心课件
本节探讨关于 **${subtopicName}** 的基本要点与核心算法细节。

#### 1. 深度技术内幕
在当前阶段中，${subtopicName} 是实现系统打通、模型运行和工程优化的核心内容。

#### 2. 定量量化度量公式
$$f(x) = \\sigma(W^T x + b)$$`,
    latexFormulas: ["f(x) = \\sigma(W^T x + b)"],
    code: `def process_${subtopicName.length}(data: list) -> list:
    # 待补全: 针对 ${subtopicName} 进行数据变换
    pass`,
    solution: `def process_${subtopicName.length}(data: list) -> list:
    return [x * 2 for x in data]`,
    expected: "[2, 4]",
    quizzes: [
      {
        question: `关于 ${subtopicName}，以下哪项描述符合标准实践？`,
        options: [
          "A. 设定针对该体系的专属约束并控制超参数范围以保证收敛性",
          "B. 忽略所有边界条件直接全连接输出"
        ],
        answer: 0,
        explanation: "合理限制边界条件并合理配置超参是任何算法的通识规律。"
      }
    ],
    thinkingQuestion: `在实际企业级高并发或团队规模达到数百人时，关于 ${subtopicName} 会遇到什么样的瓶颈？`,
    aiPrompt: "评估对本话题性能瓶颈的认识，打分 0-10 分。"
  };
}

// 种子挑战数据批量注入
export async function seedChallengesIfNeeded() {
  await initDatabase();

  const countResult = await executeQuery('SELECT COUNT(*) as count FROM star_challenges') as any[];
  if (Array.isArray(countResult) && countResult[0]?.count > 0) {
    return;
  }

  console.log('🌱 开始导入星空探索官方题库...');

  // 批量辅助函数
  async function insertChallenge(
    stageId: number,
    subtopicName: string,
    topicName: string,
    cfg: SubtopicConfig
  ) {
    try {
      const result = await executeQuery(
        `INSERT INTO star_challenges 
         (stage_id, subtopic_name, topic_name, theory_content, latex_formulas, starter_code, solution_code, expected_output, thinking_question, ai_prompt, author_id, status)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NULL, 'published')`,
        [
          stageId,
          subtopicName,
          topicName,
          cfg.theory,
          JSON.stringify(cfg.latexFormulas),
          cfg.code,
          cfg.solution,
          cfg.expected,
          cfg.thinkingQuestion,
          cfg.aiPrompt
        ]
      ) as { insertId: number };

      const challengeId = result.insertId;

      for (const quiz of cfg.quizzes) {
        await executeQuery(
          `INSERT INTO star_challenge_quizzes 
           (challenge_id, question_text, options, correct_index, explanation)
           VALUES (?, ?, ?, ?, ?)`,
          [
            challengeId,
            quiz.question,
            JSON.stringify(quiz.options),
            quiz.answer,
            quiz.explanation
          ]
        );
      }
    } catch (e) {
      console.error(`导入子话题 [${subtopicName}] 失败:`, e);
    }
  }

  for (const stage of STAGES) {
    for (const topic of stage.topics) {
      for (const child of topic.children) {
        const cfg = getSubtopicDetails(child, stage.id);
        await insertChallenge(stage.id, child, topic.name, cfg);
      }
    }
  }

  console.log('🎉 全站 11 个阶段所有小节题库初始化导入完毕！');
}
