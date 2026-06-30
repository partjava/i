'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import {
  PageTitle,
  SectionTitle,
  BookParagraph,
  BookAlert,
  BookList,
} from '@shared/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '软件工程',
  chapterTitle: '常见面试题与答疑',
  chapterNumber: 5,
  totalChapters: 5,
  subjectHref: '/study/se/architecture-design',
  prevChapter: { label: '架构与设计模式实战', href: '/study/se/architecture-design/practice' },
  theme: THEMES.software,
}

const SPREADS = [
  // ===== 跨页 1: 架构设计面试题 =====
  {
    label: '架构面试题',
    left: (
      <div className="space-y-4">
        <PageTitle>架构设计面试题</PageTitle>
        <SectionTitle>1. 什么是软件架构？如何设计一个好的软件架构？</SectionTitle>
        <BookParagraph>软件架构是软件系统的高级结构，它定义了系统的组织方式、组件之间的关系以及设计原则。</BookParagraph>
        <BookParagraph><b>设计好的软件架构需要考虑：</b></BookParagraph>
        <BookList items={[
          '可扩展性：系统能够方便地扩展新功能',
          '可维护性：系统易于理解和修改',
          '可测试性：系统易于进行单元测试和集成测试',
          '性能：系统能够满足性能需求',
          '安全性：系统具有必要的安全保护措施',
          '可用性：系统具有高可用性和容错能力',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>架构面试题（续）</PageTitle>
        <SectionTitle>2. 常见的软件架构模式有哪些？</SectionTitle>
        <BookParagraph><b>分层架构：</b>结构清晰，职责分明；缺点：层间耦合，性能开销；适用企业级应用。</BookParagraph>
        <BookParagraph><b>微服务架构：</b>服务独立，易于扩展；缺点：分布式复杂性；适用大型分布式系统。</BookParagraph>
        <BookParagraph><b>事件驱动架构：</b>松耦合，高响应性；缺点：事件追踪困难；适用实时系统。</BookParagraph>
        <BookParagraph><b>领域驱动设计：</b>业务模型清晰；缺点：学习成本高；适用复杂业务系统。</BookParagraph>
        <SectionTitle>3. 如何评估软件架构的好坏？</SectionTitle>
        <BookList items={[
          '功能性：是否满足所有功能需求',
          '质量属性：性能、安全、可用性等',
          '可维护性：代码结构、文档完整性',
          '可扩展性：是否易于添加新功能',
          '技术选型：是否选择了合适的技术栈',
          '成本效益：开发维护成本是否合理',
        ]} />
      </div>
    ),
  },

  // ===== 跨页 2: 设计模式面试题 =====
  {
    label: '模式面试题',
    left: (
      <div className="space-y-4">
        <PageTitle>设计模式面试题</PageTitle>
        <SectionTitle>1. 什么是设计模式？为什么要使用设计模式？</SectionTitle>
        <BookParagraph>设计模式是软件开发中常见问题的可重用解决方案，它们是在特定场景下解决特定问题的经验总结。</BookParagraph>
        <BookParagraph><b>使用设计模式的好处：</b></BookParagraph>
        <BookList items={[
          '提高代码复用性',
          '提高代码可维护性',
          '提高代码可扩展性',
          '提高代码可读性',
          '降低代码耦合度',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>设计模式面试题（续）</PageTitle>
        <SectionTitle>2. 设计模式分为哪几类？</SectionTitle>
        <BookParagraph><b>创建型模式：</b>关注对象创建，隐藏创建细节，提高系统灵活性。包括单例模式、工厂方法模式、抽象工厂模式、建造者模式、原型模式。</BookParagraph>
        <BookParagraph><b>结构型模式：</b>关注类和对象组合，优化系统结构，提高扩展性。包括适配器模式、桥接模式、组合模式、装饰器模式、外观模式、享元模式、代理模式。</BookParagraph>
        <BookParagraph><b>行为型模式：</b>关注对象间通信，优化职责分配，提高灵活性。包括观察者模式、策略模式、命令模式、状态模式、模板方法模式等11种。</BookParagraph>
        <SectionTitle>3. 如何选择合适的设计模式？</SectionTitle>
        <BookList items={[
          '问题类型：明确要解决的具体问题',
          '系统需求：考虑系统的功能和非功能需求',
          '团队能力：评估团队对模式的熟悉程度',
          '维护成本：考虑模式的实现和维护成本',
          '性能影响：评估模式对系统性能的影响',
        ]} />
      </div>
    ),
  },

  // ===== 跨页 3: 设计原则面试题 =====
  {
    label: '原则面试题',
    left: (
      <div className="space-y-4">
        <PageTitle>设计原则面试题</PageTitle>
        <SectionTitle>1. SOLID原则是什么？</SectionTitle>
        <BookParagraph><b>单一职责原则（SRP）：</b>一个类应该只有一个引起它变化的原因。每个类只负责一项职责，避免职责混杂导致难以维护。</BookParagraph>
        <BookParagraph><b>开闭原则（OCP）：</b>软件实体应该对扩展开放，对修改关闭。通过抽象和接口实现，在不修改现有代码的情况下扩展功能。</BookParagraph>
        <BookParagraph><b>里氏替换原则（LSP）：</b>子类必须能够替换其父类。子类应该保持父类的行为约定，不能改变父类的原有语义。</BookParagraph>
        <BookParagraph><b>接口隔离原则（ISP）：</b>使用多个专门的接口比使用单个总接口要好。客户端不应该依赖它不需要的接口。</BookParagraph>
        <BookParagraph><b>依赖倒置原则（DIP）：</b>高层模块不应该依赖低层模块，两者都应该依赖抽象。抽象不应该依赖细节，细节应该依赖抽象。</BookParagraph>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>设计原则面试题（续）</PageTitle>
        <SectionTitle>2. 如何在项目中应用这些设计原则？</SectionTitle>
        <BookList items={[
          '代码审查：定期进行代码审查，确保遵循设计原则',
          '重构：持续重构代码，消除违反原则的地方',
          '培训：对团队成员进行设计原则培训',
          '工具：使用静态代码分析工具检查代码质量',
          '文档：建立设计原则文档和最佳实践指南',
        ]} />
        <SectionTitle>3. 设计原则和设计模式的关系是什么？</SectionTitle>
        <BookList items={[
          '设计原则是指导思想，设计模式是具体实现',
          '设计模式通常遵循一个或多个设计原则',
          '设计原则帮助我们评估设计模式的使用是否合理',
          '设计模式帮助我们实现设计原则的要求',
        ]} />
        <BookAlert type="info" message="SOLID原则是面向对象设计的基石，熟练掌握这些原则能够帮助开发者在日常编码中做出更好的设计决策。" />
      </div>
    ),
  },

  // ===== 跨页 4: 实战问题 =====
  {
    label: '实战问题',
    left: (
      <div className="space-y-4">
        <PageTitle>实战问题</PageTitle>
        <SectionTitle>1. 如何处理设计模式过度使用的问题？</SectionTitle>
        <BookList items={[
          '遵循YAGNI原则（You Aren\'t Gonna Need It）',
          '保持代码简单，避免过度设计',
          '根据实际需求选择合适的设计模式',
          '定期进行代码重构和优化',
          '建立代码审查机制',
        ]} />
        <SectionTitle>2. 如何平衡架构设计的灵活性和复杂性？</SectionTitle>
        <BookList items={[
          '根据项目规模和复杂度选择合适的架构',
          '采用渐进式架构设计方法',
          '保持架构的简单性和可理解性',
          '在必要时才引入复杂性',
          '持续评估和调整架构设计',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>实战问题（续）</PageTitle>
        <SectionTitle>3. 如何处理架构演进过程中的技术债务？</SectionTitle>
        <BookList items={[
          '建立技术债务清单',
          '制定优先级和修复计划',
          '在迭代中逐步解决技术债务',
          '建立预防技术债务的机制',
          '定期进行架构评估和重构',
        ]} />
        <BookAlert type="warning" message="技术债务是架构演进中不可避免的问题。关键在于持续管理和逐步偿还，而不是一味追求完美的架构设计。好的架构是演进而来的，不是一次性设计出来的。" />
      </div>
    ),
  },
]

export default function InterviewPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
