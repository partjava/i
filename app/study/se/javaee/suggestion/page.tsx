'use client';
import { useState } from 'react';

const tabs = [
  { key: 'overview', label: '概述' },
  { key: 'roadmap', label: '学习路线' },
  { key: 'practice', label: '实践与项目' },
  { key: 'faq', label: '常见问题与答疑' },
  { key: 'resource', label: '资源推荐' },
];

export default function JavaEESuggestionPage() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">学习建议</h1>
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
            <h2 className="text-2xl font-bold mb-4">JavaEE学习建议概述</h2>
            <div className="bg-blue-50 p-6 rounded-lg mb-6">
              <ul className="space-y-2 text-gray-700">
                <li>• 理论与实践结合，重视动手能力</li>
                <li>• 关注主流技术栈与企业应用场景</li>
                <li>• 持续学习，紧跟技术发展</li>
                <li>• 多做项目，积累实战经验</li>
                <li>• 善用社区与开源资源</li>
              </ul>
            </div>
          </div>
        )}
        {activeTab === 'roadmap' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">学习路线</h2>
            <div className="bg-blue-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">推荐学习路径</h3>
              <ol className="list-decimal ml-6 space-y-2 text-gray-700">
                <li>Java基础与面向对象</li>
                <li>Web开发基础（Servlet/JSP）</li>
                <li>数据库与JDBC/JPA</li>
                <li>企业级服务与安全</li>
                <li>主流框架（Spring、Hibernate等）</li>
                <li>微服务与容器化</li>
                <li>DevOps与CI/CD</li>
                <li>性能调优与监控</li>
                <li>前沿技术趋势</li>
              </ol>
            </div>
            <div className="bg-green-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">路线图示例</h3>
              <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
{`Java基础 → Web开发 → 数据库 → 企业服务 → 框架 → 微服务 → 云原生 → DevOps → 性能优化 → 前沿技术`}
              </pre>
            </div>
          </div>
        )}
        {activeTab === 'practice' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">实践与项目</h2>
            <div className="bg-blue-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">实战建议</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• 参与开源项目，提升协作能力</li>
                <li>• 模拟企业级项目开发流程</li>
                <li>• 关注代码规范与文档编写</li>
                <li>• 多用自动化测试与持续集成</li>
                <li>• 练习部署与运维</li>
              </ul>
            </div>
            <div className="bg-green-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">项目实战案例</h3>
              <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
{`# Spring Boot + MyBatis企业管理系统
- 用户管理、权限控制、订单管理、报表统计
- 支持Docker容器化部署
- 集成Jenkins自动化CI/CD
- Prometheus+Grafana监控
- 代码仓库：https://github.com/example/enterprise-demo`}
              </pre>
            </div>
          </div>
        )}
        {activeTab === 'faq' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">常见问题与答疑</h2>
            <div className="bg-blue-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">学习常见疑问</h3>
              <ul className="space-y-2 text-gray-700">
                <li>Q: JavaEE和Spring Boot是什么关系？<br/>A: Spring Boot是JavaEE生态的重要补充，简化了配置和开发流程。</li>
                <li>Q: 如何高效掌握企业级开发？<br/>A: 多做项目，注重团队协作和工程实践。</li>
                <li>Q: 面试时重点考察哪些内容？<br/>A: 基础知识、主流框架、项目经验、性能与安全。</li>
                <li>Q: 如何跟进技术趋势？<br/>A: 关注官方文档、技术社区、开源项目。</li>
              </ul>
            </div>
          </div>
        )}
        {activeTab === 'resource' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">资源推荐</h2>
            <div className="bg-blue-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">优质学习资源</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• 官方文档：<a href="https://jakarta.ee/" className="text-blue-600 underline" target="_blank">Jakarta EE</a></li>
                <li>• Spring官方文档：<a href="https://spring.io/docs" className="text-blue-600 underline" target="_blank">Spring Docs</a></li>
                <li>• 菜鸟教程：<a href="https://www.runoob.com/java/java-tutorial.html" className="text-blue-600 underline" target="_blank">Java教程</a></li>
                <li>• 极客时间专栏、慕课网、B站优质课程</li>
                <li>• GitHub优质开源项目</li>
                <li>• Stack Overflow、CSDN、掘金等技术社区</li>
              </ul>
            </div>
            <div className="bg-green-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">工具与平台</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• IDEA、Eclipse、VSCode等开发工具</li>
                <li>• Postman、Swagger接口调试</li>
                <li>• Docker、Kubernetes实验环境</li>
                <li>• Jenkins、GitLab CI持续集成平台</li>
              </ul>
            </div>
          </div>
        )}
      </div>
      <div className="mt-10 flex justify-between">
        <a href="/study/se/javaee/trend" className="px-4 py-2 text-blue-600 hover:text-blue-800">
          ← 前沿技术趋势
        </a>
        <a
          href="/study/se/javaee/intro"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          JavaEE概述 →
        </a>
      </div>
    </div>
  );
} 