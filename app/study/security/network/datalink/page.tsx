'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function DataLinkLayerSecurityPage() {
  const [activeTab, setActiveTab] = useState('basic');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">数据链路层安全</h1>

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
            <h3 className="text-xl font-semibold mb-3">数据链路层基础原理</h3>
            <div className="prose max-w-none mb-4">
              <p>数据链路层是OSI模型的第二层，主要负责在同一局域网内实现可靠的数据帧传输、差错检测与纠正、物理寻址等。常见设备有交换机、网桥等。</p>
            </div>
            {/* SVG结构图 */}
            <div className="flex justify-center mb-6">
              <svg width="420" height="120" viewBox="0 0 420 120">
                <rect x="20" y="40" width="80" height="40" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="2" rx="8" />
                <text x="60" y="65" fontSize="14" fill="#0ea5e9" textAnchor="middle">主机A</text>
                <rect x="120" y="40" width="80" height="40" fill="#fef9c3" stroke="#facc15" strokeWidth="2" rx="8" />
                <text x="160" y="65" fontSize="14" fill="#eab308" textAnchor="middle">交换机</text>
                <rect x="220" y="40" width="80" height="40" fill="#fce7f3" stroke="#ec4899" strokeWidth="2" rx="8" />
                <text x="260" y="65" fontSize="14" fill="#db2777" textAnchor="middle">主机B</text>
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
                <li><b>MAC地址：</b>网卡的物理地址，全球唯一，数据链路层寻址的基础。</li>
                <li><b>VLAN：</b>虚拟局域网，用于逻辑隔离不同部门或业务的数据流。</li>
                <li><b>ARP协议：</b>地址解析协议，将IP地址解析为MAC地址，是局域网通信的关键。</li>
                <li><b>帧：</b>数据链路层的基本传输单元，包含源/目的MAC、数据、校验等。</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'threats' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">数据链路层常见威胁</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <ul className="list-disc pl-6 space-y-2">
                <li><b>ARP欺骗：</b>攻击者伪造ARP响应，劫持局域网内的数据流，实现中间人攻击。</li>
                <li><b>MAC泛洪攻击：</b>向交换机发送大量伪造MAC地址，导致交换机转发失效，数据被广播。</li>
                <li><b>VLAN跳跃：</b>攻击者利用配置漏洞跨越VLAN边界，访问本不应访问的网络。</li>
                <li><b>端口镜像滥用：</b>未授权人员利用端口镜像功能窃听网络流量。</li>
                <li><b>交换机配置弱点：</b>如未启用端口安全、未关闭未用端口等。</li>
              </ul>
            </div>
            <div className="mt-2 text-sm text-gray-700">
              <b>常见问题：</b> ARP表污染、VLAN配置混乱、端口安全策略缺失、交换机固件未及时更新等。
            </div>
          </div>
        )}

        {activeTab === 'protection' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">数据链路层防护措施</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <ul className="list-disc pl-6 space-y-2">
                <li><b>启用端口安全：</b>限制每个端口允许的MAC地址数量，防止MAC泛洪。</li>
                <li><b>动态ARP检测：</b>检测并阻断ARP欺骗行为。</li>
                <li><b>VLAN隔离：</b>合理划分VLAN，限制广播域，防止VLAN跳跃。</li>
                <li><b>关闭未用端口：</b>防止非法设备接入。</li>
                <li><b>定期更新固件：</b>修复交换机安全漏洞。</li>
                <li><b>端口镜像权限管理：</b>仅授权人员可配置端口镜像。</li>
              </ul>
            </div>
            <div className="bg-white p-3 rounded border mt-2">
              <span className="text-xs text-gray-500">代码示例：交换机端口安全配置（Cisco IOS）</span>
              <pre className="overflow-x-auto text-sm mt-1"><code>{`interface FastEthernet0/1
 switchport mode access
 switchport port-security
 switchport port-security maximum 2
 switchport port-security violation restrict
 switchport port-security mac-address sticky`}</code></pre>
            </div>
          </div>
        )}

        {activeTab === 'cases' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">数据链路层安全实际案例</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <ul className="list-disc pl-6 space-y-2">
                <li><b>案例1：</b> 某公司因未启用端口安全，攻击者通过MAC泛洪导致内网数据被广播，敏感信息泄露。<br/> <span className="text-gray-500">启示：必须配置端口安全，限制MAC数量。</span></li>
                <li><b>案例2：</b> 某高校实验室遭遇ARP欺骗，学生间互相劫持流量，导致账号密码泄露。<br/> <span className="text-gray-500">启示：应启用动态ARP检测，定期检查ARP表。</span></li>
                <li><b>案例3：</b> 某企业VLAN划分不合理，攻击者通过VLAN跳跃访问到财务系统。<br/> <span className="text-gray-500">启示：VLAN划分需严格，敏感系统应物理隔离。</span></li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* 底部导航 */}
      <div className="mt-8 flex justify-between">
        <Link 
          href="/study/security/network/physical"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          ← 物理层安全
        </Link>
        <Link 
          href="/study/security/network/network"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          网络层安全 →
        </Link>
      </div>
    </div>
  );
} 