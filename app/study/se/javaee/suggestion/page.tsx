'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import {
  PageTitle,
  BookParagraph,
  BookCode,
  BookAlert,
  BookList,
  TagGrid,
} from '@/app/components/ui/book/BookContent'

const ROADMAP_CODE = `Java基础 → Web开发 → 数据库 → 企业服务 → 框架 → 微服务 → 云原生 → DevOps → 性能优化 → 前沿技术`

const PRACTICE_CODE = `# Spring Boot + MyBatis企业管理系统
- 用户管理、权限控制、订单管理、报表统计
- 支持Docker容器化部署
- 集成Jenkins自动化CI/CD
- Prometheus+Grafana监控
- 代码仓库：https://github.com/example/enterprise-demo`

const META: LessonMeta = {
  subject: '软件工程',
  chapterTitle: '学习建议',
  chapterNumber: 17,
  totalChapters: 17,
  subjectHref: '/study/se/javaee',
  prevChapter: { label: '前沿技术趋势', href: '/study/se/javaee/trend' },
  theme: THEMES.software,
}

const SPREADS = [
  {
    label: '概述',
    left: (
      <div className="space-y-4">
        <PageTitle>JavaEE学习建议概述</PageTitle>
        <BookParagraph>JavaEE 学习需要理论与实践相结合，注重企业级开发思维和工程能力的培养。以下是一些核心学习建议，帮助开发者更高效地掌握企业级开发技术。</BookParagraph>
        <BookList items={[
          '理论与实践结合，重视动手能力',
          '关注主流技术栈与企业应用场景',
          '持续学习，紧跟技术发展',
          '多做项目，积累实战经验',
          '善用社区与开源资源',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-ink mt-4">学习心态</h3>
        <BookParagraph>企业级开发涉及的技术栈广泛，从基础到框架再到云原生，需要循序渐进。保持耐心和持续学习的热情是成功的关键。</BookParagraph>
        <BookAlert type="success" message="JavaEE 的学习是一个长期过程，建议制定合理的学习计划，每周保持固定的学习时间，并将所学知识应用到实际项目中。" />
      </div>
    ),
  },
  {
    label: '学习路线',
    left: (
      <div className="space-y-4">
        <PageTitle>学习路线</PageTitle>
        <h3 className="text-sm font-medium text-ink mt-4">推荐学习路径</h3>
        <BookList items={[
          'Java基础与面向对象',
          'Web开发基础（Servlet/JSP）',
          '数据库与JDBC/JPA',
          '企业级服务与安全',
          '主流框架（Spring、Hibernate等）',
          '微服务与容器化',
          'DevOps与CI/CD',
          '性能调优与监控',
          '前沿技术趋势',
        ]} ordered />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-ink mt-4">路线图示例</h3>
        <BookCode language="text" code={ROADMAP_CODE} />
        <BookAlert type="info" message="学习路线可以根据个人基础和目标灵活调整。建议每个阶段深入掌握后再进入下一阶段，确保知识体系的完整性。" />
      </div>
    ),
  },
  {
    label: '实践与项目',
    left: (
      <div className="space-y-4">
        <PageTitle>实践与项目</PageTitle>
        <h3 className="text-sm font-medium text-ink mt-4">实战建议</h3>
        <BookList items={[
          '参与开源项目，提升协作能力',
          '模拟企业级项目开发流程',
          '关注代码规范与文档编写',
          '多用自动化测试与持续集成',
          '练习部署与运维',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-ink mt-4">项目实战案例</h3>
        <BookCode language="text" code={PRACTICE_CODE} />
        <TagGrid items={['Spring Boot', 'MyBatis', 'Docker', 'Jenkins', 'Prometheus']} />
      </div>
    ),
  },
  {
    label: '常见问题与答疑',
    left: (
      <div className="space-y-4">
        <PageTitle>常见问题与答疑</PageTitle>
        <h3 className="text-sm font-medium text-ink mt-4">学习常见疑问</h3>
        <BookList items={[
          'Q: JavaEE和Spring Boot是什么关系？A: Spring Boot是JavaEE生态的重要补充，简化了配置和开发流程。',
          'Q: 如何高效掌握企业级开发？A: 多做项目，注重团队协作和工程实践。',
          'Q: 面试时重点考察哪些内容？A: 基础知识、主流框架、项目经验、性能与安全。',
          'Q: 如何跟进技术趋势？A: 关注官方文档、技术社区、开源项目。',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-ink mt-4">学习建议补充</h3>
        <BookParagraph>除了常见问题之外，建议开发者多参与技术社区讨论，关注行业动态。企业级开发不仅需要技术能力，还需要良好的沟通协作能力。</BookParagraph>
        <BookAlert type="warning" message="不要局限于单一技术栈，JavaEE 生态丰富，Spring Boot/Cloud、Quarkus、Micronaut 等框架各有优势，建议根据项目需求选择合适的技术方案。" />
      </div>
    ),
  },
  {
    label: '资源推荐',
    left: (
      <div className="space-y-4">
        <PageTitle>资源推荐</PageTitle>
        <h3 className="text-sm font-medium text-ink mt-4">优质学习资源</h3>
        <BookList items={[
          <>官方文档：<a href="https://jakarta.ee/" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Jakarta EE</a></>,
          <>Spring官方文档：<a href="https://spring.io/docs" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Spring Docs</a></>,
          <>菜鸟教程：<a href="https://www.runoob.com/java/java-tutorial.html" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Java教程</a></>,
          '极客时间专栏、慕课网、B站优质课程',
          'GitHub优质开源项目',
          'Stack Overflow、CSDN、掘金等技术社区',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-ink mt-4">工具与平台</h3>
        <BookList items={[
          'IDEA、Eclipse、VSCode等开发工具',
          'Postman、Swagger接口调试',
          'Docker、Kubernetes实验环境',
          'Jenkins、GitLab CI持续集成平台',
        ]} />
        <BookAlert type="info" message="善用工具和社区资源是提高学习效率的关键。建议定期关注官方文档更新和技术博客，保持对技术趋势的敏感度。" />
      </div>
    ),
  },
]

export default function JavaEESuggestionPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
