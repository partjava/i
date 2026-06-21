'use client';

import { useState } from 'react';
import { Card, Tabs, Progress, Alert } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { CodeBlock } from '@/app/components/ui/CodeBlock';
import Link from 'next/link';
import React from 'react';
import { 
  DatabaseOutlined, 
  CodeOutlined, 
  BranchesOutlined, 
  ExperimentOutlined 
} from '@ant-design/icons';

const { TabPane } = Tabs;

export default function PythonBasicPage() {
  const [activeTab, setActiveTab] = useState('1');

  const tabItems = [
    {
      key: '1',
      label: (
        <span>
          <DatabaseOutlined />
          数据类型
        </span>
      ),
      children: (
        <Card title="Python数据类型" className="mb-6">
          <div className="space-y-4 mt-4">
            <h3 className="text-xl font-semibold mb-4">基本数据类型</h3>
            <p>Python有几种内置的数据类型：</p>
            
            <CodeBlock language="python">
              {`# 数值类型
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
nothing = None                         # NoneType`}
            </CodeBlock>
            
            <Alert
              className="mt-4"
              message="Python是动态类型语言"
              description={
                <ul className="list-disc pl-6">
                  <li>变量无需声明类型，可以随时改变类型</li>
                  <li>使用 type() 函数可以检查变量的类型</li>
                  <li>使用 isinstance() 函数可以验证变量是否为特定类型</li>
                </ul>
              }
              type="info"
              showIcon
            />
            
            <h3 className="text-xl font-semibold mt-6">类型转换</h3>
            <CodeBlock language="python">
              {`# 类型转换函数
str_num = "42"
num = int(str_num)    # 字符串转整数: 42

pi_str = str(3.14)    # 浮点数转字符串: "3.14"

float_num = float("3.14")  # 字符串转浮点数: 3.14

bool_val = bool(0)    # 数值转布尔: False (0为False，非0为True)

# 列表、元组和集合之间的转换
my_list = [1, 2, 3, 2, 1]
my_tuple = tuple(my_list)     # 列表转元组: (1, 2, 3, 2, 1)
my_set = set(my_list)         # 列表转集合，自动去重: {1, 2, 3}

# 将可迭代对象转换为列表
my_list_again = list(my_set)  # 集合转列表: [1, 2, 3] (顺序可能不同)`}
            </CodeBlock>
          </div>
        </Card>
      ),
    },
    {
      key: '2',
      label: (
        <span>
          <CodeOutlined />
          操作符
        </span>
      ),
      children: (
        <Card title="Python操作符" className="mb-6">
          <div className="space-y-4 mt-4">
            <h3 className="text-xl font-semibold mb-4">算术操作符</h3>
            <CodeBlock language="python">
              {`# 算术操作符
a = 10
b = 3

print(a + b)    # 加法: 13
print(a - b)    # 减法: 7
print(a * b)    # 乘法: 30
print(a / b)    # 除法: 3.3333...
print(a // b)   # 整除: 3
print(a % b)    # 取余: 1
print(a ** b)   # 幂运算: 1000

# 复合赋值操作符
x = 5
x += 3      # 等同于 x = x + 3
print(x)    # 8
x *= 2      # 等同于 x = x * 2
print(x)    # 16`}
            </CodeBlock>
            
            <h3 className="text-xl font-semibold mt-6">比较操作符</h3>
            <CodeBlock language="python">
              {`# 比较操作符
a = 10
b = 5

print(a == b)    # 等于: False
print(a != b)    # 不等于: True
print(a > b)     # 大于: True
print(a < b)     # 小于: False
print(a >= b)    # 大于等于: True
print(a <= b)    # 小于等于: False

# 比较不同类型
print(10 == 10.0)      # True (值相等)
print("10" == 10)      # False (类型不同)
print(True == 1)       # True (在布尔上下文中，1 被视为 True)`}
            </CodeBlock>
            
            <h3 className="text-xl font-semibold mt-6">逻辑操作符</h3>
            <CodeBlock language="python">
              {`# 逻辑操作符
a = True
b = False

print(a and b)     # 逻辑与: False
print(a or b)      # 逻辑或: True
print(not a)       # 逻辑非: False

# 短路求值
x = 5
y = 0
print(x > 0 and y/x > 0)  # False (短路，不会计算 y/x)
print(x < 0 or x > 3)     # True (短路，找到第一个True就返回)

# 身份操作符
a = [1, 2, 3]
b = [1, 2, 3]
c = a

print(a is b)       # False (不同对象)
print(a is c)       # True (同一个对象)
print(a is not b)   # True (不是同一个对象)

# 成员操作符
fruits = ["apple", "banana", "cherry"]
print("apple" in fruits)      # True
print("orange" not in fruits) # True`}
            </CodeBlock>
          </div>
        </Card>
      ),
    },
    {
      key: '3',
      label: (
        <span>
          <BranchesOutlined />
          控制流程
        </span>
      ),
      children: (
        <Card title="控制流程" className="mb-6">
          <div className="space-y-4 mt-4">
            <h3 className="text-xl font-semibold mb-4">条件语句</h3>
            <CodeBlock language="python">
              {`# if-elif-else语句
x = 10

if x > 15:
    print("x大于15")
elif x > 5:
    print("x大于5但不大于15")
else:
    print("x不大于5")

# 三元表达式
age = 20
status = "成年" if age >= 18 else "未成年"
print(status)  # 成年

# 嵌套条件
score = 85
if score >= 60:
    if score >= 80:
        grade = "优秀"
    else:
        grade = "良好"
else:
    grade = "不及格"
print(grade)  # 优秀`}
            </CodeBlock>
            
            <h3 className="text-xl font-semibold mt-6">循环语句</h3>
            <CodeBlock language="python">
              {`# for循环 - 遍历序列
fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print(fruit)

# 使用range()
for i in range(5):  # 0, 1, 2, 3, 4
    print(i)

# 带步长的range
for i in range(2, 10, 2):  # 2, 4, 6, 8
    print(i)

# while循环 - 条件为真时循环
count = 0
while count < 5:
    print(count)
    count += 1

# break和continue
for i in range(10):
    if i == 3:
        continue  # 跳过当前迭代
    if i == 7:
        break     # 退出循环
    print(i)  # 输出: 0, 1, 2, 4, 5, 6

# else子句(循环正常完成时执行)
for i in range(3):
    print(i)
else:
    print("循环正常完成")`}
            </CodeBlock>
            
            <h3 className="text-xl font-semibold mt-6">列表推导式</h3>
            <CodeBlock language="python">
              {`# 列表推导式 - 一行创建列表
squares = [x**2 for x in range(10)]
print(squares)  # [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]

# 带条件的列表推导式
even_squares = [x**2 for x in range(10) if x % 2 == 0]
print(even_squares)  # [0, 4, 16, 36, 64]

# 嵌套列表推导式
matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
flattened = [x for row in matrix for x in row]
print(flattened)  # [1, 2, 3, 4, 5, 6, 7, 8, 9]

# 字典推导式
squares_dict = {x: x**2 for x in range(5)}
print(squares_dict)  # {0: 0, 1: 1, 2: 4, 3: 9, 4: 16}`}
            </CodeBlock>
          </div>
        </Card>
      ),
    },
    {
      key: '4',
      label: (
        <span>
          <ExperimentOutlined />
          练习例题
        </span>
      ),
      children: (
        <Card title="练习例题" className="mb-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium">题目：生成斐波那契数列</h3>
              <p className="mt-2">实现一个函数生成指定长度的斐波那契数列：</p>
              <ul className="list-disc pl-6 mt-2">
                <li>第一个和第二个数字是0和1</li>
                <li>后续的数字是前两个数字的和</li>
                <li>返回指定长度的斐波那契数列</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-medium">参考代码</h3>
              <CodeBlock language="python">
                {`def fibonacci(n):
    """
    生成指定长度的斐波那契数列
    
    Args:
        n: 要生成的斐波那契数列长度
        
    Returns:
        包含n个斐波那契数的列表
    """
    # 处理特殊情况
    if n <= 0:
        return []
    elif n == 1:
        return [0]
    elif n == 2:
        return [0, 1]
    
    # 生成斐波那契数列
    fib = [0, 1]
    for i in range(2, n):
        fib.append(fib[i-1] + fib[i-2])
    
    return fib

# 测试函数
print(fibonacci(10))  # [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]

# 使用列表推导式（仅用于演示，不是最佳实践）
def fibonacci_alt(n):
    fib = [0, 1]
    [fib.append(fib[-1] + fib[-2]) for _ in range(2, n)]
    return fib[:n]

print(fibonacci_alt(10))  # [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]

# 使用生成器函数（更高效）
def fibonacci_generator(n):
    a, b = 0, 1
    count = 0
    
    while count < n:
        yield a
        a, b = b, a + b
        count += 1

# 转换生成器为列表并打印
print(list(fibonacci_generator(10)))  # [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
`}
              </CodeBlock>
            </div>
            
            <h3 className="text-lg font-medium mt-6">知识点</h3>
            <ul className="list-disc pl-6 mt-2">
              <li>函数定义和注释</li>
              <li>列表操作和动态添加元素</li>
              <li>条件处理</li>
              <li>循环和迭代</li>
              <li>列表推导式</li>
              <li>生成器函数和yield关键字</li>
            </ul>
            
            <div className="bg-blue-50 p-4 rounded-md mt-4">
              <div className="flex items-center text-blue-700 font-medium mb-2">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2">i</span>
                提示
              </div>
              <ul className="list-disc pl-6">
                <li>斐波那契数列是一个经典的编程练习题</li>
                <li>通过这个例子可以学习列表操作和递归思想</li>
                <li>生成器方法对于处理大量数据更加高效</li>
                <li>这个问题可以有多种解决方案，包括递归和动态规划</li>
              </ul>
            </div>
          </div>
        </Card>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 页面标题 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Python基础</h1>
              <p className="text-gray-600 mt-2">Python数据类型、操作符和控制流程</p>
            </div>
            <Progress type="circle" percent={10} size={80} strokeColor="#1890ff" />
          </div>
        </div>

        {/* 课程内容 */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <Tabs activeKey={activeTab} onChange={setActiveTab} className="p-6" items={tabItems} />
        </div>

        {/* 底部导航 */}
        <div className="flex justify-between mt-8">
          <Link 
            href="/study/python/intro" 
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            <LeftOutlined className="mr-2" />
            上一课：Python编程入门
          </Link>
          <Link
            href="/study/python/datatypes"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            下一课：数据类型和变量
            <RightOutlined className="ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
} 