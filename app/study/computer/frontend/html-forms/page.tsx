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
  chapterTitle: '表单与语义化',
  chapterNumber: 2,
  totalChapters: 20,
  subjectHref: '/study/computer/frontend',
  prevChapter: { label: 'HTML基础', href: '/study/computer/frontend/html' },
  nextChapter: { label: 'CSS基础', href: '/study/computer/frontend/css' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: '表单基础',
    left: (
      <div className="space-y-4">
        <PageTitle>表单基础</PageTitle>
        <BookParagraph>HTML表单用于收集用户输入，是网页交互的核心。表单通过&lt;form&gt;标签定义，常配合input、textarea、button等控件。</BookParagraph>
        <BookCode language="html" code={`<form action="/submit" method="post">
  <input type="text" name="username" placeholder="用户名" />
  <input type="password" name="password" placeholder="密码" />
  <button type="submit">登录</button>
</form>`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>常用表单控件</SectionTitle>
        <BookList items={[
          '<input type="text">：单行文本。',
          '<input type="password">：密码框。',
          '<input type="email">：邮箱输入。',
          '<input type="number">：数字输入。',
          '<input type="checkbox">：复选框。',
          '<input type="radio">：单选框。',
          '<input type="file">：文件上传。',
          '<textarea>：多行文本。',
          '<select>：下拉菜单。',
        ]} />
        <BookCode language="html" code={`<form>
  <input type="text" placeholder="姓名" />
  <input type="email" placeholder="邮箱" />
  <input type="checkbox" name="agree" />同意协议
  <select name="city">
    <option value="beijing">北京</option>
    <option value="shanghai">上海</option>
  </select>
  <textarea placeholder="留言"></textarea>
  <button type="submit">提交</button>
</form>`} />
        <TagGrid items={['form', 'input', 'textarea', 'select', '控件']} />
      </div>
    ),
  },
  {
    label: '验证与语义化',
    left: (
      <div className="space-y-4">
        <PageTitle>表单验证</PageTitle>
        <BookParagraph>HTML5支持多种表单验证属性，如required、pattern、min、max、maxlength等。</BookParagraph>
        <BookCode language="html" code={`<form>
  <input type="text" required placeholder="必填" />
  <input type="email" required placeholder="邮箱格式" />
  <input type="password" pattern="[A-Za-z0-9]{6,}" placeholder="6位以上字母数字" />
  <button type="submit">注册</button>
</form>`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>语义化标签</SectionTitle>
        <BookParagraph>语义化标签让表单结构更清晰、可访问性更好。常用如&lt;label&gt;、&lt;fieldset&gt;、&lt;legend&gt;、&lt;output&gt;等。</BookParagraph>
        <BookCode language="html" code={`<form>
  <fieldset>
    <legend>注册信息</legend>
    <label>用户名：<input type="text" name="username" /></label><br />
    <label>邮箱：<input type="email" name="email" /></label><br />
    <output name="result"></output>
  </fieldset>
</form>`} />
        <SectionTitle>常见问题</SectionTitle>
        <BookList items={[
          '表单未加name属性，数据无法提交。',
          '未用label关联input，影响可访问性。',
          '未设置required，用户可提交空表单。',
          '表单action/method未设置或错误。',
        ]} />
        <TagGrid items={['required', 'pattern', 'fieldset', 'legend', '验证']} />
      </div>
    ),
  },
  {
    label: '练习与拓展',
    left: (
      <div className="space-y-4">
        <PageTitle>练习与拓展</PageTitle>
        <BookList items={[
          '写一个带有用户名、密码、邮箱、性别选择、同意协议的注册表单。',
          '实现邮箱格式和密码长度的前端校验。',
          '用label和fieldset优化表单结构。',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>拓展资源</SectionTitle>
        <BookList items={[
          'MDN 表单元素：developer.mozilla.org/zh-CN/docs/Web/HTML/Element/form',
          'W3School 表单教程：w3school.com.cn/html/html_forms.asp',
        ]} />
        <TagGrid items={['练习', '验证', '语义化', '表单', '拓展']} />
      </div>
    ),
  },
]

export default function FrontendHtmlFormsPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
