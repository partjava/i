"use client";
import React, { useState } from "react";
import Link from "next/link";

// 定义测试用例和缺陷的数据结构
type TestCase = {
  id: number;
  title: string;
  input: { [key: string]: string };
  expected: string;
  result?: string;
};

type Defect = {
  id: number;
  description: string;
  status?: string;
};

const tabList = [
  { key: "basic", label: "测试基本概念" },
  { key: "types", label: "测试类型" },
  { key: "flow", label: "测试流程" },
  { key: "case", label: "测试用例设计" }
];

// 模拟测试执行函数
const performTest = (input: { [key: string]: string }): string => {
  // 这里是模拟实现，实际项目中会根据具体测试逻辑实现
  if (input.username === "wrongUser") {
    return "用户名错误";
  }
  return "登录成功";
};

// 模拟缺陷管理函数
const notifyDeveloper = (defect: Defect) => {
  console.log(`通知开发人员修复缺陷: ${defect.description}`);
};

const trackDefect = (defectId: number): boolean => {
  // 模拟跟踪缺陷状态，实际项目中会查询缺陷管理系统
  return true;
};

const verifyDefect = (defectId: number): boolean => {
  // 模拟验证缺陷修复情况，实际项目中会重新执行测试
  return true;
};

const closeDefect = (defectId: number) => {
  console.log(`缺陷 ${defectId} 已关闭`);
};

