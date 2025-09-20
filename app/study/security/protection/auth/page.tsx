'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState('basic');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">身份认证（Authentication）</h1>

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
          认证类型
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
            <h3 className="text-xl font-semibold mb-3">身份认证基础原理</h3>
            <div className="prose max-w-none mb-4">
              <p>身份认证（Authentication）是信息安全体系的第一道防线，其核心目标是确认访问者的真实身份，防止冒用、伪造和未授权访问。认证不仅是访问控制和授权的前提，也是防止数据泄露、系统入侵、资源滥用的基础。</p>
              <ul className="list-disc pl-6">
                <li><b>认证与授权的区别：</b>认证是"你是谁"，授权是"你能做什么"。只有认证通过后，才能进行授权。</li>
                <li><b>常见攻击方式：</b>冒用（如弱口令、撞库）、伪造（如钓鱼、伪造Token）、会话劫持等。</li>
                <li><b>防护思路：</b>多因素认证、强密码策略、认证信息加密、会话管理、异常检测等。</li>
              </ul>
              <p>身份认证广泛应用于操作系统登录、网络接入、Web系统、API接口、物联网设备等各类场景，是保障系统安全的基石。</p>
            </div>
            {/* SVG结构图 */}
            <div className="flex justify-center mb-6">
              <svg width="480" height="100" viewBox="0 0 480 100">
                <rect x="30" y="30" width="80" height="40" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="2" rx="8" />
                <text x="70" y="55" fontSize="14" fill="#0ea5e9" textAnchor="middle">用户</text>
                <rect x="200" y="30" width="80" height="40" fill="#fce7f3" stroke="#ec4899" strokeWidth="2" rx="8" />
                <text x="240" y="55" fontSize="14" fill="#db2777" textAnchor="middle">认证系统</text>
                <rect x="370" y="30" width="80" height="40" fill="#fee2e2" stroke="#ef4444" strokeWidth="2" rx="8" />
                <text x="410" y="55" fontSize="14" fill="#ef4444" textAnchor="middle">资源</text>
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
                <li><b>认证因子：</b>用于证明身份的凭证，如密码、指纹、短信验证码、证书等。</li>
                <li><b>单因素认证：</b>仅依赖一种认证因子，安全性较低，易被破解。</li>
                <li><b>多因素认证（MFA）：</b>结合两种及以上认证因子，极大提升安全性。</li>
                <li><b>会话管理：</b>认证通过后，维持用户状态的机制，如Session、Token。</li>
                <li><b>认证协议：</b>如Kerberos、OAuth、SAML、LDAP等。</li>
                <li><b>认证绕过：</b>攻击者通过漏洞绕过认证流程，直接获取资源。</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'types' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">认证类型与流程</h3>
            <div className="prose max-w-none mb-4">
              <p>身份认证方式多种多样，常见类型包括：</p>
              <ul className="list-disc pl-6">
                <li><b>本地认证：</b>用户名+密码，最常见，适用于小型系统。优点是实现简单，缺点是易受弱口令、撞库攻击。</li>
                <li><b>基于令牌认证：</b>如动态口令（OTP）、硬件令牌、短信验证码。优点是动态性强，缺点是用户体验略有下降。</li>
                <li><b>生物特征认证：</b>指纹、人脸、虹膜等，便捷但需防伪造和隐私泄露。适合移动设备、门禁等场景。</li>
                <li><b>第三方认证：</b>如OAuth、微信/QQ/钉钉登录，适合互联网应用，简化注册流程，但需防钓鱼和Token泄露。</li>
                <li><b>多因素认证（MFA）：</b>组合多种认证方式，极大提升安全性，适合高安全场景。</li>
              </ul>
              <p>认证流程一般包括：输入凭证 → 认证系统校验 → 通过后生成会话/Token → 访问资源。</p>
              <p className="text-sm text-gray-500">常见问题：
                <ul className="list-disc pl-6">
                  <li>认证信息明文传输，易被窃听。</li>
                  <li>认证流程被绕过，如逻辑漏洞、接口未校验。</li>
                  <li>认证因子被盗用，如Token泄露、短信劫持。</li>
                </ul>
              </p>
            </div>
            {/* 认证流程SVG */}
            <div className="flex justify-center mt-4">
              <svg width="420" height="90" viewBox="0 0 420 90">
                <rect x="30" y="30" width="80" height="30" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="2" rx="8" />
                <text x="70" y="50" fontSize="13" fill="#0ea5e9" textAnchor="middle">用户</text>
                <rect x="170" y="30" width="80" height="30" fill="#fce7f3" stroke="#ec4899" strokeWidth="2" rx="8" />
                <text x="210" y="50" fontSize="13" fill="#db2777" textAnchor="middle">认证因子</text>
                <rect x="310" y="30" width="80" height="30" fill="#fee2e2" stroke="#ef4444" strokeWidth="2" rx="8" />
                <text x="350" y="50" fontSize="13" fill="#ef4444" textAnchor="middle">认证系统</text>
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
            <h3 className="text-xl font-semibold mb-3">常见认证技术</h3>
            <div className="prose max-w-none mb-4">
              <ul className="list-disc pl-6">
                <li><b>密码认证：</b>最常见，易用但易被破解。应结合复杂度策略、定期更换，存储时需加密（如哈希+盐）。常见攻击有暴力破解、撞库、社工等。</li>
                <li><b>动态令牌认证：</b>如TOTP、短信验证码、硬件令牌。防止密码泄露后被滥用，常用于二次验证。需防止短信劫持、令牌同步失效。</li>
                <li><b>生物特征认证：</b>如指纹、人脸、虹膜等。便捷但需防伪造和隐私保护。常见攻击有照片/视频伪造、传感器绕过。</li>
                <li><b>第三方认证/OAuth：</b>如微信、QQ、GitHub、Google登录。简化注册流程，提升用户体验。需防止OAuth钓鱼和Token泄露。</li>
                <li><b>证书认证：</b>如SSL/TLS客户端证书、企业内网CA。安全性高，适合高安全场景，但部署复杂。</li>
              </ul>
              <p className="text-sm text-gray-500">常见漏洞：弱口令、明文传输、认证绕过、Token泄露、社工攻击等。</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* 密码认证 */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-bold text-lg mb-2 text-blue-700">密码认证</h4>
                <ul className="list-disc pl-6 space-y-2 text-sm">
                  <li>密码复杂度策略：长度、字符种类、定期更换。</li>
                  <li>存储加密：哈希+盐（如bcrypt、scrypt、PBKDF2）。</li>
                  <li>防暴力破解：登录失败次数限制、验证码。</li>
                </ul>
              </div>
              {/* 动态令牌认证 */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-bold text-lg mb-2 text-green-700">动态令牌认证</h4>
                <ul className="list-disc pl-6 space-y-2 text-sm">
                  <li>如TOTP（Google Authenticator）、短信验证码、硬件令牌。</li>
                  <li>常用于二次验证、敏感操作。</li>
                  <li>需防止令牌同步失效、短信劫持。</li>
                </ul>
              </div>
              {/* 生物特征认证 */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-bold text-lg mb-2 text-purple-700">生物特征认证</h4>
                <ul className="list-disc pl-6 space-y-2 text-sm">
                  <li>如指纹、人脸、虹膜等。</li>
                  <li>便捷但需防伪造和隐私保护。</li>
                  <li>适合移动设备、门禁等场景。</li>
                </ul>
              </div>
              {/* 第三方认证/OAuth */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-bold text-lg mb-2 text-red-700">第三方认证/OAuth</h4>
                <ul className="list-disc pl-6 space-y-2 text-sm">
                  <li>如微信、QQ、GitHub、Google登录。</li>
                  <li>简化注册流程，提升用户体验。</li>
                  <li>需防止OAuth钓鱼和Token泄露。</li>
                </ul>
              </div>
              {/* 证书认证 */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-bold text-lg mb-2 text-yellow-700">证书认证</h4>
                <ul className="list-disc pl-6 space-y-2 text-sm">
                  <li>SSL/TLS客户端证书、企业CA。</li>
                  <li>安全性高，适合高安全场景。</li>
                  <li>部署复杂，需管理证书生命周期。</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'config' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">认证配置与代码示例</h3>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">1. Linux本地认证配置</h4>
                <pre className="bg-white border rounded p-2 text-xs overflow-x-auto">{`# 添加新用户
useradd alice
passwd alice
# 配置sudo权限
usermod -aG sudo alice`}</pre>
                <div className="text-xs text-gray-500 mt-1">说明：Linux本地认证依赖/etc/passwd和/etc/shadow文件，建议定期检查弱口令。</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">2. Web应用密码哈希（Node.js）</h4>
                <pre className="bg-white border rounded p-2 text-xs overflow-x-auto">{`// 使用bcrypt加密密码
const bcrypt = require('bcrypt');
const saltRounds = 10;
const password = 'myPassword';
bcrypt.hash(password, saltRounds, function(err, hash) {
  // 存储hash到数据库
});`}</pre>
                <div className="text-xs text-gray-500 mt-1">说明：切勿明文存储密码，推荐使用bcrypt、scrypt等算法。</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">3. 二次验证（TOTP）配置</h4>
                <pre className="bg-white border rounded p-2 text-xs overflow-x-auto">{`# Google Authenticator（Linux）
yum install google-authenticator
# 用户配置
su - alice
google-authenticator`}</pre>
                <div className="text-xs text-gray-500 mt-1">说明：TOTP基于时间同步，适合二次验证，防止密码泄露后被滥用。</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">4. OAuth2.0授权流程（伪代码）</h4>
                <pre className="bg-white border rounded p-2 text-xs overflow-x-auto">{`// OAuth2.0授权码模式流程
1. 用户访问客户端，跳转到授权服务器
2. 用户登录并授权，获取授权码
3. 客户端用授权码换取access_token
4. 客户端携带token访问资源服务器`}</pre>
                <div className="text-xs text-gray-500 mt-1">说明：OAuth2.0常用于第三方登录，需防止token泄露和钓鱼攻击。</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">5. Nginx配置客户端证书认证</h4>
                <pre className="bg-white border rounded p-2 text-xs overflow-x-auto">{`server {
  listen 443 ssl;
  ssl_certificate /etc/nginx/cert.pem;
  ssl_certificate_key /etc/nginx/key.pem;
  ssl_client_certificate /etc/nginx/ca.pem;
  ssl_verify_client on;
}`}</pre>
                <div className="text-xs text-gray-500 mt-1">说明：客户端证书认证适合高安全场景，如企业内网、金融系统。</div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'cases' && (
          <div className="space-y-8">
            <h3 className="text-xl font-semibold mb-3">身份认证实际案例</h3>
            {/* 案例1：弱口令导致系统被入侵 */}
            <div className="bg-gray-50 p-5 rounded-lg shadow-sm">
              <h4 className="font-bold text-lg mb-2 text-blue-700">案例1：弱口令导致系统被入侵</h4>
              <div className="mb-2 text-gray-700 text-sm">某公司服务器管理员使用弱口令（如admin/123456），被黑客暴力破解，导致系统被入侵。</div>
              <div className="mb-2">
                <span className="font-semibold">攻击过程：</span>
                <ol className="list-decimal pl-6 text-sm space-y-1">
                  <li>攻击者扫描开放端口，发现SSH服务。</li>
                  <li>使用弱口令字典进行暴力破解。</li>
                  <li>成功登录后植入后门，窃取敏感数据。</li>
                </ol>
              </div>
              <div className="mb-2">
                <span className="font-semibold">修正建议：</span>
                <ul className="list-disc pl-6 text-sm">
                  <li>强制使用复杂密码，定期更换。</li>
                  <li>限制登录失败次数，启用MFA。</li>
                  <li>关闭不必要的远程登录端口。</li>
                  <li>定期审计登录日志，发现异常。</li>
                </ul>
              </div>
            </div>
            {/* 案例2：OAuth钓鱼攻击 */}
            <div className="bg-gray-50 p-5 rounded-lg shadow-sm">
              <h4 className="font-bold text-lg mb-2 text-green-700">案例2：OAuth钓鱼攻击</h4>
              <div className="mb-2 text-gray-700 text-sm">某用户在钓鱼网站上授权了自己的Google账号，导致敏感信息泄露。</div>
              <div className="mb-2">
                <span className="font-semibold">攻击过程：</span>
                <ol className="list-decimal pl-6 text-sm space-y-1">
                  <li>攻击者伪造OAuth授权页面，诱导用户授权。</li>
                  <li>用户误信并授权，token被窃取。</li>
                  <li>攻击者利用token访问用户数据，造成信息泄露。</li>
                </ol>
              </div>
              <div className="mb-2">
                <span className="font-semibold">修正建议：</span>
                <ul className="list-disc pl-6 text-sm">
                  <li>核对授权页面域名，防止钓鱼。</li>
                  <li>定期检查第三方应用授权，及时撤销异常授权。</li>
                  <li>敏感操作需二次验证。</li>
                  <li>企业可部署OAuth安全网关，统一管理第三方授权。</li>
                </ul>
              </div>
            </div>
            {/* 案例3：短信验证码被劫持 */}
            <div className="bg-gray-50 p-5 rounded-lg shadow-sm">
              <h4 className="font-bold text-lg mb-2 text-purple-700">案例3：短信验证码被劫持</h4>
              <div className="mb-2 text-gray-700 text-sm">某用户手机感染木马，短信验证码被拦截，导致账户被盗。</div>
              <div className="mb-2">
                <span className="font-semibold">攻击过程：</span>
                <ol className="list-decimal pl-6 text-sm space-y-1">
                  <li>用户下载恶意APP，木马获取短信读取权限。</li>
                  <li>攻击者远程拦截验证码，登录用户账户。</li>
                  <li>账户资金被盗，造成经济损失。</li>
                </ol>
              </div>
              <div className="mb-2">
                <span className="font-semibold">修正建议：</span>
                <ul className="list-disc pl-6 text-sm">
                  <li>手机安装安全软件，谨慎授权APP权限。</li>
                  <li>重要账户建议使用TOTP或硬件令牌。</li>
                  <li>发现异常及时冻结账户。</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'practice' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">身份认证最佳实践</h3>
            <ul className="list-disc pl-6 text-sm space-y-1">
              <li>强制复杂密码策略，定期更换，禁止弱口令。</li>
              <li>启用多因素认证（MFA），提升安全等级。</li>
              <li>认证信息加密存储，防止明文泄露。</li>
              <li>限制登录失败次数，防止暴力破解。</li>
              <li>定期审计认证日志，发现异常及时响应。</li>
              <li>OAuth等第三方认证需防钓鱼，核查授权域名。</li>
              <li>会话管理安全，防止会话劫持和固定。</li>
              <li>敏感操作建议二次认证（如支付、修改密码）。</li>
              <li>及时撤销离职员工、异常用户的认证权限。</li>
            </ul>
          </div>
        )}
      </div>

      {/* 底部导航 */}
      <div className="mt-8 flex justify-between">
        <Link 
          href="/study/security/protection/access"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          ← 访问控制
        </Link>
        <Link 
          href="/study/security/protection/encryption"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          加密技术 →
        </Link>
      </div>
    </div>
  );
} 