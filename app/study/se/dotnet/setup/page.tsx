'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import {
  PageTitle,
  BookParagraph,
  BookCode,
  BookAlert,
  BookList,
} from '@shared/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '软件工程',
  chapterTitle: '开发环境配置',
  chapterNumber: 2,
  totalChapters: 10,
  subjectHref: '/study/se/dotnet',
  prevChapter: { label: '概述', href: '/study/se/dotnet/intro' },
  nextChapter: { label: 'C#基础与语法', href: '/study/se/dotnet/csharp' },
  theme: THEMES.software,
}

const SPREADS = [
  {
    label: '环境安装',
    left: (
      <div className="space-y-4">
        <PageTitle>.NET SDK安装</PageTitle>
        <BookParagraph>.NET SDK是开发.NET应用的核心工具包，包含编译器、运行时和命令行工具。</BookParagraph>
        <BookList items={[
          '安装.NET SDK（官方下载：dotnet.microsoft.com）',
          '推荐使用Visual Studio或VS Code',
          '安装完成后打开终端验证',
        ]} />
        <BookCode language="bash" showLineNumbers code={`# 验证 .NET SDK 安装
dotnet --version
# 输出示例: 8.0.100`} />
        <BookAlert type="success" message="看到版本号说明 .NET SDK 安装成功" />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>项目创建与管理</PageTitle>
        <BookParagraph>使用dotnet命令行工具可以快速创建和管理项目。</BookParagraph>
        <BookCode language="bash" showLineNumbers code={`# 创建控制台项目
dotnet new console -n HelloDotnet
cd HelloDotnet
# 运行项目
dotnet run`} />
        <BookCode language="bash" showLineNumbers code={`# 创建Web API项目
dotnet new webapi -n MyApi
cd MyApi
dotnet run`} />
      </div>
    ),
  },
  {
    label: '开发工具',
    left: (
      <div className="space-y-4">
        <PageTitle>常用插件与调试工具</PageTitle>
        <BookParagraph>选择合适的开发工具和插件可以大幅提升开发效率。</BookParagraph>
        <BookList items={[
          'C#插件（VS Code）——语法高亮、智能提示',
          'NuGet包管理器——管理第三方依赖',
          '调试与断点——单步调试、变量监视',
          '日志输出——使用Console.WriteLine或ILogger',
        ]} />
        <BookAlert type="warning" message="建议使用最新稳定版的 .NET SDK，长期支持（LTS）版本为生产环境首选" />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>课后练习</PageTitle>
        <div className="p-3 bg-paper-200/80 rounded-md border border-paper-300">
          <p className="text-sm text-ink font-medium mb-1">练习题</p>
          <BookList items={[
            '安装 .NET SDK 并验证版本号',
            '创建控制台项目并输出 "Hello World"',
            '创建 Web API 项目并运行默认模板',
            '熟悉 VS Code / Visual Studio 的基本调试功能',
          ]} />
        </div>
        <BookAlert type="info" message="动手实践是最好的学习方式。完成练习后可进入下一章学习C#基础语法" />
      </div>
    ),
  },
]

export default function DotnetSetupPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
