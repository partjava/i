'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import {
  PageTitle, SectionTitle, BookParagraph, BookCode, BookAlert, BookList, TagGrid,
} from '@/app/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '网络安全',
  chapterTitle: '对称加密',
  chapterNumber: 2,
  totalChapters: 10,
  subjectHref: '/study/security/crypto',
  prevChapter: { label: '密码学基础', href: '/study/security/crypto/basic' },
  nextChapter: { label: '非对称加密', href: '/study/security/crypto/asymmetric' },
  theme: THEMES.security,
}

const pyAES = `from Crypto.Cipher import AES
from Crypto.Random import get_random_bytes
from Crypto.Util.Padding import pad, unpad
import base64

def encrypt_aes(plaintext: str, key: bytes) -> tuple:
    # 生成随机IV
    iv = get_random_bytes(AES.block_size)
    # 创建AES加密器
    cipher = AES.new(key, AES.MODE_CBC, iv)
    # 加密数据
    padded_data = pad(plaintext.encode(), AES.block_size)
    ciphertext = cipher.encrypt(padded_data)
    # 返回IV和密文
    return iv, ciphertext

def decrypt_aes(iv: bytes, ciphertext: bytes, key: bytes) -> str:
    # 创建AES解密器
    cipher = AES.new(key, AES.MODE_CBC, iv)
    # 解密数据
    padded_plaintext = cipher.decrypt(ciphertext)
    # 去除填充
    plaintext = unpad(padded_plaintext, AES.block_size)
    return plaintext.decode()

# 使用示例
key = get_random_bytes(32)  # 256位密钥
message = "Hello, World!"
iv, encrypted = encrypt_aes(message, key)
decrypted = decrypt_aes(iv, encrypted, key)
print(f"原文: {message}")
print(f"密文: {base64.b64encode(encrypted).decode()}")
print(f"解密: {decrypted}")`

const javaAES = `import javax.crypto.Cipher;
import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import javax.crypto.spec.IvParameterSpec;
import java.security.SecureRandom;
import java.util.Base64;

public class AESExample {
    public static void main(String[] args) throws Exception {
        // 生成密钥
        KeyGenerator keyGen = KeyGenerator.getInstance("AES");
        keyGen.init(256);
        SecretKey key = keyGen.generateKey();

        // 生成IV
        byte[] iv = new byte[16];
        new SecureRandom().nextBytes(iv);
        IvParameterSpec ivSpec = new IvParameterSpec(iv);

        // 加密
        Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
        cipher.init(Cipher.ENCRYPT_MODE, key, ivSpec);
        String message = "Hello, World!";
        byte[] encrypted = cipher.doFinal(message.getBytes());

        // 解密
        cipher.init(Cipher.DECRYPT_MODE, key, ivSpec);
        byte[] decrypted = cipher.doFinal(encrypted);

        System.out.println("原文: " + message);
        System.out.println("密文: " + Base64.getEncoder().encodeToString(encrypted));
        System.out.println("解密: " + new String(decrypted));
    }
}`

