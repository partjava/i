'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function AccessControlPage() {
  const [activeTab, setActiveTab] = useState('basic');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">访问控制（Access Control）</h1>

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
          类型与模型
        </button>
        <button
          onClick={() => setActiveTab('tech')}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === 'tech'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          常见技术
        </button>
        <button
          onClick={() => setActiveTab('config')}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === 'config'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          配置与示例
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
            <h3 className="text-xl font-semibold mb-3">访问控制基础原理</h3>
            <div className="prose max-w-none mb-4">
              <p>访问控制（Access Control）是指对用户、设备或进程访问系统资源的权限进行管理和限制，防止未授权访问和滥用。它是信息安全的核心机制之一，广泛应用于操作系统、网络设备、数据库、Web应用等各类系统。</p>
              <ul className="list-disc pl-6">
                <li>核心目标：确保只有被授权的主体能够访问特定资源。</li>
                <li>三要素：主体（Subject）、客体（Object）、权限（Permission）。</li>
                <li>常见场景：文件访问、网络流量、数据库操作、API接口等。</li>
              </ul>
            </div>
            {/* SVG结构图 */}
            <div className="flex justify-center mb-6">
              <svg width="480" height="100" viewBox="0 0 480 100">
                <rect x="30" y="30" width="80" height="40" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="2" rx="8" />
                <text x="70" y="55" fontSize="14" fill="#0ea5e9" textAnchor="middle">主体</text>
                <rect x="200" y="30" width="80" height="40" fill="#fce7f3" stroke="#ec4899" strokeWidth="2" rx="8" />
                <text x="240" y="55" fontSize="14" fill="#db2777" textAnchor="middle">访问控制</text>
                <rect x="370" y="30" width="80" height="40" fill="#fee2e2" stroke="#ef4444" strokeWidth="2" rx="8" />
                <text x="410" y="55" fontSize="14" fill="#ef4444" textAnchor="middle">客体</text>
                <line x1="110" y1="50" x2="200" y2="50" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />
                <line x1="280" y1="50" x2="370" y2="50" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />
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
                <li><b>主体（Subject）：</b>发起访问请求的用户、设备或进程。</li>
                <li><b>客体（Object）：</b>被访问的资源，如文件、数据库、服务等。</li>
                <li><b>权限（Permission）：</b>主体对客体可执行的操作，如读、写、执行等。</li>
                <li><b>授权（Authorization）：</b>授予主体访问客体的权限过程。</li>
                <li><b>认证（Authentication）：</b>验证主体身份的过程。</li>
                <li><b>最小权限原则：</b>仅授予完成任务所需的最小权限。</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'types' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">访问控制类型与模型</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <ul className="list-disc pl-6 space-y-2">
                <li><b>自主访问控制（DAC）：</b>资源所有者自主决定谁可以访问资源。典型如文件系统权限。</li>
                <li><b>强制访问控制（MAC）：</b>系统根据安全策略强制控制访问，用户无法更改。常见于军事、政府系统。</li>
                <li><b>基于角色的访问控制（RBAC）：</b>通过角色分配权限，用户获得角色后自动拥有相应权限。企业常用。</li>
                <li><b>基于属性的访问控制（ABAC）：</b>根据用户、资源、环境等属性动态判断权限，灵活性高。</li>
                <li><b>最小权限原则：</b>所有模型都应遵循，减少权限滥用风险。</li>
              </ul>
            </div>
            {/* RBAC模型SVG */}
            <div className="flex justify-center mt-4">
              <svg width="420" height="90" viewBox="0 0 420 90">
                <rect x="30" y="30" width="80" height="30" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="2" rx="8" />
                <text x="70" y="50" fontSize="13" fill="#0ea5e9" textAnchor="middle">用户</text>
                <rect x="170" y="30" width="80" height="30" fill="#fce7f3" stroke="#ec4899" strokeWidth="2" rx="8" />
                <text x="210" y="50" fontSize="13" fill="#db2777" textAnchor="middle">角色</text>
                <rect x="310" y="30" width="80" height="30" fill="#fee2e2" stroke="#ef4444" strokeWidth="2" rx="8" />
                <text x="350" y="50" fontSize="13" fill="#ef4444" textAnchor="middle">权限</text>
                <line x1="110" y1="45" x2="170" y2="45" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />
                <line x1="250" y1="45" x2="310" y2="45" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />
                <defs>
                  <marker id="arrow" markerWidth="8" markerHeight="8" refX="8" refY="4" orient="auto" markerUnits="strokeWidth">
                    <path d="M0,0 L8,4 L0,8" fill="#64748b" />
                  </marker>
                </defs>
              </svg>
            </div>
          </div>
        )}

        {activeTab === 'tech' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">常见访问控制技术</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* 网络设备ACL */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-bold text-lg mb-2 text-blue-700">网络设备ACL</h4>
                <ul className="list-disc pl-6 space-y-2 text-sm">
                  <li>基于IP、端口、协议的流量过滤</li>
                  <li>常用于路由器、防火墙、交换机</li>
                  <li>支持精细化访问策略</li>
                </ul>
              </div>
              {/* 操作系统权限 */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-bold text-lg mb-2 text-green-700">操作系统权限</h4>
                <ul className="list-disc pl-6 space-y-2 text-sm">
                  <li>文件/目录读写执行权限</li>
                  <li>用户组与权限继承</li>
                  <li>sudo、setuid等机制</li>
                </ul>
              </div>
              {/* 数据库访问控制 */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-bold text-lg mb-2 text-purple-700">数据库访问控制</h4>
                <ul className="list-disc pl-6 space-y-2 text-sm">
                  <li>用户、角色、权限粒度分配</li>
                  <li>视图、存储过程安全</li>
                  <li>SQL注入防护</li>
                </ul>
              </div>
              {/* Web应用访问控制 */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-bold text-lg mb-2 text-red-700">Web应用访问控制</h4>
                <ul className="list-disc pl-6 space-y-2 text-sm">
                  <li>基于Session/Token的认证授权</li>
                  <li>URL/接口权限校验</li>
                  <li>前后端协同防护</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'config' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">访问控制配置与代码示例</h3>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">1. 网络设备ACL配置</h4>
                <pre className="bg-white border rounded p-2 text-xs overflow-x-auto">{`# 仅允许内网主机访问Web服务器
access-list 10 permit 192.168.1.0 0.0.0.255
access-list 10 deny any
interface GigabitEthernet0/1
 ip access-group 10 in`}</pre>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">2. Linux文件权限配置</h4>
                <pre className="bg-white border rounded p-2 text-xs overflow-x-auto">{`# 只允许owner读写
chmod 600 secret.txt
# 设置sudo权限
usermod -aG sudo alice`}</pre>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">3. 数据库用户权限配置</h4>
                <pre className="bg-white border rounded p-2 text-xs overflow-x-auto">{`-- 创建只读用户
CREATE USER 'readonly'@'%' IDENTIFIED BY 'password';
GRANT SELECT ON mydb.* TO 'readonly'@'%';`}</pre>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">4. Web应用RBAC示例（Node.js）</h4>
                <pre className="bg-white border rounded p-2 text-xs overflow-x-auto">{`// RBAC中间件示例
function checkRole(role) {
  return function(req, res, next) {
    if (req.user && req.user.role === role) {
      next();
    } else {
      res.status(403).send('Forbidden');
    }
  }
}
// 路由使用
app.get('/admin', checkRole('admin'), (req, res) => {
  res.send('管理员页面');
});`}</pre>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'cases' && (
          <div className="space-y-8">
            <h3 className="text-xl font-semibold mb-3">访问控制实际案例</h3>
            {/* 案例1：ACL配置失误导致内网泄露 */}
            <div className="bg-gray-50 p-5 rounded-lg shadow-sm">
              <h4 className="font-bold text-lg mb-2 text-blue-700">案例1：ACL配置失误导致内网泄露</h4>
              <div className="mb-2 text-gray-700 text-sm">某公司网络管理员配置ACL时，未正确限制外部访问，导致内网服务器被互联网用户扫描。</div>
              <div className="mb-2">
                <span className="font-semibold">分析过程：</span>
                <ol className="list-decimal pl-6 text-sm space-y-1">
                  <li>ACL规则顺序错误，permit any放在前面。</li>
                  <li>外部用户可直接访问内网端口。</li>
                  <li>安全巡检发现异常流量。</li>
                </ol>
              </div>
              <div className="mb-2">
                <span className="font-semibold">修正建议：</span>
                <ul className="list-disc pl-6 text-sm">
                  <li>严格区分内外网ACL规则，deny any应在permit前。</li>
                  <li>定期审计ACL配置，防止误操作。</li>
                </ul>
              </div>
            </div>
            {/* 案例2：Web接口未做权限校验 */}
            <div className="bg-gray-50 p-5 rounded-lg shadow-sm">
              <h4 className="font-bold text-lg mb-2 text-green-700">案例2：Web接口未做权限校验</h4>
              <div className="mb-2 text-gray-700 text-sm">某电商平台API接口未校验用户权限，导致普通用户可越权访问管理员功能。</div>
              <div className="mb-2">
                <span className="font-semibold">分析过程：</span>
                <ol className="list-decimal pl-6 text-sm space-y-1">
                  <li>接口仅做登录校验，未做角色权限判断。</li>
                  <li>攻击者构造请求访问/admin接口，获取敏感信息。</li>
                  <li>安全测试发现漏洞。</li>
                </ol>
              </div>
              <div className="mb-2">
                <span className="font-semibold">修正建议：</span>
                <ul className="list-disc pl-6 text-sm">
                  <li>所有敏感接口必须做权限校验。</li>
                  <li>建议采用RBAC模型统一管理权限。</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'practice' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">访问控制最佳实践</h3>
            <ul className="list-disc pl-6 text-sm space-y-1">
              <li>遵循最小权限原则，避免权限过大。</li>
              <li>定期审计和优化访问控制策略。</li>
              <li>敏感操作需多因素认证。</li>
              <li>配置变更需审批和记录。</li>
              <li>自动化检测权限异常。</li>
              <li>接口权限与前后端双重校验。</li>
              <li>权限分离，避免单点失效。</li>
            </ul>
          </div>
        )}
      </div>

      {/* 底部导航 */}
      <div className="mt-8 flex justify-between">
        <Link 
          href="/study/security/network/device"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          ← 网络设备安全
        </Link>
        <Link 
          href="/study/security/protection/auth"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          身份认证 →
        </Link>
      </div>
    </div>
  );
} 