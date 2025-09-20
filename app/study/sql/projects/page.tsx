'use client';

import React from 'react';
import { Card, Tabs, Progress, Alert, Typography, Collapse } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { CodeBlock } from '@/app/components/ui/CodeBlock';

const { Paragraph } = Typography;

export default function SqlProjectsPage() {
  const tabItems = [
    {
      key: '1',
      label: '📊 业务场景实战',
      children: (
        <Card title="业务场景实战" className="mb-6">
          <Paragraph>结合实际业务，完成如下数据分析任务：</Paragraph>
          <ul className="list-disc pl-6">
            <li>统计每个班级的及格率、最高分、最低分</li>
            <li>找出所有成绩异常（如分数{'<'}0或{'>'}100）的学生</li>
            <li>查询每个班级分数排名前3的学生姓名和分数</li>
          </ul>
          <Alert message="提示" description="可结合分组、聚合、窗口函数等知识点完成。" type="info" showIcon />
        </Card>
      )
    },
    {
      key: '2',
      label: '🔎 综合查询与优化',
      children: (
        <Card title="综合查询与优化" className="mb-6">
          <Paragraph>完成以下综合查询与优化任务：</Paragraph>
          <ul className="list-disc pl-6">
            <li>查询所有分数高于班级平均分的学生及其班级名</li>
            <li>优化一条包含多表连接和分组的慢SQL</li>
            <li>分析一条SQL的执行计划，指出是否走索引并优化</li>
          </ul>
          <Alert message="技巧" description="注意SQL写法、索引设计与EXPLAIN分析。" type="success" showIcon />
        </Card>
      )
    },
    {
      key: '3',
      label: '💼 面试真题与解析',
      children: (
        <Card title="面试真题与解析" className="mb-6">
          <Paragraph>精选常见SQL面试题：</Paragraph>
          <ul className="list-disc pl-6">
            <li>如何查询每个班级分数第二高的学生？</li>
            <li>如何找出有重复手机号的学生？</li>
            <li>SQL优化常见思路有哪些？</li>
          </ul>
          <Alert message="面试技巧" description="多练习窗口函数、分组、索引优化等高频考点。" type="warning" showIcon />
        </Card>
      )
    },
    {
      key: '4',
      label: '📝 参考答案与解析',
      children: (
        <Card title="参考答案与解析" className="mb-6">
          <Paragraph><b>部分练习参考答案：</b></Paragraph>
          <ul className="list-disc pl-6">
            <li>
              统计每个班级的及格率、最高分、最低分。
              <Collapse className="mt-2">
                <Collapse.Panel header="参考答案" key="1">
                  <CodeBlock language="sql">{`SELECT class_id,
  COUNT(CASE WHEN score >= 60 THEN 1 END) * 1.0 / COUNT(*) AS 及格率,
  MAX(score) AS 最高分,
  MIN(score) AS 最低分
FROM students
GROUP BY class_id;`}</CodeBlock>
                  <Paragraph>分组统计，CASE WHEN实现条件计数。</Paragraph>
                </Collapse.Panel>
              </Collapse>
            </li>
            <li>
              查询每个班级分数排名前3的学生姓名和分数。
              <Collapse className="mt-2">
                <Collapse.Panel header="参考答案" key="2">
                  <CodeBlock language="sql">{`SELECT name, class_id, score
FROM (
  SELECT name, class_id, score,
    ROW_NUMBER() OVER(PARTITION BY class_id ORDER BY score DESC) AS rn
  FROM students
) t
WHERE rn <= 3;`}</CodeBlock>
                  <Paragraph>窗口函数分组内排名。</Paragraph>
                </Collapse.Panel>
              </Collapse>
            </li>
            <li>
              找出有重复手机号的学生。
              <Collapse className="mt-2">
                <Collapse.Panel header="参考答案" key="3">
                  <CodeBlock language="sql">{`SELECT phone, COUNT(*)
FROM students
GROUP BY phone
HAVING COUNT(*) > 1;`}</CodeBlock>
                  <Paragraph>分组+HAVING筛选重复。</Paragraph>
                </Collapse.Panel>
              </Collapse>
            </li>
            <li>
              查询所有分数高于班级平均分的学生及其班级名。
              <Collapse className="mt-2">
                <Collapse.Panel header="参考答案" key="4">
                  <CodeBlock language="sql">{`SELECT s.name, s.score, c.name AS 班级
FROM students s
JOIN classes c ON s.class_id = c.id
WHERE s.score > (
  SELECT AVG(score) FROM students WHERE class_id = s.class_id
);`}</CodeBlock>
                  <Paragraph>相关子查询结合多表。</Paragraph>
                </Collapse.Panel>
              </Collapse>
            </li>
            <li>
              如何查询每个班级分数第二高的学生？
              <Collapse className="mt-2">
                <Collapse.Panel header="参考答案" key="5">
                  <CodeBlock language="sql">{`SELECT name, class_id, score
FROM (
  SELECT name, class_id, score,
    DENSE_RANK() OVER(PARTITION BY class_id ORDER BY score DESC) AS rk
  FROM students
) t
WHERE rk = 2;`}</CodeBlock>
                  <Paragraph>窗口函数DENSE_RANK分组内排名。</Paragraph>
                </Collapse.Panel>
              </Collapse>
            </li>
          </ul>
          <Alert message="温馨提示" description="建议多动手练习，遇到慢SQL及时分析优化。" type="info" showIcon />
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
              <h1 className="text-3xl font-bold text-gray-900">实战练习</h1>
              <p className="text-gray-600 mt-2">综合运用SQL技能解决实际业务与面试问题</p>
            </div>
            <Progress type="circle" percent={90} size={100} strokeColor="#13c2c2" />
          </div>
        </div>

        {/* 课程内容 */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <Tabs items={tabItems} tabPosition="left" className="p-6" />
        </div>

        {/* 底部导航 */}
        <div className="flex justify-between mt-8">
          <Link
            href="/study/sql/index-optimize"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gray-600 hover:bg-gray-700"
          >
            <LeftOutlined className="mr-2" />
            上一课：索引与性能优化
          </Link>
          <div className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gray-300 cursor-not-allowed">
            已是最后一课
          </div>
        </div>
      </div>
    </div>
  );
} 