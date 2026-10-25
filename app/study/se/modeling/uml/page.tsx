'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import {
  PageTitle, SectionTitle, BookParagraph, BookCode, BookList, TagGrid,
} from '@shared/components/ui/book/BookContent'

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
          按 UML 2.5.1 常见图分类，共有14种图：7种结构图、7种行为图，其中4种行为图属于交互图。图提供共同符号，真正的设计仍需明确业务术语、约束与边界；同一条支付规则应在类关系、消息顺序和状态转移中保持一致。
        </BookParagraph>
        <SectionTitle>UML图的分类</SectionTitle>
        <BookParagraph>
          <b>结构图（7种）：</b>描述系统的静态结构
        </BookParagraph>
        <BookList items={[
          '类图：描述类、接口及其关系',
          '对象图：描述特定时刻的对象快照',
          '组件图：描述系统组件的组织结构',
          '部署图：描述硬件节点上的部署结构',
          '包图：描述包之间的依赖关系',
          '组合结构图：描述类的内部结构',
          '轮廓图（Profile Diagram）：描述构造型、扩展及定制规则',
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
          '关联：实例之间的结构联系（实线，箭头可表达可导航方向）',
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
        <BookCode language="typescript" code={`// 服务端协作伪代码：仓储、支付服务与领域类型由宿主注入
// 顺序图对应的代码示例
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
        <BookParagraph>以下为服务端 TypeScript 接口片段，DTO、仓储、分页与领域实体由宿主补齐。用例表达参与者的目标，不会自动等同于增删改查接口；接口只是实现用例的一种设计结果。</BookParagraph>
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
        <BookParagraph>以下是带守卫条件的显式状态机，不是把每种状态封装为独立对象的状态模式。片段可在独立 TypeScript 文件中运行；支付后取消需要退款流程，本例不把退款简化为直接取消。</BookParagraph>
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
    if (this.state !== 'pending') {
      throw new Error('订单已发货或已送达，无法取消')
    }
    this.state = 'cancelled'
  }
}`} />
        <TagGrid items={['状态机', '用例', '类图', '顺序图', '设计']} />
      </div>
    ),
  },
  {
    label: '从叙述到关系',
    left: (<div className="space-y-4">
      <PageTitle>借书需求如何变成类图</PageTitle>
      <BookParagraph>图书馆说“读者借一本书，归还后可再借”。这里的“书”有歧义：书目是作品与版本的信息，馆藏副本是能被借走的具体物件。若只建一个 Book 类并把借阅者放进去，两本同版副本就无法分别借出。因此识别 Title、Copy、Reader、Loan 四个概念，再讨论数量与生命周期。</BookParagraph>
      <BookParagraph>一本书目对应零到多个副本，每个副本属于一个书目；每次借阅恰好关联一个读者与一个副本，一个副本可有多条历史借阅。图上的多重性必须区分“全部历史”与“当前有效”：历史可以是多条，未归还记录同时最多一条，需要额外约束，不能仅凭一根关联线证明不会重复借出。</BookParagraph>
      <SectionTitle>组合关系要有所有权证据</SectionTitle>
      <BookParagraph>订单项在模型中通常由订单专属管理，可建组合；商品会被多个订单引用且有独立生命周期，不能因为订单含商品就画成组合。组合菱形画在整体一端，它表达建模上的所有权约束，不等于数据库一定执行级联删除，历史审计记录尤其需要单独决定保留策略。</BookParagraph>
    </div>),
    right: (<div className="space-y-4">
      <SectionTitle>同一规则在多个视图中的位置</SectionTitle>
      <div className="overflow-x-auto"><table className="w-full text-sm border-collapse"><caption>“同一副本不能同时借给两人”的追踪</caption><thead><tr><th>视图</th><th>表达的事实</th><th>检查方式</th></tr></thead><tbody><tr><td>类图</td><td>Loan关联Reader与Copy</td><td>检查身份、多重性与历史范围</td></tr><tr><td>顺序图</td><td>锁定副本后检查并保存</td><td>走查两个并发借阅请求</td></tr><tr><td>状态机</td><td>可借→借出→可借</td><td>拒绝借出状态再次借阅</td></tr></tbody></table></div>
      <BookParagraph>对象图用一个具体快照检验类图：读者甲、编号C17的副本、借阅L09，以及它们之间的链接。若画不出“同书目两副本分别借给两人”的快照，说明模型可能把书目与副本混在一起。对象图不是另一套类定义，而是类图允许的一个实例状态。</BookParagraph>
      <BookParagraph>练习时先用三组实例挑战多重性：没有副本的新书目、同读者两次历史借阅、尚未归还的借阅。若模型只能容纳最常见的情况，它还不足以指导实现。将未知规则标注为待确认，比随手写一个星号更有价值。</BookParagraph>
    </div>),
  },
  {
    label: '消息与状态',
    left: (<div className="space-y-4">
      <PageTitle>顺序图怎样揭示隐藏分支</PageTitle>
      <BookParagraph>预约会议室的正常消息为：客户端提交时间段，预约用例检查权限，仓储检测冲突并保存，返回预约编号。检测冲突与保存之间若没有原子保护，两个请求可能同时看到空闲。顺序图应加入两条请求生命线并交错消息，暴露这个窗口，而不是只画一次成功调用。</BookParagraph>
      <BookParagraph>用 alt 片段列出“权限不足”“时间冲突”“保存成功”，每个分支写清守卫条件。异步通知用单独消息表示，不要把箭头画成同步等待却声称通知失败不影响预约。激活条表明执行范围，不是精确耗时；需要比较真实持续时间时再选择计时图。</BookParagraph>
      <SectionTitle>状态转移的四个要素</SectionTitle>
      <BookParagraph>状态机边可写为“事件 [守卫] / 动作”。预约的确认事件只有在待确认且未超时才转为已确认；取消动作释放占用。守卫回答能否转移，动作回答转移时做什么。把权限检查仅放在界面按钮上不能保护服务端状态，因为客户端可以直接发请求。</BookParagraph>
    </div>),
    right: (<div className="space-y-4">
      <SectionTitle>完整性比箭头数量重要</SectionTitle>
      <BookParagraph>列出状态集合后，逐一询问：重复确认如何处理、取消后能否重新确认、超时事件晚到如何处理。可以规定重复确认返回已有结果，而取消后的确认被拒绝；这两者都没有新增状态，却改变了交互契约。终态也要有定义，不能把“已取消”节点画在角落而不给到达条件。</BookParagraph>
      <BookParagraph>状态测试从转移表产生：覆盖每条允许的边，再为重要禁止边写断言。预约待确认时确认成功，已取消时确认失败，已确认时重复确认不新增占用。若所有测试只覆盖初始态到成功态，代码中未经允许的跳转仍可能长期隐藏。</BookParagraph>
      <BookParagraph>订单片段把已支付取消排除，是为了避免跳过退款；生产系统可引入退款中、已退款状态。退款回调晚到时必须检查当前版本和已有处理记录。这里的新增状态来自业务结果不确定性，不是为了让图看起来复杂。</BookParagraph>
    </div>),
  },
  {
    label: '跨图检查与表达',
    left: (<div className="space-y-4">
      <PageTitle>用例图不承担流程细节</PageTitle>
      <BookParagraph>“借阅图书”是读者的目标，扫码、查读者、保存记录通常是内部步骤。参与者表示系统边界外的角色，同一个人可同时扮演读者和管理员。数据库若属于系统内部，不应为了画全所有技术组件而变成用例参与者；外部身份服务则可作为协作角色。</BookParagraph>
      <BookParagraph>include 表示被包含行为是用例的一部分；extend 表示在扩展点满足条件时加入行为。例如每次借阅都校验资格可抽成包含用例，借阅时按条件提示预约取书可讨论扩展关系。不能用这两种关系表达先后顺序，业务步骤应在用例文本或活动图中展开。</BookParagraph>
      <SectionTitle>活动图检查并行汇合</SectionTitle>
      <BookParagraph>入职流程中开邮箱和准备工位可并行，发放入职完成通知必须等待两者完成。分叉与汇合表达并行同步，判定与合并表达条件选择。若把条件选择错误接到并行汇合，未执行分支永远不会到达，模型就可能描述出一个无法结束的流程。</BookParagraph>
    </div>),
    right: (<div className="space-y-4">
      <SectionTitle>一次评审同时打开三张图</SectionTitle>
      <BookParagraph>先选“借书成功”场景，沿顺序图找到 createLoan 消息，确认类模型中有接收责任和足够的数据，再检查副本状态机存在可借到借出的转移。若消息没有接收对象、状态缺少入口或多重性容不下结果，应当修改模型本身；多张图彼此一致才有沟通价值。</BookParagraph>
      <BookParagraph>代码生成最多帮助搭建结构，无法替你决定事务、错误与并发语义。类图中的一对多可能映射成集合、查询接口或外键，选择受加载成本与边界影响。保留术语表、业务约束与关键交互，比强求所有类和字段都同步成图更可持续。</BookParagraph>
      <BookParagraph>本章采用 UML 2.5.1 的术语与图分类。符号的规范定义、语义及扩展机制可查 <a href="https://www.omg.org/spec/UML/2.5.1/About-UML" target="_blank" rel="noreferrer" className="underline">OMG UML 2.5.1 官方规范入口</a>；示例表格是教学辅助，不取代规范图形。练习提交类图、借阅失败顺序和副本状态表，并说明同一条限制分别在哪里被表达。</BookParagraph>
    </div>),
  },
]

export default function UMLModelingPage() { return <LessonLayout meta={META} spreads={SPREADS} /> }
