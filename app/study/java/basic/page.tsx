'use client';

import React from 'react';
import { Card, Tabs, Progress, Alert, Typography, Collapse } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { CodeBlock } from '@/app/components/ui/CodeBlock';

const { Title, Paragraph, Text } = Typography;

export default function JavaBasicPage() {
  const tabItems = [
    {
      key: '1',
      label: '🔢 变量与数据类型',
      children: (
        <Card title="变量与数据类型" className="mb-6">
          <Paragraph>Java是强类型语言，所有变量都必须先声明类型。常见数据类型包括：</Paragraph>
          <ul className="list-disc pl-6">
            <li><Text code>int</Text>（整数）</li>
            <li><Text code>double</Text>（双精度浮点数）</li>
            <li><Text code>char</Text>（字符）</li>
            <li><Text code>boolean</Text>（布尔型）</li>
            <li><Text code>String</Text>（字符串，引用类型）</li>
          </ul>
          <Paragraph><b>包装类与类型转换：</b></Paragraph>
          <CodeBlock language="java">
{`int a = 10;
double b = a; // 自动类型提升
int c = (int) 3.14; // 强制类型转换
String s = String.valueOf(a); // int转String
int d = Integer.parseInt("123"); // String转int
`}
          </CodeBlock>
          <Paragraph><b>常见陷阱：</b></Paragraph>
          <CodeBlock language="java">
{`Integer x = null;
// System.out.println(x + 1); // NullPointerException
`}
          </CodeBlock>
          <Alert message="要点" description={<ul className="list-disc pl-6"><li>基本类型与包装类区别</li><li>类型转换需注意精度丢失和异常</li></ul>} type="info" showIcon />
        </Card>
      )
    },
    {
      key: '2',
      label: '➕ 运算符与表达式',
      children: (
        <Card title="运算符与表达式" className="mb-6">
          <Paragraph>Java支持多种运算符，包括算术、关系、逻辑、赋值、自增自减、三元运算符等：</Paragraph>
          <ul className="list-disc pl-6">
            <li>算术运算符：<Text code>+</Text> <Text code>-</Text> <Text code>*</Text> <Text code>/</Text> <Text code>%</Text></li>
            <li>关系运算符：<Text code>==</Text> <Text code>!=</Text> <Text code>&gt;</Text> <Text code>&lt;</Text> <Text code>&gt;=</Text> <Text code>&lt;=</Text></li>
            <li>逻辑运算符：<Text code>&&</Text> <Text code>||</Text> <Text code>!</Text></li>
            <li>自增自减：<Text code>++</Text> <Text code>--</Text></li>
            <li>三元运算符：<Text code>条件 ? 值1 : 值2</Text></li>
          </ul>
          <Paragraph><b>优先级与表达式：</b></Paragraph>
          <CodeBlock language="java">
{`int a = 5, b = 2;
int max = a > b ? a : b; // 三元运算符
int x = 1 + 2 * 3; // 结果为7
int y = (1 + 2) * 3; // 结果为9
int i = 1;
System.out.println(i++ + ++i); // 输出3（先用后加+先加后用）
`}
          </CodeBlock>
          <Alert message="要点" description={<ul className="list-disc pl-6"><li>三元运算符常用于条件赋值</li><li>注意运算符优先级和自增自减顺序</li></ul>} type="success" showIcon />
        </Card>
      )
    },
    {
      key: '3',
      label: '📥 输入输出',
      children: (
        <Card title="输入输出" className="mb-6">
          <Paragraph>Java常用 <Text code>System.out.println()</Text> 输出信息，输入可用 <Text code>Scanner</Text> 类。还可以进行格式化输出：</Paragraph>
          <CodeBlock language="java">
{`import java.util.Scanner;

public class InputDemo {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("请输入姓名：");
        String name = sc.nextLine();
        System.out.print("请输入年龄：");
        int age = sc.nextInt();
        System.out.printf("姓名：%s，年龄：%d\n", name, age);
    }
}`}
          </CodeBlock>
          <Paragraph><b>异常处理：</b></Paragraph>
          <CodeBlock language="java">
{`try {
    int num = Integer.parseInt("abc");
} catch (NumberFormatException e) {
    System.out.println("输入不是数字");
}`}
          </CodeBlock>
          <Alert message="要点" description={<ul className="list-disc pl-6"><li>格式化输出用printf</li><li>输入异常需捕获处理</li></ul>} type="info" showIcon />
        </Card>
      )
    },
    {
      key: '4',
      label: '💡 进阶练习与常见问题',
      children: (
        <Card title="进阶练习与常见问题" className="mb-6">
          <Paragraph><b>进阶练习：</b></Paragraph>
          <ul className="list-disc pl-6">
            <li>
              编写程序，输入一个字符串，判断是否为数字
              <Collapse className="mt-2">
                <Collapse.Panel header="参考答案" key="1">
                  <CodeBlock language="java">{`import java.util.Scanner;

public class IsNumber {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String input = sc.nextLine();
        boolean isNumber = input.matches("\\d+");
        System.out.println(isNumber ? "是数字" : "不是数字");
    }
}`}</CodeBlock>
                  <Paragraph>解析：用正则表达式<code>\\d+</code>判断字符串是否全为数字。</Paragraph>
                </Collapse.Panel>
              </Collapse>
            </li>
            <li>
              实现两个变量值的交换（不使用第三个变量）
              <Collapse className="mt-2">
                <Collapse.Panel header="参考答案" key="2">
                  <CodeBlock language="java">{`int a = 5, b = 8;
a = a + b;
b = a - b;
a = a - b;
System.out.println("a=" + a + ", b=" + b);`}</CodeBlock>
                  <Paragraph>解析：利用加减法实现交换，避免使用临时变量。</Paragraph>
                </Collapse.Panel>
              </Collapse>
            </li>
            <li>
              输入一个浮点数，输出其整数部分和小数部分
              <Collapse className="mt-2">
                <Collapse.Panel header="参考答案" key="3">
                  <CodeBlock language="java">{`import java.util.Scanner;

public class SplitFloat {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        double num = sc.nextDouble();
        int intPart = (int) num;
        double fracPart = num - intPart;
        System.out.println("整数部分：" + intPart);
        System.out.println("小数部分：" + fracPart);
    }
}`}</CodeBlock>
                  <Paragraph>解析：强制类型转换获得整数部分，原数减去整数部分即为小数部分。</Paragraph>
                </Collapse.Panel>
              </Collapse>
            </li>
          </ul>
          <Paragraph><b>常见问题：</b></Paragraph>
          <ul className="list-disc pl-6">
            <li>类型转换异常（NumberFormatException）</li>
            <li>自增自减顺序混淆</li>
            <li>字符串比较用 <Text code>equals()</Text>，不能用 <Text code>==</Text></li>
          </ul>
          <Alert message="温馨提示" description="多写代码多调试，遇到报错先看提示信息和异常类型。" type="info" showIcon />
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
              <h1 className="text-3xl font-bold text-gray-900">Java基础语法</h1>
              <p className="text-gray-600 mt-2">掌握变量、类型转换、运算符、输入输出与常见陷阱</p>
            </div>
            <Progress type="circle" percent={10} size={100} strokeColor="#1890ff" />
          </div>
        </div>

        {/* 课程内容 */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <Tabs items={tabItems} tabPosition="left" className="p-6" />
        </div>

        {/* 底部导航 */}
        <div className="flex justify-between mt-8">
          <Link
            href="/study/java/intro"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gray-600 hover:bg-gray-700"
          >
            <LeftOutlined className="mr-2" />
            上一课：编程入门
          </Link>
          <Link
            href="/study/java/control"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
          >
            下一课：流程控制
            <RightOutlined className="ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
} 