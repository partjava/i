'use client';

import { useState } from 'react';
import { Card, Tabs, Progress, Alert } from 'antd';
import { LeftOutlined, RightOutlined, RocketOutlined, LockOutlined, SyncOutlined } from '@ant-design/icons';
import { CodeBlock } from '@/app/components/ui/CodeBlock';
import Link from 'next/link';
import React from 'react';

export default function MultithreadingPage() {
  const [activeTab, setActiveTab] = useState('1');

  const tabItems = [
    {
      key: '1',
      label: <span><RocketOutlined /> 线程基础</span>,
      children: (
        <Card title="线程的创建与管理" className="mb-6">
          <div className="space-y-4 mt-4">
            <h3 className="text-xl font-semibold mb-4">创建和使用线程</h3>
            <p>使用C++11标准线程库创建和管理线程。</p>
            <CodeBlock language="cpp">
              {`#include <iostream>
#include <thread>
#include <chrono>
using namespace std;

// 线程函数
void threadFunction(int id) {
    for(int i = 0; i < 3; i++) {
        cout << "线程 " << id << " 执行中..." << endl;
        this_thread::sleep_for(chrono::seconds(1));
    }
}

int main() {
    cout << "主线程开始" << endl;
    
    // 创建线程
    thread t1(threadFunction, 1);
    thread t2(threadFunction, 2);
    
    // 等待线程完成
    t1.join();
    t2.join();
    
    cout << "所有线程已完成" << endl;
    return 0;
}

// 使用Lambda表达式
void lambdaThread() {
    auto lambda = [](int x) {
        cout << "Lambda线程: " << x << endl;
    };
    
    thread t(lambda, 100);
    t.join();
}`}
            </CodeBlock>
            <Alert
              className="mt-4"
              message="线程基础知识"
              description={
                <ul className="list-disc pl-6">
                  <li>使用std::thread创建线程</li>
                  <li>线程函数可以是普通函数、Lambda表达式或函数对象</li>
                  <li>join()等待线程完成</li>
                  <li>detach()将线程与主线程分离</li>
                </ul>
              }
              type="info"
              showIcon
            />
          </div>
        </Card>
      ),
    },
    {
      key: '2',
      label: <span><LockOutlined /> 互斥锁</span>,
      children: (
        <Card title="线程同步与互斥" className="mb-6">
          <div className="space-y-4 mt-4">
            <h3 className="text-xl font-semibold mb-4">互斥锁的使用</h3>
            <p>使用互斥锁保护共享资源。</p>
            <CodeBlock language="cpp">
              {`#include <iostream>
#include <thread>
#include <mutex>
#include <vector>
using namespace std;

class BankAccount {
private:
    mutex mtx;  // 互斥锁
    int balance;
    
public:
    BankAccount() : balance(0) {}
    
    void deposit(int amount) {
        lock_guard<mutex> lock(mtx);  // RAII方式加锁
        balance += amount;
        cout << "存入: " << amount << ", 余额: " << balance << endl;
    }
    
    void withdraw(int amount) {
        unique_lock<mutex> lock(mtx);  // 更灵活的锁
        if (balance >= amount) {
            balance -= amount;
            cout << "取出: " << amount << ", 余额: " << balance << endl;
        } else {
            cout << "余额不足" << endl;
        }
    }
};

void customerThread(BankAccount& account, bool isDeposit) {
    for(int i = 0; i < 5; i++) {
        if(isDeposit) {
            account.deposit(100);
        } else {
            account.withdraw(50);
        }
        this_thread::sleep_for(chrono::milliseconds(100));
    }
}

int main() {
    BankAccount account;
    
    thread t1(customerThread, ref(account), true);   // 存款线程
    thread t2(customerThread, ref(account), false);  // 取款线程
    
    t1.join();
    t2.join();
    
    return 0;
}`}
            </CodeBlock>
            <Alert
              className="mt-4"
              message="互斥锁特点"
              description={
                <ul className="list-disc pl-6">
                  <li>防止多个线程同时访问共享资源</li>
                  <li>lock_guard提供RAII式的锁管理</li>
                  <li>unique_lock提供更灵活的锁操作</li>
                  <li>避免死锁的重要性</li>
                </ul>
              }
              type="info"
              showIcon
            />
          </div>
        </Card>
      ),
    },
    {
      key: '4',
      label: <span><SyncOutlined /> 条件变量</span>,
      children: (
        <Card title="线程通信" className="mb-6">
          <div className="space-y-4 mt-4">
            <h3 className="text-xl font-semibold mb-4">条件变量使用</h3>
            <p>使用条件变量实现线程间的通信和同步。</p>
            <CodeBlock language="cpp">
              {`#include <iostream>
#include <thread>
#include <mutex>
#include <condition_variable>
#include <queue>
using namespace std;

template<typename T>
class ThreadSafeQueue {
private:
    queue<T> queue_;
    mutable mutex mtx_;
    condition_variable not_empty_;
    condition_variable not_full_;
    size_t capacity_;

public:
    ThreadSafeQueue(size_t capacity) : capacity_(capacity) {}
    
    void push(T item) {
        unique_lock<mutex> lock(mtx_);
        not_full_.wait(lock, [this]() { 
            return queue_.size() < capacity_; 
        });
        
        queue_.push(move(item));
        lock.unlock();
        not_empty_.notify_one();
    }
    
    T pop() {
        unique_lock<mutex> lock(mtx_);
        not_empty_.wait(lock, [this]() { 
            return !queue_.empty(); 
        });
        
        T item = move(queue_.front());
        queue_.pop();
        lock.unlock();
        not_full_.notify_one();
        return item;
    }
};

// 生产者线程
void producer(ThreadSafeQueue<int>& queue) {
    for(int i = 0; i < 10; i++) {
        cout << "生产: " << i << endl;
        queue.push(i);
        this_thread::sleep_for(chrono::milliseconds(100));
    }
}

// 消费者线程
void consumer(ThreadSafeQueue<int>& queue) {
    for(int i = 0; i < 10; i++) {
        int item = queue.pop();
        cout << "消费: " << item << endl;
        this_thread::sleep_for(chrono::milliseconds(200));
    }
}

int main() {
    ThreadSafeQueue<int> queue(5);  // 容量为5的队列
    
    thread prod(producer, ref(queue));
    thread cons(consumer, ref(queue));
    
    prod.join();
    cons.join();
    
    return 0;
}`}
            </CodeBlock>
            <Alert
              className="mt-4"
              message="条件变量特点"
              description={
                <ul className="list-disc pl-6">
                  <li>实现线程间的等待和通知机制</li>
                  <li>配合互斥锁使用</li>
                  <li>避免忙等待，提高效率</li>
                  <li>适用于生产者-消费者模式</li>
                </ul>
              }
              type="info"
              showIcon
            />
          </div>
        </Card>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 课程头部 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">多线程编程</h1>
              <p className="text-gray-600 mt-2">学习C++多线程编程的基础知识和实践应用</p>
            </div>
            <Progress type="circle" percent={80} size={80} strokeColor="#1890ff" />
          </div>
        </div>

        {/* 课程内容 */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <Tabs activeKey={activeTab} onChange={setActiveTab} className="p-6" items={tabItems} />
        </div>

        {/* 底部导航 */}
        <div className="flex justify-between mt-8">
          <Link 
            href="/study/cpp/smart-pointers" 
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            <LeftOutlined className="mr-2" />
            上一课：智能指针
          </Link>
          <Link
            href="/study/cpp/networking"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            下一课：网络编程
            <RightOutlined className="ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
} 