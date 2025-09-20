'use client';
import { useState } from 'react';

const tabs = [
  { key: 'overview', label: '概述' },
  { key: 'auth', label: '认证与授权' },
  { key: 'annotation', label: '注解与配置' },
  { key: 'webxml', label: 'web.xml安全' },
  { key:'scenarios', label: '常见安全场景' },
  { key: 'example', label: '实用示例' },
];

export default function JavaEESecurityPage() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 页面大标题 */}
      <h1 className="text-4xl font-bold mb-6">安全与权限管理</h1>

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
            <h2 className="text-2xl font-bold mb-4">安全与权限管理概述</h2>
            <div className="bg-blue-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">Jakarta EE安全体系简介</h3>
              <p className="text-gray-700 leading-relaxed">
                Jakarta EE（前身为JavaEE）为企业应用提供了完善的安全与权限管理机制，遵循Java Authentication and Authorization Service (JAAS) 标准，
                包括用户认证、角色授权、访问控制、数据加密等功能，确保企业系统和数据的安全性。
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-green-50 p-5 rounded-lg">
                <h3 className="text-xl font-bold mb-3">核心安全机制</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• 基于JAAS的身份认证框架</li>
                  <li>• 基于角色的访问控制(RBAC)</li>
                  <li>• 声明式与编程式安全控制</li>
                  <li>• 安全约束与权限管理</li>
                  <li>• 安全通信与数据完整性</li>
                </ul>
              </div>
              <div className="bg-yellow-50 p-5 rounded-lg">
                <h3 className="text-xl font-bold mb-3">典型应用场景</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• 企业级应用身份验证</li>
                  <li>• 细粒度资源访问控制</li>
                  <li>• 敏感数据加密存储</li>
                  <li>• RESTful API安全防护</li>
                  <li>• 多系统单点登录(SSO)</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'auth' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">认证与授权</h2>
            <div className="bg-blue-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">基于表单的认证机制</h3>
              <p className="text-gray-700 leading-relaxed">
                Jakarta EE支持多种认证方式，包括表单认证、HTTP基本认证、客户端证书认证等。
                表单认证是最常见的方式，通过自定义登录页面收集用户凭证，并与安全域中的身份信息进行比对。
              </p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">登录Servlet实现示例</h3>
              <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
{`@WebServlet("/login")
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
}`}
              </pre>
            </div>
            <div className="bg-yellow-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3">权限校验Filter示例</h3>
              <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
{`@WebFilter(urlPatterns = "/admin/*")
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
}`}
              </pre>
            </div>
          </div>
        )}

        {activeTab === 'annotation' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">注解与配置安全</h2>
            <div className="bg-blue-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">声明式安全注解</h3>
              <p className="text-gray-700 leading-relaxed">
                Jakarta EE提供了一系列安全注解，允许开发者通过声明方式定义安全约束，减少样板代码，提高开发效率。
                这些注解可应用于Servlet、EJB和REST资源类。
              </p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">EJB安全注解示例</h3>
              <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
{`@Stateless
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
}`}
              </pre>
            </div>
            <div className="bg-yellow-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3">Servlet安全注解</h3>
              <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
{`@WebServlet("/api/secure")
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
}`}
              </pre>
            </div>
          </div>
        )}

        {activeTab === 'webxml' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">web.xml安全配置</h2>
            <div className="bg-blue-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">基于web.xml的安全约束</h3>
              <p className="text-gray-700 leading-relaxed">
                在Jakarta EE应用中，可通过web.xml文件配置URL级别的安全约束，定义受保护资源、所需角色、认证方式等。
                这种方式适用于不需要编程逻辑的静态安全约束。
              </p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">完整web.xml安全配置示例</h3>
              <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
{`<security-constraint>
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
</security-constraint>

<login-config>
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
</security-role>`}
              </pre>
            </div>
          </div>
        )}

        {activeTab ==='scenarios' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">常见安全场景</h2>
            <div className="bg-blue-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">Web应用安全防护</h3>
              <p className="text-gray-700 leading-relaxed">
                Jakarta EE应用面临多种安全威胁，需要采取针对性的防护措施。以下是常见安全场景及解决方案：
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-3">XSS防护代码示例</h3>
                <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
{`public static String escapeHTML(String input) {
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
}`}
                </pre>
              </div>
              <div className="bg-yellow-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-3">CSRF防护Filter示例</h3>
                <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
{`@WebFilter(urlPatterns = "/*")
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
}`}
                </pre>
              </div>
            </div>
            <div className="bg-purple-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3">SQL注入防护</h3>
              <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
{`public List<User> searchUsers(String username) throws SQLException {
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
}`}
              </pre>
            </div>
          </div>
        )}

        {activeTab === 'example' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">实用示例</h2>
            <div className="bg-blue-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">综合案例：安全的用户管理系统</h3>
              <p className="text-gray-700 leading-relaxed">
                以下示例展示了如何结合Jakarta EE的认证、授权、注解和过滤器机制，构建一个安全的用户管理系统。
                包含用户注册、登录、权限控制和安全防护等功能。
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-3">密码加密存储</h3>
                <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
{`@WebServlet("/register")
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
}`}
                </pre>
              </div>
              <div className="bg-yellow-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-3">安全会话管理</h3>
                <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
{`@WebFilter(urlPatterns = "/*")
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
}`}
                </pre>
              </div>
            </div>
            <div className="bg-purple-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3">权限校验Interceptor</h3>
              <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
{`@Interceptor
@Secure
public class SecurityInterceptor {
    @AroundInvoke
    public Object checkPermission(InvocationContext ctx) throws Exception {
        HttpServletRequest request = (HttpServletRequest) ctx.getContextData()
                .get("javax.servlet.http.HttpServletRequest");
        
        if (request == null || request.getUserPrincipal() == null) {
            throw new SecurityException("未认证用户");
        }
        
        // 检查方法上的角色注解
        Secure secure = ctx.getMethod().getAnnotation(Secure.class);
        if (secure != null && secure.roles().length > 0) {
            for (String role : secure.roles()) {
                if (request.isUserInRole(role)) {
                    return ctx.proceed();
                }
            }
            throw new SecurityException("权限不足");
        }
        
        return ctx.proceed();
    }
}`}
                </pre>
            </div>
          </div>
        )}
      </div>

      <div className="mt-10 flex justify-between">
        <a href="/study/se/javaee/enterprise" className="px-4 py-2 text-blue-600 hover:text-blue-800">
          ← 企业级服务
        </a>
        <a
          href="/study/se/javaee/webservice"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          Web服务 →
        </a>
      </div>
    </div>
  );
}