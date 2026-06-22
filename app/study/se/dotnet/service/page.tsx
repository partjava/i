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
        <BookParagraph>ASP.NET Core内置依赖注入容器，支持三种生命周期：Singleton、Scoped、Transient。</BookParagraph>
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
