'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import { PageTitle, SectionTitle, BookParagraph, BookCode, BookList } from '@/app/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '软件工程',
  chapterTitle: '测试基础',
  chapterNumber: 2,
  totalChapters: 9,
  subjectHref: '/study/se/standards-testing',
  prevChapter: { label: '开发规范', href: '/study/se/standards-testing/spec' },
  nextChapter: { label: '单元测试', href: '/study/se/standards-testing/unit' },
  theme: THEMES.software,
}

const testFlowCode = `// 测试计划
function createTestPlan() {
  const scope = "功能测试";
  const objective = "验证系统功能是否正确";
  const method = "黑盒测试";
  const resources = ["测试人员", "测试设备"];
  return { scope, objective, method, resources };
}

// 测试设计
function designTestCases() {
  const testCases = [
    { id: 1, title: "正常登录测试", input: { username: "user", password: "password" }, expected: "登录成功" },
    { id: 2, title: "用户名错误测试", input: { username: "wrongUser", password: "password" }, expected: "用户名错误" }
  ];
  return testCases;
}

// 测试执行
function executeTests(testCases) {
  testCases.forEach(caseItem => {
    const actual = performTest(caseItem.input);
    caseItem.result = actual === caseItem.expected ? "通过" : "失败";
  });
  return testCases;
}

// 测试评估
function evaluateTests(testCases) {
  const defectList = [];
  testCases.forEach(caseItem => {
    if (caseItem.result === "失败") {
      defectList.push({
        id: caseItem.id,
        description: \`测试用例 \${caseItem.title} 失败\`
      });
    }
  });
  return defectList;
}

// 缺陷管理
function manageDefects(defectList) {
  defectList.forEach(defect => {
    notifyDeveloper(defect);
    const isFixed = trackDefect(defect.id);
    if (isFixed) {
      const verificationResult = verifyDefect(defect.id);
      if (verificationResult) closeDefect(defect.id);
    }
  });
}

// 测试报告
function generateTestReport(testCases, defectList) {
  const passedCount = testCases.filter(c => c.result === "通过").length;
  const failedCount = testCases.filter(c => c.result === "失败").length;
  return {
    testCases, defectList, passedCount, failedCount,
    overallAssessment: failedCount === 0 ? "软件质量良好" : "软件存在缺陷，需修复"
  };
}`

