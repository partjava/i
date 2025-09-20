"use client";
import { useState } from "react";
import Link from "next/link";

export default function DigitalSignaturePage() {
  const [activeTab, setActiveTab] = useState("intro");

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">数字签名</h1>
      
      {/* 标签页导航 */}
      <div className="flex space-x-4 mb-6 border-b overflow-x-auto">
        <button
          onClick={() => setActiveTab("intro")}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === "intro"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          基本概念
        </button>
        <button
          onClick={() => setActiveTab("algorithms")}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === "algorithms"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          算法原理
        </button>
        <button
          onClick={() => setActiveTab("applications")}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === "applications"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          应用场景
        </button>
        <button
          onClick={() => setActiveTab("implementation")}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === "implementation"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          实现示例
        </button>
        <button
          onClick={() => setActiveTab("security")}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === "security"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          安全考虑
        </button>
      </div>

      {/* 内容区域 */}
      <div className="bg-white rounded-lg shadow-md p-6">
        {activeTab === "intro" && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">数字签名基本概念</h3>
            <div className="prose max-w-none">
              <p className="mb-4">
                数字签名是一种基于公钥密码学的技术，用于验证数字消息或文档的真实性和完整性。它提供了身份认证、数据完整性、不可否认性等安全特性。
              </p>

              <h4 className="font-semibold mt-4">核心特性</h4>
              <ul className="list-disc pl-6 mb-4">
                <li>身份认证：验证消息发送者的身份</li>
                <li>数据完整性：确保消息未被篡改</li>
                <li>不可否认性：发送者无法否认其签名</li>
                <li>时间戳：可以证明签名的时间</li>
                <li>可验证性：任何人都可以验证签名</li>
              </ul>

              <h4 className="font-semibold mt-4">数字签名工作流程</h4>
              <div className="my-8">
                <svg width="900" height="300" viewBox="0 0 900 300" className="w-full">
                  <defs>
                    <linearGradient id="signatureFlow" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#6366f1" />
                      <stop offset="100%" stopColor="#06b6d4" />
                    </linearGradient>
                  </defs>
                  
                  {/* 发送方 */}
                  <rect x="50" y="50" width="120" height="40" rx="8" fill="#f3f4f6" stroke="#6366f1" />
                  <text x="110" y="75" textAnchor="middle" fill="#6366f1">发送方</text>
                  
                  <rect x="50" y="100" width="120" height="40" rx="8" fill="#f3f4f6" stroke="#6366f1" />
                  <text x="110" y="125" textAnchor="middle" fill="#6366f1">原始消息</text>
                  
                  <path d="M170 120 L 230 120" stroke="#6366f1" strokeWidth="2" />
                  <text x="200" y="110" textAnchor="middle" fill="#6366f1">哈希</text>
                  
                  <rect x="230" y="100" width="120" height="40" rx="8" fill="#f3f4f6" stroke="#6366f1" />
                  <text x="290" y="125" textAnchor="middle" fill="#6366f1">消息摘要</text>
                  
                  <path d="M350 120 L 410 120" stroke="#6366f1" strokeWidth="2" />
                  <text x="380" y="110" textAnchor="middle" fill="#6366f1">私钥签名</text>
                  
                  <rect x="410" y="100" width="120" height="40" rx="8" fill="#f3f4f6" stroke="#6366f1" />
                  <text x="470" y="125" textAnchor="middle" fill="#6366f1">数字签名</text>
                  
                  {/* 接收方 */}
                  <rect x="410" y="50" width="120" height="40" rx="8" fill="#f3f4f6" stroke="#06b6d4" />
                  <text x="470" y="75" textAnchor="middle" fill="#06b6d4">接收方</text>
                  
                  <rect x="590" y="100" width="120" height="40" rx="8" fill="#f3f4f6" stroke="#6366f1" />
                  <text x="650" y="125" textAnchor="middle" fill="#6366f1">原始消息</text>
                  
                  <path d="M710 120 L 770 120" stroke="#6366f1" strokeWidth="2" />
                  <text x="740" y="110" textAnchor="middle" fill="#6366f1">哈希</text>
                  
                  <rect x="770" y="100" width="120" height="40" rx="8" fill="#f3f4f6" stroke="#6366f1" />
                  <text x="830" y="125" textAnchor="middle" fill="#6366f1">消息摘要</text>
                  
                  {/* 验证过程 */}
                  <path d="M530 120 L 590 120" stroke="#6366f1" strokeWidth="2" />
                  <text x="560" y="110" textAnchor="middle" fill="#6366f1">传输</text>
                  
                  <path d="M470 140 L 470 200" stroke="#6366f1" strokeWidth="2" />
                  <text x="450" y="170" textAnchor="middle" fill="#6366f1">公钥验证</text>
                  
                  {/* 密钥对 */}
                  <rect x="350" y="230" width="120" height="40" rx="8" fill="#f3f4f6" stroke="#f59e42" />
                  <text x="410" y="255" textAnchor="middle" fill="#f59e42">私钥</text>
                  
                  <rect x="350" y="180" width="120" height="40" rx="8" fill="#f3f4f6" stroke="#f59e42" />
                  <text x="410" y="205" textAnchor="middle" fill="#f59e42">公钥</text>
                </svg>
              </div>

              <h4 className="font-semibold mt-4">数字签名类型</h4>
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border p-2">类型</th>
                      <th className="border p-2">特点</th>
                      <th className="border p-2">应用场景</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border p-2">RSA签名</td>
                      <td className="border p-2">基于RSA算法，应用广泛</td>
                      <td className="border p-2">通用场景</td>
                    </tr>
                    <tr>
                      <td className="border p-2">DSA签名</td>
                      <td className="border p-2">专门用于数字签名</td>
                      <td className="border p-2">政府标准</td>
                    </tr>
                    <tr>
                      <td className="border p-2">ECDSA签名</td>
                      <td className="border p-2">基于椭圆曲线，效率高</td>
                      <td className="border p-2">移动设备</td>
                    </tr>
                    <tr>
                      <td className="border p-2">EdDSA签名</td>
                      <td className="border p-2">Edwards曲线，安全性高</td>
                      <td className="border p-2">新兴应用</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === "algorithms" && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">数字签名算法原理</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold">1. RSA签名</h4>
              <ul className="list-disc pl-6 mb-4">
                <li>基于RSA公钥加密算法</li>
                <li>使用私钥签名，公钥验证</li>
                <li>签名过程：
                  <ul className="list-disc pl-6">
                    <li>计算消息哈希值</li>
                    <li>使用私钥对哈希值进行加密</li>
                    <li>生成数字签名</li>
                  </ul>
                </li>
                <li>验证过程：
                  <ul className="list-disc pl-6">
                    <li>计算消息哈希值</li>
                    <li>使用公钥解密签名</li>
                    <li>比较两个哈希值</li>
                  </ul>
                </li>
              </ul>

              <h4 className="font-semibold">2. DSA签名</h4>
              <ul className="list-disc pl-6 mb-4">
                <li>基于离散对数问题</li>
                <li>专门用于数字签名</li>
                <li>签名过程：
                  <ul className="list-disc pl-6">
                    <li>生成随机数k</li>
                    <li>计算r = g^k mod p</li>
                    <li>计算s = k^(-1)(H(m) + xr) mod q</li>
                    <li>输出签名(r,s)</li>
                  </ul>
                </li>
                <li>验证过程：
                  <ul className="list-disc pl-6">
                    <li>计算w = s^(-1) mod q</li>
                    <li>计算u1 = H(m)w mod q</li>
                    <li>计算u2 = rw mod q</li>
                    <li>验证v = r</li>
                  </ul>
                </li>
              </ul>

              <h4 className="font-semibold">3. ECDSA签名</h4>
              <ul className="list-disc pl-6 mb-4">
                <li>基于椭圆曲线离散对数问题</li>
                <li>密钥长度短，效率高</li>
                <li>签名过程：
                  <ul className="list-disc pl-6">
                    <li>选择随机数k</li>
                    <li>计算点P = kG</li>
                    <li>计算r = Px mod n</li>
                    <li>计算s = k^(-1)(H(m) + dr) mod n</li>
                    <li>输出签名(r,s)</li>
                  </ul>
                </li>
                <li>验证过程：
                  <ul className="list-disc pl-6">
                    <li>计算w = s^(-1) mod n</li>
                    <li>计算u1 = H(m)w mod n</li>
                    <li>计算u2 = rw mod n</li>
                    <li>计算点P = u1G + u2Q</li>
                    <li>验证r = Px mod n</li>
                  </ul>
                </li>
              </ul>

              <h4 className="font-semibold mt-4">算法比较</h4>
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border p-2">算法</th>
                      <th className="border p-2">密钥长度</th>
                      <th className="border p-2">性能</th>
                      <th className="border p-2">安全性</th>
                      <th className="border p-2">应用场景</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border p-2">RSA</td>
                      <td className="border p-2">2048位</td>
                      <td className="border p-2">中</td>
                      <td className="border p-2">高</td>
                      <td className="border p-2">通用</td>
                    </tr>
                    <tr>
                      <td className="border p-2">DSA</td>
                      <td className="border p-2">2048位</td>
                      <td className="border p-2">中</td>
                      <td className="border p-2">高</td>
                      <td className="border p-2">政府</td>
                    </tr>
                    <tr>
                      <td className="border p-2">ECDSA</td>
                      <td className="border p-2">256位</td>
                      <td className="border p-2">高</td>
                      <td className="border p-2">高</td>
                      <td className="border p-2">移动</td>
                    </tr>
                    <tr>
                      <td className="border p-2">EdDSA</td>
                      <td className="border p-2">256位</td>
                      <td className="border p-2">高</td>
                      <td className="border p-2">高</td>
                      <td className="border p-2">新兴</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === "applications" && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">应用场景</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold">1. 数字证书</h4>
              <ul className="list-disc pl-6 mb-4">
                <li>SSL/TLS证书</li>
                <li>代码签名证书</li>
                <li>电子邮件证书</li>
                <li>身份证书</li>
              </ul>

              <h4 className="font-semibold">2. 软件分发</h4>
              <ul className="list-disc pl-6 mb-4">
                <li>代码签名</li>
                <li>软件更新验证</li>
                <li>驱动程序签名</li>
                <li>移动应用签名</li>
              </ul>

              <h4 className="font-semibold">3. 电子文档</h4>
              <ul className="list-disc pl-6 mb-4">
                <li>电子合同</li>
                <li>电子发票</li>
                <li>电子政务</li>
                <li>电子医疗记录</li>
              </ul>

              <h4 className="font-semibold">4. 区块链技术</h4>
              <ul className="list-disc pl-6 mb-4">
                <li>交易签名</li>
                <li>智能合约</li>
                <li>身份验证</li>
                <li>共识机制</li>
              </ul>

              <h4 className="font-semibold">5. 其他应用</h4>
              <ul className="list-disc pl-6 mb-4">
                <li>电子邮件签名</li>
                <li>时间戳服务</li>
                <li>安全通信</li>
                <li>身份认证</li>
              </ul>

              <h4 className="font-semibold mt-4">应用示例</h4>
              <div className="bg-gray-100 p-4 rounded-lg">
                <h5 className="font-semibold">SSL/TLS证书签名流程</h5>
                <ol className="list-decimal pl-6">
                  <li>生成证书请求（CSR）</li>
                  <li>CA验证申请者身份</li>
                  <li>CA使用私钥签名证书</li>
                  <li>颁发签名后的证书</li>
                  <li>客户端验证证书签名</li>
                </ol>

                <h5 className="font-semibold mt-4">代码签名流程</h5>
                <ol className="list-decimal pl-6">
                  <li>计算代码哈希值</li>
                  <li>使用私钥签名哈希值</li>
                  <li>将签名附加到代码中</li>
                  <li>用户下载时验证签名</li>
                  <li>确保代码未被篡改</li>
                </ol>
              </div>
            </div>
          </div>
        )}

        {activeTab === "implementation" && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">实现示例</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold">1. Python实现</h4>
              <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto mt-2">
                <code>{`from Crypto.PublicKey import RSA
from Crypto.Signature import pkcs1_15
from Crypto.Hash import SHA256
import base64

def generate_key_pair():
    """生成RSA密钥对"""
    key = RSA.generate(2048)
    private_key = key.export_key()
    public_key = key.publickey().export_key()
    return private_key, public_key

def sign_message(message: str, private_key: bytes) -> str:
    """使用RSA私钥签名消息"""
    key = RSA.import_key(private_key)
    hash_obj = SHA256.new(message.encode())
    signature = pkcs1_15.new(key).sign(hash_obj)
    return base64.b64encode(signature).decode()

def verify_signature(message: str, signature: str, public_key: bytes) -> bool:
    """使用RSA公钥验证签名"""
    key = RSA.import_key(public_key)
    hash_obj = SHA256.new(message.encode())
    try:
        pkcs1_15.new(key).verify(hash_obj, base64.b64decode(signature))
        return True
    except (ValueError, TypeError):
        return False

# 使用示例
if __name__ == "__main__":
    # 生成密钥对
    private_key, public_key = generate_key_pair()
    
    # 签名消息
    message = "Hello, World!"
    signature = sign_message(message, private_key)
    print(f"消息: {message}")
    print(f"签名: {signature}")
    
    # 验证签名
    is_valid = verify_signature(message, signature, public_key)
    print(f"验证结果: {is_valid}")
    
    # 尝试篡改消息
    tampered_message = "Hello, World!!"
    is_valid = verify_signature(tampered_message, signature, public_key)
    print(f"篡改后验证结果: {is_valid}")`}</code>
              </pre>

              <h4 className="font-semibold mt-4">2. Java实现</h4>
              <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto mt-2">
                <code>{`import java.security.*;
import java.security.spec.*;
import java.util.Base64;

public class DigitalSignatureExample {
    public static void main(String[] args) throws Exception {
        // 生成密钥对
        KeyPairGenerator keyGen = KeyPairGenerator.getInstance("RSA");
        keyGen.initialize(2048);
        KeyPair pair = keyGen.generateKeyPair();
        PrivateKey privateKey = pair.getPrivate();
        PublicKey publicKey = pair.getPublic();
        
        // 签名消息
        String message = "Hello, World!";
        Signature signature = Signature.getInstance("SHA256withRSA");
        signature.initSign(privateKey);
        signature.update(message.getBytes());
        byte[] signatureBytes = signature.sign();
        
        // 验证签名
        signature.initVerify(publicKey);
        signature.update(message.getBytes());
        boolean isValid = signature.verify(signatureBytes);
        
        System.out.println("消息: " + message);
        System.out.println("签名: " + Base64.getEncoder().encodeToString(signatureBytes));
        System.out.println("验证结果: " + isValid);
        
        // 尝试篡改消息
        String tamperedMessage = "Hello, World!!";
        signature.initVerify(publicKey);
        signature.update(tamperedMessage.getBytes());
        boolean isTamperedValid = signature.verify(signatureBytes);
        System.out.println("篡改后验证结果: " + isTamperedValid);
    }
}`}</code>
              </pre>

              <h4 className="font-semibold mt-4">3. OpenSSL命令行示例</h4>
              <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto mt-2">
                <code>{`# 生成RSA私钥
openssl genrsa -out private.pem 2048

# 从私钥生成公钥
openssl rsa -in private.pem -pubout -out public.pem

# 创建要签名的文件
echo "Hello, World!" > message.txt

# 使用私钥签名
openssl dgst -sha256 -sign private.pem -out signature.bin message.txt

# 使用公钥验证签名
openssl dgst -sha256 -verify public.pem -signature signature.bin message.txt

# 查看签名内容（Base64编码）
openssl base64 -in signature.bin -out signature.txt`}</code>
              </pre>
            </div>
          </div>
        )}

        {activeTab === "security" && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">安全考虑</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold">1. 常见攻击</h4>
              <ul className="list-disc pl-6 mb-4">
                <li>私钥泄露：攻击者获取私钥</li>
                <li>重放攻击：重复使用有效签名</li>
                <li>中间人攻击：拦截和修改通信</li>
                <li>伪造攻击：生成虚假签名</li>
                <li>量子计算威胁：破解现有算法</li>
              </ul>

              <h4 className="font-semibold">2. 防护措施</h4>
              <ul className="list-disc pl-6 mb-4">
                <li>使用足够长的密钥（RSA 2048位以上）</li>
                <li>安全存储私钥（HSM、TPM）</li>
                <li>使用时间戳防止重放</li>
                <li>实现证书撤销机制</li>
                <li>定期更新密钥对</li>
              </ul>

              <h4 className="font-semibold">3. 最佳实践</h4>
              <ul className="list-disc pl-6 mb-4">
                <li>使用安全的哈希算法（SHA-256或更高）</li>
                <li>实现完整的证书链验证</li>
                <li>使用安全的随机数生成器</li>
                <li>实现签名时间戳</li>
                <li>定期更新签名算法</li>
              </ul>

              <h4 className="font-semibold mt-4">安全检查清单</h4>
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border p-2">检查项</th>
                      <th className="border p-2">说明</th>
                      <th className="border p-2">重要性</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border p-2">密钥长度</td>
                      <td className="border p-2">RSA 2048位以上</td>
                      <td className="border p-2">高</td>
                    </tr>
                    <tr>
                      <td className="border p-2">私钥保护</td>
                      <td className="border p-2">使用HSM或TPM</td>
                      <td className="border p-2">高</td>
                    </tr>
                    <tr>
                      <td className="border p-2">哈希算法</td>
                      <td className="border p-2">SHA-256或更高</td>
                      <td className="border p-2">高</td>
                    </tr>
                    <tr>
                      <td className="border p-2">时间戳</td>
                      <td className="border p-2">防止重放攻击</td>
                      <td className="border p-2">高</td>
                    </tr>
                    <tr>
                      <td className="border p-2">证书验证</td>
                      <td className="border p-2">完整证书链验证</td>
                      <td className="border p-2">高</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 底部导航 */}
      <div className="mt-8 flex justify-between">
        <Link
          href="/study/security/crypto/hash"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          ← 哈希函数
        </Link>
        <Link
          href="/study/security/crypto/key"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          密钥管理 →
        </Link>
      </div>
    </div>
  );
} 