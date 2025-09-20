'use client';

import React from 'react';
import { Card, Tabs, Progress, Alert, Typography, Collapse } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { CodeBlock } from '@/app/components/ui/CodeBlock';

const { Paragraph } = Typography;

export default function SqlWhereOrderPage() {
  const tabItems = [
    {
      key: '1',
      label: '🔎 WHERE条件',
      children: (
        <Card title="WHERE条件" className="mb-6">
          <Paragraph>WHERE用于指定查询的筛选条件，只返回满足条件的记录。</Paragraph>
          <CodeBlock language="sql">{`SELECT * FROM students WHERE age > 18;`}</CodeBlock>
          <Alert message="要点" description={<ul className="list-disc pl-6"><li>WHERE后可跟多种条件表达式</li><li>常用运算符：=、!=、&gt;、&lt;、&gt;=、&lt;=、LIKE、IN、BETWEEN</li></ul>} type="info" showIcon />
        </Card>
      )
    },
    {
      key: '2',
      label: '🔗 比较与逻辑运算',
      children: (
        <Card title="比较与逻辑运算" className="mb-6">
          <Paragraph>可用AND、OR、NOT组合多个条件：</Paragraph>
          <CodeBlock language="sql">{`SELECT * FROM students WHERE age &gt;= 18 AND gender = '男';
SELECT * FROM students WHERE name LIKE '张%';`}</CodeBlock>
          <Alert message="要点" description={<ul className="list-disc pl-6"><li>AND为且，OR为或，NOT为非</li><li>LIKE用于模糊匹配，%代表任意字符</li></ul>} type="success" showIcon />
        </Card>
      )
    },
    {
      key: '3',
      label: '⬆️⬇️ ORDER BY排序',
      children: (
        <Card title="ORDER BY排序" className="mb-6">
          <Paragraph>ORDER BY用于对查询结果排序，默认升序（ASC），可指定降序（DESC）。</Paragraph>
          <CodeBlock language="sql">{`SELECT * FROM students ORDER BY age DESC;
SELECT * FROM students WHERE gender = '女' ORDER BY score ASC, age DESC;`}</CodeBlock>
          <Alert message="要点" description={<ul className="list-disc pl-6"><li>ORDER BY可指定多个字段，先后顺序影响结果</li><li>ASC为升序，DESC为降序</li></ul>} type="info" showIcon />
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
              查询students表中年龄大于20的所有学生。
              <Collapse className="mt-2">
                <Collapse.Panel header="参考答案" key="1">
                  <CodeBlock language="sql">{`SELECT * FROM students WHERE age &gt; 20;`}</CodeBlock>
                </Collapse.Panel>
              </Collapse>
            </li>
            <li>
              查询所有女生，按成绩从高到低排序。
              <Collapse className="mt-2">
                <Collapse.Panel header="参考答案" key="2">
                  <CodeBlock language="sql">{`SELECT * FROM students WHERE gender = '女' ORDER BY score DESC;`}</CodeBlock>
                </Collapse.Panel>
              </Collapse>
            </li>
            <li>
              查询姓名以"李"开头的学生，按年龄升序排序。
              <Collapse className="mt-2">
                <Collapse.Panel header="参考答案" key="3">
                  <CodeBlock language="sql">{`SELECT * FROM students WHERE name LIKE '李%' ORDER BY age ASC;`}</CodeBlock>
                </Collapse.Panel>
              </Collapse>
            </li>
          </ul>
          <Alert message="温馨提示" description="多练习WHERE和ORDER BY，掌握条件筛选与排序技巧。" type="info" showIcon />
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
              <h1 className="text-3xl font-bold text-gray-900">条件与排序</h1>
              <p className="text-gray-600 mt-2">掌握SQL条件筛选与结果排序方法</p>
            </div>
            <Progress type="circle" percent={30} size={100} strokeColor="#13c2c2" />
          </div>
        </div>

        {/* 课程内容 */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <Tabs items={tabItems} tabPosition="left" className="p-6" />
        </div>

        {/* 底部导航 */}
        <div className="flex justify-between mt-8">
          <Link
            href="/study/sql/select"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gray-600 hover:bg-gray-700"
          >
            <LeftOutlined className="mr-2" />
            上一课：基本查询（SELECT）
          </Link>
          <Link
            href="/study/sql/join"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
          >
            下一课：多表查询与连接
            <RightOutlined className="ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
} 