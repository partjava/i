'use client';

import React from 'react';
import { Card, Tabs, Progress, Alert, Typography, Collapse } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { CodeBlock } from '@/app/components/ui/CodeBlock';

const { Paragraph, Text } = Typography;

export default function SqlIntroPage() {
  const tabItems = [
    {
      key: '1',
      label: '🗄️ MySQL简介',
      children: (
        <Card title="MySQL简介" className="mb-6">
          <Paragraph>MySQL是最流行的开源关系型数据库管理系统，广泛应用于Web开发、数据分析等领域。</Paragraph>
          <ul className="list-disc pl-6">
            <li>支持SQL标准，易学易用</li>
            <li>跨平台，性能高，社区活跃</li>
            <li>常用于网站后台、数据仓库、企业应用等</li>
          </ul>
          <Alert message="要点" description={<ul className="list-disc pl-6"><li>MySQL是关系型数据库，数据以表格形式存储</li><li>支持多种存储引擎，默认InnoDB</li></ul>} type="info" showIcon />
        </Card>
      )
    },
    {
      key: '2',
      label: '⚙️ 安装与环境配置',
      children: (
        <Card title="安装与环境配置" className="mb-6">
          <Paragraph>MySQL支持Windows、Linux、Mac等多平台，可通过官网下载安装包或包管理器安装。</Paragraph>
          <CodeBlock language="bash">{`# Windows：官网下载并安装MySQL Installer
# Mac：brew install mysql
# Ubuntu：sudo apt-get install mysql-server`}</CodeBlock>
          <Paragraph>安装后可通过命令行启动服务：</Paragraph>
          <CodeBlock language="bash">{`# Windows
net start mysql
# Mac/Linux
mysql.server start`}</CodeBlock>
          <Alert message="要点" description={<ul className="list-disc pl-6"><li>安装时建议设置root密码</li><li>可选图形化工具：MySQL Workbench、DBeaver、Navicat</li></ul>} type="success" showIcon />
        </Card>
      )
    },
    {
      key: '3',
      label: '🔗 客户端与连接方式',
      children: (
        <Card title="客户端与连接方式" className="mb-6">
          <Paragraph>MySQL可通过命令行或图形化客户端连接，常用命令：</Paragraph>
          <CodeBlock language="bash">{`# 命令行连接
mysql -u root -p
# 远程连接
mysql -h 服务器IP -u 用户名 -p`}</CodeBlock>
          <Paragraph>图形化客户端如MySQL Workbench、DBeaver、Navicat等，支持可视化管理数据库。</Paragraph>
          <Alert message="要点" description={<ul className="list-disc pl-6"><li>本地连接无需-h参数，远程需开放3306端口</li><li>连接失败多为防火墙或权限问题</li></ul>} type="info" showIcon />
        </Card>
      )
    },
    {
      key: '4',
      label: '📚 数据库基本操作',
      children: (
        <Card title="数据库基本操作" className="mb-6">
          <Paragraph>常用数据库操作包括创建、删除、切换和查看数据库：</Paragraph>
          <CodeBlock language="sql">{`-- 创建数据库
CREATE DATABASE testdb;
-- 查看所有数据库
SHOW DATABASES;
-- 切换数据库
USE testdb;
-- 删除数据库
DROP DATABASE testdb;`}</CodeBlock>
          <Alert message="要点" description={<ul className="list-disc pl-6"><li>SQL语句不区分大小写，建议用分号结尾</li><li>操作数据库需有相应权限</li></ul>} type="success" showIcon />
        </Card>
      )
    },
    {
      key: '5',
      label: '💡 综合练习与参考答案',
      children: (
        <Card title="综合练习与参考答案" className="mb-6">
          <Paragraph><b>练习题：</b></Paragraph>
          <ul className="list-disc pl-6">
            <li>
              写出MySQL命令行连接本地数据库的完整命令。
              <Collapse className="mt-2">
                <Collapse.Panel header="参考答案" key="1">
                  <CodeBlock language="bash">{`mysql -u root -p`}</CodeBlock>
                  <Paragraph>解析：-u指定用户名，-p提示输入密码。</Paragraph>
                </Collapse.Panel>
              </Collapse>
            </li>
            <li>
              创建名为company的数据库，并切换到该数据库。
              <Collapse className="mt-2">
                <Collapse.Panel header="参考答案" key="2">
                  <CodeBlock language="sql">{`CREATE DATABASE company;
USE company;`}</CodeBlock>
                  <Paragraph>解析：先创建再切换，SQL语句分号结尾。</Paragraph>
                </Collapse.Panel>
              </Collapse>
            </li>
            <li>
              删除名为test的数据库。
              <Collapse className="mt-2">
                <Collapse.Panel header="参考答案" key="3">
                  <CodeBlock language="sql">{`DROP DATABASE test;`}</CodeBlock>
                  <Paragraph>解析：DROP DATABASE用于删除数据库。</Paragraph>
                </Collapse.Panel>
              </Collapse>
            </li>
          </ul>
          <Alert message="温馨提示" description="多练习命令行和SQL基本操作，熟悉数据库管理流程。" type="info" showIcon />
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
              <h1 className="text-3xl font-bold text-gray-900">数据库基础与环境</h1>
              <p className="text-gray-600 mt-2">了解MySQL数据库的基本概念与环境配置</p>
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
            href="/study/sql/select"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
          >
            下一课：基本查询（SELECT）
            <RightOutlined className="ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
} 