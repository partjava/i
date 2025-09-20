"use client";
import { useState } from "react";
import Link from "next/link";

export default function PenetrationWebPage() {
  const [activeTab, setActiveTab] = useState("intro");

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Web应用测试</h1>
      {/* 标签页导航 */}
      <div className="flex space-x-4 mb-6 border-b overflow-x-auto">
        <button
          onClick={() => setActiveTab("intro")}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === "intro"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          基础概念
        </button>
        <button
          onClick={() => setActiveTab("flow")}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === "flow"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          测试流程
        </button>
        <button
          onClick={() => setActiveTab("vuln")}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === "vuln"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          常见漏洞
        </button>
        <button
          onClick={() => setActiveTab("tools")}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === "tools"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          工具与实践
        </button>
      </div>
      {/* 内容区域 */}
      <div className="bg-white rounded-lg shadow-md p-6">
        {activeTab === "intro" && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">Web应用测试基础概念</h3>
            <div className="prose max-w-none">
              <p>
                Web应用测试是针对Web站点、接口、后台管理等进行安全性评估，发现潜在漏洞和安全隐患。测试内容涵盖输入验证、认证、会话管理、访问控制、业务逻辑等多个层面。
              </p>
              <ul>
                <li>目标：发现Web系统中的安全漏洞，防止被攻击者利用</li>
                <li>范围：前端、后端、API、数据库、第三方组件等</li>
                <li>方法：自动化扫描+手工测试+代码审计</li>
              </ul>
              <h4 className="font-semibold mt-4">典型渗透测试代码示例</h4>
              <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto mt-2">
                <code>{`# SQL注入测试
curl "http://target.com/login?user=admin'--&pass=123"

# XSS测试
curl "http://target.com/search?q=<script>alert(1)</script>"

# 命令注入测试
curl "http://target.com/ping?ip=127.0.0.1;id"`}</code>
              </pre>
            </div>
          </div>
        )}
        {activeTab === "flow" && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">Web应用测试流程</h3>
            <div className="prose max-w-none">
              <ol className="list-decimal pl-6">
                <li>信息收集：收集域名、子域名、目录、接口、指纹等</li>
                <li>漏洞扫描：自动化工具检测常见漏洞</li>
                <li>手工测试：针对业务逻辑、认证、访问控制等进行深入测试</li>
                <li>漏洞验证：手动复现和确认漏洞</li>
                <li>报告编写：整理漏洞细节和修复建议</li>
              </ol>
              <h4 className="font-semibold mt-4">常用信息收集脚本</h4>
              <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto mt-2">
                <code>{`# 目录扫描
ffuf -u http://target.com/FUZZ -w /usr/share/wordlists/dirb/common.txt

# 子域名爆破
sublist3r -d target.com

# 指纹识别
whatweb http://target.com`}</code>
              </pre>
            </div>
            {/* SVG分层结构攻击面图 */}
            <div className="my-8">
              <svg width="900" height="400" viewBox="0 0 900 400" className="w-full">
                <defs>
                  <linearGradient id="webLayer1" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#f472b6" />
                    <stop offset="100%" stopColor="#6366f1" />
                  </linearGradient>
                  <linearGradient id="webLayer2" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#34d399" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                  <linearGradient id="webLayer3" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#fbbf24" />
                    <stop offset="100%" stopColor="#f59e42" />
                  </linearGradient>
                  <filter id="webShadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#888" />
                  </filter>
                  <marker id="webArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill="#f472b6"/>
                  </marker>
                </defs>
                {/* 数据库层 */}
                <rect x="200" y="320" width="500" height="50" rx="16" fill="url(#webLayer3)" filter="url(#webShadow)" />
                <text x="450" y="350" textAnchor="middle" fill="#fff" fontSize="18" fontWeight="bold">数据库层</text>
                {/* 应用层 */}
                <rect x="150" y="200" width="600" height="60" rx="16" fill="url(#webLayer2)" filter="url(#webShadow)" />
                <text x="450" y="235" textAnchor="middle" fill="#fff" fontSize="18" fontWeight="bold">应用/接口层</text>
                {/* Web服务器层 */}
                <rect x="100" y="100" width="700" height="60" rx="16" fill="url(#webLayer1)" filter="url(#webShadow)" />
                <text x="450" y="135" textAnchor="middle" fill="#fff" fontSize="18" fontWeight="bold">Web服务器层</text>
                {/* 攻击路径（曲线） */}
                <path d="M180,120 Q300,180 450,230 Q600,280 720,340" stroke="#f472b6" strokeWidth="5" fill="none" markerEnd="url(#webArrow)" />
                {/* 攻击点icon */}
                <g>
                  {/* SQL注入icon */}
                  <circle cx="450" cy="350" r="12" fill="#fff" opacity="0.7"/>
                  <text x="450" y="355" textAnchor="middle" fill="#f472b6" fontSize="16" fontWeight="bold">SQL</text>
                  {/* XSS icon */}
                  <circle cx="600" cy="235" r="12" fill="#fff" opacity="0.7"/>
                  <text x="600" y="240" textAnchor="middle" fill="#34d399" fontSize="16" fontWeight="bold">XSS</text>
                  {/* 命令注入icon */}
                  <circle cx="200" cy="135" r="12" fill="#fff" opacity="0.7"/>
                  <text x="200" y="140" textAnchor="middle" fill="#6366f1" fontSize="16" fontWeight="bold">CMD</text>
                </g>
              </svg>
            </div>
          </div>
        )}
        {activeTab === "vuln" && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">常见Web漏洞类型</h3>
            <div className="prose max-w-none">
              <ul>
                <li><b>SQL注入：</b> 通过构造恶意SQL语句，获取或篡改数据库数据</li>
                <li><b>XSS：</b> 注入恶意脚本，窃取用户信息或劫持会话</li>
                <li><b>命令注入：</b> 执行系统命令，获取服务器权限</li>
                <li><b>CSRF：</b> 利用用户身份发起未授权操作</li>
                <li><b>文件上传漏洞：</b> 上传恶意文件，获取WebShell</li>
                <li><b>越权访问：</b> 非法访问他人数据或功能</li>
              </ul>
              <h4 className="font-semibold mt-4">漏洞利用代码示例</h4>
              <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto mt-2">
                <code>{`# SQL注入
' OR 1=1--

# XSS
<script>alert('XSS')</script>

# 命令注入
127.0.0.1;cat /etc/passwd

# CSRF
<img src="http://target.com/api/delete?id=1" />`}</code>
              </pre>
            </div>
          </div>
        )}
        {activeTab === "tools" && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">Web安全测试工具与实践</h3>
            <div className="prose max-w-none">
              <ul>
                <li><b>Burp Suite：</b> 拦截、修改、重放HTTP请求，自动化漏洞扫描</li>
                <li><b>OWASP ZAP：</b> 免费开源Web漏洞扫描工具</li>
                <li><b>sqlmap：</b> 自动化SQL注入检测与利用</li>
                <li><b>XSStrike：</b> XSS漏洞检测与利用工具</li>
                <li><b>dirsearch/ffuf：</b> 目录和文件枚举工具</li>
                <li><b>Postman：</b> API接口测试与安全验证</li>
              </ul>
              <h4 className="font-semibold mt-4">工具实践代码示例</h4>
              <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto mt-2">
                <code>{`# sqlmap自动化注入
sqlmap -u "http://target.com/item?id=1" --batch --dump

# Burp Suite抓包复现XSS
# 1. 浏览器代理指向Burp
# 2. 提交<script>alert(1)</script>，观察响应

# dirsearch目录扫描
dirsearch -u http://target.com -e php,asp,aspx,js`}</code>
              </pre>
            </div>
          </div>
        )}
      </div>
      {/* 底部导航 */}
      <div className="mt-8 flex justify-between">
        <Link
          href="/study/security/penetration/post"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          ← 后渗透测试
        </Link>
        <Link
          href="/study/security/penetration/mobile"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          移动应用测试 →
        </Link>
      </div>
    </div>
  );
} 