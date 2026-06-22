'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import {
  PageTitle, SectionTitle, BookParagraph, BookCode, BookAlert, BookList,
} from '@/app/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '网络安全',
  chapterTitle: '密码协议',
  chapterNumber: 8,
  totalChapters: 10,
  subjectHref: '/study/security/crypto',
  prevChapter: { label: '公钥基础设施', href: '/study/security/crypto/pki' },
  nextChapter: { label: '密码分析', href: '/study/security/crypto/analysis' },
  theme: THEMES.security,
}

const dhKeyExchange = `from cryptography.hazmat.primitives.asymmetric import dh
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
    assert alice_shared_key == bob_shared_key`

const sslTlsHandshake = `import ssl
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
    print(f"Received: {data.decode()}")`

const SPREADS = [
  {
    label: '基本概念',
    left: (
      <div className="space-y-4">
        <PageTitle>密码协议基本概念</PageTitle>
        <BookParagraph>
          密码协议是使用密码学算法来实现特定安全目标的通信规则集合。它定义了参与方之间如何交换信息，以及如何使用密码学原语来保证通信的安全性。
        </BookParagraph>
        <SectionTitle>密码协议的基本要素</SectionTitle>
        <BookList items={[
          '参与方：协议的参与者',
          '消息：参与方之间交换的信息',
          '步骤：协议执行的顺序',
          '安全目标：协议要达到的安全要求',
          '密码学原语：使用的密码学算法',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>密码协议的安全目标</PageTitle>
        <BookList items={[
          '机密性：保护信息不被未授权方获取',
          '完整性：确保信息不被篡改',
          '认证性：验证参与方的身份',
          '不可否认性：防止参与方否认其行为',
          '可用性：确保协议的正常执行',
        ]} />
      </div>
    ),
  },
  {
    label: '常见协议',
    left: (
      <div className="space-y-4">
        <PageTitle>常见密码协议</PageTitle>
        <SectionTitle>1. 密钥交换协议</SectionTitle>
        <BookList items={['Diffie-Hellman密钥交换', 'ECDH密钥交换', 'IKE协议', 'STS协议']} />
        <SectionTitle>2. 认证协议</SectionTitle>
        <BookList items={['Kerberos协议', 'SSL/TLS协议', 'IPsec协议', 'OAuth协议']} />
        <SectionTitle>3. 电子支付协议</SectionTitle>
        <BookList items={['SET协议', '3D-Secure协议', 'EMV协议', '比特币协议']} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>4. 安全通信协议</SectionTitle>
        <BookList items={['SSH协议', 'PGP协议', 'Signal协议', 'WireGuard协议']} />
        <SectionTitle>协议分类</SectionTitle>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2" style={{ border: '1px solid #ddd' }}>类型</th>
                <th className="border p-2" style={{ border: '1px solid #ddd' }}>主要功能</th>
                <th className="border p-2" style={{ border: '1px solid #ddd' }}>应用场景</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="border p-2" style={{ border: '1px solid #ddd' }}>密钥交换</td><td className="border p-2" style={{ border: '1px solid #ddd' }}>安全建立共享密钥</td><td className="border p-2" style={{ border: '1px solid #ddd' }}>安全通信初始化</td></tr>
              <tr><td className="border p-2" style={{ border: '1px solid #ddd' }}>认证</td><td className="border p-2" style={{ border: '1px solid #ddd' }}>身份验证和授权</td><td className="border p-2" style={{ border: '1px solid #ddd' }}>访问控制</td></tr>
              <tr><td className="border p-2" style={{ border: '1px solid #ddd' }}>电子支付</td><td className="border p-2" style={{ border: '1px solid #ddd' }}>安全支付交易</td><td className="border p-2" style={{ border: '1px solid #ddd' }}>电子商务</td></tr>
              <tr><td className="border p-2" style={{ border: '1px solid #ddd' }}>安全通信</td><td className="border p-2" style={{ border: '1px solid #ddd' }}>保护通信安全</td><td className="border p-2" style={{ border: '1px solid #ddd' }}>数据传输</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    ),
  },
  {
    label: '协议分析',
    left: (
      <div className="space-y-4">
        <PageTitle>协议分析</PageTitle>
        <SectionTitle>1. 形式化分析方法</SectionTitle>
        <BookList items={['BAN逻辑', '模型检测', '定理证明', '符号分析']} />
        <SectionTitle>2. 攻击类型</SectionTitle>
        <BookList items={['中间人攻击', '重放攻击', '反射攻击', '并行会话攻击', '密钥泄露攻击']} />
        <SectionTitle>3. 安全属性验证</SectionTitle>
        <BookList items={['认证性验证', '机密性验证', '完整性验证', '不可否认性验证', '可用性验证']} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>4. 协议设计原则</SectionTitle>
        <BookList items={['最小特权原则', '完全中介原则', '开放设计原则', '防御深度原则', '故障安全原则']} />
        <SectionTitle>协议分析流程</SectionTitle>
        <BookList items={[
          '协议形式化描述',
          '安全目标定义',
          '威胁模型建立',
          '形式化分析',
          '攻击验证',
          '安全属性验证',
          '改进建议',
        ]} />
      </div>
    ),
  },
  {
    label: '实现示例',
    left: (
      <div className="space-y-4">
        <PageTitle>Diffie-Hellman密钥交换</PageTitle>
        <BookCode language="python" code={dhKeyExchange} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>SSL/TLS握手协议</PageTitle>
        <BookCode language="python" code={sslTlsHandshake} />
      </div>
    ),
  },
  {
    label: '安全考虑',
    left: (
      <div className="space-y-4">
        <PageTitle>安全考虑</PageTitle>
        <SectionTitle>1. 协议设计安全</SectionTitle>
        <BookList items={[
          '遵循安全设计原则',
          '进行形式化分析',
          '考虑所有攻击场景',
          '实施防御措施',
          '定期安全评估',
        ]} />
        <SectionTitle>2. 实现安全</SectionTitle>
        <BookList items={[
          '使用安全的密码库',
          '防止侧信道攻击',
          '实施错误处理',
          '保护密钥安全',
          '进行代码审计',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>3. 部署安全</SectionTitle>
        <BookList items={[
          '安全配置系统',
          '实施访问控制',
          '监控系统状态',
          '定期更新补丁',
          '备份重要数据',
        ]} />
        <SectionTitle>安全检查清单</SectionTitle>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2" style={{ border: '1px solid #ddd' }}>检查项</th>
                <th className="border p-2" style={{ border: '1px solid #ddd' }}>说明</th>
                <th className="border p-2" style={{ border: '1px solid #ddd' }}>重要性</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="border p-2" style={{ border: '1px solid #ddd' }}>协议设计</td><td className="border p-2" style={{ border: '1px solid #ddd' }}>遵循安全设计原则</td><td className="border p-2" style={{ border: '1px solid #ddd' }}>极高</td></tr>
              <tr><td className="border p-2" style={{ border: '1px solid #ddd' }}>实现安全</td><td className="border p-2" style={{ border: '1px solid #ddd' }}>使用安全的实现方式</td><td className="border p-2" style={{ border: '1px solid #ddd' }}>高</td></tr>
              <tr><td className="border p-2" style={{ border: '1px solid #ddd' }}>密钥管理</td><td className="border p-2" style={{ border: '1px solid #ddd' }}>保护密钥安全</td><td className="border p-2" style={{ border: '1px solid #ddd' }}>高</td></tr>
              <tr><td className="border p-2" style={{ border: '1px solid #ddd' }}>错误处理</td><td className="border p-2" style={{ border: '1px solid #ddd' }}>实施安全的错误处理</td><td className="border p-2" style={{ border: '1px solid #ddd' }}>高</td></tr>
              <tr><td className="border p-2" style={{ border: '1px solid #ddd' }}>监控审计</td><td className="border p-2" style={{ border: '1px solid #ddd' }}>监控和审计系统</td><td className="border p-2" style={{ border: '1px solid #ddd' }}>高</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    ),
  },
]

export default function CryptoProtocolPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