const tabContent: Record<string, { desc: string[]; exampleTitle: string; example: React.ReactNode }> = {
  basic: {
    desc: [
      "测试是为了评估软件的质量，发现软件中存在的缺陷。",
      "测试需要依据需求规格说明书、设计文档等进行，确保测试的全面性。",
      "测试不能证明软件没有缺陷，只能说明软件在测试过程中发现的问题。",
      "测试应尽早介入软件开发周期，从需求分析阶段就开始规划测试工作。"
    ],
    exampleTitle: "测试在软件开发中的位置示意图",
    example: (
      <div className="bg-gray-100 p-4 rounded">
        <svg width="400" height="200" viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="30" y="30" width="80" height="40" fill="#e3e8f7" stroke="#3b82f6" strokeWidth="2" rx="8" />
          <text x="70" y="55" textAnchor="middle" fontSize="14" fill="#1e293b">需求分析</text>
          <rect x="130" y="30" width="80" height="40" fill="#f1f5f9" stroke="#3b82f6" strokeWidth="2" rx="8" />
          <text x="170" y="55" textAnchor="middle" fontSize="14" fill="#1e293b">设计阶段</text>
          <rect x="230" y="30" width="80" height="40" fill="#e0f2fe" stroke="#3b82f6" strokeWidth="2" rx="8" />
          <text x="270" y="55" textAnchor="middle" fontSize="14" fill="#1e293b">编码阶段</text>
          <rect x="330" y="30" width="80" height="40" fill="#fef9c3" stroke="#f59e42" strokeWidth="2" rx="8" />
          <text x="370" y="55" textAnchor="middle" fontSize="14" fill="#92400e">测试阶段</text>
          <line x1="110" y1="50" x2="130" y2="50" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />
          <line x1="210" y1="50" x2="230" y="50" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />
          <line x1="310" y1="50" x2="330" y2="50" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />
          <defs>
            <marker id="arrow" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto" markerUnits="strokeWidth">
              <path d="M0,0 L10,5 L0,10 L3,5 Z" fill="#64748b" />
            </marker>
          </defs>
        </svg>
      </div>
    )
  },
  types: {
    desc: [
      "单元测试：对软件中的最小可测试单元（如函数、类）进行测试，验证其功能的正确性。",
      "集成测试：将多个单元组合在一起进行测试，检查组件之间的交互和接口是否正确。",
      "系统测试：从整体系统的角度出发，测试系统是否满足需求规格说明书中的功能和非功能需求。",
      "验收测试：由用户或客户进行的最终测试，确认软件是否符合业务需求和使用场景。",
      "性能测试：评估软件在不同负载下的性能指标，如响应时间、吞吐量等。",
      "安全测试：检测软件是否存在安全漏洞，如 SQL 注入、XSS 等。"
    ],
    exampleTitle: "不同测试类型的覆盖范围示意图",
    example: (
      <div className="bg-gray-100 p-4 rounded">
        <svg width="400" height="200" viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="30" y="30" width="80" height="40" fill="#e3e8f7" stroke="#3b82f6" strokeWidth="2" rx="8" />
          <text x="70" y="55" textAnchor="middle" fontSize="14" fill="#1e293b">单元测试</text>
          <rect x="130" y="30" width="80" height="40" fill="#f1f5f9" stroke="#3b82f6" strokeWidth="2" rx="8" />
          <text x="170" y="55" textAnchor="middle" fontSize="14" fill="#1e293b">集成测试</text>
          <rect x="230" y="30" width="80" height="40" fill="#e0f2fe" stroke="#3b82f6" strokeWidth="2" rx="8" />
          <text x="270" y="55" textAnchor="middle" fontSize="14" fill="#1e293b">系统测试</text>
          <rect x="30" y="100" width="80" height="40" fill="#fef9c3" stroke="#f59e42" strokeWidth="2" rx="8" />
          <text x="70" y="125" textAnchor="middle" fontSize="14" fill="#92400e">性能测试</text>
          <rect x="130" y="100" width="80" height="40" fill="#f1f5f9" stroke="#3b82f6" strokeWidth="2" rx="8" />
          <text x="170" y="125" textAnchor="middle" fontSize="14" fill="#1e293b">安全测试</text>
          <rect x="230" y="100" width="80" height="40" fill="#e0f2fe" stroke="#3b82f6" strokeWidth="2" rx="8" />
          <text x="270" y="125" textAnchor="middle" fontSize="14" fill="#1e293b">验收测试</text>
          <circle cx="180" cy="70" r="60" stroke="#64748b" strokeWidth="2" fill="none" />
          <circle cx="280" cy="70" r="80" stroke="#64748b" strokeWidth="2" fill="none" />
          <circle cx="180" cy="150" r="40" stroke="#64748b" strokeWidth="2" fill="none" />
          <circle cx="280" cy="150" r="50" stroke="#64748b" strokeWidth="2" fill="none" />
        </svg>
      </div>
    )
  },
  flow: {
    desc: [
      "测试计划：根据需求规格说明书和项目计划，确定测试的范围、目标、方法、资源等。",
      "测试设计：依据测试计划，设计测试用例和测试数据，包括正常情况、异常情况和边界情况的测试。",
      "测试执行：按照测试用例进行测试，记录测试结果，包括通过和失败的情况。",
      "测试评估：分析测试结果，找出软件中的缺陷，提出修复建议，并评估软件是否达到预期的质量标准。",
      "缺陷管理：对发现的缺陷进行跟踪和管理，确保缺陷得到及时修复和验证。",
      "测试报告：撰写测试报告，总结测试过程和结果，向相关人员汇报软件的质量情况。"
    ],
    exampleTitle: "测试流程的详细步骤伪代码示例",
    example: (
      <pre className="bg-gray-100 p-4 rounded text-xs overflow-x-auto">
{`// 测试计划
function createTestPlan(): { scope: string; objective: string; method: string; resources: string[] } {
  const scope = "功能测试";
  const objective = "验证系统功能是否正确";
  const method = "黑盒测试";
  const resources = ["测试人员", "测试设备"];
  return { scope, objective, method, resources };
}

// 测试设计
function designTestCases(): TestCase[] {
  const testCases: TestCase[] = [
    { id: 1, title: "正常登录测试", input: { username: "user", password: "password" }, expected: "登录成功" },
    { id: 2, title: "用户名错误测试", input: { username: "wrongUser", password: "password" }, expected: "用户名错误" }
  ];
  return testCases;
}

// 测试执行
function executeTests(testCases: TestCase[]): TestCase[] {
  testCases.forEach(caseItem => {
    const actual = performTest(caseItem.input);
    caseItem.result = actual === caseItem.expected ? "通过" : "失败";
  });
  return testCases;
}

// 测试评估
function evaluateTests(testCases: TestCase[]): Defect[] {
  const defectList: Defect[] = [];
  testCases.forEach(caseItem => {
    if (caseItem.result === "失败") {
      defectList.push({
        id: caseItem.id,
        description: \`测试用例 \${caseItem.title} 失败，预期 \${caseItem.expected}，实际 \${performTest(caseItem.input)}\`
      });
    }
  });
  return defectList;
}

// 缺陷管理
function manageDefects(defectList: Defect[]): void {
  defectList.forEach(defect => {
    // 通知开发人员修复缺陷
    notifyDeveloper(defect);
    // 跟踪缺陷修复情况
    const isFixed = trackDefect(defect.id);
    if (isFixed) {
      // 验证缺陷是否修复
      const verificationResult = verifyDefect(defect.id);
      if (verificationResult) {
        // 关闭缺陷
        closeDefect(defect.id);
      }
    }
  });
}

// 测试报告
function generateTestReport(testCases: TestCase[], defectList: Defect[]): {
  testPlan: ReturnType<typeof createTestPlan>;
  testCases: TestCase[];
  defectList: Defect[];
  passedCount: number;
  failedCount: number;
  overallAssessment: string;
} {
  const passedCount = testCases.filter(caseItem => caseItem.result === "通过").length;
  const failedCount = testCases.filter(caseItem => caseItem.result === "失败").length;
  const report = {
    testPlan: createTestPlan(),
    testCases,
    defectList,
    passedCount,
    failedCount,
    overallAssessment: failedCount === 0 ? "软件质量良好" : "软件存在缺陷，需修复"
  };
  return report;
}\``}
      </pre>
    )
  },
  case: {
    desc: [
      "测试用例应覆盖软件的所有功能需求，包括正常情况、异常情况和边界情况。",
      "每个测试用例应有明确的目的、输入数据、操作步骤和预期输出。",
      "测试用例应保持独立性，即一个测试用例的执行不应依赖于其他测试用例的结果。",
      "使用等价类划分、边界值分析、错误推测等方法设计测试用例。",
      "定期评审和更新测试用例，确保其有效性和准确性。"
    ],
    exampleTitle: "使用等价类划分设计登录功能测试用例",
    example: (
      <table className="w-full bg-gray-100 rounded text-xs">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 text-left">用例ID</th>
            <th className="p-2 text-left">测试场景</th>
            <th className="p-2 text-left">输入数据</th>
            <th className="p-2 text-left">操作步骤</th>
            <th className="p-2 text-left">预期输出</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-2">TC-001</td>
            <td className="p-2">正常登录</td>
            <td className="p-2">有效用户名和密码</td>
            <td className="p-2">输入用户名和密码，点击登录按钮</td>
            <td className="p-2">登录成功，跳转到主页</td>
          </tr>
          <tr>
            <td className="p-2">TC-002</td>
            <td className="p-2">用户名不存在</td>
            <td className="p-2">不存在的用户名，有效密码</td>
            <td className="p-2">输入用户名和密码，点击登录按钮</td>
            <td className="p-2">提示"用户名不存在"</td>
          </tr>
          <tr>
            <td className="p-2">TC-003</td>
            <td className="p-2">密码错误</td>
            <td className="p-2">有效用户名，错误密码</td>
            <td className="p-2">输入用户名和密码，点击登录按钮</td>
            <td className="p-2">提示"密码错误"</td>
          </tr>
          <tr>
            <td className="p-2">TC-004</td>
            <td className="p-2">用户名和密码为空</td>
            <td className="p-2">空用户名，空密码</td>
            <td className="p-2">点击登录按钮</td>
            <td className="p-2">提示"用户名和密码不能为空"</td>
          </tr>
        </tbody>
      </table>
    )
  }
};

export default function TestBasicPage() {
  const [activeTab, setActiveTab] = useState("basic");
  const current = tabContent[activeTab];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">测试基础</h1>
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
      <div className="bg-white rounded-lg shadow-md p-6 min-h-[320px]">
        <h2 className="text-xl font-semibold mb-4 text-blue-600">{tabList.find(t => t.key === activeTab)?.label}</h2>
        <ul className="list-disc pl-5 text-gray-700 space-y-2 mb-6">
          {current.desc.map((d, i) => (
            <li key={i}>{d}</li>
          ))}
        </ul>
        <div>
          <h3 className="font-semibold mb-2">{current.exampleTitle}</h3>
          {current.example}
        </div>
      </div>
      {/* 底部导航 */}
      <div className="mt-10 flex justify-between">
        <Link href="/study/se/standards-testing/spec" className="px-4 py-2 text-blue-600 hover:text-blue-800">开发规范 →</Link>
        <Link href="/study/se/standards-testing/unit" className="px-4 py-2 text-blue-600 hover:text-blue-800">单元测试 →</Link>
      </div>
    </div>
  );
}