const SPREADS = [
  {
    label: '测试基本概念',
    left: (
      <div className="space-y-4">
        <PageTitle>测试基本概念</PageTitle>
        <BookList items={['测试是为了评估软件的质量，发现软件中存在的缺陷。', '测试需要依据需求规格说明书、设计文档等进行，确保测试的全面性。', '测试不能证明软件没有缺陷，只能说明软件在测试过程中发现的问题。', '测试应尽早介入软件开发周期，从需求分析阶段就开始规划测试工作。']} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>测试在软件开发中的位置示意图</SectionTitle>
        <div className="bg-paper-200/40 p-4 rounded-lg border border-paper-300/60">
          <svg width="400" height="200" viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="30" y="30" width="80" height="40" fill="#e3e8f7" stroke="#3b82f6" strokeWidth="2" rx="8" />
            <text x="70" y="55" textAnchor="middle" fontSize="14" fill="#1e293b">需求分析</text>
            <rect x="130" y="30" width="80" height="40" fill="#f1f5f9" stroke="#3b82f6" strokeWidth="2" rx="8" />
            <text x="170" y="55" textAnchor="middle" fontSize="14" fill="#1e293b">设计阶段</text>
            <rect x="230" y="30" width="80" height="40" fill="#e0f2fe" stroke="#3b82f6" strokeWidth="2" rx="8" />
            <text x="270" y="55" textAnchor="middle" fontSize="14" fill="#1e293b">编码阶段</text>
            <rect x="330" y="30" width="80" height="40" fill="#fef9c3" stroke="#f59e42" strokeWidth="2" rx="8" />
            <text x="370" y="55" textAnchor="middle" fontSize="14" fill="#92400e">测试阶段</text>
            <line x1="110" y1="50" x2="130" y2="50" stroke="#64748b" strokeWidth="2" markerEnd="url(#a1)" />
            <line x1="210" y1="50" x2="230" y="50" stroke="#64748b" strokeWidth="2" markerEnd="url(#a1)" />
            <line x1="310" y1="50" x2="330" y2="50" stroke="#64748b" strokeWidth="2" markerEnd="url(#a1)" />
            <defs>
              <marker id="a1" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto" markerUnits="strokeWidth">
                <path d="M0,0 L10,5 L0,10 L3,5 Z" fill="#64748b" />
              </marker>
            </defs>
          </svg>
        </div>
      </div>
    ),
  },
  {
    label: '测试类型',
    left: (
      <div className="space-y-4">
        <PageTitle>测试类型</PageTitle>
        <BookList items={['单元测试：对最小可测试单元进行测试，验证功能的正确性。', '集成测试：将多个单元组合测试，检查组件之间的交互和接口。', '系统测试：从整体系统角度测试是否满足功能和非功能需求。', '验收测试：由用户或客户进行的最终测试，确认软件是否符合业务需求。', '性能测试：评估软件在不同负载下的响应时间、吞吐量等指标。', '安全测试：检测软件是否存在安全漏洞，如 SQL 注入、XSS 等。']} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>不同测试类型的覆盖范围示意图</SectionTitle>
        <div className="bg-paper-200/40 p-4 rounded-lg border border-paper-300/60">
          <svg width="380" height="200" viewBox="0 0 380 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="20" y="20" width="80" height="40" fill="#e3e8f7" stroke="#3b82f6" strokeWidth="2" rx="8" />
            <text x="60" y="45" textAnchor="middle" fontSize="14" fill="#1e293b">单元测试</text>
            <rect x="120" y="20" width="80" height="40" fill="#f1f5f9" stroke="#3b82f6" strokeWidth="2" rx="8" />
            <text x="160" y="45" textAnchor="middle" fontSize="14" fill="#1e293b">集成测试</text>
            <rect x="220" y="20" width="80" height="40" fill="#e0f2fe" stroke="#3b82f6" strokeWidth="2" rx="8" />
            <text x="260" y="45" textAnchor="middle" fontSize="14" fill="#1e293b">系统测试</text>
            <rect x="20" y="90" width="80" height="40" fill="#fef9c3" stroke="#f59e42" strokeWidth="2" rx="8" />
            <text x="60" y="115" textAnchor="middle" fontSize="14" fill="#92400e">性能测试</text>
            <rect x="120" y="90" width="80" height="40" fill="#f1f5f9" stroke="#3b82f6" strokeWidth="2" rx="8" />
            <text x="160" y="115" textAnchor="middle" fontSize="14" fill="#1e293b">安全测试</text>
            <rect x="220" y="90" width="80" height="40" fill="#e0f2fe" stroke="#3b82f6" strokeWidth="2" rx="8" />
            <text x="260" y="115" textAnchor="middle" fontSize="14" fill="#1e293b">验收测试</text>
          </svg>
        </div>
      </div>
    ),
  },
  {
    label: '测试流程',
    left: (
      <div className="space-y-4">
        <PageTitle>测试流程</PageTitle>
        <BookList items={['测试计划：确定测试的范围、目标、方法、资源等。', '测试设计：依据测试计划，设计测试用例和测试数据。', '测试执行：按照测试用例进行测试，记录测试结果。', '测试评估：分析测试结果，找出软件中的缺陷。', '缺陷管理：对发现的缺陷进行跟踪和管理。', '测试报告：撰写测试报告，总结测试过程和结果。']} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>测试流程伪代码示例</SectionTitle>
        <BookCode language="javascript" code={testFlowCode} maxLines={20} />
      </div>
    ),
  },
  {
    label: '测试用例设计',
    left: (
      <div className="space-y-4">
        <PageTitle>测试用例设计</PageTitle>
        <BookList items={['测试用例应覆盖所有功能需求，包括正常、异常和边界情况。', '每个测试用例应有明确的目的、输入数据、操作步骤和预期输出。', '测试用例应保持独立性，不依赖其他测试用例的结果。', '使用等价类划分、边界值分析、错误推测等方法设计测试用例。', '定期评审和更新测试用例，确保有效性和准确性。']} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>使用等价类划分设计登录功能测试用例</SectionTitle>
        <div className="overflow-x-auto">
          <table className="w-full text-xs border border-paper-300/60 rounded">
            <thead>
              <tr className="bg-paper-200/60">
                <th className="p-2 text-left font-medium">用例ID</th>
                <th className="p-2 text-left font-medium">测试场景</th>
                <th className="p-2 text-left font-medium">输入数据</th>
                <th className="p-2 text-left font-medium">预期输出</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-paper-300/40">
                <td className="p-2">TC-001</td>
                <td className="p-2">正常登录</td>
                <td className="p-2">有效用户名和密码</td>
                <td className="p-2">登录成功，跳转到主页</td>
              </tr>
              <tr className="border-t border-paper-300/40">
                <td className="p-2">TC-002</td>
                <td className="p-2">用户名不存在</td>
                <td className="p-2">不存在的用户名，有效密码</td>
                <td className="p-2">提示"用户名不存在"</td>
              </tr>
              <tr className="border-t border-paper-300/40">
                <td className="p-2">TC-003</td>
                <td className="p-2">密码错误</td>
                <td className="p-2">有效用户名，错误密码</td>
                <td className="p-2">提示"密码错误"</td>
              </tr>
              <tr className="border-t border-paper-300/40">
                <td className="p-2">TC-004</td>
                <td className="p-2">用户名和密码为空</td>
                <td className="p-2">空用户名，空密码</td>
                <td className="p-2">提示"用户名和密码不能为空"</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    ),
  },
]

export default function TestBasicPage() { return <LessonLayout meta={META} spreads={SPREADS} /> }
