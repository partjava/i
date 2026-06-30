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
          模型帮助开发团队更好地理解复杂系统，降低开发风险，提高软件质量。
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
          <b>UML（统一建模语言）：</b>业界标准的建模语言，提供13种图形用于不同类型的建模。
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
        <BookParagraph>以下示例展示面向对象建模中的类设计，包含用户、订单和商品三个核心实体。</BookParagraph>
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
    if (this.stock >= quantity) {
      this.stock -= quantity
    }
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
    this.items.push(new OrderItem(product, quantity))
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
    public product: Product,
    public quantity: number
  ) {}

  subtotal(): number {
    return this.product.price * this.quantity
  }
}`} />
        <TagGrid items={['类图', '关联', '聚合', '封装', '实体']} />
      </div>
    ),
  },
]

export default function ModelingBasicPage() { return <LessonLayout meta={META} spreads={SPREADS} /> }
