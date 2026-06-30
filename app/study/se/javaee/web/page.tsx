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
  chapterTitle: 'Web开发基础',
  chapterNumber: 3,
  totalChapters: 17,
  subjectHref: '/study/se/javaee',
  prevChapter: { label: 'JavaEE核心组件', href: '/study/se/javaee/components' },
  nextChapter: { label: '数据库访问技术', href: '/study/se/javaee/db' },
  theme: THEMES.software,
}

const SPREADS = [
  {
    label: '概述',
    left: (
      <div className="space-y-4">
        <PageTitle>JavaEE Web开发基础概述</PageTitle>
        <BookParagraph>Web开发是指使用JavaEE技术栈构建Web应用程序的过程。它涉及处理HTTP请求、生成动态响应、管理会话状态、访问数据库等核心功能。JavaEE提供了丰富的API和组件，使开发者能够构建安全、可扩展的企业级Web应用。</BookParagraph>
        <h3 className="text-sm font-medium text-ink mt-4">核心组件</h3>
        <BookList items={[
          'Servlet：处理HTTP请求和响应',
          'JSP：生成动态Web页面',
          'Filter：请求和响应的预处理',
          'Listener：监听Web应用事件',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-ink mt-4">开发环境</h3>
        <BookList items={[
          'JDK (Java Development Kit)',
          'Web容器 (如Tomcat)',
          'IDE (如Eclipse, IntelliJ IDEA)',
          '构建工具 (如Maven, Gradle)',
        ]} />
        <BookAlert type="info" message="Tomcat是最流行的Servlet/JSP容器，适合开发和生产环境。对于完整JavaEE支持，可使用WildFly、Payara或WebLogic。" />
        <TagGrid items={['Servlet', 'JSP', 'Filter', 'Listener', 'Tomcat']} />
      </div>
    ),
  },
  {
    label: 'Web架构',
    left: (
      <div className="space-y-4">
        <PageTitle>Web应用架构</PageTitle>
        <BookParagraph>JavaEE Web应用采用分层架构，将不同职责的组件划分到不同层次，便于开发和维护。</BookParagraph>
        <div className="rounded-lg p-4" style={{ background: THEMES.software.paperCard, border: '1px solid rgba(0,0,0,0.06)' }}>
          <h3 className="font-semibold mb-2" style={{ color: THEMES.software.accent }}>表示层</h3>
          <p className="text-sm opacity-70">处理用户界面和交互，包括JSP、HTML、CSS、JavaScript等</p>
        </div>
        <div className="rounded-lg p-4" style={{ background: THEMES.software.paperCard, border: '1px solid rgba(0,0,0,0.06)' }}>
          <h3 className="font-semibold mb-2" style={{ color: THEMES.software.accent }}>控制层</h3>
          <p className="text-sm opacity-70">处理请求路由和业务逻辑控制，主要由Servlet实现</p>
        </div>
        <div className="rounded-lg p-4" style={{ background: THEMES.software.paperCard, border: '1px solid rgba(0,0,0,0.06)' }}>
          <h3 className="font-semibold mb-2" style={{ color: THEMES.software.accent }}>业务层</h3>
          <p className="text-sm opacity-70">实现核心业务逻辑，通常使用EJB或Spring框架</p>
        </div>
        <div className="rounded-lg p-4" style={{ background: THEMES.software.paperCard, border: '1px solid rgba(0,0,0,0.06)' }}>
          <h3 className="font-semibold mb-2" style={{ color: THEMES.software.accent }}>持久层</h3>
          <p className="text-sm opacity-70">负责数据访问和持久化，使用JPA或JDBC等技术</p>
        </div>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <BookAlert type="info" message="MVC（Model-View-Controller）是Web开发中最常用的架构模式，JavaEE中的Servlet充当Controller，JSP充当View，JavaBean充当Model。" />
        <h3 className="text-sm font-medium text-ink mt-4">请求处理流程</h3>
        <BookList items={[
          '客户端发送HTTP请求到Web服务器',
          'Web容器解析请求并分发给相应的Servlet',
          'Servlet处理请求，调用业务逻辑层',
          '业务层访问持久层获取/存储数据',
          '结果通过JSP渲染为HTML响应',
          '响应返回给客户端浏览器',
        ]} />
      </div>
    ),
  },
  {
    label: 'Servlet',
    left: (
      <div className="space-y-4">
        <PageTitle>Servlet基础</PageTitle>
        <BookParagraph>Servlet是JavaEE中处理Web请求的核心组件，运行在Web容器中。它能够接收客户端的HTTP请求并生成动态响应。Servlet通过实现javax.servlet.Servlet接口或继承javax.servlet.http.HttpServlet类来创建。</BookParagraph>
        <BookCode language="java" code={`@WebServlet("/hello")
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
}`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-ink mt-4">Servlet生命周期</h3>
        <BookList items={[
          '初始化：容器调用init()方法，只执行一次',
          '服务：容器调用service()方法处理请求，可多次执行',
          '销毁：容器调用destroy()方法，只执行一次',
        ]} />
        <BookAlert type="info" message="Servlet是线程安全的吗？默认情况下，一个Servlet只有一个实例，多个请求共享该实例，因此需要注意线程安全问题。建议避免在Servlet中使用实例变量存储请求相关的数据。" />
        <TagGrid items={['@WebServlet', 'doGet', 'doPost', '生命周期', '线程安全']} />
      </div>
    ),
  },
  {
    label: 'JSP技术',
    left: (
      <div className="space-y-4">
        <PageTitle>JSP技术</PageTitle>
        <BookParagraph>JSP（JavaServer Pages）是一种在HTML页面中嵌入Java代码的技术，用于生成动态Web内容。JSP页面最终会被编译成Servlet，但提供了更简单的开发方式，特别适合表示层的开发。</BookParagraph>
        <BookCode language="jsp" code={`<%@ page language="java" contentType="text/html; charset=UTF-8" %>
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
</html>`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
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
        <BookAlert type="success" message="JSP 2.0+ 推荐使用EL表达式和JSTL标签库替代Scriptlet，使页面更简洁、更易维护。" />
        <TagGrid items={['JSP', 'EL表达式', 'JSTL', '指令', '动作']} />
      </div>
    ),
  },
  {
    label: '过滤器与监听器',
    left: (
      <div className="space-y-4">
        <PageTitle>过滤器与监听器</PageTitle>
        <BookParagraph>过滤器是JavaEE中用于拦截请求和响应的组件，可以在请求到达Servlet之前或响应发送到客户端之前进行预处理。常用于实现日志记录、安全控制、字符编码转换等功能。</BookParagraph>
        <BookCode language="java" code={`@WebFilter("/*")
public class EncodingFilter implements Filter {
    public void doFilter(ServletRequest request,
                        ServletResponse response,
                        FilterChain chain)
            throws IOException, ServletException {
        request.setCharacterEncoding("UTF-8");
        response.setCharacterEncoding("UTF-8");
        chain.doFilter(request, response);
    }
}`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <BookParagraph>监听器用于监听Web应用中的各种事件，如ServletContext、HttpSession、ServletRequest的生命周期事件。可以实现应用初始化、会话管理、请求统计等功能。</BookParagraph>
        <BookCode language="java" code={`@WebListener
public class SessionListener implements HttpSessionListener {
    public void sessionCreated(HttpSessionEvent se) {
        System.out.println("Session created: " + se.getSession().getId());
    }

    public void sessionDestroyed(HttpSessionEvent se) {
        System.out.println("Session destroyed: " + se.getSession().getId());
    }
}`} />
        <TagGrid items={['Filter', 'Listener', '拦截', '监听', '事件驱动']} />
      </div>
    ),
  },
]

export default function JavaEEWebPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
