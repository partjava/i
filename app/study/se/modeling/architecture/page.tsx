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
          良好的架构是系统可维护性、可扩展性和可靠性的基础。架构图上的每条连线都意味着调用成本、失败传播与协作约定；因此设计不仅要说明组件名称，还要说明哪些规则必须原子完成、哪些结果允许延迟到达。例如选课系统的名额不能超卖，但通知邮件晚到几秒可以接受，两者应有不同的一致性边界。
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
        <BookCode language="typescript" code={`// 分层架构示例：服务端框架宿主片段，Request/Response 指框架类型
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
          '故障隔离：配合超时、限流和降级，限制故障传播范围',
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
      (sum, item) => sum.add(item.price.multiply(item.quantity)), Money.zero()
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
        <BookParagraph>端口定义后，适配器负责具体技术实现。以下是服务端 TypeScript 结构片段：Pool、Money 与领域类型需由宿主提供；订单明细需另表持久化，当前查询仅示意映射。支付端口用内存适配器演示，真实接入必须依据支付方当前文档实现签名、幂等和结果核对。</BookParagraph>
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

// 内存支付适配器，仅用于本地测试
class FakePaymentGateway implements PaymentGateway {
  async charge(amount: Money, token: string): Promise<PaymentResult> {
    if (!token) throw new Error('缺少测试凭证')
    return new PaymentResult('fake-payment', 'success')
  }
}`} />
        <TagGrid items={['六边形', '端口适配器', 'DDD', '领域', '抽象']} />
      </div>
    ),
  },
  {
    label: '质量场景与边界',
    left: (<div className="space-y-4">
      <PageTitle>把“高性能”写成可讨论的场景</PageTitle>
      <BookParagraph>校园选课的负载集中在开放后几分钟，平时几乎空闲。先声明假设：同时有两千名学生提交、名额查询允许短暂陈旧、扣名额必须准确。再约定测量窗口、百分位响应时间和失败率。只有“高并发”四个字，无法判断缓存、队列或扩容是否解决了真正问题。峰值和目标数字是本项目的实验输入，不是通用标准。</BookParagraph>
      <BookParagraph>按业务不变量划边界：选课记录与剩余名额需要一起提交，所以先放入同一事务；课程介绍和教师头像可独立读取。若把名额和选课过早拆成两个服务，原本一次事务就能保证的约束变成跨服务协议。小团队可先使用模块化单体，以包与接口限制依赖，待独立扩容或发布需求出现再拆服务。</BookParagraph>
      <SectionTitle>三类决定分别留下证据</SectionTitle>
      <BookParagraph>逻辑视图说明模块责任，运行视图说明调用，部署视图说明进程和存储位置。一个逻辑模块可以与其他模块同进程部署，独立文件夹并不代表独立故障域。</BookParagraph>
    </div>),
    right: (<div className="space-y-4">
      <SectionTitle>比较方案，而不是列技术名词</SectionTitle>
      <div className="overflow-x-auto"><table className="w-full text-sm border-collapse"><caption>选课写路径的设计权衡</caption><thead><tr><th>方案</th><th>收益</th><th>付出的成本</th></tr></thead><tbody><tr><td>同库事务</td><td>名额与记录原子提交</td><td>热点行竞争，需测锁等待</td></tr><tr><td>异步排队</td><td>平滑写入峰值</td><td>用户先得到受理，最终结果稍后查询</td></tr><tr><td>服务拆分</td><td>独立部署与扩容</td><td>网络故障、协议版本和分布式一致性</td></tr></tbody></table></div>
      <BookParagraph>队列只能改变到达速率，不能凭空提高数据库处理能力。若每秒只能处理五百次、每秒进入一千次，积压会持续增长；必须同时限制入口、展示排队状态并估算清空时间。用户超时后重试还会放大流量，因此提交请求需要业务幂等键和结果查询入口。</BookParagraph>
      <BookParagraph>决策记录写明背景、备选、代价与重新评估条件。先保留单体是因为团队小且共享事务重要；通知处理拖慢提交时再评估拆分。</BookParagraph>
    </div>),
  },
  {
    label: '事件与失败传播',
    left: (<div className="space-y-4">
      <PageTitle>订单保存了，通知却丢了</PageTitle>
      <BookParagraph>直接执行“提交订单事务，然后发送消息”，会出现进程在两步之间退出的窗口。先发消息再提交也不安全：消费者可能看到后来回滚的订单。将待发送事件与订单写入同一数据库事务，后台发布器读取事件并发送，成功后记录进度，这就是事务发件箱思路；它解决本地状态与发送意图同时落盘的问题。</BookParagraph>
      <BookParagraph>发布器可能在消息发送成功、标记完成之前退出，于是重启后再次发送。消费者必须把事件编号的去重记录与业务更新放入自己的事务。传输重试可以重复，业务效果应按约定只发生一次。去重记录的保存期限还要覆盖最大重放窗口，否则很老的事件仍可能重复生效。</BookParagraph>
      <SectionTitle>状态必须让失败可见</SectionTitle>
      <BookParagraph>支付请求超时不等于支付失败，因为对方可能已经扣款。订单应进入待核对状态，由查询或对账收敛，而不能立即重复扣款。状态机至少区分待支付、支付处理中、已支付和已取消；“未知结果”是分布式系统中需要建模的业务事实。</BookParagraph>
    </div>),
    right: (<div className="space-y-4">
      <SectionTitle>超时预算沿调用链分配</SectionTitle>
      <BookParagraph>如果页面总预算是一秒，订单服务不能给库存、支付、推荐各设置一秒并串行等待。应把预算分给关键步骤，推荐失败可省略，库存结果未知则不能承诺成功。重试只适合可安全重复的操作，并要限制次数、加入退避；多层同时重试会使一次入口请求扩张成大量下游调用。</BookParagraph>
      <BookParagraph>通知失败不回滚已完成的选课，消费者独立重试并暴露积压指标。如果送达本身是必要条件，则必须重新定义成功状态。</BookParagraph>
      <BookParagraph>验证时注入三个断点：事务提交前退出，数据库应没有订单与事件；提交后发布前退出，重启应补发；发布后确认前退出，重放应不重复发送业务权益。测试这些窗口，比仅验证正常接口返回更能说明架构是否兑现可靠性目标。</BookParagraph>
    </div>),
  },
  {
    label: '依赖方向与验证',
    left: (<div className="space-y-4">
      <PageTitle>端口让业务规则独立运行</PageTitle>
      <BookParagraph>依赖倒置改变的是源码依赖方向：应用用例依赖自己定义的仓储端口，数据库适配器实现端口。运行时依然会调用数据库，但编译业务规则不必知道数据库驱动。端口应表达业务需要，如“按版本保存选课”，而不是暴露任意SQL执行器，否则技术细节仍穿透边界。</BookParagraph>
      <BookParagraph>内存仓储让规则测试快速，但不能证明真实数据库的隔离级别、唯一约束或映射正确。应用层测试检查名额不足时不保存；适配器契约测试检查同一编号重复保存如何处理；并发集成测试让两个事务争夺最后一个名额，确认只有一个成功。三者分别回答不同问题。</BookParagraph>
      <SectionTitle>注册示例里的竞争条件</SectionTitle>
      <BookParagraph>先查邮箱不存在再插入，只在顺序执行时可靠。两个请求可能同时通过检查，因此数据库必须有邮箱唯一约束，服务捕获冲突并转换为业务错误。前置查询改善提示，最终约束才保护一致性；这也是从交互时序反推持久化设计的例子。</BookParagraph>
    </div>),
    right: (<div className="space-y-4">
      <SectionTitle>把评估变成一次小实验</SectionTitle>
      <BookParagraph>缓存课程简介后比较命中率、数据库读量和尾延迟，记录更新传播时间。命中率高但尾延迟不变，瓶颈可能在认证或锁等待；应沿请求路径选择观测点。</BookParagraph>
      <BookParagraph>评审沿场景走查：请求重复如何识别，数据库不可用如何反馈，消息重复如何去重，事件新增字段如何兼容。回答应能定位到状态、接口或测试。</BookParagraph>
      <BookParagraph>练习：加入毕业资格查询。强前置条件不可用时如何反馈？允许稍后复核时，画出待复核到成功或拒绝的转移，解释何时占用与释放名额，以及学生看到的中间状态。</BookParagraph>
    </div>),
  },
]

export default function ArchitectureDesignPage() { return <LessonLayout meta={META} spreads={SPREADS} /> }
