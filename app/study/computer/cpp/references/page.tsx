'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import {
  PageTitle,
  BookParagraph,
  BookCode,
  BookAlert,
  BookList,
  TagGrid,
} from '@/app/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: 'C++编程',
  chapterTitle: '引用',
  chapterNumber: 9,
  totalChapters: 18,
  subjectHref: '/study/computer/cpp',
  prevChapter: { label: '指针', href: '/study/computer/cpp/pointers' },
  nextChapter: { label: '结构体和类', href: '/study/computer/cpp/structs' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: '引用基础',
    left: (
      <div className="space-y-4">
        <PageTitle>引用的基本概念</PageTitle>
        <BookParagraph>引用是 C++ 中的一个重要特性，它为对象提供了一个别名。引用必须在创建时初始化，并且一旦初始化后不能更改为引用其他对象。</BookParagraph>
        <BookCode language="cpp" showLineNumbers code={`// 引用的声明和初始化
int num = 42;
int& ref = num;  // ref 是 num 的引用

// 通过引用修改原变量
ref = 100;       // 此时 num 也变为 100
cout << num;     // 输出 100

// 引用作为函数参数
void increment(int& x) {
    x++;         // 直接修改原始变量
}
increment(num);  // num 变为 101

// 常量引用
const int& cref = num;
// cref = 200;  // 错误！不能通过常量引用修改

// 引用作为函数返回值
int& getMax(int& a, int& b) {
    return (a > b) ? a : b;
}
int x = 5, y = 10;
getMax(x, y) = 100;    // y 变为 100`} />
        <BookAlert type="warning" message="引用必须在创建时初始化。一旦初始化，不能再引用其他对象。不存在空引用" />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>引用的应用场景</PageTitle>
        <BookCode language="cpp" showLineNumbers code={`// 1. 避免拷贝（大对象）
void process(const vector<int>& data) {
    // 传入引用，不拷贝
}

// 2. 修改实参
void swap(int& a, int& b) {
    int temp = a;
    a = b;
    b = temp;
}

// 3. 范围 for 循环修改元素
vector<int> vec = {1, 2, 3};
for (int& v : vec) {
    v *= 2;  // 通过引用修改原元素
}

// 4. 返回容器元素引用
int& getElement(vector<int>& v, int i) {
    return v[i];
}
getElement(vec, 0) = 100;  // 直接修改`} />
        <BookAlert type="info" message="const 引用可以绑定临时对象，延长其生命周期。这是函数参数传递的推荐方式" />
      </div>
    ),
  },
  {
    label: '引用与指针对比',
    left: (
      <div className="space-y-4">
        <PageTitle>引用 vs 指针</PageTitle>
        <BookParagraph>虽然引用在内部实现上类似于指针，但它们在语法和使用上有很大区别：</BookParagraph>
        <BookCode language="cpp" showLineNumbers code={`int value = 42;

// 指针方式
int* ptr = &value;    // 可以指向不同对象
ptr = &otherValue;    // 可重新指向
cout << *ptr;         // 需要解引用

// 引用方式
int& ref = value;     // 必须初始化
// ref = otherValue;  // 实际是赋值，不是重新绑定
cout << ref;          // 直接使用

// 指针可以为空
int* p = nullptr;     // 合法
if (p) { /* 使用前检查 */ }

// 引用不能为空
// int& r;  // 错误！必须初始化
// int& r = null;  // 错误！`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>对比总结</PageTitle>
        <div className="overflow-hidden rounded-md border border-paper-300 text-sm">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-ink text-paper-100/90 text-xs">
                <th className="px-3 py-2 font-medium">特性</th>
                <th className="px-3 py-2 font-medium">引用</th>
                <th className="px-3 py-2 font-medium">指针</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-paper-300 text-xs text-ink-light">
              {[
                ['初始化', '必须初始化', '可以不初始化'],
                ['重新绑定', '不可以', '可以'],
                ['空值', '不存在空引用', '可以为 nullptr'],
                ['解引用', '自动', '需用 *'],
                ['重定向', '不可', '可指向不同对象'],
                ['语法', '简洁', '较复杂'],
                ['安全性', '更安全', '需注意空指针'],
              ].map((row, i) => (
                <tr key={i} className="hover:bg-paper-200/50">
                  <td className="px-3 py-2 font-medium text-ink">{row[0]}</td>
                  <td className="px-3 py-2">{row[1]}</td>
                  <td className="px-3 py-2">{row[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <BookAlert type="info" message="尽量使用引用，需要重新指向或可能为空时使用指针" />
      </div>
    ),
  },
  {
    label: '练习例题',
    left: (
      <div className="space-y-4">
        <PageTitle>引用排序器</PageTitle>
        <div className="p-3 bg-paper-200/80 rounded-md border border-paper-300">
          <p className="text-sm text-ink font-medium mb-1">题目描述</p>
          <BookList items={[
            '编写一个函数，使用引用交换两个整数',
            '实现选择排序算法，全部用引用传递',
            '添加一个函数返回数组中的最大值引用',
            '验证通过引用修改最大值的效果',
          ]} />
        </div>
        <TagGrid items={['引用参数', '引用返回', 'swap 实现', '排序算法']} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>参考代码</PageTitle>
        <BookCode language="cpp" showLineNumbers code={`// 引用交换
void swap(int& a, int& b) {
    int temp = a;
    a = b;
    b = temp;
}

// 返回最大值的引用
int& getMax(int arr[], int size) {
    int maxIdx = 0;
    for (int i = 1; i < size; i++)
        if (arr[i] > arr[maxIdx])
            maxIdx = i;
    return arr[maxIdx];
}

int main() {
    int x = 5, y = 10;
    swap(x, y);
    cout << x << " " << y;  // 10 5

    int arr[] = {3, 8, 2, 6};
    getMax(arr, 4) = 100;   // 最大值改为100
}`} />
        <BookAlert type="info" message="引用让代码更简洁安全，是 C++ 推荐的传参方式。返回引用时要确保对象生命周期够长" />
      </div>
    ),
  },
]

export default function ReferencesPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
