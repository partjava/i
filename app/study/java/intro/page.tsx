'use client';

import React from 'react';
import { Card, Tabs, Progress, Alert, Typography } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { CodeBlock } from '@/app/components/ui/CodeBlock';

const { Title, Paragraph, Text } = Typography;

export default function JavaIntroPage() {
  const tabItems = [
    {
      key: '1',
      label: '🌟 Java简介与环境',
      children: (
        <Card title="Java简介与开发环境" className="mb-6">
          <Paragraph>Java是一门广泛应用于企业级开发、移动端、Web和大数据等领域的面向对象编程语言。其跨平台、稳定、安全的特性使其成为全球最受欢迎的编程语言之一。</Paragraph>
          <Paragraph><b>开发环境搭建：</b></Paragraph>
          <ul className="list-disc pl-6">
            <li>下载并安装 <Text code>JDK</Text>（推荐Oracle JDK或OpenJDK）</li>
            <li>配置环境变量 <Text code>JAVA_HOME</Text> 和 <Text code>Path</Text></li>
            <li>推荐IDE：IntelliJ IDEA、Eclipse、VS Code等</li>
          </ul>
          <CodeBlock language="bash">
{`# 检查Java安装
java -version
# 输出示例
# java version "17.0.2" 2022-01-18
`}
          </CodeBlock>
          <Alert message="要点" description={<ul className="list-disc pl-6"><li>Java跨平台：一次编写，到处运行</li><li>JDK包含JRE和开发工具</li></ul>} type="info" showIcon />
        </Card>
      )
    },
    {
      key: '2',
      label: '👋 第一个Java程序',
      children: (
        <Card title="HelloWorld程序" className="mb-6">
          <Paragraph>Java程序的基本结构由类、主方法（<Text code>main</Text>）组成。下面是经典的HelloWorld示例：</Paragraph>
          <CodeBlock language="java">
{`public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, Java!");
    }
}`}
          </CodeBlock>
          <Paragraph><b>编译与运行：</b></Paragraph>
          <CodeBlock language="bash">
{`javac HelloWorld.java
java HelloWorld`}
          </CodeBlock>
          <Alert message="要点" description={<ul className="list-disc pl-6"><li>类名需与文件名一致</li><li>主方法是程序入口</li><li>每条语句以分号结尾</li></ul>} type="success" showIcon />
        </Card>
      )
    },
    {
      key: '3',
      label: '❓ 常见问题与练习',
      children: (
        <Card title="常见问题与练习" className="mb-6">
          <Paragraph><b>常见问题：</b></Paragraph>
          <ul className="list-disc pl-6">
            <li>编译报错：检查类名、文件名、大小写</li>
            <li>找不到主方法：确保方法签名为 <Text code>public static void main(String[] args)</Text></li>
            <li>中文乱码：建议文件保存为UTF-8编码</li>
          </ul>
          <Paragraph><b>练习题：</b></Paragraph>
          <ul className="list-disc pl-6">
            <li>编写一个Java程序，输出你的姓名和年龄</li>
            <li>尝试修改HelloWorld，输出多行内容</li>
          </ul>
          <Alert message="温馨提示" description="多动手实践，遇到问题多查文档和社区。" type="info" showIcon />
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
              <h1 className="text-3xl font-bold text-gray-900">Java编程入门</h1>
              <p className="text-gray-600 mt-2">了解Java语言特点，完成第一个Java程序</p>
            </div>
            <Progress type="circle" percent={5} size={100} strokeColor="#1890ff" />
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
            href="/study/java/basic"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
          >
            下一课：基础语法
            <RightOutlined className="ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
} 