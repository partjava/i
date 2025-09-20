'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function FirewallPage() {
  const [activeTab, setActiveTab] = useState('basic');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">防火墙技术（Firewall）</h1>

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
          onClick={() => setActiveTab('types')}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === 'types'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          类型与架构
        </button>
        <button
          onClick={() => setActiveTab('functions')}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === 'functions'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          功能与策略
        </button>
        <button
          onClick={() => setActiveTab('config')}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === 'config'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          配置与代码示例
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
        <button
          onClick={() => setActiveTab('practice')}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === 'practice'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          最佳实践
        </button>
      </div>

      {/* 内容区域 */}
      <div className="bg-white rounded-lg shadow-md p-6">
        {activeTab === 'basic' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">防火墙技术基础原理</h3>
            <div className="prose max-w-none mb-4">
              <p>防火墙是网络安全防护的核心设备或软件，通过对进出网络的数据流进行检测、过滤和控制，实现对网络边界的安全隔离和访问管理。防火墙可有效防止未授权访问、恶意攻击和数据泄露，是企业和个人网络安全体系的重要组成部分。</p>
              <ul className="list-disc pl-6">
                <li><b>边界防护：</b>防火墙作为内外网的"关卡"，控制数据流入和流出。</li>
                <li><b>策略控制：</b>基于预设安全策略，允许或拒绝特定流量。</li>
                <li><b>日志审计：</b>记录访问和攻击行为，便于溯源和分析。</li>
                <li><b>多层防护：</b>现代防火墙支持包过滤、状态检测、应用识别等多层次防护。</li>
              </ul>
              <p>防火墙不仅可部署于网络边界，还可用于分区隔离、云安全、主机安全等多种场景。</p>
            </div>
            {/* SVG结构图 */}
            <div className="flex justify-center mb-6">
              <svg width="520" height="100" viewBox="0 0 520 100">
                <rect x="20" y="30" width="100" height="40" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="2" rx="8" />
                <text x="70" y="55" fontSize="14" fill="#0ea5e9" textAnchor="middle">内网</text>
                <rect x="140" y="30" width="100" height="40" fill="#fee2e2" stroke="#ef4444" strokeWidth="2" rx="8" />
                <text x="190" y="55" fontSize="14" fill="#ef4444" textAnchor="middle">防火墙</text>
                <rect x="260" y="30" width="100" height="40" fill="#fce7f3" stroke="#ec4899" strokeWidth="2" rx="8" />
                <text x="310" y="55" fontSize="14" fill="#db2777" textAnchor="middle">外网</text>
                <rect x="380" y="30" width="100" height="40" fill="#fef9c3" stroke="#facc15" strokeWidth="2" rx="8" />
                <text x="430" y="55" fontSize="14" fill="#eab308" textAnchor="middle">日志/告警</text>
                <line x1="120" y1="50" x2="140" y2="50" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />
                <line x1="240" y1="50" x2="260" y2="50" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />
                <line x1="360" y1="50" x2="380" y2="50" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />
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
                <li><b>包过滤：</b>基于IP、端口、协议等信息过滤数据包。</li>
                <li><b>状态检测：</b>跟踪连接状态，防止伪造包绕过。</li>
                <li><b>应用层防护：</b>识别和控制应用协议（如HTTP、DNS）。</li>
                <li><b>DMZ：</b>隔离区，部署对外服务，降低内网风险。</li>
                <li><b>日志审计：</b>记录访问、告警和策略变更。</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'types' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">防火墙类型与架构</h3>
            <div className="prose max-w-none mb-4">
              <ul className="list-disc pl-6">
                <li><b>包过滤防火墙：</b>最基础，基于五元组（源/目的IP、端口、协议）过滤，速度快但无法识别应用层攻击。</li>
                <li><b>状态检测防火墙：</b>跟踪连接状态，防止伪造包，提升安全性。</li>
                <li><b>代理型防火墙：</b>作为中间人转发流量，能深度检测和隐藏内网结构。</li>
                <li><b>下一代防火墙（NGFW）：</b>集成应用识别、入侵防御、内容过滤等高级功能。</li>
                <li><b>云防火墙：</b>部署于云平台，支持弹性扩展和多租户管理。</li>
                <li><b>主机防火墙：</b>运行于操作系统内核，保护单台主机。</li>
              </ul>
              <p>实际部署中，常采用多种防火墙组合，形成分层防护体系。</p>
            </div>
            {/* 架构SVG */}
            <div className="flex justify-center mt-4">
              <svg width="520" height="100" viewBox="0 0 520 100">
                <rect x="20" y="30" width="100" height="40" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="2" rx="8" />
                <text x="70" y="55" fontSize="14" fill="#0ea5e9" textAnchor="middle">内网</text>
                <rect x="140" y="30" width="100" height="40" fill="#fee2e2" stroke="#ef4444" strokeWidth="2" rx="8" />
                <text x="190" y="55" fontSize="14" fill="#ef4444" textAnchor="middle">防火墙1</text>
                <rect x="260" y="30" width="100" height="40" fill="#fce7f3" stroke="#ec4899" strokeWidth="2" rx="8" />
                <text x="310" y="55" fontSize="14" fill="#db2777" textAnchor="middle">DMZ区</text>
                <rect x="380" y="30" width="100" height="40" fill="#fee2e2" stroke="#ef4444" strokeWidth="2" rx="8" />
                <text x="430" y="55" fontSize="14" fill="#ef4444" textAnchor="middle">防火墙2</text>
                <line x1="120" y1="50" x2="140" y2="50" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />
                <line x1="240" y1="50" x2="260" y2="50" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />
                <line x1="360" y1="50" x2="380" y2="50" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />
                <defs>
                  <marker id="arrow" markerWidth="8" markerHeight="8" refX="8" refY="4" orient="auto" markerUnits="strokeWidth">
                    <path d="M0,0 L8,4 L0,8" fill="#64748b" />
                  </marker>
                </defs>
              </svg>
            </div>
          </div>
        )}

        {activeTab === 'functions' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">防火墙常见功能与安全策略</h3>
            <div className="prose max-w-none mb-4">
              <ul className="list-disc pl-6">
                <li><b>访问控制：</b>基于IP、端口、协议、应用等多维度控制流量。</li>
                <li><b>NAT转换：</b>隐藏内网结构，实现地址复用。</li>
                <li><b>入侵检测与防御：</b>识别并拦截攻击流量（如SQL注入、DDoS）。</li>
                <li><b>内容过滤：</b>阻断恶意网站、病毒、敏感信息。</li>
                <li><b>日志与告警：</b>实时记录和告警异常行为。</li>
                <li><b>VPN支持：</b>加密远程访问，保障数据安全。</li>
                <li><b>高可用与负载均衡：</b>保障业务连续性。</li>
              </ul>
              <p>安全策略设计需遵循"默认拒绝、最小授权、分区隔离、动态调整"等原则。</p>
            </div>
          </div>
        )}

        {activeTab === 'config' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">防火墙配置与代码示例</h3>
            <div className="space-y-4">
              {/* iptables配置 */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">1. Linux iptables配置</h4>
                <pre className="bg-white border rounded p-2 text-xs overflow-x-auto">{`# 默认拒绝所有流量
iptables -P INPUT DROP
iptables -P FORWARD DROP
iptables -P OUTPUT ACCEPT

# 允许本地回环
iptables -A INPUT -i lo -j ACCEPT

# 允许SSH远程管理
iptables -A INPUT -p tcp --dport 22 -j ACCEPT

# 允许Web服务
iptables -A INPUT -p tcp --dport 80 -j ACCEPT
iptables -A INPUT -p tcp --dport 443 -j ACCEPT

# 允许已建立连接
iptables -A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT`}</pre>
                <div className="text-xs text-gray-500 mt-1">说明：iptables是Linux常用防火墙，建议"默认拒绝+白名单放行"。</div>
              </div>
              {/* Cisco防火墙ACL配置 */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">2. Cisco防火墙ACL配置</h4>
                <pre className="bg-white border rounded p-2 text-xs overflow-x-auto">{`# 允许内网访问Web，禁止外部访问内网
access-list 100 permit tcp 192.168.1.0 0.0.0.255 any eq 80
access-list 100 deny ip any 192.168.1.0 0.0.0.255
interface GigabitEthernet0/1
 ip access-group 100 in`}</pre>
                <div className="text-xs text-gray-500 mt-1">说明：Cisco设备常用ACL实现访问控制，需注意规则顺序。</div>
              </div>
              {/* 云防火墙策略配置（阿里云安全组） */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">3. 云防火墙策略配置（阿里云安全组）</h4>
                <pre className="bg-white border rounded p-2 text-xs overflow-x-auto">{`# 允许80/443端口入站
授权策略：允许
协议类型：TCP
端口范围：80/443
授权对象：0.0.0.0/0

# 拒绝所有其他入站
授权策略：拒绝
协议类型：ALL
端口范围：1-65535
授权对象：0.0.0.0/0`}</pre>
                <div className="text-xs text-gray-500 mt-1">说明：云防火墙（安全组）建议"最小开放、按需放行"。</div>
              </div>
              {/* Windows防火墙配置（PowerShell） */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">4. Windows防火墙配置（PowerShell）</h4>
                <pre className="bg-white border rounded p-2 text-xs overflow-x-auto">{`# 允许80端口入站
New-NetFirewallRule -DisplayName "Allow HTTP" -Direction Inbound -Protocol TCP -LocalPort 80 -Action Allow

# 拒绝所有入站
Set-NetFirewallProfile -Profile Domain,Public,Private -DefaultInboundAction Block`}</pre>
                <div className="text-xs text-gray-500 mt-1">说明：Windows防火墙支持图形界面和命令行配置，适合主机级防护。</div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'cases' && (
          <div className="space-y-8">
            <h3 className="text-xl font-semibold mb-3">防火墙技术实际案例</h3>
            {/* 案例1：未配置防火墙导致入侵 */}
            <div className="bg-gray-50 p-5 rounded-lg shadow-sm">
              <h4 className="font-bold text-lg mb-2 text-blue-700">案例1：未配置防火墙导致入侵</h4>
              <div className="mb-2 text-gray-700 text-sm">某公司新上线服务器未配置防火墙，黑客扫描端口后利用漏洞入侵。</div>
              <div className="mb-2">
                <span className="font-semibold">攻击过程：</span>
                <ol className="list-decimal pl-6 text-sm space-y-1">
                  <li>黑客扫描开放端口，发现未加固服务。</li>
                  <li>利用漏洞远程执行命令，获取服务器权限。</li>
                </ol>
              </div>
              <div className="mb-2">
                <span className="font-semibold">修正建议：</span>
                <ul className="list-disc pl-6 text-sm">
                  <li>上线前必须配置防火墙，关闭不必要端口。</li>
                  <li>定期巡检防火墙策略，及时修复漏洞。</li>
                </ul>
              </div>
            </div>
            {/* 案例2：防火墙策略过宽导致数据泄露 */}
            <div className="bg-gray-50 p-5 rounded-lg shadow-sm">
              <h4 className="font-bold text-lg mb-2 text-green-700">案例2：防火墙策略过宽导致数据泄露</h4>
              <div className="mb-2 text-gray-700 text-sm">某企业防火墙策略设置为"允许所有出站"，导致敏感数据被外泄。</div>
              <div className="mb-2">
                <span className="font-semibold">攻击过程：</span>
                <ol className="list-decimal pl-6 text-sm space-y-1">
                  <li>内部员工或木马程序将数据打包上传外网。</li>
                  <li>防火墙未拦截异常出站流量，数据泄露。</li>
                </ol>
              </div>
              <div className="mb-2">
                <span className="font-semibold">修正建议：</span>
                <ul className="list-disc pl-6 text-sm">
                  <li>出站流量应按需放行，敏感数据需监控。</li>
                  <li>结合DLP（数据防泄漏）系统加强防护。</li>
                </ul>
              </div>
            </div>
            {/* 案例3：云防火墙配置失误导致攻击 */}
            <div className="bg-gray-50 p-5 rounded-lg shadow-sm">
              <h4 className="font-bold text-lg mb-2 text-red-700">案例3：云防火墙配置失误导致攻击</h4>
              <div className="mb-2 text-gray-700 text-sm">某云服务器安全组规则配置过于宽松，黑客利用弱口令爆破成功入侵。</div>
              <div className="mb-2">
                <span className="font-semibold">攻击过程：</span>
                <ol className="list-decimal pl-6 text-sm space-y-1">
                  <li>安全组开放所有端口，暴露SSH服务。</li>
                  <li>黑客利用弱口令爆破，获取服务器权限。</li>
                </ol>
              </div>
              <div className="mb-2">
                <span className="font-semibold">修正建议：</span>
                <ul className="list-disc pl-6 text-sm">
                  <li>云防火墙应最小开放端口，禁止0.0.0.0/0全放通。</li>
                  <li>SSH等敏感服务建议绑定白名单IP。</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'practice' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">防火墙技术最佳实践</h3>
            <ul className="list-disc pl-6 text-sm space-y-1">
              <li>防火墙策略应"默认拒绝，按需放行"，避免策略过宽。</li>
              <li>定期审计和优化防火墙规则，及时清理冗余策略。</li>
              <li>敏感服务（如SSH、数据库）应限制来源IP。</li>
              <li>结合入侵检测、DLP等系统提升整体防护。</li>
              <li>云防火墙需关注安全组配置，避免全网开放。</li>
              <li>配置变更需审批和记录，防止误操作。</li>
              <li>关注防火墙日志和告警，及时响应异常。</li>
              <li>多层防护，内外网、DMZ区分区隔离。</li>
            </ul>
          </div>
        )}
      </div>

      {/* 底部导航 */}
      <div className="mt-8 flex justify-between">
        <Link 
          href="/study/security/protection/encryption"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          ← 加密技术
        </Link>
        <Link 
          href="/study/security/protection/ids"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          入侵检测 →
        </Link>
      </div>
    </div>
  );
} 