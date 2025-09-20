'use client';

import React from 'react';
import { Card, Tabs, Progress, Alert, Typography, Collapse } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { CodeBlock } from '@/app/components/ui/CodeBlock';

const { Paragraph } = Typography;

export default function SqlSelectPage() {
  const tabItems = [
    {
      key: '1',
      label: '🔍 SELECT语法',
      children: (
        <Card title="SELECT语法" className="mb-6">
          <Paragraph>SELECT语句用于从数据库表中查询数据，是SQL最常用的语句。</Paragraph>
          <CodeBlock language="sql">{`SELECT 字段1, 字段2 FROM 表名;`}</CodeBlock>
          <Alert message="要点" description={<ul className="list-disc pl-6"><li>SELECT后可指定多个字段，用逗号分隔</li><li>FROM指定要查询的表</li></ul>} type="info" showIcon />
        </Card>
      )
    },
    {
      key: '2',
      label: '📋 字段选择',
      children: (
        <Card title="字段选择" className="mb-6">
          <Paragraph>可选择部分字段或全部字段（*），如：</Paragraph>
          <CodeBlock language="sql">{`SELECT * FROM students;
SELECT name, age FROM students;`}</CodeBlock>
          <Alert message="要点" description={<ul className="list-disc pl-6"><li>* 表示所有字段</li><li>建议实际开发中明确列出字段名</li></ul>} type="success" showIcon />
        </Card>
      )
    },
    {
      key: '3',
      label: '🚫 去重与别名',
      children: (
        <Card title="去重与别名" className="mb-6">
          <Paragraph>使用DISTINCT去重，AS为字段或表起别名：</Paragraph>
          <CodeBlock language="sql">{`SELECT DISTINCT age FROM students;
SELECT name AS 姓名, age AS 年龄 FROM students;`}</CodeBlock>
          <Alert message="要点" description={<ul className="list-disc pl-6"><li>DISTINCT放在SELECT后</li><li>AS可省略，直接写空格</li></ul>} type="info" showIcon />
        </Card>
      )
    },
    {
      key: '4',
      label: '💡 综合练习与参考答案',
      children: (
        <Card title="综合练习与参考答案" className="mb-6">
          <Paragraph><b>练习题：</b></Paragraph>
          <ul className="list-disc pl-6">
            <li>
              查询students表的所有数据。
              <Collapse className="mt-2">
                <Collapse.Panel header="参考答案" key="1">
                  <CodeBlock language="sql">{`SELECT * FROM students;`}</CodeBlock>
                </Collapse.Panel>
              </Collapse>
            </li>
            <li>
              查询students表中所有不重复的age。
              <Collapse className="mt-2">
                <Collapse.Panel header="参考答案" key="2">
                  <CodeBlock language="sql">{`SELECT DISTINCT age FROM students;`}</CodeBlock>
                </Collapse.Panel>
              </Collapse>
            </li>
            <li>
              查询students表的name和age，并将name显示为"姓名"。
              <Collapse className="mt-2">
                <Collapse.Panel header="参考答案" key="3">
                  <CodeBlock language="sql">{`SELECT name AS 姓名, age FROM students;`}</CodeBlock>
                </Collapse.Panel>
              </Collapse>
            </li>
          </ul>
          <Alert message="温馨提示" description="多练习SELECT语句，熟悉字段选择和结果处理。" type="info" showIcon />
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
              <h1 className="text-3xl font-bold text-gray-900">基本查询（SELECT）</h1>
              <p className="text-gray-600 mt-2">掌握SQL基本查询语法与常用技巧</p>
            </div>
            <Progress type="circle" percent={20} size={100} strokeColor="#13c2c2" />
          </div>
        </div>

        {/* 课程内容 */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <Tabs items={tabItems} tabPosition="left" className="p-6" />
        </div>

        {/* 底部导航 */}
        <div className="flex justify-between mt-8">
          <Link
            href="/study/sql/intro"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gray-600 hover:bg-gray-700"
          >
            <LeftOutlined className="mr-2" />
            上一课：数据库基础与环境
          </Link>
          <Link
            href="/study/sql/where-order"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
          >
            下一课：条件与排序
            <RightOutlined className="ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
} 