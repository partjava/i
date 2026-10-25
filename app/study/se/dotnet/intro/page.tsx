'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import { PageTitle, BookParagraph, BookCode, BookAlert, BookList } from '@shared/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '软件工程',
  chapterTitle: '概述',
  chapterNumber: 1,
  totalChapters: 10,
  subjectHref: '/study/se/dotnet',
  nextChapter: { label: '开发环境配置', href: '/study/se/dotnet/setup' },
  theme: THEMES.software,
}

const SPREADS = [
  {
    label: '平台概述',
    left: (
      <div className="space-y-4">
        <PageTitle>.NET平台简介</PageTitle>
<BookParagraph>{"本章区分现代.NET与Windows上的传统.NET Framework。Hello World是完整控制台入口示例；跨平台能力取决于所用框架和系统API，不能由“.NET”名称推断所有桌面程序都可在任意系统运行。"}</BookParagraph>
        <BookParagraph>.NET是由微软开发的跨平台开发框架，支持Web、桌面、移动、云等多种应用场景。</BookParagraph>
<BookParagraph>{"SDK提供构建工具，运行时执行产物，语言表达业务逻辑，它们是不同层次。跨平台能力还受应用框架和系统依赖限制：控制台与Web通常更易迁移，WPF等Windows桌面技术有明确平台边界，不能把所有.NET程序视为可任意跨系统运行。"}</BookParagraph>
        <h3 className="text-sm font-medium text-ink mt-4">发展历程</h3>
        <BookList items={[
          '2002年.NET Framework发布',
          '2016年.NET Core开源，支持跨平台',
          '2020年.NET 5统一平台',
        ]} />
        <BookAlert type="info" message=".NET 现已统一为 .NET 5/6/7/8/9，不再区分 .NET Framework 和 .NET Core" />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>Hello World</PageTitle>
        <BookParagraph>第一个.NET程序，体验C#语言的基本结构。</BookParagraph>
<BookParagraph>{"Hello程序从Main进入并写标准输出，没有网络、数据库和用户校验。把它作为工具链冒烟后，再加入一个能被拒绝的输入，观察解析失败是否有明确结果；编译通过只是第一层成功，不代表所有运行时数据都符合业务规则。"}</BookParagraph>
        <BookCode language="csharp" showLineNumbers code={`using System;
class Program {
    static void Main() {
        Console.WriteLine("Hello, .NET!");
    }
}`} />
        <BookAlert type="success" message="运行后将输出 'Hello, .NET!'，标志着你的.NET开发之旅正式开始" />
      </div>
    ),
  },
{ label: "从C#源码到程序输出", left: (<div className="space-y-4">
<PageTitle>{"从C#源码到程序输出"}</PageTitle>
<BookParagraph>{"C#编译器检查类型并把程序转换成程序集中的中间语言与元数据，运行时负责加载、执行和内存管理，常见执行路径包含即时编译；特定发布方式也可采用提前编译。SDK包含开发所需工具，运行时负责执行已构建应用。不能把.cs文件直接当作平台无关机器码。理解这条链能帮助区分语法错误、缺少运行时、程序集加载失败与程序内部异常。"}</BookParagraph>
</div>), right: (<div className="space-y-4">
<PageTitle>{"推演一：同一个Hello程序的两种交付"}</PageTitle>
<BookParagraph>{"开发者在有SDK的机器运行dotnet run，会先进行必要的构建再执行；用户只拿到框架依赖发布产物时，需要安装匹配运行时才能用dotnet应用.dll启动。自包含发布把相应运行时一起交付，体积更大，并且仍针对操作系统与体系结构。两种方式都不意味着可以忽略本地库、配置和文件权限；“我的电脑可以运行”只能说明开发环境满足了依赖。"}</BookParagraph>
</div>) },
{ label: ".NET家族与应用模型", left: (<div className="space-y-4">
<PageTitle>{".NET家族与应用模型"}</PageTitle>
<BookParagraph>{"C#是语言，CLR类运行时负责托管执行，ASP.NET Core是Web应用框架，WPF和Windows Forms面向Windows桌面。传统.NET Framework常见于既有Windows系统，迁移时应检查第三方组件、配置方式和系统接口，不是只替换项目文件中的数字。下表把层次拆开，避免把语言特性、运行时能力和UI平台混为一谈；跨平台项目也可能因调用Windows专属接口而失去可移植性。"}</BookParagraph>
<div className="overflow-x-auto"><table className="w-full text-sm border-collapse"><thead><tr><th className="border-b p-2 text-left">{"层次"}</th><th className="border-b p-2 text-left">{"主要职责"}</th><th className="border-b p-2 text-left">{"不等同于"}</th></tr></thead><tbody><tr><td className="border-b p-2 align-top">{"C#"}</td><td className="border-b p-2 align-top">{"表达类型与业务逻辑"}</td><td className="border-b p-2 align-top">{"所有.NET平台能力"}</td></tr><tr><td className="border-b p-2 align-top">{"运行时"}</td><td className="border-b p-2 align-top">{"托管执行与内存管理"}</td><td className="border-b p-2 align-top">{"完整开发工具"}</td></tr><tr><td className="border-b p-2 align-top">{"SDK"}</td><td className="border-b p-2 align-top">{"编译、项目和命令行工具"}</td><td className="border-b p-2 align-top">{"生产机必装全部SDK"}</td></tr><tr><td className="border-b p-2 align-top">{"应用框架"}</td><td className="border-b p-2 align-top">{"Web或桌面等宿主模型"}</td><td className="border-b p-2 align-top">{"所有系统都支持同一UI"}</td></tr></tbody></table></div>
</div>), right: (<div className="space-y-4">
<PageTitle>{"纯控制台规则：输入、转换、失败"}</PageTitle>
<BookParagraph>{"下例可放入已有现代C#控制台项目的Program.cs，使用顶级语句与System导入；需项目已具备匹配SDK，无外部包。数组提供两个固定输入，预期输出“minutes=25”与“invalid”。TryParse把无法解析视为可预期的输入结果，避免用异常控制普通校验。真实命令行还要检查输入范围、退出码和错误消息，解析成整数不代表负数或极大值符合业务。"}</BookParagraph>
<BookCode language="csharp" showLineNumbers code={"using System;\nforeach (var raw in new[] { \"25\", \"oops\" })\n{\n    if (int.TryParse(raw, out var minutes) && minutes > 0)\n        Console.WriteLine($\"minutes={minutes}\");\n    else\n        Console.WriteLine(\"invalid\");\n}"} />
</div>) },
{ label: "推演二：垃圾回收不替你关闭文件", left: (<div className="space-y-4">
<PageTitle>{"推演二：垃圾回收不替你关闭文件"}</PageTitle>
<BookParagraph>{"对象不再可达后，托管堆内存可由垃圾回收处理，但文件、套接字与数据库连接还占据系统资源。using表达确定的释放边界，让实现IDisposable的对象在正常返回或异常时都能执行清理。若在高频请求中不断打开连接却等GC偶然运行，可能先耗尽句柄或连接池。不能把“托管语言不需手动free”理解成所有资源都无需显式管理。"}</BookParagraph>
</div>), right: (<div className="space-y-4">
<PageTitle>{"异常、返回值与可观察性"}</PageTitle>
<BookParagraph>{"方法可以对预期校验返回明确结果，对无法继续的故障抛出异常。捕获异常后空着不处理，会让调用者误以为成功；把所有异常直接输出给最终用户，又可能暴露路径和凭据。业务入口负责把错误转换成可理解提示和适当退出码或HTTP状态，日志记录可追踪上下文。先说明什么操作失败、是否已经产生副作用以及能否重试，比打印一句“出错了”更有诊断价值。"}</BookParagraph>
</div>) },
{ label: "练习：解释一次构建与执行", left: (<div className="space-y-4">
<PageTitle>{"练习：解释一次构建与执行"}</PageTitle>
<BookParagraph>{"为一个时长统计控制台程序画出源码、编译、程序集、运行时和输出五步链路，分别输入25、空白、负数和非数字。验收：合法输入得到确定结果，其余输入不崩溃，能说明SDK与运行时的区别，并写出框架依赖与自包含交付各自的前提。参考思路：先固定输入验证规则，再添加命令行读取；不要把需要交互输入的程序与无需输入的自动测试混在一起。"}</BookParagraph>
</div>), right: (<div className="space-y-4">
<PageTitle>{"后续章节的统一业务案例"}</PageTitle>
<BookParagraph>{"本方向以课程任务API为例，语言层实现标题与状态规则，Web层处理请求，数据库保存事实，服务层组织依赖，安全层检查身份与归属，测试和部署验证交付。每层有自己的成功条件：HTTP返回成功不能代替数据库已提交，数据库已提交也不能证明用户有权操作。先掌握小型控制台规则，再把同一规则放入Web宿主，可更清晰地观察框架究竟新增了哪些职责。"}</BookParagraph>
<BookList items={[<a key="https://learn.microsoft.com/en-us/dotnet/standard/clr" href="https://learn.microsoft.com/en-us/dotnet/standard/clr" target="_blank" rel="noopener noreferrer" className="underline">{"CLR运行时概览"}</a>]} />
</div>) },
  {
    label: '应用场景',
    left: (
      <div className="space-y-4">
        <PageTitle>主流应用场景</PageTitle>
        <BookParagraph>.NET技术栈广泛应用于多种开发场景，是企业级开发的首选平台之一。</BookParagraph>
        <BookList items={[
          'Web应用开发（ASP.NET）',
          '桌面与移动应用',
          '云原生与微服务',
          '游戏开发（Unity）',
          '物联网与嵌入式',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>课后练习</PageTitle>
        <div className="p-3 bg-paper-200/80 rounded-md border border-paper-300">
          <p className="text-sm text-ink font-medium mb-1">练习题</p>
          <BookList items={[
            '简述.NET平台的发展历程',
            '列举三种.NET的主要应用场景',
            '编写程序输出 "欢迎学习.NET开发"',
          ]} />
        </div>
        <BookAlert type="info" message="动手实践是最好的学习方式。尝试修改代码，观察输出变化" />
      </div>
    ),
  },
]

export default function DotnetIntroPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
