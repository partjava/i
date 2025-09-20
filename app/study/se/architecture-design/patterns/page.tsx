'use client';
import React, { useState } from 'react';
import Link from 'next/link';

const tabList = [
  { key: 'overview', label: '概述' },
  { key: 'creational', label: '创建型模式' },
  { key: 'structural', label: '结构型模式' },
  { key: 'behavioral', label: '行为型模式' },
  { key: 'practice', label: '实战应用' },
];

export default function DesignPatternsPage() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">常用设计模式</h1>
      {/* 顶部tab导航 */}
      <div className="flex space-x-4 mb-6 border-b overflow-x-auto">
        {tabList.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 font-medium whitespace-nowrap ${activeTab === tab.key ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="bg-white rounded-lg shadow-md p-6 min-h-[320px]">
        {activeTab === 'overview' && (
          <section>
            <h2 className="text-2xl font-semibold mb-4">设计模式概述</h2>
            <div className="prose max-w-none">
              <p>设计模式是软件开发中常见问题的可重用解决方案，它们是在特定场景下解决特定问题的经验总结。设计模式可以帮助我们写出更易维护、更易理解的代码。</p>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">设计模式的分类</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">创建型模式</h4>
                  <ul className="list-disc pl-5 text-gray-600">
                    <li>单例模式（Singleton）</li>
                    <li>工厂方法模式（Factory Method）</li>
                    <li>抽象工厂模式（Abstract Factory）</li>
                    <li>建造者模式（Builder）</li>
                    <li>原型模式（Prototype）</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">结构型模式</h4>
                  <ul className="list-disc pl-5 text-gray-600">
                    <li>适配器模式（Adapter）</li>
                    <li>桥接模式（Bridge）</li>
                    <li>组合模式（Composite）</li>
                    <li>装饰器模式（Decorator）</li>
                    <li>外观模式（Facade）</li>
                    <li>享元模式（Flyweight）</li>
                    <li>代理模式（Proxy）</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">行为型模式</h4>
                  <ul className="list-disc pl-5 text-gray-600">
                    <li>责任链模式（Chain of Responsibility）</li>
                    <li>命令模式（Command）</li>
                    <li>解释器模式（Interpreter）</li>
                    <li>迭代器模式（Iterator）</li>
                    <li>中介者模式（Mediator）</li>
                    <li>备忘录模式（Memento）</li>
                    <li>观察者模式（Observer）</li>
                    <li>状态模式（State）</li>
                    <li>策略模式（Strategy）</li>
                    <li>模板方法模式（Template Method）</li>
                    <li>访问者模式（Visitor）</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-xl font-semibold mt-6 mb-3">设计模式的原则</h3>
              <ul className="list-disc pl-6">
                <li><b>开闭原则（OCP）</b>：软件实体应该对扩展开放，对修改关闭。</li>
                <li><b>单一职责原则（SRP）</b>：一个类应该只有一个引起它变化的原因。</li>
                <li><b>里氏替换原则（LSP）</b>：子类必须能够替换其父类。</li>
                <li><b>接口隔离原则（ISP）</b>：使用多个专门的接口比使用单个总接口要好。</li>
                <li><b>依赖倒置原则（DIP）</b>：高层模块不应该依赖低层模块，两者都应该依赖抽象。</li>
              </ul>

              <h3 className="text-xl font-semibold mt-6 mb-3">设计模式的应用场景</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">何时使用设计模式</h4>
                  <ul className="list-disc pl-5 text-gray-600">
                    <li>需要解决特定问题时</li>
                    <li>需要提高代码复用性时</li>
                    <li>需要提高代码可维护性时</li>
                    <li>需要提高代码可扩展性时</li>
                    <li>需要提高代码可测试性时</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">何时不使用设计模式</h4>
                  <ul className="list-disc pl-5 text-gray-600">
                    <li>过度设计时</li>
                    <li>简单问题复杂化时</li>
                    <li>团队不熟悉该模式时</li>
                    <li>维护成本过高时</li>
                    <li>性能要求极高时</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        )}

        {activeTab === 'creational' && (
          <section>
            <h2 className="text-2xl font-semibold mb-4">创建型模式</h2>
            <div className="prose max-w-none">
              <p>创建型模式关注对象的创建过程，它们将对象的创建与使用分离，使系统更加灵活。</p>

              <h3 className="text-xl font-semibold mt-6 mb-3">单例模式（Singleton）</h3>
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <p className="mb-2">确保一个类只有一个实例，并提供一个全局访问点。</p>
                <pre className="bg-gray-100 p-4 rounded text-xs overflow-x-auto">
{`// Java示例
public class Singleton {
    private static Singleton instance;
    private Singleton() {}
    
    public static synchronized Singleton getInstance() {
        if (instance == null) {
            instance = new Singleton();
        }
        return instance;
    }
}`}
                </pre>
              </div>

              <h3 className="text-xl font-semibold mt-6 mb-3">工厂方法模式（Factory Method）</h3>
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <p className="mb-2">定义一个创建对象的接口，让子类决定实例化哪个类。</p>
                <pre className="bg-gray-100 p-4 rounded text-xs overflow-x-auto">
{`// Java示例
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
}`}
                </pre>
              </div>

              <h3 className="text-xl font-semibold mt-6 mb-3">抽象工厂模式（Abstract Factory）</h3>
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <p className="mb-2">提供一个创建一系列相关或相互依赖对象的接口，而无需指定它们具体的类。</p>
                <pre className="bg-gray-100 p-4 rounded text-xs overflow-x-auto">
{`// Java示例
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
}`}
                </pre>
              </div>

              <h3 className="text-xl font-semibold mt-6 mb-3">建造者模式（Builder）</h3>
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <p className="mb-2">将一个复杂对象的构建与它的表示分离，使同样的构建过程可以创建不同的表示。</p>
                <pre className="bg-gray-100 p-4 rounded text-xs overflow-x-auto">
{`// Java示例
public class Product {
    private String partA;
    private String partB;
    
    public void setPartA(String partA) {
        this.partA = partA;
    }
    
    public void setPartB(String partB) {
        this.partB = partB;
    }
}

public interface Builder {
    void buildPartA();
    void buildPartB();
    Product getResult();
}`}
                </pre>
              </div>

              <h3 className="text-xl font-semibold mt-6 mb-3">原型模式（Prototype）</h3>
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <p className="mb-2">用原型实例指定创建对象的种类，并通过拷贝这些原型创建新的对象。</p>
                <pre className="bg-gray-100 p-4 rounded text-xs overflow-x-auto">
{`// Java示例
public abstract class Prototype implements Cloneable {
    public Object clone() throws CloneNotSupportedException {
        return super.clone();
    }
}

public class ConcretePrototype extends Prototype {
    // 具体实现
}`}
                </pre>
              </div>
            </div>
          </section>
        )}

        {activeTab === 'structural' && (
          <section>
            <h2 className="text-2xl font-semibold mb-4">结构型模式</h2>
            <div className="prose max-w-none">
              <p>结构型模式关注类和对象的组合，它们描述如何将类或对象组合在一起形成更大的结构。</p>

              <h3 className="text-xl font-semibold mt-6 mb-3">适配器模式（Adapter）</h3>
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <p className="mb-2">将一个类的接口转换成客户希望的另外一个接口。</p>
                <pre className="bg-gray-100 p-4 rounded text-xs overflow-x-auto">
{`// Java示例
public interface Target {
    void request();
}

public class Adaptee {
    public void specificRequest() {
        // 具体实现
    }
}

public class Adapter implements Target {
    private Adaptee adaptee;
    
    public Adapter(Adaptee adaptee) {
        this.adaptee = adaptee;
    }
    
    public void request() {
        adaptee.specificRequest();
    }
}`}
                </pre>
              </div>

              <h3 className="text-xl font-semibold mt-6 mb-3">装饰器模式（Decorator）</h3>
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <p className="mb-2">动态地给一个对象添加一些额外的职责。</p>
                <pre className="bg-gray-100 p-4 rounded text-xs overflow-x-auto">
{`// Java示例
public interface Component {
    void operation();
}

public class ConcreteComponent implements Component {
    public void operation() {
        // 具体实现
    }
}

public abstract class Decorator implements Component {
    protected Component component;
    
    public Decorator(Component component) {
        this.component = component;
    }
    
    public void operation() {
        component.operation();
    }
}`}
                </pre>
              </div>

              <h3 className="text-xl font-semibold mt-6 mb-3">代理模式（Proxy）</h3>
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <p className="mb-2">为其他对象提供一种代理以控制对这个对象的访问。</p>
                <pre className="bg-gray-100 p-4 rounded text-xs overflow-x-auto">
{`// Java示例
public interface Subject {
    void request();
}

public class RealSubject implements Subject {
    public void request() {
        // 具体实现
    }
}

public class Proxy implements Subject {
    private RealSubject realSubject;
    
    public void request() {
        if (realSubject == null) {
            realSubject = new RealSubject();
        }
        realSubject.request();
    }
}`}
                </pre>
              </div>
            </div>
          </section>
        )}

        {activeTab === 'behavioral' && (
          <section>
            <h2 className="text-2xl font-semibold mb-4">行为型模式</h2>
            <div className="prose max-w-none">
              <p>行为型模式关注对象之间的责任分配，它们描述对象之间如何协作完成单个对象无法完成的任务。</p>

              <h3 className="text-xl font-semibold mt-6 mb-3">观察者模式（Observer）</h3>
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <p className="mb-2">定义对象间的一种一对多依赖关系，使得每当一个对象改变状态，则所有依赖于它的对象都会得到通知并被自动更新。</p>
                <pre className="bg-gray-100 p-4 rounded text-xs overflow-x-auto">
{`// Java示例
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
}`}
                </pre>
              </div>

              <h3 className="text-xl font-semibold mt-6 mb-3">策略模式（Strategy）</h3>
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <p className="mb-2">定义一系列算法，将每一个算法封装起来，并使它们可以互换。</p>
                <pre className="bg-gray-100 p-4 rounded text-xs overflow-x-auto">
{`// Java示例
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
}`}
                </pre>
              </div>

              <h3 className="text-xl font-semibold mt-6 mb-3">命令模式（Command）</h3>
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <p className="mb-2">将一个请求封装为一个对象，从而使你可用不同的请求对客户进行参数化。</p>
                <pre className="bg-gray-100 p-4 rounded text-xs overflow-x-auto">
{`// Java示例
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
}`}
                </pre>
              </div>
            </div>
          </section>
        )}

        {activeTab === 'practice' && (
          <section>
            <h2 className="text-2xl font-semibold mb-4">设计模式实战应用</h2>
            <div className="prose max-w-none">
              <h3 className="text-xl font-semibold mt-6 mb-3">常见应用场景</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">Web应用开发</h4>
                  <ul className="list-disc pl-5 text-gray-600">
                    <li>MVC架构中的观察者模式</li>
                    <li>数据库连接池中的单例模式</li>
                    <li>表单验证中的策略模式</li>
                    <li>日志记录中的装饰器模式</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">移动应用开发</h4>
                  <ul className="list-disc pl-5 text-gray-600">
                    <li>UI组件中的组合模式</li>
                    <li>事件处理中的命令模式</li>
                    <li>数据缓存中的代理模式</li>
                    <li>状态管理中的状态模式</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-xl font-semibold mt-6 mb-3">最佳实践</h3>
              <ul className="list-disc pl-6">
                <li>理解模式背后的设计原则</li>
                <li>根据实际需求选择合适的模式</li>
                <li>避免过度使用设计模式</li>
                <li>保持代码的简洁性和可读性</li>
                <li>考虑模式的可维护性和扩展性</li>
              </ul>

              <h3 className="text-xl font-semibold mt-6 mb-3">常见陷阱</h3>
              <ul className="list-disc pl-6">
                <li>过度设计，使用不必要的模式</li>
                <li>生搬硬套，不考虑实际场景</li>
                <li>忽视性能影响</li>
                <li>增加代码复杂度</li>
                <li>维护成本过高</li>
              </ul>
            </div>
          </section>
        )}
      </div>
      {/* 底部导航栏 */}
      <div className="mt-8 flex justify-between">
        <Link href="/study/se/architecture-design/styles" className="px-4 py-2 text-blue-600 hover:text-blue-800">← 主流架构风格</Link>
        <Link href="/study/se/architecture-design/practice" className="px-4 py-2 text-blue-600 hover:text-blue-800">架构与设计模式实战 →</Link>
      </div>
    </div>
  );
} 