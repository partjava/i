'use client';
import { useState } from 'react';

const tabs = [
  { key: 'overview', label: '概述' },
  { key: 'servlet', label: 'Servlet基础' },
  { key: 'jsp', label: 'JSP技术' },
  { key: 'filter', label: '过滤器与监听器' },
];

export default function JavaEEWebPage() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">JavaEE Web开发基础</h1>

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
            <h2 className="text-2xl font-bold mb-4">JavaEE Web开发基础概述</h2>
            
            <div className="bg-blue-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">什么是Web开发？</h3>
              <p className="text-gray-700 leading-relaxed">
                Web开发是指使用JavaEE技术栈构建Web应用程序的过程。它涉及处理HTTP请求、生成动态响应、管理会话状态、访问数据库等核心功能。JavaEE提供了丰富的API和组件，使开发者能够构建安全、可扩展的企业级Web应用。
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-green-50 p-5 rounded-lg">
                <h3 className="text-xl font-bold mb-3">核心组件</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Servlet - 处理HTTP请求和响应</li>
                  <li>• JSP - 生成动态Web页面</li>
                  <li>• Filter - 请求和响应的预处理</li>
                  <li>• Listener - 监听Web应用事件</li>
                </ul>
              </div>
              
              <div className="bg-yellow-50 p-5 rounded-lg">
                <h3 className="text-xl font-bold mb-3">开发环境</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• JDK (Java Development Kit)</li>
                  <li>• Web容器 (如Tomcat)</li>
                  <li>• IDE (如Eclipse, IntelliJ IDEA)</li>
                  <li>• 构建工具 (如Maven, Gradle)</li>
                </ul>
              </div>
            </div>

            <div className="bg-purple-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3">Web应用架构</h3>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="font-bold text-purple-600 mb-2">表示层</h4>
                  <p className="text-gray-600">处理用户界面和交互，包括JSP、HTML、CSS、JavaScript等</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="font-bold text-purple-600 mb-2">控制层</h4>
                  <p className="text-gray-600">处理请求路由和业务逻辑控制，主要由Servlet实现</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="font-bold text-purple-600 mb-2">业务层</h4>
                  <p className="text-gray-600">实现核心业务逻辑，通常使用EJB或Spring框架</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="font-bold text-purple-600 mb-2">持久层</h4>
                  <p className="text-gray-600">负责数据访问和持久化，使用JPA或JDBC等技术</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'servlet' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Servlet基础</h2>
            
            <div className="bg-blue-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">什么是Servlet？</h3>
              <p className="text-gray-700 leading-relaxed">
                Servlet是JavaEE中处理Web请求的核心组件，运行在Web容器中。它能够接收客户端的HTTP请求并生成动态响应。Servlet通过实现javax.servlet.Servlet接口或继承javax.servlet.http.HttpServlet类来创建。
              </p>
            </div>

            <div className="bg-green-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">Servlet生命周期</h3>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="font-bold text-green-600 mb-2">1. 初始化</h4>
                  <p className="text-gray-600">容器调用init()方法，只执行一次</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="font-bold text-green-600 mb-2">2. 服务</h4>
                  <p className="text-gray-600">容器调用service()方法处理请求，可多次执行</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="font-bold text-green-600 mb-2">3. 销毁</h4>
                  <p className="text-gray-600">容器调用destroy()方法，只执行一次</p>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3">示例代码</h3>
              <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
{`@WebServlet("/hello")
public class HelloServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, 
                        HttpServletResponse response) 
            throws ServletException, IOException {
        response.setContentType("text/html");
        PrintWriter out = response.getWriter();
        out.println("<html><body>");
        out.println("<h1>Hello, World!</h1>");
        out.println("</body></html>");
    }
}`}
              </pre>
            </div>
          </div>
        )}

        {activeTab === 'jsp' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">JSP技术</h2>
            
            <div className="bg-blue-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">什么是JSP？</h3>
              <p className="text-gray-700 leading-relaxed">
                JSP(JavaServer Pages)是一种在HTML页面中嵌入Java代码的技术，用于生成动态Web内容。JSP页面最终会被编译成Servlet，但提供了更简单的开发方式，特别适合表示层的开发。
              </p>
            </div>

            <div className="bg-green-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">JSP基本语法</h3>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="font-bold text-green-600 mb-2">脚本元素</h4>
                  <pre className="bg-gray-100 p-2 rounded">
{`<% Java代码 %>
<%= 表达式 %>
<%! 声明 %>`}
                  </pre>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="font-bold text-green-600 mb-2">指令</h4>
                  <pre className="bg-gray-100 p-2 rounded">
{`<%@ page ... %>
<%@ include ... %>
<%@ taglib ... %>`}
                  </pre>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="font-bold text-green-600 mb-2">动作</h4>
                  <pre className="bg-gray-100 p-2 rounded">
{`<jsp:include ... />
<jsp:forward ... />
<jsp:useBean ... />`}
                  </pre>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3">示例代码</h3>
              <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
{`<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<!DOCTYPE html>
<html>
<head>
    <title>JSP示例</title>
</head>
<body>
    <h1>欢迎访问</h1>
    <%
        String message = "Hello, JSP!";
        out.println(message);
    %>
    <p>当前时间: <%= new java.util.Date() %></p>
</body>
</html>`}
              </pre>
            </div>
          </div>
        )}

        {activeTab === 'filter' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">过滤器与监听器</h2>
            
            <div className="bg-blue-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">过滤器(Filter)</h3>
              <p className="text-gray-700 leading-relaxed">
                过滤器是JavaEE中用于拦截请求和响应的组件，可以在请求到达Servlet之前或响应发送到客户端之前进行预处理。常用于实现日志记录、安全控制、字符编码转换等功能。
              </p>
            </div>

            <div className="bg-green-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">监听器(Listener)</h3>
              <p className="text-gray-700 leading-relaxed">
                监听器用于监听Web应用中的各种事件，如ServletContext、HttpSession、ServletRequest的生命周期事件。可以实现应用初始化、会话管理、请求统计等功能。
              </p>
            </div>

            <div className="bg-yellow-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3">示例代码</h3>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="font-bold text-yellow-600 mb-2">过滤器示例</h4>
                  <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
{`@WebFilter("/*")
public class EncodingFilter implements Filter {
    public void doFilter(ServletRequest request, 
                        ServletResponse response,
                        FilterChain chain) 
            throws IOException, ServletException {
        request.setCharacterEncoding("UTF-8");
        response.setCharacterEncoding("UTF-8");
        chain.doFilter(request, response);
    }
}`}
                  </pre>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="font-bold text-yellow-600 mb-2">监听器示例</h4>
                  <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
{`@WebListener
public class SessionListener implements HttpSessionListener {
    public void sessionCreated(HttpSessionEvent se) {
        System.out.println("Session created: " + se.getSession().getId());
    }
    
    public void sessionDestroyed(HttpSessionEvent se) {
        System.out.println("Session destroyed: " + se.getSession().getId());
    }
}`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-10 flex justify-between">
        <a href="/study/se/javaee/components" className="px-4 py-2 text-blue-600 hover:text-blue-800">
          ← JavaEE核心组件
        </a>
        <a
          href="/study/se/javaee/db"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          数据库访问技术 →
        </a>
      </div>
    </div>
  );
}
