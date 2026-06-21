'use client';

import { useState } from 'react';
import { Card, Tabs, Progress, Alert, Typography } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import Link from 'next/link';
import React from 'react';
import { ProfileOutlined, BranchesOutlined, CodeOutlined, ExperimentOutlined } from '@ant-design/icons';
import { CodeBlock } from '@/app/components/ui/CodeBlock';

const { TabPane } = Tabs;
const { Title, Paragraph, Text } = Typography;

export default function Page() {
  const [activeTab, setActiveTab] = useState('1');

  const tabItems = [
    {
      key: '1',
      label: (
        <span>
          <ProfileOutlined /> 类与对象
        </span>
      ),
      children: (
        <Card title="类与对象" className="mb-6">
          <div className="space-y-4 mt-4">
            <h3 className="text-xl font-semibold mb-4">定义类和实例化</h3>
            <Paragraph>使用 <Text code>class</Text> 关键字定义类，并通过调用类创建对象实例。</Paragraph>
            <CodeBlock language="python">
              {`class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

# 创建对象
p = Person("Alice", 30)
print(p.name, p.age)  # 输出: Alice 30`}
            </CodeBlock>
            <Alert
              message="要点"
              description={
                <ul className="list-disc pl-6">
                  <li>类的实例属性通过 <Text code>self</Text> 引用</li>
                  <li>构造方法 <Text code>__init__</Text> 用于初始化对象</li>
                </ul>
              }
              type="info"
              showIcon
            />
          </div>
        </Card>
      )
    },
    {
      key: '2',
      label: (
        <span>
          <BranchesOutlined /> 继承与多态
        </span>
      ),
      children: (
        <Card title="继承与多态" className="mb-6">
          <div className="space-y-4 mt-4">
            <h3 className="text-xl font-semibold mb-4">子类继承示例</h3>
            <Paragraph>通过在类定义中指定父类，实现继承和方法重写。</Paragraph>
            <CodeBlock language="python">
              {`class Animal:
    def speak(self):
        print("动物发声")

class Dog(Animal):
    def speak(self):
        super().speak()
        print("汪汪")

d = Dog()
d.speak()
# 输出:
# 动物发声
# 汪汪`}
            </CodeBlock>
            <Alert
              message="要点"
              description={
                <ul className="list-disc pl-6">
                  <li>使用 <Text code>super()</Text> 调用父类方法</li>
                  <li>多态：不同子类可实现同名方法的不同行为</li>
                </ul>
              }
              type="info"
              showIcon
            />
          </div>
        </Card>
      )
    },
    {
      key: '3',
      label: (
        <span>
          <CodeOutlined /> 魔术方法
        </span>
      ),
      children: (
        <Card title="魔术方法" className="mb-6">
          <div className="space-y-4 mt-4">
            <h3 className="text-xl font-semibold mb-4">常用魔术方法示例</h3>
            <Paragraph>魔术方法以双下划线开头，定义特殊行为。</Paragraph>
            <CodeBlock language="python">
              {`class Vector:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __add__(self, other):
        return Vector(self.x + other.x, self.y + other.y)

    def __str__(self):
        return f"Vector({self.x}, {self.y})"

v1 = Vector(1, 2)
v2 = Vector(3, 4)
print(v1 + v2)  # 输出: Vector(4, 6)`}
            </CodeBlock>
            <Alert
              message="要点"
              description={
                <ul className="list-disc pl-6">
                  <li>__add__ 实现运算符重载</li>
                  <li>__str__ 定义对象的字符串表示</li>
                </ul>
              }
              type="info"
              showIcon
            />
          </div>
        </Card>
      )
    },
    {
      key: '4',
      label: (
        <span>
          <ExperimentOutlined /> 练习例题
        </span>
      ),
      children: (
        <Card title="实践案例：银行账户" className="mb-6">
          <div className="space-y-4 mt-4">
            <h3 className="text-xl font-semibold mb-4">实现银行账户类</h3>
            <Paragraph>创建一个 BankAccount 类，支持 存款、取款 和 显示余额。</Paragraph>
            <CodeBlock language="python">
              {`class BankAccount:
    def __init__(self, owner, balance=0):
        self.owner = owner
        self.balance = balance

    def deposit(self, amount):
        self.balance += amount

    def withdraw(self, amount):
        if amount <= self.balance:
            self.balance -= amount
        else:
            print("余额不足")

    def __str__(self):
        return f"{self.owner} 账户余额: {self.balance}"

# 测试
acc = BankAccount("张三", 1000)
acc.deposit(500)
acc.withdraw(200)
print(acc)
# 输出: 张三 账户余额: 1300`}
            </CodeBlock>
            <Alert
              message="知识点"
              description={
                <ul className="list-disc pl-6">
                  <li>封装：方法操作内部状态</li>
                  <li>方法参数和返回值设计</li>
                  <li>错误处理示例：余额不足</li>
                </ul>
              }
              type="success"
              showIcon
            />
          </div>
        </Card>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 页面头部 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">面向对象编程</h1>
              <p className="text-gray-600 mt-2">学习Python的类、继承、魔术方法和封装</p>
            </div>
            <Progress type="circle" percent={50} size={100} strokeColor="#1890ff" />
          </div>
        </div>

        {/* 课程内容 */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <Tabs activeKey={activeTab} onChange={setActiveTab} className="p-6" items={tabItems} />
        </div>

        {/* 底部导航 */}
        <div className="flex justify-between mt-8">
          <Link
            href="/study/python/file-io"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            <LeftOutlined className="mr-2" />
            上一课：文件操作
          </Link>
          <Link
            href="/study/python/exceptions"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            下一课：异常处理
            <RightOutlined className="ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
} 