'use client';
export default function AnimationBasicPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">动画基础</h1>
      <div className="bg-white rounded-lg shadow p-8">
        <h2 className="text-2xl font-bold mb-4">动画概述</h2>
        <ul className="mb-4 space-y-2 text-gray-700">
          <li>• 动画的定义与作用</li>
          <li>• 动画的基本组成</li>
          <li>• 动画的工作流程</li>
        </ul>
        <h2 className="text-2xl font-bold mb-4">动画示例</h2>
        <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto mb-6">
{`# 示例代码
class Animation {
  constructor(name, duration) {
    this.name = name;
    this.duration = duration;
  }
  play() {
    return \`Playing \${this.name} for \${this.duration} seconds\`;
  }
}`}
        </pre>
      </div>
      <div className="mt-10 flex justify-between">
        <a href="/study/se/game" className="px-4 py-2 text-blue-600 hover:text-blue-800">
          ← 动画与游戏设计
        </a>
        <a href="/study/se/game/design" className="px-4 py-2 text-blue-600 hover:text-blue-800">
          游戏设计 →
        </a>
      </div>
    </div>
  );
} 