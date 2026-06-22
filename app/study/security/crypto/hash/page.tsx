'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import {
  PageTitle, SectionTitle, BookParagraph, BookCode, BookAlert, BookList, TagGrid,
} from '@/app/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '网络安全',
  chapterTitle: '哈希函数',
  chapterNumber: 4,
  totalChapters: 10,
  subjectHref: '/study/security/crypto',
  prevChapter: { label: '非对称加密', href: '/study/security/crypto/asymmetric' },
  nextChapter: { label: '数字签名', href: '/study/security/crypto/signature' },
  theme: THEMES.security,
}

const SPREADS = [
  {
    label: '基本概念',
    left: (
      <div className="space-y-4">
        <PageTitle>哈希函数基本概念</PageTitle>
        <BookParagraph>哈希函数是一种将任意长度的输入数据映射为固定长度输出（哈希值）的单向函数。它具有不可逆性、抗碰撞性等特点，广泛应用于数据完整性校验、密码存储、数字签名等场景。</BookParagraph>
        <BookList items={['任意长度的输入，固定长度的输出', '单向性：无法从哈希值还原原始数据', '抗碰撞性：难以找到两个不同输入产生相同哈希值', '雪崩效应：输入微小变化导致输出剧变']} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>常见哈希算法</PageTitle>
        <BookList items={['MD5：128位输出，已被攻破，不推荐使用', 'SHA-1：160位输出，已被攻破，不推荐使用', 'SHA-256：256位输出，最常用的安全哈希算法', 'SHA-3：最新SHA标准，安全性更高', 'SM3：中国国家密码标准，256位输出', 'bcrypt/argon2：专为密码存储设计的慢哈希算法']} />
        <BookCode language="bash" code={`# 计算文件SHA-256哈希值
sha256sum file.txt

# OpenSSL计算哈希
echo -n "hello" | openssl dgst -sha256

# 生成并验证文件完整性
openssl dgst -sha256 -out file.sha256 file.txt
openssl dgst -sha256 -verify file.sha256 file.txt`} />
      </div>
    ),
  },
  {
    label: '应用场景',
    left: (
      <div className="space-y-4">
        <PageTitle>哈希函数应用场景</PageTitle>
        <BookList items={['密码存储：存储密码的哈希值而非明文（使用bcrypt/argon2）', '数据完整性校验：验证文件下载是否完整（SHA校验和）', '数字签名：对消息哈希值而非完整消息签名', '区块链：区块链接的核心，交易哈希和区块哈希', 'Git版本控制：每次提交由SHA-1哈希唯一标识']} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>代码示例</PageTitle>
        <BookCode language="python" code={`import hashlib

# 计算字符串SHA-256哈希
data = "Hello, World!"
hash_obj = hashlib.sha256(data.encode())
print(hash_obj.hexdigest())

# 计算文件哈希
with open('file.txt', 'rb') as f:
    file_hash = hashlib.sha256(f.read()).hexdigest()
print(file_hash)

# bcrypt密码哈希
import bcrypt
password = b"my_secure_password"
salt = bcrypt.gensalt()
hashed = bcrypt.hashpw(password, salt)
print(bcrypt.checkpw(password, hashed))  # True`} />
        <BookAlert type="warning" message="MD5和SHA-1已被证明存在碰撞攻击，不再安全。生产环境中应使用SHA-256或更强的哈希算法。密码存储应使用专为此设计的慢哈希算法（bcrypt、argon2、scrypt）。" />
      </div>
    ),
  },
]

export default function HashFunctionPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
