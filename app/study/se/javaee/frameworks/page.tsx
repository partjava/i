'use client';
import { useState } from 'react';

const tabs = [
  { key: 'overview', label: '概述' },
  { key:'spring', label: 'Spring' },
  { key:'struts', label: 'Struts' },
  { key: 'hibernate', label: 'Hibernate' },
  { key:'mybatis', label: 'MyBatis' },
  { key: 'example', label: '实用示例' },
];

export default function JavaEEFrameworksPage() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 页面大标题 */}
      <h1 className="text-4xl font-bold mb-6">JavaEE框架</h1>

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
            <h2 className="text-2xl font-bold mb-4">Jakarta EE主流框架概述</h2>
            <div className="bg-blue-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">框架在企业开发中的作用</h3>
              <p className="text-gray-700 leading-relaxed">
                Jakarta EE生态下的开源框架通过提供标准化的解决方案，显著提升了企业级应用的开发效率和质量。
                这些框架覆盖了从Web层到持久层的各个方面，包括控制反转、依赖注入、Web MVC、ORM等核心功能。
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-green-50 p-5 rounded-lg">
                <h3 className="text-xl font-bold mb-3">控制反转</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Spring Framework</li>
                  <li>• CDI (Contexts and Dependency Injection)</li>
                </ul>
              </div>
              <div className="bg-yellow-50 p-5 rounded-lg">
                <h3 className="text-xl font-bold mb-3">Web框架</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Spring MVC</li>
                  <li>• Jakarta Faces (JSF)</li>
                  <li>• Struts</li>
                </ul>
              </div>
              <div className="bg-purple-50 p-5 rounded-lg">
                <h3 className="text-xl font-bold mb-3">数据访问</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Hibernate</li>
                  <li>• MyBatis</li>
                  <li>• Jakarta Persistence (JPA)</li>
                </ul>
              </div>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3">框架对比</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">框架</th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">类型</th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">特点</th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">适用场景</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Spring</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">IoC/DI容器</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">轻量级、模块化、强大的生态系统</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">企业级应用全栈开发</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Struts</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Web MVC框架</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">基于MVC模式、XML配置为主</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">传统Web应用开发</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-900">Hibernate</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500">ORM框架</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500">全自动映射、强大的查询语言</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500">复杂业务逻辑系统</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-900">MyBatis</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500">SQL映射框架</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500">半自动映射、灵活控制SQL</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500">数据访问层优化、遗留系统</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab ==='spring' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Spring框架</h2>
            <div className="bg-blue-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">核心特性</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• 控制反转（IoC）与依赖注入（DI）</li>
                <li>• 面向切面编程（AOP）</li>
                <li>• 声明式事务管理</li>
                <li>• 强大的事件驱动模型</li>
                <li>• 集成各种企业服务的能力</li>
              </ul>
            </div>
            <div className="bg-green-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">IoC容器配置</h3>
              <p className="text-gray-700 mb-4">Spring IoC容器通过配置元数据（XML、注解或Java配置）来管理对象的创建和依赖关系。</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold mb-2">XML配置</h4>
                  <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
{`<bean id="userService" class="com.example.UserServiceImpl">
  <property name="userDao" ref="userDao"/>
</bean>

<bean id="userDao" class="com.example.UserDaoImpl"/>`}
                  </pre>
                </div>
                <div>
                  <h4 className="font-bold mb-2">Java配置</h4>
                  <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
{`@Configuration
public class AppConfig {
    
    @Bean
    public UserService userService() {
        return new UserServiceImpl(userDao());
    }
    
    @Bean
    public UserDao userDao() {
        return new UserDaoImpl();
    }
}`}
                  </pre>
                </div>
              </div>
            </div>
            <div className="bg-yellow-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3">基于注解的依赖注入</h3>
              <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
{`@Service
public class UserServiceImpl implements UserService {
    
    private final UserDao userDao;
    
    @Autowired
    public UserServiceImpl(UserDao userDao) {
        this.userDao = userDao;
    }
    
    // 业务方法
}`}
              </pre>
            </div>
            <div className="bg-purple-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3">AOP示例</h3>
              <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
{`@Aspect
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
}`}
              </pre>
            </div>
          </div>
        )}

        {activeTab ==='struts' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Struts框架</h2>
            <div className="bg-blue-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">Struts2架构</h3>
              <p className="text-gray-700 mb-4">
                Struts2是一个基于MVC模式的Web应用框架，采用拦截器机制处理请求，提供了丰富的标签库和插件支持。
              </p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">Action开发</h3>
              <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
{`public class UserAction extends ActionSupport {
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
}`}
              </pre>
            </div>
            <div className="bg-yellow-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3">struts.xml配置</h3>
              <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
{`<struts>
  <package name="default" extends="struts-default">
    <action name="login" class="com.example.action.UserAction">
      <result name="success">/welcome.jsp</result>
      <result name="input">/login.jsp</result>
    </action>
  </package>
</struts>`}
              </pre>
            </div>
          </div>
        )}

        {activeTab === 'hibernate' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Hibernate框架</h2>
            <div className="bg-blue-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">Hibernate配置</h3>
              <p className="text-gray-700 mb-4">Hibernate通过配置文件和注解定义数据库映射关系，支持多种数据库方言。</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                <h4 className="font-bold mb-2">hibernate.cfg.xml</h4>
                  <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
{`<hibernate-configuration>
  <session-factory>
    <property name="hibernate.dialect">org.hibernate.dialect.MySQL8Dialect</property>
    <property name="hibernate.connection.driver_class">com.mysql.cj.jdbc.Driver</property>
    <property name="hibernate.connection.url">jdbc:mysql://localhost:3306/mydb</property>
    <property name="hibernate.connection.username">root</property>
    <property name="hibernate.connection.password">password</property>
    <property name="hibernate.show_sql">true</property>
    <mapping class="com.example.entity.User"/>
  </session-factory>
</hibernate-configuration>`}
                  </pre>
                </div>
                <div>
                  <h4 className="font-bold mb-2">实体类映射</h4>
                  <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
{`@Entity
@Table(name = "users")
public class User {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "username", nullable = false, length = 50)
    private String username;
    
    @Temporal(TemporalType.DATE)
    @Column(name = "create_date")
    private Date createDate;
    
    // Getters and Setters
}`}
                  </pre>
                </div>
              </div>
            </div>
            <div className="bg-green-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">Hibernate操作示例</h3>
              <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
{`// 获取Session
Session session = sessionFactory.openSession();
Transaction tx = null;

try {
    tx = session.beginTransaction();
    
    // 创建对象
    User user = new User();
    user.setUsername("john");
    user.setCreateDate(new Date());
    
    // 保存对象
    session.save(user);
    
    // 查询对象
    User loadedUser = session.get(User.class, 1L);
    
    // 更新对象
    loadedUser.setUsername("john_doe");
    session.update(loadedUser);
    
    // 删除对象
    session.delete(loadedUser);
    
    tx.commit();
} catch (HibernateException e) {
    if (tx != null) tx.rollback();
    e.printStackTrace();
} finally {
    session.close();
}`}
              </pre>
            </div>
            <div className="bg-yellow-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3">HQL查询示例</h3>
              <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
{`// HQL查询
String hql = "FROM User WHERE username = :username";
Query<User> query = session.createQuery(hql, User.class);
query.setParameter("username", "john");
List<User> users = query.getResultList();

// 条件查询
CriteriaBuilder cb = session.getCriteriaBuilder();
CriteriaQuery<User> criteria = cb.createQuery(User.class);
Root<User> root = criteria.from(User.class);
criteria.select(root).where(cb.equal(root.get("username"), "john"));
List<User> users = session.createQuery(criteria).getResultList();`}
              </pre>
            </div>
          </div>
        )}

        {activeTab ==='mybatis' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">MyBatis框架</h2>
            <div className="bg-blue-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">MyBatis特性</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• 轻量级SQL映射框架</li>
                <li>• 灵活控制SQL语句</li>
                <li>• 支持XML配置和注解两种方式</li>
                <li>• 提供强大的动态SQL功能</li>
                <li>• 良好的性能和简单的学习曲线</li>
              </ul>
            </div>
            <div className="bg-green-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">MyBatis配置</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold mb-2">mybatis-config.xml</h4>
                  <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
{`<configuration>
  <environments default="development">
    <environment id="development">
      <transactionManager type="JDBC"/>
      <dataSource type="POOLED">
        <property name="driver" value="com.mysql.cj.jdbc.Driver"/>
        <property name="url" value="jdbc:mysql://localhost:3306/mydb"/>
        <property name="username" value="root"/>
        <property name="password" value="password"/>
      </dataSource>
    </environment>
  </environments>
  <mappers>
    <mapper resource="com/example/mapper/UserMapper.xml"/>
  </mappers>
</configuration>`}
                  </pre>
                </div>
                <div>
                  <h4 className="font-bold mb-2">Mapper接口</h4>
                  <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
{`public interface UserMapper {
    
    @Select("SELECT * FROM users WHERE id = #{id}")
    User selectUser(int id);
    
    @Insert("INSERT INTO users(username, email) VALUES(#{username}, #{email})")
    @Options(useGeneratedKeys = true, keyProperty = "id")
    int insertUser(User user);
    
    @Update("UPDATE users SET username = #{username} WHERE id = #{id}")
    int updateUser(User user);
    
    @Delete("DELETE FROM users WHERE id = #{id}")
    int deleteUser(int id);
}`}
                  </pre>
                </div>
              </div>
            </div>
            <div className="bg-yellow-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3">动态SQL示例</h3>
              <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
{`<mapper namespace="com.example.mapper.UserMapper">
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
</mapper>`}
              </pre>
            </div>
          </div>
        )}

        {activeTab === 'example' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">实用示例</h2>
            <div className="bg-blue-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">SSM框架整合案例</h3>
              <p className="text-gray-700 mb-4">
                SSM（Spring + Spring MVC + MyBatis）是目前企业应用中最流行的JavaEE框架组合，以下是一个简单的整合示例。
              </p>
              <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
{`// 1. Spring配置
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
    public SqlSessionFactory sqlSessionFactory(DataSource dataSource) throws Exception {
        SqlSessionFactoryBean sessionFactory = new SqlSessionFactoryBean();
        sessionFactory.setDataSource(dataSource);
        sessionFactory.setMapperLocations(new PathMatchingResourcePatternResolver()
            .getResources("classpath:mappers/*.xml"));
        return sessionFactory.getObject();
    }
    
    @Bean
    public PlatformTransactionManager transactionManager(DataSource dataSource) {
        return new DataSourceTransactionManager(dataSource);
    }
}`}
              </pre>
              <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto mt-4">
{`// 2. MyBatis Mapper接口
public interface UserMapper {
    @Select("SELECT * FROM users WHERE id = #{id}")
    User selectUser(int id);
}`}
              </pre>
              <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto mt-4">
{`// 3. Service层
@Service
@Transactional
public class UserServiceImpl implements UserService {
    
    @Autowired
    private UserMapper userMapper;
    
    @Override
    public User getUserById(int id) {
        return userMapper.selectUser(id);
    }
}`}
              </pre>
              <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto mt-4">
{`// 4. Controller层
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
}`}
              </pre>
            </div>
            <div className="bg-green-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">事务管理示例</h3>
              <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
{`@Service
@Transactional(rollbackFor = Exception.class)
public class AccountServiceImpl implements AccountService {
    
    @Autowired
    private AccountDao accountDao;
    
    @Override
    public void transferMoney(long fromAccountId, long toAccountId, double amount) {
        // 检查转出账户余额
        Account fromAccount = accountDao.getAccount(fromAccountId);
        if (fromAccount.getBalance() < amount) {
            throw new InsufficientFundsException("余额不足");
        }
        
        // 减少转出账户余额
        fromAccount.setBalance(fromAccount.getBalance() - amount);
        accountDao.updateAccount(fromAccount);
        
        // 模拟异常
        if (Math.random() > 0.5) {
            throw new RuntimeException("模拟随机异常");
        }
        
        // 增加转入账户余额
        Account toAccount = accountDao.getAccount(toAccountId);
        toAccount.setBalance(toAccount.getBalance() + amount);
        accountDao.updateAccount(toAccount);
    }
}`}
              </pre>
            </div>
          </div>
        )}
      </div>

      <div className="mt-10 flex justify-between">
        <a href="/study/se/javaee/webservice" className="px-4 py-2 text-blue-600 hover:text-blue-800">
          ← Web服务
        </a>
        <a
          href="/study/se/javaee/async"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          异步处理与并发 →
        </a>
      </div>
    </div>
  );
}