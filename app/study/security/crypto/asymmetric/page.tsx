'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import {
  PageTitle, SectionTitle, BookParagraph, BookCode, BookAlert, BookList, TagGrid,
} from '@/app/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '网络安全',
  chapterTitle: '非对称加密',
  chapterNumber: 3,
  totalChapters: 10,
  subjectHref: '/study/security/crypto',
  prevChapter: { label: '对称加密', href: '/study/security/crypto/symmetric' },
  nextChapter: { label: '哈希函数', href: '/study/security/crypto/hash' },
  theme: THEMES.security,
}

const SPREADS = [
  {
    label: '基本概念',
    left: (
      <div className="space-y-4">
        <PageTitle>非对称加密基本概念</PageTitle>
        <BookParagraph>非对称加密是一种使用不同密钥进行加密和解密的加密方式。公钥可以公开分享，私钥必须保密。它的特点是安全性高，但加解密速度慢。</BookParagraph>
        <BookList items={['使用不同的密钥进行加密和解密（公钥和私钥）', '公钥可公开分发，私钥必须保密', '加密速度较慢，适合小数据量加密', '常见算法：RSA、ECC、SM2']} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>工作原理与流程</PageTitle>
        <div style={{ textAlign: 'center', margin: '16px 0' }}>
          <svg width="700" height="140" viewBox="0 0 700 140">
            <rect x="20" y="55" width="90" height="35" rx="8" fill="#f3f4f6" stroke="#6366f1" />
            <text x="65" y="78" textAnchor="middle" fill="#6366f1" fontSize="14">明文</text>
            <rect x="130" y="55" width="90" height="35" rx="8" fill="#f3f4f6" stroke="#f472b6" />
            <text x="175" y="78" textAnchor="middle" fill="#f472b6" fontSize="14">公钥加密</text>
            <rect x="240" y="55" width="90" height="35" rx="8" fill="#f3f4f6" stroke="#6366f1" />
            <text x="285" y="78" textAnchor="middle" fill="#6366f1" fontSize="14">密文</text>
            <rect x="350" y="55" width="90" height="35" rx="8" fill="#f3f4f6" stroke="#06b6d4" />
            <text x="395" y="78" textAnchor="middle" fill="#06b6d4" fontSize="14">私钥解密</text>
            <rect x="460" y="55" width="90" height="35" rx="8" fill="#f3f4f6" stroke="#6366f1" />
            <text x="505" y="78" textAnchor="middle" fill="#6366f1" fontSize="14">明文</text>
            <path d="M110 72 L 130 72" stroke="#64748b" strokeWidth="2" />
            <path d="M220 72 L 240 72" stroke="#64748b" strokeWidth="2" />
            <path d="M330 72 L 350 72" stroke="#64748b" strokeWidth="2" />
            <path d="M440 72 L 460 72" stroke="#64748b" strokeWidth="2" />
            <rect x="130" y="10" width="90" height="30" rx="8" fill="#f3f4f6" stroke="#34d399" />
            <text x="175" y="31" textAnchor="middle" fill="#34d399" fontSize="12">公钥</text>
            <rect x="350" y="10" width="90" height="30" rx="8" fill="#f3f4f6" stroke="#f59e42" />
            <text x="395" y="31" textAnchor="middle" fill="#f59e42" fontSize="12">私钥</text>
            <path d="M175 40 L 175 55" stroke="#34d399" strokeWidth="1.5" strokeDasharray="3,3" />
            <path d="M395 40 L 395 55" stroke="#f59e42" strokeWidth="1.5" strokeDasharray="3,3" />
          </svg>
        </div>
        <BookList items={['加密：发送方用接收方的公钥加密数据', '解密：接收方用自己的私钥解密数据', '数字签名：发送方用自己的私钥签名，接收方用发送方的公钥验证']} />
      </div>
    ),
  },
  {
    label: '常用算法',
    left: (
      <div className="space-y-4">
        <PageTitle>RSA算法</PageTitle>
        <BookParagraph>RSA是最经典的非对称加密算法，基于大整数分解难题。密钥长度通常为2048位或4096位，安全性高但计算量大。</BookParagraph>
        <SectionTitle>ECC（椭圆曲线加密）</SectionTitle>
        <BookParagraph>ECC基于椭圆曲线离散对数难题，同等安全性下密钥更短（256位ECC ≈ 3072位RSA），性能更好。</BookParagraph>
        <SectionTitle>SM2</SectionTitle>
        <BookParagraph>中国国家密码标准，基于ECC。主要用于数字签名和密钥交换。</BookParagraph>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>算法比较</PageTitle>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2" style={{ border: '1px solid #ddd' }}>算法</th>
                <th className="border p-2" style={{ border: '1px solid #ddd' }}>密钥长度</th>
                <th className="border p-2" style={{ border: '1px solid #ddd' }}>安全性</th>
                <th className="border p-2" style={{ border: '1px solid #ddd' }}>性能</th>
                <th className="border p-2" style={{ border: '1px solid #ddd' }}>应用</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="border p-2" style={{ border: '1px solid #ddd' }}>RSA</td><td className="border p-2" style={{ border: '1px solid #ddd' }}>2048/4096位</td><td className="border p-2" style={{ border: '1px solid #ddd' }}>高</td><td className="border p-2" style={{ border: '1px solid #ddd' }}>慢</td><td className="border p-2" style={{ border: '1px solid #ddd' }}>通用</td></tr>
              <tr><td className="border p-2" style={{ border: '1px solid #ddd' }}>ECC</td><td className="border p-2" style={{ border: '1px solid #ddd' }}>256/521位</td><td className="border p-2" style={{ border: '1px solid #ddd' }}>高</td><td className="border p-2" style={{ border: '1px solid #ddd' }}>快</td><td className="border p-2" style={{ border: '1px solid #ddd' }}>移动/Web</td></tr>
              <tr><td className="border p-2" style={{ border: '1px solid #ddd' }}>SM2</td><td className="border p-2" style={{ border: '1px solid #ddd' }}>256位</td><td className="border p-2" style={{ border: '1px solid #ddd' }}>高</td><td className="border p-2" style={{ border: '1px solid #ddd' }}>快</td><td className="border p-2" style={{ border: '1px solid #ddd' }}>国密</td></tr>
            </tbody>
          </table>
        </div>
        <BookCode language="bash" code={`# 生成RSA密钥对
openssl genrsa -out private.pem 2048
openssl rsa -in private.pem -pubout -out public.pem

# 使用公钥加密
echo "hello" | openssl rsautl -encrypt -pubin -inkey public.pem -out enc.bin

# 使用私钥解密
openssl rsautl -decrypt -inkey private.pem -in enc.bin`} />
      </div>
    ),
  },
  {
    label: '应用场景',
    left: (
      <div className="space-y-4">
        <PageTitle>应用场景</PageTitle>
        <BookList items={['HTTPS/TLS握手：使用非对称加密交换对称密钥', '数字签名：身份验证和不可否认性', '安全邮件：PGP加密和签名', '区块链：钱包地址和交易签名', 'SSH登录：公钥认证方式']} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>安全考虑</PageTitle>
        <BookList items={['密钥长度：RSA至少2048位，ECC至少256位', '私钥保护：使用HSM或安全存储', '量子威胁：Shor算法可破解RSA和ECC', '后量子密码学：正在标准化中']} />
      </div>
    ),
  },
]

export default function AsymmetricCryptoPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
