'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import {
  PageTitle,
  SectionTitle,
  BookParagraph,
  BookCode,
  BookList,
} from '@shared/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '网络安全',
  chapterTitle: '安全测试方法',
  chapterNumber: 4,
  totalChapters: 10,
  subjectHref: '/study/security/dev',
  prevChapter: { label: '安全设计模式', href: '/study/security/dev/patterns' },
  nextChapter: { label: '代码审计', href: '/study/security/dev/audit' },
  theme: THEMES.security,
}

// ===== 代码常量 =====

const SONARQUBE_CODE = `# sonar-project.properties
sonar.projectKey=my-project
sonar.projectName=My Project
sonar.projectVersion=1.0

sonar.sources=src
sonar.java.binaries=target/classes
sonar.java.source=11

# 安全规则配置
sonar.security.sources.javasecurity=true
sonar.security.sources.owasp=true

# 质量门限配置
sonar.qualitygate.conditions=coverage,duplications,security_rating
sonar.qualitygate.coverage.threshold=80
sonar.qualitygate.security_rating.threshold=A`

const ZAP_CODE = `# ZAP自动化扫描脚本
from zapv2 import ZAPv2

# 初始化ZAP
zap = ZAPv2(apikey='your-api-key')

# 开始新的扫描
target = 'http://example.com'
scan_id = zap.spider.scan(target)

# 等待扫描完成
while True:
    progress = zap.spider.status(scan_id)
    if progress >= 100:
        break
    time.sleep(5)

# 执行主动扫描
active_scan_id = zap.ascan.scan(target)

# 生成报告
report = zap.core.htmlreport()
with open('security-report.html', 'w') as f:
    f.write(report)`

const SQL_INJECTION_CODE = `// SQL注入测试示例
public class SQLInjectionTest {
    @Test
    public void testSQLInjection() {
        // 1. 准备测试数据
        String[] payloads = {
            "' OR '1'='1",
            "'; DROP TABLE users; --",
            "' UNION SELECT * FROM users; --"
        };

        // 2. 执行测试
        for (String payload : payloads) {
            // 发送请求
            Response response = sendRequest("/api/users", payload);

            // 验证响应
            assertFalse("SQL注入漏洞检测",
                response.getBody().contains("error in your SQL syntax"));
        }
    }

    private Response sendRequest(String endpoint, String payload) {
        // 实现HTTP请求逻辑
        return new Response();
    }
}`

const AFL_CODE = `# 编译目标程序
CC=afl-gcc CFLAGS="-g -O0" ./configure
make

# 准备测试用例
mkdir -p testcases
echo "test" > testcases/seed.txt

# 运行模糊测试
afl-fuzz -i testcases -o findings ./target_program @@

# 分析结果
afl-cmin -i findings -o minimized_findings ./target_program @@
afl-tmin -i minimized_findings/crashes/id:000000 -o minimized_crash ./target_program @@`

const API_SECURITY_CODE = `// API安全测试示例
public class APISecurityTest {
    @Test
    public void testAuthentication() {
        // 1. 测试无效令牌
        Response response = sendRequest("/api/users",
            "invalid-token");
        assertEquals(401, response.getStatusCode());

        // 2. 测试过期令牌
        response = sendRequest("/api/users",
            "expired-token");
        assertEquals(401, response.getStatusCode());
    }

    @Test
    public void testAuthorization() {
        // 1. 测试越权访问
        Response response = sendRequest("/api/admin/users",
            "user-token");
        assertEquals(403, response.getStatusCode());

        // 2. 测试资源访问控制
        response = sendRequest("/api/users/123",
            "other-user-token");
        assertEquals(403, response.getStatusCode());
    }

    @Test
    public void testInputValidation() {
        // 1. 测试SQL注入
        String[] payloads = {
            "' OR '1'='1",
            "'; DROP TABLE users; --"
        };

        for (String payload : payloads) {
            Response response = sendRequest("/api/users/search",
                "valid-token",
                Map.of("query", payload));
            assertFalse("SQL注入检测",
                response.getBody().contains("error in your SQL syntax"));
        }

        // 2. 测试XSS攻击
        String xssPayload = "<script>alert('xss')</script>";
        Response response = sendRequest("/api/comments",
            "valid-token",
            Map.of("content", xssPayload));
        assertFalse("XSS检测",
            response.getBody().contains(xssPayload));
    }

    private Response sendRequest(String endpoint, String token) {
        return sendRequest(endpoint, token, Map.of());
    }

    private Response sendRequest(String endpoint, String token,
        Map<String, String> params) {
        // 实现HTTP请求逻辑
        return new Response();
    }
}`

// ===== SPREADS =====

