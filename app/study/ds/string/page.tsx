'use client';

import React from 'react';
import { Card, Tabs, Progress, Alert, Typography, Collapse } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { CodeBlock } from '@/app/components/ui/CodeBlock';

const { Paragraph } = Typography;

export default function DsStringPage() {
  const tabItems = [
    {
      key: '1',
      label: '📝 字符串存储与常用操作',
      children: (
        <Card title="字符串存储与常用操作" className="mb-6">
          <Paragraph>C++中字符串常用string类，支持灵活操作。常见函数如下：</Paragraph>
          <CodeBlock language="cpp">{`// 基本用法
string s = "hello";
s += " world"; // 拼接
cout << s.substr(0, 5) << endl; // 子串
reverse(s.begin(), s.end()); // 反转
// 手写字符串反转
void reverseStr(string& s) {
    int l = 0, r = s.size() - 1;
    while (l < r) swap(s[l++], s[r--]); // 双指针交换
}`}</CodeBlock>
          <Paragraph>常用操作：查找、替换、分割、去重、统计字符出现次数等。</Paragraph>
          <CodeBlock language="cpp">{`// 统计每个字符出现次数
vector<int> count(256, 0);
for (char c : s) count[c]++;
// 查找子串
int pos = s.find("ll"); // 找到返回下标，否则string::npos`}</CodeBlock>
        </Card>
      )
    },
    {
      key: '2',
      label: '🔍 字符串匹配算法',
      children: (
        <Card title="字符串匹配算法" className="mb-6">
          <Paragraph>字符串匹配常用暴力法和KMP算法：</Paragraph>
          <CodeBlock language="cpp">{`// 暴力匹配
int strStr(string haystack, string needle) {
    int n = haystack.size(), m = needle.size();
    for (int i = 0; i <= n - m; ++i) {
        int j = 0;
        while (j < m && haystack[i + j] == needle[j]) ++j;
        if (j == m) return i;
    }
    return -1;
}
// KMP算法
vector<int> getNext(string& p) {
    int m = p.size();
    vector<int> next(m, -1);
    for (int i = 1, j = -1; i < m; ++i) {
        while (j != -1 && p[j + 1] != p[i]) j = next[j];
        if (p[j + 1] == p[i]) ++j;
        next[i] = j;
    }
    return next;
}
int kmp(string s, string p) {
    vector<int> next = getNext(p);
    int n = s.size(), m = p.size(), j = -1;
    for (int i = 0; i < n; ++i) {
        while (j != -1 && p[j + 1] != s[i]) j = next[j];
        if (p[j + 1] == s[i]) ++j;
        if (j == m - 1) return i - m + 1; // 匹配成功
    }
    return -1;
}`}</CodeBlock>
          <Alert message="注释" description="KMP算法通过next数组避免重复匹配，大幅提升效率。" type="info" showIcon />
        </Card>
      )
    },
    {
      key: '3',
      label: '🔑 字符串哈希',
      children: (
        <Card title="字符串哈希" className="mb-6">
          <Paragraph>字符串哈希常用于快速判断子串是否相等、查找重复子串等：</Paragraph>
          <CodeBlock language="cpp">{`// 字符串哈希（Rabin-Karp）
typedef unsigned long long ULL;
const ULL P = 131;
vector<ULL> h, p;
void initHash(const string& s) {
    int n = s.size();
    h.assign(n + 1, 0); p.assign(n + 1, 1);
    for (int i = 1; i <= n; ++i) {
        h[i] = h[i - 1] * P + s[i - 1];
        p[i] = p[i - 1] * P;
    }
}
ULL getHash(int l, int r) { // 获取s[l...r-1]的哈希值
    return h[r] - h[l] * p[r - l];
}`}</CodeBlock>
          <Paragraph>常见应用：判断两个子串是否相等、查找重复子串、字符串去重等。</Paragraph>
        </Card>
      )
    },
    {
      key: '4',
      label: '🌟 经典例题',
      children: (
        <Card title="经典例题" className="mb-6">
          <Paragraph>1. 最长回文子串（中心扩展法）</Paragraph>
          <CodeBlock language="cpp">{`// 最长回文子串
string longestPalindrome(string s) {
    int n = s.size(), start = 0, maxLen = 1;
    for (int i = 0; i < n; ++i) {
        int l = i, r = i;
        while (l >= 0 && r < n && s[l] == s[r]) { // 奇数回文
            if (r - l + 1 > maxLen) { start = l; maxLen = r - l + 1; }
            --l; ++r;
        }
        l = i, r = i + 1;
        while (l >= 0 && r < n && s[l] == s[r]) { // 偶数回文
            if (r - l + 1 > maxLen) { start = l; maxLen = r - l + 1; }
            --l; ++r;
        }
    }
    return s.substr(start, maxLen);
}`}</CodeBlock>
          <Paragraph>2. 字符串分割（动态规划）</Paragraph>
          <CodeBlock language="cpp">{`// 字符串分割（word break）
bool wordBreak(string s, vector<string>& wordDict) {
    unordered_set<string> dict(wordDict.begin(), wordDict.end());
    int n = s.size();
    vector<bool> dp(n + 1, false);
    dp[0] = true;
    for (int i = 1; i <= n; ++i)
        for (int j = 0; j < i; ++j)
            if (dp[j] && dict.count(s.substr(j, i - j))) {
                dp[i] = true; break;
            }
    return dp[n];
}`}</CodeBlock>
          <Paragraph>3. 异位词分组（哈希）</Paragraph>
          <CodeBlock language="cpp">{`// 异位词分组
vector<vector<string>> groupAnagrams(vector<string>& strs) {
    unordered_map<string, vector<string>> mp;
    for (auto& s : strs) {
        string t = s;
        sort(t.begin(), t.end()); // 排序后作为哈希key
        mp[t].push_back(s);
    }
    vector<vector<string>> res;
    for (auto& p : mp) res.push_back(p.second);
    return res;
}`}</CodeBlock>
        </Card>
      )
    },
    {
      key: '5',
      label: '💡 练习题与参考答案',
      children: (
        <Card title="练习题与参考答案" className="mb-6">
          <Paragraph><b>练习题：</b></Paragraph>
          <ul className="list-disc pl-6">
            <li>
              实现一个高效的字符串去重函数（C++）。
              <Collapse className="mt-2">
                <Collapse.Panel header="参考答案" key="1">
                  <CodeBlock language="cpp">{`// 字符串去重
string removeDuplicate(string s) {
    unordered_set<char> seen;
    string res;
    for (char c : s) if (!seen.count(c)) { seen.insert(c); res += c; }
    return res;
}`}</CodeBlock>
                </Collapse.Panel>
              </Collapse>
            </li>
            <li>
              判断两个字符串是否为变位词（C++）。
              <Collapse className="mt-2">
                <Collapse.Panel header="参考答案" key="2">
                  <CodeBlock language="cpp">{`// 判断变位词
bool isAnagram(string s, string t) {
    if (s.size() != t.size()) return false;
    vector<int> cnt(256, 0);
    for (char c : s) cnt[c]++;
    for (char c : t) if (--cnt[c] < 0) return false;
    return true;
}`}</CodeBlock>
                </Collapse.Panel>
              </Collapse>
            </li>
          </ul>
          <Alert message="温馨提示" description="多练习字符串算法，掌握KMP、哈希、动态规划等高频技巧。" type="info" showIcon />
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
              <h1 className="text-3xl font-bold text-gray-900">字符串与算法</h1>
              <p className="text-gray-600 mt-2">掌握字符串常用操作、匹配算法、哈希与高频题型</p>
            </div>
            <Progress type="circle" percent={30} size={100} strokeColor="#13c2c2" />
          </div>
        </div>

        {/* 课程内容 */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <Tabs items={tabItems} tabPosition="left" className="p-6" />
        </div>

        {/* 底部导航 */}
        <div className="flex justify-between mt-8">
          <Link
            href="/study/ds/linear"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gray-600 hover:bg-gray-700"
          >
            <LeftOutlined className="mr-2" />
            上一课：线性表
          </Link>
          <Link
            href="/study/ds/tree"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
          >
            下一课：树与二叉树
            <RightOutlined className="ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
} 