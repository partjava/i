'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import { PageTitle, SectionTitle, BookParagraph, BookCode, BookList } from '@shared/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '软件工程',
  chapterTitle: '测试管理',
  chapterNumber: 7,
  totalChapters: 9,
  subjectHref: '/study/se/standards-testing',
  prevChapter: { label: '自动化测试', href: '/study/se/standards-testing/automation' },
  nextChapter: { label: '专项测试', href: '/study/se/standards-testing/special' },
  theme: THEMES.software,
}

const transformCode = `// 假设有新旧两个系统的API，自动对比数据一致性
const oldApi = 'https://old.example.com/api/data';
const newApi = 'https://new.example.com/api/data';

async function fetchData(api) {
  const res = await fetch(api);
  if (!res.ok) throw new Error('HTTP ' + res.status);
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

compareData();`

const SPREADS = [
  {
    label: '测试管理概念',
    left: (
      <div className="space-y-4">
        <PageTitle>测试管理概念</PageTitle>
<BookParagraph>可以从三个问题检查管理是否有效：当前最重要的风险是什么，已有证据覆盖到哪里，剩余问题由谁决定如何处置。用例数量与执行速度只是辅助信息，最终需要支持可解释的质量与发布决策。</BookParagraph>
        <BookParagraph>测试管理是对软件测试活动进行计划、组织、协调、控制和监督的过程。</BookParagraph>
        <BookList items={['确保测试工作按照预定的计划进行，保证测试的质量和效率', '涵盖从测试需求分析、测试计划制定、测试资源分配到测试结果评估等多个方面', '最终目的是提高软件产品的质量']} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>示例场景</SectionTitle>
<BookParagraph>对于课程网站，可把账号、课程阅读、笔记保存和数据导出分成不同风险域。跨域问题需要指定负责人，例如账号权限变更影响搜索与导出，就不能只交给某个页面的测试人员各自验证。</BookParagraph>
        <BookParagraph>例如，在一个大型电商项目中，测试管理团队需要协调不同功能模块的测试工作。他们要确定每个模块的测试重点，比如购物车模块要重点测试商品添加、删除、数量变更等功能的准确性。</BookParagraph>
      </div>
    ),
  },
  {
    label: '测试管理流程',
    left: (
      <div className="space-y-4">
        <PageTitle>测试管理流程</PageTitle>
        <BookList items={['起始于测试计划的制定，明确测试目标、范围、策略等。', '接着进行测试资源的准备，包括人力、硬件、软件等。', '在测试执行阶段，实时监控测试进度，及时处理问题。', '最后是测试结果的分析和总结，为后续改进提供依据。']} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>流程示例</SectionTitle>
<BookParagraph>移动应用的网络、回调与设备是计划的一部分。若支付回调测试环境尚未准备，应该标记为前置阻塞并给出解除时间，而不是等最后一天才发现关键用例无法执行。执行状态要反映真实证据。</BookParagraph>
        <BookParagraph>以一个移动应用项目为例：</BookParagraph>
        <BookList items={['测试计划阶段：确定要测试的功能包括用户注册登录、商品浏览、下单支付等。', '安排测试人员，准备测试设备和测试数据。', '执行时记录每个测试用例的执行结果。', '分析发现支付环节存在兼容性问题，反馈给开发团队修复。']} />
      </div>
    ),
  },
  {
    label: '测试管理工具',
    left: (
      <div className="space-y-4">
        <PageTitle>测试管理工具</PageTitle>
        <BookParagraph>测试管理工具能帮助提高测试管理的效率和质量。</BookParagraph>
        <BookList items={['JIRA：不仅可以用于缺陷跟踪，还能进行项目进度管理。', 'TestRail：专注于测试用例管理和测试执行跟踪。', '通过设置任务的优先级、状态等属性，方便团队沟通和任务跟进。', '在 TestRail 中可将测试用例按功能模块分类管理，清晰记录执行情况。']} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>工具应用</SectionTitle>
<BookParagraph>工具字段应服务于团队流程：需求编号连接用例与缺陷，执行记录绑定构建版本，缺陷保存最小复现与预期差异。工具之间同步时要避免重复编号和状态语义不一致，不能因为看板都显示绿色就省略证据审查。</BookParagraph>
        <BookParagraph>当使用 JIRA 时，测试人员可以创建不同类型的任务来表示测试用例、缺陷等。</BookParagraph>
        <BookParagraph>在 TestRail 中，可以将测试用例按照功能模块进行分类管理，在执行测试时，清晰地记录每个用例的执行情况。</BookParagraph>
      </div>
    ),
  },
  {
    label: '转型测试',
    left: (
      <div className="space-y-4">
        <PageTitle>转型测试</PageTitle>
<BookParagraph>这里更具体地指系统迁移与对照验证。先定义哪些业务结果必须相同，哪些字段允许因版本或时间不同而变化；再选择主键、抽样范围与对账方式。对比工具只负责执行规则，业务等价需要事先明确。</BookParagraph>
        <BookParagraph>转型测试是指在系统升级、平台迁移或技术栈变更过程中，对新旧系统进行对比测试，确保业务功能和数据一致性。</BookParagraph>
        <BookList items={['数据迁移验证', '接口兼容性测试', '回归测试', '自动化转型测试可以大幅提升效率，降低人工比对的出错率']} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>自动化脚本示例</SectionTitle>
        <BookParagraph>此段需要可访问的示例API及支持fetch的运行环境，仅比较完整序列化结果；字段或数组顺序差异也会触发不一致。业务迁移应使用下文按主键和字段口径的比较方案。</BookParagraph>
        <BookCode language="javascript" code={transformCode} />
      </div>
    ),
  },
{ label: "把需求变成可追踪的测试范围", left: (<div className="space-y-4">
<PageTitle>把需求变成可追踪的测试范围</PageTitle>
<BookParagraph>管理的产物不是尽量多的用例，而是一条能回答“这个风险有没有证据覆盖”的链路。需求说明可观察行为，测试用例验证正常和异常路径，执行记录绑定版本与环境，缺陷指向复现步骤，发布决策说明残余风险。需求改变时沿链路找到受影响用例，而不是把全部测试盲目重跑。</BookParagraph>
<div className="overflow-x-auto"><table className="w-full text-sm border-collapse"><thead><tr><th className="border-b p-2 text-left">对象</th><th className="border-b p-2 text-left">关键字段</th><th className="border-b p-2 text-left">课程笔记例子</th></tr></thead><tbody><tr><td className="border-b p-2 align-top">需求</td><td className="border-b p-2 align-top">编号、行为、验收条件</td><td className="border-b p-2 align-top">只能读取本人的私密笔记</td></tr><tr><td className="border-b p-2 align-top">用例</td><td className="border-b p-2 align-top">输入、步骤、预期</td><td className="border-b p-2 align-top">用户A请求B的笔记ID</td></tr><tr><td className="border-b p-2 align-top">执行</td><td className="border-b p-2 align-top">版本、环境、实际结果</td><td className="border-b p-2 align-top">版本r12返回拒绝且无正文</td></tr><tr><td className="border-b p-2 align-top">缺陷</td><td className="border-b p-2 align-top">证据、影响、状态</td><td className="border-b p-2 align-top">导出接口仍暴露他人内容</td></tr></tbody></table></div>
</div>), right: (<div className="space-y-4">
<PageTitle>风险优先级需要解释依据</PageTitle>
<BookParagraph>有限时间下先覆盖影响大且容易发生的问题。可以用影响与可能性的粗粒度矩阵辅助排序，但分数不能替代讨论，也不能精确预测损失。笔记越权即使复现概率不高，涉及隐私仍应优先；页脚轻微间距错位可以后排。区分缺陷严重程度与修复优先级，后者还受发布时间和依赖影响。</BookParagraph>
<BookList items={["高影响：数据泄露、不可恢复丢失、核心功能不可用。", "高可能：频繁路径、近期改动大、历史问题集中。", "增加风险证据：依赖复杂、缺少监控、回退困难。", "排序结论：记录选择理由和接受风险的负责人。"]} />
</div>) },
{ label: "用一个小例子追踪缺陷生命周期", left: (<div className="space-y-4">
<PageTitle>用一个小例子追踪缺陷生命周期</PageTitle>
<BookParagraph>测试发现导出越权后，先保存最小复现数据和实际响应，确认问题归属，再进入修复。开发提交后不能只因代码看起来合理就关闭，需在指定版本重跑原用例，并回归相邻列表和附件路径。无法复现、重复、延期与已修复是不同状态，每种状态都要有依据，避免统计中混成“已完成”。</BookParagraph>
<BookCode language="text" showLineNumbers code={"发现 → 澄清与分级 → 指派 → 修复 → 待复测\n                                         ↓\n复测失败 → 重新打开 ←—————— 验证原场景\n复测成功 → 相邻风险回归 → 关闭并保留版本证据\n延期：记录影响、临时措施、负责人和重新评估时间"} />
</div>), right: (<div className="space-y-4">
<PageTitle>资源排期先识别阻塞项</PageTitle>
<BookParagraph>某用例依赖真实回调、测试设备或迁移数据，就把这些准备工作写进计划并尽早验证。执行中区分通过、失败、阻塞和未执行，阻塞不等于产品缺陷，也不等于测试已经通过。每日同步重点应是哪些风险缺证据、阻塞由谁处理，而不是只报执行了多少条。</BookParagraph>
<div className="overflow-x-auto"><table className="w-full text-sm border-collapse"><thead><tr><th className="border-b p-2 text-left">状态</th><th className="border-b p-2 text-left">含义</th><th className="border-b p-2 text-left">下一步</th></tr></thead><tbody><tr><td className="border-b p-2 align-top">通过</td><td className="border-b p-2 align-top">当前条件下符合预期</td><td className="border-b p-2 align-top">保留版本和证据</td></tr><tr><td className="border-b p-2 align-top">失败</td><td className="border-b p-2 align-top">实际行为偏离预期</td><td className="border-b p-2 align-top">定位或登记缺陷</td></tr><tr><td className="border-b p-2 align-top">阻塞</td><td className="border-b p-2 align-top">前置环境未满足</td><td className="border-b p-2 align-top">安排责任人解除阻塞</td></tr><tr><td className="border-b p-2 align-top">未执行</td><td className="border-b p-2 align-top">尚未产生结论</td><td className="border-b p-2 align-top">按风险重新排期</td></tr></tbody></table></div>
</div>) },
{ label: "通过率也可能给出错误印象", left: (<div className="space-y-4">
<PageTitle>通过率也可能给出错误印象</PageTitle>
<BookParagraph>假设一百条用例中八十通过、五失败、十阻塞、五未执行，只用已执行的八十五条计算通过率约百分之九十四，容易掩盖十五条没有结论。报告应同时显示执行覆盖和关键风险状态。即使通过率百分之九十九，只要剩下的是越权或数据丢失，也可能不能发布。下面例子用明确口径计算。</BookParagraph>
<BookCode language="python" showLineNumbers code={"# Python 3：仅演示指标口径，不自动作出发布决定\ncounts = {\"passed\": 80, \"failed\": 5, \"blocked\": 10, \"pending\": 5}\nplanned = sum(counts.values())\nexecuted = counts[\"passed\"] + counts[\"failed\"]\nprint(f\"execution={executed/planned:.0%}\")  # 85%\nprint(f\"pass_among_executed={counts['passed']/executed:.1%}\")  # 94.1%\nprint(f\"unresolved={counts['blocked'] + counts['pending']}\")  # 15"} />
</div>), right: (<div className="space-y-4">
<PageTitle>新旧系统比较应按业务语义</PageTitle>
<BookParagraph>原有 JSON.stringify 比较适合观察完全相同序列化结果，但字段顺序或数组顺序变化可能导致误报；忽略关键字段又会漏报。迁移验证先定义业务主键、字段类型、允许差异和时间口径，再按主键比较。下面 Python 3 例子对不关心列表顺序的课程进度做对照，不忽略完成数的差异。</BookParagraph>
<BookCode language="python" showLineNumbers code={"old = [{\"id\": 2, \"completed\": 3}, {\"id\": 1, \"completed\": 2}]\nnew = [{\"completed\": 2, \"id\": 1}, {\"completed\": 3, \"id\": 2}]\ndef canonical(rows):\n    ids = [row[\"id\"] for row in rows]\n    assert len(ids) == len(set(ids)), \"重复业务主键\"\n    return {row[\"id\"]: row[\"completed\"] for row in rows}\nassert canonical(old) == canonical(new)\nnew[0][\"completed\"] = 9\nassert canonical(old) != canonical(new)\nprint(\"order ignored; business difference detected\")"} />
</div>) },
{ label: "发布门槛与回退条件", left: (<div className="space-y-4">
<PageTitle>发布门槛与回退条件</PageTitle>
<BookParagraph>在执行前约定门槛，例如关键流程必须有证据、指定严重缺陷不能开放、迁移对账符合口径，并写清例外由谁评估。发布后继续观察错误与业务数据，达到约定条件则回退或暂停。回退方案需要考虑新增数据与数据库兼容性，不能只说“把旧包发回去”。门槛是团队决定，不是某个通用百分比。</BookParagraph>
<BookList items={["进入测试：版本可安装、环境可用、核心依赖与样本准备好。", "结束评估：关键风险有结论，剩余问题有明确处置。", "上线观察：指定指标、观察窗口和责任人。", "回退演练：验证旧版本能读取新写入数据，或准备兼容恢复方案。"]} />
</div>), right: (<div className="space-y-4">
<PageTitle>用复盘改善下一次计划</PageTitle>
<BookParagraph>练习：为“笔记迁移到新服务”交付一页测试计划，写明范围、风险、环境、数据、排期、证据与退出条件。再模拟出现一项关键阻塞和一个数据差异，说明如何改排期与发布决策。参考思路是先保住核心数据风险，再缩减低价值重复验证；复盘关注为何漏测和怎样更早发现，不只统计每人发现多少缺陷。</BookParagraph>
<BookList items={[<a key="https://docs.python.org/3/library/unittest.html" href="https://docs.python.org/3/library/unittest.html" target="_blank" rel="noopener noreferrer" className="underline">Python：unittest与测试组织</a>, <a key="https://owasp.org/projects/web-security-testing-guide" href="https://owasp.org/projects/web-security-testing-guide" target="_blank" rel="noopener noreferrer" className="underline">OWASP：安全测试范围参考</a>]} />
</div>) },
  {
    label: '最佳实践',
    left: (
      <div className="space-y-4">
        <PageTitle>最佳实践</PageTitle>
        <BookList items={['建立明确的测试计划和规范，确保所有测试活动都有章可循。', '加强团队沟通与协作，及时共享测试信息。', '定期对测试结果进行回顾和分析，总结经验教训。', '持续改进测试管理流程。']} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>案例</SectionTitle>
<BookParagraph>如果复盘发现问题集中在测试数据，下一轮应把样本准备和质量核对前移，并记录谁负责维护。只增加最终测试时间未必有效；改善需要对应具体原因，并在后续项目中检查是否真的减少阻塞与漏测。</BookParagraph>
        <BookParagraph>某公司在测试管理中，制定了详细的测试计划模板，每次项目开始前都严格按照模板制定计划。同时，每周组织测试团队和开发团队进行沟通会议，分享测试进展和发现的问题。</BookParagraph>
        <BookParagraph>通过定期的测试结果回顾，发现某个项目中因为测试数据准备不充分导致测试效率低下，后续项目中就重点改进了测试数据管理。</BookParagraph>
      </div>
    ),
  },
]

export default function TestingManagement() { return <LessonLayout meta={META} spreads={SPREADS} /> }
