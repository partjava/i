"use client";
import { useState } from "react";
import Link from "next/link";

export default function CryptoBasicPage() {
  const [activeTab, setActiveTab] = useState("intro");

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">密码学基础</h1>
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
          onClick={() => setActiveTab("history")}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === "history"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          发展历史
        </button>
        <button
          onClick={() => setActiveTab("branch")}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === "branch"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          主要分支
        </button>
        <button
          onClick={() => setActiveTab("terms")}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === "terms"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          常用术语
        </button>
        <button
          onClick={() => setActiveTab("application")}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === "application"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          应用场景
        </button>
      </div>
      {/* 内容区域 */}
      <div className="bg-white rounded-lg shadow-md p-6">
        {activeTab === "intro" && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">密码学基本概念</h3>
            <div className="prose max-w-none">
              <p>
                密码学是研究信息加密、解密、认证、完整性保护等技术的科学，旨在保障信息的机密性、完整性、可用性和不可否认性。现代密码学不仅关注加密算法，还包括协议设计、密钥管理、攻击与防御等内容。
              </p>
              <ul>
                <li>机密性：防止信息被未授权者获取</li>
                <li>完整性：防止信息被篡改</li>
                <li>认证性：验证信息来源和身份</li>
                <li>不可否认性：防止事后否认行为</li>
              </ul>
              <h4 className="font-semibold mt-4">生活中的密码学案例</h4>
              <ul>
                <li>微信/支付宝支付短信验证码</li>
                <li>HTTPS加密访问网站</li>
                <li>数字签名的电子合同</li>
                <li>区块链中的哈希算法</li>
              </ul>
            </div>
          </div>
        )}
        {activeTab === "history" && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">密码学发展历史</h3>
            <div className="prose max-w-none">
              <ol className="list-decimal pl-6">
                <li>古典密码学：如凯撒密码、维吉尼亚密码、恩尼格玛机</li>
                <li>二战后现代密码学：香农信息论、DES、RSA等算法诞生</li>
                <li>公钥密码学：Diffie-Hellman密钥交换、椭圆曲线密码学</li>
                <li>互联网时代：SSL/TLS、区块链、零知识证明等新技术</li>
              </ol>
              <h4 className="font-semibold mt-4">密码学发展时间线</h4>
              <div className="my-8">
                <svg width="900" height="120" viewBox="0 0 900 120" className="w-full">
                  <defs>
                    <linearGradient id="cryptoTimeline" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#6366f1" />
                      <stop offset="100%" stopColor="#06b6d4" />
                    </linearGradient>
                  </defs>
                  <rect x="60" y="50" width="780" height="8" rx="4" fill="url(#cryptoTimeline)" />
                  {/* 关键节点 */}
                  <circle cx="100" cy="54" r="12" fill="#6366f1" />
                  <text x="100" y="90" textAnchor="middle" fill="#6366f1" fontSize="14">古典</text>
                  <circle cx="300" cy="54" r="12" fill="#06b6d4" />
                  <text x="300" y="90" textAnchor="middle" fill="#06b6d4" fontSize="14">现代</text>
                  <circle cx="500" cy="54" r="12" fill="#fbbf24" />
                  <text x="500" y="90" textAnchor="middle" fill="#fbbf24" fontSize="14">公钥</text>
                  <circle cx="700" cy="54" r="12" fill="#f472b6" />
                  <text x="700" y="90" textAnchor="middle" fill="#f472b6" fontSize="14">互联网</text>
                  <circle cx="820" cy="54" r="12" fill="#34d399" />
                  <text x="820" y="90" textAnchor="middle" fill="#34d399" fontSize="14">前沿</text>
                </svg>
              </div>
            </div>
          </div>
        )}
        {activeTab === "branch" && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">密码学主要分支</h3>
            <div className="prose max-w-none">
              <ul>
                <li><b>对称加密：</b> 加密和解密使用同一密钥，如AES、DES</li>
                <li><b>非对称加密：</b> 使用公钥和私钥，如RSA、ECC</li>
                <li><b>哈希函数：</b> 单向散列算法，如SHA-256、MD5</li>
                <li><b>数字签名：</b> 验证数据完整性和身份，如DSA、ECDSA</li>
                <li><b>密钥交换协议：</b> 安全协商密钥，如Diffie-Hellman</li>
                <li><b>零知识证明：</b> 不泄露秘密的情况下证明某事</li>
                <li><b>密码协议与应用：</b> SSL/TLS、区块链、数字货币等</li>
              </ul>
              <h4 className="font-semibold mt-4">分支结构图</h4>
              <div className="my-8">
                <svg width="900" height="220" viewBox="0 0 900 220" className="w-full">
                  <defs>
                    <linearGradient id="cryptoBranch" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#06b6d4" />
                      <stop offset="100%" stopColor="#6366f1" />
                    </linearGradient>
                  </defs>
                  {/* 主干 */}
                  <rect x="440" y="30" width="20" height="160" rx="10" fill="url(#cryptoBranch)" />
                  {/* 分支 */}
                  <rect x="460" y="50" width="180" height="16" rx="8" fill="#fbbf24" />
                  <text x="560" y="62" textAnchor="middle" fill="#fff" fontSize="14">对称加密</text>
                  <rect x="260" y="70" width="180" height="16" rx="8" fill="#f472b6" />
                  <text x="350" y="82" textAnchor="middle" fill="#fff" fontSize="14">非对称加密</text>
                  <rect x="460" y="110" width="180" height="16" rx="8" fill="#34d399" />
                  <text x="560" y="122" textAnchor="middle" fill="#fff" fontSize="14">哈希函数</text>
                  <rect x="260" y="130" width="180" height="16" rx="8" fill="#06b6d4" />
                  <text x="350" y="142" textAnchor="middle" fill="#fff" fontSize="14">数字签名</text>
                  <rect x="460" y="170" width="180" height="16" rx="8" fill="#6366f1" />
                  <text x="560" y="182" textAnchor="middle" fill="#fff" fontSize="14">密钥交换</text>
                  <rect x="260" y="190" width="180" height="16" rx="8" fill="#f59e42" />
                  <text x="350" y="202" textAnchor="middle" fill="#fff" fontSize="14">零知识证明</text>
                </svg>
              </div>
            </div>
          </div>
        )}
        {activeTab === "terms" && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">密码学常用术语</h3>
            <div className="prose max-w-none">
              <ul>
                <li><b>明文（Plaintext）：</b> 未加密的原始信息</li>
                <li><b>密文（Ciphertext）：</b> 加密后的信息</li>
                <li><b>密钥（Key）：</b> 控制加密和解密过程的参数</li>
                <li><b>加密（Encryption）：</b> 明文转为密文的过程</li>
                <li><b>解密（Decryption）：</b> 密文还原为明文的过程</li>
                <li><b>算法（Algorithm）：</b> 实现加密/解密的数学方法</li>
                <li><b>攻击者（Attacker）：</b> 试图破解加密系统的人</li>
                <li><b>安全性（Security）：</b> 加密系统抵抗攻击的能力</li>
              </ul>
              <h4 className="font-semibold mt-4">术语应用举例</h4>
              <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto mt-2">
                <code>{`# AES加密示例（Python）
from Crypto.Cipher import AES
key = b'1234567890abcdef'
cipher = AES.new(key, AES.MODE_ECB)
plaintext = b'hello world 1234'
ciphertext = cipher.encrypt(plaintext)
print(ciphertext)`}</code>
              </pre>
            </div>
          </div>
        )}
        {activeTab === "application" && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">密码学应用场景</h3>
            <div className="prose max-w-none">
              <ul>
                <li>网络通信加密（HTTPS、VPN、TLS）</li>
                <li>数据存储加密（磁盘、数据库、云存储）</li>
                <li>数字签名与身份认证（电子合同、区块链、CA证书）</li>
                <li>访问控制与权限管理（密钥卡、门禁系统）</li>
                <li>数字货币与区块链（比特币、以太坊）</li>
                <li>隐私保护与匿名通信（Tor、零知识证明）</li>
              </ul>
              <h4 className="font-semibold mt-4">应用案例与命令</h4>
              <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto mt-2">
                <code>{`# 生成RSA密钥对
openssl genrsa -out private.pem 2048
openssl rsa -in private.pem -pubout -out public.pem

# 文件加密
openssl enc -aes-256-cbc -in secret.txt -out secret.enc

# 数字签名
openssl dgst -sha256 -sign private.pem -out sign.bin data.txt`}</code>
              </pre>
            </div>
          </div>
        )}
      </div>
      {/* 底部导航 */}
      <div className="mt-8 flex justify-between">
        <Link
          href="/study/security/crypto/application"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          ← 密码学应用
        </Link>
        <Link
          href="/study/security/crypto/symmetric"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          对称加密 →
        </Link>
      </div>
    </div>
  );
} 