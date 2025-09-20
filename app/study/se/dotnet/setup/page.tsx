'use client';
export default function DotnetSetupPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">开发环境配置</h1>
      <div className="bg-white rounded-lg shadow p-8">
        <h2 className="text-2xl font-bold mb-4">.NET SDK与开发工具安装</h2>
        <ul className="mb-4 space-y-2 text-gray-700">
          <li>• 安装.NET SDK（<a href="https://dotnet.microsoft.com/download" className="text-blue-600 underline" target="_blank">官方下载</a>）</li>
          <li>• 推荐使用Visual Studio或VS Code</li>
        </ul>
        <h2 className="text-2xl font-bold mb-4">项目创建与管理</h2>
        <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto mb-6">
{`# 创建控制台项目
dotnet new console -n HelloDotnet
cd HelloDotnet
# 运行项目
dotnet run`}
        </pre>
        <h2 className="text-2xl font-bold mb-4">常用插件与调试工具</h2>
        <ul className="mb-4 space-y-2 text-gray-700">
          <li>• C#插件（VS Code）</li>
          <li>• NuGet包管理器</li>
          <li>• 调试与断点、日志输出</li>
        </ul>
      </div>
      <div className="mt-10 flex justify-between">
        <a href="/study/se/dotnet/intro" className="px-4 py-2 text-blue-600 hover:text-blue-800">
          ← 概述
        </a>
        <a href="/study/se/dotnet/csharp" className="px-4 py-2 text-blue-600 hover:text-blue-800">
          C#基础与语法 →
        </a>
      </div>
    </div>
  );
} 