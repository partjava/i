'use client';

import { useState } from 'react';
import { Card, Tabs, Progress, Alert, Typography } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import Link from 'next/link';
import React from 'react';
import { FolderOpenOutlined, OrderedListOutlined, DatabaseOutlined, ExperimentOutlined } from '@ant-design/icons';
import { CodeBlock } from '@/app/components/ui/CodeBlock';

const { TabPane } = Tabs;
const { Text } = Typography;

export default function PythonFileIOPage() {
  const [activeTab, setActiveTab] = useState('1');

  const tabItems = [
    {
      key: '1',
      label: (
        <span>
          <FolderOpenOutlined /> 文件读写
        </span>
      ),
      children: (
        <Card title="文件读写" className="mb-6">
          <div className="space-y-4 mt-4">
            <h3 className="text-xl font-semibold mb-4">读写文本文件</h3>
            <p>使用 <Text code>open()</Text> 打开文本文件进行读取和写入。</p>
            <CodeBlock language="python">
              {`# 读取文件
with open('example.txt', 'r', encoding='utf-8') as f:
    content = f.read()
print(content)

# 写入文件
with open('output.txt', 'w', encoding='utf-8') as f:
    f.write('Hello, Python!')`}
            </CodeBlock>
            <Alert
              message="注意事项"
              description={
                <ul className="list-disc pl-6">
                  <li>文本模式下要指定合适的编码</li>
                  <li>写入模式('w')会覆盖已有内容，使用('a')可追加</li>
                  <li>用<code>with</code>上下文管理器确保文件自动关闭</li>
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
          <OrderedListOutlined /> 文件遍历
        </span>
      ),
      children: (
        <Card title="文件遍历" className="mb-6">
          <div className="space-y-4 mt-4">
            <h3 className="text-xl font-semibold mb-4">逐行读取与遍历目录</h3>
            <p>演示如何逐行读取大文件和使用 <code>os</code> 模块遍历目录。</p>
            <CodeBlock language="python">
              {`# 逐行读取大文件
with open('large.txt', 'r', encoding='utf-8') as f:
    for line in f:
        print(line.strip())

# 遍历目录
import os
for root, dirs, files in os.walk('.'):
    for file in files:
        print(os.path.join(root, file))`}
            </CodeBlock>
            <Alert
              message="性能提示"
              description={
                <ul className="list-disc pl-6">
                  <li>迭代读取节省内存，适合大文件</li>
                  <li><code>os.walk</code>递归遍历子目录</li>
                  <li>使用<code>pathlib</code>可获得更现代的API</li>
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
          <DatabaseOutlined /> 二进制与CSV
        </span>
      ),
      children: (
        <Card title="二进制与CSV处理" className="mb-6">
          <div className="space-y-4 mt-4">
            <h3 className="text-xl font-semibold mb-4">二进制文件读写</h3>
            <p>在二进制模式下读写非文本数据。</p>
            <CodeBlock language="python">
              {`# 读取二进制文件
with open('image.png', 'rb') as f:
    data = f.read()
print(len(data))  # 输出字节长度

# 写入二进制文件
with open('copy.png', 'wb') as f:
    f.write(data)`}
            </CodeBlock>
            <h3 className="text-xl font-semibold mt-6">CSV 文件处理</h3>
            <p>使用 <code>csv</code> 模块读写CSV文件。</p>
            <CodeBlock language="python">
              {`import csv

# 写入CSV
with open('data.csv', 'w', newline='', encoding='utf-8') as f:
    writer = csv.writer(f)
    writer.writerow(['name', 'age', 'city'])
    writer.writerow(['Alice', 25, 'Beijing'])

# 读取CSV
with open('data.csv', 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    for row in reader:
        print(row)`}
            </CodeBlock>
            <Alert
              message="模块提示"
              description={
                <ul className="list-disc pl-6">
                  <li><code>csv</code>模块默认处理文本CSV，需要指定newline=""</li>
                  <li>对于复杂数据可使用 <code>pandas</code> 库</li>
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
          <ExperimentOutlined /> 练习例题
        </span>
      ),
      children: (
        <Card title="实践案例：日志分析器" className="mb-6">
          <div className="space-y-4 mt-4">
            <h3 className="text-xl font-semibold mb-4">日志文件分析</h3>
            <p>实现一个日志分析工具，统计访问次数、错误等级和IP分布。</p>
            <CodeBlock language="python">
              {`# 示例: 读取日志并统计
from collections import Counter

def analyze_logs(path):
    counter = Counter()
    with open(path, 'r', encoding='utf-8') as f:
        for line in f:
            parts = line.split()
            counter[parts[2]] += 1  # 假设第3列是IP地址
    return counter

print(analyze_logs('access.log'))`}
            </CodeBlock>
            <Alert
              message="知识点"
              description={
                <ul className="list-disc pl-6">
                  <li>文本与二进制模式切换</li>
                  <li>使用<code>csv</code>和标准库模块处理结构化数据</li>
                  <li>迭代读取与流式处理</li>
                  <li>利用上下文管理器保证资源释放</li>
                </ul>
              }
              type="success"
              showIcon
            />
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
              <h1 className="text-3xl font-bold text-gray-900">文件操作</h1>
              <p className="text-gray-600 mt-2">学习Python的文件读写、遍历和CSV处理</p>
            </div>
            <Progress type="circle" percent={45} size={80} strokeColor="#1890ff" />
          </div>
        </div>

        {/* 课程内容 */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <Tabs activeKey={activeTab} onChange={setActiveTab} className="p-6" items={tabItems} />
        </div>

        {/* 底部导航 */}
        <div className="flex justify-between mt-8">
          <Link
            href="/study/python/functions"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            <LeftOutlined className="mr-2" />
            上一课：函数和模块
          </Link>
          <Link
            href="/study/python/oop"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            下一课：面向对象编程
            <RightOutlined className="ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
} 