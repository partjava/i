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
  chapterTitle: 'JavaEE核心组件',
  chapterNumber: 2,
  totalChapters: 17,
  subjectHref: '/study/se/javaee',
  prevChapter: { label: 'JavaEE概述', href: '/study/se/javaee/intro' },
  nextChapter: { label: 'Web开发基础', href: '/study/se/javaee/web' },
  theme: THEMES.software,
}

const SPREADS = [
  {
    label: 'Servlet',
    left: (
      <div className="space-y-4">
        <PageTitle>Servlet</PageTitle>
        <BookParagraph>Servlet 是 JavaEE 中处理 Web 请求的核心组件，运行在 Web 容器（如 Tomcat、Jetty）中，用于接收客户端的 HTTP 请求并生成动态响应。它通过 service() 方法处理请求，可根据请求方法（GET、POST 等）分别在 doGet()、doPost() 等方法中处理逻辑。</BookParagraph>
        <BookCode language="java" code={`import javax.servlet.ServletException;
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
            out.println("<html><body><h1>商品列表页</h1>");
            out.println("<p>处理 GET 请求获取商品信息</p>");
            out.println("</body></html>");
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
      throws ServletException, IOException {
        response.setContentType("text/html");
        try (java.io.PrintWriter out = response.getWriter()) {
            out.println("<html><body><h1>商品提交处理</h1>");
            out.println("<p>处理 POST 请求创建新商品</p>");
            out.println("</body></html>");
        }
    }
}`} />
        <BookParagraph>Servlet 常用于实现前端控制器，处理不同类型的请求，适用于构建电商平台商品展示与管理、用户登录登出等功能场景。</BookParagraph>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <BookAlert type="info" message="Servlet 3.0+ 支持使用 @WebServlet 注解配置，无需 web.xml。Servlet 4.0 支持 HTTP/2 Server Push。" />
        <h3 className="text-sm font-medium text-ink mt-4">Servlet生命周期</h3>
        <BookList items={[
          '初始化：容器调用 init() 方法，只执行一次',
          '服务：容器调用 service() 方法处理请求，可多次执行',
          '销毁：容器调用 destroy() 方法，只执行一次',
        ]} />
        <BookAlert type="success" message="每次请求都会创建新的请求和响应对象，但 Servlet 实例在容器中是单例的，需要注意线程安全问题。" />
        <TagGrid items={['@WebServlet', 'doGet', 'doPost', 'HttpServlet', '生命周期']} />
      </div>
    ),
  },
  {
    label: 'JSP',
    left: (
      <div className="space-y-4">
        <PageTitle>JSP（JavaServer Pages）</PageTitle>
        <BookParagraph>JSP 通过在 HTML 页面中嵌入 Java 代码来生成动态 Web 内容。JSP 页面最终会被编译为 Servlet，提供了更简单的开发方式，特别适合表示层的开发。</BookParagraph>
        <BookCode language="jsp" code={`<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>用户列表</title>
</head>
<body>
    <h1>用户列表展示</h1>
    <%
        // 模拟用户数据（实际从数据库查询）
        java.util.List<java.util.Map<String, String>> users =
          java.util.Arrays.asList(
            java.util.Collections.singletonMap("username", "user1"),
            java.util.Collections.singletonMap("username", "user2")
          );
        for (java.util.Map<String, String> user : users) {
    %>
    <p>用户名：<%= user.get("username") %></p>
    <%
        }
    %>
</body>
</html>`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <BookParagraph>JSP 适用于快速开发动态页面，如企业内部管理系统的报表展示页、新闻发布系统的内容呈现页等，能方便地将业务数据与页面展示结合。</BookParagraph>
        <h3 className="text-sm font-medium text-ink mt-4">JSP基本语法</h3>
        <BookCode language="jsp" code={`<%-- 脚本元素 --%>
<% Java代码 %>
<%= 表达式 %>
<%! 声明 %>

<%-- 指令 --%>
<%@ page ... %>
<%@ include ... %>
<%@ taglib ... %>

<%-- 动作 --%>
<jsp:include ... />
<jsp:forward ... />
<jsp:useBean ... />`} />
        <BookAlert type="info" message="JSP 2.0+ 支持 EL 表达式和 JSTL 标签库，建议在 JSP 中尽量少用脚本片段（Scriptlet），采用 MVC 模式分离关注点。" />
        <TagGrid items={['JSP', '脚本元素', '指令', '动作', 'EL表达式']} />
      </div>
    ),
  },
  {
    label: 'EJB',
    left: (
      <div className="space-y-4">
        <PageTitle>EJB（Enterprise JavaBeans）</PageTitle>
        <BookParagraph>EJB 容器管理其生命周期，提供事务上下文、安全上下文等企业级服务。以消息驱动 Bean 为例，处理订单支付成功后的通知消息：</BookParagraph>
        <BookCode language="java" code={`import javax.ejb.MessageDriven;
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
}`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <BookParagraph>EJB 适用于分布式系统中的核心业务处理，如金融交易系统的账务处理、大型电商平台的库存扣减与订单生成（需事务保证一致性）等场景。</BookParagraph>
        <h3 className="text-sm font-medium text-ink mt-4">EJB类型</h3>
        <BookList items={[
          '会话Bean（Session Bean）：无状态和有状态业务逻辑',
          '消息驱动Bean（Message-Driven Bean）：异步消息消费',
          '实体Bean（已由JPA取代）：数据持久化',
        ]} />
        <BookAlert type="success" message="EJB 3.0 之后大幅简化，采用注解配置，消除了繁琐的部署描述符。结合 CDI 使用更灵活。" />
        <TagGrid items={['@Stateless', '@Stateful', '@MessageDriven', 'JTA', '事务']} />
      </div>
    ),
  },
  {
    label: 'JPA',
    left: (
      <div className="space-y-4">
        <PageTitle>JPA（Java Persistence API）</PageTitle>
        <BookParagraph>JPA 支持通过 EntityManager 进行持久化操作，如 persist() 保存对象、find() 查询对象、merge() 更新对象等。以下是一个复杂查询示例：</BookParagraph>
        <BookCode language="java" code={`import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import java.util.List;

public class UserRepository {
    @PersistenceContext
    private EntityManager em;

    public List<User> findUsersByAgeRange(int minAge, int maxAge) {
        String jpql = "SELECT u FROM User u WHERE u.age BETWEEN :minAge AND :maxAge";
        TypedQuery<User> query = em.createQuery(jpql, User.class);
        query.setParameter("minAge", minAge);
        query.setParameter("maxAge", maxAge);
        return query.getResultList();
    }
}`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <BookParagraph>JPA 适用于各类需要与数据库交互的企业级应用，如客户关系管理（CRM）系统中客户数据的增删改查、物流管理系统中订单与运输数据的持久化处理等场景。</BookParagraph>
        <h3 className="text-sm font-medium text-ink mt-4">JPA基本注解</h3>
        <BookList items={[
          '@Entity：声明实体类',
          '@Table：指定表名',
          '@Id：主键',
          '@Column：字段映射',
          '@GeneratedValue：主键生成策略',
        ]} />
        <BookAlert type="info" message="JPA 是规范，Hibernate 是其最流行的实现。Spring Data JPA 进一步简化了 JPA 的使用。" />
        <TagGrid items={['JPA', 'EntityManager', 'JPQL', 'ORM', '持久化']} />
      </div>
    ),
  },
]

export default function JavaEEComponentsPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
