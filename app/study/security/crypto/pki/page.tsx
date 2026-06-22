'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import {
  PageTitle, SectionTitle, BookParagraph, BookCode, BookAlert, BookList,
} from '@/app/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '网络安全',
  chapterTitle: '公钥基础设施',
  chapterNumber: 7,
  totalChapters: 10,
  subjectHref: '/study/security/crypto',
  prevChapter: { label: '密钥管理', href: '/study/security/crypto/key' },
  nextChapter: { label: '密码协议', href: '/study/security/crypto/protocol' },
  theme: THEMES.security,
}

const opensslPki = `# 生成CA私钥和自签名证书
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
openssl verify -CAfile ca.crt client.crt`

const pythonPki = `from cryptography import x509
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
        f.write(ca_cert.public_bytes(serialization.Encoding.PEM))`

const SPREADS = [
  {
    label: '基本概念',
    left: (
      <div className="space-y-4">
        <PageTitle>公钥基础设施基本概念</PageTitle>
        <BookParagraph>
          公钥基础设施（Public Key Infrastructure，PKI）是一个用于创建、管理、分发、使用、存储和撤销数字证书的系统。它通过数字证书将公钥与身份绑定，为网络通信提供身份认证、数据加密和数字签名等安全服务。
        </BookParagraph>
        <SectionTitle>PKI的主要功能</SectionTitle>
        <BookList items={[
          '身份认证：验证用户、设备或服务的身份',
          '数据加密：保护数据传输的机密性',
          '数字签名：确保数据的完整性和不可否认性',
          '密钥管理：管理公钥和私钥的生命周期',
          '证书管理：管理数字证书的颁发、更新和撤销',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>PKI的应用场景</PageTitle>
        <BookList items={[
          'SSL/TLS安全通信',
          '电子邮件加密和签名',
          '代码签名和软件分发',
          'VPN和远程访问',
          '电子政务和电子商务',
          '智能卡和移动设备认证',
        ]} />
      </div>
    ),
  },
  {
    label: '核心组件',
    left: (
      <div className="space-y-4">
        <PageTitle>PKI核心组件</PageTitle>
        <SectionTitle>1. 证书颁发机构（CA）</SectionTitle>
        <BookList items={[
          '负责颁发和管理数字证书',
          '验证申请者的身份',
          '维护证书吊销列表（CRL）',
          '提供证书状态查询服务',
        ]} />
        <SectionTitle>2. 注册机构（RA）</SectionTitle>
        <BookList items={[
          '接收证书申请',
          '验证申请者身份',
          '审核证书申请',
          '向CA提交申请',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>3. 证书存储库</SectionTitle>
        <BookList items={[
          '存储已颁发的证书',
          '提供证书查询服务',
          '发布证书吊销列表',
          '支持证书状态查询',
        ]} />
        <SectionTitle>4. 终端实体</SectionTitle>
        <BookList items={[
          '证书持有者',
          '证书使用者',
          '证书验证者',
          '证书依赖方',
        ]} />
        <SectionTitle>组件关系图</SectionTitle>
        <div style={{ textAlign: 'center', margin: '16px 0' }}>
          <svg width="800" height="400" viewBox="0 0 800 400" className="w-full">
            <defs>
              <linearGradient id="pkiFlow" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
            </defs>
            <rect x="350" y="50" width="100" height="60" rx="8" fill="#f3f4f6" stroke="#6366f1" />
            <text x="400" y="85" textAnchor="middle" fill="#6366f1">CA</text>
            <rect x="150" y="150" width="100" height="60" rx="8" fill="#f3f4f6" stroke="#6366f1" />
            <text x="200" y="185" textAnchor="middle" fill="#6366f1">RA</text>
            <rect x="550" y="150" width="100" height="60" rx="8" fill="#f3f4f6" stroke="#6366f1" />
            <text x="600" y="185" textAnchor="middle" fill="#6366f1">存储库</text>
            <rect x="350" y="250" width="100" height="60" rx="8" fill="#f3f4f6" stroke="#6366f1" />
            <text x="400" y="285" textAnchor="middle" fill="#6366f1">终端实体</text>
            <path d="M200 150 L 400 110" stroke="#6366f1" strokeWidth="2" />
            <path d="M400 110 L 600 150" stroke="#6366f1" strokeWidth="2" />
            <path d="M200 210 L 400 250" stroke="#6366f1" strokeWidth="2" />
            <path d="M600 210 L 400 250" stroke="#6366f1" strokeWidth="2" />
          </svg>
        </div>
      </div>
    ),
  },
  {
    label: '工作流程',
    left: (
      <div className="space-y-4">
        <PageTitle>PKI工作流程</PageTitle>
        <SectionTitle>1. 证书申请流程</SectionTitle>
        <BookList items={[
          '生成密钥对',
          '准备证书申请',
          '提交申请到RA',
          'RA验证身份',
          'CA审核申请',
          'CA签发证书',
          '发布证书到存储库',
        ]} />
        <SectionTitle>2. 证书验证流程</SectionTitle>
        <BookList items={[
          '获取证书',
          '验证证书签名',
          '检查证书有效期',
          '验证证书链',
          '检查证书状态',
          '验证证书用途',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>3. 证书更新流程</SectionTitle>
        <BookList items={[
          '检测证书过期',
          '生成新密钥对',
          '准备更新申请',
          '提交更新请求',
          'CA签发新证书',
          '更新证书存储',
        ]} />
        <SectionTitle>4. 证书撤销流程</SectionTitle>
        <BookList items={[
          '发现撤销原因',
          '提交撤销请求',
          'CA审核请求',
          '更新CRL',
          '发布OCSP响应',
          '通知相关方',
        ]} />
        <SectionTitle>证书生命周期</SectionTitle>
        <BookList items={[
          '证书申请和生成',
          '证书分发和安装',
          '证书使用和验证',
          '证书更新和续期',
          '证书撤销和归档',
        ]} />
      </div>
    ),
  },
  {
    label: '实现示例',
    left: (
      <div className="space-y-4">
        <PageTitle>OpenSSL命令行示例</PageTitle>
        <BookCode language="bash" code={opensslPki} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>Python实现示例</PageTitle>
        <BookCode language="python" code={pythonPki} />
      </div>
    ),
  },
  {
    label: '安全考虑',
    left: (
      <div className="space-y-4">
        <PageTitle>安全考虑</PageTitle>
        <SectionTitle>1. CA安全</SectionTitle>
        <BookList items={[
          '保护CA私钥安全',
          '实施严格的访问控制',
          '使用HSM保护密钥',
          '实施审计日志',
          '定期安全评估',
        ]} />
        <SectionTitle>2. 证书安全</SectionTitle>
        <BookList items={[
          '使用足够长的密钥',
          '实施证书吊销机制',
          '定期更新证书',
          '验证证书链完整性',
          '检查证书状态',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>3. 系统安全</SectionTitle>
        <BookList items={[
          '实施网络隔离',
          '使用防火墙保护',
          '加密存储数据',
          '实施备份机制',
          '监控系统状态',
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
              <tr><td className="border p-2" style={{ border: '1px solid #ddd' }}>CA安全</td><td className="border p-2" style={{ border: '1px solid #ddd' }}>保护CA私钥和系统</td><td className="border p-2" style={{ border: '1px solid #ddd' }}>极高</td></tr>
              <tr><td className="border p-2" style={{ border: '1px solid #ddd' }}>证书管理</td><td className="border p-2" style={{ border: '1px solid #ddd' }}>证书生命周期管理</td><td className="border p-2" style={{ border: '1px solid #ddd' }}>高</td></tr>
              <tr><td className="border p-2" style={{ border: '1px solid #ddd' }}>访问控制</td><td className="border p-2" style={{ border: '1px solid #ddd' }}>实施严格的访问控制</td><td className="border p-2" style={{ border: '1px solid #ddd' }}>高</td></tr>
              <tr><td className="border p-2" style={{ border: '1px solid #ddd' }}>审计日志</td><td className="border p-2" style={{ border: '1px solid #ddd' }}>记录所有关键操作</td><td className="border p-2" style={{ border: '1px solid #ddd' }}>高</td></tr>
              <tr><td className="border p-2" style={{ border: '1px solid #ddd' }}>备份恢复</td><td className="border p-2" style={{ border: '1px solid #ddd' }}>实施备份和恢复机制</td><td className="border p-2" style={{ border: '1px solid #ddd' }}>高</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    ),
  },
]

export default function PKIPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
