"use client";
import React, { useState } from "react";
import Link from "next/link";

const tabList = [
  { key: "concept", label: "专项测试概念" },
  { key: "types", label: "专项测试类型" },
  { key: "automation", label: "专项测试自动化" },
  { key: "bestPractices", label: "最佳实践" }
] as const;

type TabKey = typeof tabList[number]['key'];

interface TabContent {
  desc: string[];
  exampleTitle: string;
  example: React.ReactNode;
}

const tabContent: Record<TabKey, TabContent> = {
  concept: {
    desc: [
      "专项测试是针对软件的某一特定方面进行的深入测试，如安全性、性能、兼容性、可用性等。",
      "通过专项测试，可以发现常规功能测试难以覆盖的潜在风险。"
    ],
    exampleTitle: "专项测试场景举例",
    example: (
      <div>
        <p>如对电商系统进行安全专项测试，重点关注SQL注入、XSS等漏洞。</p>
      </div>
    )
  },
  types: {
    desc: [
      "常见专项测试类型包括：安全测试、性能测试、兼容性测试、可用性测试、可靠性测试等。",
      "每种专项测试都有其独特的测试方法和工具。"
    ],
    exampleTitle: "专项测试类型与工具",
    example: (
      <ul className="list-disc pl-5">
        <li>安全测试：OWASP ZAP、Burp Suite</li>
        <li>性能测试：JMeter、LoadRunner</li>
        <li>兼容性测试：BrowserStack、Sauce Labs</li>
      </ul>
    )
  },
  automation: {
    desc: [
      "专项测试也可以通过自动化工具提升效率和覆盖率。",
      "如性能专项测试可用JMeter脚本自动化执行，安全专项测试可用自动化扫描工具。"
    ],
    exampleTitle: "JMeter 性能专项测试脚本示例",
    example: (
      <pre className="bg-gray-100 p-4 rounded text-xs overflow-x-auto">
{`// 使用 Node.js 启动 JMeter 性能测试
const { exec } = require('child_process');
exec('jmeter -n -t test_plan.jmx -l result.jtl', (err, stdout, stderr) => {
  if (err) {
    console.error('性能测试执行失败:', err);
    return;
  }
  console.log('性能测试完成:', stdout);
});
`}
      </pre>
    )
  },
  bestPractices: {
    desc: [
      "制定专项测试计划，明确测试目标和范围。",
      "选择合适的工具和方法，结合自动化手段提升效率。",
      "测试结果要有详细记录，便于后续分析和改进。"
    ],
    exampleTitle: "专项测试最佳实践",
    example: (
      <ul className="list-disc pl-5">
        <li>定期进行安全专项测试，防止新漏洞引入。</li>
        <li>性能专项测试应覆盖高并发、极端场景。</li>
        <li>兼容性专项测试要覆盖主流设备和浏览器。</li>
      </ul>
    )
  }
};

export default function SpecialTestingPage() {
  const [currentTab, setCurrentTab] = useState<TabKey>("concept");
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">专项测试</h1>
      {/* 标签页导航 */}
      <div className="flex space-x-4 mb-6 border-b overflow-x-auto">
        {tabList.map(tab => (
          <button
            key={tab.key}
            onClick={() => setCurrentTab(tab.key)}
            className={`px-4 py-2 font-medium whitespace-nowrap ${currentTab === tab.key ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {/* 主要内容 */}
      <div className="bg-white rounded-lg shadow-md p-6 min-h-[320px]">
        <h2 className="text-xl font-semibold mb-4 text-blue-600">{tabList.find(tab => tab.key === currentTab)?.label}</h2>
        {/* 描述部分 */}
        <ul className="list-disc pl-5 text-gray-700 space-y-2 mb-6">
          {tabContent[currentTab]?.desc.map((paragraph, index) => (
            <li key={index}>{paragraph}</li>
          ))}
        </ul>
        {/* 示例部分 */}
        <div>
          <h3 className="font-semibold mb-2">{tabContent[currentTab]?.exampleTitle}</h3>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            {tabContent[currentTab]?.example}
          </div>
        </div>
      </div>
      {/* 底部导航 */}
      <div className="mt-10 flex justify-between">
        <Link href="/study/se/standards-testing/management" className="px-4 py-2 text-blue-600 hover:text-blue-800">测试管理 →</Link>
        <Link href="/study/se/standards-testing/case" className="px-4 py-2 text-blue-600 hover:text-blue-800">实际项目案例 →</Link>
      </div>
    </div>
  );
} 