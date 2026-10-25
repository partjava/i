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
<BookParagraph>功能测试回答某个操作是否符合规则，专项测试则深入回答在特定风险条件下是否仍可用。例如保存笔记成功只是正常路径；长时间运行后是否泄漏、弱网重试是否重复、键盘用户是否能触达保存按钮，需要分别设计场景。</BookParagraph>
        <BookParagraph>专项测试是针对软件的某一特定方面进行的深入测试，如安全性、性能、兼容性、可用性等。</BookParagraph>
        <BookList items={['通过专项测试，可以发现常规功能测试难以覆盖的潜在风险。', '每种专项测试都有其独特的测试方法和工具。', '专项测试需要深入的领域知识和专业技能。']} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>场景举例</SectionTitle>
<BookParagraph>以学习网站为贯穿案例：搜索接口关注尾延迟，私密笔记关注对象授权，移动学习页关注窄屏布局与触控，聊天窗口关注长时资源回收。同一产品可对应多个专项，但每个专项的目标和证据要独立说明。</BookParagraph>
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
<BookParagraph>先识别需要证明的风险，再选工具。扫描器可发现部分已知模式，不能代替跨用户业务授权验证；设备云能提供环境，仍需要明确操作步骤；性能工具能生成请求，但不能自动替团队定义可接受延迟。</BookParagraph>
        <BookList items={['安全测试：OWASP ZAP、Burp Suite', '性能测试：JMeter、LoadRunner', '兼容性测试：BrowserStack、Sauce Labs', '可用性测试：用户测试、眼动追踪', '可靠性测试：故障注入、长期运行测试']} />
      </div>
    ),
  },
  {
    label: '专项测试自动化',
    left: (
      <div className="space-y-4">
        <PageTitle>专项测试自动化</PageTitle>
<BookParagraph>自动化适合重复执行条件明确的场景，例如固定数据集下的搜索负载和跨用户访问拒绝。可用性访谈、复杂视觉判断和部分辅助技术操作仍需要人工分析。自动化输出应包含断言证据，而不只是工具进程退出成功。</BookParagraph>
        <BookParagraph>专项测试也可以通过自动化工具提升效率和覆盖率。</BookParagraph>
        <BookList items={['性能专项测试可用 JMeter 脚本自动化执行', '安全专项测试可用自动化扫描工具（如 OWASP ZAP）', '兼容性测试可通过云服务（如 BrowserStack）自动化']} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>JMeter 性能测试脚本示例</SectionTitle>
        <BookParagraph>这是Node.js调用本机JMeter的启动包装，需要先安装Java、JMeter并准备test_plan.jmx；它本身没有定义负载、断言或通过门槛。</BookParagraph>
        <BookCode language="javascript" code={jmeterCode} />
      </div>
    ),
  },
{ label: "专项测试从风险假设开始", left: (<div className="space-y-4">
<PageTitle>专项测试从风险假设开始</PageTitle>
<BookParagraph>“网站要快、要安全、要兼容”还不能直接变成测试。把它改为具体可观察目标：课程搜索在指定数据量和并发下的尾延迟、用户不能读取他人笔记、手机竖屏下关键按钮不会被底栏遮住。每个目标说明前提、测量方法和判定依据，工具只是执行手段，不是目标本身。</BookParagraph>
<div className="overflow-x-auto"><table className="w-full text-sm border-collapse"><thead><tr><th className="border-b p-2 text-left">风险</th><th className="border-b p-2 text-left">场景</th><th className="border-b p-2 text-left">可观察证据</th></tr></thead><tbody><tr><td className="border-b p-2 align-top">响应慢</td><td className="border-b p-2 align-top">大量用户同时搜索</td><td className="border-b p-2 align-top">P95、错误率、资源曲线</td></tr><tr><td className="border-b p-2 align-top">越权</td><td className="border-b p-2 align-top">用户A请求用户B笔记</td><td className="border-b p-2 align-top">拒绝响应且未返回正文</td></tr><tr><td className="border-b p-2 align-top">布局遮挡</td><td className="border-b p-2 align-top">窄屏、横屏与大字体</td><td className="border-b p-2 align-top">操作可达、内容可读</td></tr><tr><td className="border-b p-2 align-top">长时泄漏</td><td className="border-b p-2 align-top">连续切页与打开弹窗</td><td className="border-b p-2 align-top">内存趋势及资源释放</td></tr></tbody></table></div>
</div>), right: (<div className="space-y-4">
<PageTitle>性能目标必须包含负载模型</PageTitle>
<BookParagraph>并发用户数与每秒请求数不能直接等同。十个用户每十秒查一次，与十个用户无间隔循环，负载差别很大。先定义业务比例、思考时间、数据规模与缓存状态，再逐步加压。闭环模型中，请求变慢会降低实际发送速率；看到吞吐不再增加时，需要同时看服务排队和压测机是否饱和。</BookParagraph>
<BookList items={["基线：单用户或低负载，确认功能与响应内容正确。", "递增：分阶段提高负载，观察延迟和错误的变化。", "稳态：在约定负载下持续运行，检查资源是否持续增长。", "恢复：降低负载后确认排队、错误和资源能回落。"]} />
</div>) },
{ label: "平均数为何掩盖体验", left: (<div className="space-y-4">
<PageTitle>平均数为何掩盖体验</PageTitle>
<BookParagraph>九个请求各一百毫秒，一个请求两秒，平均耗时二百九十毫秒，却有用户等待了两秒。分位数反映排序后的位置，但小样本的 P95 波动很大，必须注明采样数量与算法。下面 Python 3 使用 nearest-rank 定义，仅演示计算，不替代真实负载实验；这些延迟是假数据。</BookParagraph>
<BookCode language="python" showLineNumbers code={"from math import ceil\nsamples = [100] * 9 + [2000]\nordered = sorted(samples)\ndef percentile(p):\n    return ordered[ceil(p * len(ordered)) - 1]\nprint(sum(samples) / len(samples))  # 290.0\nprint(percentile(0.95))            # 2000\n# 多个阶段或接口应分别统计，不把不同负载混成一个分位数。"} />
</div>), right: (<div className="space-y-4">
<PageTitle>把JMeter计划补完整</PageTitle>
<BookParagraph>原有 Node.js 代码只是调用本机已安装的 JMeter，test_plan.jmx 必须先准备好。计划里至少定义线程组、请求参数、合法测试账号、响应断言和必要的等待时间；只判断 HTTP 200 会把统一错误页当成功。先用少量用户验证脚本，再用 CLI 跑正式负载，不能对未经授权的线上目标直接施压。</BookParagraph>
<BookCode language="bash" showLineNumbers code={"# 需预先安装JMeter并准备经过验证的test_plan.jmx。\n# result-demo.jtl 与 report-demo 必须使用新的输出位置。\njmeter -n -t test_plan.jmx \\\n  -l result-demo.jtl -e -o report-demo\n# 报告需结合实际吞吐、断言失败、延迟与服务端指标分析。"} />
</div>) },
{ label: "安全验证关注信任边界", left: (<div className="space-y-4">
<PageTitle>安全验证关注信任边界</PageTitle>
<BookParagraph>以私密笔记为例，先创建 A、B 两个测试用户，各自写一条笔记；用 A 的身份请求 B 的笔记 ID，验证服务端拒绝且响应不含正文。再检查列表、搜索、导出、附件和缓存等读取路径。隐藏按钮只影响界面，无法替代对象归属校验；自动扫描也很难替你判断业务数据属于谁。</BookParagraph>
<BookList items={["未登录：不能读取私密记录。", "合法本人：能读取自己的记录。", "跨用户：更换ID仍被拒绝。", "授权变更：权限撤回后缓存与导出不能继续泄露。"]} />
</div>), right: (<div className="space-y-4">
<PageTitle>兼容性不是设备清单越长越好</PageTitle>
<BookParagraph>先根据访问数据选择浏览器、系统与屏幕类别，再叠加深浅主题、大字体、触控和横竖屏。对学习页重点检查目录开合、代码横向滚动、底栏遮挡与软键盘顶起输入框。截图能说明外观，关键操作仍需实际点击和键盘验证；某个分辨率正确不意味着所有相近设备都正确。</BookParagraph>
<div className="overflow-x-auto"><table className="w-full text-sm border-collapse"><thead><tr><th className="border-b p-2 text-left">维度</th><th className="border-b p-2 text-left">代表条件</th><th className="border-b p-2 text-left">观察重点</th></tr></thead><tbody><tr><td className="border-b p-2 align-top">宽度</td><td className="border-b p-2 align-top">窄屏、平板、桌面</td><td className="border-b p-2 align-top">换行与横向溢出</td></tr><tr><td className="border-b p-2 align-top">输入</td><td className="border-b p-2 align-top">触控、鼠标、键盘</td><td className="border-b p-2 align-top">目标可点、焦点可见</td></tr><tr><td className="border-b p-2 align-top">主题</td><td className="border-b p-2 align-top">明亮与深色</td><td className="border-b p-2 align-top">文字与背景可辨</td></tr><tr><td className="border-b p-2 align-top">缩放</td><td className="border-b p-2 align-top">大字体与页面缩放</td><td className="border-b p-2 align-top">内容重排、操作可达</td></tr></tbody></table></div>
</div>) },
{ label: "可访问性与可靠性分别取证", left: (<div className="space-y-4">
<PageTitle>可访问性与可靠性分别取证</PageTitle>
<BookParagraph>可访问性检查语义标签、键盘操作、焦点顺序、对比度和替代文本；自动工具只能覆盖其中一部分。可靠性则关注长时间运行、网络中断和依赖故障后的行为。断网重试应避免重复保存笔记，页面重新可用后状态应一致。两类问题可能同时影响用户，但证据与修复方式不同。</BookParagraph>
<BookList items={["可访问性样例：不用鼠标完成搜索、翻页和关闭弹窗。", "可靠性样例：保存中断后重试，记录不重复且提示准确。", "回收样例：连续打开关闭弹窗，监听和计时器不持续增加。"]} />
</div>), right: (<div className="space-y-4">
<PageTitle>专项报告应能复现结论</PageTitle>
<BookParagraph>报告写清版本、环境、样本数据、负载模型、步骤、指标和异常证据，并指出未覆盖范围。练习：为学习网站选三个高风险专项，各写一个正例、反例和恢复场景；同一问题修复前后使用相同条件对照。结论应限定在已测试条件内，不能仅凭一次绿色报告宣布“完全安全”。</BookParagraph>
<BookList items={[<a key="https://jmeter.apache.org/usermanual/get-started.html" href="https://jmeter.apache.org/usermanual/get-started.html" target="_blank" rel="noopener noreferrer" className="underline">Apache JMeter：入门与CLI运行</a>, <a key="https://www.w3.org/WAI/WCAG22/quickref/" href="https://www.w3.org/WAI/WCAG22/quickref/" target="_blank" rel="noopener noreferrer" className="underline">W3C：WCAG快速参考</a>, <a key="https://owasp.org/projects/web-security-testing-guide" href="https://owasp.org/projects/web-security-testing-guide" target="_blank" rel="noopener noreferrer" className="underline">OWASP：Web Security Testing Guide</a>]} />
</div>) },
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
<BookParagraph>检查清单用于避免遗漏，不能直接当成完成证据。每一项都要落实到范围、数据、步骤和实际结果；尤其安全与可靠性用例应说明授权测试环境，避免把扫描数量或运行时长当作质量结论。</BookParagraph>
        <BookList items={['SQL 注入防护验证', 'XSS 跨站脚本防护', '身份认证与授权测试', '高并发压力测试', '跨浏览器兼容性', '移动端适配验证']} />
      </div>
    ),
  },
]

export default function SpecialTestingPage() { return <LessonLayout meta={META} spreads={SPREADS} /> }
