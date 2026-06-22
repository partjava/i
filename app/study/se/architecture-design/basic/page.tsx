'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import {
  PageTitle,
  SectionTitle,
  BookParagraph,
  BookCode,
  BookAlert,
  BookList,
} from '@/app/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '软件工程',
  chapterTitle: '软件架构基础',
  chapterNumber: 1,
  totalChapters: 5,
  subjectHref: '/study/se/architecture-design',
  nextChapter: { label: '主流架构风格', href: '/study/se/architecture-design/styles' },
  theme: THEMES.software,
}

const architectureVsDesign = `// 软件架构 vs 详细设计对比
// 架构关注系统整体，设计关注具体实现
// 架构是抽象的概念性决策
// 设计是具体的技术实现

// 架构决策示例
// 选择分层架构 vs 微服务架构
// 选择关系型数据库 vs NoSQL

// 设计决策示例
// 具体类的方法实现
// 算法的选择与优化`

const layeredCode = `// ===== 表示层（UI） - UserController.js =====
class UserController {
  constructor(userService) {
    this.userService = userService;
  }

  // 处理用户登录请求
  async handleLogin(req) {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        return { status: 400, error: '用户名和密码不能为空' };
      }
      const user = await this.userService.login(username, password);
      if (!user) {
        return { status: 401, error: '认证失败' };
      }
      return { status: 200, data: { user, token: generateToken(user) } };
    } catch (error) {
      console.error('登录处理失败:', error);
      return { status: 500, error: '服务器内部错误' };
    }
  }
}

// ===== 业务逻辑层（BLL） - UserService.js =====
class UserService {
  constructor(userRepository, passwordHasher, emailService) {
    this.userRepository = userRepository;
    this.passwordHasher = passwordHasher;
    this.emailService = emailService;
  }

  async login(username, password) {
    const user = await this.userRepository.findByUsername(username);
    if (!user) return null;

    const isPasswordValid = await this.passwordHasher.compare(password, user.passwordHash);
    if (!isPasswordValid) return null;

    await this.logLoginActivity(user.id);

    if (user.isLocked) {
      throw new Error('账户已锁定');
    }

    if (!user.hasLoggedInBefore) {
      await this.emailService.sendWelcomeEmail(user.email);
      await this.userRepository.markAsLoggedIn(user.id);
    }

    return {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role
    };
  }

  async logLoginActivity(userId) {
    await this.userRepository.recordLoginActivity(userId, new Date());
  }
}

// ===== 数据访问层（DAL） - UserRepository.js =====
class UserRepository {
  constructor(databaseConnection) {
    this.db = databaseConnection;
  }

  async findByUsername(username) {
    const query = 'SELECT * FROM users WHERE username = ? LIMIT 1';
    const [rows] = await this.db.execute(query, [username]);
    return rows[0] || null;
  }

  async recordLoginActivity(userId, timestamp) {
    const query = 'INSERT INTO user_login_history (user_id, login_time) VALUES (?, ?)';
    await this.db.execute(query, [userId, timestamp]);
  }

  async markAsLoggedIn(userId) {
    const query = 'UPDATE users SET has_logged_in_before = true WHERE id = ?';
    await this.db.execute(query, [userId]);
  }
}

// ===== 依赖注入 - Application.js =====
class Application {
  static async initialize() {
    const dbConnection = await createDatabaseConnection({
      host: 'localhost',
      user: 'root',
      password: 'password',
      database: 'mydb'
    });

    const userRepository = new UserRepository(dbConnection);
    const passwordHasher = new PasswordHasher();
    const emailService = new EmailService();
    const userService = new UserService(userRepository, passwordHasher, emailService);
    const userController = new UserController(userService);

    const server = new WebServer();
    server.registerController('/api/users', userController);
    server.start(3000);
    console.log('应用已启动，监听端口 3000');
  }
}`

