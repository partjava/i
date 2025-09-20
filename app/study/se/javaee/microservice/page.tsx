'use client';
import { useState } from 'react';

const tabs = [
  { key: 'overview', label: '概述' },
  { key: 'concept', label: '核心思想' },
  { key: 'springcloud', label: 'Spring Cloud' },
  { key: 'discovery', label: '服务注册与发现' },
  { key: 'config', label: '配置中心' },
  { key: 'example', label: '实用示例' },
];

export default function JavaEEMicroservicePage() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 页面大标题 */}
      <h1 className="text-4xl font-bold mb-6">微服务架构</h1>

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
            <h2 className="text-2xl font-bold mb-4">微服务架构概述</h2>
            <div className="bg-blue-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">什么是微服务？</h3>
              <p className="text-gray-700 leading-relaxed">
                微服务架构是一种将应用拆分为一组小型、自治服务的设计方法，每个服务独立部署、独立开发，服务间通过API通信，提升系统的可维护性、可扩展性和容错性。
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-green-50 p-5 rounded-lg">
                <h3 className="text-xl font-bold mb-3">微服务优势</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• 独立部署与扩展</li>
                  <li>• 技术栈多样化</li>
                  <li>• 容错性强</li>
                  <li>• 易于持续交付</li>
                </ul>
              </div>
              <div className="bg-yellow-50 p-5 rounded-lg">
                <h3 className="text-xl font-bold mb-3">典型应用场景</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• 大型互联网平台</li>
                  <li>• 需要高可用、弹性伸缩的系统</li>
                  <li>• 复杂业务解耦</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'concept' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">微服务核心思想</h2>
            <div className="bg-blue-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">核心原则</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• 单一职责：每个服务聚焦一个业务能力</li>
                <li>• 独立部署：服务可独立升级和扩展</li>
                <li>• 去中心化：分布式治理与数据管理</li>
                <li>• 自动化运维：DevOps与持续交付</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'springcloud' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Spring Cloud生态</h2>
            <div className="bg-blue-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">Spring Cloud常用组件</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Eureka：服务注册与发现</li>
                <li>• Ribbon：客户端负载均衡</li>
                <li>• Feign：声明式服务调用</li>
                <li>• Hystrix：服务容错与降级</li>
                <li>• Config：分布式配置中心</li>
                <li>• Gateway：API网关</li>
              </ul>
            </div>
            <div className="bg-green-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">Eureka服务注册示例</h3>
              <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
{`@EnableEurekaServer
@SpringBootApplication
public class EurekaServerApp {
    public static void main(String[] args) {
        SpringApplication.run(EurekaServerApp.class, args);
    }
}`}
              </pre>
            </div>
            <div className="bg-yellow-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3">Feign服务调用示例</h3>
              <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
{`@FeignClient("user-service")
public interface UserClient {
    @GetMapping("/user/{id}")
    User getUser(@PathVariable Long id);
}`}
              </pre>
            </div>
          </div>
        )}

        {activeTab === 'discovery' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">服务注册与发现</h2>
            <div className="bg-blue-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">Eureka客户端配置</h3>
              <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
{`spring.application.name=order-service
server.port=8081
eureka.client.service-url.defaultZone=http://localhost:8761/eureka/`}
              </pre>
            </div>
            <div className="bg-green-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">服务发现与调用</h3>
              <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
{`@Autowired
private DiscoveryClient discoveryClient;

public String callUserService() {
    List<ServiceInstance> instances = discoveryClient.getInstances("user-service");
    // 选择一个实例进行调用
}`}
              </pre>
            </div>
          </div>
        )}

        {activeTab === 'config' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">配置中心</h2>
            <div className="bg-blue-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">Spring Cloud Config使用</h3>
              <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
{`spring.cloud.config.uri=http://localhost:8888
spring.application.name=order-service`}
              </pre>
            </div>
            <div className="bg-green-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">动态刷新配置</h3>
              <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
{`@RefreshScope
@RestController
public class ConfigController {
    @Value("$\{\myConfig\}")
    private String config;
}`}
              </pre>
            </div>
          </div>
        )}

        {activeTab === 'example' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">实用示例</h2>
            <div className="bg-blue-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">综合案例：订单微服务</h3>
              <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
{`@RestController
@RequestMapping("/order")
public class OrderController {
    @Autowired
    private UserClient userClient;
    @GetMapping("/{id}")
    public Order getOrder(@PathVariable Long id) {
        User user = userClient.getUser(id);
        // 组装订单信息
        return new Order(id, user);
    }
}`}
              </pre>
            </div>
          </div>
        )}
      </div>

      <div className="mt-10 flex justify-between">
        <a href="/study/se/javaee/async" className="px-4 py-2 text-blue-600 hover:text-blue-800">
          ← 异步处理与并发
        </a>
        <a
          href="/study/se/javaee/project"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          实战项目开发 →
        </a>
      </div>
    </div>
  );
} 