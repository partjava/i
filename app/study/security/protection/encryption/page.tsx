'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function EncryptionPage() {
  const [activeTab, setActiveTab] = useState('basic');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">加密技术（Encryption）</h1>

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
          加密类型与算法
        </button>
        <button
          onClick={() => setActiveTab('scenes')}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === 'scenes'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          应用场景
        </button>
        <button
          onClick={() => setActiveTab('code')}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === 'code'
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
            <h3 className="text-xl font-semibold mb-3">加密技术基础原理</h3>
            <div className="prose max-w-none mb-4">
              <p>加密技术是信息安全的核心手段之一，通过对数据进行编码，使其在未授权的情况下无法被理解和利用。加密不仅保护数据的机密性，还能在一定程度上保障完整性和不可否认性。</p>
              <ul className="list-disc pl-6">
                <li><b>机密性：</b>防止数据被未授权访问和泄露。</li>
                <li><b>完整性：</b>防止数据在传输或存储过程中被篡改。</li>
                <li><b>不可否认性：</b>确保数据发送者无法否认其行为（如数字签名）。</li>
                <li><b>加密与解密：</b>加密是将明文转换为密文，解密是将密文还原为明文。</li>
              </ul>
              <p>加密算法分为对称加密和非对称加密两大类，实际应用中常与哈希、数字签名等技术结合使用。</p>
            </div>
            {/* SVG结构图 */}
            <div className="flex justify-center mb-6">
              <svg width="520" height="100" viewBox="0 0 520 100">
                <rect x="20" y="30" width="100" height="40" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="2" rx="8" />
                <text x="70" y="55" fontSize="14" fill="#0ea5e9" textAnchor="middle">明文</text>
                <rect x="140" y="30" width="100" height="40" fill="#fce7f3" stroke="#ec4899" strokeWidth="2" rx="8" />
                <text x="190" y="55" fontSize="14" fill="#db2777" textAnchor="middle">加密算法</text>
                <rect x="260" y="30" width="100" height="40" fill="#fee2e2" stroke="#ef4444" strokeWidth="2" rx="8" />
                <text x="310" y="55" fontSize="14" fill="#ef4444" textAnchor="middle">密文</text>
                <rect x="380" y="30" width="100" height="40" fill="#fef9c3" stroke="#facc15" strokeWidth="2" rx="8" />
                <text x="430" y="55" fontSize="14" fill="#eab308" textAnchor="middle">解密算法</text>
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
                <li><b>明文：</b>未加密的原始数据。</li>
                <li><b>密文：</b>加密后的数据，无法直接读取。</li>
                <li><b>密钥：</b>加密和解密过程中使用的核心参数。</li>
                <li><b>加密算法：</b>实现加密和解密的数学方法，如AES、RSA等。</li>
                <li><b>哈希算法：</b>将任意长度数据映射为固定长度摘要，常用于完整性校验。</li>
                <li><b>数字签名：</b>用私钥对数据签名，验证数据来源和完整性。</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'types' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">加密类型与主流算法</h3>
            <div className="prose max-w-none mb-4">
              <ul className="list-disc pl-6">
                <li><b>对称加密：</b>加密和解密使用同一密钥，速度快，适合大数据量加密。典型算法：AES、DES、SM4。</li>
                <li><b>非对称加密：</b>加密和解密使用一对公私钥，适合密钥交换和数字签名。典型算法：RSA、ECC、SM2。</li>
                <li><b>哈希算法：</b>不可逆，常用于密码存储、完整性校验。典型算法：SHA-256、MD5、SM3。</li>
                <li><b>数字签名：</b>结合哈希和非对称加密，验证数据来源和完整性。典型算法：RSA签名、ECDSA。</li>
                <li><b>混合加密：</b>实际应用中常将对称和非对称加密结合，如SSL/TLS。</li>
              </ul>
              <p>加密算法的安全性依赖于密钥长度、算法设计和实现安全。弱算法（如MD5、DES）已不推荐使用。</p>
            </div>
            {/* 算法对比表格 */}
            <div className="overflow-x-auto my-2">
              <table className="min-w-full text-xs border">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border px-2 py-1">算法类型</th>
                    <th className="border px-2 py-1">代表算法</th>
                    <th className="border px-2 py-1">密钥管理</th>
                    <th className="border px-2 py-1">速度</th>
                    <th className="border px-2 py-1">典型用途</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border px-2 py-1">对称加密</td>
                    <td className="border px-2 py-1">AES、SM4</td>
                    <td className="border px-2 py-1">单密钥</td>
                    <td className="border px-2 py-1">快</td>
                    <td className="border px-2 py-1">数据加密</td>
                  </tr>
                  <tr>
                    <td className="border px-2 py-1">非对称加密</td>
                    <td className="border px-2 py-1">RSA、ECC、SM2</td>
                    <td className="border px-2 py-1">公私钥对</td>
                    <td className="border px-2 py-1">慢</td>
                    <td className="border px-2 py-1">密钥交换、签名</td>
                  </tr>
                  <tr>
                    <td className="border px-2 py-1">哈希</td>
                    <td className="border px-2 py-1">SHA-256、SM3</td>
                    <td className="border px-2 py-1">无</td>
                    <td className="border px-2 py-1">快</td>
                    <td className="border px-2 py-1">摘要、校验</td>
                  </tr>
                  <tr>
                    <td className="border px-2 py-1">数字签名</td>
                    <td className="border px-2 py-1">RSA签名、ECDSA</td>
                    <td className="border px-2 py-1">公私钥对</td>
                    <td className="border px-2 py-1">中</td>
                    <td className="border px-2 py-1">身份认证、不可否认</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'scenes' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">加密技术常见应用场景</h3>
            <div className="prose max-w-none mb-4">
              <ul className="list-disc pl-6">
                <li><b>数据传输加密：</b>如HTTPS、VPN、SSH，防止中间人窃听和篡改。</li>
                <li><b>数据存储加密：</b>如磁盘加密、数据库加密，防止数据泄露。</li>
                <li><b>密码存储：</b>使用哈希算法存储用户密码，防止明文泄露。</li>
                <li><b>数字签名与认证：</b>如电子合同、区块链、软件分发，验证数据来源和完整性。</li>
                <li><b>密钥交换与管理：</b>如SSL/TLS握手、VPN密钥协商，保障密钥安全。</li>
                <li><b>物联网与移动安全：</b>设备间通信、固件升级等均需加密保障。</li>
              </ul>
              <p>实际应用中，常需多种加密技术协同工作，形成完整的安全防护体系。</p>
            </div>
          </div>
        )}

        {activeTab === 'code' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">加密技术配置与代码示例</h3>
            <div className="space-y-4">
              {/* AES对称加密（Python） */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">1. AES对称加密（Python）</h4>
                <pre className="bg-white border rounded p-2 text-xs overflow-x-auto">{`from Crypto.Cipher import AES
from Crypto.Util.Padding import pad, unpad
import base64

key = b'Sixteen byte key'
data = b'Hello, encryption!'

cipher = AES.new(key, AES.MODE_CBC)
ct_bytes = cipher.encrypt(pad(data, AES.block_size))
iv = base64.b64encode(cipher.iv).decode('utf-8')
ct = base64.b64encode(ct_bytes).decode('utf-8')
print(f'密文: {ct}')

# 解密
cipher2 = AES.new(key, AES.MODE_CBC, iv=base64.b64decode(iv))
pt = unpad(cipher2.decrypt(base64.b64decode(ct)), AES.block_size)
print(f'明文: {pt.decode()}')`}</pre>
                <div className="text-xs text-gray-500 mt-1">说明：AES是现代主流对称加密算法，密钥长度常用128/192/256位。</div>
              </div>
              {/* RSA非对称加密（Python） */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">2. RSA非对称加密（Python）</h4>
                <pre className="bg-white border rounded p-2 text-xs overflow-x-auto">{`from Crypto.PublicKey import RSA
from Crypto.Cipher import PKCS1_OAEP
import base64

key = RSA.generate(2048)
public_key = key.publickey()

# 加密
cipher = PKCS1_OAEP.new(public_key)
ciphertext = cipher.encrypt(b'Hello, RSA!')
print('密文:', base64.b64encode(ciphertext).decode())

# 解密
cipher2 = PKCS1_OAEP.new(key)
plaintext = cipher2.decrypt(ciphertext)
print('明文:', plaintext.decode())`}</pre>
                <div className="text-xs text-gray-500 mt-1">说明：RSA常用于密钥交换、数字签名，密钥长度建议2048位及以上。</div>
              </div>
              {/* SHA-256哈希（Node.js） */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">3. SHA-256哈希（Node.js）</h4>
                <pre className="bg-white border rounded p-2 text-xs overflow-x-auto">{`const crypto = require('crypto');
const data = 'Hello, hash!';
const hash = crypto.createHash('sha256').update(data).digest('hex');
console.log('SHA-256:', hash);`}</pre>
                <div className="text-xs text-gray-500 mt-1">说明：哈希算法不可逆，常用于密码存储、完整性校验。</div>
              </div>
              {/* 数字签名（Python） */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">4. 数字签名与验证（Python）</h4>
                <pre className="bg-white border rounded p-2 text-xs overflow-x-auto">{`from Crypto.Signature import pkcs1_15
from Crypto.Hash import SHA256
from Crypto.PublicKey import RSA

key = RSA.generate(2048)
message = b'Important message'
h = SHA256.new(message)
signature = pkcs1_15.new(key).sign(h)

# 验证签名
try:
    pkcs1_15.new(key.publickey()).verify(h, signature)
    print('签名验证通过')
except (ValueError, TypeError):
    print('签名验证失败')`}</pre>
                <div className="text-xs text-gray-500 mt-1">说明：数字签名结合哈希和非对称加密，常用于身份认证和数据完整性验证。</div>
              </div>
              {/* OpenSSL命令行加密 */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">5. OpenSSL命令行加密</h4>
                <pre className="bg-white border rounded p-2 text-xs overflow-x-auto">{`# 生成RSA密钥对
openssl genrsa -out private.pem 2048
openssl rsa -in private.pem -pubout -out public.pem

# 使用公钥加密
openssl rsautl -encrypt -inkey public.pem -pubin -in msg.txt -out msg.enc

# 使用私钥解密
openssl rsautl -decrypt -inkey private.pem -in msg.enc -out msg.dec`}</pre>
                <div className="text-xs text-gray-500 mt-1">说明：OpenSSL是常用的加密工具，支持多种算法和证书管理。</div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'cases' && (
          <div className="space-y-8">
            <h3 className="text-xl font-semibold mb-3">加密技术实际案例</h3>
            {/* 案例1：明文传输导致数据泄露 */}
            <div className="bg-gray-50 p-5 rounded-lg shadow-sm">
              <h4 className="font-bold text-lg mb-2 text-blue-700">案例1：明文传输导致数据泄露</h4>
              <div className="mb-2 text-gray-700 text-sm">某公司网站登录接口未启用HTTPS，用户密码明文传输，被中间人窃听。</div>
              <div className="mb-2">
                <span className="font-semibold">攻击过程：</span>
                <ol className="list-decimal pl-6 text-sm space-y-1">
                  <li>攻击者在同一局域网内抓包，捕获到明文密码。</li>
                  <li>利用密码登录用户账户，窃取敏感信息。</li>
                </ol>
              </div>
              <div className="mb-2">
                <span className="font-semibold">修正建议：</span>
                <ul className="list-disc pl-6 text-sm">
                  <li>所有敏感数据传输必须启用HTTPS。</li>
                  <li>服务器端强制跳转HTTPS，禁止明文接口。</li>
                </ul>
              </div>
            </div>
            {/* 案例2：数据库未加密被脱库 */}
            <div className="bg-gray-50 p-5 rounded-lg shadow-sm">
              <h4 className="font-bold text-lg mb-2 text-green-700">案例2：数据库未加密被脱库</h4>
              <div className="mb-2 text-gray-700 text-sm">某企业数据库未加密存储用户信息，被黑客入侵后全部泄露。</div>
              <div className="mb-2">
                <span className="font-semibold">攻击过程：</span>
                <ol className="list-decimal pl-6 text-sm space-y-1">
                  <li>黑客利用漏洞入侵数据库服务器。</li>
                  <li>直接导出明文数据，造成大规模泄露。</li>
                </ol>
              </div>
              <div className="mb-2">
                <span className="font-semibold">修正建议：</span>
                <ul className="list-disc pl-6 text-sm">
                  <li>数据库敏感字段应加密存储。</li>
                  <li>定期审计数据库访问和加密配置。</li>
                </ul>
              </div>
            </div>
            {/* 案例3：弱加密算法被破解 */}
            <div className="bg-gray-50 p-5 rounded-lg shadow-sm">
              <h4 className="font-bold text-lg mb-2 text-red-700">案例3：弱加密算法被破解</h4>
              <div className="mb-2 text-gray-700 text-sm">某老旧系统仍在使用MD5和DES算法，攻击者利用彩虹表和暴力破解成功获取敏感数据。</div>
              <div className="mb-2">
                <span className="font-semibold">攻击过程：</span>
                <ol className="list-decimal pl-6 text-sm space-y-1">
                  <li>攻击者获取加密数据后，利用公开工具进行破解。</li>
                  <li>成功还原明文，造成数据泄露。</li>
                </ol>
              </div>
              <div className="mb-2">
                <span className="font-semibold">修正建议：</span>
                <ul className="list-disc pl-6 text-sm">
                  <li>淘汰MD5、DES等弱算法，升级为AES、SHA-256等安全算法。</li>
                  <li>加强密钥管理，定期更换密钥。</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'practice' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">加密技术最佳实践</h3>
            <ul className="list-disc pl-6 text-sm space-y-1">
              <li>优先选用业界公认的安全加密算法（如AES、RSA、SHA-256）。</li>
              <li>密钥长度足够，定期更换密钥，密钥绝不明文存储。</li>
              <li>敏感数据传输必须启用HTTPS/TLS。</li>
              <li>密码存储必须哈希加盐，禁止明文。</li>
              <li>淘汰MD5、DES等弱算法，及时升级系统。</li>
              <li>加密实现需防止侧信道攻击和代码漏洞。</li>
              <li>定期审计加密配置和密钥管理。</li>
              <li>重要系统建议引入硬件安全模块（HSM）。</li>
            </ul>
          </div>
        )}
      </div>

      {/* 底部导航 */}
      <div className="mt-8 flex justify-between">
        <Link 
          href="/study/security/protection/auth"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          ← 身份认证
        </Link>
        <Link 
          href="/study/security/protection/firewall"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          防火墙技术 →
        </Link>
      </div>
    </div>
  );
} 