const plantUmlCode = `@startuml
' 设置皮肤参数
skinparam monochrome true
skinparam class {
    BackgroundColor White
    BorderColor Black
    ArrowColor Black
}

package "表示层" as Presentation {
    class UserController {
        + handleLogin(req)
    }
}

package "业务逻辑层" as Business {
    interface UserServiceInterface {
        + login(username, password)
        + register(userData)
    }

    class UserServiceImpl implements UserServiceInterface {
        - userRepository: UserRepositoryInterface
        - passwordHasher: PasswordHasherInterface
        - emailService: EmailServiceInterface
        + login(username, password)
        + register(userData)
        # validateUserInput(userData)
        # sendWelcomeEmail(user)
    }

    interface PasswordHasherInterface {
        + hash(password)
        + compare(rawPassword, hashedPassword)
    }

    class BcryptPasswordHasher implements PasswordHasherInterface {
        + hash(password)
        + compare(rawPassword, hashedPassword)
    }

    interface EmailServiceInterface {
        + sendWelcomeEmail(email)
        + sendPasswordResetEmail(email, token)
    }

    class SmtpEmailService implements EmailServiceInterface {
        - smtpClient: SmtpClient
        + sendWelcomeEmail(email)
        + sendPasswordResetEmail(email, token)
    }
}

package "数据访问层" as Data {
    interface UserRepositoryInterface {
        + findByUsername(username)
        + create(userData)
        + update(userData)
    }

    class UserRepositoryImpl implements UserRepositoryInterface {
        - database: DatabaseConnection
        + findByUsername(username)
        + create(userData)
        + update(userData)
    }

    interface DatabaseConnection {
        + execute(query, params)
        + beginTransaction()
        + commit()
        + rollback()
    }

    class MySqlConnection implements DatabaseConnection {
        - host: string
        - user: string
        - password: string
        - database: string
        + execute(query, params)
        + beginTransaction()
        + commit()
        + rollback()
    }
}

UserController --> UserServiceInterface : uses
UserServiceImpl --> UserRepositoryInterface : uses
UserServiceImpl --> PasswordHasherInterface : uses
UserServiceImpl --> EmailServiceInterface : uses
UserRepositoryImpl --> DatabaseConnection : uses
SmtpEmailService --> SmtpClient : uses

UserServiceImpl --|> UserServiceInterface : implements
BcryptPasswordHasher --|> PasswordHasherInterface : implements
SmtpEmailService --|> EmailServiceInterface : implements
UserRepositoryImpl --|> UserRepositoryInterface : implements
MySqlConnection --|> DatabaseConnection : implements
@enduml`

