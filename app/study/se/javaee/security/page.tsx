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
  chapterTitle: '安全与权限管理',
  chapterNumber: 6,
  totalChapters: 17,
  subjectHref: '/study/se/javaee',
  prevChapter: { label: '企业级服务', href: '/study/se/javaee/enterprise' },
  nextChapter: { label: 'Web服务', href: '/study/se/javaee/webservice' },
  theme: THEMES.software,
}

const SPREADS = [
  {
    label: '概述',
    left: (
      <div className="space-y-4">
        <PageTitle>安全与权限管理概述</PageTitle>
        <BookParagraph>Jakarta EE（前身为JavaEE）为企业应用提供了完善的安全与权限管理机制，遵循Java Authentication and Authorization Service (JAAS) 标准，包括用户认证、角色授权、访问控制、数据加密等功能，确保企业系统和数据的安全性。</BookParagraph>
        <h3 className="text-sm font-medium text-ink mt-4">核心安全机制</h3>
        <BookList items={[
          '基于JAAS的身份认证框架',
          '基于角色的访问控制(RBAC)',
          '声明式与编程式安全控制',
          '安全约束与权限管理',
          '安全通信与数据完整性',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-ink mt-4">典型应用场景</h3>
        <BookList items={[
          '企业级应用身份验证',
          '细粒度资源访问控制',
          '敏感数据加密存储',
          'RESTful API安全防护',
          '多系统单点登录(SSO)',
        ]} />
        <BookAlert type="info" message="Jakarta EE安全模型基于JAAS标准，支持多种认证机制（FORM、BASIC、DIGEST、CLIENT-CERT），可通过web.xml或注解灵活配置。" />
        <TagGrid items={['JAAS', 'RBAC', '认证', '授权', '安全约束']} />
      </div>
    ),
  },
  {
    label: '认证与授权',
    left: (
      <div className="space-y-4">
        <PageTitle>认证与授权</PageTitle>
        <BookParagraph>Jakarta EE支持多种认证方式，包括表单认证、HTTP基本认证、客户端证书认证等。表单认证是最常见的方式，通过自定义登录页面收集用户凭证，并与安全域中的身份信息进行比对。</BookParagraph>
        <BookCode language="java" code={`@WebServlet("/login")
public class LoginServlet extends HttpServlet {
    protected void doPost(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {

        String username = req.getParameter("username");
        String password = req.getParameter("password");

        try {
            // 使用JAAS进行身份验证
            req.login(username, password);
            req.getSession().setAttribute("user", username);
            resp.sendRedirect("/dashboard");
        } catch (ServletException e) {
            resp.sendRedirect("/login.jsp?error=1");
        }
    }
}`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <BookParagraph>权限校验可以通过Filter实现细粒度的访问控制：</BookParagraph>
        <BookCode language="java" code={`@WebFilter(urlPatterns = "/admin/*")
public class AdminFilter implements Filter {
    public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain)
            throws IOException, ServletException {

        HttpServletRequest request = (HttpServletRequest) req;
        HttpServletResponse response = (HttpServletResponse) res;

        if (request.getUserPrincipal() == null ||
            !request.isUserInRole("admin")) {
            response.sendError(HttpServletResponse.SC_FORBIDDEN);
            return;
        }

        chain.doFilter(req, res);
    }
}`} />
        <BookAlert type="info" message="req.login() 方法由Servlet容器委托给配置的LoginModule处理。在生产环境中，建议使用更安全的密码加密方案。" />
        <TagGrid items={['@WebServlet', '@WebFilter', 'login', 'isUserInRole', '权限校验']} />
      </div>
    ),
  },
  {
    label: '注解与配置',
    left: (
      <div className="space-y-4">
        <PageTitle>声明式安全注解</PageTitle>
        <BookParagraph>Jakarta EE提供了一系列安全注解，允许开发者通过声明方式定义安全约束，减少样板代码，提高开发效率。这些注解可应用于Servlet、EJB和REST资源类。</BookParagraph>
        <BookCode language="java" code={`@Stateless
@DeclareRoles({"admin", "user", "guest"})
public class UserService {

    @RolesAllowed("admin")
    public void deleteUser(Long userId) {
        // 仅管理员可删除用户
    }

    @PermitAll
    public User getUserInfo(Long userId) {
        // 所有已认证用户可查看用户信息
        return userRepository.findById(userId);
    }

    @DenyAll
    public void sensitiveOperation() {
        // 禁止所有用户直接调用
    }
}`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <BookCode language="java" code={`@WebServlet("/api/secure")
@ServletSecurity(
    @HttpConstraint(
        rolesAllowed = {"admin"},
        transportGuarantee = ServletSecurity.TransportGuarantee.CONFIDENTIAL
    )
)
public class SecureApiServlet extends HttpServlet {
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws IOException {
        resp.getWriter().println("安全API访问");
    }
}`} />
        <BookAlert type="success" message="@ServletSecurity 可以同时配置 HTTP 方法约束和传输保证（CONFIDENTIAL 强制使用 HTTPS）。" />
        <TagGrid items={['@RolesAllowed', '@PermitAll', '@DenyAll', '@DeclareRoles', '@ServletSecurity']} />
      </div>
    ),
  },
  {
    label: 'web.xml安全',
    left: (
      <div className="space-y-4">
        <PageTitle>web.xml安全配置</PageTitle>
        <BookParagraph>在Jakarta EE应用中，可通过web.xml文件配置URL级别的安全约束，定义受保护资源、所需角色、认证方式等。这种方式适用于不需要编程逻辑的静态安全约束。</BookParagraph>
        <BookCode language="xml" code={`<security-constraint>
  <web-resource-collection>
    <web-resource-name>Admin Resources</web-resource-name>
    <url-pattern>/admin/*</url-pattern>
    <http-method>GET</http-method>
    <http-method>POST</http-method>
  </web-resource-collection>
  <auth-constraint>
    <role-name>admin</role-name>
  </auth-constraint>
  <user-data-constraint>
    <transport-guarantee>CONFIDENTIAL</transport-guarantee>
  </user-data-constraint>
</security-constraint>`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <BookCode language="xml" code={`<login-config>
  <auth-method>FORM</auth-method>
  <realm-name>MySecurityRealm</realm-name>
  <form-login-config>
    <form-login-page>/login.jsp</form-login-page>
    <form-error-page>/login-error.jsp</form-error-page>
  </form-login-config>
</login-config>

<security-role>
  <role-name>admin</role-name>
</security-role>
<security-role>
  <role-name>user</role-name>
</security-role>`} />
        <BookAlert type="info" message="web.xml中的安全约束对所有URL模式生效。对于更精细的控制，建议结合Servlet安全注解使用。" />
        <TagGrid items={['web.xml', 'security-constraint', 'login-config', 'security-role', 'transport-guarantee']} />
      </div>
    ),
  },
  {
    label: '安全场景',
    left: (
      <div className="space-y-4">
        <PageTitle>常见安全场景</PageTitle>
        <BookParagraph>Jakarta EE应用面临多种安全威胁，需要采取针对性的防护措施。</BookParagraph>
        <h3 className="text-sm font-medium text-ink mt-4">XSS防护</h3>
        <BookCode language="java" code={`public static String escapeHTML(String input) {
    if (input == null) return null;

    StringBuilder escaped = new StringBuilder();
    for (char c : input.toCharArray()) {
        switch (c) {
            case '<': escaped.append("&lt;"); break;
            case '>': escaped.append("&gt;"); break;
            case '&': escaped.append("&amp;"); break;
            case '"': escaped.append("&quot;"); break;
            default: escaped.append(c);
        }
    }
    return escaped.toString();
}`} />
        <h3 className="text-sm font-medium text-ink mt-4">SQL注入防护 - 使用PreparedStatement</h3>
        <BookCode language="java" code={`public List<User> searchUsers(String username) throws SQLException {
    String sql = "SELECT * FROM users WHERE username = ?";
    try (Connection conn = dataSource.getConnection();
         PreparedStatement pstmt = conn.prepareStatement(sql)) {

        pstmt.setString(1, username); // 自动处理SQL转义
        try (ResultSet rs = pstmt.executeQuery()) {
            List<User> users = new ArrayList<>();
            while (rs.next()) {
                users.add(mapUser(rs));
            }
            return users;
        }
    }
}`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-ink mt-4">CSRF防护</h3>
        <BookCode language="java" code={`@WebFilter(urlPatterns = "/*")
public class CsrfFilter implements Filter {
    public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain)
            throws IOException, ServletException {

        HttpServletRequest request = (HttpServletRequest) req;
        HttpServletResponse response = (HttpServletResponse) res;

        if ("POST".equalsIgnoreCase(request.getMethod())) {
            String csrfToken = request.getHeader("X-CSRF-Token");
            String sessionToken = (String) request.getSession().getAttribute("CSRF_TOKEN");

            if (csrfToken == null || !csrfToken.equals(sessionToken)) {
                response.sendError(HttpServletResponse.SC_FORBIDDEN);
                return;
            }
        }

        // 生成新的CSRF令牌
        if (request.getSession(false) != null) {
            String token = UUID.randomUUID().toString();
            request.getSession().setAttribute("CSRF_TOKEN", token);
            response.setHeader("X-CSRF-Token", token);
        }

        chain.doFilter(req, res);
    }
}`} />
        <TagGrid items={['XSS', 'CSRF', 'SQL注入', 'PreparedStatement', '安全防护']} />
      </div>
    ),
  },
  {
    label: '实用示例',
    left: (
      <div className="space-y-4">
        <PageTitle>综合案例：安全的用户管理系统</PageTitle>
        <BookParagraph>以下示例展示了如何结合Jakarta EE的认证、授权、注解和过滤器机制，构建一个安全的用户管理系统。包含用户注册、登录、权限控制和安全防护等功能。</BookParagraph>
        <h3 className="text-sm font-medium text-ink mt-4">密码加密存储</h3>
        <BookCode language="java" code={`@WebServlet("/register")
public class RegisterServlet extends HttpServlet {
    protected void doPost(HttpServletRequest req, HttpServletResponse resp)
            throws IOException, ServletException {

        String username = req.getParameter("username");
        String password = req.getParameter("password");

        // 使用PBKDF2WithHmacSHA256进行密码哈希
        String hashedPassword = PasswordUtils.hashPassword(password);

        // 保存到数据库
        User user = new User();
        user.setUsername(username);
        user.setPassword(hashedPassword);
        userRepository.save(user);

        resp.sendRedirect("/login.jsp");
    }
}`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-ink mt-4">安全会话管理</h3>
        <BookCode language="java" code={`@WebFilter(urlPatterns = "/*")
public class SessionFilter implements Filter {
    public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain)
            throws IOException, ServletException {

        HttpServletRequest request = (HttpServletRequest) req;
        HttpServletResponse response = (HttpServletResponse) res;

        // 配置安全Cookie
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                cookie.setHttpOnly(true);
                cookie.setSecure(true);
                cookie.setPath("/");
                cookie.setMaxAge(3600);
            }
        }

        // 设置安全响应头
        response.setHeader("X-Frame-Options", "DENY");
        response.setHeader("X-Content-Type-Options", "nosniff");
        response.setHeader("Content-Security-Policy", "default-src 'self'");

        chain.doFilter(req, res);
    }
}`} />
        <BookAlert type="success" message="在现代Spring Security中，这些安全配置可以通过SecurityFilterChain bean更简洁地配置，并支持OAuth2、JWT等现代认证方式。" />
        <TagGrid items={['密码加密', 'PBKDF2', '安全会话', 'HttpOnly', '安全响应头']} />
      </div>
    ),
  },
]

export default function JavaEESecurityPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
