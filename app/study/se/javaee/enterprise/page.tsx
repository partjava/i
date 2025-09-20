'use client';
import { useState } from 'react';

const tabs = [
  { key: 'overview', label: '概述' },
  { key: 'transaction', label: '事务管理' },
  { key: 'security', label: '安全与权限' },
  { key: 'jms', label: '消息服务' },
  { key: 'timer', label: '定时任务' },
  { key: 'example', label: '实用示例' },
];

export default function JavaEEEnterprisePage() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 页面大标题 */}
      <h1 className="text-4xl font-bold mb-6">企业级服务</h1>

      {/* 下划线风格Tab栏 */}
      <div className="flex border-b mb-6 space-x-8">
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`pb-2 text-lg font-medium focus:outline-none transition-colors duration-200
              ${activeTab === tab.key
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-blue-500'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow p-8">
        {activeTab === 'overview' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">企业级服务概述</h2>
            <div className="bg-blue-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">JavaEE企业级服务简介</h3>
              <p className="text-gray-700 leading-relaxed">
                Jakarta EE（前身为JavaEE）企业级服务为构建高可靠、可扩展的企业应用提供全面支持。
                通过标准化的API和容器管理机制，简化分布式系统开发，涵盖事务处理、安全认证、消息通信、任务调度等核心功能。
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-green-50 p-5 rounded-lg">
                <h3 className="text-xl font-bold mb-3">核心服务</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Jakarta Transactions (JTA) - 分布式事务管理</li>
                  <li>• Jakarta Security - 声明式安全模型</li>
                  <li>• Jakarta Messaging (JMS) - 异步消息传递</li>
                  <li>• Jakarta Concurrency - 任务调度与并发管理</li>
                </ul>
              </div>
              <div className="bg-yellow-50 p-5 rounded-lg">
                <h3 className="text-xl font-bold mb-3">典型应用场景</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• 金融交易系统 - 确保数据一致性</li>
                  <li>• 微服务架构 - 服务间可靠通信</li>
                  <li>• 企业资源规划 (ERP) - 复杂业务流程编排</li>
                  <li>• 实时数据处理 - 异步消息驱动架构</li>
                </ul>
              </div>
            </div>
            <div className="bg-purple-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3">技术优势</h3>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>平台无关性 - 遵循Jakarta EE标准</li>
                <li>容器管理服务 - 减少样板代码</li>
                <li>声明式配置 - 提高开发效率</li>
                <li>可扩展性 - 支持水平和垂直扩展</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'transaction' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">事务管理 (Jakarta Transactions)</h2>
            <div className="bg-blue-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">分布式事务基础</h3>
              <p className="text-gray-700 leading-relaxed">
                Jakarta Transactions (JTA) 提供了管理跨多个资源管理器（如数据库、消息队列）事务的标准API。
                通过两阶段提交协议(2PC)，确保分布式系统中的数据一致性。
              </p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">事务属性</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• REQUIRED - 支持当前事务，如不存在则创建</li>
                <li>• REQUIRES_NEW - 总是创建新事务</li>
                <li>• SUPPORTS - 支持当前事务，如不存在则非事务执行</li>
                <li>• NOT_SUPPORTED - 非事务执行，挂起当前事务</li>
                <li>• MANDATORY - 必须在现有事务中执行</li>
                <li>• NEVER - 非事务执行，如存在事务则抛出异常</li>
              </ul>
            </div>
            <div className="bg-yellow-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3">声明式事务示例</h3>
              <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
{`@Stateless
public class OrderService {

    @Resource
    private UserTransaction ut;

    @TransactionAttribute(TransactionAttributeType.REQUIRED)
    public void processOrder(Order order) {
        // 业务逻辑
        persistOrder(order);
        updateInventory(order);
    }
}`}
              </pre>
            </div>
          </div>
        )}

        {activeTab === 'security' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">安全与权限 (Jakarta Security)</h2>
            <div className="bg-blue-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">企业级安全架构</h3>
              <p className="text-gray-700 leading-relaxed">
                Jakarta Security 提供了基于标准的安全模型，支持身份验证、授权、审计和安全通信。
                通过声明式和编程式安全机制，保护应用资源免受未授权访问。
              </p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">安全机制</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• 基于角色的访问控制 (RBAC)</li>
                <li>• 声明式安全注解 - @RolesAllowed, @DenyAll</li>
                <li>• 身份验证机制 - FORM, BASIC, DIGEST</li>
                <li>• 安全上下文传播 - 跨服务安全标识传递</li>
                <li>• 加密通信 - SSL/TLS 集成</li>
              </ul>
            </div>
            <div className="bg-yellow-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3">安全注解示例</h3>
              <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
{`@Stateless
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
}`}
              </pre>
            </div>
          </div>
        )}

        {activeTab === 'jms' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">消息服务 (Jakarta Messaging)</h2>
            <div className="bg-blue-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">异步消息传递基础</h3>
              <p className="text-gray-700 leading-relaxed">
                Jakarta Messaging (JMS) 提供可靠的消息传递机制，支持松耦合的分布式系统。
                通过生产者-消费者模式，实现系统组件间的异步通信，提高系统弹性和可扩展性。
              </p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">消息模型</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• 点对点模型 (Queue) - 消息由一个消费者处理</li>
                <li>• 发布/订阅模型 (Topic) - 消息可被多个订阅者接收</li>
                <li>• 消息确认模式 - AUTO_ACKNOWLEDGE, CLIENT_ACKNOWLEDGE</li>
                <li>• 持久化消息 - 确保消息不丢失</li>
                <li>• 事务性会话 - 批量处理消息</li>
              </ul>
            </div>
            <div className="bg-yellow-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3">JMS 2.0 简化API示例</h3>
              <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
{`@Resource(lookup = "java:comp/DefaultJMSConnectionFactory")
private ConnectionFactory connectionFactory;

