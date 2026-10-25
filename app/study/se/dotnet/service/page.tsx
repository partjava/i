'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import { PageTitle, BookParagraph, BookCode, BookAlert, BookList, TagGrid } from '@shared/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '软件工程',
  chapterTitle: '服务与中间件',
  chapterNumber: 6,
  totalChapters: 10,
  subjectHref: '/study/se/dotnet',
  prevChapter: { label: '数据库与EF Core', href: '/study/se/dotnet/db' },
  nextChapter: { label: '安全与身份认证', href: '/study/se/dotnet/security' },
  theme: THEMES.software,
}

const SPREADS = [
  {
    label: '依赖注入',
    left: (
      <div className="space-y-4">
        <PageTitle>依赖注入（DI）</PageTitle>
<BookParagraph>{"原DI、日志、Session与中间件例子需要ASP.NET Core宿主、接口和实现。中间件缺少构造注入的部分已补齐。AddDistributedMemoryCache仍是单进程内存实现，不意味着跨实例共享。"}</BookParagraph>
        <BookParagraph>ASP.NET Core内置依赖注入容器，支持三种生命周期：Singleton、Scoped、Transient。</BookParagraph>
<BookParagraph>{"对象寿命要与状态归属一致。一次请求的数据库上下文不应被长寿命单例捕获，否则多个请求可能共享失效或并发不安全对象。用两个请求各解析两次的实例标识推演复用关系，比仅背诵三个生命周期名更容易发现错误依赖。"}</BookParagraph>
        <BookCode language="csharp" showLineNumbers code={`// 注册服务
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddSingleton<ICacheService, CacheService>();
builder.Services.AddTransient<IEmailService, EmailService>();

// 使用依赖注入
public class UserController : ControllerBase {
    private readonly IUserService _userService;

    public UserController(IUserService userService) {
        _userService = userService;
    }
}`} />
        <BookAlert type="info" message="Scoped：每个HTTP请求一个实例。Singleton：全局唯一。Transient：每次注入都创建新实例" />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>配置与日志</PageTitle>
        <BookParagraph>.NET提供了强大的配置系统和日志框架，支持多种配置源和日志输出目标。</BookParagraph>
<BookParagraph>{"配置系统负责来源与覆盖，业务仍需验证关键值存在且合法。结构化日志保留稳定模板与请求标识，便于聚合诊断；令牌、口令和整条连接字符串不进入日志。缓存和Session只是性能或临时会话工具，不应成为唯一业务事实存储。"}</BookParagraph>
        <BookCode language="csharp" showLineNumbers code={`// 读取配置
var connectionString = builder.Configuration
    .GetConnectionString("DefaultConnection");

var appSettings = builder.Configuration
    .GetSection("AppSettings")
    .Get<AppSettings>();

// 日志记录
public class UserService {
    private readonly ILogger<UserService> _logger;

    public UserService(ILogger<UserService> logger) {
        _logger = logger;
    }

    public void CreateUser(User user) {
        _logger.LogInformation("Creating user: {Name}", user.Name);
        // 业务逻辑
    }
}`} />
        <TagGrid items={['DI', 'IoC', 'Singleton', 'Scoped', '配置', '日志']} />
      </div>
    ),
  },
{ label: "依赖注入决定谁创建与释放对象", left: (<div className="space-y-4">
<PageTitle>{"依赖注入决定谁创建与释放对象"}</PageTitle>
<BookParagraph>{"控制器需要任务服务，任务服务需要数据库与时钟。由宿主注册依赖后，容器按构造参数创建对象并管理相应作用域，业务代码专注于规则。DI不等于服务定位器：在任意方法里向全局容器索取对象，会让依赖隐藏并降低可测试性。构造函数显式列出必需能力，测试就能传入假时钟或假仓库，重现超时、过期与失败，无需启动完整服务器。"}</BookParagraph>
</div>), right: (<div className="space-y-4">
<PageTitle>{"推演一：单例捕获请求上下文"}</PageTitle>
<BookParagraph>{"假设单例TaskService在构造时拿到Scoped的DbContext，它的寿命可能超过一次请求，随后多个请求共享本不应并行共享的上下文，造成状态污染或线程安全问题。不要仅为少创建对象就把所有服务注册为Singleton。修复应让生命周期匹配，或在明确后台任务边界创建独立作用域。HTTP请求结束后，后台工作不能继续依赖已经释放的请求服务，队列应传递必要数据而非整个HttpContext。"}</BookParagraph>
</div>) },
{ label: "三种生命周期的数量推演", left: (<div className="space-y-4">
<PageTitle>{"三种生命周期的数量推演"}</PageTitle>
<BookParagraph>{"Transient每次解析通常产生新实例，Scoped在同一作用域复用，Singleton在同一容器生命周期复用。假设两个请求各解析两次同一服务，按典型注册语义可得到四、二、一份实例。下表描述预期而非所有容器扩展的绝对行为；工厂、自定义注册和根容器解析会改变实际拥有关系。重点是先确定状态应由谁共享，再选择寿命，不能根据“缓存听起来很快”就共享所有对象。"}</BookParagraph>
<div className="overflow-x-auto"><table className="w-full text-sm border-collapse"><thead><tr><th className="border-b p-2 text-left">{"寿命"}</th><th className="border-b p-2 text-left">{"两个请求各解析两次"}</th><th className="border-b p-2 text-left">{"适合状态"}</th></tr></thead><tbody><tr><td className="border-b p-2 align-top">{"Transient"}</td><td className="border-b p-2 align-top">{"通常四个实例"}</td><td className="border-b p-2 align-top">{"轻量无共享操作对象"}</td></tr><tr><td className="border-b p-2 align-top">{"Scoped"}</td><td className="border-b p-2 align-top">{"通常两个实例"}</td><td className="border-b p-2 align-top">{"每请求工作单元"}</td></tr><tr><td className="border-b p-2 align-top">{"Singleton"}</td><td className="border-b p-2 align-top">{"通常一个实例"}</td><td className="border-b p-2 align-top">{"线程安全共享服务"}</td></tr><tr><td className="border-b p-2 align-top">{"缓存内容"}</td><td className="border-b p-2 align-top">{"由键、范围与失效决定"}</td><td className="border-b p-2 align-top">{"不能由DI寿命自动保证隔离"}</td></tr></tbody></table></div>
</div>), right: (<div className="space-y-4">
<PageTitle>{"缓存键也属于数据隔离设计"}</PageTitle>
<BookParagraph>{"下面Python 3模型展示同一task_id在两个租户下应使用不同缓存键，预期打印False。它不是.NET缓存实现，帮助审查缓存契约。真实服务还应包含必要的用户范围、数据版本或查询条件，设置过期与失效策略；缓存命中返回前仍需确保授权边界。把所有用户的“任务列表”存到固定key，会在提高命中率的同时制造跨用户数据泄漏。"}</BookParagraph>
<BookCode language="python" showLineNumbers code={"def cache_key(tenant, task_id):\n    return ('task', tenant, task_id)\na = cache_key('school-A', 7)\nb = cache_key('school-B', 7)\nassert a != b\nprint(a == b)"} />
</div>) },
{ label: "推演二：多实例Session突然消失", left: (<div className="space-y-4">
<PageTitle>{"推演二：多实例Session突然消失"}</PageTitle>
<BookParagraph>{"用户第一次请求落到实例A，Session写入A的内存；第二次经负载均衡落到B，B没有相同内存值，页面看似“丢登录”。进程内缓存即使实现了分布式缓存接口，也不自动共享。应按需求使用真正共享的存储、无状态设计或适当路由策略，并考虑故障恢复。Session适合临时会话信息，不应成为唯一业务事实来源，Cookie配置也不能替代服务端对会话生命周期的管理。"}</BookParagraph>
</div>), right: (<div className="space-y-4">
<PageTitle>{"配置与日志应服务运维问题"}</PageTitle>
<BookParagraph>{"配置可来自文件、环境变量与秘密服务，覆盖顺序和缺失值策略必须明确，关键配置应在启动时验证。日志使用稳定模板与字段，记录请求或任务标识、耗时及结果；字符串拼接会降低聚合检索质量。不要记录口令和完整令牌，个人姓名也应按用途最小化。调试级别只在需要的环境开启，异常记录保留堆栈而不是只打印Message，便于定位跨服务失败。"}</BookParagraph>
</div>) },
{ label: "练习：画出对象寿命与缓存范围", left: (<div className="space-y-4">
<PageTitle>{"练习：画出对象寿命与缓存范围"}</PageTitle>
<BookParagraph>{"设计一个任务服务，标注控制器、仓库、DbContext、时钟和缓存的作用域，再模拟两个租户请求相同task_id。验收：没有单例直接持有请求作用域对象，缓存键不会跨租户碰撞，过期后可重新加载，日志能串联一次请求且不含敏感值。参考思路：给测试实例分配标识，比较同请求与跨请求的复用结果；不要仅阅读AddScoped的文字说明而不观察实际对象身份。"}</BookParagraph>
</div>), right: (<div className="space-y-4">
<PageTitle>{"中间件与后台服务的边界"}</PageTitle>
<BookParagraph>{"传统中间件通常在构建管道时创建，若需作用域服务可在InvokeAsync参数中按请求获取，避免构造时捕获短命对象。后台服务不属于某个HTTP请求，应自行创建适当作用域并响应停止信号，关闭时停止接收新工作并完成或保存未完成任务。服务注册成功只证明容器能构造对象，不证明配置正确、资源已就绪或业务可恢复；启动验证与健康检查仍要分别设计。"}</BookParagraph>
<BookList items={[<a key="https://learn.microsoft.com/en-us/aspnet/core/fundamentals/dependency-injection" href="https://learn.microsoft.com/en-us/aspnet/core/fundamentals/dependency-injection" target="_blank" rel="noopener noreferrer" className="underline">{"ASP.NET Core依赖注入"}</a>]} />
</div>) },
  {
    label: '缓存管理',
    left: (
      <div className="space-y-4">
        <PageTitle>缓存与Session</PageTitle>
        <BookParagraph>缓存可以提升应用性能，Session用于在请求间保存用户数据。</BookParagraph>
        <BookCode language="csharp" showLineNumbers code={`// 内存缓存
builder.Services.AddDistributedMemoryCache();
builder.Services.AddSession(options => {
    options.IdleTimeout = TimeSpan.FromMinutes(30);
    options.Cookie.HttpOnly = true;
    options.Cookie.IsEssential = true;
});

app.UseSession();
app.UseAuthentication();

// 使用 Session
public IActionResult SetSession() {
    HttpContext.Session.SetString("UserName", "Tom");
    return Ok();
}

public IActionResult GetSession() {
    var name = HttpContext.Session.GetString("UserName");
    return Ok(name);
}`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>课后练习</PageTitle>
        <div className="p-3 bg-paper-200/80 rounded-md border border-paper-300">
          <p className="text-sm text-ink font-medium mb-1">练习题</p>
          <BookList items={[
            '注册一个Scoped服务并注入到Controller中使用',
            '实现一个自定义中间件记录请求日志',
            '配置内存缓存并实现缓存读取示例',
            '使用 ILogger 记录不同级别的日志信息',
          ]} />
        </div>
        <BookCode language="csharp" showLineNumbers code={`// 参考：自定义中间件
public class RequestLoggingMiddleware {
    private readonly RequestDelegate _next;
    private readonly ILogger _logger;

    public async Task InvokeAsync(HttpContext context) {
        _logger.LogInformation("Request: {Method} {Path}",
            context.Request.Method,
            context.Request.Path);
        await _next(context);
    }
}`} />
      </div>
    ),
  },
]

export default function DotnetServicePage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
