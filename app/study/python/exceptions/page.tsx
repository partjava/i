'use client';

import { useState } from 'react';
import { Card, Tabs, Progress, Alert, Typography } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import Link from 'next/link';
import React from 'react';
import { ExceptionOutlined, SafetyOutlined, ThunderboltOutlined, ExperimentOutlined } from '@ant-design/icons';
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
          <ExceptionOutlined /> 异常基础
        </span>
      ),
      children: (
        <Card title="异常基础" className="mb-6">
          <div className="space-y-4 mt-4">
            <h3 className="text-xl font-semibold mb-2">基本捕获</h3>
            <Paragraph>使用<code>try</code>/<code>except</code>/<code>finally</code>捕获和清理。</Paragraph>
            <CodeBlock language="python">
              {`try:
    x = int(input("请输入数字: "))
    print(10 / x)
except ValueError:
    print("无效的输入，请输入整数。")
except ZeroDivisionError:
    print("不能除以零。")
finally:
    print("程序结束。")`}
            </CodeBlock>
            <Alert
              message="流程要点"
              description={
                <ul className="list-disc pl-6">
                  <li>先执行<code>try</code>块，出现异常则跳转<code>except</code></li>
                  <li>可定义多个<code>except</code>分支</li>
                  <li><code>finally</code>块无论是否异常都会执行</li>
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
          <SafetyOutlined /> 异常层次
        </span>
      ),
      children: (
        <Card title="异常层次" className="mb-6">
          <div className="space-y-4 mt-4">
            <h3 className="text-xl font-semibold mb-2">内置与自定义</h3>
            <Paragraph>Python内置多种异常，也可自定义异常类。</Paragraph>
            <CodeBlock language="python">
              {`# 自定义异常
class MyError(Exception):
    pass

try:
    raise MyError("示例错误")
except MyError as e:
    print(f"捕获到自定义异常: {e}")
except Exception:
    print("其他异常")`}
            </CodeBlock>
            <Alert
              message="层次要点"
              description={
                <ul className="list-disc pl-6">
                  <li>所有异常均继承自<code>BaseException</code></li>
                  <li>自定义异常需继承<code>Exception</code>类</li>
                  <li>捕获子类异常要放在父类之前</li>
                </ul>
              }
              type="warning"
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
          <ThunderboltOutlined /> 处理示例
        </span>
      ),
      children: (
        <Card title="处理示例" className="mb-6">
          <div className="space-y-4 mt-4">
            <h3 className="text-xl font-semibold mb-2">上下文管理</h3>
            <Paragraph>使用<code>contextlib.suppress</code>或<code>with</code>简化。</Paragraph>
            <CodeBlock language="python">
              {`from contextlib import suppress

with suppress(FileNotFoundError):
    with open('nofile.txt') as f:
        data = f.read()
    print(data)
print("继续执行...")`}
            </CodeBlock>
            <Alert
              message="示例要点"
              description={
                <ul className="list-disc pl-6">
                  <li><code>suppress</code>可选择性忽略指定异常</li>
                  <li><code>with</code>可管理资源确保关闭文件</li>
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
        <Card title="练习：安全除法" className="mb-6">
          <div className="space-y-4 mt-4">
            <h3 className="text-xl font-semibold mb-2">实现安全除法</h3>
            <Paragraph>编写函数<code>safe_div(a, b)</code>，当除数为0时返回<code>None</code>，否则返回商。</Paragraph>
            <CodeBlock language="python">
              {`def safe_div(a, b):
    try:
        return a / b
    except ZeroDivisionError:
        return None

print(safe_div(10, 2))  # 5.0
print(safe_div(10, 0))  # None`}
            </CodeBlock>
            <Alert
              message="知识点"
              description={
                <ul className="list-disc pl-6">
                  <li>设计函数时考虑异常场景</li>
                  <li>使用<code>try/except</code>控制错误返回</li>
                  <li>保持函数接口简单一致</li>
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
              <h1 className="text-3xl font-bold text-gray-900">异常处理</h1>
              <p className="text-gray-600 mt-2">学习Python的异常类型及处理机制</p>
            </div>
            <Progress type="circle" percent={70} size={80} strokeColor="#1890ff" />
          </div>
        </div>

        {/* 课程内容 */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <Tabs activeKey={activeTab} onChange={setActiveTab} className="p-6" items={tabItems} />
        </div>

        {/* 底部导航 */}
        <div className="flex justify-between mt-8">
          <Link
            href="/study/python/oop"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            <LeftOutlined className="mr-2" />
            上一课：面向对象编程
          </Link>
          <Link
            href="/study/python/stdlib"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            下一课：标准库
            <RightOutlined className="ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
} 