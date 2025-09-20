'use client';
export default function DotnetDeployPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">部署与运维</h1>
      <div className="bg-white rounded-lg shadow p-8">
        <h2 className="text-2xl font-bold mb-4">发布与部署流程</h2>
        <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto mb-6">
{`dotnet publish -c Release -o ./publish`}
        </pre>
        <h2 className="text-2xl font-bold mb-4">Docker容器化</h2>
        <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto mb-6">
{`FROM mcr.microsoft.com/dotnet/aspnet:7.0
WORKDIR /app
COPY ./publish .
ENTRYPOINT ["dotnet", "MyApp.dll"]`}
        </pre>
        <h2 className="text-2xl font-bold mb-4">云平台部署（Azure）</h2>
        <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
{`az webapp up --name my-dotnet-app --resource-group my-rg --runtime "DOTNET|7.0"`}
        </pre>
      </div>
      <div className="mt-10 flex justify-between">
        <a href="/study/se/dotnet/security" className="px-4 py-2 text-blue-600 hover:text-blue-800">
          ← 安全与身份认证
        </a>
        <a href="/study/se/dotnet/testing" className="px-4 py-2 text-blue-600 hover:text-blue-800">
          测试与调试 →
        </a>
      </div>
    </div>
  );
} 