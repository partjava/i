'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import {
  PageTitle, SectionTitle, BookParagraph, BookCode, BookAlert, BookList,
} from '@/app/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '网络安全',
  chapterTitle: '密码学应用',
  chapterNumber: 10,
  totalChapters: 10,
  subjectHref: '/study/security/crypto',
  prevChapter: { label: '密码分析', href: '/study/security/crypto/analysis' },
  nextChapter: { label: '前端安全基础', href: '/study/security/frontend/basic' },
  theme: THEMES.security,
}

const fileEncryptCode = `from cryptography.fernet import Fernet
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
print(f"文件已解密: {decrypted_file}")`

const passwordHashCode = `import bcrypt
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
print(f"密码验证结果: {is_valid}")`

const digitalSignCode = `from cryptography.hazmat.primitives import hashes
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
print(f"签名验证结果: {is_valid}")`

const SPREADS = [
  {
    label: '应用场景',
    left: (
      <div className="space-y-4">
        <PageTitle>密码学应用场景</PageTitle>
        <SectionTitle>1. 数据加密</SectionTitle>
        <BookList items={['文件加密：保护敏感文件', '数据库加密：保护存储的数据', '通信加密：保护传输中的数据', '备份加密：保护备份数据']} />
        <SectionTitle>2. 身份认证</SectionTitle>
        <BookList items={['密码存储：安全的密码哈希', '双因素认证：增加安全层级', '生物特征认证：指纹、面部识别', '数字证书：基于PKI的认证']} />
        <SectionTitle>3. 数字签名</SectionTitle>
        <BookList items={['文档签名：确保文档完整性', '代码签名：验证软件来源', '电子合同：具有法律效力', '区块链交易：确保交易真实性']} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>4. 安全通信</SectionTitle>
        <BookList items={['HTTPS：安全的Web通信', 'VPN：安全的远程访问', '即时通讯：端到端加密', '电子邮件：PGP加密']} />
        <SectionTitle>应用场景示例</SectionTitle>
        <BookCode language="text" code={`1. 文件加密场景
- 使用AES加密敏感文件
- 使用RSA加密文件密钥
- 使用HMAC验证文件完整性

2. 密码存储场景
- 使用bcrypt/PBKDF2进行密码哈希
- 使用随机盐值增加安全性
- 使用HMAC进行密码验证

3. 数字签名场景
- 使用RSA/ECDSA进行签名
- 使用SHA-256计算消息摘要
- 使用PKI验证签名

4. 安全通信场景
- 使用TLS 1.3进行加密通信
- 使用证书进行身份验证
- 使用前向安全性保护会话`} />
      </div>
    ),
  },
  {
    label: '实现示例',
    left: (
      <div className="space-y-4">
        <PageTitle>文件加密实现</PageTitle>
        <BookCode language="python" code={fileEncryptCode} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>密码存储实现</PageTitle>
        <BookCode language="python" code={passwordHashCode} />
        <PageTitle>数字签名实现</PageTitle>
        <BookCode language="python" code={digitalSignCode} />
      </div>
    ),
  },
  {
    label: '最佳实践',
    left: (
      <div className="space-y-4">
        <PageTitle>最佳实践</PageTitle>
        <SectionTitle>1. 算法选择</SectionTitle>
        <BookList items={['使用经过验证的密码算法', '避免使用过时的算法', '选择合适的密钥长度', '定期更新算法参数']} />
        <SectionTitle>2. 密钥管理</SectionTitle>
        <BookList items={['安全生成密钥', '安全存储密钥', '定期轮换密钥', '实施密钥备份']} />
        <SectionTitle>3. 实现安全</SectionTitle>
        <BookList items={['使用安全的密码库', '防止侧信道攻击', '实施错误处理', '进行安全测试']} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>最佳实践示例</PageTitle>
        <BookCode language="text" code={`1. 安全的密码哈希
- 使用bcrypt/PBKDF2/Argon2
- 使用随机盐值
- 使用足够的迭代次数
- 存储盐值和迭代次数

2. 安全的密钥生成
- 使用密码学安全的随机数生成器
- 使用足够的密钥长度
- 使用安全的密钥派生函数
- 保护密钥材料

3. 安全的加密实现
- 使用认证加密（AEAD）
- 使用安全的初始化向量
- 实施完整性检查
- 防止重放攻击

4. 安全的通信
- 使用TLS 1.3
- 实施证书验证
- 使用前向安全性
- 定期更新证书`} />
      </div>
    ),
  },
  {
    label: '案例分析',
    left: (
      <div className="space-y-4">
        <PageTitle>案例分析</PageTitle>
        <SectionTitle>1. 安全通信案例</SectionTitle>
        <BookList items={['HTTPS实现', 'VPN配置', '即时通讯加密', '电子邮件加密']} />
        <SectionTitle>2. 数据保护案例</SectionTitle>
        <BookList items={['数据库加密', '文件系统加密', '备份加密', '云存储加密']} />
        <SectionTitle>3. 身份认证案例</SectionTitle>
        <BookList items={['多因素认证', '单点登录', '生物特征认证', '证书认证']} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>案例分析示例</PageTitle>
        <BookCode language="text" code={`1. HTTPS实现案例
- 使用Let's Encrypt获取证书
- 配置TLS 1.3
- 实施HSTS
- 配置安全的密码套件

2. 数据库加密案例
- 使用透明数据加密
- 实施列级加密
- 保护加密密钥
- 实施访问控制

3. 多因素认证案例
- 使用TOTP
- 实施U2F
- 配置备用认证方式
- 实施账户恢复机制

4. 文件加密案例
- 使用AES-256-GCM
- 实施文件完整性检查
- 保护加密密钥
- 实施访问控制`} />
      </div>
    ),
  },
]

export default function CryptoApplicationPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
