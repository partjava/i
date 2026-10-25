'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import { PageTitle, BookParagraph, BookCode, BookAlert, BookList, TagGrid } from '@shared/components/ui/book/BookContent'

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
<BookParagraph>{"原事件声明需要放在类内，多个类与顶级语句的示例需按独立片段组织；Student与Person是教学模型。新增内容解释引用、延迟执行和异步边界，不把片段混拼为一个可直接运行文件。"}</BookParagraph>
        <BookParagraph>C#是强类型语言，支持多种基本数据类型。变量在使用前必须先声明类型。</BookParagraph>
<BookParagraph>{"强类型限制操作的形式，不能自动限制所有业务值。成绩能存入int仍可能超出零到一百，非空string仍可能全是空格。把规范化和校验放在明确入口，并用固定边界输入测试，才能从“能编译”走向“对象始终满足规则”。"}</BookParagraph>
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
<BookParagraph>{"对象变量赋值可能复制引用而非复制实体，多个变量修改同一对象会互相可见。继承需要满足可替换关系，复用逻辑也可通过组合实现；先明确身份、状态和职责，再选择类层次，避免为了演示面向对象而制造无必要的继承链。"}</BookParagraph>
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
{ label: "类型约束与业务不变量", left: (<div className="space-y-4">
<PageTitle>{"类型约束与业务不变量"}</PageTitle>
<BookParagraph>{"int能表达很多整数，却不能保证成绩位于零到一百、任务标题非空或金额非负。类型系统限制可执行操作，业务校验限制合法状态，两者互补。将构造或修改入口集中到少数方法，可以防止对象在多个地方被写成无效值。可空引用标注帮助发现可能缺失的数据，但开启分析后仍需处理数据库、网络和用户输入的现实边界；编译没有警告也不等于输入已被验证。"}</BookParagraph>
</div>), right: (<div className="space-y-4">
<PageTitle>{"推演一：复制引用不会复制对象"}</PageTitle>
<BookParagraph>{"创建一名学生后，把变量a赋给b，两个变量可能指向同一对象；通过b修改Score，a看到的分数也改变。若UI或测试把这种赋值当成快照，会在比较“旧数据”与“新数据”时得到错误结论。独立快照需要明确复制语义，包含集合和嵌套对象时还要判断浅拷贝是否足够。值类型与引用类型的差异首先关乎值与身份，不能简单背成“一个总在栈，一个总在堆”。"}</BookParagraph>
</div>) },
{ label: "集合查询的执行边界", left: (<div className="space-y-4">
<PageTitle>{"集合查询的执行边界"}</PageTitle>
<BookParagraph>{"LINQ查询表达式描述筛选和投影，许多操作在枚举时才真正执行；ToList会把当前结果物化成列表。对内存集合的查询与数据库IQueryable查询还可能使用不同执行提供者，支持的方法和成本不同。下表按时机与来源区分行为，避免把一个C#方法能在内存执行误认为它一定能翻译成SQL。修改数据源后再次枚举，结果可能变化，测试应明确希望得到实时视图还是固定快照。"}</BookParagraph>
<div className="overflow-x-auto"><table className="w-full text-sm border-collapse"><thead><tr><th className="border-b p-2 text-left">{"形式"}</th><th className="border-b p-2 text-left">{"执行时点"}</th><th className="border-b p-2 text-left">{"应注意"}</th></tr></thead><tbody><tr><td className="border-b p-2 align-top">{"Where查询"}</td><td className="border-b p-2 align-top">{"常在枚举时"}</td><td className="border-b p-2 align-top">{"数据源变化影响结果"}</td></tr><tr><td className="border-b p-2 align-top">{"ToList快照"}</td><td className="border-b p-2 align-top">{"调用时枚举物化"}</td><td className="border-b p-2 align-top">{"元素仍可能是可变引用"}</td></tr><tr><td className="border-b p-2 align-top">{"内存IEnumerable"}</td><td className="border-b p-2 align-top">{"本机逻辑执行"}</td><td className="border-b p-2 align-top">{"CPU与内存成本"}</td></tr><tr><td className="border-b p-2 align-top">{"数据库IQueryable"}</td><td className="border-b p-2 align-top">{"提供者翻译后执行"}</td><td className="border-b p-2 align-top">{"SQL可翻译性与查询次数"}</td></tr></tbody></table></div>
</div>), right: (<div className="space-y-4">
<PageTitle>{"延迟执行的可观察小实验"}</PageTitle>
<BookParagraph>{"以下为完整现代C#控制台片段，需要System、Collections.Generic和Linq命名空间，无第三方包。先定义查询和物化快照，再加入4；预期查询枚举输出2,4，快照输出2。它解释为什么缓存一个IEnumerable变量并不等于缓存结果。若查询包含数据库访问，重复枚举还可能重复发起请求；应按需求物化并控制范围，不能为了方便把整张大表都提前读入内存。"}</BookParagraph>
<BookCode language="csharp" showLineNumbers code={"using System;\nusing System.Collections.Generic;\nusing System.Linq;\nvar numbers = new List<int> { 1, 2, 3 };\nvar query = numbers.Where(n => n % 2 == 0);\nvar snapshot = query.ToList();\nnumbers.Add(4);\nConsole.WriteLine(string.Join(\",\", query));\nConsole.WriteLine(string.Join(\",\", snapshot));"} />
</div>) },
{ label: "推演二：事件订阅也会延长寿命", left: (<div className="space-y-4">
<PageTitle>{"推演二：事件订阅也会延长寿命"}</PageTitle>
<BookParagraph>{"长生命周期发布者保存短生命周期订阅者的方法委托，订阅者可能因此一直可达。页面关闭后若忘记解除订阅，事件仍可能调用已失效对象。订阅和退订应由同一个拥有者管理，匿名lambda需要保存引用才便于精确移除。事件机制解决通知耦合，不自动解决生命周期与并发；回调在哪个线程发生取决于发布方，UI订阅者不能假定事件永远从界面线程发出。"}</BookParagraph>
</div>), right: (<div className="space-y-4">
<PageTitle>{"async不是创建新线程的同义词"}</PageTitle>
<BookParagraph>{"异步方法遇到未完成的等待时可把控制权交还调用者，适合IO等待；CPU密集计算仍要消耗执行资源。不要用.Result或.Wait在同步上下文中阻塞异步流程，也不要把所有异常都藏在async void。通常返回Task让调用者等待和处理异常，事件处理器是常见特殊入口。取消通过CancellationToken等契约协作传递，捕获取消时应与真正失败区分，不能把被用户取消的操作记录成服务故障。"}</BookParagraph>
</div>) },
{ label: "练习：用规则解释输出", left: (<div className="space-y-4">
<PageTitle>{"练习：用规则解释输出"}</PageTitle>
<BookParagraph>{"写一组成绩对象，先定义高分查询，再修改一个对象并追加一行，分别打印延迟查询与物化快照。验收：逐行解释输出差异，证明快照列表仍可能引用同一可变对象，设计需要的复制策略。再为事件发布者写订阅与退订流程，保证退出后不再收到回调。参考思路：分清变量、对象、集合容器和查询这四层，不用“复制了变量”替代对对象身份的分析。"}</BookParagraph>
</div>), right: (<div className="space-y-4">
<PageTitle>{"泛型、接口与组合的实际价值"}</PageTitle>
<BookParagraph>{"IEnumerable表达可枚举能力，IReadOnlyList表达可按位置读取，并不保证底层对象永远不变；接口应只暴露调用方需要的能力。泛型让集合和算法保持类型信息，减少不安全转换。继承适合稳定的替换关系，业务扩展也常用组合，例如让任务服务接收时钟与仓库。先选清晰契约再考虑抽象层数量，避免为了体现面向对象而创建空接口和复杂继承链，反而让规则难以定位。"}</BookParagraph>
<BookList items={[<a key="https://learn.microsoft.com/en-us/dotnet/csharp/linq/get-started/introduction-to-linq-queries" href="https://learn.microsoft.com/en-us/dotnet/csharp/linq/get-started/introduction-to-linq-queries" target="_blank" rel="noopener noreferrer" className="underline">{"C# LINQ查询入门"}</a>]} />
</div>) },
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
