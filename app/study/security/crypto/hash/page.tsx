"use client";
import { useState } from "react";
import Link from "next/link";

export default function HashFunctionPage() {
  const [activeTab, setActiveTab] = useState("intro");

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">哈希函数</h1>
      
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
            <h3 className="text-xl font-semibold mb-3">哈希函数基本概念</h3>
            <div className="prose max-w-none">
              <p className="mb-4">
                哈希函数是一种将任意长度的输入数据映射为固定长度输出的数学函数。它具有单向性、确定性、抗碰撞性等特性，是密码学中的重要基础工具。
              </p>

              <h4 className="font-semibold mt-4">核心特性</h4>
              <ul className="list-disc pl-6 mb-4">
                <li>单向性：从哈希值无法反推出原始输入</li>
                <li>确定性：相同输入总是产生相同输出</li>
                <li>抗碰撞性：难以找到两个不同的输入产生相同的哈希值</li>
                <li>雪崩效应：输入的任何微小变化都会导致输出的巨大变化</li>
                <li>固定长度输出：无论输入长度如何，输出长度固定</li>
              </ul>

              <h4 className="font-semibold mt-4">哈希函数工作流程</h4>
              <div className="my-8">
                <svg width="900" height="200" viewBox="0 0 900 200" className="w-full">
                  <defs>
                    <linearGradient id="hashFlow" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#6366f1" />
                      <stop offset="100%" stopColor="#06b6d4" />
                    </linearGradient>
                  </defs>
                  
                  {/* 输入数据 */}
                  <rect x="50" y="50" width="200" height="40" rx="8" fill="#f3f4f6" stroke="#6366f1" />
                  <text x="150" y="75" textAnchor="middle" fill="#6366f1">任意长度输入数据</text>
                  
                  {/* 哈希函数 */}
                  <rect x="300" y="30" width="200" height="80" rx="8" fill="#f3f4f6" stroke="#6366f1" />
                  <text x="400" y="75" textAnchor="middle" fill="#6366f1">哈希函数</text>
                  
                  {/* 输出哈希值 */}
                  <rect x="550" y="50" width="200" height="40" rx="8" fill="#f3f4f6" stroke="#06b6d4" />
                  <text x="650" y="75" textAnchor="middle" fill="#06b6d4">固定长度哈希值</text>
                  
                  {/* 连接箭头 */}
                  <path d="M250 70 L 300 70" stroke="#6366f1" strokeWidth="2" />
                  <path d="M500 70 L 550 70" stroke="#6366f1" strokeWidth="2" />
                </svg>
              </div>

              <h4 className="font-semibold mt-4">哈希函数分类</h4>
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
                      <td className="border p-2">密码学哈希函数</td>
                      <td className="border p-2">安全性高，计算复杂</td>
                      <td className="border p-2">数字签名、密码存储</td>
                    </tr>
                    <tr>
                      <td className="border p-2">非密码学哈希函数</td>
                      <td className="border p-2">计算快速，安全性较低</td>
                      <td className="border p-2">数据校验、查找表</td>
                    </tr>
                    <tr>
                      <td className="border p-2">消息认证码</td>
                      <td className="border p-2">带密钥的哈希函数</td>
                      <td className="border p-2">消息认证、完整性验证</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === "algorithms" && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">常用哈希算法</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold">1. SHA-2 系列</h4>
              <ul className="list-disc pl-6 mb-4">
                <li>SHA-256：输出256位（32字节）</li>
                <li>SHA-384：输出384位（48字节）</li>
                <li>SHA-512：输出512位（64字节）</li>
                <li>特点：安全性高，应用广泛</li>
                <li>应用：数字签名、证书、区块链</li>
              </ul>

              <h4 className="font-semibold">2. SHA-3 系列</h4>
              <ul className="list-disc pl-6 mb-4">
                <li>SHA3-224：输出224位</li>
                <li>SHA3-256：输出256位</li>
                <li>SHA3-384：输出384位</li>
                <li>SHA3-512：输出512位</li>
                <li>特点：基于海绵结构，抗量子计算</li>
              </ul>

              <h4 className="font-semibold">3. MD5（不推荐使用）</h4>
              <ul className="list-disc pl-6 mb-4">
                <li>输出128位（16字节）</li>
                <li>已被证明不安全</li>
                <li>仅用于非安全场景</li>
              </ul>

              <h4 className="font-semibold">4. RIPEMD-160</h4>
              <ul className="list-disc pl-6 mb-4">
                <li>输出160位（20字节）</li>
                <li>主要用于比特币地址生成</li>
                <li>安全性较好</li>
              </ul>

              <h4 className="font-semibold mt-4">算法比较</h4>
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border p-2">算法</th>
                      <th className="border p-2">输出长度</th>
                      <th className="border p-2">安全性</th>
                      <th className="border p-2">性能</th>
                      <th className="border p-2">应用场景</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border p-2">SHA-256</td>
                      <td className="border p-2">256位</td>
                      <td className="border p-2">高</td>
                      <td className="border p-2">中</td>
                      <td className="border p-2">通用</td>
                    </tr>
                    <tr>
                      <td className="border p-2">SHA-512</td>
                      <td className="border p-2">512位</td>
                      <td className="border p-2">高</td>
                      <td className="border p-2">低</td>
                      <td className="border p-2">高安全</td>
                    </tr>
                    <tr>
                      <td className="border p-2">SHA3-256</td>
                      <td className="border p-2">256位</td>
                      <td className="border p-2">高</td>
                      <td className="border p-2">中</td>
                      <td className="border p-2">抗量子</td>
                    </tr>
                    <tr>
                      <td className="border p-2">MD5</td>
                      <td className="border p-2">128位</td>
                      <td className="border p-2">低</td>
                      <td className="border p-2">高</td>
                      <td className="border p-2">校验</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h4 className="font-semibold mt-4">算法原理</h4>
              <div className="bg-gray-100 p-4 rounded-lg">
                <h5 className="font-semibold">SHA-256 工作原理</h5>
                <ol className="list-decimal pl-6">
                  <li>消息填充：将输入数据填充到512位的倍数</li>
                  <li>消息分块：将填充后的消息分成512位的块</li>
                  <li>初始化哈希值：使用固定的初始值</li>
                  <li>主循环：对每个消息块进行处理
                    <ul className="list-disc pl-6">
                      <li>消息扩展：将16个32位字扩展为64个32位字</li>
                      <li>压缩函数：使用8个32位变量进行压缩</li>
                      <li>状态更新：更新哈希值</li>
                    </ul>
                  </li>
                  <li>输出：最终的哈希值</li>
                </ol>
              </div>
            </div>
          </div>
        )}

        {activeTab === "applications" && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">应用场景</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold">1. 密码存储</h4>
              <ul className="list-disc pl-6 mb-4">
                <li>密码哈希存储</li>
                <li>加盐哈希</li>
                <li>密钥派生函数（PBKDF2、bcrypt、Argon2）</li>
                <li>防止密码泄露</li>
              </ul>

              <h4 className="font-semibold">2. 数字签名</h4>
              <ul className="list-disc pl-6 mb-4">
                <li>消息摘要生成</li>
                <li>签名验证</li>
                <li>证书签名</li>
                <li>代码签名</li>
              </ul>

              <h4 className="font-semibold">3. 数据完整性</h4>
              <ul className="list-disc pl-6 mb-4">
                <li>文件校验</li>
                <li>下载验证</li>
                <li>数据备份验证</li>
                <li>区块链交易验证</li>
              </ul>

              <h4 className="font-semibold">4. 区块链技术</h4>
              <ul className="list-disc pl-6 mb-4">
                <li>区块哈希</li>
                <li>默克尔树</li>
                <li>工作量证明</li>
                <li>地址生成</li>
              </ul>

              <h4 className="font-semibold">5. 其他应用</h4>
              <ul className="list-disc pl-6 mb-4">
                <li>消息认证码（HMAC）</li>
                <li>随机数生成</li>
                <li>数据去重</li>
                <li>布隆过滤器</li>
              </ul>

              <h4 className="font-semibold mt-4">应用示例</h4>
              <div className="bg-gray-100 p-4 rounded-lg">
                <h5 className="font-semibold">密码存储流程</h5>
                <ol className="list-decimal pl-6">
                  <li>用户注册时输入密码</li>
                  <li>生成随机盐值</li>
                  <li>将密码和盐值组合</li>
                  <li>使用PBKDF2等算法进行多次哈希</li>
                  <li>存储哈希值和盐值</li>
                  <li>验证时重复相同过程</li>
                </ol>

                <h5 className="font-semibold mt-4">数字签名流程</h5>
                <ol className="list-decimal pl-6">
                  <li>计算消息的哈希值</li>
                  <li>使用私钥对哈希值进行签名</li>
                  <li>将签名附加到消息中</li>
                  <li>验证时重新计算哈希值</li>
                  <li>使用公钥验证签名</li>
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
                <code>{`import hashlib
import hmac
import os
from typing import Tuple

def hash_message(message: str, algorithm: str = 'sha256') -> str:
    """计算消息的哈希值"""
    hash_obj = hashlib.new(algorithm)
    hash_obj.update(message.encode())
    return hash_obj.hexdigest()

def generate_salt(length: int = 16) -> bytes:
    """生成随机盐值"""
    return os.urandom(length)

def hash_password(password: str, salt: bytes = None) -> Tuple[str, bytes]:
    """使用PBKDF2进行密码哈希"""
    if salt is None:
        salt = generate_salt()
    
    # 使用PBKDF2进行密码哈希
    key = hashlib.pbkdf2_hmac(
        'sha256',
        password.encode(),
        salt,
        100000,  # 迭代次数
        32  # 输出长度
    )
    return key.hex(), salt

def verify_password(password: str, stored_hash: str, salt: bytes) -> bool:
    """验证密码"""
    key, _ = hash_password(password, salt)
    return key == stored_hash

def create_hmac(message: str, key: bytes) -> str:
    """创建HMAC"""
    h = hmac.new(key, message.encode(), hashlib.sha256)
    return h.hexdigest()

def verify_hmac(message: str, key: bytes, hmac_value: str) -> bool:
    """验证HMAC"""
    return create_hmac(message, key) == hmac_value

# 使用示例
if __name__ == "__main__":
    # 计算消息哈希
    message = "Hello, World!"
    hash_value = hash_message(message)
    print(f"消息哈希: {hash_value}")
    
    # 密码哈希
    password = "mysecretpassword"
    hashed_password, salt = hash_password(password)
    print(f"密码哈希: {hashed_password}")
    print(f"盐值: {salt.hex()}")
    
    # 验证密码
    is_valid = verify_password(password, hashed_password, salt)
    print(f"密码验证: {is_valid}")
    
    # HMAC
    key = os.urandom(32)
    hmac_value = create_hmac(message, key)
    print(f"HMAC: {hmac_value}")
    print(f"HMAC验证: {verify_hmac(message, key, hmac_value)}")`}</code>
              </pre>

              <h4 className="font-semibold mt-4">2. Java实现</h4>
              <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto mt-2">
                <code>{`import java.security.*;
import java.security.spec.*;
import javax.crypto.*;
import javax.crypto.spec.*;
import java.util.Base64;

public class HashExample {
    public static void main(String[] args) throws Exception {
        // 计算消息哈希
        String message = "Hello, World!";
        MessageDigest digest = MessageDigest.getInstance("SHA-256");
        byte[] hash = digest.digest(message.getBytes());
        System.out.println("消息哈希: " + Base64.getEncoder().encodeToString(hash));
        
        // 密码哈希
        String password = "mysecretpassword";
        SecureRandom random = new SecureRandom();
        byte[] salt = new byte[16];
        random.nextBytes(salt);
        
        // 使用PBKDF2
        PBEKeySpec spec = new PBEKeySpec(
            password.toCharArray(),
            salt,
            100000,  // 迭代次数
            256  // 密钥长度
        );
        SecretKeyFactory factory = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA256");
        byte[] hashedPassword = factory.generateSecret(spec).getEncoded();
        System.out.println("密码哈希: " + Base64.getEncoder().encodeToString(hashedPassword));
        System.out.println("盐值: " + Base64.getEncoder().encodeToString(salt));
        
        // HMAC
        Mac hmac = Mac.getInstance("HmacSHA256");
        SecretKey key = new SecretKeySpec(salt, "HmacSHA256");
        hmac.init(key);
        byte[] hmacValue = hmac.doFinal(message.getBytes());
        System.out.println("HMAC: " + Base64.getEncoder().encodeToString(hmacValue));
    }
}`}</code>
              </pre>

              <h4 className="font-semibold mt-4">3. OpenSSL命令行示例</h4>
              <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto mt-2">
                <code>{`# 计算文件哈希
openssl dgst -sha256 file.txt

# 计算字符串哈希
echo -n "Hello, World!" | openssl dgst -sha256

# 生成随机盐值
openssl rand -hex 16

# 使用PBKDF2进行密码哈希
openssl enc -aes-256-cbc -pbkdf2 -salt -in file.txt -out file.enc

# 计算HMAC
echo -n "Hello, World!" | openssl dgst -sha256 -hmac "secret"`}</code>
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
                <li>碰撞攻击：找到两个不同的输入产生相同的哈希值</li>
                <li>彩虹表攻击：使用预计算的哈希值表进行破解</li>
                <li>暴力破解：尝试所有可能的输入</li>
                <li>长度扩展攻击：在不知道原始输入的情况下扩展哈希值</li>
              </ul>

              <h4 className="font-semibold">2. 防护措施</h4>
              <ul className="list-disc pl-6 mb-4">
                <li>使用足够长的哈希值（至少256位）</li>
                <li>使用安全的哈希算法（SHA-256、SHA-3等）</li>
                <li>密码存储时使用盐值</li>
                <li>使用密钥派生函数（PBKDF2、bcrypt、Argon2）</li>
                <li>增加迭代次数</li>
              </ul>

              <h4 className="font-semibold">3. 最佳实践</h4>
              <ul className="list-disc pl-6 mb-4">
                <li>避免使用MD5、SHA-1等不安全的算法</li>
                <li>密码存储使用专门的密码哈希函数</li>
                <li>使用HMAC进行消息认证</li>
                <li>定期更新哈希算法</li>
                <li>实现完整性检查</li>
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
                      <td className="border p-2">算法选择</td>
                      <td className="border p-2">使用SHA-256或更高版本</td>
                      <td className="border p-2">高</td>
                    </tr>
                    <tr>
                      <td className="border p-2">盐值使用</td>
                      <td className="border p-2">每个密码使用唯一盐值</td>
                      <td className="border p-2">高</td>
                    </tr>
                    <tr>
                      <td className="border p-2">迭代次数</td>
                      <td className="border p-2">至少100,000次</td>
                      <td className="border p-2">高</td>
                    </tr>
                    <tr>
                      <td className="border p-2">密钥长度</td>
                      <td className="border p-2">至少256位</td>
                      <td className="border p-2">高</td>
                    </tr>
                    <tr>
                      <td className="border p-2">完整性验证</td>
                      <td className="border p-2">使用HMAC或数字签名</td>
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
          href="/study/security/crypto/asymmetric"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          ← 非对称加密
        </Link>
        <Link
          href="/study/security/crypto/signature"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          数字签名 →
        </Link>
      </div>
    </div>
  );
} 