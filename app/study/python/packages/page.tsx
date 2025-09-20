'use client';

import { useState } from 'react';
import { Card, Tabs, Progress, Alert, Typography } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import Link from 'next/link';
import React from 'react';
import { GlobalOutlined, DatabaseOutlined, BarChartOutlined, ExperimentOutlined } from '@ant-design/icons';
import { CodeBlock } from '@/app/components/ui/CodeBlock';

const { TabPane } = Tabs;
const { Title, Paragraph, Text } = Typography;

export default function Page() {
  const [activeTab, setActiveTab] = useState('1');

  const tabItems = [
    {
      key: '1',
      label: (
        <span><GlobalOutlined /> 网络请求</span>
      ),
      children: (
        <Card title="网络请求 (requests)" className="mb-6">
          <div className="space-y-4 mt-4">
            <h3 className="text-xl font-semibold">使用 requests 发送 HTTP 请求</h3>
            <Paragraph>展示GET和POST请求示例，并处理响应和异常。</Paragraph>
            <CodeBlock language="python">
{`import requests

# 发送GET请求
response = requests.get('https://api.github.com/repos/psf/requests')
print(response.status_code)
data = response.json()
print(data['stargazers_count'], 'stars')

# POST请求示例
payload = {'key': 'value'}
response = requests.post('https://httpbin.org/post', json=payload)
print(response.json())`}
            </CodeBlock>
            <Alert
              message="要点"
              description={
                <ul className="list-disc pl-6">
                  <li>使用<code>requests.get/post</code>发送请求</li>
                  <li>通过<code>response.status_code</code>检查状态</li>
                  <li><code>response.json()</code>解析JSON响应</li>
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
        <span><DatabaseOutlined /> 数据处理</span>
      ),
      children: (
        <Card title="数据处理 (pandas & numpy)" className="mb-6">
          <div className="space-y-4 mt-4">
            <h3 className="text-xl font-semibold">pandas 读取与处理表格数据</h3>
            <CodeBlock language="python">
{`import pandas as pd
import numpy as np

# 读取CSV
df = pd.read_csv('data.csv')
print(df.head())

# 计算统计信息
print(df['age'].mean(), df['salary'].median())

# 使用NumPy进行数组计算
arr = np.array([1, 2, 3, 4])
print(np.sqrt(arr), np.mean(arr))`}
            </CodeBlock>
            <Alert
              message="要点"
              description={
                <ul className="list-disc pl-6">
                  <li><code>pandas</code>提供DataFrame结构</li>
                  <li><code>numpy</code>用于高效数组运算</li>
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
        <span><BarChartOutlined /> 数据可视化</span>
      ),
      children: (
        <Card title="数据可视化 (matplotlib & seaborn)" className="mb-6">
          <div className="space-y-4 mt-4">
            <h3 className="text-xl font-semibold">绘制图表示例</h3>
            <CodeBlock language="python">
{`import matplotlib.pyplot as plt
import seaborn as sns

# 简单折线图
x = [1, 2, 3, 4]
y = [10, 20, 15, 30]
plt.plot(x, y, marker='o')
plt.title('示例折线图')
plt.xlabel('X轴')
plt.ylabel('Y轴')
plt.show()

# seaborn 散点图
sns.scatterplot(x='age', y='salary', data=df)
plt.show()`}
            </CodeBlock>
            <Alert
              message="要点"
              description={
                <ul className="list-disc pl-6">
                  <li>使用<code>matplotlib</code>基础绘图</li>
                  <li><code>seaborn</code>简化统计可视化</li>
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
        <span><ExperimentOutlined /> 练习示例</span>
      ),
      children: (
        <Card title="练习：API和可视化" className="mb-6">
          <div className="space-y-4 mt-4">
            <h3 className="text-xl font-semibold">综合实践</h3>
            <Paragraph>从公共API获取数据，并使用pandas处理和matplotlib绘图。</Paragraph>
            <CodeBlock language="python">
{`# 获取疫情API数据
import requests, pandas as pd, matplotlib.pyplot as plt

resp = requests.get('https://api.covid19api.com/summary')
data = resp.json()['Countries']
df = pd.DataFrame(data)

df_top = df.nlargest(5, 'TotalConfirmed')[['Country', 'TotalConfirmed']]
df_top.plot.bar(x='Country', y='TotalConfirmed')
plt.title('Top 5 Confirmed Cases')
plt.show()`}
            </CodeBlock>
            <Alert
              message="知识点"
              description={
                <ul className="list-disc pl-6">
                  <li>综合使用requests、pandas和matplotlib</li>
                  <li>数据清洗与可视化流程</li>
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
              <h1 className="text-3xl font-bold text-gray-900">第三方库</h1>
              <p className="text-gray-600 mt-2">学习常见Python第三方库的使用方法</p>
            </div>
            <Progress type="circle" percent={85} size={80} strokeColor="#1890ff" />
          </div>
        </div>

        {/* 课程内容 */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <Tabs activeKey={activeTab} onChange={setActiveTab} className="p-6" items={tabItems} />
        </div>

        {/* 底部导航 */}
        <div className="flex justify-between mt-8">
          <Link
            href="/study/python/stdlib"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            <LeftOutlined className="mr-2" />
            上一课：标准库
          </Link>
          <Link
            href="/study/python/projects"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            下一课：项目实战
            <RightOutlined className="ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
} 