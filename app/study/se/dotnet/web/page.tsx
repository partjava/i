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
  chapterTitle: 'ASP.NET Web开发',
  chapterNumber: 4,
  totalChapters: 10,
  subjectHref: '/study/se/dotnet',
  prevChapter: { label: 'C#基础与语法', href: '/study/se/dotnet/csharp' },
  nextChapter: { label: '数据库与EF Core', href: '/study/se/dotnet/db' },
  theme: THEMES.software,
}

const SPREADS = [
  {
    label: 'MVC与API',
    left: (
      <div className="space-y-4">
        <PageTitle>MVC控制器</PageTitle>
        <BookParagraph>ASP.NET Core MVC将应用程序分为模型（Model）、视图（View）和控制器（Controller）三部分。</BookParagraph>
        <BookCode language="csharp" showLineNumbers code={`public class HomeController : Controller {
    public IActionResult Index() {
        return View();
    }

    public IActionResult About() {
        ViewData["Message"] = "关于我们";
        return View();
    }
}`} />
        <BookAlert type="info" message="Controller 负责处理 HTTP 请求，调用业务逻辑，返回视图或数据" />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>Web API</PageTitle>
        <BookParagraph>使用ASP.NET Core可以快速构建RESTful API服务，支持JSON序列化和路由映射。</BookParagraph>
        <BookCode language="csharp" showLineNumbers code={`[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase {
    [HttpGet]
    public IEnumerable<string> Get() => new[] { "Tom", "Jerry" };

    [HttpGet("{id}")]
    public string Get(int id) => $"User {id}";

    [HttpPost]
    public IActionResult Create([FromBody] User user) {
        return CreatedAtAction(nameof(Get), new { id = user.Id }, user);
    }
}`} />
        <TagGrid items={['MVC', 'API', 'REST', '控制器', '路由', 'JSON']} />
      </div>
    ),
  },
  {
    label: '路由与视图',
    left: (
      <div className="space-y-4">
        <PageTitle>路由与中间件</PageTitle>
        <BookParagraph>路由系统将URL映射到控制器操作，中间件则在请求管道中处理请求和响应。</BookParagraph>
        <BookCode language="csharp" showLineNumbers code={`var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.UseRouting();
app.UseAuthentication();
app.UseAuthorization();

app.UseEndpoints(endpoints => {
    endpoints.MapControllers();
    endpoints.MapRazorPages();
});

app.Run();`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>Razor视图</PageTitle>
        <BookParagraph>Razor是ASP.NET Core的视图引擎，允许在HTML中嵌入C#代码。</BookParagraph>
        <BookCode language="html" showLineNumbers code={`@model IEnumerable<User>

<h1>用户列表</h1>
<table>
    <thead>
        <tr><th>姓名</th><th>邮箱</th></tr>
    </thead>
    <tbody>
        @foreach (var user in Model) {
            <tr>
                <td>@user.Name</td>
                <td>@user.Email</td>
            </tr>
        }
    </tbody>
</table>`} />
        <BookAlert type="warning" message="Razor 视图文件使用 .cshtml 扩展名，支持布局页和部分视图" />
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
            '创建一个 MVC Controller 并添加 Index 和 Detail 方法',
            '创建一个 Web API Controller 实现 CRUD 操作',
            '配置路由和中间件管道',
            '创建一个 Razor 视图展示数据列表',
          ]} />
        </div>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>参考代码</PageTitle>
        <BookCode language="csharp" showLineNumbers code={`// 简单的 Product API
[ApiController]
[Route("api/products")]
public class ProductController : ControllerBase {
    private static List<Product> products = new();

    [HttpGet]
    public IActionResult GetAll() => Ok(products);

    [HttpPost]
    public IActionResult Add(Product product) {
        products.Add(product);
        return Created($"/api/products/{product.Id}", product);
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id) {
        products.RemoveAll(p => p.Id == id);
        return NoContent();
    }
}`} />
      </div>
    ),
  },
]

export default function DotnetWebPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
