'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import {
  PageTitle,
  BookParagraph,
  BookCode,
  BookAlert,
  BookList,
  TagGrid,
} from '@shared/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: 'Python 编程',
  chapterTitle: '函数和模块',
  chapterNumber: 5,
  totalChapters: 11,
  subjectHref: '/study/computer/python',
  prevChapter: { label: '控制流程', href: '/study/computer/python/control' },
  nextChapter: { label: '文件操作', href: '/study/computer/python/file-io' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: '基础函数',
    left: (
      <div className="space-y-4">
        <PageTitle>函数定义与调用</PageTitle>
        <BookParagraph>函数是Python中可重用的代码块，通过函数我们可以组织代码，提高代码的可读性和重用性。</BookParagraph>
        <BookCode language="python" showLineNumbers code={`# 定义函数
def greet(name):
    """简单的问候函数"""
    return f"你好，{name}！"

# 调用函数
message = greet("小明")
print(message)  # 输出: 你好，小明！

# 没有返回值的函数
def print_info(name, age):
    print(f"姓名: {name}, 年龄: {age}")

print_info("小红", 25)

# 多个返回值（实际上返回元组）
def get_min_max(numbers):
    return min(numbers), max(numbers)

result = get_min_max([3, 1, 4, 1, 5])
print(result)  # (1, 5)
min_val, max_val = result
print(f"最小值: {min_val}, 最大值: {max_val}")`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>参数类型</PageTitle>
        <BookCode language="python" showLineNumbers code={`# 默认参数
def power(base, exp=2):
    return base ** exp

print(power(3))    # 9 (3²)
print(power(3, 3)) # 27 (3³)

# 关键字参数
def introduce(name, age, city):
    print(f"{name}来自{city}，今年{age}岁")

introduce(age=25, name="小明", city="北京")

# 可变参数 *args
def sum_all(*args):
    return sum(args)

print(sum_all(1, 2, 3, 4, 5))  # 15

# 关键字可变参数 **kwargs
def create_profile(**kwargs):
    for key, value in kwargs.items():
        print(f"{key}: {value}")

create_profile(name="Alice", age=30, job="Engineer")

# 参数组合（顺序：位置参数 > *args > 默认参数 > **kwargs）
def func(a, b, *args, c=10, **kwargs):
    print(a, b, args, c, kwargs)`} />
      </div>
    ),
  },
  {
    label: '高级特性',
    left: (
      <div className="space-y-4">
        <PageTitle>Lambda 与作用域</PageTitle>
        <BookCode language="python" showLineNumbers code={`# Lambda函数
square = lambda x: x ** 2
print(square(5))  # 25

# 在排序中使用lambda
students = [("Alice", 25), ("Bob", 20), ("Charlie", 30)]
students.sort(key=lambda s: s[1])  # 按年龄排序
print(students)  # [("Bob",20), ("Alice",25), ("Charlie",30)]

# map/filter/reduce
numbers = [1, 2, 3, 4, 5]
doubled = list(map(lambda x: x * 2, numbers))
evens = list(filter(lambda x: x % 2 == 0, numbers))
print(doubled)  # [2, 4, 6, 8, 10]
print(evens)    # [2, 4]

# 变量作用域
x = "全局变量"
def test_scope():
    x = "局部变量"
    print(x)  # 局部变量
test_scope()
print(x)  # 全局变量

# global关键字
count = 0
def increment():
    global count
    count += 1
increment()
print(count)  # 1`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>装饰器与生成器</PageTitle>
        <BookCode language="python" showLineNumbers code={`# 装饰器
def timer(func):
    """计算函数执行时间"""
    import time
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        print(f"{func.__name__} 耗时: {time.time()-start:.4f}秒")
        return result
    return wrapper

@timer
def slow_function():
    import time
    time.sleep(0.1)
    return "完成"

slow_function()

# 生成器函数
def countdown(n):
    while n > 0:
        yield n
        n -= 1

for num in countdown(5):
    print(num, end=" ")  # 5 4 3 2 1`} />
      </div>
    ),
  },
  {
    label: '模块',
    left: (
      <div className="space-y-4">
        <PageTitle>模块与导入</PageTitle>
        <BookCode language="python" showLineNumbers code={`# 导入整个模块
import math
print(math.sqrt(16))  # 4.0
print(math.pi)        # 3.141592653589793

# 导入特定函数
from datetime import datetime, timedelta
today = datetime.now()
print(today.strftime("%Y-%m-%d %H:%M:%S"))

# 别名导入
import numpy as np
import pandas as pd

# 导入所有（不推荐）
from os import *

# 自定义模块
# 创建 mymodule.py:
# def hello(name):
#     return f"Hello {name}"

# 导入自定义模块
# import mymodule
# print(mymodule.hello("Alice"))`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>包管理基础</PageTitle>
        <BookParagraph>包是组织模块的目录结构，使用 pip 安装第三方包：</BookParagraph>
        <BookCode language="bash" showLineNumbers code={`# 安装包
pip install requests
pip install numpy pandas matplotlib

# 安装特定版本
pip install flask==2.3.0

# 安装 requirements.txt
pip install -r requirements.txt

# 列出已安装包
pip list

# 导出依赖
pip freeze > requirements.txt`} />
        <BookAlert type="info" message="使用虚拟环境隔离项目依赖，避免版本冲突。常用工具包括 venv、poetry、conda" />
        <TagGrid items={['def', 'return', 'lambda', 'args', 'kwargs', '装饰器', '生成器', '模块']} />
      </div>
    ),
  },
]

export default function PythonFunctionsPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
