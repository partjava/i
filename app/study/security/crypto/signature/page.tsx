'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import {
  PageTitle, SectionTitle, BookParagraph, BookCode, BookAlert, BookList,
} from '@shared/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '网络安全',
  chapterTitle: '数字签名',
  chapterNumber: 5,
  totalChapters: 10,
  subjectHref: '/study/security/crypto',
  prevChapter: { label: '哈希函数', href: '/study/security/crypto/hash' },
  nextChapter: { label: '密钥管理', href: '/study/security/crypto/key' },
  theme: THEMES.security,
}

const pySignature = `from Crypto.PublicKey import RSA
from Crypto.Signature import pkcs1_15
from Crypto.Hash import SHA256
import base64

def generate_key_pair():
    """生成RSA密钥对"""
    key = RSA.generate(2048)
    private_key = key.export_key()
    public_key = key.publickey().export_key()
    return private_key, public_key

def sign_message(message: str, private_key: bytes) -> str:
    """使用RSA私钥签名消息"""
    key = RSA.import_key(private_key)
    hash_obj = SHA256.new(message.encode())
    signature = pkcs1_15.new(key).sign(hash_obj)
    return base64.b64encode(signature).decode()

def verify_signature(message: str, signature: str, public_key: bytes) -> bool:
    """使用RSA公钥验证签名"""
    key = RSA.import_key(public_key)
    hash_obj = SHA256.new(message.encode())
    try:
        pkcs1_15.new(key).verify(hash_obj, base64.b64decode(signature))
        return True
    except (ValueError, TypeError):
        return False

# 使用示例
if __name__ == "__main__":
    # 生成密钥对
    private_key, public_key = generate_key_pair()

    # 签名消息
    message = "Hello, World!"
    signature = sign_message(message, private_key)
    print(f"消息: {message}")
    print(f"签名: {signature}")

    # 验证签名
    is_valid = verify_signature(message, signature, public_key)
    print(f"验证结果: {is_valid}")

    # 尝试篡改消息
    tampered_message = "Hello, World!!"
    is_valid = verify_signature(tampered_message, signature, public_key)
    print(f"篡改后验证结果: {is_valid}")`

const javaSignature = `import java.security.*;
import java.security.spec.*;
import java.util.Base64;

public class DigitalSignatureExample {
    public static void main(String[] args) throws Exception {
        // 生成密钥对
        KeyPairGenerator keyGen = KeyPairGenerator.getInstance("RSA");
        keyGen.initialize(2048);
        KeyPair pair = keyGen.generateKeyPair();
        PrivateKey privateKey = pair.getPrivate();
        PublicKey publicKey = pair.getPublic();

        // 签名消息
        String message = "Hello, World!";
        Signature signature = Signature.getInstance("SHA256withRSA");
        signature.initSign(privateKey);
        signature.update(message.getBytes());
        byte[] signatureBytes = signature.sign();

        // 验证签名
        signature.initVerify(publicKey);
        signature.update(message.getBytes());
        boolean isValid = signature.verify(signatureBytes);

        System.out.println("消息: " + message);
        System.out.println("签名: " + Base64.getEncoder().encodeToString(signatureBytes));
        System.out.println("验证结果: " + isValid);

        // 尝试篡改消息
        String tamperedMessage = "Hello, World!!";
        signature.initVerify(publicKey);
        signature.update(tamperedMessage.getBytes());
        boolean isTamperedValid = signature.verify(signatureBytes);
        System.out.println("篡改后验证结果: " + isTamperedValid);
    }
}`

const opensslSignature = `# 生成RSA私钥
openssl genrsa -out private.pem 2048

# 从私钥生成公钥
openssl rsa -in private.pem -pubout -out public.pem

# 创建要签名的文件
echo "Hello, World!" > message.txt

# 使用私钥签名
openssl dgst -sha256 -sign private.pem -out signature.bin message.txt

# 使用公钥验证签名
openssl dgst -sha256 -verify public.pem -signature signature.bin message.txt

# 查看签名内容（Base64编码）
openssl base64 -in signature.bin -out signature.txt`

