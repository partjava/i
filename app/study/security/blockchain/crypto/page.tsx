'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import {
  PageTitle, SectionTitle, BookParagraph, BookCode, BookAlert, BookList, TagGrid,
} from '@shared/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '网络安全',
  chapterTitle: '密码学应用',
  chapterNumber: 4,
  totalChapters: 10,
  subjectHref: '/study/security/blockchain',
  prevChapter: { label: '智能合约安全', href: '/study/security/blockchain/smart-contract' },
  nextChapter: { label: '钱包安全', href: '/study/security/blockchain/wallet' },
  theme: THEMES.security,
}

const SPREADS = [
  {
    label: '密码学概述',
    left: (
      <div className="space-y-4">
        <PageTitle>密码学概述</PageTitle>
        <BookParagraph>密码学是研究信息加密和解密的科学，旨在保护信息的机密性、完整性和可用性。它广泛应用于网络安全、数据保护、身份验证等领域。</BookParagraph>
        <SectionTitle>对称加密与非对称加密</SectionTitle>
        <BookParagraph>对称加密使用相同的密钥进行加密和解密，而非对称加密使用一对密钥（公钥和私钥）。对称加密速度快，适合大数据加密；非对称加密安全性高，适合小数据加密和密钥交换。</BookParagraph>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>对称加密</PageTitle>
        <BookParagraph>对称加密使用相同的密钥进行加密和解密，常见的算法包括 AES、DES 等。对称加密的优点是速度快，适合大数据加密；缺点是密钥管理复杂，密钥泄露会导致数据泄露。</BookParagraph>
        <BookList items={['适用场景：数据传输、文件加密等。', '实际案例：在 HTTPS 协议中，对称加密用于加密传输的数据，确保数据在传输过程中的安全性。']} />
        <SectionTitle>非对称加密</SectionTitle>
        <BookParagraph>非对称加密使用一对密钥（公钥和私钥），常见的算法包括 RSA、ECC 等。非对称加密的优点是安全性高，适合小数据加密和密钥交换；缺点是速度慢，不适合大数据加密。</BookParagraph>
        <BookList items={['适用场景：密钥交换、数字签名等。', '实际案例：在比特币交易中，非对称加密用于生成和验证交易签名，确保交易的安全性和完整性。']} />
      </div>
    ),
  },
  {
    label: '密码学基础',
    left: (
      <div className="space-y-4">
        <PageTitle>密码学基础</PageTitle>
        <BookParagraph>密码学是研究信息加密和解密的科学，旨在保护信息的机密性、完整性和可用性。它广泛应用于网络安全、数据保护、身份验证等领域。</BookParagraph>
        <SectionTitle>对称加密与非对称加密</SectionTitle>
        <BookParagraph>对称加密使用相同的密钥进行加密和解密，而非对称加密使用一对密钥（公钥和私钥）。对称加密速度快，适合大数据加密；非对称加密安全性高，适合小数据加密和密钥交换。</BookParagraph>
        <BookList items={['<b>对称加密：</b>如 AES，速度快，适合大数据加密。', '<b>非对称加密：</b>如 RSA，安全性高，适合小数据加密和密钥交换。']} />
        <SectionTitle>常见加密算法</SectionTitle>
        <BookList items={['<b>AES：</b>高级加密标准，广泛用于数据加密，提供高安全性和高效性。', '<b>RSA：</b>非对称加密算法，常用于安全数据传输，适合密钥交换和数字签名。', '<b>ECC：</b>椭圆曲线加密，提供相同安全级别下更小的密钥，适合资源受限的环境。']} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>数字签名</PageTitle>
        <BookParagraph>数字签名用于验证信息的来源和完整性，确保数据未被篡改。它通过私钥对信息进行签名，使用公钥进行验证。</BookParagraph>
        <BookCode language="solidity" code={`// 示例：使用Solidity实现数字签名
pragma solidity ^0.8.0;

contract Signature {
    function verifySignature(bytes32 message, bytes memory signature) public pure returns (address) {
        return recoverSigner(message, signature);
    }

    function recoverSigner(bytes32 message, bytes memory signature) internal pure returns (address) {
        // 实现签名恢复逻辑
    }
}`} />
      </div>
    ),
  },
  {
    label: '哈希函数与PKI',
    left: (
      <div className="space-y-4">
        <PageTitle>哈希函数</PageTitle>
        <BookParagraph>哈希函数将任意长度的数据映射为固定长度的哈希值，常用于数据完整性校验。常见的哈希算法包括 SHA-256 和 SHA-3。</BookParagraph>
        <BookList items={['<b>SHA-256：</b>比特币使用的哈希算法，安全性高，广泛用于数据完整性校验。', '<b>SHA-3：</b>最新的哈希标准，提供更高的安全性，适合需要高安全性的应用。']} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>公钥基础设施（PKI）</PageTitle>
        <BookParagraph>PKI 是一种用于管理数字证书和公钥的系统，确保安全通信。证书由认证机构（CA）签发，包含公钥和持有者信息。</BookParagraph>
        <BookParagraph>PKI 在安全通信中扮演着重要角色，确保数据的机密性和完整性。</BookParagraph>
      </div>
    ),
  },
  {
    label: '应用案例',
    left: (
      <div className="space-y-4">
        <PageTitle>密码学应用案例</PageTitle>
        <BookParagraph>密码学在区块链中的应用确保了交易的安全性和匿名性。例如，比特币交易使用公钥和私钥进行安全验证，确保资金的安全转移。</BookParagraph>
        <BookParagraph>此外，密码学还广泛应用于安全通信、数据保护、身份验证等领域，为现代网络安全提供了重要保障。</BookParagraph>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>密码学应用总结</PageTitle>
        <BookList items={['对称加密：速度快，适合大数据加密，如 AES、DES。', '非对称加密：安全性高，适合密钥交换和数字签名，如 RSA、ECC。', '哈希函数：数据完整性校验，如 SHA-256、SHA-3。', 'PKI：管理数字证书和公钥，确保安全通信。', '数字签名：验证信息来源和完整性，防止篡改。']} />
        <BookAlert type="info" message="密码学是区块链安全的基石，理解这些基础知识对深入学习区块链安全至关重要。" />
      </div>
    ),
  },
]

export default function CryptoPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
