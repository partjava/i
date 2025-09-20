"use client";
import { useState } from "react";
import Link from "next/link";

export default function KeyManagementPage() {
  const [activeTab, setActiveTab] = useState("intro");

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">密钥管理</h1>
      
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
          onClick={() => setActiveTab("types")}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === "types"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          密钥类型
        </button>
        <button
          onClick={() => setActiveTab("lifecycle")}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === "lifecycle"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          生命周期
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
            <h3 className="text-xl font-semibold mb-3">密钥管理基本概念</h3>
            <div className="prose max-w-none">
              <p className="mb-4">
                密钥管理是密码学系统中的一个关键环节，涉及密钥的生成、存储、分发、使用、更新和销毁等全生命周期管理。良好的密钥管理是确保密码系统安全性的基础。
              </p>

              <h4 className="font-semibold mt-4">核心要素</h4>
              <ul className="list-disc pl-6 mb-4">
                <li>密钥生成：使用安全的随机数生成器</li>
                <li>密钥存储：安全保存密钥</li>
                <li>密钥分发：安全传输密钥</li>
                <li>密钥使用：正确使用密钥</li>
                <li>密钥更新：定期更换密钥</li>
                <li>密钥销毁：安全删除密钥</li>
              </ul>

              <h4 className="font-semibold mt-4">密钥管理的重要性</h4>
              <div className="bg-gray-100 p-4 rounded-lg">
                <ul className="list-disc pl-6">
                  <li>保护密钥安全是密码系统安全的基础</li>
                  <li>密钥泄露会导致整个系统被攻破</li>
                  <li>密钥管理不当会带来严重的安全风险</li>
                  <li>良好的密钥管理可以提高系统的安全性</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === "types" && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">密钥类型</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold">1. 对称密钥</h4>
              <ul className="list-disc pl-6 mb-4">
                <li>用于对称加密算法</li>
                <li>加密和解密使用相同的密钥</li>
                <li>常见算法：AES、DES、3DES</li>
                <li>特点：速度快，但密钥分发困难</li>
              </ul>

              <h4 className="font-semibold">2. 非对称密钥对</h4>
              <ul className="list-disc pl-6 mb-4">
                <li>用于非对称加密算法</li>
                <li>包含公钥和私钥</li>
                <li>常见算法：RSA、ECC</li>
                <li>特点：安全性高，但速度较慢</li>
              </ul>

              <h4 className="font-semibold">3. 会话密钥</h4>
              <ul className="list-disc pl-6 mb-4">
                <li>用于单次通信会话</li>
                <li>临时生成的对称密钥</li>
                <li>使用后立即销毁</li>
                <li>特点：提高安全性，减少密钥泄露风险</li>
              </ul>

              <h4 className="font-semibold">4. 主密钥</h4>
              <ul className="list-disc pl-6 mb-4">
                <li>用于保护其他密钥</li>
                <li>长期保存的密钥</li>
                <li>需要最高级别的保护</li>
                <li>特点：安全性要求最高</li>
              </ul>

              <h4 className="font-semibold mt-4">密钥类型比较</h4>
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border p-2">类型</th>
                      <th className="border p-2">用途</th>
                      <th className="border p-2">生命周期</th>
                      <th className="border p-2">保护要求</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border p-2">对称密钥</td>
                      <td className="border p-2">数据加密</td>
                      <td className="border p-2">短期</td>
                      <td className="border p-2">高</td>
                    </tr>
                    <tr>
                      <td className="border p-2">非对称密钥</td>
                      <td className="border p-2">身份认证</td>
                      <td className="border p-2">长期</td>
                      <td className="border p-2">极高</td>
                    </tr>
                    <tr>
                      <td className="border p-2">会话密钥</td>
                      <td className="border p-2">通信加密</td>
                      <td className="border p-2">临时</td>
                      <td className="border p-2">中</td>
                    </tr>
                    <tr>
                      <td className="border p-2">主密钥</td>
                      <td className="border p-2">密钥保护</td>
                      <td className="border p-2">长期</td>
                      <td className="border p-2">极高</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === "lifecycle" && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">密钥生命周期</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold">1. 密钥生成</h4>
              <ul className="list-disc pl-6 mb-4">
                <li>使用密码学安全的随机数生成器</li>
                <li>确保密钥的随机性和唯一性</li>
                <li>根据算法要求生成适当长度的密钥</li>
                <li>验证生成的密钥质量</li>
              </ul>

              <h4 className="font-semibold">2. 密钥分发</h4>
              <ul className="list-disc pl-6 mb-4">
                <li>使用安全的传输通道</li>
                <li>采用密钥封装机制</li>
                <li>实现密钥协商协议</li>
                <li>确保密钥分发的机密性</li>
              </ul>

              <h4 className="font-semibold">3. 密钥存储</h4>
              <ul className="list-disc pl-6 mb-4">
                <li>使用硬件安全模块（HSM）</li>
                <li>实现密钥备份机制</li>
                <li>采用密钥分割技术</li>
                <li>实施访问控制策略</li>
              </ul>

              <h4 className="font-semibold">4. 密钥使用</h4>
              <ul className="list-disc pl-6 mb-4">
                <li>实施密钥使用策略</li>
                <li>监控密钥使用情况</li>
                <li>防止密钥滥用</li>
                <li>记录密钥使用日志</li>
              </ul>

              <h4 className="font-semibold">5. 密钥更新</h4>
              <ul className="list-disc pl-6 mb-4">
                <li>定期更换密钥</li>
                <li>实现密钥轮换机制</li>
                <li>确保密钥更新的平滑过渡</li>
                <li>维护密钥版本控制</li>
              </ul>

              <h4 className="font-semibold">6. 密钥销毁</h4>
              <ul className="list-disc pl-6 mb-4">
                <li>安全删除密钥</li>
                <li>确保密钥不可恢复</li>
                <li>更新相关系统配置</li>
                <li>记录密钥销毁操作</li>
              </ul>

              <h4 className="font-semibold mt-4">生命周期管理流程</h4>
              <div className="bg-gray-100 p-4 rounded-lg">
                <ol className="list-decimal pl-6">
                  <li>制定密钥管理策略</li>
                  <li>建立密钥管理团队</li>
                  <li>实施密钥管理流程</li>
                  <li>监控密钥使用情况</li>
                  <li>定期评估和更新</li>
                </ol>
              </div>
            </div>
          </div>
        )}

        {activeTab === "implementation" && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">实现示例</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold">1. Python实现</h4>
              <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto mt-2">
                <code>{`from cryptography.fernet import Fernet
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
    print(f"密钥已删除: {key_manager.get_key(key_id) is None}")`}</code>
              </pre>

              <h4 className="font-semibold mt-4">2. Java实现</h4>
              <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto mt-2">
                <code>{`import javax.crypto.KeyGenerator;
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
}`}</code>
              </pre>
            </div>
          </div>
        )}

        {activeTab === "security" && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">安全考虑</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold">1. 密钥保护</h4>
              <ul className="list-disc pl-6 mb-4">
                <li>使用硬件安全模块（HSM）</li>
                <li>实施访问控制</li>
                <li>加密存储密钥</li>
                <li>密钥分割存储</li>
                <li>定期备份密钥</li>
              </ul>

              <h4 className="font-semibold">2. 密钥分发安全</h4>
              <ul className="list-disc pl-6 mb-4">
                <li>使用安全通道</li>
                <li>实施密钥协商</li>
                <li>验证接收方身份</li>
                <li>加密传输密钥</li>
                <li>记录分发日志</li>
              </ul>

              <h4 className="font-semibold">3. 密钥使用安全</h4>
              <ul className="list-disc pl-6 mb-4">
                <li>限制密钥用途</li>
                <li>监控使用情况</li>
                <li>防止密钥泄露</li>
                <li>实施审计日志</li>
                <li>定期轮换密钥</li>
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
                      <td className="border p-2">密钥生成</td>
                      <td className="border p-2">使用密码学安全的随机数生成器</td>
                      <td className="border p-2">高</td>
                    </tr>
                    <tr>
                      <td className="border p-2">密钥存储</td>
                      <td className="border p-2">使用HSM或加密存储</td>
                      <td className="border p-2">高</td>
                    </tr>
                    <tr>
                      <td className="border p-2">密钥分发</td>
                      <td className="border p-2">使用安全通道和密钥协商</td>
                      <td className="border p-2">高</td>
                    </tr>
                    <tr>
                      <td className="border p-2">密钥使用</td>
                      <td className="border p-2">实施访问控制和审计</td>
                      <td className="border p-2">高</td>
                    </tr>
                    <tr>
                      <td className="border p-2">密钥更新</td>
                      <td className="border p-2">定期轮换和更新</td>
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
          href="/study/security/crypto/signature"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          ← 数字签名
        </Link>
        <Link
          href="/study/security/crypto/pki"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          公钥基础设施 →
        </Link>
      </div>
    </div>
  );
} 