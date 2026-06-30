'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import { PageTitle, SectionTitle, BookParagraph, BookCode, BookList } from '@shared/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '软件工程',
  chapterTitle: '专项测试',
  chapterNumber: 8,
  totalChapters: 9,
  subjectHref: '/study/se/standards-testing',
  prevChapter: { label: '测试管理', href: '/study/se/standards-testing/management' },
  nextChapter: { label: '实际项目案例', href: '/study/se/standards-testing/case' },
  theme: THEMES.software,
}

const jmeterCode = `// 使用 Node.js 启动 JMeter 性能测试
const { exec } = require('child_process');
exec('jmeter -n -t test_plan.jmx -l result.jtl', (err, stdout, stderr) => {
  if (err) {
    console.error('性能测试执行失败:', err);
    return;
  }
  console.log('性能测试完成:', stdout);
});`

const SPREADS = [
  {
    label: '专项测试概念',
    left: (
      <div className="space-y-4">
        <PageTitle>专项测试概念</PageTitle>
        <BookParagraph>专项测试是针对软件的某一特定方面进行的深入测试，如安全性、性能、兼容性、可用性等。</BookParagraph>
        <BookList items={['通过专项测试，可以发现常规功能测试难以覆盖的潜在风险。', '每种专项测试都有其独特的测试方法和工具。', '专项测试需要深入的领域知识和专业技能。']} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>场景举例</SectionTitle>
        <BookParagraph>如对电商系统进行安全专项测试，重点关注 SQL 注入、XSS 等漏洞。</BookParagraph>
      </div>
    ),
  },
  {
    label: '专项测试类型',
    left: (
      <div className="space-y-4">
        <PageTitle>专项测试类型</PageTitle>
        <BookParagraph>常见专项测试类型包括：</BookParagraph>
        <BookList items={['安全测试：检测安全漏洞，如 SQL 注入、XSS、CSRF 等', '性能测试：评估系统在高并发、大数据量下的表现', '兼容性测试：验证系统在不同环境下的正常工作', '可用性测试：评估用户体验和交互设计', '可靠性测试：测试系统长期运行的稳定性']} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>类型与工具</SectionTitle>
        <BookList items={['安全测试：OWASP ZAP、Burp Suite', '性能测试：JMeter、LoadRunner', '兼容性测试：BrowserStack、Sauce Labs', '可用性测试：用户测试、眼动追踪', '可靠性测试：故障注入、长期运行测试']} />
      </div>
    ),
  },
  {
    label: '专项测试自动化',
    left: (
      <div className="space-y-4">
        <PageTitle>专项测试自动化</PageTitle>
        <BookParagraph>专项测试也可以通过自动化工具提升效率和覆盖率。</BookParagraph>
        <BookList items={['性能专项测试可用 JMeter 脚本自动化执行', '安全专项测试可用自动化扫描工具（如 OWASP ZAP）', '兼容性测试可通过云服务（如 BrowserStack）自动化']} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>JMeter 性能测试脚本示例</SectionTitle>
        <BookCode language="javascript" code={jmeterCode} />
      </div>
    ),
  },
  {
    label: '最佳实践',
    left: (
      <div className="space-y-4">
        <PageTitle>最佳实践</PageTitle>
        <BookList items={['制定专项测试计划，明确测试目标和范围。', '选择合适的工具和方法，结合自动化手段提升效率。', '测试结果要有详细记录，便于后续分析和改进。', '定期进行安全专项测试，防止新漏洞引入。', '性能专项测试应覆盖高并发、极端场景。', '兼容性专项测试要覆盖主流设备和浏览器。']} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>检查要点</SectionTitle>
        <BookList items={['SQL 注入防护验证', 'XSS 跨站脚本防护', '身份认证与授权测试', '高并发压力测试', '跨浏览器兼容性', '移动端适配验证']} />
      </div>
    ),
  },
]

export default function SpecialTestingPage() { return <LessonLayout meta={META} spreads={SPREADS} /> }
