'use client';

import { useState } from 'react';
import { Card, Tabs, Progress, Alert, Table } from 'antd';
import { LeftOutlined, RightOutlined, FileOutlined, DatabaseOutlined, ToolOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { CodeBlock } from '@/app/components/ui/CodeBlock';
import Link from 'next/link';
import React from 'react';

export default function HeadersPage() {
  const [activeTab, setActiveTab] = useState('1');

  const standardColumns = [
    {
      title: '头文件',
      dataIndex: 'header',
      key: 'header',
      render: (text: string) => <code>{text}</code>,
    },
    {
      title: '主要用途',
      dataIndex: 'purpose',
      key: 'purpose',
    },
    {
      title: '常用功能/类',
      dataIndex: 'features',
      key: 'features',
    },
  ];

  const standardIOData = [
    {
      key: '1',
      header: '<iostream>',
      purpose: '输入输出流',
      features: 'cin, cout, cerr, clog, ios, istream, ostream',
    },
    {
      key: '2',
      header: '<fstream>',
      purpose: '文件输入输出',
      features: 'ifstream, ofstream, fstream',
    },
    {
      key: '3',
      header: '<sstream>',
      purpose: '字符串流',
      features: 'istringstream, ostringstream, stringstream',
    },
    {
      key: '4',
      header: '<iomanip>',
      purpose: '格式化输入输出',
      features: 'setw, setprecision, setfill, hex, dec, fixed',
    },
  ];

  const dataStructureData = [
    {
      key: '1',
      header: '<vector>',
      purpose: '动态数组',
      features: 'vector, push_back, size, begin, end',
    },
    {
      key: '2',
      header: '<list>',
      purpose: '双向链表',
      features: 'list, push_back, push_front, insert, erase',
    },
    {
      key: '3',
      header: '<deque>',
      purpose: '双端队列',
      features: 'deque, push_back, push_front, pop_back, pop_front',
    },
    {
      key: '4',
      header: '<queue>',
      purpose: '队列',
      features: 'queue, priority_queue, push, pop, front',
    },
    {
      key: '5',
      header: '<stack>',
      purpose: '栈',
      features: 'stack, push, pop, top',
    },
    {
      key: '6',
      header: '<map>',
      purpose: '键值对关联容器',
      features: 'map, multimap, insert, find, erase',
    },
    {
      key: '7',
      header: '<set>',
      purpose: '集合',
      features: 'set, multiset, insert, find, erase',
    },
    {
      key: '8',
      header: '<unordered_map>',
      purpose: '哈希表(C++11)',
      features: 'unordered_map, unordered_multimap',
    },
    {
      key: '9',
      header: '<unordered_set>',
      purpose: '哈希集合(C++11)',
      features: 'unordered_set, unordered_multiset',
    },
    {
      key: '10',
      header: '<array>',
      purpose: '固定大小数组(C++11)',
      features: 'array, size, fill, at',
    },
  ];

  const utilityData = [
    {
      key: '1',
      header: '<algorithm>',
      purpose: '常用算法',
      features: 'sort, find, reverse, min, max, count, for_each',
    },
    {
      key: '2',
      header: '<utility>',
      purpose: '实用工具',
      features: 'pair, make_pair, move, swap',
    },
    {
      key: '3',
      header: '<functional>',
      purpose: '函数对象',
      features: 'function, bind, placeholders, plus, minus',
    },
    {
      key: '4',
      header: '<memory>',
      purpose: '内存管理',
      features: 'unique_ptr, shared_ptr, weak_ptr, allocator',
    },
    {
      key: '5',
      header: '<limits>',
      purpose: '数值极限',
      features: 'numeric_limits',
    },
    {
      key: '6',
      header: '<random>',
      purpose: '随机数生成(C++11)',
      features: 'random_device, mt19937, uniform_int_distribution',
    },
    {
      key: '7',
      header: '<chrono>',
      purpose: '时间处理(C++11)',
      features: 'duration, time_point, system_clock',
    },
    {
      key: '8',
      header: '<regex>',
      purpose: '正则表达式(C++11)',
      features: 'regex, regex_match, regex_search, regex_replace',
    },
    {
      key: '9',
      header: '<thread>',
      purpose: '线程支持(C++11)',
      features: 'thread, this_thread, mutex, condition_variable',
    },
  ];

  const tabItems = [
    {
      key: '1',
      label: <span><FileOutlined /> 标准IO头文件</span>,
      children: (
        <Card title="标准输入输出头文件" className="mb-6">
          <div className="space-y-4 mt-4">
            <p>这些头文件提供了基本的输入输出功能，包括控制台IO、文件IO和字符串处理。</p>
            <Table columns={standardColumns} dataSource={standardIOData} pagination={false} />
            <h3 className="text-xl font-semibold mt-8 mb-4">典型用法示例</h3>
            <CodeBlock language="cpp">
              {`#include <iostream>  // 标准输入输出
#include <fstream>   // 文件输入输出
#include <iomanip>   // 格式化控制
using namespace std;

int main() {
    // 标准输出
    cout << "Hello C++ Headers!" << endl;
    
    // 格式化输出
    cout << fixed << setprecision(2);
    cout << "Pi: " << setw(10) << 3.14159265 << endl;
    
    // 文件输出
    ofstream outFile("example.txt");
    if (outFile.is_open()) {
        outFile << "写入文件的内容" << endl;
        outFile.close();
    }
    
    // 文件输入
    ifstream inFile("example.txt");
    if (inFile.is_open()) {
        string line;
        while (getline(inFile, line)) {
            cout << "读取: " << line << endl;
        }
        inFile.close();
    }
    
    return 0;
}`}
            </CodeBlock>
          </div>
        </Card>
      ),
    },
    {
      key: '2',
      label: <span><DatabaseOutlined /> 数据结构头文件</span>,
      children: (
        <Card title="STL容器与数据结构头文件" className="mb-6">
          <div className="space-y-4 mt-4">
            <p>这些头文件提供了各种容器和数据结构，是C++ STL的核心组件。</p>
            <Table columns={standardColumns} dataSource={dataStructureData} pagination={{ pageSize: 6 }} />
            <h3 className="text-xl font-semibold mt-8 mb-4">典型用法示例</h3>
            <CodeBlock language="cpp">
              {`#include <iostream>
#include <vector>
#include <map>
#include <string>
using namespace std;

int main() {
    // 向量(动态数组)
    vector<int> numbers = {1, 2, 3, 4, 5};
    numbers.push_back(6);
    
    cout << "向量内容: ";
    for (const auto& num : numbers) {
        cout << num << " ";
    }
    cout << endl;
    
    // 映射(键值对)
    map<string, int> scores;
    scores["Alice"] = 95;
    scores["Bob"] = 87;
    scores["Charlie"] = 92;
    
    cout << "映射内容:" << endl;
    for (const auto& entry : scores) {
        cout << entry.first << ": " << entry.second << endl;
    }
    
    return 0;
}`}
            </CodeBlock>
          </div>
        </Card>
      ),
    },
    {
      key: '3',
      label: <span><ToolOutlined /> 工具类头文件</span>,
      children: (
        <Card title="工具与算法头文件" className="mb-6">
          <div className="space-y-4 mt-4">
            <p>这些头文件提供了各种实用工具、算法和功能，增强了C++的实用性。</p>
            <Table columns={standardColumns} dataSource={utilityData} pagination={{ pageSize: 6 }} />
            <h3 className="text-xl font-semibold mt-8 mb-4">典型用法示例</h3>
            <CodeBlock language="cpp">
              {`#include <iostream>
#include <vector>
#include <algorithm>
#include <memory>
#include <chrono>
using namespace std;
using namespace chrono;

int main() {
    // 使用算法
    vector<int> nums = {5, 2, 8, 1, 9, 3};
    
    // 排序
    sort(nums.begin(), nums.end());
    cout << "排序后: ";
    for (int num : nums) {
        cout << num << " ";
    }
    cout << endl;
    
    // 查找
    auto it = find(nums.begin(), nums.end(), 8);
    if (it != nums.end()) {
        cout << "找到元素: " << *it << endl;
    }
    
    // 智能指针
    auto ptr = make_shared<string>("智能指针示例");
    cout << *ptr << ", 引用计数: " << ptr.use_count() << endl;
    
    // 时间测量
    auto start = high_resolution_clock::now();
    // 执行一些操作
    for (volatile int i = 0; i < 1000000; i++) {}
    auto end = high_resolution_clock::now();
    
    auto duration = duration_cast<milliseconds>(end - start);
    cout << "执行时间: " << duration.count() << " 毫秒" << endl;
    
    return 0;
}`}
            </CodeBlock>
          </div>
        </Card>
      ),
    },
    {
      key: '4',
      label: <span><ClockCircleOutlined /> C++11/14/17/20头文件</span>,
      children: (
        <Card title="新标准引入的头文件" className="mb-6">
          <div className="space-y-4 mt-4">
            <h3 className="text-xl font-semibold mb-4">C++11及以后引入的重要头文件</h3>
            <p>现代C++标准引入了许多新的头文件，增强了语言的功能和实用性。</p>
            
            <Alert
              className="mt-4"
              message="C++11引入的重要头文件"
              description={
                <ul className="list-disc pl-6">
                  <li><code>&lt;array&gt;</code> - 提供固定大小的数组</li>
                  <li><code>&lt;chrono&gt;</code> - 时间相关功能</li>
                  <li><code>&lt;thread&gt;</code> - 线程支持</li>
                  <li><code>&lt;mutex&gt;</code> - 互斥量和锁</li>
                  <li><code>&lt;condition_variable&gt;</code> - 条件变量</li>
                  <li><code>&lt;atomic&gt;</code> - 原子操作</li>
                  <li><code>&lt;regex&gt;</code> - 正则表达式支持</li>
                  <li><code>&lt;unordered_map&gt;</code> 和 <code>&lt;unordered_set&gt;</code> - 基于哈希的容器</li>
                  <li><code>&lt;random&gt;</code> - 随机数生成</li>
                  <li><code>&lt;tuple&gt;</code> - 元组类型</li>
                </ul>
              }
              type="info"
              showIcon
            />
            
            <Alert
              className="mt-4"
              message="C++14/17/20添加的头文件"
              description={
                <ul className="list-disc pl-6">
                  <li><code>&lt;any&gt;</code> (C++17) - 可存储任意类型的值</li>
                  <li><code>&lt;optional&gt;</code> (C++17) - 可能有值或无值的对象</li>
                  <li><code>&lt;variant&gt;</code> (C++17) - 类型安全的联合体</li>
                  <li><code>&lt;string_view&gt;</code> (C++17) - 字符串的非拥有引用</li>
                  <li><code>&lt;filesystem&gt;</code> (C++17) - 文件系统操作</li>
                  <li><code>&lt;charconv&gt;</code> (C++17) - 字符转换实用程序</li>
                  <li><code>&lt;execution&gt;</code> (C++17) - 并行算法执行策略</li>
                  <li><code>&lt;span&gt;</code> (C++20) - 连续序列的视图</li>
                  <li><code>&lt;concepts&gt;</code> (C++20) - 编程概念支持</li>
                  <li><code>&lt;coroutine&gt;</code> (C++20) - 协程支持</li>
                  <li><code>&lt;ranges&gt;</code> (C++20) - 范围库</li>
                </ul>
              }
              type="success"
              showIcon
            />
            
            <h3 className="text-xl font-semibold mt-8 mb-4">典型用法示例</h3>
            <CodeBlock language="cpp">
              {`#include <iostream>
#include <vector>
#include <thread>
#include <mutex>
#include <optional>  // C++17
#include <filesystem> // C++17
using namespace std;
namespace fs = filesystem;

// C++17: optional 示例
optional<string> findUserById(int id) {
    if (id == 1) {
        return "张三";
    } else if (id == 2) {
        return "李四";
    }
    return nullopt; // 没找到返回空
}

// C++11: 线程和互斥量示例
mutex printMutex;
void threadFunction(int id) {
    lock_guard<mutex> lock(printMutex);
    cout << "线程 " << id << " 正在执行" << endl;
}

int main() {
    // 测试 optional
    auto user = findUserById(2);
    if (user) {
        cout << "找到用户: " << *user << endl;
    } else {
        cout << "用户不存在" << endl;
    }
    
    // 测试线程
    vector<thread> threads;
    for (int i = 0; i < 5; i++) {
        threads.push_back(thread(threadFunction, i));
    }
    
    for (auto& t : threads) {
        t.join();
    }
    
    // 测试文件系统 (C++17)
    cout << "当前路径: " << fs::current_path() << endl;
    
    for (const auto& entry : fs::directory_iterator(".")) {
        cout << entry.path() << (fs::is_directory(entry) ? " (目录)" : " (文件)") << endl;
    }
    
    return 0;
}`}
            </CodeBlock>
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
              <h1 className="text-3xl font-bold text-gray-900">C++常用头文件</h1>
              <p className="text-gray-600 mt-2">了解和掌握C++标准库中常用的头文件及其功能</p>
            </div>
            <Progress type="circle" percent={95} size={80} strokeColor="#2f54eb" />
          </div>
        </div>

        {/* 课程内容 */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <Tabs activeKey={activeTab} onChange={setActiveTab} className="p-6" items={tabItems} />
        </div>

        {/* 底部导航 */}
        <div className="flex justify-between mt-8">
          <Link 
            href="/study/cpp/projects" 
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            <LeftOutlined className="mr-2" />
            上一课：项目实战
          </Link>
        </div>
      </div>
    </div>
  );
} 