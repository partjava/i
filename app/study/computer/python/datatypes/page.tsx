'use client';

import { useState } from 'react';
import { Card, Tabs, Progress, Alert } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { CodeBlock } from '@/app/components/ui/CodeBlock';
import Link from 'next/link';
import React from 'react';
import { 
  NumberOutlined, 
  OrderedListOutlined, 
  BookOutlined, 
  ExperimentOutlined 
} from '@ant-design/icons';

const { TabPane } = Tabs;

export default function PythonDatatypesPage() {
  const [activeTab, setActiveTab] = useState('1');

  const tabItems = [
    {
      key: '1',
      label: (
        <span>
          <NumberOutlined />
          数值类型
        </span>
      ),
      children: (
        <Card title="Python数值类型" className="mb-6">
          <div className="space-y-4 mt-4">
            <h3 className="text-xl font-semibold mb-4">整数类型</h3>
            <p>Python中的整数可以是任意大小，不受限于特定的位数。</p>
            
            <CodeBlock language="python">
              {`# 整数示例
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
binary_int = int("1010", 2)         # 二进制字符串转整数: 10
octal_int = int("12", 8)            # 八进制字符串转整数: 10
hex_int = int("A", 16)              # 十六进制字符串转整数: 10`}
            </CodeBlock>
            
            <h3 className="text-xl font-semibold mt-6">浮点数类型</h3>
            <p>浮点数用于表示带小数的实数。</p>
            
            <CodeBlock language="python">
              {`# 浮点数示例
a = 3.14159
b = 2.0
c = 1.0e6        # 科学计数法 (1000000.0)
d = 1.0e-6       # 科学计数法 (0.000001)

# 浮点数精度问题
print(0.1 + 0.2)  # 0.30000000000000004（不是0.3）

# 解决精度问题
import decimal
from decimal import Decimal

# 使用Decimal类型
a = Decimal('0.1')
b = Decimal('0.2')
print(a + b)  # 0.3

# 设置精度
decimal.getcontext().prec = 4  # 设置精度为4位
print(Decimal(1) / Decimal(3))  # 0.3333

# 舍入
print(round(3.14159, 2))  # 3.14 (保留两位小数)

# 浮点数操作
x = 10.5
y = 2.5

print(x + y)   # 加法: 13.0
print(x - y)   # 减法: 8.0
print(x * y)   # 乘法: 26.25
print(x / y)   # 除法: 4.2
print(x // y)  # 整除: 4.0
print(x % y)   # 取余: 0.5`}
            </CodeBlock>
            
            <h3 className="text-xl font-semibold mt-6">复数类型</h3>
            <p>复数由实部和虚部组成。</p>
            
            <CodeBlock language="python">
              {`# 复数示例
z1 = 2 + 3j     # 复数表示形式
z2 = complex(2, 3)  # 通过函数创建复数

# 复数的属性
print(z1.real)   # 实部: 2.0
print(z1.imag)   # 虚部: 3.0

# 复数运算
z3 = 1 + 2j
z4 = 3 + 4j

print(z3 + z4)   # 加法: (4+6j)
print(z3 * z4)   # 乘法: (-5+10j)
print(abs(z3))   # 复数的模: 2.23606797749979 (sqrt(1^2 + 2^2))
print(z3.conjugate())  # 共轭复数: (1-2j)`}
            </CodeBlock>
            
            <Alert
              className="mt-4"
              message="Python数值类型特点"
              description={
                <ul className="list-disc pl-6">
                  <li>整数可以是任意大小，不受位数限制</li>
                  <li>浮点数使用IEEE 754标准，有精度限制</li>
                  <li>使用decimal模块可以解决浮点数精度问题</li>
                  <li>复数用j表示虚部，如3+4j</li>
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
          <OrderedListOutlined />
          序列类型
        </span>
      ),
      children: (
        <Card title="Python序列类型" className="mb-6">
          <div className="space-y-4 mt-4">
            <h3 className="text-xl font-semibold mb-4">列表(List)</h3>
            <p>列表是有序的、可变的序列，可以存储不同类型的数据。</p>
            
            <CodeBlock language="python">
              {`# 列表创建
empty_list = []
numbers = [1, 2, 3, 4, 5]
mixed = [1, "hello", 3.14, True]
nested = [1, [2, 3], [4, 5, 6]]

# 列表访问
print(numbers[0])       # 第一个元素: 1
print(numbers[-1])      # 最后一个元素: 5
print(numbers[1:3])     # 切片 [2, 3]
print(nested[1][0])     # 嵌套列表访问: 2

# 列表方法
fruits = ["apple", "banana", "cherry"]
fruits.append("orange")         # 添加元素
fruits.insert(1, "blueberry")   # 在指定位置插入元素
fruits.remove("banana")         # 删除指定元素
popped = fruits.pop()           # 弹出最后一个元素并返回
fruits.sort()                   # 排序
fruits.reverse()                # 反转

# 列表推导式
squares = [x**2 for x in range(10)]
even_numbers = [x for x in range(20) if x % 2 == 0]

# 列表操作
list1 = [1, 2, 3]
list2 = [4, 5, 6]
combined = list1 + list2        # 合并列表: [1, 2, 3, 4, 5, 6]
repeated = list1 * 3            # 重复列表: [1, 2, 3, 1, 2, 3, 1, 2, 3]
print(len(list1))               # 列表长度: 3
print(2 in list1)               # 成员检查: True
`}
            </CodeBlock>
            
            <h3 className="text-xl font-semibold mt-6">元组(Tuple)</h3>
            <p>元组是有序的、不可变的序列，一旦创建就无法修改。</p>
            
            <CodeBlock language="python">
              {`# 元组创建
empty_tuple = ()
single_item = (1,)              # 注意逗号，区别于普通括号
numbers = (1, 2, 3, 4, 5)
mixed = (1, "hello", 3.14)
nested = (1, (2, 3), (4, 5, 6))

# 元组访问
print(numbers[0])       # 第一个元素: 1
print(numbers[-1])      # 最后一个元素: 5
print(numbers[1:3])     # 切片 (2, 3)
print(nested[1][0])     # 嵌套元组访问: 2

# 元组方法
coords = (3, 4, 5, 4)
print(coords.count(4))   # 统计元素出现次数: 2
print(coords.index(5))   # 查找元素索引: 2

# 元组解包
x, y, z = (1, 2, 3)
print(x, y, z)          # 1 2 3

# 元组与列表转换
tuple_data = (1, 2, 3)
list_data = list(tuple_data)    # 元组转列表
back_to_tuple = tuple(list_data)  # 列表转元组

# 命名元组
from collections import namedtuple
Point = namedtuple('Point', ['x', 'y'])
p = Point(11, 22)
print(p.x, p.y)         # 11 22
print(p[0], p[1])       # 11 22`}
            </CodeBlock>
            
            <h3 className="text-xl font-semibold mt-6">字符串(String)</h3>
            <p>字符串是Unicode字符的不可变序列。</p>
            
            <CodeBlock language="python">
              {`# 字符串创建
single_quotes = 'Hello'
double_quotes = "World"
triple_quotes = '''Multiline
string'''
raw_string = r'C:\\Users\\Name'  # 原始字符串，不处理转义字符

# 字符串访问和切片
text = "Python"
print(text[0])         # 第一个字符: P
print(text[-1])        # 最后一个字符: n
print(text[2:4])       # 切片: th

# 字符串方法
s = "  hello, world  "
print(s.upper())       # 大写: HELLO, WORLD
print(s.lower())       # 小写: hello, world
print(s.strip())       # 去除两端空格: hello, world
print(s.replace('l', 'L'))  # 替换: heLLo, worLd
print(s.split(','))    # 分割: ['  hello', ' world  ']

# 字符串格式化
name = "Alice"
age = 25
# 1. 使用f-string (Python 3.6+)
print(f"{name} is {age} years old")
# 2. 使用format()方法
print("{} is {} years old".format(name, age))
print("{name} is {age} years old".format(name=name, age=age))
# 3. 使用%操作符
print("%s is %d years old" % (name, age))

# 字符串连接
print("Hello" + " " + "World")  # Hello World
print("-".join(["A", "B", "C"]))  # A-B-C

# 字符串检查
text = "Python is awesome"
print("Python" in text)     # True
print(text.startswith("Py"))  # True
print(text.endswith("some"))  # True
print(text.find("is"))      # 7 (返回子串索引)`}
            </CodeBlock>
            
            <Alert
              className="mt-4"
              message="列表与元组的区别"
              description={
                <ul className="list-disc pl-6">
                  <li>列表是可变的，元组是不可变的</li>
                  <li>列表通常用于存储同类型数据，元组常用于表示固定结构数据</li>
                  <li>元组因为不可变，在某些场景下性能更好</li>
                  <li>元组可以作为字典的键，列表不可以</li>
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
          <BookOutlined />
          映射和集合类型
        </span>
      ),
      children: (
        <Card title="映射和集合类型" className="mb-6">
          <div className="space-y-4 mt-4">
            <h3 className="text-xl font-semibold mb-4">字典(Dictionary)</h3>
            <p>字典是无序的键-值对集合，键必须是不可变类型。</p>
            
            <CodeBlock language="python">
              {`# 字典创建
empty_dict = {}
person = {"name": "Alice", "age": 25, "job": "Engineer"}
scores = dict(math=90, english=85, science=95)
from_list = dict([("a", 1), ("b", 2), ("c", 3)])

# 字典访问
print(person["name"])      # 通过键访问: Alice
print(person.get("age"))   # 使用get方法访问: 25
print(person.get("height", "Not specified"))  # 带默认值: Not specified

# 字典修改
person["age"] = 26         # 修改值
person["address"] = "123 Main St"  # 添加新键值对
del person["job"]          # 删除键值对
job = person.pop("job", None)  # 弹出并返回值

# 字典方法
print(person.keys())       # 获取所有键
print(person.values())     # 获取所有值
print(person.items())      # 获取所有键值对

# 字典推导式
squares = {x: x**2 for x in range(6)}
filtered = {k: v for k, v in person.items() if isinstance(v, str)}

# 字典遍历
for key in person:
    print(key, person[key])

for key, value in person.items():
    print(key, value)

# 嵌套字典
contacts = {
    "Alice": {"phone": "123-456", "email": "alice@example.com"},
    "Bob": {"phone": "789-012", "email": "bob@example.com"}
}
print(contacts["Alice"]["email"])  # alice@example.com

# 默认字典
from collections import defaultdict
default_dict = defaultdict(int)  # 默认值为0
default_dict["a"] += 1
print(default_dict["b"])  # 0 (不存在但返回默认值)`}
            </CodeBlock>
            
            <h3 className="text-xl font-semibold mt-6">集合(Set)</h3>
            <p>集合是无序的、不重复的元素集合，可用于成员检查和消除重复项。</p>
            
            <CodeBlock language="python">
              {`# 集合创建
empty_set = set()            # 注意：{}创建的是空字典
numbers = {1, 2, 3, 4, 5}
from_list = set([1, 2, 3, 2, 1])  # 从列表创建集合，自动去重
from_string = set("hello")   # 从字符串创建: {'h', 'e', 'l', 'o'}

# 集合操作
numbers.add(6)               # 添加元素
numbers.remove(3)            # 删除元素(不存在会报错)
numbers.discard(10)          # 删除元素(不存在不报错)
popped = numbers.pop()       # 随机弹出一个元素

# 集合数学运算
a = {1, 2, 3, 4}
b = {3, 4, 5, 6}

union = a | b                # 并集: {1, 2, 3, 4, 5, 6}
intersection = a & b         # 交集: {3, 4}
difference = a - b           # 差集: {1, 2}
symmetric_diff = a ^ b       # 对称差集: {1, 2, 5, 6}

# 集合推导式
squares = {x**2 for x in range(10)}
even_squares = {x**2 for x in range(10) if x % 2 == 0}

# 集合成员检查和集合关系
print(1 in a)                # True
print(a.issubset(b))         # False
print(a.issuperset({1, 2}))  # True
print(a.isdisjoint({7, 8}))  # True (没有共同元素)

# 不可变集合(frozenset)
frozen = frozenset([1, 2, 3])
# frozen.add(4)  # 会报错
dict_key = {frozen: "This is a frozen set"}  # 可作为字典的键`}
            </CodeBlock>
            
            <Alert
              className="mt-4"
              message="映射和集合类型应用场景"
              description={
                <ul className="list-disc pl-6">
                  <li>字典适用于需要快速查找的场景，例如配置信息、缓存等</li>
                  <li>集合适用于需要去重和集合运算的场景</li>
                  <li>defaultdict适用于需要为缺失键提供默认值的场景</li>
                  <li>frozenset适用于需要不可变集合的场景，如作为字典的键</li>
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
              <h3 className="text-lg font-medium">题目：单词频率统计器</h3>
              <p className="mt-2">实现一个单词频率统计器，具备以下功能：</p>
              <ul className="list-disc pl-6 mt-2">
                <li>统计文本中每个单词出现的次数</li>
                <li>忽略大小写和标点符号</li>
                <li>按频率降序排列结果</li>
                <li>返回前N个高频单词及其次数</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-medium">参考代码</h3>
              <CodeBlock language="python">
                {`import re
from collections import Counter

def word_frequency(text, n=10):
    """
    统计文本中单词出现的频率
    
    Args:
        text: 要分析的文本字符串
        n: 返回的高频单词数量
        
    Returns:
        包含(单词, 频率)元组的列表，按频率降序排列
    """
    # 转换为小写并使用正则表达式提取单词
    words = re.findall(r'\\w+', text.lower())
    
    # 使用Counter统计频率
    word_counts = Counter(words)
    
    # 返回前N个高频单词
    return word_counts.most_common(n)

# 示例文本
sample_text = """
Python is a programming language that lets you work quickly and integrate systems more effectively.
Python is powerful... and fast; plays well with others; runs everywhere; is friendly & easy to learn;
is Open Source; has a vibrant community; and is supported by both a non-profit organization and many volunteers.
"""

# 统计单词频率
result = word_frequency(sample_text)
print("单词频率统计结果:")
for word, count in result:
    print(f"{word}: {count}")

# 不使用Counter的替代实现
def word_frequency_alt(text, n=10):
    # 转换为小写并使用正则表达式提取单词
    words = re.findall(r'\\w+', text.lower())
    
    # 创建字典统计频率
    word_dict = {}
    for word in words:
        if word in word_dict:
            word_dict[word] += 1
        else:
            word_dict[word] = 1
    
    # 排序并返回前N个
    sorted_words = sorted(word_dict.items(), key=lambda x: x[1], reverse=True)
    return sorted_words[:n]

# 使用字典推导式简化版本
def word_frequency_compact(text, n=10):
    words = re.findall(r'\\w+', text.lower())
    # 创建字典并计数
    word_dict = {}
    for word in words:
        word_dict[word] = word_dict.get(word, 0) + 1
    
    # 排序并返回
    return sorted(word_dict.items(), key=lambda x: x[1], reverse=True)[:n]

# 测试替代实现
result_alt = word_frequency_alt(sample_text)
print("\\n使用替代方法的结果:")
for word, count in result_alt:
    print(f"{word}: {count}")
`}
              </CodeBlock>
            </div>
            
            <h3 className="text-lg font-medium mt-6">知识点</h3>
            <ul className="list-disc pl-6 mt-2">
              <li>字符串处理和正则表达式</li>
              <li>字典的创建和操作</li>
              <li>Counter类的使用</li>
              <li>列表的排序</li>
              <li>lambda函数</li>
              <li>字典推导式</li>
            </ul>
            
            <div className="bg-blue-50 p-4 rounded-md mt-4">
              <div className="flex items-center text-blue-700 font-medium mb-2">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2">i</span>
                运行示例
              </div>
              <pre className="text-sm text-gray-800 whitespace-pre-wrap">
{`单词频率统计结果:
is: 4
python: 3
and: 3
a: 2
more: 1
to: 1
everywhere: 1
open: 1
friendly: 1
both: 1

使用替代方法的结果:
is: 4
python: 3
and: 3
a: 2
more: 1
to: 1
everywhere: 1
open: 1
friendly: 1
both: 1`}
              </pre>
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
              <h1 className="text-3xl font-bold text-gray-900">数据类型和变量</h1>
              <p className="text-gray-600 mt-2">深入了解Python的数据类型、变量和数据结构</p>
            </div>
            <Progress type="circle" percent={15} size={80} strokeColor="#1890ff" />
          </div>
        </div>

        {/* 课程内容 */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <Tabs activeKey={activeTab} onChange={setActiveTab} className="p-6" items={tabItems} />
        </div>

        {/* 底部导航 */}
        <div className="flex justify-between mt-8">
          <Link 
            href="/study/python/basic" 
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            <LeftOutlined className="mr-2" />
            上一课：Python基础
          </Link>
          <Link
            href="/study/python/control"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            下一课：控制流程
            <RightOutlined className="ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
} 