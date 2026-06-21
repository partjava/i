'use client';

import React from 'react';
import { Card, Tabs, Progress, Alert, Typography, Collapse } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { CodeBlock } from '@/app/components/ui/CodeBlock';

const { Paragraph, Text } = Typography;

export default function JavaProjectsPage() {
  const tabItems = [
    {
      key: '1',
      label: '🖥️ 控制台应用实战',
      children: (
        <Card title="控制台应用实战" className="mb-6">
          <Paragraph>实现一个简单的命令行记账本，支持添加、查询和删除账目。</Paragraph>
          <CodeBlock language="java">{`import java.util.*;
public class Ledger {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        ArrayList<String> records = new ArrayList<>();
        while (true) {
            System.out.println("1. 添加 2. 查询 3. 删除 0. 退出");
            int op = sc.nextInt(); sc.nextLine();
            if (op == 1) {
                System.out.print("输入账目：");
                records.add(sc.nextLine());
            } else if (op == 2) {
                for (int i = 0; i < records.size(); i++)
                    System.out.println(i + ": " + records.get(i));
            } else if (op == 3) {
                System.out.print("输入要删除的编号：");
                int idx = sc.nextInt();
                if (idx >= 0 && idx < records.size()) records.remove(idx);
            } else if (op == 0) break;
        }
    }
}`}</CodeBlock>
          <Alert message="要点" description={<ul className="list-disc pl-6"><li>用ArrayList存储账目，循环实现菜单</li><li>输入输出用Scanner</li></ul>} type="info" showIcon />
        </Card>
      )
    },
    {
      key: '2',
      label: '📂 文件处理项目',
      children: (
        <Card title="文件处理项目" className="mb-6">
          <Paragraph>实现一个批量重命名文件的小工具，将指定目录下所有.txt文件按序号重命名。</Paragraph>
          <CodeBlock language="java">{`import java.io.File;
public class RenameFiles {
    public static void main(String[] args) {
        File dir = new File("./docs");
        File[] files = dir.listFiles((d, name) -> name.endsWith(".txt"));
        for (int i = 0; i < files.length; i++) {
            File newFile = new File(dir, "file_" + (i+1) + ".txt");
            files[i].renameTo(newFile);
        }
    }
}`}</CodeBlock>
          <Alert message="要点" description={<ul className="list-disc pl-6"><li>File.listFiles可筛选文件</li><li>renameTo重命名文件</li></ul>} type="success" showIcon />
        </Card>
      )
    },
    {
      key: '3',
      label: '🌐 网络通信项目',
      children: (
        <Card title="网络通信项目" className="mb-6">
          <Paragraph>实现一个简单的TCP聊天程序，客户端发送消息，服务器接收并回复。</Paragraph>
          <CodeBlock language="java">{`// 服务器端
import java.net.*;
import java.io.*;
public class ChatServer {
    public static void main(String[] args) throws Exception {
        ServerSocket server = new ServerSocket(9999);
        Socket client = server.accept();
        BufferedReader in = new BufferedReader(new InputStreamReader(client.getInputStream()));
        BufferedWriter out = new BufferedWriter(new OutputStreamWriter(client.getOutputStream()));
        String msg = in.readLine();
        System.out.println("收到：" + msg);
        out.write("你好，客户端！\n");
        out.flush();
        client.close();
        server.close();
    }
}`}</CodeBlock>
          <Paragraph>客户端代码：</Paragraph>
          <CodeBlock language="java">{`import java.net.*;
import java.io.*;
public class ChatClient {
    public static void main(String[] args) throws Exception {
        Socket socket = new Socket("localhost", 9999);
        BufferedWriter out = new BufferedWriter(new OutputStreamWriter(socket.getOutputStream()));
        BufferedReader in = new BufferedReader(new InputStreamReader(socket.getInputStream()));
        out.write("你好，服务器！\n");
        out.flush();
        System.out.println("收到回复：" + in.readLine());
        socket.close();
    }
}`}</CodeBlock>
          <Alert message="要点" description={<ul className="list-disc pl-6"><li>Socket实现双向通信</li><li>注意端口号和消息换行</li></ul>} type="info" showIcon />
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
              实现一个学生信息管理系统，支持添加、查询、删除学生。
              <Collapse className="mt-2">
                <Collapse.Panel header="参考答案" key="1">
                  <CodeBlock language="java">{`import java.util.*;
public class StudentManager {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        HashMap<String, Integer> map = new HashMap<>();
        while (true) {
            System.out.println("1. 添加 2. 查询 3. 删除 0. 退出");
            int op = sc.nextInt(); sc.nextLine();
            if (op == 1) {
                System.out.print("姓名：");
                String name = sc.nextLine();
                System.out.print("成绩：");
                int score = sc.nextInt();
                map.put(name, score);
            } else if (op == 2) {
                for (String name : map.keySet())
                    System.out.println(name + ": " + map.get(name));
            } else if (op == 3) {
                System.out.print("姓名：");
                String name = sc.nextLine();
                map.remove(name);
            } else if (op == 0) break;
        }
    }
}`}</CodeBlock>
                  <Paragraph>解析：用HashMap存储学生信息，菜单循环实现增删查。</Paragraph>
                </Collapse.Panel>
              </Collapse>
            </li>
            <li>
              编写一个程序，统计指定目录下所有.txt文件的总行数。
              <Collapse className="mt-2">
                <Collapse.Panel header="参考答案" key="2">
                  <CodeBlock language="java">{`import java.io.*;
public class CountTxtLines {
    public static void main(String[] args) throws Exception {
        File dir = new File("./docs");
        int total = 0;
        for (File f : dir.listFiles((d, n) -> n.endsWith(".txt"))) {
            BufferedReader br = new BufferedReader(new FileReader(f));
            while (br.readLine() != null) total++;
            br.close();
        }
        System.out.println("总行数：" + total);
    }
}`}</CodeBlock>
                  <Paragraph>解析：遍历目录下所有txt文件，逐行读取并计数。</Paragraph>
                </Collapse.Panel>
              </Collapse>
            </li>
          </ul>
          <Alert message="温馨提示" description="多做项目实战，提升综合开发能力。" type="info" showIcon />
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
              <h1 className="text-3xl font-bold text-gray-900">Java项目实战</h1>
              <p className="text-gray-600 mt-2">通过实战项目巩固Java开发技能</p>
            </div>
            <Progress type="circle" percent={90} size={100} strokeColor="#52c41a" />
          </div>
        </div>

        {/* 项目内容 */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <Tabs items={tabItems} tabPosition="left" className="p-6" />
        </div>

        {/* 底部导航 */}
        <div className="flex justify-between mt-8">
          <Link
            href="/study/java/network"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gray-600 hover:bg-gray-700"
          >
            <LeftOutlined className="mr-2" />
            上一课：网络编程
          </Link>
          <div className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gray-300">
            课程完结
            <RightOutlined className="ml-2" />
          </div>
        </div>
      </div>
    </div>
  );
} 