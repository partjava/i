"use client";
import React, { useState } from "react";
import Link from "next/link";

const tabList = [
  { key: "concept", label: "单元测试概念" },
  { key: "framework", label: "单元测试框架" },
  { key: "example", label: "单元测试示例" },
  { key: "best", label: "最佳实践" }
];

// 定义测试框架数据结构
type TestFramework = {
  name: string;
  language: string;
  description: string;
  features: string[];
  example: string;
};

// 测试框架列表
const testFrameworks: TestFramework[] = [
  {
    name: "Jest",
    language: "JavaScript/TypeScript",
    description: "JavaScript 最流行的测试框架，由 Facebook 开发，内置断言、模拟和覆盖率工具。",
    features: ["零配置", "快照测试", "并行测试", "自动模拟"],
    example: "test('adds 1 + 2 to equal 3', () => { expect(sum(1, 2)).toBe(3); });"
  },
  {
    name: "JUnit",
    language: "Java",
    description: "Java 领域最经典的单元测试框架，广泛应用于各种 Java 项目。",
    features: ["注解驱动", "参数化测试", "测试套件", "与 IDE 集成良好"],
    example: "@Test public void testAddition() { assertEquals(3, Calculator.add(1, 2)); }"
  },
  {
    name: "pytest",
    language: "Python",
    description: "Python 中功能强大的测试框架，支持简单的单元测试和复杂的功能测试。",
    features: ["断言重写", "测试装置", "参数化", "插件系统"],
    example: "def test_addition(): assert add(1, 2) == 3"
  },
  {
    name: "xUnit.net",
    language: "C#",
    description: "专为 .NET 平台设计的单元测试框架，支持多种 .NET 实现。",
    features: ["灵活的测试发现", "理论测试", "并行执行", "与 Visual Studio 集成"],
    example: "[Fact] public void TestAddition() { Assert.Equal(3, Calculator.Add(1, 2)); }"
  }
];

