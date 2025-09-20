'use client';

import { useState } from'react';

const tabs = [
  { key: 'components', label: '核心组件' },
];

export default function JavaEEComponentsPage() {
  const [activeTab, setActiveTab] = useState('components');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-6 mt-4">JavaEE核心组件</h1>
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
        {activeTab === 'components' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">JavaEE核心组件</h2>
            
            <div className="bg-green-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">Servlet</h3>
              <p className="text-gray-700 leading-relaxed">
                Servlet 是 JavaEE 中处理 Web 请求的核心组件，运行在 Web 容器（如 Tomcat、Jetty）中，用于接收客户端的 HTTP 请求并生成动态响应。它通过 `service()` 方法处理请求，可根据请求方法（GET、POST 等）分别在 `doGet()`、`doPost()` 等方法中处理逻辑。
              </p>
              <pre className="bg-gray-100 p-4 rounded-lg">
                <code className="text-gray-800">
                  {`import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class ProductServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) 
      throws ServletException, IOException {
        response.setContentType("text/html");
        try (java.io.PrintWriter out = response.getWriter()) {
            out.println("&lt;html&gt;&lt;body&gt;&lt;h1&gt;商品列表页&lt;/h1&gt;");
            out.println("&lt;p&gt;处理 GET 请求获取商品信息&lt;/p&gt;");
            out.println("&lt;/body&gt;&lt;/html&gt;");
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) 
      throws ServletException, IOException {
        response.setContentType("text/html");
        try (java.io.PrintWriter out = response.getWriter()) {
            out.println("&lt;html&gt;&lt;body&gt;&lt;h1&gt;商品提交处理&lt;/h1&gt;");
            out.println("&lt;p&gt;处理 POST 请求创建新商品&lt;/p&gt;");
            out.println("&lt;/body&gt;&lt;/html&gt;");
        }
    }
}`}
                </code>
              </pre>
              <p className="text-gray-700 mt-4">
                Servlet 常用于实现前端控制器，处理不同类型的请求，适用于构建电商平台商品展示与管理、用户登录登出等功能场景。
              </p>
            </div>

            <div className="bg-green-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">JSP（JavaServer Pages）</h3>
              <p className="text-gray-700 leading-relaxed">
                JSP 通过 %@ page % 指令设置页面属性，如编码、导入类等，通过 `&lt;%! %&gt;` 定义页面级方法，通过 `&lt;%= %&gt;` 输出表达式结果。以下是一个结合数据库查询展示用户列表的 JSP 示例（简化版，实际需结合数据库连接）：
              </p>
              <pre className="bg-gray-100 p-4 rounded-lg">
                <code className="text-gray-800">
                  {`&lt;%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%&gt;
&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;title&gt;用户列表&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;h1&gt;用户列表展示&lt;/h1&gt;
    &lt;%
        // 模拟用户数据（实际从数据库查询）
        java.util.List&lt;java.util.Map&lt;String, String&gt;&gt; users = 
          java.util.Arrays.asList(
            java.util.Collections.singletonMap("username", "user1"),
            java.util.Collections.singletonMap("username", "user2")
          );
        for (java.util.Map&lt;String, String&gt; user : users) {
    %&gt;
    &lt;p&gt;用户名：&lt;%= user.get("username") %&gt;&lt;/p&gt;
    &lt;%
        }
    %&gt;
&lt;/body&gt;
&lt;/html&gt;`}
                </code>
              </pre>
              <p className="text-gray-700 mt-4">
                JSP 适用于快速开发动态页面，如企业内部管理系统的报表展示页、新闻发布系统的内容呈现页等，能方便地将业务数据与页面展示结合。
              </p>
            </div>

            <div className="bg-green-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">EJB（Enterprise JavaBeans）</h3>
              <p className="text-gray-700 leading-relaxed">
                EJB 容器管理其生命周期，提供事务上下文、安全上下文等。以消息驱动 Bean 为例，处理订单支付成功后的通知消息：
              </p>
              <pre className="bg-gray-100 p-4 rounded-lg">
                <code className="text-gray-800">
                  {`import javax.ejb.MessageDriven;
import javax.jms.Message;
import javax.jms.MessageListener;
import javax.jms.TextMessage;

@MessageDriven
public class PaymentNotificationBean implements MessageListener {
    @Override
    public void onMessage(Message message) {
        try {
            if (message instanceof TextMessage) {
                TextMessage textMessage = (TextMessage) message;
                String orderId = textMessage.getText();
                // 此处可添加发送邮件、更新订单状态等逻辑
                System.out.println("订单 " + orderId + " 支付成功，发送通知...");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}`}
                </code>
              </pre>
              <p className="text-gray-700 mt-4">
                EJB 适用于分布式系统中的核心业务处理，如金融交易系统的账务处理、大型电商平台的库存扣减与订单生成（需事务保证一致性）等场景。
              </p>
            </div>

            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3">JPA（Java Persistence API）</h3>
              <p className="text-gray-700 leading-relaxed">
                JPA 支持通过 `EntityManager` 进行持久化操作，如 `persist()` 保存对象、`find()` 查询对象、`merge()` 更新对象等。以下是一个复杂查询示例（查询指定范围内的用户）：
              </p>
              <pre className="bg-gray-100 p-4 rounded-lg">
                <code className="text-gray-800">
                  {`import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import java.util.List;

public class UserRepository {
    @PersistenceContext
    private EntityManager em;

    public List&lt;User&gt; findUsersByAgeRange(int minAge, int maxAge) {
        String jpql = "SELECT u FROM User u WHERE u.age BETWEEN :minAge AND :maxAge";
        TypedQuery&lt;User&gt; query = em.createQuery(jpql, User.class);
        query.setParameter("minAge", minAge);
        query.setParameter("maxAge", maxAge);
        return query.getResultList();
    }
}`}
                </code>
              </pre>
              <p className="text-gray-700 mt-4">
                JPA 适用于各类需要与数据库交互的企业级应用，如客户关系管理（CRM）系统中客户数据的增删改查、物流管理系统中订单与运输数据的持久化处理等场景。
              </p>
            </div>
          </div>
        )}
      </div>
      {/* 底部导航 */}
      <div className="mt-10 flex justify-between">
        <a href="/study/se/javaee/intro" className="px-4 py-2 text-blue-600 hover:text-blue-800">
          ← JavaEE概述
        </a>
        <a
          href="/study/se/javaee/web"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          Web开发基础 →
        </a>
      </div>
    </div>
  );
}