const SPREADS = [
  // ===== 跨页 1: 架构定义与区别 =====
  {
    label: '架构概念',
    left: (
      <div className="space-y-4">
        <PageTitle>软件架构的定义与作用</PageTitle>
        <BookParagraph>
          软件架构是指系统在高层次上的结构和组织方式，包括各个组件、模块之间的关系、交互方式以及设计原则。良好的架构能够提升系统的可维护性、可扩展性和可靠性，是大型软件项目成功的关键。
        </BookParagraph>
        <BookAlert type="info" message="架构的核心价值：软件架构是连接业务需求和技术实现的桥梁，它不仅影响系统的质量属性，还决定了团队的工作效率和系统的长期演进能力。" />
        <BookParagraph>架构的重要性体现在多个方面：</BookParagraph>
        <BookList items={[
          '定义系统的主要组件及其职责，确保团队成员对系统有共同理解',
          '描述组件之间的交互关系，帮助团队理解系统如何协同工作',
          '为开发、测试、部署等活动提供指导，确保项目按计划进行',
          '支撑系统的演进和扩展，降低系统维护成本',
          '提前识别和解决潜在的技术风险',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>架构与设计的区别</PageTitle>
        <BookParagraph>软件架构与详细设计在多个维度上存在显著差异：</BookParagraph>
        <SectionTitle>软件架构</SectionTitle>
        <BookList items={[
          '关注系统整体结构',
          '涉及高层决策',
          '影响系统全局特性',
          '与业务目标紧密相关',
          '通常是抽象的、概念性的',
        ]} />
        <SectionTitle>详细设计</SectionTitle>
        <BookList items={[
          '关注具体组件实现',
          '涉及低层实现细节',
          '影响局部模块特性',
          '与技术实现紧密相关',
          '通常是具体的、技术性的',
        ]} />
        <BookCode language="js" code={architectureVsDesign} />
      </div>
    ),
  },

  // ===== 跨页 2: 架构师职责与能力 =====
  {
    label: '架构师职责',
    left: (
      <div className="space-y-4">
        <PageTitle>架构师的职责</PageTitle>
        <SectionTitle>技术职责</SectionTitle>
        <BookList items={[
          '系统整体设计与技术选型',
          '制定架构规范与标准',
          '解决系统关键技术难题',
          '评估和引入新技术',
          '性能优化与调优',
        ]} />
        <SectionTitle>团队职责</SectionTitle>
        <BookList items={[
          '指导和评审开发团队的设计',
          '推动团队技术进步与知识分享',
          '与产品、测试、运维等多方协作',
          '培养和提升团队技术能力',
          '协调解决团队技术争议',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>能力要求</PageTitle>
        <SectionTitle>技术能力</SectionTitle>
        <BookList items={[
          '广泛的技术栈知识',
          '系统设计与架构经验',
          '性能优化与调优能力',
          '解决复杂问题的能力',
          '熟悉行业最佳实践',
        ]} />
        <SectionTitle>思维能力</SectionTitle>
        <BookList items={[
          '抽象思维与建模能力',
          '全局视野与战略思维',
          '问题分析与决策能力',
          '技术前瞻性与创新能力',
          '权衡与取舍能力',
        ]} />
        <SectionTitle>沟通能力</SectionTitle>
        <BookList items={[
          '清晰的技术表达能力',
          '跨团队协作能力',
          '向上沟通与汇报能力',
          '冲突解决与协调能力',
          '文档编写与表达能力',
        ]} />
      </div>
    ),
  },

  // ===== 跨页 3: 成长路径 =====
  {
    label: '成长路径',
    left: (
      <div className="space-y-4">
        <PageTitle>架构师成长路径</PageTitle>
        <BookParagraph>从初级到专家，架构师的成长是一个持续学习和积累的过程：</BookParagraph>
        <SectionTitle>初级架构师（2-5年）</SectionTitle>
        <BookParagraph>参与架构设计，熟悉特定领域技术，在指导下完成子系统的架构工作。</BookParagraph>
        <SectionTitle>中级架构师（5-8年）</SectionTitle>
        <BookParagraph>独立负责子系统架构，能够解决复杂问题，指导初级工程师。</BookParagraph>
        <SectionTitle>高级架构师（8-12年）</SectionTitle>
        <BookParagraph>负责整体架构设计，指导技术方向，参与公司技术战略制定。</BookParagraph>
        <SectionTitle>技术专家/CTO（12年以上）</SectionTitle>
        <BookParagraph>制定技术战略，引领技术创新，负责技术团队管理和文化建设。</BookParagraph>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>架构设计的基本原则</PageTitle>
        <BookParagraph>架构设计原则是指导架构师进行系统设计的基本准则：</BookParagraph>
        <SectionTitle>高内聚，低耦合</SectionTitle>
        <BookParagraph>每个模块应专注于单一职责，模块间依赖关系应最小化。高内聚意味着模块专注于单一功能，低耦合意味着模块间依赖关系简单。优点：提高可维护性、可复用性和可测试性。</BookParagraph>
        <SectionTitle>可扩展性</SectionTitle>
        <BookParagraph>系统应设计为易于添加新功能或适应变化。「开闭原则」：对扩展开放，对修改关闭。常见实现方式包括使用接口、抽象类、插件机制、依赖注入。</BookParagraph>
        <SectionTitle>可维护性</SectionTitle>
        <BookParagraph>代码结构应清晰，便于理解、修改和修复问题。关键因素包括代码可读性、模块化程度、文档完整性。</BookParagraph>
      </div>
    ),
  },

  // ===== 跨页 4: 更多设计原则 =====
  {
    label: '设计原则',
    left: (
      <div className="space-y-4">
        <PageTitle>更多设计原则</PageTitle>
        <SectionTitle>可复用性</SectionTitle>
        <BookParagraph>模块应设计为可在不同项目或场景中复用，减少重复开发。复用级别包括代码复用、组件复用、服务复用。优点：提高开发效率，降低成本。</BookParagraph>
        <SectionTitle>安全性与健壮性</SectionTitle>
        <BookParagraph>系统应能抵御异常和攻击，保证稳定运行。安全设计包括身份验证、授权、数据加密、输入验证。健壮性设计包括错误处理、容错机制、重试策略。</BookParagraph>
        <SectionTitle>性能与效率</SectionTitle>
        <BookParagraph>合理分配资源，满足业务需求，避免过度设计。关键指标：响应时间、吞吐量、资源利用率。优化策略：缓存、异步处理、负载均衡、数据库优化。</BookParagraph>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>原则的权衡与取舍</PageTitle>
        <BookParagraph>在实际架构设计中，往往需要在不同原则之间进行权衡，因为某些原则之间可能存在冲突：</BookParagraph>
        <BookList items={[
          '可扩展性与性能：过度追求可扩展性可能引入额外的抽象层，影响性能',
          '安全性与可用性：严格的安全措施可能降低系统的可用性',
          '可维护性与开发效率：过于复杂的设计模式可能提高可维护性，但增加开发难度',
        ]} />
        <BookAlert type="warning" message="优秀的架构师需要根据系统的具体需求和约束条件，合理平衡这些原则，找到最适合的解决方案。权衡是架构设计的核心能力之一。" />
      </div>
    ),
  },

  // ===== 跨页 5: 架构视图 =====
  {
    label: '架构视图',
    left: (
      <div className="space-y-4">
        <PageTitle>4+1视图模型</PageTitle>
        <BookParagraph>4+1视图模型是最常用的架构视图方法，由Philippe Kruchten提出，从不同角度展示系统架构：</BookParagraph>
        <SectionTitle>逻辑视图</SectionTitle>
        <BookParagraph>描述系统的功能模块及其关系，关注系统的静态结构。</BookParagraph>
        <SectionTitle>开发视图</SectionTitle>
        <BookParagraph>描述模块的实现结构和包依赖，关注软件开发过程中的组织和管理。</BookParagraph>
        <SectionTitle>进程视图</SectionTitle>
        <BookParagraph>描述系统的并发和通信机制，关注系统的动态行为和运行时特性。</BookParagraph>
        <SectionTitle>物理视图</SectionTitle>
        <BookParagraph>描述系统的部署结构，关注系统在物理硬件上的分布和配置。</BookParagraph>
        <BookAlert type="info" message="场景视图（第五个视图）将上述四个视图串联起来，通过具体的用例场景来验证架构设计的合理性。" />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>UML（统一建模语言）</PageTitle>
        <BookParagraph>UML是一种标准化的建模语言，用于可视化、详述、构造和文档化软件系统的制品。</BookParagraph>
        <SectionTitle>结构型图</SectionTitle>
        <BookList items={[
          '类图（Class Diagram）',
          '对象图（Object Diagram）',
          '组件图（Component Diagram）',
          '部署图（Deployment Diagram）',
          '包图（Package Diagram）',
        ]} />
        <SectionTitle>行为型图</SectionTitle>
        <BookList items={[
          '用例图（Use Case Diagram）',
          '活动图（Activity Diagram）',
          '状态机图（State Machine Diagram）',
          '交互概览图（Interaction Overview Diagram）',
        ]} />
        <SectionTitle>交互型图</SectionTitle>
        <BookList items={[
          '序列图（Sequence Diagram）',
          '通信图（Communication Diagram）',
          '定时图（Timing Diagram）',
        ]} />
      </div>
    ),
  },

  // ===== 跨页 6: 分层架构示意图 =====
  {
    label: '分层架构图',
    left: (
      <div className="space-y-4">
        <PageTitle>典型分层架构</PageTitle>
        <div className="flex justify-center my-4">
          <svg width="360" height="200" viewBox="0 0 360 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="30" y="20" width="300" height="35" fill="#e3e8f7" stroke="#3b82f6" strokeWidth="2" rx="8"/>
            <text x="180" y="43" textAnchor="middle" fontSize="16" fill="#1e293b">表示层（UI）</text>
            <rect x="30" y="65" width="300" height="35" fill="#f1f5f9" stroke="#3b82f6" strokeWidth="2" rx="8"/>
            <text x="180" y="88" textAnchor="middle" fontSize="16" fill="#1e293b">业务逻辑层（BLL）</text>
            <rect x="30" y="110" width="300" height="35" fill="#e0f2fe" stroke="#3b82f6" strokeWidth="2" rx="8"/>
            <text x="180" y="133" textAnchor="middle" fontSize="16" fill="#1e293b">数据访问层（DAL）</text>
            <rect x="30" y="155" width="300" height="30" fill="#fef9c3" stroke="#f59e42" strokeWidth="2" rx="8"/>
            <text x="180" y="175" textAnchor="middle" fontSize="15" fill="#92400e">数据库</text>
            <line x1="180" y1="55" x2="180" y2="65" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow2)"/>
            <line x1="180" y1="100" x2="180" y2="110" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow2)"/>
            <line x1="180" y1="145" x2="180" y2="155" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow2)"/>
            <defs>
              <marker id="arrow2" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto" markerUnits="strokeWidth">
                <path d="M0,0 L10,5 L0,10 L3,5 Z" fill="#64748b" />
              </marker>
            </defs>
          </svg>
        </div>
        <BookParagraph>典型三层架构：UI层 → 业务逻辑层 → 数据访问层 → 数据库</BookParagraph>
        <SectionTitle>分层架构的特点</SectionTitle>
        <BookList items={[
          '分离关注点：每层专注于特定类型的功能，降低模块间的耦合',
          '可扩展性：可以独立修改或替换某一层，而不影响其他层',
          '可维护性：每层的职责明确，便于理解和维护',
          '复用性：同一层的组件可以在不同应用中复用',
          '标准化接口：层与层之间通过定义良好的接口通信',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>典型应用场景</PageTitle>
        <SectionTitle>Web应用</SectionTitle>
        <BookParagraph>表示层（前端页面）、业务逻辑层（后端服务）、数据访问层（数据库操作）。</BookParagraph>
        <SectionTitle>企业级应用</SectionTitle>
        <BookParagraph>客户端层、应用服务器层、业务逻辑层、数据层。</BookParagraph>
        <SectionTitle>移动应用</SectionTitle>
        <BookParagraph>UI层、业务逻辑层、数据持久层、网络层。</BookParagraph>
        <SectionTitle>大型系统</SectionTitle>
        <BookParagraph>可能扩展为多层架构，如增加服务层、网关层等。</BookParagraph>
        <SectionTitle>分层架构的潜在问题</SectionTitle>
        <BookList items={[
          '性能问题：多层之间的调用可能引入额外的开销',
          '过度设计：对于简单系统，分层可能增加不必要的复杂性',
          '层间依赖：如果设计不当，可能导致层间依赖关系混乱',
          '事务管理：跨层事务处理可能变得复杂',
        ]} />
      </div>
    ),
  },

  // ===== 跨页 7: 代码示例 =====
  {
    label: '代码示例',
    left: (
      <div className="space-y-4">
        <PageTitle>分层架构代码示例</PageTitle>
        <BookParagraph>以下是一个简单的分层架构实现示例，展示了三层架构中各层之间的协作方式：</BookParagraph>
        <BookCode language="js" maxLines={28} code={layeredCode} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>关键优势</PageTitle>
        <BookList items={[
          '职责分离：每层专注于特定类型的功能，提高代码的可维护性',
          '松耦合：层与层之间通过接口通信，降低模块间的依赖',
          '可测试性：每层可以独立测试，便于编写单元测试和集成测试',
          '可扩展性：可以独立修改或替换某一层，而不影响其他层',
          '复用性：同一层的组件可以在不同应用中复用',
        ]} />
        <SectionTitle>最佳实践</SectionTitle>
        <BookList items={[
          '严格遵循单向依赖原则（上层依赖下层，下层不依赖上层）',
          '使用接口定义层与层之间的契约',
          '避免业务逻辑泄漏到表示层或数据访问层',
          '使用依赖注入管理组件间的依赖关系',
          '考虑使用DTO（数据传输对象）在层之间传递数据',
        ]} />
      </div>
    ),
  },

  // ===== 跨页 8: UML类图 =====
  {
    label: 'UML类图',
    left: (
      <div className="space-y-4">
        <PageTitle>UML类图 PlantUML 示例</PageTitle>
        <BookParagraph>UML类图是描述系统静态结构的重要工具，展示了类、接口、关系等元素。以下是分层架构的UML类图示例：</BookParagraph>
        <BookCode language="bash" maxLines={28} code={plantUmlCode} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>关键元素解释</PageTitle>
        <SectionTitle>类（Class）</SectionTitle>
        <BookParagraph>矩形框表示，包含类名、属性和方法，分为具体类（实线）和抽象类（虚线）。</BookParagraph>
        <SectionTitle>接口（Interface）</SectionTitle>
        <BookParagraph>类名前加«interface»标签，只包含方法签名，不包含实现。</BookParagraph>
        <SectionTitle>继承关系</SectionTitle>
        <BookParagraph>空心三角形箭头的实线，表示一个类继承另一个类或实现接口。</BookParagraph>
        <SectionTitle>依赖关系</SectionTitle>
        <BookParagraph>带箭头的虚线，表示一个类使用另一个类的服务。</BookParagraph>
        <SectionTitle>关联关系</SectionTitle>
        <BookParagraph>实线，表示类之间的结构关系，如聚合和组合。</BookParagraph>
        <SectionTitle>包（Package）</SectionTitle>
        <BookParagraph>用于组织类和接口，类似文件夹结构，提高模型的可读性。</BookParagraph>
        <BookAlert type="info" message="UML类图帮助团队成员理解系统的静态结构，作为设计文档记录系统设计决策，在开发前进行架构验证和讨论。" />
      </div>
    ),
  },

  // ===== 跨页 9: UML工具 =====
  {
    label: 'PlantUML工具',
    left: (
      <div className="space-y-4">
        <PageTitle>UML类图的作用</PageTitle>
        <BookList items={[
          '帮助团队成员理解系统的静态结构',
          '作为设计文档，记录系统设计决策',
          '在开发前进行架构验证和讨论',
          '为代码实现提供蓝图',
          '支持逆向工程，从现有代码生成类图',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>PlantUML工具</PageTitle>
        <BookParagraph>PlantUML是一个开源工具，可以通过简单的文本描述生成UML图。它支持多种UML图类型，包括类图、序列图、用例图等。</BookParagraph>
        <BookAlert type="info" message="使用PlantUML的优点：文本格式易于版本控制，可以集成到开发工具链中，支持自动化生成文档，语法简单学习曲线平缓，社区活跃有丰富的插件和扩展。" />
      </div>
    ),
  },
]

export default function ArchitectureBasicPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
