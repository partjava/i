'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import {
  PageTitle,
  SectionTitle,
  BookParagraph,
  BookCode,
  BookList,
  BookDivider,
} from '@shared/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '网络安全',
  chapterTitle: '安全开发基础',
  chapterNumber: 1,
  totalChapters: 10,
  subjectHref: '/study/security/dev',
  prevChapter: { label: '恶意代码分析', href: '/study/security/reverse/malware' },
  nextChapter: { label: '安全编码规范', href: '/study/security/dev/coding' },
  theme: THEMES.security,
}

const sdlCode = `// SDL 安全开发生命周期
1. 培训
   - 安全开发培训
   - 安全意识教育
   - 最佳实践指导

2. 需求
   - 安全需求分析
   - 威胁建模
   - 风险评估

3. 设计
   - 安全架构设计
   - 安全控制设计
   - 接口安全设计

4. 实现
   - 安全编码规范
   - 代码审查
   - 静态分析

5. 验证
   - 安全测试
   - 漏洞扫描
   - 渗透测试

6. 发布
   - 安全配置
   - 发布审查
   - 应急响应

7. 响应
   - 漏洞管理
   - 安全更新
   - 事件响应`

const devsecopsCode = `// DevSecOps 实践
1. 持续集成
   - 自动化安全测试
   - 代码质量检查
   - 依赖项扫描

2. 持续部署
   - 安全配置管理
   - 环境一致性
   - 自动化部署

3. 持续监控
   - 安全事件监控
   - 性能监控
   - 异常检测

4. 持续改进
   - 安全度量
   - 反馈循环
   - 持续优化`

const minPrivilegeCode = `// 最小权限示例
class User {
  private String role;

  public boolean canAccess(Resource resource) {
    return resource.getRequiredRole()
      .equals(this.role);
  }
}`

const defenseDepthCode = `// 纵深防御示例
class SecurityLayer {
  // 网络层防护
  private Firewall firewall;
  // 应用层防护
  private Authentication auth;
  // 数据层防护
  private Encryption encryption;
}`

const secureDefaultCode = `// 安全默认配置示例
@Configuration
public class SecurityConfig {
  @Bean
  public SecurityFilterChain filterChain() {
    return SecurityFilterChain.builder()
      .requireAuthentication(true)
      .requireHttps(true)
      .build();
  }
}`

const inputValidationCode = `// 输入验证示例
public class InputValidator {
  public String sanitizeInput(String input) {
    return input.replaceAll("[<>\"']", "");
  }

  public boolean isValidEmail(String email) {
    return email.matches("^[A-Za-z0-9+_.-]+@(.+)$");
  }
}`

const errorHandlingCode = `// 安全错误处理示例
public class ErrorHandler {
  public void handleError(Exception e) {
    logger.error("Internal error occurred");
    // 不暴露敏感信息
    return "An error occurred. Please try again.";
  }
}`

const secureLoggingCode = `// 安全日志记录示例
public class SecurityLogger {
  public void logSecurityEvent(String event) {
    logger.info("Security event: " + event);
    // 记录时间戳、用户ID等
    // 不记录敏感信息
  }
}`

const sonarqubeCode = `// sonar-project.properties
sonar.projectKey=my-project
sonar.projectName=My Project
sonar.projectVersion=1.0
sonar.sources=src
sonar.java.binaries=target/classes
sonar.java.source=11

# 质量门限配置
sonar.qualitygate.conditions=coverage,duplications,bugs
sonar.qualitygate.coverage.threshold=80
sonar.qualitygate.duplications.threshold=3
sonar.qualitygate.bugs.threshold=0`

const findbugsCode = `// findbugs-exclude.xml
<FindBugsFilter>
  <Match>
    <Bug category="SECURITY"/>
    <Or>
      <Method name="main"/>
      <Method name="test"/>
    </Or>
  </Match>
</FindBugsFilter>`

