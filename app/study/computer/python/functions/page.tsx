'use client';

import { useState } from 'react';
import { Card, Tabs, Progress, Alert, Typography, Divider, Space, Button } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { CodeBlock } from '@/app/components/ui/CodeBlock';
import Link from 'next/link';
import React from 'react';
import { 
  FunctionOutlined, 
  ApartmentOutlined, 
  AppstoreOutlined,
  ToolOutlined,
  CodeOutlined,
  ExperimentOutlined
} from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;
const { TabPane } = Tabs;

export default function PythonFunctionsPage() {
  const [activeTab, setActiveTab] = useState('1');

  const tabItems = [
    {
      key: '1',
      label: (
        <span>
          <FunctionOutlined />
          基础函数
        </span>
      ),
      children: (
        <Card title="函数定义与调用" className="mb-6">
          <div className="space-y-4 mt-4">
            <h3 className="text-xl font-semibold mb-4">定义和调用函数</h3>
            <p>函数是Python中可重用的代码块，通过函数我们可以组织代码，提高代码的可读性和重用性。</p>
            
            <CodeBlock language="python">
              {`# 定义函数
def greet(name):
    """简单的问候函数"""
    return f"你好，{name}！"

# 调用函数
message = greet("小明")
print(message)  # 输出: 你好，小明！

# 没有返回值的函数
def print_info(name, age):
    """打印用户信息"""
    print(f"姓名: {name}, 年龄: {age}")

print_info("张三", 25)  # 输出: 姓名: 张三, 年龄: 25`}
            </CodeBlock>
            
            <Alert
              className="mt-4"
              message="函数基础知识"
              description={
                <ul className="list-disc pl-6">
                  <li>使用<Text code>def</Text>关键字定义函数</li>
                  <li>函数名应使用小写字母和下划线</li>
                  <li>添加文档字符串（docstring）是好习惯</li>
                  <li>如果没有显式返回值，函数将返回<Text code>None</Text></li>
                </ul>
              }
              type="info"
              showIcon
            />
            
            <h3 className="text-xl font-semibold mt-6">参数和返回值</h3>
            <p>函数可以接收参数并返回结果，也可以返回多个值。</p>
            
            <CodeBlock language="python">
              {`# 多个返回值
def get_dimensions(rectangle):
    """返回矩形的宽度和高度"""
    return rectangle['width'], rectangle['height']

rect = {'width': 10, 'height': 5}
width, height = get_dimensions(rect)
print(f"宽度: {width}, 高度: {height}")  # 输出: 宽度: 10, 高度: 5

# 返回字典
def create_person(name, age, city):
    """返回一个表示人的字典"""
    person = {
        'name': name,
        'age': age,
        'city': city
    }
    return person

user = create_person('李四', 30, '北京')
print(user)  # 输出: {'name': '李四', 'age': 30, 'city': '北京'}`}
            </CodeBlock>
          </div>
        </Card>
      ),
    },
    {
      key: '2',
      label: (
        <span>
          <ApartmentOutlined />
          参数类型
        </span>
      ),
      children: (
        <Card title="函数参数类型" className="mb-6">
          <div className="space-y-4 mt-4">
            <h3 className="text-xl font-semibold mb-4">位置参数和关键字参数</h3>
            <p>Python提供了多种方式来定义和传递参数，使函数更加灵活强大。</p>
            
            <CodeBlock language="python">
              {`# 位置参数
def describe_pet(animal_type, pet_name):
    """显示宠物的信息"""
    print(f"我有一只{animal_type}，它叫{pet_name}。")

# 位置参数调用
describe_pet('猫', '咪咪')  # 输出: 我有一只猫，它叫咪咪。

# 关键字参数调用
describe_pet(pet_name='旺财', animal_type='狗')  # 输出: 我有一只狗，它叫旺财。`}
            </CodeBlock>
            
            <h3 className="text-xl font-semibold mt-6">默认参数值</h3>
            <p>默认参数让函数调用更加灵活，可以省略具有默认值的参数。</p>
            
            <CodeBlock language="python">
              {`# 带默认值的参数
def describe_pet(pet_name, animal_type='狗'):
    """显示宠物的信息，默认是狗"""
    print(f"我有一只{animal_type}，它叫{pet_name}。")

describe_pet('旺财')  # 使用默认值 - 输出: 我有一只狗，它叫旺财。
describe_pet('咪咪', '猫')  # 覆盖默认值 - 输出: 我有一只猫，它叫咪咪。

# 注意：有默认值的参数必须放在没有默认值的参数之后`}
            </CodeBlock>
            
            <h3 className="text-xl font-semibold mt-6">可变长度参数</h3>
            <p>可变长度参数允许函数接收任意数量的参数。</p>
            
            <CodeBlock language="python">
              {`# *args: 可变位置参数
def make_pizza(size, *toppings):
    """打印顾客点的披萨配料"""
    print(f"制作{size}寸的披萨，配料有:")
    for topping in toppings:
        print(f"- {topping}")

make_pizza(12, '蘑菇', '青椒', '额外奶酪')
# 输出:
# 制作12寸的披萨，配料有:
# - 蘑菇
# - 青椒
# - 额外奶酪

# **kwargs: 可变关键字参数
def build_profile(first, last, **user_info):
    """创建用户资料字典"""
    profile = {'first_name': first, 'last_name': last}
    for key, value in user_info.items():
        profile[key] = value
    return profile

user = build_profile('李', '明', 
                    location='上海',
                    field='计算机科学',
                    age=22)
print(user)
# 输出: {'first_name': '李', 'last_name': '明', 'location': '上海', 'field': '计算机科学', 'age': 22}`}
            </CodeBlock>
            
            <Alert
              className="mt-4"
              message="参数使用的最佳实践"
              description={
                <ul className="list-disc pl-6">
                  <li>参数顺序: 位置参数 → 默认参数 → 可变位置参数(*args) → 可变关键字参数(**kwargs)</li>
                  <li>不要使用可变对象作为默认参数值（如列表或字典）</li>
                  <li>使用关键字参数可以提高代码可读性，特别是对于含义不明显的参数</li>
                </ul>
              }
              type="warning"
              showIcon
            />
          </div>
        </Card>
      ),
    },
    {
      key: '3',
      label: (
        <span>
          <AppstoreOutlined />
          作用域与命名空间
        </span>
      ),
      children: (
        <Card title="变量作用域与命名空间" className="mb-6">
          <div className="space-y-4 mt-4">
            <h3 className="text-xl font-semibold mb-4">局部和全局变量</h3>
            <p>理解变量的作用域和命名空间是编写复杂程序的关键。Python的作用域规则决定了变量在代码中的可见性。</p>
            
            <CodeBlock language="python">
              {`# 全局变量
message = "全局消息"

def print_message():
    # 访问全局变量
    print(message)

print_message()  # 输出: 全局消息

# 局部变量
def calculate():
    # 局部变量
    result = 42
    print(f"函数内部: {result}")
    
calculate()  # 输出: 函数内部: 42
# print(result)  # 错误！'result'是局部变量，函数外部无法访问

# 修改全局变量
def update_counter():
    global counter
    counter = 100
    print(f"函数内部: {counter}")

counter = 10
update_counter()  # 输出: 函数内部: 100
print(f"函数外部: {counter}")  # 输出: 函数外部: 100`}
            </CodeBlock>
            
            <h3 className="text-xl font-semibold mt-6">嵌套作用域与闭包</h3>
            <p>闭包是一种特殊的函数，它可以记住创建时的环境。</p>
            
            <CodeBlock language="python">
              {`# 嵌套函数与闭包
def outer_function(x):
    """外部函数"""
    y = 10
    
    def inner_function():
        """内部函数"""
        return x + y
    
    return inner_function

closure = outer_function(5)
print(closure())  # 输出: 15

# 闭包实际应用 - 计数器
def make_counter():
    count = 0
    
    def counter():
        nonlocal count
        count += 1
        return count
    
    return counter

my_counter = make_counter()
print(my_counter())  # 输出: 1
print(my_counter())  # 输出: 2
print(my_counter())  # 输出: 3`}
            </CodeBlock>
            
            <Alert
              className="mt-4"
              message="Python的LEGB规则"
              description={
                <ul className="list-disc pl-6">
                  <li><strong>L</strong>ocal(局部) - 函数内部</li>
                  <li><strong>E</strong>nclosing(嵌套) - 外部嵌套函数</li>
                  <li><strong>G</strong>lobal(全局) - 模块级别</li>
                  <li><strong>B</strong>uilt-in(内置) - Python的内置命名空间</li>
                </ul>
              }
              type="info"
              showIcon
            />
          </div>
        </Card>
      ),
    },
    {
      key: '4',
      label: (
        <span>
          <ToolOutlined />
          高级特性
        </span>
      ),
      children: (
        <Card title="高级函数特性" className="mb-6">
          <div className="space-y-4 mt-4">
            <h3 className="text-xl font-semibold mb-4">Lambda函数</h3>
            <p>Python提供了许多高级函数特性，如Lambda函数、装饰器和函数式编程工具，可以使代码更加简洁和强大。</p>
            
            <CodeBlock language="python">
              {`# Lambda函数 - 匿名函数
square = lambda x: x**2
print(square(5))  # 输出: 25

# 在排序中使用lambda
students = [
    {'name': '张三', 'age': 20},
    {'name': '李四', 'age': 18},
    {'name': '王五', 'age': 22}
]

# 按年龄排序
students.sort(key=lambda student: student['age'])
print(students)
# 输出: [{'name': '李四', 'age': 18}, {'name': '张三', 'age': 20}, {'name': '王五', 'age': 22}]`}
            </CodeBlock>
            
            <h3 className="text-xl font-semibold mt-6">函数式编程工具</h3>
            <p>Python提供了多种函数式编程工具来处理集合数据。</p>
            
            <CodeBlock language="python">
              {`# map - 对列表中的每个元素应用函数
numbers = [1, 2, 3, 4, 5]
squared = list(map(lambda x: x**2, numbers))
print(squared)  # 输出: [1, 4, 9, 16, 25]

# filter - 过滤列表中的元素
even_numbers = list(filter(lambda x: x % 2 == 0, numbers))
print(even_numbers)  # 输出: [2, 4]

# reduce - 将列表元素聚合为单个值
from functools import reduce
sum_result = reduce(lambda x, y: x + y, numbers)
print(sum_result)  # 输出: 15 (1+2+3+4+5)`}
            </CodeBlock>
            
            <h3 className="text-xl font-semibold mt-6">装饰器</h3>
            <p>装饰器是一种强大的工具，可以修改函数的行为而不改变其代码。</p>
            
            <CodeBlock language="python">
              {`# 装饰器 - 修改其他函数的功能
def timer(func):
    """测量函数执行时间的装饰器"""
    import time
    
    def wrapper(*args, **kwargs):
        start_time = time.time()
        result = func(*args, **kwargs)
        end_time = time.time()
        print(f"函数 {func.__name__} 执行耗时: {end_time - start_time:.6f} 秒")
        return result
        
    return wrapper

@timer
def slow_function():
    """一个执行较慢的函数"""
    import time
    time.sleep(1)
    print("函数执行完毕")

slow_function()
# 输出:
# 函数执行完毕
# 函数 slow_function 执行耗时: 1.000XXX 秒`}
            </CodeBlock>
            
            <Alert
              className="mt-4"
              message="高级函数特性使用建议"
              description={
                <ul className="list-disc pl-6">
                  <li>Lambda函数适合简单的单行表达式，复杂逻辑应使用普通函数</li>
                  <li>装饰器是实现横切关注点(如日志、性能监控)的强大工具</li>
                  <li>函数式编程工具(map/filter/reduce)在处理集合数据时很有用</li>
                  <li>列表推导式通常比map/filter更Pythonic，可读性更好</li>
                </ul>
              }
              type="warning"
              showIcon
            />
          </div>
        </Card>
      ),
    },
    {
      key: '5',
      label: (
        <span>
          <CodeOutlined />
          模块与包
        </span>
      ),
      children: (
        <Card title="模块和包" className="mb-6">
          <div className="space-y-4 mt-4">
            <h3 className="text-xl font-semibold mb-4">导入模块</h3>
            <p>Python的模块和包系统使得代码组织和重用变得简单高效。模块是包含Python定义和语句的文件，而包是模块的集合。</p>
            
            <CodeBlock language="python">
              {`# 导入整个模块
import math
print(math.pi)  # 输出: 3.141592653589793
print(math.sqrt(16))  # 输出: 4.0

# 导入特定函数或变量
from random import randint
print(randint(1, 10))  # 生成1到10之间的随机整数

# 使用别名
import datetime as dt
now = dt.datetime.now()
print(now)  # 输出当前时间

# 导入模块中的所有内容(不推荐)
# from math import *  # 不推荐，可能会导致命名冲突`}
            </CodeBlock>
            
            <h3 className="text-xl font-semibold mt-6">创建自定义模块</h3>
            <p>创建自己的模块可以更好地组织代码。</p>
            
            <CodeBlock language="python">
              {`# 文件: mymath.py
"""自定义数学函数模块"""

PI = 3.14159

def circle_area(radius):
    """计算圆的面积"""
    return PI * radius ** 2

def circle_circumference(radius):
    """计算圆的周长"""
    return 2 * PI * radius

# 文件: main.py
import mymath

print(f"PI值: {mymath.PI}")
print(f"半径为5的圆面积: {mymath.circle_area(5)}")
print(f"半径为5的圆周长: {mymath.circle_circumference(5)}")`}
            </CodeBlock>
            
            <h3 className="text-xl font-semibold mt-6">包的结构</h3>
            <p>包是一种组织相关模块的方式。</p>
            
            <CodeBlock language="python">
              {`# 包结构示例
# mypackage/
# ├── __init__.py
# ├── module1.py
# ├── module2.py
# └── subpackage/
#     ├── __init__.py
#     └── module3.py

# __init__.py 文件使一个目录成为包
# 可以在__init__.py中定义包级别的变量和函数

# 导入包中的模块
import mypackage.module1
from mypackage import module2
from mypackage.subpackage import module3

# 相对导入(在包内使用)
# 在module1.py中:
from . import module2  # 导入同级模块
from .subpackage import module3  # 导入子包模块`}
            </CodeBlock>
            
            <Alert
              className="mt-4"
              message="常用标准库模块"
              description={
                <ul className="list-disc pl-6">
                  <li><Text code>os</Text> - 操作系统功能，如文件和目录操作</li>
                  <li><Text code>sys</Text> - 系统特定参数和函数</li>
                  <li><Text code>datetime</Text> - 日期和时间操作</li>
                  <li><Text code>random</Text> - 生成随机数</li>
                  <li><Text code>json</Text> - JSON数据编码和解码</li>
                  <li><Text code>re</Text> - 正则表达式</li>
                  <li><Text code>collections</Text> - 特殊容器数据类型</li>
                  <li><Text code>itertools</Text> - 迭代器构建块</li>
                </ul>
              }
              type="info"
              showIcon
            />
          </div>
        </Card>
      ),
    },
    {
      key: '6',
      label: (
        <span>
          <ExperimentOutlined />
          练习例题
        </span>
      ),
      children: (
        <Card title="实践案例：文本分析器" className="mb-6">
          <div className="space-y-4 mt-4">
            <h3 className="text-xl font-semibold mb-4">文本分析工具开发</h3>
            <p>创建一个文本分析工具，能够统计文本中的单词数量、字符频率和句子结构。这个练习将综合应用函数、模块和高级函数特性。</p>
            
            <CodeBlock language="python">
              {`# text_analyzer.py
"""文本分析器模块

提供用于分析文本内容的各种功能。
"""
import re
import string
from collections import Counter
from functools import reduce

def count_words(text):
    """计算文本中的单词数量"""
    words = text.lower().split()
    return len(words)

def word_frequency(text):
    """统计单词出现频率"""
    # 删除标点符号
    text = text.lower()
    for char in string.punctuation:
        text = text.replace(char, ' ')
    
    words = text.split()
    return Counter(words)

def char_frequency(text):
    """统计字符出现频率"""
    # 仅统计字母和数字
    chars = [char.lower() for char in text if char.isalnum()]
    return Counter(chars)

def count_sentences(text):
    """计算文本中的句子数量"""
    # 简单定义：以.!?结尾的为句子
    sentences = re.split(r'[.!?]+', text)
    # 过滤掉空句子
    return len([s for s in sentences if s.strip()])

def average_sentence_length(text):
    """计算平均句子长度（单词数）"""
    sentences = re.split(r'[.!?]+', text)
    sentences = [s.strip() for s in sentences if s.strip()]
    
    if not sentences:
        return 0
    
    word_counts = [len(s.split()) for s in sentences]
    return sum(word_counts) / len(sentences)

def analyze_text(text):
    """综合分析文本"""
    result = {
        'word_count': count_words(text),
        'sentence_count': count_sentences(text),
        'avg_sentence_length': average_sentence_length(text),
        'most_common_words': word_frequency(text).most_common(5),
        'most_common_chars': char_frequency(text).most_common(5)
    }
    return result

# 使用装饰器记录函数调用
def log_call(func):
    """记录函数调用的装饰器"""
    def wrapper(*args, **kwargs):
        print(f"调用函数: {func.__name__}")
        return func(*args, **kwargs)
    return wrapper

@log_call
def print_analysis(analysis):
    """打印分析结果"""
    print(f"单词总数: {analysis['word_count']}")
    print(f"句子总数: {analysis['sentence_count']}")
    print(f"平均句子长度: {analysis['avg_sentence_length']:.2f} 单词")
    
    print("\n最常见的单词:")
    for word, count in analysis['most_common_words']:
        print(f"  {word}: {count}次")
    
    print("\n最常见的字符:")
    for char, count in analysis['most_common_chars']:
        print(f"  {char}: {count}次")

# 模块测试
if __name__ == "__main__":
    sample_text = """
    Python是一种广泛使用的解释型、高级编程语言。Python的设计哲学强调代码的可读性和简洁的语法。
    它的语言结构和面向对象方法旨在帮助程序员为小型和大型项目编写清晰、合理的代码。
    Python是动态类型的，并且支持多种编程范式，包括面向对象、命令式、函数式和过程式编程。
    """
    
    analysis = analyze_text(sample_text)
    print_analysis(analysis)`}
            </CodeBlock>
            
            <Alert
              className="mt-4"
              message="知识点"
              description={
                <ul className="list-disc pl-6">
                  <li>函数模块化 - 每个函数专注于单一任务</li>
                  <li>装饰器的使用 - 添加日志功能而不修改原函数</li>
                  <li>标准库的使用 - <Text code>re</Text>, <Text code>string</Text>, <Text code>collections</Text></li>
                  <li>文档字符串 - 详细描述模块和函数的用途</li>
                  <li>模块测试 - 使用<Text code>if __name__ == "__main__"</Text>提供测试代码</li>
                </ul>
              }
              type="success"
              showIcon
            />
            
            <div className="mt-6 p-4 border border-gray-200 rounded-lg">
              <h4 className="text-lg font-semibold">挑战任务</h4>
              <p>扩展上面的文本分析器，添加以下功能：</p>
              <ol className="list-decimal pl-6 mt-2">
                <li>识别和计算最常用的短语（连续2-3个单词）</li>
                <li>添加情感分析功能（简单版本，基于关键词）</li>
                <li>实现可以从文件读取文本并分析的功能</li>
                <li>添加命令行接口，允许用户指定分析选项</li>
              </ol>
              <p className="mt-2">提示：考虑创建一个包含多个模块的包，每个模块负责不同的分析功能。</p>
            </div>
          </div>
        </Card>
      ),
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 页面头部 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Python函数和模块</h1>
              <p className="text-gray-600 mt-2">学习如何定义和使用函数，理解模块化编程的概念，掌握Python的模块导入机制</p>
            </div>
            <Progress type="circle" percent={35} size={80} strokeColor="#1890ff" />
          </div>
        </div>

        {/* 课程内容 */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <Tabs activeKey={activeTab} onChange={setActiveTab} className="p-6" items={tabItems} />
        </div>

        {/* 底部导航 */}
        <div className="flex justify-between mt-8">
          <Link 
            href="/study/python/datatypes" 
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            <LeftOutlined className="mr-2" />
            上一课：数据类型和变量
          </Link>
          <Link
            href="/study/python/file-io"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            下一课：文件操作
            <RightOutlined className="ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
} 