'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import {
  PageTitle, SectionTitle, BookParagraph, BookCode, BookList, TagGrid,
} from '@shared/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '软件工程',
  chapterTitle: '架构设计',
  chapterNumber: 4,
  totalChapters: 7,
  subjectHref: '/study/se/modeling',
  prevChapter: { label: '设计模式', href: '/study/se/modeling/patterns' },
  nextChapter: { label: '实战案例与项目', href: '/study/se/modeling/cases' },
  theme: THEMES.software,
}

const SPREADS = [
  {
    label: '理论知识',
    left: (
      <div className="space-y-4">
        <PageTitle>什么是软件架构？</PageTitle>
        <BookParagraph>
          软件架构是软件系统的顶层设计，包括系统的组织结构、组件划分、交互方式以及约束规则。
          良好的架构是系统可维护性、可扩展性和可靠性的基础。
        </BookParagraph>
        <SectionTitle>架构的核心关注点</SectionTitle>
        <BookList items={[
          '性能：响应时间、吞吐量、资源利用率',
          '可扩展性：水平扩展与垂直扩展能力',
          '可用性：系统正常运行时间与容错能力',
          '安全性：数据保护、访问控制、防攻击',
          '可维护性：代码可读性、模块化程度、测试覆盖',
          '成本：开发成本、运维成本、基础设施成本',
        ]} />
        <SectionTitle>常见架构风格</SectionTitle>
        <BookList items={[
          '分层架构：表现层、业务层、持久层、数据层',
          '微服务架构：独立部署、去中心化、技术异构',
          '事件驱动架构：异步通信、松耦合、可扩展',
          '六边形架构：领域为核心，适配器驱动边界',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>架构设计过程</SectionTitle>
        <BookParagraph>
          <b>1. 架构需求分析：</b>识别功能性需求和质量属性（性能、安全、可用性等）
        </BookParagraph>
        <BookParagraph>
          <b>2. 架构决策：</b>选择架构风格、技术栈、部署策略
        </BookParagraph>
        <BookParagraph>
          <b>3. 架构设计：</b>定义模块划分、接口设计、数据流设计
        </BookParagraph>
        <BookParagraph>
          <b>4. 架构评估：</b>使用ATAM等方法评估架构对质量属性的满足程度
        </BookParagraph>
        <BookParagraph>
          <b>5. 架构文档：</b>使用4+1视图模型记录架构设计
        </BookParagraph>
        <TagGrid items={['分层', '微服务', '事件驱动', '六边形', 'ATAM']} />
      </div>
    ),
  },
  {
    label: '架构模式',
    left: (
      <div className="space-y-4">
        <PageTitle>分层架构详解</PageTitle>
        <BookParagraph>
          分层架构是最经典的架构模式，将系统按职责分为若干层，上层依赖下层。
          每层只关注自己的职责，通过接口与上下层通信。
        </BookParagraph>
        <BookCode language="typescript" code={`// 分层架构示例
// Controller层 - 处理HTTP请求
class UserController {
  constructor(private userService: UserService) {}

  async createUser(req: Request, res: Response) {
    const dto = req.body as CreateUserDto
    const user = await this.userService.createUser(dto)
    res.status(201).json(user)
  }
}

// Service层 - 业务逻辑
class UserService {
  constructor(private userRepo: UserRepository) {}

  async createUser(dto: CreateUserDto): Promise<User> {
    if (!isValidEmail(dto.email)) {
      throw new Error('邮箱格式不正确')
    }
    const existing = await this.userRepo.findByEmail(dto.email)
    if (existing) throw new Error('邮箱已被注册')
    return this.userRepo.save(User.create(dto))
  }
}`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>微服务架构</SectionTitle>
        <BookParagraph>
          微服务架构将应用拆分为多个小型、独立的服务，每个服务围绕特定业务能力构建，
          可独立开发、部署和扩展。
        </BookParagraph>
        <BookParagraph>
          <b>核心特点：</b>
        </BookParagraph>
        <BookList items={[
          '单一职责：每个服务专注于一个业务能力',
          '独立部署：服务之间独立发布和升级',
          '去中心化：每个服务可选择最适合的技术栈',
          '故障隔离：单个服务故障不影响整体系统',
          '数据自治：每个服务拥有专属数据存储',
        ]} />
        <BookParagraph>
          <b>挑战：</b>分布式事务、服务发现、链路追踪、数据一致性
        </BookParagraph>
        <TagGrid items={['分层', '微服务', '分布式', '高可用', '扩展']} />
      </div>
    ),
  },
  {
    label: '代码实践',
    left: (
      <div className="space-y-4">
        <PageTitle>六边形架构（端口-适配器）</PageTitle>
        <BookParagraph>
          六边形架构以业务领域为核心，通过端口定义边界，适配器处理外部通信。
          支持灵活替换技术实现，便于测试和维护。
        </BookParagraph>
        <BookCode language="typescript" code={`// 六边形架构示例
// 领域层 —— 核心业务
class Order {
  constructor(
    public id: string,
    public items: OrderItem[],
    public status: OrderStatus
  ) {}

  calculateTotal(): Money {
    return this.items.reduce(
      (sum, item) => sum.add(item.price), Money.zero()
    )
  }
}

// 端口（接口）
interface OrderRepository {
  save(order: Order): Promise<void>
  findById(id: string): Promise<Order | null>
}

interface PaymentGateway {
  charge(amount: Money, token: string): Promise<PaymentResult>
}`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>适配器实现</SectionTitle>
        <BookParagraph>端口定义后，适配器负责具体技术实现。</BookParagraph>
        <BookCode language="typescript" code={`// 适配器层 —— 技术实现

// 数据库适配器
class PostgresOrderRepo implements OrderRepository {
  constructor(private db: Pool) {}

  async save(order: Order): Promise<void> {
    const query = 'INSERT INTO orders (id, status) VALUES ($1, $2)'
    await this.db.query(query, [order.id, order.status])
  }

  async findById(id: string): Promise<Order | null> {
    const result = await this.db.query(
      'SELECT * FROM orders WHERE id = $1', [id]
    )
    return result.rows[0] ? this.toDomain(result.rows[0]) : null
  }

  private toDomain(row: any): Order {
    return new Order(row.id, row.items, row.status)
  }
}

// 支付适配器
class StripePaymentGateway implements PaymentGateway {
  async charge(amount: Money, token: string): Promise<PaymentResult> {
    const charge = await Stripe.charges.create({
      amount: amount.toCents(),
      currency: 'cny',
      source: token,
    })
    return new PaymentResult(charge.id, 'success')
  }
}`} />
        <TagGrid items={['六边形', '端口适配器', 'DDD', '领域', '抽象']} />
      </div>
    ),
  },
]

export default function ArchitectureDesignPage() { return <LessonLayout meta={META} spreads={SPREADS} /> }
