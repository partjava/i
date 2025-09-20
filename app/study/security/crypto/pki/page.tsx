"use client";
import { useState } from "react";
import Link from "next/link";

export default function PKIPage() {
  const [activeTab, setActiveTab] = useState("intro");

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">公钥基础设施</h1>
      
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
          onClick={() => setActiveTab("components")}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === "components"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          核心组件
        </button>
        <button
          onClick={() => setActiveTab("workflow")}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === "workflow"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          工作流程
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
            <h3 className="text-xl font-semibold mb-3">公钥基础设施基本概念</h3>
            <div className="prose max-w-none">
              <p className="mb-4">
                公钥基础设施（Public Key Infrastructure，PKI）是一个用于创建、管理、分发、使用、存储和撤销数字证书的系统。它通过数字证书将公钥与身份绑定，为网络通信提供身份认证、数据加密和数字签名等安全服务。
              </p>

              <h4 className="font-semibold mt-4">PKI的主要功能</h4>
              <ul className="list-disc pl-6 mb-4">
                <li>身份认证：验证用户、设备或服务的身份</li>
                <li>数据加密：保护数据传输的机密性</li>
                <li>数字签名：确保数据的完整性和不可否认性</li>
                <li>密钥管理：管理公钥和私钥的生命周期</li>
                <li>证书管理：管理数字证书的颁发、更新和撤销</li>
              </ul>

              <h4 className="font-semibold mt-4">PKI的应用场景</h4>
              <div className="bg-gray-100 p-4 rounded-lg">
                <ul className="list-disc pl-6">
                  <li>SSL/TLS安全通信</li>
                  <li>电子邮件加密和签名</li>
                  <li>代码签名和软件分发</li>
                  <li>VPN和远程访问</li>
                  <li>电子政务和电子商务</li>
                  <li>智能卡和移动设备认证</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === "components" && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">PKI核心组件</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold">1. 证书颁发机构（CA）</h4>
              <ul className="list-disc pl-6 mb-4">
                <li>负责颁发和管理数字证书</li>
                <li>验证申请者的身份</li>
                <li>维护证书吊销列表（CRL）</li>
                <li>提供证书状态查询服务</li>
              </ul>

              <h4 className="font-semibold">2. 注册机构（RA）</h4>
              <ul className="list-disc pl-6 mb-4">
                <li>接收证书申请</li>
                <li>验证申请者身份</li>
                <li>审核证书申请</li>
                <li>向CA提交申请</li>
              </ul>

              <h4 className="font-semibold">3. 证书存储库</h4>
              <ul className="list-disc pl-6 mb-4">
                <li>存储已颁发的证书</li>
                <li>提供证书查询服务</li>
                <li>发布证书吊销列表</li>
                <li>支持证书状态查询</li>
              </ul>

              <h4 className="font-semibold">4. 终端实体</h4>
              <ul className="list-disc pl-6 mb-4">
                <li>证书持有者</li>
                <li>证书使用者</li>
                <li>证书验证者</li>
                <li>证书依赖方</li>
              </ul>

              <h4 className="font-semibold mt-4">组件关系图</h4>
              <div className="my-8">
                <svg width="800" height="400" viewBox="0 0 800 400" className="w-full">
                  <defs>
                    <linearGradient id="pkiFlow" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#6366f1" />
                      <stop offset="100%" stopColor="#06b6d4" />
                    </linearGradient>
                  </defs>
                  
                  {/* CA */}
                  <rect x="350" y="50" width="100" height="60" rx="8" fill="#f3f4f6" stroke="#6366f1" />
                  <text x="400" y="85" textAnchor="middle" fill="#6366f1">CA</text>
                  
                  {/* RA */}
                  <rect x="150" y="150" width="100" height="60" rx="8" fill="#f3f4f6" stroke="#6366f1" />
                  <text x="200" y="185" textAnchor="middle" fill="#6366f1">RA</text>
                  
                  {/* 存储库 */}
                  <rect x="550" y="150" width="100" height="60" rx="8" fill="#f3f4f6" stroke="#6366f1" />
                  <text x="600" y="185" textAnchor="middle" fill="#6366f1">存储库</text>
                  
                  {/* 终端实体 */}
                  <rect x="350" y="250" width="100" height="60" rx="8" fill="#f3f4f6" stroke="#6366f1" />
                  <text x="400" y="285" textAnchor="middle" fill="#6366f1">终端实体</text>
                  
                  {/* 连接线 */}
                  <path d="M200 150 L 400 110" stroke="#6366f1" strokeWidth="2" />
                  <path d="M400 110 L 600 150" stroke="#6366f1" strokeWidth="2" />
                  <path d="M200 210 L 400 250" stroke="#6366f1" strokeWidth="2" />
                  <path d="M600 210 L 400 250" stroke="#6366f1" strokeWidth="2" />
                </svg>
              </div>
            </div>
          </div>
        )}

        {activeTab === "workflow" && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">PKI工作流程</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold">1. 证书申请流程</h4>
              <ol className="list-decimal pl-6 mb-4">
                <li>生成密钥对</li>
                <li>准备证书申请</li>
                <li>提交申请到RA</li>
                <li>RA验证身份</li>
                <li>CA审核申请</li>
                <li>CA签发证书</li>
                <li>发布证书到存储库</li>
              </ol>

              <h4 className="font-semibold">2. 证书验证流程</h4>
              <ol className="list-decimal pl-6 mb-4">
                <li>获取证书</li>
                <li>验证证书签名</li>
                <li>检查证书有效期</li>
                <li>验证证书链</li>
                <li>检查证书状态</li>
                <li>验证证书用途</li>
              </ol>

              <h4 className="font-semibold">3. 证书更新流程</h4>
              <ol className="list-decimal pl-6 mb-4">
                <li>检测证书过期</li>
                <li>生成新密钥对</li>
                <li>准备更新申请</li>
                <li>提交更新请求</li>
                <li>CA签发新证书</li>
                <li>更新证书存储</li>
              </ol>

              <h4 className="font-semibold">4. 证书撤销流程</h4>
              <ol className="list-decimal pl-6 mb-4">
                <li>发现撤销原因</li>
                <li>提交撤销请求</li>
                <li>CA审核请求</li>
                <li>更新CRL</li>
                <li>发布OCSP响应</li>
                <li>通知相关方</li>
              </ol>

              <h4 className="font-semibold mt-4">证书生命周期</h4>
              <div className="bg-gray-100 p-4 rounded-lg">
                <ol className="list-decimal pl-6">
                  <li>证书申请和生成</li>
                  <li>证书分发和安装</li>
                  <li>证书使用和验证</li>
                  <li>证书更新和续期</li>
                  <li>证书撤销和归档</li>
                </ol>
              </div>
            </div>
          </div>
        )}

        {activeTab === "implementation" && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">实现示例</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold">1. OpenSSL命令行示例</h4>
              <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto mt-2">
                <code>{`# 生成CA私钥和自签名证书
openssl genrsa -out ca.key 2048
openssl req -new -x509 -days 365 -key ca.key -out ca.crt

# 生成服务器私钥和证书请求
openssl genrsa -out server.key 2048
openssl req -new -key server.key -out server.csr

# CA签名服务器证书
openssl x509 -req -days 365 -in server.csr -CA ca.crt -CAkey ca.key -CAcreateserial -out server.crt

# 生成客户端私钥和证书请求
openssl genrsa -out client.key 2048
openssl req -new -key client.key -out client.csr

# CA签名客户端证书
openssl x509 -req -days 365 -in client.csr -CA ca.crt -CAkey ca.key -CAcreateserial -out client.crt

# 验证证书
openssl verify -CAfile ca.crt server.crt
openssl verify -CAfile ca.crt client.crt`}</code>
              </pre>

              <h4 className="font-semibold mt-4">2. Python实现示例</h4>
              <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto mt-2">
                <code>{`from cryptography import x509
from cryptography.x509.oid import NameOID
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.asymmetric import rsa
from cryptography.hazmat.primitives import serialization
from datetime import datetime, timedelta

def generate_ca():
    """生成CA证书"""
    # 生成私钥
    private_key = rsa.generate_private_key(
        public_exponent=65537,
        key_size=2048
    )
    
    # 生成证书
    subject = issuer = x509.Name([
        x509.NameAttribute(NameOID.COMMON_NAME, u"CA"),
        x509.NameAttribute(NameOID.ORGANIZATION_NAME, u"My Company"),
        x509.NameAttribute(NameOID.COUNTRY_NAME, u"CN"),
    ])
    
    cert = x509.CertificateBuilder().subject_name(
        subject
    ).issuer_name(
        issuer
    ).public_key(
        private_key.public_key()
    ).serial_number(
        x509.random_serial_number()
    ).not_valid_before(
        datetime.utcnow()
    ).not_valid_after(
        datetime.utcnow() + timedelta(days=365)
    ).add_extension(
        x509.BasicConstraints(ca=True, path_length=None),
        critical=True
    ).sign(private_key, hashes.SHA256())
    
    return private_key, cert

def generate_certificate(ca_key, ca_cert, common_name):
    """生成终端实体证书"""
    # 生成私钥
    private_key = rsa.generate_private_key(
        public_exponent=65537,
        key_size=2048
    )
    
    # 生成证书
    subject = x509.Name([
        x509.NameAttribute(NameOID.COMMON_NAME, common_name),
        x509.NameAttribute(NameOID.ORGANIZATION_NAME, u"My Company"),
        x509.NameAttribute(NameOID.COUNTRY_NAME, u"CN"),
    ])
    
    cert = x509.CertificateBuilder().subject_name(
        subject
    ).issuer_name(
        ca_cert.subject
    ).public_key(
        private_key.public_key()
    ).serial_number(
        x509.random_serial_number()
    ).not_valid_before(
        datetime.utcnow()
    ).not_valid_after(
        datetime.utcnow() + timedelta(days=365)
    ).add_extension(
        x509.BasicConstraints(ca=False, path_length=None),
        critical=True
    ).sign(ca_key, hashes.SHA256())
    
    return private_key, cert

# 使用示例
if __name__ == "__main__":
    # 生成CA
    ca_key, ca_cert = generate_ca()
    
    # 生成服务器证书
    server_key, server_cert = generate_certificate(
        ca_key, ca_cert, u"server.example.com"
    )
    
    # 生成客户端证书
    client_key, client_cert = generate_certificate(
        ca_key, ca_cert, u"client.example.com"
    )
    
    # 保存证书和私钥
    with open("ca.key", "wb") as f:
        f.write(ca_key.private_bytes(
            encoding=serialization.Encoding.PEM,
            format=serialization.PrivateFormat.PKCS8,
            encryption_algorithm=serialization.NoEncryption()
        ))
    
    with open("ca.crt", "wb") as f:
        f.write(ca_cert.public_bytes(serialization.Encoding.PEM))`}</code>
              </pre>
            </div>
          </div>
        )}

        {activeTab === "security" && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">安全考虑</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold">1. CA安全</h4>
              <ul className="list-disc pl-6 mb-4">
                <li>保护CA私钥安全</li>
                <li>实施严格的访问控制</li>
                <li>使用HSM保护密钥</li>
                <li>实施审计日志</li>
                <li>定期安全评估</li>
              </ul>

              <h4 className="font-semibold">2. 证书安全</h4>
              <ul className="list-disc pl-6 mb-4">
                <li>使用足够长的密钥</li>
                <li>实施证书吊销机制</li>
                <li>定期更新证书</li>
                <li>验证证书链完整性</li>
                <li>检查证书状态</li>
              </ul>

              <h4 className="font-semibold">3. 系统安全</h4>
              <ul className="list-disc pl-6 mb-4">
                <li>实施网络隔离</li>
                <li>使用防火墙保护</li>
                <li>加密存储数据</li>
                <li>实施备份机制</li>
                <li>监控系统状态</li>
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
                      <td className="border p-2">CA安全</td>
                      <td className="border p-2">保护CA私钥和系统</td>
                      <td className="border p-2">极高</td>
                    </tr>
                    <tr>
                      <td className="border p-2">证书管理</td>
                      <td className="border p-2">证书生命周期管理</td>
                      <td className="border p-2">高</td>
                    </tr>
                    <tr>
                      <td className="border p-2">访问控制</td>
                      <td className="border p-2">实施严格的访问控制</td>
                      <td className="border p-2">高</td>
                    </tr>
                    <tr>
                      <td className="border p-2">审计日志</td>
                      <td className="border p-2">记录所有关键操作</td>
                      <td className="border p-2">高</td>
                    </tr>
                    <tr>
                      <td className="border p-2">备份恢复</td>
                      <td className="border p-2">实施备份和恢复机制</td>
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
          href="/study/security/crypto/key"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          ← 密钥管理
        </Link>
        <Link
          href="/study/security/crypto/protocol"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          密码协议 →
        </Link>
      </div>
    </div>
  );
} 