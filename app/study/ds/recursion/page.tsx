'use client';

import React from 'react';
import { Card, Tabs, Progress, Alert, Typography, Collapse } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { CodeBlock } from '@/app/components/ui/CodeBlock';

const { Paragraph } = Typography;

export default function DsRecursionPage() {
  const tabItems = [
    {
      key: '1',
      label: '🔄 递归思想与写法',
      children: (
        <Card title="递归思想与写法" className="mb-6">
          <Paragraph>递归是函数直接或间接调用自身，常用于分解重复子问题。递归与迭代的区别在于递归用栈保存状态，迭代用循环。递归模板：</Paragraph>
          <CodeBlock language="cpp">{`// 递归模板
void recur(参数) {
    if (终止条件) return;
    // 处理当前层逻辑
    recur(子问题参数);
    // （可选）回溯清理
}`}</CodeBlock>
          <Paragraph>示例：斐波那契数列（递归与迭代）</Paragraph>
          <CodeBlock language="cpp">{`// 递归写法
int fib(int n) {
    if (n <= 1) return n;
    return fib(n - 1) + fib(n - 2);
}
// 迭代写法
int fibIter(int n) {
    if (n <= 1) return n;
    int a = 0, b = 1;
    for (int i = 2; i <= n; ++i) {
        int c = a + b;
        a = b; b = c;
    }
    return b;
}`}</CodeBlock>
        </Card>
      )
    },
    {
      key: '2',
      label: '🪓 分治算法与典型问题',
      children: (
        <Card title="分治算法与典型问题" className="mb-6">
          <Paragraph>分治法将大问题分解为小问题递归求解，典型如归并排序、快速排序、二分查找、最近点对等：</Paragraph>
          <CodeBlock language="cpp">{`// 归并排序（分治）
void mergeSort(vector<int>& a, int l, int r) {
    if (l >= r) return;
    int m = l + (r - l) / 2;
    mergeSort(a, l, m);
    mergeSort(a, m + 1, r);
    merge(a, l, m, r);
}`}</CodeBlock>
          <CodeBlock language="cpp">{`// 二分查找（分治）
int binarySearch(vector<int>& a, int l, int r, int x) {
    if (l > r) return -1;
    int m = l + (r - l) / 2;
    if (a[m] == x) return m;
    else if (a[m] < x) return binarySearch(a, m + 1, r, x);
    else return binarySearch(a, l, m - 1, x);
}`}</CodeBlock>
        </Card>
      )
    },
    {
      key: '3',
      label: '🌟 经典例题与完整解答',
      children: (
        <Card title="经典例题与完整解答" className="mb-6">
          <Paragraph>1. 汉诺塔问题</Paragraph>
          <CodeBlock language="cpp">{`// 汉诺塔问题
void hanoi(int n, char A, char B, char C) {
    if (n == 1) {
        printf("%c -> %c\n", A, C);
        return;
    }
    hanoi(n - 1, A, C, B);
    printf("%c -> %c\n", A, C);
    hanoi(n - 1, B, A, C);
}`}</CodeBlock>
          <Paragraph>2. 全排列</Paragraph>
          <CodeBlock language="cpp">{`// 全排列
void permute(vector<int>& a, int l) {
    if (l == a.size()) {
        for (int x : a) cout << x << ' ';
        cout << endl;
        return;
    }
    for (int i = l; i < a.size(); ++i) {
        swap(a[i], a[l]);
        permute(a, l + 1);
        swap(a[i], a[l]); // 回溯
    }
}`}</CodeBlock>
          <Paragraph>3. 分治求逆序对</Paragraph>
          <CodeBlock language="cpp">{`// 逆序对数量（归并分治）
int mergeCount(vector<int>& a, int l, int r) {
    if (l >= r) return 0;
    int m = l + (r - l) / 2, cnt = 0;
    cnt += mergeCount(a, l, m);
    cnt += mergeCount(a, m + 1, r);
    vector<int> tmp(r - l + 1);
    int i = l, j = m + 1, k = 0;
    while (i <= m && j <= r) {
        if (a[i] <= a[j]) tmp[k++] = a[i++];
        else { tmp[k++] = a[j++]; cnt += m - i + 1; }
    }
    while (i <= m) tmp[k++] = a[i++];
    while (j <= r) tmp[k++] = a[j++];
    for (int t = 0; t < tmp.size(); ++t) a[l + t] = tmp[t];
    return cnt;
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
              实现递归求n的阶乘。
              <Collapse className="mt-2">
                <Collapse.Panel header="参考答案" key="1">
                  <CodeBlock language="cpp">{`// 递归求阶乘
#include <iostream>
using namespace std;
long long fact(int n) {
    if (n <= 1) return 1;
    return n * fact(n - 1);
}
int main() {
    cout << fact(5) << endl; // 输出120
    return 0;
}`}</CodeBlock>
                </Collapse.Panel>
              </Collapse>
            </li>
            <li>
              实现全排列并输出所有排列。
              <Collapse className="mt-2">
                <Collapse.Panel header="参考答案" key="2">
                  <CodeBlock language="cpp">{`// 全排列
#include <iostream>
#include <vector>
using namespace std;
void permute(vector<int>& a, int l) {
    if (l == a.size()) {
        for (int x : a) cout << x << ' ';
        cout << endl;
        return;
    }
    for (int i = l; i < a.size(); ++i) {
        swap(a[i], a[l]);
        permute(a, l + 1);
        swap(a[i], a[l]);
    }
}
int main() {
    vector<int> a = {1,2,3};
    permute(a, 0);
    return 0;
}`}</CodeBlock>
                </Collapse.Panel>
              </Collapse>
            </li>
          </ul>
          <Alert message="温馨提示" description="递归调试时可多画递归树、打印参数，理解递归调用过程和回溯机制。" type="info" showIcon />
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
              <h1 className="text-3xl font-bold text-gray-900">递归与分治</h1>
              <p className="text-gray-600 mt-2">掌握递归、分治思想及其高频应用</p>
            </div>
            <Progress type="circle" percent={80} size={100} strokeColor="#13c2c2" />
          </div>
        </div>

        {/* 课程内容 */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <Tabs items={tabItems} tabPosition="left" className="p-6" />
        </div>

        {/* 底部导航 */}
        <div className="flex justify-between mt-8">
          <Link
            href="/study/ds/hash"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gray-600 hover:bg-gray-700"
          >
            <LeftOutlined className="mr-2" />
            上一课：哈希表与集合
          </Link>
          <Link
            href="/study/ds/dp"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
          >
            下一课：动态规划
            <RightOutlined className="ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
} 