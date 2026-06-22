'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import {
  PageTitle, SectionTitle, BookParagraph, BookCode, BookAlert, BookList,
} from '@/app/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '网络安全',
  chapterTitle: '密钥管理',
  chapterNumber: 6,
  totalChapters: 10,
  subjectHref: '/study/security/crypto',
  prevChapter: { label: '数字签名', href: '/study/security/crypto/signature' },
  nextChapter: { label: '公钥基础设施', href: '/study/security/crypto/pki' },
  theme: THEMES.security,
}

const pyKeyManager = `from cryptography.fernet import Fernet
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC
import base64
import os

class KeyManager:
    def __init__(self):
        self.key_store = {}

    def generate_key(self, key_id: str) -> bytes:
        """生成新的对称密钥"""
        key = Fernet.generate_key()
        self.key_store[key_id] = key
        return key

    def get_key(self, key_id: str) -> bytes:
        """获取已存储的密钥"""
        return self.key_store.get(key_id)

    def delete_key(self, key_id: str):
        """删除密钥"""
        if key_id in self.key_store:
            del self.key_store[key_id]

    def derive_key(self, password: str, salt: bytes = None) -> tuple:
        """从密码派生密钥"""
        if salt is None:
            salt = os.urandom(16)

        kdf = PBKDF2HMAC(
            algorithm=hashes.SHA256(),
            length=32,
            salt=salt,
            iterations=100000,
        )
        key = base64.urlsafe_b64encode(kdf.derive(password.encode()))
        return key, salt

# 使用示例
if __name__ == "__main__":
    # 创建密钥管理器
    key_manager = KeyManager()

    # 生成新密钥
    key_id = "test_key"
    key = key_manager.generate_key(key_id)
    print(f"生成的密钥: {key}")

    # 获取密钥
    retrieved_key = key_manager.get_key(key_id)
    print(f"获取的密钥: {retrieved_key}")

    # 从密码派生密钥
    password = "my_secret_password"
    derived_key, salt = key_manager.derive_key(password)
    print(f"派生的密钥: {derived_key}")
    print(f"使用的盐值: {salt}")

    # 删除密钥
    key_manager.delete_key(key_id)
    print(f"密钥已删除: {key_manager.get_key(key_id) is None}")`

const javaKeyManager = `import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.security.*;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

public class KeyManager {
    private Map<String, SecretKey> keyStore;

    public KeyManager() {
        this.keyStore = new HashMap<>();
    }

    public SecretKey generateKey(String keyId) throws NoSuchAlgorithmException {
        KeyGenerator keyGen = KeyGenerator.getInstance("AES");
        keyGen.init(256);
        SecretKey key = keyGen.generateKey();
        keyStore.put(keyId, key);
        return key;
    }

    public SecretKey getKey(String keyId) {
        return keyStore.get(keyId);
    }

    public void deleteKey(String keyId) {
        keyStore.remove(keyId);
    }

    public SecretKey deriveKey(String password, byte[] salt) throws Exception {
        SecretKeyFactory factory = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA256");
        KeySpec spec = new PBEKeySpec(password.toCharArray(), salt, 100000, 256);
        return new SecretKeySpec(factory.generateSecret(spec).getEncoded(), "AES");
    }

    public static void main(String[] args) throws Exception {
        KeyManager keyManager = new KeyManager();

        // 生成新密钥
        String keyId = "test_key";
        SecretKey key = keyManager.generateKey(keyId);
        System.out.println("生成的密钥: " + Base64.getEncoder().encodeToString(key.getEncoded()));

        // 获取密钥
        SecretKey retrievedKey = keyManager.getKey(keyId);
        System.out.println("获取的密钥: " + Base64.getEncoder().encodeToString(retrievedKey.getEncoded()));

        // 从密码派生密钥
        String password = "my_secret_password";
        byte[] salt = new byte[16];
        new SecureRandom().nextBytes(salt);
        SecretKey derivedKey = keyManager.deriveKey(password, salt);
        System.out.println("派生的密钥: " + Base64.getEncoder().encodeToString(derivedKey.getEncoded()));

        // 删除密钥
        keyManager.deleteKey(keyId);
        System.out.println("密钥已删除: " + (keyManager.getKey(keyId) == null));
    }
}`