const SPREADS = [
  {
    label: '基本概念',
    left: (
      <div className="space-y-4">
        <PageTitle>对称加密基本概念</PageTitle>
        <BookParagraph>对称加密是一种使用相同密钥进行加密和解密的加密方式。它的特点是加密和解密速度快，但密钥管理较为复杂。</BookParagraph>
        <BookList items={['使用相同的密钥进行加密和解密', '加密速度快，适合大量数据加密', '密钥管理复杂，需要安全传输密钥', '常见的密钥长度：128位、192位、256位']} />
        <div style={{ textAlign: 'center', margin: '16px 0' }}>
          <svg width="700" height="140" viewBox="0 0 700 140">
            <rect x="30" y="55" width="90" height="35" rx="8" fill="#f3f4f6" stroke="#6366f1" />
            <text x="75" y="78" textAnchor="middle" fill="#6366f1" fontSize="14">明文</text>
            <path d="M120 72 L 170 72" stroke="#6366f1" strokeWidth="2" />
            <text x="145" y="62" textAnchor="middle" fill="#6366f1" fontSize="12">加密</text>
            <rect x="170" y="55" width="90" height="35" rx="8" fill="#f3f4f6" stroke="#6366f1" />
            <text x="215" y="78" textAnchor="middle" fill="#6366f1" fontSize="14">密文</text>
            <path d="M260 72 L 310 72" stroke="#6366f1" strokeWidth="2" />
            <text x="285" y="62" textAnchor="middle" fill="#6366f1" fontSize="12">传输</text>
            <rect x="310" y="55" width="90" height="35" rx="8" fill="#f3f4f6" stroke="#6366f1" />
            <text x="355" y="78" textAnchor="middle" fill="#6366f1" fontSize="14">密文</text>
            <path d="M400 72 L 450 72" stroke="#6366f1" strokeWidth="2" />
            <text x="425" y="62" textAnchor="middle" fill="#6366f1" fontSize="12">解密</text>
            <rect x="450" y="55" width="90" height="35" rx="8" fill="#f3f4f6" stroke="#6366f1" />
            <text x="495" y="78" textAnchor="middle" fill="#6366f1" fontSize="14">明文</text>
            <rect x="250" y="10" width="90" height="35" rx="8" fill="#f3f4f6" stroke="#f59e42" />
            <text x="295" y="33" textAnchor="middle" fill="#f59e42" fontSize="14">密钥</text>
            <path d="M295 45 L 295 55" stroke="#f59e42" strokeWidth="2" strokeDasharray="4,4" />
            <path d="M295 90 L 295 100" stroke="#f59e42" strokeWidth="2" strokeDasharray="4,4" />
          </svg>
        </div>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>应用场景</PageTitle>
        <BookList items={['文件加密存储', '数据库加密', '网络通信加密', '磁盘加密', '内存数据保护']} />
      </div>
    ),
  },
  {
    label: '常用算法',
    left: (
      <div className="space-y-4">
        <PageTitle>对称加密算法</PageTitle>
        <SectionTitle>AES (Advanced Encryption Standard)</SectionTitle>
        <BookList items={['密钥长度：128位、192位、256位', '分组长度：128位', '轮数：10轮(128位)、12轮(192位)、14轮(256位)', '安全性：目前最安全的对称加密算法之一']} />
        <SectionTitle>DES (Data Encryption Standard)</SectionTitle>
        <BookList items={['密钥长度：56位（实际64位，8位用于奇偶校验）', '分组长度：64位', '轮数：16轮', '安全性：已不再安全，仅用于学习']} />
        <SectionTitle>3DES (Triple DES)</SectionTitle>
        <BookList items={['密钥长度：168位（实际192位）', '分组长度：64位', '原理：使用DES算法三次', '安全性：比DES更安全，但效率较低']} />
        <SectionTitle>ChaCha20</SectionTitle>
        <BookList items={['密钥长度：256位', '分组长度：512位', '特点：软件实现效率高，适合移动设备', '应用：TLS 1.3、QUIC协议']} />
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
                <th className="border p-2" style={{ border: '1px solid #ddd' }}>分组长度</th>
                <th className="border p-2" style={{ border: '1px solid #ddd' }}>安全性</th>
                <th className="border p-2" style={{ border: '1px solid #ddd' }}>性能</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="border p-2" style={{ border: '1px solid #ddd' }}>AES</td><td className="border p-2" style={{ border: '1px solid #ddd' }}>128/192/256位</td><td className="border p-2" style={{ border: '1px solid #ddd' }}>128位</td><td className="border p-2" style={{ border: '1px solid #ddd' }}>高</td><td className="border p-2" style={{ border: '1px solid #ddd' }}>高</td></tr>
              <tr><td className="border p-2" style={{ border: '1px solid #ddd' }}>DES</td><td className="border p-2" style={{ border: '1px solid #ddd' }}>56位</td><td className="border p-2" style={{ border: '1px solid #ddd' }}>64位</td><td className="border p-2" style={{ border: '1px solid #ddd' }}>低</td><td className="border p-2" style={{ border: '1px solid #ddd' }}>中</td></tr>
              <tr><td className="border p-2" style={{ border: '1px solid #ddd' }}>3DES</td><td className="border p-2" style={{ border: '1px solid #ddd' }}>168位</td><td className="border p-2" style={{ border: '1px solid #ddd' }}>64位</td><td className="border p-2" style={{ border: '1px solid #ddd' }}>中</td><td className="border p-2" style={{ border: '1px solid #ddd' }}>低</td></tr>
              <tr><td className="border p-2" style={{ border: '1px solid #ddd' }}>ChaCha20</td><td className="border p-2" style={{ border: '1px solid #ddd' }}>256位</td><td className="border p-2" style={{ border: '1px solid #ddd' }}>512位</td><td className="border p-2" style={{ border: '1px solid #ddd' }}>高</td><td className="border p-2" style={{ border: '1px solid #ddd' }}>高</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    ),
  },
  {
    label: '工作模式',
    left: (
      <div className="space-y-4">
        <PageTitle>工作模式</PageTitle>
        <SectionTitle>ECB (Electronic Codebook)</SectionTitle>
        <BookList items={['特点：简单，并行处理', '缺点：相同明文产生相同密文，容易受到重放攻击', '应用：不推荐用于实际应用']} />
        <SectionTitle>CBC (Cipher Block Chaining)</SectionTitle>
        <BookList items={['特点：使用IV（初始化向量），每个块依赖前一个块', '优点：相同明文产生不同密文', '缺点：不能并行处理', '应用：广泛使用，如TLS']} />
        <SectionTitle>CTR (Counter)</SectionTitle>
        <BookList items={['特点：使用计数器，可以并行处理', '优点：高效，安全性好', '应用：广泛使用，如AES-GCM']} />
        <SectionTitle>GCM (Galois/Counter Mode)</SectionTitle>
        <BookList items={['特点：认证加密模式', '优点：同时提供加密和认证', '应用：TLS 1.2+、IPsec']} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>模式比较</PageTitle>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2" style={{ border: '1px solid #ddd' }}>模式</th>
                <th className="border p-2" style={{ border: '1px solid #ddd' }}>并行性</th>
                <th className="border p-2" style={{ border: '1px solid #ddd' }}>认证</th>
                <th className="border p-2" style={{ border: '1px solid #ddd' }}>IV要求</th>
                <th className="border p-2" style={{ border: '1px solid #ddd' }}>应用</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="border p-2" style={{ border: '1px solid #ddd' }}>ECB</td><td className="border p-2" style={{ border: '1px solid #ddd' }}>是</td><td className="border p-2" style={{ border: '1px solid #ddd' }}>否</td><td className="border p-2" style={{ border: '1px solid #ddd' }}>否</td><td className="border p-2" style={{ border: '1px solid #ddd' }}>不推荐</td></tr>
              <tr><td className="border p-2" style={{ border: '1px solid #ddd' }}>CBC</td><td className="border p-2" style={{ border: '1px solid #ddd' }}>否</td><td className="border p-2" style={{ border: '1px solid #ddd' }}>否</td><td className="border p-2" style={{ border: '1px solid #ddd' }}>是</td><td className="border p-2" style={{ border: '1px solid #ddd' }}>通用</td></tr>
              <tr><td className="border p-2" style={{ border: '1px solid #ddd' }}>CTR</td><td className="border p-2" style={{ border: '1px solid #ddd' }}>是</td><td className="border p-2" style={{ border: '1px solid #ddd' }}>否</td><td className="border p-2" style={{ border: '1px solid #ddd' }}>是</td><td className="border p-2" style={{ border: '1px solid #ddd' }}>高性能</td></tr>
              <tr><td className="border p-2" style={{ border: '1px solid #ddd' }}>GCM</td><td className="border p-2" style={{ border: '1px solid #ddd' }}>是</td><td className="border p-2" style={{ border: '1px solid #ddd' }}>是</td><td className="border p-2" style={{ border: '1px solid #ddd' }}>是</td><td className="border p-2" style={{ border: '1px solid #ddd' }}>安全通信</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    ),
  },
  {
    label: '实现示例',
    left: (
      <div className="space-y-4">
        <PageTitle>Python实现AES加密</PageTitle>
        <BookCode language="python" code={pyAES} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>Java与OpenSSL示例</PageTitle>
        <BookCode language="java" code={javaAES} />
        <BookCode language="bash" code={`# 生成随机密钥
openssl rand -hex 32 > key.txt

# 加密文件
openssl enc -aes-256-cbc -in plaintext.txt -out ciphertext.bin -K $(cat key.txt) -iv $(openssl rand -hex 16)

# 解密文件
openssl enc -aes-256-cbc -d -in ciphertext.bin -out decrypted.txt -K $(cat key.txt) -iv $(openssl rand -hex 16)

# 使用密码加密（更安全）
openssl enc -aes-256-cbc -salt -in plaintext.txt -out ciphertext.bin -pass pass:your_password`} />
      </div>
    ),
  },
  {
    label: '安全考虑',
    left: (
      <div className="space-y-4">
        <PageTitle>安全考虑</PageTitle>
        <SectionTitle>密钥管理</SectionTitle>
        <BookList items={['使用安全的密钥生成方法', '定期轮换密钥', '安全存储密钥', '使用密钥派生函数（KDF）']} />
        <SectionTitle>常见攻击</SectionTitle>
        <BookList items={['重放攻击', '中间人攻击', '暴力破解', '侧信道攻击']} />
        <SectionTitle>最佳实践</SectionTitle>
        <BookList items={['使用强密钥（至少128位）', '使用安全的随机数生成器', '使用认证加密模式（如GCM）', '正确使用IV（随机且不重复）', '实现完整性检查']} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>安全检查清单</PageTitle>
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
              <tr><td className="border p-2" style={{ border: '1px solid #ddd' }}>密钥长度</td><td className="border p-2" style={{ border: '1px solid #ddd' }}>至少128位，推荐256位</td><td className="border p-2" style={{ border: '1px solid #ddd' }}>高</td></tr>
              <tr><td className="border p-2" style={{ border: '1px solid #ddd' }}>加密模式</td><td className="border p-2" style={{ border: '1px solid #ddd' }}>避免ECB，推荐GCM</td><td className="border p-2" style={{ border: '1px solid #ddd' }}>高</td></tr>
              <tr><td className="border p-2" style={{ border: '1px solid #ddd' }}>IV管理</td><td className="border p-2" style={{ border: '1px solid #ddd' }}>随机生成，不重复使用</td><td className="border p-2" style={{ border: '1px solid #ddd' }}>高</td></tr>
              <tr><td className="border p-2" style={{ border: '1px solid #ddd' }}>密钥轮换</td><td className="border p-2" style={{ border: '1px solid #ddd' }}>定期更换密钥</td><td className="border p-2" style={{ border: '1px solid #ddd' }}>中</td></tr>
              <tr><td className="border p-2" style={{ border: '1px solid #ddd' }}>完整性验证</td><td className="border p-2" style={{ border: '1px solid #ddd' }}>使用HMAC或认证加密</td><td className="border p-2" style={{ border: '1px solid #ddd' }}>高</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    ),
  },
]

export default function SymmetricCryptoPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
