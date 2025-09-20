'use client';
export default function DotnetTestingPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">测试与调试</h1>
      <div className="bg-white rounded-lg shadow p-8">
        <h2 className="text-2xl font-bold mb-4">单元测试（xUnit）</h2>
        <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto mb-6">
{`[Fact]
public void AddTest() {
    Assert.Equal(4, 2 + 2);
}`}
        </pre>
        <h2 className="text-2xl font-bold mb-4">集成测试</h2>
        <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto mb-6">
{`public class ApiTests : IClassFixture<WebApplicationFactory<Startup>> {
    ...
}`}
        </pre>
        <h2 className="text-2xl font-bold mb-4">日志与性能分析</h2>
        <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
{`logger.LogInformation("调试信息");
// 性能分析可用dotnet-counters、dotTrace等工具`}
        </pre>
      </div>
      <div className="mt-10 flex justify-between">
        <a href="/study/se/dotnet/deploy" className="px-4 py-2 text-blue-600 hover:text-blue-800">
          ← 部署与运维
        </a>
        <a href="/study/se/dotnet/projects" className="px-4 py-2 text-blue-600 hover:text-blue-800">
          实战项目与案例 →
        </a>
      </div>
    </div>
  );
} 