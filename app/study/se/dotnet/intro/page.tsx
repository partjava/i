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
        <BookParagraph>.NET是由微软开发的跨平台开发框架，支持Web、桌面、移动、云等多种应用场景。</BookParagraph>
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
