"use client";
import { useState } from "react";
import Link from "next/link";

export default function CryptoProtocolPage() {
  const [activeTab, setActiveTab] = useState("intro");

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">密码协议</h1>
      
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
          onClick={() => setActiveTab("protocols")}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === "protocols"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          常见协议
        </button>
        <button
          onClick={() => setActiveTab("analysis")}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === "analysis"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          协议分析
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
            <h3 className="text-xl font-semibold mb-3">密码协议基本概念</h3>
            <div className="prose max-w-none">
              <p className="mb-4">
                密码协议是使用密码学算法来实现特定安全目标的通信规则集合。它定义了参与方之间如何交换信息，以及如何使用密码学原语来保证通信的安全性。
              </p>

              <h4 className="font-semibold mt-4">密码协议的基本要素</h4>
              <ul className="list-disc pl-6 mb-4">
                <li>参与方：协议的参与者</li>
                <li>消息：参与方之间交换的信息</li>
                <li>步骤：协议执行的顺序</li>
                <li>安全目标：协议要达到的安全要求</li>
                <li>密码学原语：使用的密码学算法</li>
              </ul>

              <h4 className="font-semibold mt-4">密码协议的安全目标</h4>
              <div className="bg-gray-100 p-4 rounded-lg">
                <ul className="list-disc pl-6">
                  <li>机密性：保护信息不被未授权方获取</li>
                  <li>完整性：确保信息不被篡改</li>
                  <li>认证性：验证参与方的身份</li>
                  <li>不可否认性：防止参与方否认其行为</li>
                  <li>可用性：确保协议的正常执行</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === "protocols" && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">常见密码协议</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold">1. 密钥交换协议</h4>
              <ul className="list-disc pl-6 mb-4">
                <li>Diffie-Hellman密钥交换</li>
                <li>ECDH密钥交换</li>
                <li>IKE协议</li>
                <li>STS协议</li>
              </ul>

              <h4 className="font-semibold">2. 认证协议</h4>
              <ul className="list-disc pl-6 mb-4">
                <li>Kerberos协议</li>
                <li>SSL/TLS协议</li>
                <li>IPsec协议</li>
                <li>OAuth协议</li>
              </ul>

              <h4 className="font-semibold">3. 电子支付协议</h4>
              <ul className="list-disc pl-6 mb-4">
                <li>SET协议</li>
                <li>3D-Secure协议</li>
                <li>EMV协议</li>
                <li>比特币协议</li>
              </ul>

              <h4 className="font-semibold">4. 安全通信协议</h4>
              <ul className="list-disc pl-6 mb-4">
                <li>SSH协议</li>
                <li>PGP协议</li>
                <li>Signal协议</li>
                <li>WireGuard协议</li>
              </ul>

              <h4 className="font-semibold mt-4">协议分类</h4>
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border p-2">类型</th>
                      <th className="border p-2">主要功能</th>
                      <th className="border p-2">应用场景</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border p-2">密钥交换</td>
                      <td className="border p-2">安全建立共享密钥</td>
                      <td className="border p-2">安全通信初始化</td>
                    </tr>
                    <tr>
                      <td className="border p-2">认证</td>
                      <td className="border p-2">身份验证和授权</td>
                      <td className="border p-2">访问控制</td>
                    </tr>
                    <tr>
                      <td className="border p-2">电子支付</td>
                      <td className="border p-2">安全支付交易</td>
                      <td className="border p-2">电子商务</td>
                    </tr>
                    <tr>
                      <td className="border p-2">安全通信</td>
                      <td className="border p-2">保护通信安全</td>
                      <td className="border p-2">数据传输</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === "analysis" && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">协议分析</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold">1. 形式化分析方法</h4>
              <ul className="list-disc pl-6 mb-4">
                <li>BAN逻辑</li>
                <li>模型检测</li>
                <li>定理证明</li>
                <li>符号分析</li>
              </ul>

              <h4 className="font-semibold">2. 攻击类型</h4>
              <ul className="list-disc pl-6 mb-4">
                <li>中间人攻击</li>
                <li>重放攻击</li>
                <li>反射攻击</li>
                <li>并行会话攻击</li>
                <li>密钥泄露攻击</li>
              </ul>

              <h4 className="font-semibold">3. 安全属性验证</h4>
              <ul className="list-disc pl-6 mb-4">
                <li>认证性验证</li>
                <li>机密性验证</li>
                <li>完整性验证</li>
                <li>不可否认性验证</li>
                <li>可用性验证</li>
              </ul>

              <h4 className="font-semibold">4. 协议设计原则</h4>
              <ul className="list-disc pl-6 mb-4">
                <li>最小特权原则</li>
                <li>完全中介原则</li>
                <li>开放设计原则</li>
                <li>防御深度原则</li>
                <li>故障安全原则</li>
              </ul>

              <h4 className="font-semibold mt-4">协议分析流程</h4>
              <div className="bg-gray-100 p-4 rounded-lg">
                <ol className="list-decimal pl-6">
                  <li>协议形式化描述</li>
                  <li>安全目标定义</li>
                  <li>威胁模型建立</li>
                  <li>形式化分析</li>
                  <li>攻击验证</li>
                  <li>安全属性验证</li>
                  <li>改进建议</li>
                </ol>
              </div>
            </div>
          </div>
        )}

        {activeTab === "implementation" && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">实现示例</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold">1. Diffie-Hellman密钥交换</h4>
              <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto mt-2">
                <code>{`from cryptography.hazmat.primitives.asymmetric import dh
from cryptography.hazmat.primitives import serialization
import os

def generate_parameters():
    """生成DH参数"""
    parameters = dh.generate_parameters(generator=2, key_size=2048)
    return parameters

def generate_private_key(parameters):
    """生成私钥"""
    private_key = parameters.generate_private_key()
    return private_key

def generate_public_key(private_key):
    """生成公钥"""
    public_key = private_key.public_key()
    return public_key

def generate_shared_key(private_key, peer_public_key):
    """生成共享密钥"""
    shared_key = private_key.exchange(peer_public_key)
    return shared_key

# 使用示例
if __name__ == "__main__":
    # 生成DH参数
    parameters = generate_parameters()
    
    # Alice生成密钥对
    alice_private_key = generate_private_key(parameters)
    alice_public_key = generate_public_key(alice_private_key)
    
    # Bob生成密钥对
    bob_private_key = generate_private_key(parameters)
    bob_public_key = generate_public_key(bob_private_key)
    
    # 生成共享密钥
    alice_shared_key = generate_shared_key(alice_private_key, bob_public_key)
    bob_shared_key = generate_shared_key(bob_private_key, alice_public_key)
    
    # 验证共享密钥是否相同
    assert alice_shared_key == bob_shared_key`}</code>
              </pre>

              <h4 className="font-semibold mt-4">2. SSL/TLS握手协议</h4>
              <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto mt-2">
                <code>{`import ssl
import socket

def create_ssl_context():
    """创建SSL上下文"""
    context = ssl.create_default_context()
    context.check_hostname = True
    context.verify_mode = ssl.CERT_REQUIRED
    return context

def create_secure_server(host, port, cert_file, key_file):
    """创建安全服务器"""
    context = ssl.create_default_context(ssl.Purpose.CLIENT_AUTH)
    context.load_cert_chain(cert_file, key_file)
    
    server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server.bind((host, port))
    server.listen(5)
    
    return context.wrap_socket(server, server_side=True)

def create_secure_client(host, port):
    """创建安全客户端"""
    context = create_ssl_context()
    
    client = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    secure_client = context.wrap_socket(client, server_hostname=host)
    secure_client.connect((host, port))
    
    return secure_client

# 使用示例
if __name__ == "__main__":
    # 服务器端
    server = create_secure_server(
        "localhost", 8443,
        "server.crt", "server.key"
    )
    
    # 客户端
    client = create_secure_client("localhost", 8443)
    
    # 发送数据
    client.send(b"Hello, Secure World!")
    
    # 接收数据
    data = server.recv(1024)
    print(f"Received: {data.decode()}")`}</code>
              </pre>
            </div>
          </div>
        )}

        {activeTab === "security" && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">安全考虑</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold">1. 协议设计安全</h4>
              <ul className="list-disc pl-6 mb-4">
                <li>遵循安全设计原则</li>
                <li>进行形式化分析</li>
                <li>考虑所有攻击场景</li>
                <li>实施防御措施</li>
                <li>定期安全评估</li>
              </ul>

              <h4 className="font-semibold">2. 实现安全</h4>
              <ul className="list-disc pl-6 mb-4">
                <li>使用安全的密码库</li>
                <li>防止侧信道攻击</li>
                <li>实施错误处理</li>
                <li>保护密钥安全</li>
                <li>进行代码审计</li>
              </ul>

              <h4 className="font-semibold">3. 部署安全</h4>
              <ul className="list-disc pl-6 mb-4">
                <li>安全配置系统</li>
                <li>实施访问控制</li>
                <li>监控系统状态</li>
                <li>定期更新补丁</li>
                <li>备份重要数据</li>
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
                      <td className="border p-2">协议设计</td>
                      <td className="border p-2">遵循安全设计原则</td>
                      <td className="border p-2">极高</td>
                    </tr>
                    <tr>
                      <td className="border p-2">实现安全</td>
                      <td className="border p-2">使用安全的实现方式</td>
                      <td className="border p-2">高</td>
                    </tr>
                    <tr>
                      <td className="border p-2">密钥管理</td>
                      <td className="border p-2">保护密钥安全</td>
                      <td className="border p-2">高</td>
                    </tr>
                    <tr>
                      <td className="border p-2">错误处理</td>
                      <td className="border p-2">实施安全的错误处理</td>
                      <td className="border p-2">高</td>
                    </tr>
                    <tr>
                      <td className="border p-2">监控审计</td>
                      <td className="border p-2">监控和审计系统</td>
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
          href="/study/security/crypto/pki"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          ← 公钥基础设施
        </Link>
        <Link
          href="/study/security/crypto/analysis"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          密码分析 →
        </Link>
      </div>
    </div>
  );
} 