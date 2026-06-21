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
  chapterTitle: '指针',
  chapterNumber: 8,
  totalChapters: 18,
  subjectHref: '/study/computer/cpp',
  prevChapter: { label: '数组和字符串', href: '/study/computer/cpp/arrays' },
  nextChapter: { label: '引用', href: '/study/computer/cpp/references' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: '指针基础',
    left: (
      <div className="space-y-4">
        <PageTitle>指针的基本概念</PageTitle>
        <BookParagraph>指针是 C++ 中非常重要的概念，它是一个变量，其值为另一个变量的内存地址。</BookParagraph>
        <BookCode language="cpp" showLineNumbers code={`// 指针声明和初始化
int num = 42;
int* ptr = &num;       // 指针指向num的地址
int* nullPtr = nullptr; // 空指针

// 指针操作
cout << ptr;          // 输出地址
cout << *ptr;         // 解引用，输出42
*ptr = 100;           // 通过指针修改值

// 指针与数组
int arr[5] = {10, 20, 30, 40, 50};
int* arrPtr = arr;    // 指向数组第一个元素
cout << *arrPtr;      // 输出10
cout << *(arrPtr + 2); // 输出30

// void指针
void* vptr = &num;
int* iptr = static_cast<int*>(vptr);`} />
        <BookAlert type="warning" message="使用前一定要初始化指针。解引用空指针或无效指针会导致程序崩溃" />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>指针的算术运算</PageTitle>
        <BookCode language="cpp" showLineNumbers code={`// 指针加减运算
int arr[] = {10, 20, 30, 40, 50};
int* p = arr;

p++;        // 指向下一个元素(20)
p--;        // 指向前一个元素(10)
p += 2;     // 前进2个元素(30)

// 指针比较
int* start = arr;
int* end = arr + 5;
while (start < end) {
    cout << *start << " ";
    start++;
}

// 指针与 const
const int* p1;     // 指向常量，不能修改值
int* const p2;     // 常量指针，不能修改指向
const int* const p3; // 都不能修改`} />
        <BookParagraph>指针注意事项：</BookParagraph>
        <BookList items={[
          '指针运算要小心边界问题',
          '释放后的指针应立即设为 nullptr',
          'const 位置不同含义不同',
          '数组名在表达式中退化为指针',
        ]} />
      </div>
    ),
  },
  {
    label: '动态内存',
    left: (
      <div className="space-y-4">
        <PageTitle>动态内存分配</PageTitle>
        <BookCode language="cpp" showLineNumbers code={`// 分配单个对象
int* p1 = new int;
*p1 = 10;
delete p1;

int* p2 = new int(42);  // 分配并初始化
delete p2;

// 分配数组
int* arr = new int[10];
arr[0] = 1;
delete[] arr;  // 数组用 delete[]

// 分配二维数组
int** matrix = new int*[3];
for (int i = 0; i < 3; i++)
    matrix[i] = new int[4];
// 释放
for (int i = 0; i < 3; i++)
    delete[] matrix[i];
delete[] matrix;`} />
        <BookAlert type="warning" message="new/delete 必须配对使用。数组用 delete[]，单个对象用 delete" />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>智能指针简介</PageTitle>
        <BookParagraph>C++11 引入了智能指针，自动管理内存，避免内存泄漏：</BookParagraph>
        <BookCode language="cpp" showLineNumbers code={`#include <memory>

// unique_ptr：独占所有权
unique_ptr<int> uptr(new int(42));
// 不能复制，只能移动
unique_ptr<int> uptr2 = move(uptr);

// shared_ptr：共享所有权
shared_ptr<int> sptr1 = make_shared<int>(10);
shared_ptr<int> sptr2 = sptr1;  // 引用计数+1
// 最后一个shared_ptr销毁时自动释放

// weak_ptr：弱引用，不增加计数
weak_ptr<int> wptr = sptr1;`} />
        <BookAlert type="info" message="优先使用智能指针代替裸 new/delete，可以有效避免内存泄漏。详细内容参见智能指针章节" />
      </div>
    ),
  },
  {
    label: '指针与函数',
    left: (
      <div className="space-y-4">
        <PageTitle>函数指针</PageTitle>
        <BookCode language="cpp" showLineNumbers code={`// 函数指针声明
int (*funcPtr)(int, int);

// 指向具体函数
int add(int a, int b) { return a + b; }
funcPtr = add;
cout << funcPtr(3, 4);  // 输出7

// 函数指针作为参数
void compute(int (*op)(int, int),
             int x, int y) {
    cout << op(x, y) << endl;
}
compute(add, 3, 4);  // 7
compute(sub, 3, 4);  // -1

// 使用 using 简化类型
using OpFunc = int(*)(int, int);
void compute(OpFunc op, int x, int y);`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>指针数组与数组指针</PageTitle>
        <BookCode language="cpp" showLineNumbers code={`// 指针数组：元素为指针的数组
int a = 1, b = 2, c = 3;
int* arr[3] = {&a, &b, &c};

// 数组指针：指向数组的指针
int matrix[3][4];
int (*ptr)[4] = matrix;  // 指向4个int的数组

// 多级指针
int value = 42;
int* ptr1 = &value;
int** ptr2 = &ptr1;   // 指针的指针
int*** ptr3 = &ptr2;  // 三级指针
cout << ***ptr3;      // 输出42`} />
      </div>
    ),
  },
  {
    label: '练习例题',
    left: (
      <div className="space-y-4">
        <PageTitle>字符串反转器</PageTitle>
        <div className="p-3 bg-paper-200/80 rounded-md border border-paper-300">
          <p className="text-sm text-ink font-medium mb-1">题目描述</p>
          <BookList items={[
            '使用指针实现字符串反转函数',
            '不使用数组下标，仅通过指针操作',
            '处理中英文混合字符串',
            '考虑空指针和空字符串的边界情况',
          ]} />
        </div>
        <TagGrid items={['指针运算', '解引用', '指针遍历', '边界检查']} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>参考代码</PageTitle>
        <BookCode language="cpp" showLineNumbers code={`void reverseString(char* str) {
    if (str == nullptr) return;

    char* start = str;
    char* end = str;

    // 找到字符串末尾
    while (*end != '\\0') end++;
    end--;  // 指向最后一个字符

    // 用指针交换首尾字符
    while (start < end) {
        char temp = *start;
        *start = *end;
        *end = temp;
        start++;
        end--;
    }
}

int main() {
    char text[] = "Hello C++!";
    reverseString(text);
    cout << text;  // !++C olleH
}`} />
        <BookAlert type="info" message={'运行结果："Hello C++!" → "!++C olleH"'} />
      </div>
    ),
  },
]

export default function PointersPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
