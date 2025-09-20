'use client';

import React from 'react';
import { Typography, Card, Divider, Tabs } from 'antd';

const { Title, Paragraph, Text } = Typography;

const codeBlockStyle = {
  background: '#f6f8fa',
  borderRadius: 6,
  padding: '12px 16px',
  fontSize: 15,
  margin: '12px 0',
  fontFamily: 'monospace',
  overflowX: 'auto' as const,
};

const tabItems = [
  {
    key: '1',
    label: 'XSS与防护',
    children: (
      <>
        <Card title="XSS原理与类型" size="small" style={{ marginBottom: 12 }}>
          <ul>
            <li>反射型XSS：恶意脚本通过URL参数注入。</li>
            <li>存储型XSS：恶意脚本存入数据库，影响所有访问者。</li>
            <li>DOM型XSS：前端JS动态插入不可信内容。</li>
          </ul>
        </Card>
        <Card title="XSS攻击演示与防护" size="small">
          <pre style={codeBlockStyle}>{`// 危险：直接插入用户输入
const html = '<img src=x onerror=alert(1) />';
document.body.innerHTML = html;
// 安全：转义或使用textContent
const safe = document.createElement('div');
safe.textContent = html;
document.body.appendChild(safe);
// CSP内容安全策略
<meta httpEquiv="Content-Security-Policy" content="default-src 'self'">`}</pre>
        </Card>
      </>
    ),
  },
  {
    key: '2',
    label: 'CSRF与防护',
    children: (
      <>
        <Card title="CSRF原理与攻击" size="small" style={{ marginBottom: 12 }}>
          <Paragraph>利用用户已登录身份，诱导其在不知情下发起恶意请求。</Paragraph>
        </Card>
        <Card title="CSRF防御" size="small">
          <pre style={codeBlockStyle}>{`// 方案1：后端校验CSRF Token
fetch('/api/transfer', { method: 'POST', headers: { 'x-csrf-token': token } })
// 方案2：SameSite Cookie
Set-Cookie: sid=xxx; SameSite=Strict`}</pre>
        </Card>
      </>
    ),
  },
  {
    key: '3',
    label: '认证与会话安全',
    children: (
      <>
        <Card title="JWT与Cookie安全" size="small" style={{ marginBottom: 12 }}>
          <pre style={codeBlockStyle}>{`// JWT认证
const token = jwt.sign({ uid: 1 }, 'secret');
// HttpOnly防止XSS窃取
Set-Cookie: sid=xxx; HttpOnly; Secure`}</pre>
        </Card>
        <Card title="会话管理建议" size="small">
          <ul>
            <li>敏感Cookie加HttpOnly、Secure、SameSite属性。</li>
            <li>Token存储优先Cookie，避免localStorage。</li>
            <li>定期失效与刷新机制。</li>
          </ul>
        </Card>
      </>
    ),
  },
  {
    key: '4',
    label: '依赖与供应链安全',
    children: (
      <>
        <Card title="依赖漏洞与npm audit" size="small" style={{ marginBottom: 12 }}>
          <pre style={codeBlockStyle}>{`# 检查依赖漏洞
npm audit
# 自动修复
npm audit fix`}</pre>
        </Card>
        <Card title="SCA与依赖管理" size="small">
          <Paragraph>使用SCA工具（如Snyk、Dependabot）自动检测依赖风险，及时升级依赖。</Paragraph>
        </Card>
      </>
    ),
  },
  {
    key: '5',
    label: '前端加密与数据保护',
    children: (
      <>
        <Card title="HTTPS与加密算法" size="small" style={{ marginBottom: 12 }}>
          <pre style={codeBlockStyle}>{`// HTTPS保证传输安全
fetch('https://example.com')
// 前端加密示例
import CryptoJS from 'crypto-js';
const enc = CryptoJS.AES.encrypt('data', 'key').toString();
const dec = CryptoJS.AES.decrypt(enc, 'key').toString(CryptoJS.enc.Utf8);`}</pre>
        </Card>
        <Card title="敏感信息处理建议" size="small">
          <ul>
            <li>敏感数据不在前端明文存储。</li>
            <li>重要信息仅后端处理，前端只做加密传输。</li>
          </ul>
        </Card>
      </>
    ),
  },
  {
    key: '6',
    label: '浏览器安全机制',
    children: (
      <>
        <Card title="同源策略与CORS" size="small" style={{ marginBottom: 12 }}>
          <pre style={codeBlockStyle}>{`// 同源策略：协议、域名、端口均相同才允许访问
// CORS跨域资源共享
fetch('https://api.example.com', { mode: 'cors' })
// 服务端响应头
Access-Control-Allow-Origin: https://your.com`}</pre>
        </Card>
        <Card title="沙箱与iframe安全" size="small">
          <pre style={codeBlockStyle}>{`<iframe src="evil.com" sandbox="allow-scripts"></iframe>`}</pre>
        </Card>
      </>
    ),
  },
  {
    key: '7',
    label: '实战案例',
    children: (
      <>
        <Card title="XSS攻击演示" size="small" style={{ marginBottom: 12 }}>
          <pre style={codeBlockStyle}>{`// 假设用户输入内容未转义
const userInput = '<img src=x onerror=alert(1) />';
document.body.innerHTML = userInput; // 触发XSS`}</pre>
        </Card>
        <Card title="CSRF防御实践" size="small">
          <pre style={codeBlockStyle}>{`// 前端请求时带上CSRF Token
fetch('/api/transfer', { method: 'POST', headers: { 'x-csrf-token': token } })`}</pre>
        </Card>
      </>
    ),
  },
  {
    key: '8',
    label: '练习与拓展',
    children: (
      <>
        <ol>
          <li>实现一个输入内容自动转义的评论框。</li>
          <li>用CSP防护XSS攻击。</li>
          <li>用SameSite Cookie防护CSRF。</li>
        </ol>
        <Divider />
        <ul>
          <li><a href="https://developer.mozilla.org/zh-CN/docs/Web/Security" target="_blank" rel="noopener noreferrer">MDN前端安全文档</a></li>
          <li><a href="https://web.dev/articles/security?hl=zh-cn" target="_blank" rel="noopener noreferrer">web.dev安全专栏</a></li>
        </ul>
      </>
    ),
  },
];

