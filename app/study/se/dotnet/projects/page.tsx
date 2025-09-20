'use client';
export default function DotnetProjectsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">实战项目与案例</h1>
      <div className="bg-white rounded-lg shadow p-8">
        <h2 className="text-2xl font-bold mb-4">项目开发流程</h2>
        <ul className="mb-4 space-y-2 text-gray-700">
          <li>• 需求分析与原型设计</li>
          <li>• 架构设计与技术选型</li>
          <li>• 代码开发与测试</li>
          <li>• 部署上线与运维</li>
        </ul>
        <h2 className="text-2xl font-bold mb-4">综合案例：Todo API</h2>
        <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto mb-6">
{`[HttpPost]
public IActionResult AddTodo([FromBody] Todo todo) {
    // 保存逻辑
    return Ok();
}`}
        </pre>
        <h2 className="text-2xl font-bold mb-4">常见问题与面试题</h2>
        <ul className="mb-4 space-y-2 text-gray-700">
          <li>• EF Core与Dapper的区别？</li>
          <li>• 如何实现依赖注入？</li>
          <li>• .NET如何做API安全？</li>
        </ul>
      </div>
      <div className="mt-10 flex justify-start">
        <a href="/study/se/dotnet/testing" className="px-4 py-2 text-blue-600 hover:text-blue-800">
          ← 测试与调试
        </a>
      </div>
    </div>
  );
} 