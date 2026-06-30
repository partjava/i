'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import { PageTitle, SectionTitle, BookParagraph, BookCode, BookList } from '@shared/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '软件工程',
  chapterTitle: '自动化测试',
  chapterNumber: 6,
  totalChapters: 9,
  subjectHref: '/study/se/standards-testing',
  prevChapter: { label: '系统测试', href: '/study/se/standards-testing/system' },
  nextChapter: { label: '测试管理', href: '/study/se/standards-testing/management' },
  theme: THEMES.software,
}

const loginTestCaseCode = `// 使用Selenium进行登录测试
const { Builder, By, until } = require('selenium-webdriver');

async function testLogin() {
  let driver = await new Builder().forBrowser('chrome').build();
  try {
    await driver.get('https://example.com/login');
    await driver.findElement(By.id('username')).sendKeys('testuser');
    await driver.findElement(By.id('password')).sendKeys('testpass');
    await driver.findElement(By.id('login-btn')).click();
    await driver.wait(until.urlContains('dashboard'), 5000);
    console.log('登录测试通过');
  } finally {
    await driver.quit();
  }
}`

const SPREADS = [
  {
    label: '自动化测试概念',
    left: (
      <div className="space-y-4">
        <PageTitle>自动化测试概念</PageTitle>
        <BookList items={['自动化测试是使用自动化工具执行测试用例并自动验证测试结果的过程。', '可以提高测试效率、减少重复劳动、提高测试覆盖率。', '适用于回归测试、性能测试、CI/CD 流程中的测试环节。', '需要适当的规划和维护，不适合一次性测试或探索性测试。']} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>手动测试 vs 自动化测试</SectionTitle>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="bg-paper-200/40 p-3 rounded border border-paper-300/60">
            <div className="font-medium text-blue-600 mb-2">手动测试</div>
            <BookList tight items={['适合探索性测试', '不需要编写代码', '执行速度慢', '容易出现人为错误']} />
          </div>
          <div className="bg-paper-200/40 p-3 rounded border border-paper-300/60">
            <div className="font-medium text-green-600 mb-2">自动化测试</div>
            <BookList tight items={['执行速度快', '可重复执行', '适合回归测试', '需要编写代码维护']} />
          </div>
        </div>
      </div>
    ),
  },
  {
    label: '测试框架对比',
    left: (
      <div className="space-y-4">
        <PageTitle>测试框架对比</PageTitle>
        <BookList items={['Selenium：Web 应用测试，支持 Java/Python/C#/JS，学习曲线中等', 'Appium：移动应用测试，支持 Java/Python/C#/JS，学习曲线中等', 'Cypress：Web 端到端测试，仅 JavaScript，学习曲线低', 'JUnit：Java 单元测试，学习曲线低', 'TestNG：Java 功能测试，学习曲线中等', 'Robot Framework：通用自动化测试框架，Python，学习曲线低']} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>框架特性对比</SectionTitle>
        <div className="space-y-1 text-xs">
          <div className="grid grid-cols-6 gap-1 bg-paper-200/40 p-2 rounded font-medium">
            <span>框架</span><span>场景</span><span>语言</span><span>学习曲线</span><span>社区</span><span>集成</span>
          </div>
          <div className="grid grid-cols-6 gap-1 p-2 border-t border-paper-300/40">
            <span className="text-blue-600">Selenium</span><span>Web</span><span>多语言</span><span>中等</span><span>优秀</span><span>丰富</span>
          </div>
          <div className="grid grid-cols-6 gap-1 p-2 border-t border-paper-300/40">
            <span className="text-green-600">Appium</span><span>移动</span><span>多语言</span><span>中等</span><span>优秀</span><span>良好</span>
          </div>
          <div className="grid grid-cols-6 gap-1 p-2 border-t border-paper-300/40">
            <span className="text-pink-500">Cypress</span><span>Web E2E</span><span>JS</span><span>低</span><span>优秀</span><span>良好</span>
          </div>
          <div className="grid grid-cols-6 gap-1 p-2 border-t border-paper-300/40">
            <span>JUnit</span><span>单元测试</span><span>Java</span><span>低</span><span>优秀</span><span>丰富</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    label: '测试用例设计',
    left: (
      <div className="space-y-4">
        <PageTitle>测试用例设计</PageTitle>
        <BookParagraph>自动化测试用例设计是自动化测试的关键环节，直接影响测试效果和维护成本。</BookParagraph>
        <SectionTitle>设计原则</SectionTitle>
        <BookList items={['测试用例应独立，不依赖其他测试用例的执行结果', '具有可重复性，相同的输入应产生相同的结果', '覆盖正常情况和异常情况', '简单明了，易于理解和维护', '具有明确的预期结果']} />
        <SectionTitle>设计方法</SectionTitle>
        <BookList items={['等价类划分：有效和无效等价类', '边界值分析：输入数据边界值', '决策表测试：基于决策表设计', '状态转换测试：系统状态转换', '数据驱动测试：相同逻辑不同数据']} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>登录测试用例示例</SectionTitle>
        <div className="space-y-1 text-xs">
          <div className="grid grid-cols-3 gap-1 bg-paper-200/40 p-2 rounded font-medium">
            <span>用例ID</span><span>名称</span><span>预期结果</span>
          </div>
          <div className="grid grid-cols-3 gap-1 p-2 border-t border-paper-300/40">
            <span>TC-LOGIN-001</span><span>登录成功</span><span>跳转到首页</span>
          </div>
          <div className="grid grid-cols-3 gap-1 p-2 border-t border-paper-300/40">
            <span>TC-LOGIN-002</span><span>用户名错误</span><span>提示用户名不存在</span>
          </div>
          <div className="grid grid-cols-3 gap-1 p-2 border-t border-paper-300/40">
            <span>TC-LOGIN-003</span><span>密码错误</span><span>提示密码错误</span>
          </div>
          <div className="grid grid-cols-3 gap-1 p-2 border-t border-paper-300/40">
            <span>TC-LOGIN-004</span><span>验证码错误</span><span>提示验证码错误</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    label: '执行流程',
    left: (
      <div className="space-y-4">
        <PageTitle>执行流程</PageTitle>
        <BookParagraph>自动化测试执行流程涵盖从测试计划到测试报告的完整过程。</BookParagraph>
        <SectionTitle>流程步骤</SectionTitle>
        <BookList items={['1. 测试计划制定：确定范围、目标、策略和资源', '2. 测试环境准备：搭建环境，配置工具和依赖', '3. 测试用例设计：编写测试脚本', '4. 测试数据准备：包括正常数据和异常数据', '5. 测试执行：执行测试用例，记录结果', '6. 缺陷管理：发现、记录、跟踪缺陷', '7. 测试报告生成：分析结果，生成报告', '8. 测试总结与优化：总结经验，优化流程']} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>流程示意图</SectionTitle>
        <div className="bg-paper-200/40 p-4 rounded-lg border border-paper-300/60">
          <svg width="320" height="340" viewBox="0 0 320 340" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="20" y="10" width="120" height="40" rx="4" fill="#e0f2fe" stroke="#3b82f6" strokeWidth="2" />
            <text x="80" y="35" textAnchor="middle" fontSize="12" fill="#1e293b">测试计划</text>
            <rect x="180" y="10" width="120" height="40" rx="4" fill="#e0f2fe" stroke="#3b82f6" strokeWidth="2" />
            <text x="240" y="35" textAnchor="middle" fontSize="12" fill="#1e293b">环境准备</text>
            <rect x="20" y="80" width="120" height="40" rx="4" fill="#e0f2fe" stroke="#3b82f6" strokeWidth="2" />
            <text x="80" y="105" textAnchor="middle" fontSize="12" fill="#1e293b">测试设计</text>
            <rect x="180" y="80" width="120" height="40" rx="4" fill="#e0f2fe" stroke="#3b82f6" strokeWidth="2" />
            <text x="240" y="105" textAnchor="middle" fontSize="12" fill="#1e293b">数据准备</text>
            <rect x="20" y="150" width="120" height="40" rx="4" fill="#e0f2fe" stroke="#3b82f6" strokeWidth="2" />
            <text x="80" y="175" textAnchor="middle" fontSize="12" fill="#1e293b">测试执行</text>
            <rect x="180" y="150" width="120" height="40" rx="4" fill="#e0f2fe" stroke="#3b82f6" strokeWidth="2" />
            <text x="240" y="175" textAnchor="middle" fontSize="12" fill="#1e293b">结果分析</text>
            <rect x="20" y="220" width="120" height="40" rx="4" fill="#e0f2fe" stroke="#3b82f6" strokeWidth="2" />
            <text x="80" y="245" textAnchor="middle" fontSize="12" fill="#1e293b">缺陷管理</text>
            <rect x="180" y="220" width="120" height="40" rx="4" fill="#e0f2fe" stroke="#3b82f6" strokeWidth="2" />
            <text x="240" y="245" textAnchor="middle" fontSize="12" fill="#1e293b">测试报告</text>
            <rect x="80" y="290" width="120" height="40" rx="4" fill="#e0f2fe" stroke="#3b82f6" strokeWidth="2" />
            <text x="140" y="315" textAnchor="middle" fontSize="12" fill="#1e293b">测试优化</text>
          </svg>
        </div>
      </div>
    ),
  },
  {
    label: '自动化测试工具',
    left: (
      <div className="space-y-4">
        <PageTitle>自动化测试工具</PageTitle>
        <SectionTitle>功能测试工具</SectionTitle>
        <BookList items={['Selenium：Web 应用自动化测试', 'Appium：移动应用自动化测试', 'Cypress：JavaScript 端到端测试框架', 'Playwright：跨浏览器自动化测试工具', 'WebDriverIO：基于 Selenium 的 JS 框架']} />
        <SectionTitle>单元测试工具</SectionTitle>
        <BookList items={['JUnit：Java 单元测试', 'PyTest：Python 单元测试', 'Jest：JavaScript 单元测试', 'NUnit：.NET 单元测试', 'Mockito：Mock 对象框架']} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>API 测试工具</SectionTitle>
        <BookList items={['Postman：API 开发和测试', 'REST Assured：Java REST API 测试', 'Karate：一体化 API 测试框架', 'SoapUI：SOAP 和 REST API 测试']} />
        <SectionTitle>测试管理工具</SectionTitle>
        <BookList items={['JIRA：缺陷跟踪和项目管理', 'TestRail：测试管理', 'Zephyr：JIRA 测试管理插件', 'qTest：企业级测试管理平台', 'Xray：JIRA 测试管理解决方案']} />
        <SectionTitle>工具代码示例</SectionTitle>
        <BookCode language="javascript" code={loginTestCaseCode} />
      </div>
    ),
  },
  {
    label: '最佳实践',
    left: (
      <div className="space-y-4">
        <PageTitle>最佳实践</PageTitle>
        <SectionTitle>测试策略</SectionTitle>
        <BookList items={['根据项目特点选择合适的测试类型和工具', '制定明确的测试目标和验收标准', '建立自动化测试与手动测试的平衡', '将自动化测试集成到 CI/CD 流程中']} />
        <SectionTitle>测试框架</SectionTitle>
        <BookList items={['选择适合项目需求和团队技能的测试框架', '设计可维护的测试框架，使用模块化结构', '使用页面对象模式 (POM) 减少代码重复', '实现错误处理和恢复机制']} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>测试用例</SectionTitle>
        <BookList items={['独立、可重复和可维护', '覆盖正常和异常情况', '使用数据驱动测试提高覆盖率', '使用标签和分类组织测试用例', '定期清理过时或冗余的测试用例']} />
        <SectionTitle>测试执行</SectionTitle>
        <BookList items={['在隔离环境中执行测试', '优化执行时间，并行执行测试用例', '捕获详细测试日志和截图', '分析结果，识别趋势和模式', '与团队共享测试结果']} />
      </div>
    ),
  },
]

export default function AutomationTesting() { return <LessonLayout meta={META} spreads={SPREADS} /> }
