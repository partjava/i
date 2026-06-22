'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import {
  PageTitle,
  BookParagraph,
  BookCode,
  BookAlert,
  BookList,
  TagGrid,
} from '@/app/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '软件工程',
  chapterTitle: '微服务架构',
  chapterNumber: 10,
  totalChapters: 17,
  subjectHref: '/study/se/javaee',
  prevChapter: { label: '异步处理与并发', href: '/study/se/javaee/async' },
  nextChapter: { label: '实战项目开发', href: '/study/se/javaee/project' },
  theme: THEMES.software,
}

const SPREADS = [
  {
    label: '概述',
    left: (
      <div className="space-y-4">
        <PageTitle>微服务架构概述</PageTitle>
        <BookParagraph>微服务架构是一种将应用拆分为一组小型、自治服务的设计方法，每个服务独立部署、独立开发，服务间通过API通信，提升系统的可维护性、可扩展性和容错性。</BookParagraph>
        <h3 className="text-sm font-medium text-ink mt-4">微服务优势</h3>
        <BookList items={[
          '独立部署与扩展',
          '技术栈多样化',
          '容错性强',
          '易于持续交付',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-ink mt-4">典型应用场景</h3>
        <BookList items={[
          '大型互联网平台',
          '需要高可用、弹性伸缩的系统',
          '复杂业务解耦',
        ]} />
        <BookAlert type="info" message="微服务架构并非银弹。对于小型项目，单体架构可能更加合适。选择合适的架构需要根据项目规模、团队能力和业务复杂度综合评估。" />
        <TagGrid items={['微服务', '自治', '独立部署', '容错', '可扩展']} />
      </div>
    ),
  },
  {
    label: '核心思想',
    left: (
      <div className="space-y-4">
        <PageTitle>微服务核心思想</PageTitle>
        <BookParagraph>微服务架构的设计原则和最佳实践：</BookParagraph>
        <BookList items={[
          '单一职责：每个服务聚焦一个业务能力',
          '独立部署：服务可独立升级和扩展',
          '去中心化：分布式治理与数据管理',
          '自动化运维：DevOps与持续交付',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <BookAlert type="info" message="微服务架构的核心理念是将大型复杂系统拆分为多个小型、独立的服务。每个服务围绕特定的业务能力构建，运行在自己的进程中，通过轻量级通信机制（通常为HTTP/REST）进行协作。" />
        <h3 className="text-sm font-medium text-ink mt-4">设计挑战</h3>
        <BookList items={[
          '服务拆分粒度控制',
          '分布式事务处理',
          '服务间通信可靠性',
          '数据一致性与最终一致性',
        ]} />
      </div>
    ),
  },
  {
    label: 'Spring Cloud',
    left: (
      <div className="space-y-4">
        <PageTitle>Spring Cloud生态</PageTitle>
        <BookParagraph>Spring Cloud为微服务架构提供了完整的解决方案，涵盖服务注册发现、负载均衡、服务容错、配置管理等核心功能。</BookParagraph>
        <h3 className="text-sm font-medium text-ink mt-4">常用组件</h3>
        <BookList items={[
          'Eureka / Nacos：服务注册与发现',
          'Ribbon / LoadBalancer：客户端负载均衡',
          'Feign / OpenFeign：声明式服务调用',
          'Hystrix / Sentinel：服务容错与降级',
          'Config / Nacos：分布式配置中心',
          'Gateway：API网关',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-ink mt-4">Eureka服务注册</h3>
        <BookCode language="java" code={`@EnableEurekaServer
@SpringBootApplication
public class EurekaServerApp {
    public static void main(String[] args) {
        SpringApplication.run(EurekaServerApp.class, args);
    }
}`} />
        <h3 className="text-sm font-medium text-ink mt-4">Feign服务调用</h3>
        <BookCode language="java" code={`@FeignClient("user-service")
public interface UserClient {
    @GetMapping("/user/{id}")
    User getUser(@PathVariable Long id);
}`} />
        <TagGrid items={['Eureka', 'Feign', 'Ribbon', 'Gateway', 'Sentinel']} />
      </div>
    ),
  },
  {
    label: '注册与配置',
    left: (
      <div className="space-y-4">
        <PageTitle>服务注册与发现</PageTitle>
        <BookParagraph>服务注册与发现是微服务架构的核心基础设施，让服务能够动态找到彼此的地址。</BookParagraph>
        <BookCode language="properties" code={`# 客户端配置
spring.application.name=order-service
server.port=8081
eureka.client.service-url.defaultZone=http://localhost:8761/eureka/`} />
        <BookCode language="java" code={`@Autowired
private DiscoveryClient discoveryClient;

public String callUserService() {
    List<ServiceInstance> instances =
        discoveryClient.getInstances("user-service");
    // 选择一个实例进行调用
}`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>配置中心</PageTitle>
        <BookParagraph>分布式配置中心集中管理各服务的配置信息，支持动态刷新，无需重启服务即可修改配置。</BookParagraph>
        <BookCode language="properties" code={`# 配置中心地址
spring.cloud.config.uri=http://localhost:8888
spring.application.name=order-service`} />
        <BookCode language="java" code={`@RefreshScope
@RestController
public class ConfigController {
    @Value("\${myConfig}")
    private String config;
}`} />
        <BookAlert type="info" message="Nacos同时提供了服务注册和配置中心功能，是比Eureka+Config更加轻量的替代方案。Spring Cloud Alibaba生态中的Nacos和Sentinel在国内广泛使用。" />
        <TagGrid items={['服务注册', '服务发现', 'Config', 'Nacos', '@RefreshScope']} />
      </div>
    ),
  },
  {
    label: '实用示例',
    left: (
      <div className="space-y-4">
        <PageTitle>综合案例：订单微服务</PageTitle>
        <BookParagraph>使用Spring Cloud构建一个简单的订单微服务，通过Feign调用用户服务获取用户信息。</BookParagraph>
        <BookCode language="java" code={`@RestController
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
}`} />
        <BookAlert type="info" message="微服务架构的技术栈选择：Spring Cloud Alibaba（国内首选）、Spring Cloud Netflix（部分维护模式）、Spring Cloud官方（推荐最新）。" />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-ink mt-4">服务网格（Service Mesh）</h3>
        <BookParagraph>服务网格是微服务架构的下一个演进方向，如Istio/Linkerd将服务治理能力从应用代码中剥离到基础设施层，通过Sidecar代理实现流量管理、安全通信和可观测性。</BookParagraph>
        <BookAlert type="success" message="从单体到微服务的迁移建议：先拆分高内聚低耦合的模块，逐步增加服务数量，避免过渡拆分。对于新项目，可以从模块化单体（Modular Monolith）开始。" />
        <TagGrid items={['订单服务', 'Feign调用', '服务网格', 'Istio', '迁移策略']} />
      </div>
    ),
  },
]

export default function JavaEEMicroservicePage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
