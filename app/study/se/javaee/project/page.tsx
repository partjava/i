'use client';
import { useState } from 'react';

const tabs = [
  { key: 'overview', label: '概述' },
  { key: 'structure', label: '项目结构' },
  { key: 'user', label: '用户管理模块' },
  { key: 'order', label: '订单管理模块' },
  { key: 'integration', label: '综合技术整合' },
  { key: 'deploy', label: '部署与运维' },
  { key: 'example', label: '完整案例' },
];

export default function JavaEEProjectPage() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 页面大标题 */}
      <h1 className="text-4xl font-bold mb-6">实战项目开发</h1>

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
            <h2 className="text-2xl font-bold mb-4">实战项目开发概述</h2>
            <div className="bg-blue-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">企业级项目开发流程</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• 需求分析与系统设计</li>
                <li>• 技术选型与架构搭建</li>
                <li>• 功能模块开发与测试</li>
                <li>• 技术整合与优化</li>
                <li>• 部署上线与运维</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'structure' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">项目结构设计</h2>
            <div className="bg-blue-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">典型分层结构</h3>
              <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
{`- controller/   // 控制层
- service/      // 业务层
- dao/          // 数据访问层
- model/        // 实体类
- config/       // 配置类
- resources/    // 配置文件、静态资源
`}
              </pre>
            </div>
          </div>
        )}

        {activeTab === 'user' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">用户管理模块</h2>
            <div className="bg-blue-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">用户注册与登录</h3>
              <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
{`@RestController
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
}`}
              </pre>
            </div>
            <div className="bg-green-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">用户Service实现</h3>
              <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
{`@Service
public class UserService {
    public void register(User user) {
        // 校验、加密、保存数据库
    }
    public String login(User user) {
        // 校验用户名密码，生成Token
        return "token";
    }
}`}
              </pre>
            </div>
          </div>
        )}

        {activeTab === 'order' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">订单管理模块</h2>
            <div className="bg-blue-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">订单接口示例</h3>
              <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
{`@RestController
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
}`}
              </pre>
            </div>
            <div className="bg-green-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">订单Service实现</h3>
              <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
{`@Service
public class OrderService {
    public void create(Order order) {
        // 校验、库存扣减、保存订单
    }
    public Order getById(Long id) {
        // 查询订单
        return new Order();
    }
}`}
              </pre>
            </div>
          </div>
        )}

        {activeTab === 'integration' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">综合技术整合</h2>
            <div className="bg-blue-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">Spring + MyBatis整合</h3>
              <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
{`@Service
public class UserService {
    @Autowired
    private UserMapper userMapper;
    public User getUser(int id) {
        return userMapper.selectUser(id);
    }
}`}
              </pre>
            </div>
            <div className="bg-green-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">微服务远程调用</h3>
              <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
{`@FeignClient("order-service")
public interface OrderClient {
    @GetMapping("/order/{id}")
    Order getOrder(@PathVariable Long id);
}`}
              </pre>
            </div>
          </div>
        )}

        {activeTab === 'deploy' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">部署与运维</h2>
            <div className="bg-blue-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">常见部署方式</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• 本地/服务器JAR包运行</li>
                <li>• Docker容器化部署</li>
                <li>• 云平台自动化部署</li>
              </ul>
            </div>
            <div className="bg-green-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">Dockerfile示例</h3>
              <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
{`FROM openjdk:17-jdk-alpine
COPY target/app.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]`}
              </pre>
            </div>
          </div>
        )}

        {activeTab === 'example' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">完整案例</h2>
            <div className="bg-blue-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">用户下单全流程</h3>
              <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
{`// 用户注册、登录、下单、查询订单等接口组合调用
// 具体实现见前述各模块代码
`}
              </pre>
            </div>
          </div>
        )}
      </div>

      <div className="mt-10 flex justify-between">
        <a href="/study/se/javaee/microservice" className="px-4 py-2 text-blue-600 hover:text-blue-800">
          ← 微服务架构
        </a>
        <a
          href="/study/se/javaee/tools"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          开发工具与环境 →
        </a>
      </div>
    </div>
  );
} 