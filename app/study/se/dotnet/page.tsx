'use client'

import BookCover from '@shared/components/ui/book/BookCover'
import { THEMES } from '@shared/components/ui/book/theme'

const CHAPTERS = [
  { number: 1, title: '概述', description: '.NET平台简介和发展历程', href: '/study/se/dotnet/intro' },
  { number: 2, title: '开发环境配置', description: '.NET SDK安装和项目管理', href: '/study/se/dotnet/setup' },
  { number: 3, title: 'C#基础与语法', description: 'C#语言核心语法和面向对象编程', href: '/study/se/dotnet/csharp' },
  { number: 4, title: 'ASP.NET Web开发', description: 'MVC、Web API和Razor视图', href: '/study/se/dotnet/web' },
  { number: 5, title: '数据库与EF Core', description: '数据库连接和Entity Framework Core', href: '/study/se/dotnet/db' },
  { number: 6, title: '服务与中间件', description: '依赖注入、配置与日志', href: '/study/se/dotnet/service' },
  { number: 7, title: '安全与身份认证', description: 'JWT认证与安全最佳实践', href: '/study/se/dotnet/security' },
  { number: 8, title: '部署与运维', description: '发布部署和Docker容器化', href: '/study/se/dotnet/deploy' },
  { number: 9, title: '测试与调试', description: '单元测试和集成测试', href: '/study/se/dotnet/testing' },
  { number: 10, title: '实战项目与案例', description: '综合项目开发与面试题', href: '/study/se/dotnet/projects' },
]

export default function DotNetHomePage() {
  return (
    <BookCover
      title=".NET开发"
      subtitle=".NET Development"
      description="掌握Microsoft .NET技术栈，从C#语言到ASP.NET Core，构建高性能的现代化应用程序"
      chapterCount={CHAPTERS.length}
      totalHours={30}
      chapters={CHAPTERS}
      icon="🔷"
      startHref="/study/se/dotnet/intro"
      theme={THEMES.software}
    />
  )
}
