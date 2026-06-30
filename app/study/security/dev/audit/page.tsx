'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import {
  PageTitle,
  BookParagraph,
  BookCode,
  BookList,
} from '@shared/components/ui/book/BookContent'

// ==================== META ====================

const META: LessonMeta = {
  subject: '安全开发',
  chapterTitle: '代码审计',
  chapterNumber: 5,
  totalChapters: 10,
  subjectHref: '/study/security/dev',
  prevChapter: { label: '安全测试方法', href: '/study/security/dev/testing' },
  nextChapter: { label: '安全工具使用', href: '/study/security/dev/tools' },
  theme: THEMES.security,
}

// ==================== 大段代码常量 ====================

const SONARQUBE_CONFIG = `# sonar-project.properties
sonar.projectKey=my-project
sonar.projectName=My Project
sonar.projectVersion=1.0

# 源代码配置
sonar.sources=src
sonar.java.binaries=target/classes
sonar.java.source=11

# 安全规则配置
sonar.security.sources.javasecurity=true
sonar.security.sources.owasp=true

# 质量门限配置
sonar.qualitygate.conditions=coverage,duplications,security_rating
sonar.qualitygate.coverage.threshold=80
sonar.qualitygate.security_rating.threshold=A

# 运行命令
sonar-scanner`

const ESLINT_CONFIG = `// .eslintrc.js
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:security/recommended'
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: [
    'security'
  ],
  rules: {
    'security/detect-object-injection': 'error',
    'security/detect-non-literal-regexp': 'error',
    'security/detect-unsafe-regex': 'error',
    'security/detect-eval-with-expression': 'error'
  }
};`

const SQL_INJECTION_VULN = `// 不安全的代码
public User getUser(String username) {
    String query = "SELECT * FROM users WHERE username = '" + username + "'";
    return jdbcTemplate.queryForObject(query, User.class);
}

// 攻击示例
getUser("admin' OR '1'='1");  // 将返回所有用户`

const SQL_INJECTION_FIX = `// 使用参数化查询
public User getUser(String username) {
    String query = "SELECT * FROM users WHERE username = ?";
    return jdbcTemplate.queryForObject(query, User.class, username);
}`

const XSS_VULN = `// 不安全的代码
public String renderComment(String comment) {
    return "<div class='comment'>" + comment + "</div>";
}

// 攻击示例
renderComment("<script>alert('xss')</script>");`

const XSS_FIX = `// 使用HTML转义
public String renderComment(String comment) {
    return "<div class='comment'>" +
           HtmlUtils.htmlEscape(comment) +
           "</div>";
}`

const BUFFER_OVERFLOW_VULN = `// 不安全的代码
void copyString(char* dest, char* src) {
    strcpy(dest, src);  // 没有长度检查
}

// 攻击示例
char dest[10];
char src[20] = "This is a long string";
copyString(dest, src);  // 缓冲区溢出`

const BUFFER_OVERFLOW_FIX = `// 使用安全的字符串复制
void copyString(char* dest, char* src, size_t destSize) {
    strncpy(dest, src, destSize - 1);
    dest[destSize - 1] = '\\0';
}`

// ==================== SPREADS ====================

