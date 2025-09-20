// pages/study/se/standards - testing/management.js
"use client";
import React, { useState } from "react";
import Link from "next/link";

// 定义标签页配置
const tabList = [
  { key: "concept", label: "测试管理概念" },
  { key: "process", label: "测试管理流程" },
  { key: "tools", label: "测试管理工具" },
  { key: "transformation", label: "转型测试" },
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
      "测试管理是对软件测试活动进行计划、组织、协调、控制和监督的过程。",
      "其目的是确保测试工作按照预定的计划进行，保证测试的质量和效率，最终提高软件产品的质量。",
      "测试管理涵盖了从测试需求分析、测试计划制定、测试资源分配到测试结果评估等多个方面。"
    ],
    exampleTitle: "测试管理概念示例",
    example: (
      <div>
        <p>例如，在一个大型电商项目中，测试管理团队需要协调不同功能模块的测试工作。</p>
        <p>他们要确定每个模块的测试重点，比如购物车模块要重点测试商品添加、删除、数量变更等功能的准确性。</p>
      </div>
    )
  },
  process: {
    desc: [
      "测试管理流程通常起始于测试计划的制定，明确测试目标、范围、策略等。",
      "接着进行测试资源的准备，包括人力、硬件、软件等。",
      "在测试执行阶段，要实时监控测试进度，及时处理测试过程中发现的问题。",
      "最后是测试结果的分析和总结，为后续的软件改进提供依据。"
    ],
    exampleTitle: "测试管理流程示例",
    example: (
      <div>
        <p>以一个移动应用项目为例，在测试计划阶段，确定要测试的功能包括用户注册登录、商品浏览、下单支付等。</p>
        <p>然后安排测试人员，准备测试设备和测试数据。在测试执行时，记录每个测试用例的执行结果。</p>
        <p>最后根据测试结果，分析出应用在支付环节存在兼容性问题，反馈给开发团队进行修复。</p>
      </div>
    )
  },
  tools: {
    desc: [
      "测试管理工具能帮助提高测试管理的效率和质量。",
      "常见的测试管理工具如JIRA，它不仅可以用于缺陷跟踪，还能进行项目进度管理。",
      "TestRail则专注于测试用例管理和测试执行跟踪，方便测试团队进行系统化的测试工作。"
    ],
    exampleTitle: "测试管理工具示例",
    example: (
      <div>
        <p>当使用JIRA时，测试人员可以创建不同类型的任务来表示测试用例、缺陷等。</p>
        <p>通过设置任务的优先级、状态等属性，方便团队成员之间的沟通和任务跟进。</p>
        <p>在TestRail中，可以将测试用例按照功能模块进行分类管理，在执行测试时，清晰地记录每个用例的执行情况。</p>
      </div>
    )
  },
  transformation: {
    desc: [
      "转型测试是指在系统升级、平台迁移或技术栈变更过程中，对新旧系统进行对比测试，确保业务功能和数据一致性。",
      "转型测试通常包括数据迁移验证、接口兼容性测试、回归测试等环节。",
      "自动化转型测试可以大幅提升效率，降低人工比对的出错率。"
    ],
    exampleTitle: "转型测试自动化脚本示例",
    example: (
      <pre className="bg-gray-100 p-4 rounded text-xs overflow-x-auto">
{`// 假设有新旧两个系统的API，自动对比数据一致性
const oldApi = 'https://old.example.com/api/data';
const newApi = 'https://new.example.com/api/data';

async function fetchData(api) {
  const res = await fetch(api);
  return res.json();
}

async function compareData() {
  const oldData = await fetchData(oldApi);
  const newData = await fetchData(newApi);
  if (JSON.stringify(oldData) === JSON.stringify(newData)) {
    console.log('数据一致，转型测试通过');
  } else {
    console.error('数据不一致，需人工排查');
  }
}

compareData();
`}
      </pre>
    )
  },
  bestPractices: {
    desc: [
      "在测试管理中，遵循最佳实践可以有效提升测试效果。",
      "例如，建立明确的测试计划和规范，确保所有测试活动都有章可循。",
      "加强团队沟通与协作，及时共享测试信息，避免信息不对称导致的问题。",
      "定期对测试结果进行回顾和分析，总结经验教训，持续改进测试管理流程。"
    ],
    exampleTitle: "测试管理最佳实践示例",
    example: (
      <div>
        <p>某公司在测试管理中，制定了详细的测试计划模板，每次项目开始前都严格按照模板制定计划。</p>
        <p>同时，每周组织测试团队和开发团队进行沟通会议，分享测试进展和发现的问题。</p>
        <p>通过定期的测试结果回顾，发现某个项目中因为测试数据准备不充分导致测试效率低下，后续项目中就重点改进了测试数据管理。</p>
      </div>
    )
  }
};

const TestingManagement = () => {
  const [currentTab, setCurrentTab] = useState<TabKey>("concept");

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">测试管理</h1>
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
        <Link href="/study/se/standards-testing/automation" className="px-4 py-2 text-blue-600 hover:text-blue-800">自动化测试 →</Link>
        <Link href="/study/se/standards-testing/special" className="px-4 py-2 text-blue-600 hover:text-blue-800">专项测试 →</Link>
      </div>
    </div>
  );
};

export default TestingManagement;