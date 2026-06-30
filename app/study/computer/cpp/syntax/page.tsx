'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import {
  PageTitle,
  BookParagraph,
  BookCode,
  BookAlert,
  BookList,
  BookDivider,
} from '@shared/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: 'C++编程',
  chapterTitle: '基础语法',
  chapterNumber: 2,
  totalChapters: 18,
  subjectHref: '/study/computer/cpp',
  prevChapter: { label: '开发环境配置', href: '/study/computer/cpp/setup' },
  nextChapter: { label: '变量和数据类型', href: '/study/computer/cpp/variables' },
  theme: THEMES.computer,
}

const SPREADS = [
  // ===== 跨页 1: 程序结构 =====
  {
    label: '程序结构',
    left: (
      <div className="space-y-4">
        <PageTitle>C++ 程序基本结构</PageTitle>
        <BookParagraph>
          一个 C++ 程序由函数、变量、语句和表达式组成。最简单的 C++ 程序必须包含一个 <code className="px-1 py-0.5 bg-paper-200 rounded text-xs font-code text-amber-dark">main()</code> 函数，它是程序的入口。
        </BookParagraph>
        <BookCode
          language="cpp"
          showLineNumbers
         
          code={`#include <iostream>   // 预处理指令
using namespace std;     // 使用标准命名空间

int main() {             // 主函数
    cout << "你好" << endl;  // 输出语句
    return 0;            // 返回值
}`}
        />
        <BookAlert type="info" message="main() 函数是每个 C++ 程序的入口，程序从这里开始执行" />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>语句与注释</PageTitle>
        <BookParagraph>每条语句以分号 <code className="px-1 py-0.5 bg-paper-200 rounded text-xs font-code">;</code> 结束。注释用于解释代码，不会被编译执行。</BookParagraph>
        <BookCode
          language="cpp"
          code={`// 单行注释

/*
  多行注释
  可以写多行
*/

#include <iostream>
int main() {
    std::cout << "Hello";
    return 0; // 行尾注释
}`}
        />
        <div>
          <h3 className="text-sm font-medium text-ink mt-4 mb-2">注释规范</h3>
          <BookList items={[
            '单行注释用 //，放在代码上方或行尾',
            '多行注释用 /* */，用于大段说明',
            '不要注释显而易见的代码',
          ]} />
        </div>
      </div>
    ),
  },

  // ===== 跨页 2: 输入输出 =====
  {
    label: '输入输出',
    left: (
      <div className="space-y-4">
        <PageTitle>标准输出 (cout)</PageTitle>
        <BookParagraph>
          <code className="px-1 py-0.5 bg-paper-200 rounded text-xs font-code text-amber-dark">cout</code> 用于向控制台输出内容。结合 <code className="px-1 py-0.5 bg-paper-200 rounded text-xs font-code text-amber-dark">&lt;&lt;</code> 运算符，可以输出字符串和变量。
        </BookParagraph>
        <BookCode
          language="cpp"
          showLineNumbers
          code={`int age = 18;
cout << "年龄：" << age;
// 输出：年龄：18

cout << "第一行" << endl;
cout << "第二行";
// endl 换行

cout << "a=" << 10
     << ", b=" << 20;
// 链式输出`}
        />
        <BookAlert type="info" message="endl 既换行又刷新缓冲区，仅换行可以用 \\n" />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>标准输入 (cin)</PageTitle>
        <BookParagraph>
          <code className="px-1 py-0.5 bg-paper-200 rounded text-xs font-code text-amber-dark">cin</code> 从键盘读取输入，结合 <code className="px-1 py-0.5 bg-paper-200 rounded text-xs font-code text-amber-dark">&gt;&gt;</code> 运算符存入变量。
        </BookParagraph>
        <BookCode
          language="cpp"
          showLineNumbers
          code={`int a, b;
cout << "请输入两个数：";
cin >> a >> b;
cout << "和：" << a + b;`}
        />
        <BookAlert type="warning" message="cin 遇到空格会停止读取，读取一行用 getline()" />
        <BookDivider />
        <div>
          <h3 className="text-sm font-medium text-ink mb-2">常用控制符</h3>
          <BookList items={[
            'endl — 换行并刷新',
            '\\n — 换行（更高效）',
            '\\t — 制表符对齐',
          ]} />
        </div>
      </div>
    ),
  },

  // ===== 跨页 3: 数据类型 =====
  {
    label: '数据类型',
    left: (
      <div className="space-y-4">
        <PageTitle>基本数据类型</PageTitle>
        <BookParagraph>C++ 提供丰富的基本数据类型：</BookParagraph>
        <div className="overflow-hidden rounded-md border border-paper-300 text-sm">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-ink text-paper-100/90 text-xs">
                <th className="px-3 py-2 font-medium">类型</th>
                <th className="px-3 py-2 font-medium">关键字</th>
                <th className="px-3 py-2 font-medium">大小</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-paper-300 text-xs text-ink-light">
              {[
                ['整型', 'int', '4 字节'],
                ['短整型', 'short', '2 字节'],
                ['长整型', 'long', '4/8 字节'],
                ['浮点型', 'float', '4 字节'],
                ['双精度', 'double', '8 字节'],
                ['字符型', 'char', '1 字节'],
                ['布尔型', 'bool', '1 字节'],
                ['无值', 'void', '—'],
              ].map(([desc, type, size], i) => (
                <tr key={i} className="hover:bg-paper-200/50">
                  <td className="px-3 py-2 text-ink">{desc}</td>
                  <td className="px-3 py-2 font-code text-amber-dark">{type}</td>
                  <td className="px-3 py-2">{size}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>类型示例</PageTitle>
        <BookCode
          language="cpp"
          showLineNumbers
         
          code={`int     age = 20;        // 整型
float   pi = 3.14f;       // 单精度
double  price = 99.99;    // 双精度
char    grade = 'A';      // 字符（单引号）
bool    isOk = true;      // 布尔值
string  name = "小明";    // 字符串（需 #include <string>）`}
        />
        <BookAlert type="info" message="C++ 是静态类型语言，变量声明后类型不可变" />
        <BookParagraph>
          使用 <code className="px-1 py-0.5 bg-paper-200 rounded text-xs font-code text-amber-dark">sizeof()</code> 可以查看类型在当前平台占用的字节数。
        </BookParagraph>
      </div>
    ),
  },
]

export default function SyntaxPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
