'use client';
import { useState } from 'react';

export default function CryptoPage() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">密码学应用</h1>
      {/* 顶部tab导航 */}
      <div className="flex space-x-4 mb-6 border-b overflow-x-auto">
        <button onClick={() => setActiveTab('overview')} className={`px-4 py-2 font-medium whitespace-nowrap ${activeTab === 'overview' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>概述</button>
        <button onClick={() => setActiveTab('crypto')} className={`px-4 py-2 font-medium whitespace-nowrap ${activeTab === 'crypto' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>密码学应用</button>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6 min-h-[320px]">
        {activeTab === 'overview' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold mb-3">密码学概述</h2>
            <div className="prose max-w-none">
              <p>密码学是研究信息加密和解密的科学，旨在保护信息的机密性、完整性和可用性。它广泛应用于网络安全、数据保护、身份验证等领域。</p>
              <h3 className="font-semibold">对称加密与非对称加密</h3>
              <p>对称加密使用相同的密钥进行加密和解密，而非对称加密使用一对密钥（公钥和私钥）。对称加密速度快，适合大数据加密；非对称加密安全性高，适合小数据加密和密钥交换。</p>
              <h4 className="font-semibold">对称加密</h4>
              <p>对称加密使用相同的密钥进行加密和解密，常见的算法包括 AES、DES 等。对称加密的优点是速度快，适合大数据加密；缺点是密钥管理复杂，密钥泄露会导致数据泄露。</p>
              <p>适用场景：数据传输、文件加密等。</p>
              <p>实际案例：在 HTTPS 协议中，对称加密用于加密传输的数据，确保数据在传输过程中的安全性。</p>
              <h4 className="font-semibold">非对称加密</h4>
              <p>非对称加密使用一对密钥（公钥和私钥），常见的算法包括 RSA、ECC 等。非对称加密的优点是安全性高，适合小数据加密和密钥交换；缺点是速度慢，不适合大数据加密。</p>
              <p>适用场景：密钥交换、数字签名等。</p>
              <p>实际案例：在比特币交易中，非对称加密用于生成和验证交易签名，确保交易的安全性和完整性。</p>
            </div>
          </div>
        )}
        {activeTab === 'crypto' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold mb-3">密码学基础</h2>
            <div className="prose max-w-none">
              <p>密码学是研究信息加密和解密的科学，旨在保护信息的机密性、完整性和可用性。它广泛应用于网络安全、数据保护、身份验证等领域。</p>
              <h3 className="font-semibold">对称加密与非对称加密</h3>
              <p>对称加密使用相同的密钥进行加密和解密，而非对称加密使用一对密钥（公钥和私钥）。对称加密速度快，适合大数据加密；非对称加密安全性高，适合小数据加密和密钥交换。</p>
              <ul className="list-disc pl-6">
                <li><b>对称加密：</b>如 AES，速度快，适合大数据加密。</li>
                <li><b>非对称加密：</b>如 RSA，安全性高，适合小数据加密和密钥交换。</li>
              </ul>
            </div>

            <h2 className="text-2xl font-semibold mb-3">常见加密算法</h2>
            <div className="prose max-w-none">
              <ul className="list-disc pl-6">
                <li><b>AES：</b>高级加密标准，广泛用于数据加密，提供高安全性和高效性。</li>
                <li><b>RSA：</b>非对称加密算法，常用于安全数据传输，适合密钥交换和数字签名。</li>
                <li><b>ECC：</b>椭圆曲线加密，提供相同安全级别下更小的密钥，适合资源受限的环境。</li>
              </ul>
            </div>

            <h2 className="text-2xl font-semibold mb-3">数字签名</h2>
            <div className="prose max-w-none">
              <p>数字签名用于验证信息的来源和完整性，确保数据未被篡改。它通过私钥对信息进行签名，使用公钥进行验证。</p>
              <pre className="bg-gray-100 p-4 rounded mb-4 text-xs overflow-x-auto">
{`// 示例：使用Solidity实现数字签名
pragma solidity ^0.8.0;

contract Signature {
    function verifySignature(bytes32 message, bytes memory signature) public pure returns (address) {
        return recoverSigner(message, signature);
    }

    function recoverSigner(bytes32 message, bytes memory signature) internal pure returns (address) {
        // 实现签名恢复逻辑
    }
}`}
              </pre>
            </div>

            <h2 className="text-2xl font-semibold mb-3">哈希函数</h2>
            <div className="prose max-w-none">
              <p>哈希函数将任意长度的数据映射为固定长度的哈希值，常用于数据完整性校验。常见的哈希算法包括 SHA-256 和 SHA-3。</p>
              <ul className="list-disc pl-6">
                <li><b>SHA-256：</b>比特币使用的哈希算法，安全性高，广泛用于数据完整性校验。</li>
                <li><b>SHA-3：</b>最新的哈希标准，提供更高的安全性，适合需要高安全性的应用。</li>
              </ul>
            </div>

            <h2 className="text-2xl font-semibold mb-3">公钥基础设施（PKI）</h2>
            <div className="prose max-w-none">
              <p>PKI 是一种用于管理数字证书和公钥的系统，确保安全通信。证书由认证机构（CA）签发，包含公钥和持有者信息。</p>
              <p>PKI 在安全通信中扮演着重要角色，确保数据的机密性和完整性。</p>
            </div>

            <h2 className="text-2xl font-semibold mb-3">密码学应用案例</h2>
            <div className="prose max-w-none">
              <p>密码学在区块链中的应用确保了交易的安全性和匿名性。例如，比特币交易使用公钥和私钥进行安全验证，确保资金的安全转移。</p>
              <p>此外，密码学还广泛应用于安全通信、数据保护、身份验证等领域，为现代网络安全提供了重要保障。</p>
            </div>
          </div>
        )}
      </div>
      {/* 底部导航栏 */}
      <div className="mt-8 flex justify-between">
        <a href="/study/security/blockchain/smart-contract" className="px-4 py-2 text-blue-600 hover:text-blue-800">← 返回智能合约安全</a>
        <a href="/study/security/blockchain/wallet" className="px-4 py-2 text-blue-600 hover:text-blue-800">钱包安全 →</a>
      </div>
    </div>
  );
} 