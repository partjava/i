'use client';
import React, { useState } from 'react';
import Link from 'next/link';

const tabList = [
  { key: 'overview', label: '概述' },
  { key: 'case1', label: '案例一：电商系统' },
  { key: 'case2', label: '案例二：支付系统' },
  { key: 'case3', label: '案例三：日志系统' },
  { key: 'case4', label: '案例四：缓存系统' },
];

export default function ArchitecturePracticePage() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">架构与设计模式实战</h1>
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
            <h2 className="text-2xl font-semibold mb-4">实战应用概述</h2>
            <div className="prose max-w-none">
              <p>在实际项目开发中，合理运用架构和设计模式可以帮助我们构建更加健壮、可维护的系统。本节将通过具体的案例，展示如何在实际项目中应用架构和设计模式。</p>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">实战案例特点</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">案例选择标准</h4>
                  <ul className="list-disc pl-5 text-gray-600">
                    <li>具有代表性的业务场景</li>
                    <li>包含多个设计模式的应用</li>
                    <li>体现架构设计思想</li>
                    <li>具有实际参考价值</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">学习要点</h4>
                  <ul className="list-disc pl-5 text-gray-600">
                    <li>架构设计思路</li>
                    <li>设计模式选择</li>
                    <li>代码实现细节</li>
                    <li>最佳实践总结</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        )}

        {activeTab === 'case1' && (
          <section>
            <h2 className="text-2xl font-semibold mb-4">案例一：电商系统</h2>
            <div className="prose max-w-none">
              <h3 className="text-xl font-semibold mt-6 mb-3">系统架构</h3>
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <p className="mb-2">采用分层架构，主要包含以下层次：</p>
                <ul className="list-disc pl-5 text-gray-600">
                  <li>表现层（Controller）</li>
                  <li>业务层（Service）</li>
                  <li>数据访问层（DAO）</li>
                  <li>领域模型层（Domain）</li>
                </ul>
              </div>

              <h3 className="text-xl font-semibold mt-6 mb-3">设计模式应用</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">订单模块</h4>
                  <ul className="list-disc pl-5 text-gray-600">
                    <li>工厂模式：创建订单对象</li>
                    <li>策略模式：支付方式选择</li>
                    <li>观察者模式：订单状态变更通知</li>
                    <li>命令模式：订单操作封装</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">商品模块</h4>
                  <ul className="list-disc pl-5 text-gray-600">
                    <li>单例模式：商品缓存管理</li>
                    <li>代理模式：商品图片加载</li>
                    <li>装饰器模式：商品信息扩展</li>
                    <li>组合模式：商品分类管理</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-xl font-semibold mt-6 mb-3">代码示例</h3>
              <pre className="bg-gray-100 p-4 rounded text-xs overflow-x-auto">
{`// 订单工厂示例
public class OrderFactory {
    public static Order createOrder(OrderType type) {
        switch (type) {
            case NORMAL:
                return new NormalOrder();
            case GROUP:
                return new GroupOrder();
            default:
                throw new IllegalArgumentException("Unknown order type");
        }
    }
}

// 支付策略示例
public interface PaymentStrategy {
    void pay(Order order);
}

public class AlipayStrategy implements PaymentStrategy {
    public void pay(Order order) {
        // 支付宝支付实现
    }
}

public class WechatPayStrategy implements PaymentStrategy {
    public void pay(Order order) {
        // 微信支付实现
    }
}`}
              </pre>
            </div>
          </section>
        )}

        {activeTab === 'case2' && (
          <section>
            <h2 className="text-2xl font-semibold mb-4">案例二：支付系统</h2>
            <div className="prose max-w-none">
              <h3 className="text-xl font-semibold mt-6 mb-3">系统架构</h3>
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <p className="mb-2">采用微服务架构，主要包含以下服务：</p>
                <ul className="list-disc pl-5 text-gray-600">
                  <li>支付网关服务</li>
                  <li>支付处理服务</li>
                  <li>账户服务</li>
                  <li>通知服务</li>
                </ul>
              </div>

              <h3 className="text-xl font-semibold mt-6 mb-3">设计模式应用</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">支付处理</h4>
                  <ul className="list-disc pl-5 text-gray-600">
                    <li>策略模式：支付方式选择</li>
                    <li>状态模式：支付状态管理</li>
                    <li>责任链模式：支付流程处理</li>
                    <li>模板方法模式：支付流程定义</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">系统集成</h4>
                  <ul className="list-disc pl-5 text-gray-600">
                    <li>适配器模式：第三方支付集成</li>
                    <li>外观模式：统一支付接口</li>
                    <li>代理模式：支付安全控制</li>
                    <li>观察者模式：支付结果通知</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-xl font-semibold mt-6 mb-3">代码示例</h3>
              <pre className="bg-gray-100 p-4 rounded text-xs overflow-x-auto">
{`// 支付状态管理示例
public abstract class PaymentState {
    protected PaymentContext context;
    
    public void setContext(PaymentContext context) {
        this.context = context;
    }
    
    public abstract void process();
}

public class PendingState extends PaymentState {
    public void process() {
        // 处理待支付状态
        context.setState(new ProcessingState());
    }
}

// 支付流程责任链示例
public abstract class PaymentHandler {
    protected PaymentHandler next;
    
    public void setNext(PaymentHandler handler) {
        this.next = handler;
    }
    
    public abstract void handle(PaymentRequest request);
}`}
              </pre>
            </div>
          </section>
        )}

        {activeTab === 'case3' && (
          <section>
            <h2 className="text-2xl font-semibold mb-4">案例三：日志系统</h2>
            <div className="prose max-w-none">
              <h3 className="text-xl font-semibold mt-6 mb-3">系统架构</h3>
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <p className="mb-2">采用分层架构，主要包含以下组件：</p>
                <ul className="list-disc pl-5 text-gray-600">
                  <li>日志收集器</li>
                  <li>日志处理器</li>
                  <li>日志存储</li>
                  <li>日志分析</li>
                </ul>
              </div>

              <h3 className="text-xl font-semibold mt-6 mb-3">设计模式应用</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">日志处理</h4>
                  <ul className="list-disc pl-5 text-gray-600">
                    <li>装饰器模式：日志格式化</li>
                    <li>策略模式：日志存储策略</li>
                    <li>观察者模式：日志事件通知</li>
                    <li>工厂模式：日志处理器创建</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">系统集成</h4>
                  <ul className="list-disc pl-5 text-gray-600">
                    <li>适配器模式：第三方日志集成</li>
                    <li>代理模式：日志访问控制</li>
                    <li>单例模式：日志管理器</li>
                    <li>组合模式：日志过滤器</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-xl font-semibold mt-6 mb-3">代码示例</h3>
              <pre className="bg-gray-100 p-4 rounded text-xs overflow-x-auto">
{`// 日志装饰器示例
public abstract class LogDecorator implements Logger {
    protected Logger logger;
    
    public LogDecorator(Logger logger) {
        this.logger = logger;
    }
    
    public void log(String message) {
        logger.log(message);
    }
}

public class TimestampDecorator extends LogDecorator {
    public void log(String message) {
        String timestampedMessage = new Date() + ": " + message;
        super.log(timestampedMessage);
    }
}

// 日志存储策略示例
public interface LogStorageStrategy {
    void store(LogEntry entry);
}

public class FileStorageStrategy implements LogStorageStrategy {
    public void store(LogEntry entry) {
        // 文件存储实现
    }
}

public class DatabaseStorageStrategy implements LogStorageStrategy {
    public void store(LogEntry entry) {
        // 数据库存储实现
    }
}`}
              </pre>
            </div>
          </section>
        )}

        {activeTab === 'case4' && (
          <section>
            <h2 className="text-2xl font-semibold mb-4">案例四：缓存系统</h2>
            <div className="prose max-w-none">
              <h3 className="text-xl font-semibold mt-6 mb-3">系统架构</h3>
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <p className="mb-2">采用分层架构，主要包含以下组件：</p>
                <ul className="list-disc pl-5 text-gray-600">
                  <li>缓存管理器</li>
                  <li>缓存策略</li>
                  <li>缓存存储</li>
                  <li>缓存同步</li>
                </ul>
              </div>

              <h3 className="text-xl font-semibold mt-6 mb-3">设计模式应用</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">缓存管理</h4>
                  <ul className="list-disc pl-5 text-gray-600">
                    <li>单例模式：缓存管理器</li>
                    <li>策略模式：缓存淘汰策略</li>
                    <li>代理模式：缓存访问控制</li>
                    <li>工厂模式：缓存对象创建</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">系统集成</h4>
                  <ul className="list-disc pl-5 text-gray-600">
                    <li>适配器模式：多级缓存集成</li>
                    <li>观察者模式：缓存更新通知</li>
                    <li>装饰器模式：缓存功能扩展</li>
                    <li>命令模式：缓存操作封装</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-xl font-semibold mt-6 mb-3">代码示例</h3>
              <pre className="bg-gray-100 p-4 rounded text-xs overflow-x-auto">
{`// 缓存管理器示例
public class CacheManager {
    private static CacheManager instance;
    private Map<String, Object> cache;
    
    private CacheManager() {
        cache = new ConcurrentHashMap<>();
    }
    
    public static synchronized CacheManager getInstance() {
        if (instance == null) {
            instance = new CacheManager();
        }
        return instance;
    }
}

// 缓存策略示例
public interface EvictionStrategy {
    void evict(Cache cache);
}

public class LRUStrategy implements EvictionStrategy {
    public void evict(Cache cache) {
        // LRU淘汰实现
    }
}

public class LFUStrategy implements EvictionStrategy {
    public void evict(Cache cache) {
        // LFU淘汰实现
    }
}`}
              </pre>
            </div>
          </section>
        )}
      </div>
      {/* 底部导航栏 */}
      <div className="mt-8 flex justify-between">
        <Link href="/study/se/architecture-design/patterns" className="px-4 py-2 text-blue-600 hover:text-blue-800">← 常用设计模式</Link>
        <Link href="/study/se/architecture-design/interview" className="px-4 py-2 text-blue-600 hover:text-blue-800">常见面试题与答疑 →</Link>
      </div>
    </div>
  );
} 