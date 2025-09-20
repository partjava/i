"use client";
import React, { useState } from "react";
import Link from "next/link";

const tabList = [
  { key: "concept", label: "自动化测试概念" },
  { key: "frameworks", label: "测试框架对比" },
  { key: "design", label: "测试用例设计" },
  { key: "process", label: "执行流程" },
  { key: "tools", label: "自动化测试工具" },
  { key: "best", label: "最佳实践" }
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
      "自动化测试是使用自动化工具执行测试用例并自动验证测试结果的过程。",
      "与手动测试相比，自动化测试可以提高测试效率、减少重复劳动、提高测试覆盖率。",
      "自动化测试适用于回归测试、性能测试、持续集成/持续部署(CI/CD)流程中的测试环节。",
      "自动化测试需要适当的规划和维护，不适合一次性测试或探索性测试。"
    ],
    exampleTitle: "自动化测试与手动测试对比",
    example: (
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold mb-3 text-gray-800">手动测试</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <i className="fa fa-check-circle text-green-600 mt-0.5 mr-2"></i>
                <span className="text-gray-800">适合探索性测试和用户体验测试</span>
              </li>
              <li className="flex items-start">
                <i className="fa fa-check-circle text-green-600 mt-0.5 mr-2"></i>
                <span className="text-gray-800">不需要编写代码，测试人员可以直接执行</span>
              </li>
              <li className="flex items-start">
                <i className="fa fa-check-circle text-green-600 mt-0.5 mr-2"></i>
                <span className="text-gray-800">能够发现一些自动化测试难以发现的问题</span>
              </li>
              <li className="flex items-start">
                <i className="fa fa-times-circle text-red-600 mt-0.5 mr-2"></i>
                <span className="text-gray-800">测试执行速度慢，效率低</span>
              </li>
              <li className="flex items-start">
                <i className="fa fa-times-circle text-red-600 mt-0.5 mr-2"></i>
                <span className="text-gray-800">容易出现人为错误</span>
              </li>
              <li className="flex items-start">
                <i className="fa fa-times-circle text-red-600 mt-0.5 mr-2"></i>
                <span className="text-gray-800">难以实现大规模测试覆盖</span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-gray-800">自动化测试</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <i className="fa fa-check-circle text-green-600 mt-0.5 mr-2"></i>
                <span className="text-gray-800">测试执行速度快，效率高</span>
              </li>
              <li className="flex items-start">
                <i className="fa fa-check-circle text-green-600 mt-0.5 mr-2"></i>
                <span className="text-gray-800">可以重复执行相同的测试用例，结果一致</span>
              </li>
              <li className="flex items-start">
                <i className="fa fa-check-circle text-green-600 mt-0.5 mr-2"></i>
                <span className="text-gray-800">可以实现大规模测试覆盖</span>
              </li>
              <li className="flex items-start">
                <i className="fa fa-check-circle text-green-600 mt-0.5 mr-2"></i>
                <span className="text-gray-800">适合回归测试和持续集成/持续部署流程</span>
              </li>
              <li className="flex items-start">
                <i className="fa fa-times-circle text-red-600 mt-0.5 mr-2"></i>
                <span className="text-gray-800">需要编写代码，维护成本较高</span>
              </li>
              <li className="flex items-start">
                <i className="fa fa-times-circle text-red-600 mt-0.5 mr-2"></i>
                <span className="text-gray-800">不适合探索性测试和用户体验测试</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* 自动化测试与手动测试对比图 */}
        <div className="mt-6">
          <svg width="500" height="300" viewBox="0 0 500 300" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* 背景 */}
            <rect width="500" height="300" rx="4" fill="#f8fafc" />
            
            {/* 坐标轴 */}
            <line x1="50" y1="250" x2="450" y2="250" stroke="#94a3b8" strokeWidth="2" />
            <line x1="50" y1="250" x2="50" y2="50" stroke="#94a3b8" strokeWidth="2" />
            
            {/* Y轴标签 */}
            <text x="40" y="250" textAnchor="end" fontSize="12" fill="#64748b">0</text>
            <text x="40" y="200" textAnchor="end" fontSize="12" fill="#64748b">20</text>
            <text x="40" y="150" textAnchor="end" fontSize="12" fill="#64748b">40</text>
            <text x="40" y="100" textAnchor="end" fontSize="12" fill="#64748b">60</text>
            <text x="40" y="50" textAnchor="end" fontSize="12" fill="#64748b">80</text>
            
            {/* X轴标签 */}
            <text x="100" y="270" textAnchor="middle" fontSize="12" fill="#64748b">执行速度</text>
            <text x="180" y="270" textAnchor="middle" fontSize="12" fill="#64748b">测试覆盖</text>
            <text x="260" y="270" textAnchor="middle" fontSize="12" fill="#64748b">重复精度</text>
            <text x="340" y="270" textAnchor="middle" fontSize="12" fill="#64748b">维护成本</text>
            <text x="420" y="270" textAnchor="middle" fontSize="12" fill="#64748b">初期投入</text>
            
            {/* 手动测试数据 */}
            <rect x="80" y="200" width="30" height="50" fill="#3b82f6" rx="2" />
            <rect x="160" y="170" width="30" height="80" fill="#3b82f6" rx="2" />
            <rect x="240" y="190" width="30" height="60" fill="#3b82f6" rx="2" />
            <rect x="320" y="240" width="30" height="10" fill="#3b82f6" rx="2" />
            <rect x="400" y="240" width="30" height="10" fill="#3b82f6" rx="2" />
            
            {/* 自动化测试数据 */}
            <rect x="110" y="50" width="30" height="200" fill="#16a34a" rx="2" />
            <rect x="190" y="80" width="30" height="170" fill="#16a34a" rx="2" />
            <rect x="270" y="50" width="30" height="200" fill="#16a34a" rx="2" />
            <rect x="350" y="150" width="30" height="100" fill="#16a34a" rx="2" />
            <rect x="430" y="100" width="30" height="150" fill="#16a34a" rx="2" />
            
            {/* 图例 */}
            <rect x="50" y="20" width="20" height="10" fill="#3b82f6" />
            <text x="80" y="28" fontSize="12" fill="#64748b">手动测试</text>
            
            <rect x="150" y="20" width="20" height="10" fill="#16a34a" />
            <text x="180" y="28" fontSize="12" fill="#64748b">自动化测试</text>
            
            {/* 标题 */}
            <text x="250" y="30" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#1e293b">自动化测试与手动测试对比</text>
          </svg>
        </div>
      </div>
    )
  },
  frameworks: {
    desc: [
      "选择合适的自动化测试框架是成功实施自动化测试的关键。",
      "不同的测试框架适用于不同的应用类型和测试需求。",
      "常见的自动化测试框架包括Selenium、Appium、JUnit、TestNG、Cypress等。",
      "选择测试框架时需要考虑学习曲线、社区支持、工具集成、性能和可维护性等因素。"
    ],
    exampleTitle: "主流自动化测试框架对比",
    example: (
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full bg-white rounded-lg border border-gray-200 text-sm">
            <thead>
              <tr className="bg-gray-100 border-b border-gray-200">
                <th className="p-3 text-left font-medium">框架名称</th>
                <th className="p-3 text-left font-medium">适用场景</th>
                <th className="p-3 text-left font-medium">编程语言</th>
                <th className="p-3 text-left font-medium">学习曲线</th>
                <th className="p-3 text-left font-medium">社区支持</th>
                <th className="p-3 text-left font-medium">工具集成</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200">
                <td className="p-3 font-medium" style={{ color: '#2196f3' }}>Selenium</td>
                <td className="p-3">Web应用测试</td>
                <td className="p-3">Java, Python, C#, JavaScript</td>
                <td className="p-3">中等</td>
                <td className="p-3">优秀</td>
                <td className="p-3">丰富</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="p-3 font-medium" style={{ color: '#4caf50' }}>Appium</td>
                <td className="p-3">移动应用测试</td>
                <td className="p-3">Java, Python, C#, JavaScript</td>
                <td className="p-3">中等</td>
                <td className="p-3">优秀</td>
                <td className="p-3">良好</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="p-3 font-medium" style={{ color: '#ec407a' }}>Cypress</td>
                <td className="p-3">Web应用端到端测试</td>
                <td className="p-3">JavaScript</td>
                <td className="p-3">低</td>
                <td className="p-3">优秀</td>
                <td className="p-3">良好</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="p-3 font-medium">JUnit</td>
                <td className="p-3">Java单元测试</td>
                <td className="p-3">Java</td>
                <td className="p-3">低</td>
                <td className="p-3">优秀</td>
                <td className="p-3">丰富</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="p-3 font-medium">TestNG</td>
                <td className="p-3">Java功能测试</td>
                <td className="p-3">Java</td>
                <td className="p-3">中等</td>
                <td className="p-3">良好</td>
                <td className="p-3">丰富</td>
              </tr>
              <tr>
                <td className="p-3 font-medium">Robot Framework</td>
                <td className="p-3">自动化测试框架</td>
                <td className="p-3">Python</td>
                <td className="p-3">低</td>
                <td className="p-3">良好</td>
                <td className="p-3">中等</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        {/* 框架对比雷达图 */}
        <div className="mt-6">
          <svg width="500" height="300" viewBox="0 0 500 300" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="500" height="300" rx="4" fill="#f8fafc" />
            <g transform="translate(250, 150)">
              {/* 雷达图网格 */}
              <circle cx="0" cy="0" r="100" fill="none" stroke="#e2e8f0" strokeWidth="1" />
              <circle cx="0" cy="0" r="80" fill="none" stroke="#e2e8f0" strokeWidth="1" />
              <circle cx="0" cy="0" r="60" fill="none" stroke="#e2e8f0" strokeWidth="1" />
              <circle cx="0" cy="0" r="40" fill="none" stroke="#e2e8f0" strokeWidth="1" />
              <circle cx="0" cy="0" r="20" fill="none" stroke="#e2e8f0" strokeWidth="1" />
              
              {/* 坐标轴 */}
              <line x1="0" y1="0" x2="0" y2="-100" stroke="#cbd5e1" strokeWidth="1" />
              <line x1="0" y1="0" x2="70.7" y2="-70.7" stroke="#cbd5e1" strokeWidth="1" />
              <line x1="0" y1="0" x2="100" y2="0" stroke="#cbd5e1" strokeWidth="1" />
              <line x1="0" y1="0" x2="70.7" y2="70.7" stroke="#cbd5e1" strokeWidth="1" />
              <line x1="0" y1="0" x2="0" y2="100" stroke="#cbd5e1" strokeWidth="1" />
              <line x1="0" y1="0" x2="-70.7" y2="70.7" stroke="#cbd5e1" strokeWidth="1" />
              
              {/* 标签 */}
              <text x="0" y="-110" textAnchor="middle" fontSize="10" fill="#475569">Web支持</text>
              <text x="80" y="-80" textAnchor="middle" fontSize="10" fill="#475569">移动支持</text>
              <text x="110" y="0" textAnchor="middle" fontSize="10" fill="#475569">学习难度</text>
              <text x="80" y="80" textAnchor="middle" fontSize="10" fill="#475569">社区活跃度</text>
              <text x="0" y="110" textAnchor="middle" fontSize="10" fill="#475569">工具集成</text>
              <text x="-80" y="80" textAnchor="middle" fontSize="10" fill="#475569">性能</text>
              
              {/* Selenium数据 */}
              <polygon points="0,-90 70,-60 90,0 60,60 40,80 -50,70" fill="rgba(33, 150, 243, 0.2)" stroke="#2196f3" strokeWidth="2" />
              <circle cx="0" cy="-90" r="3" fill="#2196f3" />
              <circle cx="70" cy="-60" r="3" fill="#2196f3" />
              <circle cx="90" cy="0" r="3" fill="#2196f3" />
              <circle cx="60" cy="60" r="3" fill="#2196f3" />
              <circle cx="40" cy="80" r="3" fill="#2196f3" />
              <circle cx="-50" cy="70" r="3" fill="#2196f3" />
              
              {/* Cypress数据 */}
              <polygon points="0,-80 40,-40 60,0 80,60 70,70 -30,50" fill="rgba(236, 64, 122, 0.2)" stroke="#ec407a" strokeWidth="2" />
              <circle cx="0" cy="-80" r="3" fill="#ec407a" />
              <circle cx="40" cy="-40" r="3" fill="#ec407a" />
              <circle cx="60" cy="0" r="3" fill="#ec407a" />
              <circle cx="80" cy="60" r="3" fill="#ec407a" />
              <circle cx="70" cy="70" r="3" fill="#ec407a" />
              <circle cx="-30" cy="50" r="3" fill="#ec407a" />
              
              {/* Appium数据 */}
              <polygon points="0,-60 90,-90 70,0 50,40 30,60 -40,60" fill="rgba(76, 175, 80, 0.2)" stroke="#4caf50" strokeWidth="2" />
              <circle cx="0" cy="-60" r="3" fill="#4caf50" />
              <circle cx="90" cy="-90" r="3" fill="#4caf50" />
              <circle cx="70" cy="0" r="3" fill="#4caf50" />
              <circle cx="50" cy="40" r="3" fill="#4caf50" />
              <circle cx="30" cy="60" r="3" fill="#4caf50" />
              <circle cx="-40" cy="60" r="3" fill="#4caf50" />
              
              {/* 图例 */}
              <circle cx="380" cy="20" r="5" fill="#2196f3" />
              <text x="400" y="24" fontSize="10" fill="#475569">Selenium</text>
              
              <circle cx="380" cy="40" r="5" fill="#ec407a" />
              <text x="400" y="44" fontSize="10" fill="#475569">Cypress</text>
              
              <circle cx="380" cy="60" r="5" fill="#4caf50" />
              <text x="400" y="64" fontSize="10" fill="#475569">Appium</text>
            </g>
          </svg>
        </div>
      </div>
    )
  },
  design: {
    desc: [
      "自动化测试用例设计是自动化测试的关键环节，直接影响测试效果和维护成本。",
      "测试用例应具有独立性、可重复性和可维护性，避免测试用例之间的依赖。",
      "测试用例应覆盖各种场景，包括正常情况、边界条件和异常情况。",
      "使用数据驱动测试和参数化测试可以提高测试用例的覆盖率和可维护性。",
      "测试用例应与需求和设计文档保持一致，确保测试的全面性。"
    ],
    exampleTitle: "自动化测试用例设计",
    example: (
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold mb-3 text-gray-800">测试用例设计原则</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <i className="fa fa-check-circle text-green-600 mt-0.5 mr-2"></i>
                <span className="text-gray-800">测试用例应独立，不依赖其他测试用例的执行结果</span>
              </li>
              <li className="flex items-start">
                <i className="fa fa-check-circle text-green-600 mt-0.5 mr-2"></i>
                <span className="text-gray-800">测试用例应具有可重复性，相同的输入应产生相同的结果</span>
              </li>
              <li className="flex items-start">
                <i className="fa fa-check-circle text-green-600 mt-0.5 mr-2"></i>
                <span className="text-gray-800">测试用例应覆盖各种场景，包括正常情况和异常情况</span>
              </li>
              <li className="flex items-start">
                <i className="fa fa-check-circle text-green-600 mt-0.5 mr-2"></i>
                <span className="text-gray-800">测试用例应简单明了，易于理解和维护</span>
              </li>
              <li className="flex items-start">
                <i className="fa fa-check-circle text-green-600 mt-0.5 mr-2"></i>
                <span className="text-gray-800">测试用例应具有明确的预期结果</span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-gray-800">测试用例设计方法</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <i className="fa fa-code text-blue-600 mt-0.5 mr-2"></i>
                <span className="text-gray-800">等价类划分：将输入数据划分为有效等价类和无效等价类</span>
              </li>
              <li className="flex items-start">
                <i className="fa fa-table text-purple-600 mt-0.5 mr-2"></i>
                <span className="text-gray-800">边界值分析：测试输入数据的边界值</span>
              </li>
              <li className="flex items-start">
                <i className="fa fa-list-alt text-red-600 mt-0.5 mr-2"></i>
                <span className="text-gray-800">决策表测试：基于决策表设计测试用例</span>
              </li>
              <li className="flex items-start">
                <i className="fa fa-sitemap text-green-600 mt-0.5 mr-2"></i>
                <span className="text-gray-800">状态转换测试：测试系统状态转换</span>
              </li>
              <li className="flex items-start">
                <i className="fa fa-database text-yellow-600 mt-0.5 mr-2"></i>
                <span className="text-gray-800">数据驱动测试：使用不同的数据执行相同的测试逻辑</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* 测试用例示例 */}
        <div className="mt-6">
          <h4 className="font-semibold mb-3 text-gray-800">测试用例示例</h4>
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-lg border border-gray-200 text-sm">
              <thead>
                <tr className="bg-gray-100 border-b border-gray-200">
                  <th className="p-3 text-left font-medium">测试用例ID</th>
                  <th className="p-3 text-left font-medium">测试用例名称</th>
                  <th className="p-3 text-left font-medium">测试步骤</th>
                  <th className="p-3 text-left font-medium">预期结果</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="p-3 font-medium">TC-LOGIN-001</td>
                  <td className="p-3">用户登录成功</td>
                  <td className="p-3">
                    <div>1. 打开登录页面</div>
                    <div>2. 输入正确的用户名和密码</div>
                    <div>3. 点击登录按钮</div>
                  </td>
                  <td className="p-3">
                    <div>1. 成功跳转到首页</div>
                    <div>2. 显示用户昵称</div>
                    <div>3. 显示登录成功提示</div>
                  </td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="p-3 font-medium">TC-LOGIN-002</td>
                  <td className="p-3">用户登录失败（用户名错误）</td>
                  <td className="p-3">
                    <div>1. 打开登录页面</div>
                    <div>2. 输入错误的用户名和正确的密码</div>
                    <div>3. 点击登录按钮</div>
                  </td>
                  <td className="p-3">
                    <div>1. 停留在登录页面</div>
                    <div>2. 显示"用户名不存在"提示</div>
                    <div>3. 密码输入框清空</div>
                  </td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="p-3 font-medium">TC-LOGIN-003</td>
                  <td className="p-3">用户登录失败（密码错误）</td>
                  <td className="p-3">
                    <div>1. 打开登录页面</div>
                    <div>2. 输入正确的用户名和错误的密码</div>
                    <div>3. 点击登录按钮</div>
                  </td>
                  <td className="p-3">
                    <div>1. 停留在登录页面</div>
                    <div>2. 显示"密码错误"提示</div>
                    <div>3. 密码输入框清空</div>
                    <div>4. 显示剩余尝试次数</div>
                  </td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">TC-LOGIN-004</td>
                  <td className="p-3">用户登录失败（验证码错误）</td>
                  <td className="p-3">
                    <div>1. 打开登录页面</div>
                    <div>2. 输入正确的用户名和密码</div>
                    <div>3. 输入错误的验证码</div>
                    <div>4. 点击登录按钮</div>
                  </td>
                  <td className="p-3">
                    <div>1. 停留在登录页面</div>
                    <div>2. 显示"验证码错误"提示</div>
                    <div>3. 验证码刷新</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  },
  process: {
    desc: [
      "自动化测试执行流程是指从测试计划到测试报告的完整过程，包括测试环境准备、测试用例执行、缺陷管理和测试报告生成等环节。",
      "一个完整的自动化测试流程有助于确保测试质量，提高测试效率，减少人工干预。",
      "自动化测试流程应与软件开发流程（如敏捷开发、瀑布模型）相集成，形成持续集成/持续部署(CI/CD)管道。",
      "测试执行过程中应记录详细的测试日志，便于问题追踪和结果分析。"
    ],
    exampleTitle: "自动化测试执行流程",
    example: (
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        {/* 测试流程步骤 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h4 className="font-semibold mb-3 text-gray-800">测试流程步骤</h4>
            <div className="space-y-4">
              <div className="flex">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">1</div>
                <div className="ml-4">
                  <h5 className="font-medium text-gray-800">测试计划制定</h5>
                  <p className="text-gray-600 text-sm">确定测试范围、测试目标、测试策略和资源需求</p>
                </div>
              </div>
              <div className="flex">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">2</div>
                <div className="ml-4">
                  <h5 className="font-medium text-gray-800">测试环境准备</h5>
                  <p className="text-gray-600 text-sm">搭建测试环境，配置测试工具和依赖</p>
                </div>
              </div>
              <div className="flex">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">3</div>
                <div className="ml-4">
                  <h5 className="font-medium text-gray-800">测试用例设计</h5>
                  <p className="text-gray-600 text-sm">设计测试用例，编写测试脚本</p>
                </div>
              </div>
              <div className="flex">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">4</div>
                <div className="ml-4">
                  <h5 className="font-medium text-gray-800">测试数据准备</h5>
                  <p className="text-gray-600 text-sm">准备测试数据，包括正常数据和异常数据</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-gray-800">测试流程步骤（续）</h4>
            <div className="space-y-4">
              <div className="flex">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">5</div>
                <div className="ml-4">
                  <h5 className="font-medium text-gray-800">测试执行</h5>
                  <p className="text-gray-600 text-sm">执行测试用例，记录测试结果</p>
                </div>
              </div>
              <div className="flex">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">6</div>
                <div className="ml-4">
                  <h5 className="font-medium text-gray-800">缺陷管理</h5>
                  <p className="text-gray-600 text-sm">发现缺陷，记录缺陷，跟踪缺陷修复</p>
                </div>
              </div>
              <div className="flex">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">7</div>
                <div className="ml-4">
                  <h5 className="font-medium text-gray-800">测试报告生成</h5>
                  <p className="text-gray-600 text-sm">生成测试报告，分析测试结果</p>
                </div>
              </div>
              <div className="flex">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">8</div>
                <div className="ml-4">
                  <h5 className="font-medium text-gray-800">测试总结与优化</h5>
                  <p className="text-gray-600 text-sm">总结测试经验，优化测试流程和测试用例</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* 测试流程示意图 */}
        <div className="mt-6">
          <svg width="600" height="400" viewBox="0 0 600 400" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="600" height="400" rx="4" fill="#f8fafc" />
            
            {/* 标题 */}
            <text x="300" y="30" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#1e293b">自动化测试执行流程</text>
            
            {/* 流程步骤 */}
            <rect x="50" y="80" width="120" height="60" rx="4" fill="#e0f2fe" stroke="#3b82f6" strokeWidth="2" />
            <text x="110" y="115" textAnchor="middle" fontSize="14" fill="#1e293b">测试计划</text>
            
            <rect x="220" y="80" width="120" height="60" rx="4" fill="#e0f2fe" stroke="#3b82f6" strokeWidth="2" />
            <text x="280" y="115" textAnchor="middle" fontSize="14" fill="#1e293b">环境准备</text>
            
            <rect x="390" y="80" width="120" height="60" rx="4" fill="#e0f2fe" stroke="#3b82f6" strokeWidth="2" />
            <text x="450" y="115" textAnchor="middle" fontSize="14" fill="#1e293b">测试设计</text>
            
            <rect x="50" y="180" width="120" height="60" rx="4" fill="#e0f2fe" stroke="#3b82f6" strokeWidth="2" />
            <text x="110" y="215" textAnchor="middle" fontSize="14" fill="#1e293b">测试执行</text>
            
            <rect x="220" y="180" width="120" height="60" rx="4" fill="#e0f2fe" stroke="#3b82f6" strokeWidth="2" />
            <text x="280" y="215" textAnchor="middle" fontSize="14" fill="#1e293b">结果分析</text>
            
            <rect x="390" y="180" width="120" height="60" rx="4" fill="#e0f2fe" stroke="#3b82f6" strokeWidth="2" />
            <text x="450" y="215" textAnchor="middle" fontSize="14" fill="#1e293b">缺陷管理</text>
            
            <rect x="220" y="280" width="120" height="60" rx="4" fill="#e0f2fe" stroke="#3b82f6" strokeWidth="2" />
            <text x="280" y="315" textAnchor="middle" fontSize="14" fill="#1e293b">测试报告</text>
            
            <rect x="390" y="280" width="120" height="60" rx="4" fill="#e0f2fe" stroke="#3b82f6" strokeWidth="2" />
            <text x="450" y="315" textAnchor="middle" fontSize="14" fill="#1e293b">测试优化</text>
            
            {/* 箭头 */}
            <defs>
              <marker id="arrowhead-blue" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" />
              </marker>
            </defs>
            
            <line x1="170" y1="110" x2="220" y2="110" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrowhead-blue)" />
            <line x1="340" y1="110" x2="390" y2="110" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrowhead-blue)" />
            <line x1="110" y1="140" x2="110" y2="180" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrowhead-blue)" />
            <line x1="280" y1="140" x2="280" y2="180" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrowhead-blue)" />
            <line x1="450" y1="140" x2="450" y2="180" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrowhead-blue)" />
            <line x1="170" y1="210" x2="220" y2="210" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrowhead-blue)" />
            <line x1="340" y1="210" x2="390" y2="210" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrowhead-blue)" />
            <line x1="340" y1="240" x2="280" y2="280" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrowhead-blue)" />
            <line x1="340" y1="310" x2="390" y2="310" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrowhead-blue)" />
            
            {/* 图例 */}
            <rect x="50" y="350" width="20" height="10" fill="#e0f2fe" stroke="#3b82f6" strokeWidth="2" />
            <text x="80" y="358" fontSize="12" fill="#1e293b">测试阶段</text>
          </svg>
        </div>
      </div>
    )
  },
  tools: {
    desc: [
      "自动化测试工具是实现自动化测试的基础，选择合适的工具对测试效率和质量至关重要。",
      "自动化测试工具可以分为功能测试工具、性能测试工具、单元测试工具、集成测试工具等。",
      "开源工具具有成本低、社区支持丰富的优势，商业工具则提供更完善的技术支持和功能。",
      "自动化测试工具应与开发工具链和CI/CD流程集成，实现自动化测试的无缝执行。"
    ],
    exampleTitle: "常用自动化测试工具",
    example: (
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold mb-3 text-gray-800">功能测试工具</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <i className="fa fa-code text-blue-600 mt-0.5 mr-2"></i>
                <span className="text-gray-800">Selenium - 用于Web应用的自动化测试</span>
              </li>
              <li className="flex items-start">
                <i className="fa fa-mobile text-green-600 mt-0.5 mr-2"></i>
                <span className="text-gray-800">Appium - 用于移动应用的自动化测试</span>
              </li>
              <li className="flex items-start">
                <i className="fa fa-chrome text-red-600 mt-0.5 mr-2"></i>
                <span className="text-gray-800">Cypress - 现代JavaScript端到端测试框架</span>
              </li>
              <li className="flex items-start">
                <i className="fa fa-firefox text-orange-600 mt-0.5 mr-2"></i>
                <span className="text-gray-800">WebDriverIO - 基于Selenium的JavaScript测试框架</span>
              </li>
              <li className="flex items-start">
                <i className="fa fa-edge text-purple-600 mt-0.5 mr-2"></i>
                <span className="text-gray-800">Playwright - 微软开发的跨浏览器自动化测试工具</span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-gray-800">单元测试工具</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <i className="fa fa-check-square text-blue-600 mt-0.5 mr-2"></i>
                <span className="text-gray-800">JUnit - Java语言的单元测试框架</span>
              </li>
              <li className="flex items-start">
                <i className="fa fa-check-circle text-green-600 mt-0.5 mr-2"></i>
                <span className="text-gray-800">NUnit - .NET平台的单元测试框架</span>
              </li>
              <li className="flex items-start">
                <i className="fa fa-check text-red-600 mt-0.5 mr-2"></i>
                <span className="text-gray-800">PyTest - Python语言的单元测试框架</span>
              </li>
              <li className="flex items-start">
                <i className="fa fa-check-double text-orange-600 mt-0.5 mr-2"></i>
                <span className="text-gray-800">Jest - JavaScript的单元测试框架</span>
              </li>
              <li className="flex items-start">
                <i className="fa fa-check-circle-o text-purple-600 mt-0.5 mr-2"></i>
                <span className="text-gray-800">Mockito - 用于创建模拟对象的框架</span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-gray-800">API测试工具</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <i className="fa fa-exchange text-blue-600 mt-0.5 mr-2"></i>
                <span className="text-gray-800">Postman - 强大的API开发和测试工具</span>
              </li>
              <li className="flex items-start">
                <i className="fa fa-terminal text-green-600 mt-0.5 mr-2"></i>
                <span className="text-gray-800">REST Assured - 用于测试REST API的Java库</span>
              </li>
              <li className="flex items-start">
                <i className="fa fa-bolt text-red-600 mt-0.5 mr-2"></i>
                <span className="text-gray-800">Karate - 一体化API测试框架</span>
              </li>
              <li className="flex items-start">
                <i className="fa fa-paper-plane text-orange-600 mt-0.5 mr-2"></i>
                <span className="text-gray-800">SoapUI - 用于测试SOAP和REST API的工具</span>
              </li>
              <li className="flex items-start">
                <i className="fa fa-link text-purple-600 mt-0.5 mr-2"></i>
                <span className="text-gray-800">Swagger - API文档和测试工具</span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-gray-800">测试管理工具</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <i className="fa fa-tasks text-blue-600 mt-0.5 mr-2"></i>
                <span className="text-gray-800">JIRA - 缺陷跟踪和项目管理工具</span>
              </li>
              <li className="flex items-start">
                <i className="fa fa-bug text-green-600 mt-0.5 mr-2"></i>
                <span className="text-gray-800">TestRail - 测试管理工具</span>
              </li>
              <li className="flex items-start">
                <i className="fa fa-clipboard text-red-600 mt-0.5 mr-2"></i>
                <span className="text-gray-800">Zephyr - JIRA集成的测试管理插件</span>
              </li>
              <li className="flex items-start">
                <i className="fa fa-check-square-o text-orange-600 mt-0.5 mr-2"></i>
                <span className="text-gray-800">qTest - 企业级测试管理平台</span>
              </li>
              <li className="flex items-start">
                <i className="fa fa-database text-purple-600 mt-0.5 mr-2"></i>
                <span className="text-gray-800">Xray - JIRA集成的测试管理解决方案</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* 工具对比表格 */}
        <div className="mt-6">
          <h4 className="font-semibold mb-3 text-gray-800">自动化测试工具对比</h4>
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-lg border border-gray-200 text-sm">
              <thead>
                <tr className="bg-gray-100 border-b border-gray-200">
                  <th className="p-3 text-left font-medium">工具名称</th>
                  <th className="p-3 text-left font-medium">类型</th>
                  <th className="p-3 text-left font-medium">支持的语言</th>
                  <th className="p-3 text-left font-medium">开源/商业</th>
                  <th className="p-3 text-left font-medium">主要特点</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="p-3 font-medium">Selenium</td>
                  <td className="p-3">Web自动化测试</td>
                  <td className="p-3">Java, Python, C#, JavaScript</td>
                  <td className="p-3">开源</td>
                  <td className="p-3">跨浏览器支持，广泛的社区支持，丰富的插件</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="p-3 font-medium">Appium</td>
                  <td className="p-3">移动应用测试</td>
                  <td className="p-3">Java, Python, C#, JavaScript</td>
                  <td className="p-3">开源</td>
                  <td className="p-3">跨平台支持，原生和混合应用测试</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="p-3 font-medium">Cypress</td>
                  <td className="p-3">Web端到端测试</td>
                  <td className="p-3">JavaScript</td>
                  <td className="p-3">开源/商业</td>
                  <td className="p-3">实时重新加载，调试友好，内置断言</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="p-3 font-medium">JUnit</td>
                  <td className="p-3">单元测试</td>
                  <td className="p-3">Java</td>
                  <td className="p-3">开源</td>
                  <td className="p-3">简单易用，广泛支持，与Maven和Gradle集成</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="p-3 font-medium">Postman</td>
                  <td className="p-3">API测试</td>
                  <td className="p-3">JavaScript</td>
                  <td className="p-3">开源/商业</td>
                  <td className="p-3">直观的界面，集合管理，测试脚本编写</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">TestRail</td>
                  <td className="p-3">测试管理</td>
                  <td className="p-3">N/A</td>
                  <td className="p-3">商业</td>
                  <td className="p-3">测试用例管理，测试执行跟踪，报告生成</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  },
  best: {
    desc: [
      "自动化测试最佳实践是在长期实践中总结出来的经验和方法，有助于提高自动化测试的效率和质量。",
      "遵循最佳实践可以减少测试维护成本，提高测试覆盖率，确保测试结果的可靠性。",
      "自动化测试最佳实践包括测试策略制定、测试框架选择、测试用例设计、测试执行和结果分析等方面。",
      "不断学习和应用新的测试技术和方法，持续优化测试流程和测试用例。"
    ],
    exampleTitle: "自动化测试最佳实践",
    example: (
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold mb-3 text-gray-800">测试策略最佳实践</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <i className="fa fa-check-circle text-green-600 mt-0.5 mr-2"></i>
                <span className="text-gray-800">根据项目特点和需求选择合适的测试类型和工具</span>
              </li>
              <li className="flex items-start">
                <i className="fa fa-check-circle text-green-600 mt-0.5 mr-2"></i>
                <span className="text-gray-800">制定明确的测试目标和验收标准</span>
              </li>
              <li className="flex items-start">
                <i className="fa fa-check-circle text-green-600 mt-0.5 mr-2"></i>
                <span className="text-gray-800">建立自动化测试与手动测试的平衡</span>
              </li>
              <li className="flex items-start">
                <i className="fa fa-check-circle text-green-600 mt-0.5 mr-2"></i>
                <span className="text-gray-800">将自动化测试集成到CI/CD流程中</span>
              </li>
              <li className="flex items-start">
                <i className="fa fa-check-circle text-green-600 mt-0.5 mr-2"></i>
                <span className="text-gray-800">定期评审和更新测试策略</span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-gray-800">测试框架最佳实践</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <i className="fa fa-code text-blue-600 mt-0.5 mr-2"></i>
                <span className="text-gray-800">选择适合项目需求和团队技能的测试框架</span>
              </li>
              <li className="flex items-start">
                <i className="fa fa-code-fork text-purple-600 mt-0.5 mr-2"></i>
                <span className="text-gray-800">设计可维护的测试框架，使用模块化和分层结构</span>
              </li>
              <li className="flex items-start">
                <i className="fa fa-cogs text-red-600 mt-0.5 mr-2"></i>
                <span className="text-gray-800">使用页面对象模式(POM)减少代码重复</span>
              </li>
              <li className="flex items-start">
                <i className="fa fa-shield text-green-600 mt-0.5 mr-2"></i>
                <span className="text-gray-800">实现自动化测试的错误处理和恢复机制</span>
              </li>
              <li className="flex items-start">
                <i className="fa fa-refresh text-orange-600 mt-0.5 mr-2"></i>
                <span className="text-gray-800">定期更新测试框架和依赖库</span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-gray-800">测试用例最佳实践</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <i className="fa fa-list-alt text-blue-600 mt-0.5 mr-2"></i>
                <span className="text-gray-800">测试用例应独立、可重复和可维护</span>
              </li>
              <li className="flex items-start">
                <i className="fa fa-check-square text-purple-600 mt-0.5 mr-2"></i>
                <span className="text-gray-800">测试用例应覆盖各种场景，包括正常和异常情况</span>
              </li>
              <li className="flex items-start">
                <i className="fa fa-database text-red-600 mt-0.5 mr-2"></i>
                <span className="text-gray-800">使用数据驱动测试提高测试覆盖率</span>
              </li>
              <li className="flex items-start">
                <i className="fa fa-tags text-green-600 mt-0.5 mr-2"></i>
                <span className="text-gray-800">使用标签和分类组织测试用例</span>
              </li>
              <li className="flex items-start">
                <i className="fa fa-trash text-orange-600 mt-0.5 mr-2"></i>
                <span className="text-gray-800">定期清理过时或冗余的测试用例</span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-gray-800">测试执行最佳实践</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <i className="fa fa-play text-blue-600 mt-0.5 mr-2"></i>
                <span className="text-gray-800">在隔离的环境中执行测试，避免环境干扰</span>
              </li>
              <li className="flex items-start">
                <i className="fa fa-clock-o text-purple-600 mt-0.5 mr-2"></i>
                <span className="text-gray-800">优化测试执行时间，并行执行测试用例</span>
              </li>
              <li className="flex items-start">
                <i className="fa fa-bug text-red-600 mt-0.5 mr-2"></i>
                <span className="text-gray-800">捕获和记录详细的测试日志和截图</span>
              </li>
              <li className="flex items-start">
                <i className="fa fa-line-chart text-green-600 mt-0.5 mr-2"></i>
                <span className="text-gray-800">分析测试结果，识别趋势和模式</span>
              </li>
              <li className="flex items-start">
                <i className="fa fa-share-alt text-orange-600 mt-0.5 mr-2"></i>
                <span className="text-gray-800">与开发团队和其他 stakeholders 共享测试结果</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* 自动化测试成功要素雷达图 */}
        <div className="mt-6">
          <h4 className="font-semibold mb-3 text-gray-800">自动化测试成功要素</h4>
          <svg width="500" height="300" viewBox="0 0 500 300" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="500" height="300" rx="4" fill="#f8fafc" />
            <g transform="translate(250, 150)">
              {/* 雷达图网格 */}
              <circle cx="0" cy="0" r="100" fill="none" stroke="#e2e8f0" strokeWidth="1" />
              <circle cx="0" cy="0" r="80" fill="none" stroke="#e2e8f0" strokeWidth="1" />
              <circle cx="0" cy="0" r="60" fill="none" stroke="#e2e8f0" strokeWidth="1" />
              <circle cx="0" cy="0" r="40" fill="none" stroke="#e2e8f0" strokeWidth="1" />
              <circle cx="0" cy="0" r="20" fill="none" stroke="#e2e8f0" strokeWidth="1" />
              
              {/* 坐标轴 */}
              <line x1="0" y1="0" x2="0" y2="-100" stroke="#cbd5e1" strokeWidth="1" />
              <line x1="0" y1="0" x2="70.7" y2="-70.7" stroke="#cbd5e1" strokeWidth="1" />
              <line x1="0" y1="0" x2="100" y2="0" stroke="#cbd5e1" strokeWidth="1" />
              <line x1="0" y1="0" x2="70.7" y2="70.7" stroke="#cbd5e1" strokeWidth="1" />
              <line x1="0" y1="0" x2="0" y2="100" stroke="#cbd5e1" strokeWidth="1" />
              <line x1="0" y1="0" x2="-70.7" y2="70.7" stroke="#cbd5e1" strokeWidth="1" />
              <line x1="0" y1="0" x2="-100" y2="0" stroke="#cbd5e1" strokeWidth="1" />
              
              {/* 标签 */}
              <text x="0" y="-110" textAnchor="middle" fontSize="10" fill="#475569">明确的测试策略</text>
              <text x="85" y="-85" textAnchor="middle" fontSize="10" fill="#475569">合适的工具选择</text>
              <text x="110" y="0" textAnchor="middle" fontSize="10" fill="#475569">良好的代码质量</text>
              <text x="85" y="85" textAnchor="middle" fontSize="10" fill="#475569">持续集成</text>
              <text x="0" y="110" textAnchor="middle" fontSize="10" fill="#475569">团队协作</text>
              <text x="-85" y="85" textAnchor="middle" fontSize="10" fill="#475569">测试维护</text>
              <text x="-110" y="0" textAnchor="middle" fontSize="10" fill="#475569">测试覆盖</text>
              
              {/* 数据 */}
              <polygon points="0,-80 60,-60 80,0 70,70 60,80 -50,70 -70,0" fill="rgba(33, 150, 243, 0.2)" stroke="#2196f3" strokeWidth="2" />
              <circle cx="0" cy="-80" r="3" fill="#2196f3" />
              <circle cx="60" cy="-60" r="3" fill="#2196f3" />
              <circle cx="80" cy="0" r="3" fill="#2196f3" />
              <circle cx="70" cy="70" r="3" fill="#2196f3" />
              <circle cx="60" cy="80" r="3" fill="#2196f3" />
              <circle cx="-50" cy="70" r="3" fill="#2196f3" />
              <circle cx="-70" cy="0" r="3" fill="#2196f3" />
            </g>
          </svg>
        </div>
      </div>
    )
  }
};

const AutomationTesting = () => {
const [currentTab, setCurrentTab] = useState<TabKey>("concept");

return (
  <div className="container mx-auto px-4 py-8">
    <h1 className="text-3xl font-bold mb-8">自动化测试</h1>
    
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
      <Link href="/study/se/standards-testing/system" className="px-4 py-2 text-blue-600 hover:text-blue-800">系统测试 →</Link>
      <Link href="/study/se/standards-testing/management" className="px-4 py-2 text-blue-600 hover:text-blue-800">测试管理 →</Link>
    </div>
  </div>
);
};

export default AutomationTesting;