'use client';

import React from 'react';
import { Card, Tabs, Progress, Alert, Typography } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { CodeBlock } from '@/app/components/ui/CodeBlock';

const { Title, Paragraph, Text } = Typography;

export default function PythonProjectsPage() {
  const projectTabs = [
    {
      key: '1',
      label: '📊 数据分析',
      children: (
        <Card title="销售数据分析" className="mb-6">
          <Paragraph>利用 <Text code>pandas</Text> 和 <Text code>matplotlib</Text> 对销售数据进行统计和可视化。</Paragraph>
          <CodeBlock language="python">
{`import pandas as pd
import matplotlib.pyplot as plt

# 读取CSV数据
df = pd.read_csv('sales.csv')
monthly = df.groupby('month')['amount'].sum()

plt.bar(monthly.index, monthly.values)
plt.title('月度销售额')
plt.xlabel('月份')
plt.ylabel('销售额')
plt.show()`}
          </CodeBlock>
          <Alert message="技术要点" description={<ul className="list-disc pl-6"><li>数据分组与聚合</li><li>可视化图表绘制</li></ul>} type="info" showIcon />
        </Card>
      )
    },
    {
      key: '2',
      label: '🌐 Web应用',
      children: (
        <Card title="Flask博客系统" className="mb-6">
          <Paragraph>用 <Text code>Flask</Text> 快速搭建一个简单的博客网站。</Paragraph>
          <CodeBlock language="python">
{`from flask import Flask, render_template
app = Flask(__name__)

@app.route('/')
def index():
    return '欢迎来到我的博客！'

if __name__ == '__main__':
    app.run(debug=True)`}
          </CodeBlock>
          <Alert message="技术要点" description={<ul className="list-disc pl-6"><li>路由与视图函数</li><li>模板渲染</li></ul>} type="success" showIcon />
        </Card>
      )
    },
    {
      key: '3',
      label: '⚙️ 自动化脚本',
      children: (
        <Card title="批量重命名文件" className="mb-6">
          <Paragraph>用 <Text code>os</Text> 模块批量重命名指定目录下的所有图片文件。</Paragraph>
          <CodeBlock language="python">
{`import os
folder = './images'
for idx, filename in enumerate(os.listdir(folder)):
    if filename.endswith('.jpg'):
        new_name = f'img_{idx+1}.jpg'
        os.rename(os.path.join(folder, filename), os.path.join(folder, new_name))`}
          </CodeBlock>
          <Alert message="技术要点" description={<ul className="list-disc pl-6"><li>文件与目录操作</li><li>字符串格式化</li></ul>} type="info" showIcon />
        </Card>
      )
    },
    {
      key: '4',
      label: '🕷️ 爬虫实战',
      children: (
        <Card title="爬取新闻标题" className="mb-6">
          <Paragraph>用 <Text code>requests</Text> 和 <Text code>BeautifulSoup</Text> 爬取新闻网站的标题。</Paragraph>
          <CodeBlock language="python">
{`import requests
from bs4 import BeautifulSoup

url = 'https://news.example.com'
resp = requests.get(url)
soup = BeautifulSoup(resp.text, 'html.parser')
for h2 in soup.find_all('h2'):
    print(h2.text)`}
          </CodeBlock>
          <Alert message="技术要点" description={<ul className="list-disc pl-6"><li>HTTP请求</li><li>HTML解析</li></ul>} type="info" showIcon />
        </Card>
      )
    },
    {
      key: '5',
      label: '💡 练习与扩展',
      children: (
        <Card title="项目练习建议" className="mb-6">
          <Paragraph>你可以尝试：</Paragraph>
          <ul className="list-disc pl-6">
            <li>实现一个命令行记账本</li>
            <li>开发一个天气查询小程序</li>
            <li>用Tkinter做一个简单GUI工具</li>
            <li>用FastAPI写一个RESTful接口</li>
          </ul>
          <Alert message="扩展思路" description="结合前面所学知识，尝试独立完成一个小型项目，提升综合能力。" type="success" showIcon />
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
              <h1 className="text-3xl font-bold text-gray-900">Python项目实战</h1>
              <p className="text-gray-600 mt-2">通过真实案例提升Python综合能力</p>
            </div>
            <Progress type="circle" percent={90} size={100} strokeColor="#52c41a" />
          </div>
        </div>

        {/* 项目内容 */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <Tabs items={projectTabs} tabPosition="left" className="p-6" />
        </div>

        {/* 底部导航 */}
        <div className="flex justify-between mt-8">
          <Link
            href="/study/python/packages"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gray-600 hover:bg-gray-700"
          >
            <LeftOutlined className="mr-2" />
            上一课：第三方库
          </Link>
          <div className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gray-300">
            课程完结
            <RightOutlined className="ml-2" />
          </div>
        </div>
      </div>
    </div>
  );
} 