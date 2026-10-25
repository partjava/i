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
          展示从业务叙述到模型、交互和验证的推导过程。三个案例分别强调交易一致性、进度统计与审批权限，不能只把实体类换名后复用。阅读时先列出业务不变量，再比较代码是否真正维护它；目录完整与类名齐全并不意味着规则已经实现。
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
          以下是服务端 TypeScript 领域片段，OrderId、Money、状态枚举和 OrderItem 由宿主补齐。商品加入订单时应复制名称与成交单价，而非持续读取可变的商品价格；数量必须为正整数。片段展示订单聚合，库存预留和支付事务在应用服务中协调。
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
          下例是 TypeScript 领域片段，课程与进度标识类型由宿主提供。进度分母是学习计划要求的课时总数，而非已有进度记录数；必修课时集合应在报名时复制成课程版本快照，防止课程更新悄悄改变完成率。空计划此处约定为0。
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
    public enrolledAt: Date,
    public requiredLessonIds: Set<LessonId>
  ) {}

  completeLesson(lessonId: LessonId): void {
    if (!this.requiredLessonIds.has(lessonId)) throw new Error('课时不在学习计划内')
    this.progress.set(lessonId, { completed: true, completedAt: new Date() })
  }

  getCompletionRate(): number {
    if (this.requiredLessonIds.size === 0) return 0
    const completed = Array.from(this.progress.values())
      .filter(p => p.completed).length
    return completed / this.requiredLessonIds.size
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
          以下是服务端 TypeScript 结构片段，步骤与身份类型由宿主补齐。流程需要显式终态，防止最后一步审批后仍保留可重复操作的当前步骤。
        </BookParagraph>
        <BookCode language="typescript" code={`// 审批流程模型
class ApprovalFlow {
  private steps: ApprovalStep[]
  private currentStepIndex: number = 0
  private status: 'pending' | 'approved' | 'rejected' = 'pending'

  constructor(
    public id: FlowId,
    public type: ApprovalType,
    steps: ApprovalStep[]
  ) {
    if (steps.length === 0) throw new Error('审批步骤不能为空')
    this.steps = steps
  }

  getCurrentStep(): ApprovalStep | null {
    return this.status === 'pending' ? (this.steps[this.currentStepIndex] ?? null) : null
  }

  approve(approverId: EmployeeId, comment: string): void {
    const step = this.getCurrentStep()
    if (!step || step.approverId !== approverId) {
      throw new Error('当前审批人不是您')
    }
    step.approve(comment)
    if (this.currentStepIndex < this.steps.length - 1) {
      this.currentStepIndex++
    } else {
      this.status = 'approved'
    }
  }

  reject(approverId: EmployeeId, reason: string): void {
    const step = this.getCurrentStep()
    if (!step || step.approverId !== approverId) throw new Error('无审批权限')
    step.reject(reason)
    this.status = 'rejected'
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
  {
    label: '电商交易推导',
    left: (<div className="space-y-4">
      <PageTitle>下单的成功到底意味着什么</PageTitle>
      <BookParagraph>需求写“用户购买两件商品”还不够。先约定创建订单只意味着报价与库存预留成功，支付成功才授予履约资格；购物车里的价格只是展示，结算价格由服务端确定。订单项保存商品编号、成交单价与数量的快照，未来商品改价不能改变历史订单总额，商品下架也不能让发票失去依据。</BookParagraph>
      <BookParagraph>建立客户到订单的一对多、订单到订单项的组合关系、订单项到商品的引用。订单是聚合根，负责禁止空订单提交、支付后改价和非法数量；库存有自己的并发规则，不应因为订单持有商品对象就允许任意修改库存字段。关系图决定协作入口，业务约束决定哪些修改必须走同一入口。</BookParagraph>
      <SectionTitle>按失败窗口拆交互</SectionTitle>
      <BookParagraph>应用服务先获取报价、原子预留库存、保存待支付订单，再返回支付指引。若预留成功后订单保存失败，需释放预留或由到期任务回收；若支付结果未知，保持处理中并核对，不直接再次扣款。每个补偿动作都要可重复，避免恢复任务把库存多加一次。</BookParagraph>
    </div>),
    right: (<div className="space-y-4">
      <div className="overflow-x-auto"><table className="w-full text-sm border-collapse"><caption>订单事实、状态与测试证据</caption><thead><tr><th>业务事实</th><th>模型决策</th><th>验证例子</th></tr></thead><tbody><tr><td>历史金额稳定</td><td>保存单价快照</td><td>商品涨价后订单仍为原价</td></tr><tr><td>最后库存只卖一次</td><td>原子预留及版本检查</td><td>两请求争夺最后一件</td></tr><tr><td>支付回调可重复</td><td>按支付编号去重</td><td>重复回调不重复授予权益</td></tr></tbody></table></div>
      <BookParagraph>两件单价一千九百分商品，订单金额三千八百分；商品随后改为两千一百分，订单仍是三千八百分。这一结果反向证明订单项需要价格快照。若代码只引用 Product.price，正常下单测试可能通过，改价后的历史查询就会暴露建模错误。</BookParagraph>
      <BookParagraph>不要把所有规则塞进 Order：地址格式、支付渠道通信和发票税务分别属于不同责任。订单只保存履约需要的地址快照；外部调用在应用层协调。这样领域测试不需要启动网络服务，跨边界失败由集成测试检查。</BookParagraph>
    </div>),
  },
  {
    label: '课程进度推导',
    left: (<div className="space-y-4">
      <PageTitle>完成一节不能等于完成课程</PageTitle>
      <BookParagraph>课程有四节必修课，学生完成其中一节，完成率应是四分之一。若用已有进度记录数作分母，一条完成记录就得到百分之百。模型应分开课程计划与学习事实：计划规定要学哪些课，进度记录描述已经发生什么。缺少记录意味着未完成，不意味着不存在这一节课。</BookParagraph>
      <BookParagraph>报名关联学生与课程版本，课时完成事件关联报名和课时。事件重复上报应覆盖同一完成事实，不能累计两次；报告未知课时应拒绝，否则学生可能用其他课程的编号提高完成率。课程增课时采用新版本还是要求老学员补学，是业务决定，应在报名快照或迁移规则中表达。</BookParagraph>
      <SectionTitle>时间顺序也要设计</SectionTitle>
      <BookParagraph>手机离线学习后上传事件，事件发生时间可能早于同步时间。若进度只需要是否完成，可以按集合合并；若需要最近观看位置，则要决定按序号、发生时间还是服务器接收时间解决乱序，不能简单以最后到达覆盖最准确的进度。</BookParagraph>
    </div>),
    right: (<div className="space-y-4">
      <SectionTitle>可运行的进度模型</SectionTitle>
      <BookParagraph>以下 JavaScript 可用 Node 独立运行，展示去重与分母语义；仅处理完成集合，不模拟数据库、多端冲突或视频有效观看时长。</BookParagraph>
      <BookCode language="javascript" code={`const required = new Set(['L1', 'L2', 'L3', 'L4'])
const completed = new Set()
function complete(id) {
  if (!required.has(id)) throw Error('未知课时')
  completed.add(id)
}
const rate = () => required.size ? completed.size / required.size : 0
complete('L1')
complete('L1')
if (rate() !== 0.25) throw Error('重复事件破坏进度')
complete('L2')
if (rate() !== 0.5) throw Error('分母错误')`} />
      <BookParagraph>执行两次 L1 后仍只有一个集合元素，因此完成率保持四分之一。这个小模型可以先验证规则，再决定持久化为唯一键“报名编号、课时编号”的记录。真实集成测试还要验证并发重复插入以及课程版本切换，不应将内存 Set 的结果当作数据库正确性的证明。</BookParagraph>
      <BookParagraph>空课程返回零是本示例约定；证书发放可以要求至少一节必修课且全部完成。将“完成率为一”直接作为发证条件，可能忽视考试、缴费或身份核验等独立要求。</BookParagraph>
    </div>),
  },
  {
    label: '审批与项目交付',
    left: (<div className="space-y-4">
      <PageTitle>审批流必须有终态与权限来源</PageTitle>
      <BookParagraph>报销先由主管审核，大额再由财务审核。提交时根据金额规则生成步骤快照，避免审核途中配置修改导致当前审批人无故改变。流程状态可为待审批、已通过、已拒绝、已撤回；每个步骤有独立的处理事实与意见，最终通过后不能继续停留在最后一个可审批步骤。</BookParagraph>
      <BookParagraph>顺序为身份服务确定操作者、用例加载流程、流程校验当前步骤、记录决定、事务保存与发布通知。前端传来的 approverId 不能直接作为可信身份。并发审批时使用版本条件保存，避免主管双击或两名代理人同时操作导致跳过财务步骤；冲突后重新读取当前状态。</BookParagraph>
      <SectionTitle>拒绝与退回不能混为一谈</SectionTitle>
      <BookParagraph>拒绝可定义为终止流程，退回补材料则可能回到申请人并再次提交。后者必须说明重审从哪一步开始、已有意见是否仍有效。若只在步骤上写 rejected 却让流程继续前进，界面和业务会给出矛盾结果，因此状态表要先于界面按钮确定。</BookParagraph>
    </div>),
    right: (<div className="space-y-4">
      <SectionTitle>让目录承担明确责任</SectionTitle>
      <BookParagraph>domain 保存不依赖网络的规则与状态，application 编排一次业务操作，infrastructure 实现数据库和消息适配器，interfaces 转换请求与响应。依赖方向通过导入检查和测试维护，文件夹名称本身不会阻止领域代码直接访问数据库，也不能证明设计已经分层。</BookParagraph>
      <BookParagraph>项目练习采用一个完整纵向切片：先实现提交报销到主管处理，再加入大额财务分支，最后增加撤回和并发冲突。每次保留术语、状态表、关键交互、数据约束与测试结果，使新规则出现时能指出受影响的位置，而不是重新绘制所有图。</BookParagraph>
      <BookParagraph>评审时给出三个反例：其他人冒充审批、终态重复审批、旧版本覆盖新决定。参考结果应分别落到服务端身份校验、领域转移守卫和数据库版本约束。图、代码与测试共同解释规则怎样成立，才算完成了从需求到实现的推导。</BookParagraph>
    </div>),
  },
]

export default function PracticalCasesPage() { return <LessonLayout meta={META} spreads={SPREADS} /> }
