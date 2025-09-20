'use client';

import React from 'react';
import { Card, Tabs, Progress, Alert, Typography, Collapse } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { CodeBlock } from '@/app/components/ui/CodeBlock';

const { Paragraph } = Typography;

export default function DsHashPage() {
  const tabItems = [
    {
      key: '1',
      label: '🔑 哈希表原理与实现',
      children: (
        <Card title="哈希表原理与实现" className="mb-6">
          <Paragraph>哈希表通过哈希函数将关键码映射到数组下标，常用冲突解决有拉链法和开放寻址法：</Paragraph>
          <CodeBlock language="cpp">{`// 拉链法哈希表
const int N = 10007;
vector<pair<int,int>> hashTable[N];
void insert(int key, int val) {
    int h = key % N;
    for (auto& p : hashTable[h]) if (p.first == key) { p.second = val; return; }
    hashTable[h].push_back({key, val});
}
int find(int key) {
    int h = key % N;
    for (auto& p : hashTable[h]) if (p.first == key) return p.second;
    return -1;
}`}</CodeBlock>
          <CodeBlock language="cpp">{`// 开放寻址法哈希表
const int N = 10007;
int keyArr[N], valArr[N];
bool used[N];
void insert(int key, int val) {
    int h = key % N;
    while (used[h] && keyArr[h] != key) h = (h + 1) % N;
    keyArr[h] = key; valArr[h] = val; used[h] = true;
}
int find(int key) {
    int h = key % N;
    while (used[h]) {
        if (keyArr[h] == key) return valArr[h];
        h = (h + 1) % N;
    }
    return -1;
}`}</CodeBlock>
        </Card>
      )
    },
    {
      key: '2',
      label: '🧰 STL哈希容器用法',
      children: (
        <Card title="STL哈希容器用法" className="mb-6">
          <Paragraph>C++ STL提供了高效的哈希容器：</Paragraph>
          <CodeBlock language="cpp">{`#include <unordered_map>
#include <unordered_set>
unordered_map<int, string> mp;
mp[1] = "one";
mp.count(2); // 判断key是否存在
unordered_set<int> st;
st.insert(3);
st.count(3); // 判断元素是否存在`}</CodeBlock>
        </Card>
      )
    },
    {
      key: '3',
      label: '🌟 典型应用与例题',
      children: (
        <Card title="典型应用与例题" className="mb-6">
          <Paragraph>1. 两数之和</Paragraph>
          <CodeBlock language="cpp">{`// 两数之和
vector<int> twoSum(vector<int>& nums, int target) {
    unordered_map<int, int> mp;
    for (int i = 0; i < nums.size(); ++i) {
        int t = target - nums[i];
        if (mp.count(t)) return {mp[t], i};
        mp[nums[i]] = i;
    }
    return {};
}`}</CodeBlock>
          <Paragraph>2. 最长无重复子串</Paragraph>
          <CodeBlock language="cpp">{`// 最长无重复子串
int lengthOfLongestSubstring(string s) {
    unordered_map<char, int> mp;
    int res = 0, l = 0;
    for (int r = 0; r < s.size(); ++r) {
        if (mp.count(s[r])) l = max(l, mp[s[r]] + 1);
        mp[s[r]] = r;
        res = max(res, r - l + 1);
    }
    return res;
}`}</CodeBlock>
        </Card>
      )
    },
    {
      key: '4',
      label: '💡 练习题与参考答案',
      children: (
        <Card title="练习题与参考答案" className="mb-6">
          <Paragraph><b>练习题：</b></Paragraph>
          <ul className="list-disc pl-6">
            <li>
              实现哈希表查找与插入操作。
              <Collapse className="mt-2">
                <Collapse.Panel header="参考答案" key="1">
                  <CodeBlock language="cpp">{`// 哈希表查找与插入
#include <iostream>
#include <vector>
using namespace std;
const int N = 10007;
vector<pair<int,int>> hashTable[N];
void insert(int key, int val) {
    int h = key % N;
    for (auto& p : hashTable[h]) if (p.first == key) { p.second = val; return; }
    hashTable[h].push_back({key, val});
}
int find(int key) {
    int h = key % N;
    for (auto& p : hashTable[h]) if (p.first == key) return p.second;
    return -1;
}
int main() {
    insert(1, 10); insert(2, 20);
    cout << find(1) << ' ' << find(2) << ' ' << find(3) << endl;
    return 0;
}`}</CodeBlock>
                </Collapse.Panel>
              </Collapse>
            </li>
            <li>
              用unordered_map统计数组中每个元素出现次数。
              <Collapse className="mt-2">
                <Collapse.Panel header="参考答案" key="2">
                  <CodeBlock language="cpp">{`// 统计出现次数
#include <iostream>
#include <unordered_map>
#include <vector>
using namespace std;
int main() {
    vector<int> a = {1,2,2,3,1,4};
    unordered_map<int,int> mp;
    for(int x:a) mp[x]++;
    for(auto& p:mp) cout<<p.first<<":"<<p.second<<endl;
    return 0;
}`}</CodeBlock>
                </Collapse.Panel>
              </Collapse>
            </li>
          </ul>
          <Alert message="温馨提示" description="建议多练习哈希表的手写实现与高频应用题，理解哈希冲突处理方式。" type="info" showIcon />
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
              <h1 className="text-3xl font-bold text-gray-900">哈希表与集合</h1>
              <p className="text-gray-600 mt-2">掌握哈希表原理、STL用法及高频应用</p>
            </div>
            <Progress type="circle" percent={70} size={100} strokeColor="#13c2c2" />
          </div>
        </div>

        {/* 课程内容 */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <Tabs items={tabItems} tabPosition="left" className="p-6" />
        </div>

        {/* 底部导航 */}
        <div className="flex justify-between mt-8">
          <Link
            href="/study/ds/sort"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gray-600 hover:bg-gray-700"
          >
            <LeftOutlined className="mr-2" />
            上一课：排序与查找
          </Link>
          <Link
            href="/study/ds/recursion"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
          >
            下一课：递归与分治
            <RightOutlined className="ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
} 