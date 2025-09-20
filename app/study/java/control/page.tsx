'use client';

import React from 'react';
import { Card, Tabs, Progress, Alert, Typography, Collapse } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { CodeBlock } from '@/app/components/ui/CodeBlock';

const { Title, Paragraph, Text } = Typography;

export default function JavaControlPage() {
  const tabItems = [
    {
      key: '1',
      label: '🔀 条件语句',
      children: (
        <Card title="条件语句" className="mb-6">
          <Paragraph>Java支持 <Text code>if-else</Text> 和 <Text code>switch</Text> 两种条件分支结构。</Paragraph>
          <Paragraph><b>if-else嵌套：</b></Paragraph>
          <CodeBlock language="java">
{`int score = 85;
if (score >= 90) {
    System.out.println("优秀");
} else if (score >= 60) {
    System.out.println("及格");
} else {
    System.out.println("不及格");
}`}
          </CodeBlock>
          <Paragraph><b>switch多分支：</b></Paragraph>
          <CodeBlock language="java">
{`int day = 3;
switch (day) {
    case 1:
        System.out.println("星期一");
        break;
    case 2:
        System.out.println("星期二");
        break;
    case 3:
        System.out.println("星期三");
        break;
    default:
        System.out.println("其他");
}`}
          </CodeBlock>
          <Alert message="要点" description={<ul className="list-disc pl-6"><li>switch支持int、char、String等类型</li><li>case后要加break防止穿透</li></ul>} type="info" showIcon />
        </Card>
      )
    },
    {
      key: '2',
      label: '🔁 循环语句',
      children: (
        <Card title="循环语句" className="mb-6">
          <Paragraph>Java常用循环有 <Text code>for</Text>、<Text code>while</Text>、<Text code>do-while</Text>。</Paragraph>
          <Paragraph><b>for循环：</b></Paragraph>
          <CodeBlock language="java">
{`for (int i = 1; i <= 9; i++) {
    for (int j = 1; j <= i; j++) {
        System.out.print(j + "*" + i + "=" + (i*j) + " ");
    }
    System.out.println();
}`}
          </CodeBlock>
          <Paragraph><b>while与do-while：</b></Paragraph>
          <CodeBlock language="java">
{`int n = 5;
while (n > 0) {
    System.out.println(n);
    n--;
}

do {
    System.out.println("至少执行一次");
} while (false);`}
          </CodeBlock>
          <Alert message="要点" description={<ul className="list-disc pl-6"><li>for适合已知次数，while适合未知次数</li><li>do-while至少执行一次</li></ul>} type="success" showIcon />
        </Card>
      )
    },
    {
      key: '3',
      label: '⏭️ 跳转语句',
      children: (
        <Card title="跳转语句" className="mb-6">
          <Paragraph>Java支持 <Text code>break</Text>、<Text code>continue</Text>、<Text code>return</Text> 跳转语句。</Paragraph>
          <Paragraph><b>break与continue：</b></Paragraph>
          <CodeBlock language="java">
{`for (int i = 1; i <= 5; i++) {
    if (i == 3) continue;
    if (i == 5) break;
    System.out.print(i + " ");
}
// 输出：1 2 4`}
          </CodeBlock>
          <Paragraph><b>return用法：</b></Paragraph>
          <CodeBlock language="java">
{`public static int sum(int a, int b) {
    return a + b;
}`}
          </CodeBlock>
          <Alert message="要点" description={<ul className="list-disc pl-6"><li>break跳出循环，continue跳过本次循环</li><li>return用于方法返回</li></ul>} type="info" showIcon />
        </Card>
      )
    },
    {
      key: '4',
      label: '💡 综合练习与常见问题',
      children: (
        <Card title="综合练习与常见问题" className="mb-6">
          <Paragraph><b>综合练习：</b></Paragraph>
          <ul className="list-disc pl-6">
            <li>
              打印九九乘法表
              <Collapse className="mt-2">
                <Collapse.Panel header="参考答案" key="1">
                  <CodeBlock language="java">{`for (int i = 1; i <= 9; i++) {
    for (int j = 1; j <= i; j++) {
        System.out.print(j + "*" + i + "=" + (i*j) + " ");
    }
    System.out.println();
}`}</CodeBlock>
                  <Paragraph>解析：使用嵌套for循环，外层控制行，内层控制列。</Paragraph>
                </Collapse.Panel>
              </Collapse>
            </li>
            <li>
              输入一个正整数，判断是否为素数
              <Collapse className="mt-2">
                <Collapse.Panel header="参考答案" key="2">
                  <CodeBlock language="java">{`import java.util.Scanner;

public class PrimeCheck {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        boolean isPrime = n > 1;
        for (int i = 2; i <= Math.sqrt(n); i++) {
            if (n % i == 0) {
                isPrime = false;
                break;
            }
        }
        System.out.println(isPrime ? "是素数" : "不是素数");
    }
}`}</CodeBlock>
                  <Paragraph>解析：素数只被1和自身整除，遍历到sqrt(n)即可。</Paragraph>
                </Collapse.Panel>
              </Collapse>
            </li>
            <li>
              猜数字游戏：随机生成1-100的数，用户多次输入直到猜中
              <Collapse className="mt-2">
                <Collapse.Panel header="参考答案" key="3">
                  <CodeBlock language="java">{`import java.util.Scanner;
import java.util.Random;

public class GuessNumber {
    public static void main(String[] args) {
        Random rand = new Random();
        int target = rand.nextInt(100) + 1;
        Scanner sc = new Scanner(System.in);
        int guess;
        do {
            System.out.print("请输入1-100之间的数字：");
            guess = sc.nextInt();
            if (guess > target) {
                System.out.println("大了");
            } else if (guess < target) {
                System.out.println("小了");
            } else {
                System.out.println("恭喜你猜对了！");
            }
        } while (guess != target);
    }
}`}</CodeBlock>
                  <Paragraph>解析：用do-while循环和Random类实现多次猜测。</Paragraph>
                </Collapse.Panel>
              </Collapse>
            </li>
          </ul>
          <Paragraph><b>常见问题：</b></Paragraph>
          <ul className="list-disc pl-6">
            <li>循环变量作用域</li>
            <li>死循环与条件判断错误</li>
            <li>switch case穿透</li>
          </ul>
          <Alert message="温馨提示" description="多写多练，调试时可用System.out.println输出变量值。" type="info" showIcon />
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
              <h1 className="text-3xl font-bold text-gray-900">Java流程控制</h1>
              <p className="text-gray-600 mt-2">掌握条件、循环、跳转等流程控制语句</p>
            </div>
            <Progress type="circle" percent={20} size={100} strokeColor="#1890ff" />
          </div>
        </div>

        {/* 课程内容 */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <Tabs items={tabItems} tabPosition="left" className="p-6" />
        </div>

        {/* 底部导航 */}
        <div className="flex justify-between mt-8">
          <Link
            href="/study/java/basic"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gray-600 hover:bg-gray-700"
          >
            <LeftOutlined className="mr-2" />
            上一课：基础语法
          </Link>
          <Link
            href="/study/java/oop"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
          >
            下一课：面向对象
            <RightOutlined className="ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
} 