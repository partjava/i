'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function PythonBasicPage() {
  const [activeTab, setActiveTab] = useState('basic');
  const [expandedContent, setExpandedContent] = useState<string | null>(null);

  const tabs = [
    { id: 'basic', label: '基础语法' },
    { id: 'data', label: '数据类型' },
    { id: 'control', label: '控制流程' },
    { id: 'function', label: '函数编程' },
    { id: 'oop', label: '面向对象' },
    { id: 'module', label: '模块与包' }
  ];

  const toggleContent = (contentId: string) => {
    setExpandedContent(expandedContent === contentId ? null : contentId);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Python基础</h1>
      
      {/* 标签导航 */}
      <div className="flex space-x-4 mb-6 border-b overflow-x-auto">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 font-medium whitespace-nowrap ${
              activeTab === tab.id 
                ? 'border-b-2 border-blue-500 text-blue-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 内容区域 */}
      <div className="bg-white rounded-lg shadow-md p-6">
        {activeTab === 'basic' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">Python基础语法</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">1. 变量与赋值</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      Python是动态类型语言，变量不需要预先声明类型。
                      变量名区分大小写，可以使用字母、数字和下划线，但不能以数字开头。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">变量命名规则：</h5>
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# 正确的变量命名
name = "Python"          # 使用小写字母
user_age = 25           # 使用下划线分隔
MAX_VALUE = 100         # 常量使用大写
_private_var = "私有"    # 下划线开头表示私有

# 错误的变量命名
2name = "错误"          # 不能以数字开头
user-name = "错误"      # 不能使用连字符
class = "错误"          # 不能使用关键字`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">2. 注释与文档</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      Python支持单行注释和多行注释，以及文档字符串。
                      良好的注释习惯可以提高代码的可读性和可维护性。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">注释示例：</h5>
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# 这是单行注释

"""
这是多行注释
可以写多行
"""

def calculate_sum(a, b):
    """
    计算两个数的和
    
    参数:
        a (int/float): 第一个数
        b (int/float): 第二个数
    
    返回:
        int/float: 两个数的和
    
    示例:
        >>> calculate_sum(1, 2)
        3
    """
    return a + b`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">3. 代码缩进</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      Python使用缩进来表示代码块，通常使用4个空格作为一个缩进级别。
                      缩进必须保持一致，否则会导致语法错误。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">缩进示例：</h5>
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`def process_data(data):
    # 第一级缩进
    if data is not None:
        # 第二级缩进
        for item in data:
            # 第三级缩进
            if item > 0:
                print(item)
            else:
                print("负数")
    else:
        print("数据为空")

# 错误的缩进示例
def wrong_indent():
    print("正确")
   print("错误")  # 缩进不一致`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'data' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">Python数据类型</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">1. 基本数据类型</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      Python的基本数据类型包括数字、字符串、布尔值等。
                      每种类型都有其特定的操作和方法。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">基本类型示例：</h5>
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# 数字类型
integer = 42          # 整数
float_num = 3.14      # 浮点数
complex_num = 1 + 2j  # 复数

# 字符串类型
single_quote = 'Hello'    # 单引号
double_quote = "World"    # 双引号
multi_line = '''多行
字符串'''                 # 三引号

# 布尔类型
is_true = True
is_false = False

# 类型转换
str_num = str(42)     # 转换为字符串
int_str = int("42")   # 转换为整数
float_str = float("3.14")  # 转换为浮点数`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">2. 容器类型</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      Python提供了多种容器类型来存储和组织数据，
                      包括列表、元组、字典和集合。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">容器类型示例：</h5>
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# 列表 - 可变序列
fruits = ['apple', 'banana', 'orange']
fruits.append('grape')        # 添加元素
fruits.remove('banana')       # 删除元素
fruits[0] = 'pear'           # 修改元素

# 元组 - 不可变序列
coordinates = (10, 20)
# coordinates[0] = 30        # 错误：元组不可修改

# 字典 - 键值对
person = {
    'name': 'John',
    'age': 30,
    'city': 'New York'
}
person['job'] = 'Engineer'    # 添加键值对
del person['age']             # 删除键值对

# 集合 - 无序不重复元素集合
numbers = {1, 2, 3, 4, 5}
numbers.add(6)                # 添加元素
numbers.remove(1)             # 删除元素`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">3. 数据类型操作</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      每种数据类型都支持特定的操作和方法，
                      这些操作可以帮助我们处理和转换数据。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">常用操作示例：</h5>
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# 字符串操作
text = "Hello, World!"
print(text.upper())           # 转换为大写
print(text.lower())           # 转换为小写
print(text.split(','))        # 分割字符串
print(text.replace('o', '0')) # 替换字符

# 列表操作
numbers = [1, 2, 3, 4, 5]
print(sum(numbers))           # 求和
print(max(numbers))           # 最大值
print(min(numbers))           # 最小值
print(numbers[::-1])          # 反转列表

# 字典操作
info = {'name': 'Alice', 'age': 25}
print(info.keys())            # 获取所有键
print(info.values())          # 获取所有值
print(info.items())           # 获取所有键值对

# 集合操作
set1 = {1, 2, 3}
set2 = {3, 4, 5}
print(set1 | set2)            # 并集
print(set1 & set2)            # 交集
print(set1 - set2)            # 差集`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'control' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">控制流程</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">1. 条件语句</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      Python使用if-elif-else语句进行条件判断，
                      条件表达式的结果必须是布尔值。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">条件语句示例：</h5>
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# 基本if语句
age = 18
if age >= 18:
    print("成年人")
else:
    print("未成年人")

# 多条件判断
score = 85
if score >= 90:
    grade = 'A'
elif score >= 80:
    grade = 'B'
elif score >= 70:
    grade = 'C'
else:
    grade = 'D'

# 条件表达式（三元运算符）
age = 20
status = "成年人" if age >= 18 else "未成年人"

# 复杂条件
is_weekend = True
is_holiday = False
if is_weekend or is_holiday:
    print("休息日")
else:
    print("工作日")`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">2. 循环语句</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      Python提供了for循环和while循环两种循环结构，
                      以及break、continue等控制语句。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">循环语句示例：</h5>
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# for循环
fruits = ['apple', 'banana', 'orange']
for fruit in fruits:
    print(fruit)

# 使用range
for i in range(5):  # 0到4
    print(i)

# while循环
count = 0
while count < 5:
    print(count)
    count += 1

# break语句
for i in range(10):
    if i == 5:
        break
    print(i)

# continue语句
for i in range(5):
    if i == 2:
        continue
    print(i)

# 循环else子句
for i in range(5):
    print(i)
else:
    print("循环正常完成")`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">3. 异常处理</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      Python使用try-except语句处理异常，
                      可以捕获和处理程序运行时的错误。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">异常处理示例：</h5>
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# 基本异常处理
try:
    number = int(input("请输入一个数字："))
    result = 100 / number
except ValueError:
    print("输入无效，请输入数字")
except ZeroDivisionError:
    print("不能除以零")
except Exception as e:
    print(f"发生错误：{e}")
else:
    print(f"计算结果：{result}")
finally:
    print("程序执行完毕")

# 自定义异常
class CustomError(Exception):
    def __init__(self, message):
        self.message = message

# 抛出异常
def check_age(age):
    if age < 0:
        raise CustomError("年龄不能为负数")
    return age`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'function' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">函数编程</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">1. 函数定义与调用</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      函数是Python中的基本代码组织单位，
                      可以接收参数并返回结果。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">函数示例：</h5>
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# 基本函数定义
def greet(name):
    return f"Hello, {name}!"

# 带默认参数的函数
def power(base, exponent=2):
    return base ** exponent

# 可变参数
def sum_all(*args):
    return sum(args)

# 关键字参数
def person_info(**kwargs):
    for key, value in kwargs.items():
        print(f"{key}: {value}")

# 函数调用
print(greet("Alice"))                # 输出：Hello, Alice!
print(power(3))                      # 输出：9
print(power(3, 3))                   # 输出：27
print(sum_all(1, 2, 3, 4))           # 输出：10
person_info(name="Bob", age=30)      # 输出：name: Bob, age: 30`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">2. 函数式编程</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      Python支持函数式编程特性，
                      包括lambda表达式、map、filter、reduce等。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">函数式编程示例：</h5>
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# lambda表达式
square = lambda x: x ** 2
print(square(5))  # 输出：25

# map函数
numbers = [1, 2, 3, 4, 5]
squared = list(map(lambda x: x ** 2, numbers))
print(squared)  # 输出：[1, 4, 9, 16, 25]

# filter函数
even_numbers = list(filter(lambda x: x % 2 == 0, numbers))
print(even_numbers)  # 输出：[2, 4]

# reduce函数
from functools import reduce
product = reduce(lambda x, y: x * y, numbers)
print(product)  # 输出：120

# 列表推导式
squares = [x ** 2 for x in numbers]
print(squares)  # 输出：[1, 4, 9, 16, 25]

# 生成器表达式
squares_gen = (x ** 2 for x in numbers)
print(list(squares_gen))  # 输出：[1, 4, 9, 16, 25]`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">3. 装饰器</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      装饰器是Python的高级特性，
                      用于修改或增强函数的功能。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">装饰器示例：</h5>
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# 基本装饰器
def timer(func):
    def wrapper(*args, **kwargs):
        import time
        start = time.time()
        result = func(*args, **kwargs)
        end = time.time()
        print(f"函数 {func.__name__} 执行时间：{end - start}秒")
        return result
    return wrapper

# 使用装饰器
@timer
def slow_function():
    import time
    time.sleep(1)
    return "完成"

# 带参数的装饰器
def repeat(times):
    def decorator(func):
        def wrapper(*args, **kwargs):
            for _ in range(times):
                result = func(*args, **kwargs)
            return result
        return wrapper
    return decorator

@repeat(times=3)
def greet(name):
    print(f"Hello, {name}!")

# 类装饰器
class Logger:
    def __init__(self, func):
        self.func = func
        
    def __call__(self, *args, **kwargs):
        print(f"调用函数：{self.func.__name__}")
        return self.func(*args, **kwargs)

@Logger
def add(a, b):
    return a + b`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'oop' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">面向对象编程</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">1. 类与对象</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      Python是面向对象的语言，
                      支持类、继承、多态等特性。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">类与对象示例：</h5>
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# 基本类定义
class Person:
    # 类变量
    species = "人类"
    
    # 初始化方法
    def __init__(self, name, age):
        # 实例变量
        self.name = name
        self.age = age
    
    # 实例方法
    def introduce(self):
        return f"我叫{self.name}，今年{self.age}岁"
    
    # 类方法
    @classmethod
    def get_species(cls):
        return cls.species
    
    # 静态方法
    @staticmethod
    def is_adult(age):
        return age >= 18

# 创建对象
person = Person("张三", 25)
print(person.introduce())        # 输出：我叫张三，今年25岁
print(Person.get_species())      # 输出：人类
print(Person.is_adult(20))       # 输出：True`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">2. 继承与多态</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      Python支持单继承和多继承，
                      可以实现方法重写和多态。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">继承示例：</h5>
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# 基类
class Animal:
    def __init__(self, name):
        self.name = name
    
    def speak(self):
        pass

# 子类
class Dog(Animal):
    def speak(self):
        return f"{self.name}说：汪汪！"

class Cat(Animal):
    def speak(self):
        return f"{self.name}说：喵喵！"

# 多态示例
def animal_speak(animal):
    print(animal.speak())

# 创建对象
dog = Dog("旺财")
cat = Cat("咪咪")

# 调用方法
animal_speak(dog)  # 输出：旺财说：汪汪！
animal_speak(cat)  # 输出：咪咪说：喵喵！`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">3. 特殊方法</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      Python提供了许多特殊方法（魔术方法），
                      用于实现类的特定行为。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">特殊方法示例：</h5>
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`class Vector:
    def __init__(self, x, y):
        self.x = x
        self.y = y
    
    # 字符串表示
    def __str__(self):
        return f"Vector({self.x}, {self.y})"
    
    # 加法运算
    def __add__(self, other):
        return Vector(self.x + other.x, self.y + other.y)
    
    # 相等比较
    def __eq__(self, other):
        return self.x == other.x and self.y == other.y
    
    # 长度计算
    def __len__(self):
        return int((self.x ** 2 + self.y ** 2) ** 0.5)
    
    # 迭代器
    def __iter__(self):
        return iter([self.x, self.y])

# 使用示例
v1 = Vector(3, 4)
v2 = Vector(1, 2)
print(v1 + v2)        # 输出：Vector(4, 6)
print(len(v1))        # 输出：5
print(v1 == v2)       # 输出：False
for coord in v1:
    print(coord)      # 输出：3, 4`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'module' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">模块与包</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">1. 模块导入</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      Python使用import语句导入模块，
                      可以导入整个模块或特定内容。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">模块导入示例：</h5>
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# 导入整个模块
import math
print(math.pi)  # 输出：3.141592653589793

# 导入特定内容
from datetime import datetime
print(datetime.now())  # 输出当前时间

# 使用别名
import numpy as np
array = np.array([1, 2, 3])

# 导入所有内容（不推荐）
from math import *
print(sin(0))  # 输出：0.0`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">2. 包管理</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      包是模块的集合，使用__init__.py文件标识。
                      可以组织和管理大型项目。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">包结构示例：</h5>
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# 项目结构
myproject/
    __init__.py
    module1.py
    module2.py
    subpackage/
        __init__.py
        module3.py
        module4.py

# module1.py
def function1():
    return "Function 1"

# module2.py
def function2():
    return "Function 2"

# subpackage/module3.py
def function3():
    return "Function 3"

# 使用示例
from myproject import function1
from myproject.subpackage import function3

print(function1())  # 输出：Function 1
print(function3())  # 输出：Function 3`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">3. 虚拟环境</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      虚拟环境可以隔离项目依赖，
                      避免包版本冲突。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">虚拟环境示例：</h5>
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# 创建虚拟环境
python -m venv myenv

# 激活虚拟环境
# Windows
myenv\\Scripts\\activate
# Linux/Mac
source myenv/bin/activate

# 安装包
pip install numpy pandas

# 导出依赖
pip freeze > requirements.txt

# 安装依赖
pip install -r requirements.txt

# 退出虚拟环境
deactivate`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 底部导航 */}
      <div className="mt-8 flex justify-between">
        <Link 
          href="/study/ai/programming/environment"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          ← 开发环境配置
        </Link>
        <Link 
          href="/study/ai/programming/coding-standards"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          AI编程规范 →
        </Link>
      </div>
    </div>
  );
} 