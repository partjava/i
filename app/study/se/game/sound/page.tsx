'use client';
export default function GameSoundPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">游戏音效</h1>
      <div className="bg-white rounded-lg shadow p-8">
        <h2 className="text-2xl font-bold mb-4">游戏音效概述</h2>
        <ul className="mb-4 space-y-2 text-gray-700">
          <li>• 游戏音效的定义与作用</li>
          <li>• 游戏音效的基本组成</li>
          <li>• 游戏音效的工作流程</li>
        </ul>
        <h2 className="text-2xl font-bold mb-4">游戏音效示例</h2>
        <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto mb-6">
{`# 示例代码
class GameSound {
  constructor(name, type) {
    this.name = name;
    this.type = type;
  }
  getInfo() {
    return \`Sound: \${this.name}, Type: \${this.type}\`;
  }
}`}
        </pre>
      </div>
      <div className="mt-10 flex justify-between">
        <a href="/study/se/game/art" className="px-4 py-2 text-blue-600 hover:text-blue-800">
          ← 游戏美术
        </a>
        <a href="/study/se/game/planning" className="px-4 py-2 text-blue-600 hover:text-blue-800">
          游戏策划 →
        </a>
      </div>
    </div>
  );
} 