'use client';

import React from 'react';
import { Card, Tabs, Progress, Alert, Typography, Collapse } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { CodeBlock } from '@/app/components/ui/CodeBlock';

const { Paragraph } = Typography;

export default function DsBasicPage() {
  const tabItems = [
    {
      key: '1',
      label: '📚 算法与数据结构简介',
      children: (
        <Card title="算法与数据结构简介" className="mb-6">
          <Paragraph>算法是解决问题的步骤和方法，数据结构是组织和存储数据的方式。两者相辅相成，是计算机科学的核心基础。</Paragraph>
          <ul className="list-disc pl-6">
            <li>常见数据结构：数组、链表、栈、队列、树、图、哈希表等</li>
            <li>常见算法：排序、查找、递归、分治、动态规划、图算法等</li>
          </ul>
          <Alert message="要点" description={<ul className="list-disc pl-6"><li>选择合适的数据结构和算法能极大提升程序效率</li><li>算法设计需兼顾正确性、效率和可读性</li></ul>} type="info" showIcon />
        </Card>
      )
    },
    {
      key: '2',
      label: '⏱️ 复杂度分析',
      children: (
        <Card title="时间复杂度与空间复杂度" className="mb-6">
          <Paragraph>复杂度用于衡量算法的资源消耗：</Paragraph>
          <ul className="list-disc pl-6">
            <li><b>时间复杂度</b>：算法执行所需的基本操作次数（如O(1)、O(n)、O(n^2)）</li>
            <li><b>空间复杂度</b>：算法运行时占用的额外存储空间</li>
          </ul>
          <Paragraph>常见时间复杂度从低到高：</Paragraph>
          <CodeBlock language="text">{`O(1) < O(log n) < O(n) < O(n log n) < O(n^2) < O(2^n) < O(n!)`}</CodeBlock>
          <Alert message="要点" description={<ul className="list-disc pl-6"><li>大O符号只关注增长趋势，忽略常数和低阶项</li><li>最坏、平均、最好复杂度需分清</li></ul>} type="success" showIcon />
        </Card>
      )
    },
    {
      key: '3',
      label: '🧮 复杂度分析与C++实例',
      children: (
        <Card title="复杂度分析与C++实例" className="mb-6">
          <Paragraph>通过C++代码理解不同复杂度：</Paragraph>
          <CodeBlock language="cpp">{`// O(1) 常数复杂度
int getFirst(const vector<int>& arr) {
    return arr[0];
}

// O(n) 线性复杂度
int sum(const vector<int>& arr) {
    int s = 0;
    for (int x : arr) s += x;
    return s;
}

// O(n^2) 二重循环
void printPairs(const vector<int>& arr) {
    for (int i = 0; i < arr.size(); ++i)
        for (int j = 0; j < arr.size(); ++j)
            cout << arr[i] << "," << arr[j] << endl;
}`}</CodeBlock>
          <Alert message="技巧" description={<ul className="list-disc pl-6"><li>嵌套循环通常导致高阶复杂度</li><li>递归需结合递推式分析复杂度</li></ul>} type="info" showIcon />
        </Card>
      )
    },
    {
      key: '4',
      label: '💡 练习题与参考答案',
      children: (
        <Card title="练习题与参考答案" className="mb-6">
          <Paragraph><b>练习题：</b></Paragraph>
          <ul className="list-disc pl-6">
            <li>
              写出以下代码的时间复杂度：
              <CodeBlock language="cpp">{`for (int i = 1; i < n; i *= 2) cout << i;`}</CodeBlock>
              <Collapse className="mt-2">
                <Collapse.Panel header="参考答案" key="1">
                  <Paragraph>O(log n)。每次i都乘2，循环次数为log₂n。</Paragraph>
                </Collapse.Panel>
              </Collapse>
            </li>
            <li>
              判断以下代码的空间复杂度：
              <CodeBlock language="cpp">{`vector<int> arr(n);`}</CodeBlock>
              <Collapse className="mt-2">
                <Collapse.Panel header="参考答案" key="2">
                  <Paragraph>O(n)。分配了n个int的空间。</Paragraph>
                </Collapse.Panel>
              </Collapse>
            </li>
            <li>
              递归斐波那契数列的时间复杂度是多少？
              <Collapse className="mt-2">
                <Collapse.Panel header="参考答案" key="3">
                  <Paragraph>O(2^n)。每次递归分裂为两次调用，呈指数增长。</Paragraph>
                </Collapse.Panel>
              </Collapse>
            </li>
          </ul>
          <Alert message="温馨提示" description="多练习复杂度分析，打好算法基础。" type="info" showIcon />
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
              <h1 className="text-3xl font-bold text-gray-900">基础与复杂度分析</h1>
              <p className="text-gray-600 mt-2">掌握算法与数据结构的基本概念和复杂度分析方法</p>
            </div>
            <Progress type="circle" percent={10} size={100} strokeColor="#13c2c2" />
          </div>
        </div>

        {/* 课程内容 */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <Tabs items={tabItems} tabPosition="left" className="p-6" />
        </div>

        {/* 底部导航 */}
        <div className="flex justify-between mt-8">
          <div className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gray-300">
            <LeftOutlined className="mr-2" />
            已是第一课
          </div>
          <Link
            href="/study/ds/linear"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
          >
            下一课：线性表
            <RightOutlined className="ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
} 