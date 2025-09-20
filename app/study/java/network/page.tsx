'use client';

import React from 'react';
import { Card, Tabs, Progress, Alert, Typography, Collapse } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { CodeBlock } from '@/app/components/ui/CodeBlock';

const { Paragraph, Text } = Typography;

export default function JavaNetworkPage() {
  const tabItems = [
    {
      key: '1',
      label: '🌐 Socket基础',
      children: (
        <Card title="Socket基础" className="mb-6">
          <Paragraph>Java通过Socket类实现网络通信，支持TCP和UDP协议。常用ServerSocket和Socket进行TCP通信。</Paragraph>
          <CodeBlock language="java">{`// TCP服务器
import java.net.*;
import java.io.*;
ServerSocket server = new ServerSocket(8888);
Socket client = server.accept();
BufferedReader in = new BufferedReader(new InputStreamReader(client.getInputStream()));
System.out.println(in.readLine());
client.close();
server.close();`}</CodeBlock>
          <Alert message="要点" description={<ul className="list-disc pl-6"><li>ServerSocket监听端口，Socket连接服务器</li><li>数据传输用输入输出流</li></ul>} type="info" showIcon />
        </Card>
      )
    },
    {
      key: '2',
      label: '🔗 TCP通信',
      children: (
        <Card title="TCP通信" className="mb-6">
          <Paragraph>TCP通信需要客户端和服务器两端配合，客户端用Socket连接，服务器用ServerSocket监听。</Paragraph>
          <CodeBlock language="java">{`// TCP客户端
import java.net.*;
import java.io.*;
Socket socket = new Socket("localhost", 8888);
BufferedWriter out = new BufferedWriter(new OutputStreamWriter(socket.getOutputStream()));
out.write("Hello Server\n");
out.flush();
socket.close();`}</CodeBlock>
          <Alert message="要点" description={<ul className="list-disc pl-6"><li>客户端需指定服务器IP和端口</li><li>数据发送后需flush刷新缓冲区</li></ul>} type="success" showIcon />
        </Card>
      )
    },
    {
      key: '3',
      label: '🌍 HTTP请求与常用库',
      children: (
        <Card title="HTTP请求与常用库" className="mb-6">
          <Paragraph>Java可用HttpURLConnection或第三方库（如OkHttp、HttpClient）发送HTTP请求。</Paragraph>
          <CodeBlock language="java">{`// HttpURLConnection示例
import java.net.*;
import java.io.*;
URL url = new URL("https://www.example.com");
HttpURLConnection conn = (HttpURLConnection) url.openConnection();
conn.setRequestMethod("GET");
BufferedReader in = new BufferedReader(new InputStreamReader(conn.getInputStream()));
String line;
while ((line = in.readLine()) != null) {
    System.out.println(line);
}
in.close();
conn.disconnect();`}</CodeBlock>
          <Alert message="要点" description={<ul className="list-disc pl-6"><li>HttpURLConnection适合简单请求</li><li>第三方库更适合复杂场景</li></ul>} type="info" showIcon />
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
              编写一个TCP服务器，接收客户端发送的消息并打印。
              <Collapse className="mt-2">
                <Collapse.Panel header="参考答案" key="1">
                  <CodeBlock language="java">{`import java.net.*;
import java.io.*;
public class TCPServer {
    public static void main(String[] args) throws Exception {
        ServerSocket server = new ServerSocket(8888);
        Socket client = server.accept();
        BufferedReader in = new BufferedReader(new InputStreamReader(client.getInputStream()));
        System.out.println("收到消息：" + in.readLine());
        client.close();
        server.close();
    }
}`}</CodeBlock>
                  <Paragraph>解析：ServerSocket监听端口，接收Socket连接并读取消息。</Paragraph>
                </Collapse.Panel>
              </Collapse>
            </li>
            <li>
              用Java发送GET请求，获取网页内容并输出前100个字符。
              <Collapse className="mt-2">
                <Collapse.Panel header="参考答案" key="2">
                  <CodeBlock language="java">{`import java.net.*;
import java.io.*;
public class HttpGetDemo {
    public static void main(String[] args) throws Exception {
        URL url = new URL("https://www.example.com");
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("GET");
        BufferedReader in = new BufferedReader(new InputStreamReader(conn.getInputStream()));
        StringBuilder sb = new StringBuilder();
        String line;
        while ((line = in.readLine()) != null) sb.append(line);
        in.close();
        conn.disconnect();
        System.out.println(sb.substring(0, Math.min(100, sb.length())));
    }
}`}</CodeBlock>
                  <Paragraph>解析：用HttpURLConnection发送GET请求，读取并输出网页内容。</Paragraph>
                </Collapse.Panel>
              </Collapse>
            </li>
          </ul>
          <Alert message="温馨提示" description="多练习Socket和HTTP编程，理解网络通信流程。" type="info" showIcon />
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
              <h1 className="text-3xl font-bold text-gray-900">Java网络编程</h1>
              <p className="text-gray-600 mt-2">掌握Socket、TCP、HTTP等网络通信基础</p>
            </div>
            <Progress type="circle" percent={80} size={100} strokeColor="#1890ff" />
          </div>
        </div>

        {/* 课程内容 */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <Tabs items={tabItems} tabPosition="left" className="p-6" />
        </div>

        {/* 底部导航 */}
        <div className="flex justify-between mt-8">
          <Link
            href="/study/java/thread"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gray-600 hover:bg-gray-700"
          >
            <LeftOutlined className="mr-2" />
            上一课：多线程与并发
          </Link>
          <Link
            href="/study/java/projects"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
          >
            下一课：项目实战
            <RightOutlined className="ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
} 