const SPREADS = [
  {
    label: '基本概念',
    left: (
      <div className="space-y-4">
        <PageTitle>密钥管理基本概念</PageTitle>
        <BookParagraph>
          密钥管理是密码学系统中的一个关键环节，涉及密钥的生成、存储、分发、使用、更新和销毁等全生命周期管理。良好的密钥管理是确保密码系统安全性的基础。
        </BookParagraph>
        <SectionTitle>核心要素</SectionTitle>
        <BookList items={[
          '密钥生成：使用安全的随机数生成器',
          '密钥存储：安全保存密钥',
          '密钥分发：安全传输密钥',
          '密钥使用：正确使用密钥',
          '密钥更新：定期更换密钥',
          '密钥销毁：安全删除密钥',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>密钥管理的重要性</PageTitle>
        <BookList items={[
          '保护密钥安全是密码系统安全的基础',
          '密钥泄露会导致整个系统被攻破',
          '密钥管理不当会带来严重的安全风险',
          '良好的密钥管理可以提高系统的安全性',
        ]} />
      </div>
    ),
  },
  {
    label: '密钥类型',
    left: (
      <div className="space-y-4">
        <PageTitle>密钥类型</PageTitle>
        <SectionTitle>1. 对称密钥</SectionTitle>
        <BookList items={[
          '用于对称加密算法',
          '加密和解密使用相同的密钥',
          '常见算法：AES、DES、3DES',
          '特点：速度快，但密钥分发困难',
        ]} />
        <SectionTitle>2. 非对称密钥对</SectionTitle>
        <BookList items={[
          '用于非对称加密算法',
          '包含公钥和私钥',
          '常见算法：RSA、ECC',
          '特点：安全性高，但速度较慢',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>3. 会话密钥</SectionTitle>
        <BookList items={[
          '用于单次通信会话',
          '临时生成的对称密钥',
          '使用后立即销毁',
          '特点：提高安全性，减少密钥泄露风险',
        ]} />
        <SectionTitle>4. 主密钥</SectionTitle>
        <BookList items={[
          '用于保护其他密钥',
          '长期保存的密钥',
          '需要最高级别的保护',
          '特点：安全性要求最高',
        ]} />
        <SectionTitle>密钥类型比较</SectionTitle>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2" style={{ border: '1px solid #ddd' }}>类型</th>
                <th className="border p-2" style={{ border: '1px solid #ddd' }}>用途</th>
                <th className="border p-2" style={{ border: '1px solid #ddd' }}>生命周期</th>
                <th className="border p-2" style={{ border: '1px solid #ddd' }}>保护要求</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="border p-2" style={{ border: '1px solid #ddd' }}>对称密钥</td><td className="border p-2" style={{ border: '1px solid #ddd' }}>数据加密</td><td className="border p-2" style={{ border: '1px solid #ddd' }}>短期</td><td className="border p-2" style={{ border: '1px solid #ddd' }}>高</td></tr>
              <tr><td className="border p-2" style={{ border: '1px solid #ddd' }}>非对称密钥</td><td className="border p-2" style={{ border: '1px solid #ddd' }}>身份认证</td><td className="border p-2" style={{ border: '1px solid #ddd' }}>长期</td><td className="border p-2" style={{ border: '1px solid #ddd' }}>极高</td></tr>
              <tr><td className="border p-2" style={{ border: '1px solid #ddd' }}>会话密钥</td><td className="border p-2" style={{ border: '1px solid #ddd' }}>通信加密</td><td className="border p-2" style={{ border: '1px solid #ddd' }}>临时</td><td className="border p-2" style={{ border: '1px solid #ddd' }}>中</td></tr>
              <tr><td className="border p-2" style={{ border: '1px solid #ddd' }}>主密钥</td><td className="border p-2" style={{ border: '1px solid #ddd' }}>密钥保护</td><td className="border p-2" style={{ border: '1px solid #ddd' }}>长期</td><td className="border p-2" style={{ border: '1px solid #ddd' }}>极高</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    ),
  },
  {
    label: '生命周期',
    left: (
      <div className="space-y-4">
        <PageTitle>密钥生命周期</PageTitle>
        <SectionTitle>1. 密钥生成</SectionTitle>
        <BookList items={[
          '使用密码学安全的随机数生成器',
          '确保密钥的随机性和唯一性',
          '根据算法要求生成适当长度的密钥',
          '验证生成的密钥质量',
        ]} />
        <SectionTitle>2. 密钥分发</SectionTitle>
        <BookList items={[
          '使用安全的传输通道',
          '采用密钥封装机制',
          '实现密钥协商协议',
          '确保密钥分发的机密性',
        ]} />
        <SectionTitle>3. 密钥存储</SectionTitle>
        <BookList items={[
          '使用硬件安全模块（HSM）',
          '实现密钥备份机制',
          '采用密钥分割技术',
          '实施访问控制策略',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>4. 密钥使用</SectionTitle>
        <BookList items={[
          '实施密钥使用策略',
          '监控密钥使用情况',
          '防止密钥滥用',
          '记录密钥使用日志',
        ]} />
        <SectionTitle>5. 密钥更新</SectionTitle>
        <BookList items={[
          '定期更换密钥',
          '实现密钥轮换机制',
          '确保密钥更新的平滑过渡',
          '维护密钥版本控制',
        ]} />
        <SectionTitle>6. 密钥销毁</SectionTitle>
        <BookList items={[
          '安全删除密钥',
          '确保密钥不可恢复',
          '更新相关系统配置',
          '记录密钥销毁操作',
        ]} />
        <SectionTitle>生命周期管理流程</SectionTitle>
        <BookList items={[
          '制定密钥管理策略',
          '建立密钥管理团队',
          '实施密钥管理流程',
          '监控密钥使用情况',
          '定期评估和更新',
        ]} />
      </div>
    ),
  },
  {
    label: '实现示例',
    left: (
      <div className="space-y-4">
        <PageTitle>Python实现</PageTitle>
        <BookCode language="python" code={pyKeyManager} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>Java实现</PageTitle>
        <BookCode language="java" code={javaKeyManager} />
      </div>
    ),
  },
  {
    label: '安全考虑',
    left: (
      <div className="space-y-4">
        <PageTitle>安全考虑</PageTitle>
        <SectionTitle>1. 密钥保护</SectionTitle>
        <BookList items={[
          '使用硬件安全模块（HSM）',
          '实施访问控制',
          '加密存储密钥',
          '密钥分割存储',
          '定期备份密钥',
        ]} />
        <SectionTitle>2. 密钥分发安全</SectionTitle>
        <BookList items={[
          '使用安全通道',
          '实施密钥协商',
          '验证接收方身份',
          '加密传输密钥',
          '记录分发日志',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>3. 密钥使用安全</SectionTitle>
        <BookList items={[
          '限制密钥用途',
          '监控使用情况',
          '防止密钥泄露',
          '实施审计日志',
          '定期轮换密钥',
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
              <tr><td className="border p-2" style={{ border: '1px solid #ddd' }}>密钥生成</td><td className="border p-2" style={{ border: '1px solid #ddd' }}>使用密码学安全的随机数生成器</td><td className="border p-2" style={{ border: '1px solid #ddd' }}>高</td></tr>
              <tr><td className="border p-2" style={{ border: '1px solid #ddd' }}>密钥存储</td><td className="border p-2" style={{ border: '1px solid #ddd' }}>使用HSM或加密存储</td><td className="border p-2" style={{ border: '1px solid #ddd' }}>高</td></tr>
              <tr><td className="border p-2" style={{ border: '1px solid #ddd' }}>密钥分发</td><td className="border p-2" style={{ border: '1px solid #ddd' }}>使用安全通道和密钥协商</td><td className="border p-2" style={{ border: '1px solid #ddd' }}>高</td></tr>
              <tr><td className="border p-2" style={{ border: '1px solid #ddd' }}>密钥使用</td><td className="border p-2" style={{ border: '1px solid #ddd' }}>实施访问控制和审计</td><td className="border p-2" style={{ border: '1px solid #ddd' }}>高</td></tr>
              <tr><td className="border p-2" style={{ border: '1px solid #ddd' }}>密钥更新</td><td className="border p-2" style={{ border: '1px solid #ddd' }}>定期轮换和更新</td><td className="border p-2" style={{ border: '1px solid #ddd' }}>高</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    ),
  },
]

export default function KeyManagementPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