const SPREADS = [
  {
    label: '概述',
    left: (
      <div className="space-y-4">
        <PageTitle>安全测试概述</PageTitle>
        <SectionTitle>1. 什么是安全测试</SectionTitle>
        <BookParagraph>安全测试是评估软件系统安全性的过程，旨在发现潜在的安全漏洞和风险。它涵盖了从代码级别到系统级别的多个层面。</BookParagraph>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="bg-paper-200/60 rounded-lg p-4 border border-paper-300/60">
            <h5 className="text-sm font-semibold text-ink mb-2">主要目标</h5>
            <BookList items={['发现安全漏洞', '评估安全风险', '验证安全控制', '确保合规性', '验证安全需求', '评估安全架构', '测试安全机制', '验证安全配置']} />
          </div>
          <div className="bg-paper-200/60 rounded-lg p-4 border border-paper-300/60">
            <h5 className="text-sm font-semibold text-ink mb-2">测试类型</h5>
            <BookList items={['静态安全测试', '动态安全测试', '渗透测试', '安全配置测试', '模糊测试', 'API安全测试', '移动应用安全测试', '云安全测试', '容器安全测试', 'DevSecOps测试']} />
          </div>
        </div>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>测试流程与工具链</PageTitle>
        <SectionTitle>2. 测试流程</SectionTitle>
        <div className="bg-paper-200/60 rounded-lg p-4 border border-paper-300/60">
          <h5 className="text-sm font-semibold text-ink mb-2">基本步骤</h5>
          <BookList ordered items={[
            '需求分析：确定测试范围、识别关键资产、定义安全需求、确定合规要求',
            '测试计划制定：选择测试方法、确定测试工具、制定时间表、分配资源',
            '测试用例设计：设计测试场景、准备测试数据、定义预期结果、制定测试策略',
            '测试执行：执行自动化测试、进行手动测试、记录测试结果、验证测试覆盖',
            '结果分析：分析测试数据、评估风险等级、确定漏洞优先级、生成分析报告',
            '报告生成：编写测试报告、提供修复建议、评估安全状态、制定改进计划',
            '漏洞修复验证：验证修复效果、进行回归测试、更新安全基线、完善安全措施',
          ]} />
        </div>
        <SectionTitle>3. 测试工具链</SectionTitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="bg-paper-200/60 rounded-lg p-4 border border-paper-300/60">
            <h5 className="text-sm font-semibold text-ink mb-2">静态分析工具</h5>
            <BookList items={['SonarQube - 代码质量与安全分析', 'Fortify - 企业级安全扫描', 'Checkmarx - 源代码分析', 'Coverity - 静态代码分析', 'CodeQL - 语义代码分析', 'Bandit - Python安全分析', 'ESLint - JavaScript安全分析']} />
          </div>
          <div className="bg-paper-200/60 rounded-lg p-4 border border-paper-300/60">
            <h5 className="text-sm font-semibold text-ink mb-2">动态分析工具</h5>
            <BookList items={['OWASP ZAP - Web应用扫描', 'Burp Suite - Web安全测试', 'Acunetix - 自动化漏洞扫描', 'AppScan - 应用安全测试', 'Nessus - 漏洞扫描', 'Metasploit - 渗透测试框架', 'Wireshark - 网络分析']} />
          </div>
          <div className="bg-paper-200/60 rounded-lg p-4 border border-paper-300/60">
            <h5 className="text-sm font-semibold text-ink mb-2">API测试工具</h5>
            <BookList items={['Postman - API测试', 'SoapUI - Web服务测试', 'JMeter - 性能与安全测试', 'REST Assured - API自动化测试', 'Karate - API测试框架']} />
          </div>
          <div className="bg-paper-200/60 rounded-lg p-4 border border-paper-300/60">
            <h5 className="text-sm font-semibold text-ink mb-2">模糊测试工具</h5>
            <BookList items={['AFL - 模糊测试框架', 'LibFuzzer - 库模糊测试', 'Peach Fuzzer - 协议模糊测试', 'Radamsa - 通用模糊测试', 'Jazzer - Java模糊测试']} />
          </div>
        </div>
      </div>
    ),
  },
  {
    label: '静态分析',
    left: (
      <div className="space-y-4">
        <PageTitle>静态安全分析</PageTitle>
        <SectionTitle>1. 静态分析工具</SectionTitle>
        <div className="bg-paper-200/60 rounded-lg p-4 border border-paper-300/60">
          <h5 className="text-sm font-semibold text-ink mb-2">常用工具</h5>
          <BookList items={['SonarQube', 'Fortify', 'Checkmarx', 'Coverity']} />
        </div>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>2. 代码示例</SectionTitle>
        <div className="bg-paper-200/60 rounded-lg p-4 border border-paper-300/60">
          <h5 className="text-sm font-semibold text-ink mb-2">SonarQube配置示例</h5>
          <BookCode language="bash" code={SONARQUBE_CODE} />
        </div>
      </div>
    ),
  },
  {
    label: '动态分析',
    left: (
      <div className="space-y-4">
        <PageTitle>动态安全分析</PageTitle>
        <SectionTitle>1. 动态分析工具</SectionTitle>
        <div className="bg-paper-200/60 rounded-lg p-4 border border-paper-300/60">
          <h5 className="text-sm font-semibold text-ink mb-2">常用工具</h5>
          <BookList items={['OWASP ZAP', 'Burp Suite', 'Acunetix', 'AppScan']} />
        </div>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>2. 测试示例</SectionTitle>
        <div className="bg-paper-200/60 rounded-lg p-4 border border-paper-300/60">
          <h5 className="text-sm font-semibold text-ink mb-2">OWASP ZAP自动化扫描</h5>
          <BookCode language="python" code={ZAP_CODE} />
        </div>
      </div>
    ),
  },
  {
    label: '渗透测试',
    left: (
      <div className="space-y-4">
        <PageTitle>渗透测试</PageTitle>
        <SectionTitle>1. 渗透测试方法</SectionTitle>
        <div className="bg-paper-200/60 rounded-lg p-4 border border-paper-300/60">
          <h5 className="text-sm font-semibold text-ink mb-2">测试阶段</h5>
          <BookList ordered items={['信息收集', '漏洞扫描', '漏洞利用', '后渗透测试', '报告生成']} />
        </div>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>2. 测试示例</SectionTitle>
        <div className="bg-paper-200/60 rounded-lg p-4 border border-paper-300/60">
          <h5 className="text-sm font-semibold text-ink mb-2">SQL注入测试</h5>
          <BookCode language="java" code={SQL_INJECTION_CODE} />
        </div>
      </div>
    ),
  },
  {
    label: '模糊测试',
    left: (
      <div className="space-y-4">
        <PageTitle>模糊测试</PageTitle>
        <SectionTitle>1. 模糊测试概述</SectionTitle>
        <BookParagraph>模糊测试是一种自动化测试技术，通过向目标程序输入大量随机或半随机的数据来发现潜在的安全漏洞和程序缺陷。</BookParagraph>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="bg-paper-200/60 rounded-lg p-4 border border-paper-300/60">
            <h5 className="text-sm font-semibold text-ink mb-2">主要特点</h5>
            <BookList items={['自动化程度高', '发现未知漏洞', '覆盖范围广', '成本效益好', '持续运行能力']} />
          </div>
          <div className="bg-paper-200/60 rounded-lg p-4 border border-paper-300/60">
            <h5 className="text-sm font-semibold text-ink mb-2">应用场景</h5>
            <BookList items={['文件格式解析', '网络协议测试', 'API接口测试', '浏览器测试', '系统调用测试']} />
          </div>
        </div>
        <SectionTitle>2. 模糊测试方法</SectionTitle>
        <div className="bg-paper-200/60 rounded-lg p-4 border border-paper-300/60">
          <h5 className="text-sm font-semibold text-ink mb-2">测试类型</h5>
          <BookList items={[
            '基于变异的模糊测试：随机变异、智能变异、语法感知变异',
            '基于生成的模糊测试：模型驱动生成、语法驱动生成、规则驱动生成',
            '混合方法：结合变异和生成、自适应策略、反馈驱动',
          ]} />
        </div>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>3. 代码示例</SectionTitle>
        <div className="bg-paper-200/60 rounded-lg p-4 border border-paper-300/60">
          <h5 className="text-sm font-semibold text-ink mb-2">AFL模糊测试示例</h5>
          <BookCode language="bash" code={AFL_CODE} />
        </div>
      </div>
    ),
  },
  {
    label: 'API安全测试',
    left: (
      <div className="space-y-4">
        <PageTitle>API安全测试</PageTitle>
        <SectionTitle>1. API安全测试概述</SectionTitle>
        <BookParagraph>API安全测试专注于评估API接口的安全性，包括认证、授权、数据验证、加密等方面。</BookParagraph>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="bg-paper-200/60 rounded-lg p-4 border border-paper-300/60">
            <h5 className="text-sm font-semibold text-ink mb-2">测试重点</h5>
            <BookList items={['认证机制', '授权控制', '输入验证', '数据加密', '错误处理', '访问控制', '速率限制', '日志记录']} />
          </div>
          <div className="bg-paper-200/60 rounded-lg p-4 border border-paper-300/60">
            <h5 className="text-sm font-semibold text-ink mb-2">常见漏洞</h5>
            <BookList items={['认证绕过', '权限提升', '注入攻击', '敏感数据泄露', 'CSRF攻击', 'SSRF攻击', 'XXE攻击', 'DoS攻击']} />
          </div>
        </div>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>2. 测试方法</SectionTitle>
        <div className="bg-paper-200/60 rounded-lg p-4 border border-paper-300/60">
          <h5 className="text-sm font-semibold text-ink mb-2">测试步骤</h5>
          <BookList ordered items={[
            'API文档分析：接口定义审查、参数分析、认证方式确认、错误码分析',
            '认证测试：令牌验证、会话管理、密码策略、多因素认证',
            '授权测试：权限检查、角色验证、资源访问控制、越权测试',
            '输入验证：参数验证、数据类型检查、长度限制、特殊字符处理',
          ]} />
        </div>
        <SectionTitle>3. 代码示例</SectionTitle>
        <div className="bg-paper-200/60 rounded-lg p-4 border border-paper-300/60">
          <h5 className="text-sm font-semibold text-ink mb-2">API安全测试示例</h5>
          <BookCode language="java" code={API_SECURITY_CODE} />
        </div>
      </div>
    ),
  },
]

export default function SecurityTestingPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
