'use client';

import { useState } from 'react';
import { Card, Tabs, Progress, Alert } from 'antd';
import { LeftOutlined, RightOutlined, LockOutlined, TeamOutlined, LinkOutlined, SafetyOutlined } from '@ant-design/icons';
import { CodeBlock } from '@/app/components/ui/CodeBlock';
import Link from 'next/link';
import React from 'react';

export default function SmartPointersPage() {
  const [activeTab, setActiveTab] = useState('1');

  const tabItems = [
    {
      key: '1',
      label: <span><LockOutlined /> unique_ptr</span>,
      children: (
        <Card title="独占式智能指针" className="mb-6">
          <div className="space-y-4 mt-4">
            <h3 className="text-xl font-semibold mb-4">unique_ptr 基础</h3>
            <p>独占所有权的智能指针，不允许共享资源。</p>
            <CodeBlock language="cpp">
              {`#include <iostream>
#include <memory>
using namespace std;

class Resource {
public:
    Resource(const string& n) : name(n) {
        cout << "Resource " << name << " 被创建" << endl;
    }
    
    ~Resource() {
        cout << "Resource " << name << " 被销毁" << endl;
    }
    
    void use() const {
        cout << "Resource " << name << " 被使用" << endl;
    }
    
private:
    string name;
};

// unique_ptr的基本使用
void basic_unique_ptr() {
    // 创建unique_ptr
    unique_ptr<Resource> ptr1(new Resource("ptr1"));
    
    // 推荐使用make_unique（C++14）
    auto ptr2 = make_unique<Resource>("ptr2");
    
    // 使用资源
    ptr1->use();
    ptr2->use();
    
    // 转移所有权
    unique_ptr<Resource> ptr3 = move(ptr1);  // ptr1现在为nullptr
    
    // 检查指针
    if (ptr1 == nullptr) {
        cout << "ptr1不再拥有资源" << endl;
    }
    
    // 释放所有权
    ptr2.reset();  // 立即销毁资源
    
    // 获取原始指针（谨慎使用）
    Resource* raw_ptr = ptr3.get();
    raw_ptr->use();
    
    // 自动销毁
}  // ptr3在这里自动销毁

// 自定义删除器
void custom_deleter() {
    auto deleter = [](Resource* p) {
        cout << "使用自定义删除器" << endl;
        delete p;
    };
    
    unique_ptr<Resource, decltype(deleter)> ptr(
        new Resource("custom"), deleter);
}`}
            </CodeBlock>
            <Alert
              className="mt-4"
              message="unique_ptr特点"
              description={
                <ul className="list-disc pl-6">
                  <li>独占所有权，不能复制，只能移动</li>
                  <li>自动管理资源的生命周期</li>
                  <li>支持自定义删除器</li>
                  <li>零开销抽象，性能与原始指针相当</li>
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
      label: <span><TeamOutlined /> shared_ptr</span>,
      children: (
        <Card title="共享式智能指针" className="mb-6">
          <div className="space-y-4 mt-4">
            <h3 className="text-xl font-semibold mb-4">shared_ptr 使用</h3>
            <p>支持共享所有权的智能指针，使用引用计数。</p>
            <CodeBlock language="cpp">
              {`#include <iostream>
#include <memory>
#include <vector>
using namespace std;

class Resource {
public:
    Resource(const string& n) : name(n) {
        cout << "Resource " << name << " 被创建" << endl;
    }
    
    ~Resource() {
        cout << "Resource " << name << " 被销毁" << endl;
    }
    
    void use() const {
        cout << "Resource " << name << " 被使用" << endl;
    }
    
private:
    string name;
};

void shared_ptr_demo() {
    // 创建shared_ptr
    shared_ptr<Resource> ptr1 = make_shared<Resource>("shared");
    
    {
        // 创建另一个指向同一资源的shared_ptr
        shared_ptr<Resource> ptr2 = ptr1;
        cout << "引用计数: " << ptr1.use_count() << endl;  // 输出2
        
        // 使用资源
        ptr2->use();
    }  // ptr2离开作用域，引用计数减1
    
    cout << "引用计数: " << ptr1.use_count() << endl;  // 输出1
    
    // 在容器中使用
    vector<shared_ptr<Resource>> resources;
    resources.push_back(ptr1);
    resources.push_back(make_shared<Resource>("another"));
    
    // 循环使用资源
    for(const auto& ptr : resources) {
        ptr->use();
    }
}

// 循环引用问题
class Node {
public:
    string name;
    shared_ptr<Node> next;
    //weak_ptr<Node> next;  // 使用weak_ptr避免循环引用
    
    Node(const string& n) : name(n) {
        cout << "Node " << name << " 创建" << endl;
    }
    
    ~Node() {
        cout << "Node " << name << " 销毁" << endl;
    }
};

void circular_reference() {
    auto node1 = make_shared<Node>("Node1");
    auto node2 = make_shared<Node>("Node2");
    
    // 创建循环引用
    node1->next = node2;
    node2->next = node1;
    
    cout << "node1 引用计数: " << node1.use_count() << endl;
    cout << "node2 引用计数: " << node2.use_count() << endl;
}  // 内存泄漏！节点不会被销毁`}
            </CodeBlock>
            <Alert
              className="mt-4"
              message="shared_ptr注意事项"
              description={
                <ul className="list-disc pl-6">
                  <li>使用引用计数管理资源</li>
                  <li>支持多个指针共享同一资源</li>
                  <li>注意避免循环引用</li>
                  <li>比unique_ptr有更多的开销</li>
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
      label: <span><LinkOutlined /> weak_ptr</span>,
      children: (
        <Card title="弱引用智能指针" className="mb-6">
          <div className="space-y-4 mt-4">
            <h3 className="text-xl font-semibold mb-4">weak_ptr 应用</h3>
            <p>不增加引用计数的智能指针，用于解决循环引用问题。</p>
            <CodeBlock language="cpp">
              {`#include <iostream>
#include <memory>
using namespace std;

class Node {
public:
    string name;
    weak_ptr<Node> next;  // 使用weak_ptr避免循环引用
    
    Node(const string& n) : name(n) {
        cout << "Node " << name << " 创建" << endl;
    }
    
    ~Node() {
        cout << "Node " << name << " 销毁" << endl;
    }
};

void weak_ptr_demo() {
    // 创建shared_ptr
    auto sp1 = make_shared<Node>("Node1");
    auto sp2 = make_shared<Node>("Node2");
    
    // 使用weak_ptr建立关系
    sp1->next = sp2;
    sp2->next = sp1;
    
    cout << "sp1 引用计数: " << sp1.use_count() << endl;  // 输出1
    cout << "sp2 引用计数: " << sp2.use_count() << endl;  // 输出1
    
    // 使用weak_ptr
    if (auto temp = sp1->next.lock()) {
        cout << "访问成功: " << temp->name << endl;
    } else {
        cout << "对象已经不存在" << endl;
    }
}

// 观察者模式示例
class Subject;

class Observer {
public:
    Observer(const string& n) : name(n) {}
    
    void observe(weak_ptr<Subject> subject) {
        this->subject = subject;
    }
    
    void check();
    
private:
    string name;
    weak_ptr<Subject> subject;
};

class Subject {
public:
    void notify() {
        cout << "Subject: 通知所有观察者" << endl;
    }
};

void Observer::check() {
    if (auto sp = subject.lock()) {
        cout << name << ": Subject 仍然存在" << endl;
        sp->notify();
    } else {
        cout << name << ": Subject 已经不存在" << endl;
    }
}

void observer_pattern() {
    auto subject = make_shared<Subject>();
    
    Observer obs1("Observer1");
    Observer obs2("Observer2");
    
    obs1.observe(subject);
    obs2.observe(subject);
    
    // 检查subject
    obs1.check();
    obs2.check();
    
    // 释放subject
    subject.reset();
    
    // 再次检查
    obs1.check();
    obs2.check();
}`}
            </CodeBlock>
            <Alert
              className="mt-4"
              message="weak_ptr用途"
              description={
                <ul className="list-disc pl-6">
                  <li>解决循环引用问题</li>
                  <li>不影响对象的生命周期</li>
                  <li>可以检查对象是否仍然存在</li>
                  <li>适用于观察者模式等场景</li>
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
              <h1 className="text-3xl font-bold text-gray-900">智能指针</h1>
              <p className="text-gray-600 mt-2">学习C++智能指针的类型和使用方法</p>
            </div>
            <Progress type="circle" percent={78} size={80} strokeColor="#1890ff" />
          </div>
        </div>

        {/* 课程内容 */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <Tabs activeKey={activeTab} onChange={setActiveTab} className="p-6" items={tabItems} />
        </div>

        {/* 底部导航 */}
        <div className="flex justify-between mt-8">
          <Link 
            href="/study/cpp/exceptions" 
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            <LeftOutlined className="mr-2" />
            上一课：异常处理
          </Link>
          <Link
            href="/study/cpp/multithreading"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            下一课：多线程编程
            <RightOutlined className="ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
} 