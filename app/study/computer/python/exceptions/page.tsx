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
  chapterTitle: '异常处理',
  chapterNumber: 8,
  totalChapters: 11,
  subjectHref: '/study/computer/python',
  prevChapter: { label: '面向对象编程', href: '/study/computer/python/oop' },
  nextChapter: { label: '标准库', href: '/study/computer/python/stdlib' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: '异常基础',
    left: (
      <div className="space-y-4">
        <PageTitle>try-except 语句</PageTitle>
        <BookCode language="python" showLineNumbers code={`# 基本 try-except
try:
    num = int(input("请输入数字: "))
    result = 10 / num
    print(f"结果是: {result}")
except ValueError:
    print("输入的不是有效数字")
except ZeroDivisionError:
    print("不能除以零")
except Exception as e:
    print(f"发生未知错误: {e}")

# try-except-else-finally
try:
    file = open("example.txt", "r")
    content = file.read()
except FileNotFoundError:
    print("文件不存在")
else:
    print("文件读取成功")
    print(content)
finally:
    print("无论如何都会执行")
    if 'file' in locals():
        file.close()`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>常见异常类型</PageTitle>
        <BookCode language="python" showLineNumbers code={`# 常见的内置异常
# ValueError: 值错误
int("abc")  # ValueError

# TypeError: 类型错误
"hello" + 5  # TypeError

# IndexError: 索引错误
lst = [1, 2, 3]
lst[10]  # IndexError

# KeyError: 键错误
d = {"a": 1}
d["b"]  # KeyError

# AttributeError: 属性错误
None.strip()  # AttributeError

# ImportError: 导入错误
import nonexistent_module  # ImportError

# 捕获多个异常
try:
    x = int("abc")
except (ValueError, TypeError) as e:
    print(f"值或类型错误: {e}")

# 获取异常信息
try:
    1 / 0
except ZeroDivisionError as e:
    print(f"错误类型: {type(e).__name__}")
    print(f"错误信息: {str(e)}")`} />
      </div>
    ),
  },
  {
    label: '自定义异常',
    left: (
      <div className="space-y-4">
        <PageTitle>自定义异常与断言</PageTitle>
        <BookCode language="python" showLineNumbers code={`# 自定义异常
class WithdrawError(Exception):
    """提款异常"""
    def __init__(self, balance, amount, message=None):
        self.balance = balance
        self.amount = amount
        self.message = message or f"余额不足: 余额{balance}, 需要{amount}"
        super().__init__(self.message)

class BankAccount:
    def __init__(self, owner, balance=0):
        self.owner = owner
        self.balance = balance

    def withdraw(self, amount):
        if amount <= 0:
            raise ValueError("提款金额必须为正数")
        if amount > self.balance:
            raise WithdrawError(self.balance, amount)
        self.balance -= amount
        return amount

# 使用
account = BankAccount("小明", 1000)
try:
    account.withdraw(1500)
except WithdrawError as e:
    print(e.message)`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>断言与上下文管理</PageTitle>
        <BookCode language="python" showLineNumbers code={`# 断言
def divide(a, b):
    assert b != 0, "除数不能为零"
    assert isinstance(a, (int, float)), "参数必须是数字"
    return a / b

# 上下文管理器
class FileManager:
    def __init__(self, filename, mode):
        self.filename = filename
        self.mode = mode

    def __enter__(self):
        self.file = open(self.filename, self.mode)
        return self.file

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.file.close()
        # 返回 False 则传播异常，True 则抑制异常
        return False

# 使用自定义上下文管理器
with FileManager("test.txt", "w") as f:
    f.write("Hello, World!")

# 异常处理最佳实践
# 1. 异常应用于异常情况，不要用于控制流程
# 2. 尽量捕获具体异常而非 Exception
# 3. 在恰当的层级捕获异常
# 4. 使用 finally 释放资源
# 5. 自定义异常继承 Exception`} />
      </div>
    ),
  },
]

export default function ExceptionsPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
