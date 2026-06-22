'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import {
  PageTitle, SectionTitle, BookParagraph, BookCode, BookAlert, BookList, TagGrid,
} from '@/app/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '网络安全',
  chapterTitle: '密码学基础',
  chapterNumber: 1,
  totalChapters: 10,
  subjectHref: '/study/security/crypto',
  nextChapter: { label: '对称加密', href: '/study/security/crypto/symmetric' },
  theme: THEMES.security,
}

const SPREADS = [
  {
    label: '基本概念',
    left: (
      <div className="space-y-4">
        <PageTitle>密码学基本概念</PageTitle>
        <BookParagraph>密码学是研究信息加密、解密、认证、完整性保护等技术的科学，旨在保障信息的机密性、完整性、可用性和不可否认性。现代密码学不仅关注加密算法，还包括协议设计、密钥管理、攻击与防御等内容。</BookParagraph>
        <BookList items={['机密性：防止信息被未授权者获取', '完整性：防止信息被篡改', '认证性：验证信息来源和身份', '不可否认性：防止事后否认行为']} />
        <BookAlert type="info" message="生活中的密码学案例：微信/支付宝支付短信验证码、HTTPS加密访问网站、数字签名的电子合同、区块链中的哈希算法。" />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>发展历史</PageTitle>
        <BookList items={['古典密码学：如凯撒密码、维吉尼亚密码、恩尼格玛机', '二战后现代密码学：香农信息论、DES、RSA等算法诞生', '公钥密码学：Diffie-Hellman密钥交换、椭圆曲线密码学', '互联网时代：SSL/TLS、区块链、零知识证明等新技术']} />
        <div style={{ textAlign: 'center', margin: '16px 0' }}>
          <svg width="800" height="80" viewBox="0 0 800 80">
            <rect x="40" y="35" width="720" height="6" rx="3" fill="#6366f1" />
            <circle cx="80" cy="38" r="10" fill="#6366f1" /><text x="80" y="68" textAnchor="middle" fontSize="12" fill="#6366f1">古典</text>
            <circle cx="260" cy="38" r="10" fill="#06b6d4" /><text x="260" y="68" textAnchor="middle" fontSize="12" fill="#06b6d4">现代</text>
            <circle cx="440" cy="38" r="10" fill="#fbbf24" /><text x="440" y="68" textAnchor="middle" fontSize="12" fill="#fbbf24">公钥</text>
            <circle cx="620" cy="38" r="10" fill="#f472b6" /><text x="620" y="68" textAnchor="middle" fontSize="12" fill="#f472b6">互联网</text>
            <circle cx="760" cy="38" r="10" fill="#34d399" /><text x="760" y="68" textAnchor="middle" fontSize="12" fill="#34d399">前沿</text>
          </svg>
        </div>
      </div>
    ),
  },
  {
    label: '主要分支',
    left: (
      <div className="space-y-4">
        <PageTitle>密码学主要分支</PageTitle>
        <BookList items={['对称加密：加密和解密使用同一密钥，如AES、DES', '非对称加密：使用公钥和私钥，如RSA、ECC', '哈希函数：单向散列算法，如SHA-256、MD5', '数字签名：验证数据完整性和身份，如DSA、ECDSA', '密钥交换协议：安全协商密钥，如Diffie-Hellman', '零知识证明：不泄露秘密的情况下证明某事', '密码协议与应用：SSL/TLS、区块链、数字货币等']} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>分支结构图</PageTitle>
        <div style={{ textAlign: 'center', margin: '16px 0' }}>
          <svg width="700" height="200" viewBox="0 0 700 200">
            <rect x="340" y="20" width="16" height="160" rx="8" fill="#6366f1" />
            <rect x="356" y="40" width="150" height="16" rx="8" fill="#fbbf24" /><text x="436" y="52" textAnchor="middle" fill="#fff" fontSize="12">对称加密</text>
            <rect x="200" y="60" width="150" height="16" rx="8" fill="#f472b6" /><text x="275" y="72" textAnchor="middle" fill="#fff" fontSize="12">非对称加密</text>
            <rect x="356" y="90" width="150" height="16" rx="8" fill="#34d399" /><text x="436" y="102" textAnchor="middle" fill="#fff" fontSize="12">哈希函数</text>
            <rect x="200" y="110" width="150" height="16" rx="8" fill="#06b6d4" /><text x="275" y="122" textAnchor="middle" fill="#fff" fontSize="12">数字签名</text>
            <rect x="356" y="140" width="150" height="16" rx="8" fill="#6366f1" /><text x="436" y="152" textAnchor="middle" fill="#fff" fontSize="12">密钥交换</text>
            <rect x="200" y="160" width="150" height="16" rx="8" fill="#f59e42" /><text x="275" y="172" textAnchor="middle" fill="#fff" fontSize="12">零知识证明</text>
          </svg>
        </div>
      </div>
    ),
  },
  {
    label: '术语与应用',
    left: (
      <div className="space-y-4">
        <PageTitle>密码学常用术语</PageTitle>
        <BookList items={['明文（Plaintext）：未加密的原始信息', '密文（Ciphertext）：加密后的信息', '密钥（Key）：控制加密和解密过程的参数', '加密（Encryption）：明文转为密文的过程', '解密（Decryption）：密文还原为明文的过程', '算法（Algorithm）：实现加密/解密的数学方法', '攻击者（Attacker）：试图破解加密系统的人', '安全性（Security）：加密系统抵抗攻击的能力']} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>应用场景与示例</PageTitle>
        <BookList items={['网络通信加密（HTTPS、VPN、TLS）', '数据存储加密（磁盘、数据库、云存储）', '数字签名与身份认证（电子合同、区块链、CA证书）', '访问控制与权限管理（密钥卡、门禁系统）', '数字货币与区块链（比特币、以太坊）', '隐私保护与匿名通信（Tor、零知识证明）']} />
        <BookCode language="bash" code={`# 生成RSA密钥对
openssl genrsa -out private.pem 2048
openssl rsa -in private.pem -pubout -out public.pem

# 文件加密
openssl enc -aes-256-cbc -in secret.txt -out secret.enc

# 数字签名
openssl dgst -sha256 -sign private.pem -out sign.bin data.txt`} />
      </div>
    ),
  },
]

export default function CryptoBasicPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
