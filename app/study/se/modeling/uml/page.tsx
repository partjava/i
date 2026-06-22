'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import {
  PageTitle, SectionTitle, BookParagraph, BookCode, BookList, TagGrid,
} from '@/app/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '软件工程',
  chapterTitle: 'UML建模',
  chapterNumber: 2,
  totalChapters: 7,
  subjectHref: '/study/se/modeling',
  prevChapter: { label: '软件建模基础', href: '/study/se/modeling/basic' },
  nextChapter: { label: '设计模式', href: '/study/se/modeling/patterns' },
  theme: THEMES.software,
}

const SPREADS = [
  {
    label: '理论知识',
    left: (
      <div className="space-y-4">
        <PageTitle>UML统一建模语言</PageTitle>
        <BookParagraph>
          UML（Unified Modeling Language）是OMG（对象管理组织）制定的业界标准建模语言。
          它通过13种标准图形，从不同视角全面描述软件系统，是软件开发团队的通用交流工具。
        </BookParagraph>
        <SectionTitle>UML三大分类</SectionTitle>
        <BookParagraph>
          <b>结构图（6种）：</b>描述系统的静态结构
        </BookParagraph>
        <BookList items={[
          '类图：描述类、接口及其关系',
          '对象图：描述特定时刻的对象快照',
          '组件图：描述系统组件的组织结构',
          '部署图：描述硬件节点上的部署结构',
          '包图：描述包之间的依赖关系',
          '组合结构图：描述类的内部结构',
        ]} />
        <BookParagraph>
          <b>行为图（7种）：</b>描述系统的动态行为
        </BookParagraph>
        <BookList items={['用例图、活动图、状态机图、顺序图、通信图、时序图、交互概览图']} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>UML图的选用策略</SectionTitle>
        <BookParagraph>
          实际项目中不需要使用所有UML图形，应根据场景选择合适的图：
        </BookParagraph>
        <BookParagraph>
          <b>需求分析阶段：</b>用例图 + 活动图
        </BookParagraph>
        <BookParagraph>
          <b>设计阶段：</b>类图 + 顺序图 + 状态机图
        </BookParagraph>
        <BookParagraph>
          <b>架构设计：</b>组件图 + 部署图 + 包图
        </BookParagraph>
        <BookParagraph>
          <b>详细设计：</b>类图 + 顺序图 + 通信图
        </BookParagraph>
        <TagGrid items={['UML', '类图', '用例图', '顺序图', 'OMG']} />
      </div>
    ),
  },
  {
    label: '核心图形',
    left: (
      <div className="space-y-4">
        <PageTitle>类图（Class Diagram）</PageTitle>
        <BookParagraph>
          类图是UML中最重要、使用最频繁的图，展示系统的静态结构。
          它描述类、接口、协作以及它们之间的关系。
        </BookParagraph>
        <BookParagraph>
          <b>类的关系类型：</b>
        </BookParagraph>
        <BookList items={[
          '关联：A类持有B类的引用（实线箭头）',
          '继承：A类继承B类（空心三角实线）',
          '实现：A类实现B接口（空心三角虚线）',
          '依赖：A类方法中使用B类（虚线箭头）',
          '聚合：整体与部分的关系，部分可独立存在（空心菱形）',
          '组合：整体与部分的关系，部分随整体消亡（实心菱形）',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>顺序图（Sequence Diagram）</SectionTitle>
        <BookParagraph>
          顺序图展示对象之间的消息交互时序，是动态建模的核心工具。
        </BookParagraph>
        <BookParagraph>
          <b>基本组成：</b>
        </BookParagraph>
        <BookList items={[
          '生命线：表示对象的垂直虚线，从上到下表示时间推进',
          '激活条：表示对象执行操作的时间段',
          '消息：对象之间的通信，包括同步消息和异步消息',
          '交互片段：alt（选择）、opt（可选）、loop（循环）',
        ]} />
        <BookCode language="typescript" code={`// 顺序图对应的代码示例
// 用户下单交互流程
class OrderController {
  createOrder(userId: number, items: OrderItem[]) {
    const user = this.userRepo.findById(userId)
    const order = new Order(user)
    for (const item of items) {
      order.addItem(item.product, item.quantity)
    }
    this.orderRepo.save(order)
    this.paymentService.process(order)
    return order
  }
}`} />
      </div>
    ),
  },
  {
    label: '代码实践',
    left: (
      <div className="space-y-4">
        <PageTitle>UML模型转代码</PageTitle>
        <BookParagraph>以下展示用例图和状态机图对应的代码实现。</BookParagraph>
        <BookCode language="typescript" code={`// 用例图：用户管理模块
interface IUserUseCase {
  createUser(data: CreateUserDto): Promise<User>
  updateUser(id: number, data: UpdateUserDto): Promise<User>
  deleteUser(id: number): Promise<void>
  findUser(id: number): Promise<User | null>
  listUsers(page: number, size: number): Promise<Page<User>>
}

class UserUseCaseImpl implements IUserUseCase {
  constructor(
    private repo: IUserRepository,
    private validator: IUserValidator
  ) {}

  async createUser(data: CreateUserDto): Promise<User> {
    this.validator.validate(data)
    const user = User.create(data.name, data.email)
    return this.repo.save(user)
  }
  // ... 其他方法实现
}`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>状态机图实现</SectionTitle>
        <BookParagraph>使用状态模式实现订单状态流转。</BookParagraph>
        <BookCode language="typescript" code={`// 订单状态机
type OrderState = 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled'

class Order {
  private state: OrderState = 'pending'

  pay(): void {
    if (this.state !== 'pending') {
      throw new Error('订单状态不允许支付')
    }
    this.state = 'paid'
  }

  ship(): void {
    if (this.state !== 'paid') {
      throw new Error('订单状态不允许发货')
    }
    this.state = 'shipped'
  }

  deliver(): void {
    if (this.state !== 'shipped') {
      throw new Error('订单状态不允许确认收货')
    }
    this.state = 'delivered'
  }

  cancel(): void {
    if (this.state === 'shipped' || this.state === 'delivered') {
      throw new Error('订单已发货或已送达，无法取消')
    }
    this.state = 'cancelled'
  }
}`} />
        <TagGrid items={['状态机', '用例', '类图', '顺序图', '设计']} />
      </div>
    ),
  },
]

export default function UMLModelingPage() { return <LessonLayout meta={META} spreads={SPREADS} /> }
