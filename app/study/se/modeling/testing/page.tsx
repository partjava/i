'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import {
  PageTitle, SectionTitle, BookParagraph, BookCode, BookList, TagGrid,
} from '@/app/components/ui/book/BookContent'

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
          测试贯穿整个软件生命周期，是保证软件可靠性的重要环节。
        </BookParagraph>
        <SectionTitle>测试金字塔</SectionTitle>
        <BookParagraph>
          测试金字塔描述了不同类型的测试在项目中应占的比例：
        </BookParagraph>
        <BookList items={[
          '单元测试（70%）：测试单个函数或类，运行速度快',
          '集成测试（20%）：测试模块间交互，验证接口正确性',
          '端到端测试（10%）：测试完整业务流程，覆盖用户场景',
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
        <BookCode language="typescript" code={`// 使用 Jest 进行单元测试
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
          集成测试验证不同模块之间的协作是否正常，尤其是数据库、消息队列等外部依赖的交互。
        </BookParagraph>
        <BookCode language="typescript" code={`// 集成测试：数据库交互
describe('OrderRepository 集成测试', () => {
  let repo: OrderRepository

  beforeAll(async () => {
    const pool = new Pool({ connectionString: TEST_DB_URL })
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
          TDD遵循"红-绿-重构"循环，先写测试，再写实现代码，最后重构优化。
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
        <BookParagraph>使用k6进行接口性能测试，验证系统在高并发下的表现。</BookParagraph>
        <BookCode language="javascript" code={`// k6 性能测试脚本
import http from 'k6/http'
import { check, sleep } from 'k6'

export const options = {
  stages: [
    { duration: '30s', target: 50 },   // 逐步上升到50并发
    { duration: '1m', target: 50 },     // 稳定50并发运行1分钟
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
]

export default function SoftwareTestingPage() { return <LessonLayout meta={META} spreads={SPREADS} /> }
