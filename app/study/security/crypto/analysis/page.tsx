'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import {
  PageTitle, SectionTitle, BookParagraph, BookCode, BookAlert, BookList,
} from '@/app/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '网络安全',
  chapterTitle: '密码分析',
  chapterNumber: 9,
  totalChapters: 10,
  subjectHref: '/study/security/crypto',
  prevChapter: { label: '密码协议', href: '/study/security/crypto/protocol' },
  nextChapter: { label: '密码学应用', href: '/study/security/crypto/application' },
  theme: THEMES.security,
}

const substitutionCipher = `# 简单的替换密码示例
def encrypt_substitution(plaintext, key):
    """使用替换密码加密"""
    ciphertext = ""
    for char in plaintext:
        if char.isalpha():
            # 将字母映射到0-25
            index = ord(char.lower()) - ord('a')
            # 使用密钥进行替换
            new_index = (index + key) % 26
            # 转换回字母
            ciphertext += chr(new_index + ord('a'))
        else:
            ciphertext += char
    return ciphertext

def decrypt_substitution(ciphertext, key):
    """使用替换密码解密"""
    return encrypt_substitution(ciphertext, -key)

# 使用示例
message = "hello world"
key = 3
encrypted = encrypt_substitution(message, key)
print(f"加密后: {encrypted}")  # 输出: khoor zruog
decrypted = decrypt_substitution(encrypted, key)
print(f"解密后: {decrypted}")  # 输出: hello world`

const frequencyAnalysis = `def frequency_analysis(ciphertext):
    """对密文进行频率分析"""
    # 统计字母频率
    freq = {}
    for char in ciphertext.lower():
        if char.isalpha():
            freq[char] = freq.get(char, 0) + 1

    # 计算百分比
    total = sum(freq.values())
    for char in freq:
        freq[char] = (freq[char] / total) * 100

    return freq

# 使用示例
ciphertext = "khoor zruog"
freq = frequency_analysis(ciphertext)
print("字母频率分析结果：")
for char, percentage in sorted(freq.items(), key=lambda x: x[1], reverse=True):
    print(f"{char}: {percentage:.2f}%")

# 输出示例：
# o: 40.00%
# r: 20.00%
# h: 20.00%
# k: 10.00%
# z: 10.00%`

const chosenPlaintextAttack = `def chosen_plaintext_attack(encrypt_func, known_pairs):
    """选择明文攻击示例"""
    # 收集明文-密文对
    pairs = []
    for plaintext in known_pairs:
        ciphertext = encrypt_func(plaintext)
        pairs.append((plaintext, ciphertext))

    # 分析加密模式
    patterns = {}
    for plaintext, ciphertext in pairs:
        # 分析加密模式
        pattern = analyze_pattern(plaintext, ciphertext)
        patterns[pattern] = patterns.get(pattern, 0) + 1

    return patterns

def analyze_pattern(plaintext, ciphertext):
    """分析加密模式"""
    # 这里实现具体的模式分析逻辑
    # 例如：分析字符替换模式、位移模式等
    return "pattern"

# 使用示例
known_pairs = [
    "aaaa", "bbbb",
    "bbbb", "cccc",
    "cccc", "dddd"
]
patterns = chosen_plaintext_attack(encrypt_substitution, known_pairs)
print("加密模式分析结果：", patterns)`

const rsaSmallExponent = `def rsa_small_exponent_attack(ciphertext, e, n):
    """RSA小指数攻击示例"""
    # 当e很小时，可以直接计算e次方根
    from gmpy2 import iroot

    # 尝试计算密文的e次方根
    m, is_exact = iroot(ciphertext, e)
    if is_exact:
        return m
    return None

# 使用示例
n = 3233  # 模数
e = 3     # 小指数
c = 2197  # 密文

# 尝试攻击
m = rsa_small_exponent_attack(c, e, n)
if m:
    print(f"成功破解！明文为: {m}")
else:
    print("攻击失败")`

const sideChannelDefense = `def secure_compare(a, b):
    """安全的字符串比较，防止时序攻击"""
    if len(a) != len(b):
        return False

    result = 0
    for x, y in zip(a, b):
        result |= ord(x) ^ ord(y)

    return result == 0

def secure_encryption(message, key):
    """安全的加密实现，防止侧信道攻击"""
    # 添加随机填充
    padding = os.urandom(16)
    padded_message = padding + message

    # 使用常量时间操作
    result = bytearray()
    for i in range(len(padded_message)):
        result.append(padded_message[i] ^ key[i % len(key)])

    return bytes(result)

# 使用示例
message = b"secret message"
key = os.urandom(16)
encrypted = secure_encryption(message, key)
print(f"加密结果: {encrypted.hex()}")`