const SPREADS = [
  {
    label: '基本概念',
    left: (
      <div className="space-y-4">
        <PageTitle>数字签名基本概念</PageTitle>
        <BookParagraph>
          数字签名是一种基于公钥密码学的技术，用于验证数字消息或文档的真实性和完整性。它提供了身份认证、数据完整性、不可否认性等安全特性。
        </BookParagraph>
        <SectionTitle>核心特性</SectionTitle>
        <BookList items={[
          '身份认证：验证消息发送者的身份',
          '数据完整性：确保消息未被篡改',
          '不可否认性：发送者无法否认其签名',
          '时间戳：可以证明签名的时间',
          '可验证性：任何人都可以验证签名',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>数字签名工作流程</PageTitle>
        <div style={{ textAlign: 'center', margin: '16px 0' }}>
          <svg width="900" height="300" viewBox="0 0 900 300" className="w-full">
            <defs>
              <linearGradient id="signatureFlow" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
            </defs>
            {/* 发送方 */}
            <rect x="50" y="50" width="120" height="40" rx="8" fill="#f3f4f6" stroke="#6366f1" />
            <text x="110" y="75" textAnchor="middle" fill="#6366f1">发送方</text>
            <rect x="50" y="100" width="120" height="40" rx="8" fill="#f3f4f6" stroke="#6366f1" />
            <text x="110" y="125" textAnchor="middle" fill="#6366f1">原始消息</text>
            <path d="M170 120 L 230 120" stroke="#6366f1" strokeWidth="2" />
            <text x="200" y="110" textAnchor="middle" fill="#6366f1">哈希</text>
            <rect x="230" y="100" width="120" height="40" rx="8" fill="#f3f4f6" stroke="#6366f1" />
            <text x="290" y="125" textAnchor="middle" fill="#6366f1">消息摘要</text>
            <path d="M350 120 L 410 120" stroke="#6366f1" strokeWidth="2" />
            <text x="380" y="110" textAnchor="middle" fill="#6366f1">私钥签名</text>
            <rect x="410" y="100" width="120" height="40" rx="8" fill="#f3f4f6" stroke="#6366f1" />
            <text x="470" y="125" textAnchor="middle" fill="#6366f1">数字签名</text>
            {/* 接收方 */}
            <rect x="410" y="50" width="120" height="40" rx="8" fill="#f3f4f6" stroke="#06b6d4" />
            <text x="470" y="75" textAnchor="middle" fill="#06b6d4">接收方</text>
            <rect x="590" y="100" width="120" height="40" rx="8" fill="#f3f4f6" stroke="#6366f1" />
            <text x="650" y="125" textAnchor="middle" fill="#6366f1">原始消息</text>
            <path d="M710 120 L 770 120" stroke="#6366f1" strokeWidth="2" />
            <text x="740" y="110" textAnchor="middle" fill="#6366f1">哈希</text>
            <rect x="770" y="100" width="120" height="40" rx="8" fill="#f3f4f6" stroke="#6366f1" />
            <text x="830" y="125" textAnchor="middle" fill="#6366f1">消息摘要</text>
            <path d="M530 120 L 590 120" stroke="#6366f1" strokeWidth="2" />
            <text x="560" y="110" textAnchor="middle" fill="#6366f1">传输</text>
            <path d="M470 140 L 470 200" stroke="#6366f1" strokeWidth="2" />
            <text x="450" y="170" textAnchor="middle" fill="#6366f1">公钥验证</text>
            <rect x="350" y="230" width="120" height="40" rx="8" fill="#f3f4f6" stroke="#f59e42" />
            <text x="410" y="255" textAnchor="middle" fill="#f59e42">私钥</text>
            <rect x="350" y="180" width="120" height="40" rx="8" fill="#f3f4f6" stroke="#f59e42" />
            <text x="410" y="205" textAnchor="middle" fill="#f59e42">公钥</text>
          </svg>
        </div>
        <SectionTitle>数字签名类型</SectionTitle>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2" style={{ border: '1px solid #ddd' }}>类型</th>
                <th className="border p-2" style={{ border: '1px solid #ddd' }}>特点</th>
                <th className="border p-2" style={{ border: '1px solid #ddd' }}>应用场景</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="border p-2" style={{ border: '1px solid #ddd' }}>RSA签名</td><td className="border p-2" style={{ border: '1px solid #ddd' }}>基于RSA算法，应用广泛</td><td className="border p-2" style={{ border: '1px solid #ddd' }}>通用场景</td></tr>
              <tr><td className="border p-2" style={{ border: '1px solid #ddd' }}>DSA签名</td><td className="border p-2" style={{ border: '1px solid #ddd' }}>专门用于数字签名</td><td className="border p-2" style={{ border: '1px solid #ddd' }}>政府标准</td></tr>
              <tr><td className="border p-2" style={{ border: '1px solid #ddd' }}>ECDSA签名</td><td className="border p-2" style={{ border: '1px solid #ddd' }}>基于椭圆曲线，效率高</td><td className="border p-2" style={{ border: '1px solid #ddd' }}>移动设备</td></tr>
              <tr><td className="border p-2" style={{ border: '1px solid #ddd' }}>EdDSA签名</td><td className="border p-2" style={{ border: '1px solid #ddd' }}>Edwards曲线，安全性高</td><td className="border p-2" style={{ border: '1px solid #ddd' }}>新兴应用</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    ),
  },
  {
    label: '算法原理',
    left: (
      <div className="space-y-4">
        <PageTitle>数字签名算法原理</PageTitle>
        <SectionTitle>1. RSA签名</SectionTitle>
        <BookParagraph>基于RSA公钥加密算法，使用私钥签名、公钥验证。</BookParagraph>
        <BookList items={[
          '签名过程：计算消息哈希值 → 使用私钥对哈希值进行加密 → 生成数字签名',
          '验证过程：计算消息哈希值 → 使用公钥解密签名 → 比较两个哈希值',
        ]} />
        <SectionTitle>2. DSA签名</SectionTitle>
        <BookParagraph>基于离散对数问题，专门用于数字签名。</BookParagraph>
        <BookList items={[
          '签名过程：生成随机数k → 计算r = g^k mod p → 计算s = k^(-1)(H(m) + xr) mod q → 输出签名(r,s)',
          '验证过程：计算w = s^(-1) mod q → 计算u1 = H(m)w mod q → 计算u2 = rw mod q → 验证v = r',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>3. ECDSA签名</SectionTitle>
        <BookParagraph>基于椭圆曲线离散对数问题，密钥长度短、效率高。</BookParagraph>
        <BookList items={[
          '签名过程：选择随机数k → 计算点P = kG → 计算r = Px mod n → 计算s = k^(-1)(H(m) + dr) mod n → 输出签名(r,s)',
          '验证过程：计算w = s^(-1) mod n → 计算u1 = H(m)w mod n → 计算u2 = rw mod n → 计算点P = u1G + u2Q → 验证r = Px mod n',
        ]} />
        <SectionTitle>算法比较</SectionTitle>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2" style={{ border: '1px solid #ddd' }}>算法</th>
                <th className="border p-2" style={{ border: '1px solid #ddd' }}>密钥长度</th>
                <th className="border p-2" style={{ border: '1px solid #ddd' }}>性能</th>
                <th className="border p-2" style={{ border: '1px solid #ddd' }}>安全性</th>
                <th className="border p-2" style={{ border: '1px solid #ddd' }}>应用场景</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="border p-2" style={{ border: '1px solid #ddd' }}>RSA</td><td className="border p-2" style={{ border: '1px solid #ddd' }}>2048位</td><td className="border p-2" style={{ border: '1px solid #ddd' }}>中</td><td className="border p-2" style={{ border: '1px solid #ddd' }}>高</td><td className="border p-2" style={{ border: '1px solid #ddd' }}>通用</td></tr>
              <tr><td className="border p-2" style={{ border: '1px solid #ddd' }}>DSA</td><td className="border p-2" style={{ border: '1px solid #ddd' }}>2048位</td><td className="border p-2" style={{ border: '1px solid #ddd' }}>中</td><td className="border p-2" style={{ border: '1px solid #ddd' }}>高</td><td className="border p-2" style={{ border: '1px solid #ddd' }}>政府</td></tr>
              <tr><td className="border p-2" style={{ border: '1px solid #ddd' }}>ECDSA</td><td className="border p-2" style={{ border: '1px solid #ddd' }}>256位</td><td className="border p-2" style={{ border: '1px solid #ddd' }}>高</td><td className="border p-2" style={{ border: '1px solid #ddd' }}>高</td><td className="border p-2" style={{ border: '1px solid #ddd' }}>移动</td></tr>
              <tr><td className="border p-2" style={{ border: '1px solid #ddd' }}>EdDSA</td><td className="border p-2" style={{ border: '1px solid #ddd' }}>256位</td><td className="border p-2" style={{ border: '1px solid #ddd' }}>高</td><td className="border p-2" style={{ border: '1px solid #ddd' }}>高</td><td className="border p-2" style={{ border: '1px solid #ddd' }}>新兴</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    ),
  },
  {
    label: '应用场景',
    left: (
      <div className="space-y-4">
        <PageTitle>应用场景</PageTitle>
        <SectionTitle>1. 数字证书</SectionTitle>
        <BookList items={['SSL/TLS证书', '代码签名证书', '电子邮件证书', '身份证书']} />
        <SectionTitle>2. 软件分发</SectionTitle>
        <BookList items={['代码签名', '软件更新验证', '驱动程序签名', '移动应用签名']} />
        <SectionTitle>3. 电子文档</SectionTitle>
        <BookList items={['电子合同', '电子发票', '电子政务', '电子医疗记录']} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>4. 区块链技术</SectionTitle>
        <BookList items={['交易签名', '智能合约', '身份验证', '共识机制']} />
        <SectionTitle>5. 其他应用</SectionTitle>
        <BookList items={['电子邮件签名', '时间戳服务', '安全通信', '身份认证']} />
        <SectionTitle>应用示例</SectionTitle>
        <BookAlert type="info" message="SSL/TLS证书签名流程：生成证书请求（CSR）→ CA验证申请者身份 → CA使用私钥签名证书 → 颁发签名后的证书 → 客户端验证证书签名。" />
        <BookAlert type="info" message="代码签名流程：计算代码哈希值 → 使用私钥签名哈希值 → 将签名附加到代码中 → 用户下载时验证签名 → 确保代码未被篡改。" />
      </div>
    ),
  },
  {
    label: '实现示例',
    left: (
      <div className="space-y-4">
        <PageTitle>Python实现</PageTitle>
        <BookCode language="python" code={pySignature} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>Java实现</PageTitle>
        <BookCode language="java" code={javaSignature} />
        <PageTitle>OpenSSL命令行示例</PageTitle>
        <BookCode language="bash" code={opensslSignature} />
      </div>
    ),
  },
  {
    label: '安全考虑',
    left: (
      <div className="space-y-4">
        <PageTitle>安全考虑</PageTitle>
        <SectionTitle>1. 常见攻击</SectionTitle>
        <BookList items={[
          '私钥泄露：攻击者获取私钥',
          '重放攻击：重复使用有效签名',
          '中间人攻击：拦截和修改通信',
          '伪造攻击：生成虚假签名',
          '量子计算威胁：破解现有算法',
        ]} />
        <SectionTitle>2. 防护措施</SectionTitle>
        <BookList items={[
          '使用足够长的密钥（RSA 2048位以上）',
          '安全存储私钥（HSM、TPM）',
          '使用时间戳防止重放',
          '实现证书撤销机制',
          '定期更新密钥对',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>3. 最佳实践</SectionTitle>
        <BookList items={[
          '使用安全的哈希算法（SHA-256或更高）',
          '实现完整的证书链验证',
          '使用安全的随机数生成器',
          '实现签名时间戳',
          '定期更新签名算法',
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
              <tr><td className="border p-2" style={{ border: '1px solid #ddd' }}>密钥长度</td><td className="border p-2" style={{ border: '1px solid #ddd' }}>RSA 2048位以上</td><td className="border p-2" style={{ border: '1px solid #ddd' }}>高</td></tr>
              <tr><td className="border p-2" style={{ border: '1px solid #ddd' }}>私钥保护</td><td className="border p-2" style={{ border: '1px solid #ddd' }}>使用HSM或TPM</td><td className="border p-2" style={{ border: '1px solid #ddd' }}>高</td></tr>
              <tr><td className="border p-2" style={{ border: '1px solid #ddd' }}>哈希算法</td><td className="border p-2" style={{ border: '1px solid #ddd' }}>SHA-256或更高</td><td className="border p-2" style={{ border: '1px solid #ddd' }}>高</td></tr>
              <tr><td className="border p-2" style={{ border: '1px solid #ddd' }}>时间戳</td><td className="border p-2" style={{ border: '1px solid #ddd' }}>防止重放攻击</td><td className="border p-2" style={{ border: '1px solid #ddd' }}>高</td></tr>
              <tr><td className="border p-2" style={{ border: '1px solid #ddd' }}>证书验证</td><td className="border p-2" style={{ border: '1px solid #ddd' }}>完整证书链验证</td><td className="border p-2" style={{ border: '1px solid #ddd' }}>高</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    ),
  },
]

export default function DigitalSignaturePage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
