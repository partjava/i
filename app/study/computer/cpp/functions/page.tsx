'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import {
  PageTitle,
  BookParagraph,
  BookCode,
  BookAlert,
  BookList,
  BookDivider,
  TagGrid,
} from '@/app/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: 'C++编程',
  chapterTitle: '函数',
  chapterNumber: 6,
  totalChapters: 18,
  subjectHref: '/study/computer/cpp',
  prevChapter: { label: '控制流程', href: '/study/computer/cpp/control' },
  nextChapter: { label: '数组和字符串', href: '/study/computer/cpp/arrays' },
  theme: THEMES.computer,
}

const SPREADS = [
  // ===== 跨页 1: 基本函数 =====
  {
    label: '基本函数',
    left: (
      <div className="space-y-4">
        <PageTitle>函数定义与声明</PageTitle>
        <BookCode language="cpp" showLineNumbers code={`// 函数声明（原型）
int add(int a, int b);
void printMessage(string msg = "Hello");
double calculateArea(double radius);

// 函数定义
int add(int a, int b) {
    return a + b;
}

void printMessage(string msg) {
    cout << msg << endl;
}

double calculateArea(double radius) {
    const double PI = 3.14159;
    return PI * radius * radius;
}`} />
        <BookAlert type="info" message="函数声明告诉编译器函数的接口，函数定义包含具体实现。声明可以多次，定义只能一次" />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>内联函数与引用参数</PageTitle>
        <BookCode language="cpp" showLineNumbers code={`// 内联函数
inline int max(int a, int b) {
    return (a > b) ? a : b;
}

// 多个返回值（使用引用参数）
void getMinMax(const vector<int>& numbers,
               int& min, int& max) {
    if (numbers.empty()) return;
    min = max = numbers[0];
    for (int num : numbers) {
        if (num < min) min = num;
        if (num > max) max = num;
    }
}`} />
        <BookAlert type="info" message="内联函数可提高性能但只适用于简单函数。引用参数可以「返回」多个值" />
        <BookParagraph>函数使用要点：</BookParagraph>
        <BookList items={[
          '声明在前，定义在后，或定义直接代替声明',
          '默认参数从右向左提供',
          '内联函数适用于频繁调用的小函数',
          '引用参数避免拷贝，适合返回多个值',
        ]} />
      </div>
    ),
  },

  // ===== 跨页 2: 函数重载 =====
  {
    label: '函数重载',
    left: (
      <div className="space-y-4">
        <PageTitle>基于参数的重载</PageTitle>
        <BookCode language="cpp" showLineNumbers code={`// 基于参数类型的重载
void print(int number) {
    cout << "整数: " << number << endl;
}
void print(double number) {
    cout << "浮点数: " << number << endl;
}
void print(string text) {
    cout << "字符串: " << text << endl;
}

// 基于参数数量的重载
int sum(int a, int b) {
    return a + b;
}
int sum(int a, int b, int c) {
    return a + b + c;
}`} />
        <BookAlert type="info" message="重载函数必须有不同的参数列表。仅返回类型不同不构成重载" />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>const 重载与使用</PageTitle>
        <BookCode language="cpp" showLineNumbers code={`// 基于const修饰符的重载
void process(int& number) {
    number++;
    cout << "修改值: " << number << endl;
}
void process(const int& number) {
    cout << "只读值: " << number << endl;
}

// 使用示例
int main() {
    print(42);        // print(int)
    print(3.14);      // print(double)
    print("Hello");   // print(string)

    cout << sum(1, 2) << endl;      // 3
    cout << sum(1, 2, 3) << endl;   // 6

    int x = 10;
    process(x);           // 非const版本
    const int y = 20;
    process(y);          // const版本
}`} />
        <BookAlert type="warning" message="避免创建可能引起歧义的重载。const 修饰符可以构成重载" />
      </div>
    ),
  },

  // ===== 跨页 3: 递归函数 =====
  {
    label: '递归函数',
    left: (
      <div className="space-y-4">
        <PageTitle>经典递归示例</PageTitle>
        <BookCode language="cpp" showLineNumbers code={`// 阶乘计算
int factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

// 斐波那契数列
int fibonacci(int n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) +
           fibonacci(n - 2);
}

// 二分查找
int binarySearch(const vector<int>& arr,
    int target, int left, int right) {
    if (left > right) return -1;
    int mid = left + (right - left) / 2;
    if (arr[mid] == target) return mid;
    if (arr[mid] > target)
        return binarySearch(arr, target, left, mid - 1);
    return binarySearch(arr, target, mid + 1, right);
}`} />
        <BookAlert type="info" message="递归必须有基本情况（终止条件），每次调用向基本情况靠近。注意递归深度防栈溢出" />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>汉诺塔问题</PageTitle>
        <BookCode language="cpp" showLineNumbers code={`// 汉诺塔
void hanoi(int n, char from,
           char aux, char to) {
    if (n == 1) {
        cout << "移动圆盘 1 从 "
             << from << " 到 " << to << endl;
        return;
    }
    hanoi(n - 1, from, to, aux);
    cout << "移动圆盘 " << n << " 从 "
         << from << " 到 " << to << endl;
    hanoi(n - 1, aux, from, to);
}`} />
        <BookParagraph>递归的使用场景：</BookParagraph>
        <BookList items={[
          '分治算法（快速排序、归并排序）',
          '树的遍历（前序、中序、后序）',
          '图的深度优先搜索',
          '回溯算法（八皇后、数独）',
        ]} />
        <BookAlert type="warning" message="某些情况下可用循环代替递归以提高性能。递归过深会导致栈溢出" />
      </div>
    ),
  },

  // ===== 跨页 4: 练习 =====
  {
    label: '练习例题',
    left: (
      <div className="space-y-4">
        <PageTitle>例题1：科学计算器</PageTitle>
        <div className="p-3 bg-paper-200/80 rounded-md border border-paper-300">
          <p className="text-sm text-ink font-medium mb-1">题目描述</p>
          <BookList items={[
            '基本运算：加、减、乘、除',
            '数学函数：幂运算、平方根、阶乘',
            '使用函数重载处理不同类型输入',
            '包含输入验证和错误处理',
          ]} />
        </div>
        <BookDivider />
        <PageTitle>例题2：文本分析器</PageTitle>
        <div className="p-3 bg-paper-200/80 rounded-md border border-paper-300">
          <p className="text-sm text-ink font-medium mb-1">题目描述</p>
          <BookList items={[
            '统计字符数、单词数和行数',
            '查找特定单词或短语',
            '统计单词出现频率',
            '支持大小写敏感/不敏感搜索',
          ]} />
        </div>
        <TagGrid items={['函数重载', '递归', '默认参数', '字符串处理', 'STL map']} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>计算器参考代码</PageTitle>
        <BookCode language="cpp" showLineNumbers code={`class Calculator {
public:
    double add(double a, double b) { return a + b; }
    int add(int a, int b) { return a + b; }
    double divide(double a, double b) {
        if (b == 0) throw "除数不能为零";
        return a / b;
    }
    double power(double base, int exp) {
        return pow(base, exp);
    }
    int factorial(int n) {
        if (n < 0) throw "阶乘不能为负数";
        if (n <= 1) return 1;
        return n * factorial(n - 1);
    }
};

int main() {
    Calculator calc;
    cout << "10 + 5 = " << calc.add(10, 5) << endl;
    cout << "2^3 = " << calc.power(2, 3) << endl;
    cout << "5! = " << calc.factorial(5) << endl;
}`} />
        <BookAlert type="info" message={'运行输出：10+5=15，2^3=8，5!=120'} />
      </div>
    ),
  },
]

export default function FunctionsPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
