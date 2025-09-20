'use client';

import React from 'react';
import { Card, Tabs, Progress, Alert, Typography, Collapse } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { CodeBlock } from '@/app/components/ui/CodeBlock';

const { Paragraph } = Typography;

export default function SqlGroupPage() {
  const tabItems = [
    {
      key: '1',
      label: 'Σ 常用聚合函数',
      children: (
        <Card title="常用聚合函数" className="mb-6">
          <Paragraph>SQL聚合函数用于对一组数据进行统计计算：</Paragraph>
          <CodeBlock language="sql">{`SELECT COUNT(*) 总人数, AVG(score) 平均分, MAX(score) 最高分
FROM students;`}</CodeBlock>
          <Alert message="要点" description={<ul className="list-disc pl-6"><li>COUNT统计行数，SUM求和，AVG平均，MAX/MIN最大最小</li><li>可与GROUP BY结合分组统计</li></ul>} type="info" showIcon />
        </Card>
      )
    },
    {
      key: '2',
      label: '🧮 GROUP BY与HAVING进阶',
      children: (
        <Card title="GROUP BY与HAVING进阶" className="mb-6">
          <Paragraph>GROUP BY用于分组统计，HAVING用于分组后过滤：</Paragraph>
          <CodeBlock language="sql">{`-- 按班级统计平均分
SELECT class_id, AVG(score) 平均分
FROM students
GROUP BY class_id;
-- 多字段分组
SELECT class_id, gender, COUNT(*) 人数
FROM students
GROUP BY class_id, gender;
-- 分组过滤
SELECT class_id, AVG(score) 平均分
FROM students
GROUP BY class_id
HAVING AVG(score) > 80;`}</CodeBlock>
          <Alert message="进阶" description={<ul className="list-disc pl-6"><li>WHERE用于分组前过滤，HAVING用于分组后</li><li>可多字段分组，HAVING支持聚合条件</li></ul>} type="success" showIcon />
        </Card>
      )
    },
    {
      key: '3',
      label: '🏅 复杂聚合与窗口函数',
      children: (
        <Card title="复杂聚合与窗口函数" className="mb-6">
          <Paragraph>窗口函数可实现分组内排名、累计和等复杂统计：</Paragraph>
          <CodeBlock language="sql">{`-- 分组内排名
SELECT name, class_id, score,
  ROW_NUMBER() OVER(PARTITION BY class_id ORDER BY score DESC) AS 班内排名
FROM students;
-- 累计和
SELECT name, score,
  SUM(score) OVER(ORDER BY score DESC) AS 累计分
FROM students;`}</CodeBlock>
          <Alert message="技巧" description={<ul className="list-disc pl-6"><li>窗口函数需MySQL 8.0+支持</li><li>OVER(PARTITION BY ... ORDER BY ...)实现分组内统计</li></ul>} type="info" showIcon />
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
              统计每个班级的学生人数和平均分。
              <Collapse className="mt-2">
                <Collapse.Panel header="参考答案" key="1">
                  <CodeBlock language="sql">{`SELECT class_id, COUNT(*) 人数, AVG(score) 平均分
FROM students
GROUP BY class_id;`}</CodeBlock>
                  <Paragraph>分组统计，GROUP BY+聚合函数。</Paragraph>
                </Collapse.Panel>
              </Collapse>
            </li>
            <li>
              查询平均分大于85的班级编号和平均分。
              <Collapse className="mt-2">
                <Collapse.Panel header="参考答案" key="2">
                  <CodeBlock language="sql">{`SELECT class_id, AVG(score) 平均分
FROM students
GROUP BY class_id
HAVING AVG(score) > 85;`}</CodeBlock>
                  <Paragraph>HAVING用于分组后过滤。</Paragraph>
                </Collapse.Panel>
              </Collapse>
            </li>
            <li>
              查询每个班级分数最高的前两名学生姓名、分数及班级编号。
              <Collapse className="mt-2">
                <Collapse.Panel header="参考答案" key="3">
                  <CodeBlock language="sql">{`SELECT name, class_id, score
FROM (
  SELECT name, class_id, score,
    ROW_NUMBER() OVER(PARTITION BY class_id ORDER BY score DESC) AS rn
  FROM students
) t
WHERE rn <= 2;`}</CodeBlock>
                  <Paragraph>窗口函数分组内排名，MySQL 8.0+。</Paragraph>
                </Collapse.Panel>
              </Collapse>
            </li>
          </ul>
          <Alert message="温馨提示" description="多练习分组统计与窗口函数，掌握数据分析常用SQL。" type="info" showIcon />
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
              <h1 className="text-3xl font-bold text-gray-900">聚合与分组</h1>
              <p className="text-gray-600 mt-2">掌握分组统计、分组过滤与窗口函数应用</p>
            </div>
            <Progress type="circle" percent={60} size={100} strokeColor="#13c2c2" />
          </div>
        </div>

        {/* 课程内容 */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <Tabs items={tabItems} tabPosition="left" className="p-6" />
        </div>

        {/* 底部导航 */}
        <div className="flex justify-between mt-8">
          <Link
            href="/study/sql/crud"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gray-600 hover:bg-gray-700"
          >
            <LeftOutlined className="mr-2" />
            上一课：数据增删改
          </Link>
          <Link
            href="/study/sql/subquery-view"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
          >
            下一课：子查询与视图
            <RightOutlined className="ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
} 