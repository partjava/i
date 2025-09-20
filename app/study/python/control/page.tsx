'use client';

import { useState } from 'react';
import { Card, Tabs, Progress, Alert } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { CodeBlock } from '@/app/components/ui/CodeBlock';
import Link from 'next/link';
import React from 'react';
import { 
  BranchesOutlined, 
  RetweetOutlined, 
  SyncOutlined, 
  ExperimentOutlined 
} from '@ant-design/icons';

const { TabPane } = Tabs;

export default function PythonControlPage() {
  const [activeTab, setActiveTab] = useState('1');

  const tabItems = [
    {
      key: '1',
      label: (
        <span>
          <BranchesOutlined />
          条件语句
        </span>
      ),
      children: (
        <Card title="条件语句" className="mb-6">
          <div className="space-y-4 mt-4">
            <h3 className="text-xl font-semibold mb-4">if-elif-else语句</h3>
            <p>Python使用缩进来组织代码块，条件语句遵循简洁的语法。</p>
            
            <CodeBlock language="python">
              {`# 基本的if语句
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

# 嵌套条件语句
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
        print("零")`}
            </CodeBlock>
            
            <h3 className="text-xl font-semibold mt-6">条件表达式</h3>
            <p>Python支持简洁的条件表达式（三元运算符）。</p>
            
            <CodeBlock language="python">
              {`# 三元表达式
age = 20
status = "成年" if age >= 18 else "未成年"
print(status)  # 成年

# 嵌套三元表达式（尽量避免使用，影响可读性）
score = 85
grade = "A" if score >= 90 else ("B" if score >= 80 else ("C" if score >= 70 else "D"))
print(grade)  # B

# 使用三元表达式给变量赋值
x = 10
y = 20
max_value = x if x > y else y
print(max_value)  # 20

# 在列表推导式中使用条件表达式
numbers = [1, 2, 3, 4, 5]
result = ["偶数" if n % 2 == 0 else "奇数" for n in numbers]
print(result)  # ['奇数', '偶数', '奇数', '偶数', '奇数']`}
            </CodeBlock>
            
            <h3 className="text-xl font-semibold mt-6">真值测试</h3>
            <p>Python中任何对象都可以进行真值测试，以下值被视为False：</p>
            
            <CodeBlock language="python">
              {`# 被视为False的值
print(bool(None))       # False
print(bool(False))      # False
print(bool(0))          # False
print(bool(0.0))        # False
print(bool(''))         # False - 空字符串
print(bool([]))         # False - 空列表
print(bool(()))         # False - 空元组
print(bool({}))         # False - 空字典
print(bool(set()))      # False - 空集合

# 其他所有值视为True
print(bool(1))          # True
print(bool(-1))         # True
print(bool('hello'))    # True
print(bool([0]))        # True - 非空列表，即使包含False的值
print(bool((None,)))    # True - 非空元组，即使包含False的值

# 在if语句中使用真值测试
name = ""
if name:
    print("名字不为空")
else:
    print("名字为空")  # 名字为空

numbers = [1, 2, 3]
if numbers:
    print("列表不为空")  # 列表不为空
    
# 使用and和or的短路特性
print(0 and 'hello')    # 0 (第一个操作数为假，不会计算第二个)
print(1 and 'hello')    # 'hello' (第一个为真，返回第二个值)
print(0 or 'hello')     # 'hello' (第一个为假，返回第二个值)
print(1 or 'hello')     # 1 (第一个为真，不会计算第二个)`}
            </CodeBlock>
            
            <Alert
              className="mt-4"
              message="Python条件语句的特点"
              description={
                <ul className="list-disc pl-6">
                  <li>使用缩进代替大括号来划分代码块</li>
                  <li>支持elif关键字用于多分支条件</li>
                  <li>条件表达式格式为：value_if_true if condition else value_if_false</li>
                  <li>Python使用短路逻辑评估布尔表达式</li>
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
      key: '2',
      label: (
        <span>
          <RetweetOutlined />
          循环语句
        </span>
      ),
      children: (
        <Card title="循环语句" className="mb-6">
          <div className="space-y-4 mt-4">
            <h3 className="text-xl font-semibold mb-4">for循环</h3>
            <p>Python的for循环主要用于遍历可迭代对象的元素。</p>
            
            <CodeBlock language="python">
              {`# 遍历列表
fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print(fruit)
    
# 使用range()函数
for i in range(5):  # 0到4
    print(i)
    
# 带起始值和步长的range
for i in range(2, 10, 2):  # 2, 4, 6, 8
    print(i)
    
# 遍历字符串
for char in "Python":
    print(char)
    
# 使用enumerate()同时获取索引和值
for index, fruit in enumerate(fruits):
    print(f"{index}: {fruit}")
    
# 遍历字典
person = {"name": "Alice", "age": 25, "job": "Engineer"}
for key in person:
    print(f"{key}: {person[key]}")
    
# 更Pythonic的字典遍历方式
for key, value in person.items():
    print(f"{key}: {value}")
    
# 同时遍历多个序列
names = ["Alice", "Bob", "Charlie"]
ages = [25, 30, 35]
for name, age in zip(names, ages):
    print(f"{name} is {age} years old")`}
            </CodeBlock>
            
            <h3 className="text-xl font-semibold mt-6">while循环</h3>
            <p>while循环在条件为真时重复执行代码块。</p>
            
            <CodeBlock language="python">
              {`# 基本while循环
count = 0
while count < 5:
    print(count)
    count += 1
    
# 使用while循环处理用户输入
"""
prompt = "输入一个数字，或'q'退出: "
while True:
    response = input(prompt)
    if response == 'q':
        break
    number = int(response)
    print(f"您输入的数字是: {number}")
"""

# 使用条件控制while循环
numbers = [1, 2, 3, 4, 5]
i = 0
while i < len(numbers):
    print(numbers[i])
    i += 1
    
# 无限循环和条件退出
"""
counter = 0
while True:
    print(counter)
    counter += 1
    if counter >= 5:
        break
"""

# 循环与列表处理
numbers = [1, 2, 3, 4, 5]
i = 0
squared = []
while i < len(numbers):
    squared.append(numbers[i] ** 2)
    i += 1
print(squared)  # [1, 4, 9, 16, 25]`}
            </CodeBlock>
            
            <h3 className="text-xl font-semibold mt-6">循环控制语句</h3>
            <p>Python提供了特殊语句用于控制循环的执行流程。</p>
            
            <CodeBlock language="python">
              {`# break语句 - 立即退出循环
for i in range(10):
    if i == 5:
        break
    print(i)  # 只打印0,1,2,3,4
    
# continue语句 - 跳过当前迭代
for i in range(10):
    if i % 2 == 0:
        continue
    print(i)  # 只打印奇数: 1,3,5,7,9
    
# else子句 - 循环正常完成时执行
for i in range(5):
    print(i)
else:
    print("循环正常完成")
    
# else与break的相互作用
for i in range(5):
    if i == 3:
        break
    print(i)
else:
    print("循环正常完成")  # 此行不会执行，因为循环被break中断
    
# 循环的嵌套和控制
for i in range(3):
    for j in range(3):
        if i == j:
            print(f"对角线元素: ({i},{j})")
        elif i + j == 2:
            print(f"反对角线元素: ({i},{j})")
            continue
        print(f"其他元素: ({i},{j})")`}
            </CodeBlock>
            
            <Alert
              className="mt-4"
              message="Python循环的特点"
              description={
                <ul className="list-disc pl-6">
                  <li>for循环主要用于遍历可迭代对象</li>
                  <li>while循环用于基于条件的重复执行</li>
                  <li>break语句用于提前退出循环</li>
                  <li>continue语句用于跳过当前迭代</li>
                  <li>else子句在循环正常完成时执行</li>
                  <li>Python没有do-while循环，但可以通过while True和break实现类似功能</li>
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
      key: '3',
      label: (
        <span>
          <SyncOutlined />
          迭代工具
        </span>
      ),
      children: (
        <Card title="迭代工具" className="mb-6">
          <div className="space-y-4 mt-4">
            <h3 className="text-xl font-semibold mb-4">推导式</h3>
            <p>Python提供了简洁的语法来创建列表、字典和集合的方法。</p>
            
            <CodeBlock language="python">
              {`# 列表推导式
numbers = [1, 2, 3, 4, 5]
squares = [x**2 for x in numbers]
print(squares)  # [1, 4, 9, 16, 25]

# 带条件的列表推导式
even_squares = [x**2 for x in numbers if x % 2 == 0]
print(even_squares)  # [4, 16]

# 嵌套列表推导式
matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
flattened = [x for row in matrix for x in row]
print(flattened)  # [1, 2, 3, 4, 5, 6, 7, 8, 9]

# 创建矩阵转置
transposed = [[row[i] for row in matrix] for i in range(3)]
print(transposed)  # [[1, 4, 7], [2, 5, 8], [3, 6, 9]]

# 字典推导式
squares_dict = {x: x**2 for x in range(5)}
print(squares_dict)  # {0: 0, 1: 1, 2: 4, 3: 9, 4: 16}

# 集合推导式
unique_letters = {char for char in "hello world"}
print(unique_letters)  # {'h', 'e', 'l', 'o', ' ', 'w', 'r', 'd'}

# 生成器表达式（惰性求值）
gen = (x**2 for x in range(5))
print(next(gen))  # 0
print(next(gen))  # 1
print(list(gen))  # [4, 9, 16] (剩余的元素)`}
            </CodeBlock>
            
            <h3 className="text-xl font-semibold mt-6">迭代器和生成器</h3>
            <p>Python的迭代器允许内存高效地遍历数据。</p>
            
            <CodeBlock language="python">
              {`# 迭代器基础
iterator = iter([1, 2, 3])
print(next(iterator))  # 1
print(next(iterator))  # 2
print(next(iterator))  # 3
# print(next(iterator))  # StopIteration异常

# 实现可迭代对象
class Countdown:
    def __init__(self, start):
        self.start = start
        
    def __iter__(self):
        # 迭代器协议要求__iter__返回具有__next__方法的对象
        return self
        
    def __next__(self):
        if self.start <= 0:
            raise StopIteration
        self.start -= 1
        return self.start + 1
        
# 使用可迭代对象
for i in Countdown(5):
    print(i)  # 5, 4, 3, 2, 1

# 生成器函数
def fibonacci(n):
    a, b = 0, 1
    count = 0
    while count < n:
        yield a
        a, b = b, a + b
        count += 1
        
# 使用生成器
for num in fibonacci(10):
    print(num)  # 0, 1, 1, 2, 3, 5, 8, 13, 21, 34
    
# 生成器表达式与列表推导式比较
import sys
list_comp = [x**2 for x in range(1000)]
gen_exp = (x**2 for x in range(1000))

print(sys.getsizeof(list_comp))  # 更大的内存占用
print(sys.getsizeof(gen_exp))    # 更小的内存占用`}
            </CodeBlock>
            
            <h3 className="text-xl font-semibold mt-6">itertools模块</h3>
            <p>Python的itertools模块提供了高效的迭代工具。</p>
            
            <CodeBlock language="python">
              {`import itertools

# 无限迭代器
# count
for i in itertools.islice(itertools.count(10, 2), 5):
    print(i)  # 10, 12, 14, 16, 18
    
# cycle
for i in itertools.islice(itertools.cycle("ABC"), 7):
    print(i)  # A, B, C, A, B, C, A
    
# repeat
for i in itertools.repeat("hello", 3):
    print(i)  # hello, hello, hello
    
# 终止于最短输入序列的迭代器
list1 = [1, 2, 3]
list2 = ['a', 'b', 'c', 'd']

# zip (内置函数，类似于itertools中的功能)
for i in zip(list1, list2):
    print(i)  # (1, 'a'), (2, 'b'), (3, 'c')
    
# chain - 连接多个迭代器
for i in itertools.chain(list1, list2):
    print(i)  # 1, 2, 3, 'a', 'b', 'c', 'd'
    
# combinations - 生成所有可能的组合
for combo in itertools.combinations([1, 2, 3, 4], 2):
    print(combo)  # (1, 2), (1, 3), (1, 4), (2, 3), (2, 4), (3, 4)
    
# permutations - 生成所有可能的排列
for perm in itertools.permutations([1, 2, 3], 2):
    print(perm)  # (1, 2), (1, 3), (2, 1), (2, 3), (3, 1), (3, 2)`}
            </CodeBlock>
            
            <Alert
              className="mt-4"
              message="迭代工具的优势"
              description={
                <ul className="list-disc pl-6">
                  <li>推导式提供了创建列表、字典和集合的简洁方法</li>
                  <li>生成器表达式比列表推导式更节省内存</li>
                  <li>迭代器允许惰性求值，适合处理大数据集</li>
                  <li>itertools模块提供了强大的组合和排列工具</li>
                  <li>自定义迭代器可以通过实现迭代器协议创建</li>
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
          <ExperimentOutlined />
          练习例题
        </span>
      ),
      children: (
        <Card title="练习例题" className="mb-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium">题目：素数生成器</h3>
              <p className="mt-2">实现一个素数生成器，满足以下要求：</p>
              <ul className="list-disc pl-6 mt-2">
                <li>创建一个能生成小于指定上限的所有素数的函数</li>
                <li>使用不同方法实现：普通循环、列表推导式和生成器表达式</li>
                <li>比较不同实现的性能差异</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-medium">参考代码</h3>
              <CodeBlock language="python">
                {`import time
import math

def is_prime(n):
    """
    检查一个数是否为素数
    """
    if n <= 1:
        return False
    if n <= 3:
        return True
    if n % 2 == 0 or n % 3 == 0:
        return False
    
    # 只需检查到平方根
    i = 5
    while i * i <= n:
        if n % i == 0 or n % (i + 2) == 0:
            return False
        i += 6
    return True

# 方法1：使用普通循环
def get_primes_loop(limit):
    """
    返回小于指定上限的所有素数列表（使用循环）
    """
    primes = []
    for num in range(2, limit):
        if is_prime(num):
            primes.append(num)
    return primes

# 方法2：使用列表推导式
def get_primes_list_comp(limit):
    """
    返回小于指定上限的所有素数列表（使用列表推导式）
    """
    return [num for num in range(2, limit) if is_prime(num)]

# 方法3：使用生成器函数
def get_primes_generator(limit):
    """
    生成小于指定上限的所有素数（使用生成器）
    """
    for num in range(2, limit):
        if is_prime(num):
            yield num

# 方法4：埃拉托斯特尼筛法（更高效的算法）
def sieve_of_eratosthenes(limit):
    """
    使用埃拉托斯特尼筛法生成所有小于指定上限的素数列表
    """
    # 初始化素数标记列表
    sieve = [True] * limit
    sieve[0] = sieve[1] = False
    
    # 标记所有合数
    for i in range(2, int(math.sqrt(limit)) + 1):
        if sieve[i]:
            # 将i的所有倍数标记为非素数
            for j in range(i*i, limit, i):
                sieve[j] = False
    
    # 收集所有素数
    return [i for i in range(limit) if sieve[i]]

# 性能测试函数
def performance_test(limit):
    # 测试方法1
    start = time.time()
    primes1 = get_primes_loop(limit)
    time1 = time.time() - start
    print(f"普通循环方法用时: {time1:.6f}秒，找到{len(primes1)}个素数")
    
    # 测试方法2
    start = time.time()
    primes2 = get_primes_list_comp(limit)
    time2 = time.time() - start
    print(f"列表推导式方法用时: {time2:.6f}秒，找到{len(primes2)}个素数")
    
    # 测试方法3
    start = time.time()
    primes3 = list(get_primes_generator(limit))
    time3 = time.time() - start
    print(f"生成器方法用时: {time3:.6f}秒，找到{len(primes3)}个素数")
    
    # 测试方法4
    start = time.time()
    primes4 = sieve_of_eratosthenes(limit)
    time4 = time.time() - start
    print(f"埃拉托斯特尼筛法用时: {time4:.6f}秒，找到{len(primes4)}个素数")
    
    # 验证结果一致性
    assert primes1 == primes2 == primes3 == primes4, "不同方法的结果不一致"

# 运行测试
print("生成1000以内的素数：")
performance_test(1000)

print("\n前10个素数:")
for prime in list(get_primes_generator(30))[:10]:
    print(prime, end=" ")  # 2 3 5 7 11 13 17 19 23 29
`}
              </CodeBlock>
            </div>
            
            <h3 className="text-lg font-medium mt-6">知识点</h3>
            <ul className="list-disc pl-6 mt-2">
              <li>素数判定算法</li>
              <li>循环和条件语句</li>
              <li>列表推导式</li>
              <li>生成器函数和yield关键字</li>
              <li>埃拉托斯特尼筛法</li>
              <li>性能测试和计时</li>
            </ul>
            
            <div className="bg-blue-50 p-4 rounded-md mt-4">
              <div className="flex items-center text-blue-700 font-medium mb-2">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2">i</span>
                运行示例
              </div>
              <pre className="text-sm text-gray-800 whitespace-pre-wrap">
{`生成1000以内的素数：
普通循环方法用时: 0.009975秒，找到168个素数
列表推导式方法用时: 0.009958秒，找到168个素数
生成器方法用时: 0.009957秒，找到168个素数
埃拉托斯特尼筛法用时: 0.000997秒，找到168个素数

前10个素数:
2 3 5 7 11 13 17 19 23 29`}
              </pre>
            </div>
            
            <div className="bg-yellow-50 p-4 rounded-md mt-4">
              <div className="flex items-center text-yellow-700 font-medium mb-2">
                <span className="bg-yellow-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2">!</span>
                性能比较
              </div>
              <p>埃拉托斯特尼筛法远远优于其他方法，特别是当处理较大范围的数字时。这说明选择合适的算法比优化迭代方式更重要。</p>
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
              <h1 className="text-3xl font-bold text-gray-900">控制流程</h1>
              <p className="text-gray-600 mt-2">学习Python的条件语句、循环和迭代工具</p>
            </div>
            <Progress type="circle" percent={20} size={80} strokeColor="#1890ff" />
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
            href="/study/python/functions"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            下一课：函数和模块
            <RightOutlined className="ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
} 