const tabContent: Record<string, { desc: string[]; exampleTitle: string; example: React.ReactNode }> = {
  concept: {
    desc: [
      "单元测试是对软件中的最小可测试单元（如函数、方法、类）进行测试的过程。",
      "单元测试的主要目的是验证代码的功能是否正确，确保每个单元都能按预期工作。",
      "单元测试通常由开发人员编写，应该是自动化的、独立的、可重复执行的。",
      "良好的单元测试可以提高代码质量、简化调试过程、支持重构和持续集成。"
    ],
    exampleTitle: "单元测试在测试金字塔中的位置",
    example: (
      <div className="bg-gray-50 p-4 rounded border border-gray-200">
        <svg width="300" height="200" viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <polygon points="50,150 150,50 250,150" fill="#e3e8f7" stroke="#3b82f6" strokeWidth="2" />
          <polygon points="70,130 150,70 230,130" fill="#f1f5f9" stroke="#3b82f6" strokeWidth="2" />
          <polygon points="90,110 150,90 210,110" fill="#e0f2fe" stroke="#3b82f6" strokeWidth="2" />
          <text x="150" y="130" textAnchor="middle" fontSize="14" fill="#1e293b">单元测试</text>
          <text x="150" y="90" textAnchor="middle" fontSize="14" fill="#1e293b">集成测试</text>
          <text x="150" y="60" textAnchor="middle" fontSize="14" fill="#1e293b">端到端测试</text>
          <text x="150" y="180" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#1e293b">测试金字塔</text>
        </svg>
      </div>
    )
  },
  framework: {
    desc: [
      "单元测试框架提供了编写和运行测试的基础设施，包括测试发现、断言库、测试报告等功能。",
      "不同的编程语言通常有自己流行的测试框架，如 JavaScript 的 Jest、Java 的 JUnit、Python 的 pytest 等。",
      "测试框架可以帮助简化测试代码的编写，提供丰富的断言方法和测试工具。",
      "一些框架还支持高级功能，如测试覆盖率分析、并行测试执行和测试装置管理。"
    ],
    exampleTitle: "常见编程语言的单元测试框架对比",
    example: (
      <table className="w-full bg-gray-50 rounded text-sm border border-gray-200">
        <thead>
          <tr className="bg-gray-100 border-b border-gray-200">
            <th className="p-3 text-left font-medium">框架名称</th>
            <th className="p-3 text-left font-medium">编程语言</th>
            <th className="p-3 text-left font-medium">特点</th>
            <th className="p-3 text-left font-medium">简单示例</th>
          </tr>
        </thead>
        <tbody>
          {testFrameworks.map((framework, index) => (
            <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
              <td className="p-3 font-medium border-b border-gray-200">{framework.name}</td>
              <td className="p-3 border-b border-gray-200">{framework.language}</td>
              <td className="p-3 border-b border-gray-200">
                <ul className="list-disc pl-5 space-y-1">
                  {framework.features.map((feature, i) => (
                    <li key={i}>{feature}</li>
                  ))}
                </ul>
              </td>
              <td className="p-3 border-b border-gray-200">
                <code className="bg-gray-100 px-2 py-1 rounded text-xs font-mono">
                  {framework.example}
                </code>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  },
  example: {
    desc: [
      "单元测试通常遵循 Arrange-Act-Assert (AAA) 模式：准备测试数据、执行测试操作、验证结果。",
      "测试用例应该专注于一个特定的功能点，保持测试的独立性和原子性。",
      "使用断言库验证预期结果，处理边界条件和异常情况。",
      "对于依赖外部资源的代码，通常使用模拟对象 (Mock) 来隔离测试。"
    ],
    exampleTitle: "JavaScript 函数的单元测试示例（使用 Jest）",
    example: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h4 className="font-semibold mb-2 text-gray-800">被测试的代码 (sum.js)</h4>
          <pre className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-gray-800 text-sm overflow-x-auto font-mono">
{`// sum.js
function sum(a, b) {
  return a + b;
}

function divide(a, b) {
  if (b === 0) {
    throw new Error('除数不能为零');
  }
  return a / b;
}

module.exports = { sum, divide };`}
          </pre>
        </div>
        <div>
          <h4 className="font-semibold mb-2 text-gray-800">测试代码 (sum.test.js)</h4>
          <pre className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-gray-800 text-sm overflow-x-auto font-mono">
{`// sum.test.js
const { sum, divide } = require('./sum');

describe('sum 函数测试', () => {
  test('两个正数相加', () => {
    // Arrange
    const a = 1;
    const b = 2;
    
    // Act
    const result = sum(a, b);
    
    // Assert
    expect(result).toBe(3);
  });

  test('正数和负数相加', () => {
    expect(sum(5, -3)).toBe(2);
  });
});

describe('divide 函数测试', () => {
  test('正常除法', () => {
    expect(divide(10, 2)).toBe(5);
  });

  test('除以零应抛出错误', () => {
    expect(() => divide(10, 0)).toThrow('除数不能为零');
  });
});`}
          </pre>
        </div>
      </div>
    )
  },
  best: {
    desc: [
      "保持测试代码与生产代码的隔离，通常放在单独的测试目录中。",
      "编写原子测试，每个测试只关注一个功能点，确保测试的独立性。",
      "使用有意义的测试名称，清晰表达测试目的。",
      "测试边界条件和异常情况，确保代码的健壮性。",
      "定期运行测试，理想情况下每次代码变更后都运行测试。",
      "保持测试代码的质量，与生产代码同样对待。",
      "使用测试覆盖率工具评估测试的完整性，但不要仅追求高覆盖率。"
    ],
    exampleTitle: "单元测试最佳实践检查清单",
    example: (
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <ul className="space-y-3">
          <li className="flex items-start">
            <i className="fa fa-check-circle text-green-600 mt-0.5 mr-2"></i>
            <span className="text-gray-800">每个测试只验证一个特定的功能点</span>
          </li>
          <li className="flex items-start">
            <i className="fa fa-check-circle text-green-600 mt-0.5 mr-2"></i>
            <span className="text-gray-800">测试名称清晰描述测试场景（如 testUserLoginSuccess）</span>
          </li>
          <li className="flex items-start">
            <i className="fa fa-check-circle text-green-600 mt-0.5 mr-2"></i>
            <span className="text-gray-800">使用测试装置 (Fixture) 共享公共设置</span>
          </li>
          <li className="flex items-start">
            <i className="fa fa-check-circle text-green-600 mt-0.5 mr-2"></i>
            <span className="text-gray-800">测试执行时间短，避免依赖外部资源</span>
          </li>
          <li className="flex items-start">
            <i className="fa fa-check-circle text-green-600 mt-0.5 mr-2"></i>
            <span className="text-gray-800">处理边界条件（如空值、最大值、最小值）</span>
          </li>
          <li className="flex items-start">
            <i className="fa fa-check-circle text-green-600 mt-0.5 mr-2"></i>
            <span className="text-gray-800">使用 Mock 对象隔离外部依赖</span>
          </li>
          <li className="flex items-start">
            <i className="fa fa-check-circle text-green-600 mt-0.5 mr-2"></i>
            <span className="text-gray-800">测试失败时提供明确的错误信息</span>
          </li>
          <li className="flex items-start">
            <i className="fa fa-exclamation-circle text-yellow-600 mt-0.5 mr-2"></i>
            <span className="text-gray-800">避免在测试中使用随机数据，确保测试可重复</span>
          </li>
          <li className="flex items-start">
            <i className="fa fa-exclamation-circle text-yellow-600 mt-0.5 mr-2"></i>
            <span className="text-gray-800">不要为了提高覆盖率而编写无意义的测试</span>
          </li>
        </ul>
      </div>
    )
  }
};

export default function UnitTestPage() {
  const [activeTab, setActiveTab] = useState("concept");
  const current = tabContent[activeTab];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">单元测试</h1>
      {/* Tab 导航 */}
      <div className="flex space-x-4 mb-6 border-b overflow-x-auto">
        {tabList.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 font-medium whitespace-nowrap ${activeTab === tab.key ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {/* 内容区 */}
      <div className="bg-white rounded-lg shadow-sm p-6 min-h-[320px] border border-gray-100">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">{tabList.find(t => t.key === activeTab)?.label}</h2>
        <ul className="list-disc pl-5 text-gray-700 space-y-2 mb-6">
          {current.desc.map((d, i) => (
            <li key={i}>{d}</li>
          ))}
        </ul>
        <div>
          <h3 className="font-semibold mb-2 text-gray-800">{current.exampleTitle}</h3>
          {current.example}
        </div>
      </div>
      {/* 底部导航 */}
      <div className="mt-10 flex justify-between">
        <Link href="/study/se/standards-testing/basic" className="px-4 py-2 text-blue-600 hover:text-blue-800">测试基础 →</Link>
        <Link href="/study/se/standards-testing/integration" className="px-4 py-2 text-blue-600 hover:text-blue-800">集成测试 →</Link>
      </div>
    </div>
  );
}