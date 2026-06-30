'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import {
  PageTitle, SectionTitle, BookParagraph, BookCode, BookList, TagGrid,
} from '@shared/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: 'PHP', chapterTitle: '表单处理与数据验证', chapterNumber: 12, totalChapters: 22,
  subjectHref: '/study/computer/php',
  prevChapter: { label: '会话管理与Cookie', href: '/study/computer/php/session-cookie' },
  nextChapter: { label: '常用扩展与包管理', href: '/study/computer/php/extensions-composer' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: '表单基础',
    left: (<div className="space-y-4"><PageTitle>表单基础</PageTitle><BookCode language="php" code={`<!-- HTML表单 -->
<form method="POST" action="submit.php">
  <input type="text" name="username" required />
  <input type="email" name="email" required />
  <input type="password" name="pwd" minlength="6" />
  <select name="city">
    <option value="beijing">北京</option>
    <option value="shanghai">上海</option>
  </select>
  <input type="checkbox" name="agree" /> 同意协议
  <button type="submit">注册</button>
</form>`} /></div>),
    right: (<div className="space-y-4"><SectionTitle>GET与POST</SectionTitle><BookCode language="php" code={`<?php
$search = $_GET['q'] ?? '';
$name = $_POST['username'] ?? '';
$email = $_POST['email'] ?? '';
$val = $_REQUEST['key'] ?? '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') { }
?>`} /><TagGrid items={['form', '$_GET', '$_POST', 'method', 'action']} /></div>),
  },
  {
    label: '验证与安全',
    left: (<div className="space-y-4"><SectionTitle>数据验证</SectionTitle><BookCode language="php" code={`<?php
$errors = [];
$email = $_POST['email'] ?? '';
if (empty($_POST['username'])) $errors[] = "用户名必填";
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = "邮箱格式不正确";
if (!preg_match('/^[a-zA-Z0-9]{6,}$/', $_POST['pwd'])) $errors[] = "密码6位以上";
if (strlen($_POST['phone'] ?? '') !== 11) $errors[] = "手机号11位";
if (empty($errors)) { /* 处理表单 */ }
?>`} /></div>),
    right: (<div className="space-y-4"><SectionTitle>安全防护</SectionTitle><BookCode language="php" code={`<?php
function sanitize($data) { return htmlspecialchars(trim($data), ENT_QUOTES, 'UTF-8'); }
session_start();
if ($_POST['csrf_token'] !== $_SESSION['csrf_token']) die("CSRF验证失败");
$allowed = ['image/jpeg', 'image/png'];
if (!in_array($_FILES['file']['type'], $allowed)) die("不支持的文件类型");
?>`} /><TagGrid items={['filter_var', 'preg_match', 'CSRF', '上传安全', '验证']} /></div>),
  },
]

export default function PhpFormsValidationPage() { return <LessonLayout meta={META} spreads={SPREADS} /> }
