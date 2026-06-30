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
  chapterTitle: '架构与设计模式实战',
  chapterNumber: 4,
  totalChapters: 5,
  subjectHref: '/study/se/architecture-design',
  prevChapter: { label: '常用设计模式', href: '/study/se/architecture-design/patterns' },
  nextChapter: { label: '常见面试题与答疑', href: '/study/se/architecture-design/interview' },
  theme: THEMES.software,
}

const ecommerceCode = `// 订单工厂示例
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
}`

const paymentCode = `// 支付状态管理示例
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
}`

const logCode = `// 日志装饰器示例
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
}`

const cacheCode = `// 缓存管理器示例
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
}`

const SPREADS = [
  // ===== 跨页 1: 实战应用概述 =====
  {
    label: '实战概述',
    left: (
      <div className="space-y-4">
        <PageTitle>实战应用概述</PageTitle>
        <BookParagraph>
          在实际项目开发中，合理运用架构和设计模式可以帮助我们构建更加健壮、可维护的系统。本节将通过具体的案例，展示如何在实际项目中应用架构和设计模式。
        </BookParagraph>
        <SectionTitle>案例选择标准</SectionTitle>
        <BookList items={[
          '具有代表性的业务场景',
          '包含多个设计模式的应用',
          '体现架构设计思想',
          '具有实际参考价值',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>学习要点</PageTitle>
        <BookList items={[
          '架构设计思路',
          '设计模式选择',
          '代码实现细节',
          '最佳实践总结',
        ]} />
        <BookAlert type="info" message="实战是最好的学习方式。通过具体案例深入理解架构与设计模式的应用，可以在实际工作中更快地做出合理的技术决策。" />
      </div>
    ),
  },

  // ===== 跨页 2: 案例一：电商系统 =====
  {
    label: '电商系统',
    left: (
      <div className="space-y-4">
        <PageTitle>案例一：电商系统</PageTitle>
        <SectionTitle>系统架构</SectionTitle>
        <BookParagraph>采用分层架构，主要包含以下层次：</BookParagraph>
        <BookList items={[
          '表现层（Controller）',
          '业务层（Service）',
          '数据访问层（DAO）',
          '领域模型层（Domain）',
        ]} />
        <SectionTitle>订单模块的设计模式</SectionTitle>
        <BookList items={[
          '工厂模式：创建订单对象',
          '策略模式：支付方式选择',
          '观察者模式：订单状态变更通知',
          '命令模式：订单操作封装',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>商品模块的设计模式</PageTitle>
        <BookList items={[
          '单例模式：商品缓存管理',
          '代理模式：商品图片加载',
          '装饰器模式：商品信息扩展',
          '组合模式：商品分类管理',
        ]} />
        <SectionTitle>代码示例</SectionTitle>
        <BookCode language="java" code={ecommerceCode} />
      </div>
    ),
  },

  // ===== 跨页 3: 案例二：支付系统 =====
  {
    label: '支付系统',
    left: (
      <div className="space-y-4">
        <PageTitle>案例二：支付系统</PageTitle>
        <SectionTitle>系统架构</SectionTitle>
        <BookParagraph>采用微服务架构，主要包含以下服务：</BookParagraph>
        <BookList items={[
          '支付网关服务',
          '支付处理服务',
          '账户服务',
          '通知服务',
        ]} />
        <SectionTitle>支付处理的设计模式</SectionTitle>
        <BookList items={[
          '策略模式：支付方式选择',
          '状态模式：支付状态管理',
          '责任链模式：支付流程处理',
          '模板方法模式：支付流程定义',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>系统集成的设计模式</PageTitle>
        <BookList items={[
          '适配器模式：第三方支付集成',
          '外观模式：统一支付接口',
          '代理模式：支付安全控制',
          '观察者模式：支付结果通知',
        ]} />
        <SectionTitle>代码示例</SectionTitle>
        <BookCode language="java" code={paymentCode} />
        <BookAlert type="info" message="支付系统对安全性、可靠性和一致性要求极高，合理运用状态模式和策略模式可以优雅地管理支付状态流转和支付方式的扩展。" />
      </div>
    ),
  },

  // ===== 跨页 4: 案例三：日志系统 =====
  {
    label: '日志系统',
    left: (
      <div className="space-y-4">
        <PageTitle>案例三：日志系统</PageTitle>
        <SectionTitle>系统架构</SectionTitle>
        <BookParagraph>采用分层架构，主要包含以下组件：</BookParagraph>
        <BookList items={[
          '日志收集器',
          '日志处理器',
          '日志存储',
          '日志分析',
        ]} />
        <SectionTitle>日志处理的设计模式</SectionTitle>
        <BookList items={[
          '装饰器模式：日志格式化',
          '策略模式：日志存储策略',
          '观察者模式：日志事件通知',
          '工厂模式：日志处理器创建',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>系统集成的设计模式</PageTitle>
        <BookList items={[
          '适配器模式：第三方日志集成',
          '代理模式：日志访问控制',
          '单例模式：日志管理器',
          '组合模式：日志过滤器',
        ]} />
        <SectionTitle>代码示例</SectionTitle>
        <BookCode language="java" code={logCode} />
        <BookAlert type="info" message="日志系统是每个应用的必备组件，通过装饰器模式可以灵活地为日志添加时间戳、日志级别等额外信息，策略模式则让日志存储方式可以随时切换。" />
      </div>
    ),
  },

  // ===== 跨页 5: 案例四：缓存系统 =====
  {
    label: '缓存系统',
    left: (
      <div className="space-y-4">
        <PageTitle>案例四：缓存系统</PageTitle>
        <SectionTitle>系统架构</SectionTitle>
        <BookParagraph>采用分层架构，主要包含以下组件：</BookParagraph>
        <BookList items={[
          '缓存管理器',
          '缓存策略',
          '缓存存储',
          '缓存同步',
        ]} />
        <SectionTitle>缓存管理的设计模式</SectionTitle>
        <BookList items={[
          '单例模式：缓存管理器',
          '策略模式：缓存淘汰策略',
          '代理模式：缓存访问控制',
          '工厂模式：缓存对象创建',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>系统集成的设计模式</PageTitle>
        <BookList items={[
          '适配器模式：多级缓存集成',
          '观察者模式：缓存更新通知',
          '装饰器模式：缓存功能扩展',
          '命令模式：缓存操作封装',
        ]} />
        <SectionTitle>代码示例</SectionTitle>
        <BookCode language="java" code={cacheCode} />
        <BookAlert type="info" message="缓存系统是提升应用性能的关键组件，单例模式确保缓存管理器全局唯一，策略模式让LRU、LFU等淘汰算法可以灵活切换。" />
      </div>
    ),
  },
]

export default function ArchitecturePracticePage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
