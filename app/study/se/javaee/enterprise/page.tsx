'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import {
  PageTitle,
  BookParagraph,
  BookCode,
  BookAlert,
  BookList,
  TagGrid,
} from '@shared/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '软件工程',
  chapterTitle: '企业级服务',
  chapterNumber: 5,
  totalChapters: 17,
  subjectHref: '/study/se/javaee',
  prevChapter: { label: '数据库访问技术', href: '/study/se/javaee/db' },
  nextChapter: { label: '安全与权限管理', href: '/study/se/javaee/security' },
  theme: THEMES.software,
}

const SPREADS = [
  {
    label: '概述',
    left: (
      <div className="space-y-4">
        <PageTitle>企业级服务概述</PageTitle>
        <BookParagraph>Jakarta EE（前身为JavaEE）企业级服务为构建高可靠、可扩展的企业应用提供全面支持。通过标准化的API和容器管理机制，简化分布式系统开发，涵盖事务处理、安全认证、消息通信、任务调度等核心功能。</BookParagraph>
        <h3 className="text-sm font-medium text-ink mt-4">核心服务</h3>
        <BookList items={[
          'Jakarta Transactions (JTA)：分布式事务管理',
          'Jakarta Security：声明式安全模型',
          'Jakarta Messaging (JMS)：异步消息传递',
          'Jakarta Concurrency：任务调度与并发管理',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-ink mt-4">典型应用场景</h3>
        <BookList items={[
          '金融交易系统 - 确保数据一致性',
          '微服务架构 - 服务间可靠通信',
          '企业资源规划 (ERP) - 复杂业务流程编排',
          '实时数据处理 - 异步消息驱动架构',
        ]} />
        <h3 className="text-sm font-medium text-ink mt-4">技术优势</h3>
        <BookList items={[
          '平台无关性 - 遵循Jakarta EE标准',
          '容器管理服务 - 减少样板代码',
          '声明式配置 - 提高开发效率',
          '可扩展性 - 支持水平和垂直扩展',
        ]} />
      </div>
    ),
  },
  {
    label: '事务管理',
    left: (
      <div className="space-y-4">
        <PageTitle>事务管理 (Jakarta Transactions)</PageTitle>
        <BookParagraph>Jakarta Transactions (JTA) 提供了管理跨多个资源管理器（如数据库、消息队列）事务的标准API。通过两阶段提交协议(2PC)，确保分布式系统中的数据一致性。</BookParagraph>
        <h3 className="text-sm font-medium text-ink mt-4">事务属性</h3>
        <BookList items={[
          'REQUIRED：支持当前事务，如不存在则创建',
          'REQUIRES_NEW：总是创建新事务',
          'SUPPORTS：支持当前事务，如不存在则非事务执行',
          'NOT_SUPPORTED：非事务执行，挂起当前事务',
          'MANDATORY：必须在现有事务中执行',
          'NEVER：非事务执行，如存在事务则抛出异常',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <BookCode language="java" code={`@Stateless
public class OrderService {

    @Resource
    private UserTransaction ut;

    @TransactionAttribute(TransactionAttributeType.REQUIRED)
    public void processOrder(Order order) {
        // 业务逻辑
        persistOrder(order);
        updateInventory(order);
    }
}`} />
        <BookAlert type="info" message="声明式事务通过@TransactionAttribute注解配置，容器自动管理事务边界。对于Spring应用，使用@Transactional注解实现类似功能。" />
        <TagGrid items={['JTA', '2PC', 'REQUIRED', '@TransactionAttribute', 'UserTransaction']} />
      </div>
    ),
  },
  {
    label: '安全与消息服务',
    left: (
      <div className="space-y-4">
        <PageTitle>安全与权限 (Jakarta Security)</PageTitle>
        <BookParagraph>Jakarta Security 提供了基于标准的安全模型，支持身份验证、授权、审计和安全通信。通过声明式和编程式安全机制，保护应用资源免受未授权访问。</BookParagraph>
        <BookList items={[
          '基于角色的访问控制 (RBAC)',
          '声明式安全注解 - @RolesAllowed, @DenyAll',
          '身份验证机制 - FORM, BASIC, DIGEST',
          '安全上下文传播 - 跨服务安全标识传递',
          '加密通信 - SSL/TLS 集成',
        ]} />
        <BookCode language="java" code={`@Stateless
@DeclareRoles({"ADMIN", "USER"})
public class UserService {

    @RolesAllowed("ADMIN")
    public void manageUsers() {
        // 仅管理员可访问
    }

    @PermitAll
    public void viewPublicContent() {
        // 所有用户可访问
    }
}`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>消息服务 (Jakarta Messaging)</PageTitle>
        <BookParagraph>Jakarta Messaging (JMS) 提供可靠的消息传递机制，支持松耦合的分布式系统。通过生产者-消费者模式，实现系统组件间的异步通信。</BookParagraph>
        <BookList items={[
          '点对点模型 (Queue) - 消息由一个消费者处理',
          '发布/订阅模型 (Topic) - 消息可被多个订阅者接收',
          '消息确认模式 - AUTO_ACKNOWLEDGE, CLIENT_ACKNOWLEDGE',
          '持久化消息 - 确保消息不丢失',
          '事务性会话 - 批量处理消息',
        ]} />
        <BookCode language="java" code={`@Resource(lookup = "java:comp/DefaultJMSConnectionFactory")
private ConnectionFactory connectionFactory;

@Resource(lookup = "java:global/jms/OrderQueue")
private Queue orderQueue;

public void sendOrder(Order order) {
    try (JMSContext context = connectionFactory.createContext()) {
        JMSProducer producer = context.createProducer();
        producer.send(orderQueue, order);
    }
}`} />
      </div>
    ),
  },
  {
    label: '定时任务',
    left: (
      <div className="space-y-4">
        <PageTitle>定时任务 (Jakarta Concurrency)</PageTitle>
        <BookParagraph>Jakarta Concurrency 提供了管理后台任务和定时执行的机制。通过声明式调度和编程式任务提交，支持复杂的时间表达式和异步处理，简化批处理作业和系统监控任务。</BookParagraph>
        <h3 className="text-sm font-medium text-ink mt-4">调度特性</h3>
        <BookList items={[
          '基于CRON表达式的复杂调度',
          '固定延迟和固定速率执行',
          '持久化定时任务 - 服务器重启后恢复',
          '异步执行 - 避免阻塞应用线程',
          '任务管理API - 动态创建和控制任务',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <BookCode language="java" code={`@Singleton
public class BatchProcessor {

    @Schedule(hour = "2", minute = "0", second = "0", persistent = true)
    public void nightlyBatchJob() {
        // 每天凌晨2点执行批处理
    }

    @Schedule(cron = "0 0/15 * * * ?", persistent = false)
    public void monitorSystem() {
        // 每15分钟监控系统状态
    }
}`} />
        <BookParagraph>在Spring应用中，可以使用 @Scheduled 注解实现类似功能，支持cron表达式和固定延迟。</BookParagraph>
        <TagGrid items={['@Schedule', 'CRON', '定时任务', '批处理', '异步']} />
      </div>
    ),
  },
  {
    label: '实用示例',
    left: (
      <div className="space-y-4">
        <PageTitle>综合案例：分布式订单处理</PageTitle>
        <BookParagraph>结合事务管理、消息服务和定时任务构建企业级订单处理系统：</BookParagraph>
        <BookList items={[
          '用户提交订单，触发JTA事务保证数据一致性',
          '订单创建后发送JMS消息到库存系统',
          '定时任务监控未支付订单，超时自动取消',
          '安全模块验证用户权限和身份',
        ]} />
        <h3 className="text-sm font-medium text-ink mt-4">最佳实践</h3>
        <BookList items={[
          '使用声明式事务和安全注解减少样板代码',
          '设计幂等的消息处理逻辑保证可靠性',
          '避免长事务，采用补偿事务模式',
          '使用连接池和资源池提高性能',
          '定期审计安全配置和权限',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-ink mt-4">参考资源</h3>
        <BookList items={[
          'Jakarta EE 规范文档：jakarta.ee/specifications/',
          'Jakarta EE 官方教程：docs.oracle.com/javaee/7/tutorial/',
          'JavaEE 高级教程：baeldung.com/java-ee',
          'JavaEE 示例代码库：github.com/javaee-samples',
        ]} />
        <BookAlert type="success" message="在云原生时代，这些企业级服务正在向云原生方向演进，如分布式事务向Saga模式演进，消息服务向Kafka/RocketMQ演进。" />
        <TagGrid items={['订单处理', '事务', '消息', '定时任务', '最佳实践']} />
      </div>
    ),
  },
]

export default function JavaEEEnterprisePage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
