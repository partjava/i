'use client';

import React from 'react';
import { Card, Tabs, Progress, Alert, Typography, Collapse } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { CodeBlock } from '@/app/components/ui/CodeBlock';

const { Paragraph, Text } = Typography;

export default function JavaExceptionsPage() {
  const tabItems = [
    {
      key: '1',
      label: '⚠️ 异常体系与分类',
      children: (
        <Card title="异常体系与分类" className="mb-6">
          <Paragraph>Java异常分为受检异常（Checked）和非受检异常（Unchecked）。所有异常继承自Throwable，常见有Exception和RuntimeException。</Paragraph>
          <CodeBlock language="java">{`try {
    int a = 10 / 0; // ArithmeticException
} catch (ArithmeticException e) {
    System.out.println("除零错误");
}`}</CodeBlock>
          <Alert message="要点" description={<ul className="list-disc pl-6"><li>受检异常需强制捕获或声明</li><li>常见非受检异常：NullPointerException, ArrayIndexOutOfBoundsException</li></ul>} type="info" showIcon />
        </Card>
      )
    },
    {
      key: '2',
      label: '🛡️ try-catch-finally用法',
      children: (
        <Card title="try-catch-finally用法" className="mb-6">
          <Paragraph>try块用于捕获异常，catch处理异常，finally无论是否异常都会执行，常用于资源释放。</Paragraph>
          <CodeBlock language="java">{`try {
    int[] arr = {1, 2};
    System.out.println(arr[2]);
} catch (ArrayIndexOutOfBoundsException e) {
    System.out.println("数组越界");
} finally {
    System.out.println("程序结束");
}`}</CodeBlock>
          <Alert message="要点" description={<ul className="list-disc pl-6"><li>finally常用于关闭文件、释放资源</li><li>catch可多分支，按异常类型匹配</li></ul>} type="success" showIcon />
        </Card>
      )
    },
    {
      key: '3',
      label: '📝 自定义异常与throws',
      children: (
        <Card title="自定义异常与throws" className="mb-6">
          <Paragraph>可通过继承Exception或RuntimeException自定义异常类。throws用于声明方法可能抛出的异常。</Paragraph>
          <CodeBlock language="java">{`class MyException extends Exception {
    public MyException(String msg) { super(msg); }
}

public class Main {
    static void check(int age) throws MyException {
        if (age < 18) throw new MyException("未成年人");
    }
    public static void main(String[] args) {
        try {
            check(15);
        } catch (MyException e) {
            System.out.println(e.getMessage());
        }
    }
}`}</CodeBlock>
          <Alert message="要点" description={<ul className="list-disc pl-6"><li>自定义异常需继承Exception或RuntimeException</li><li>throws声明异常，throw抛出异常</li></ul>} type="info" showIcon />
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
              编写一个方法，接收两个整数参数，返回它们的商，若除数为0抛出自定义异常。
              <Collapse className="mt-2">
                <Collapse.Panel header="参考答案" key="1">
                  <CodeBlock language="java">{`class DivideByZeroException extends Exception {
    public DivideByZeroException(String msg) { super(msg); }
}
public class Main {
    static int divide(int a, int b) throws DivideByZeroException {
        if (b == 0) throw new DivideByZeroException("除数不能为0");
        return a / b;
    }
    public static void main(String[] args) {
        try {
            System.out.println(divide(10, 0));
        } catch (DivideByZeroException e) {
            System.out.println(e.getMessage());
        }
    }
}`}</CodeBlock>
                  <Paragraph>解析：自定义异常类，方法用throws声明，遇到0主动抛出异常。</Paragraph>
                </Collapse.Panel>
              </Collapse>
            </li>
            <li>
              输入一个字符串，尝试将其转为整数，若格式错误捕获异常并提示。
              <Collapse className="mt-2">
                <Collapse.Panel header="参考答案" key="2">
                  <CodeBlock language="java">{`import java.util.Scanner;
public class ParseIntDemo {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = sc.nextLine();
        try {
            int n = Integer.parseInt(s);
            System.out.println("转换成功：" + n);
        } catch (NumberFormatException e) {
            System.out.println("输入不是有效整数");
        }
    }
}`}</CodeBlock>
                  <Paragraph>解析：parseInt可能抛出NumberFormatException，需用try-catch捕获。</Paragraph>
                </Collapse.Panel>
              </Collapse>
            </li>
            <li>
              编写一个方法，读取数组指定下标元素，若越界捕获异常并返回-1。
              <Collapse className="mt-2">
                <Collapse.Panel header="参考答案" key="3">
                  <CodeBlock language="java">{`public class ArrayRead {
    static int get(int[] arr, int idx) {
        try {
            return arr[idx];
        } catch (ArrayIndexOutOfBoundsException e) {
            return -1;
        }
    }
    public static void main(String[] args) {
        int[] arr = {1,2,3};
        System.out.println(get(arr, 5)); // -1
    }
}`}</CodeBlock>
                  <Paragraph>解析：数组越界时catch异常，返回-1作为错误标记。</Paragraph>
                </Collapse.Panel>
              </Collapse>
            </li>
          </ul>
          <Alert message="温馨提示" description="多练习异常捕获与自定义异常，理解异常处理机制。" type="info" showIcon />
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
              <h1 className="text-3xl font-bold text-gray-900">Java异常处理</h1>
              <p className="text-gray-600 mt-2">掌握异常体系、try-catch、throws与自定义异常</p>
            </div>
            <Progress type="circle" percent={50} size={100} strokeColor="#1890ff" />
          </div>
        </div>

        {/* 课程内容 */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <Tabs items={tabItems} tabPosition="left" className="p-6" />
        </div>

        {/* 底部导航 */}
        <div className="flex justify-between mt-8">
          <Link
            href="/study/java/collections"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gray-600 hover:bg-gray-700"
          >
            <LeftOutlined className="mr-2" />
            上一课：常用类与集合
          </Link>
          <Link
            href="/study/java/file-io"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
          >
            下一课：文件与IO
            <RightOutlined className="ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
} 