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
    label: '表单基础',
    children: (
      <>
        <Paragraph>HTML表单用于收集用户输入，是网页交互的核心。表单通过&lt;form&gt;标签定义，常配合input、textarea、button等控件。</Paragraph>
        <pre style={codeBlockStyle}>{`<form action="/submit" method="post">
  <input type="text" name="username" placeholder="用户名" />
  <input type="password" name="password" placeholder="密码" />
  <button type="submit">登录</button>
</form>`}</pre>
      </>
    ),
  },
  {
    key: '2',
    label: '常用表单控件',
    children: (
      <>
        <Card title="输入控件" size="small" style={{ marginBottom: 12 }}>
          <ul>
            <li><Text code>{'<input type="text">'}</Text>：单行文本。</li>
            <li><Text code>{'<input type="password">'}</Text>：密码框。</li>
            <li><Text code>{'<input type="email">'}</Text>：邮箱输入。</li>
            <li><Text code>{'<input type="number">'}</Text>：数字输入。</li>
            <li><Text code>{'<input type="checkbox">'}</Text>：复选框。</li>
            <li><Text code>{'<input type="radio">'}</Text>：单选框。</li>
            <li><Text code>{'<input type="file">'}</Text>：文件上传。</li>
            <li><Text code>{'<textarea>'}</Text>：多行文本。</li>
            <li><Text code>{'<select>'}</Text>：下拉菜单。</li>
          </ul>
        </Card>
        <pre style={codeBlockStyle}>{`<form>
  <input type="text" placeholder="姓名" />
  <input type="email" placeholder="邮箱" />
  <input type="checkbox" name="agree" />同意协议
  <select name="city">
    <option value="beijing">北京</option>
    <option value="shanghai">上海</option>
  </select>
  <textarea placeholder="留言"></textarea>
  <button type="submit">提交</button>
</form>`}</pre>
      </>
    ),
  },
  {
    key: '3',
    label: '表单验证',
    children: (
      <>
        <Paragraph>HTML5支持多种表单验证属性，如required、pattern、min、max、maxlength等。</Paragraph>
        <pre style={codeBlockStyle}>{`<form>
  <input type="text" required placeholder="必填" />
  <input type="email" required placeholder="邮箱格式" />
  <input type="password" pattern="[A-Za-z0-9]{6,}" placeholder="6位以上字母数字" />
  <button type="submit">注册</button>
</form>`}</pre>
      </>
    ),
  },
  {
    key: '4',
    label: '语义化标签',
    children: (
      <>
        <Paragraph>语义化标签让表单结构更清晰、可访问性更好。常用如&lt;label&gt;、&lt;fieldset&gt;、&lt;legend&gt;、&lt;output&gt;等。</Paragraph>
        <pre style={codeBlockStyle}>{`<form>
  <fieldset>
    <legend>注册信息</legend>
    <label>用户名：<input type="text" name="username" /></label><br />
    <label>邮箱：<input type="email" name="email" /></label><br />
    <output name="result"></output>
  </fieldset>
</form>`}</pre>
      </>
    ),
  },
  {
    key: '5',
    label: '常见问题',
    children: (
      <>
        <ul>
          <li>表单未加name属性，数据无法提交。</li>
          <li>未用label关联input，影响可访问性。</li>
          <li>未设置required，用户可提交空表单。</li>
          <li>表单action/method未设置或错误。</li>
        </ul>
      </>
    ),
  },
  {
    key: '6',
    label: '练习与拓展',
    children: (
      <>
        <ol>
          <li>写一个带有用户名、密码、邮箱、性别选择、同意协议的注册表单。</li>
          <li>实现邮箱格式和密码长度的前端校验。</li>
          <li>用label和fieldset优化表单结构。</li>
        </ol>
        <Divider />
        <ul>
          <li><a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/form" target="_blank" rel="noopener noreferrer">MDN 表单元素</a></li>
          <li><a href="https://www.w3school.com.cn/html/html_forms.asp" target="_blank" rel="noopener noreferrer">W3School 表单教程</a></li>
        </ul>
      </>
    ),
  },
];

export default function HtmlFormsPage() {
  return (
    <div style={{ padding: 24, maxWidth: 900, margin: '0 auto' }}>
      <Typography>
        <Title level={1}>表单与语义化</Title>
      </Typography>
      <Tabs defaultActiveKey="1" items={tabItems} style={{ marginTop: 24 }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', margin: '48px 0 0 0' }}>
        <a
          href="/study/frontend/html"
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
          上一章：HTML基础
        </a>
        <a
          href="/study/frontend/css"
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
          下一章：CSS基础
        </a>
      </div>
    </div>
  );
} 