export default function SecurityPage() {
  return (
    <div style={{ padding: 24, maxWidth: 900, margin: '0 auto' }}>
      <Typography>
        <Title level={1}>前端安全</Title>
      </Typography>
      <Tabs defaultActiveKey="1" items={tabItems} style={{ marginTop: 24 }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', margin: '48px 0 0 0' }}>
        <a
          href="/study/frontend/vue-advanced"
          style={{
            background: '#386ff6',
            color: '#fff',
            padding: '12px 28px',
            borderRadius: '16px',
            fontSize: 18,
            fontWeight: 500,
            textDecoration: 'none',
            boxShadow: '0 4px 16px rgba(56,111,246,0.15)',
            transition: 'background 0.2s',
            display: 'inline-block',
          }}
          onMouseOver={e => (e.currentTarget.style.background = '#2055c7')}
          onMouseOut={e => (e.currentTarget.style.background = '#386ff6')}
        >
          上一章：Vue进阶
        </a>
        <a
          id="security-next-nav"
          href="#"
          style={{
            background: '#386ff6',
            color: '#fff',
            padding: '12px 28px',
            borderRadius: '16px',
            fontSize: 18,
            fontWeight: 500,
            textDecoration: 'none',
            boxShadow: '0 4px 16px rgba(56,111,246,0.15)',
            transition: 'background 0.2s',
            display: 'inline-block',
          }}
          onMouseOver={e => (e.currentTarget.style.background = '#2055c7')}
          onMouseOut={e => (e.currentTarget.style.background = '#386ff6')}
          onClick={e => {
            const tabs = document.querySelectorAll('.ant-tabs-tab');
            if (document.querySelector('.ant-tabs-tab-active')?.textContent?.includes('实战案例')) {
              e.preventDefault();
              tabs[tabs.length - 1].scrollIntoView({ behavior: 'smooth' });
              tabs[tabs.length - 1].dispatchEvent(new MouseEvent('click', { bubbles: true }));
            } else {
              // 跳转到性能监控与优化
              window.location.href = '/study/frontend/performance';
            }
          }}
        >
          {/* 按当前tab内容动态显示 */}
          下一章：{typeof window !== 'undefined' && document.querySelector('.ant-tabs-tab-active')?.textContent?.includes('实战案例') ? '练习与拓展' : '性能监控与优化'}
        </a>
      </div>
    </div>
  );
} 