'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import {
  PageTitle, SectionTitle, BookParagraph, BookCode, BookList, TagGrid,
} from '@shared/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '软件工程',
  chapterTitle: '软件维护',
  chapterNumber: 7,
  totalChapters: 7,
  subjectHref: '/study/se/modeling',
  prevChapter: { label: '软件测试', href: '/study/se/modeling/testing' },
  theme: THEMES.software,
}

const SPREADS = [
  {
    label: '理论知识',
    left: (
      <div className="space-y-4">
        <PageTitle>软件维护概述</PageTitle>
        <BookParagraph>
          软件维护是软件生命周期的最后阶段，也是最长的阶段。软件交付后需要持续修复缺陷、适应环境变化、
          增强功能和优化性能。研究表明，软件维护成本通常占总开发成本的60%-80%。
        </BookParagraph>
        <SectionTitle>软件维护的四种类型</SectionTitle>
        <BookParagraph>
          <b>修正性维护：</b>修复已发现的缺陷和错误
        </BookParagraph>
        <BookParagraph>
          <b>适应性维护：</b>适应外部环境变化（操作系统升级、数据库变更等）
        </BookParagraph>
        <BookParagraph>
          <b>完善性维护：</b>增加新功能或提升性能
        </BookParagraph>
        <BookParagraph>
          <b>预防性维护：</b>主动重构和优化，防止未来出现问题
        </BookParagraph>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>维护成本因素</SectionTitle>
        <BookParagraph>
          影响软件维护成本的主要因素包括：
        </BookParagraph>
        <BookList items={[
          '代码质量：低质量代码增加维护难度',
          '文档完整性：缺乏文档使维护更困难',
          '架构合理性：良好架构降低修改成本',
          '人员流动：核心人员离开导致知识流失',
          '技术债务：累积的技术债务需要偿还',
          '测试覆盖：完善的测试减少回归风险',
        ]} />
        <SectionTitle>维护度量指标</SectionTitle>
        <BookList items={[
          'MTBF（平均故障间隔时间）',
          'MTTR（平均修复时间）',
          '代码变更影响范围分析',
          '回归测试通过率',
          '技术债务比率',
        ]} />
        <TagGrid items={['维护', '重构', '技术债务', 'MTBF', 'MTTR']} />
      </div>
    ),
  },
  {
    label: '维护实践',
    left: (
      <div className="space-y-4">
        <PageTitle>代码重构</PageTitle>
        <BookParagraph>
          重构是在不改变外部行为的前提下改善代码内部结构的过程。
          持续重构是保持代码健康的关键实践。
        </BookParagraph>
        <BookCode language="typescript" code={`// 重构前：函数过长、职责不清晰
function processOrder(order: any) {
  // 验证订单
  if (!order.id || !order.items || order.items.length === 0) {
    throw new Error('订单无效')
  }
  for (const item of order.items) {
    if (!item.productId || item.quantity <= 0) {
      throw new Error('订单项无效')
    }
  }
  // 计算价格
  let total = 0
  for (const item of order.items) {
    total += item.price * item.quantity
  }
  if (order.coupon) {
    total = total * 0.9  // 九折优惠
  }
  // 保存订单
  db.saveOrder({ ...order, total, status: 'processed' })
  // 发送通知
  email.send(order.userEmail, '订单已处理')
}`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>重构后代码</SectionTitle>
        <BookParagraph>通过提取方法、分离职责进行重构：</BookParagraph>
        <BookCode language="typescript" code={`// 重构后：职责清晰、易于维护
class OrderProcessor {
  constructor(
    private validator: OrderValidator,
    private calculator: PriceCalculator,
    private repo: OrderRepository,
    private notifier: OrderNotifier
  ) {}

  async process(order: OrderInput): Promise<Order> {
    this.validator.validate(order)

    const total = this.calculator.calculate(order)
    const savedOrder = await this.repo.save({
      ...order, total, status: 'processed'
    })

    await this.notifier.notifyProcessed(savedOrder)
    return savedOrder
  }
}

class OrderValidator {
  validate(order: OrderInput): void {
    if (!order.id || order.items.length === 0) {
      throw new Error('订单无效')
    }
  }
}

class PriceCalculator {
  calculate(order: OrderInput): number {
    const subtotal = order.items.reduce(
      (sum, item) => sum + item.price * item.quantity, 0
    )
    return order.coupon ? subtotal * 0.9 : subtotal
  }
}`} />
        <TagGrid items={['重构', '可维护性', '职责分离', 'SOLID', '代码质量']} />
      </div>
    ),
  },
  {
    label: '代码实践',
    left: (
      <div className="space-y-4">
        <PageTitle>技术债务管理</PageTitle>
        <BookParagraph>
          技术债务是开发中为了短期速度而做出的次优设计决策，需要定期识别和偿还。
        </BookParagraph>
        <BookCode language="typescript" code={`// 技术债务示例：缺乏类型安全
// 债：使用 any 类型
function fetchData(url: string): any {
  return fetch(url).then(r => r.json())
}

// 偿还：泛型 + 类型约束
interface ApiResponse<T> {
  data: T
  error?: string
  timestamp: number
}

async function fetchData<T>(
  url: string
): Promise<ApiResponse<T>> {
  const response = await fetch(url)
  return response.json()
}

// 使用
interface User {
  id: number
  name: string
  email: string
}

const userResponse = await fetchData<User>('/api/user/1')
console.log(userResponse.data.name) // 类型安全`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>版本管理与兼容性</SectionTitle>
        <BookParagraph>
          良好的版本管理策略有助于降低维护成本，提高系统稳定性。
        </BookParagraph>
        <BookCode language="typescript" code={`// API 版本管理示例
// 版本策略：通过版本号路由
import { Router } from 'express'

const router = Router()

// v1 版本接口
router.get('/api/v1/users/:id', (req, res) => {
  res.json({
    id: req.params.id,
    name: '张三',
    role: 'user'
  })
})

// v2 版本接口（新增字段）
router.get('/api/v2/users/:id', (req, res) => {
  res.json({
    id: req.params.id,
    name: '张三',
    role: 'user',
    avatar: '/avatars/default.png', // 新增
    createdAt: '2024-01-01T00:00:00Z', // 新增
  })
})

// 废弃策略：v1 标记废弃
// 在响应头中添加废弃标记
router.use('/api/v1/*', (req, res, next) => {
  res.setHeader('X-API-Deprecated', 'true')
  res.setHeader(
    'X-API-Deprecation-Message',
    'v1将于2025-06-30停止服务，请迁移至v2'
  )
  next()
})`} />
        <TagGrid items={['技术债务', '重构', '版本管理', '兼容性', 'API']} />
      </div>
    ),
  },
]

export default function SoftwareMaintenancePage() { return <LessonLayout meta={META} spreads={SPREADS} /> }
