'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import {
  PageTitle,
  BookParagraph,
  BookCode,
  BookAlert,
  BookList,
  BookDivider,
  TagGrid,
} from '@shared/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: 'Python 编程',
  chapterTitle: 'Python编程入门',
  chapterNumber: 1,
  totalChapters: 11,
  subjectHref: '/study/computer/python',
  nextChapter: { label: 'Python基础', href: '/study/computer/python/basic' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: '语言特点',
    left: (
      <div className="space-y-4">
        <PageTitle>Python 简介</PageTitle>
        <BookParagraph>Python是一种简单易学、功能强大的编程语言。它具有高效的高级数据结构，能够简单有效地实现面向对象编程。</BookParagraph>
        <BookAlert type="info" message={[
          '简单易学：Python有着相对较少的关键字，结构简单，学习起来更加容易',
          '可读性好：Python代码定义独特的缩进风格，使得代码更易于阅读和理解',
          '解释型语言：无需编译，可立即执行',
          '面向对象：支持面向对象的编程思想',
          '丰富的库：标准库和第三方库非常丰富，几乎任何任务都有相应的库支持',
        ].join('；')} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>Python 版本</PageTitle>
        <BookParagraph>目前Python有两个主要的版本：</BookParagraph>
        <BookCode language="bash" showLineNumbers code={`# Python 3.x（推荐使用的版本）
$ python --version
Python 3.10.0

# Python 2.x（已于2020年停止支持）
$ python2 --version
Python 2.7.18`} />
        <BookAlert type="warning" message="Python 2 已于 2020 年停止支持，建议所有新项目使用 Python 3" />
      </div>
    ),
  },
  {
    label: '开发环境',
    left: (
      <div className="space-y-4">
        <PageTitle>安装 Python</PageTitle>
        <BookParagraph>从官方网站下载并安装Python：</BookParagraph>
        <div className="p-2 bg-paper-200 rounded text-xs font-code text-azure break-all">
          <a href="https://www.python.org/downloads/" target="_blank" rel="noopener noreferrer" className="hover:underline">
            https://www.python.org/downloads/
          </a>
        </div>
        <BookDivider />
        <PageTitle>集成开发环境(IDE)</PageTitle>
        <BookParagraph>推荐的Python IDE和编辑器：</BookParagraph>
        <BookList items={[
          'PyCharm: 功能全面的Python IDE',
          'Visual Studio Code: 轻量级且功能强大的编辑器',
          'Jupyter Notebook: 适合数据科学和机器学习',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>虚拟环境</PageTitle>
        <BookParagraph>使用虚拟环境管理依赖：</BookParagraph>
        <BookCode language="bash" showLineNumbers code={`# 创建虚拟环境
python -m venv myenv

# 激活虚拟环境（Windows）
myenv\\Scripts\\activate

# 激活虚拟环境（MacOS/Linux）
source myenv/bin/activate

# 安装包
pip install package_name`} />
      </div>
    ),
  },
  {
    label: '基础语法',
    left: (
      <div className="space-y-4">
        <PageTitle>基本语法示例</PageTitle>
        <BookParagraph>Python 以简洁优雅的语法著称，快速了解核心语法：</BookParagraph>
        <BookCode language="python" showLineNumbers code={`# 注释以 # 开头

# 变量赋值
x = 10
name = "Python"
is_awesome = True

# 打印输出
print("Hello, World!")
print(f"x = {x}, name = {name}")

# 条件语句
if x > 5:
    print("x 大于 5")
elif x == 5:
    print("x 等于 5")
else:
    print("x 小于 5")

# 循环
for i in range(5):
    print(i)

count = 0
while count < 5:
    print(count)
    count += 1

# 函数定义
def greet(name):
    return f"Hello, {name}!"

message = greet("Pythonista")
print(message)`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>核心数据结构</PageTitle>
        <BookCode language="python" showLineNumbers code={`# 列表操作
fruits = ["apple", "banana", "cherry"]
fruits.append("orange")
print(fruits)

# 字典操作
person = {
    "name": "Alice",
    "age": 30,
    "job": "Developer"
}
print(person["name"])
person["location"] = "New York"`} />
        <BookAlert type="info" message="Python语法特点：使用缩进表示代码块而非花括号；变量无需声明类型；字符串可用单引号或双引号；列表、元组、字典是核心数据结构" />
      </div>
    ),
  },
  {
    label: '练习例题',
    left: (
      <div className="space-y-4">
        <PageTitle>简单计算器</PageTitle>
        <div className="p-3 bg-paper-200/80 rounded-md border border-paper-300">
          <p className="text-sm text-ink font-medium mb-1">题目描述</p>
          <BookList items={[
            '支持加减乘除四种运算',
            '处理输入错误',
            '允许用户连续计算',
          ]} />
        </div>
        <TagGrid items={['函数定义', '输入输出', '异常处理', '循环']} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>参考代码</PageTitle>
        <BookCode language="python" showLineNumbers code={`def calculator():
    """简单的计算器函数，支持加减乘除"""

    print("欢迎使用Python计算器！")
    print("输入'q'退出")

    while True:
        try:
            num1 = input("\\n请输入第一个数字: ")
            if num1.lower() == 'q': break
            num1 = float(num1)

            operation = input("请输入运算符 (+, -, *, /): ")
            if operation.lower() == 'q': break

            num2 = input("请输入第二个数字: ")
            if num2.lower() == 'q': break
            num2 = float(num2)

            if operation == '+':
                print(f"{num1} + {num2} = {num1 + num2}")
            elif operation == '-':
                print(f"{num1} - {num2} = {num1 - num2}")
            elif operation == '*':
                print(f"{num1} * {num2} = {num1 * num2}")
            elif operation == '/':
                if num2 == 0:
                    print("错误：除数不能为零！")
                else:
                    print(f"{num1} / {num2} = {num1 / num2}")
            else:
                print("不支持的运算符！请使用 +, -, *, /")

        except ValueError:
            print("输入无效！请输入数字。")
        except Exception as e:
            print(f"发生错误：{e}")

    print("谢谢使用！")`} />
        <BookAlert type="info" message="运行示例：输入 10 + 5 = 15" />
      </div>
    ),
  },
]

export default function PythonIntroPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
