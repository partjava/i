'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import {
  PageTitle,
  SectionTitle,
  BookParagraph,
  BookCode,
  BookAlert,
  BookList,
  TagGrid,
} from '@shared/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '网络安全',
  chapterTitle: '身份认证',
  chapterNumber: 2,
  totalChapters: 10,
  subjectHref: '/study/security/protection',
  prevChapter: { label: '访问控制', href: '/study/security/protection/access' },
  nextChapter: { label: '加密技术', href: '/study/security/protection/encryption' },
  theme: THEMES.security,
}

const SPREADS = [
  {
    label: '基础原理',
    left: (
      <div className="space-y-4">
        <PageTitle>身份认证基础原理</PageTitle>
        <BookParagraph>身份认证（Authentication）是信息安全体系的第一道防线，其核心目标是确认访问者的真实身份，防止冒用、伪造和未授权访问。认证不仅是访问控制和授权的前提，也是防止数据泄露、系统入侵、资源滥用的基础。</BookParagraph>
        <BookList items={[
          '认证与授权的区别：认证是「你是谁」，授权是「你能做什么」',
          '常见攻击方式：冒用（弱口令、撞库）、伪造（钓鱼、伪造Token）、会话劫持等',
          '防护思路：多因素认证、强密码策略、认证信息加密、会话管理、异常检测等',
        ]} />
        <div style={{ textAlign: 'center', margin: '16px 0' }}>
          <svg width="480" height="100" viewBox="0 0 480 100">
            <rect x="30" y="30" width="80" height="40" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="2" rx="8" />
            <text x="70" y="55" fontSize="14" fill="#0ea5e9" textAnchor="middle">用户</text>
            <rect x="200" y="30" width="80" height="40" fill="#fce7f3" stroke="#ec4899" strokeWidth="2" rx="8" />
            <text x="240" y="55" fontSize="14" fill="#db2777" textAnchor="middle">认证系统</text>
            <rect x="370" y="30" width="80" height="40" fill="#fee2e2" stroke="#ef4444" strokeWidth="2" rx="8" />
            <text x="410" y="55" fontSize="14" fill="#ef4444" textAnchor="middle">资源</text>
            <line x1="110" y1="50" x2="200" y2="50" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow_au)" />
            <line x1="280" y1="50" x2="370" y2="50" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow_au)" />
            <defs>
              <marker id="arrow_au" markerWidth="8" markerHeight="8" refX="8" refY="4" orient="auto" markerUnits="strokeWidth">
                <path d="M0,0 L8,4 L0,8" fill="#64748b" />
              </marker>
            </defs>
          </svg>
        </div>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>核心定位</PageTitle>
        <BookParagraph>身份认证广泛应用于操作系统登录、网络接入、Web系统、API接口、物联网设备等各类场景，是保障系统安全的基石。</BookParagraph>
        <BookAlert type="info" message="身份认证是零信任架构的核心——永不信任，始终验证。每一次访问请求都需要经过身份认证，无论请求来自内网还是外网。" />
      </div>
    ),
  },
  {
    label: '认证类型',
    left: (
      <div className="space-y-4">
        <PageTitle>认证类型</PageTitle>
        <SectionTitle>1. 基于知识的认证</SectionTitle>
        <BookList items={[
          '密码/口令：最传统的方式，成本低但安全性取决于密码强度',
          'PIN码：常用于ATM、手机解锁',
          '安全问题：如「你母亲的姓氏」',
        ]} />
        <SectionTitle>2. 基于拥有的认证</SectionTitle>
        <BookList items={[
          '硬件Token：如RSA SecurID、U盾',
          '手机验证码：SMS或APP推送的一次性密码',
          '智能卡：如门禁卡、银行IC卡',
        ]} />
        <SectionTitle>3. 基于生物特征的认证</SectionTitle>
        <BookList items={[
          '指纹识别',
          '面部识别（Face ID）',
          '虹膜识别',
          '声纹识别',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>单因素与多因素认证</PageTitle>
        <SectionTitle>单因素认证（SFA）</SectionTitle>
        <BookParagraph>仅使用一种认证因素，如密码。优点是简单，缺点是安全性低，容易因密码泄露被攻破。</BookParagraph>
        <SectionTitle>双因素认证（2FA）</SectionTitle>
        <BookParagraph>使用两种不同的认证因素，如密码+手机验证码。显著提高安全性，是目前最推荐的增强方式。</BookParagraph>
        <SectionTitle>多因素认证（MFA）</SectionTitle>
        <BookParagraph>使用两种或以上认证因素，结合知识、拥有、生物特征中的任意组合。企业级安全的标准配置。</BookParagraph>
        <BookAlert type="info" message="MFA（多因素认证）可以将账户被攻破的风险降低99%以上。即使密码泄露，攻击者也无法通过第二因素验证。" />
      </div>
    ),
  },
  {
    label: '常见技术',
    left: (
      <div className="space-y-4">
        <PageTitle>常见认证技术</PageTitle>
        <BookList items={[
          'OAuth 2.0：授权框架，允许第三方应用获取有限资源访问权限',
          'OpenID Connect：基于OAuth 2.0的身份认证协议',
          'JWT（JSON Web Token）：自包含的Token格式，无状态认证',
          'LDAP：轻量级目录访问协议，统一用户认证',
          'SAML：安全断言标记语言，单点登录协议',
          'Kerberos：MIT开发的网络认证协议，Windows域环境核心',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>JWT认证示例</PageTitle>
        <BookCode language="python" code={`import jwt
import datetime

# 生成JWT Token
payload = {
    'user_id': 123,
    'role': 'admin',
    'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)
}
token = jwt.encode(payload, 'secret_key', algorithm='HS256')

# 验证JWT Token
try:
    decoded = jwt.decode(token, 'secret_key', algorithms=['HS256'])
    print('用户ID:', decoded['user_id'])
except jwt.ExpiredSignatureError:
    print('Token已过期')`} />
      </div>
    ),
  },
  {
    label: '实际案例',
    left: (
      <div className="space-y-4">
        <PageTitle>身份认证实际案例</PageTitle>
        <BookList items={[
          '案例1：某公司未启用MFA，攻击者通过撞库攻击获取员工VPN密码，成功入侵内网。启示：外部访问必须启用MFA。',
          '案例2：某Web应用使用JWT但未设置过期时间，Token泄露后攻击者可永久访问。启示：Token必须设置合理的过期时间。',
          '案例3：某金融应用仅使用SMS验证码作为唯一认证方式，攻击者通过SIM Swap劫持验证码。启示：SMS不是完美的第二因素，建议使用TOTP或硬件密钥。',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>最佳实践</PageTitle>
        <BookList items={[
          '所有系统启用多因素认证（MFA）',
          '实施强密码策略（长度、复杂度、定期更换）',
          '使用密码管理器，避免密码复用',
          '配置登录失败锁定和异常检测',
          '认证信息加密存储（密码使用bcrypt/argon2哈希）',
          '定期审计认证日志，发现异常登录',
          '使用标准的认证协议（OAuth、OIDC、SAML）',
        ]} />
      </div>
    ),
  },
]

export default function AuthPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
