'use client';
export default function GameEnginePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">游戏引擎</h1>
      <div className="bg-white rounded-lg shadow p-8">
        <h2 className="text-2xl font-bold mb-4">游戏引擎概述</h2>
        <ul className="mb-4 space-y-2 text-gray-700">
          <li>• 游戏引擎的定义与作用</li>
          <li>• 游戏引擎的基本组成</li>
          <li>• 游戏引擎的工作流程</li>
        </ul>
        <h2 className="text-2xl font-bold mb-4">游戏引擎示例</h2>
        <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto mb-6">
{`# 示例代码
class GameEngine {
  constructor(name, version) {
    this.name = name;
    this.version = version;
  }
  getInfo() {
    return \`Engine: \${this.name}, Version: \${this.version}\`;
  }
}`}
        </pre>
      </div>
      <div className="mt-10 flex justify-between">
        <a href="/study/se/game/projects" className="px-4 py-2 text-blue-600 hover:text-blue-800">
          ← 实战案例与项目
        </a>
        <a href="/study/se/game/art" className="px-4 py-2 text-blue-600 hover:text-blue-800">
          游戏美术 →
        </a>
      </div>
    </div>
  );
} 