'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import {
  PageTitle,
  SectionTitle,
  BookParagraph,
  BookCode,
  BookAlert,
  BookList,
} from '@shared/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '软件工程',
  chapterTitle: '常用设计模式',
  chapterNumber: 3,
  totalChapters: 5,
  subjectHref: '/study/se/architecture-design',
  prevChapter: { label: '主流架构风格', href: '/study/se/architecture-design/styles' },
  nextChapter: { label: '架构与设计模式实战', href: '/study/se/architecture-design/practice' },
  theme: THEMES.software,
}

const singletonCode = `// 单例模式 - 确保一个类只有一个实例
public class Singleton {
    private static Singleton instance;
    private Singleton() {}

    public static synchronized Singleton getInstance() {
        if (instance == null) {
            instance = new Singleton();
        }
        return instance;
    }
}`

const factoryMethodCode = `// 工厂方法模式 - 定义创建对象的接口
public interface Product {
    void operation();
}

public abstract class Creator {
    public abstract Product factoryMethod();
}

public class ConcreteCreator extends Creator {
    public Product factoryMethod() {
        return new ConcreteProduct();
    }
}`

const abstractFactoryCode = `// 抽象工厂模式 - 创建相关对象家族
public interface AbstractFactory {
    ProductA createProductA();
    ProductB createProductB();
}

public class ConcreteFactory implements AbstractFactory {
    public ProductA createProductA() {
        return new ConcreteProductA();
    }

    public ProductB createProductB() {
        return new ConcreteProductB();
    }
}`

const builderCode = `// 建造者模式 - 分离构建与表示
public class Product {
    private String partA;
    private String partB;

    public void setPartA(String partA) { this.partA = partA; }
    public void setPartB(String partB) { this.partB = partB; }
}

public interface Builder {
    void buildPartA();
    void buildPartB();
    Product getResult();
}`

const prototypeCode = `// 原型模式 - 通过拷贝创建新对象
public abstract class Prototype implements Cloneable {
    public Object clone() throws CloneNotSupportedException {
        return super.clone();
    }
}

public class ConcretePrototype extends Prototype {
    // 具体实现
}`

const adapterCode = `// 适配器模式 - 转换接口
public interface Target {
    void request();
}

public class Adaptee {
    public void specificRequest() { }
}

public class Adapter implements Target {
    private Adaptee adaptee;

    public Adapter(Adaptee adaptee) {
        this.adaptee = adaptee;
    }

    public void request() {
        adaptee.specificRequest();
    }
}`

const decoratorCode = `// 装饰器模式 - 动态添加职责
public interface Component {
    void operation();
}

public class ConcreteComponent implements Component {
    public void operation() { }
}

public abstract class Decorator implements Component {
    protected Component component;

    public Decorator(Component component) {
        this.component = component;
    }

    public void operation() {
        component.operation();
    }
}`

const proxyCode = `// 代理模式 - 控制访问
public interface Subject {
    void request();
}

public class RealSubject implements Subject {
    public void request() { }
}

public class Proxy implements Subject {
    private RealSubject realSubject;

    public void request() {
        if (realSubject == null) {
            realSubject = new RealSubject();
        }
        realSubject.request();
    }
}`

const observerCode = `// 观察者模式 - 一对多依赖
public interface Observer {
    void update();
}

public class Subject {
    private List<Observer> observers = new ArrayList<>();

    public void attach(Observer observer) {
        observers.add(observer);
    }

    public void notifyObservers() {
        for (Observer observer : observers) {
            observer.update();
        }
    }
}`

const strategyCode = `// 策略模式 - 算法封装互换
public interface Strategy {
    void algorithmInterface();
}

public class Context {
    private Strategy strategy;

    public Context(Strategy strategy) {
        this.strategy = strategy;
    }

    public void contextInterface() {
        strategy.algorithmInterface();
    }
}`

const commandCode = `// 命令模式 - 请求封装为对象
public interface Command {
    void execute();
}

public class ConcreteCommand implements Command {
    private Receiver receiver;

    public ConcreteCommand(Receiver receiver) {
        this.receiver = receiver;
    }

    public void execute() {
        receiver.action();
    }
}`

