'use client';

import { useState } from 'react';
import { Card, Tabs, Progress, Alert } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { CodeBlock } from '@/app/components/ui/CodeBlock';
import Link from 'next/link';
import React from 'react';

export default function STLPage() {
  const [activeTab, setActiveTab] = useState('1');

  const tabItems = [
    {
      key: '1',
      label: '容器',
      children: (
        <Card title="STL容器" className="mb-6">
          <div className="space-y-4 mt-4">
            <h3 className="text-xl font-semibold mb-4">顺序容器</h3>
            <p>包括 vector、list、deque 等顺序存储的容器。</p>
            <CodeBlock language="cpp">
              {`#include <vector>
#include <list>
#include <deque>
using namespace std;

int main() {
    // vector示例
    vector<int> vec = {1, 2, 3, 4, 5};
    vec.push_back(6);                // 在末尾添加元素
    vec.pop_back();                  // 删除末尾元素
    cout << vec.front() << endl;     // 访问第一个元素
    cout << vec.back() << endl;      // 访问最后一个元素
    
    // list示例（双向链表）
    list<string> lst = {"C++", "Java", "Python"};
    lst.push_front("Rust");          // 在开头添加元素
    lst.push_back("Go");             // 在末尾添加元素
    
    // deque示例（双端队列）
    deque<double> dq;
    dq.push_front(1.1);             // 在开头添加元素
    dq.push_back(2.2);              // 在末尾添加元素
    
    // 使用迭代器遍历
    for(const auto& item : vec) {
        cout << item << " ";
    }
    cout << endl;
    
    // 使用迭代器修改元素
    for(auto it = lst.begin(); it != lst.end(); ++it) {
        cout << *it << " ";
    }
    cout << endl;
}`}
            </CodeBlock>

            <h3 className="text-xl font-semibold mb-4 mt-8">关联容器</h3>
            <p>包括 set、map、multiset、multimap 等基于键值对的容器。</p>
            <CodeBlock language="cpp">
              {`#include <map>
#include <set>
using namespace std;

int main() {
    // map示例（键值对容器）
    map<string, int> scores;
    scores["Alice"] = 95;
    scores["Bob"] = 89;
    scores["Charlie"] = 92;
    
    // 检查键是否存在
    if(scores.find("Alice") != scores.end()) {
        cout << "Alice's score: " << scores["Alice"] << endl;
    }
    
    // 遍历map
    for(const auto& [name, score] : scores) {
        cout << name << ": " << score << endl;
    }
    
    // set示例（有序集合）
    set<int> numbers = {3, 1, 4, 1, 5, 9, 2, 6, 5};  // 自动去重和排序
    numbers.insert(7);
    
    // 检查元素是否存在
    if(numbers.count(5) > 0) {
        cout << "5 exists in the set" << endl;
    }
    
    // multimap示例（允许重复键）
    multimap<string, string> dictionary;
    dictionary.insert({"apple", "一种水果"});
    dictionary.insert({"apple", "一个科技公司"});
    
    // 查找所有相同键的值
    auto range = dictionary.equal_range("apple");
    for(auto it = range.first; it != range.second; ++it) {
        cout << it->first << ": " << it->second << endl;
    }
}`}
            </CodeBlock>
            <Alert
              className="mt-4"
              message="容器特点"
              description={
                <ul className="list-disc pl-6">
                  <li>顺序容器适合按位置访问和修改元素</li>
                  <li>关联容器适合需要快速查找的场景</li>
                  <li>所有容器都支持迭代器操作</li>
                  <li>不同容器在性能和功能上各有优势</li>
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
      label: '算法',
      children: (
        <Card title="STL算法" className="mb-6">
          <div className="space-y-4 mt-4">
            <h3 className="text-xl font-semibold mb-4">常用算法</h3>
            <p>STL提供了大量的通用算法，可以在不同的容器上使用。</p>
            <CodeBlock language="cpp">
              {`#include <algorithm>
#include <vector>
#include <numeric>  // 用于数值算法
using namespace std;

int main() {
    vector<int> nums = {4, 1, 8, 5, 2, 9, 3, 7, 6};
    
    // 排序算法
    sort(nums.begin(), nums.end());  // 升序排序
    
    // 查找算法
    auto it = find(nums.begin(), nums.end(), 5);
    if(it != nums.end()) {
        cout << "Found 5 at position: " << (it - nums.begin()) << endl;
    }
    
    // 二分查找（要求已排序）
    bool exists = binary_search(nums.begin(), nums.end(), 7);
    
    // 最大最小值
    auto [min_it, max_it] = minmax_element(nums.begin(), nums.end());
    cout << "Min: " << *min_it << ", Max: " << *max_it << endl;
    
    // 数值算法
    int sum = accumulate(nums.begin(), nums.end(), 0);
    
    // 修改序列算法
    vector<int> squared;
    transform(nums.begin(), nums.end(), back_inserter(squared),
        [](int x) { return x * x; });
    
    // 删除算法
    vector<int> even_nums = nums;
    auto new_end = remove_if(even_nums.begin(), even_nums.end(),
        [](int x) { return x % 2 != 0; });
    even_nums.erase(new_end, even_nums.end());
    
    // 排列算法
    vector<int> perm = {1, 2, 3};
    do {
        for(int x : perm) cout << x << " ";
        cout << endl;
    } while(next_permutation(perm.begin(), perm.end()));
}`}
            </CodeBlock>
            <Alert
              className="mt-4"
              message="算法特点"
              description={
                <ul className="list-disc pl-6">
                  <li>大多数算法都支持自定义比较函数</li>
                  <li>通过迭代器实现，可用于不同容器</li>
                  <li>许多算法支持并行执行策略</li>
                  <li>结合 lambda 表达式使用更加灵活</li>
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
      key: '3',
      label: '迭代器',
      children: (
        <Card title="迭代器" className="mb-6">
          <div className="space-y-4 mt-4">
            <h3 className="text-xl font-semibold mb-4">迭代器类型和使用</h3>
            <p>迭代器是容器和算法之间的桥梁，提供了统一的访问接口。</p>
            <CodeBlock language="cpp">
              {`#include <vector>
#include <list>
#include <iterator>
using namespace std;

int main() {
    // 基本迭代器使用
    vector<int> vec = {1, 2, 3, 4, 5};
    
    // 正向迭代器
    for(vector<int>::iterator it = vec.begin(); it != vec.end(); ++it) {
        cout << *it << " ";
    }
    cout << endl;
    
    // 反向迭代器
    for(vector<int>::reverse_iterator rit = vec.rbegin(); 
        rit != vec.rend(); ++rit) {
        cout << *rit << " ";
    }
    cout << endl;
    
    // 常量迭代器（只读）
    for(vector<int>::const_iterator cit = vec.cbegin(); 
        cit != vec.cend(); ++cit) {
        cout << *cit << " ";
    }
    cout << endl;
    
    // 使用auto简化迭代器声明
    for(auto it = vec.begin(); it != vec.end(); ++it) {
        *it *= 2;  // 修改元素
    }
    
    // 流迭代器
    cout << "Enter numbers (Ctrl+D to end):" << endl;
    istream_iterator<int> input_iter(cin);
    istream_iterator<int> eof;
    
    vector<int> numbers(input_iter, eof);
    
    // 输出流迭代器
    ostream_iterator<int> output_iter(cout, " ");
    copy(numbers.begin(), numbers.end(), output_iter);
    cout << endl;
    
    // 插入迭代器
    list<int> lst;
    back_insert_iterator<list<int>> back_it(lst);
    *back_it = 1;  // 在末尾插入
    *back_it = 2;
    
    front_insert_iterator<list<int>> front_it(lst);
    *front_it = 0;  // 在开头插入
}`}
            </CodeBlock>
            <Alert
              className="mt-4"
              message="迭代器分类"
              description={
                <ul className="list-disc pl-6">
                  <li>输入迭代器：只读，单遍扫描</li>
                  <li>输出迭代器：只写，单遍扫描</li>
                  <li>前向迭代器：可读写，多遍扫描，只能向前</li>
                  <li>双向迭代器：可读写，可向前向后</li>
                  <li>随机访问迭代器：可读写，可随机访问</li>
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
              <h1 className="text-3xl font-bold text-gray-900">STL标准库</h1>
              <p className="text-gray-600 mt-2">学习C++标准模板库的容器、算法和迭代器</p>
            </div>
            <Progress type="circle" percent={68} size={80} strokeColor="#1890ff" />
          </div>
        </div>

        {/* 课程内容 */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <Tabs activeKey={activeTab} onChange={setActiveTab} className="p-6" items={tabItems} />
        </div>

        {/* 底部导航 */}
        <div className="flex justify-between mt-8">
          <Link 
            href="/study/cpp/templates" 
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            <LeftOutlined className="mr-2" />
            上一课：模板编程
          </Link>
          <Link
            href="/study/cpp/file-io"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            下一课：文件操作
            <RightOutlined className="ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
} 