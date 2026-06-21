'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import {
  PageTitle,
  BookParagraph,
  BookCode,
  BookAlert,
  BookList,
  BookDivider,
  TagGrid,
} from '@/app/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: 'Python 编程',
  chapterTitle: '数据类型和变量',
  chapterNumber: 3,
  totalChapters: 11,
  subjectHref: '/study/computer/python',
  prevChapter: { label: 'Python基础', href: '/study/computer/python/basic' },
  nextChapter: { label: '控制流程', href: '/study/computer/python/control' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: '数值类型',
    left: (
      <div className="space-y-4">
        <PageTitle>整数类型</PageTitle>
        <BookParagraph>Python中的整数可以是任意大小，不受限于特定的位数。</BookParagraph>
        <BookCode language="python" showLineNumbers code={`# 整数示例
a = 10        # 十进制整数
b = 0b1010    # 二进制整数（0b前缀）
c = 0o12      # 八进制整数（0o前缀）
d = 0xA       # 十六进制整数（0x前缀）

print(a)      # 10
print(b)      # 10
print(c)      # 10
print(d)      # 10

# 大整数
big_num = 123456789012345678901234567890
print(big_num)  # Python会自动处理大整数

# 整数操作
x = 10
y = 3
print(x + y)   # 加法: 13
print(x - y)   # 减法: 7
print(x * y)   # 乘法: 30
print(x // y)  # 整除: 3
print(x % y)   # 取余: 1
print(x ** y)  # 幂运算: 1000

# 整数转换
decimal_str = "123"
decimal_int = int(decimal_str)      # 字符串转整数: 123
binary_int = int("1010", 2)         # 二进制字符串转整数: 10`} />
        <BookDivider />
        <PageTitle>浮点数类型</PageTitle>
        <BookParagraph>浮点数用于表示带小数的实数。</BookParagraph>
        <BookCode language="python" showLineNumbers code={`# 浮点数示例
a = 3.14159
b = 2.0
c = 1.0e6        # 科学计数法 (1000000.0)
d = 1.0e-6       # 科学计数法 (0.000001)`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>浮点数运算与精度</PageTitle>
        <BookCode language="python" showLineNumbers code={`# 浮点数运算
x = 10.5
y = 3.2
print(x + y)  # 13.7
print(x - y)  # 7.3
print(x * y)  # 33.6
print(x / y)  # 3.28125

# 浮点数精度问题
print(0.1 + 0.2)          # 0.30000000000000004
print(round(0.1 + 0.2, 2))  # 0.3

# 使用Decimal精确计算
from decimal import Decimal
print(Decimal('0.1') + Decimal('0.2'))  # 0.3

# 类型转换
print(float(42))         # 整数转浮点: 42.0
print(float("3.14"))     # 字符串转浮点: 3.14
print(int(3.9))          # 浮点转整数: 3（截断）
print(round(3.14159, 2)) # 四舍五入: 3.14

# 复数
z = 3 + 4j
print(z.real)  # 3.0
print(z.imag)  # 4.0
print(abs(z))  # 5.0（模）`} />
      </div>
    ),
  },
  {
    label: '字符串',
    left: (
      <div className="space-y-4">
        <PageTitle>字符串操作</PageTitle>
        <BookCode language="python" showLineNumbers code={`# 字符串创建
s1 = 'Hello'
s2 = "World"
s3 = """多行
字符串"""
s4 = '''也是
多行字符串'''

# 字符串连接
print("Hello" + " " + "World")  # Hello World
print("Ha" * 3)                 # HaHaHa

# 索引和切片
s = "Python Programming"
print(s[0])      # P
print(s[-1])     # g
print(s[0:6])    # Python
print(s[7:])     # Programming
print(s[::-1])   # 反转: gnimmargorP nohtyP

# 字符串方法
s = "  hello, WORLD!  "
print(s.lower())         # "  hello, world!  "
print(s.upper())         # "  HELLO, WORLD!  "
print(s.strip())         # "hello, WORLD!"
print(s.replace("WORLD", "Python"))  # "  hello, Python!  "
print(s.split(","))      # ['  hello', ' WORLD!  ']
print(", ".join(["a", "b", "c"]))  # "a, b, c"`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>字符串格式化和 f-string</PageTitle>
        <BookCode language="python" showLineNumbers code={`# 旧式格式化
name = "Alice"
age = 30
print("Name: %s, Age: %d" % (name, age))

# str.format()
print("Name: {}, Age: {}".format(name, age))
print("Name: {n}, Age: {a}".format(n=name, a=age))

# f-string（推荐，Python 3.6+）
print(f"Name: {name}, Age: {age}")
print(f"PI = {3.14159:.2f}")  # PI = 3.14

# 字符串判断
s = "Hello123"
print(s.isalpha())  # False（有数字）
print(s.isdigit())  # False（有字母）
print("123".isdigit())    # True
print("hello".isalpha())  # True
print(s.startswith("He")) # True
print(s.endswith("23"))   # True

# 查找和统计
s = "hello world hello"
print(s.find("world"))    # 6
print(s.count("hello"))   # 2
print("world" in s)       # True`} />
      </div>
    ),
  },
  {
    label: '类型转换',
    left: (
      <div className="space-y-4">
        <PageTitle>类型转换与判断</PageTitle>
        <BookCode language="python" showLineNumbers code={`# 显式类型转换
print(int(3.14))       # 3
print(float(42))       # 42.0
print(str(123))        # "123"
print(bool(1))         # True
print(bool(0))         # False
print(bool(""))        # False
print(bool("False"))   # True（非空字符串）

# 容器类型转换
print(list("hello"))   # ['h','e','l','l','o']
print(tuple([1,2,3]))  # (1, 2, 3)
print(set([1,2,2,3]))  # {1, 2, 3}

# 类型判断
x = 42
print(type(x))              # <class 'int'>
print(isinstance(x, int))   # True
print(isinstance(x, (int, float)))  # True

# 检查字符串内容
print("42".isdigit())       # True
print("3.14".replace('.','').isdigit())  # True`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>None 与常量</PageTitle>
        <BookCode language="python" showLineNumbers code={`# None 类型
result = None
if result is None:
    print("没有结果")

# 常量（约定使用大写）
PI = 3.14159
MAX_SIZE = 100

# 类型注解（Python 3.5+）
name: str = "Alice"
age: int = 30
def greet(name: str) -> str:
    return f"Hello, {name}"

# 特殊常量
print(float('inf'))     # 正无穷
print(float('-inf'))    # 负无穷
print(float('nan'))     # NaN（非数字）`} />
        <BookAlert type="info" message="Python 中一切皆对象，None 是 NoneType 的唯一值。检查 None 时应使用 is 而非 ==" />
        <TagGrid items={['int', 'float', 'str', 'bool', 'None', '类型转换']} />
      </div>
    ),
  },
]

export default function PythonDatatypesPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
