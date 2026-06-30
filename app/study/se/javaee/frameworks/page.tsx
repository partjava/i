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
  chapterTitle: 'JavaEE框架',
  chapterNumber: 8,
  totalChapters: 17,
  subjectHref: '/study/se/javaee',
  prevChapter: { label: 'Web服务', href: '/study/se/javaee/webservice' },
  nextChapter: { label: '异步处理与并发', href: '/study/se/javaee/async' },
  theme: THEMES.software,
}

const SPREADS = [
  {
    label: '概述',
    left: (
      <div className="space-y-4">
        <PageTitle>Jakarta EE主流框架概述</PageTitle>
        <BookParagraph>Jakarta EE生态下的开源框架通过提供标准化的解决方案，显著提升了企业级应用的开发效率和质量。这些框架覆盖了从Web层到持久层的各个方面，包括控制反转、Web MVC、ORM等核心功能。</BookParagraph>
        <div className="grid grid-cols-1 gap-4">
          <div className="rounded-lg p-4" style={{ background: THEMES.software.paperCard, border: '1px solid rgba(0,0,0,0.06)' }}>
            <h3 className="font-semibold mb-2" style={{ color: THEMES.software.accent }}>控制反转</h3>
            <BookList items={['Spring Framework', 'CDI (Contexts and Dependency Injection)']} />
          </div>
          <div className="rounded-lg p-4" style={{ background: THEMES.software.paperCard, border: '1px solid rgba(0,0,0,0.06)' }}>
            <h3 className="font-semibold mb-2" style={{ color: THEMES.software.accent }}>Web框架</h3>
            <BookList items={['Spring MVC', 'Jakarta Faces (JSF)', 'Struts']} />
          </div>
          <div className="rounded-lg p-4" style={{ background: THEMES.software.paperCard, border: '1px solid rgba(0,0,0,0.06)' }}>
            <h3 className="font-semibold mb-2" style={{ color: THEMES.software.accent }}>数据访问</h3>
            <BookList items={['Hibernate', 'MyBatis', 'Jakarta Persistence (JPA)']} />
          </div>
        </div>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-ink mt-4">框架对比</h3>
        <BookCode language="text" code={`框架       | 类型        | 特点                 | 适用场景
Spring     | IoC/DI容器   | 轻量级、模块化        | 企业级全栈开发
Struts     | Web MVC     | 基于MVC、XML配置为主  | 传统Web应用
Hibernate  | ORM         | 全自动映射、强大查询  | 复杂业务系统
MyBatis    | SQL映射     | 半自动、灵活控制SQL   | 数据层优化`} />
        <BookAlert type="info" message="Spring框架是目前JavaEE生态中最主流的框架选择，其子项目覆盖了从数据访问到微服务的各个层面。" />
        <TagGrid items={['Spring', 'Struts', 'Hibernate', 'MyBatis', '框架对比']} />
      </div>
    ),
  },
  {
    label: 'Spring',
    left: (
      <div className="space-y-4">
        <PageTitle>Spring框架</PageTitle>
        <BookParagraph>Spring是企业级Java开发中最核心的框架，提供控制反转（IoC）、依赖注入（DI）、面向切面编程（AOP）等功能，拥有强大的生态系统。</BookParagraph>
        <h3 className="text-sm font-medium text-ink mt-4">IoC容器配置</h3>
        <BookCode language="java" code={`// Java配置方式
@Configuration
public class AppConfig {

    @Bean
    public UserService userService() {
        return new UserServiceImpl(userDao());
    }

    @Bean
    public UserDao userDao() {
        return new UserDaoImpl();
    }
}`} />
        <BookCode language="java" code={`// 基于注解的依赖注入
@Service
public class UserServiceImpl implements UserService {

    private final UserDao userDao;

    @Autowired
    public UserServiceImpl(UserDao userDao) {
        this.userDao = userDao;
    }

    // 业务方法
}`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-ink mt-4">AOP示例</h3>
        <BookCode language="java" code={`@Aspect
@Component
public class LoggingAspect {

    @Before("execution(* com.example.service.*.*(..))")
    public void logBefore(JoinPoint joinPoint) {
        System.out.println("Before method: " + joinPoint.getSignature().getName());
    }

    @AfterReturning(pointcut = "execution(* com.example.service.*.*(..))", returning = "result")
    public void logAfterReturning(JoinPoint joinPoint, Object result) {
        System.out.println("Method " + joinPoint.getSignature().getName() + " returned: " + result);
    }
}`} />
        <BookAlert type="info" message="Spring Boot进一步简化了Spring应用的配置，内置嵌入式服务器（Tomcat/Jetty），提供自动配置和起步依赖，使得开发微服务应用更为便捷。" />
        <TagGrid items={['IoC', 'DI', 'AOP', '@Bean', '@Autowired']} />
      </div>
    ),
  },
  {
    label: 'Struts',
    left: (
      <div className="space-y-4">
        <PageTitle>Struts框架</PageTitle>
        <BookParagraph>Struts2是一个基于MVC模式的Web应用框架，采用拦截器机制处理请求，提供了丰富的标签库和插件支持。</BookParagraph>
        <h3 className="text-sm font-medium text-ink mt-4">Action开发</h3>
        <BookCode language="java" code={`public class UserAction extends ActionSupport {
    private String username;
    private String password;
    private UserService userService;

    public String execute() {
        User user = userService.login(username, password);
        if (user != null) {
            return SUCCESS;
        } else {
            addActionError("登录失败，请检查用户名和密码");
            return INPUT;
        }
    }

    // Getters and Setters
}`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-ink mt-4">struts.xml配置</h3>
        <BookCode language="xml" code={`<struts>
  <package name="default" extends="struts-default">
    <action name="login" class="com.example.action.UserAction">
      <result name="success">/welcome.jsp</result>
      <result name="input">/login.jsp</result>
    </action>
  </package>
</struts>`} />
        <BookAlert type="warning" message="Struts2目前市场占有率较低，新项目建议使用Spring MVC或Spring WebFlux。Struts2曾被发现多个安全漏洞（如S2系列漏洞），使用需谨慎。" />
        <TagGrid items={['Struts2', 'Action', 'Interceptor', 'MVC', 'OGNL']} />
      </div>
    ),
  },
  {
    label: 'Hibernate',
    left: (
      <div className="space-y-4">
        <PageTitle>Hibernate框架</PageTitle>
        <BookParagraph>Hibernate通过配置文件和注解定义数据库映射关系，支持多种数据库方言，提供丰富的ORM功能。</BookParagraph>
        <BookCode language="java" code={`@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "username", nullable = false, length = 50)
    private String username;

    // Getters and Setters
}`} />
        <BookCode language="java" code={`// Hibernate操作示例
Session session = sessionFactory.openSession();
Transaction tx = null;
try {
    tx = session.beginTransaction();
    User user = new User();
    user.setUsername("john");
    session.save(user);
    User loadedUser = session.get(User.class, 1L);
    loadedUser.setUsername("john_doe");
    session.update(loadedUser);
    tx.commit();
} catch (HibernateException e) {
    if (tx != null) tx.rollback();
} finally {
    session.close();
}`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-ink mt-4">HQL查询</h3>
        <BookCode language="java" code={`// HQL查询
String hql = "FROM User WHERE username = :username";
Query<User> query = session.createQuery(hql, User.class);
query.setParameter("username", "john");
List<User> users = query.getResultList();

// Criteria查询
CriteriaBuilder cb = session.getCriteriaBuilder();
CriteriaQuery<User> criteria = cb.createQuery(User.class);
Root<User> root = criteria.from(User.class);
criteria.select(root).where(cb.equal(root.get("username"), "john"));
List<User> users = session.createQuery(criteria).getResultList();`} />
        <BookAlert type="info" message="Hibernate 6.x 完全实现了 Jakarta Persistence 3.x 规范，支持 Hibernate Search（全文搜索）、Hibernate Validator（Bean Validation）等扩展。" />
        <TagGrid items={['HQL', 'Criteria', '懒加载', '缓存', '多对多']} />
      </div>
    ),
  },
  {
    label: 'MyBatis',
    left: (
      <div className="space-y-4">
        <PageTitle>MyBatis框架</PageTitle>
        <BookParagraph>MyBatis是轻量级的SQL映射框架，支持XML配置和注解两种方式，提供强大的动态SQL功能，性能良好且学习曲线平缓。</BookParagraph>
        <h3 className="text-sm font-medium text-ink mt-4">Mapper接口（注解方式）</h3>
        <BookCode language="java" code={`public interface UserMapper {

    @Select("SELECT * FROM users WHERE id = #{id}")
    User selectUser(int id);

    @Insert("INSERT INTO users(username, email) VALUES(#{username}, #{email})")
    @Options(useGeneratedKeys = true, keyProperty = "id")
    int insertUser(User user);

    @Update("UPDATE users SET username = #{username} WHERE id = #{id}")
    int updateUser(User user);

    @Delete("DELETE FROM users WHERE id = #{id}")
    int deleteUser(int id);
}`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-ink mt-4">动态SQL（XML方式）</h3>
        <BookCode language="xml" code={`<mapper namespace="com.example.mapper.UserMapper">
  <select id="selectUserByCondition" resultType="User">
    SELECT * FROM users
    <where>
      <if test="username != null">
        AND username = #{username}
      </if>
      <if test="email != null">
        AND email = #{email}
      </if>
    </where>
  </select>

  <insert id="insertUser" parameterType="User">
    INSERT INTO users
    <trim prefix="(" suffix=")" suffixOverrides=",">
      username, email, create_time
    </trim>
    <trim prefix="VALUES (" suffix=")" suffixOverrides=",">
      #{username}, #{email}, #{createTime}
    </trim>
  </insert>
</mapper>`} />
        <BookAlert type="info" message="MyBatis适合SQL优化需求高、需要精细控制SQL的执行场景。MyBatis-Plus在MyBatis基础上提供了丰富的单表操作封装。" />
        <TagGrid items={['MyBatis', 'Mapper', '@Select', '动态SQL', 'XML映射']} />
      </div>
    ),
  },
  {
    label: '实用示例',
    left: (
      <div className="space-y-4">
        <PageTitle>SSM框架整合案例</PageTitle>
        <BookParagraph>SSM（Spring + Spring MVC + MyBatis）是目前企业应用中最流行的JavaEE框架组合。</BookParagraph>
        <BookCode language="java" code={`// Spring配置
@Configuration
@EnableWebMvc
@ComponentScan(basePackages = "com.example")
public class AppConfig implements WebMvcConfigurer {

    @Bean
    public DataSource dataSource() {
        DriverManagerDataSource dataSource = new DriverManagerDataSource();
        dataSource.setDriverClassName("com.mysql.cj.jdbc.Driver");
        dataSource.setUrl("jdbc:mysql://localhost:3306/mydb");
        dataSource.setUsername("root");
        dataSource.setPassword("password");
        return dataSource;
    }

    @Bean
    public SqlSessionFactory sqlSessionFactory(DataSource ds) throws Exception {
        SqlSessionFactoryBean sessionFactory = new SqlSessionFactoryBean();
        sessionFactory.setDataSource(ds);
        return sessionFactory.getObject();
    }
}`} />
        <BookCode language="java" code={`// Controller层
@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/{id}")
    public ResponseEntity<User> getUser(@PathVariable int id) {
        User user = userService.getUserById(id);
        if (user == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(user, HttpStatus.OK);
    }
}`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-ink mt-4">事务管理示例</h3>
        <BookCode language="java" code={`@Service
@Transactional(rollbackFor = Exception.class)
public class AccountServiceImpl implements AccountService {

    @Autowired
    private AccountDao accountDao;

    @Override
    public void transferMoney(long fromId, long toId, double amount) {
        Account fromAccount = accountDao.getAccount(fromId);
        if (fromAccount.getBalance() < amount) {
            throw new InsufficientFundsException("余额不足");
        }

        fromAccount.setBalance(fromAccount.getBalance() - amount);
        accountDao.updateAccount(fromAccount);

        Account toAccount = accountDao.getAccount(toId);
        toAccount.setBalance(toAccount.getBalance() + amount);
        accountDao.updateAccount(toAccount);
    }
}`} />
        <BookAlert type="success" message="SSM（Spring+Spring MVC+MyBatis）是传统企业级应用的标准组合。Spring Boot + MyBatis-Plus 是目前更流行的微服务架构选择。" />
        <TagGrid items={['SSM', 'Spring MVC', '事务管理', '@Transactional', '整合']} />
      </div>
    ),
  },
]

export default function JavaEEFrameworksPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
