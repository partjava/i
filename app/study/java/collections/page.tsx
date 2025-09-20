'use client';

import React from 'react';
import { Card, Tabs, Progress, Alert, Typography, Collapse } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { CodeBlock } from '@/app/components/ui/CodeBlock';

const { Paragraph, Text } = Typography;

export default function JavaCollectionsPage() {
  const tabItems = [
    {
      key: '1',
      label: '🔤 String与常用API',
      children: (
        <Card title="String与常用API" className="mb-6">
          <Paragraph>String是Java中最常用的引用类型，字符串不可变。常用API有length、substring、equals、split、replace等。</Paragraph>
          <CodeBlock language="java">{`String s = "Hello, Java!";
System.out.println(s.length()); // 11
System.out.println(s.substring(7)); // Java!
System.out.println(s.equals("hello, java!")); // false
String[] arr = s.split(", ");
System.out.println(arr[1]); // Java!
System.out.println(s.replace("Java", "World")); // Hello, World!`}</CodeBlock>
          <Alert message="要点" description={<ul className="list-disc pl-6"><li>字符串不可变，操作返回新对象</li><li>字符串比较用equals，不能用==</li></ul>} type="info" showIcon />
        </Card>
      )
    },
    {
      key: '2',
      label: '📚 数组与ArrayList',
      children: (
        <Card title="数组与ArrayList" className="mb-6">
          <Paragraph>数组是定长、同类型数据的集合。ArrayList是可变长的动态数组，常用add、get、size、remove等方法。</Paragraph>
          <CodeBlock language="java">{`int[] nums = {1, 2, 3};
for (int n : nums) {
    System.out.print(n + " ");
}

import java.util.ArrayList;
ArrayList<String> list = new ArrayList<>();
list.add("A");
list.add("B");
System.out.println(list.get(0)); // A
list.remove("A");
System.out.println(list.size()); // 1`}</CodeBlock>
          <Alert message="要点" description={<ul className="list-disc pl-6"><li>数组长度固定，ArrayList可动态增删</li><li>ArrayList需import java.util.ArrayList</li></ul>} type="success" showIcon />
        </Card>
      )
    },
    {
      key: '3',
      label: '🔑 HashMap与集合遍历',
      children: (
        <Card title="HashMap与集合遍历" className="mb-6">
          <Paragraph>HashMap用于存储键值对，常用put、get、containsKey、keySet等方法。集合遍历可用for-each或迭代器。</Paragraph>
          <CodeBlock language="java">{`import java.util.HashMap;
HashMap<String, Integer> map = new HashMap<>();
map.put("Tom", 90);
map.put("Jerry", 85);
System.out.println(map.get("Tom")); // 90
for (String key : map.keySet()) {
    System.out.println(key + ": " + map.get(key));
}`}</CodeBlock>
          <Alert message="要点" description={<ul className="list-disc pl-6"><li>HashMap键值类型可自定义</li><li>遍历Map常用keySet或entrySet</li></ul>} type="info" showIcon />
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
              输入一行字符串，统计每个字符出现的次数。
              <Collapse className="mt-2">
                <Collapse.Panel header="参考答案" key="1">
                  <CodeBlock language="java">{`import java.util.HashMap;
import java.util.Scanner;

public class CharCount {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = sc.nextLine();
        HashMap<Character, Integer> map = new HashMap<>();
        for (char c : s.toCharArray()) {
            map.put(c, map.getOrDefault(c, 0) + 1);
        }
        for (char c : map.keySet()) {
            System.out.println(c + ": " + map.get(c));
        }
    }
}`}</CodeBlock>
                  <Paragraph>解析：用HashMap统计字符频次，getOrDefault简化计数。</Paragraph>
                </Collapse.Panel>
              </Collapse>
            </li>
            <li>
              输入若干学生姓名和成绩，输出平均分。
              <Collapse className="mt-2">
                <Collapse.Panel header="参考答案" key="2">
                  <CodeBlock language="java">{`import java.util.ArrayList;
import java.util.Scanner;

public class AvgScore {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        ArrayList<Integer> scores = new ArrayList<>();
        while (sc.hasNextInt()) {
            scores.add(sc.nextInt());
        }
        int sum = 0;
        for (int s : scores) sum += s;
        System.out.println("平均分：" + (sum * 1.0 / scores.size()));
    }
}`}</CodeBlock>
                  <Paragraph>解析：用ArrayList存储成绩，循环累加后求平均。</Paragraph>
                </Collapse.Panel>
              </Collapse>
            </li>
            <li>
              用HashMap实现简单的学生查分系统（输入姓名查成绩）。
              <Collapse className="mt-2">
                <Collapse.Panel header="参考答案" key="3">
                  <CodeBlock language="java">{`import java.util.HashMap;
import java.util.Scanner;

public class QueryScore {
    public static void main(String[] args) {
        HashMap<String, Integer> map = new HashMap<>();
        map.put("张三", 90);
        map.put("李四", 85);
        map.put("王五", 78);
        Scanner sc = new Scanner(System.in);
        String name = sc.nextLine();
        if (map.containsKey(name)) {
            System.out.println(name + "的成绩：" + map.get(name));
        } else {
            System.out.println("查无此人");
        }
    }
}`}</CodeBlock>
                  <Paragraph>解析：用HashMap存储姓名和成绩，containsKey判断是否存在。</Paragraph>
                </Collapse.Panel>
              </Collapse>
            </li>
          </ul>
          <Alert message="温馨提示" description="多练习集合操作，熟悉常用API和遍历方式。" type="info" showIcon />
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
              <h1 className="text-3xl font-bold text-gray-900">Java常用类与集合</h1>
              <p className="text-gray-600 mt-2">掌握String、数组、ArrayList、HashMap等常用API</p>
            </div>
            <Progress type="circle" percent={40} size={100} strokeColor="#1890ff" />
          </div>
        </div>

        {/* 课程内容 */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <Tabs items={tabItems} tabPosition="left" className="p-6" />
        </div>

        {/* 底部导航 */}
        <div className="flex justify-between mt-8">
          <Link
            href="/study/java/oop"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gray-600 hover:bg-gray-700"
          >
            <LeftOutlined className="mr-2" />
            上一课：面向对象
          </Link>
          <Link
            href="/study/java/exceptions"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
          >
            下一课：异常处理
            <RightOutlined className="ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
} 