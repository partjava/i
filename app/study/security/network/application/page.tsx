'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function ApplicationLayerSecurityPage() {
  const [activeTab, setActiveTab] = useState('basic');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">应用层安全</h1>

      {/* 标签页导航 */}
      <div className="flex space-x-4 mb-6 border-b overflow-x-auto">
        <button
          onClick={() => setActiveTab('basic')}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === 'basic'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          基础原理
        </button>
        <button
          onClick={() => setActiveTab('threats')}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === 'threats'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          常见威胁
        </button>
        <button
          onClick={() => setActiveTab('protection')}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === 'protection'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          防护措施
        </button>
        <button
          onClick={() => setActiveTab('cases')}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === 'cases'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          实际案例
        </button>
      </div>

      {/* 内容区域 */}
      <div className="bg-white rounded-lg shadow-md p-6">
        {activeTab === 'basic' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">应用层基础原理</h3>
            <div className="prose max-w-none mb-4">
              <p>应用层是OSI模型的第七层，直接为用户和应用程序提供服务。常见协议有HTTP、HTTPS、FTP、SMTP、DNS等。应用层安全关注数据内容、用户身份、业务逻辑等的保护。</p>
            </div>
            {/* SVG结构图 */}
            <div className="flex justify-center mb-6">
              <svg width="520" height="120" viewBox="0 0 520 120">
                <rect x="20" y="40" width="80" height="40" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="2" rx="8" />
                <text x="60" y="65" fontSize="14" fill="#0ea5e9" textAnchor="middle">用户</text>
                <rect x="120" y="40" width="80" height="40" fill="#fef9c3" stroke="#facc15" strokeWidth="2" rx="8" />
                <text x="160" y="65" fontSize="14" fill="#eab308" textAnchor="middle">浏览器</text>
                <rect x="220" y="40" width="80" height="40" fill="#fce7f3" stroke="#ec4899" strokeWidth="2" rx="8" />
                <text x="260" y="65" fontSize="14" fill="#db2777" textAnchor="middle">Web服务器</text>
                <rect x="320" y="40" width="80" height="40" fill="#f1f5f9" stroke="#64748b" strokeWidth="2" rx="8" />
                <text x="360" y="65" fontSize="14" fill="#334155" textAnchor="middle">数据库</text>
                <rect x="420" y="40" width="80" height="40" fill="#fee2e2" stroke="#ef4444" strokeWidth="2" rx="8" />
                <text x="460" y="65" fontSize="14" fill="#ef4444" textAnchor="middle">攻击者</text>
                <line x1="100" y1="60" x2="120" y2="60" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />
                <line x1="200" y1="60" x2="220" y2="60" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />
                <line x1="300" y1="60" x2="320" y2="60" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />
                <defs>
                  <marker id="arrow" markerWidth="8" markerHeight="8" refX="8" refY="4" orient="auto" markerUnits="strokeWidth">
                    <path d="M0,0 L8,4 L0,8" fill="#64748b" />
                  </marker>
                </defs>
              </svg>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">重点术语解释</h4>
              <ul className="list-disc pl-6 space-y-2">
                <li><b>SQL注入：</b>通过构造恶意SQL语句获取或篡改数据库数据。</li>
                <li><b>XSS：</b>跨站脚本攻击，注入恶意脚本窃取用户信息。</li>
                <li><b>CSRF：</b>跨站请求伪造，诱导用户在已认证状态下执行恶意操作。</li>
                <li><b>认证绕过：</b>攻击者绕过身份验证机制，获取未授权访问。</li>
                <li><b>WebShell：</b>攻击者上传恶意脚本，远程控制服务器。</li>
                <li><b>WAF：</b>Web应用防火墙，检测和阻断Web攻击。</li>
                <li><b>验证码：</b>防止自动化攻击和暴力破解。</li>
                <li><b>敏感信息泄露：</b>如配置文件、日志、错误信息暴露。</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'threats' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">应用层常见威胁</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <ul className="list-disc pl-6 space-y-2">
                <li><b>SQL注入：</b>攻击者通过输入恶意SQL语句，获取、篡改或删除数据库数据。</li>
                <li><b>XSS：</b>注入恶意脚本，窃取Cookie、会话、键盘输入等。</li>
                <li><b>CSRF：</b>诱导用户在已登录状态下执行未授权操作。</li>
                <li><b>文件上传漏洞：</b>上传恶意文件，获取服务器控制权。</li>
                <li><b>目录遍历：</b>访问服务器敏感文件。</li>
                <li><b>弱口令/未授权访问：</b>攻击者利用弱密码或权限配置不当入侵系统。</li>
                <li><b>敏感信息泄露：</b>如配置文件、日志、错误信息暴露。</li>
              </ul>
            </div>
            <div className="mt-2 text-sm text-gray-700">
              <b>常见问题：</b> 输入校验缺失、权限控制不严、日志未审计、WAF未部署等。
            </div>
          </div>
        )}

        {activeTab === 'protection' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">应用层防护措施</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <ul className="list-disc pl-6 space-y-2">
                <li><b>输入校验与输出编码：</b>防止注入和XSS攻击。</li>
                <li><b>参数化查询：</b>防止SQL注入。</li>
                <li><b>启用WAF：</b>检测和阻断Web攻击。</li>
                <li><b>CSRF Token机制：</b>防止CSRF攻击。</li>
                <li><b>强化认证与权限管理：</b>多因素认证、最小权限原则。</li>
                <li><b>日志审计与异常告警：</b>及时发现和响应攻击。</li>
                <li><b>文件上传安全：</b>限制文件类型、大小、路径，启用病毒扫描。</li>
              </ul>
            </div>
            <div className="bg-white p-3 rounded border mt-2">
              <span className="text-xs text-gray-500">代码示例：Python Flask防SQL注入</span>
              <pre className="overflow-x-auto text-sm mt-1"><code>{`# 使用参数化查询防止SQL注入
username = request.form['username']
password = request.form['password']
cur.execute('SELECT * FROM users WHERE username=%s AND password=%s', (username, password))`}</code></pre>
            </div>
            <div className="bg-white p-3 rounded border mt-2">
              <span className="text-xs text-gray-500">代码示例：前端防XSS</span>
              <pre className="overflow-x-auto text-sm mt-1"><code>{`// 使用DOMPurify对用户输入进行清洗
const clean = DOMPurify.sanitize(userInput);`}</code></pre>
            </div>
          </div>
        )}

        {activeTab === 'cases' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">应用层安全实际案例</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <ul className="list-disc pl-6 space-y-2">
                <li><b>案例1：</b> 某网站未做输入校验，攻击者通过SQL注入获取全部用户数据。<br/> <span className="text-gray-500">启示：所有输入都需校验，数据库操作用参数化查询。</span></li>
                <li><b>案例2：</b> 某论坛未做输出编码，攻击者注入XSS脚本，批量窃取用户Cookie。<br/> <span className="text-gray-500">启示：输出内容需编码，防止脚本执行。</span></li>
                <li><b>案例3：</b> 某企业未启用WAF，攻击者利用CSRF漏洞批量转账。<br/> <span className="text-gray-500">启示：CSRF防护和WAF部署必不可少。</span></li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* 底部导航 */}
      <div className="mt-8 flex justify-between">
        <Link 
          href="/study/security/network/transport"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          ← 传输层安全
        </Link>
        <Link 
          href="/study/security/network/protocol"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          网络协议分析 →
        </Link>
      </div>
    </div>
  );
} 