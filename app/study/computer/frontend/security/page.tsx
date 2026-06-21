'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import {
  PageTitle,
  SectionTitle,
  BookParagraph,
  BookCode,
  BookList,
  TagGrid,
} from '@/app/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: 'Web前端开发',
  chapterTitle: '前端安全',
  chapterNumber: 12,
  totalChapters: 20,
  subjectHref: '/study/computer/frontend',
  prevChapter: { label: '异步与Promise', href: '/study/computer/frontend/async' },
  nextChapter: { label: '前端工程化', href: '/study/computer/frontend/engineering' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: 'XSS与CSRF',
    left: (
      <div className="space-y-4">
        <PageTitle>XSS与防护</PageTitle>
        <BookParagraph><b>XSS原理与类型：</b></BookParagraph>
        <BookList items={[
          '反射型XSS：恶意脚本通过URL参数注入。',
          '存储型XSS：恶意脚本存入数据库，影响所有访问者。',
          'DOM型XSS：前端JS动态插入不可信内容。',
        ]} />
        <BookParagraph><b>XSS攻击演示与防护：</b></BookParagraph>
        <BookCode language="javascript" code={`// 危险：直接插入用户输入
const html = '<img src=x onerror=alert(1) />';
document.body.innerHTML = html;
// 安全：转义或使用textContent
const safe = document.createElement('div');
safe.textContent = html;
document.body.appendChild(safe);
// CSP内容安全策略
<meta httpEquiv="Content-Security-Policy" content="default-src 'self'">`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>CSRF与防护</SectionTitle>
        <BookParagraph><b>CSRF原理：</b>利用用户已登录身份，诱导其在不知情下发起恶意请求。</BookParagraph>
        <BookParagraph><b>CSRF防御：</b></BookParagraph>
        <BookCode language="javascript" code={`// 方案1：后端校验CSRF Token
fetch('/api/transfer', { method: 'POST', headers: { 'x-csrf-token': token } });
// 方案2：SameSite Cookie
Set-Cookie: sid=xxx; SameSite=Strict`} />
        <TagGrid items={['XSS', 'CSRF', 'CSP', 'SameSite', '安全']} />
      </div>
    ),
  },
  {
    label: '认证与数据保护',
    left: (
      <div className="space-y-4">
        <PageTitle>认证与会话安全</PageTitle>
        <BookParagraph><b>JWT与Cookie安全：</b></BookParagraph>
        <BookCode language="javascript" code={`// JWT认证
const token = jwt.sign({ uid: 1 }, 'secret');
// HttpOnly防止XSS窃取
Set-Cookie: sid=xxx; HttpOnly; Secure`} />
        <BookParagraph><b>会话管理建议：</b></BookParagraph>
        <BookList items={[
          '敏感Cookie加HttpOnly、Secure、SameSite属性。',
          'Token存储优先Cookie，避免localStorage。',
          '定期失效与刷新机制。',
        ]} />
        <SectionTitle>依赖与供应链安全</SectionTitle>
        <BookParagraph><b>依赖漏洞与npm audit：</b></BookParagraph>
        <BookCode language="bash" code={`# 检查依赖漏洞
npm audit
# 自动修复
npm audit fix`} />
        <BookParagraph>使用SCA工具（如Snyk、Dependabot）自动检测依赖风险，及时升级依赖。</BookParagraph>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>前端加密与数据保护</SectionTitle>
        <BookParagraph><b>HTTPS与加密算法：</b></BookParagraph>
        <BookCode language="javascript" code={`// HTTPS保证传输安全
fetch('https://example.com');
// 前端加密示例
import CryptoJS from 'crypto-js';
const enc = CryptoJS.AES.encrypt('data', 'key').toString();
const dec = CryptoJS.AES.decrypt(enc, 'key').toString(CryptoJS.enc.Utf8);`} />
        <BookParagraph><b>敏感信息处理建议：</b></BookParagraph>
        <BookList items={[
          '敏感数据不在前端明文存储。',
          '重要信息仅后端处理，前端只做加密传输。',
        ]} />
        <SectionTitle>浏览器安全机制</SectionTitle>
        <BookParagraph><b>同源策略与CORS：</b></BookParagraph>
        <BookCode language="javascript" code={`// 同源策略：协议、域名、端口均相同才允许访问
// CORS跨域资源共享
fetch('https://api.example.com', { mode: 'cors' });
// 服务端响应头
Access-Control-Allow-Origin: https://your.com`} />
        <BookParagraph><b>沙箱与iframe安全：</b></BookParagraph>
        <BookCode language="html" code={`<iframe src="evil.com" sandbox="allow-scripts"></iframe>`} />
        <TagGrid items={['JWT', 'CORS', 'HTTPS', 'npm audit', 'iframe']} />
      </div>
    ),
  },
  {
    label: '实战与练习',
    left: (
      <div className="space-y-4">
        <PageTitle>实战案例</PageTitle>
        <BookParagraph><b>XSS攻击演示：</b></BookParagraph>
        <BookCode language="javascript" code={`// 假设用户输入内容未转义
const userInput = '<img src=x onerror=alert(1) />';
document.body.innerHTML = userInput; // 触发XSS`} />
        <BookParagraph><b>CSRF防御实践：</b></BookParagraph>
        <BookCode language="javascript" code={`// 前端请求时带上CSRF Token
fetch('/api/transfer', { method: 'POST', headers: { 'x-csrf-token': token } });`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>练习与拓展</SectionTitle>
        <BookList items={[
          '实现一个输入内容自动转义的评论框。',
          '用CSP防护XSS攻击。',
          '用SameSite Cookie防护CSRF。',
        ]} />
        <SectionTitle>拓展资源</SectionTitle>
        <BookList items={[
          'MDN前端安全文档：developer.mozilla.org/zh-CN/docs/Web/Security',
          'web.dev安全专栏：web.dev/articles/security?hl=zh-cn',
        ]} />
        <TagGrid items={['练习', '实战', 'XSS', 'CSRF', '安全']} />
      </div>
    ),
  },
]

export default function FrontendSecurityPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
