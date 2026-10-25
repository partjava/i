'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import { PageTitle, BookParagraph, BookCode, BookAlert, BookList, TagGrid } from '@shared/components/ui/book/BookContent'

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
<BookParagraph>{"原控制器、Razor与中间件属于不同文件和宿主片段；控制器需AddControllers及MapControllers注册，认证中间件需对应服务。静态内存商品列表仅作教学，不能作为并发生产存储。"}</BookParagraph>
        <BookParagraph>ASP.NET Core MVC将应用程序分为模型（Model）、视图（View）和控制器（Controller）三部分。</BookParagraph>
<BookParagraph>{"控制器是HTTP与业务之间的适配边界，不应直接承担所有授权、存储和重试。先写请求DTO和响应契约，说明400、401、403、404与409分别发生在哪一步。返回字符串只是最小演示，客户端需要稳定结构和可判断的失败结果。"}</BookParagraph>
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
<BookParagraph>{"创建接口返回201时要提供可实际读取的资源位置；绑定成功仍需校验标题与资源归属。不要直接接受整个数据库实体，尤其OwnerId、审核状态和内部字段应由服务端控制。静态List适合学习路由，无法保证并发、多实例和重启后的事实一致。"}</BookParagraph>
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
{ label: "一次HTTP请求如何进入业务", left: (<div className="space-y-4">
<PageTitle>{"一次HTTP请求如何进入业务"}</PageTitle>
<BookParagraph>{"客户端发送方法、路径、头和请求体，宿主交给中间件管道；路由找到端点后，模型绑定把输入转换为参数，校验判断是否合法，控制器调用业务服务，再把结果序列化为响应。每层都有独立失败：路径不匹配是404，输入格式错误可能是400，未认证是401，没有权限是403，业务冲突可用409。不要所有失败都返回200并把错误藏在字符串中，让客户端无法可靠分支处理。"}</BookParagraph>
</div>), right: (<div className="space-y-4">
<PageTitle>{"推演一：创建课程任务的契约"}</PageTitle>
<BookParagraph>{"POST /api/tasks提交标题，服务端先规范化并验证，再保存生成id，成功返回201与可读取资源的位置。GET该地址应返回相同资源；若只是返回一个拼出的地址却没有对应读取端点，Created响应的语义就不完整。客户端重复提交是否生成两条任务由契约决定，需要防重时可用稳定操作号。请求DTO只接受允许修改的字段，不能直接让用户提交OwnerId或内部审核状态。"}</BookParagraph>
</div>) },
{ label: "中间件顺序会改变行为", left: (<div className="space-y-4">
<PageTitle>{"中间件顺序会改变行为"}</PageTitle>
<BookParagraph>{"中间件可以先处理请求再调用next，返回时再处理响应，形成类似嵌套调用的次序。异常处理应覆盖需要保护的后续代码，认证识别身份，授权根据身份与端点策略决策；位置错误可能导致权限判断拿不到身份。下表不是一份可直接复制到任何项目的完整管道，而是解释每个阶段依赖什么。静态文件、CORS和代理配置也需按宿主方案安排，不能机械照抄旧模板顺序。"}</BookParagraph>
<div className="overflow-x-auto"><table className="w-full text-sm border-collapse"><thead><tr><th className="border-b p-2 text-left">{"阶段"}</th><th className="border-b p-2 text-left">{"输入或依赖"}</th><th className="border-b p-2 text-left">{"典型结果"}</th></tr></thead><tbody><tr><td className="border-b p-2 align-top">{"路由"}</td><td className="border-b p-2 align-top">{"HTTP方法与路径"}</td><td className="border-b p-2 align-top">{"端点或404"}</td></tr><tr><td className="border-b p-2 align-top">{"认证"}</td><td className="border-b p-2 align-top">{"可信凭据"}</td><td className="border-b p-2 align-top">{"用户身份或401"}</td></tr><tr><td className="border-b p-2 align-top">{"授权"}</td><td className="border-b p-2 align-top">{"身份与资源策略"}</td><td className="border-b p-2 align-top">{"允许或403"}</td></tr><tr><td className="border-b p-2 align-top">{"绑定与业务"}</td><td className="border-b p-2 align-top">{"结构、规则与持久化"}</td><td className="border-b p-2 align-top">{"成功、400或409"}</td></tr></tbody></table></div>
</div>), right: (<div className="space-y-4">
<PageTitle>{"用一个可追踪标识连接请求日志"}</PageTitle>
<BookParagraph>{"下面为ASP.NET Core已有Program.cs中、Build后与端点映射前的中间件片段，app由宿主提供，无外部包。输入任意请求，预期响应含X-Request-Id头，结束日志包含同一标识和状态。它不能代替全套日志与异常处理，也不应记录请求中的令牌。正式系统应限制可信追踪来源，并在响应开始前设置头；并发请求靠标识关联，而不是靠相邻日志行猜测。"}</BookParagraph>
<BookCode language="csharp" showLineNumbers code={"app.Use(async (context, next) =>\n{\n    var id = context.TraceIdentifier;\n    context.Response.Headers[\"X-Request-Id\"] = id;\n    await next();\n    app.Logger.LogInformation(\"Request {RequestId} ended {Status}\",\n        id, context.Response.StatusCode);\n});"} />
</div>) },
{ label: "推演二：模型绑定成功但业务仍非法", left: (<div className="space-y-4">
<PageTitle>{"推演二：模型绑定成功但业务仍非法"}</PageTitle>
<BookParagraph>{"JSON中的title为空字符串，类型仍是合法string；id为正数也不表示任务属于当前用户。模型验证负责结构和基本约束，服务层负责业务规则，授权负责资源归属。对于不存在的资源、状态冲突和数据库暂时失败应分别转换结果。错误体可提供稳定错误码与字段提示，但不应泄露堆栈、连接字符串或其他用户信息；开发异常页面只能用于受控开发环境。"}</BookParagraph>
</div>), right: (<div className="space-y-4">
<PageTitle>{"分页、排序与并发存储"}</PageTitle>
<BookParagraph>{"列表接口应限制每页大小并提供确定排序，例如CreatedAt再加Id，避免相同时间的记录在分页间跳动。过滤条件必须参数化并限制可查询范围。静态List在多请求修改时会有线程安全和进程重启丢数据问题，不能因演示API成功就直接上线。数据库读取也要控制投影字段和查询次数，返回整个实体图可能产生循环、暴露字段或意外加载大量关联数据。"}</BookParagraph>
</div>) },
{ label: "练习：写出客户端可判断的API", left: (<div className="space-y-4">
<PageTitle>{"练习：写出客户端可判断的API"}</PageTitle>
<BookParagraph>{"设计新增、读取和修改任务三个端点，给出成功、无效标题、未登录、无权限、找不到任务和版本冲突的请求响应例。验收：状态码与响应体一致，201地址可实际读取，输入DTO不接受归属字段，错误不含内部堆栈。参考思路：先写契约表和固定样本，再实现控制器；用同一请求标识追踪管道与业务服务，区分没有进入端点和端点内部失败。"}</BookParagraph>
</div>), right: (<div className="space-y-4">
<PageTitle>{"Razor与API的输出边界"}</PageTitle>
<BookParagraph>{"Razor在服务端把模型渲染成HTML，API通常序列化JSON，两者共享业务服务但输出契约不同。HTML自动编码能降低文本注入风险，主动输出原始HTML则需可信来源；JSON返回成功也不能防止前端随后以不安全方式插入DOM。表单和Cookie认证还需考虑防伪与浏览器行为。学习时保留传统MVC例子有助于理解宿主职责，但不能把Razor语法直接放进普通C#控制器文件中编译。"}</BookParagraph>
<BookList items={[<a key="https://learn.microsoft.com/en-us/aspnet/core/fundamentals/middleware/" href="https://learn.microsoft.com/en-us/aspnet/core/fundamentals/middleware/" target="_blank" rel="noopener noreferrer" className="underline">{"ASP.NET Core中间件"}</a>]} />
</div>) },
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
