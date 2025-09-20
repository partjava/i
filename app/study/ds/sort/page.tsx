 'use client';

import React from 'react';
import { Card, Tabs, Progress, Alert, Typography, Collapse } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { CodeBlock } from '@/app/components/ui/CodeBlock';

const { Paragraph } = Typography;

export default function DsSortPage() {
  const tabItems = [
    {
      key: '1',
      label: '🔢 常用排序算法',
      children: (
        <Card title="常用排序算法" className="mb-6">
          <Paragraph>掌握经典排序算法的原理与实现：</Paragraph>
          <CodeBlock language="cpp">{`// 冒泡排序（每轮将最大/最小元素"冒泡"到末尾）
void bubbleSort(vector<int>& a) {
    int n = a.size();
    for (int i = 0; i < n - 1; ++i) {
        bool swapped = false; // 标记本轮是否有交换
        for (int j = 0; j < n - 1 - i; ++j) {
            if (a[j] > a[j + 1]) {
                swap(a[j], a[j + 1]);
                swapped = true;
            }
        }
        if (!swapped) break; // 已有序提前结束
    }
}
// 选择排序（每轮选择最小元素放到前面）
void selectionSort(vector<int>& a) {
    int n = a.size();
    for (int i = 0; i < n - 1; ++i) {
        int minIdx = i;
        for (int j = i + 1; j < n; ++j)
            if (a[j] < a[minIdx]) minIdx = j;
        swap(a[i], a[minIdx]);
    }
}
// 插入排序（将当前元素插入到前面有序区间）
void insertionSort(vector<int>& a) {
    int n = a.size();
    for (int i = 1; i < n; ++i) {
        int x = a[i], j = i - 1;
        while (j >= 0 && a[j] > x) {
            a[j + 1] = a[j];
            --j;
        }
        a[j + 1] = x;
    }
}
// 归并排序（分治，递归排序左右两半并合并）
void merge(vector<int>& a, int l, int m, int r) {
    vector<int> tmp(r - l + 1);
    int i = l, j = m + 1, k = 0;
    while (i <= m && j <= r)
        tmp[k++] = a[i] < a[j] ? a[i++] : a[j++];
    while (i <= m) tmp[k++] = a[i++];
    while (j <= r) tmp[k++] = a[j++];
    for (int t = 0; t < tmp.size(); ++t) a[l + t] = tmp[t];
}
void mergeSort(vector<int>& a, int l, int r) {
    if (l >= r) return;
    int m = l + (r - l) / 2;
    mergeSort(a, l, m);
    mergeSort(a, m + 1, r);
    merge(a, l, m, r);
}
// 快速排序（分治，选基准分区递归排序）
int partition(vector<int>& a, int l, int r) {
    int pivot = a[r], i = l - 1;
    for (int j = l; j < r; ++j) {
        if (a[j] <= pivot) swap(a[++i], a[j]);
    }
    swap(a[i + 1], a[r]);
    return i + 1;
}
void quickSort(vector<int>& a, int l, int r) {
    if (l < r) {
        int p = partition(a, l, r);
        quickSort(a, l, p - 1);
        quickSort(a, p + 1, r);
    }
}
// 堆排序（利用大根堆/小根堆，每次取堆顶）
void heapify(vector<int>& a, int n, int i) {
    int largest = i, l = 2 * i + 1, r = 2 * i + 2;
    if (l < n && a[l] > a[largest]) largest = l;
    if (r < n && a[r] > a[largest]) largest = r;
    if (largest != i) {
        swap(a[i], a[largest]);
        heapify(a, n, largest);
    }
}
void heapSort(vector<int>& a) {
    int n = a.size();
    for (int i = n / 2 - 1; i >= 0; --i) heapify(a, n, i); // 建堆
    for (int i = n - 1; i > 0; --i) {
        swap(a[0], a[i]);
        heapify(a, i, 0);
    }
}`}</CodeBlock>
        </Card>
      )
    },
    {
      key: '2',
      label: '🔍 查找算法',
      children: (
        <Card title="查找算法" className="mb-6">
          <Paragraph>常用查找算法及实现：</Paragraph>
          <CodeBlock language="cpp">{`// 顺序查找
int linearSearch(vector<int>& a, int x) {
    for (int i = 0; i < a.size(); ++i)
        if (a[i] == x) return i;
    return -1;
}
// 二分查找（非递归）
int binarySearch(vector<int>& a, int x) {
    int l = 0, r = a.size() - 1;
    while (l <= r) {
        int m = l + (r - l) / 2;
        if (a[m] == x) return m;
        else if (a[m] < x) l = m + 1;
        else r = m - 1;
    }
    return -1;
}
// 二分查找（递归）
int binarySearchRec(vector<int>& a, int l, int r, int x) {
    if (l > r) return -1;
    int m = l + (r - l) / 2;
    if (a[m] == x) return m;
    else if (a[m] < x) return binarySearchRec(a, m + 1, r, x);
    else return binarySearchRec(a, l, m - 1, x);
}
// 哈希查找（unordered_map）
int hashSearch(unordered_map<int,int>& mp, int x) {
    return mp.count(x) ? mp[x] : -1;
}`}</CodeBlock>
        </Card>
      )
    },
    {
      key: '3',
      label: '🌟 典型例题与完整解答',
      children: (
        <Card title="典型例题与完整解答" className="mb-6">
          <Paragraph>1. 区间合并</Paragraph>
          <CodeBlock language="cpp">{`// 区间合并
#include <vector>
#include <algorithm>
using namespace std;
vector<vector<int>> merge(vector<vector<int>>& intervals) {
    sort(intervals.begin(), intervals.end());
    vector<vector<int>> res;
    for (auto& it : intervals) {
        if (res.empty() || res.back()[1] < it[0]) res.push_back(it);
        else res.back()[1] = max(res.back()[1], it[1]);
    }
    return res;
}`}</CodeBlock>
          <Paragraph>2. 逆序对数量（归并排序思想）</Paragraph>
          <CodeBlock language="cpp">{`// 逆序对数量
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
          <Paragraph>3. 第K大元素（快速选择）</Paragraph>
          <CodeBlock language="cpp">{`// 第K大元素
int quickSelect(vector<int>& a, int l, int r, int k) {
    if (l == r) return a[l];
    int p = partition(a, l, r);
    int cnt = p - l + 1;
    if (k == cnt) return a[p];
    else if (k < cnt) return quickSelect(a, l, p - 1, k);
    else return quickSelect(a, p + 1, r, k - cnt);
}`}</CodeBlock>
          <Paragraph>4. 旋转数组查找</Paragraph>
          <CodeBlock language="cpp">{`// 旋转数组查找
int search(vector<int>& a, int target) {
    int l = 0, r = a.size() - 1;
    while (l <= r) {
        int m = l + (r - l) / 2;
        if (a[m] == target) return m;
        if (a[l] <= a[m]) {
            if (a[l] <= target && target < a[m]) r = m - 1;
            else l = m + 1;
        } else {
            if (a[m] < target && target <= a[r]) l = m + 1;
            else r = m - 1;
        }
    }
    return -1;
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
              手写实现归并排序，并输出排序结果。
              <Collapse className="mt-2">
                <Collapse.Panel header="参考答案" key="1">
                  <CodeBlock language="cpp">{`// 归并排序
#include <iostream>
#include <vector>
using namespace std;
void merge(vector<int>& a, int l, int m, int r) {
    vector<int> tmp(r - l + 1);
    int i = l, j = m + 1, k = 0;
    while (i <= m && j <= r)
        tmp[k++] = a[i] < a[j] ? a[i++] : a[j++];
    while (i <= m) tmp[k++] = a[i++];
    while (j <= r) tmp[k++] = a[j++];
    for (int t = 0; t < tmp.size(); ++t) a[l + t] = tmp[t];
}
void mergeSort(vector<int>& a, int l, int r) {
    if (l >= r) return;
    int m = l + (r - l) / 2;
    mergeSort(a, l, m);
    mergeSort(a, m + 1, r);
    merge(a, l, m, r);
}
int main() {
    vector<int> a = {5,2,4,6,1,3};
    mergeSort(a, 0, a.size() - 1);
    for (int x : a) cout << x << ' ';
    return 0;
}`}</CodeBlock>
                </Collapse.Panel>
              </Collapse>
            </li>
            <li>
              实现二分查找，并输出查找结果。
              <Collapse className="mt-2">
                <Collapse.Panel header="参考答案" key="2">
                  <CodeBlock language="cpp">{`// 二分查找
#include <iostream>
#include <vector>
using namespace std;
int binarySearch(vector<int>& a, int x) {
    int l = 0, r = a.size() - 1;
    while (l <= r) {
        int m = l + (r - l) / 2;
        if (a[m] == x) return m;
        else if (a[m] < x) l = m + 1;
        else r = m - 1;
    }
    return -1;
}
int main() {
    vector<int> a = {1,2,3,4,5,6};
    cout << binarySearch(a, 4) << endl; // 输出3
    return 0;
}`}</CodeBlock>
                </Collapse.Panel>
              </Collapse>
            </li>
          </ul>
          <Alert message="温馨提示" description="建议多手写排序与查找算法，理解每一步的实现原理和边界处理。" type="info" showIcon />
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
              <h1 className="text-3xl font-bold text-gray-900">排序与查找</h1>
              <p className="text-gray-600 mt-2">掌握经典排序、查找算法及其高频应用</p>
            </div>
            <Progress type="circle" percent={60} size={100} strokeColor="#13c2c2" />
          </div>
        </div>

        {/* 课程内容 */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <Tabs items={tabItems} tabPosition="left" className="p-6" />
        </div>

        {/* 底部导航 */}
        <div className="flex justify-between mt-8">
          <Link
            href="/study/ds/graph"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gray-600 hover:bg-gray-700"
          >
            <LeftOutlined className="mr-2" />
            上一课：图与图算法
          </Link>
          <Link
            href="/study/ds/hash"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
          >
            下一课：哈希表与集合
            <RightOutlined className="ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
}