const owaspCode = `# ZAP 自动化扫描脚本
zap-cli quick-scan --self-contained \
  --spider http://localhost:8080 \
  --ajax-spider \
  --scan \
  --alert-level High`

const burpCode = `# Burp Suite 配置示例
{
  "proxy": {
    "port": 8080,
    "intercept": true
  },
  "scanner": {
    "active_scan": true,
    "passive_scan": true
  }
}`

const requirementsCode = `// 安全需求分析示例
public class SecurityRequirements {
  // 认证需求
  public class Authentication {
    private boolean requireMFA;
    private int passwordMinLength;
    private boolean requireSpecialChars;

    public boolean validatePassword(String password) {
      return password.length() >= passwordMinLength &&
             password.matches(".*[!@#$%^&*].*") &&
             password.matches(".*[A-Z].*") &&
             password.matches(".*[a-z].*") &&
             password.matches(".*[0-9].*");
    }
  }

  // 授权需求
  public class Authorization {
    private Map<String, Set<String>> rolePermissions;

    public boolean checkPermission(String role, String permission) {
      return rolePermissions.getOrDefault(role, new HashSet<>())
        .contains(permission);
    }
  }

  // 数据保护需求
  public class DataProtection {
    private String encryptionAlgorithm;
    private int keySize;

    public String encryptSensitiveData(String data) {
      // 使用配置的加密算法和密钥大小
      return EncryptionUtil.encrypt(data, encryptionAlgorithm, keySize);
    }
  }
}`

const designCode = `// 安全架构设计示例
public class SecurityArchitecture {
  // 安全控制层
  public class SecurityControl {
    private Authentication auth;
    private Authorization authz;
    private Encryption encryption;

    public boolean processRequest(Request request) {
      // 1. 认证检查
      if (!auth.authenticate(request.getCredentials())) {
        return false;
      }

      // 2. 授权检查
      if (!authz.checkPermission(request.getRole(), request.getAction())) {
        return false;
      }

      // 3. 数据加密
      request.setData(encryption.encrypt(request.getData()));

      return true;
    }
  }

  // 安全接口设计
  public class SecureAPI {
    private SecurityControl securityControl;

    @PostMapping("/api/secure")
    public ResponseEntity<?> handleSecureRequest(@RequestBody Request request) {
      // 1. 安全控制检查
      if (!securityControl.processRequest(request)) {
        return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
      }

      // 2. 输入验证
      if (!validateInput(request)) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
      }

      // 3. 处理请求
      return processSecureRequest(request);
    }
  }
}`

const implementationCode = `// 安全编码实现示例
public class SecureImplementation {
  // 输入验证
  public class InputValidator {
    public String sanitizeInput(String input) {
      // 1. 移除危险字符
      input = input.replaceAll("[<>\"']", "");

      // 2. 转义特殊字符
      input = StringEscapeUtils.escapeHtml4(input);

      // 3. 长度限制
      return input.substring(0, Math.min(input.length(), 100));
    }
  }

  // 安全错误处理
  public class SecureErrorHandler {
    private Logger logger;

    public void handleError(Exception e) {
      // 1. 记录详细日志
      logger.error("Error occurred: " + e.getMessage(), e);

      // 2. 返回安全错误信息
      return "An error occurred. Please try again later.";
    }
  }

  // 安全日志记录
  public class SecureLogger {
    private Logger logger;

    public void logSecurityEvent(String event, String userId) {
      // 1. 记录时间戳
      String timestamp = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss")
        .format(new Date());

      // 2. 记录事件信息（不包含敏感数据）
      logger.info(String.format(
        "Security Event: %s, User: %s, Time: %s",
        event,
        maskUserId(userId),
        timestamp
      ));
    }

    private String maskUserId(String userId) {
      // 掩码用户ID，只显示后4位
      return "****" + userId.substring(userId.length() - 4);
    }
  }
}`

