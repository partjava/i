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
  chapterTitle: '应用层安全',
  chapterNumber: 8,
  totalChapters: 10,
  subjectHref: '/study/security/network',
  prevChapter: { label: '传输层安全', href: '/study/security/network/transport' },
  nextChapter: { label: '网络协议分析', href: '/study/security/network/protocol' },
  theme: THEMES.security,
}

const SPREADS = [
  {
    label: '基础原理',
    left: (
      <div className="space-y-4">
        <PageTitle>应用层基础原理</PageTitle>
        <BookParagraph>应用层是OSI模型的第七层，直接为用户和应用程序提供服务。常见协议有HTTP、HTTPS、FTP、SMTP、DNS等。应用层安全关注数据内容、用户身份、业务逻辑等的保护。</BookParagraph>
        <div style={{ textAlign: 'center', margin: '16px 0' }}>
          <svg width="520" height="120" viewBox="0 0 520 120">
            <rect x="20" y="40" width="80" height="40" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="2" rx="8" />
            <text x="60" y="65" fontSize="14" fill="#0ea5e9" textAnchor="middle">用户</text>
            <rect x="120" y="40" width="80" height="40" fill="#fef9c3" stroke="#facc15" strokeWidth="2" rx="8" />
            <text x="160" y="65" fontSize="14" fill="#eab308" textAnchor="middle">浏览器</text>
            <rect x="220" y="40" width="80" height="40" fill="#fce7f3" stroke="#ec4899" strokeWidth="2" rx="8" />
            <text x="260" y="65" fontSize="14" fill="#db2777" textAnchor="middle">Web服务器</text>
            <rect x="320" y="40" width="80" height="40" fill="#f1f5f9" stroke="#64748b" strokeWidth="2" rx="8" />
            <text x="360" y="65" fontSize="14" fill="#334155" textAnchor="middle">数据库</text>
            <rect x="420" y="40" width="80" height="40" fill="#fee2e2" stroke="#ef4444" strokeWidth="2" rx="8" />
            <text x="460" y="65" fontSize="14" fill="#ef4444" textAnchor="middle">攻击者</text>
            <line x1="100" y1="60" x2="120" y2="60" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow8)" />
            <line x1="200" y1="60" x2="220" y2="60" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow8)" />
            <line x1="300" y1="60" x2="320" y2="60" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow8)" />
            <defs>
              <marker id="arrow8" markerWidth="8" markerHeight="8" refX="8" refY="4" orient="auto" markerUnits="strokeWidth">
                <path d="M0,0 L8,4 L0,8" fill="#64748b" />
              </marker>
            </defs>
          </svg>
        </div>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>重点术语解释</PageTitle>
        <BookList items={[
          'SQL注入：通过构造恶意SQL语句获取或篡改数据库数据',
          'XSS：跨站脚本攻击，注入恶意脚本窃取用户信息',
          'CSRF：跨站请求伪造，诱导用户在已认证状态下执行恶意操作',
          '认证绕过：攻击者绕过身份验证机制，获取未授权访问',
          'WebShell：攻击者上传恶意脚本，远程控制服务器',
          'WAF：Web应用防火墙，检测和阻断Web攻击',
          '验证码：防止自动化攻击和暴力破解',
          '敏感信息泄露：如配置文件、日志、错误信息暴露',
        ]} />
        <BookAlert type="info" message="应用层安全是Web安全的核心。OWASP Top 10列出了Web应用最常见的安全风险，SQL注入、XSS、CSRF等长期占据前列。" />
      </div>
    ),
  },
  {
    label: '常见威胁',
    left: (
      <div className="space-y-4">
        <PageTitle>应用层常见威胁</PageTitle>
        <BookList items={[
          'SQL注入：攻击者通过输入恶意SQL语句，获取、篡改或删除数据库数据',
          'XSS：注入恶意脚本，窃取Cookie、会话、键盘输入等',
          'CSRF：诱导用户在已登录状态下执行未授权操作',
          '文件上传漏洞：上传恶意文件，获取服务器控制权',
          '目录遍历：访问服务器敏感文件',
          '弱口令/未授权访问：攻击者利用弱密码或权限配置不当入侵系统',
          '敏感信息泄露：如配置文件、日志、错误信息暴露',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>常见安全问题</PageTitle>
        <BookAlert type="warning" message="常见问题：输入校验缺失、权限控制不严、日志未审计、WAF未部署等。应用层攻击往往直接针对业务逻辑和数据，危害极大。" />
        <TagGrid items={['SQL注入', 'XSS', 'CSRF', '文件上传', '信息泄露']} />
      </div>
    ),
  },
  {
    label: '防护措施',
    left: (
      <div className="space-y-4">
        <PageTitle>应用层防护措施</PageTitle>
        <BookList items={[
          '输入校验与输出编码：防止注入和XSS攻击',
          '参数化查询：防止SQL注入',
          '启用WAF：检测和阻断Web攻击',
          'CSRF Token机制：防止CSRF攻击',
          '强化认证与权限管理：多因素认证、最小权限原则',
          '日志审计与异常告警：及时发现和响应攻击',
          '文件上传安全：限制文件类型、大小、路径，启用病毒扫描',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>安全代码示例</PageTitle>
        <BookCode language="python" code={`# 使用参数化查询防止SQL注入
username = request.form['username']
password = request.form['password']
cur.execute('SELECT * FROM users WHERE username=%s AND password=%s', (username, password))`} />
        <BookCode language="javascript" code={`// 使用DOMPurify对用户输入进行清洗
const clean = DOMPurify.sanitize(userInput);`} />
      </div>
    ),
  },
  {
    label: '实际案例',
    left: (
      <div className="space-y-4">
        <PageTitle>应用层安全实际案例</PageTitle>
        <BookList items={[
          '案例1：某网站未做输入校验，攻击者通过SQL注入获取全部用户数据。启示：所有输入都需校验，数据库操作用参数化查询。',
          '案例2：某论坛未做输出编码，攻击者注入XSS脚本，批量窃取用户Cookie。启示：输出内容需编码，防止脚本执行。',
          '案例3：某企业未启用WAF，攻击者利用CSRF漏洞批量转账。启示：CSRF防护和WAF部署必不可少。',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>案例启示</PageTitle>
        <BookAlert type="warning" message="应用层安全直接关系到用户数据和业务安全。与网络层和传输层不同，应用层漏洞往往由代码缺陷引起，需要在开发阶段通过安全编码实践来防范。安全左移（Shift Left）是提升应用层安全的关键策略。" />
        <TagGrid items={['安全编码', '输入校验', 'WAF部署', '参数化查询', '安全左移']} />
      </div>
    ),
  },
]

export default function ApplicationLayerSecurityPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
