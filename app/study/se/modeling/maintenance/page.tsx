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
          软件维护是交付后持续演化的活动，与开发、运行和反馈反复交织。软件交付后需要持续修复缺陷、适应环境变化、
          增强功能和优化性能。维护投入随系统寿命、质量和变更频率而变化，不能用一个固定比例替代项目估算。先分清是修复错误、响应外部变化还是新增能力，再评估影响到的调用者、数据和运行流程。
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
        <BookParagraph>下面是服务端 TypeScript 的职责拆分片段，仓储、通知器及 OrderInput 由宿主提供。与上页比较时还必须保留订单项校验，并明确同步改异步带来的错误传播变化；只有外部行为保持一致的部分才属于重构。</BookParagraph>
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
    if (!order.id || !order.items || order.items.length === 0) {
      throw new Error('订单无效')
    }
    for (const item of order.items) {
      if (!item.productId || item.quantity <= 0) throw new Error('订单项无效')
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
function legacyFetchData(url: string): any {
  return fetch(url).then(r => r.json())
}

// 静态返回类型：泛型不会自动校验网络数据
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
console.log(userResponse.data.name) // 仍需运行时校验响应形状`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>版本管理与兼容性</SectionTitle>
        <BookParagraph>
          版本路由只区分接口，不能自动保证兼容。以下为 Express 服务端片段，自定义废弃提示头需在路由之前注册；日期仅是教学样例，不是当前服务承诺。新字段未必需要另起版本，删除字段或改变含义才通常影响旧调用者。
        </BookParagraph>
        <BookCode language="typescript" code={`// API 版本管理示例
// 版本策略：通过版本号路由
import { Router } from 'express'

const router = Router()

// 先注册提示中间件，再声明具体路由
router.use('/api/v1', (req, res, next) => {
  res.setHeader('X-API-Deprecated', 'true') // 自定义提示头
  next()
})

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

`} />
        <TagGrid items={['技术债务', '重构', '版本管理', '兼容性', 'API']} />
      </div>
    ),
  },
  {
    label: '变更影响分析',
    left: (<div className="space-y-4">
      <PageTitle>改一列数据为什么影响多处</PageTitle>
      <BookParagraph>客户姓名最初只有 name，现在要支持显示名与法定姓名。直接把字段重命名会破坏老接口、历史报表和导入脚本。先区分领域概念：显示名可修改，法定姓名可能需要授权。再沿读写路径找调用者，记录哪些流程只需显示、哪些流程必须用于凭证，避免把一个技术字段变更误当成纯粹改名。</BookParagraph>
      <BookParagraph>影响分析从入口到存储再到派生数据：界面表单写入什么，服务如何验证，数据库是否允许空值，搜索索引何时更新，导出任务是否依赖旧字段。对动态调用和外部消费者，仅搜索源码不够，还要看接口约定与访问记录；找不到使用方不能证明不存在使用方。</BookParagraph>
      <SectionTitle>用特征测试冻结已知行为</SectionTitle>
      <BookParagraph>旧结算函数没有文档时，选取无优惠、有优惠、空订单和非法数量的样本，记录返回值、异常与副作用顺序。先保护已知行为再拆函数，发现历史错误后单独讨论修复。把修复和重构混在一次提交中，失败时就难判断是规则改变还是结构拆分出错。</BookParagraph>
    </div>),
    right: (<div className="space-y-4">
      <SectionTitle>把变更拆成可回退的阶段</SectionTitle>
      <div className="overflow-x-auto"><table className="w-full text-sm border-collapse"><caption>姓名字段的扩展、迁移与收缩</caption><thead><tr><th>阶段</th><th>数据与代码</th><th>继续条件</th></tr></thead><tbody><tr><td>扩展</td><td>新增可空字段，旧读写继续</td><td>新旧版本都能运行</td></tr><tr><td>迁移</td><td>双写、回填、核对后切读</td><td>差异与缺失在可解释范围</td></tr><tr><td>收缩</td><td>停旧写，最后删除旧列</td><td>旧版本和外部依赖已退出</td></tr></tbody></table></div>
      <BookParagraph>回填任务必须可重复、可分批并保留进度；写回时防止覆盖用户刚修改的新值。双写也不是天然一致，两个写操作必须同事务或有补偿核对。删除旧列之后再回滚旧程序通常会失败，所以数据库破坏性收缩要等代码回滚窗口结束。</BookParagraph>
      <BookParagraph>发布计划应写明观察指标和停止条件：姓名缺失增加、旧接口错误增加就停止切换。回滚应用、关闭开关和修复数据是三种不同动作；开关能恢复读路径，却无法撤销已经发送的通知或删除的数据。</BookParagraph>
    </div>),
  },
  {
    label: '契约与运行时校验',
    left: (<div className="space-y-4">
      <PageTitle>类型声明不等于外部数据可信</PageTitle>
      <BookParagraph>泛型 fetchData&lt;User&gt; 告诉编译器调用者期望什么，并不会检查服务器是否真的返回用户。响应可能是错误页面，也可能把数字编号改成字符串。边界上应先把 JSON 当作 unknown，验证必要字段后再构造内部对象；验证失败应带上上下文，避免深层代码以“属性不存在”方式崩溃。</BookParagraph>
      <BookParagraph>下例为独立 JavaScript，可在 Node 中运行。仅验证演示需要的 id 与 name，不包含网络传输与完整用户契约；严格字段白名单、邮箱规则和错误码应由实际需求补充。保留未知附加字段还是拒绝，也要依据兼容策略明确决定。</BookParagraph>
      <BookCode language="javascript" code={`function parseUser(value) {
  if (value === null || typeof value !== 'object' ||
      !Number.isInteger(value.id) || typeof value.name !== 'string') {
    throw Error('用户响应格式错误')
  }
  return { id: value.id, name: value.name }
}
console.assert(parseUser({ id: 7, name: '林' }).id === 7)
let rejected = false
try { parseUser({ id: '7', name: '林' }) } catch { rejected = true }
console.assert(rejected)`} />
    </div>),
    right: (<div className="space-y-4">
      <SectionTitle>兼容性要从消费者角度判断</SectionTitle>
      <BookParagraph>新增可选字段通常容易兼容，但严格解析器可能拒绝未知字段；扩展枚举值也可能触发旧客户端的穷尽分支错误。改变金额单位、默认排序或空值语义，即使字段名没变也可能破坏业务。消费者契约测试应覆盖它真正依赖的字段和行为，而不只校验响应能被解析。</BookParagraph>
      <BookParagraph>旧报表按“金额为元”汇总，新接口改成“分”会使结果放大一百倍。安全迁移是增加有单位名称的新字段，明确两者换算、有效期和调用方迁移状态。版本号只是定位契约的工具，不能替代对数值含义和舍入规则的说明。</BookParagraph>
      <BookParagraph>练习：为 parseUser 增加可选显示名。缺省时回退 name，显式空字符串是否允许则由产品规则决定。分别测试缺省、正常、错误类型和新增未知字段，说明哪个输入应被接受。这样维护测试保护的是可见契约，而不是对象恰好有几个属性。</BookParagraph>
    </div>),
  },
  {
    label: '故障与技术债',
    left: (<div className="space-y-4">
      <PageTitle>从超时告警定位到代码变化</PageTitle>
      <BookParagraph>发布后订单接口尾延迟升高，先确认影响范围与起始时间，再比较错误率、请求量、数据库等待和变更记录。若只在带优惠券请求出现，沿优惠查询路径定位，而不是先重启所有服务。暂时关闭新规则可减少影响，但必须保存足够证据，随后补上可稳定复现的失败测试。</BookParagraph>
      <BookParagraph>修复后验证三层证据：原始失败输入已通过，同类边界未回归，运行指标恢复到预期。复盘描述触发条件、传播路径和检测缺口，不把“某人粗心”作为根因。例如查询漏索引造成排队，真正的改进包括代表性数据量测试、慢查询观察以及发布时的回退阈值。</BookParagraph>
      <SectionTitle>技术债务如何排优先级</SectionTitle>
      <BookParagraph>记录债务的位置、形成背景、可观察代价、偿还方案与负责人。一个每周修改且反复引发事故的模块，比一个多年不变的长函数更值得先处理。可用变更频率、故障影响和修改耗时辅助排序，不能把所有不喜欢的风格都算作必须立刻偿还的债务。</BookParagraph>
    </div>),
    right: (<div className="space-y-4">
      <SectionTitle>度量必须有统一口径</SectionTitle>
      <BookParagraph>平均恢复时间从用户受影响到服务恢复计算，还是从告警到修复完成计算，结论会不同；看趋势前应固定口径。平均值还可能掩盖一次很长的事故，因此同时观察分布、失败变更比例和事故影响范围。测试通过率很高也可能只是测试不足，不能单独证明质量提升。</BookParagraph>
      <BookParagraph>知识维护要靠可定位的资料：关键规则放在领域说明，操作步骤放在运行手册，历史权衡放在决策记录。一次新人修改若必须逐个询问作者，说明知识仍依附个人。将最常见的排障问题转成可执行检查，比在交接末尾堆一份过时大文档更有效。</BookParagraph>
      <BookParagraph>综合练习：把同步邮件通知改成异步任务。列出对返回时机、失败提示、重复发送和关机恢复的影响，再决定哪些属于等价重构、哪些属于行为变更。参考分析应指出旧流程通知失败会让调用失败，新流程若先返回成功，契约已经改变，必须明确任务状态与补发责任。</BookParagraph>
    </div>),
  },
]

export default function SoftwareMaintenancePage() { return <LessonLayout meta={META} spreads={SPREADS} /> }