const testCode = `// 安全测试示例
public class SecurityTests {
  // 单元测试
  @Test
  public void testPasswordValidation() {
    SecurityRequirements.Authentication auth = new SecurityRequirements.Authentication();

    // 测试有效密码
    assertTrue(auth.validatePassword("StrongP@ss123"));

    // 测试无效密码
    assertFalse(auth.validatePassword("weak"));
    assertFalse(auth.validatePassword("NoSpecialChar123"));
    assertFalse(auth.validatePassword("NoNumber@"));
  }

  // 集成测试
  @Test
  public void testSecureAPI() {
    SecureAPI api = new SecureAPI();

    // 测试未认证请求
    Request unauthenticatedRequest = new Request();
    assertEquals(HttpStatus.FORBIDDEN,
      api.handleSecureRequest(unauthenticatedRequest).getStatusCode());

    // 测试未授权请求
    Request unauthorizedRequest = new Request();
    unauthorizedRequest.setCredentials(validCredentials);
    assertEquals(HttpStatus.FORBIDDEN,
      api.handleSecureRequest(unauthorizedRequest).getStatusCode());
  }

  // 安全测试
  @Test
  public void testXSSProtection() {
    InputValidator validator = new InputValidator();

    // 测试XSS攻击向量
    String maliciousInput = "<script>alert('xss')</script>";
    String sanitized = validator.sanitizeInput(maliciousInput);

    assertFalse(sanitized.contains("<script>"));
    assertTrue(sanitized.contains("&lt;script&gt;"));
  }
}`

const reviewChecklistCode = `// 代码审查检查项实现
public class CodeReviewChecklist {
  // 输入验证检查
  public boolean checkInputValidation(File file) {
    return file.getContent().contains("validateInput") &&
           file.getContent().contains("sanitizeInput") &&
           file.getContent().contains("escapeHtml");
  }

  // 输出编码检查
  public boolean checkOutputEncoding(File file) {
    return file.getContent().contains("encode") &&
           file.getContent().contains("escape") &&
           !file.getContent().contains("innerHTML");
  }

  // 错误处理检查
  public boolean checkErrorHandling(File file) {
    return file.getContent().contains("try-catch") &&
           file.getContent().contains("logger") &&
           !file.getContent().contains("printStackTrace");
  }

  // 密码学使用检查
  public boolean checkCryptography(File file) {
    return file.getContent().contains("Cipher") &&
           file.getContent().contains("MessageDigest") &&
           !file.getContent().contains("MD5");
  }
}`

const testChecklistCode = `// 测试检查清单实现
public class TestChecklist {
  // 功能测试检查
  public boolean checkFunctionalTests(TestSuite suite) {
    return suite.hasTest("testAuthentication") &&
           suite.hasTest("testAuthorization") &&
           suite.hasTest("testDataValidation");
  }

  // 安全测试检查
  public boolean checkSecurityTests(TestSuite suite) {
    return suite.hasTest("testXSS") &&
           suite.hasTest("testSQLInjection") &&
           suite.hasTest("testCSRF");
  }

  // 性能测试检查
  public boolean checkPerformanceTests(TestSuite suite) {
    return suite.hasTest("testConcurrentUsers") &&
           suite.hasTest("testResponseTime") &&
           suite.hasTest("testResourceUsage");
  }

  // 兼容性测试检查
  public boolean checkCompatibilityTests(TestSuite suite) {
    return suite.hasTest("testBrowserCompatibility") &&
           suite.hasTest("testMobileCompatibility") &&
           suite.hasTest("testOSCompatibility");
  }
}`