const SPREADS = [
  {
    label: '基本概念',
    left: (
      <div className="space-y-4">
        <PageTitle>密码分析基本概念</PageTitle>
        <BookParagraph>
          密码分析是研究密码系统安全性的科学，通过分析密码算法的弱点，评估其抵抗各种攻击的能力。密码分析的目标是发现密码系统中的漏洞，从而改进其安全性。
        </BookParagraph>
        <SectionTitle>密码分析的基本要素</SectionTitle>
        <BookList items={[
          '攻击者模型：定义攻击者的能力和限制',
          '攻击目标：确定要破解的信息',
          '攻击方法：使用的分析技术',
          '攻击复杂度：评估攻击的难度',
          '攻击效果：衡量攻击的成功率',
        ]} />
        <SectionTitle>密码分析的目标</SectionTitle>
        <BookList items={[
          '完全破解：恢复密钥或明文',
          '部分破解：获取部分信息',
          '区分攻击：区分加密和随机数据',
          '伪造攻击：生成有效的密文',
          '重放攻击：重复使用有效的密文',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>实际例子：简单的替换密码分析</PageTitle>
        <BookCode language="python" code={substitutionCipher} />
      </div>
    ),
  },
  {
    label: '分析方法',
    left: (
      <div className="space-y-4">
        <PageTitle>密码分析方法</PageTitle>
        <SectionTitle>1. 数学分析方法</SectionTitle>
        <BookList items={['线性密码分析', '差分密码分析', '代数攻击', '格攻击']} />
        <SectionTitle>2. 统计分析方法</SectionTitle>
        <BookList items={['频率分析', '相关性分析', '分布分析', '熵分析']} />
        <SectionTitle>3. 实现分析方法</SectionTitle>
        <BookList items={['侧信道分析', '故障分析', '时间分析', '功耗分析']} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>实际例子：频率分析</PageTitle>
        <BookCode language="python" code={frequencyAnalysis} />
      </div>
    ),
  },
  {
    label: '攻击类型',
    left: (
      <div className="space-y-4">
        <PageTitle>攻击类型</PageTitle>
        <SectionTitle>1. 已知明文攻击</SectionTitle>
        <BookList items={[
          '攻击者知道部分明文和对应的密文',
          '用于分析加密算法的弱点',
          '常见于实际攻击场景',
        ]} />
        <SectionTitle>2. 选择明文攻击</SectionTitle>
        <BookList items={[
          '攻击者可以选择明文并获取密文',
          '用于分析加密算法的内部结构',
          '常用于密码分析研究',
        ]} />
        <SectionTitle>3. 选择密文攻击</SectionTitle>
        <BookList items={[
          '攻击者可以选择密文并获取明文',
          '用于分析解密算法的弱点',
          '常见于实际攻击场景',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>实际例子：选择明文攻击</PageTitle>
        <BookCode language="python" code={chosenPlaintextAttack} />
      </div>
    ),
  },
  {
    label: '实际案例',
    left: (
      <div className="space-y-4">
        <PageTitle>实际案例</PageTitle>
        <SectionTitle>1. DES密码分析</SectionTitle>
        <BookList items={['差分密码分析攻击', '线性密码分析攻击', '暴力破解攻击', '实际影响和教训']} />
        <SectionTitle>2. RSA密码分析</SectionTitle>
        <BookList items={['共模攻击', '小指数攻击', '选择密文攻击', '实际影响和教训']} />
        <SectionTitle>3. 实际攻击案例</SectionTitle>
        <BookList items={['Heartbleed漏洞', 'POODLE攻击', 'BEAST攻击', '实际影响和教训']} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>实际例子：RSA小指数攻击</PageTitle>
        <BookCode language="python" code={rsaSmallExponent} />
      </div>
    ),
  },
  {
    label: '安全防护',
    left: (
      <div className="space-y-4">
        <PageTitle>安全防护</PageTitle>
        <SectionTitle>1. 算法防护</SectionTitle>
        <BookList items={['使用安全的密码算法', '定期更新算法参数', '实施多重加密', '使用随机化技术']} />
        <SectionTitle>2. 实现防护</SectionTitle>
        <BookList items={['防止侧信道攻击', '实施错误检测', '使用安全存储', '实施访问控制']} />
        <SectionTitle>3. 系统防护</SectionTitle>
        <BookList items={['安全配置系统', '实施监控审计', '定期安全评估', '应急响应机制']} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>实际例子：防止侧信道攻击</PageTitle>
        <BookCode language="python" code={sideChannelDefense} />
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
              <tr><td className="border p-2" style={{ border: '1px solid #ddd' }}>算法选择</td><td className="border p-2" style={{ border: '1px solid #ddd' }}>使用安全的密码算法</td><td className="border p-2" style={{ border: '1px solid #ddd' }}>极高</td></tr>
              <tr><td className="border p-2" style={{ border: '1px solid #ddd' }}>实现安全</td><td className="border p-2" style={{ border: '1px solid #ddd' }}>防止侧信道攻击</td><td className="border p-2" style={{ border: '1px solid #ddd' }}>高</td></tr>
              <tr><td className="border p-2" style={{ border: '1px solid #ddd' }}>密钥管理</td><td className="border p-2" style={{ border: '1px solid #ddd' }}>安全的密钥管理</td><td className="border p-2" style={{ border: '1px solid #ddd' }}>高</td></tr>
              <tr><td className="border p-2" style={{ border: '1px solid #ddd' }}>系统安全</td><td className="border p-2" style={{ border: '1px solid #ddd' }}>系统级安全防护</td><td className="border p-2" style={{ border: '1px solid #ddd' }}>高</td></tr>
              <tr><td className="border p-2" style={{ border: '1px solid #ddd' }}>监控审计</td><td className="border p-2" style={{ border: '1px solid #ddd' }}>安全监控和审计</td><td className="border p-2" style={{ border: '1px solid #ddd' }}>高</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    ),
  },
]

export default function CryptoAnalysisPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
