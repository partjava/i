'use client';

import React from 'react';
import { Card, Tabs, Progress, Alert, Typography, Collapse } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { CodeBlock } from '@/app/components/ui/CodeBlock';

const { Paragraph, Text } = Typography;

export default function JavaThreadPage() {
  const tabItems = [
    {
      key: '1',
      label: '🚦 线程的创建与启动',
      children: (
        <Card title="线程的创建与启动" className="mb-6">
          <Paragraph>Java中创建线程常用两种方式：继承Thread类或实现Runnable接口。</Paragraph>
          <CodeBlock language="java">{`// 方式一：继承Thread
class MyThread extends Thread {
    public void run() {
        System.out.println("线程运行：" + Thread.currentThread().getName());
    }
}

// 方式二：实现Runnable
class MyRunnable implements Runnable {
    public void run() {
        System.out.println("线程运行：" + Thread.currentThread().getName());
    }
}

public class Main {
    public static void main(String[] args) {
        new MyThread().start();
        new Thread(new MyRunnable()).start();
    }
}`}</CodeBlock>
          <Alert message="要点" description={<ul className="list-disc pl-6"><li>start()方法启动线程，run()是线程体</li><li>推荐用Runnable实现多线程</li></ul>} type="info" showIcon />
        </Card>
      )
    },
    {
      key: '2',
      label: '🔒 线程同步与锁',
      children: (
        <Card title="线程同步与锁" className="mb-6">
          <Paragraph>多线程操作共享资源时需同步，常用synchronized关键字或Lock对象。</Paragraph>
          <CodeBlock language="java">{`class Counter {
    private int count = 0;
    public synchronized void inc() {
        count++;
    }
    public int get() { return count; }
}

// 或用Lock
import java.util.concurrent.locks.ReentrantLock;
class SafeCounter {
    private int count = 0;
    private final ReentrantLock lock = new ReentrantLock();
    public void inc() {
        lock.lock();
        try { count++; } finally { lock.unlock(); }
    }
    public int get() { return count; }
}`}</CodeBlock>
          <Alert message="要点" description={<ul className="list-disc pl-6"><li>synchronized可修饰方法或代码块</li><li>Lock需手动加锁和释放，适合复杂场景</li></ul>} type="success" showIcon />
        </Card>
      )
    },
    {
      key: '3',
      label: '🔗 线程通信与并发工具',
      children: (
        <Card title="线程通信与并发工具" className="mb-6">
          <Paragraph>线程间通信可用wait/notify，常用并发工具有线程池、CountDownLatch等。</Paragraph>
          <CodeBlock language="java">{`// wait/notify示例
class Resource {
    private boolean ready = false;
    public synchronized void produce() {
        ready = true;
        notify();
    }
    public synchronized void consume() throws InterruptedException {
        while (!ready) wait();
        System.out.println("消费资源");
    }
}

// 线程池示例
import java.util.concurrent.*;
ExecutorService pool = Executors.newFixedThreadPool(2);
pool.submit(() -> System.out.println("线程池任务"));
pool.shutdown();`}</CodeBlock>
          <Alert message="要点" description={<ul className="list-disc pl-6"><li>wait/notify需在同步块内使用</li><li>线程池推荐用Executors创建</li></ul>} type="info" showIcon />
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
              创建两个线程，分别输出1-100的奇数和偶数。
              <Collapse className="mt-2">
                <Collapse.Panel header="参考答案" key="1">
                  <CodeBlock language="java">{`class OddThread extends Thread {
    public void run() {
        for (int i = 1; i <= 100; i += 2) System.out.println(i);
    }
}
class EvenThread extends Thread {
    public void run() {
        for (int i = 2; i <= 100; i += 2) System.out.println(i);
    }
}
public class Main {
    public static void main(String[] args) {
        new OddThread().start();
        new EvenThread().start();
    }
}`}</CodeBlock>
                  <Paragraph>解析：分别继承Thread，奇偶数分别输出。</Paragraph>
                </Collapse.Panel>
              </Collapse>
            </li>
            <li>
              多线程安全计数器，10个线程各自自增1000次，输出最终结果。
              <Collapse className="mt-2">
                <Collapse.Panel header="参考答案" key="2">
                  <CodeBlock language="java">{`class Counter {
    private int count = 0;
    public synchronized void inc() { count++; }
    public int get() { return count; }
}
public class Main {
    public static void main(String[] args) throws Exception {
        Counter c = new Counter();
        Thread[] arr = new Thread[10];
        for (int i = 0; i < 10; i++) {
            arr[i] = new Thread(() -> {
                for (int j = 0; j < 1000; j++) c.inc();
            });
            arr[i].start();
        }
        for (Thread t : arr) t.join();
        System.out.println(c.get());
    }
}`}</CodeBlock>
                  <Paragraph>解析：synchronized保证多线程安全，join等待所有线程结束。</Paragraph>
                </Collapse.Panel>
              </Collapse>
            </li>
            <li>
              用线程池批量执行5个任务，每个任务输出线程名和任务编号。
              <Collapse className="mt-2">
                <Collapse.Panel header="参考答案" key="3">
                  <CodeBlock language="java">{`import java.util.concurrent.*;
public class PoolDemo {
    public static void main(String[] args) {
        ExecutorService pool = Executors.newFixedThreadPool(3);
        for (int i = 1; i <= 5; i++) {
            int taskId = i;
            pool.submit(() -> {
                System.out.println(Thread.currentThread().getName() + ": 任务" + taskId);
            });
        }
        pool.shutdown();
    }
}`}</CodeBlock>
                  <Paragraph>解析：用线程池submit任务，lambda表达式传递任务编号。</Paragraph>
                </Collapse.Panel>
              </Collapse>
            </li>
          </ul>
          <Alert message="温馨提示" description="多练习线程同步、通信和线程池，理解并发编程核心。" type="info" showIcon />
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
              <h1 className="text-3xl font-bold text-gray-900">Java多线程与并发</h1>
              <p className="text-gray-600 mt-2">掌握线程创建、同步、通信与并发工具</p>
            </div>
            <Progress type="circle" percent={70} size={100} strokeColor="#1890ff" />
          </div>
        </div>

        {/* 课程内容 */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <Tabs items={tabItems} tabPosition="left" className="p-6" />
        </div>

        {/* 底部导航 */}
        <div className="flex justify-between mt-8">
          <Link
            href="/study/java/file-io"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gray-600 hover:bg-gray-700"
          >
            <LeftOutlined className="mr-2" />
            上一课：文件与IO
          </Link>
          <Link
            href="/study/java/network"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
          >
            下一课：网络编程
            <RightOutlined className="ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
} 