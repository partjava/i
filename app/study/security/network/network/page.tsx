'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function NetworkLayerSecurityPage() {
  const [activeTab, setActiveTab] = useState('basic');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">网络层安全</h1>

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
            <h3 className="text-xl font-semibold mb-3">网络层基础原理</h3>
            <div className="prose max-w-none mb-4">
              <p>网络层是OSI模型的第三层，主要负责数据包的寻址与路由选择，实现不同网络之间的数据转发。常见协议有IP、ICMP、IGMP等，常见设备有路由器、三层交换机等。</p>
            </div>
            {/* SVG结构图 */}
            <div className="flex justify-center mb-6">
              <svg width="480" height="120" viewBox="0 0 480 120">
                <rect x="20" y="40" width="80" height="40" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="2" rx="8" />
                <text x="60" y="65" fontSize="14" fill="#0ea5e9" textAnchor="middle">主机A</text>
                <rect x="120" y="40" width="80" height="40" fill="#fef9c3" stroke="#facc15" strokeWidth="2" rx="8" />
                <text x="160" y="65" fontSize="14" fill="#eab308" textAnchor="middle">路由器1</text>
                <rect x="220" y="40" width="80" height="40" fill="#fce7f3" stroke="#ec4899" strokeWidth="2" rx="8" />
                <text x="260" y="65" fontSize="14" fill="#db2777" textAnchor="middle">路由器2</text>
                <rect x="320" y="40" width="80" height="40" fill="#f1f5f9" stroke="#64748b" strokeWidth="2" rx="8" />
                <text x="360" y="65" fontSize="14" fill="#334155" textAnchor="middle">主机B</text>
                <rect x="420" y="40" width="40" height="40" fill="#fee2e2" stroke="#ef4444" strokeWidth="2" rx="8" />
                <text x="440" y="65" fontSize="14" fill="#ef4444" textAnchor="middle">攻击者</text>
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
                <li><b>IP地址：</b>网络层的逻辑地址，唯一标识网络中的每台主机。</li>
                <li><b>子网：</b>将大型网络划分为多个小型网络，便于管理和安全隔离。</li>
                <li><b>NAT：</b>网络地址转换，实现内外网地址映射，隐藏内部结构。</li>
                <li><b>ACL：</b>访问控制列表，用于限制哪些IP/协议/端口可以通过路由器。</li>
                <li><b>ICMP协议：</b>用于网络诊断和错误报告，如ping、traceroute。</li>
                <li><b>路由协议：</b>如OSPF、BGP，用于动态发现和维护路由。</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'threats' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">网络层常见威胁</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <ul className="list-disc pl-6 space-y-2">
                <li><b>IP欺骗：</b>攻击者伪造源IP地址，绕过访问控制或实施攻击。</li>
                <li><b>路由劫持：</b>通过篡改路由表或路由协议，劫持数据流量。</li>
                <li><b>DDoS攻击：</b>分布式拒绝服务攻击，消耗网络带宽和设备资源。</li>
                <li><b>ICMP攻击：</b>如ICMP洪泛、Ping of Death等，导致网络拥塞或设备崩溃。</li>
                <li><b>NAT穿透：</b>攻击者利用NAT漏洞访问内部网络。</li>
                <li><b>ACL配置错误：</b>导致未授权访问或合法流量被阻断。</li>
              </ul>
            </div>
            <div className="mt-2 text-sm text-gray-700">
              <b>常见问题：</b> 路由环路、黑洞路由、ACL规则冲突、NAT映射异常、ICMP被滥用等。
            </div>
          </div>
        )}

        {activeTab === 'protection' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">网络层防护措施</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <ul className="list-disc pl-6 space-y-2">
                <li><b>配置ACL：</b>精确控制允许和拒绝的IP、协议、端口，阻止未授权访问。</li>
                <li><b>启用NAT安全：</b>限制NAT映射，防止内部地址泄露。</li>
                <li><b>路由协议认证：</b>为OSPF、BGP等配置认证，防止路由劫持。</li>
                <li><b>DDoS防护：</b>部署流量清洗、黑洞路由等技术。</li>
                <li><b>限制ICMP：</b>只允许必要的ICMP类型，防止ICMP攻击。</li>
                <li><b>定期审计路由表和ACL：</b>及时发现异常配置。</li>
              </ul>
            </div>
            <div className="bg-white p-3 rounded border mt-2">
              <span className="text-xs text-gray-500">代码示例：路由器ACL配置（Cisco IOS）</span>
              <pre className="overflow-x-auto text-sm mt-1"><code>{`access-list 100 permit tcp any host 192.168.1.10 eq 80
access-list 100 deny ip any any
interface GigabitEthernet0/0
 ip access-group 100 in`}</code></pre>
            </div>
          </div>
        )}

        {activeTab === 'cases' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">网络层安全实际案例</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <ul className="list-disc pl-6 space-y-2">
                <li><b>案例1：</b> 某公司因ACL配置错误，导致外部攻击者可访问内部数据库。<br/> <span className="text-gray-500">启示：ACL规则需精确，定期审计。</span></li>
                <li><b>案例2：</b> 某运营商路由器遭遇BGP劫持，用户流量被重定向到恶意服务器。<br/> <span className="text-gray-500">启示：路由协议必须配置认证，监控路由变更。</span></li>
                <li><b>案例3：</b> 某网站遭遇DDoS攻击，网络带宽被耗尽，服务中断。<br/> <span className="text-gray-500">启示：需部署DDoS防护和流量清洗。</span></li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* 底部导航 */}
      <div className="mt-8 flex justify-between">
        <Link 
          href="/study/security/network/datalink"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          ← 数据链路层安全
        </Link>
        <Link 
          href="/study/security/network/transport"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          传输层安全 →
        </Link>
      </div>
    </div>
  );
} 