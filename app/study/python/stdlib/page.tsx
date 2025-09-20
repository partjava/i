'use client';

import { useState } from 'react';
import { Card, Tabs, Progress, Alert, Typography } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import Link from 'next/link';
import React from 'react';
import { AppstoreOutlined, DesktopOutlined, CalendarOutlined, ExperimentOutlined } from '@ant-design/icons';
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
          <AppstoreOutlined /> 常用模块概览
        </span>
      ),
      children: (
        <Card title="常用模块概览" className="mb-6">
          <div className="space-y-4 mt-4">
            <Paragraph>导入并查看常用标准库模块。</Paragraph>
            <CodeBlock language="python">
              {`import os, sys, math, random

print(os.name)
print(sys.version)
print(math.pi)
print(random.randint(1, 10))`}
            </CodeBlock>
            <Alert
              message="要点"
              description={
                <ul className="list-disc pl-6">
                  <li>使用 <Text code>import</Text> 导入模块</li>
                  <li>每个模块提供专属功能，如数学运算、系统信息等</li>
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
          <DesktopOutlined /> OS与系统
        </span>
      ),
      children: (
        <Card title="OS与系统模块" className="mb-6">
          <div className="space-y-4 mt-4">
            <Paragraph>使用 <Text code>os</Text> 和 <Text code>sys</Text> 模块操作系统相关功能。</Paragraph>
            <CodeBlock language="python">
              {`import os
import sys

print(os.getcwd())
os.makedirs('test_dir', exist_ok=True)
print(sys.platform)`}
            </CodeBlock>
            <Alert
              message="要点"
              description={
                <ul className="list-disc pl-6">
                  <li><Text code>os</Text> 提供文件与目录操作</li>
                  <li><Text code>sys</Text> 提供解释器和环境信息</li>
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
          <CalendarOutlined /> 日期与时间
        </span>
      ),
      children: (
        <Card title="日期与时间模块" className="mb-6">
          <div className="space-y-4 mt-4">
            <Paragraph>使用 <Text code>datetime</Text> 和 <Text code>time</Text> 模块处理时间数据。</Paragraph>
            <CodeBlock language="python">
              {`import datetime
import time

print(datetime.datetime.now())
print(time.strftime('%Y-%m-%d %H:%M:%S'))`}
            </CodeBlock>
            <Alert
              message="要点"
              description={
                <ul className="list-disc pl-6">
                  <li><Text code>datetime</Text> 提供高层次日期时间处理</li>
                  <li><Text code>time</Text> 提供底层时间函数</li>
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
        <Card title="练习：CSV 数据统计" className="mb-6">
          <div className="space-y-4 mt-4">
            <Paragraph>读取 CSV 文件并计算某列平均值。</Paragraph>
            <CodeBlock language="python">
              {`import csv
import statistics

def avg_from_csv(path, col):
    with open(path, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        data = [float(row[col]) for row in reader]
    return statistics.mean(data)

print(avg_from_csv('data.csv', 'age'))`}
            </CodeBlock>
            <Alert
              message="知识点"
              description={
                <ul className="list-disc pl-6">
                  <li>使用 <Text code>csv.DictReader</Text> 解析 CSV</li>
                  <li>使用 <Text code>statistics</Text> 计算统计指标</li>
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
              <h1 className="text-3xl font-bold text-gray-900">标准库</h1>
              <p className="text-gray-600 mt-2">学习Python的常用标准库模块使用方法</p>
            </div>
            <Progress type="circle" percent={75} size={80} strokeColor="#1890ff" />
          </div>
        </div>

        {/* 课程内容 */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <Tabs activeKey={activeTab} onChange={setActiveTab} className="p-6" items={tabItems} />
        </div>

        {/* 底部导航 */}
        <div className="flex justify-between mt-8">
          <Link
            href="/study/python/exceptions"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            <LeftOutlined className="mr-2" />
            上一课：异常处理
          </Link>
          <Link
            href="/study/python/packages"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            下一课：第三方库
            <RightOutlined className="ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
} 