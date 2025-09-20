'use client';

import React from 'react';
import { Card, Tabs, Progress, Alert, Typography, Collapse } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { CodeBlock } from '@/app/components/ui/CodeBlock';

const { Paragraph, Text } = Typography;

export default function JavaFileIOPage() {
  const tabItems = [
    {
      key: '1',
      label: '📄 文件读写基础',
      children: (
        <Card title="文件读写基础" className="mb-6">
          <Paragraph>Java通过File、FileWriter、FileReader等类进行文本文件的读写操作。</Paragraph>
          <CodeBlock language="java">{`import java.io.FileWriter;
import java.io.FileReader;

public class FileDemo {
    public static void main(String[] args) throws Exception {
        FileWriter fw = new FileWriter("test.txt");
        fw.write("Hello, Java IO!\n");
        fw.close();

        FileReader fr = new FileReader("test.txt");
        int ch;
        while ((ch = fr.read()) != -1) {
            System.out.print((char) ch);
        }
        fr.close();
    }
}`}</CodeBlock>
          <Alert message="要点" description={<ul className="list-disc pl-6"><li>读写文本文件推荐FileWriter/FileReader</li><li>操作后要close释放资源</li></ul>} type="info" showIcon />
        </Card>
      )
    },
    {
      key: '2',
      label: '🔌 字节流与缓冲流',
      children: (
        <Card title="字节流与缓冲流" className="mb-6">
          <Paragraph>字节流（InputStream/OutputStream）适合处理二进制文件，缓冲流（BufferedReader/BufferedWriter）提高读写效率。</Paragraph>
          <CodeBlock language="java">{`import java.io.*;

public class BufferDemo {
    public static void main(String[] args) throws Exception {
        BufferedWriter bw = new BufferedWriter(new FileWriter("data.txt"));
        bw.write("Java IO缓冲流\n");
        bw.close();

        BufferedReader br = new BufferedReader(new FileReader("data.txt"));
        String line;
        while ((line = br.readLine()) != null) {
            System.out.println(line);
        }
        br.close();
    }
}`}</CodeBlock>
          <Alert message="要点" description={<ul className="list-disc pl-6"><li>缓冲流适合大文件读写</li><li>字节流适合图片、音频等二进制数据</li></ul>} type="success" showIcon />
        </Card>
      )
    },
    {
      key: '3',
      label: '📁 文件与目录操作',
      children: (
        <Card title="文件与目录操作" className="mb-6">
          <Paragraph>File类可用于文件和目录的创建、删除、遍历等操作。</Paragraph>
          <CodeBlock language="java">{`import java.io.File;

public class FileOpDemo {
    public static void main(String[] args) {
        File dir = new File("testdir");
        if (!dir.exists()) dir.mkdir();
        File file = new File(dir, "a.txt");
        try {
            file.createNewFile();
        } catch (Exception e) {}
        for (File f : dir.listFiles()) {
            System.out.println(f.getName());
        }
        file.delete();
        dir.delete();
    }
}`}</CodeBlock>
          <Alert message="要点" description={<ul className="list-disc pl-6"><li>File可操作文件和目录</li><li>遍历目录用listFiles()</li></ul>} type="info" showIcon />
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
              写一个程序，将控制台输入的多行文本保存到文件output.txt中。
              <Collapse className="mt-2">
                <Collapse.Panel header="参考答案" key="1">
                  <CodeBlock language="java">{`import java.io.*;
import java.util.Scanner;

public class SaveToFile {
    public static void main(String[] args) throws Exception {
        Scanner sc = new Scanner(System.in);
        BufferedWriter bw = new BufferedWriter(new FileWriter("output.txt"));
        String line;
        while (!(line = sc.nextLine()).equals("exit")) {
            bw.write(line);
            bw.newLine();
        }
        bw.close();
    }
}`}</CodeBlock>
                  <Paragraph>解析：用BufferedWriter写文件，输入exit结束。</Paragraph>
                </Collapse.Panel>
              </Collapse>
            </li>
            <li>
              读取文件input.txt，统计文件行数和总字符数。
              <Collapse className="mt-2">
                <Collapse.Panel header="参考答案" key="2">
                  <CodeBlock language="java">{`import java.io.*;

public class FileStat {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new FileReader("input.txt"));
        int lines = 0, chars = 0;
        String line;
        while ((line = br.readLine()) != null) {
            lines++;
            chars += line.length();
        }
        br.close();
        System.out.println("行数：" + lines + ", 字符数：" + chars);
    }
}`}</CodeBlock>
                  <Paragraph>解析：逐行读取，累加行数和字符数。</Paragraph>
                </Collapse.Panel>
              </Collapse>
            </li>
            <li>
              遍历指定目录，输出所有文件和子目录的名称。
              <Collapse className="mt-2">
                <Collapse.Panel header="参考答案" key="3">
                  <CodeBlock language="java">{`import java.io.File;

public class ListDir {
    public static void main(String[] args) {
        File dir = new File(".");
        for (File f : dir.listFiles()) {
            System.out.println(f.getName());
        }
    }
}`}</CodeBlock>
                  <Paragraph>解析：用File.listFiles()遍历当前目录。</Paragraph>
                </Collapse.Panel>
              </Collapse>
            </li>
          </ul>
          <Alert message="温馨提示" description="多练习文件读写和目录操作，注意资源关闭。" type="info" showIcon />
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
              <h1 className="text-3xl font-bold text-gray-900">Java文件与IO</h1>
              <p className="text-gray-600 mt-2">掌握文件读写、缓冲流、目录操作等IO基础</p>
            </div>
            <Progress type="circle" percent={60} size={100} strokeColor="#1890ff" />
          </div>
        </div>

        {/* 课程内容 */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <Tabs items={tabItems} tabPosition="left" className="p-6" />
        </div>

        {/* 底部导航 */}
        <div className="flex justify-between mt-8">
          <Link
            href="/study/java/exceptions"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gray-600 hover:bg-gray-700"
          >
            <LeftOutlined className="mr-2" />
            上一课：异常处理
          </Link>
          <Link
            href="/study/java/thread"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
          >
            下一课：多线程与并发
            <RightOutlined className="ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
} 