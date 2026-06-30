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
          使开发者可以复用成功的设计经验，而不必重复发明轮子。
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
          <b>S - 单一职责：</b>一个类只做一件事
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
          确保一个类只有一个实例，并提供全局访问点。常用于配置管理、连接池、日志记录等场景。
        </BookParagraph>
        <BookCode language="typescript" code={`// 线程安全的单例模式
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
    console.log(\`使用支付宝支付：¥\${amount}\`)
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
          定义一对多依赖关系，当一个对象状态变化时，所有依赖它的对象都得到通知。适用于事件驱动系统。
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
        <BookParagraph>动态给对象添加新功能，比继承更灵活。适用于增强功能的场景。</BookParagraph>
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
]

export default function DesignPatternsPage() { return <LessonLayout meta={META} spreads={SPREADS} /> }
