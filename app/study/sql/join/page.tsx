'use client';

import React from 'react';
import { Card, Tabs, Progress, Alert, Typography, Collapse } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { CodeBlock } from '@/app/components/ui/CodeBlock';

const { Paragraph } = Typography;

export default function SqlJoinPage() {
  const tabItems = [
    {
      key: '1',
      label: '🔗 连接类型与语法',
      children: (
        <Card title="连接类型与语法" className="mb-6">
          <Paragraph>SQL支持多种表连接方式，常见有：</Paragraph>
          <ul className="list-disc pl-6">
            <li><b>INNER JOIN</b>：只返回两表中匹配的记录</li>
            <li><b>LEFT JOIN</b>：返回左表所有记录及右表匹配记录</li>
            <li><b>RIGHT JOIN</b>：返回右表所有记录及左表匹配记录</li>
            <li><b>CROSS JOIN</b>：笛卡尔积，返回所有组合</li>
          </ul>
          <CodeBlock language="sql">{`SELECT s.name, c.name AS 班级
FROM students s
INNER JOIN classes c ON s.class_id = c.id;`}</CodeBlock>
          <Alert message="要点" description={<ul className="list-disc pl-6"><li>ON后写连接条件，避免产生笛卡尔积</li><li>可用表别名简化SQL</li></ul>} type="info" showIcon />
        </Card>
      )
    },
    {
      key: '2',
      label: '🧩 多表复杂查询',
      children: (
        <Card title="多表复杂查询" className="mb-6">
          <Paragraph>实际开发常用多表连接与子查询结合：</Paragraph>
          <CodeBlock language="sql">{`-- 三表连接：查询学生、班级、老师姓名
SELECT s.name AS 学生, c.name AS 班级, t.name AS 班主任
FROM students s
INNER JOIN classes c ON s.class_id = c.id
INNER JOIN teachers t ON c.teacher_id = t.id;

-- 子查询结合连接：查询成绩大于班级平均分的学生
SELECT s.name, sc.score
FROM students s
JOIN scores sc ON s.id = sc.student_id
WHERE sc.score > (
  SELECT AVG(score) FROM scores WHERE class_id = s.class_id
);`}</CodeBlock>
          <Alert message="进阶" description={<ul className="list-disc pl-6"><li>多表连接时注意字段歧义，需加表前缀</li><li>子查询可与JOIN结合实现复杂业务需求</li></ul>} type="success" showIcon />
        </Card>
      )
    },
    {
      key: '3',
      label: '⚡ 进阶技巧与易错点',
      children: (
        <Card title="进阶技巧与易错点" className="mb-6">
          <Paragraph>多表查询常见问题与优化建议：</Paragraph>
          <ul className="list-disc pl-6">
            <li>避免无条件JOIN，防止产生大量无用数据（笛卡尔积）</li>
            <li>LEFT/RIGHT JOIN结果中，未匹配行字段为NULL，需注意处理</li>
            <li>多表连接建议为连接字段加索引，提升性能</li>
            <li>复杂查询可拆分为视图或临时表，便于维护</li>
          </ul>
          <Alert message="易错点" description={<ul className="list-disc pl-6"><li>ON与WHERE条件混用易导致结果异常</li><li>多表字段重名需加表前缀</li></ul>} type="warning" showIcon />
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
              查询每个学生的姓名、班级名和班主任姓名。
              <Collapse className="mt-2">
                <Collapse.Panel header="参考答案" key="1">
                  <CodeBlock language="sql">{`SELECT s.name, c.name AS 班级, t.name AS 班主任
FROM students s
JOIN classes c ON s.class_id = c.id
JOIN teachers t ON c.teacher_id = t.id;`}</CodeBlock>
                  <Paragraph>三表连接，需明确每个连接条件。</Paragraph>
                </Collapse.Panel>
              </Collapse>
            </li>
            <li>
              查询每个班级的平均分，并列出高于本班平均分的学生姓名和分数。
              <Collapse className="mt-2">
                <Collapse.Panel header="参考答案" key="2">
                  <CodeBlock language="sql">{`SELECT s.name, sc.score, c.name AS 班级
FROM students s
JOIN scores sc ON s.id = sc.student_id
JOIN classes c ON s.class_id = c.id
WHERE sc.score > (
  SELECT AVG(score) FROM scores WHERE class_id = c.id
);`}</CodeBlock>
                  <Paragraph>子查询结合JOIN，考查分组与多表。</Paragraph>
                </Collapse.Panel>
              </Collapse>
            </li>
            <li>
              查询所有没有成绩记录的学生姓名。
              <Collapse className="mt-2">
                <Collapse.Panel header="参考答案" key="3">
                  <CodeBlock language="sql">{`SELECT s.name
FROM students s
LEFT JOIN scores sc ON s.id = sc.student_id
WHERE sc.id IS NULL;`}</CodeBlock>
                  <Paragraph>LEFT JOIN+IS NULL查找未匹配数据。</Paragraph>
                </Collapse.Panel>
              </Collapse>
            </li>
          </ul>
          <Alert message="温馨提示" description="多练习多表连接与子查询，掌握实际业务场景的SQL写法。" type="info" showIcon />
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
              <h1 className="text-3xl font-bold text-gray-900">多表查询与连接</h1>
              <p className="text-gray-600 mt-2">掌握多表连接、复杂查询与优化技巧</p>
            </div>
            <Progress type="circle" percent={40} size={100} strokeColor="#13c2c2" />
          </div>
        </div>

        {/* 课程内容 */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <Tabs items={tabItems} tabPosition="left" className="p-6" />
        </div>

        {/* 底部导航 */}
        <div className="flex justify-between mt-8">
          <Link
            href="/study/sql/where-order"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gray-600 hover:bg-gray-700"
          >
            <LeftOutlined className="mr-2" />
            上一课：条件与排序
          </Link>
          <Link
            href="/study/sql/crud"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
          >
            下一课：数据增删改
            <RightOutlined className="ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
} 