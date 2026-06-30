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
        <BookParagraph>测试管理是对软件测试活动进行计划、组织、协调、控制和监督的过程。</BookParagraph>
        <BookList items={['确保测试工作按照预定的计划进行，保证测试的质量和效率', '涵盖从测试需求分析、测试计划制定、测试资源分配到测试结果评估等多个方面', '最终目的是提高软件产品的质量']} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>示例场景</SectionTitle>
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
        <BookParagraph>转型测试是指在系统升级、平台迁移或技术栈变更过程中，对新旧系统进行对比测试，确保业务功能和数据一致性。</BookParagraph>
        <BookList items={['数据迁移验证', '接口兼容性测试', '回归测试', '自动化转型测试可以大幅提升效率，降低人工比对的出错率']} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>自动化脚本示例</SectionTitle>
        <BookCode language="javascript" code={transformCode} />
      </div>
    ),
  },
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
        <BookParagraph>某公司在测试管理中，制定了详细的测试计划模板，每次项目开始前都严格按照模板制定计划。同时，每周组织测试团队和开发团队进行沟通会议，分享测试进展和发现的问题。</BookParagraph>
        <BookParagraph>通过定期的测试结果回顾，发现某个项目中因为测试数据准备不充分导致测试效率低下，后续项目中就重点改进了测试数据管理。</BookParagraph>
      </div>
    ),
  },
]

export default function TestingManagement() { return <LessonLayout meta={META} spreads={SPREADS} /> }
