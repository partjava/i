'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function VPNPage() {
  const [activeTab, setActiveTab] = useState('basic');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">VPN技术</h1>

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
          类型与协议
        </button>
        <button
          onClick={() => setActiveTab('security')}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === 'security'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          安全机制
        </button>
        <button
          onClick={() => setActiveTab('deploy')}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === 'deploy'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          部署方案
        </button>
        <button
          onClick={() => setActiveTab('cases')}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === 'cases'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          应用案例
        </button>
      </div>

      {/* 内容区域 */}
      <div className="bg-white rounded-lg shadow-md p-6">
        {activeTab === 'basic' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">VPN基础原理</h3>
            <div className="prose max-w-none mb-4">
              <p>虚拟专用网络(Virtual Private Network, VPN)是一种通过公共网络建立安全、加密的专用网络连接的技术。它允许用户通过互联网安全地访问私有网络资源，就像直接连接到该网络一样。</p>
              
              <h4 className="font-semibold mt-4 mb-2">工作原理</h4>
              <p>VPN通过以下步骤实现安全通信：</p>
              <ol className="list-decimal pl-6 space-y-2">
                <li><b>隧道建立：</b>在公共网络上创建加密通道</li>
                <li><b>身份认证：</b>验证用户身份</li>
                <li><b>数据加密：</b>对传输数据进行加密</li>
                <li><b>数据封装：</b>将加密数据封装在VPN协议中</li>
                <li><b>数据传输：</b>通过公共网络传输</li>
                <li><b>数据解密：</b>接收端解密数据</li>
              </ol>

              <h4 className="font-semibold mt-4 mb-2">核心功能</h4>
              <ul className="list-disc pl-6 space-y-2">
                <li><b>数据加密：</b>确保数据传输安全</li>
                <li><b>身份认证：</b>验证用户身份</li>
                <li><b>访问控制：</b>控制资源访问权限</li>
                <li><b>数据完整性：</b>确保数据不被篡改</li>
                <li><b>地址转换：</b>隐藏真实IP地址</li>
              </ul>
            </div>

            {/* VPN工作原理SVG图 */}
            <div className="flex justify-center mb-6">
              <svg width="800" height="400" viewBox="0 0 800 400">
                {/* 互联网云 */}
                <path d="M100,100 Q150,50 200,100 Q250,150 300,100 Q350,50 400,100 Q450,150 500,100 Q550,50 600,100 Q650,150 700,100" 
                      fill="none" stroke="#94a3b8" strokeWidth="2" />
                <text x="400" y="80" fontSize="16" fill="#64748b" textAnchor="middle">互联网</text>

                {/* 客户端 */}
                <rect x="50" y="200" width="100" height="60" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="2" rx="8" />
                <text x="100" y="235" fontSize="14" fill="#0ea5e9" textAnchor="middle">客户端</text>

                {/* VPN服务器 */}
                <rect x="650" y="200" width="100" height="60" fill="#fce7f3" stroke="#ec4899" strokeWidth="2" rx="8" />
                <text x="700" y="235" fontSize="14" fill="#db2777" textAnchor="middle">VPN服务器</text>

                {/* 内网服务器 */}
                <rect x="650" y="300" width="100" height="60" fill="#dcfce7" stroke="#22c55e" strokeWidth="2" rx="8" />
                <text x="700" y="335" fontSize="14" fill="#16a34a" textAnchor="middle">内网服务器</text>

                {/* 加密隧道 */}
                <path d="M150,230 C300,100 500,100 650,230" 
                      fill="none" stroke="#f59e0b" strokeWidth="3" strokeDasharray="5,5" />
                <text x="400" y="150" fontSize="14" fill="#d97706" textAnchor="middle">加密隧道</text>

                {/* 数据包 */}
                <circle cx="200" cy="180" r="8" fill="#f59e0b" />
                <circle cx="300" cy="150" r="8" fill="#f59e0b" />
                <circle cx="400" cy="130" r="8" fill="#f59e0b" />
                <circle cx="500" cy="150" r="8" fill="#f59e0b" />
                <circle cx="600" cy="180" r="8" fill="#f59e0b" />

                {/* 连接线 */}
                <line x1="700" y1="260" x2="700" y2="300" stroke="#64748b" strokeWidth="2" />

                {/* 图例 */}
                <rect x="50" y="350" width="15" height="15" fill="#f59e0b" />
                <text x="75" y="363" fontSize="12" fill="#64748b">加密数据包</text>

                <rect x="150" y="350" width="15" height="15" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="2" />
                <text x="175" y="363" fontSize="12" fill="#64748b">客户端</text>

                <rect x="250" y="350" width="15" height="15" fill="#fce7f3" stroke="#ec4899" strokeWidth="2" />
                <text x="275" y="363" fontSize="12" fill="#64748b">VPN服务器</text>

                <rect x="350" y="350" width="15" height="15" fill="#dcfce7" stroke="#22c55e" strokeWidth="2" />
                <text x="375" y="363" fontSize="12" fill="#64748b">内网服务器</text>
              </svg>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">重点术语解释</h4>
              <ul className="list-disc pl-6 space-y-2">
                <li><b>隧道协议：</b>用于建立VPN连接的协议，如PPTP、L2TP、OpenVPN等</li>
                <li><b>加密算法：</b>用于加密数据的算法，如AES、RSA等</li>
                <li><b>认证方式：</b>验证用户身份的方法，如用户名密码、证书等</li>
                <li><b>密钥交换：</b>安全交换加密密钥的过程</li>
                <li><b>数据封装：</b>将原始数据包封装在VPN协议中的过程</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'types' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">VPN类型与协议</h3>
            <div className="prose max-w-none mb-4">
              <h4 className="font-semibold mb-2">1. 远程访问VPN</h4>
              <p>允许远程用户安全访问企业网络资源。</p>
              <ul className="list-disc pl-6 mb-4">
                <li><b>适用场景：</b>
                  <ul className="list-disc pl-6">
                    <li>远程办公</li>
                    <li>移动办公</li>
                    <li>出差访问</li>
                  </ul>
                </li>
                <li><b>常用协议：</b>
                  <ul className="list-disc pl-6">
                    <li>SSL/TLS VPN</li>
                    <li>IPsec VPN</li>
                    <li>L2TP/IPsec</li>
                  </ul>
                </li>
              </ul>

              <h4 className="font-semibold mb-2">2. 站点到站点VPN</h4>
              <p>连接不同地理位置的网络。</p>
              <ul className="list-disc pl-6 mb-4">
                <li><b>适用场景：</b>
                  <ul className="list-disc pl-6">
                    <li>分支机构互联</li>
                    <li>数据中心互联</li>
                    <li>云服务连接</li>
                  </ul>
                </li>
                <li><b>常用协议：</b>
                  <ul className="list-disc pl-6">
                    <li>IPsec</li>
                    <li>GRE</li>
                    <li>DMVPN</li>
                  </ul>
                </li>
              </ul>

              <h4 className="font-semibold mb-2">3. 客户端到站点VPN</h4>
              <p>连接单个客户端到企业网络。</p>
              <ul className="list-disc pl-6 mb-4">
                <li><b>适用场景：</b>
                  <ul className="list-disc pl-6">
                    <li>个人用户访问</li>
                    <li>临时访问需求</li>
                    <li>BYOD设备访问</li>
                  </ul>
                </li>
                <li><b>常用协议：</b>
                  <ul className="list-disc pl-6">
                    <li>OpenVPN</li>
                    <li>PPTP</li>
                    <li>SSTP</li>
                  </ul>
                </li>
              </ul>
            </div>

            {/* VPN类型对比SVG图 */}
            <div className="flex justify-center mt-4">
              <svg width="800" height="400" viewBox="0 0 800 400">
                {/* 标题 */}
                <text x="400" y="30" fontSize="18" fill="#1e293b" textAnchor="middle">VPN类型对比</text>

                {/* 远程访问VPN */}
                <rect x="50" y="60" width="200" height="300" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="2" rx="8" />
                <text x="150" y="90" fontSize="16" fill="#0f172a" textAnchor="middle">远程访问VPN</text>
                
                {/* 站点到站点VPN */}
                <rect x="300" y="60" width="200" height="300" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="2" rx="8" />
                <text x="400" y="90" fontSize="16" fill="#0f172a" textAnchor="middle">站点到站点VPN</text>
                
                {/* 客户端到站点VPN */}
                <rect x="550" y="60" width="200" height="300" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="2" rx="8" />
                <text x="650" y="90" fontSize="16" fill="#0f172a" textAnchor="middle">客户端到站点VPN</text>

                {/* 远程访问VPN内容 */}
                <text x="150" y="120" fontSize="12" fill="#475569" textAnchor="middle">适用场景：</text>
                <text x="150" y="140" fontSize="12" fill="#475569" textAnchor="middle">- 远程办公</text>
                <text x="150" y="160" fontSize="12" fill="#475569" textAnchor="middle">- 移动办公</text>
                <text x="150" y="180" fontSize="12" fill="#475569" textAnchor="middle">- 出差访问</text>
                <text x="150" y="220" fontSize="12" fill="#475569" textAnchor="middle">协议：</text>
                <text x="150" y="240" fontSize="12" fill="#475569" textAnchor="middle">- SSL/TLS VPN</text>
                <text x="150" y="260" fontSize="12" fill="#475569" textAnchor="middle">- IPsec VPN</text>
                <text x="150" y="280" fontSize="12" fill="#475569" textAnchor="middle">- L2TP/IPsec</text>

                {/* 站点到站点VPN内容 */}
                <text x="400" y="120" fontSize="12" fill="#475569" textAnchor="middle">适用场景：</text>
                <text x="400" y="140" fontSize="12" fill="#475569" textAnchor="middle">- 分支机构互联</text>
                <text x="400" y="160" fontSize="12" fill="#475569" textAnchor="middle">- 数据中心互联</text>
                <text x="400" y="180" fontSize="12" fill="#475569" textAnchor="middle">- 云服务连接</text>
                <text x="400" y="220" fontSize="12" fill="#475569" textAnchor="middle">协议：</text>
                <text x="400" y="240" fontSize="12" fill="#475569" textAnchor="middle">- IPsec</text>
                <text x="400" y="260" fontSize="12" fill="#475569" textAnchor="middle">- GRE</text>
                <text x="400" y="280" fontSize="12" fill="#475569" textAnchor="middle">- DMVPN</text>

                {/* 客户端到站点VPN内容 */}
                <text x="650" y="120" fontSize="12" fill="#475569" textAnchor="middle">适用场景：</text>
                <text x="650" y="140" fontSize="12" fill="#475569" textAnchor="middle">- 个人用户访问</text>
                <text x="650" y="160" fontSize="12" fill="#475569" textAnchor="middle">- 临时访问需求</text>
                <text x="650" y="180" fontSize="12" fill="#475569" textAnchor="middle">- BYOD设备访问</text>
                <text x="650" y="220" fontSize="12" fill="#475569" textAnchor="middle">协议：</text>
                <text x="650" y="240" fontSize="12" fill="#475569" textAnchor="middle">- OpenVPN</text>
                <text x="650" y="260" fontSize="12" fill="#475569" textAnchor="middle">- PPTP</text>
                <text x="650" y="280" fontSize="12" fill="#475569" textAnchor="middle">- SSTP</text>
              </svg>
            </div>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">VPN安全机制</h3>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">1. 加密机制</h4>
                <p className="mb-2">VPN使用多种加密算法保护数据传输安全。</p>
                <pre className="bg-white border rounded p-2 text-xs overflow-x-auto">{`# OpenVPN配置示例
cipher AES-256-CBC
auth SHA256
tls-cipher TLS-DHE-RSA-WITH-AES-256-GCM-SHA384
key-size 2048
dh dh2048.pem`}</pre>
                <ul className="list-disc pl-6 mt-2 text-sm">
                  <li>对称加密：AES、3DES、Blowfish</li>
                  <li>非对称加密：RSA、DSA、ECC</li>
                  <li>哈希算法：SHA-256、SHA-512</li>
                </ul>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">2. 认证机制</h4>
                <p className="mb-2">多种认证方式确保用户身份安全。</p>
                <pre className="bg-white border rounded p-2 text-xs overflow-x-auto">{`# IPsec认证配置示例
authby=secret
leftauth=psk
rightauth=psk
leftid=@vpn.example.com
rightid=@client.example.com`}</pre>
                <ul className="list-disc pl-6 mt-2 text-sm">
                  <li>预共享密钥(PSK)</li>
                  <li>数字证书</li>
                  <li>双因素认证</li>
                  <li>RADIUS认证</li>
                </ul>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">3. 密钥管理</h4>
                <p className="mb-2">安全管理和更新加密密钥。</p>
                <pre className="bg-white border rounded p-2 text-xs overflow-x-auto">{`# 密钥更新配置示例
rekey-method ssl
rekey-time 3600
rekey-margin 540
rekey-fuzz 100`}</pre>
                <ul className="list-disc pl-6 mt-2 text-sm">
                  <li>定期密钥更新</li>
                  <li>密钥分发机制</li>
                  <li>密钥存储安全</li>
                  <li>密钥撤销机制</li>
                </ul>
              </div>
            </div>

            {/* 安全机制SVG图 */}
            <div className="flex justify-center mt-4">
              <svg width="800" height="400" viewBox="0 0 800 400">
                {/* 标题 */}
                <text x="400" y="30" fontSize="18" fill="#1e293b" textAnchor="middle">VPN安全机制</text>

                {/* 中心圆 */}
                <circle cx="400" cy="200" r="150" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="2" />
                <text x="400" y="200" fontSize="20" fill="#0f172a" textAnchor="middle">VPN安全</text>

                {/* 加密机制 */}
                <circle cx="200" cy="150" r="80" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="2" />
                <text x="200" y="140" fontSize="16" fill="#0ea5e9" textAnchor="middle">加密机制</text>
                <text x="200" y="160" fontSize="12" fill="#0ea5e9" textAnchor="middle">AES/RSA/SHA</text>

                {/* 认证机制 */}
                <circle cx="600" cy="150" r="80" fill="#fce7f3" stroke="#ec4899" strokeWidth="2" />
                <text x="600" y="140" fontSize="16" fill="#db2777" textAnchor="middle">认证机制</text>
                <text x="600" y="160" fontSize="12" fill="#db2777" textAnchor="middle">PSK/证书/2FA</text>

                {/* 密钥管理 */}
                <circle cx="400" cy="350" r="80" fill="#dcfce7" stroke="#22c55e" strokeWidth="2" />
                <text x="400" y="340" fontSize="16" fill="#16a34a" textAnchor="middle">密钥管理</text>
                <text x="400" y="360" fontSize="12" fill="#16a34a" textAnchor="middle">更新/分发/存储</text>

                {/* 连接线 */}
                <line x1="300" y1="200" x2="400" y2="200" stroke="#94a3b8" strokeWidth="2" />
                <line x1="500" y1="200" x2="400" y2="200" stroke="#94a3b8" strokeWidth="2" />
                <line x1="400" y1="300" x2="400" y2="270" stroke="#94a3b8" strokeWidth="2" />
              </svg>
            </div>
          </div>
        )}

        {activeTab === 'deploy' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">VPN部署方案</h3>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">1. 硬件VPN部署</h4>
                <p className="mb-2">使用专用VPN设备部署。</p>
                <ul className="list-disc pl-6 text-sm">
                  <li><b>优势：</b>
                    <ul className="list-disc pl-6">
                      <li>高性能</li>
                      <li>高可靠性</li>
                      <li>易于管理</li>
                    </ul>
                  </li>
                  <li><b>适用场景：</b>
                    <ul className="list-disc pl-6">
                      <li>大型企业</li>
                      <li>数据中心</li>
                      <li>关键业务</li>
                    </ul>
                  </li>
                </ul>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">2. 软件VPN部署</h4>
                <p className="mb-2">使用软件解决方案部署。</p>
                <ul className="list-disc pl-6 text-sm">
                  <li><b>优势：</b>
                    <ul className="list-disc pl-6">
                      <li>灵活性高</li>
                      <li>成本低</li>
                      <li>易于扩展</li>
                    </ul>
                  </li>
                  <li><b>适用场景：</b>
                    <ul className="list-disc pl-6">
                      <li>中小企业</li>
                      <li>远程办公</li>
                      <li>临时需求</li>
                    </ul>
                  </li>
                </ul>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">3. 云VPN部署</h4>
                <p className="mb-2">使用云服务提供商部署。</p>
                <ul className="list-disc pl-6 text-sm">
                  <li><b>优势：</b>
                    <ul className="list-disc pl-6">
                      <li>无需维护</li>
                      <li>全球覆盖</li>
                      <li>按需扩展</li>
                    </ul>
                  </li>
                  <li><b>适用场景：</b>
                    <ul className="list-disc pl-6">
                      <li>全球化企业</li>
                      <li>云服务用户</li>
                      <li>混合云环境</li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>

            {/* 部署方案SVG图 */}
            <div className="flex justify-center mt-4">
              <svg width="800" height="400" viewBox="0 0 800 400">
                {/* 标题 */}
                <text x="400" y="30" fontSize="18" fill="#1e293b" textAnchor="middle">VPN部署方案对比</text>

                {/* 硬件VPN */}
                <rect x="50" y="60" width="200" height="300" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="2" rx="8" />
                <text x="150" y="90" fontSize="16" fill="#0f172a" textAnchor="middle">硬件VPN</text>
                <text x="150" y="120" fontSize="12" fill="#475569" textAnchor="middle">高性能</text>
                <text x="150" y="140" fontSize="12" fill="#475569" textAnchor="middle">高可靠性</text>
                <text x="150" y="160" fontSize="12" fill="#475569" textAnchor="middle">易于管理</text>
                <text x="150" y="200" fontSize="12" fill="#475569" textAnchor="middle">适用场景：</text>
                <text x="150" y="220" fontSize="12" fill="#475569" textAnchor="middle">- 大型企业</text>
                <text x="150" y="240" fontSize="12" fill="#475569" textAnchor="middle">- 数据中心</text>
                <text x="150" y="260" fontSize="12" fill="#475569" textAnchor="middle">- 关键业务</text>

                {/* 软件VPN */}
                <rect x="300" y="60" width="200" height="300" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="2" rx="8" />
                <text x="400" y="90" fontSize="16" fill="#0f172a" textAnchor="middle">软件VPN</text>
                <text x="400" y="120" fontSize="12" fill="#475569" textAnchor="middle">灵活性高</text>
                <text x="400" y="140" fontSize="12" fill="#475569" textAnchor="middle">成本低</text>
                <text x="400" y="160" fontSize="12" fill="#475569" textAnchor="middle">易于扩展</text>
                <text x="400" y="200" fontSize="12" fill="#475569" textAnchor="middle">适用场景：</text>
                <text x="400" y="220" fontSize="12" fill="#475569" textAnchor="middle">- 中小企业</text>
                <text x="400" y="240" fontSize="12" fill="#475569" textAnchor="middle">- 远程办公</text>
                <text x="400" y="260" fontSize="12" fill="#475569" textAnchor="middle">- 临时需求</text>

                {/* 云VPN */}
                <rect x="550" y="60" width="200" height="300" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="2" rx="8" />
                <text x="650" y="90" fontSize="16" fill="#0f172a" textAnchor="middle">云VPN</text>
                <text x="650" y="120" fontSize="12" fill="#475569" textAnchor="middle">无需维护</text>
                <text x="650" y="140" fontSize="12" fill="#475569" textAnchor="middle">全球覆盖</text>
                <text x="650" y="160" fontSize="12" fill="#475569" textAnchor="middle">按需扩展</text>
                <text x="650" y="200" fontSize="12" fill="#475569" textAnchor="middle">适用场景：</text>
                <text x="650" y="220" fontSize="12" fill="#475569" textAnchor="middle">- 全球化企业</text>
                <text x="650" y="240" fontSize="12" fill="#475569" textAnchor="middle">- 云服务用户</text>
                <text x="650" y="260" fontSize="12" fill="#475569" textAnchor="middle">- 混合云环境</text>
              </svg>
            </div>
          </div>
        )}

        {activeTab === 'cases' && (
          <div className="space-y-8">
            <h3 className="text-xl font-semibold mb-3">应用案例</h3>
            
            {/* 案例1：企业远程办公 */}
            <div className="bg-gray-50 p-5 rounded-lg shadow-sm">
              <h4 className="font-bold text-lg mb-2 text-blue-700">案例1：企业远程办公VPN部署</h4>
              <div className="mb-2 text-gray-700 text-sm">
                <p>某跨国企业为支持远程办公，部署了企业级VPN解决方案。</p>
              </div>
              <div className="mb-2">
                <span className="font-semibold">部署方案：</span>
                <ul className="list-disc pl-6 text-sm">
                  <li>硬件VPN网关部署</li>
                  <li>SSL VPN远程访问</li>
                  <li>双因素认证</li>
                  <li>负载均衡部署</li>
                </ul>
              </div>
              <div className="mb-2">
                <span className="font-semibold">安全措施：</span>
                <ul className="list-disc pl-6 text-sm">
                  <li>AES-256加密</li>
                  <li>证书认证</li>
                  <li>访问控制</li>
                  <li>审计日志</li>
                </ul>
              </div>
              <div className="mb-2">
                <span className="font-semibold">实施效果：</span>
                <ul className="list-disc pl-6 text-sm">
                  <li>支持5000+远程用户</li>
                  <li>99.99%可用性</li>
                  <li>安全事件零发生</li>
                  <li>用户满意度高</li>
                </ul>
              </div>
            </div>

            {/* 案例2：分支机构互联 */}
            <div className="bg-gray-50 p-5 rounded-lg shadow-sm">
              <h4 className="font-bold text-lg mb-2 text-green-700">案例2：分支机构VPN互联</h4>
              <div className="mb-2 text-gray-700 text-sm">
                <p>某零售企业通过VPN实现全国分支机构安全互联。</p>
              </div>
              <div className="mb-2">
                <span className="font-semibold">部署方案：</span>
                <ul className="list-disc pl-6 text-sm">
                  <li>站点到站点VPN</li>
                  <li>IPsec协议</li>
                  <li>双线路备份</li>
                  <li>集中管理平台</li>
                </ul>
              </div>
              <div className="mb-2">
                <span className="font-semibold">安全措施：</span>
                <ul className="list-disc pl-6 text-sm">
                  <li>强加密算法</li>
                  <li>密钥定期更新</li>
                  <li>流量监控</li>
                  <li>入侵检测</li>
                </ul>
              </div>
              <div className="mb-2">
                <span className="font-semibold">实施效果：</span>
                <ul className="list-disc pl-6 text-sm">
                  <li>连接100+分支机构</li>
                  <li>数据传输安全</li>
                  <li>网络性能稳定</li>
                  <li>运维成本降低</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 底部导航 */}
      <div className="mt-8 flex justify-between">
        <Link 
          href="/study/security/protection/ips"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          ← 入侵防御
        </Link>
        <Link 
          href="/study/security/protection/audit"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          安全审计 →
        </Link>
      </div>
    </div>
  );
} 