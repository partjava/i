'use client';
export default function DotnetIntroPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">.NET开发概述</h1>
      <div className="bg-white rounded-lg shadow p-8">
        <h2 className="text-2xl font-bold mb-4">平台简介</h2>
        <p className="mb-4 text-gray-700">.NET是由微软开发的跨平台开发框架，支持Web、桌面、移动、云等多种应用场景。</p>
        <h2 className="text-2xl font-bold mb-4">发展历程</h2>
        <ul className="mb-4 space-y-2 text-gray-700">
          <li>• 2002年.NET Framework发布</li>
          <li>• 2016年.NET Core开源，支持跨平台</li>
          <li>• 2020年.NET 5统一平台</li>
        </ul>
        <h2 className="text-2xl font-bold mb-4">主流应用场景</h2>
        <ul className="mb-4 space-y-2 text-gray-700">
          <li>• Web应用开发（ASP.NET）</li>
          <li>• 桌面与移动应用</li>
          <li>• 云原生与微服务</li>
        </ul>
        <h2 className="text-2xl font-bold mb-4">Hello World代码示例</h2>
        <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
{`using System;
class Program {
    static void Main() {
        Console.WriteLine("Hello, .NET!");
    }
}`}
        </pre>
      </div>
      <div className="mt-10 flex justify-end">
        <a href="/study/se/dotnet/setup" className="px-4 py-2 text-blue-600 hover:text-blue-800">
          开发环境配置 →
        </a>
      </div>
    </div>
  );
} 