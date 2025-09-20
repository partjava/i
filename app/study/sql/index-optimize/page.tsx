'use client';

import React from 'react';
import { Card, Tabs, Progress, Alert, Typography, Collapse } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { CodeBlock } from '@/app/components/ui/CodeBlock';

const { Paragraph } = Typography;

export default function SqlIndexOptimizePage() {
  const tabItems = [
    {
      key: '1',
      label: '🔑 索引基础',
      children: (
        <Card title="索引基础" className="mb-6">
          <Paragraph>索引可加速数据检索，常见类型有普通索引、唯一索引、复合索引：</Paragraph>
          <CodeBlock language="sql">{`-- 创建普通索引
CREATE INDEX idx_name ON students(name);
-- 创建唯一索引
CREATE UNIQUE INDEX idx_unique_email ON students(email);
-- 创建复合索引
CREATE INDEX idx_class_score ON students(class_id, score);
-- 删除索引
DROP INDEX idx_name ON students;`}</CodeBlock>
          <Alert message="要点" description={<ul className="list-disc pl-6"><li>索引底层常用B+树结构</li><li>合理设计索引可大幅提升查询效率</li></ul>} type="info" showIcon />
        </Card>
      )
    },
    {
      key: '2',
      label: '⚡ 查询优化技巧',
      children: (
        <Card title="查询优化技巧" className="mb-6">
          <Paragraph>通过EXPLAIN分析SQL执行计划，定位慢查询并优化：</Paragraph>
          <CodeBlock language="sql">{`-- 查看执行计划
EXPLAIN SELECT * FROM students WHERE class_id = 1 AND score > 80;
-- 常见优化方法
-- 1. 优先使用索引字段做条件
-- 2. 避免SELECT *，只查需要的字段
-- 3. 合理拆分复杂SQL，减少嵌套
-- 4. 避免在WHERE中对索引字段做函数/运算`}</CodeBlock>
          <Alert message="技巧" description={<ul className="list-disc pl-6"><li>EXPLAIN可查看SQL是否走索引</li><li>慢查询日志可定位性能瓶颈</li></ul>} type="success" showIcon />
        </Card>
      )
    },
    {
      key: '3',
      label: '🔒 索引与事务、锁',
      children: (
        <Card title="索引与事务、锁" className="mb-6">
          <Paragraph>索引失效、事务隔离与锁机制是性能优化重点：</Paragraph>
          <CodeBlock language="sql">{`-- 索引失效场景
SELECT * FROM students WHERE LEFT(name,1) = '张'; -- 索引失效
-- 事务隔离级别
SET SESSION TRANSACTION ISOLATION LEVEL REPEATABLE READ;
-- 查看当前锁
SHOW ENGINE INNODB STATUS;`}</CodeBlock>
          <Alert message="易错点" description={<ul className="list-disc pl-6"><li>对索引字段做运算/函数会导致索引失效</li><li>高并发下需合理选择事务隔离级别</li><li>死锁需通过日志和监控排查</li></ul>} type="warning" showIcon />
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
              为students表的class_id和score字段设计高效索引，并写出创建语句。
              <Collapse className="mt-2">
                <Collapse.Panel header="参考答案" key="1">
                  <CodeBlock language="sql">{`CREATE INDEX idx_class_score ON students(class_id, score);`}</CodeBlock>
                  <Paragraph>复合索引可提升多条件查询效率。</Paragraph>
                </Collapse.Panel>
              </Collapse>
            </li>
            <li>
              优化如下SQL语句的查询效率：
              <CodeBlock language="sql">{`SELECT * FROM students WHERE score + 10 > 90;`}</CodeBlock>
              <Collapse className="mt-2">
                <Collapse.Panel header="参考答案" key="2">
                  <Paragraph>应避免对索引字段做运算，可改为：</Paragraph>
                  <CodeBlock language="sql">{`SELECT * FROM students WHERE score > 80;`}</CodeBlock>
                </Collapse.Panel>
              </Collapse>
            </li>
            <li>
              简述如何排查和解决死锁问题。
              <Collapse className="mt-2">
                <Collapse.Panel header="参考答案" key="3">
                  <Paragraph>可通过<CodeBlock language="sql">{`SHOW ENGINE INNODB STATUS;`}</CodeBlock>查看死锁信息，分析SQL和表结构，优化索引和事务顺序，必要时拆分大事务。</Paragraph>
                </Collapse.Panel>
              </Collapse>
            </li>
          </ul>
          <Alert message="温馨提示" description="多关注索引设计与SQL优化，提升数据库性能。" type="info" showIcon />
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
              <h1 className="text-3xl font-bold text-gray-900">索引与性能优化</h1>
              <p className="text-gray-600 mt-2">掌握索引原理、SQL优化与事务锁机制</p>
            </div>
            <Progress type="circle" percent={80} size={100} strokeColor="#13c2c2" />
          </div>
        </div>

        {/* 课程内容 */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <Tabs items={tabItems} tabPosition="left" className="p-6" />
        </div>

        {/* 底部导航 */}
        <div className="flex justify-between mt-8">
          <Link
            href="/study/sql/subquery-view"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gray-600 hover:bg-gray-700"
          >
            <LeftOutlined className="mr-2" />
            上一课：子查询与视图
          </Link>
          <Link
            href="/study/sql/projects"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
          >
            下一课：实战练习
            <RightOutlined className="ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
} 