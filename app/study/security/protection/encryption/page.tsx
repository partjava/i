'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import {
  PageTitle,
  SectionTitle,
  BookParagraph,
  BookCode,
  BookAlert,
  BookList,
  TagGrid,
} from '@shared/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '网络安全',
  chapterTitle: '加密技术',
  chapterNumber: 3,
  totalChapters: 10,
  subjectHref: '/study/security/protection',
  prevChapter: { label: '身份认证', href: '/study/security/protection/auth' },
  nextChapter: { label: '防火墙技术', href: '/study/security/protection/firewall' },
  theme: THEMES.security,
}

const SPREADS = [
  {
    label: '基础原理',
    left: (
      <div className="space-y-4">
        <PageTitle>加密技术基础原理</PageTitle>
        <BookParagraph>加密技术是信息安全的核心手段之一，通过对数据进行编码，使其在未授权的情况下无法被理解和利用。加密不仅保护数据的机密性，还能在一定程度上保障完整性和不可否认性。</BookParagraph>
        <BookList items={[
          '机密性：防止数据被未授权访问和泄露',
          '完整性：防止数据在传输或存储过程中被篡改',
          '不可否认性：确保数据发送者无法否认其行为（如数字签名）',
          '加密与解密：加密是将明文转换为密文，解密是将密文还原为明文',
        ]} />
        <div style={{ textAlign: 'center', margin: '16px 0' }}>
          <svg width="520" height="100" viewBox="0 0 520 100">
            <rect x="20" y="30" width="100" height="40" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="2" rx="8" />
            <text x="70" y="55" fontSize="14" fill="#0ea5e9" textAnchor="middle">明文</text>
            <rect x="140" y="30" width="100" height="40" fill="#fce7f3" stroke="#ec4899" strokeWidth="2" rx="8" />
            <text x="190" y="55" fontSize="14" fill="#db2777" textAnchor="middle">加密算法</text>
            <rect x="260" y="30" width="100" height="40" fill="#fee2e2" stroke="#ef4444" strokeWidth="2" rx="8" />
            <text x="310" y="55" fontSize="14" fill="#ef4444" textAnchor="middle">密文</text>
            <rect x="380" y="30" width="100" height="40" fill="#fef9c3" stroke="#facc15" strokeWidth="2" rx="8" />
            <text x="430" y="55" fontSize="14" fill="#eab308" textAnchor="middle">解密算法</text>
            <line x1="120" y1="50" x2="140" y2="50" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow_en)" />
            <line x1="240" y1="50" x2="260" y2="50" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow_en)" />
            <line x1="360" y1="50" x2="380" y2="50" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow_en)" />
            <defs>
              <marker id="arrow_en" markerWidth="8" markerHeight="8" refX="8" refY="4" orient="auto" markerUnits="strokeWidth">
                <path d="M0,0 L8,4 L0,8" fill="#64748b" />
              </marker>
            </defs>
          </svg>
        </div>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>分类概述</PageTitle>
        <BookParagraph>加密算法分为对称加密和非对称加密两大类，实际应用中常与哈希、数字签名等技术结合使用。</BookParagraph>
        <BookAlert type="info" message="对称加密速度快但密钥分发困难（如AES），非对称加密安全性高但速度慢（如RSA）。实际应用中通常用非对称加密传输对称密钥，再用对称密钥加密数据。" />
      </div>
    ),
  },
  {
    label: '加密类型',
    left: (
      <div className="space-y-4">
        <PageTitle>对称加密与非对称加密</PageTitle>
        <SectionTitle>对称加密</SectionTitle>
        <BookParagraph>加密和解密使用同一密钥。优点是加解密速度快，适合大数据量加密。缺点是密钥分发困难，需要安全的密钥交换通道。</BookParagraph>
        <BookList items={[
          'AES（高级加密标准）：最常用的对称加密算法，支持128/192/256位密钥',
          'DES/3DES：老标准，已被AES取代',
          'SM4：中国国家密码标准',
        ]} />
        <SectionTitle>非对称加密</SectionTitle>
        <BookParagraph>加密和解密使用不同的密钥（公钥和私钥）。公钥可公开分发，私钥必须保密。优缺点与对称加密互补。</BookParagraph>
        <BookList items={[
          'RSA：最经典的非对称加密算法，基于大整数分解难题',
          'ECC（椭圆曲线加密）：比RSA效率更高，同等安全性下密钥更短',
          'SM2：中国国家密码标准（基于ECC）',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>哈希与数字签名</PageTitle>
        <SectionTitle>哈希算法</SectionTitle>
        <BookParagraph>将任意长度数据映射为固定长度哈希值，不可逆。用于数据完整性校验和密码存储。</BookParagraph>
        <BookList items={[
          'MD5：已被攻破，不推荐使用',
          'SHA-256：最常用的安全哈希算法',
          'SM3：中国国家密码标准',
          'bcrypt/argon2：专为密码存储设计的慢哈希算法',
        ]} />
        <SectionTitle>数字签名</SectionTitle>
        <BookParagraph>用私钥签名、公钥验证。用于验证数据来源和完整性，实现不可否认性。</BookParagraph>
        <BookList items={[
          'DSA：数字签名算法',
          'ECDSA：基于ECC的数字签名',
          'SM2签名：中国国家密码标准',
        ]} />
      </div>
    ),
  },
  {
    label: '应用场景',
    left: (
      <div className="space-y-4">
        <PageTitle>加密技术应用场景</PageTitle>
        <BookList items={[
          'HTTPS/TLS：使用非对称加密交换对称密钥，实现Web安全通信',
          '文件加密：使用对称加密保护文件（如BitLocker、LUKS）',
          '邮件加密：使用公钥加密邮件内容（如PGP）',
          '密码存储：使用慢哈希算法（bcrypt/argon2）存储密码哈希',
          '数字证书：PKI体系使用非对称加密签发数字证书',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>代码示例</PageTitle>
        <BookCode language="python" code={`# 对称加密示例 (AES)
from Crypto.Cipher import AES
import base64

key = b'Sixteen byte key'
cipher = AES.new(key, AES.MODE_EAX)
nonce = cipher.nonce
ciphertext, tag = cipher.encrypt_and_digest(b'Hello World')
print('密文:', base64.b64encode(ciphertext))`} />
        <BookCode language="python" code={`# 密码哈希 (bcrypt)
import bcrypt

password = b"my_secure_password"
salt = bcrypt.gensalt()
hashed = bcrypt.hashpw(password, salt)
print('哈希值:', hashed)`} />
      </div>
    ),
  },
  {
    label: '实际案例',
    left: (
      <div className="space-y-4">
        <PageTitle>加密技术实际案例</PageTitle>
        <BookList items={[
          '案例1：某电商网站未启用HTTPS，用户信用卡信息被中间人窃取。启示：所有Web应用必须启用HTTPS/TLS。',
          '案例2：某公司数据库被入侵，但用户密码使用bcrypt哈希存储，攻击者无法还原明文密码。启示：密码必须使用慢哈希算法存储。',
          '案例3：某软件公司代码签名私钥泄露，攻击者使用泄露的私钥签名恶意软件。启示：私钥必须严格保护，使用HSM硬件存储。',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>最佳实践</PageTitle>
        <BookList items={[
          '使用强加密算法（AES-256、RSA-2048+、SHA-256）',
          '密钥管理使用安全的密钥管理系统（KMS）',
          'TLS配置使用最新版本（TLS 1.3），禁用过时协议',
          '密码存储使用bcrypt/argon2等慢哈希算法',
          'HTTPS全站启用，包括子域名和API',
          '定期轮换加密密钥，遵循密钥生命周期管理',
          '使用HSM（硬件安全模块）保护关键密钥',
        ]} />
      </div>
    ),
  },
]

export default function EncryptionPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
