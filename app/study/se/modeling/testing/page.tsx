'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import {
  PageTitle, SectionTitle, BookParagraph, BookCode, BookList, TagGrid,
} from '@shared/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '软件工程',
  chapterTitle: '软件测试',
  chapterNumber: 6,
  totalChapters: 7,
  subjectHref: '/study/se/modeling',
  prevChapter: { label: '实战案例与项目', href: '/study/se/modeling/cases' },
  nextChapter: { label: '软件维护', href: '/study/se/modeling/maintenance' },
  theme: THEMES.software,
}

const SPREADS = [
  {
    label: '理论知识',
    left: (
      <div className="space-y-4">
        <PageTitle>软件测试概述</PageTitle>
        <BookParagraph>
          软件测试是软件质量保证的关键手段，通过在真实或模拟环境下执行程序来发现缺陷。
          测试贯穿整个软件生命周期，提供关于风险的证据。一次通过只说明选定输入和环境未发现预期之外的结果，不能证明所有情况下都正确。测试设计要从规则、边界与失败后果出发：金额计算适合快速单元测试，数据库约束和并发冲突则必须在真实集成边界检查。
        </BookParagraph>
        <SectionTitle>测试金字塔</SectionTitle>
        <BookParagraph>
          测试金字塔建议用较多快速、稳定的低层测试支撑少量关键端到端流程。它不是固定数量配额，实际组合取决于架构与风险：
        </BookParagraph>
        <BookList items={[
          '单元测试：测试单个函数或类，运行速度快',
          '集成测试：测试模块间交互，验证接口正确性',
          '端到端测试：测试完整业务流程，覆盖用户场景',
        ]} />
        <SectionTitle>测试策略</SectionTitle>
        <BookList items={[
          '黑盒测试：基于需求和规格，不关注内部实现',
          '白盒测试：基于代码结构，覆盖执行路径',
          '灰盒测试：结合黑盒和白盒，关注关键路径',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>测试分类</SectionTitle>
        <BookParagraph>
          <b>按阶段分类：</b>
        </BookParagraph>
        <BookList items={[
          '单元测试 → 集成测试 → 系统测试 → 验收测试',
        ]} />
        <BookParagraph>
          <b>按测试目标分类：</b>
        </BookParagraph>
        <BookList items={[
          '功能测试：验证功能是否符合需求',
          '性能测试：评估系统响应时间和吞吐量',
          '安全测试：发现安全漏洞和风险',
          '可用性测试：评估用户体验是否良好',
          '兼容性测试：验证多平台兼容性',
        ]} />
        <BookParagraph>
          <b>按执行方式分类：</b>
        </BookParagraph>
        <BookList items={[
          '手工测试：人工执行测试用例',
          '自动化测试：脚本执行，自动对比结果',
        ]} />
        <TagGrid items={['单元测试', '集成测试', 'E2E', '黑盒', '白盒']} />
      </div>
    ),
  },
  {
    label: '测试方法',
    left: (
      <div className="space-y-4">
        <PageTitle>单元测试实践</PageTitle>
        <BookParagraph>
          单元测试是测试金字塔的基础，保证每个代码单元的独立正确性。
        </BookParagraph>
        <BookCode language="typescript" code={`// Jest宿主中的结构片段：Money、领域模型与测试夹具需补齐
// 使用 Jest 进行单元测试
// order.service.ts
class OrderService {
  constructor(
    private orderRepo: OrderRepository,
    private discountService: DiscountService
  ) {}

  calculateTotal(orderId: string): Money {
    const order = this.orderRepo.findById(orderId)
    if (!order) throw new Error('订单不存在')

    const subtotal = order.items.reduce(
      (sum, item) => sum.add(item.price.multiply(item.quantity)),
      Money.zero()
    )

    const discount = this.discountService
      .calculateDiscount(order)
    return subtotal.subtract(discount)
  }
}

// order.service.spec.ts
describe('OrderService', () => {
  it('应正确计算订单总额', () => {
    const order = createMockOrder([
      { price: 100, quantity: 2 },
      { price: 50, quantity: 1 },
    ])
    const service = new OrderService(mockRepo, mockDiscount)
    const total = service.calculateTotal(order.id)
    expect(total.toNumber()).toBe(250)
  })
})`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>集成测试</SectionTitle>
        <BookParagraph>
          集成测试验证不同模块之间的协作是否正常，尤其是数据库、消息队列等外部依赖的交互。以下为 Jest 与 PostgreSQL 宿主片段，需导入 Pool、实现仓储并设置专用测试库；TRUNCATE 只允许在隔离测试库执行，并行运行需按测试分配独立 schema 或数据集。
        </BookParagraph>
        <BookCode language="typescript" code={`// 集成测试：数据库交互
describe('OrderRepository 集成测试', () => {
  let repo: OrderRepository
  let pool: Pool

  beforeAll(async () => {
    pool = new Pool({ connectionString: TEST_DB_URL })
    await pool.query('TRUNCATE orders CASCADE')
    repo = new PostgresOrderRepo(pool)
  })

  it('应能保存并查询订单', async () => {
    const order = new Order('123', 'cust-1', [
      new OrderItem('prod-1', 2, new Money(100))
    ], new Money(200))

    await repo.save(order)

    const found = await repo.findById('123')
    expect(found).not.toBeNull()
    expect(found!.total.toNumber()).toBe(200)
  })

  afterAll(async () => {
    await pool.end()
  })
})`} />
        <TagGrid items={['Jest', '单元测试', '集成测试', 'Mock', '断言']} />
      </div>
    ),
  },
  {
    label: '代码实践',
    left: (
      <div className="space-y-4">
        <PageTitle>TDD 测试驱动开发</PageTitle>
        <BookParagraph>
          TDD遵循“红—绿—重构”循环，先写测试，再写实现代码，最后重构优化。
        </BookParagraph>
        <BookCode language="typescript" code={`// 第1步：编写失败的测试（红）
describe('ShoppingCart', () => {
  it('空购物车总额为0', () => {
    const cart = new ShoppingCart()
    expect(cart.getTotal().toNumber()).toBe(0)
  })

  it('添加商品后总额正确', () => {
    const cart = new ShoppingCart()
    cart.addItem(new Product('P1', '商品A', new Money(100)), 2)
    expect(cart.getTotal().toNumber()).toBe(200)
  })
})

// 第2步：编写最小实现（绿）
class ShoppingCart {
  private items: CartItem[] = []

  addItem(product: Product, quantity: number): void {
    this.items.push(new CartItem(product, quantity))
  }

  getTotal(): Money {
    return this.items.reduce(
      (sum, item) => sum.add(item.product.price.multiply(item.quantity)),
      Money.zero()
    )
  }
}`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>性能测试示例</SectionTitle>
        <BookParagraph>以下脚本由 k6 运行，不能直接用 Node 执行。目标应是自有隔离测试服务；固定虚拟用户数量与 sleep 会共同限制请求到达率，不能将50个虚拟用户直接解释为每秒50个请求。</BookParagraph>
        <BookCode language="javascript" code={`// k6 性能测试脚本
import http from 'k6/http'
import { check, sleep } from 'k6'

export const options = {
  stages: [
    { duration: '30s', target: 50 },   // 逐步上升到50个虚拟用户
    { duration: '1m', target: 50 },     // 保持50个虚拟用户1分钟
    { duration: '30s', target: 0 },     // 逐步降为0
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'],   // 95%请求在500ms内
    http_req_failed: ['rate<0.01'],     // 失败率低于1%
  },
}

export default function () {
  const res = http.get('http://localhost:3000/api/orders')
  check(res, { '状态码200': (r) => r.status === 200 })
  sleep(1)
}`} />
        <TagGrid items={['TDD', '测试驱动', 'k6', '性能测试', '自动化']} />
      </div>
    ),
  },
  {
    label: '从规则推导用例',
    left: (<div className="space-y-4">
      <PageTitle>测试输入不是随意挑几个数</PageTitle>
      <BookParagraph>优惠规则为“商品金额满一万元分减一千分，运费另计，不参与门槛”。先把输入划成未达门槛、恰好门槛、超过门槛三个有效等价类，再加入负数、非整数等无效类。门槛附近的九千九百九十九、一万、一万零一，比三个都远高于门槛的随机数字更容易发现比较符号错误。</BookParagraph>
      <BookParagraph>假设商品九千五百分、运费八百分，合计虽超过一万，仍不能优惠。这个反例专门区分“商品金额”与“应付总额”。期望结果必须来自规则手算，不能在测试中复制实现公式，否则同一个错误会同时出现在被测代码和断言里。</BookParagraph>
      <SectionTitle>决策表处理条件组合</SectionTitle>
      <BookParagraph>优惠券还可能要求未过期且未被使用。将三个条件组合，明确有效期端点是否包含、时区如何确定。先覆盖每条能改变结果的规则，再考虑组合爆炸时的风险取舍。单独测试每个条件为真，不足以证明多个条件联合判断正确。</BookParagraph>
    </div>),
    right: (<div className="space-y-4">
      <div className="overflow-x-auto"><table className="w-full text-sm border-collapse"><caption>优惠规则的代表性测试</caption><thead><tr><th>商品金额（分）</th><th>券状态</th><th>期望优惠</th><th>目的</th></tr></thead><tbody><tr><td>9999</td><td>有效未用</td><td>0</td><td>门槛下界</td></tr><tr><td>10000</td><td>有效未用</td><td>1000</td><td>恰好达到</td></tr><tr><td>10000</td><td>已过期</td><td>0</td><td>条件组合</td></tr><tr><td>-1</td><td>有效未用</td><td>拒绝输入</td><td>无效等价类</td></tr></tbody></table></div>
      <BookParagraph>分支覆盖率说明代码分支有没有走过，不能说明业务规则都被检查。若断言只检查结果非空，即使优惠金额被写成零也可能通过。可以暂时把大于等于改为大于，观察门槛测试是否失败；这样的变异检查能检验断言是否真正约束关键行为。</BookParagraph>
      <BookParagraph>探索性测试则围绕任务主动寻找未知问题，如优惠券重复点击、页面刷新后余额变化、网络恢复后的提交状态。自动化适合已明确的回归规则，探索有助于发现尚未被写进规则的歧义，两者应互相补充。</BookParagraph>
    </div>),
  },
  {
    label: '状态与协作测试',
    left: (<div className="space-y-4">
      <PageTitle>从状态机生成测试序列</PageTitle>
      <BookParagraph>购物订单允许待支付到已支付、已支付到已发货，不允许已取消再支付。测试不能只分别调用 pay 与 ship，还要构造事件序列：创建、取消、支付应被拒绝；创建、支付、支付应返回已有结果或明确报错；创建、发货应失败且状态不变。失败后的状态与副作用同样需要断言。</BookParagraph>
      <BookParagraph>并发测试让两个请求争夺最后一件库存，使用屏障将它们推进到相同检查位置，再同时提交。期望是一方成功、一方得到库存不足，最终库存为零且订单只有一条有效记录。随意启动两个 Promise 可能没有稳定重叠，偶尔通过不能证明竞争条件已消失。</BookParagraph>
      <SectionTitle>替身选错会制造虚假信心</SectionTitle>
      <BookParagraph>内存仓储通常没有事务隔离、唯一索引和真实延迟，适合业务规则测试，却不能代替数据库集成测试。Mock 应隔离不确定依赖，不宜把每个内部调用都钉死。优先断言返回结果和持久状态，只有调用次数本身属于规则时才断言“恰好一次”。</BookParagraph>
    </div>),
    right: (<div className="space-y-4">
      <SectionTitle>时间与网络失败如何重复制造</SectionTitle>
      <BookParagraph>过期规则通过注入时钟固定当前时间，分别测试到期前一刻、到期瞬间和到期之后。重试逻辑注入可控依赖，依次返回超时、超时、成功，检查最大次数和等待安排；不要在单元测试里真实等待几分钟，也不要依赖当天日期导致测试明天自动失败。</BookParagraph>
      <BookParagraph>订单保存后通知失败的测试要依据契约：同步流程可能返回失败，异步流程应保留待发送任务并允许重试。若只 Mock 通知为成功，就遗漏最关键的失败窗口。可以在保存后模拟进程退出，重启任务读取器，确认任务被补发且业务权益没有重复发放。</BookParagraph>
      <BookParagraph>端到端测试选择用户真正关心的路径，如登录、下单、查看结果，使用稳定的数据标识和有条件等待。避免按固定秒数睡眠猜界面何时完成；失败时保留请求、日志与截图，才能判断是产品回归、测试环境异常还是定位器失效。</BookParagraph>
    </div>),
  },
  {
    label: '可运行断言与诊断',
    left: (<div className="space-y-4">
      <PageTitle>一个完整的边界实验</PageTitle>
      <BookParagraph>以下为独立 JavaScript 示例，用 Node 运行，无测试框架依赖。金额统一使用整数分，优惠只计算商品金额。失败时抛出异常使进程退出，便于脚本检查；生产规则还需定义最大金额与舍入策略。</BookParagraph>
      <BookCode language="javascript" code={`function payable(goods, shipping) {
  if (![goods, shipping].every(x => Number.isSafeInteger(x) && x >= 0)) {
    throw Error('金额无效')
  }
  return goods + shipping - (goods >= 10000 ? 1000 : 0)
}
for (const [g, s, expected] of [
  [9999, 0, 9999], [10000, 0, 9000],
  [10001, 0, 9001], [9500, 800, 10300],
]) {
  if (payable(g, s) !== expected) throw Error('边界测试失败')
}
let rejected = false
try { payable(-1, 0) } catch { rejected = true }
if (!rejected) throw Error('未拒绝负金额')`} />
      <BookParagraph>将实现改为 goods &gt; 10000，第二条用例应失败；改成 goods + shipping 达到门槛，第四条应失败。两个小实验说明测试分别保护门槛端点与计费口径，而不只是“代码运行过”。</BookParagraph>
    </div>),
    right: (<div className="space-y-4">
      <SectionTitle>性能结果必须带实验条件</SectionTitle>
      <BookParagraph>接口测试记录数据量、硬件、缓存状态、请求分布和预热时间。平均响应一百毫秒并不能排除百分之一请求等待数秒，需同时观察尾延迟、错误率与吞吐量。达到阈值后还要检查数据库连接池、CPU和队列积压，否则无法解释容量限制在哪里。</BookParagraph>
      <BookParagraph>负载测试模拟预期流量，压力测试寻找超出容量后的退化方式，耐久测试观察长时间运行的泄漏与积压。短时间通过不证明全天稳定。恢复阶段也要观察队列是否清空、错误是否回落，防止服务在压力撤除后仍无法恢复。</BookParagraph>
      <BookParagraph>持续集成先运行快速规则测试，再运行受影响的集成检查，关键流程在适合的环境执行。偶发失败应隔离定位并保留负责人，不能无限重跑直到变绿。练习为预约系统补一条禁止状态转移、一条并发冲突和一条超时重试测试，并分别说明何种缺陷只有这一层容易发现。</BookParagraph>
    </div>),
  },
]

export default function SoftwareTestingPage() { return <LessonLayout meta={META} spreads={SPREADS} /> }
