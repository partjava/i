"use client";
import { useState } from "react";
import Link from "next/link";

export default function AsymmetricCryptoPage() {
  const [activeTab, setActiveTab] = useState("intro");

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">非对称加密</h1>
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
          常用算法
        </button>
        <button
          onClick={() => setActiveTab("key-exchange")}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === "key-exchange"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          密钥交换
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
            <h3 className="text-xl font-semibold mb-3">非对称加密基本概念</h3>
            <div className="prose max-w-none">
              <p className="mb-4">
                非对称加密（公钥加密）使用一对密钥：公钥和私钥。公钥可以公开，用于加密；私钥必须保密，用于解密。这种机制解决了密钥分发问题，但计算开销较大。
              </p>
              
              <h4 className="font-semibold mt-4">核心特点</h4>
              <ul className="list-disc pl-6 mb-4">
                <li>使用公钥加密，私钥解密</li>
                <li>公钥可以公开分发</li>
                <li>私钥必须严格保密</li>
                <li>计算开销较大，不适合大量数据加密</li>
                <li>常用于密钥交换和数字签名</li>
              </ul>

              <h4 className="font-semibold mt-4">基本流程</h4>
              <div className="my-8">
                <svg width="900" height="300" viewBox="0 0 900 300" className="w-full">
                  <defs>
                    <linearGradient id="asymmetricFlow" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#6366f1" />
                      <stop offset="100%" stopColor="#06b6d4" />
                    </linearGradient>
                  </defs>
                  {/* 发送方 */}
                  <rect x="50" y="50" width="120" height="40" rx="8" fill="#f3f4f6" stroke="#6366f1" />
                  <text x="110" y="75" textAnchor="middle" fill="#6366f1">发送方</text>
                  
                  <rect x="50" y="100" width="120" height="40" rx="8" fill="#f3f4f6" stroke="#6366f1" />
                  <text x="110" y="125" textAnchor="middle" fill="#6366f1">明文</text>
                  
                  <path d="M170 120 L 230 120" stroke="#6366f1" strokeWidth="2" />
                  <text x="200" y="110" textAnchor="middle" fill="#6366f1">公钥加密</text>
                  
                  <rect x="230" y="100" width="120" height="40" rx="8" fill="#f3f4f6" stroke="#6366f1" />
                  <text x="290" y="125" textAnchor="middle" fill="#6366f1">密文</text>
                  
                  <path d="M350 120 L 410 120" stroke="#6366f1" strokeWidth="2" />
                  <text x="380" y="110" textAnchor="middle" fill="#6366f1">传输</text>
                  
                  {/* 接收方 */}
                  <rect x="410" y="50" width="120" height="40" rx="8" fill="#f3f4f6" stroke="#06b6d4" />
                  <text x="470" y="75" textAnchor="middle" fill="#06b6d4">接收方</text>
                  
                  <rect x="410" y="100" width="120" height="40" rx="8" fill="#f3f4f6" stroke="#6366f1" />
                  <text x="470" y="125" textAnchor="middle" fill="#6366f1">密文</text>
                  
                  <path d="M530 120 L 590 120" stroke="#6366f1" strokeWidth="2" />
                  <text x="560" y="110" textAnchor="middle" fill="#6366f1">私钥解密</text>
                  
                  <rect x="590" y="100" width="120" height="40" rx="8" fill="#f3f4f6" stroke="#6366f1" />
                  <text x="650" y="125" textAnchor="middle" fill="#6366f1">明文</text>
                  
                  {/* 密钥对 */}
                  <rect x="350" y="180" width="120" height="40" rx="8" fill="#f3f4f6" stroke="#f59e42" />
                  <text x="410" y="205" textAnchor="middle" fill="#f59e42">公钥</text>
                  
                  <rect x="350" y="230" width="120" height="40" rx="8" fill="#f3f4f6" stroke="#f59e42" />
                  <text x="410" y="255" textAnchor="middle" fill="#f59e42">私钥</text>
                  
                  <path d="M410 220 L 410 230" stroke="#f59e42" strokeWidth="2" strokeDasharray="5,5" />
                  <path d="M410 270 L 410 140" stroke="#f59e42" strokeWidth="2" strokeDasharray="5,5" />
                </svg>
              </div>

              <h4 className="font-semibold mt-4">应用场景</h4>
              <ul className="list-disc pl-6 mb-4">
                <li>密钥交换（如TLS握手）</li>
                <li>数字签名</li>
                <li>身份认证</li>
                <li>证书颁发</li>
                <li>安全通信</li>
                <li>区块链技术</li>
              </ul>

              <h4 className="font-semibold mt-4">优缺点分析</h4>
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border p-2">类型</th>
                      <th className="border p-2">优点</th>
                      <th className="border p-2">缺点</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border p-2">密钥管理</td>
                      <td className="border p-2">无需安全通道传输密钥</td>
                      <td className="border p-2">私钥保护要求高</td>
                    </tr>
                    <tr>
                      <td className="border p-2">性能</td>
                      <td className="border p-2">适合密钥交换</td>
                      <td className="border p-2">计算开销大</td>
                    </tr>
                    <tr>
                      <td className="border p-2">安全性</td>
                      <td className="border p-2">基于数学难题</td>
                      <td className="border p-2">量子计算威胁</td>
                    </tr>
                    <tr>
                      <td className="border p-2">应用</td>
                      <td className="border p-2">功能丰富</td>
                      <td className="border p-2">实现复杂</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === "algorithms" && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">常用非对称加密算法</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold">1. RSA (Rivest-Shamir-Adleman)</h4>
              <ul className="list-disc pl-6 mb-4">
                <li>基于大数分解难题</li>
                <li>密钥长度：2048位（推荐）、4096位（高安全）</li>
                <li>应用：数字签名、密钥交换</li>
                <li>特点：实现简单，应用广泛</li>
              </ul>

              <h4 className="font-semibold">2. ECC (Elliptic Curve Cryptography)</h4>
              <ul className="list-disc pl-6 mb-4">
                <li>基于椭圆曲线离散对数问题</li>
                <li>密钥长度：256位（相当于RSA 3072位）</li>
                <li>应用：移动设备、物联网</li>
                <li>特点：密钥短，性能好</li>
              </ul>

              <h4 className="font-semibold">3. ElGamal</h4>
              <ul className="list-disc pl-6 mb-4">
                <li>基于离散对数问题</li>
                <li>密钥长度：2048位</li>
                <li>应用：数字签名、密钥交换</li>
                <li>特点：安全性好，但效率较低</li>
              </ul>

              <h4 className="font-semibold">4. DSA (Digital Signature Algorithm)</h4>
              <ul className="list-disc pl-6 mb-4">
                <li>基于离散对数问题</li>
                <li>密钥长度：2048位</li>
                <li>应用：数字签名</li>
                <li>特点：专门用于签名</li>
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
                      <td className="border p-2">2048/4096位</td>
                      <td className="border p-2">中</td>
                      <td className="border p-2">高</td>
                      <td className="border p-2">通用</td>
                    </tr>
                    <tr>
                      <td className="border p-2">ECC</td>
                      <td className="border p-2">256位</td>
                      <td className="border p-2">高</td>
                      <td className="border p-2">高</td>
                      <td className="border p-2">移动设备</td>
                    </tr>
                    <tr>
                      <td className="border p-2">ElGamal</td>
                      <td className="border p-2">2048位</td>
                      <td className="border p-2">低</td>
                      <td className="border p-2">高</td>
                      <td className="border p-2">特殊应用</td>
                    </tr>
                    <tr>
                      <td className="border p-2">DSA</td>
                      <td className="border p-2">2048位</td>
                      <td className="border p-2">中</td>
                      <td className="border p-2">高</td>
                      <td className="border p-2">签名</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h4 className="font-semibold mt-4">数学原理</h4>
              <div className="bg-gray-100 p-4 rounded-lg">
                <h5 className="font-semibold">RSA算法原理</h5>
                <ol className="list-decimal pl-6">
                  <li>选择两个大素数p和q</li>
                  <li>计算n = p &times; q</li>
                  <li>计算欧拉函数&phi;(n) = (p-1) &times; (q-1)</li>
                  <li>选择公钥e，满足1 &lt; e &lt; &phi;(n)且e与&phi;(n)互质</li>
                  <li>计算私钥d，满足d &times; e &equiv; 1 (mod &phi;(n))</li>
                  <li>加密：c = m^e mod n</li>
                  <li>解密：m = c^d mod n</li>
                </ol>

                <h5 className="font-semibold mt-4">ECC算法原理</h5>
                <ol className="list-decimal pl-6">
                  <li>选择椭圆曲线E和基点G</li>
                  <li>私钥d是随机数</li>
                  <li>公钥Q = d &times; G</li>
                  <li>加密：选择随机数k，计算C1 = k &times; G，C2 = M + k &times; Q</li>
                  <li>解密：M = C2 - d &times; C1</li>
                </ol>
              </div>
            </div>
          </div>
        )}

        {activeTab === "key-exchange" && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">密钥交换</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold">1. Diffie-Hellman密钥交换</h4>
              <ul className="list-disc pl-6 mb-4">
                <li>基于离散对数问题</li>
                <li>不需要预先共享密钥</li>
                <li>可以抵抗中间人攻击（配合认证）</li>
                <li>应用：TLS、SSH、IPsec</li>
              </ul>

              <h4 className="font-semibold">2. ECDH (Elliptic Curve Diffie-Hellman)</h4>
              <ul className="list-disc pl-6 mb-4">
                <li>基于椭圆曲线</li>
                <li>密钥长度短，性能好</li>
                <li>安全性高</li>
                <li>应用：移动设备、物联网</li>
              </ul>

              <h4 className="font-semibold">3. RSA密钥交换</h4>
              <ul className="list-disc pl-6 mb-4">
                <li>使用接收方公钥加密</li>
                <li>实现简单</li>
                <li>性能较差</li>
                <li>应用：早期TLS版本</li>
              </ul>

              <h4 className="font-semibold mt-4">密钥交换流程</h4>
              <div className="my-8">
                <svg width="900" height="300" viewBox="0 0 900 300" className="w-full">
                  <defs>
                    <linearGradient id="keyExchange" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#6366f1" />
                      <stop offset="100%" stopColor="#06b6d4" />
                    </linearGradient>
                  </defs>
                  {/* Alice */}
                  <rect x="50" y="50" width="120" height="40" rx="8" fill="#f3f4f6" stroke="#6366f1" />
                  <text x="110" y="75" textAnchor="middle" fill="#6366f1">Alice</text>
                  
                  <rect x="50" y="100" width="120" height="40" rx="8" fill="#f3f4f6" stroke="#6366f1" />
                  <text x="110" y="125" textAnchor="middle" fill="#6366f1">私钥a</text>
                  
                  <rect x="50" y="150" width="120" height="40" rx="8" fill="#f3f4f6" stroke="#6366f1" />
                  <text x="110" y="175" textAnchor="middle" fill="#6366f1">g^a</text>
                  
                  {/* Bob */}
                  <rect x="730" y="50" width="120" height="40" rx="8" fill="#f3f4f6" stroke="#06b6d4" />
                  <text x="790" y="75" textAnchor="middle" fill="#06b6d4">Bob</text>
                  
                  <rect x="730" y="100" width="120" height="40" rx="8" fill="#f3f4f6" stroke="#06b6d4" />
                  <text x="790" y="125" textAnchor="middle" fill="#06b6d4">私钥b</text>
                  
                  <rect x="730" y="150" width="120" height="40" rx="8" fill="#f3f4f6" stroke="#06b6d4" />
                  <text x="790" y="175" textAnchor="middle" fill="#06b6d4">g^b</text>
                  
                  {/* 交换过程 */}
                  <path d="M170 170 L 730 170" stroke="#6366f1" strokeWidth="2" />
                  <text x="450" y="160" textAnchor="middle" fill="#6366f1">交换g^a和g^b</text>
                  
                  {/* 共享密钥 */}
                  <rect x="350" y="230" width="200" height="40" rx="8" fill="#f3f4f6" stroke="#f59e42" />
                  <text x="450" y="255" textAnchor="middle" fill="#f59e42">共享密钥g^(ab)</text>
                </svg>
              </div>

              <h4 className="font-semibold mt-4">安全考虑</h4>
              <ul className="list-disc pl-6 mb-4">
                <li>使用足够大的密钥长度</li>
                <li>实现前向安全性</li>
                <li>防止中间人攻击</li>
                <li>定期更新密钥</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === "implementation" && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">实现示例</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold">1. Python实现RSA加密</h4>
              <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto mt-2">
                <code>{`from Crypto.PublicKey import RSA
from Crypto.Cipher import PKCS1_OAEP
from Crypto.Hash import SHA256
from Crypto.Signature import pkcs1_15
import base64

def generate_rsa_key():
    # 生成RSA密钥对
    key = RSA.generate(2048)
    private_key = key.export_key()
    public_key = key.publickey().export_key()
    return private_key, public_key

def encrypt_rsa(public_key, message):
    # 使用公钥加密
    key = RSA.import_key(public_key)
    cipher = PKCS1_OAEP.new(key)
    encrypted = cipher.encrypt(message.encode())
    return base64.b64encode(encrypted).decode()

def decrypt_rsa(private_key, encrypted):
    # 使用私钥解密
    key = RSA.import_key(private_key)
    cipher = PKCS1_OAEP.new(key)
    decrypted = cipher.decrypt(base64.b64decode(encrypted))
    return decrypted.decode()

def sign_rsa(private_key, message):
    # 使用私钥签名
    key = RSA.import_key(private_key)
    hash_obj = SHA256.new(message.encode())
    signature = pkcs1_15.new(key).sign(hash_obj)
    return base64.b64encode(signature).decode()

def verify_rsa(public_key, message, signature):
    # 使用公钥验证签名
    key = RSA.import_key(public_key)
    hash_obj = SHA256.new(message.encode())
    try:
        pkcs1_15.new(key).verify(hash_obj, base64.b64decode(signature))
        return True
    except (ValueError, TypeError):
        return False

# 使用示例
private_key, public_key = generate_rsa_key()
message = "Hello, World!"

# 加密解密
encrypted = encrypt_rsa(public_key, message)
decrypted = decrypt_rsa(private_key, encrypted)
print(f"原文: {message}")
print(f"密文: {encrypted}")
print(f"解密: {decrypted}")

# 签名验证
signature = sign_rsa(private_key, message)
is_valid = verify_rsa(public_key, message, signature)
print(f"签名: {signature}")
print(f"验证: {is_valid}")`}</code>
              </pre>

              <h4 className="font-semibold mt-4">2. Java实现RSA加密</h4>
              <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto mt-2">
                <code>{`import java.security.*;
import java.security.spec.*;
import javax.crypto.*;
import java.util.Base64;

public class RSAExample {
    public static void main(String[] args) throws Exception {
        // 生成密钥对
        KeyPairGenerator keyGen = KeyPairGenerator.getInstance("RSA");
        keyGen.initialize(2048);
        KeyPair pair = keyGen.generateKeyPair();
        PrivateKey privateKey = pair.getPrivate();
        PublicKey publicKey = pair.getPublic();

        // 加密
        Cipher cipher = Cipher.getInstance("RSA/ECB/OAEPWithSHA-256AndMGF1Padding");
        cipher.init(Cipher.ENCRYPT_MODE, publicKey);
        String message = "Hello, World!";
        byte[] encrypted = cipher.doFinal(message.getBytes());

        // 解密
        cipher.init(Cipher.DECRYPT_MODE, privateKey);
        byte[] decrypted = cipher.doFinal(encrypted);

        // 签名
        Signature signature = Signature.getInstance("SHA256withRSA");
        signature.initSign(privateKey);
        signature.update(message.getBytes());
        byte[] signatureBytes = signature.sign();

        // 验证签名
        signature.initVerify(publicKey);
        signature.update(message.getBytes());
        boolean isValid = signature.verify(signatureBytes);

        System.out.println("原文: " + message);
        System.out.println("密文: " + Base64.getEncoder().encodeToString(encrypted));
        System.out.println("解密: " + new String(decrypted));
        System.out.println("签名: " + Base64.getEncoder().encodeToString(signatureBytes));
        System.out.println("验证: " + isValid);
    }
}`}</code>
              </pre>

              <h4 className="font-semibold mt-4">3. OpenSSL命令行示例</h4>
              <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto mt-2">
                <code>{`# 生成RSA私钥
openssl genrsa -out private.pem 2048

# 从私钥生成公钥
openssl rsa -in private.pem -pubout -out public.pem

# 使用公钥加密
echo "Hello, World!" > message.txt
openssl pkeyutl -encrypt -pubin -inkey public.pem -in message.txt -out encrypted.bin

# 使用私钥解密
openssl pkeyutl -decrypt -inkey private.pem -in encrypted.bin -out decrypted.txt

# 使用私钥签名
openssl dgst -sha256 -sign private.pem -out signature.bin message.txt

# 使用公钥验证签名
openssl dgst -sha256 -verify public.pem -signature signature.bin message.txt`}</code>
              </pre>
            </div>
          </div>
        )}

        {activeTab === "security" && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">安全考虑</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold">1. 密钥管理</h4>
              <ul className="list-disc pl-6 mb-4">
                <li>私钥安全存储（HSM、TPM）</li>
                <li>密钥备份和恢复</li>
                <li>密钥轮换策略</li>
                <li>密钥撤销机制</li>
              </ul>

              <h4 className="font-semibold">2. 常见攻击</h4>
              <ul className="list-disc pl-6 mb-4">
                <li>中间人攻击</li>
                <li>重放攻击</li>
                <li>侧信道攻击</li>
                <li>量子计算威胁</li>
              </ul>

              <h4 className="font-semibold">3. 最佳实践</h4>
              <ul className="list-disc pl-6 mb-4">
                <li>使用足够长的密钥（RSA 2048位以上）</li>
                <li>实现前向安全性</li>
                <li>使用安全的随机数生成器</li>
                <li>实现完整性检查</li>
                <li>定期更新密钥</li>
              </ul>

              <h4 className="font-semibold">4. 性能优化</h4>
              <ul className="list-disc pl-6 mb-4">
                <li>使用硬件加速</li>
                <li>选择合适的算法（如ECC）</li>
                <li>实现缓存机制</li>
                <li>批量处理</li>
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
                      <td className="border p-2">RSA 2048位以上，ECC 256位</td>
                      <td className="border p-2">高</td>
                    </tr>
                    <tr>
                      <td className="border p-2">私钥保护</td>
                      <td className="border p-2">使用HSM或TPM</td>
                      <td className="border p-2">高</td>
                    </tr>
                    <tr>
                      <td className="border p-2">前向安全性</td>
                      <td className="border p-2">实现完美前向保密</td>
                      <td className="border p-2">高</td>
                    </tr>
                    <tr>
                      <td className="border p-2">密钥轮换</td>
                      <td className="border p-2">定期更换密钥</td>
                      <td className="border p-2">中</td>
                    </tr>
                    <tr>
                      <td className="border p-2">完整性验证</td>
                      <td className="border p-2">使用数字签名</td>
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
          href="/study/security/crypto/symmetric"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          ← 对称加密
        </Link>
        <Link
          href="/study/security/crypto/hash"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          哈希函数 →
        </Link>
      </div>
    </div>
  );
} 