'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import {
  PageTitle,
  SectionTitle,
  BookParagraph,
  BookCode,
  BookAlert,
  BookList,
  TagGrid,
} from '@/app/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '数据结构与算法',
  chapterTitle: '递归与分治',
  chapterNumber: 8,
  totalChapters: 10,
  subjectHref: '/study/computer/ds',
  prevChapter: { label: '哈希表与集合', href: '/study/computer/ds/hash' },
  nextChapter: { label: '动态规划', href: '/study/computer/ds/dp' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: '递归思想',
    left: (
      <div className="space-y-4">
        <PageTitle>递归思想与写法</PageTitle>
        <BookParagraph>递归是函数直接或间接调用自身，常用于分解重复子问题。递归与迭代的区别在于递归用栈保存状态，迭代用循环。递归模板：</BookParagraph>
        <BookCode language="cpp" code={`// 递归模板
void recur(参数) {
    if (终止条件) return;
    // 处理当前层逻辑
    recur(子问题参数);
    // （可选）回溯清理
}`} />
        <BookParagraph>示例：斐波那契数列（递归与迭代）</BookParagraph>
        <BookCode language="cpp" code={`// 递归写法
int fib(int n) {
    if (n <= 1) return n;
    return fib(n - 1) + fib(n - 2);
}
// 迭代写法
int fibIter(int n) {
    if (n <= 1) return n;
    int a = 0, b = 1;
    for (int i = 2; i <= n; ++i) {
        int c = a + b; a = b; b = c;
    }
    return b;
}`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>分治算法与典型问题</SectionTitle>
        <BookParagraph>分治法将大问题分解为小问题递归求解，典型如归并排序、快速排序、二分查找、最近点对等：</BookParagraph>
        <BookCode language="cpp" code={`// 归并排序（分治）
void mergeSort(vector<int>& a, int l, int r) {
    if (l >= r) return;
    int m = l + (r - l) / 2;
    mergeSort(a, l, m);
    mergeSort(a, m + 1, r);
    merge(a, l, m, r);
}`} />
        <BookCode language="cpp" code={`// 二分查找（分治）
int binarySearch(vector<int>& a, int l, int r, int x) {
    if (l > r) return -1;
    int m = l + (r - l) / 2;
    if (a[m] == x) return m;
    else if (a[m] < x) return binarySearch(a, m + 1, r, x);
    else return binarySearch(a, l, m - 1, x);
}`} />
        <TagGrid items={['递归', '分治', '斐波那契', '迭代', '回溯']} />
      </div>
    ),
  },
  {
    label: '经典例题与练习',
    left: (
      <div className="space-y-4">
        <PageTitle>经典例题与完整解答</PageTitle>
        <SectionTitle>1. 汉诺塔问题</SectionTitle>
        <BookCode language="cpp" code={`// 汉诺塔问题
void hanoi(int n, char A, char B, char C) {
    if (n == 1) {
        printf("%c -> %c\n", A, C);
        return;
    }
    hanoi(n - 1, A, C, B);
    printf("%c -> %c\n", A, C);
    hanoi(n - 1, B, A, C);
}`} />
        <SectionTitle>2. 全排列</SectionTitle>
        <BookCode language="cpp" code={`// 全排列
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
}`} />
        <SectionTitle>3. 分治求逆序对</SectionTitle>
        <BookCode language="cpp" code={`// 逆序对数量（归并分治）
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
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>练习题与参考答案</SectionTitle>
        <BookParagraph><b>练习题1：</b>实现递归求n的阶乘。</BookParagraph>
        <BookCode language="cpp" code={`// 递归求阶乘
#include <iostream>
using namespace std;
long long fact(int n) {
    if (n <= 1) return 1;
    return n * fact(n - 1);
}
int main() {
    cout << fact(5) << endl; // 输出120
    return 0;
}`} />
        <BookParagraph><b>练习题2：</b>实现全排列并输出所有排列。</BookParagraph>
        <BookCode language="cpp" code={`// 全排列
#include <iostream>
#include <vector>
using namespace std;
void permute(vector<int>& a, int l) {
    if (l == a.size()) {
        for (int x : a) cout << x << ' ';
        cout << endl; return;
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
}`} />
        <BookAlert type="info" message="递归调试时可多画递归树、打印参数，理解递归调用过程和回溯机制。" />
        <TagGrid items={['汉诺塔', '全排列', '逆序对', '阶乘', '回溯']} />
      </div>
    ),
  },
]

export default function DsRecursionPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
