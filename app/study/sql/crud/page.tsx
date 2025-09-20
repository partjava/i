'use client';

import React from 'react';
import { Card, Tabs, Progress, Alert, Typography, Collapse } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { CodeBlock } from '@/app/components/ui/CodeBlock';

const { Paragraph } = Typography;

export default function SqlCrudPage() {
  const tabItems = [
    {
      key: '1',
      label: '➕ INSERT多种用法',
      children: (
        <Card title="INSERT多种用法" className="mb-6">
          <Paragraph>INSERT用于向表中插入数据，支持多种写法：</Paragraph>
          <CodeBlock language="sql">{`-- 单行插入
INSERT INTO students (name, age, gender) VALUES ('张三', 18, '男');
-- 多行插入
INSERT INTO students (name, age, gender) VALUES ('李四', 19, '女'), ('王五', 20, '男');
-- 子查询插入
INSERT INTO graduates (name, age)
SELECT name, age FROM students WHERE age > 22;
-- 插入默认值
INSERT INTO students DEFAULT VALUES;`}</CodeBlock>
          <Alert message="要点" description={<ul className="list-disc pl-6"><li>多行插入可提升效率</li><li>子查询插入常用于数据迁移</li><li>未指定字段将插入默认值</li></ul>} type="info" showIcon />
        </Card>
      )
    },
    {
      key: '2',
      label: '✏️ UPDATE进阶',
      children: (
        <Card title="UPDATE进阶" className="mb-6">
          <Paragraph>UPDATE可批量修改数据，支持表达式和子查询：</Paragraph>
          <CodeBlock language="sql">{`-- 单条件批量更新
UPDATE students SET age = age + 1 WHERE class_id = 2;
-- 多条件更新
UPDATE students SET score = score + 5 WHERE gender = '女' AND score < 80;
-- 子查询更新
UPDATE students SET class_id = (
  SELECT id FROM classes WHERE name = '高三一班'
) WHERE name = '张三';`}</CodeBlock>
          <Alert message="进阶" description={<ul className="list-disc pl-6"><li>UPDATE可结合表达式实现批量修正</li><li>子查询更新需保证唯一性</li></ul>} type="success" showIcon />
        </Card>
      )
    },
    {
      key: '3',
      label: '🗑️ DELETE与TRUNCATE',
      children: (
        <Card title="DELETE与TRUNCATE" className="mb-6">
          <Paragraph>DELETE用于按条件删除，TRUNCATE清空整表：</Paragraph>
          <CodeBlock language="sql">{`-- 条件删除
DELETE FROM students WHERE score < 60;
-- 清空表
TRUNCATE TABLE logs;
-- 外键约束下的删除
DELETE FROM students WHERE class_id = 1;
-- 误操作防护
DELETE FROM students WHERE 1=0; -- 测试SQL，实际不会删除`}</CodeBlock>
          <Alert message="易错点" description={<ul className="list-disc pl-6"><li>DELETE无WHERE会删除全表，操作前务必确认</li><li>TRUNCATE不可回滚，慎用</li><li>外键约束可能导致删除失败</li></ul>} type="warning" showIcon />
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
              批量将所有score小于60的学生分数加10分。
              <Collapse className="mt-2">
                <Collapse.Panel header="参考答案" key="1">
                  <CodeBlock language="sql">{`UPDATE students SET score = score + 10 WHERE score < 60;`}</CodeBlock>
                  <Paragraph>批量更新，结合条件。</Paragraph>
                </Collapse.Panel>
              </Collapse>
            </li>
            <li>
              将所有"高三一班"的学生转入"高三二班"。
              <Collapse className="mt-2">
                <Collapse.Panel header="参考答案" key="2">
                  <CodeBlock language="sql">{`UPDATE students SET class_id = (
  SELECT id FROM classes WHERE name = '高三二班'
) WHERE class_id = (
  SELECT id FROM classes WHERE name = '高三一班'
);`}</CodeBlock>
                  <Paragraph>子查询更新，注意唯一性。</Paragraph>
                </Collapse.Panel>
              </Collapse>
            </li>
            <li>
              删除所有没有成绩记录的学生。
              <Collapse className="mt-2">
                <Collapse.Panel header="参考答案" key="3">
                  <CodeBlock language="sql">{`DELETE FROM students WHERE id NOT IN (SELECT student_id FROM scores);`}</CodeBlock>
                  <Paragraph>NOT IN结合子查询实现。</Paragraph>
                </Collapse.Panel>
              </Collapse>
            </li>
            <li>
              误删了students表所有数据，如何恢复？
              <Collapse className="mt-2">
                <Collapse.Panel header="参考答案" key="4">
                  <Paragraph>如有备份可用<CodeBlock language="sql">{`SOURCE 备份文件路径;`}</CodeBlock>恢复；无备份则无法恢复。</Paragraph>
                </Collapse.Panel>
              </Collapse>
            </li>
          </ul>
          <Alert message="温馨提示" description="操作前建议备份数据，批量操作需谨慎。" type="info" showIcon />
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
              <h1 className="text-3xl font-bold text-gray-900">数据增删改</h1>
              <p className="text-gray-600 mt-2">掌握数据插入、批量更新与安全删除技巧</p>
            </div>
            <Progress type="circle" percent={50} size={100} strokeColor="#13c2c2" />
          </div>
        </div>

        {/* 课程内容 */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <Tabs items={tabItems} tabPosition="left" className="p-6" />
        </div>

        {/* 底部导航 */}
        <div className="flex justify-between mt-8">
          <Link
            href="/study/sql/join"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gray-600 hover:bg-gray-700"
          >
            <LeftOutlined className="mr-2" />
            上一课：多表查询与连接
          </Link>
          <Link
            href="/study/sql/group"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
          >
            下一课：聚合与分组
            <RightOutlined className="ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
} 