'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import {
  PageTitle, SectionTitle, BookParagraph, BookCode, BookList, TagGrid,
} from '@shared/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '软件工程',
  chapterTitle: '软件建模基础',
  chapterNumber: 1,
  totalChapters: 7,
  subjectHref: '/study/se/modeling',
  nextChapter: { label: 'UML建模', href: '/study/se/modeling/uml' },
  theme: THEMES.software,
}

const SPREADS = [
  {
    label: '理论知识',
    left: (
      <div className="space-y-4">
        <PageTitle>什么是软件建模？</PageTitle>
        <BookParagraph>
          软件建模是软件工程中的核心活动，通过构建抽象模型来描述软件系统的结构、行为和交互。
          模型帮助开发团队更好地理解复杂系统，降低开发风险，提高软件质量。它是一组有目的的取舍：地铁线路图保留换乘关系而省略街道，软件模型也应只保留当前问题需要的信息。画图前先说明读者是谁、要回答什么问题，以及哪些事实暂时不讨论，避免把代码中的每个字段都搬进图里。
        </BookParagraph>
        <SectionTitle>建模的三个层次</SectionTitle>
        <BookList items={[
          '概念模型：描述业务领域中的核心概念和关系，与技术无关',
          '设计模型：描述软件系统的架构和组件设计，包括接口和交互',
          '实现模型：描述具体的代码结构和实现细节，与平台相关',
        ]} />
        <SectionTitle>建模的核心价值</SectionTitle>
        <BookList items={[
          '降低复杂度：通过抽象简化系统理解',
          '沟通桥梁：为团队成员提供统一的交流语言',
          '设计验证：在编码前发现设计缺陷',
          '文档记录：为系统维护提供完整的文档基础',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>常用建模语言</SectionTitle>
        <BookParagraph>
          <b>UML（统一建模语言）：</b>标准建模语言。UML 2.5.1 常见分类有14种图，包含7种结构图和7种行为图；不同视图共同表达结构与动态约束。
        </BookParagraph>
        <BookParagraph>
          <b>ER图：</b>实体关系图，用于数据建模，描述数据实体及其关系。
        </BookParagraph>
        <BookParagraph>
          <b>DFD：</b>数据流图，用于功能建模，描述系统的数据处理过程。
        </BookParagraph>
        <BookParagraph>
          <b>Petri网：</b>用于并发系统和业务流程的建模与分析。
        </BookParagraph>
        <TagGrid items={['抽象', 'UML', 'ER图', 'DFD', '模型驱动']} />
      </div>
    ),
  },
  {
    label: '建模方法',
    left: (
      <div className="space-y-4">
        <PageTitle>软件建模方法论</PageTitle>
        <BookParagraph>
          <b>结构化建模：</b>以数据流和功能分解为核心，自顶向下逐层细化。适用于需求明确、功能稳定的系统。
        </BookParagraph>
        <BookParagraph>
          <b>面向对象建模：</b>以对象和类为核心，将数据和操作封装在一起。适用于复杂业务领域和经常变更的系统。
        </BookParagraph>
        <BookParagraph>
          <b>领域驱动设计：</b>以业务领域为核心，通过通用语言连接业务和技术的建模方式。
        </BookParagraph>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>建模过程</SectionTitle>
        <BookParagraph>
          <b>1. 需求分析：</b>收集和理解用户需求，建立用例模型
        </BookParagraph>
        <BookParagraph>
          <b>2. 概念建模：</b>识别业务实体，建立领域模型
        </BookParagraph>
        <BookParagraph>
          <b>3. 详细设计：</b>设计类的结构、接口和交互
        </BookParagraph>
        <BookParagraph>
          <b>4. 模型验证：</b>通过评审和仿真验证模型正确性
        </BookParagraph>
        <TagGrid items={['结构化', '面向对象', 'DDD', '用例', '迭代']} />
      </div>
    ),
  },
  {
    label: '代码实践',
    left: (
      <div className="space-y-4">
        <PageTitle>简单模型示例</PageTitle>
        <BookParagraph>以下是可合并为独立 TypeScript 文件的教学模型，展示用户、订单和商品的关系。价格以整数分表示；库存检查仅在单进程内有效，不提供数据库并发保护。真实系统还需库存预留、订单取消补偿与事务一致性。</BookParagraph>
        <BookCode language="typescript" code={`// 用户模型
class User {
  constructor(
    public id: number,
    public name: string,
    public email: string
  ) {}

  getProfile() {
    return { id: this.id, name: this.name, email: this.email }
  }
}

// 商品模型
class Product {
  constructor(
    public id: number,
    public name: string,
    public price: number,
    public stock: number
  ) {}

  isAvailable(): boolean {
    return this.stock > 0
  }

  decreaseStock(quantity: number): void {
    if (!Number.isSafeInteger(quantity) || quantity <= 0) throw new Error('数量必须为正整数')
    if (this.stock < quantity) throw new Error('商品库存不足')
    this.stock -= quantity
  }
}`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>订单与关联关系</SectionTitle>
        <BookParagraph>通过关联关系将多个模型组合在一起，形成完整的业务模型。</BookParagraph>
        <BookCode language="typescript" code={`// 订单模型（聚合根）
class Order {
  private items: OrderItem[] = []
  private status: 'pending' | 'paid' | 'shipped' = 'pending'

  constructor(
    public id: number,
    public user: User
  ) {}

  addItem(product: Product, quantity: number): void {
    if (!product.isAvailable()) {
      throw new Error('商品库存不足')
    }
    product.decreaseStock(quantity)
    this.items.push(new OrderItem(product.id, product.price, quantity))
  }

  getTotal(): number {
    return this.items.reduce(
      (sum, item) => sum + item.subtotal(), 0
    )
  }
}

// 订单项
class OrderItem {
  constructor(
    public productId: number,
    public unitPrice: number,
    public quantity: number
  ) {}

  subtotal(): number {
    return this.unitPrice * this.quantity
  }
}`} />
        <TagGrid items={['类图', '关联', '聚合', '封装', '实体']} />
      </div>
    ),
  },
  {
    label: '需求与概念识别',
    left: (<div className="space-y-4">
      <PageTitle>从一句需求开始拆问题</PageTitle>
      <BookParagraph>设备借用平台要求“学生预约设备，管理员确认后领取，用完归还”。先列角色、目标与系统边界：学生提交预约，管理员确认可借性，平台记录领取与归还；设备维修和校外采购暂不包含。边界决定哪些信息由系统负责，哪些只是外部输入，防止把所有现实流程都放进同一个模型。</BookParagraph>
      <BookParagraph>将名词作为候选概念而非直接作为类：设备型号是描述，设备实例有唯一编号，预约是一段时间的使用申请，借用记录是实际领走的事实。若把预约与借用合并，就无法表达已确认但未领取、逾期未领与实际超时归还。概念能否独立变化，是判断是否分开的重要依据。</BookParagraph>
      <SectionTitle>补上需求没有说出的规则</SectionTitle>
      <BookParagraph>同一设备的预约时间能否相接，学生能否预约多件，取消后名额何时释放，都需要确认。把不确定处列为问题，不要默认为实现最方便的规则。下面先采用半开时间区间与一台设备允许多条历史预约的假设，后续关系和代码都必须遵守这一假设。</BookParagraph>
    </div>),
    right: (<div className="space-y-4">
      <SectionTitle>把口语转换成可操作约束</SectionTitle>
      <div className="overflow-x-auto"><table className="w-full text-sm border-collapse"><caption>设备借用的概念与限制</caption><thead><tr><th>业务说法</th><th>模型表达</th><th>反例检查</th></tr></thead><tbody><tr><td>预约一台设备</td><td>预约关联一个设备实例</td><td>不能只保存型号</td></tr><tr><td>同时间不能借给两人</td><td>有效区间不得重叠</td><td>九点到十点与九点半到十一点冲突</td></tr><tr><td>归还后保留历史</td><td>借用记录有独立身份</td><td>归还不删除原记录</td></tr></tbody></table></div>
      <BookParagraph>术语表应区分“可预约”“在库”“可领取”。设备在库但处于维修状态，可能不能预约；已有预约但尚未领取，仍然在库。这些概念若全用 available 一个布尔值表示，多个规则会争夺同一字段，导致界面和后台得出不同结论。</BookParagraph>
      <BookParagraph>概念模型先不决定数据库表名和接口路径，设计模型再分配责任，实现模型最后选字段与索引。三个层次不是彼此割裂的文档；发现数据库无法可靠表达某项约束时，应回到概念层核实规则，而不是悄悄把需求改成容易实现的版本。</BookParagraph>
    </div>),
  },
  {
    label: '关系与行为推导',
    left: (<div className="space-y-4">
      <PageTitle>实体、值对象与一致性边界</PageTitle>
      <BookParagraph>设备即使换了名称仍是同一台，因此依靠编号识别，是实体；时间区间由开始与结束决定相等性，可以作为值对象；预约编号区分两次内容相同的申请。不要用数据库有没有主键来倒推概念，每条存储记录都有键，并不意味着业务上都需要独立身份。</BookParagraph>
      <BookParagraph>预约关联学生和设备，领取后产生借用事实。一对多描述全部历史，不代表同一时刻可以任意多条有效记录。把“不能重叠”写成显式不变量，并安排能够原子检查与写入的操作；只在界面提交前查一次，会在两个用户同时申请时失效。</BookParagraph>
      <SectionTitle>为什么不把所有对象放入一个聚合</SectionTitle>
      <BookParagraph>若一个学生对象包含其全部预约、设备和历史借用，保存一次预约就要加载庞大对象图，还可能锁住无关设备。聚合应围绕需要共同维护的不变量设计。跨预约的设备冲突通常由存储约束或应用层事务协调，不能仅凭内存对象引用就宣称一致性已解决。</BookParagraph>
    </div>),
    right: (<div className="space-y-4">
      <SectionTitle>用状态解释“下一步能做什么”</SectionTitle>
      <BookParagraph>预约从待确认到已确认，再到已领取；待确认与已确认可取消，已领取后要走归还流程。每个转移标明触发事件和操作者，管理员确认还需检查设备可用。对取消后的领取事件应拒绝且不产生借用记录，不能只隐藏领取按钮。</BookParagraph>
      <BookParagraph>沿一次领取交互分配责任：接口读取认证身份，用例加载预约，预约检查状态与归属，仓储保存新状态和借用记录。接口不直接拼 SQL 改状态，领域对象也不直接发送 HTTP。消息顺序让隐含前置条件显现，类关系则说明每一步所需信息从哪里获得。</BookParagraph>
      <BookParagraph>模型评审用实例走查：学生甲预约设备D1，管理员确认后甲领取，乙不能领取甲的预约；甲归还后历史仍可查。若无法指出拒绝乙发生在哪个对象或边界，说明模型只有名词，没有责任。用失败场景走查往往比继续增加类更有效。</BookParagraph>
    </div>),
  },
  {
    label: '最小模型实验',
    left: (<div className="space-y-4">
      <PageTitle>用代码澄清时间边界</PageTitle>
      <BookParagraph>下面的独立 JavaScript 用 Node 即可运行，以整数时刻表示半开区间。结束时刻不占用，因此九点到十点与十点到十一点不冲突。它只演示区间规则，跨时区、夏令时和持久化并发应在真实宿主中另外建模。</BookParagraph>
      <BookCode language="javascript" code={`function overlaps(a, b) {
  for (const range of [a, b]) {
    if (!range.every(Number.isFinite) || range.length !== 2 ||
        range[0] >= range[1]) throw Error('区间无效')
  }
  return a[0] < b[1] && b[0] < a[1]
}
if (!overlaps([9, 10], [9.5, 11])) throw Error('漏检冲突')
if (overlaps([9, 10], [10, 11])) throw Error('相接不应冲突')`} />
      <BookParagraph>若改用闭区间，两段在十点相接就有共同点，结果会不同。问题没有通用唯一答案，关键是需求、图、代码与测试采用同一约定。再补完全包含、完全分离、反向区间与零长度区间，可以检验规则是否完整。</BookParagraph>
    </div>),
    right: (<div className="space-y-4">
      <SectionTitle>回看商品与订单模型</SectionTitle>
      <BookParagraph>商品价格后来上涨时，已创建订单不应跟着变贵，因此订单项保存成交单价快照。库存只剩两件却购买三件时必须整体拒绝，不能静默扣减失败后仍创建订单项；负数量更不能使库存反向增加。这些反例决定了数量校验、失败语义和快照字段，比增加 getter 更能体现建模价值。</BookParagraph>
      <BookParagraph>金额也不是任意 number：约定整数分可减少浮点舍入问题，但折扣、税额仍需统一舍入，跨币种必须显式携带币种。示例为了集中讨论关系，暂不实现完整 Money 值对象；学习者应知道简化的边界，而不是直接把教学类当作生产订单系统。</BookParagraph>
      <BookParagraph>完成一个模型时保留术语、边界、不变量、关键场景与未决问题。将“同设备不重叠”追踪到区间函数与并发检查，将“归还保留历史”追踪到记录生命周期。需求改变时据此找到影响位置。UML图分类及术语可继续查阅 <a href="https://www.omg.org/spec/UML/2.5.1/About-UML" target="_blank" rel="noreferrer" className="underline">OMG UML 2.5.1 官方入口</a>，但不必为了覆盖所有图而重复表达同一事实。</BookParagraph>
    </div>),
  },
]

export default function ModelingBasicPage() { return <LessonLayout meta={META} spreads={SPREADS} /> }
