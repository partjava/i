'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import {
  PageTitle,
  SectionTitle,
  BookParagraph,
  BookCode,
  BookAlert,
  BookList,
  TagGrid,
} from '@shared/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '数据结构与算法',
  chapterTitle: '排序与查找',
  chapterNumber: 6,
  totalChapters: 10,
  subjectHref: '/study/computer/ds',
  prevChapter: { label: '图与图算法', href: '/study/computer/ds/graph' },
  nextChapter: { label: '哈希表与集合', href: '/study/computer/ds/hash' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: '常用排序算法',
    left: (
      <div className="space-y-4">
        <PageTitle>常用排序算法</PageTitle>
        <BookParagraph>掌握经典排序算法的原理与实现：</BookParagraph>
        <BookCode language="cpp" code={`// 冒泡排序（每轮将最大/最小元素"冒泡"到末尾）
void bubbleSort(vector<int>& a) {
    int n = a.size();
    for (int i = 0; i < n - 1; ++i) {
        bool swapped = false;
        for (int j = 0; j < n - 1 - i; ++j) {
            if (a[j] > a[j + 1]) {
                swap(a[j], a[j + 1]);
                swapped = true;
            }
        }
        if (!swapped) break;
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
            a[j + 1] = a[j]; --j;
        }
        a[j + 1] = x;
    }
}`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <BookCode language="cpp" code={`// 归并排序（分治，递归排序左右两半并合并）
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
    if (largest != i) { swap(a[i], a[largest]); heapify(a, n, largest); }
}
void heapSort(vector<int>& a) {
    int n = a.size();
    for (int i = n / 2 - 1; i >= 0; --i) heapify(a, n, i);
    for (int i = n - 1; i > 0; --i) { swap(a[0], a[i]); heapify(a, i, 0); }
}`} />
        <TagGrid items={['冒泡', '选择', '插入', '归并', '快排', '堆排']} />
      </div>
    ),
  },
  {
    label: '查找算法',
    left: (
      <div className="space-y-4">
        <PageTitle>查找算法</PageTitle>
        <BookParagraph>常用查找算法及实现：</BookParagraph>
        <BookCode language="cpp" code={`// 顺序查找
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
}`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>经典例题</SectionTitle>
        <SectionTitle>1. 区间合并</SectionTitle>
        <BookCode language="cpp" code={`// 区间合并
vector<vector<int>> merge(vector<vector<int>>& intervals) {
    sort(intervals.begin(), intervals.end());
    vector<vector<int>> res;
    for (auto& it : intervals) {
        if (res.empty() || res.back()[1] < it[0]) res.push_back(it);
        else res.back()[1] = max(res.back()[1], it[1]);
    }
    return res;
}`} />
        <SectionTitle>2. 逆序对数量（归并排序思想）</SectionTitle>
        <BookCode language="cpp" code={`// 逆序对数量
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
}`} />
        <TagGrid items={['顺序查找', '二分查找', '哈希查找', '区间合并', '逆序对']} />
      </div>
    ),
  },
  {
    label: '例题与练习',
    left: (
      <div className="space-y-4">
        <PageTitle>典型例题</PageTitle>
        <SectionTitle>3. 第K大元素（快速选择）</SectionTitle>
        <BookCode language="cpp" code={`// 第K大元素
int quickSelect(vector<int>& a, int l, int r, int k) {
    if (l == r) return a[l];
    int p = partition(a, l, r);
    int cnt = p - l + 1;
    if (k == cnt) return a[p];
    else if (k < cnt) return quickSelect(a, l, p - 1, k);
    else return quickSelect(a, p + 1, r, k - cnt);
}`} />
        <SectionTitle>4. 旋转数组查找</SectionTitle>
        <BookCode language="cpp" code={`// 旋转数组查找
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
}`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>练习题与参考答案</SectionTitle>
        <BookParagraph><b>练习题1：</b>手写实现归并排序，并输出排序结果。</BookParagraph>
        <BookCode language="cpp" code={`// 归并排序
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
    mergeSort(a, l, m); mergeSort(a, m + 1, r);
    merge(a, l, m, r);
}
int main() {
    vector<int> a = {5,2,4,6,1,3};
    mergeSort(a, 0, a.size() - 1);
    for (int x : a) cout << x << ' ';
    return 0;
}`} />
        <BookParagraph><b>练习题2：</b>实现二分查找，并输出查找结果。</BookParagraph>
        <BookCode language="cpp" code={`// 二分查找
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
}`} />
        <BookAlert type="info" message="建议多手写排序与查找算法，理解每一步的实现原理和边界处理。" />
        <TagGrid items={['快速选择', '旋转数组', '归并排序', '二分查找', '练习题']} />
      </div>
    ),
  },
]

export default function DsSortPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
