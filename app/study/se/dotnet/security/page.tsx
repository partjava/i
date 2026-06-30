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
        <BookParagraph>JWT（JSON Web Token）是无状态的认证方案，广泛应用于API安全保护。</BookParagraph>
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
