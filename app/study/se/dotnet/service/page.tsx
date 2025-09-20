'use client';
export default function DotnetServicePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">服务与中间件</h1>
      <div className="bg-white rounded-lg shadow p-8">
        <h2 className="text-2xl font-bold mb-4">依赖注入</h2>
        <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto mb-6">
{`services.AddScoped<IUserService, UserService>();`}
        </pre>
        <h2 className="text-2xl font-bold mb-4">配置与日志</h2>
        <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto mb-6">
{`ILogger<Program> logger = ...;
logger.LogInformation("App started");`}
        </pre>
        <h2 className="text-2xl font-bold mb-4">缓存与Session</h2>
        <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
{`services.AddDistributedMemoryCache();
services.AddSession();
app.UseSession();`}
        </pre>
      </div>
      <div className="mt-10 flex justify-between">
        <a href="/study/se/dotnet/db" className="px-4 py-2 text-blue-600 hover:text-blue-800">
          ← 数据库与EF Core
        </a>
        <a href="/study/se/dotnet/security" className="px-4 py-2 text-blue-600 hover:text-blue-800">
          安全与身份认证 →
        </a>
      </div>
    </div>
  );
} 