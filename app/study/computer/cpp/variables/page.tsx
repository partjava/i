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
  BookDivider,
} from '@/app/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: 'C++编程',
  chapterTitle: '变量和数据类型',
  chapterNumber: 3,
  totalChapters: 18,
  subjectHref: '/study/computer/cpp',
  prevChapter: { label: '基础语法', href: '/study/computer/cpp/syntax' },
  nextChapter: { label: '运算符', href: '/study/computer/cpp/operators' },
  theme: THEMES.computer,
}

const SPREADS = [
  // ===== 跨页 1: 基本数据类型 =====
  {
    label: '基本数据类型',
    left: (
      <div className="space-y-4">
        <PageTitle>整数类型</PageTitle>
        <BookCode language="cpp" showLineNumbers code={`// 整数类型及其范围
short int shortNum;           // 通常 16 位
int normalNum;               // 通常 32 位
long int longNum;            // 至少 32 位
long long int longlongNum;   // 至少 64 位

// 无符号类型
unsigned short ushortNum;
unsigned int uintNum;
unsigned long ulongNum;

// 实际使用示例
int age = 25;
unsigned int count = 1000;
long long bigNumber = 9223372036854775807LL;`} />
        <BookAlert type="info" message="整数类型用于存储整数值，不同类型有不同的取值范围。无符号类型只能存储非负数" />
        <BookDivider />
        <PageTitle>浮点类型</PageTitle>
        <BookCode language="cpp" showLineNumbers code={`// 浮点类型
float f = 3.14f;           // 单精度浮点数，通常 32 位
double d = 3.14159;        // 双精度浮点数，通常 64 位
long double ld = 3.14159L; // 扩展精度浮点数

// 科学记数法
double speed = 3e8;        // 3 × 10^8
float small = 1.23e-4f;    // 0.000123

// 精度示例
float pi_f = 3.141592653589793f;  // 可能会损失精度
double pi_d = 3.141592653589793;  // 保持更高精度`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>字符和布尔类型</PageTitle>
        <BookCode language="cpp" showLineNumbers code={`// 字符类型
char ch = 'A';            // 单个字符
char newline = '\\n';     // 转义字符
wchar_t wide = L'世';     // 宽字符

// 布尔类型
bool isValid = true;
bool isEmpty = false;

// 字符的ASCII值
int ascii = (int)ch;      // 获取字符的ASCII值
char fromAscii = 65;      // 'A'的ASCII值`} />
        <BookDivider />
        <h3 className="text-sm font-medium text-ink mb-2">数据类型总结</h3>
        <div className="overflow-hidden rounded-md border border-paper-300 text-sm">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-ink text-paper-100/90 text-xs">
                <th className="px-3 py-2 font-medium">类型</th>
                <th className="px-3 py-2 font-medium">关键字</th>
                <th className="px-3 py-2 font-medium">大小</th>
                <th className="px-3 py-2 font-medium">范围</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-paper-300 text-xs text-ink-light">
              {[
                ['短整型', 'short', '2 字节', '-32K ~ 32K'],
                ['整型', 'int', '4 字节', '-21亿 ~ 21亿'],
                ['长整型', 'long', '4/8 字节', '平台相关'],
                ['浮点型', 'float', '4 字节', '~7位精度'],
                ['双精度', 'double', '8 字节', '~15位精度'],
                ['字符型', 'char', '1 字节', '-128 ~ 127'],
                ['布尔型', 'bool', '1 字节', 'true / false'],
              ].map((row, i) => (
                <tr key={i} className="hover:bg-paper-200/50">
                  <td className="px-3 py-2 text-ink">{row[0]}</td>
                  <td className="px-3 py-2 font-code text-amber-dark">{row[1]}</td>
                  <td className="px-3 py-2">{row[2]}</td>
                  <td className="px-3 py-2">{row[3]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    ),
  },

  // ===== 跨页 2: 变量声明 =====
  {
    label: '变量声明',
    left: (
      <div className="space-y-4">
        <PageTitle>变量声明与初始化</PageTitle>
        <BookCode language="cpp" showLineNumbers code={`// 基本声明
int number;         // 声明变量
int value = 42;     // 声明并初始化

// 多个变量声明
int x, y, z;
int a = 1, b = 2, c = 3;

// 常量声明
const double PI = 3.14159;
const int MAX_SIZE = 100;

// 类型推导（C++11）
auto num = 42;      // int
auto pi = 3.14;     // double
auto name = "John"; // const char*`} />
        <BookAlert type="info" message="使用 const 声明的常量不可修改，auto 关键字自动推导变量类型" />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>变量作用域</PageTitle>
        <BookCode language="cpp" showLineNumbers code={`// 全局变量
int globalVar = 100;

void function() {
    // 局部变量
    int localVar = 200;

    // 块作用域
    {
        int blockVar = 300;
        // blockVar 只在这个块内可用
    }

    // 静态局部变量
    static int staticVar = 400;
    // staticVar 在函数调用之间保持其值
}`} />
        <h3 className="text-sm font-medium text-ink mt-2 mb-1">作用域规则</h3>
        <BookList items={[
          '全局变量在整个程序中可访问',
          '局部变量只在其声明的函数内可用',
          '块作用域变量只在其声明的块内可用',
          '静态局部变量在函数调用之间保持其值',
        ]} />
      </div>
    ),
  },

  // ===== 跨页 3: 类型转换 =====
  {
    label: '类型转换',
    left: (
      <div className="space-y-4">
        <PageTitle>隐式类型转换</PageTitle>
        <BookParagraph>编译器自动进行的类型转换，通常发生在不同类型混合运算时：</BookParagraph>
        <BookCode language="cpp" showLineNumbers code={`// 自动类型转换
int i = 42;
double d = i;      // int 转 double

char ch = 'A';
int ascii = ch;    // char 转 int

// 可能损失精度的转换
double pi = 3.14159;
int intPi = pi;    // 3（小数部分被截断）

// 算术运算中的转换
int x = 5;
double y = 2.0;
double result = x / y;  // x 被转换为 double`} />
        <BookAlert type="warning" message="隐式转换可能导致精度损失，从大范围到小范围的转换需格外小心" />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>显式类型转换</PageTitle>
        <BookParagraph>C++ 提供了多种显式转换方式，推荐使用 C++ 风格的转换操作符：</BookParagraph>
        <BookCode language="cpp" showLineNumbers code={`// C风格转换
double d = 3.14;
int i1 = (int)d;            // C风格转换

// C++风格转换
int i2 = static_cast<int>(d);   // 更安全的C++风格转换

// 其他C++转换操作符
const int constant = 100;
int* ptr = const_cast<int*>(&constant);  // 移除const

char* str = "Hello";
void* vptr = reinterpret_cast<void*>(str);  // 指针类型转换`} />
        <BookAlert type="info" message="优先使用 C++ 风格的 static_cast，避免使用 C 风格转换">
          <BookList items={['static_cast — 常规类型转换', 'const_cast — 移除 const 属性', 'reinterpret_cast — 指针类型转换', 'dynamic_cast — 类层次转换']} tight />
        </BookAlert>
      </div>
    ),
  },

  // ===== 跨页 4: 练习 =====
  {
    label: '练习例题',
    left: (
      <div className="space-y-4">
        <PageTitle>温度转换器</PageTitle>
        <div className="p-4 bg-paper-200/80 rounded-md border border-paper-300">
          <p className="text-sm text-ink font-medium mb-2">题目描述</p>
          <BookList items={[
            '声明变量存储摄氏度和华氏度',
            '读取用户输入的摄氏度',
            '将摄氏度转换为华氏度（公式：F = C × 9/5 + 32）',
            '输出转换结果，保留两位小数',
          ]} />
        </div>
        <h3 className="text-sm font-medium text-ink">知识点</h3>
        <TagGrid items={['double类型', '输入输出', '算术运算', '输出格式控制', '浮点数精度']} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>参考代码</PageTitle>
        <BookCode language="cpp" showLineNumbers code={`#include <iostream>
#include <iomanip>  // 用于设置输出精度
using namespace std;

int main() {
    // 声明变量
    double celsius, fahrenheit;

    // 获取用户输入
    cout << "请输入摄氏度: ";
    cin >> celsius;

    // 转换温度
    fahrenheit = celsius * 9.0/5.0 + 32;

    // 设置输出格式并显示结果
    cout << fixed << setprecision(2);
    cout << celsius << " 摄氏度 = "
         << fahrenheit << " 华氏度" << endl;

    return 0;
}`} />
        <BookAlert type="info" message={'运行示例：输入 37.5 → 输出 "37.50 摄氏度 = 99.50 华氏度"'} />
        <BookAlert type="warning" message="使用 double 保持精度，除法时用 9.0 避免整数除法，使用 setprecision 控制输出格式" />
      </div>
    ),
  },
]

export default function VariablesPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
