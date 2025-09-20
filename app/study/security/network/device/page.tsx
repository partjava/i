'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function NetworkDeviceSecurityPage() {
  const [activeTab, setActiveTab] = useState('basic');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">网络设备安全</h1>

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
          onClick={() => setActiveTab('devices')}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === 'devices'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          设备类型
        </button>
        <button
          onClick={() => setActiveTab('config')}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === 'config'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          安全配置
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
            <h3 className="text-xl font-semibold mb-3">网络设备安全基础原理</h3>
            <div className="prose max-w-none mb-4">
              <p>网络设备是网络基础设施的核心组件，包括路由器、交换机、防火墙等。设备安全涉及物理安全、访问控制、配置管理、漏洞防护等多个方面。</p>
            </div>
            {/* SVG结构图 */}
            <div className="flex justify-center mb-6">
              <svg width="520" height="120" viewBox="0 0 520 120">
                <rect x="20" y="40" width="80" height="40" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="2" rx="8" />
                <text x="60" y="65" fontSize="14" fill="#0ea5e9" textAnchor="middle">路由器</text>
                <rect x="120" y="40" width="80" height="40" fill="#fef9c3" stroke="#facc15" strokeWidth="2" rx="8" />
                <text x="160" y="65" fontSize="14" fill="#eab308" textAnchor="middle">交换机</text>
                <rect x="220" y="40" width="80" height="40" fill="#fce7f3" stroke="#ec4899" strokeWidth="2" rx="8" />
                <text x="260" y="65" fontSize="14" fill="#db2777" textAnchor="middle">防火墙</text>
                <rect x="320" y="40" width="80" height="40" fill="#f1f5f9" stroke="#64748b" strokeWidth="2" rx="8" />
                <text x="360" y="65" fontSize="14" fill="#334155" textAnchor="middle">负载均衡</text>
                <rect x="420" y="40" width="80" height="40" fill="#fee2e2" stroke="#ef4444" strokeWidth="2" rx="8" />
                <text x="460" y="65" fontSize="14" fill="#ef4444" textAnchor="middle">入侵检测</text>
                <line x1="100" y1="60" x2="120" y2="60" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />
                <line x1="200" y1="60" x2="220" y2="60" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />
                <line x1="300" y1="60" x2="320" y2="60" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />
                <line x1="380" y1="60" x2="400" y2="60" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />
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
                <li><b>ACL：</b>访问控制列表，用于控制网络流量。</li>
                <li><b>SNMP：</b>简单网络管理协议，用于设备监控。</li>
                <li><b>VLAN：</b>虚拟局域网，实现网络隔离。</li>
                <li><b>AAA：</b>认证、授权、审计，设备访问控制。</li>
                <li><b>NTP：</b>网络时间协议，同步设备时间。</li>
                <li><b>Syslog：</b>系统日志，记录设备事件。</li>
                <li><b>SSH：</b>安全外壳协议，加密远程管理。</li>
                <li><b>SNMP：</b>简单网络管理协议，设备监控。</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'devices' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">网络设备类型与安全特性</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* 路由器 */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-bold text-lg mb-2 text-blue-700">路由器</h4>
                <ul className="list-disc pl-6 space-y-2 text-sm">
                  <li>路由表安全：防止路由欺骗</li>
                  <li>访问控制：ACL配置</li>
                  <li>认证机制：AAA服务</li>
                  <li>加密通信：IPSec VPN</li>
                  <li>日志审计：Syslog配置</li>
                </ul>
              </div>
              {/* 交换机 */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-bold text-lg mb-2 text-green-700">交换机</h4>
                <ul className="list-disc pl-6 space-y-2 text-sm">
                  <li>端口安全：MAC地址绑定</li>
                  <li>VLAN隔离：广播域控制</li>
                  <li>生成树保护：STP安全</li>
                  <li>DHCP防护：DHCP Snooping</li>
                  <li>ARP防护：DAI配置</li>
                </ul>
              </div>
              {/* 防火墙 */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-bold text-lg mb-2 text-red-700">防火墙</h4>
                <ul className="list-disc pl-6 space-y-2 text-sm">
                  <li>访问控制：策略配置</li>
                  <li>NAT转换：地址映射</li>
                  <li>VPN接入：远程访问</li>
                  <li>入侵检测：IPS功能</li>
                  <li>应用控制：应用识别</li>
                </ul>
              </div>
              {/* 负载均衡器 */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-bold text-lg mb-2 text-purple-700">负载均衡器</h4>
                <ul className="list-disc pl-6 space-y-2 text-sm">
                  <li>会话保持：Cookie绑定</li>
                  <li>健康检查：服务监控</li>
                  <li>SSL卸载：证书管理</li>
                  <li>DDoS防护：流量清洗</li>
                  <li>访问控制：ACL配置</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'config' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">网络设备安全配置</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">基础安全配置</h4>
              <div className="space-y-4">
                <div>
                  <h5 className="font-medium mb-1">1. 访问控制配置</h5>
                  <pre className="bg-white border rounded p-2 text-xs overflow-x-auto">{`# 配置SSH访问
Router(config)# username admin privilege 15 secret Admin@123
Router(config)# ip ssh version 2
Router(config)# line vty 0 4
Router(config-line)# login local
Router(config-line)# transport input ssh`}</pre>
                </div>
                <div>
                  <h5 className="font-medium mb-1">2. 日志配置</h5>
                  <pre className="bg-white border rounded p-2 text-xs overflow-x-auto">{`# 配置Syslog服务器
Router(config)# logging host 192.168.1.100
Router(config)# logging trap informational
Router(config)# logging facility local6
Router(config)# logging on`}</pre>
                </div>
                <div>
                  <h5 className="font-medium mb-1">3. SNMP安全配置</h5>
                  <pre className="bg-white border rounded p-2 text-xs overflow-x-auto">{`# 配置SNMPv3
Router(config)# snmp-server group AdminGroup v3 priv
Router(config)# snmp-server user Admin AdminGroup v3 auth sha AuthPass priv aes 128 PrivPass`}</pre>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'protection' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">网络设备防护措施</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* 物理安全 */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-bold text-lg mb-2">物理安全</h4>
                <ul className="list-disc pl-6 space-y-2 text-sm">
                  <li>设备放置在安全机房</li>
                  <li>门禁系统控制访问</li>
                  <li>环境监控（温湿度）</li>
                  <li>UPS电源保护</li>
                  <li>设备标签管理</li>
                </ul>
              </div>
              {/* 访问控制 */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-bold text-lg mb-2">访问控制</h4>
                <ul className="list-disc pl-6 space-y-2 text-sm">
                  <li>强密码策略</li>
                  <li>多因素认证</li>
                  <li>最小权限原则</li>
                  <li>定期密码更换</li>
                  <li>登录失败限制</li>
                </ul>
              </div>
              {/* 配置管理 */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-bold text-lg mb-2">配置管理</h4>
                <ul className="list-disc pl-6 space-y-2 text-sm">
                  <li>配置备份</li>
                  <li>变更管理</li>
                  <li>版本控制</li>
                  <li>配置审计</li>
                  <li>定期巡检</li>
                </ul>
              </div>
              {/* 监控告警 */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-bold text-lg mb-2">监控告警</h4>
                <ul className="list-disc pl-6 space-y-2 text-sm">
                  <li>性能监控</li>
                  <li>安全告警</li>
                  <li>日志分析</li>
                  <li>异常检测</li>
                  <li>事件响应</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'cases' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">网络设备安全实际案例</h3>
            
            {/* 案例1：路由器配置泄露 */}
            <div className="bg-gray-50 p-5 rounded-lg shadow-sm">
              <h4 className="font-bold text-lg mb-2 text-blue-700">案例1：路由器配置泄露事件</h4>
              <div className="mb-2 text-gray-700 text-sm">某企业路由器配置文件被泄露，导致网络拓扑和访问控制策略暴露。</div>
              <div className="mb-2">
                <span className="font-semibold">问题分析：</span>
                <ul className="list-disc pl-6 text-sm space-y-1">
                  <li>配置文件未加密存储</li>
                  <li>未启用配置加密功能</li>
                  <li>备份文件权限设置不当</li>
                </ul>
              </div>
              <div className="mb-2">
                <span className="font-semibold">解决方案：</span>
                <pre className="bg-white border rounded p-2 text-xs overflow-x-auto">{`# 启用配置加密
Router(config)# service password-encryption
Router(config)# enable secret YourStrongPassword
Router(config)# service encryption`}</pre>
              </div>
            </div>

            {/* 案例2：交换机VLAN跳跃攻击 */}
            <div className="bg-gray-50 p-5 rounded-lg shadow-sm">
              <h4 className="font-bold text-lg mb-2 text-green-700">案例2：VLAN跳跃攻击防护</h4>
              <div className="mb-2 text-gray-700 text-sm">攻击者利用VLAN跳跃漏洞，跨VLAN访问敏感数据。</div>
              <div className="mb-2">
                <span className="font-semibold">防护措施：</span>
                <pre className="bg-white border rounded p-2 text-xs overflow-x-auto">{`# 配置VLAN安全
Switch(config)# vtp mode transparent
Switch(config)# spanning-tree mode rapid-pvst
Switch(config)# spanning-tree vlan 1-4094 priority 24576`}</pre>
              </div>
            </div>

            {/* 案例3：防火墙策略优化 */}
            <div className="bg-gray-50 p-5 rounded-lg shadow-sm">
              <h4 className="font-bold text-lg mb-2 text-red-700">案例3：防火墙策略优化</h4>
              <div className="mb-2 text-gray-700 text-sm">某企业防火墙策略过于宽松，导致内网服务器暴露。</div>
              <div className="mb-2">
                <span className="font-semibold">优化方案：</span>
                <pre className="bg-white border rounded p-2 text-xs overflow-x-auto">{`# 配置严格访问控制
Firewall(config)# access-list 100 deny ip any any
Firewall(config)# access-list 100 permit tcp host 192.168.1.100 any eq 80
Firewall(config)# access-list 100 permit tcp host 192.168.1.100 any eq 443`}</pre>
              </div>
            </div>

            {/* 最佳实践总结 */}
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mt-6">
              <h4 className="font-semibold mb-2 text-blue-800">网络设备安全最佳实践</h4>
              <ul className="list-disc pl-6 text-sm space-y-1">
                <li>定期更新设备固件和补丁</li>
                <li>实施严格的访问控制策略</li>
                <li>启用日志审计和监控</li>
                <li>定期进行安全评估</li>
                <li>建立应急响应机制</li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* 底部导航 */}
      <div className="mt-8 flex justify-between">
        <Link 
          href="/study/security/network/protocol"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          ← 网络协议分析
        </Link>
        <Link 
          href="/study/security/protection/access"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          访问控制 →
        </Link>
      </div>
    </div>
  );
} 