const SPREADS = [
  // ===== 跨页 1: 基础概念 =====
  {
    label: '基础概念',
    left: (
      <div className="space-y-4">
        <PageTitle>代码审计定义</PageTitle>
        <BookParagraph>
          代码审计是从安全角度对源代码进行系统性检查的过程，旨在发现潜在的安全漏洞、编码缺陷和不良实践。通过代码审计，可以：
        </BookParagraph>
        <BookList items={[
          '发现安全漏洞和编码缺陷',
          '识别潜在的安全风险',
          '确保代码符合安全最佳实践',
          '防止数据泄露和恶意代码注入',
          '提高代码质量和可维护性',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>代码审计重要性</PageTitle>
        <div className="bg-white/50 p-4 rounded-lg shadow-sm border border-paper-300/60">
          <h3 className="text-sm font-medium text-ink mb-2">实际案例</h3>
          <BookList items={[
            <span key="1">Equifax数据泄露事件<span className="block text-ink-fade text-xs leading-relaxed">未修复的Apache Struts漏洞，导致1.43亿用户数据泄露，造成超过7亿美元损失</span></span>,
            <span key="2">Heartbleed漏洞<span className="block text-ink-fade text-xs leading-relaxed">OpenSSL库中的内存处理错误，影响全球大量网站，造成严重的安全隐患</span></span>,
          ]} />
        </div>
        <div className="bg-white/50 p-4 rounded-lg shadow-sm border border-paper-300/60">
          <h3 className="text-sm font-medium text-ink mb-2">重要性体现</h3>
          <BookList items={[
            <span key="1">保障软件安全性<span className="block text-ink-fade text-xs leading-relaxed">预防安全漏洞，保护用户数据，维护系统完整性</span></span>,
            <span key="2">维护企业声誉<span className="block text-ink-fade text-xs leading-relaxed">避免安全事故，提升用户信任，保护品牌形象</span></span>,
            <span key="3">降低经济损失<span className="block text-ink-fade text-xs leading-relaxed">减少修复成本，避免赔偿损失，降低运营风险</span></span>,
          ]} />
        </div>
      </div>
    ),
  },

  // ===== 跨页 2: 审计流程 =====
  {
    label: '审计流程',
    left: (
      <div className="space-y-4">
        <PageTitle>规划阶段</PageTitle>
        <div className="bg-white/50 p-4 rounded-lg shadow-sm border border-paper-300/60">
          <h3 className="text-sm font-medium text-ink mb-2">确定审计范围</h3>
          <BookList items={[
            <span key="1">项目功能模块划分<span className="block text-ink-fade text-xs leading-relaxed">核心业务模块，安全关键模块，第三方依赖模块</span></span>,
            <span key="2">代码规模评估<span className="block text-ink-fade text-xs leading-relaxed">代码行数统计，复杂度分析，依赖关系梳理</span></span>,
          ]} />
        </div>
        <div className="bg-white/50 p-4 rounded-lg shadow-sm border border-paper-300/60">
          <h3 className="text-sm font-medium text-ink mb-2">制定审计计划</h3>
          <BookList items={[
            <span key="1">时间安排<span className="block text-ink-fade text-xs leading-relaxed">审计周期规划，里程碑设定，进度跟踪机制</span></span>,
            <span key="2">人员分工<span className="block text-ink-fade text-xs leading-relaxed">审计团队组建，角色职责划分，协作机制建立</span></span>,
          ]} />
        </div>
        <PageTitle>信息收集阶段</PageTitle>
        <div className="bg-white/50 p-4 rounded-lg shadow-sm border border-paper-300/60">
          <h3 className="text-sm font-medium text-ink mb-2">收集内容</h3>
          <BookList items={[
            <span key="1">系统架构文档<span className="block text-ink-fade text-xs leading-relaxed">系统设计文档，架构图，部署文档</span></span>,
            <span key="2">业务逻辑流程<span className="block text-ink-fade text-xs leading-relaxed">业务流程文档，用例说明，接口文档</span></span>,
            <span key="3">技术栈信息<span className="block text-ink-fade text-xs leading-relaxed">编程语言版本，框架版本，依赖库清单</span></span>,
          ]} />
        </div>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>审计执行阶段</PageTitle>
        <div className="bg-white/50 p-4 rounded-lg shadow-sm border border-paper-300/60">
          <h3 className="text-sm font-medium text-ink mb-2">静态分析</h3>
          <BookList items={[
            <span key="1">工具使用<span className="block text-ink-fade text-xs leading-relaxed">Checkstyle - Java代码规范检查，FindBugs - Java静态分析，SonarQube - 多语言代码分析</span></span>,
            <span key="2">常见问题类型<span className="block text-ink-fade text-xs leading-relaxed">未初始化变量，空指针引用，资源泄露，并发问题</span></span>,
          ]} />
        </div>
        <div className="bg-white/50 p-4 rounded-lg shadow-sm border border-paper-300/60">
          <h3 className="text-sm font-medium text-ink mb-2">动态分析</h3>
          <BookList items={[
            <span key="1">分析方法<span className="block text-ink-fade text-xs leading-relaxed">运行时监控，性能分析，内存分析，网络流量分析</span></span>,
            <span key="2">发现的问题<span className="block text-ink-fade text-xs leading-relaxed">运行时漏洞，性能瓶颈，内存泄漏，并发问题</span></span>,
          ]} />
        </div>
        <div className="bg-white/50 p-4 rounded-lg shadow-sm border border-paper-300/60">
          <h3 className="text-sm font-medium text-ink mb-2">人工审查</h3>
          <BookList items={[
            <span key="1">审查重点<span className="block text-ink-fade text-xs leading-relaxed">业务逻辑审查，安全关键点检查，代码质量评估，最佳实践遵循</span></span>,
            <span key="2">审查技巧<span className="block text-ink-fade text-xs leading-relaxed">代码逻辑梳理，关键代码段重点检查，常见漏洞模式识别，代码重构建议</span></span>,
          ]} />
        </div>
        <PageTitle>报告与修复阶段</PageTitle>
        <div className="bg-white/50 p-4 rounded-lg shadow-sm border border-paper-300/60">
          <h3 className="text-sm font-medium text-ink mb-2">审计报告</h3>
          <BookList items={[
            <span key="1">报告内容<span className="block text-ink-fade text-xs leading-relaxed">问题描述，漏洞严重程度评级，修复建议，风险评估</span></span>,
            <span key="2">漏洞评级<span className="block text-ink-fade text-xs leading-relaxed">高危 - 可能导致系统被完全控制，中危 - 可能导致部分功能被利用，低危 - 影响较小或难以利用</span></span>,
          ]} />
        </div>
        <div className="bg-white/50 p-4 rounded-lg shadow-sm border border-paper-300/60">
          <h3 className="text-sm font-medium text-ink mb-2">修复跟踪</h3>
          <BookList items={[
            <span key="1">修复流程<span className="block text-ink-fade text-xs leading-relaxed">问题确认，修复方案制定，代码修改，测试验证</span></span>,
            <span key="2">跟踪方法<span className="block text-ink-fade text-xs leading-relaxed">问题跟踪系统，定期进度报告，修复验证确认，回归测试</span></span>,
          ]} />
        </div>
      </div>
    ),
  },

  // ===== 跨页 3: 审计工具 =====
  {
    label: '审计工具',
    left: (
      <div className="space-y-4">
        <PageTitle>主流代码审计工具</PageTitle>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white/50 p-3 rounded-lg shadow-sm border border-paper-300/60">
            <h3 className="text-sm font-medium text-ink mb-2">Java工具</h3>
            <BookList items={[
              <span key="1">SonarQube<span className="block text-ink-fade text-xs leading-relaxed">代码质量与安全分析，支持多语言、可扩展，企业级代码审计</span></span>,
              <span key="2">FindBugs<span className="block text-ink-fade text-xs leading-relaxed">静态代码分析，专注于bug检测，开发阶段检查</span></span>,
            ]} />
          </div>
          <div className="bg-white/50 p-3 rounded-lg shadow-sm border border-paper-300/60">
            <h3 className="text-sm font-medium text-ink mb-2">Python工具</h3>
            <BookList items={[
              <span key="1">Pylint<span className="block text-ink-fade text-xs leading-relaxed">代码风格检查，高度可配置，代码规范检查</span></span>,
              <span key="2">Bandit<span className="block text-ink-fade text-xs leading-relaxed">安全漏洞检测，专注于安全，安全审计</span></span>,
            ]} />
          </div>
          <div className="bg-white/50 p-3 rounded-lg shadow-sm border border-paper-300/60">
            <h3 className="text-sm font-medium text-ink mb-2">JavaScript工具</h3>
            <BookList items={[
              <span key="1">ESLint<span className="block text-ink-fade text-xs leading-relaxed">代码规范检查，插件化架构，前端开发</span></span>,
              <span key="2">JSHint<span className="block text-ink-fade text-xs leading-relaxed">代码质量检查，轻量级，快速检查</span></span>,
            ]} />
          </div>
          <div className="bg-white/50 p-3 rounded-lg shadow-sm border border-paper-300/60">
            <h3 className="text-sm font-medium text-ink mb-2">通用工具</h3>
            <BookList items={[
              <span key="1">CodeQL<span className="block text-ink-fade text-xs leading-relaxed">语义代码分析，支持多语言，深度安全分析</span></span>,
              <span key="2">Coverity<span className="block text-ink-fade text-xs leading-relaxed">静态分析，企业级支持，大型项目</span></span>,
            ]} />
          </div>
        </div>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>工具使用指南</PageTitle>
        <div className="bg-white/50 p-4 rounded-lg shadow-sm border border-paper-300/60">
          <h3 className="text-sm font-medium text-ink mb-2">SonarQube配置示例</h3>
          <BookCode language="properties" showLineNumbers code={SONARQUBE_CONFIG} />
        </div>
        <div className="bg-white/50 p-4 rounded-lg shadow-sm border border-paper-300/60">
          <h3 className="text-sm font-medium text-ink mb-2">ESLint配置示例</h3>
          <BookCode language="javascript" showLineNumbers code={ESLINT_CONFIG} />
        </div>
      </div>
    ),
  },

  // ===== 跨页 4: 代码示例 =====
  {
    label: '代码示例',
    left: (
      <div className="space-y-4">
        <PageTitle>SQL注入漏洞</PageTitle>
        <div className="bg-white/50 p-4 rounded-lg shadow-sm border border-paper-300/60">
          <h3 className="text-sm font-medium text-ink mb-2">漏洞代码</h3>
          <BookCode language="java" showLineNumbers code={SQL_INJECTION_VULN} />
          <h3 className="text-sm font-medium text-ink mt-4 mb-2">修复方案</h3>
          <BookCode language="java" showLineNumbers code={SQL_INJECTION_FIX} />
        </div>
        <PageTitle>XSS漏洞</PageTitle>
        <div className="bg-white/50 p-4 rounded-lg shadow-sm border border-paper-300/60">
          <h3 className="text-sm font-medium text-ink mb-2">漏洞代码</h3>
          <BookCode language="java" showLineNumbers code={XSS_VULN} />
          <h3 className="text-sm font-medium text-ink mt-4 mb-2">修复方案</h3>
          <BookCode language="java" showLineNumbers code={XSS_FIX} />
        </div>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>缓冲区溢出</PageTitle>
        <div className="bg-white/50 p-4 rounded-lg shadow-sm border border-paper-300/60">
          <h3 className="text-sm font-medium text-ink mb-2">漏洞代码</h3>
          <BookCode language="c" showLineNumbers code={BUFFER_OVERFLOW_VULN} />
          <h3 className="text-sm font-medium text-ink mt-4 mb-2">修复方案</h3>
          <BookCode language="c" showLineNumbers code={BUFFER_OVERFLOW_FIX} />
        </div>
      </div>
    ),
  },

  // ===== 跨页 5: 最佳实践 =====
  {
    label: '最佳实践',
    left: (
      <div className="space-y-4">
        <PageTitle>代码审计最佳实践</PageTitle>
        <div className="bg-white/50 p-4 rounded-lg shadow-sm border border-paper-300/60">
          <h3 className="text-sm font-medium text-ink mb-2">定期审计</h3>
          <BookList items={[
            <span key="1">建立定期审计机制<span className="block text-ink-fade text-xs leading-relaxed">开发阶段审计，发布前审计，定期安全审计</span></span>,
            <span key="2">自动化审计流程<span className="block text-ink-fade text-xs leading-relaxed">CI/CD集成，自动化扫描，持续监控</span></span>,
          ]} />
        </div>
        <div className="bg-white/50 p-4 rounded-lg shadow-sm border border-paper-300/60">
          <h3 className="text-sm font-medium text-ink mb-2">标准规范</h3>
          <BookList items={[
            <span key="1">建立代码审查标准<span className="block text-ink-fade text-xs leading-relaxed">编码规范，安全标准，审查清单</span></span>,
            <span key="2">培训与指导<span className="block text-ink-fade text-xs leading-relaxed">开发人员培训，最佳实践分享，案例学习</span></span>,
          ]} />
        </div>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>实用技巧</PageTitle>
        <div className="bg-white/50 p-4 rounded-lg shadow-sm border border-paper-300/60">
          <h3 className="text-sm font-medium text-ink mb-2">版本控制</h3>
          <BookList items={[
            <span key="1">Git辅助审计<span className="block text-ink-fade text-xs leading-relaxed">代码提交记录分析，变更追踪，问题溯源</span></span>,
            <span key="2">分支管理<span className="block text-ink-fade text-xs leading-relaxed">功能分支审计，合并请求审查，版本控制</span></span>,
          ]} />
        </div>
        <div className="bg-white/50 p-4 rounded-lg shadow-sm border border-paper-300/60">
          <h3 className="text-sm font-medium text-ink mb-2">审查清单</h3>
          <BookList items={[
            <span key="1">安全检查项<span className="block text-ink-fade text-xs leading-relaxed">输入验证，认证授权，加密解密，错误处理</span></span>,
            <span key="2">代码质量项<span className="block text-ink-fade text-xs leading-relaxed">代码规范，性能优化，可维护性，可测试性</span></span>,
          ]} />
        </div>
      </div>
    ),
  },
]

// ==================== 页面 ====================

export default function CodeAuditPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
