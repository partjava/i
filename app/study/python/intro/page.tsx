'use client';

import { useState } from 'react';
import { Card, Tabs, Progress, Alert } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { CodeBlock } from '@/app/components/ui/CodeBlock';
import Link from 'next/link';
import React from 'react';
import { 
  RocketOutlined, 
  ToolOutlined, 
  AppstoreOutlined, 
  ExperimentOutlined 
} from '@ant-design/icons';

const { TabPane } = Tabs;

export default function PythonIntroPage() {
  const [activeTab, setActiveTab] = useState('1');

  const tabItems = [
    {
      key: '1',
      label: (
        <span>
          <RocketOutlined />
          语言特点
        </span>
      ),
      children: (
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-3">Python简介</h3>
            <p className="text-gray-700 leading-relaxed">Python是一种简单易学、功能强大的编程语言。它具有高效的高级数据结构，能够简单有效地实现面向对象编程。</p>
          </div>
          
          <Alert
            message="Python主要特点"
            description={
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>简单易学：Python有着相对较少的关键字，结构简单，学习起来更加容易</li>
                <li>可读性好：Python代码定义独特的缩进风格，使得代码更易于阅读和理解</li>
                <li>解释型语言：无需编译，可立即执行</li>
                <li>面向对象：支持面向对象的编程思想</li>
                <li>丰富的库：标准库和第三方库非常丰富，几乎任何任务都有相应的库支持</li>
              </ul>
            }
            type="info"
            showIcon
            className="border-l-4 border-blue-500"
          />
          
          <div>
            <h3 className="text-xl font-semibold mb-3">Python版本</h3>
            <p className="text-gray-700 mb-3">目前Python有两个主要的版本：</p>
            <CodeBlock language="bash">
              {`# Python 3.x（推荐使用的版本）
$ python --version
Python 3.10.0

# Python 2.x（已于2020年停止支持）
$ python2 --version
Python 2.7.18`}
            </CodeBlock>
          </div>
        </div>
      ),
    },
    {
      key: '2',
      label: (
        <span>
          <ToolOutlined />
          开发环境
        </span>
      ),
      children: (
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-3">安装Python</h3>
            <p className="text-gray-700 mb-3">从官方网站下载并安装Python：</p>
            <Alert
              message="下载链接"
              description={
                <a href="https://www.python.org/downloads/" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="text-blue-500 hover:text-blue-600"
                >
                  https://www.python.org/downloads/
                </a>
              }
              type="info"
              showIcon
            />
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-3">集成开发环境(IDE)</h3>
            <p className="text-gray-700 mb-3">推荐的Python IDE和编辑器：</p>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              <li>PyCharm: 功能全面的Python IDE</li>
              <li>Visual Studio Code: 轻量级且功能强大的编辑器</li>
              <li>Jupyter Notebook: 适合数据科学和机器学习</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-3">虚拟环境</h3>
            <p className="text-gray-700 mb-3">使用虚拟环境管理依赖：</p>
            <CodeBlock language="bash">
              {`# 创建虚拟环境
python -m venv myenv

# 激活虚拟环境（Windows）
myenv\\Scripts\\activate

# 激活虚拟环境（MacOS/Linux）
source myenv/bin/activate

# 安装包
pip install package_name`}
            </CodeBlock>
          </div>
        </div>
      ),
    },
    {
      key: '3',
      label: (
        <span>
          <AppstoreOutlined />
          基础语法
        </span>
      ),
      children: (
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-3">基本语法示例</h3>
            <CodeBlock language="python">
              {`# 注释以 # 开头

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
print(message)

# 列表操作
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
person["location"] = "New York"
`}
            </CodeBlock>
          </div>
          
          <Alert
            message="Python语法特点"
            description={
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>使用缩进表示代码块，而不是花括号</li>
                <li>变量无需声明类型</li>
                <li>字符串可以用单引号或双引号</li>
                <li>列表、元组、字典是核心数据结构</li>
              </ul>
            }
            type="info"
            showIcon
          />
        </div>
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
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-2">题目：创建一个简单的计算器</h3>
            <p className="text-gray-700 mb-3">实现一个可以进行基本数学运算的计算器：</p>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              <li>支持加减乘除四种运算</li>
              <li>处理输入错误</li>
              <li>允许用户连续计算</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-3">参考代码</h3>
            <CodeBlock language="python">
              {`def calculator():
    """简单的计算器函数，支持加减乘除"""
    
    print("欢迎使用Python计算器！")
    print("输入'q'退出")
    
    while True:
        # 获取用户输入
        try:
            num1 = input("\\n请输入第一个数字: ")
            if num1.lower() == 'q':
                break
            num1 = float(num1)
            
            operation = input("请输入运算符 (+, -, *, /): ")
            if operation.lower() == 'q':
                break
                
            num2 = input("请输入第二个数字: ")
            if num2.lower() == 'q':
                break
            num2 = float(num2)
            
            # 执行计算
            if operation == '+':
                result = num1 + num2
                print(f"{num1} + {num2} = {result}")
            elif operation == '-':
                result = num1 - num2
                print(f"{num1} - {num2} = {result}")
            elif operation == '*':
                result = num1 * num2
                print(f"{num1} * {num2} = {result}")
            elif operation == '/':
                if num2 == 0:
                    print("错误：除数不能为零！")
                else:
                    result = num1 / num2
                    print(f"{num1} / {num2} = {result}")
            else:
                print("不支持的运算符！请使用 +, -, *, /")
                
        except ValueError:
            print("输入无效！请输入数字。")
        except Exception as e:
            print(f"发生错误：{e}")
            
    print("谢谢使用！")

# 运行计算器
if __name__ == "__main__":
    calculator()
`}
            </CodeBlock>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-3">知识点</h3>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              <li>函数定义和调用</li>
              <li>条件语句和循环</li>
              <li>异常处理</li>
              <li>用户输入和类型转换</li>
              <li>字符串格式化</li>
            </ul>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-md border-l-4 border-blue-500">
            <div className="flex items-center text-blue-700 font-medium mb-2">
              <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2">i</span>
              运行示例
            </div>
            <pre className="text-sm text-gray-800 whitespace-pre-wrap">
{`欢迎使用Python计算器！
输入'q'退出

请输入第一个数字: 10
请输入运算符 (+, -, *, /): *
请输入第二个数字: 5
10.0 * 5.0 = 50.0

请输入第一个数字: 20
请输入运算符 (+, -, *, /): /
请输入第二个数字: 4
20.0 / 4.0 = 5.0

请输入第一个数字: q
谢谢使用！`}
            </pre>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div>
        {/* 页面标题 */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Python编程入门</h1>
              <p className="text-gray-600 mt-2">轻松学习Python编程语言基础</p>
            </div>
            <Progress type="circle" percent={5} size={80} strokeColor="#1890ff" />
          </div>
        </div>

        {/* 课程内容 */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <Tabs activeKey={activeTab} onChange={setActiveTab} items={tabItems} />
        </div>

        {/* 底部导航 */}
        <div className="flex justify-between mt-6">
          <Link 
            href="/study" 
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            <LeftOutlined className="mr-2" />
            返回学习中心
          </Link>
          <Link
            href="/study/python/basic"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            下一课：Python基础
            <RightOutlined className="ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
} 