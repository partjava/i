'use client';
export default function DotnetSecurityPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">安全与身份认证</h1>
      <div className="bg-white rounded-lg shadow p-8">
        <h2 className="text-2xl font-bold mb-4">身份认证与授权</h2>
        <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto mb-6">
{`services.AddAuthentication("Bearer")
    .AddJwtBearer(options => {
        options.TokenValidationParameters = ...;
    });`}
        </pre>
        <h2 className="text-2xl font-bold mb-4">JWT与OAuth2</h2>
        <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto mb-6">
{`[Authorize]
public IActionResult GetProfile() { ... }`}
        </pre>
        <h2 className="text-2xl font-bold mb-4">常见安全实践</h2>
        <ul className="mb-4 space-y-2 text-gray-700">
          <li>• 输入校验与防注入</li>
          <li>• HTTPS与加密传输</li>
          <li>• 最小权限原则</li>
        </ul>
      </div>
      <div className="mt-10 flex justify-between">
        <a href="/study/se/dotnet/service" className="px-4 py-2 text-blue-600 hover:text-blue-800">
          ← 服务与中间件
        </a>
        <a href="/study/se/dotnet/deploy" className="px-4 py-2 text-blue-600 hover:text-blue-800">
          部署与运维 →
        </a>
      </div>
    </div>
  );
} 