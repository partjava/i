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
} from '@shared/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '软件工程',
  chapterTitle: 'C#基础与语法',
  chapterNumber: 3,
  totalChapters: 10,
  subjectHref: '/study/se/dotnet',
  prevChapter: { label: '开发环境配置', href: '/study/se/dotnet/setup' },
  nextChapter: { label: 'ASP.NET Web开发', href: '/study/se/dotnet/web' },
  theme: THEMES.software,
}

const SPREADS = [
  {
    label: '基本语法',
    left: (
      <div className="space-y-4">
        <PageTitle>基本语法与数据类型</PageTitle>
        <BookParagraph>C#是强类型语言，支持多种基本数据类型。变量在使用前必须先声明类型。</BookParagraph>
        <BookCode language="csharp" showLineNumbers code={`int a = 10;
string name = "Tom";
bool isActive = true;
double price = 99.99;
char grade = 'A';

// 常量定义
const double PI = 3.14159;

// 类型推断
var message = "Hello C#";`} />
        <BookAlert type="info" message="var 关键字用于隐式类型推断，变量类型由编译器根据初始值确定" />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>面向对象编程</PageTitle>
        <BookParagraph>C#是面向对象的语言，核心概念包括类、对象、封装、继承和多态。</BookParagraph>
        <BookCode language="csharp" showLineNumbers code={`public class Person {
    public string Name { get; set; }
    public int Age { get; set; }

    public void SayHello() {
        Console.WriteLine($"Hello, {Name}");
    }
}

// 使用
var p = new Person { Name = "Tom", Age = 20 };
p.SayHello();`} />
        <TagGrid items={['类', '对象', '属性', '方法', '封装', '继承']} />
      </div>
    ),
  },
  {
    label: '高级特性',
    left: (
      <div className="space-y-4">
        <PageTitle>委托与事件</PageTitle>
        <BookParagraph>委托是一种引用方法的类型，事件基于委托实现，用于发布-订阅模式。</BookParagraph>
        <BookCode language="csharp" showLineNumbers code={`// 声明委托
public delegate void Notify(string msg);

// 声明事件
public event Notify OnNotify;

// 使用
public class Publisher {
    public event EventHandler DataChanged;
    public void Update() {
        DataChanged?.Invoke(this, EventArgs.Empty);
    }
}`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>LINQ用法</PageTitle>
        <BookParagraph>LINQ（Language Integrated Query）是C#中强大的数据查询语法。</BookParagraph>
        <BookCode language="csharp" showLineNumbers code={`List<int> nums = new List<int> {1, 2, 3, 4, 5};

// 查询语法
var even = from n in nums
           where n % 2 == 0
           select n;

// 方法语法
var even2 = nums.Where(n => n % 2 == 0).ToList();

// 更多操作
var sum = nums.Sum();
var first = nums.FirstOrDefault(n => n > 3);`} />
        <BookAlert type="info" message="LINQ 可用于集合、数据库（EF Core）、XML 等多种数据源，是C#的核心特性之一" />
      </div>
    ),
  },
  {
    label: '练习',
    left: (
      <div className="space-y-4">
        <PageTitle>课后练习</PageTitle>
        <div className="p-3 bg-paper-200/80 rounded-md border border-paper-300">
          <p className="text-sm text-ink font-medium mb-1">练习题</p>
          <BookList items={[
            '声明多种类型变量并输出它们的值',
            '定义一个 Student 类，包含 Name 和 Score 属性',
            '使用 LINQ 从列表中筛选出成绩大于80的学生',
            '编写一个简单的事件，模拟按钮点击通知',
          ]} />
        </div>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>参考代码</PageTitle>
        <BookCode language="csharp" showLineNumbers code={`public class Student {
    public string Name { get; set; }
    public int Score { get; set; }
}

var students = new List<Student> {
    new Student { Name = "张三", Score = 85 },
    new Student { Name = "李四", Score = 72 },
    new Student { Name = "王五", Score = 90 }
};

// LINQ 筛选
var top = students.Where(s => s.Score > 80);
foreach (var s in top) {
    Console.WriteLine($"{s.Name}: {s.Score}");
}`} />
        <BookAlert type="success" message="运行结果：张三: 85，王五: 90" />
      </div>
    ),
  },
]

export default function DotnetCSharpPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