@Resource(lookup = "java:global/jms/OrderQueue")
private Queue orderQueue;

public void sendOrder(Order order) {
    try (JMSContext context = connectionFactory.createContext()) {
        JMSProducer producer = context.createProducer();
        producer.send(orderQueue, order);
    }
}`}
              </pre>
            </div>
          </div>
        )}

        {activeTab === 'timer' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">定时任务 (Jakarta Concurrency)</h2>
            <div className="bg-blue-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">企业级任务调度</h3>
              <p className="text-gray-700 leading-relaxed">
                Jakarta Concurrency 提供了管理后台任务和定时执行的机制。
                通过声明式调度和编程式任务提交，支持复杂的时间表达式和异步处理，简化批处理作业和系统监控任务。
              </p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">调度特性</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• 基于CRON表达式的复杂调度</li>
                <li>• 固定延迟和固定速率执行</li>
                <li>• 持久化定时任务 - 服务器重启后恢复</li>
                <li>• 异步执行 - 避免阻塞应用线程</li>
                <li>• 任务管理API - 动态创建和控制任务</li>
              </ul>
            </div>
            <div className="bg-yellow-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3">定时任务示例</h3>
              <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
{`@Singleton
public class BatchProcessor {

    @Schedule(hour = "2", minute = "0", second = "0", persistent = true)
    public void nightlyBatchJob() {
        // 每天凌晨2点执行批处理
    }

    @Schedule(cron = "0 0/15 * * * ?", persistent = false)
    public void monitorSystem() {
        // 每15分钟监控系统状态
    }
}`}
              </pre>
            </div>
          </div>
        )}

        {activeTab === 'example' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">实用示例</h2>
            <div className="bg-blue-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">综合案例：分布式订单处理</h3>
              <p className="text-gray-700 leading-relaxed">
                结合事务管理、消息服务和定时任务构建企业级订单处理系统：
              </p>
              <ol className="list-decimal pl-6 mt-3 space-y-2 text-gray-700">
                <li>用户提交订单，触发JTA事务保证数据一致性</li>
                <li>订单创建后发送JMS消息到库存系统</li>
                <li>定时任务监控未支付订单，超时自动取消</li>
                <li>安全模块验证用户权限和身份</li>
              </ol>
            </div>
            <div className="bg-green-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">最佳实践</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• 使用声明式事务和安全注解减少样板代码</li>
                <li>• 设计幂等的消息处理逻辑保证可靠性</li>
                <li>• 避免长事务，采用补偿事务模式</li>
                <li>• 使用连接池和资源池提高性能</li>
                <li>• 定期审计安全配置和权限</li>
              </ul>
            </div>
            <div className="bg-yellow-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3">参考资源</h3>
              <ul className="space-y-2 text-gray-700">
                <li><a href="https://jakarta.ee/specifications/" className="text-blue-600 underline" target="_blank">Jakarta EE 规范文档</a></li>
                <li><a href="https://docs.oracle.com/javaee/7/tutorial/" className="text-blue-600 underline" target="_blank">Jakarta EE 官方教程</a></li>
                <li><a href="https://www.baeldung.com/java-ee" className="text-blue-600 underline" target="_blank">JavaEE 高级教程</a></li>
                <li><a href="https://github.com/javaee-samples" className="text-blue-600 underline" target="_blank">JavaEE 示例代码库</a></li>
              </ul>
            </div>
          </div>
        )}
      </div>

      <div className="mt-10 flex justify-between">
        <a href="/study/se/javaee/db" className="px-4 py-2 text-blue-600 hover:text-blue-800">
          ← 数据库访问技术
        </a>
        <a
          href="/study/se/javaee/security"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          安全与权限管理 →
        </a>
      </div>
    </div>
  );
}