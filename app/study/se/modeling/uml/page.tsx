'use client';
export default function UMLModelingPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">UML建模</h1>
      <div className="bg-white rounded-lg shadow p-8">
        <h2 className="text-2xl font-bold mb-4">UML概述</h2>
        <ul className="mb-4 space-y-2 text-gray-700">
          <li>• UML的定义与作用</li>
          <li>• UML的基本组成</li>
          <li>• UML的工作流程</li>
        </ul>
        <h2 className="text-2xl font-bold mb-4">UML示例</h2>
        <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto mb-6">
{`# 示例代码
class User {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  getInfo() {
    return \`\${this.name} is \${this.age} years old\`;
  }
}`}
        </pre>
      </div>
      <div className="mt-10 flex justify-between">
        <a href="/study/se/modeling/basic" className="px-4 py-2 text-blue-600 hover:text-blue-800">
          ← 软件建模基础
        </a>
        <a href="/study/se/modeling/patterns" className="px-4 py-2 text-blue-600 hover:text-blue-800">
          设计模式 →
        </a>
      </div>
    </div>
  );
} 