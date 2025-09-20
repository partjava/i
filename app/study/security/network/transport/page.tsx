'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function TransportLayerSecurityPage() {
  const [activeTab, setActiveTab] = useState('basic');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">传输层安全</h1>

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
            <h3 className="text-xl font-semibold mb-3">传输层基础原理</h3>
            <div className="prose max-w-none mb-4">
              <p>传输层是OSI模型的第四层，主要负责端到端的数据传输和通信管理。它为应用层提供可靠（TCP）或不可靠（UDP）的数据传输服务，实现数据分段、重组、流量控制、差错检测等功能。</p>
            </div>
            {/* SVG结构图 */}
            <div className="flex justify-center mb-6">
              <svg width="500" height="120" viewBox="0 0 500 120">
                <rect x="20" y="40" width="80" height="40" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="2" rx="8" />
                <text x="60" y="65" fontSize="14" fill="#0ea5e9" textAnchor="middle">客户端</text>
                <rect x="120" y="40" width="80" height="40" fill="#fef9c3" stroke="#facc15" strokeWidth="2" rx="8" />
                <text x="160" y="65" fontSize="14" fill="#eab308" textAnchor="middle">互联网</text>
                <rect x="220" y="40" width="80" height="40" fill="#fce7f3" stroke="#ec4899" strokeWidth="2" rx="8" />
                <text x="260" y="65" fontSize="14" fill="#db2777" textAnchor="middle">服务器</text>
                <rect x="320" y="40" width="80" height="40" fill="#f1f5f9" stroke="#64748b" strokeWidth="2" rx="8" />
                <text x="360" y="65" fontSize="14" fill="#334155" textAnchor="middle">攻击者</text>
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
                <li><b>TCP协议：</b>面向连接，提供可靠的数据传输，采用三次握手建立连接、四次挥手断开连接，支持流量控制和拥塞控制。</li>
                <li><b>UDP协议：</b>无连接，传输速度快但不保证可靠性，常用于实时音视频、DNS等。</li>
                <li><b>端口号：</b>用于标识主机上的具体服务或进程，范围0-65535，常见如80（HTTP）、443（HTTPS）、22（SSH）。</li>
                <li><b>三次握手：</b>TCP建立连接的过程，防止伪造连接请求。</li>
                <li><b>四次挥手：</b>TCP断开连接的过程，确保数据完整传输。</li>
                <li><b>端口扫描：</b>攻击者探测主机开放端口，寻找可利用服务。</li>
                <li><b>会话劫持：</b>攻击者窃取或伪造会话信息，冒充合法用户。</li>
                <li><b>SSL/TLS：</b>为传输层提供加密和身份认证，保护数据安全。</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'threats' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">传输层常见威胁</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <ul className="list-disc pl-6 space-y-2">
                <li><b>端口扫描：</b>攻击者利用工具（如nmap）扫描主机开放端口，寻找漏洞服务。</li>
                <li><b>TCP会话劫持：</b>攻击者伪造TCP包，插入或中断正常会话，窃取敏感信息。</li>
                <li><b>UDP伪造：</b>利用UDP无连接特性，伪造源地址实施反射攻击。</li>
                <li><b>端口爆破：</b>暴力尝试常见服务端口的弱口令或未授权访问。</li>
                <li><b>SSL/TLS攻击：</b>如SSL剥离、中间人攻击、协议漏洞利用（如Heartbleed）。</li>
                <li><b>DoS攻击：</b>如SYN Flood，消耗服务器资源导致拒绝服务。</li>
              </ul>
            </div>
            <div className="mt-2 text-sm text-gray-700">
              <b>常见问题：</b> 服务端口暴露过多、弱口令、TLS配置不当、会话未加密、日志未审计等。
            </div>
          </div>
        )}

        {activeTab === 'protection' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">传输层防护措施</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <ul className="list-disc pl-6 space-y-2">
                <li><b>配置防火墙：</b>限制对外开放端口，仅允许必要服务。</li>
                <li><b>入侵检测与防御：</b>部署IDS/IPS，检测和阻断异常流量。</li>
                <li><b>启用TLS加密：</b>为Web、邮件等服务配置SSL/TLS，防止数据被窃听和篡改。</li>
                <li><b>端口管理：</b>定期审计开放端口，关闭不必要服务。</li>
                <li><b>会话保护：</b>使用随机会话ID、定期更换、加密存储，防止会话劫持。</li>
                <li><b>强密码策略：</b>防止端口爆破和弱口令攻击。</li>
                <li><b>日志审计：</b>记录并分析连接和认证日志，及时发现异常。</li>
              </ul>
            </div>
            <div className="bg-white p-3 rounded border mt-2">
              <span className="text-xs text-gray-500">代码示例：iptables限制端口访问</span>
              <pre className="overflow-x-auto text-sm mt-1"><code>{`# 只允许80和443端口对外开放
iptables -A INPUT -p tcp --dport 80 -j ACCEPT
iptables -A INPUT -p tcp --dport 443 -j ACCEPT
iptables -A INPUT -p tcp -j DROP`}</code></pre>
            </div>
            <div className="bg-white p-3 rounded border mt-2">
              <span className="text-xs text-gray-500">代码示例：Nginx开启TLS加密</span>
              <pre className="overflow-x-auto text-sm mt-1"><code>{`server {
  listen 443 ssl;
  server_name example.com;
  ssl_certificate /etc/nginx/ssl/server.crt;
  ssl_certificate_key /etc/nginx/ssl/server.key;
  ssl_protocols TLSv1.2 TLSv1.3;
}`}</code></pre>
            </div>
          </div>
        )}

        {activeTab === 'cases' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">传输层安全实际案例</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <ul className="list-disc pl-6 space-y-2">
                <li><b>案例1：</b> 某网站未限制端口访问，攻击者通过端口扫描发现后台管理端口，暴力破解后入侵系统。<br/> <span className="text-gray-500">启示：必须限制端口开放，后台端口应加固。</span></li>
                <li><b>案例2：</b> 某企业未启用TLS加密，员工登录信息被中间人窃取。<br/> <span className="text-gray-500">启示：敏感数据传输必须加密。</span></li>
                <li><b>案例3：</b> 某服务器遭遇SYN Flood攻击，资源耗尽导致服务不可用。<br/> <span className="text-gray-500">启示：应部署DoS防护和流量清洗。</span></li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* 底部导航 */}
      <div className="mt-8 flex justify-between">
        <Link 
          href="/study/security/network/network"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          ← 网络层安全
        </Link>
        <Link 
          href="/study/security/network/application"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          应用层安全 →
        </Link>
      </div>
    </div>
  );
} 