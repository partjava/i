"use client";
import { useState } from "react";
import Link from "next/link";

export default function SymmetricCryptoPage() {
  const [activeTab, setActiveTab] = useState("intro");

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">对称加密</h1>
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
          onClick={() => setActiveTab("modes")}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === "modes"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          工作模式
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
            <h3 className="text-xl font-semibold mb-3">对称加密基本概念</h3>
            <div className="prose max-w-none">
              <p className="mb-4">
                对称加密是一种使用相同密钥进行加密和解密的加密方式。它的特点是加密和解密速度快，但密钥管理较为复杂。
              </p>
              
              <h4 className="font-semibold mt-4">核心特点</h4>
              <ul className="list-disc pl-6 mb-4">
                <li>使用相同的密钥进行加密和解密</li>
                <li>加密速度快，适合大量数据加密</li>
                <li>密钥管理复杂，需要安全传输密钥</li>
                <li>常见的密钥长度：128位、192位、256位</li>
              </ul>

              <h4 className="font-semibold mt-4">基本流程</h4>
              <div className="my-8">
                <svg width="900" height="200" viewBox="0 0 900 200" className="w-full">
                  <defs>
                    <linearGradient id="symmetricFlow" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#6366f1" />
                      <stop offset="100%" stopColor="#06b6d4" />
                    </linearGradient>
                  </defs>
                  {/* 流程图 */}
                  <rect x="50" y="80" width="120" height="40" rx="8" fill="#f3f4f6" stroke="#6366f1" />
                  <text x="110" y="105" textAnchor="middle" fill="#6366f1">明文</text>
                  
                  <path d="M170 100 L 230 100" stroke="#6366f1" strokeWidth="2" />
                  <text x="200" y="90" textAnchor="middle" fill="#6366f1">加密</text>
                  
                  <rect x="230" y="80" width="120" height="40" rx="8" fill="#f3f4f6" stroke="#6366f1" />
                  <text x="290" y="105" textAnchor="middle" fill="#6366f1">密文</text>
                  
                  <path d="M350 100 L 410 100" stroke="#6366f1" strokeWidth="2" />
                  <text x="380" y="90" textAnchor="middle" fill="#6366f1">传输</text>
                  
                  <rect x="410" y="80" width="120" height="40" rx="8" fill="#f3f4f6" stroke="#6366f1" />
                  <text x="470" y="105" textAnchor="middle" fill="#6366f1">密文</text>
                  
                  <path d="M530 100 L 590 100" stroke="#6366f1" strokeWidth="2" />
                  <text x="560" y="90" textAnchor="middle" fill="#6366f1">解密</text>
                  
                  <rect x="590" y="80" width="120" height="40" rx="8" fill="#f3f4f6" stroke="#6366f1" />
                  <text x="650" y="105" textAnchor="middle" fill="#6366f1">明文</text>
                  
                  {/* 密钥 */}
                  <rect x="350" y="20" width="120" height="40" rx="8" fill="#f3f4f6" stroke="#f59e42" />
                  <text x="410" y="45" textAnchor="middle" fill="#f59e42">密钥</text>
                  
                  <path d="M410 60 L 410 80" stroke="#f59e42" strokeWidth="2" strokeDasharray="5,5" />
                  <path d="M410 120 L 410 140" stroke="#f59e42" strokeWidth="2" strokeDasharray="5,5" />
                </svg>
              </div>

              <h4 className="font-semibold mt-4">应用场景</h4>
              <ul className="list-disc pl-6 mb-4">
                <li>文件加密存储</li>
                <li>数据库加密</li>
                <li>网络通信加密</li>
                <li>磁盘加密</li>
                <li>内存数据保护</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === "algorithms" && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">常用对称加密算法</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold">1. AES (Advanced Encryption Standard)</h4>
              <ul className="list-disc pl-6 mb-4">
                <li>密钥长度：128位、192位、256位</li>
                <li>分组长度：128位</li>
                <li>轮数：10轮(128位)、12轮(192位)、14轮(256位)</li>
                <li>安全性：目前最安全的对称加密算法之一</li>
              </ul>

              <h4 className="font-semibold">2. DES (Data Encryption Standard)</h4>
              <ul className="list-disc pl-6 mb-4">
                <li>密钥长度：56位（实际64位，8位用于奇偶校验）</li>
                <li>分组长度：64位</li>
                <li>轮数：16轮</li>
                <li>安全性：已不再安全，仅用于学习</li>
              </ul>

              <h4 className="font-semibold">3. 3DES (Triple DES)</h4>
              <ul className="list-disc pl-6 mb-4">
                <li>密钥长度：168位（实际192位）</li>
                <li>分组长度：64位</li>
                <li>原理：使用DES算法三次</li>
                <li>安全性：比DES更安全，但效率较低</li>
              </ul>

              <h4 className="font-semibold">4. ChaCha20</h4>
              <ul className="list-disc pl-6 mb-4">
                <li>密钥长度：256位</li>
                <li>分组长度：512位</li>
                <li>特点：软件实现效率高，适合移动设备</li>
                <li>应用：TLS 1.3、QUIC协议</li>
              </ul>

              <h4 className="font-semibold mt-4">算法比较</h4>
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border p-2">算法</th>
                      <th className="border p-2">密钥长度</th>
                      <th className="border p-2">分组长度</th>
                      <th className="border p-2">安全性</th>
                      <th className="border p-2">性能</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border p-2">AES</td>
                      <td className="border p-2">128/192/256位</td>
                      <td className="border p-2">128位</td>
                      <td className="border p-2">高</td>
                      <td className="border p-2">高</td>
                    </tr>
                    <tr>
                      <td className="border p-2">DES</td>
                      <td className="border p-2">56位</td>
                      <td className="border p-2">64位</td>
                      <td className="border p-2">低</td>
                      <td className="border p-2">中</td>
                    </tr>
                    <tr>
                      <td className="border p-2">3DES</td>
                      <td className="border p-2">168位</td>
                      <td className="border p-2">64位</td>
                      <td className="border p-2">中</td>
                      <td className="border p-2">低</td>
                    </tr>
                    <tr>
                      <td className="border p-2">ChaCha20</td>
                      <td className="border p-2">256位</td>
                      <td className="border p-2">512位</td>
                      <td className="border p-2">高</td>
                      <td className="border p-2">高</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === "modes" && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">工作模式</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold">1. ECB (Electronic Codebook)</h4>
              <ul className="list-disc pl-6 mb-4">
                <li>特点：简单，并行处理</li>
                <li>缺点：相同明文产生相同密文，容易受到重放攻击</li>
                <li>应用：不推荐用于实际应用</li>
              </ul>

              <h4 className="font-semibold">2. CBC (Cipher Block Chaining)</h4>
              <ul className="list-disc pl-6 mb-4">
                <li>特点：使用IV（初始化向量），每个块依赖前一个块</li>
                <li>优点：相同明文产生不同密文</li>
                <li>缺点：不能并行处理</li>
                <li>应用：广泛使用，如TLS</li>
              </ul>

              <h4 className="font-semibold">3. CTR (Counter)</h4>
              <ul className="list-disc pl-6 mb-4">
                <li>特点：使用计数器，可以并行处理</li>
                <li>优点：高效，安全性好</li>
                <li>应用：广泛使用，如AES-GCM</li>
              </ul>

              <h4 className="font-semibold">4. GCM (Galois/Counter Mode)</h4>
              <ul className="list-disc pl-6 mb-4">
                <li>特点：认证加密模式</li>
                <li>优点：同时提供加密和认证</li>
                <li>应用：TLS 1.2+、IPsec</li>
              </ul>

              <h4 className="font-semibold mt-4">工作模式比较</h4>
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border p-2">模式</th>
                      <th className="border p-2">并行性</th>
                      <th className="border p-2">认证</th>
                      <th className="border p-2">IV要求</th>
                      <th className="border p-2">应用场景</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border p-2">ECB</td>
                      <td className="border p-2">是</td>
                      <td className="border p-2">否</td>
                      <td className="border p-2">否</td>
                      <td className="border p-2">不推荐</td>
                    </tr>
                    <tr>
                      <td className="border p-2">CBC</td>
                      <td className="border p-2">否</td>
                      <td className="border p-2">否</td>
                      <td className="border p-2">是</td>
                      <td className="border p-2">通用</td>
                    </tr>
                    <tr>
                      <td className="border p-2">CTR</td>
                      <td className="border p-2">是</td>
                      <td className="border p-2">否</td>
                      <td className="border p-2">是</td>
                      <td className="border p-2">高性能</td>
                    </tr>
                    <tr>
                      <td className="border p-2">GCM</td>
                      <td className="border p-2">是</td>
                      <td className="border p-2">是</td>
                      <td className="border p-2">是</td>
                      <td className="border p-2">安全通信</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === "implementation" && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">实现示例</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold">1. Python实现AES加密</h4>
              <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto mt-2">
                <code>{`from Crypto.Cipher import AES
from Crypto.Random import get_random_bytes
from Crypto.Util.Padding import pad, unpad
import base64

def encrypt_aes(plaintext: str, key: bytes) -> tuple:
    # 生成随机IV
    iv = get_random_bytes(AES.block_size)
    # 创建AES加密器
    cipher = AES.new(key, AES.MODE_CBC, iv)
    # 加密数据
    padded_data = pad(plaintext.encode(), AES.block_size)
    ciphertext = cipher.encrypt(padded_data)
    # 返回IV和密文
    return iv, ciphertext

def decrypt_aes(iv: bytes, ciphertext: bytes, key: bytes) -> str:
    # 创建AES解密器
    cipher = AES.new(key, AES.MODE_CBC, iv)
    # 解密数据
    padded_plaintext = cipher.decrypt(ciphertext)
    # 去除填充
    plaintext = unpad(padded_plaintext, AES.block_size)
    return plaintext.decode()

# 使用示例
key = get_random_bytes(32)  # 256位密钥
message = "Hello, World!"
iv, encrypted = encrypt_aes(message, key)
decrypted = decrypt_aes(iv, encrypted, key)
print(f"原文: {message}")
print(f"密文: {base64.b64encode(encrypted).decode()}")
print(f"解密: {decrypted}")`}</code>
              </pre>

              <h4 className="font-semibold mt-4">2. Java实现AES加密</h4>
              <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto mt-2">
                <code>{`import javax.crypto.Cipher;
import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import javax.crypto.spec.IvParameterSpec;
import java.security.SecureRandom;
import java.util.Base64;

public class AESExample {
    public static void main(String[] args) throws Exception {
        // 生成密钥
        KeyGenerator keyGen = KeyGenerator.getInstance("AES");
        keyGen.init(256);
        SecretKey key = keyGen.generateKey();

        // 生成IV
        byte[] iv = new byte[16];
        new SecureRandom().nextBytes(iv);
        IvParameterSpec ivSpec = new IvParameterSpec(iv);

        // 加密
        Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
        cipher.init(Cipher.ENCRYPT_MODE, key, ivSpec);
        String message = "Hello, World!";
        byte[] encrypted = cipher.doFinal(message.getBytes());

        // 解密
        cipher.init(Cipher.DECRYPT_MODE, key, ivSpec);
        byte[] decrypted = cipher.doFinal(encrypted);

        System.out.println("原文: " + message);
        System.out.println("密文: " + Base64.getEncoder().encodeToString(encrypted));
        System.out.println("解密: " + new String(decrypted));
    }
}`}</code>
              </pre>

              <h4 className="font-semibold mt-4">3. OpenSSL命令行示例</h4>
              <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto mt-2">
                <code>{`# 生成随机密钥
openssl rand -hex 32 > key.txt

# 加密文件
openssl enc -aes-256-cbc -in plaintext.txt -out ciphertext.bin -K $(cat key.txt) -iv $(openssl rand -hex 16)

# 解密文件
openssl enc -aes-256-cbc -d -in ciphertext.bin -out decrypted.txt -K $(cat key.txt) -iv $(openssl rand -hex 16)

# 使用密码加密（更安全）
openssl enc -aes-256-cbc -salt -in plaintext.txt -out ciphertext.bin -pass pass:your_password

# 使用密码解密
openssl enc -aes-256-cbc -d -in ciphertext.bin -out decrypted.txt -pass pass:your_password`}</code>
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
                <li>使用安全的密钥生成方法</li>
                <li>定期轮换密钥</li>
                <li>安全存储密钥</li>
                <li>使用密钥派生函数（KDF）</li>
              </ul>

              <h4 className="font-semibold">2. 常见攻击</h4>
              <ul className="list-disc pl-6 mb-4">
                <li>重放攻击</li>
                <li>中间人攻击</li>
                <li>暴力破解</li>
                <li>侧信道攻击</li>
              </ul>

              <h4 className="font-semibold">3. 最佳实践</h4>
              <ul className="list-disc pl-6 mb-4">
                <li>使用强密钥（至少128位）</li>
                <li>使用安全的随机数生成器</li>
                <li>使用认证加密模式（如GCM）</li>
                <li>正确使用IV（随机且不重复）</li>
                <li>实现完整性检查</li>
              </ul>

              <h4 className="font-semibold">4. 性能优化</h4>
              <ul className="list-disc pl-6 mb-4">
                <li>使用硬件加速（如AES-NI）</li>
                <li>选择合适的加密模式</li>
                <li>批量处理数据</li>
                <li>使用并行处理</li>
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
                      <td className="border p-2">至少128位，推荐256位</td>
                      <td className="border p-2">高</td>
                    </tr>
                    <tr>
                      <td className="border p-2">加密模式</td>
                      <td className="border p-2">避免ECB，推荐GCM</td>
                      <td className="border p-2">高</td>
                    </tr>
                    <tr>
                      <td className="border p-2">IV管理</td>
                      <td className="border p-2">随机生成，不重复使用</td>
                      <td className="border p-2">高</td>
                    </tr>
                    <tr>
                      <td className="border p-2">密钥轮换</td>
                      <td className="border p-2">定期更换密钥</td>
                      <td className="border p-2">中</td>
                    </tr>
                    <tr>
                      <td className="border p-2">完整性验证</td>
                      <td className="border p-2">使用HMAC或认证加密</td>
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
          href="/study/security/crypto/basic"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          ← 密码学基础
        </Link>
        <Link
          href="/study/security/crypto/asymmetric"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          非对称加密 →
        </Link>
      </div>
    </div>
  );
} 