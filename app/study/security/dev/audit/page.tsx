"use client";
import { useState } from "react";
import Link from "next/link";

export default function CodeAuditPage() {
  const [activeTab, setActiveTab] = useState("basic");

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">代码审计</h1>
      
      {/* 标签页导航 */}
      <div className="flex space-x-4 mb-6 border-b overflow-x-auto">
        <button
          onClick={() => setActiveTab("basic")}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === "basic"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          基础概念
        </button>
        <button
          onClick={() => setActiveTab("process")}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === "process"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          审计流程
        </button>
        <button
          onClick={() => setActiveTab("tools")}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === "tools"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          审计工具
        </button>
        <button
          onClick={() => setActiveTab("examples")}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === "examples"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          代码示例
        </button>
        <button
          onClick={() => setActiveTab("best-practices")}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === "best-practices"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          最佳实践
        </button>
      </div>

      {/* 内容区域 */}
      <div className="space-y-6">
        {activeTab === "basic" && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">基础概念</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold">1. 代码审计定义</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <p className="mb-4">
                  代码审计是从安全角度对源代码进行系统性检查的过程，旨在发现潜在的安全漏洞、编码缺陷和不良实践。通过代码审计，可以：
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>发现安全漏洞和编码缺陷</li>
                  <li>识别潜在的安全风险</li>
                  <li>确保代码符合安全最佳实践</li>
                  <li>防止数据泄露和恶意代码注入</li>
                  <li>提高代码质量和可维护性</li>
                </ul>
              </div>

              <h4 className="font-semibold">2. 代码审计重要性</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h5 className="font-semibold mb-2">实际案例</h5>
                    <ul className="list-disc pl-6">
                      <li>Equifax数据泄露事件
                        <ul className="list-disc pl-6 mt-2">
                          <li>未修复的Apache Struts漏洞</li>
                          <li>导致1.43亿用户数据泄露</li>
                          <li>造成超过7亿美元损失</li>
                        </ul>
                      </li>
                      <li>Heartbleed漏洞
                        <ul className="list-disc pl-6 mt-2">
                          <li>OpenSSL库中的内存处理错误</li>
                          <li>影响全球大量网站</li>
                          <li>造成严重的安全隐患</li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h5 className="font-semibold mb-2">重要性体现</h5>
                    <ul className="list-disc pl-6">
                      <li>保障软件安全性
                        <ul className="list-disc pl-6 mt-2">
                          <li>预防安全漏洞</li>
                          <li>保护用户数据</li>
                          <li>维护系统完整性</li>
                        </ul>
                      </li>
                      <li>维护企业声誉
                        <ul className="list-disc pl-6 mt-2">
                          <li>避免安全事故</li>
                          <li>提升用户信任</li>
                          <li>保护品牌形象</li>
                        </ul>
                      </li>
                      <li>降低经济损失
                        <ul className="list-disc pl-6 mt-2">
                          <li>减少修复成本</li>
                          <li>避免赔偿损失</li>
                          <li>降低运营风险</li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "process" && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">审计流程</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold">1. 规划阶段</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h5 className="font-semibold mb-2">确定审计范围</h5>
                    <ul className="list-disc pl-6">
                      <li>项目功能模块划分
                        <ul className="list-disc pl-6 mt-2">
                          <li>核心业务模块</li>
                          <li>安全关键模块</li>
                          <li>第三方依赖模块</li>
                        </ul>
                      </li>
                      <li>代码规模评估
                        <ul className="list-disc pl-6 mt-2">
                          <li>代码行数统计</li>
                          <li>复杂度分析</li>
                          <li>依赖关系梳理</li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h5 className="font-semibold mb-2">制定审计计划</h5>
                    <ul className="list-disc pl-6">
                      <li>时间安排
                        <ul className="list-disc pl-6 mt-2">
                          <li>审计周期规划</li>
                          <li>里程碑设定</li>
                          <li>进度跟踪机制</li>
                        </ul>
                      </li>
                      <li>人员分工
                        <ul className="list-disc pl-6 mt-2">
                          <li>审计团队组建</li>
                          <li>角色职责划分</li>
                          <li>协作机制建立</li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <h4 className="font-semibold">2. 信息收集阶段</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h5 className="font-semibold mb-2">收集内容</h5>
                    <ul className="list-disc pl-6">
                      <li>系统架构文档
                        <ul className="list-disc pl-6 mt-2">
                          <li>系统设计文档</li>
                          <li>架构图</li>
                          <li>部署文档</li>
                        </ul>
                      </li>
                      <li>业务逻辑流程
                        <ul className="list-disc pl-6 mt-2">
                          <li>业务流程文档</li>
                          <li>用例说明</li>
                          <li>接口文档</li>
                        </ul>
                      </li>
                      <li>技术栈信息
                        <ul className="list-disc pl-6 mt-2">
                          <li>编程语言版本</li>
                          <li>框架版本</li>
                          <li>依赖库清单</li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <h4 className="font-semibold">3. 审计执行阶段</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h5 className="font-semibold mb-2">静态分析</h5>
                    <ul className="list-disc pl-6">
                      <li>工具使用
                        <ul className="list-disc pl-6 mt-2">
                          <li>Checkstyle - Java代码规范检查</li>
                          <li>FindBugs - Java静态分析</li>
                          <li>SonarQube - 多语言代码分析</li>
                        </ul>
                      </li>
                      <li>常见问题类型
                        <ul className="list-disc pl-6 mt-2">
                          <li>未初始化变量</li>
                          <li>空指针引用</li>
                          <li>资源泄露</li>
                          <li>并发问题</li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h5 className="font-semibold mb-2">动态分析</h5>
                    <ul className="list-disc pl-6">
                      <li>分析方法
                        <ul className="list-disc pl-6 mt-2">
                          <li>运行时监控</li>
                          <li>性能分析</li>
                          <li>内存分析</li>
                          <li>网络流量分析</li>
                        </ul>
                      </li>
                      <li>发现的问题
                        <ul className="list-disc pl-6 mt-2">
                          <li>运行时漏洞</li>
                          <li>性能瓶颈</li>
                          <li>内存泄漏</li>
                          <li>并发问题</li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h5 className="font-semibold mb-2">人工审查</h5>
                    <ul className="list-disc pl-6">
                      <li>审查重点
                        <ul className="list-disc pl-6 mt-2">
                          <li>业务逻辑审查</li>
                          <li>安全关键点检查</li>
                          <li>代码质量评估</li>
                          <li>最佳实践遵循</li>
                        </ul>
                      </li>
                      <li>审查技巧
                        <ul className="list-disc pl-6 mt-2">
                          <li>代码逻辑梳理</li>
                          <li>关键代码段重点检查</li>
                          <li>常见漏洞模式识别</li>
                          <li>代码重构建议</li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <h4 className="font-semibold">4. 报告与修复阶段</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h5 className="font-semibold mb-2">审计报告</h5>
                    <ul className="list-disc pl-6">
                      <li>报告内容
                        <ul className="list-disc pl-6 mt-2">
                          <li>问题描述</li>
                          <li>漏洞严重程度评级</li>
                          <li>修复建议</li>
                          <li>风险评估</li>
                        </ul>
                      </li>
                      <li>漏洞评级
                        <ul className="list-disc pl-6 mt-2">
                          <li>高危 - 可能导致系统被完全控制</li>
                          <li>中危 - 可能导致部分功能被利用</li>
                          <li>低危 - 影响较小或难以利用</li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h5 className="font-semibold mb-2">修复跟踪</h5>
                    <ul className="list-disc pl-6">
                      <li>修复流程
                        <ul className="list-disc pl-6 mt-2">
                          <li>问题确认</li>
                          <li>修复方案制定</li>
                          <li>代码修改</li>
                          <li>测试验证</li>
                        </ul>
                      </li>
                      <li>跟踪方法
                        <ul className="list-disc pl-6 mt-2">
                          <li>问题跟踪系统</li>
                          <li>定期进度报告</li>
                          <li>修复验证确认</li>
                          <li>回归测试</li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "tools" && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">审计工具</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold">1. 主流代码审计工具</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h5 className="font-semibold mb-2">Java工具</h5>
                    <ul className="list-disc pl-6">
                      <li>SonarQube
                        <ul className="list-disc pl-6 mt-2">
                          <li>功能：代码质量与安全分析</li>
                          <li>特点：支持多语言、可扩展</li>
                          <li>适用：企业级代码审计</li>
                        </ul>
                      </li>
                      <li>FindBugs
                        <ul className="list-disc pl-6 mt-2">
                          <li>功能：静态代码分析</li>
                          <li>特点：专注于bug检测</li>
                          <li>适用：开发阶段检查</li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h5 className="font-semibold mb-2">Python工具</h5>
                    <ul className="list-disc pl-6">
                      <li>Pylint
                        <ul className="list-disc pl-6 mt-2">
                          <li>功能：代码风格检查</li>
                          <li>特点：高度可配置</li>
                          <li>适用：代码规范检查</li>
                        </ul>
                      </li>
                      <li>Bandit
                        <ul className="list-disc pl-6 mt-2">
                          <li>功能：安全漏洞检测</li>
                          <li>特点：专注于安全</li>
                          <li>适用：安全审计</li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h5 className="font-semibold mb-2">JavaScript工具</h5>
                    <ul className="list-disc pl-6">
                      <li>ESLint
                        <ul className="list-disc pl-6 mt-2">
                          <li>功能：代码规范检查</li>
                          <li>特点：插件化架构</li>
                          <li>适用：前端开发</li>
                        </ul>
                      </li>
                      <li>JSHint
                        <ul className="list-disc pl-6 mt-2">
                          <li>功能：代码质量检查</li>
                          <li>特点：轻量级</li>
                          <li>适用：快速检查</li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h5 className="font-semibold mb-2">通用工具</h5>
                    <ul className="list-disc pl-6">
                      <li>CodeQL
                        <ul className="list-disc pl-6 mt-2">
                          <li>功能：语义代码分析</li>
                          <li>特点：支持多语言</li>
                          <li>适用：深度安全分析</li>
                        </ul>
                      </li>
                      <li>Coverity
                        <ul className="list-disc pl-6 mt-2">
                          <li>功能：静态分析</li>
                          <li>特点：企业级支持</li>
                          <li>适用：大型项目</li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <h4 className="font-semibold">2. 工具使用指南</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h5 className="font-semibold mb-2">SonarQube配置示例</h5>
                    <pre className="bg-gray-200 p-2 rounded">
                      <code>{`# sonar-project.properties
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
sonar-scanner`}</code>
                    </pre>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h5 className="font-semibold mb-2">ESLint配置示例</h5>
                    <pre className="bg-gray-200 p-2 rounded">
                      <code>{`// .eslintrc.js
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
};`}</code>
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "examples" && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">代码示例</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold">1. SQL注入漏洞</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h5 className="font-semibold mb-2">漏洞代码</h5>
                    <pre className="bg-gray-200 p-2 rounded">
                      <code>{`// 不安全的代码
public User getUser(String username) {
    String query = "SELECT * FROM users WHERE username = '" + username + "'";
    return jdbcTemplate.queryForObject(query, User.class);
}

// 攻击示例
getUser("admin' OR '1'='1");  // 将返回所有用户`}</code>
                    </pre>
                    <h5 className="font-semibold mb-2 mt-4">修复方案</h5>
                    <pre className="bg-gray-200 p-2 rounded">
                      <code>{`// 使用参数化查询
public User getUser(String username) {
    String query = "SELECT * FROM users WHERE username = ?";
    return jdbcTemplate.queryForObject(query, User.class, username);
}`}</code>
                    </pre>
                  </div>
                </div>
              </div>

              <h4 className="font-semibold">2. XSS漏洞</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h5 className="font-semibold mb-2">漏洞代码</h5>
                    <pre className="bg-gray-200 p-2 rounded">
                      <code>{`// 不安全的代码
public String renderComment(String comment) {
    return "<div class='comment'>" + comment + "</div>";
}

// 攻击示例
renderComment("<script>alert('xss')</script>");`}</code>
                    </pre>
                    <h5 className="font-semibold mb-2 mt-4">修复方案</h5>
                    <pre className="bg-gray-200 p-2 rounded">
                      <code>{`// 使用HTML转义
public String renderComment(String comment) {
    return "<div class='comment'>" + 
           HtmlUtils.htmlEscape(comment) + 
           "</div>";
}`}</code>
                    </pre>
                  </div>
                </div>
              </div>

              <h4 className="font-semibold">3. 缓冲区溢出</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h5 className="font-semibold mb-2">漏洞代码</h5>
                    <pre className="bg-gray-200 p-2 rounded">
                      <code>{`// 不安全的代码
void copyString(char* dest, char* src) {
    strcpy(dest, src);  // 没有长度检查
}

// 攻击示例
char dest[10];
char src[20] = "This is a long string";
copyString(dest, src);  // 缓冲区溢出`}</code>
                    </pre>
                    <h5 className="font-semibold mb-2 mt-4">修复方案</h5>
                    <pre className="bg-gray-200 p-2 rounded">
                      <code>{`// 使用安全的字符串复制
void copyString(char* dest, char* src, size_t destSize) {
    strncpy(dest, src, destSize - 1);
    dest[destSize - 1] = '\\0';
}`}</code>
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "best-practices" && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">最佳实践</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold">1. 代码审计最佳实践</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h5 className="font-semibold mb-2">定期审计</h5>
                    <ul className="list-disc pl-6">
                      <li>建立定期审计机制
                        <ul className="list-disc pl-6 mt-2">
                          <li>开发阶段审计</li>
                          <li>发布前审计</li>
                          <li>定期安全审计</li>
                        </ul>
                      </li>
                      <li>自动化审计流程
                        <ul className="list-disc pl-6 mt-2">
                          <li>CI/CD集成</li>
                          <li>自动化扫描</li>
                          <li>持续监控</li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h5 className="font-semibold mb-2">标准规范</h5>
                    <ul className="list-disc pl-6">
                      <li>建立代码审查标准
                        <ul className="list-disc pl-6 mt-2">
                          <li>编码规范</li>
                          <li>安全标准</li>
                          <li>审查清单</li>
                        </ul>
                      </li>
                      <li>培训与指导
                        <ul className="list-disc pl-6 mt-2">
                          <li>开发人员培训</li>
                          <li>最佳实践分享</li>
                          <li>案例学习</li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <h4 className="font-semibold">2. 实用技巧</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h5 className="font-semibold mb-2">版本控制</h5>
                    <ul className="list-disc pl-6">
                      <li>Git辅助审计
                        <ul className="list-disc pl-6 mt-2">
                          <li>代码提交记录分析</li>
                          <li>变更追踪</li>
                          <li>问题溯源</li>
                        </ul>
                      </li>
                      <li>分支管理
                        <ul className="list-disc pl-6 mt-2">
                          <li>功能分支审计</li>
                          <li>合并请求审查</li>
                          <li>版本控制</li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h5 className="font-semibold mb-2">审查清单</h5>
                    <ul className="list-disc pl-6">
                      <li>安全检查项
                        <ul className="list-disc pl-6 mt-2">
                          <li>输入验证</li>
                          <li>认证授权</li>
                          <li>加密解密</li>
                          <li>错误处理</li>
                        </ul>
                      </li>
                      <li>代码质量项
                        <ul className="list-disc pl-6 mt-2">
                          <li>代码规范</li>
                          <li>性能优化</li>
                          <li>可维护性</li>
                          <li>可测试性</li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 导航链接 */}
      <div className="mt-8 flex justify-between">
        <Link
          href="/study/security/dev/testing"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          ← 安全测试方法
        </Link>
        <Link
          href="/study/security/dev/tools"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          安全工具使用 →
        </Link>
      </div>
    </div>
  );
} 