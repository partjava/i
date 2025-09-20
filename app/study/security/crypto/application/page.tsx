"use client";
import { useState } from "react";
import Link from "next/link";

export default function CryptoApplicationPage() {
  const [activeTab, setActiveTab] = useState("scenarios");

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">密码学应用</h1>
      
      {/* 标签页导航 */}
      <div className="flex space-x-4 mb-6 border-b overflow-x-auto">
        <button
          onClick={() => setActiveTab("scenarios")}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === "scenarios"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          应用场景
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
          onClick={() => setActiveTab("best-practices")}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === "best-practices"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          最佳实践
        </button>
        <button
          onClick={() => setActiveTab("cases")}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === "cases"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          案例分析
        </button>
      </div>

      {/* 内容区域 */}
      <div className="bg-white rounded-lg shadow-md p-6">
        {activeTab === "scenarios" && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">密码学应用场景</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold">1. 数据加密</h4>
              <ul className="list-disc pl-6 mb-4">
                <li>文件加密：保护敏感文件</li>
                <li>数据库加密：保护存储的数据</li>
                <li>通信加密：保护传输中的数据</li>
                <li>备份加密：保护备份数据</li>
              </ul>

              <h4 className="font-semibold">2. 身份认证</h4>
              <ul className="list-disc pl-6 mb-4">
                <li>密码存储：安全的密码哈希</li>
                <li>双因素认证：增加安全层级</li>
                <li>生物特征认证：指纹、面部识别</li>
                <li>数字证书：基于PKI的认证</li>
              </ul>

              <h4 className="font-semibold">3. 数字签名</h4>
              <ul className="list-disc pl-6 mb-4">
                <li>文档签名：确保文档完整性</li>
                <li>代码签名：验证软件来源</li>
                <li>电子合同：具有法律效力</li>
                <li>区块链交易：确保交易真实性</li>
              </ul>

              <h4 className="font-semibold">4. 安全通信</h4>
              <ul className="list-disc pl-6 mb-4">
                <li>HTTPS：安全的Web通信</li>
                <li>VPN：安全的远程访问</li>
                <li>即时通讯：端到端加密</li>
                <li>电子邮件：PGP加密</li>
              </ul>

              <h4 className="font-semibold mt-4">应用场景示例</h4>
              <div className="bg-gray-100 p-4 rounded-lg">
                <pre className="text-sm">
                  <code>{`# 1. 文件加密场景
- 使用AES加密敏感文件
- 使用RSA加密文件密钥
- 使用HMAC验证文件完整性

# 2. 密码存储场景
- 使用bcrypt/PBKDF2进行密码哈希
- 使用随机盐值增加安全性
- 使用HMAC进行密码验证

# 3. 数字签名场景
- 使用RSA/ECDSA进行签名
- 使用SHA-256计算消息摘要
- 使用PKI验证签名

# 4. 安全通信场景
- 使用TLS 1.3进行加密通信
- 使用证书进行身份验证
- 使用前向安全性保护会话`}</code>
                </pre>
              </div>
            </div>
          </div>
        )}

        {activeTab === "implementation" && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">实现示例</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold">1. 文件加密实现</h4>
              <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto mt-2">
                <code>{`from cryptography.fernet import Fernet
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC
import base64
import os

def generate_key(password, salt=None):
    """从密码生成加密密钥"""
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

def encrypt_file(file_path, password):
    """加密文件"""
    # 生成密钥
    key, salt = generate_key(password)
    f = Fernet(key)
    
    # 读取文件
    with open(file_path, 'rb') as file:
        data = file.read()
    
    # 加密数据
    encrypted_data = f.encrypt(data)
    
    # 保存加密后的文件
    encrypted_file = file_path + '.encrypted'
    with open(encrypted_file, 'wb') as file:
        file.write(salt + encrypted_data)
    
    return encrypted_file

def decrypt_file(encrypted_file, password):
    """解密文件"""
    # 读取加密文件
    with open(encrypted_file, 'rb') as file:
        data = file.read()
    
    # 提取salt和加密数据
    salt = data[:16]
    encrypted_data = data[16:]
    
    # 生成密钥
    key, _ = generate_key(password, salt)
    f = Fernet(key)
    
    # 解密数据
    decrypted_data = f.decrypt(encrypted_data)
    
    # 保存解密后的文件
    decrypted_file = encrypted_file.replace('.encrypted', '.decrypted')
    with open(decrypted_file, 'wb') as file:
        file.write(decrypted_data)
    
    return decrypted_file

# 使用示例
file_path = "secret.txt"
password = "mysecretpassword"

# 加密文件
encrypted_file = encrypt_file(file_path, password)
print(f"文件已加密: {encrypted_file}")

# 解密文件
decrypted_file = decrypt_file(encrypted_file, password)
print(f"文件已解密: {decrypted_file}")`}</code>
              </pre>

              <h4 className="font-semibold mt-4">2. 密码存储实现</h4>
              <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto mt-2">
                <code>{`import bcrypt
import hashlib
import os

def hash_password(password):
    """使用bcrypt哈希密码"""
    # 生成随机盐值
    salt = bcrypt.gensalt()
    # 哈希密码
    hashed = bcrypt.hashpw(password.encode(), salt)
    return hashed

def verify_password(password, hashed):
    """验证密码"""
    return bcrypt.checkpw(password.encode(), hashed)

def store_password(user_id, password):
    """存储用户密码"""
    hashed = hash_password(password)
    # 在实际应用中，这里应该将hashed存储到数据库
    return hashed

def authenticate_user(user_id, password):
    """验证用户密码"""
    # 在实际应用中，这里应该从数据库获取hashed
    stored_hash = store_password(user_id, password)
    return verify_password(password, stored_hash)

# 使用示例
user_id = "user123"
password = "mypassword123"

# 存储密码
hashed = store_password(user_id, password)
print(f"密码已哈希: {hashed}")

# 验证密码
is_valid = authenticate_user(user_id, password)
print(f"密码验证结果: {is_valid}")`}</code>
              </pre>

              <h4 className="font-semibold mt-4">3. 数字签名实现</h4>
              <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto mt-2">
                <code>{`from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.asymmetric import padding, rsa
from cryptography.hazmat.primitives import serialization

def generate_key_pair():
    """生成RSA密钥对"""
    private_key = rsa.generate_private_key(
        public_exponent=65537,
        key_size=2048
    )
    public_key = private_key.public_key()
    return private_key, public_key

def sign_message(message, private_key):
    """使用私钥签名消息"""
    signature = private_key.sign(
        message.encode(),
        padding.PSS(
            mgf=padding.MGF1(hashes.SHA256()),
            salt_length=padding.PSS.MAX_LENGTH
        ),
        hashes.SHA256()
    )
    return signature

def verify_signature(message, signature, public_key):
    """使用公钥验证签名"""
    try:
        public_key.verify(
            signature,
            message.encode(),
            padding.PSS(
                mgf=padding.MGF1(hashes.SHA256()),
                salt_length=padding.PSS.MAX_LENGTH
            ),
            hashes.SHA256()
        )
        return True
    except Exception:
        return False

# 使用示例
message = "Hello, World!"

# 生成密钥对
private_key, public_key = generate_key_pair()

# 签名消息
signature = sign_message(message, private_key)
print(f"消息签名: {signature.hex()}")

# 验证签名
is_valid = verify_signature(message, signature, public_key)
print(f"签名验证结果: {is_valid}")`}</code>
              </pre>
            </div>
          </div>
        )}

        {activeTab === "best-practices" && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">最佳实践</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold">1. 算法选择</h4>
              <ul className="list-disc pl-6 mb-4">
                <li>使用经过验证的密码算法</li>
                <li>避免使用过时的算法</li>
                <li>选择合适的密钥长度</li>
                <li>定期更新算法参数</li>
              </ul>

              <h4 className="font-semibold">2. 密钥管理</h4>
              <ul className="list-disc pl-6 mb-4">
                <li>安全生成密钥</li>
                <li>安全存储密钥</li>
                <li>定期轮换密钥</li>
                <li>实施密钥备份</li>
              </ul>

              <h4 className="font-semibold">3. 实现安全</h4>
              <ul className="list-disc pl-6 mb-4">
                <li>使用安全的密码库</li>
                <li>防止侧信道攻击</li>
                <li>实施错误处理</li>
                <li>进行安全测试</li>
              </ul>

              <h4 className="font-semibold mt-4">最佳实践示例</h4>
              <div className="bg-gray-100 p-4 rounded-lg">
                <pre className="text-sm">
                  <code>{`# 1. 安全的密码哈希
- 使用bcrypt/PBKDF2/Argon2
- 使用随机盐值
- 使用足够的迭代次数
- 存储盐值和迭代次数

# 2. 安全的密钥生成
- 使用密码学安全的随机数生成器
- 使用足够的密钥长度
- 使用安全的密钥派生函数
- 保护密钥材料

# 3. 安全的加密实现
- 使用认证加密（AEAD）
- 使用安全的初始化向量
- 实施完整性检查
- 防止重放攻击

# 4. 安全的通信
- 使用TLS 1.3
- 实施证书验证
- 使用前向安全性
- 定期更新证书`}</code>
                </pre>
              </div>
            </div>
          </div>
        )}

        {activeTab === "cases" && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">案例分析</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold">1. 安全通信案例</h4>
              <ul className="list-disc pl-6 mb-4">
                <li>HTTPS实现</li>
                <li>VPN配置</li>
                <li>即时通讯加密</li>
                <li>电子邮件加密</li>
              </ul>

              <h4 className="font-semibold">2. 数据保护案例</h4>
              <ul className="list-disc pl-6 mb-4">
                <li>数据库加密</li>
                <li>文件系统加密</li>
                <li>备份加密</li>
                <li>云存储加密</li>
              </ul>

              <h4 className="font-semibold">3. 身份认证案例</h4>
              <ul className="list-disc pl-6 mb-4">
                <li>多因素认证</li>
                <li>单点登录</li>
                <li>生物特征认证</li>
                <li>证书认证</li>
              </ul>

              <h4 className="font-semibold mt-4">案例分析示例</h4>
              <div className="bg-gray-100 p-4 rounded-lg">
                <pre className="text-sm">
                  <code>{`# 1. HTTPS实现案例
- 使用Let's Encrypt获取证书
- 配置TLS 1.3
- 实施HSTS
- 配置安全的密码套件

# 2. 数据库加密案例
- 使用透明数据加密
- 实施列级加密
- 保护加密密钥
- 实施访问控制

# 3. 多因素认证案例
- 使用TOTP
- 实施U2F
- 配置备用认证方式
- 实施账户恢复机制

# 4. 文件加密案例
- 使用AES-256-GCM
- 实施文件完整性检查
- 保护加密密钥
- 实施访问控制`}</code>
                </pre>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 底部导航 */}
      <div className="mt-8 flex justify-between">
        <Link
          href="/study/security/crypto/analysis"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          ← 密码分析
        </Link>
        <Link
          href="/study/security/frontend/basic"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          前端安全 →
        </Link>
      </div>
    </div>
  );
} 