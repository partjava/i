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
  chapterTitle: '实战项目开发',
  chapterNumber: 11,
  totalChapters: 17,
  subjectHref: '/study/se/javaee',
  prevChapter: { label: '微服务架构', href: '/study/se/javaee/microservice' },
  nextChapter: { label: '开发工具与环境', href: '/study/se/javaee/tools' },
  theme: THEMES.software,
}

const SPREADS = [
  {
    label: '概述',
    left: (
      <div className="space-y-4">
        <PageTitle>实战项目开发概述</PageTitle>
        <BookParagraph>企业级项目开发涉及从需求分析到部署上线的完整流程。本章将带领你完成一个企业级项目的全流程开发，涵盖用户管理、订单管理等核心模块。</BookParagraph>
        <h3 className="text-sm font-medium text-ink mt-4">开发流程</h3>
        <BookList items={[
          '需求分析与系统设计',
          '技术选型与架构搭建',
          '功能模块开发与测试',
          '技术整合与优化',
          '部署上线与运维',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-ink mt-4">技术栈建议</h3>
        <BookList items={[
          'Spring Boot + Spring MVC（Web层）',
          'MyBatis / JPA（持久层）',
          'MySQL / PostgreSQL（数据库）',
          'Redis（缓存）',
          'Docker（容器化）',
          'Jenkins / GitLab CI（CI/CD）',
        ]} />
        <BookAlert type="info" message="选择一个合适的项目进行实战，如电商系统、CMS管理系统或企业OA系统，重点关注业务逻辑的完整实现。" />
      </div>
    ),
  },
  {
    label: '项目结构',
    left: (
      <div className="space-y-4">
        <PageTitle>项目结构设计</PageTitle>
        <BookParagraph>典型的分层项目结构遵循关注点分离的原则，每层各司其职。</BookParagraph>
        <BookCode language="text" code={`- controller/   // 控制层
- service/      // 业务层
- dao/          // 数据访问层
- model/        // 实体类
- config/       // 配置类
- resources/    // 配置文件、静态资源`} />
        <BookAlert type="info" message="除了基础分层，还可以引入dto/（数据传输对象）、vo/（视图对象）、exception/（异常处理）、utils/（工具类）等包。" />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-ink mt-4">架构设计原则</h3>
        <BookList items={[
          '单一职责：每个类和模块职责明确',
          '接口隔离：依赖接口而非具体实现',
          '依赖倒置：高层模块不依赖低层模块',
          '开闭原则：对扩展开放，对修改关闭',
          '约定优于配置：遵循框架约定减少配置',
        ]} />
        <TagGrid items={['分层架构', 'MVC', '模块化', '接口设计', '设计原则']} />
      </div>
    ),
  },
  {
    label: '用户管理模块',
    left: (
      <div className="space-y-4">
        <PageTitle>用户管理模块</PageTitle>
        <BookParagraph>用户管理是企业应用的基础模块，包括注册、登录、信息管理等核心功能。</BookParagraph>
        <BookCode language="java" code={`@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public String register(@RequestBody User user) {
        userService.register(user);
        return "注册成功";
    }

    @PostMapping("/login")
    public String login(@RequestBody User user) {
        return userService.login(user);
    }
}`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <BookCode language="java" code={`@Service
public class UserService {
    public void register(User user) {
        // 校验、加密、保存数据库
    }

    public String login(User user) {
        // 校验用户名密码，生成Token
        return "token";
    }
}`} />
        <BookAlert type="success" message="实际开发中，建议使用Spring Security或JWT实现用户认证。密码存储应使用BCrypt等强哈希算法。" />
        <TagGrid items={['注册', '登录', 'JWT', '密码加密', 'RESTful']} />
      </div>
    ),
  },
  {
    label: '订单管理模块',
    left: (
      <div className="space-y-4">
        <PageTitle>订单管理模块</PageTitle>
        <BookParagraph>订单模块是电商系统的核心，涉及订单创建、查询、状态流转等复杂业务逻辑。</BookParagraph>
        <BookCode language="java" code={`@RestController
@RequestMapping("/order")
public class OrderController {
    @Autowired
    private OrderService orderService;

    @PostMapping("/create")
    public String create(@RequestBody Order order) {
        orderService.create(order);
        return "下单成功";
    }

    @GetMapping("/{id}")
    public Order get(@PathVariable Long id) {
        return orderService.getById(id);
    }
}`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <BookCode language="java" code={`@Service
public class OrderService {
    public void create(Order order) {
        // 校验、库存扣减、保存订单
    }

    public Order getById(Long id) {
        // 查询订单
        return new Order();
    }
}`} />
        <BookAlert type="info" message="订单系统设计中需要考虑：库存一致性、订单状态机、幂等性、支付回调处理、超时取消等复杂业务逻辑。" />
        <TagGrid items={['订单', '库存', '状态机', '事务', '幂等']} />
      </div>
    ),
  },
  {
    label: '技术整合与部署',
    left: (
      <div className="space-y-4">
        <PageTitle>综合技术整合</PageTitle>
        <BookParagraph>将各技术栈整合在一起，实现完整的企业级应用。</BookParagraph>
        <BookCode language="java" code={`// Spring + MyBatis整合
@Service
public class UserService {
    @Autowired
    private UserMapper userMapper;

    public User getUser(int id) {
        return userMapper.selectUser(id);
    }
}`} />
        <BookCode language="java" code={`// 微服务远程调用
@FeignClient("order-service")
public interface OrderClient {
    @GetMapping("/order/{id}")
    Order getOrder(@PathVariable Long id);
}`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>部署与运维</PageTitle>
        <BookParagraph>企业级应用的常见部署方式：</BookParagraph>
        <BookList items={[
          '本地/服务器JAR包运行',
          'Docker容器化部署',
          '云平台自动化部署',
        ]} />
        <BookCode language="dockerfile" code={`FROM openjdk:17-jdk-alpine
COPY target/app.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]`} />
        <BookAlert type="success" message="推荐使用Docker Compose或Kubernetes管理多服务部署。在云平台上可使用阿里云EDAS、腾讯云TSF等PaaS服务简化运维。" />
        <TagGrid items={['Docker', 'Jenkins', 'CI/CD', '部署', '运维']} />
      </div>
    ),
  },
]

export default function JavaEEProjectPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
