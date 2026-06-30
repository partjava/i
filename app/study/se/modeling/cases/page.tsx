'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import {
  PageTitle, SectionTitle, BookParagraph, BookCode, BookList, TagGrid,
} from '@shared/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '软件工程',
  chapterTitle: '实战案例与项目',
  chapterNumber: 5,
  totalChapters: 7,
  subjectHref: '/study/se/modeling',
  prevChapter: { label: '架构设计', href: '/study/se/modeling/architecture' },
  nextChapter: { label: '软件测试', href: '/study/se/modeling/testing' },
  theme: THEMES.software,
}

const SPREADS = [
  {
    label: '理论知识',
    left: (
      <div className="space-y-4">
        <PageTitle>实战案例与项目</PageTitle>
        <BookParagraph>
          通过真实项目案例将建模理论付诸实践。本章从电商系统、在线教育平台和企业管理系统等典型场景出发，
          展示完整的建模与设计过程。
        </BookParagraph>
        <SectionTitle>案例学习目标</SectionTitle>
        <BookList items={[
          '掌握从需求分析到模型设计的完整流程',
          '理解不同业务领域对建模策略的影响',
          '学会权衡各种设计方案的优缺点',
          '培养从全局角度思考系统设计的能力',
          '积累可复用的建模经验和模式',
        ]} />
        <SectionTitle>推荐实践方法</SectionTitle>
        <BookList items={[
          '先独立思考设计方案，再对比参考方案',
          '关注设计决策背后的权衡和理由',
          '尝试用多种方案解决同一问题',
          '在代码中验证模型的可实现性',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>完整项目流程</SectionTitle>
        <BookParagraph>
          <b>1. 需求调研：</b>用户访谈、需求文档、原型确认
        </BookParagraph>
        <BookParagraph>
          <b>2. 领域建模：</b>识别实体、值对象、聚合、领域事件
        </BookParagraph>
        <BookParagraph>
          <b>3. 架构设计：</b>技术选型、模块划分、接口设计
        </BookParagraph>
        <BookParagraph>
          <b>4. 详细设计：</b>类设计、数据库设计、API设计
        </BookParagraph>
        <BookParagraph>
          <b>5. 编码实现：</b>遵循设计文档编码、持续重构
        </BookParagraph>
        <BookParagraph>
          <b>6. 测试验证：</b>单元测试、集成测试、性能测试
        </BookParagraph>
        <TagGrid items={['案例', '电商', '教育', '企业应用', '实践']} />
      </div>
    ),
  },
  {
    label: '案例实践',
    left: (
      <div className="space-y-4">
        <PageTitle>电商系统建模</PageTitle>
        <BookParagraph>
          以电商系统的订单模块为例，展示从领域模型到代码实现的完整过程。
        </BookParagraph>
        <BookCode language="typescript" code={`// 电商订单领域模型
// 聚合根：Order
class Order {
  private id: OrderId
  private customerId: CustomerId
  private items: OrderItem[]
  private total: Money
  private status: OrderStatus
  private createdAt: Date

  constructor(customerId: CustomerId) {
    this.id = OrderId.generate()
    this.customerId = customerId
    this.items = []
    this.total = Money.zero()
    this.status = OrderStatus.Pending
    this.createdAt = new Date()
  }

  addItem(product: Product, quantity: number): void {
    if (this.status !== OrderStatus.Pending) {
      throw new Error('只能修改待支付订单')
    }
    const item = new OrderItem(product, quantity)
    this.items.push(item)
    this.total = this.total.add(item.getSubtotal())
  }

  submit(): void {
    if (this.items.length === 0) {
      throw new Error('订单不能为空')
    }
    this.status = OrderStatus.Submitted
  }
}`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>在线教育平台设计</SectionTitle>
        <BookParagraph>
          在线教育平台需要支持课程管理、学生学习进度跟踪、互动问答等核心功能。
        </BookParagraph>
        <BookCode language="typescript" code={`// 课程与学习进度模型
class Course {
  constructor(
    public id: CourseId,
    public title: string,
    public instructorId: InstructorId,
    public chapters: Chapter[],
    public price: Money
  ) {}
}

class Chapter {
  constructor(
    public id: ChapterId,
    public title: string,
    public lessons: Lesson[],
    public order: number
  ) {}
}

class Enrollment {
  private progress: Map<LessonId, Progress> = new Map()

  constructor(
    public studentId: StudentId,
    public courseId: CourseId,
    public enrolledAt: Date
  ) {}

  completeLesson(lessonId: LessonId): void {
    this.progress.set(lessonId, { completed: true, completedAt: new Date() })
  }

  getCompletionRate(): number {
    if (this.progress.size === 0) return 0
    const completed = Array.from(this.progress.values())
      .filter(p => p.completed).length
    return completed / this.progress.size
  }
}`} />
        <TagGrid items={['电商', '教育', '领域模型', '聚合', '值对象']} />
      </div>
    ),
  },
  {
    label: '代码实践',
    left: (
      <div className="space-y-4">
        <PageTitle>企业管理系统设计</PageTitle>
        <BookParagraph>
          企业管理系统涉及组织架构、权限管理、审批流程等复杂业务逻辑。
          以下展示基于领域驱动设计的实现。
        </BookParagraph>
        <BookCode language="typescript" code={`// 审批流程模型
class ApprovalFlow {
  private steps: ApprovalStep[]
  private currentStepIndex: number = 0

  constructor(
    public id: FlowId,
    public type: ApprovalType,
    steps: ApprovalStep[]
  ) {
    this.steps = steps
  }

  getCurrentStep(): ApprovalStep | null {
    return this.steps[this.currentStepIndex] ?? null
  }

  approve(approverId: EmployeeId, comment: string): void {
    const step = this.getCurrentStep()
    if (!step || step.approverId !== approverId) {
      throw new Error('当前审批人不是您')
    }
    step.approve(comment)
    if (this.currentStepIndex < this.steps.length - 1) {
      this.currentStepIndex++
    }
  }

  reject(approverId: EmployeeId, reason: string): void {
    const step = this.getCurrentStep()
    if (step && step.approverId === approverId) {
      step.reject(reason)
    }
  }
}`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>项目目录结构</SectionTitle>
        <BookParagraph>一个典型DDD项目的目录组织方式：</BookParagraph>
        <BookCode language="bash" code={`src/
├── domain/          # 领域层
│   ├── order/
│   │   ├── Order.ts
│   │   ├── OrderItem.ts
│   │   ├── OrderStatus.ts
│   │   └── OrderRepository.ts
│   └── shared/
│       ├── Entity.ts
│       ├── ValueObject.ts
│       └── AggregateRoot.ts
├── application/    # 应用层
│   ├── OrderService.ts
│   └── OrderAssembler.ts
├── infrastructure/ # 基础设施层
│   ├── persistence/
│   └── messaging/
├── interfaces/     # 接口层
│   ├── rest/
│   └── grpc/
└── main.ts`} />
        <TagGrid items={['企业应用', '审批', 'DDD', '目录结构', '项目实践']} />
      </div>
    ),
  },
]

export default function PracticalCasesPage() { return <LessonLayout meta={META} spreads={SPREADS} /> }
