'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import {
  PageTitle, SectionTitle, BookParagraph, BookCode, BookList, TagGrid,
} from '@shared/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '软件工程',
  chapterTitle: '设计模式',
  chapterNumber: 3,
  totalChapters: 7,
  subjectHref: '/study/se/modeling',
  prevChapter: { label: 'UML建模', href: '/study/se/modeling/uml' },
  nextChapter: { label: '架构设计', href: '/study/se/modeling/architecture' },
  theme: THEMES.software,
}

const SPREADS = [
  {
    label: '理论知识',
    left: (
      <div className="space-y-4">
        <PageTitle>设计模式概述</PageTitle>
        <BookParagraph>
          设计模式是软件设计中常见问题的典型解决方案。每个模式描述了在特定上下文中反复出现的问题的核心解决方案，
          使开发者可以复用成功的设计经验，而不必重复发明轮子。学习时先指出变化发生在哪一处，再确定对象如何合作；如果一个简单函数已能清楚表达规则，就不必为了套用名称而增加接口。模式的收益应体现为修改范围缩小、依赖方向清楚和测试更容易，而不是类的数量增加。
        </BookParagraph>
        <SectionTitle>GoF 23种设计模式分类</SectionTitle>
        <BookParagraph>
          <b>创建型模式（5种）：</b>处理对象的创建机制
        </BookParagraph>
        <BookList items={['单例、工厂方法、抽象工厂、建造者、原型']} />
        <BookParagraph>
          <b>结构型模式（7种）：</b>处理类或对象的组合
        </BookParagraph>
        <BookList items={['适配器、桥接、组合、装饰、外观、享元、代理']} />
        <BookParagraph>
          <b>行为型模式（11种）：</b>处理类或对象的交互和职责分配
        </BookParagraph>
        <BookList items={['责任链、命令、解释器、迭代器、中介者、备忘录、观察者、状态、策略、模板方法、访问者']} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>设计模式原则</SectionTitle>
        <BookParagraph>
          设计模式遵循SOLID原则，这是面向对象设计的五大基本原则：
        </BookParagraph>
        <BookParagraph>
          <b>S - 单一职责：</b>按导致变化的责任来源组织类
        </BookParagraph>
        <BookParagraph>
          <b>O - 开闭原则：</b>对扩展开放，对修改关闭
        </BookParagraph>
        <BookParagraph>
          <b>L - 里氏替换：</b>子类必须能替换父类
        </BookParagraph>
        <BookParagraph>
          <b>I - 接口隔离：</b>接口应小而专，不要大而全
        </BookParagraph>
        <BookParagraph>
          <b>D - 依赖倒置：</b>依赖抽象，不依赖具体
        </BookParagraph>
        <TagGrid items={['GoF', 'SOLID', '创建型', '结构型', '行为型']} />
      </div>
    ),
  },
  {
    label: '常用模式',
    left: (
      <div className="space-y-4">
        <PageTitle>单例模式</PageTitle>
        <BookParagraph>
          确保一个类只有一个实例，并提供全局访问点。常用于同一运行上下文中的配置与资源管理；不同进程、Worker和模块副本仍可能各有实例。全局可变单例会让测试互相污染，可优先考虑显式依赖注入。
        </BookParagraph>
        <BookCode language="typescript" code={`// 同一JavaScript运行上下文内的同步惰性单例
class ConfigManager {
  private static instance: ConfigManager
  private config: Map<string, string> = new Map()

  private constructor() {} // 私有构造函数

  static getInstance(): ConfigManager {
    if (!ConfigManager.instance) {
      ConfigManager.instance = new ConfigManager()
    }
    return ConfigManager.instance
  }

  set(key: string, value: string): void {
    this.config.set(key, value)
  }

  get(key: string): string | undefined {
    return this.config.get(key)
  }
}

// 使用
const config = ConfigManager.getInstance()
config.set('db.url', 'localhost:5432')`} />
        <SectionTitle>工厂模式</SectionTitle>
        <BookParagraph>
          定义一个创建对象的接口，让子类决定实例化哪个类。将对象的创建和使用分离。
        </BookParagraph>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>策略模式</SectionTitle>
        <BookParagraph>
          定义一系列算法，将每个算法封装起来，使它们可以相互替换。策略模式让算法的变化独立于使用算法的客户端。
        </BookParagraph>
        <BookCode language="typescript" code={`// 策略模式：支付方式
interface PaymentStrategy {
  pay(amount: number): void
}

class AlipayStrategy implements PaymentStrategy {
  pay(amount: number): void {
    console.log(\`模拟支付宝支付：¥\${amount}\`)
  }
}

class WechatPayStrategy implements PaymentStrategy {
  pay(amount: number): void {
    console.log(\`使用微信支付：¥\${amount}\`)
  }
}

class OrderService {
  constructor(private strategy: PaymentStrategy) {}

  checkout(amount: number): void {
    this.strategy.pay(amount)
  }
}

// 使用
const order = new OrderService(new AlipayStrategy())
order.checkout(299)`} />
        <TagGrid items={['单例', '工厂', '策略', '观察者', '适配器']} />
      </div>
    ),
  },
  {
    label: '代码实践',
    left: (
      <div className="space-y-4">
        <PageTitle>观察者模式实战</PageTitle>
        <BookParagraph>
          定义一对多依赖关系，当一个对象状态变化时，依赖它的对象得到通知。下面是独立 TypeScript 文件中的进程内示例，any 为简化事件载荷；同步监听器抛错会中断后续通知，它不提供持久化、重试或跨进程投递保证。
        </BookParagraph>
        <BookCode language="typescript" code={`// 观察者模式：事件通知系统
interface Observer {
  update(event: string, data: any): void
}

class EventBus {
  private observers: Map<string, Observer[]> = new Map()

  subscribe(event: string, observer: Observer): void {
    if (!this.observers.has(event)) {
      this.observers.set(event, [])
    }
    this.observers.get(event)!.push(observer)
  }

  unsubscribe(event: string, observer: Observer): void {
    const list = this.observers.get(event)
    if (list) {
      const idx = list.indexOf(observer)
      if (idx !== -1) list.splice(idx, 1)
    }
  }

  emit(event: string, data: any): void {
    this.observers.get(event)?.forEach(o => o.update(event, data))
  }
}`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>装饰器模式实战</SectionTitle>
        <BookParagraph>通过相同接口包装已有对象，动态添加功能。以下 TypeScript 片段中 await 使用处应放在异步函数或模块中；日志示例不包含真实数据源，不能把敏感返回值直接写入日志。</BookParagraph>
        <BookCode language="typescript" code={`// 装饰器模式：日志增强
interface DataService {
  fetchData(id: number): Promise<any>
}

class UserDataService implements DataService {
  async fetchData(id: number): Promise<any> {
    return { id, name: '张三', role: 'admin' }
  }
}

class LoggingDecorator implements DataService {
  constructor(private wrapped: DataService) {}

  async fetchData(id: number): Promise<any> {
    console.log(\`[LOG] 开始查询数据，ID=\${id}\`)
    const start = Date.now()
    try {
      const result = await this.wrapped.fetchData(id)
      console.log(\`[LOG] 查询成功，耗时=\${Date.now() - start}ms\`)
      return result
    } catch (err) {
      console.error(\`[LOG] 查询失败：\${err}\`)
      throw err
    }
  }
}

// 使用
const service = new LoggingDecorator(new UserDataService())
const data = await service.fetchData(1)`} />
        <TagGrid items={['观察者', '装饰器', '事件驱动', '日志', 'AOP']} />
      </div>
    ),
  },
  {
    label: '策略与状态的推导',
    left: (<div className="space-y-4">
      <PageTitle>运费变化为什么适合策略</PageTitle>
      <BookParagraph>商店最初只有普通配送，后来加入同城配送和门店自提。若在结算函数里不断增加条件，税额、库存和运费的修改混在一起。先抽取稳定输入：重量、距离、商品金额，统一输出以分计的运费；再把不同算法作为策略传入结算。订单负责汇总，策略负责计算，不应让策略私自扣款或保存订单。</BookParagraph>
      <BookParagraph>关系上，结算服务持有一个运费策略；时序上，客户端选策略、结算调用报价、汇总结果。普通配送首重八元、超重每千克两元；三千克订单得十二元，自提得零元。两种结果来自同一结算路径，只替换算法。若算法只有一行，也可使用函数类型而非创建三个只有一个方法的类。</BookParagraph>
      <BookParagraph>测试应验证相同输入在不同策略下得到预期值，以及重量为零、负数和小数时的处理规则。策略接口还要约定舍入方式，否则两个实现都返回 number，却一个返回元、另一个返回分，类型相同仍不能安全替换。</BookParagraph>
    </div>),
    right: (<div className="space-y-4">
      <SectionTitle>相似结构，不同决策来源</SectionTitle>
      <div className="overflow-x-auto"><table className="w-full text-sm border-collapse"><caption>从变化来源选择模式</caption><thead><tr><th>问题</th><th>候选模式</th><th>谁决定切换</th></tr></thead><tbody><tr><td>不同运费算法</td><td>策略</td><td>调用者按场景选定</td></tr><tr><td>订单支付后才能发货</td><td>状态</td><td>内部事件与合法转移</td></tr><tr><td>旧支付接口字段不同</td><td>适配器</td><td>边界转换固定协议</td></tr></tbody></table></div>
      <BookParagraph>状态模式也会把行为委托给对象，但重点是对象在生命周期中能做什么。草稿可以编辑，已发货不能取消；状态对象接收事件后决定下一状态。策略一般由外部选择，不能用“用户选择已发货策略”绕过流程约束。简单状态集合用转移表更直接，只有状态行为持续增长时再拆对象。</BookParagraph>
      <BookParagraph>先写状态表再写类，列出当前状态、事件、条件、动作与目标状态。若只把原有 if 移进多个类，却允许任何地方随意赋值状态，约束并没有增强。封装转移入口和拒绝非法事件，才是可观察的设计改进。</BookParagraph>
    </div>),
  },
  {
    label: '边界转换与包装',
    left: (<div className="space-y-4">
      <PageTitle>适配器保护业务词汇</PageTitle>
      <BookParagraph>旧仓库返回 sku_code、available_count，新订单模块需要 productId、可售数量。适配器不仅改字段名，还要确认数量包含已预留库存没有、缺货返回零还是报错。业务只依赖 StockPort，适配器实现端口并转换旧协议，避免每个调用点重复理解旧系统的特殊值。</BookParagraph>
      <BookParagraph>例如旧系统用负一表示“尚未同步”，直接取最大值零会把未知误报为缺货。正确做法是返回显式的未知结果，或抛出应用层能识别的暂不可用错误。测试要覆盖正常数量、零、未知和格式错误，证明语义转换成立，而不是只断言方法被调用一次。</BookParagraph>
      <SectionTitle>装饰器的顺序会改变结果</SectionTitle>
      <BookParagraph>日志包装缓存时，每次查询都有日志；缓存包装日志时，命中缓存不会进入日志层。重试包装支付时还可能重复产生副作用，因此只在支付接口有幂等保障时才可重试。画出“外层调用→内层调用→结果返回”的时序，就能解释这些差异。</BookParagraph>
    </div>),
    right: (<div className="space-y-4">
      <SectionTitle>可运行的最小策略实验</SectionTitle>
      <BookParagraph>下面是独立 JavaScript 示例，可用 Node 运行。输入重量按整千克向上计费，内部货币单位为分；它只验证纯计算，不包含物流报价、网络请求与跨币种换算。</BookParagraph>
      <BookCode language="javascript" code={`const delivery = kg => {
  if (!Number.isFinite(kg) || kg <= 0) throw Error('重量无效')
  return 800 + Math.max(0, Math.ceil(kg) - 1) * 200
}
const pickup = () => 0
const total = (goodsCents, kg, quote) => goodsCents + quote(kg)
console.assert(total(5000, 3, delivery) === 6200)
console.assert(total(5000, 3, pickup) === 5000)`} />
      <BookParagraph>将输入改为一点二千克，向上取整后运费为一千分，总额六千分；这使舍入规则成为可执行约定。若以后要求按半千克计费，仅替换报价策略；若同时改变商品税率，则应另建税费规则，避免把不相关的变化塞进同一个接口。</BookParagraph>
      <BookParagraph>支付策略原例只向控制台输出，说明可替换关系，不代表完成支付。真实策略应表达成功、失败和结果未知，并保留幂等编号；否则上层结算虽看似不依赖渠道，却仍无法正确处理渠道的失败语义。</BookParagraph>
    </div>),
  },
  {
    label: '通知与模式边界',
    left: (<div className="space-y-4">
      <PageTitle>观察者如何管理生命周期</PageTitle>
      <BookParagraph>编辑器里文档改变后，字数面板、自动保存和预览都需要更新。文档对象只发布变化事件，观察者订阅并各自更新，避免文档直接依赖三个界面组件。关闭面板必须退订，否则旧监听器持续持有界面对象；反复打开面板还可能一次变化触发多次保存。</BookParagraph>
      <BookParagraph>通知期间某个监听器退订另一个监听器，会改变原数组遍历。可以先复制当前监听器列表形成一次发布快照，并明确本轮是否仍通知已退订对象。还要决定异常是逐个捕获继续还是立即中断，异步监听是否等待；这些都属于事件总线的契约，不能只用“一对多”概括。</BookParagraph>
      <BookParagraph>测试可记录调用序列：订阅甲乙后发布，两者各执行一次；退订甲再发布，仅乙执行；重复订阅甲时按约定去重或允许重复。若事件必须在程序退出后补发，进程内观察者已经不够，需要持久消息机制和消费者去重。</BookParagraph>
    </div>),
    right: (<div className="space-y-4">
      <SectionTitle>模式组合也有成本</SectionTitle>
      <BookParagraph>报表导出可以由工厂按格式创建导出器，以策略处理行格式，以装饰器添加耗时统计。先画实际对象链，确认每层有独立变化理由；不要把整个应用的对象创建都藏进全局工厂，否则依赖难以发现、测试难以替换，新增模式反而削弱可读性。</BookParagraph>
      <BookParagraph>里氏替换可用可观察行为检查：若某个存储实现承诺保存成功后立即可读，另一个实现却返回旧值，即使方法签名相同也未满足同一契约。需要修改接口语义或提供一致性选项，不能仅凭 implements 关键字宣布两个实现可替换。</BookParagraph>
      <BookParagraph>练习：给策略实验增加满额包邮，但规定自提不参与优惠。先比较“选择策略前判断”与“包装普通配送策略”两种方案，再写刚好达到门槛和差一分的用例。参考结果应把优惠条件放在清晰的一处，并解释包装顺序如何影响最终价格。</BookParagraph>
    </div>),
  },
]

export default function DesignPatternsPage() { return <LessonLayout meta={META} spreads={SPREADS} /> }
