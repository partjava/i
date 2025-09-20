'use client';

import React from 'react';
import { Card, Tabs, Progress, Alert, Typography, Collapse } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { CodeBlock } from '@/app/components/ui/CodeBlock';

const { Paragraph } = Typography;

export default function SqlSubqueryViewPage() {
  const tabItems = [
    {
      key: '1',
      label: '🔍 子查询类型',
      children: (
        <Card title="子查询类型" className="mb-6">
          <Paragraph>子查询可分为标量、行、表、相关子查询，常与IN/EXISTS等关键字结合：</Paragraph>
          <CodeBlock language="sql">{`-- 标量子查询
SELECT name FROM students WHERE class_id = (SELECT id FROM classes WHERE name = '高三一班');
-- 表子查询
SELECT * FROM (SELECT * FROM students WHERE age > 18) t;
-- 相关子查询
SELECT name FROM students s WHERE score > (SELECT AVG(score) FROM students WHERE class_id = s.class_id);
-- IN/EXISTS用法
SELECT name FROM students WHERE class_id IN (SELECT id FROM classes WHERE grade = 3);
SELECT name FROM students WHERE EXISTS (SELECT 1 FROM scores WHERE scores.student_id = students.id);`}</CodeBlock>
          <Alert message="要点" description={<ul className="list-disc pl-6"><li>相关子查询可引用外层表字段</li><li>EXISTS适合判断是否存在关联数据</li></ul>} type="info" showIcon />
        </Card>
      )
    },
    {
      key: '2',
      label: '👁️ 视图的创建与应用',
      children: (
        <Card title="视图的创建与应用" className="mb-6">
          <Paragraph>视图是虚拟表，可简化复杂查询、增强安全性：</Paragraph>
          <CodeBlock language="sql">{`-- 创建视图
CREATE VIEW v_high_score AS SELECT name, score FROM students WHERE score > 90;
-- 查询视图
SELECT * FROM v_high_score;
-- 更新视图
CREATE OR REPLACE VIEW v_high_score AS SELECT name, score FROM students WHERE score > 95;
-- 删除视图
DROP VIEW v_high_score;`}</CodeBlock>
          <Alert message="要点" description={<ul className="list-disc pl-6"><li>视图本身不存储数据，基于原表动态生成</li><li>可用于权限隔离和简化多表查询</li></ul>} type="success" showIcon />
        </Card>
      )
    },
    {
      key: '3',
      label: '🧠 子查询与视图进阶',
      children: (
        <Card title="子查询与视图进阶" className="mb-6">
          <Paragraph>实际开发中常用嵌套子查询与视图优化：</Paragraph>
          <CodeBlock language="sql">{`-- 嵌套子查询：查询每个班级分数最高的学生
SELECT name, class_id, score FROM students
WHERE (class_id, score) IN (
  SELECT class_id, MAX(score) FROM students GROUP BY class_id
);
-- 视图优化：将复杂多表查询封装为视图
CREATE VIEW v_student_info AS
SELECT s.name, c.name AS 班级, t.name AS 班主任
FROM students s
JOIN classes c ON s.class_id = c.id
JOIN teachers t ON c.teacher_id = t.id;`}</CodeBlock>
          <Alert message="进阶" description={<ul className="list-disc pl-6"><li>嵌套子查询可实现分组极值筛选</li><li>视图可提升查询复用性和安全性</li></ul>} type="info" showIcon />
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
              查询所有有成绩记录的学生姓名。
              <Collapse className="mt-2">
                <Collapse.Panel header="参考答案" key="1">
                  <CodeBlock language="sql">{`SELECT name FROM students WHERE EXISTS (SELECT 1 FROM scores WHERE scores.student_id = students.id);`}</CodeBlock>
                  <Paragraph>EXISTS判断是否有关联数据。</Paragraph>
                </Collapse.Panel>
              </Collapse>
            </li>
            <li>
              创建一个视图，显示所有分数大于班级平均分的学生姓名、分数和班级。
              <Collapse className="mt-2">
                <Collapse.Panel header="参考答案" key="2">
                  <CodeBlock language="sql">{`CREATE VIEW v_above_avg AS
SELECT s.name, s.score, s.class_id
FROM students s
WHERE s.score > (
  SELECT AVG(score) FROM students WHERE class_id = s.class_id
);`}</CodeBlock>
                  <Paragraph>相关子查询结合视图。</Paragraph>
                </Collapse.Panel>
              </Collapse>
            </li>
            <li>
              只允许部分用户查询v_above_avg视图，如何实现？
              <Collapse className="mt-2">
                <Collapse.Panel header="参考答案" key="3">
                  <Paragraph>可通过授权：<CodeBlock language="sql">{`GRANT SELECT ON v_above_avg TO 'user'@'host';`}</CodeBlock>，实现权限控制。</Paragraph>
                </Collapse.Panel>
              </Collapse>
            </li>
          </ul>
          <Alert message="温馨提示" description="多练习子查询与视图设计，提升SQL复杂场景处理能力。" type="info" showIcon />
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
              <h1 className="text-3xl font-bold text-gray-900">子查询与视图</h1>
              <p className="text-gray-600 mt-2">掌握复杂子查询、视图设计与权限控制</p>
            </div>
            <Progress type="circle" percent={70} size={100} strokeColor="#13c2c2" />
          </div>
        </div>

        {/* 课程内容 */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <Tabs items={tabItems} tabPosition="left" className="p-6" />
        </div>

        {/* 底部导航 */}
        <div className="flex justify-between mt-8">
          <Link
            href="/study/sql/group"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gray-600 hover:bg-gray-700"
          >
            <LeftOutlined className="mr-2" />
            上一课：聚合与分组
          </Link>
          <Link
            href="/study/sql/index-optimize"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
          >
            下一课：索引与性能优化
            <RightOutlined className="ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
} 