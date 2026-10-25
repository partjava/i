'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import { PageTitle, BookParagraph, BookCode, BookAlert, BookList, TagGrid } from '@shared/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '软件工程',
  chapterTitle: '安全与身份认证',
  chapterNumber: 7,
  totalChapters: 10,
  subjectHref: '/study/se/dotnet',
  prevChapter: { label: '服务与中间件', href: '/study/se/dotnet/service' },
  nextChapter: { label: '部署与运维', href: '/study/se/dotnet/deploy' },
  theme: THEMES.software,
}

const SPREADS = [
  {
    label: 'JWT认证',
    left: (
      <div className="space-y-4">
        <PageTitle>JWT身份认证</PageTitle>
<BookParagraph>{"JWT片段需要认证包、命名空间、真实签发方与安全密钥配置。原占位密钥不能部署，生成令牌例已补齐发行者和受众一致性。身份认证成功后仍须检查任务归属；CORS不是API授权。"}</BookParagraph>
        <BookParagraph>JWT（JSON Web Token）是无状态的认证方案，广泛应用于API安全保护。</BookParagraph>
<BookParagraph>{"JWT签名验证关注来源与完整性，载荷通常可被读取，不能存放密码或任务私密正文。验证要检查发行者、受众、时间和可信密钥，再建立身份；获得身份后还必须按当前用户约束资源查询，不能只判断令牌字符串是否存在。"}</BookParagraph>
        <BookCode language="csharp" showLineNumbers code={`// 配置 JWT 认证
builder.Services.AddAuthentication("Bearer")
    .AddJwtBearer(options => {
        options.TokenValidationParameters =
            new TokenValidationParameters {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                ValidIssuer = "MyApp",
                ValidAudience = "MyAppUsers",
                IssuerSigningKey = new SymmetricSecurityKey(
                    Encoding.UTF8.GetBytes("your-secret-key-here"))
            };
    });`} />
        <BookAlert type="warning" message="密钥需要足够复杂，生产环境建议使用非对称加密（RSA）并从安全存储读取" />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>授权策略</PageTitle>
        <BookParagraph>通过 [Authorize] 特性控制API访问权限，支持角色和策略授权。</BookParagraph>
<BookParagraph>{"角色规则决定一类能力，资源归属决定某条任务能否操作。普通用户修改URL中的编号不应读取别人内容，前端隐藏按钮也不构成授权。分别测试未认证和已认证无权限，确认拒绝发生在副作用之前，而不是写入后才显示错误。"}</BookParagraph>
        <BookCode language="csharp" showLineNumbers code={`// 角色授权
[Authorize(Roles = "Admin")]
public IActionResult AdminOnly() { ... }

// 策略授权
builder.Services.AddAuthorization(options => {
    options.AddPolicy("RequireAdmin",
        policy => policy.RequireRole("Admin"));
});

[Authorize(Policy = "RequireAdmin")]
public class AdminController : ControllerBase { ... }

// 获取当前用户信息
var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;`} />
        <TagGrid items={['JWT', 'OAuth2', '认证', '授权', 'Bearer', '安全']} />
      </div>
    ),
  },
{ label: "认证确认身份，授权限制资源", left: (<div className="space-y-4">
<PageTitle>{"认证确认身份，授权限制资源"}</PageTitle>
<BookParagraph>{"API验证令牌的签名、发行者、受众和有效时间后建立用户身份，但仍需判断此用户是否能访问请求的任务。客户端提交owner_id不能作为可信授权依据，服务端应从验证后的身份取得用户标识并约束查询。角色表示某种权限集合，资源归属决定某条数据能否访问。只有Admin或普通用户标签往往不足以处理课程班级、组织租户和个人任务之间的细粒度边界。"}</BookParagraph>
</div>), right: (<div className="space-y-4">
<PageTitle>{"推演一：把任务编号改成别人的"}</PageTitle>
<BookParagraph>{"用户甲有权读取/api/tasks/7，不代表把URL改为8后也有权读取任务8。控制器先验证身份，再用当前用户与资源关系进行查询或策略判断；若直接Find(8)并返回实体，就可能发生越权。对未认证请求返回401，对已认证但无权操作返回合适拒绝结果；某些系统会统一隐藏资源存在性，具体应由契约决定并保持一致，不能泄露其他用户标题到错误消息。"}</BookParagraph>
</div>) },
{ label: "JWT是签名容器，不是保密容器", left: (<div className="space-y-4">
<PageTitle>{"JWT是签名容器，不是保密容器"}</PageTitle>
<BookParagraph>{"常见JWT载荷可被读取，签名用于验证完整性与来源而非加密内容。不要把密码、私密任务正文或无需向客户端公开的字段写入载荷。验证端还需限制可信算法和密钥来源，处理密钥轮换、时钟容差及撤销需求。下表区分常被混淆的安全机制，说明HTTPS、CORS、防伪与资源授权各自覆盖什么，避免因为启用了某一个开关就跳过其他层。"}</BookParagraph>
<div className="overflow-x-auto"><table className="w-full text-sm border-collapse"><thead><tr><th className="border-b p-2 text-left">{"机制"}</th><th className="border-b p-2 text-left">{"保护目标"}</th><th className="border-b p-2 text-left">{"不能替代"}</th></tr></thead><tbody><tr><td className="border-b p-2 align-top">{"JWT验证"}</td><td className="border-b p-2 align-top">{"身份声明来源与完整性"}</td><td className="border-b p-2 align-top">{"资源归属授权"}</td></tr><tr><td className="border-b p-2 align-top">{"HTTPS"}</td><td className="border-b p-2 align-top">{"传输机密性与完整性"}</td><td className="border-b p-2 align-top">{"应用输入与权限校验"}</td></tr><tr><td className="border-b p-2 align-top">{"CORS"}</td><td className="border-b p-2 align-top">{"浏览器跨源访问规则"}</td><td className="border-b p-2 align-top">{"服务端认证和授权"}</td></tr><tr><td className="border-b p-2 align-top">{"防伪机制"}</td><td className="border-b p-2 align-top">{"浏览器自动凭据滥用风险"}</td><td className="border-b p-2 align-top">{"XSS治理与业务授权"}</td></tr></tbody></table></div>
</div>), right: (<div className="space-y-4">
<PageTitle>{"可运行的归属规则模型"}</PageTitle>
<BookParagraph>{"下面Python 3例子仅测试业务授权判断，不负责解析或验证JWT。输入两位用户与任务归属，预期打印True、False、False，最后一项代表没有身份。实际.NET服务应从可信ClaimsPrincipal取得身份，并用服务端数据库关系判断，不能使用未验证的JSON字段。单独测试规则有助于固定边界，但生产还需集成测试验证认证中间件确实执行，伪造请求不会绕过入口。"}</BookParagraph>
<BookCode language="python" showLineNumbers code={"def can_read(user_id, task_owner):\n    return user_id is not None and user_id == task_owner\nfor user in ('u1', 'u2', None):\n    print(can_read(user, 'u1'))\nassert not can_read('u2', 'u1')"} />
</div>) },
{ label: "推演二：令牌过期与重试风暴", left: (<div className="space-y-4">
<PageTitle>{"推演二：令牌过期与重试风暴"}</PageTitle>
<BookParagraph>{"访问令牌过期后，客户端连续请求都收到401，若每个请求独立刷新可能产生多个刷新操作和状态竞争。应按协议协调刷新并限制重试，失败时清理会话并提示重新认证。刷新令牌通常寿命更长，要保护存储、轮换和撤销；不能把服务端签名密钥交给客户端自行生成新令牌。退出登录是否立即使已签发令牌失效需要明确设计，短有效期不等于实时撤销。"}</BookParagraph>
</div>), right: (<div className="space-y-4">
<PageTitle>{"浏览器、Cookie与跨站边界"}</PageTitle>
<BookParagraph>{"CORS约束浏览器跨源脚本读取响应，非浏览器调用者不会因此失去访问API的能力。Cookie认证会自动随请求发送凭据，需要考虑CSRF及SameSite等属性；Bearer令牌的存储又涉及脚本注入与窃取风险。HTTPS保护传输但不替代输入校验。对请求DTO采用允许字段列表，输出DTO减少暴露，数据库查询参数化，错误响应不泄露堆栈，形成各层相互配合的防线。"}</BookParagraph>
</div>) },
{ label: "练习：执行授权拒绝矩阵", left: (<div className="space-y-4">
<PageTitle>{"练习：执行授权拒绝矩阵"}</PageTitle>
<BookParagraph>{"为任务读取和修改各列出无令牌、过期令牌、错误受众、其他用户、合法拥有者五种输入。验收：错误凭据不能进入业务修改，其他用户不能读标题或改变完成状态，合法操作成功，日志只保留必要标识。参考思路：分开测试令牌验证与归属规则，集成测试覆盖真实管道；不要只在页面隐藏按钮，也不要只验证一次管理员成功请求就认为普通用户安全。"}</BookParagraph>
</div>), right: (<div className="space-y-4">
<PageTitle>{"密钥与审计的生命周期"}</PageTitle>
<BookParagraph>{"签名密钥放在受控配置或秘密服务，规定轮换、访问审计和泄漏响应，示例字符串不具备生产强度和管理能力。审计记录谁在何时对哪类资源执行了什么操作及结果，必要时记录请求追踪号，但避免保存完整令牌。限流与异常检测帮助应对暴力尝试，不能代替正确授权。安全结论应描述实际验证过的边界，不能把“JWT无状态”解释成不需要会话撤销、密钥维护或服务端策略。"}</BookParagraph>
<BookList items={[<a key="https://learn.microsoft.com/en-us/aspnet/core/security/authentication/configure-jwt-bearer-authentication" href="https://learn.microsoft.com/en-us/aspnet/core/security/authentication/configure-jwt-bearer-authentication" target="_blank" rel="noopener noreferrer" className="underline">{"ASP.NET Core JWT验证"}</a>]} />
</div>) },
  {
    label: '安全实践',
    left: (
      <div className="space-y-4">
        <PageTitle>常见安全实践</PageTitle>
        <BookParagraph>保障应用安全需要从多个层面采取防护措施。</BookParagraph>
        <BookList items={[
          '输入校验与防注入——使用参数化查询，避免SQL注入',
          'HTTPS与加密传输——强制使用HTTPS，保护数据传输',
          '最小权限原则——仅授予必要权限，减少攻击面',
          '密码哈希存储——使用BCrypt或PBKDF2哈希密码',
          'CSRF防护——使用AntiForgeryToken防止跨站请求伪造',
          'CORS配置——限制跨域请求的来源',
        ]} />
        <BookCode language="csharp" showLineNumbers code={`// 强制 HTTPS
app.UseHttpsRedirection();

// CORS 配置
builder.Services.AddCors(options => {
    options.AddPolicy("AllowSpecific",
        policy => policy.WithOrigins("https://myapp.com")
                        .AllowAnyHeader()
                        .AllowAnyMethod());
});`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>课后练习</PageTitle>
        <div className="p-3 bg-paper-200/80 rounded-md border border-paper-300">
          <p className="text-sm text-ink font-medium mb-1">练习题</p>
          <BookList items={[
            '配置 JWT 认证并生成Token',
            '实现一个需要 Admin 角色的 API 接口',
            '配置 CORS 策略限制跨域请求',
            '实现密码哈希存储和验证功能',
          ]} />
        </div>
        <BookCode language="csharp" showLineNumbers code={`// 参考：生成JWT Token
var tokenHandler = new JwtSecurityTokenHandler();
var key = Encoding.UTF8.GetBytes("your-secret-key");
var tokenDescriptor = new SecurityTokenDescriptor {
    Subject = new ClaimsIdentity(new[] {
        new Claim(ClaimTypes.Name, "admin"),
        new Claim(ClaimTypes.Role, "Admin")
    }),
    Expires = DateTime.UtcNow.AddHours(1),
    SigningCredentials = new SigningCredentials(
        new SymmetricSecurityKey(key),
        SecurityAlgorithms.HmacSha256Signature)
};
var token = tokenHandler.CreateToken(tokenDescriptor);
var tokenString = tokenHandler.WriteToken(token);`} />
      </div>
    ),
  },
]

export default function DotnetSecurityPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