const SPREADS = [
  // ===== 跨页 1: 设计模式概述 =====
  {
    label: '模式概述',
    left: (
      <div className="space-y-4">
        <PageTitle>设计模式概述</PageTitle>
        <BookParagraph>
          设计模式是软件开发中常见问题的可重用解决方案，它们是在特定场景下解决特定问题的经验总结。设计模式可以帮助我们写出更易维护、更易理解的代码。
        </BookParagraph>
        <SectionTitle>设计模式的分类</SectionTitle>
        <BookParagraph><b>创建型模式：</b>关注对象的创建过程，将创建与使用分离。包括单例模式、工厂方法模式、抽象工厂模式、建造者模式、原型模式。</BookParagraph>
        <BookParagraph><b>结构型模式：</b>关注类和对象的组合，描述如何将类或对象组合成更大的结构。包括适配器模式、桥接模式、组合模式、装饰器模式、外观模式、享元模式、代理模式。</BookParagraph>
        <BookParagraph><b>行为型模式：</b>关注对象之间的责任分配，描述对象之间如何协作。包括责任链模式、命令模式、解释器模式、迭代器模式、中介者模式、备忘录模式、观察者模式、状态模式、策略模式、模板方法模式、访问者模式。</BookParagraph>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>设计原则与适用场景</PageTitle>
        <SectionTitle>SOLID设计原则</SectionTitle>
        <BookList items={[
          '开闭原则（OCP）：软件实体应该对扩展开放，对修改关闭',
          '单一职责原则（SRP）：一个类应该只有一个引起它变化的原因',
          '里氏替换原则（LSP）：子类必须能够替换其父类',
          '接口隔离原则（ISP）：使用多个专门的接口比使用单个总接口要好',
          '依赖倒置原则（DIP）：高层模块不应该依赖低层模块，两者都应该依赖抽象',
        ]} />
        <SectionTitle>何时使用设计模式</SectionTitle>
        <BookList items={[
          '需要解决特定问题时',
          '需要提高代码复用性时',
          '需要提高代码可维护性时',
          '需要提高代码可扩展性时',
          '需要提高代码可测试性时',
        ]} />
        <SectionTitle>何时不使用设计模式</SectionTitle>
        <BookList items={[
          '过度设计时',
          '简单问题复杂化时',
          '团队不熟悉该模式时',
          '维护成本过高时',
          '性能要求极高时',
        ]} />
      </div>
    ),
  },

  // ===== 跨页 2: 创建型模式（上） =====
  {
    label: '创建型模式（上）',
    left: (
      <div className="space-y-4">
        <PageTitle>单例模式（Singleton）</PageTitle>
        <BookParagraph>确保一个类只有一个实例，并提供一个全局访问点。适用于需要全局唯一实例的场景，如配置管理器、数据库连接池、日志管理器。</BookParagraph>
        <BookCode language="java" code={singletonCode} />
        <SectionTitle>工厂方法模式（Factory Method）</SectionTitle>
        <BookParagraph>定义一个创建对象的接口，让子类决定实例化哪个类。将对象的创建延迟到子类，使系统更加灵活。</BookParagraph>
        <BookCode language="java" code={factoryMethodCode} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>抽象工厂模式（Abstract Factory）</PageTitle>
        <BookParagraph>提供一个创建一系列相关或相互依赖对象的接口，而无需指定它们具体的类。适用于需要创建一组相关产品对象的场景。</BookParagraph>
        <BookCode language="java" code={abstractFactoryCode} />
        <SectionTitle>建造者模式（Builder）</SectionTitle>
        <BookParagraph>将一个复杂对象的构建与它的表示分离，使同样的构建过程可以创建不同的表示。适用于构造过程稳定的复杂对象创建。</BookParagraph>
        <BookCode language="java" code={builderCode} />
      </div>
    ),
  },

  // ===== 跨页 3: 创建型模式（下）+ 结构型模式（上） =====
  {
    label: '创建型与结构型',
    left: (
      <div className="space-y-4">
        <PageTitle>原型模式（Prototype）</PageTitle>
        <BookParagraph>用原型实例指定创建对象的种类，并通过拷贝这些原型创建新的对象。适用于对象创建成本较高，且对象间差异不大的场景。</BookParagraph>
        <BookCode language="java" code={prototypeCode} />
        <BookAlert type="info" message="创建型模式的核心思想：将对象的创建与使用分离，使系统不依赖于具体类的实例化过程，提高系统的灵活性和可扩展性。" />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>适配器模式（Adapter）</PageTitle>
        <BookParagraph>将一个类的接口转换成客户希望的另外一个接口。适配器模式使原本因接口不兼容而不能一起工作的类可以协同工作。</BookParagraph>
        <BookCode language="java" code={adapterCode} />
        <SectionTitle>装饰器模式（Decorator）</SectionTitle>
        <BookParagraph>动态地给一个对象添加一些额外的职责。就增加功能来说，装饰器模式比生成子类更加灵活，可以在运行时动态添加功能。</BookParagraph>
        <BookCode language="java" code={decoratorCode} />
      </div>
    ),
  },

  // ===== 跨页 4: 结构型模式（下）+ 行为型模式（上） =====
  {
    label: '结构型与行为型',
    left: (
      <div className="space-y-4">
        <PageTitle>代理模式（Proxy）</PageTitle>
        <BookParagraph>为其他对象提供一种代理以控制对这个对象的访问。常用于延迟加载、访问控制、日志记录等场景。</BookParagraph>
        <BookCode language="java" code={proxyCode} />
        <BookAlert type="info" message="结构型模式的核心思想：通过组合类和对象来形成更大的结构，在保证灵活性的同时，提高代码的复用性和可维护性。" />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>观察者模式（Observer）</PageTitle>
        <BookParagraph>定义对象间的一种一对多依赖关系，使得每当一个对象改变状态，所有依赖于它的对象都会得到通知并被自动更新。常用于事件驱动系统、消息通知、数据绑定等场景。</BookParagraph>
        <BookCode language="java" code={observerCode} />
        <SectionTitle>策略模式（Strategy）</SectionTitle>
        <BookParagraph>定义一系列算法，将每一个算法封装起来，并使它们可以互换。适用于需要在不同情况下使用不同算法的场景。</BookParagraph>
        <BookCode language="java" code={strategyCode} />
      </div>
    ),
  },

  // ===== 跨页 5: 行为型模式（下）+ 实战应用 =====
  {
    label: '行为型与实战',
    left: (
      <div className="space-y-4">
        <PageTitle>命令模式（Command）</PageTitle>
        <BookParagraph>将一个请求封装为一个对象，从而使你可用不同的请求对客户进行参数化。支持请求排队、记录日志、撤销操作等。</BookParagraph>
        <BookCode language="java" code={commandCode} />
        <BookAlert type="info" message="行为型模式的核心思想：识别对象之间的通信模式，合理分配职责，使得对象之间的协作更加灵活和可维护。" />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>实战应用场景</PageTitle>
        <SectionTitle>Web应用开发</SectionTitle>
        <BookList items={[
          'MVC架构中的观察者模式',
          '数据库连接池中的单例模式',
          '表单验证中的策略模式',
          '日志记录中的装饰器模式',
        ]} />
        <SectionTitle>移动应用开发</SectionTitle>
        <BookList items={[
          'UI组件中的组合模式',
          '事件处理中的命令模式',
          '数据缓存中的代理模式',
          '状态管理中的状态模式',
        ]} />
        <SectionTitle>最佳实践</SectionTitle>
        <BookList items={[
          '理解模式背后的设计原则',
          '根据实际需求选择合适的模式',
          '避免过度使用设计模式',
          '保持代码的简洁性和可读性',
          '考虑模式的可维护性和扩展性',
        ]} />
        <SectionTitle>常见陷阱</SectionTitle>
        <BookList items={[
          '过度设计，使用不必要的模式',
          '生搬硬套，不考虑实际场景',
          '忽视性能影响',
          '增加代码复杂度',
          '维护成本过高',
        ]} />
      </div>
    ),
  },
]

export default function DesignPatternsPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
