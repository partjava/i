"use client";
import { useState } from "react";
import Link from "next/link";

export default function SecurityTestingPage() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">安全测试方法</h1>
      
      {/* 标签页导航 */}
      <div className="flex space-x-4 mb-6 border-b overflow-x-auto">
        <button
          onClick={() => setActiveTab("overview")}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === "overview"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          概述
        </button>
        <button
          onClick={() => setActiveTab("static")}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === "static"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          静态分析
        </button>
        <button
          onClick={() => setActiveTab("dynamic")}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === "dynamic"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          动态分析
        </button>
        <button
          onClick={() => setActiveTab("penetration")}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === "penetration"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          渗透测试
        </button>
        <button
          onClick={() => setActiveTab("fuzzing")}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === "fuzzing"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          模糊测试
        </button>
        <button
          onClick={() => setActiveTab("api")}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === "api"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          API安全测试
        </button>
      </div>

      {/* 内容区域 */}
      <div className="space-y-6">
        {activeTab === "overview" && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">安全测试概述</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold">1. 什么是安全测试</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <p className="mb-4">
                  安全测试是评估软件系统安全性的过程，旨在发现潜在的安全漏洞和风险。它涵盖了从代码级别到系统级别的多个层面。
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h5 className="font-semibold mb-2">主要目标</h5>
                    <ul className="list-disc pl-6">
                      <li>发现安全漏洞</li>
                      <li>评估安全风险</li>
                      <li>验证安全控制</li>
                      <li>确保合规性</li>
                      <li>验证安全需求</li>
                      <li>评估安全架构</li>
                      <li>测试安全机制</li>
                      <li>验证安全配置</li>
                    </ul>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h5 className="font-semibold mb-2">测试类型</h5>
                    <ul className="list-disc pl-6">
                      <li>静态安全测试</li>
                      <li>动态安全测试</li>
                      <li>渗透测试</li>
                      <li>安全配置测试</li>
                      <li>模糊测试</li>
                      <li>API安全测试</li>
                      <li>移动应用安全测试</li>
                      <li>云安全测试</li>
                      <li>容器安全测试</li>
                      <li>DevSecOps测试</li>
                    </ul>
                  </div>
                </div>
              </div>

              <h4 className="font-semibold">2. 测试流程</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h5 className="font-semibold mb-2">基本步骤</h5>
                    <ol className="list-decimal pl-6">
                      <li>需求分析
                        <ul className="list-disc pl-6 mt-2">
                          <li>确定测试范围</li>
                          <li>识别关键资产</li>
                          <li>定义安全需求</li>
                          <li>确定合规要求</li>
                        </ul>
                      </li>
                      <li>测试计划制定
                        <ul className="list-disc pl-6 mt-2">
                          <li>选择测试方法</li>
                          <li>确定测试工具</li>
                          <li>制定时间表</li>
                          <li>分配资源</li>
                        </ul>
                      </li>
                      <li>测试用例设计
                        <ul className="list-disc pl-6 mt-2">
                          <li>设计测试场景</li>
                          <li>准备测试数据</li>
                          <li>定义预期结果</li>
                          <li>制定测试策略</li>
                        </ul>
                      </li>
                      <li>测试执行
                        <ul className="list-disc pl-6 mt-2">
                          <li>执行自动化测试</li>
                          <li>进行手动测试</li>
                          <li>记录测试结果</li>
                          <li>验证测试覆盖</li>
                        </ul>
                      </li>
                      <li>结果分析
                        <ul className="list-disc pl-6 mt-2">
                          <li>分析测试数据</li>
                          <li>评估风险等级</li>
                          <li>确定漏洞优先级</li>
                          <li>生成分析报告</li>
                        </ul>
                      </li>
                      <li>报告生成
                        <ul className="list-disc pl-6 mt-2">
                          <li>编写测试报告</li>
                          <li>提供修复建议</li>
                          <li>评估安全状态</li>
                          <li>制定改进计划</li>
                        </ul>
                      </li>
                      <li>漏洞修复验证
                        <ul className="list-disc pl-6 mt-2">
                          <li>验证修复效果</li>
                          <li>进行回归测试</li>
                          <li>更新安全基线</li>
                          <li>完善安全措施</li>
                        </ul>
                      </li>
                    </ol>
                  </div>
                </div>
              </div>

              <h4 className="font-semibold">3. 测试工具链</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h5 className="font-semibold mb-2">静态分析工具</h5>
                    <ul className="list-disc pl-6">
                      <li>SonarQube - 代码质量与安全分析</li>
                      <li>Fortify - 企业级安全扫描</li>
                      <li>Checkmarx - 源代码分析</li>
                      <li>Coverity - 静态代码分析</li>
                      <li>CodeQL - 语义代码分析</li>
                      <li>Bandit - Python安全分析</li>
                      <li>ESLint - JavaScript安全分析</li>
                    </ul>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h5 className="font-semibold mb-2">动态分析工具</h5>
                    <ul className="list-disc pl-6">
                      <li>OWASP ZAP - Web应用扫描</li>
                      <li>Burp Suite - Web安全测试</li>
                      <li>Acunetix - 自动化漏洞扫描</li>
                      <li>AppScan - 应用安全测试</li>
                      <li>Nessus - 漏洞扫描</li>
                      <li>Metasploit - 渗透测试框架</li>
                      <li>Wireshark - 网络分析</li>
                    </ul>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h5 className="font-semibold mb-2">API测试工具</h5>
                    <ul className="list-disc pl-6">
                      <li>Postman - API测试</li>
                      <li>SoapUI - Web服务测试</li>
                      <li>JMeter - 性能与安全测试</li>
                      <li>REST Assured - API自动化测试</li>
                      <li>Karate - API测试框架</li>
                    </ul>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h5 className="font-semibold mb-2">模糊测试工具</h5>
                    <ul className="list-disc pl-6">
                      <li>AFL - 模糊测试框架</li>
                      <li>LibFuzzer - 库模糊测试</li>
                      <li>Peach Fuzzer - 协议模糊测试</li>
                      <li>Radamsa - 通用模糊测试</li>
                      <li>Jazzer - Java模糊测试</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "static" && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">静态安全分析</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold">1. 静态分析工具</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h5 className="font-semibold mb-2">常用工具</h5>
                    <ul className="list-disc pl-6">
                      <li>SonarQube</li>
                      <li>Fortify</li>
                      <li>Checkmarx</li>
                      <li>Coverity</li>
                    </ul>
                  </div>
                </div>
              </div>

              <h4 className="font-semibold">2. 代码示例</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h5 className="font-semibold mb-2">SonarQube配置示例</h5>
                    <pre className="bg-gray-200 p-2 rounded">
                      <code>{`# sonar-project.properties
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
sonar.qualitygate.security_rating.threshold=A`}</code>
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "dynamic" && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">动态安全分析</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold">1. 动态分析工具</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h5 className="font-semibold mb-2">常用工具</h5>
                    <ul className="list-disc pl-6">
                      <li>OWASP ZAP</li>
                      <li>Burp Suite</li>
                      <li>Acunetix</li>
                      <li>AppScan</li>
                    </ul>
                  </div>
                </div>
              </div>

              <h4 className="font-semibold">2. 测试示例</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h5 className="font-semibold mb-2">OWASP ZAP自动化扫描</h5>
                    <pre className="bg-gray-200 p-2 rounded">
                      <code>{`# ZAP自动化扫描脚本
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
    f.write(report)`}</code>
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "penetration" && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">渗透测试</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold">1. 渗透测试方法</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h5 className="font-semibold mb-2">测试阶段</h5>
                    <ol className="list-decimal pl-6">
                      <li>信息收集</li>
                      <li>漏洞扫描</li>
                      <li>漏洞利用</li>
                      <li>后渗透测试</li>
                      <li>报告生成</li>
                    </ol>
                  </div>
                </div>
              </div>

              <h4 className="font-semibold">2. 测试示例</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h5 className="font-semibold mb-2">SQL注入测试</h5>
                    <pre className="bg-gray-200 p-2 rounded">
                      <code>{`// SQL注入测试示例
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
}`}</code>
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "fuzzing" && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">模糊测试</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold">1. 模糊测试概述</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <p className="mb-4">
                  模糊测试是一种自动化测试技术，通过向目标程序输入大量随机或半随机的数据来发现潜在的安全漏洞和程序缺陷。
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h5 className="font-semibold mb-2">主要特点</h5>
                    <ul className="list-disc pl-6">
                      <li>自动化程度高</li>
                      <li>发现未知漏洞</li>
                      <li>覆盖范围广</li>
                      <li>成本效益好</li>
                      <li>持续运行能力</li>
                    </ul>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h5 className="font-semibold mb-2">应用场景</h5>
                    <ul className="list-disc pl-6">
                      <li>文件格式解析</li>
                      <li>网络协议测试</li>
                      <li>API接口测试</li>
                      <li>浏览器测试</li>
                      <li>系统调用测试</li>
                    </ul>
                  </div>
                </div>
              </div>

              <h4 className="font-semibold">2. 模糊测试方法</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h5 className="font-semibold mb-2">测试类型</h5>
                    <ul className="list-disc pl-6">
                      <li>基于变异的模糊测试
                        <ul className="list-disc pl-6 mt-2">
                          <li>随机变异</li>
                          <li>智能变异</li>
                          <li>语法感知变异</li>
                        </ul>
                      </li>
                      <li>基于生成的模糊测试
                        <ul className="list-disc pl-6 mt-2">
                          <li>模型驱动生成</li>
                          <li>语法驱动生成</li>
                          <li>规则驱动生成</li>
                        </ul>
                      </li>
                      <li>混合方法
                        <ul className="list-disc pl-6 mt-2">
                          <li>结合变异和生成</li>
                          <li>自适应策略</li>
                          <li>反馈驱动</li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <h4 className="font-semibold">3. 代码示例</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h5 className="font-semibold mb-2">AFL模糊测试示例</h5>
                    <pre className="bg-gray-200 p-2 rounded">
                      <code>{`# 编译目标程序
CC=afl-gcc CFLAGS="-g -O0" ./configure
make

# 准备测试用例
mkdir -p testcases
echo "test" > testcases/seed.txt

# 运行模糊测试
afl-fuzz -i testcases -o findings ./target_program @@

# 分析结果
afl-cmin -i findings -o minimized_findings ./target_program @@
afl-tmin -i minimized_findings/crashes/id:000000 -o minimized_crash ./target_program @@`}</code>
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "api" && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">API安全测试</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold">1. API安全测试概述</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <p className="mb-4">
                  API安全测试专注于评估API接口的安全性，包括认证、授权、数据验证、加密等方面。
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h5 className="font-semibold mb-2">测试重点</h5>
                    <ul className="list-disc pl-6">
                      <li>认证机制</li>
                      <li>授权控制</li>
                      <li>输入验证</li>
                      <li>数据加密</li>
                      <li>错误处理</li>
                      <li>访问控制</li>
                      <li>速率限制</li>
                      <li>日志记录</li>
                    </ul>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h5 className="font-semibold mb-2">常见漏洞</h5>
                    <ul className="list-disc pl-6">
                      <li>认证绕过</li>
                      <li>权限提升</li>
                      <li>注入攻击</li>
                      <li>敏感数据泄露</li>
                      <li>CSRF攻击</li>
                      <li>SSRF攻击</li>
                      <li>XXE攻击</li>
                      <li>DoS攻击</li>
                    </ul>
                  </div>
                </div>
              </div>

              <h4 className="font-semibold">2. 测试方法</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h5 className="font-semibold mb-2">测试步骤</h5>
                    <ol className="list-decimal pl-6">
                      <li>API文档分析
                        <ul className="list-disc pl-6 mt-2">
                          <li>接口定义审查</li>
                          <li>参数分析</li>
                          <li>认证方式确认</li>
                          <li>错误码分析</li>
                        </ul>
                      </li>
                      <li>认证测试
                        <ul className="list-disc pl-6 mt-2">
                          <li>令牌验证</li>
                          <li>会话管理</li>
                          <li>密码策略</li>
                          <li>多因素认证</li>
                        </ul>
                      </li>
                      <li>授权测试
                        <ul className="list-disc pl-6 mt-2">
                          <li>权限检查</li>
                          <li>角色验证</li>
                          <li>资源访问控制</li>
                          <li>越权测试</li>
                        </ul>
                      </li>
                      <li>输入验证
                        <ul className="list-disc pl-6 mt-2">
                          <li>参数验证</li>
                          <li>数据类型检查</li>
                          <li>长度限制</li>
                          <li>特殊字符处理</li>
                        </ul>
                      </li>
                    </ol>
                  </div>
                </div>
              </div>

              <h4 className="font-semibold">3. 代码示例</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h5 className="font-semibold mb-2">API安全测试示例</h5>
                    <pre className="bg-gray-200 p-2 rounded">
                      <code>{`// API安全测试示例
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
}`}</code>
                    </pre>
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
          href="/study/security/dev/patterns"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          ← 安全设计模式
        </Link>
        <Link
          href="/study/security/dev/audit"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          代码审计 →
        </Link>
      </div>
    </div>
  );
} 