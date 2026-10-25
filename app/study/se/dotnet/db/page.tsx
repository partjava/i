'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import { PageTitle, BookParagraph, BookCode, BookAlert, BookList, TagGrid } from '@shared/components/ui/book/BookContent'

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
<BookParagraph>{"原AppDbContext中的未定义Configuration已改为构造注入DbContextOptions；SQL Server依赖与连接由宿主注册。Products练习需另定义实体和DbSet。迁移命令有真实数据库副作用，必须先审查脚本、目标与备份。"}</BookParagraph>
        <BookParagraph>连接字符串配置在 appsettings.json 中，指定数据库服务器、名称和认证信息。</BookParagraph>
<BookParagraph>{"连接字符串中的服务器、库名和凭据必须对应实际环境，真实密码从受控配置注入。先验证连接身份与权限，再排查实体映射和查询；把整条连接字符串打印到日志会泄露秘密，数据库错误应通过安全的追踪信息定位。"}</BookParagraph>
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
<BookParagraph>{"DbContextOptions由宿主构造并注入，上下文在合适作用域使用和释放。实体被跟踪后修改属性不等于立即写入，SaveChanges才触发保存流程。只读查询和修改查询有不同需要，不能把一个全局上下文当作所有请求共享的数据缓存。"}</BookParagraph>
        <BookCode language="csharp" showLineNumbers code={`public class User {
    public int Id { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
    public DateTime CreatedAt { get; set; }
}

public class AppDbContext : DbContext {
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
    public DbSet<User> Users => Set<User>();
}

// ASP.NET Core Program.cs，需EF Core SQL Server提供程序与对应配置。
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));`} />
        <TagGrid items={['EF Core', 'ORM', 'DbContext', '实体', '迁移', 'LINQ']} />
      </div>
    ),
  },
{ label: "DbContext是一次工作单元", left: (<div className="space-y-4">
<PageTitle>{"DbContext是一次工作单元"}</PageTitle>
<BookParagraph>{"EF Core把实体状态、关系和数据库访问放进DbContext，查询得到的被跟踪实体修改后，SaveChanges根据状态生成SQL。上下文不是全局线程安全缓存，同一实例不应并行执行多个操作；Web请求通常用适当作用域创建和释放。数据库连接、事务和实体跟踪是不同概念，不能因为有一个DbContext就假定所有代码已经处于同一事务，也不能把上下文长期保存在单例中。"}</BookParagraph>
</div>), right: (<div className="space-y-4">
<PageTitle>{"推演一：两个用户同时改标题"}</PageTitle>
<BookParagraph>{"甲乙都读到任务版本5，甲先把标题改为“复习网络”并保存，版本变6；乙再提交基于版本5的“复习数据库”。没有并发检查时，后写入可能覆盖甲的修改。配置并发令牌后，更新条件包含旧版本，影响行数为零时EF可报告冲突。应用应重新读取、提示用户或按规则合并，不能一律自动重试旧修改，否则仍可能造成用户未察觉的数据覆盖。"}</BookParagraph>
</div>) },
{ label: "查询性能从生成SQL开始", left: (<div className="space-y-4">
<PageTitle>{"查询性能从生成SQL开始"}</PageTitle>
<BookParagraph>{"ToList把结果物化，Where、Select与排序若在数据库执行前组合，通常能减少传输；先读取全表再筛选会增加内存和网络成本。只读场景可按需求关闭跟踪，投影只取必要字段。下表列出正确性与性能各自的检查点。关联数据还可能引发逐行查询问题，应观察实际SQL次数和执行计划，不把代码只有一行LINQ误认为数据库只做一次低成本操作。"}</BookParagraph>
<div className="overflow-x-auto"><table className="w-full text-sm border-collapse"><thead><tr><th className="border-b p-2 text-left">{"措施"}</th><th className="border-b p-2 text-left">{"解决的问题"}</th><th className="border-b p-2 text-left">{"核对证据"}</th></tr></thead><tbody><tr><td className="border-b p-2 align-top">{"投影与分页"}</td><td className="border-b p-2 align-top">{"读取过量数据"}</td><td className="border-b p-2 align-top">{"返回列、行数与SQL"}</td></tr><tr><td className="border-b p-2 align-top">{"适当跟踪"}</td><td className="border-b p-2 align-top">{"修改状态与只读成本"}</td><td className="border-b p-2 align-top">{"是否需要保存实体变化"}</td></tr><tr><td className="border-b p-2 align-top">{"并发令牌"}</td><td className="border-b p-2 align-top">{"检测基于旧版本覆盖"}</td><td className="border-b p-2 align-top">{"条件更新影响行数"}</td></tr><tr><td className="border-b p-2 align-top">{"迁移审查"}</td><td className="border-b p-2 align-top">{"旧结构升级风险"}</td><td className="border-b p-2 align-top">{"脚本、备份与旧数据验收"}</td></tr></tbody></table></div>
</div>), right: (<div className="space-y-4">
<PageTitle>{"可运行：乐观并发的条件更新"}</PageTitle>
<BookParagraph>{"下面Python 3标准库SQLite模型不依赖EF，展示并发令牌背后的数据库条件。第一次更新版本1成功，第二次仍用旧版本1则影响零行，预期打印1与0。SQL Server rowversion等令牌的生成方式与本例整数不同；EF配置必须按数据库提供者选择。教学重点是把“我基于哪个版本修改”作为写入条件，而非把读到的数据无条件覆盖回去。"}</BookParagraph>
<BookCode language="python" showLineNumbers code={"import sqlite3\nwith sqlite3.connect(':memory:') as db:\n    db.execute('CREATE TABLE task(id INTEGER PRIMARY KEY, title TEXT, version INTEGER)')\n    db.execute(\"INSERT INTO task VALUES(1, 'Old', 1)\")\n    sql = 'UPDATE task SET title=?, version=version+1 WHERE id=? AND version=?'\n    print(db.execute(sql, ('First', 1, 1)).rowcount)\n    print(db.execute(sql, ('Second', 1, 1)).rowcount)"} />
</div>) },
{ label: "推演二：迁移不等于安全上线", left: (<div className="space-y-4">
<PageTitle>{"推演二：迁移不等于安全上线"}</PageTitle>
<BookParagraph>{"给已有一百万行任务新增必填字段，直接添加NOT NULL而无默认值可能失败，或产生不符合业务的默认含义。可以先添加允许空的列，部署能兼容新旧结构的代码，按业务回填，验证后再收紧约束。具体步骤取决于数据库和发布方式。先生成迁移SQL并在具有旧结构的测试库执行，核对数据数量、锁影响和回滚能力，不能只在空库创建成功就批准生产执行。"}</BookParagraph>
</div>), right: (<div className="space-y-4">
<PageTitle>{"事务与外部副作用的边界"}</PageTitle>
<BookParagraph>{"在一个数据库中同时新增任务和待发送通知记录，可以通过事务保持一致；但发送邮件或调用第三方HTTP通常不能被同一个数据库事务撤销。若先发邮件再保存失败，用户收到不存在任务的通知；若先保存后邮件失败，则需要可恢复的通知队列或发件箱方案。不要长时间开着数据库事务等待远程网络。明确事务涵盖的资源与失败后的补偿，才能解释“保存成功”究竟承诺了什么。"}</BookParagraph>
</div>) },
{ label: "练习：证明没有丢失更新", left: (<div className="space-y-4">
<PageTitle>{"练习：证明没有丢失更新"}</PageTitle>
<BookParagraph>{"为同一任务创建两个独立上下文或两份旧版本输入，先后更新标题，触发第二次冲突。验收：第一份结果保留，第二份得到明确冲突信息；查询列表限制列与页大小，旧数据库迁移后原行数及标题保持不变。参考思路：先用本章条件更新模型理解行数，再配置EF令牌并捕获并发异常；不要用同一个被跟踪对象模拟两个独立用户，否则难以复现真实旧版本。"}</BookParagraph>
</div>), right: (<div className="space-y-4">
<PageTitle>{"连接秘密与数据生命周期"}</PageTitle>
<BookParagraph>{"连接字符串示例中的密码是占位符，开发与生产都不应将真实凭据提交到仓库。使用最小数据库权限、受保护传输和独立配置来源，日志不输出整条连接字符串。数据库约束负责最后一道一致性检查，应用校验改善用户体验，两者都需要。删除实体还要考虑外键、软删除过滤与审计保留；一条Remove调用是否真的物理删除，由模型与提供者行为决定，应通过SQL和数据库结果验证。"}</BookParagraph>
<BookList items={[<a key="https://learn.microsoft.com/en-us/ef/core/saving/concurrency" href="https://learn.microsoft.com/en-us/ef/core/saving/concurrency" target="_blank" rel="noopener noreferrer" className="underline">{"EF Core并发冲突"}</a>]} />
</div>) },
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