const SPREADS = [
  {
    label: '概述',
    left: (
      <div className="space-y-4">
        <PageTitle>安全开发概述</PageTitle>
        <SectionTitle>1. 什么是安全开发</SectionTitle>
        <BookParagraph>
          安全开发是指在软件开发生命周期中，将安全考虑融入到每个阶段，从需求分析到设计、编码、测试和部署的全过程。它强调「安全左移」，即在开发早期就考虑安全问题。
        </BookParagraph>
        <SectionTitle>传统开发模式</SectionTitle>
        <BookList
          items={[
            '后期安全测试',
            '被动修复漏洞',
            '高修复成本',
            '安全与开发分离',
          ]}
        />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>安全开发模式</SectionTitle>
        <BookList
          items={[
            '全程安全考虑',
            '主动预防漏洞',
            '降低修复成本',
            '安全与开发融合',
          ]}
        />
        <BookDivider />
        <PageTitle>安全开发的重要性</PageTitle>
        <SectionTitle>降低安全风险</SectionTitle>
        <BookList
          items={[
            '减少漏洞数量',
            '降低攻击面',
            '提高系统安全性',
            '保护用户数据',
          ]}
        />
        <SectionTitle>提升开发效率</SectionTitle>
        <BookList
          items={[
            '减少返工',
            '降低修复成本',
            '提高代码质量',
            '加快交付速度',
          ]}
        />
        <SectionTitle>满足合规要求</SectionTitle>
        <BookList
          items={[
            '符合安全标准',
            '满足监管要求',
            '保护企业声誉',
            '降低法律风险',
          ]}
        />
      </div>
    ),
  },
  {
    label: '核心概念',
    left: (
      <div className="space-y-4">
        <PageTitle>安全开发模型</PageTitle>
        <SectionTitle>SDL（Security Development Lifecycle）</SectionTitle>
        <BookCode language="java" code={sdlCode} />
        <SectionTitle>DevSecOps</SectionTitle>
        <BookCode language="java" code={devsecopsCode} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>安全开发原则</PageTitle>
        <SectionTitle>设计原则</SectionTitle>
        <BookParagraph>最小权限原则</BookParagraph>
        <BookCode language="java" code={minPrivilegeCode} />
        <BookParagraph>纵深防御</BookParagraph>
        <BookCode language="java" code={defenseDepthCode} />
        <BookParagraph>安全默认配置</BookParagraph>
        <BookCode language="java" code={secureDefaultCode} />
        <SectionTitle>实现原则</SectionTitle>
        <BookParagraph>输入验证</BookParagraph>
        <BookCode language="java" code={inputValidationCode} />
        <BookParagraph>安全错误处理</BookParagraph>
        <BookCode language="java" code={errorHandlingCode} />
        <BookParagraph>安全日志记录</BookParagraph>
        <BookCode language="java" code={secureLoggingCode} />
      </div>
    ),
  },
  {
    label: '开发工具',
    left: (
      <div className="space-y-4">
        <PageTitle>静态分析工具</PageTitle>
        <SectionTitle>SonarQube</SectionTitle>
        <BookCode language="bash" code={sonarqubeCode} />
        <SectionTitle>FindBugs</SectionTitle>
        <BookCode language="xml" code={findbugsCode} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>动态分析工具</PageTitle>
        <SectionTitle>OWASP ZAP</SectionTitle>
        <BookCode language="bash" code={owaspCode} />
        <SectionTitle>Burp Suite</SectionTitle>
        <BookCode language="json" code={burpCode} />
      </div>
    ),
  },
  {
    label: '实践指南',
    left: (
      <div className="space-y-4">
        <PageTitle>安全开发流程</PageTitle>
        <SectionTitle>需求分析阶段</SectionTitle>
        <BookCode language="java" code={requirementsCode} />
        <SectionTitle>设计阶段</SectionTitle>
        <BookCode language="java" code={designCode} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>实现阶段</SectionTitle>
        <BookCode language="java" code={implementationCode} />
        <SectionTitle>测试阶段</SectionTitle>
        <BookCode language="java" code={testCode} />
        <BookDivider />
        <PageTitle>安全开发检查清单</PageTitle>
        <SectionTitle>代码审查清单</SectionTitle>
        <BookCode language="java" code={reviewChecklistCode} />
        <SectionTitle>测试检查清单</SectionTitle>
        <BookCode language="java" code={testChecklistCode} />
      </div>
    ),
  },
]

export default function SecurityDevBasicPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
