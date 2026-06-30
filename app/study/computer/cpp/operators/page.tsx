'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import {
  PageTitle,
  BookParagraph,
  BookCode,
  BookAlert,
  BookList,
  TagGrid,
  BookDivider,
} from '@shared/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: 'C++编程',
  chapterTitle: '运算符',
  chapterNumber: 4,
  totalChapters: 18,
  subjectHref: '/study/computer/cpp',
  prevChapter: { label: '变量和数据类型', href: '/study/computer/cpp/variables' },
  nextChapter: { label: '控制流程', href: '/study/computer/cpp/control' },
  theme: THEMES.computer,
}

const SPREADS = [
  // ===== 跨页 1: 算术运算符 =====
  {
    label: '算术运算符',
    left: (
      <div className="space-y-4">
        <PageTitle>基本算术运算符</PageTitle>
        <BookCode language="cpp" showLineNumbers code={`// 基本算术运算符
int a = 10, b = 3;

int sum = a + b;      // 加法: 13
int diff = a - b;     // 减法: 7
int prod = a * b;     // 乘法: 30
int quot = a / b;     // 除法: 3（整数除法）
int rem = a % b;      // 取余: 1

// 浮点数运算
double x = 10.5, y = 3.2;
double result = x / y;  // 3.28125（浮点除法）

// 自增和自减
int i = 5;
i++;                // 后缀自增：先使用，再加1
++i;                // 前缀自增：先加1，再使用
i--;                // 后缀自减：先使用，再减1
--i;                // 前缀自减：先减1，再使用`} />
        <BookAlert type="info" message="整数除法会截断小数部分；取余运算只适用于整数；前缀和后缀自增/自减的返回值时机不同" />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>复合赋值运算符</PageTitle>
        <BookCode language="cpp" showLineNumbers code={`int x = 10;

x += 5;     // 等同于 x = x + 5;  结果：15
x -= 3;     // 等同于 x = x - 3;  结果：12
x *= 2;     // 等同于 x = x * 2;  结果：24
x /= 4;     // 等同于 x = x / 4;  结果：6
x %= 4;     // 等同于 x = x % 4;  结果：2

// 位运算的复合赋值
int bits = 0b1010;  // 二进制：1010
bits &= 0b1100;     // 按位与赋值：1000
bits |= 0b0011;     // 按位或赋值：1011
bits ^= 0b0101;     // 按位异或赋值：1110
bits <<= 2;         // 左移赋值：111000
bits >>= 1;         // 右移赋值：11100`} />
      </div>
    ),
  },

  // ===== 跨页 2: 关系和逻辑运算符 =====
  {
    label: '关系与逻辑',
    left: (
      <div className="space-y-4">
        <PageTitle>关系运算符</PageTitle>
        <BookCode language="cpp" showLineNumbers code={`int a = 5, b = 10;

bool isEqual = (a == b);     // 相等：false
bool notEqual = (a != b);    // 不相等：true
bool less = (a < b);         // 小于：true
bool greater = (a > b);      // 大于：false
bool lessEq = (a <= b);      // 小于等于：true
bool greaterEq = (a >= b);   // 大于等于：false

// 浮点数比较
double x = 0.1 + 0.2;
double y = 0.3;
// 不要直接比较浮点数
bool isClose = abs(x - y) < 0.000001;  // 使用误差范围比较`} />
        <BookAlert type="info" message="不要直接用 == 比较浮点数，应使用很小的误差范围（epsilon）来比较" />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>逻辑运算符</PageTitle>
        <BookCode language="cpp" showLineNumbers code={`bool a = true, b = false;

bool andResult = a && b;    // 逻辑与：false
bool orResult = a || b;     // 逻辑或：true
bool notResult = !a;        // 逻辑非：false

// 短路求值
int x = 5;
bool result = (x > 10) && (x++ < 20);  // x++ 不会执行
// x 仍然是 5

// 复杂条件
int age = 25;
bool hasID = true;
bool canVote = (age >= 18) && hasID;  // true

// 多重条件
int score = 85;
bool isPassing = (score >= 60) && (score <= 100);  // true`} />
        <BookAlert type="info" message="支持短路求值：&& 左边为 false 时不计算右边，|| 左边为 true 时不计算右边" />
      </div>
    ),
  },

  // ===== 跨页 3: 位运算符 =====
  {
    label: '位运算符',
    left: (
      <div className="space-y-4">
        <PageTitle>位运算</PageTitle>
        <BookCode language="cpp" showLineNumbers code={`// 位运算示例
int a = 0b1100;  // 二进制：1100
int b = 0b1010;  // 二进制：1010

int andResult = a & b;   // 位与：1000
int orResult = a | b;    // 位或：1110
int xorResult = a ^ b;   // 位异或：0110
int notResult = ~a;      // 位取反：0011

// 移位运算
int num = 8;            // 二进制：1000
int leftShift = num << 1;   // 左移1位：10000 (16)
int rightShift = num >> 1;  // 右移1位：0100 (4)

// 实际应用
// 1. 设置位
int flags = 0;
flags |= (1 << 3);    // 设置第3位为1

// 2. 清除位
flags &= ~(1 << 3);   // 清除第3位

// 3. 检查位
bool isBitSet = (flags & (1 << 3)) != 0;

// 4. 切换位
flags ^= (1 << 3);    // 切换第3位的状态`} />
        <BookAlert type="info" message="位运算常用于标志位操作（如权限控制）、性能优化、数据压缩和硬件控制" />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>运算符优先级</PageTitle>
        <BookParagraph>了解优先级可以避免写出意外的表达式结果：</BookParagraph>
        <div className="p-3 rounded-md bg-paper-200/60 text-xs text-ink-light leading-relaxed">
          <ol className="list-decimal pl-4 space-y-1">
            <li>() [] {'->'} . :: — 成员访问</li>
            <li>! ~ ++ -- + - * & (type) — 一元运算符</li>
            <li>* / % — 乘除取余</li>
            <li>+ - — 加减</li>
            <li>{'<<'} {'>>'} — 移位</li>
            <li>{'<'} {'<='} {'>'} {'>='} — 关系</li>
            <li>== != — 相等性</li>
            <li>&& — 逻辑与</li>
            <li>|| — 逻辑或</li>
            <li>?: — 条件运算符</li>
            <li>= += -= *= /= %= — 赋值</li>
            <li>, — 逗号</li>
          </ol>
        </div>
        <BookAlert type="warning" message="不确定优先级时，用括号明确表达式的计算顺序" />
      </div>
    ),
  },

  // ===== 跨页 4: 练习 =====
  {
    label: '练习例题',
    left: (
      <div className="space-y-4">
        <PageTitle>简单计算器</PageTitle>
        <div className="p-4 bg-paper-200/80 rounded-md border border-paper-300">
          <p className="text-sm text-ink font-medium mb-2">题目描述</p>
          <BookList items={[
            '接收用户输入的两个数字',
            '提供加、减、乘、除、取余五种运算',
            '处理除数为零的情况',
            '使用逻辑运算符进行输入验证',
          ]} />
        </div>
        <h3 className="text-sm font-medium text-ink mt-4">知识点</h3>
        <TagGrid items={['算术运算符', '逻辑运算符', '类型转换', 'switch 语句', '错误处理']} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>参考代码</PageTitle>
        <BookCode language="cpp" showLineNumbers code={`#include <iostream>
using namespace std;

int main() {
    double num1, num2;
    char op;

    cout << "请输入第一个数: ";
    cin >> num1;
    cout << "请输入运算符 (+, -, *, /, %): ";
    cin >> op;
    cout << "请输入第二个数: ";
    cin >> num2;

    // 使用逻辑运算符验证输入
    if (op != '+' && op != '-' && op != '*'
        && op != '/' && op != '%') {
        cout << "无效的运算符！" << endl;
        return 1;
    }

    // 检查除数是否为零
    if ((op == '/' || op == '%') && num2 == 0) {
        cout << "错误：除数不能为零！" << endl;
        return 1;
    }

    switch(op) {
        case '+': cout << num1 << " + " << num2 << " = "
                       << num1 + num2 << endl; break;
        case '-': cout << num1 << " - " << num2 << " = "
                       << num1 - num2 << endl; break;
        case '*': cout << num1 << " * " << num2 << " = "
                       << num1 * num2 << endl; break;
        case '/': cout << num1 << " / " << num2 << " = "
                       << num1 / num2 << endl; break;
        case '%': cout << (int)num1 << " % " << (int)num2
                       << " = " << (int)num1 % (int)num2
                       << endl; break;
    }
    return 0;
}`} />
        <BookAlert type="info" message={'运行示例：10 + 5 = 15'} />
        <BookAlert type="warning" message="取模运算符(%)只能用于整数，需要进行类型转换；注意除数为零的检查" />
      </div>
    ),
  },
]

export default function OperatorsPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
