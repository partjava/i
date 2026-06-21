'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import {
  PageTitle,
  BookParagraph,
  BookCode,
  BookAlert,
  BookList,
  TagGrid,
} from '@/app/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: 'Python 编程',
  chapterTitle: 'Python基础',
  chapterNumber: 2,
  totalChapters: 11,
  subjectHref: '/study/computer/python',
  prevChapter: { label: 'Python编程入门', href: '/study/computer/python/intro' },
  nextChapter: { label: '数据类型和变量', href: '/study/computer/python/datatypes' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: '数据类型',
    left: (
      <div className="space-y-4">
        <PageTitle>基本数据类型</PageTitle>
        <BookParagraph>Python有几种内置的数据类型：</BookParagraph>
        <BookCode language="python" showLineNumbers code={`# 数值类型
x = 10       # 整数 (int)
y = 3.14     # 浮点数 (float)
z = 1 + 2j   # 复数 (complex)

# 布尔值
is_valid = True   # 布尔值 (bool)
is_error = False

# 序列类型
my_list = [1, 2, 3, 4]               # 列表 (list) - 可变序列
my_tuple = (1, 2, 3, 4)              # 元组 (tuple) - 不可变序列
my_range = range(5)                  # range

# 文本类型
name = "Python"                      # 字符串 (str)
multiline = """这是一个
多行字符串"""

# 映射类型
person = {"name": "Alice", "age": 25}  # 字典 (dict)

# 集合类型
unique_numbers = {1, 2, 3, 4, 5}       # 集合 (set)
frozen_set = frozenset([1, 2, 3])      # 不可变集合 (frozenset)

# 空值
nothing = None                         # NoneType`} />
        <BookAlert type="info" message="Python是动态类型语言：变量无需声明类型，可以随时改变类型。使用 type() 检查变量类型，isinstance() 验证是否为特定类型" />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>变量与赋值</PageTitle>
        <BookCode language="python" showLineNumbers code={`# 变量赋值
x = 10          # 基本赋值
name = "Python"
is_awesome = True

# 多重赋值
a, b, c = 1, 2, 3
print(a, b, c)  # 1 2 3

# 交换变量
x, y = 10, 20
x, y = y, x
print(x, y)  # 20 10

# 变量命名规则
my_var = 1      # 蛇形命名法
myVar = 2       # 驼峰命名法（不推荐）
MY_CONST = 3    # 常量（约定）

# 类型检查
print(type(42))       # <class 'int'>
print(type("hello"))  # <class 'str'>
print(isinstance(3.14, float))  # True`} />
      </div>
    ),
  },
  {
    label: '运算符',
    left: (
      <div className="space-y-4">
        <PageTitle>算术与比较运算符</PageTitle>
        <BookCode language="python" showLineNumbers code={`# 算术运算符
a, b = 10, 3
print(a + b)   # 加法: 13
print(a - b)   # 减法: 7
print(a * b)   # 乘法: 30
print(a / b)   # 除法: 3.3333...
print(a // b)  # 整除: 3
print(a % b)   # 取余: 1
print(a ** b)  # 幂运算: 1000

# 比较运算符
print(a == b)   # 相等: False
print(a != b)   # 不相等: True
print(a > b)    # 大于: True
print(a < b)    # 小于: False
print(a >= b)   # 大于等于: True
print(a <= b)   # 小于等于: False

# 链式比较
x = 5
print(1 < x < 10)  # True
print(0 < x < 3)   # False`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>逻辑与成员运算符</PageTitle>
        <BookCode language="python" showLineNumbers code={`# 逻辑运算符
a, b = True, False
print(a and b)  # True and False = False
print(a or b)   # True or False = True
print(not a)    # not True = False

# 短路求值
x = 5
result = (x > 10) and (x < 20)  # False，第二个不计算

# 成员运算符
fruits = ["apple", "banana", "cherry"]
print("apple" in fruits)     # True
print("grape" not in fruits) # True

# 身份运算符
a = [1, 2, 3]
b = [1, 2, 3]
c = a
print(a is c)      # True（同一对象）
print(a is b)      # False（不同对象）
print(a == b)      # True（值相等）`} />
      </div>
    ),
  },
  {
    label: '练习例题',
    left: (
      <div className="space-y-4">
        <PageTitle>斐波那契数列</PageTitle>
        <div className="p-3 bg-paper-200/80 rounded-md border border-paper-300">
          <p className="text-sm text-ink font-medium mb-1">题目描述</p>
          <BookList items={[
            '编写函数生成斐波那契数列的前n项',
            '数列从0和1开始，后续每一项是前两项之和',
            '尝试用多种方法实现（循环、列表推导式、生成器）',
            '对比不同方法的性能差异',
          ]} />
        </div>
        <TagGrid items={['函数定义', '列表操作', '循环', '生成器', 'yield']} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>参考代码</PageTitle>
        <BookCode language="python" showLineNumbers code={`def fibonacci(n):
    """生成斐波那契数列的前n项"""
    if n <= 0:
        return []
    elif n == 1:
        return [0]

    fib = [0, 1]
    for i in range(2, n):
        fib.append(fib[i-1] + fib[i-2])
    return fib

# 生成器函数（更高效）
def fibonacci_generator(n):
    a, b = 0, 1
    count = 0
    while count < n:
        yield a
        a, b = b, a + b
        count += 1

# 测试
print(fibonacci(10))
# [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
print(list(fibonacci_generator(10)))
# [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]`} />
        <BookAlert type="info" message="斐波那契数列是一个经典练习题，通过它可以学习列表操作、递归和生成器。生成器方法对于处理大量数据更加高效" />
      </div>
    ),
  },
]

export default function PythonBasicPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
