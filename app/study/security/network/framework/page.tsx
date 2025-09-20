'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function NetworkSecurityFrameworkPage() {
  const [activeTab, setActiveTab] = useState('cia');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">安全模型与框架</h1>

      {/* 标签页导航 */}
      <div className="flex space-x-4 mb-6 border-b overflow-x-auto">
        <button
          onClick={() => setActiveTab('cia')}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === 'cia'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          CIA三元组
        </button>
        <button
          onClick={() => setActiveTab('zero-trust')}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === 'zero-trust'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          零信任模型
        </button>
        <button
          onClick={() => setActiveTab('frameworks')}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === 'frameworks'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          主流安全框架
        </button>
      </div>

      {/* 内容区域 */}
      <div className="bg-white rounded-lg shadow-md p-6">
        {activeTab === 'cia' && (
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-3">CIA三元组模型（理论+案例+常见问题）</h3>
              <div className="mb-4 prose max-w-none">
                <p>CIA三元组是信息安全的核心模型，分别代表机密性（Confidentiality）、完整性（Integrity）、可用性（Availability）。</p>
              </div>
              {/* SVG图示 */}
              <div className="flex justify-center mb-6">
                <svg width="320" height="200" viewBox="0 0 320 200">
                  <circle cx="100" cy="120" r="70" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="3" />
                  <circle cx="220" cy="120" r="70" fill="#fef9c3" stroke="#facc15" strokeWidth="3" />
                  <circle cx="160" cy="60" r="70" fill="#fce7f3" stroke="#ec4899" strokeWidth="3" />
                  <text x="70" y="130" fontSize="18" fill="#0ea5e9">机密性</text>
                  <text x="210" y="130" fontSize="18" fill="#eab308">可用性</text>
                  <text x="140" y="55" fontSize="18" fill="#db2777">完整性</text>
                </svg>
              </div>
              <div className="space-y-6">
                {/* 机密性 */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">1. 机密性（Confidentiality）</h4>
                  <p>机密性是指信息只能被授权用户访问，防止敏感数据泄露给未授权人员。常用技术包括对称/非对称加密（如AES、RSA）、访问控制列表（ACL）、数据脱敏与分级授权等。</p>
                  <ul className="list-disc pl-6 mb-2">
                    <li>实际案例：银行系统通过SSL/TLS加密用户交易数据，防止中间人窃听。</li>
                    <li>实际案例：企业内部文件服务器设置权限，只有特定部门能访问敏感文档。</li>
                  </ul>
                  <div className="bg-white p-3 rounded border mt-2">
                    <span className="text-xs text-gray-500">代码示例：对敏感数据加密（Python）</span>
                    <pre className="overflow-x-auto text-sm mt-1"><code>{`from cryptography.fernet import Fernet
key = Fernet.generate_key()
cipher = Fernet(key)
token = cipher.encrypt(b'重要数据')
print(token)`}</code></pre>
                  </div>
                  <div className="mt-2 text-sm text-gray-700">
                    <b>常见问题：</b> 密码泄露、弱口令攻击、未加密传输等。
                  </div>
                </div>
                {/* 完整性 */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">2. 完整性（Integrity）</h4>
                  <p>完整性保证信息在存储、传输过程中未被未授权篡改。常用技术有哈希算法（如SHA-256）、数字签名、消息认证码（MAC）等。</p>
                  <ul className="list-disc pl-6 mb-2">
                    <li>实际案例：软件分发时提供SHA256校验码，用户下载后校验文件完整性。</li>
                    <li>实际案例：金融交易系统通过数字签名防止交易数据被篡改。</li>
                  </ul>
                  <div className="bg-white p-3 rounded border mt-2">
                    <span className="text-xs text-gray-500">代码示例：计算文件哈希值（Python）</span>
                    <pre className="overflow-x-auto text-sm mt-1"><code>{`import hashlib
with open('file.txt', 'rb') as f:
    data = f.read()
print(hashlib.sha256(data).hexdigest())`}</code></pre>
                  </div>
                  <div className="mt-2 text-sm text-gray-700">
                    <b>常见问题：</b> 数据包被篡改、数据库注入攻击、文件被恶意修改。
                  </div>
                </div>
                {/* 可用性 */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">3. 可用性（Availability）</h4>
                  <p>可用性确保授权用户在需要时能及时访问信息和资源。常用技术有冗余备份、负载均衡、DDoS防护等。</p>
                  <ul className="list-disc pl-6 mb-2">
                    <li>实际案例：大型网站部署多台服务器和CDN，防止单点故障。</li>
                    <li>实际案例：银行系统定期备份数据，防止硬件损坏导致数据丢失。</li>
                  </ul>
                  <div className="bg-white p-3 rounded border mt-2">
                    <span className="text-xs text-gray-500">代码示例：服务健康检查（Python）</span>
                    <pre className="overflow-x-auto text-sm mt-1"><code>{`import requests
try:
    r = requests.get('https://example.com', timeout=3)
    print('服务可用' if r.status_code == 200 else '服务异常')
except Exception:
    print('服务不可用')`}</code></pre>
                  </div>
                  <div className="mt-2 text-sm text-gray-700">
                    <b>常见问题：</b> 拒绝服务攻击（DoS/DDoS）、硬件故障、自然灾害。
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'zero-trust' && (
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-3">零信任安全模型（理论+案例+常见问题）</h3>
              <div className="mb-4 prose max-w-none">
                <p>零信任（Zero Trust）是一种"永不信任，始终验证"的安全理念。无论内部还是外部访问，都必须进行严格身份认证和最小权限控制。</p>
              </div>
              {/* SVG结构图 */}
              <div className="flex justify-center mb-6">
                <svg width="360" height="140" viewBox="0 0 360 140">
                  <rect x="10" y="50" width="90" height="40" fill="#f1f5f9" stroke="#64748b" strokeWidth="2" rx="8" />
                  <text x="55" y="75" fontSize="14" fill="#334155" textAnchor="middle">用户</text>
                  <rect x="120" y="20" width="120" height="100" fill="#fef9c3" stroke="#facc15" strokeWidth="2" rx="8" />
                  <text x="180" y="75" fontSize="14" fill="#eab308" textAnchor="middle">身份验证与权限控制</text>
                  <rect x="260" y="50" width="90" height="40" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="2" rx="8" />
                  <text x="305" y="75" fontSize="14" fill="#0ea5e9" textAnchor="middle">资源</text>
                  <line x1="100" y1="70" x2="120" y2="70" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />
                  <line x1="240" y1="70" x2="260" y2="70" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />
                  <defs>
                    <marker id="arrow" markerWidth="8" markerHeight="8" refX="8" refY="4" orient="auto" markerUnits="strokeWidth">
                      <path d="M0,0 L8,4 L0,8" fill="#64748b" />
                    </marker>
                  </defs>
                </svg>
              </div>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">核心思想与关键措施</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>多因素认证（MFA）：如短信验证码+密码</li>
                    <li>动态访问控制：根据用户、设备、位置、行为实时调整权限</li>
                    <li>微分段：将网络划分为多个小区域，攻击者即使入侵也难以横向移动</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">实际应用场景</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>远程办公时，员工每次登录都需身份验证，且只能访问与工作相关的资源。</li>
                    <li>云服务平台对每个API调用都进行权限校验和日志记录。</li>
                  </ul>
                </div>
                <div className="bg-white p-3 rounded border mt-2">
                  <span className="text-xs text-gray-500">代码示例：伪代码实现最小权限访问控制</span>
                  <pre className="overflow-x-auto text-sm mt-1"><code>{`if user.has_permission('read'):
    show_data()
else:
    deny_access()`}</code></pre>
                </div>
                <div className="mt-2 text-sm text-gray-700">
                  <b>常见问题：</b> 内部人员滥用权限、VPN被盗用、传统边界防护失效。
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'frameworks' && (
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-3">主流安全框架（理论+案例+常见问题）</h3>
              <div className="mb-4 prose max-w-none">
                <p>安全框架为组织提供了系统化的安全管理方法和最佳实践。常见的安全框架有ISO 27001、NIST、CIS等。</p>
              </div>
              <div className="space-y-4">
                {/* ISO/IEC 27001 */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">1. ISO/IEC 27001</h4>
                  <p>国际标准，强调信息安全管理体系（ISMS）的建立和持续改进，涵盖风险评估、控制措施、合规性等。</p>
                  <ul className="list-disc pl-6 mb-2">
                    <li>适用场景：企业合规、政府采购、金融行业。</li>
                  </ul>
                  <div className="bg-white p-3 rounded border mt-2">
                    <span className="text-xs text-gray-500">代码示例：风险评估流程伪代码</span>
                    <pre className="overflow-x-auto text-sm mt-1"><code>{`for asset in assets:
    risk = assess(asset)
    if risk > threshold:
        apply_control(asset)`}</code></pre>
                  </div>
                  <div className="mt-2 text-sm text-gray-700">
                    <b>常见问题：</b> 风险识别不全、控制措施落实不到位、缺乏持续改进。
                  </div>
                </div>
                {/* NIST */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">2. NIST网络安全框架</h4>
                  <p>美国国家标准与技术研究院（NIST）提出的框架，分为识别、保护、检测、响应、恢复五大功能。</p>
                  <ul className="list-disc pl-6 mb-2">
                    <li>适用场景：美国政府、关键基础设施、企业安全建设。</li>
                  </ul>
                  <div className="bg-white p-3 rounded border mt-2">
                    <span className="text-xs text-gray-500">代码示例：检测与响应流程</span>
                    <pre className="overflow-x-auto text-sm mt-1"><code>{`if detect_threat():
    respond()
    recover()`}</code></pre>
                  </div>
                  <div className="mt-2 text-sm text-gray-700">
                    <b>常见问题：</b> 资产识别不全、响应流程不完善、恢复能力不足。
                  </div>
                </div>
                {/* CIS */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">3. CIS控制</h4>
                  <p>Center for Internet Security（CIS）提出的20项安全控制措施，涵盖资产管理、漏洞管理、访问控制等。</p>
                  <ul className="list-disc pl-6 mb-2">
                    <li>适用场景：中小企业、IT运维、网络安全初学者。</li>
                  </ul>
                  <div className="bg-white p-3 rounded border mt-2">
                    <span className="text-xs text-gray-500">代码示例：资产清单管理</span>
                    <pre className="overflow-x-auto text-sm mt-1"><code>{`assets = scan_network()
for asset in assets:
    register(asset)`}</code></pre>
                  </div>
                  <div className="mt-2 text-sm text-gray-700">
                    <b>常见问题：</b> 资产清单不全、漏洞未及时修复、权限分配混乱。
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 底部导航 */}
      <div className="mt-8 flex justify-between">
        <Link 
          href="/study/security/network/architecture"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          ← 网络基础架构
        </Link>
        <Link 
          href="/study/security/network/physical"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          物理层安全 →
        </Link>
      </div>
    </div>
  );
} 