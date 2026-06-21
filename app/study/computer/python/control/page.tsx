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
  chapterTitle: '控制流程',
  chapterNumber: 4,
  totalChapters: 11,
  subjectHref: '/study/computer/python',
  prevChapter: { label: '数据类型和变量', href: '/study/computer/python/datatypes' },
  nextChapter: { label: '函数和模块', href: '/study/computer/python/functions' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: '条件语句',
    left: (
      <div className="space-y-4">
        <PageTitle>if-elif-else 语句</PageTitle>
        <BookParagraph>Python使用缩进来组织代码块，条件语句遵循简洁的语法。</BookParagraph>
        <BookCode language="python" showLineNumbers code={`# 基本的if语句
x = 10
if x > 0:
    print("x是正数")

# if-else语句
y = -5
if y > 0:
    print("y是正数")
else:
    print("y是负数或零")

# if-elif-else语句
score = 85
if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
elif score >= 70:
    grade = "C"
elif score >= 60:
    grade = "D"
else:
    grade = "F"
print(f"成绩: {grade}")  # 成绩: B

# 嵌套条件
num = 15
if num > 0:
    if num % 2 == 0:
        print("正偶数")
    else:
        print("正奇数")
else:
    if num < 0:
        print("负数")
    else:
        print("零")`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>三元表达式与 match-case</PageTitle>
        <BookCode language="python" showLineNumbers code={`# 三元表达式
x = 10
result = "正数" if x > 0 else "负数或零"
print(result)  # 正数

# match-case（Python 3.10+）
def describe_value(value):
    match value:
        case 0:
            return "零"
        case 1 | 2 | 3:
            return "小数字"
        case int() as n if n < 0:
            return f"负数: {n}"
        case int():
            return f"正整数: {value}"
        case str():
            return f"字符串: {value}"
        case _:
            return "其他类型"

print(describe_value(0))    # 零
print(describe_value(5))    # 正整数: 5
print(describe_value(-3))   # 负数: -3
print(describe_value("hi")) # 字符串: hi`} />
        <BookAlert type="info" message="Python 3.10+ 支持 match-case 模式匹配，类似于其他语言的 switch-case。条件表达式（三元运算符）可以简化简单的分支" />
      </div>
    ),
  },
  {
    label: '循环语句',
    left: (
      <div className="space-y-4">
        <PageTitle>for 循环</PageTitle>
        <BookCode language="python" showLineNumbers code={`# 遍历范围
for i in range(5):
    print(i, end=" ")  # 0 1 2 3 4

print()
for i in range(2, 10, 2):
    print(i, end=" ")  # 2 4 6 8

print()
for i in range(5, 0, -1):
    print(i, end=" ")  # 5 4 3 2 1

# 遍历可迭代对象
fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print(fruit)

# enumerate获取索引
for i, fruit in enumerate(fruits):
    print(f"{i}: {fruit}")

# 遍历字典
person = {"name": "Alice", "age": 30}
for key, value in person.items():
    print(f"{key}: {value}")`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>while 循环与 break/continue</PageTitle>
        <BookCode language="python" showLineNumbers code={`# while循环
count = 0
while count < 5:
    print(count, end=" ")
    count += 1  # 0 1 2 3 4

# break 语句
for i in range(10):
    if i == 5:
        break
    print(i, end=" ")  # 0 1 2 3 4

# continue 语句
for i in range(5):
    if i == 2:
        continue  # 跳过2
    print(i, end=" ")  # 0 1 3 4

# else 子句（循环正常结束才执行）
for i in range(3):
    print(i, end=" ")
else:
    print("循环正常结束")  # 0 1 2 循环正常结束

# 使用 else 检测 break
for i in range(5):
    if i == 3:
        break
    print(i, end=" ")
else:
    print("不会执行")  # 因为break了`} />
      </div>
    ),
  },
  {
    label: '循环控制',
    left: (
      <div className="space-y-4">
        <PageTitle>嵌套循环与pass</PageTitle>
        <BookCode language="python" showLineNumbers code={`# 嵌套循环
for i in range(1, 4):
    for j in range(1, 4):
        print(f"{i}x{j}={i*j}", end=" ")
    print()

# pass 语句（占位）
if x > 0:
    pass  # 稍后实现

# 使用 zip 并行遍历
names = ["Alice", "Bob", "Charlie"]
ages = [25, 30, 35]
for name, age in zip(names, ages):
    print(f"{name} is {age} years old")

# 使用 reversed 反向遍历
for i in reversed(range(5)):
    print(i, end=" ")  # 4 3 2 1 0

# 使用 sorted 排序后遍历
for fruit in sorted(fruits):
    print(fruit)`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>列表推导式</PageTitle>
        <BookCode language="python" showLineNumbers code={`# 基本列表推导式
squares = [x**2 for x in range(10)]
print(squares)  # [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]

# 带条件的列表推导式
evens = [x for x in range(20) if x % 2 == 0]
print(evens)  # [0, 2, 4, 6, 8, 10, 12, 14, 16, 18]

# 嵌套列表推导式
matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
flattened = [num for row in matrix for num in row]
print(flattened)  # [1, 2, 3, 4, 5, 6, 7, 8, 9]

# 字典推导式
square_dict = {x: x**2 for x in range(5)}
print(square_dict)  # {0: 0, 1: 1, 2: 4, 3: 9, 4: 16}

# 集合推导式
unique_lengths = {len(word) for word in ["hello", "world", "python"]}
print(unique_lengths)  # {5, 6}`} />
      </div>
    ),
  },
  {
    label: '练习例题',
    left: (
      <div className="space-y-4">
        <PageTitle>素数生成器</PageTitle>
        <div className="p-3 bg-paper-200/80 rounded-md border border-paper-300">
          <p className="text-sm text-ink font-medium mb-1">题目描述</p>
          <BookList items={[
            '实现一个函数判断素数',
            '生成指定范围内的所有素数',
            '尝试用多种方法实现（循环、列表推导式、筛法）',
            '对比不同方法的性能差异',
          ]} />
        </div>
        <TagGrid items={['循环', '条件', '列表推导式', '生成器', '算法优化']} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>参考代码</PageTitle>
        <BookCode language="python" showLineNumbers code={`def is_prime(n):
    """判断一个数是否为素数"""
    if n < 2:
        return False
    for i in range(2, int(n ** 0.5) + 1):
        if n % i == 0:
            return False
    return True

# 埃拉托斯特尼筛法
def sieve_of_eratosthenes(n):
    """生成n以内的所有素数"""
    sieve = [True] * (n + 1)
    sieve[0] = sieve[1] = False
    for i in range(2, int(n ** 0.5) + 1):
        if sieve[i]:
            for j in range(i*i, n+1, i):
                sieve[j] = False
    return [i for i, is_prime in enumerate(sieve) if is_prime]

# 测试
print(sieve_of_eratosthenes(50))
# [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47]
print(f"100以内有{len(sieve_of_eratosthenes(100))}个素数")`} />
        <BookAlert type="info" message="埃拉托斯特尼筛法远远优于普通循环方法。选择合适的算法比优化迭代方式更重要" />
      </div>
    ),
  },
]

export default function PythonControlPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
