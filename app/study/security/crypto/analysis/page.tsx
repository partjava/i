"use client";
import { useState } from "react";
import Link from "next/link";

export default function CryptoAnalysisPage() {
  const [activeTab, setActiveTab] = useState("intro");

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">密码分析</h1>
      
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
          onClick={() => setActiveTab("methods")}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === "methods"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          分析方法
        </button>
        <button
          onClick={() => setActiveTab("attacks")}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === "attacks"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          攻击类型
        </button>
        <button
          onClick={() => setActiveTab("cases")}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === "cases"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          实际案例
        </button>
        <button
          onClick={() => setActiveTab("defense")}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === "defense"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          安全防护
        </button>
      </div>

      {/* 内容区域 */}
      <div className="bg-white rounded-lg shadow-md p-6">
        {activeTab === "intro" && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">密码分析基本概念</h3>
            <div className="prose max-w-none">
              <p className="mb-4">
                密码分析是研究密码系统安全性的科学，通过分析密码算法的弱点，评估其抵抗各种攻击的能力。密码分析的目标是发现密码系统中的漏洞，从而改进其安全性。
              </p>

              <h4 className="font-semibold mt-4">密码分析的基本要素</h4>
              <ul className="list-disc pl-6 mb-4">
                <li>攻击者模型：定义攻击者的能力和限制</li>
                <li>攻击目标：确定要破解的信息</li>
                <li>攻击方法：使用的分析技术</li>
                <li>攻击复杂度：评估攻击的难度</li>
                <li>攻击效果：衡量攻击的成功率</li>
              </ul>

              <h4 className="font-semibold mt-4">密码分析的目标</h4>
              <div className="bg-gray-100 p-4 rounded-lg">
                <ul className="list-disc pl-6">
                  <li>完全破解：恢复密钥或明文</li>
                  <li>部分破解：获取部分信息</li>
                  <li>区分攻击：区分加密和随机数据</li>
                  <li>伪造攻击：生成有效的密文</li>
                  <li>重放攻击：重复使用有效的密文</li>
                </ul>
              </div>

              <h4 className="font-semibold mt-4">实际例子：简单的替换密码分析</h4>
              <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto mt-2">
                <code>{`# 简单的替换密码示例
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
print(f"解密后: {decrypted}")  # 输出: hello world`}</code>
              </pre>
            </div>
          </div>
        )}

        {activeTab === "methods" && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">密码分析方法</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold">1. 数学分析方法</h4>
              <ul className="list-disc pl-6 mb-4">
                <li>线性密码分析</li>
                <li>差分密码分析</li>
                <li>代数攻击</li>
                <li>格攻击</li>
              </ul>

              <h4 className="font-semibold">2. 统计分析方法</h4>
              <ul className="list-disc pl-6 mb-4">
                <li>频率分析</li>
                <li>相关性分析</li>
                <li>分布分析</li>
                <li>熵分析</li>
              </ul>

              <h4 className="font-semibold">3. 实现分析方法</h4>
              <ul className="list-disc pl-6 mb-4">
                <li>侧信道分析</li>
                <li>故障分析</li>
                <li>时间分析</li>
                <li>功耗分析</li>
              </ul>

              <h4 className="font-semibold mt-4">实际例子：频率分析</h4>
              <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto mt-2">
                <code>{`def frequency_analysis(ciphertext):
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
# z: 10.00%`}</code>
              </pre>
            </div>
          </div>
        )}

        {activeTab === "attacks" && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">攻击类型</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold">1. 已知明文攻击</h4>
              <ul className="list-disc pl-6 mb-4">
                <li>攻击者知道部分明文和对应的密文</li>
                <li>用于分析加密算法的弱点</li>
                <li>常见于实际攻击场景</li>
              </ul>

              <h4 className="font-semibold">2. 选择明文攻击</h4>
              <ul className="list-disc pl-6 mb-4">
                <li>攻击者可以选择明文并获取密文</li>
                <li>用于分析加密算法的内部结构</li>
                <li>常用于密码分析研究</li>
              </ul>

              <h4 className="font-semibold">3. 选择密文攻击</h4>
              <ul className="list-disc pl-6 mb-4">
                <li>攻击者可以选择密文并获取明文</li>
                <li>用于分析解密算法的弱点</li>
                <li>常见于实际攻击场景</li>
              </ul>

              <h4 className="font-semibold mt-4">实际例子：选择明文攻击</h4>
              <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto mt-2">
                <code>{`def chosen_plaintext_attack(encrypt_func, known_pairs):
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
print("加密模式分析结果：", patterns)`}</code>
              </pre>
            </div>
          </div>
        )}

        {activeTab === "cases" && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">实际案例</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold">1. DES密码分析</h4>
              <ul className="list-disc pl-6 mb-4">
                <li>差分密码分析攻击</li>
                <li>线性密码分析攻击</li>
                <li>暴力破解攻击</li>
                <li>实际影响和教训</li>
              </ul>

              <h4 className="font-semibold">2. RSA密码分析</h4>
              <ul className="list-disc pl-6 mb-4">
                <li>共模攻击</li>
                <li>小指数攻击</li>
                <li>选择密文攻击</li>
                <li>实际影响和教训</li>
              </ul>

              <h4 className="font-semibold">3. 实际攻击案例</h4>
              <ul className="list-disc pl-6 mb-4">
                <li>Heartbleed漏洞</li>
                <li>POODLE攻击</li>
                <li>BEAST攻击</li>
                <li>实际影响和教训</li>
              </ul>

              <h4 className="font-semibold mt-4">实际例子：RSA小指数攻击</h4>
              <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto mt-2">
                <code>{`def rsa_small_exponent_attack(ciphertext, e, n):
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
    print("攻击失败")`}</code>
              </pre>
            </div>
          </div>
        )}

        {activeTab === "defense" && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">安全防护</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold">1. 算法防护</h4>
              <ul className="list-disc pl-6 mb-4">
                <li>使用安全的密码算法</li>
                <li>定期更新算法参数</li>
                <li>实施多重加密</li>
                <li>使用随机化技术</li>
              </ul>

              <h4 className="font-semibold">2. 实现防护</h4>
              <ul className="list-disc pl-6 mb-4">
                <li>防止侧信道攻击</li>
                <li>实施错误检测</li>
                <li>使用安全存储</li>
                <li>实施访问控制</li>
              </ul>

              <h4 className="font-semibold">3. 系统防护</h4>
              <ul className="list-disc pl-6 mb-4">
                <li>安全配置系统</li>
                <li>实施监控审计</li>
                <li>定期安全评估</li>
                <li>应急响应机制</li>
              </ul>

              <h4 className="font-semibold mt-4">实际例子：防止侧信道攻击</h4>
              <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto mt-2">
                <code>{`def secure_compare(a, b):
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
print(f"加密结果: {encrypted.hex()}")`}</code>
              </pre>

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
                      <td className="border p-2">算法选择</td>
                      <td className="border p-2">使用安全的密码算法</td>
                      <td className="border p-2">极高</td>
                    </tr>
                    <tr>
                      <td className="border p-2">实现安全</td>
                      <td className="border p-2">防止侧信道攻击</td>
                      <td className="border p-2">高</td>
                    </tr>
                    <tr>
                      <td className="border p-2">密钥管理</td>
                      <td className="border p-2">安全的密钥管理</td>
                      <td className="border p-2">高</td>
                    </tr>
                    <tr>
                      <td className="border p-2">系统安全</td>
                      <td className="border p-2">系统级安全防护</td>
                      <td className="border p-2">高</td>
                    </tr>
                    <tr>
                      <td className="border p-2">监控审计</td>
                      <td className="border p-2">安全监控和审计</td>
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
          href="/study/security/crypto/protocol"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          ← 密码协议
        </Link>
        <Link
          href="/study/security/crypto/application"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          密码学应用 →
        </Link>
      </div>
    </div>
  );
} 