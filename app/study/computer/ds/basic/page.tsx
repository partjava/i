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
  chapterTitle: '基础与复杂度分析',
  chapterNumber: 1,
  totalChapters: 10,
  subjectHref: '/study/computer/ds',
  nextChapter: { label: '线性表', href: '/study/computer/ds/linear' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: '算法与数据结构简介',
    left: (
      <div className="space-y-4">
        <PageTitle>算法与数据结构简介</PageTitle>
        <BookParagraph>算法是解决问题的步骤和方法，数据结构是组织和存储数据的方式。两者相辅相成，是计算机科学的核心基础。</BookParagraph>
        <SectionTitle>常见数据结构</SectionTitle>
        <BookList items={[
          '数组、链表、栈、队列、树、图、哈希表等',
        ]} />
        <SectionTitle>常见算法</SectionTitle>
        <BookList items={[
          '排序、查找、递归、分治、动态规划、图算法等',
        ]} />
        <BookAlert type="info" message="选择合适的数据结构和算法能极大提升程序效率，算法设计需兼顾正确性、效率和可读性。" />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>时间复杂度与空间复杂度</PageTitle>
        <BookParagraph>复杂度用于衡量算法的资源消耗：</BookParagraph>
        <BookList items={[
          '时间复杂度：算法执行所需的基本操作次数（如O(1)、O(n)、O(n²)）',
          '空间复杂度：算法运行时占用的额外存储空间',
        ]} />
        <SectionTitle>常见时间复杂度从低到高</SectionTitle>
        <BookCode language="text" code={`O(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(2ⁿ) < O(n!)`} />
        <BookAlert type="success" message="大O符号只关注增长趋势，忽略常数和低阶项。最坏、平均、最好复杂度需分清。" />
        <TagGrid items={['算法', '数据结构', '时间复杂度', '空间复杂度', '大O']} />
      </div>
    ),
  },
  {
    label: 'C++复杂度实例',
    left: (
      <div className="space-y-4">
        <PageTitle>复杂度分析与C++实例</PageTitle>
        <BookParagraph>通过C++代码理解不同复杂度：</BookParagraph>
        <SectionTitle>O(1) 常数复杂度</SectionTitle>
        <BookCode language="cpp" code={`int getFirst(const vector<int>& arr) {
    return arr[0];
}`} />
        <SectionTitle>O(n) 线性复杂度</SectionTitle>
        <BookCode language="cpp" code={`int sum(const vector<int>& arr) {
    int s = 0;
    for (int x : arr) s += x;
    return s;
}`} />
        <SectionTitle>O(n²) 二重循环</SectionTitle>
        <BookCode language="cpp" code={`void printPairs(const vector<int>& arr) {
    for (int i = 0; i < arr.size(); ++i)
        for (int j = 0; j < arr.size(); ++j)
            cout << arr[i] << "," << arr[j] << endl;
}`} />
        <BookAlert type="info" message="嵌套循环通常导致高阶复杂度，递归需结合递推式分析复杂度。" />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>练习题与参考答案</PageTitle>
        <SectionTitle>练习题</SectionTitle>
        <div className="rounded-lg p-4 mb-4" style={{ background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.06)' }}>
          <p className="font-semibold mb-2">1. 写出以下代码的时间复杂度：</p>
          <BookCode language="cpp" code={`for (int i = 1; i < n; i *= 2) cout << i;`} />
          <p className="text-sm font-semibold" style={{ color: '#388e3c' }}>参考答案：</p>
          <p className="text-xs" style={{ color: '#666' }}>O(log n)。每次i都乘2，循环次数为log₂n。</p>
        </div>
        <div className="rounded-lg p-4 mb-4" style={{ background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.06)' }}>
          <p className="font-semibold mb-2">2. 判断以下代码的空间复杂度：</p>
          <BookCode language="cpp" code={`vector<int> arr(n);`} />
          <p className="text-sm font-semibold" style={{ color: '#388e3c' }}>参考答案：</p>
          <p className="text-xs" style={{ color: '#666' }}>O(n)。分配了n个int的空间。</p>
        </div>
        <div className="rounded-lg p-4" style={{ background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.06)' }}>
          <p className="font-semibold mb-2">3. 递归斐波那契数列的时间复杂度是多少？</p>
          <p className="text-sm font-semibold" style={{ color: '#388e3c' }}>参考答案：</p>
          <p className="text-xs" style={{ color: '#666' }}>O(2ⁿ)。每次递归分裂为两次调用，呈指数增长。</p>
        </div>
        <BookAlert type="info" message="多练习复杂度分析，打好算法基础。" />
        <TagGrid items={['O(1)', 'O(log n)', 'O(n)', 'O(n²)', '复杂度分析', '练习题']} />
      </div>
    ),
  },
]

export default function DsBasicPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
