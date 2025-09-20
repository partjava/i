'use client';
export default function GameProjectsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">实战案例与项目</h1>
      <div className="bg-white rounded-lg shadow p-8">
        <h2 className="text-2xl font-bold mb-4">实战案例概述</h2>
        <ul className="mb-4 space-y-2 text-gray-700">
          <li>• 实战案例的定义与作用</li>
          <li>• 实战案例的基本组成</li>
          <li>• 实战案例的工作流程</li>
        </ul>
        <h2 className="text-2xl font-bold mb-4">实战案例示例</h2>
        <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto mb-6">
{`# 示例代码
class Game {
  constructor(name, genre) {
    this.name = name;
    this.genre = genre;
  }
  getInfo() {
    return \`Game: \${this.name}, Genre: \${this.genre}\`;
  }
}`}
        </pre>
      </div>
      <div className="mt-10 flex justify-between">
        <a href="/study/se/game/release" className="px-4 py-2 text-blue-600 hover:text-blue-800">
          ← 游戏发布
        </a>
        <a href="/study/se/game/engine" className="px-4 py-2 text-blue-600 hover:text-blue-800">
          游戏引擎 →
        </a>
      </div>
    </div>
  );
} 