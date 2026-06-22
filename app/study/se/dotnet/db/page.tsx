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
} from '@/app/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '软件工程',
  chapterTitle: '数据库与EF Core',
  chapterNumber: 5,
  totalChapters: 10,
  subjectHref: '/study/se/dotnet',
  prevChapter: { label: 'ASP.NET Web开发', href: '/study/se/dotnet/web' },
  nextChapter: { label: '服务与中间件', href: '/study/se/dotnet/service' },
  theme: THEMES.software,
}

const SPREADS = [
  {
    label: '连接与实体',
    left: (
      <div className="space-y-4">
        <PageTitle>数据库连接字符串</PageTitle>
        <BookParagraph>连接字符串配置在 appsettings.json 中，指定数据库服务器、名称和认证信息。</BookParagraph>
        <BookCode language="json" showLineNumbers code={`{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=demo;User Id=sa;Password=your_password;"
  }
}`} />
        <BookAlert type="warning" message="生产环境中不要硬编码密码，建议使用 User Secrets 或环境变量管理敏感信息" />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>EF Core实体与上下文</PageTitle>
        <BookParagraph>Entity Framework Core 是 .NET 的 ORM 框架，通过实体类和 DbContext 操作数据库。</BookParagraph>
        <BookCode language="csharp" showLineNumbers code={`public class User {
    public int Id { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
    public DateTime CreatedAt { get; set; }
}

public class AppDbContext : DbContext {
    public DbSet<User> Users { get; set; }

    protected override void OnConfiguring(
        DbContextOptionsBuilder options)
    {
        options.UseSqlServer(
            Configuration.GetConnectionString("DefaultConnection"));
    }
}`} />
        <TagGrid items={['EF Core', 'ORM', 'DbContext', '实体', '迁移', 'LINQ']} />
      </div>
    ),
  },
  {
    label: '迁移管理',
    left: (
      <div className="space-y-4">
        <PageTitle>数据迁移</PageTitle>
        <BookParagraph>EF Core 迁移功能可以根据实体模型自动生成和更新数据库表结构。</BookParagraph>
        <BookCode language="bash" showLineNumbers code={`# 安装 EF Core 工具
dotnet tool install --global dotnet-ef

# 添加迁移
dotnet ef migrations add InitialCreate

# 应用迁移到数据库
dotnet ef database update

# 查看迁移SQL脚本
dotnet ef migrations script

# 回滚迁移
dotnet ef database update 0`} />
        <BookAlert type="info" message="每次修改实体后执行 'dotnet ef migrations add 名称' 生成新的迁移文件" />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>课后练习</PageTitle>
        <div className="p-3 bg-paper-200/80 rounded-md border border-paper-300">
          <p className="text-sm text-ink font-medium mb-1">练习题</p>
          <BookList items={[
            '创建 Product 实体（Id, Name, Price, Stock）',
            '配置 AppDbContext 并注册 DbSet',
            '添加初始迁移并更新数据库',
            '编写数据查询方法：按价格筛选、分页查询',
          ]} />
        </div>
        <BookCode language="csharp" showLineNumbers code={`// 参考：查询示例
using var db = new AppDbContext();
var cheap = db.Products
    .Where(p => p.Price < 100)
    .OrderBy(p => p.Price)
    .ToList();`} />
      </div>
    ),
  },
]

export default function DotnetDbPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
