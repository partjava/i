'use client';

import { useState } from'react';

const tabs = [
  { key: 'overview', label: 'JavaEE概述' },
  { key: 'history', label: '发展历程' },
  { key: 'architecture', label: '平台架构' },
  { key: 'components', label: '核心组件' },
  { key: 'comparison', label: '与JavaSE对比' },
];

export default function JavaEEIntroPage() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-6">JavaEE概述</h1>
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8 overflow-x-auto" aria-label="Tabs">
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm focus:outline-none ${
                activeTab === tab.key
                 ? 'border-blue-500 text-blue-600 font-bold'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
      <div className="bg-white rounded-lg shadow p-8">
        {activeTab === 'overview' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">JavaEE概述</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="bg-blue-50 p-5 rounded-xl shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                    {/* 这里可根据实际情况添加图标库图标，此处保留占位 */}
                    <span className="material-icons">view_module</span>
                  </div>
                  <h3 className="ml-3 text-xl font-bold text-gray-800">企业级平台</h3>
                </div>
                <p className="text-gray-600">JavaEE是专为构建大型、分布式、高可靠性企业应用而设计的平台，提供完整的解决方案。</p>
              </div>
              <div className="bg-blue-50 p-5 rounded-xl shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                    <span className="material-icons">code</span>
                  </div>
                  <h3 className="ml-3 text-xl font-bold text-gray-800">标准规范</h3>
                </div>
                <p className="text-gray-600">定义了一套完整的API和规范，确保不同厂商实现的兼容性和互操作性。</p>
              </div>
              <div className="bg-blue-50 p-5 rounded-xl shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                    <span className="material-icons">rocket_launch</span>
                  </div>
                  <h3 className="ml-3 text-xl font-bold text-gray-800">简化开发</h3>
                </div>
                <p className="text-gray-600">通过提供企业级服务如事务管理、安全认证、数据库连接等，简化开发流程。</p>
              </div>
            </div>
            <div className="bg-blue-50 p-6 rounded-xl mb-6">
              <h3 className="text-xl font-bold mb-3">什么是JavaEE？</h3>
              <p className="text-gray-700 leading-relaxed">
                JavaEE（Java Enterprise Edition）是一种基于Java语言的企业级应用开发平台，它提供了一系列的API和规范，用于构建大型、分布式、高性能、安全可靠的企业级应用程序。JavaEE的核心目标是简化企业级应用的开发、部署和管理，通过提供标准的技术和框架，让开发者能够专注于业务逻辑的实现，而不必重复造轮子。
              </p>
            </div>
            <div className="bg-blue-50 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-3">核心优势</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="material-icons text-green-500 mt-1 mr-2">check</span>
                  <span>标准化：提供统一的API和规范，降低学习成本和技术风险</span>
                </li>
                <li className="flex items-start">
                  <span className="material-icons text-green-500 mt-1 mr-2">check</span>
                  <span>企业级服务：内置事务管理、安全认证、消息队列等企业级功能</span>
                </li>
                <li className="flex items-start">
                  <span className="material-icons text-green-500 mt-1 mr-2">check</span>
                  <span>可扩展性：支持分布式架构和集群部署，轻松应对高并发场景</span>
                </li>
                <li className="flex items-start">
                  <span className="material-icons text-green-500 mt-1 mr-2">check</span>
                  <span>成熟生态：拥有大量的开源框架、工具和社区支持</span>
                </li>
                <li className="flex items-start">
                  <span className="material-icons text-green-500 mt-1 mr-2">check</span>
                  <span>跨平台兼容：基于Java语言，支持多种操作系统和应用服务器</span>
                </li>
              </ul>
            </div>
          </div>
        )}
        {activeTab === 'history' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">发展历程</h2>
            <div className="relative">
              <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-blue-200 transform -translate-x-1/2"></div>
              <div className="relative mb-10 ml-8">
                <div className="absolute left-0 top-0 w-4 h-4 rounded-full bg-blue-500 transform -translate-x-1/2"></div>
                <div className="bg-blue-50 p-5 rounded-lg shadow-sm">
                  <h3 className="text-xl font-bold mb-2">J2EE 1.2 (1999)</h3>
                  <p className="text-gray-700">
                    Sun Microsystems发布J2EE 1.2，包含Servlet 2.2、JSP 1.1、EJB 1.1等核心技术，奠定了企业级Java开发的基础。
                  </p>
                </div>
              </div>
              <div className="relative mb-10 ml-8">
                <div className="absolute left-0 top-0 w-4 h-4 rounded-full bg-blue-500 transform -translate-x-1/2"></div>
                <div className="bg-blue-50 p-5 rounded-lg shadow-sm">
                  <h3 className="text-xl font-bold mb-2">J2EE 1.4 (2003)</h3>
                  <p className="text-gray-700">
                    引入Servlet 2.4、JSP 2.0、JSTL等技术，简化了Web开发，并提供了更好的XML处理支持。
                  </p>
                </div>
              </div>
              <div className="relative mb-10 ml-8">
                <div className="absolute left-0 top-0 w-4 h-4 rounded-full bg-blue-500 transform -translate-x-1/2"></div>
                <div className="bg-blue-50 p-5 rounded-lg shadow-sm">
                  <h3 className="text-xl font-bold mb-2">JavaEE 5 (2006)</h3>
                  <p className="text-gray-700">
                    更名为JavaEE 5，引入注解、JPA 1.0、EJB 3.0等特性，大幅简化了企业级开发，降低了学习曲线。
                  </p>
                </div>
              </div>
              <div className="relative mb-10 ml-8">
                <div className="absolute left-0 top-0 w-4 h-4 rounded-full bg-blue-500 transform -translate-x-1/2"></div>
                <div className="bg-blue-50 p-5 rounded-lg shadow-sm">
                  <h3 className="text-xl font-bold mb-2">JavaEE 7 (2013)</h3>
                  <p className="text-gray-700">
                    增强对WebSocket、JSON处理、Batch Processing等现代Web技术的支持，进一步提升开发效率。
                  </p>
                </div>
              </div>
              <div className="relative ml-8">
                <div className="absolute left-0 top-0 w-4 h-4 rounded-full bg-blue-500 transform -translate-x-1/2"></div>
                <div className="bg-blue-50 p-5 rounded-lg shadow-sm">
                  <h3 className="text-xl font-bold mb-2">Jakarta EE (2018至今)</h3>
                  <p className="text-gray-700">
                    Oracle将JavaEE捐赠给Eclipse基金会后更名为Jakarta EE，继续发展企业级Java技术，保持与JavaEE的兼容性。
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
        {activeTab === 'architecture' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">平台架构</h2>
            <div className="bg-yellow-50 p-6 rounded-xl mb-6">
              <h3 className="text-xl font-bold mb-3">分层架构</h3>
              <p className="text-gray-700 mb-4">
                JavaEE采用分层架构设计，将应用程序划分为不同的功能层，各层之间职责明确，便于开发和维护。
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-blue-500">
                  <h4 className="font-bold text-blue-600 mb-2">表示层</h4>
                  <p className="text-gray-600">
                    负责与用户交互，处理HTTP请求和响应，常用技术包括Servlet、JSP、JSF等。
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-green-500">
                  <h4 className="font-bold text-green-600 mb-2">业务逻辑层</h4>
                  <p className="text-gray-600">
                    实现核心业务逻辑，通过EJB或Spring等框架提供事务管理和业务服务。
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-purple-500">
                  <h4 className="font-bold text-purple-600 mb-2">持久层</h4>
                  <p className="text-gray-600">
                    负责数据存储和访问，使用JPA、Hibernate等技术与数据库交互。
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-orange-500">
                  <h4 className="font-bold text-orange-600 mb-2">企业信息系统层</h4>
                  <p className="text-gray-600">
                    集成外部系统如ERP、CRM等，实现企业级数据共享和业务集成。
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-yellow-50 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-3">容器架构</h3>
              <p className="text-gray-700 mb-4">
                JavaEE应用运行在容器中，容器提供了运行环境和企业级服务支持。
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-red-500">
                  <h4 className="font-bold text-red-600 mb-2">Web容器</h4>
                  <p className="text-gray-600">
                    如Tomcat、Jetty等，负责管理Servlet、JSP等Web组件，处理HTTP请求。
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-teal-500">
                  <h4 className="font-bold text-teal-600 mb-2">EJB容器</h4>
                  <p className="text-gray-600">
                    管理EJB组件，提供事务管理、安全认证、资源池等企业级服务。
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
        {activeTab === 'components' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">核心组件</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-green-50 p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-bold mb-3 text-gray-800">Servlet</h3>
                <p className="text-gray-700">
                  处理Web请求的核心组件，运行在Web容器中，接收HTTP请求并生成动态响应。
                </p>
              </div>
              <div className="bg-green-50 p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-bold mb-3 text-gray-800">JSP (JavaServer Pages)</h3>
                <p className="text-gray-700">
                  在HTML页面中嵌入Java代码的技术，用于生成动态Web内容，最终会被编译为Servlet。
                </p>
              </div>
              <div className="bg-green-50 p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-bold mb-3 text-gray-800">EJB (Enterprise JavaBeans)</h3>
                <p className="text-gray-700">
                  用于实现企业级业务逻辑的组件，提供事务管理、安全、远程访问等企业级服务。
                </p>
              </div>
              <div className="bg-green-50 p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-bold mb-3 text-gray-800">JPA (Java Persistence API)</h3>
                <p className="text-gray-700">
                  用于对象关系映射的标准API，简化数据库操作，支持ORM框架如Hibernate。
                </p>
              </div>
            </div>
            <div className="bg-green-50 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-3">其他重要组件</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="material-icons text-green-500 mt-1 mr-2">check</span>
                  <span><strong>JSF (JavaServer Faces)</strong> - 用于构建Web用户界面的组件化框架</span>
                </li>
                <li className="flex items-start">
                  <span className="material-icons text-green-500 mt-1 mr-2">check</span>
                  <span><strong>JMS (Java Message Service)</strong> - 用于实现异步通信的消息队列API</span>
                </li>
                <li className="flex items-start">
                  <span className="material-icons text-green-500 mt-1 mr-2">check</span>
                  <span><strong>JAX-RS (Java API for RESTful Web Services)</strong> - 用于构建RESTful API的标准</span>
                </li>
                <li className="flex items-start">
                  <span className="material-icons text-green-500 mt-1 mr-2">check</span>
                  <span><strong>CDI (Contexts and Dependency Injection)</strong> - 依赖注入和上下文管理的标准</span>
                </li>
                <li className="flex items-start">
                  <span className="material-icons text-green-500 mt-1 mr-2">check</span>
                  <span><strong>JTA (Java Transaction API)</strong> - 管理分布式事务的标准API</span>
                </li>
              </ul>
            </div>
          </div>
        )}
        {activeTab === 'comparison' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">JavaEE与JavaSE对比</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 rounded-lg overflow-hidden">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">特性</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">JavaSE</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">JavaEE</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">定位</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">标准版，基础开发平台</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">企业版，大型分布式应用</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">适用场景</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">桌面应用、控制台程序</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">企业级Web应用、分布式系统</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">核心API</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">基础类库、集合框架、多线程</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Servlet、JSP、EJB、JPA、JMS等</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">事务管理</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">需手动实现</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">内置JTA，支持分布式事务</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">安全机制</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">基本安全API</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">企业级安全认证和授权</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">部署环境</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">直接运行在JVM上</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">需部署在应用服务器中</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">数据库访问</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">JDBC（需手动管理连接）</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">JPA、连接池、事务管理</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
      {/* 底部导航 */}
      <div className="mt-10 flex justify-between">
        <a href="/study/se" className="px-4 py-2 text-blue-600 hover:text-blue-800">
          ← Java学习路径
        </a>
        <a href="/study/se/javaee/components" className="px-4 py-2 text-blue-600 hover:text-blue-800">
          JavaEE核心组件 →
        </a>
      </div>
    </div>
  );
}