'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import { PageTitle, SectionTitle, BookParagraph, BookCode, BookList } from '@/app/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '软件工程',
  chapterTitle: '系统测试',
  chapterNumber: 5,
  totalChapters: 9,
  subjectHref: '/study/se/standards-testing',
  prevChapter: { label: '集成测试', href: '/study/se/standards-testing/integration' },
  nextChapter: { label: '自动化测试', href: '/study/se/standards-testing/automation' },
  theme: THEMES.software,
}

const SPREADS = [
  {
    label: '系统测试概念',
    left: (
      <div className="space-y-4">
        <PageTitle>系统测试概念</PageTitle>
        <BookList items={['系统测试是将整个系统作为一个整体进行的测试，验证系统是否满足需求规格说明书中的要求。', '在集成测试之后进行，确保系统在真实环境中能够正常工作。', '涉及功能测试、非功能测试（如性能、安全性、兼容性等）和用户验收测试等方面。', '通常由独立的测试团队执行，以确保测试的客观性。']} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>系统测试在软件开发流程中的位置</SectionTitle>
        <div className="bg-paper-200/40 p-4 rounded-lg border border-paper-300/60">
          <svg width="400" height="180" viewBox="0 0 400 180" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="20" y="30" width="70" height="35" fill="#e3f2fd" stroke="#2196f3" strokeWidth="2" rx="4" />
            <text x="55" y="52" textAnchor="middle" fontSize="12" fill="#1e293b">需求分析</text>
            <rect x="110" y="30" width="70" height="35" fill="#e3f2fd" stroke="#2196f3" strokeWidth="2" rx="4" />
            <text x="145" y="52" textAnchor="middle" fontSize="12" fill="#1e293b">设计阶段</text>
            <rect x="200" y="30" width="70" height="35" fill="#e3f2fd" stroke="#2196f3" strokeWidth="2" rx="4" />
            <text x="235" y="52" textAnchor="middle" fontSize="12" fill="#1e293b">编码阶段</text>
            <rect x="290" y="30" width="70" height="35" fill="#e3f2fd" stroke="#2196f3" strokeWidth="2" rx="4" />
            <text x="325" y="52" textAnchor="middle" fontSize="12" fill="#1e293b">部署阶段</text>
            <rect x="60" y="95" width="70" height="35" fill="#c8e6c9" stroke="#4caf50" strokeWidth="2" rx="4" />
            <text x="95" y="117" textAnchor="middle" fontSize="12" fill="#1e293b">单元测试</text>
            <rect x="150" y="95" width="70" height="35" fill="#a5d6a7" stroke="#4caf50" strokeWidth="2" rx="4" />
            <text x="185" y="117" textAnchor="middle" fontSize="12" fill="#1e293b">集成测试</text>
            <rect x="240" y="95" width="70" height="35" fill="#81c784" stroke="#4caf50" strokeWidth="2" rx="4" />
            <text x="275" y="117" textAnchor="middle" fontSize="12" fill="#1e293b">系统测试</text>
            <rect x="330" y="95" width="70" height="35" fill="#66bb6a" stroke="#4caf50" strokeWidth="2" rx="4" />
            <text x="365" y="117" textAnchor="middle" fontSize="12" fill="#1e293b">验收测试</text>
          </svg>
        </div>
      </div>
    ),
  },
  {
    label: '系统测试类型',
    left: (
      <div className="space-y-4">
        <PageTitle>系统测试类型</PageTitle>
        <BookList items={['功能测试：验证系统的功能是否符合需求规格。', '性能测试：评估系统在不同负载下的响应时间、吞吐量等。', '安全性测试：检测身份验证、授权、数据加密等安全漏洞。', '兼容性测试：检查系统在不同操作系统、浏览器、设备下的兼容性。', '可靠性测试：测试系统长时间运行中的稳定性和故障恢复。', '易用性测试：评估用户界面和交互设计，确保用户方便使用。']} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>测试类型分类</SectionTitle>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="bg-green-50 p-3 rounded-lg border border-green-200">
            <div className="font-medium text-green-800">功能测试</div>
            <div className="text-green-600 text-xs mt-1">登录、数据提交等</div>
          </div>
          <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
            <div className="font-medium text-blue-800">性能测试</div>
            <div className="text-blue-600 text-xs mt-1">响应时间、吞吐量</div>
          </div>
          <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
            <div className="font-medium text-purple-800">安全性测试</div>
            <div className="text-purple-600 text-xs mt-1">身份验证、加密</div>
          </div>
          <div className="bg-indigo-50 p-3 rounded-lg border border-indigo-200">
            <div className="font-medium text-indigo-800">兼容性测试</div>
            <div className="text-indigo-600 text-xs mt-1">浏览器、操作系统</div>
          </div>
          <div className="bg-pink-50 p-3 rounded-lg border border-pink-200">
            <div className="font-medium text-pink-800">可靠性测试</div>
            <div className="text-pink-600 text-xs mt-1">故障恢复、一致性</div>
          </div>
          <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
            <div className="font-medium text-yellow-800">易用性测试</div>
            <div className="text-yellow-600 text-xs mt-1">界面友好性</div>
          </div>
        </div>
      </div>
    ),
  },
  {
    label: '系统测试流程',
    left: (
      <div className="space-y-4">
        <PageTitle>系统测试流程</PageTitle>
        <BookList items={['测试计划：定义测试范围、方法、资源和进度安排。', '测试设计：基于需求规格说明书设计测试用例。', '测试环境准备：搭建与生产环境相似的测试环境。', '测试执行：按照测试计划和测试用例执行测试。', '缺陷管理：发现缺陷后记录、跟踪和管理。', '测试评估：分析测试结果，评估系统质量。', '测试报告：生成测试报告，总结过程和结果。']} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>测试流程示意图</SectionTitle>
        <div className="bg-paper-200/40 p-4 rounded-lg border border-paper-300/60">
          <svg width="380" height="280" viewBox="0 0 380 280" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="10" y="10" width="80" height="45" rx="4" fill="#e0f2fe" stroke="#3b82f6" strokeWidth="2" />
            <text x="50" y="38" textAnchor="middle" fontSize="12" fill="#1e293b">测试计划</text>
            <rect x="110" y="10" width="80" height="45" rx="4" fill="#e0f2fe" stroke="#3b82f6" strokeWidth="2" />
            <text x="150" y="38" textAnchor="middle" fontSize="12" fill="#1e293b">测试设计</text>
            <rect x="210" y="10" width="80" height="45" rx="4" fill="#e0f2fe" stroke="#3b82f6" strokeWidth="2" />
            <text x="250" y="38" textAnchor="middle" fontSize="12" fill="#1e293b">环境准备</text>
            <rect x="310" y="10" width="80" height="45" rx="4" fill="#e0f2fe" stroke="#3b82f6" strokeWidth="2" />
            <text x="350" y="38" textAnchor="middle" fontSize="12" fill="#1e293b">测试执行</text>
            <rect x="210" y="100" width="80" height="45" rx="4" fill="#e0f2fe" stroke="#3b82f6" strokeWidth="2" />
            <text x="250" y="128" textAnchor="middle" fontSize="12" fill="#1e293b">缺陷管理</text>
            <rect x="110" y="100" width="80" height="45" rx="4" fill="#e0f2fe" stroke="#3b82f6" strokeWidth="2" />
            <text x="150" y="128" textAnchor="middle" fontSize="12" fill="#1e293b">测试评估</text>
            <rect x="10" y="100" width="80" height="45" rx="4" fill="#e0f2fe" stroke="#3b82f6" strokeWidth="2" />
            <text x="50" y="128" textAnchor="middle" fontSize="12" fill="#1e293b">测试报告</text>
            <polygon points="210,190 250,210 210,230" fill="#f8fafc" stroke="#3b82f6" strokeWidth="2" />
            <text x="250" y="215" textAnchor="middle" fontSize="11" fill="#1e293b">是否通过?</text>
            <rect x="310" y="190" width="80" height="45" rx="4" fill="#dcfce7" stroke="#16a34a" strokeWidth="2" />
            <text x="350" y="215" textAnchor="middle" fontSize="11" fill="#166534">下一阶段</text>
            <rect x="10" y="190" width="80" height="45" rx="4" fill="#fee2e2" stroke="#ef4444" strokeWidth="2" />
            <text x="50" y="215" textAnchor="middle" fontSize="11" fill="#b91c1c">重新测试</text>
          </svg>
        </div>
      </div>
    ),
  },
  {
    label: '与集成测试对比',
    left: (
      <div className="space-y-4">
        <PageTitle>与集成测试对比</PageTitle>
        <BookList items={['系统测试关注整个系统的行为和性能；集成测试关注组件之间的交互。', '系统测试通常在集成测试之后进行，验证系统是否满足用户需求。', '系统测试范围更广，包括功能测试和非功能测试。', '系统测试通常由独立测试团队执行，环境更接近生产环境。']} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>对比表格</SectionTitle>
        <div className="space-y-1 text-sm">
          <div className="grid grid-cols-3 gap-1 bg-paper-200/40 p-2 rounded font-medium">
            <span>维度</span><span className="text-blue-600">系统测试</span><span className="text-green-600">集成测试</span>
          </div>
          <div className="grid grid-cols-3 gap-1 border-t border-paper-300/40 p-2">
            <span>测试目标</span><span>验证整个系统</span><span>验证组件交互</span>
          </div>
          <div className="grid grid-cols-3 gap-1 border-t border-paper-300/40 p-2">
            <span>测试范围</span><span>整个系统</span><span>一组组件</span>
          </div>
          <div className="grid grid-cols-3 gap-1 border-t border-paper-300/40 p-2">
            <span>测试环境</span><span>接近生产环境</span><span>简化环境</span>
          </div>
          <div className="grid grid-cols-3 gap-1 border-t border-paper-300/40 p-2">
            <span>测试人员</span><span>独立测试团队</span><span>开发/测试团队</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    label: '系统测试示例',
    left: (
      <div className="space-y-4">
        <PageTitle>系统测试示例</PageTitle>
        <SectionTitle>测试计划示例</SectionTitle>
        <div className="space-y-1 text-sm">
          <div className="grid grid-cols-2 gap-1 bg-paper-200/40 p-2 rounded font-medium">
            <span>计划项</span><span>详情</span>
          </div>
          <div className="grid grid-cols-2 gap-1 border-t border-paper-300/40 p-2">
            <span className="font-medium">测试目标</span><span>验证在线购物系统功能和性能</span>
          </div>
          <div className="grid grid-cols-2 gap-1 border-t border-paper-300/40 p-2">
            <span className="font-medium">测试范围</span><span>注册/登录、商品浏览、购物车、订单、支付</span>
          </div>
          <div className="grid grid-cols-2 gap-1 border-t border-paper-300/40 p-2">
            <span className="font-medium">测试方法</span><span>黑盒测试、功能测试、性能测试、安全测试</span>
          </div>
          <div className="grid grid-cols-2 gap-1 border-t border-paper-300/40 p-2">
            <span className="font-medium">测试环境</span><span>AWS EC2, MySQL 8.0, Chrome/Firefox/Safari</span>
          </div>
        </div>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>测试用例示例</SectionTitle>
        <div className="space-y-1 text-xs">
          <div className="grid grid-cols-4 gap-1 bg-paper-200/40 p-2 rounded font-medium">
            <span>用例ID</span><span>名称</span><span>步骤</span><span>预期结果</span>
          </div>
          <div className="grid grid-cols-4 gap-1 p-2 border-t border-paper-300/40">
            <span>TC-001</span><span>用户注册</span><span>填写信息→注册</span><span>跳转登录页面</span>
          </div>
          <div className="grid grid-cols-4 gap-1 p-2 border-t border-paper-300/40">
            <span>TC-002</span><span>商品搜索</span><span>输入关键词→搜索</span><span>显示相关商品</span>
          </div>
          <div className="grid grid-cols-4 gap-1 p-2 border-t border-paper-300/40">
            <span>TC-003</span><span>购物车</span><span>添加→修改→删除</span><span>操作正确</span>
          </div>
          <div className="grid grid-cols-4 gap-1 p-2 border-t border-paper-300/40">
            <span>TC-004</span><span>支付流程</span><span>结算→支付→确认</span><span>订单状态更新</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    label: '最佳实践',
    left: (
      <div className="space-y-4">
        <PageTitle>最佳实践</PageTitle>
        <SectionTitle>测试计划和设计</SectionTitle>
        <BookList items={['基于需求规格说明书制定详细的测试计划', '设计测试用例时考虑正常情况、边界条件和异常情况', '使用测试用例管理工具组织和跟踪测试用例', '建立测试数据管理策略，确保一致性和可重复性']} />
        <SectionTitle>测试执行和报告</SectionTitle>
        <BookList items={['按照测试计划和用例执行测试，记录详细结果', '发现缺陷后使用缺陷管理工具记录和跟踪', '定期生成测试报告，向相关人员汇报进度和结果', '分析测试结果，识别潜在质量问题和风险']} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>测试环境和工具</SectionTitle>
        <BookList items={['建立与生产环境相似的测试环境，确保可靠性', '使用适当的测试工具提高效率', '定期维护和更新测试环境和测试工具', '考虑使用容器化技术（如 Docker）管理测试环境']} />
        <SectionTitle>团队协作和沟通</SectionTitle>
        <BookList items={['与开发团队保持密切沟通，及时解决问题', '参与需求评审和设计评审', '向项目团队和管理层定期汇报测试进展', '建立跨团队协作机制，共同应对挑战']} />
      </div>
    ),
  },
]

export default function SystemTesting() { return <LessonLayout meta={META} spreads={SPREADS} /> }
