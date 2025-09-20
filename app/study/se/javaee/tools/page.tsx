'use client';
import { useState } from 'react';

const tabs = [
  { key: 'overview', label: '概述' },
  { key: 'ide', label: '开发工具' },
  { key: 'env', label: '环境配置' },
  { key: 'build', label: '构建与依赖' },
  { key: 'debug', label: '调试与测试' },
  { key: 'faq', label: '常见问题' },
  { key: 'example', label: '实用示例' },
];

export default function JavaEEToolsPage() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 页面大标题 */}
      <h1 className="text-4xl font-bold mb-6">开发工具与环境</h1>

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
            <h2 className="text-2xl font-bold mb-4">开发工具与环境概述</h2>
            <div className="bg-blue-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">JavaEE开发常用工具与环境</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• JDK（Java开发工具包）</li>
                <li>• IDE（IntelliJ IDEA、Eclipse等）</li>
                <li>• 构建工具（Maven、Gradle）</li>
                <li>• Web服务器（Tomcat、Jetty等）</li>
                <li>• 数据库（MySQL、PostgreSQL等）</li>
                <li>• 版本管理（Git）</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'ide' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">开发工具</h2>
            <div className="bg-blue-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">主流IDE</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• IntelliJ IDEA：强大、智能、插件丰富</li>
                <li>• Eclipse：开源、插件生态好</li>
                <li>• VS Code：轻量级、适合多语言开发</li>
              </ul>
            </div>
            <div className="bg-green-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">常用插件</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Lombok</li>
                <li>• MyBatisX</li>
                <li>• Spring Assistant</li>
                <li>• Git Integration</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'env' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">环境配置</h2>
            <div className="bg-blue-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">JDK与环境变量</h3>
              <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
{`# 设置JAVA_HOME
export JAVA_HOME=/usr/lib/jvm/java-17-openjdk
export PATH=$JAVA_HOME/bin:$PATH
`}
              </pre>
            </div>
            <div className="bg-green-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">Tomcat配置</h3>
              <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
{`# conf/server.xml 端口配置
<Connector port="8080" protocol="HTTP/1.1" ... />
`}
              </pre>
            </div>
          </div>
        )}

        {activeTab === 'build' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">构建与依赖管理</h2>
            <div className="bg-blue-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">Maven依赖示例</h3>
              <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
{`<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-web</artifactId>
  <version>2.7.0</version>
</dependency>
`}
              </pre>
            </div>
            <div className="bg-green-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">Gradle依赖示例</h3>
              <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
{`implementation 'org.springframework.boot:spring-boot-starter-web:2.7.0'
`}
              </pre>
            </div>
          </div>
        )}

        {activeTab === 'debug' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">调试与测试</h2>
            <div className="bg-blue-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">断点调试</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• 使用IDEA/Eclipse设置断点</li>
                <li>• 远程调试（配置JPDA）</li>
              </ul>
            </div>
            <div className="bg-green-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">单元测试与集成测试</h3>
              <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
{`@SpringBootTest
public class UserServiceTest {
    @Autowired
    private UserService userService;
    @Test
    public void testRegister() {
        userService.register(new User());
    }
}`}
              </pre>
            </div>
          </div>
        )}

        {activeTab === 'faq' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">常见问题</h2>
            <div className="bg-blue-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">常见报错与解决</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• 端口被占用：更换端口或释放进程</li>
                <li>• 依赖冲突：排查Maven依赖树</li>
                <li>• 编码问题：统一UTF-8编码</li>
                <li>• 数据库连接失败：检查配置与网络</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'example' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">实用示例</h2>
            <div className="bg-blue-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">Maven打包与运行</h3>
              <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
{`# 打包
mvn clean package
# 运行
java -jar target/app.jar
`}
              </pre>
            </div>
            <div className="bg-green-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">IDEA远程调试配置</h3>
              <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
{`# 启动参数
-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=5005
`}
              </pre>
            </div>
          </div>
        )}
      </div>

      <div className="mt-10 flex justify-between">
        <a href="/study/se/javaee/project" className="px-4 py-2 text-blue-600 hover:text-blue-800">
          ← 实战项目开发
        </a>
        <a
          href="/study/se/javaee/performance"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          性能调优与监控 →
        </a>
      </div>
    </div>
  );
} 